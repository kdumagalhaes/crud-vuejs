<template>
  <header class="header">
    <h1 class="logo">Controle de autores</h1>
    <Button
      text="+ Adicionar autor"
      backgroundColor="#6699cc"
      height="50px"
      maxWidth="200px"
    />
  </header>
</template>

<script>
// components
import Button from "./Button.vue";
export default {
  name: "Header",
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-around;
  padding: 20px 40px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.logo {
  color: $blue-gray;
}
</style>
