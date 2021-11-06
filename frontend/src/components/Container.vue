<template>
  <section class="container">
    <Form />
    <Table />
  </section>
</template>

<script>
// components
import Form from "./Form.vue";
import Table from "./Table.vue";

export default {
  name: "Container",
  components: {
    Form,
    Table,
  },
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  width: 100%;
  padding: 20px 40px 0 40px;
  align-items: flex-start;
}
</style>