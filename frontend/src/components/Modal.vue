<template>
  <transition
    enter-active-class="animate__animated animate__fadeInRight"
    leave-active-class="animate__animated animate__fadeOutRight"
  >
    <div v-if="isModal" class="modal">
      <button @click="closeModal" class="close">X Fechar</button>
      <form action="" class="form" v-on:submit.prevent="registerAuthor">
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
        <Button
          text="Cadastrar autor"
          height="50px"
          maxWidth="500px"
          backgroundColor="#6699cc"
          class="register-btn"
        />
      </form>
    </div>
  </transition>
</template>

<script>
// components
import Button from "./Button.vue";

export default {
  name: "Modal",
  data() {
    return {
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
    closeModal() {
      this.$store.dispatch("closeModal");
    },
    async listAllAuthors() {
      try {
        const response = await fetch("http://localhost:8000/api/authors");
        this.authors = await response.json();
        console.log("busquei e retornei");
      } catch (error) {
        console.error(error);
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
        .then(() => location.reload());
      } catch (error) {
        console.error(error);
      }
    },
  },
  computed: {
    isModal() {
      return this.$store.state.isModal;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 500px;
  height: 100vh;
  background-color: $light-gray;
  position: absolute;
  right: 0;
  top: 0;
  box-shadow: -11px 0px 15px -6px rgba(71, 71, 71, 0.35);
  padding: 20px;
}

.close {
  border-radius: 3px;
  border: none;
  color: $light-gray;
  font-weight: $bold;
  padding: 5px;
  background-color: $error-red;
  margin-bottom: 30px;
  transition: background-color 0.6s;

  &:hover {
    background-color: #a50000;
  }
}

.form {
  display: flex;
  flex-direction: column;

  label {
    margin: 0 0 5px 5px;
    font-weight: $bold;
    color: $dark-gray;
  }

  input {
    height: 40px;
    margin-bottom: 15px;
    padding-left: 10px;
    border: 1px solid $primary-gray;
    border-radius: 5px;
  }
}

.register-btn {
  margin-top: 20px;
}
</style>