// Assets
// import 'buefy/dist/buefy.css';
import './style/buefy-custom.sass';

// Libraries
import Vue from 'vue';
import Buefy from 'buefy';
import VTooltip from 'v-tooltip';

// Components
import App from './App.vue';
import SvgIcon from './components/SvgIcon.vue';

Vue.config.productionTip = false;

Vue.component('svg-icon', SvgIcon);

Vue.use(Buefy, {
  defaultIconComponent: 'svg-icon',
  defaultIconPack: 'svg',
  customIconPacks: {
    md: {
      sizes: {
        default: '24',
        'is-small': '16',
        'is-medium': '24',
        'is-large': '48',
      },
    },
  },
});

Vue.use(VTooltip, {
  defaultContainer: false,
  autoHide: false,
  popover: {
    defaultContainer: '#popovers',
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
