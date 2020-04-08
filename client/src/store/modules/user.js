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
        const payload = UserService.guard(token);
        commit('setAuth', await payload);
        return payload;
    },
    async login({ commit }, creds) {
        const res = await UserService.login(creds);
        const { _id, name, email } = res.user;
        commit('setUser', { user: { _id, name, email } })
        return res.message;
    },
    async signup({ commit }, newUser) {
        const created = await UserService.createUser(newUser);
        const res = await UserService.login(newUser);
        const { _id, name, email } = res.user;
        commit('setUser', { user: { _id, name, email } })
        return created.message;
    },
    async logout({ commit }) {
        await UserService.logout();
        commit('setAuth', false)
    }
};

const mutations = {
    setAuth: (state, payload) => {
        state.loggedIn = payload.auth
        if (!payload.auth) return state.userInfo = "";
        state.userInfo = payload.userInfo
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