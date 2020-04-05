import UserService from "../../services/UserService";

const state = {
    loggedIn: (async () => await UserService.guard())(),
    userInfo: { name: "Guest User" }
};

const getters = {
    authStatus: (state) => state.loggedIn,
    userInfo: (state) => state.userInfo
};

const actions = {
    async auth({ commit }, token) {
        const _token = UserService.guard(token);
        commit('setAuth', await _token);
        return _token;
    },
    async login({ commit }, creds) {
        const res = await UserService.login(creds);
        const { _id, name, email } = res.user;
        commit('setUser', { user: { _id, name, email } })
        return res.message;
    },
    async logout({ commit }) {
        await UserService.logout();
        commit('setAuth', false)
    }
};

const mutations = {
    setAuth: (state, loggedIn) => {
        state.loggedIn = loggedIn
        if (!loggedIn) state.userInfo = "";
    },
    setUser: (state, { user }) => {
        state.userInfo = user;
        state.loggedIn = true;
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};