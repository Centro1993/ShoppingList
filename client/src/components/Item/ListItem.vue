<template>
    <div>
        <b-table striped hover :items="items" :fields="fields">
            <template v-slot:cell(acquired)="data">
                <b-form-checkbox
                        :id="`checkbox-${data.index}`"
                        v-model="data.item.acquired"
                        v-on:input="patchItem($event, data.item)"
                >
                    Gekauft {{data.index}}
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
        <b-button variant="danger" @click="removeAllItems()">Alle Einträge entfernen</b-button>
    </div>
</template>

<script lang="ts">
    import {defineComponent, watchEffect, computed} from "@vue/composition-api";
    import {GetItemDto} from "../../../../api-dist/dist/modules/items/dto/get-item.dto";
    import {ItemStore} from "@/store/modules/ItemStore";

    export default defineComponent({
        name: "ListItem",
        setup(props: any, context: any) {

            const {$bvToast} = context.root;

            const items = computed((): GetItemDto[] => ItemStore.items)

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

            watchEffect(
                async () => {
                    await fetchData()
                }
            )

            return {
                removeItem,
                removeAllItems,
                patchItem,
                fields,
                items
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
