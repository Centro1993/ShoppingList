<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <CreateItem />
    {{this.items}}
  </div>
</template>

<script>
// @ is an alias to /src
import CreateItem from "@/components/Item/CreateItem";
import {Watch} from "vue-property-decorator";

export default {
  name: "Home",
  components: {
    CreateItem
  },
  computed: {
    items () {
      return this.$store.state.items
    }
  },
  watch: {
    '$route': {
      immediate: true,
      handler: 'fetchData'
    }
  },
  methods: {
    @Watch('$route', { immediate: true, deep: true })
    async fetchData () {
      await this.$store.dispatch('fetchItems')
    }
  }
};
</script>
