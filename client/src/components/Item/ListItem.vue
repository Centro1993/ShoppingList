<template>
  <div>
    <b-table striped hover :items="$store.state.items" :fields="fields"></b-table>
    <ul v-for="(item, index) in $store.state.items" :key="index">
      <li>
        <div>
          <p>{{item.name}}</p>
          <p>{{item.amount}}</p>
          <p>{{item.unit}}</p>
          <p>{{item._id}}</p>
          <p>{{item.createdAt}}</p>
          <div @click="removeItem(item._id)">Eintrag entfernen</div>
        </div>
      </li>
    </ul>
    <div @click="removeAllItems()">Alle Einträge entfernen</div>
  </div>
</template>

<script lang="ts">
  import {defineComponent, watchEffect} from "@vue/composition-api";

export default defineComponent({
  name: "ListItem",
  setup(props: any, context: any) {

    const {$store, $bvToast} = context.root;

    const fields = [
      {
        key: 'name'
      },
      {
        key: 'amount'
      },
      {
        key: 'unit'
      }
    ]

    async function removeItem(id: string) {
      await $store.dispatch('removeItem', id)
    }

    async function removeAllItems() {
      await $store.dispatch('removeAllItems')
    }

    async function fetchData () {
      try {
        await $store.dispatch('fetchItems')
      } catch (e) {
        $bvToast.toast(e.message, {
          variant: 'danger',
          title: 'Error'
        });
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
      fields
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
