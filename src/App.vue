<template>
  <div id="app">
    <div id="popovers" />
    <section class="hero is-default is-bold">
      <div class="hero-head">
        <b-navbar>
          <template #brand>
            <b-navbar-item>
              <img
                src="./assets/logo.png"
                alt="buefy-datatable"
              >
            </b-navbar-item>
          </template>
          <template #start>
            <b-navbar-item href="#">
              Home
            </b-navbar-item>
            <b-navbar-item href="#">
              Documentation
            </b-navbar-item>
            <b-navbar-dropdown label="Info">
              <b-navbar-item href="#">
                About
              </b-navbar-item>
              <b-navbar-item href="#">
                Contact
              </b-navbar-item>
            </b-navbar-dropdown>
          </template>

          <template #end>
            <b-navbar-item tag="div">
              <div class="buttons">
                <a class="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a class="button is-light">
                  Log in
                </a>
              </div>
            </b-navbar-item>
          </template>
        </b-navbar>
      </div>
      <div class="hero-body">
        <hello-world />
      </div>

      <div class="hero-foot">
        <div class="container">
          <div class="tabs is-centered">
            <ul>
              <li>And this is the bottom</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue';

export default {
  name: 'App',
  components: {
    HelloWorld,
  },
};
</script>
