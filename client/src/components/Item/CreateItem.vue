<template>
    <div>
        <b-container fluid>
            <b-row class="my-1">
                <b-col sm="3">
                    <label for="name">Name</label>
                </b-col>
                <b-col sm="3">
                    <b-form-input v-model="newItem.name" id="name" placeholder="Name"/>
                </b-col>
            </b-row>
            <br>
            <b-row class="my-1">
                <b-col sm="3">
                    <label for="amount">Menge</label>
                </b-col>
                <b-col sm="3">
                    <b-form-input v-model="newItem.amount" id="amount" type="number" placeholder="Menge"/>
                </b-col>
            </b-row>
            <br>
            <b-row class="my-1">
                <b-col sm="3">
                    <label for="unit">Einheit</label>
                </b-col>
                <b-col sm="3">
                    <b-form-input v-model="newItem.unit" id="unit" placeholder="Einheit" min="0"/>
                </b-col>
            </b-row>
            <div @click="createItem">
                Eintrag erstellen
            </div>
        </b-container>
    </div>
</template>

<script lang="ts">
    import {defineComponent, ref} from "@vue/composition-api";
    import {CreateItemDto} from "../../../../api-dist/dist/dto/create-item.dto";

    export default defineComponent({
        name: "CreateItem",
        setup(props: any, context: any) {
            const {$store, $bvToast} = context.root;

            const newItem = ref<CreateItemDto>(new CreateItemDto("", 1));

            async function createItem() {
                try {
                    await $store.dispatch("createItem", newItem.value);
                } catch (e) {
                    $bvToast.toast(e.message, {
                        variant: 'danger',
                        title: 'Error'
                    });
                }
            }

            return {
                newItem,
                createItem
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
