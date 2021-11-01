<template>
  <div class="app">
    <Header />
    <Table />
  </div>
</template>

<script>
// components
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";

export default {
  name: "App",
  components: {
    Header,
    Table,
  },
};
</script>

<style lang="scss"></style>
