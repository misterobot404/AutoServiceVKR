import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "./pages/Home";
import Record from "./pages/Record";
import Dev from "./pages/Dev";
import Account from "./pages/Account";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: 'history',
    routes: [
        {
            name: "Home",
            path: '/',
            component: Home
        },
        {
            path: '/dev',
            component: Dev
        },
        {
            name: "Record",
            path: '/record',
            component: Record
        },
        {
            path: '/account',
            component: Account
        },

    ],
});

export default router
