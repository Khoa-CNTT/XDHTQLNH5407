const admin = [
  {
    path: "/admin",
    component: () => import("../layout/admin/index.vue"),
    children: [
      {
        path: "",
        name: "home",
        component: () => import("../pages/admin/Home.vue"),
      },

      //food
      {
        path: "foods",
        name: "admin-foods",
        component: () => import("../pages/admin/Food/MenuFoodAdmin.vue"),
      },
      {
        path: "foods/add-foods",
        name: "admin-add-foods",
        component: () => import("../pages/admin/Food/AddFoodAdmin.vue"),
      },
      {
        path: "foods/details-foods/:id?",
        name: "admin-details-foods",
        component: () => import("../pages/admin/Food/DetailFoodAdmin.vue"),
      },
      {
        path: "foods/edit-foods/:id?",
        name: "admin-edit-foods",
        component: () => import("../pages/admin/food/EditFoodAdmin.vue"),
      },

      //category
      {
        path: "categories",
        name: "admin-categories",
        component: () =>
          import("../pages/admin/Category/MenuCategoryAdmin.vue"),
      },
      {
        path: "categories/add-categories",
        name: "admin-add-categories",
        component: () => import("../pages/admin/Category/AddCategoryAdmin.vue"),
      },
      {
        path: "categories/edit-categories/:id?",
        name: "admin-edit-categories",
        component: () =>
          import("../pages/admin/Category/EditCategoryAdmin.vue"),
      },
      {
        path: "categories/details-categories/:id?",
        name: "admin-details-categories",
        component: () =>
          import("../pages/admin/Category/DetailCategoryAdmin.vue"),
      },

      //type
      {
        path: "types",
        name: "admin-types",
        component: () => import("../pages/admin/Type/MenuTypeAdmin.vue"),
      },
      {
        path: "types/add-types/",
        name: "admin-add-types",
        component: () => import("../pages/admin/Type/AddTypeAdmin.vue"),
      },
      {
        path: "types/edit-types/:id?",
        name: "admin-edit-types",
        component: () => import("../pages/admin/Type/EditTypeAdmin.vue"),
      },
      {
        path: "types/details-types/:id?",
        name: "admin-details-types",
        component: () => import("../pages/admin/Type/DetailTypeAdmin.vue"),
      },

      //table
      {
        path: "tables",
        name: "admin-tables",
        component: () => import("../pages/admin/Table/MenuTableAdmin.vue"),
      },
      {
        path: "tables/add-tables",
        name: "admin-add-tables",
        component: () => import("../pages/admin/Table/AddTableAdmin.vue"),
      },
      {
        path: "tables/details-tables/:id?",
        name: "admin-details-tables",
        component: () => import("../pages/admin/Table/DetailTableAdmin.vue"),
      },
      {
        path: "tables/edit-tables/:id?",
        name: "admin-edit-tables",
        component: () => import("../pages/admin/Table/EditTableAdmin.vue"),
      },

      //user
      {
        path: "users",
        name: "admin-users",
        component: () => import("../pages/admin/Users/MenuUserAdmin.vue"),
      },

      //sale
      {
        path: "sale",
        name: "admin-sales",
        component: () => import("../pages/admin/Sale/MenuSaleAdmin.vue"),
      },

      //rank
      {
        path: "rank",
        name: "admin-ranks",
        component: () => import("../pages/admin/Rank/MenuRankAdmin.vue"),
      },

      //customer
      {
        path: "customers",
        name: "admin-customers",
        component: () =>
          import("../pages/admin/Customer/MenuCustomerAdmin.vue"),
      },
      {
        path: "customers/details-customers",
        name: "admin-details-customers",
        component: () =>
          import("../pages/admin/Customer/DetailCustomerAdmin.vue"),
      },

      //booking
      {
        path: "booking",
        name: "admin-booking",
        component: () => import("../pages/admin/Booking/MenuBookingAdmin.vue"),
      },
      {
        path: "booking/details-booking",
        name: "admin-details-booking",
        component: () =>
          import("../pages/admin/Booking/DetailBookingAdmin.vue"),
      },
    ],
  },
];

export default admin;
