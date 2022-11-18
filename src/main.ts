import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap.js'
import axios from 'axios'

const app = createApp(App);

app.provide('axios', app.config.globalProperties.axios)

createApp(App).use(store).use(router).mount('#app')
