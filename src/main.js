import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

// Bootstrap
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)

// Axios
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)

// FontAwesome 
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit, faTrashAlt, faEye, faSearch, faPlusCircle, faTimesCircle, faSave, faGripLinesVertical, faArrowsAlt, faSort, faEnvelope, faBell, faEyeSlash, faExclamationTriangle, faSignInAlt, faCheck, faFilePdf, faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faEdit, faTrashAlt, faEye, faSearch, faPlusCircle, faTimesCircle, faSave, faGripLinesVertical, faArrowsAlt, faSort, faEnvelope, faBell, faEyeSlash, faExclamationTriangle, faSignInAlt, faCheck, faFilePdf, faPaperPlane)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
