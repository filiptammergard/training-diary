import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from "@/store";
import { auth } from "@/firebaseConfig";
import Dashboard from '@/views/Dashboard.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('@/views/Auth.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  auth.onAuthStateChanged(user => {
    store.commit("setLoggedInUser", user);
    console.log(user);
    if (!user && to.path !== "/auth")
      next("/auth");
    else if (user && to.path === "/auth")
      next("/")
    else
      next();
  })
})

export default router
