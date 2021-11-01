<template>
  <div v-if="showButton" class="modal">
    <button @click="closeModal" class="close">X</button>
  </div>
</template>

<script>
export default {
  name: "Modal",
  data() {
    return {
      showButton: true,
    };
  },
  methods: {
    closeModal() {
      this.showButton = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.modal {
  width: 300px;
  height: 100vh;
  background-color: $primary-gray;
  position: absolute;
  right: 0;
  top: 0;
  box-shadow: -11px 0px 15px -6px rgba(0, 0, 0, 0.35);
}

.close {
  border-radius: 3px;
  border: none;
  color: $light-gray;
  font-weight: $bold;
  padding: 5px;
  margin: 10px;
  background-color: $error-red;
}
</style>