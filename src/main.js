import Vue from "vue";
import Vuetify from "vuetify";
import App from "./App.vue";
import "vuetify/dist/vuetify.min.css";
import VuetifyDialog from "vuetify-dialog";

Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VuetifyDialog);

new Vue({
  render: h => h(App)
}).$mount("#app");
