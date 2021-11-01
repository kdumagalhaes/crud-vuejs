<template>
  <div class="app">
    <Header />
    <Table />
    <Modal />
  </div>
</template>

<script>
// components
import Header from "./components/Header.vue";
import Table from "./components/Table.vue";
import Modal from "./components/Modal.vue";

export default {
  name: "App",
  components: {
    Header,
    Table,
    Modal,
  },
};
</script>

<style lang="scss"></style>
