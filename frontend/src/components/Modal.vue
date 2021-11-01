<template>
  <div v-if="isModal" class="modal">
    <button @click="closeModal" class="close">X</button>
    <form action="" class="form">
      <label for="name">Nome:</label>
      <input
        type="text"
        name="name"
        id="name"
        placeholder="Uncle Bob"
        required
        autofocus
      />
      <label for="email">Email:</label>
      <input
        type="email"
        name="email"
        id="email"
        placeholder="unclebob@email.com"
        required
      />
      <label for="github">Github:</label>
      <input
        type="text"
        name="github"
        id="github"
        placeholder="uncle-bob"
        required
      />
      <label for="twitter">Twitter:</label>
      <input
        type="text"
        name="twitter"
        id="twitter"
        placeholder="@unclebob"
        required
      />
      <label for="localization">Localização:</label>
      <input
        type="text"
        name="localization"
        id="localization"
        placeholder="São Francisco"
        required
      />
      <label for="last-article">Último artigo</label>
      <input
        type="text"
        name="last-article"
        id="last-article"
        placeholder="Clean Code"
        required
      />
      <Button
        text="Cadastrar autor"
        height="50px"
        maxWidth="500px"
        backgroundColor="#6699cc"
      />
    </form>
  </div>
</template>

<script>
// components
import Button from "./Button.vue";

export default {
  name: "Modal",
  components: {
    Button,
  },
  methods: {
    closeModal() {
      this.$store.dispatch("closeModal");
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
  padding: 10px;
}

.close {
  border-radius: 3px;
  border: none;
  color: $light-gray;
  font-weight: $bold;
  padding: 5px;
  background-color: $error-red;
  margin-bottom: 30px;
}

.form {
  display: flex;
  flex-direction: column;

  label {
    margin-bottom: 5px;
    font-weight: $bold;
    color: $dark-gray;
  }

  input {
    height: 40px;
    margin-bottom: 15px;
    padding-left: 10px;
    border: 1px solid $primary-gray;
  }
}
</style>