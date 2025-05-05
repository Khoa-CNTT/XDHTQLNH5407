const account = [
  {
    path: "/account",
    component: () => import("../layout/account/index.vue"),

    children: [
      {
        path: "login",
        name: "login",
        component: () => import("../pages/login/Home.vue"),
      },
      {
        path: "register",
        name: "register",
        component: () => import("../pages/register/Home.vue"),
      },
      {
        path: "forgot-password",
        name: "forgot-password",
        component: () => import("../pages/ForgotPassword/Home.vue"),
      },
    ],
  },
];

export default account;
