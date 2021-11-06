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
        </td>
        <td class="email">
          {{ author.email }}
        </td>
        <td class="github">
          {{ author.github }}
        </td>
        <td class="twitter">
          {{ author.twitter }}
        </td>
        <td class="location">
          {{ author.location }}
        </td>
        <td v-bind="authorData.latest_article_published" class="latest-article">
          {{ author.latest_article_published }}
        </td>
        <td class="action-column">
          <button class="edit btn"><img src="@/assets/icons/edit.svg" alt="edit"></button>
          <button @click="deleteAuthor(author.id)" class="delete btn"><img src="@/assets/icons/delete.svg" alt="delete"></button>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>

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
            console.log(data);
            console.log(this.authorData);
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
.table {
  width: 100%;
  font-size: 0.85rem;
  text-align: center;
}

td,
th {
  color: $dark-gray;
  text-align: left;
}

td {
  padding: 0 10px;
  height: 40px;
}

th {
  padding-bottom: 10px;
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
  margin: auto;
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

.btn {
  border: none;
  background: transparent;
}
</style>
