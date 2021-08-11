import Vue from 'vue'
import Vuex, {ActionHandler} from 'vuex'
import {State} from "../models/State";
import {setUserMutation} from "@/store/mutations/user.mutations";
import {setUser} from "@/store/actions/user.actions";

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        user: null,
    } as State,
    mutations: {
        setUserMutation: setUserMutation,
    },
    actions: {
        setUser: setUser,
    },
    modules: {}
})

