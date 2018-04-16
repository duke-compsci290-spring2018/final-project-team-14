import 'bootstrap/dist/css/bootstrap.css'
import './assets/css/style.css'

import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
    el: '#app',
    components: {
        App
    },
    template: '<App/>'
})
