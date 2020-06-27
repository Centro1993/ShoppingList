<template>
    <div>
        <b-container fluid>
            <b-row class="my-1">
                <b-col sm="3">
                    <label for="name">Name</label>
                </b-col>
                <b-col sm="3">
                    <vue-bootstrap-typeahead
                            id="name"
                            :data="itemPresets"
                            v-model="userInput"
                            :serializer="s => s.name"
                            size="lg"
                            placeholder="Name"
                            @hit="newItem.itemPreset = $event._id"
                    >
                        <template slot="suggestion" slot-scope="{ data, htmlText }">
                            <span v-html="htmlText"></span>&nbsp;<b-button variant="danger" @click="deleteItemPreset(data._id)">Delete All</b-button>
                        </template>
                    </vue-bootstrap-typeahead>
                </b-col>
            </b-row>
            <br>
            <b-row class="my-1">
                <b-col sm="3">
                    <label for="amount">Menge</label>
                </b-col>
                <b-col sm="3">
                    <b-form-input :value="newItem.amount" v-on:input="newItem.amount = parseFloat($event)" id="amount" type="number" placeholder="Menge"/>
                </b-col>
            </b-row>
            <br>
            <b-row class="my-1">
                <b-col sm="3">
                    <label for="unit">Einheit</label>
                </b-col>
                <b-col sm="3">
                    <b-form-select v-model="newItem.unit" id="unit" :options="units"></b-form-select>
                </b-col>
            </b-row>
            <div @click="createItem">
                Eintrag erstellen
            </div>
        </b-container>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref, watch, computed} from "@vue/composition-api";
    import {CreateItemDto} from "../../../../api-dist/dist/modules/items/dto/create-item.dto";
    import units from "../../../../api-dist/dist/lib/enums/units"
    import {GetItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/get-item-preset.dto";
    import { ItemStore } from "@/store/modules/ItemStore";
    import { ItemPresetStore} from "@/store/modules/ItemPresetStore";
    import {CreateItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/create-item-preset.dto";

    export default defineComponent({
        name: "CreateItem",
        setup(props: any, context: any) {
            const {$bvToast} = context.root;

            const newItem = ref<CreateItemDto>(new CreateItemDto('', 1));
            const userInput = ref<string>('')
            const itemPresets = computed<GetItemPresetDto[]>(() => ItemPresetStore.itemPresets)

            async function createItem() {
                try {
                    // create item suggestion if needed
                    if (newItem.value.itemPreset === '') {
                        const newItemPreset: GetItemPresetDto | null = await ItemPresetStore.createItemPreset(new CreateItemPresetDto(userInput.value))
                        if(!newItemPreset) {
                            $bvToast.toast('Item could not be created', {
                                variant: 'danger',
                            });
                            return
                        }
                        newItem.value.itemPreset = newItemPreset._id
                    }
                    await ItemStore.createItem(newItem.value);

                    // clear previous input
                    userInput.value = ''
                    newItem.value = new CreateItemDto(newItem.value.itemPreset, 1)
                } catch (e) {
                    console.log(e)
                    $bvToast.toast(e.message, {
                        variant: 'danger',
                        title: 'Error'
                    });
                }
            }

            async function deleteItemPreset(itemPresetId: string) {
                await ItemPresetStore.deleteItemPreset(itemPresetId)
            }

            watch(
                userInput,
                (userInput) => {
                    ItemPresetStore.findItemPresets(userInput)
                }
            )

            return {
                newItem,
                itemPresets,
                createItem,
                deleteItemPreset,
                userInput,
                units
            };
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
