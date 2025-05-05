import { createRouter, createWebHistory } from "vue-router";
import users from "./client";
import admin from "./admin";
import account from "./account";

const routes = [...users, ...admin, ...account];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
