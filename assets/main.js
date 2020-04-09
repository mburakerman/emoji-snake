import Vue from 'vue';
import App from './src/App.vue';
import "normalize.css";
import "hammerjs";

new Vue({
    render: h => h(App)
}).$mount('#app')