<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <CreateItem />
  </div>
</template>

<script>
// @ is an alias to /src
import CreateItem from "@/components/Item/CreateItem";

export default {
  name: "Home",
  components: {
    CreateItem
  }
};
</script>
