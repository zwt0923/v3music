import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../pages/Home.vue";

const routes = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
  },
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
router.beforeEach((to, from) => {
  return true;
});
