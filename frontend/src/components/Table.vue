<template>
  <table class="table">
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>GitHub</th>
      <th>Twitter</th>
      <th>Localização</th>
      <th>Último artigo</th>
    </tr>
    <tr v-for="author in authors" :key="author.id">
      <td contenteditable="true">{{ author.name }}</td>
      <td contenteditable="true">{{ author.email }}</td>
      <td contenteditable="true">{{ author.github }}</td>
      <td contenteditable="true">
        {{ author.twitter }}
      </td>
      <td contenteditable="true">
        {{ author.location }}
      </td>
      <td contenteditable="true">
        {{ author.latest_article_published }}
      </td>
    </tr>
  </table>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      authors: "",
    };
  },
  methods: {
    async listAllAuthors() {
      try {
        const response = await fetch("http://localhost:8000/api/authors");
        this.authors = await response.json();
        this.showTable = true;
      } catch (error) {
        console.error(error);
      }
    },
  },
  created() {
    this.listAllAuthors();
  },
};
</script>

<style lang="scss" scoped>
.table {
  border-collapse: collapse;
  width: 100%;
  max-width: 1200px;
  margin: 50px auto;
  font-size: 0.8rem;
  text-align: center;
}

td,
th {
  border-top: 1px solid $primary-gray;
  text-align: left;
  padding: 20px 10px;
}

tr:nth-child(even) {
  background-color: $primary-gray;
}
</style>
