<template>
  <span class="icon">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      :style="`height: ${size}px; width: ${size}px;`"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path :d="icon" />
    </svg>
  </span>
</template>

<script>
export default {
  name: 'SvgIcon',
  props: {
    icon: {
      type: String,
      required: true,
    },
    size: {
      type: String,
      default: '24',
    },
  },
};
</script>

<style>
.icon > svg {
  color: inherit;
  fill: currentColor;
}
</style>
