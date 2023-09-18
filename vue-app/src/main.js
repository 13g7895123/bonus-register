import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import route from "./router"
import 'vuetify/dist/vuetify.min.css';
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

loadFonts()

const app = createApp(App)
app.use(vuetify)
app.use(route)
app.component('VueDatePicker', VueDatePicker)
app.mount('#app')
