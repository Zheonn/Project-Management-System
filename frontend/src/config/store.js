import {createStore} from 'vuex'

export default createStore({
    state: {
        logged: false
    },
    mutations: {
        setLogged(state, value) {
            state.logged = value
        }

    },
   
})