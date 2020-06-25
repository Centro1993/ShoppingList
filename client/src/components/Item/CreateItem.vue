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
                            size="lg"
                            :serializer="s => s.name"
                            placeholder="Name"
                            @hit="newItem.itemPreset = $event"
                    >
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
    import { ItemModule } from "@/store/modules/ItemModule";
    import { ItemPresetModule} from "@/store/modules/ItemPresetModule";
    import {CreateItemPresetDto} from "../../../../api-dist/dist/modules/item-presets/dto/create-item-preset.dto";

    export default defineComponent({
        name: "CreateItem",
        setup(props: any, context: any) {
            const {$bvToast} = context.root;

            const newItem = ref<CreateItemDto>(new CreateItemDto('', 1));
            const userInput = ref<string>('')
            const itemPresets = computed<GetItemPresetDto[]>(() => ItemPresetModule.itemPresets)

            async function createItem() {
                try {
                    // create item suggestion if needed
                    if (newItem.value.itemPreset === '') {
                        const newItemPreset: GetItemPresetDto | null = await ItemPresetModule.createItemPreset(new CreateItemPresetDto(userInput.value))
                        if(!newItemPreset) {
                            $bvToast.toast('Item could not be created', {
                                variant: 'danger',
                            });
                            return
                        }
                        console.log(newItemPreset)
                        newItem.value.itemPreset = newItemPreset._id
                    }

                    await ItemModule.createItem(newItem.value);

                    // clear previous input
                    userInput.value = ''
                    newItem.value = new CreateItemDto('', 1)
                } catch (e) {
                    $bvToast.toast(e.message, {
                        variant: 'danger',
                        title: 'Error'
                    });
                }
            }

            watch(
                userInput,
                (userInput) => {
                    ItemPresetModule.findItemPresets(userInput)
                }
            )

            return {
                newItem,
                itemPresets,
                createItem,
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
