<template>
  <div class="container">
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
            @click="deleteAuthor(author.id)"
          />
        </td>
      </tr>
    </table>
  </div>
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
      } catch (error) {
        console.error(error);
      }
    },
    deleteAuthor(id) {
      try {
        fetch(`http://localhost:8000/api/authors/${id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.listAllAuthors();
  },
};
</script>

<style lang="scss" scoped>
.container {
  padding: 0 80px;
}

.table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 50px;
  font-size: 0.85rem;
  text-align: center;
}

td,
th {
  color: $dark-gray;
  padding: 10px 0;
  text-align: left;
}

td {
  &:first-child {
    padding-left: 10px;
  }
}

th {
  &:last-child {
    text-align: center;
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
