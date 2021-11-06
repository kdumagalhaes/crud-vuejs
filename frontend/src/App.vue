<template>
  <div class="app">
    <div class="top-container">
      <input
        type="search"
        name="search-author"
        id="search-author"
        v-model="authorTerm"
        class="search-input"
        placeholder="ID"
      />
      <button class="btn btn-search" @click="listAllAuthors">Listar</button>
    </div>
    <table v-if="showTable" class="table">
      <tr>
        <th>id</th>
        <th>Nome</th>
        <th>Email</th>
        <th>GitHub</th>
        <th>Twitter</th>
        <th>Localização</th>
        <th>Último artigo</th>
        <th>Ações</th>
      </tr>
      <tr v-for="author in authors" :key="author.id">
        <td class="id">
          {{ author.id }}
        </td>
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
        <td class="latest-article">
          {{ author.latest_article_published }}
        </td>
        <td class="action-column">
          <button @click="getAuthor(author)" class="edit btn-action">
            <img src="@/assets/icons/edit.svg" alt="edit" />
          </button>
          <button @click="deleteAuthor(author.id)" class="delete btn-action">
            <img src="@/assets/icons/delete.svg" alt="delete" />
          </button>
        </td>
      </tr>
    </table>
    <form action="" class="form" v-on:submit.prevent>
      <div class="divisor">
        <label for="name">Nome:</label>
        <input
          type="text"
          name="name"
          id="name"
          placeholder="Uncle Bob"
          required
          v-model="authorData.name"
        />
        <label for="email">Email:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="unclebob@email.com"
          required
          v-model="authorData.email"
        />
        <label for="github">Github:</label>
        <input
          type="text"
          name="github"
          id="github"
          placeholder="uncle-bob"
          required
          v-model="authorData.github"
        />
      </div>
      <div class="divisor">
        <label for="twitter">Twitter:</label>
        <input
          type="text"
          name="twitter"
          id="twitter"
          placeholder="@unclebob"
          required
          v-model="authorData.twitter"
        />
        <label for="location">Localização:</label>
        <input
          type="text"
          name="location"
          id="location"
          placeholder="São Francisco"
          required
          v-model="authorData.location"
        />
        <label for="latest_article_published">Último artigo</label>
        <input
          type="text"
          name="latest_article_published"
          id="latest_article_published"
          placeholder="Clean Code"
          required
          v-model="authorData.latest_article_published"
        />
        <div class="btn-container">
          <button
            v-if="showEditButton"
            @click="editAuthor(authorData.id)"
            class="btn btn-edit"
          >
            Atualizar
          </button>
          <button class="btn btn-register" @click="registerAuthor">Novo</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
// axios
import axios from "axios";

export default {
  name: "App",
  data() {
    return {
      showEditButton: false,
      showTable: false,
      authors: [],
      authorTerm: null,
      authorData: {
        id: null,
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
      this.showTable = true;
      if (this.authorTerm === null || this.authorTerm === '') {
        const response = await fetch("http://localhost:8000/api/authors");
        this.authors = await response.json();
        console.log(this.authors);
      } else {
        this.authors = [];
        const response = await fetch(
          `http://localhost:8000/api/authors/${this.authorTerm}`
        );
        const autor = await response.json();
        this.authors.push(autor);
        console.log(this.authors);
      }
    },
    registerAuthor() {
      try {
        fetch("http://localhost:8000/api/authors", {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(this.authorData),
        })
          .then(() => this.listAllAuthors())
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
    getAuthor(author) {
      this.authorData.id = author.id;
      this.authorData.name = author.name;
      this.authorData.email = author.email;
      this.authorData.github = author.github;
      this.authorData.twitter = author.twitter;
      this.authorData.location = author.location;
      this.authorData.latest_article_published =
        author.latest_article_published;
      this.showEditButton = true;
    },
    async editAuthor(id) {
      const res = await axios.put(
        `http://localhost:8000/api/authors/${id}`,
        this.authorData
      );
      this.listAllAuthors()
      this.authorData = {}
      this.showEditButton = false
      res.data.json;
    },
  },
};
</script>

<style lang="scss">
.top-container {
  margin: 40px 0;
  display: flex;
  justify-content: center;
}

.search-input {
  width: 100%;
  max-width: 100px;
  background: transparent;
  border: none;
  border-bottom: 1px solid #444;
  font-size: 1.3rem;
  padding-left: 20px;
  margin-right: 20px;
}

.search-input {
  height: 50px;
}

.btn {
  height: 50px;
  border: none;
  font-weight: bold;
  color: #fff;
  border-radius: 4px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  font-size: 1.1rem;
  transition: 0.3s;
  padding: 0 20px;

  &:hover {
    box-shadow: none;
  }
}

.btn-search {
  background-color: #6699cc;
}

.table {
  width: 100%;
  max-width: 1200px;
  font-size: 0.85rem;
  text-align: center;
  margin: 0 auto 40px auto;
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

.btn-action {
  background: transparent;
  border: none;
  margin: 6px;
  transform: scale(1);
  transition: all 0.3s;

  &:hover {
    transform: scale(1.2);
  }
}

.form {
  display: flex;
  width: 100%;
  margin-bottom: 80px;
  padding: 30px 0;
  justify-content: center;

  label {
    margin: 0 0 5px 5px;
    font-weight: $bold;
    color: $dark-gray;
  }

  input {
    width: 300px;
    height: 40px;
    margin-bottom: 15px;
    padding-left: 10px;
    border: 1px solid $primary-gray;
    border-radius: 5px;
  }
}

.divisor {
  display: flex;
  flex-direction: column;
  margin-right: 30px;

  &:last-child {
    margin: 0;
  }
}

.btn-container {
  display: flex;
  justify-content: flex-end;
}

.btn-register {
  background-color: #6699cc;
}

.btn-edit {
  background-color: #23c552;
  margin-right: 10px;
}
</style>
