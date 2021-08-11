import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import {getCurrentUserFirebase} from "@/firebase";
import Login from "@/views/Login.vue";
import Register from "@/views/Register.vue";

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'Dashboard',
    component: Home
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {requiresLogin: false}
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {requiresLogin: false}
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresLogin);
  const user = await getCurrentUserFirebase()
  if (requiresAuth && !user) {
    next('Login');
  } else {
    next();
  }
});

export default router
