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
        <td class="name">
          {{ author.name }}
          <input
            name="name"
            id="name"
            type="text"
            v-model="author.name"
            :key="authorData.id"
          />
        </td>
        <td class="email">
          {{ author.email }}
          <input
            name="email"
            id="email"
            type="email"
            v-model="authorData.email"
            :key="author.id"
          />
        </td>
        <td class="github">
          {{ author.github }}
          <input
            name="github"
            id="github"
            type="text"
            v-model="authorData.github"
            :key="author.id"
          />
        </td>
        <td class="twitter">
          {{ author.twitter }}
          <input
            name="twitter"
            id="twitter"
            type="text"
            v-model="authorData.twitter"
            :key="author.id"
          />
        </td>
        <td class="location">
          {{ author.location }}
          <input
            name="location"
            id="location"
            type="text"
            v-model="authorData.location"
            :key="author.id"
          />
        </td>
        <td v-bind="authorData.latest_article_published" class="latest-article">
          {{ author.latest_article_published }}
          <input
            name="latest-article"
            id="latest-article"
            type="text"
            v-model="authorData.latest_article_published"
            :key="author.id"
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
      authors: [],
      showWarning: false,
      showTable: true,
      authorData: {
        name: null,
        email: null,
        github: null,
        twitter: null,
        location: null,
        latest_article_published: null,
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
          body: JSON.stringify(this.author),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data)
            console.log(this.authorData)
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
