<template>
    <b-card-group class="m-5 justify-content-center" columns>
        <b-card
            v-for="(day, dayIndex) in itemsGroupedByDay"
            :key="dayIndex" :header="day._id === todaysDateAsFormattedString ? 'Einkaufsliste' : day._id"
            @click="toggleDayTableVisibility(dayIndex)"
            no-body
        >
            <b-list-group
                v-if="dayTablesVisibility[dayIndex]"
                flush
            >
                <b-list-group-item
                        button
                        v-for="(item, itemIndex) in day.items"
                        :key="itemIndex"
                        :variant="item.acquired ? 'success': 'dark'"
                        @click="toggleItemAcquired(item); $event.stopPropagation()"
                        :disabled="todaysDateAsFormattedString !== day._id"
                        v-hammer:swipe.left="($event) => removeItem(item._id)"
                >
                    <p class="card-text m-2">
                        {{ item.amount || '' }}{{ item.unit ? ` ${item.unit} ` : ' ' }}{{ item.itemPreset.name }}
                    </p>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </b-card-group>
</template>

<script lang="ts">
    import {defineComponent, watchEffect, computed, ref} from "@vue/composition-api";
    import {GetItemDto} from "../../../../api-dist/dist/modules/items/dto/get-item.dto";
    import {ItemStore} from "@/store/modules/ItemStore";
    import {GetItemGroupedByDayDto} from "../../../../api-dist/dist/modules/items/dto/get-item-grouped-by-day.dto";

    export default defineComponent({
        name: "ListItem",
        setup(props: any, context: any) {

            const { $bvToast, $socket, $dayjs } = context.root;

            $socket.on('updated', async () => {
                // eslint-disable-next-line @typescript-eslint/no-use-before-define
                await fetchData()
            })

            const itemsGroupedByDay = computed((): GetItemGroupedByDayDto[] => ItemStore.itemsGroupedByDay)

            const dayTablesVisibility = ref<boolean[]>([true])

            const todaysDateAsFormattedString = ref<string>($dayjs.format('DD.MM.YYYY'))

            async function removeItem(id: string) {
                await ItemStore.removeItem(id)
                $bvToast.toast("Eintrag entfernt", {
                  variant: 'info',
                  title: 'Info'
                })
            }

            async function removeAllItems() {
                await ItemStore.removeAllItems()
            }

            async function fetchData() {
                try {
                    await ItemStore.fetchItems()
                    dayTablesVisibility.value = itemsGroupedByDay.value.map((day: GetItemGroupedByDayDto, index: number) => index === 0)
                    context.root.$set(dayTablesVisibility.value, 0, true)
                } catch (e) {
                    $bvToast.toast(e.message, {
                        variant: 'danger',
                        title: 'Error'
                    })
                }
            }

            async function toggleItemAcquired(item: GetItemDto) {
                item.acquired = !item.acquired

                try {
                    await ItemStore.patchItem(item)
                } catch (e) {
                    $bvToast.toast(e.message, {
                        variant: 'danger',
                        title: 'Error'
                    })
                }
            }

            function toggleDayTableVisibility(index: number): void {
                context.root.$set(dayTablesVisibility.value, index, !dayTablesVisibility.value[index])
            }

            watchEffect(
                async () => {
                    await fetchData()
                }
            )

            return {
                removeItem,
                removeAllItems,
                toggleItemAcquired,
                toggleDayTableVisibility,
                itemsGroupedByDay,
                dayTablesVisibility,
                todaysDateAsFormattedString
            }
        }
    });
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
