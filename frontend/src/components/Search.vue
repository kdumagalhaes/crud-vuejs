<template>
  <div class="search-author">
    <input type="search" name="search-author" id="search-author" placeholder="Insira o ID do autor..." />
    <Button
      text="Pesquisar"
      height="50px"
      maxWidth="130px"
      backgroundColor="#6699cc"
      class="register-btn"
    />
  </div>
</template>

<script>
//components
import Button from "./Button.vue";

export default {
  name: "Sarch",
  components: {
    Button,
  },
};
</script>

<style lang="scss" scoped>
.search-author {
  width: 100%;
  max-width: 300px;
  display: flex;
  justify-content: space-between;

  input {
    height: 50px;
    margin-bottom: 15px;
    padding-left: 10px;
    border: 1px solid $primary-gray;
    border-radius: 5px;
  }
}
</style>