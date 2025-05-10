import { createRouter, createWebHistory } from "vue-router";
import users from "./client";
import admin from "./admin";
import account from "./account";
import authRoutes from "./auth";

const routes = [...users, ...admin, ...account, ...authRoutes];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const publicPages = [
    "users-login",
    "admin-login",
    "users-register",
    "users-home",
  ];
  const authRequired = !publicPages.includes(to.name);
  const isLoggedIn = !!localStorage.getItem("auth_token");

  if (authRequired && !isLoggedIn) {
    return next({ name: "admin-login" });
  }

  next();
});

export default router;
