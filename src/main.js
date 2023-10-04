import { createApp } from 'vue'
import axios from 'axios'
import App from './App.vue'
import './app.css'
import '@fontsource-variable/shantell-sans';
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

axios.defaults.withCredentials = true
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest"
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API

const app = createApp(App)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')