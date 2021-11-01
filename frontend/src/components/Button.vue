<template>
  <button
    class="button"
    :style="{
      '--backgroundColor': backgroundColor,
      '--height': height,
      '--maxWidth': maxWidth,
    }"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      required: true,
    },
    backgroundColor: {
      type: String,
      required: false,
    },
    height: {
      type: String,
      required: false,
    },
    maxWidth: {
      type: String,
      required: false,
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  width: 100%;
  max-width: var(--maxWidth);
  height: var(--height);
  border-radius: 4px;
  border: none;
  color: $light-gray;
  font-size: 1.2rem;
  background-color: var(--backgroundColor);
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.4s;

  &:hover {
      box-shadow: none;
      transform: scale(0.99);
  }
}
</style>