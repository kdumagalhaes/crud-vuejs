<template>
  <table class="table">
    <tr>
      <th>Nome</th>
      <th>Email</th>
      <th>GitHub</th>
      <th>Twitter</th>
      <th>Localização</th>
      <th>Último artigo</th>
      <th>Ações</th>
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
      <td class="action-column">
        <Button
          text="Editar"
          backgroundColor="#b8a200"
          height="50px"
          maxWidth="85px"
        />
        <Button
          text="Apagar"
          backgroundColor="#ff0000"
          height="50px"
          maxWidth="85px"
        />
      </td>
    </tr>
  </table>
</template>

<script>
// components
import Button from "./Button.vue";
export default {
  name: "Table",
  data() {
    return {
      authors: "",
    };
  },
  components: {
    Button,
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
  font-size: 0.85rem;
  text-align: center;
}

td,
th {
  text-align: left;
  color: $dark-gray;
  padding: 10px 0;
}

td {
    &:first-child {
        padding-left: 10px;
    }
}

tr:nth-child(even) {
  background-color: $primary-gray;
}

.action-column {
  display: flex;
  justify-content: space-evenly;
}
</style>
