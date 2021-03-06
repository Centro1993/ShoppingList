<template>
    <div>
        <div class="h1 mb-0 create-item-icon">
            <b-icon-plus-circle-fill variant="success" v-b-modal.create-item-modal></b-icon-plus-circle-fill>
        </div>
        <b-modal
                id="create-item-modal"
                hide-footer
                @close="clearItemPreset()"
        >
            <template v-slot:modal-title>
                <h4><b>Eintrag erstellen</b></h4>
            </template>
            <b-form-group class="mb-4">
                <b-row class="my-1">
                    <b-col sm="3">
                        <label for="name">Name</label>
                    </b-col>
                    <b-col sm="9">
                        <vue-bootstrap-typeahead
                                ref="nameTypeahead"
                                id="nameTypeahead"
                                :data="itemPresets"
                                v-model="itemPresetNameUserInput"
                                :serializer="s => s.name"
                                size="lg"
                                placeholder="Name"
                                @hit="newItem.itemPreset = $event._id"
                        >
                            <template slot="suggestion" slot-scope="{ data, htmlText }">
                                <span v-html="htmlText"></span>
                                <b-icon-trash-fill
                                        variant="danger"
                                        @click="deleteItemPreset(data._id)"
                                />
                            </template>
                        </vue-bootstrap-typeahead>
                    </b-col>
                </b-row>
                <br>
                <b-row class="my-1">
                    <b-col sm="3">
                        <label for="amount">Menge</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-input :value="newItem.amount" v-on:input="newItem.amount = parseFloat($event)"
                                      id="amount"
                                      type="number" placeholder="Menge"/>
                    </b-col>
                </b-row>
                <br>
                <b-row v-if="validAmount" class="my-1">
                    <b-col sm="3">
                        <label for="unit">Einheit</label>
                    </b-col>
                    <b-col sm="9">
                        <b-form-select
                                v-model="newItem.unit"
                                id="unit"
                                :options="units"
                        ></b-form-select>
                    </b-col>
                </b-row>
            </b-form-group>

            <b-form-group class="m-auto">
                <b-button class="mb-6" block @click="clearItemPreset(); $bvModal.hide('create-item-modal')">
                    Close
                </b-button>
                <b-button
                    class="mb-6"
                    variant="success"
                    block
                    @click="createItem();
                    $bvModal.hide('create-item-modal')"
                    :disabled="!itemPresetNameUserInput || itemPresetNameUserInput === ''"
                >
                    Create
                </b-button>
            </b-form-group>
        </b-modal>
    </div>
</template>

<script lang="ts">
import {defineComponent, ref, watch, computed, watchEffect} from "@vue/composition-api";
    import {CreateItemDto} from "../../../../api-dist/dist/modules/items/dto/create-item.dto";
    import units from "../../../../api-dist/dist/lib/enums/units"
    import {GetItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/get-item-preset.dto";
    import {ItemStore} from "@/store/modules/ItemStore";
    import {ItemPresetStore} from "@/store/modules/ItemPresetStore";
    import {CreateItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/create-item-preset.dto";

    export default defineComponent({
        name: "CreateItem",
        setup(props: any, context: any) {
            const { $bvToast } = context.root;
            const nameTypeahead = ref({inputValue: ''})

            const newItem = ref<CreateItemDto>(new CreateItemDto('', null));
            const itemPresetNameUserInput = ref<string>('')
            const itemPresetUnitUserInput = ref<string>('')
            const itemPresets = computed<GetItemPresetDto[]>(() => ItemPresetStore.itemPresets)

            const validAmount = computed<boolean>(() => {
              const validAmount = !!(newItem.value.amount && newItem.value.amount > 0)
              if (!validAmount) newItem.value.unit = undefined
              return validAmount
            });


            function clearItemPreset() {
                if(nameTypeahead.value) nameTypeahead.value.inputValue = ''
                itemPresetNameUserInput.value = ''
                itemPresetUnitUserInput.value = ''
                newItem.value.itemPreset = ''
            }

            async function deleteItemPreset(itemPresetId: string) {
                clearItemPreset()
                await ItemPresetStore.deleteItemPreset(itemPresetId)
            }

            function setItemPreset(itemPreset: GetItemPresetDto) {
              nameTypeahead.value.inputValue = itemPreset.name
              itemPresetNameUserInput.value = itemPreset.name
              newItem.value.itemPreset = itemPreset._id
            }

            async function createItem() {
                try {
                    // create a new item preset if needed
                    if (newItem.value.itemPreset === '') {
                        const newItemPreset: GetItemPresetDto | null = await ItemPresetStore.createItemPreset(new CreateItemPresetDto(itemPresetNameUserInput.value))
                        if (!newItemPreset) {
                            $bvToast.toast('Item could not be created', {
                                variant: 'danger',
                            });
                            return
                        }
                        setItemPreset(newItemPreset)
                    }
                    await ItemStore.createItem(newItem.value);

                    // clear previous input
                    clearItemPreset()
                    newItem.value = new CreateItemDto(newItem.value.itemPreset, 1)
                } catch (e) {
                    console.log(e)
                    $bvToast.toast(e.message, {
                        variant: 'danger',
                        title: 'Error'
                    });
                }
            }

            watch(
                itemPresetNameUserInput,
                (userInput) => {
                    // find all item presets matching the input
                    ItemPresetStore.findItemPresets(userInput)
                    // if there is an exact match, take that as item preset
                    const itemPresetMatchingUserInput = itemPresets.value.find((itemPreset: GetItemPresetDto) => itemPreset.name.toLowerCase() === userInput.toLowerCase())
                    if (itemPresetMatchingUserInput) {
                        setItemPreset(itemPresetMatchingUserInput)
                    } else {
                        // else, make sure no item preset is set
                        newItem.value.itemPreset = ''
                    }
                }
            )

            // ensure amount is positive, else set to null
            watchEffect(
                () => {
                  newItem.value.amount = newItem.value.amount && newItem.value.amount > 0 ? newItem.value.amount : null
                }
            )

            return {
                newItem,
                itemPresets,
                createItem,
                deleteItemPreset,
                clearItemPreset,
                itemPresetNameUserInput,
                itemPresetUnitUserInput,
                validAmount,
                units,
                nameTypeahead
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

    .create-item-icon {
        position: fixed;
        right: 0;
        bottom: 5%;
        left: 80%;
        z-index: 1030;
    }
</style>
