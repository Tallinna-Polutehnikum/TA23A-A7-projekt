import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Seats from "../pages/Seats.vue";
import Movies from "../pages/Movies.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", component: Home },
		{ path: "/seats", component: Seats },
		{ path: "/movies", component: Movies },
	],
});

export default router;
