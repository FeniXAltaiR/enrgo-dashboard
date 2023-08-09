import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import keycloak from '@/utils/keycloak'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import { ru } from 'vuetify/locale'

// DatePicker
import VueDatePicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  locale: {
    locale: 'ru',
    messages: { ru },
  },
})

keycloak.init({ onLoad: 'login-required' }).then(() => {
  createApp(App)
    .use(store)
    .use(router)
    .use(vuetify)
    .component('VueDatePicker', VueDatePicker)
    .mount('#app')
})
