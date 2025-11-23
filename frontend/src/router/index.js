import { createRouter, createWebHistory } from "vue-router";

const routes = [
    { path: "/", component: () => import("../views/PostsView.vue") },
    { path: "/addPost", component: () => import("../views/addPost.vue") },
    { path: "/login", component: () => import("../views/login.vue") },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;
