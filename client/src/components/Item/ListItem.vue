<template>
    <div>
        <div v-for="(day, index) in itemsGroupedByDay" :key="index">
            <b-button :variant="dayTablesVisibility[index] ? 'danger' : 'success'" @click="toggleDayTableVisibility(index)">{{ day._id }}</b-button>
            <b-table striped hover :items="day.items" :fields="fields" v-if="dayTablesVisibility[index]">
                <template v-slot:cell(acquired)="data">
                    <b-form-checkbox
                            :id="`checkbox-${data.index}`"
                            v-model="data.item.acquired"
                            v-on:input="patchItem($event, data.item)"
                    >
                        Gekauft
                    </b-form-checkbox>
                </template>
                <template v-slot:cell(deleteItem)="data">
                    <b-button
                            variant="danger"
                            @click="removeItem(data.item._id)"
                    >
                        Löschen
                    </b-button>
                </template>
            </b-table>
        </div>
        <b-button variant="danger" @click="removeAllItems()">Alle Einträge entfernen</b-button>
    </div>
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

            const fields = [
                {
                    key: 'itemPreset.name',
                    label: 'Name'
                },
                {
                    key: 'amount'
                },
                {
                    key: 'unit'
                },
                {
                    key: 'acquired',
                    label: ''
                },
                {
                    key: 'deleteItem',
                    label: ''
                }
            ]

            async function removeItem(id: string) {
                await ItemStore.removeItem(id)
            }

            async function removeAllItems() {
                await ItemStore.removeAllItems()
            }

            async function fetchData() {
                try {
                    await ItemStore.fetchItems()
                    console.log(dayTablesVisibility.value)
                    console.log(itemsGroupedByDay.value.length)
                    dayTablesVisibility.value = itemsGroupedByDay.value.map((day: GetItemGroupedByDayDto, index: number) => index === 0)
                    console.log(dayTablesVisibility.value)
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
                fields,
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
