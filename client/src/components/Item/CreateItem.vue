<template>
  <div>
    <input v-model="newItem.name" placeholder="Name" />
    <input v-model="newItem.amount" type="number" placeholder="Menge" />
    <input v-model="newItem.unit" placeholder="Einheit" />
    <div @click="createItem">
      Eintrag erstellen
    </div>
  </div>
</template>

<script lang="ts">
  import {computed, defineComponent, ref} from '@vue/composition-api'
  import { CreateItemDto } from "../../../../api-dist/dist/dto/create-item.dto";

  export default defineComponent({
    name: 'CreateItem',
    setup(props:any, context: any) {
      const { $store } = context.root
      const newItem = ref<CreateItemDto>(new CreateItemDto('', 1));

      async function createItem() {
        await $store.dispatch("createItem", newItem.value);
      }
      return {
        newItem,
        createItem
      }
    }
  })

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
