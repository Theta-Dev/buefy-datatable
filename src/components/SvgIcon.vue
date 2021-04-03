<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="customClass"
    :style="`height: ${size}px; width: ${size}px;`"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <path :d="svg" />
  </svg>
</template>

<script>
export default {
  props: {
    icon: {
      type: Array,
      required: true,
    },
    size: {
      type: String,
      default: '24',
    },
    customClass: {
      type: String,
      default: '',
    },
  },
  computed: {
    svg() {
      return this.icon[1].replace(/^mdi-/, '');
    },
  },
};
</script>

<style>
.icon > svg {
  color: inherit
}
</style>
