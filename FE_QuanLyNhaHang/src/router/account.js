const account = [
  {
    path: "/account/login",
    name: "login",
    component: () => import("../pages/login/Home.vue"),
  },
  {
    path: "/account/register",
    name: "register",
    component: () => import("../pages/register/Home.vue"),
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("../pages/ForgotPassword/Home.vue"),
  },
  {
    path: "/",
    redirect: "/account/login",
  },
];

export default account;
