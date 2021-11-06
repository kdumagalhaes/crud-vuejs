<template>
  <div class="search-author">
    <input
      type="search"
      name="search-author"
      id="search-author"
      placeholder="Insira o ID do autor..."
      v-model="searchInput"
    />
    <Button
      text="Pesquisar"
      height="50px"
      maxWidth="130px"
      backgroundColor="#6699cc"
      class="register-btn"
      @click="searchAuthor"
    />
    <Button
      text="Listar"
      height="50px"
      maxWidth="130px"
      backgroundColor="#6699cc"
      class="register-btn"
      @click="listAllAuthors"
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
  data() {
    return {
      searchInput: null,
      authorFiltered: null
    };
  },
  methods: {
    async listAllAuthors() {
      try {
        const response = await fetch("http://localhost:8000/api/authors");
        this.authors = await response.json();
        console.log("busquei e retornei");
      } catch (error) {
        console.error(error);
      }
    },
    async searchAuthor() {
      try {
        const response = await fetch(`http://localhost:8000/api/authors/${this.searchInput}`);
        this.authorFiltered = await response.json();
        console.log(this.authorFiltered);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-author {
  width: 100%;
  max-width: 450px;
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