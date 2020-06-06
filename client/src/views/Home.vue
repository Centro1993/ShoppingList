<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <CreateItem />
    <ul v-for="(item, index) in $store.state.items" :key="index">
      <li>
        <div>
          <p>{{item.name}}</p>
          <p>{{item.amount}}</p>
          <p>{{item.unit}}</p>
          <p>{{item._id}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import CreateItem from "@/components/Item/CreateItem.vue";
import {computed, defineComponent, reactive, ref, watchEffect} from "@vue/composition-api";

export default defineComponent({
  name: "Home",
  setup (props: any, context: any) {
    const {$store, $router} = context.root;

    async function fetchData () {
      await $store.dispatch('fetchItems')
    }

    watchEffect(
      async () => {
        await fetchData()
      }
    )
    return {}
  },
  components: {
    CreateItem
  }
});
</script>
