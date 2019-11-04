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
import { faEdit, faTrashAlt, faEye, faSearch, faPlusCircle, faTimesCircle, faSave, faGripLinesVertical, faArrowsAlt, faSort, faEnvelope, faBell, faEyeSlash, faExclamationTriangle, faSignInAlt, faCheck, faFilePdf, faPaperPlane, faInfoCircle, faLock, faTasks, faClock, faUndo, faListAlt, faCheckDouble, faCloudDownloadAlt, faHeadphonesAlt, faEnvelopeOpen, faCalendarCheck, faBold, faItalic, faStrikethrough, faUnderline, faCode, faPrint, faPlus, faTimes, faThumbsUp, faThumbsDown, faAngleDoubleDown, faAngleDoubleUp, faCaretSquareDown, faDoorOpen, faCopy } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faEdit, faTrashAlt, faEye, faSearch, faPlusCircle, faTimesCircle, faSave, faGripLinesVertical, faArrowsAlt, faSort, faEnvelope, faBell, faEyeSlash, faExclamationTriangle, faSignInAlt, faCheck, faFilePdf, faPaperPlane, faInfoCircle, faLock, faTasks, faClock, faUndo, faListAlt, faCheckDouble, faCloudDownloadAlt, faHeadphonesAlt,  faEnvelopeOpen, faCalendarCheck, faBold, faItalic, faStrikethrough, faUnderline, faCode, faPrint, faPlus, faTimes, faThumbsUp, faThumbsDown, faAngleDoubleDown, faAngleDoubleUp, faCaretSquareDown, faDoorOpen, faCopy)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

Vue.use(VueTimepicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
