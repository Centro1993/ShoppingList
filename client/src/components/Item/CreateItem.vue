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
                            :data="itemSuggestions"
                            v-model="userInput"
                            size="lg"
                            :serializer="s => s.name"
                            placeholder="Name"
                            @hit="newItem.itemSuggestionId = $event"
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
    import {GetItemSuggestionDto} from "../../../../api-dist/dist/modules/item-suggestions/dto/get-item-suggestion.dto";
    import { ItemModule } from "@/store/modules/ItemModule";
    import { ItemSuggestionModule} from "@/store/modules/ItemSuggestionModule";
    import {CreateItemSuggestionDto} from "../../../../api-dist/dist/modules/item-suggestions/dto/create-item-suggestion.dto";

    export default defineComponent({
        name: "CreateItem",
        setup(props: any, context: any) {
            const {$bvToast} = context.root;

            const newItem = ref<CreateItemDto>(new CreateItemDto('', 1));
            const userInput = ref<string>('')
            const itemSuggestions = computed<GetItemSuggestionDto[]>(() => ItemSuggestionModule.itemSuggestions)

            async function createItem() {
                try {
                    // create item suggestion if needed
                    if (newItem.value.itemSuggestionId === '') {
                        const newItemSuggestion: GetItemSuggestionDto | null = await ItemSuggestionModule.createItemSuggestion(new CreateItemSuggestionDto(userInput.value))
                        if(!newItemSuggestion) {
                            $bvToast.toast('Item could not be created', {
                                variant: 'danger',
                            });
                        }
                        newItem.value.itemSuggestionId = newItemSuggestion._id
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
                () => newItem.value.itemSuggestionId,
                (userInput) => {
                    ItemSuggestionModule.findItemSuggestions(userInput)
                }
            )

            return {
                newItem,
                itemSuggestions,
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
