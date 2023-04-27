import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faPenToSquare, faHeart, faTrash, faMagnifyingGlass, faUserTie, faDesktop, faGear, faHammer, faFolder} from '@fortawesome/free-solid-svg-icons'
import store from './config/store'

library.add(faPenToSquare, faHeart, faTrash, faMagnifyingGlass, faUserTie, faDesktop, faGear, faHammer, faFolder)

createApp(App).use(router).use(store).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
