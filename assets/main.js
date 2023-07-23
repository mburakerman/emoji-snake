import Vue from "vue";
import App from "./src/App.vue";
import "normalize.css";
import "hammerjs";
import VueSweetalert2 from "vue-sweetalert2";

Vue.use(VueSweetalert2);
new Vue({
  render: (h) => h(App),
}).$mount("#app");
