import { createRouter, createWebHistory } from "vue-router";

import Seats from "../pages/Seats.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [{ path: "/seats", component: Seats }],
});

export default router;
