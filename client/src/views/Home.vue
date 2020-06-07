<template>
  <div class="home">
    <CreateItem />
    <ListItem />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import CreateItem from "@/components/Item/CreateItem.vue";
import ListItem from "@/components/Item/ListItem.vue";
import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "Home",
  components: {
    CreateItem,
    ListItem
  }
});
</script>
