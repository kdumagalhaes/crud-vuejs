<template>
  <div class="app">
    <Header />
    <Form />
  </div>
</template>

<script>
// components
import Header from "./components/Header.vue";
import Form from "./components/Form.vue";

export default {
  name: "App",
  components: {
    Header,
    Form,
  },
};
</script>

<style lang="scss">
</style>
