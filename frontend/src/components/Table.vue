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
        <td contenteditable="true" class="name">
          <input
            name="name"
            id="name"
            type="text"
            v-bind="authorData.name"
            v-model="author.name"
          />
        </td>
        <td contenteditable="true" class="email">
          <input
            name="email"
            id="email"
            type="email"
            v-bind="authorData.email"
            v-model="author.email"
          />
        </td>
        <td contenteditable="true" class="github">
          <input
            name="github"
            id="github"
            type="text"
            v-bind="authorData.github"
            v-model="author.github"
          />
        </td>
        <td contenteditable="true" class="twitter">
          <input
            name="twitter"
            id="twitter"
            type="text"
            v-bind="authorData.twitter"
            v-model="author.twitter"
          />
        </td>
        <td contenteditable="true" class="location">
          <input
            name="location"
            id="location"
            type="text"
            v-bind="authorData.location"
            v-model="author.location"
          />
        </td>
        <td
          contenteditable="true"
          v-bind="authorData.latest_article_published"
          class="latest-article"
        >
          <input
            name="latest-article"
            id="latest-article"
            type="text"
            v-bind="authorData.latest_article_published"
            v-model="author.latest_article_published"
          />
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

td,
th {
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
