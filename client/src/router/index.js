import { createRouter, createWebHistory } from "vue-router";

import Home from "../pages/Home.vue";
import Movies from "../pages/Movies.vue";
import Seats from "../pages/Seats.vue";
import SeatSelector from "../pages/SeatSelector.vue";
import EmailVerification from "../pages/EmailVerification.vue";
import Payment from "../pages/Payment.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{ path: "/", component: Home },
		{ path: "/movies", component: Movies },
		{ path: "/seats", component: Seats },
		{ path: "/seat-selector", component: SeatSelector },
		{ path: "/email-verification", component: EmailVerification },
		{ path: "/payment", component: Payment },
	],
});

export default router;
