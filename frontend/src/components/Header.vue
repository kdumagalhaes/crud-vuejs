<template>
  <header class="header">
    <h1 class="logo">Controle de autores</h1>
    <Search />
  </header>
</template>

<script>
// components
import Search from "./Search.vue"

export default {
  name: "Header",
  components: {
    Search,
  }
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.logo {
  color: $dark-gray;
}
</style>
