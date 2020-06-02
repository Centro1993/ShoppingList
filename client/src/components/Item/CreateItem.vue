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
import { Component, Prop, Vue } from "vue-property-decorator";
import { CreateItemDto } from "../../../../api-dist/dist/dto/create-item.dto";

@Component
export default class HelloWorld extends Vue {
  private newItem: CreateItemDto = new CreateItemDto("");

  async createItem() {
    await this.$store.dispatch("createItem", this.newItem);
  }
}
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
