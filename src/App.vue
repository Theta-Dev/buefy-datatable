<template>
  <div id="app">
    <div id="popovers" />
    <tabs v-model="tab">
      <template v-slot:brand>
        <a class="navbar-item">
          <img
            src="./assets/logo.png"
            alt="buefy-datatable"
          >
        </a>
      </template>

      <b-tab-item label="DataTable">
        <hello-world />
      </b-tab-item>

      <b-tab-item label="About">
        <div class="container">
          <div class="card">
            <div class="card-content">
              Lorem ipsum<br>
              dolor sit amet.
            </div>
          </div>
        </div>
      </b-tab-item>
    </tabs>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';
import Tabs from './components/Tabs.vue';

export default {
  name: 'App',
  components: {
    Tabs,
    HelloWorld,
  },
  data: () => ({
    tab: 0,
  }),
};
</script>
