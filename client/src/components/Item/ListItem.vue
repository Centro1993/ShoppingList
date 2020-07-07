<template>
    <b-card-group class="m-4">
        <b-card v-for="(day, index) in itemsGroupedByDay" :key="index" :header="day._id" @click="toggleDayTableVisibility(index)">
            <b-list-group v-if="dayTablesVisibility[index]">
                <b-list-group-item
                        button
                        v-for="(item, index) in day.items"
                        :key="index"
                        :variant="item.acquired ? 'success': ''"
                        @click="patchItem($event, item)"
                >
                    <p>
                        {{ item.amount }} {{ item.unit }} {{ item.itemPreset.name }}
                        <b-icon-trash-fill
                                variant="danger"
                                @click="removeItem(item._id)"
                        />
                    </p>
                </b-list-group-item>
            </b-list-group>
        </b-card>
    </b-card-group>
</template>

<script lang="ts">
    import {defineComponent, watchEffect, computed, ref, watch} from "@vue/composition-api";
    import {GetItemDto} from "../../../../api-dist/dist/modules/items/dto/get-item.dto";
    import {ItemStore} from "@/store/modules/ItemStore";
    import {GetItemGroupedByDayDto} from "../../../../api-dist/dist/modules/items/dto/get-item-grouped-by-day.dto";

    export default defineComponent({
        name: "ListItem",
        setup(props: any, context: any) {

            const {$bvToast} = context.root;

            const itemsGroupedByDay = computed((): GetItemGroupedByDayDto[] => ItemStore.itemsGroupedByDay)

            const dayTablesVisibility = ref<boolean[]>([true])

            async function removeItem(id: string) {
                await ItemStore.removeItem(id)
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

            async function patchItem(acquired: boolean, item: GetItemDto) {
                item.acquired = acquired
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
                patchItem,
                toggleDayTableVisibility,
                itemsGroupedByDay,
                dayTablesVisibility
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
