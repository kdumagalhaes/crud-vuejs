<template>
  <div class="container">
    <h3 v-if="showWarning" class="warning">
      Ainda não há autores cadastrados.
    </h3>
    <table v-if="showTable" class="table">
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
        <td contenteditable="true" v-bind="authorData.name" class="name">
          {{ author.name }}
        </td>
        <td contenteditable="true" v-bind="authorData.email" class="email">
          {{ author.email }}
        </td>
        <td contenteditable="true" v-bind="authorData.github" class="github">
          {{ author.github }}
        </td>
        <td contenteditable="true" v-bind="authorData.twitter" class="twitter">
          {{ author.twitter }}
        </td>
        <td
          contenteditable="true"
          v-bind="authorData.location"
          class="location"
        >
          {{ author.location }}
        </td>
        <td
          contenteditable="true"
          v-bind="authorData.latest_article_published"
          class="latest-article"
        >
          {{ author.latest_article_published }}
        </td>
        <td class="action-column">
          <Button
            text="Editar"
            backgroundColor="#b8a200"
            height="50px"
            maxWidth="85px"
            @click="editAuthor(author.id)"
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
      showWarning: false,
      showTable: true,
      authorData: {
        name: "",
        email: "",
        github: "",
        twitter: "",
        location: "",
        latest_article_published: "",
      },
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
        if (this.authors.length === 0) {
          this.showWarning = true;
          this.showTable = false;
        } else {
          this.showWarning = false;
          this.showTable = true;
        }
      } catch (error) {
        console.error(error);
      }
    },
    deleteAuthor(id) {
      try {
        fetch(`http://localhost:8000/api/authors/${id}`, {
          method: "DELETE",
        }).then(() => this.listAllAuthors());
      } catch (error) {
        console.log(error);
      }
    },
    editAuthor(id) {
      try {
        fetch(`http://localhost:8000/api/authors/${id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(this.authorData),
        });
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

.warning {
  text-align: center;
  margin-top: 120px;
  color: $dark-gray;
}

.email {
  max-width: 160px;
}

.name,
.location,
.latest-article,
.github,
.twitter {
  max-width: 100px;
}
</style>
