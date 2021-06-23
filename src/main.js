import Vue from 'vue'
import App from './App.vue'
import router from './routes'
import Vuetify from "vuetify";
Vue.use(Vuetify);

Vue.config.productionTip = false

new Vue({
  router,
  vuetify: new Vuetify(),
  render: h => h(App),
}).$mount('#app')
