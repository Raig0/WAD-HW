import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", component: () => import("../views/PostsView.vue") },
    { path: "/addPost", component: () => import("../views/addPost.vue") },
    { path: "/signup", component: () => import("../views/signup.vue") },
    { path: "/login", component: () => import("../views/login.vue") },
    { path: "/posts/:id", component: () => import("../views/PostPage.vue") },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const token = localStorage.getItem("token");
    const open = ["/login", "/signup"];
    if (open.includes(to.path)) return next();

    // pprotect home and add post
    if (
        to.path === "/" ||
        to.path === "/addPost" ||
        to.path === "/addpost" ||
        to.path.startsWith("/posts")
    ) {
        if (!token) return next("/login");
    }
    next();
});

export default router;
