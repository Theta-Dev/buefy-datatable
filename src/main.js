// Assets
import './style/package.sass';

// Libraries
import Vue from 'vue';
import VTooltip from 'v-tooltip';

// Components
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use(VTooltip, {
  defaultContainer: false,
  autoHide: false,
  defaultBoundariesElement: document.body,
  popover: {
    defaultContainer: '#popovers',
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
