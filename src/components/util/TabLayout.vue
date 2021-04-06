<template>
  <div>
    <nav
      class="tab-bar navbar mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-menu">
        <slot />
        <div class="navbar-start">
          <a
            v-for="(name, i) in Object.keys(tabs)"
            :key="name"
            :class="['navbar-item', {'is-active': activeTab == i}]"
            @click="activeTab = i"
          >
            {{ name }}
          </a>
        </div>
      </div>
    </nav>

    <component
      :is="comp"
      v-for="(comp, name, i) in tabs"
      v-show="activeTab == i"
      :key="name"
    />
  </div>
</template>

<script>
export default {
  name: 'TabLayout',
  props: {
    tabs: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    activeTab: 0,
  }),
};
</script>
