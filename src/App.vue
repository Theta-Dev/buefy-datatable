<template>
  <div id="app">
    <div id="popovers" />
    <tab-layout :tabs="tabs">
      <a class="navbar-item logo">
        <img
          src="./assets/logo.png"
          alt="buefy-datatable"
        >
      </a>
    </tab-layout>
  </div>
</template>

<script>
import TabLayout from './components/util/TabLayout.vue';
import HelloWorld from './views/HelloWorld.vue';
import LoremIpsum from './views/LoremIpsum.vue';

export default {
  name: 'App',
  components: { TabLayout },

  data: () => ({
    tabs: {
      HelloWorld,
      LoremIpsum,
    },
    test: true,
  }),
};
</script>
