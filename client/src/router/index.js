// For auth example, see https://github.com/vuejs/vue-router-demos/blob/master/examples/auth-flow/index.js

import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home";
import TheLogin from '../components/TheLogin';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home
        },
        {
            path: '/login',
            name: 'Login',
            component: TheLogin
        }
    ]
})

export default router;