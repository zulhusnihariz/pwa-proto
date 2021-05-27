const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/", name: "Home", component: () => import("pages/Index.vue") },
      {
        path: "/login",
        name: "Login",
        component: () => import("pages/Login.vue")
      },
      {
        path: "/register",
        name: "Register",
        component: () => import("pages/Register.vue")
      },
      {
        path: "/profile",
        name: "Profile",
        component: () => import("src/pages/Profile.vue")
      },
      {
        path: "/change-password",
        name: "ChangePassword",
        component: () => import("pages/ChangePassword.vue")
      },
      {
        path: "/check-in",
        name: "CheckIn",
        component: () => import("pages/CheckIn.vue")
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "*",
    component: () => import("pages/Error404.vue")
  }
];

export default routes;
