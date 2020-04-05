// import axios from "axios";
import UserService from "../../services/UserService";


const state = {
    loggedIn: false
};

const getters = {
    isLoggedIn: (state) => state.loggedIn
};

const actions = {
    async auth({ commit }, token) {
       commit('setAuth', await UserService.verifyToken(token));
    }
};

const mutations = {
    setAuth: (state, loggedIn) => {
        state.loggedIn = loggedIn
        return loggedIn;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};