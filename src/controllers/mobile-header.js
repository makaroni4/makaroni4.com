import Vue from 'vue';
import MobileHeader from '../components/MobileHeader.vue';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(MobileHeader),
}).$mount('#js-mobile-header');
