import { createRouter, createWebHashHistory } from "vue-router";
import privateRoutes from "./routes/index";

const routes = [
    ...privateRoutes,
    {
        path: "/:matchOthers(.*)*",
        component: () => import("../views/404/index.vue"),
    },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {

    next();
});

export { router };
