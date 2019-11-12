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
import { faEdit, faTrashAlt, faEye, faSearch, faPlusCircle, faTimesCircle, faSave, faGripLinesVertical, faArrowsAlt, faSort, faEnvelope, faBell, faEyeSlash, faExclamationTriangle, faSignInAlt, faCheck, faFilePdf, faPaperPlane, faInfoCircle, faLock, faTasks, faClock, faUndo, faListAlt, faCheckDouble, faCloudDownloadAlt, faHeadphonesAlt, faEnvelopeOpen, faCalendarCheck, faBold, faItalic, faStrikethrough, faUnderline, faCode, faPrint, faPlus, faTimes, faThumbsUp, faThumbsDown, faAngleDoubleDown, faAngleDoubleUp, faCaretSquareDown, faDoorOpen, faCopy, faBan } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faEdit, faTrashAlt, faEye, faSearch, faPlusCircle, faTimesCircle, faSave, faGripLinesVertical, faArrowsAlt, faSort, faEnvelope, faBell, faEyeSlash, faExclamationTriangle, faSignInAlt, faCheck, faFilePdf, faPaperPlane, faInfoCircle, faLock, faTasks, faClock, faUndo, faListAlt, faCheckDouble, faCloudDownloadAlt, faHeadphonesAlt,  faEnvelopeOpen, faCalendarCheck, faBold, faItalic, faStrikethrough, faUnderline, faCode, faPrint, faPlus, faTimes, faThumbsUp, faThumbsDown, faAngleDoubleDown, faAngleDoubleUp, faCaretSquareDown, faDoorOpen, faCopy, faBan)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

Vue.use(VueTimepicker)

// const $ = require('jquery')

// import datePicker from 'vue-bootstrap-datetimepicker';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'pc-bootstrap4-datetimepicker/build/css/bootstrap-datetimepicker.css';

// $.extend(true, $.fn.datetimepicker.defaults, {
//   icons: {
//     time: 'far fa-clock',
//     date: 'far fa-calendar',
//     up: 'fas fa-arrow-up',
//     down: 'fas fa-arrow-down',
//     previous: 'fas fa-chevron-left',
//     next: 'fas fa-chevron-right',
//     today: 'fas fa-calendar-check',
//     clear: 'far fa-trash-alt',
//     close: 'far fa-times-circle'
//   }
// });

// Vue.use(datePicker);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
