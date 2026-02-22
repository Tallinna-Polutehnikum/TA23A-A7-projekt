import { Router } from "express";

// importige enda controller
import getMovies from "../controllers/getMovies.js";
import { getMovieInfo } from "../controllers/getMovieInfo.js";
import { getShowtimes } from "../controllers/getShowtimes.js";
import {
	getShowtimeSeats,
	selectShowtimeSeat,
	unselectShowtimeSeat,
	releaseUserSeats,
} from "../controllers/seatController.js";

const router = Router();

// tehke route oma controllerile
router.get("/home", getMovies);
router.get("/movies/:id", getMovieInfo);
router.get("/showtimes/:id", getShowtimes);

router.get("/showtimes/:id/seats", getShowtimeSeats);
router.post("/showtimes/:id/seats/select", selectShowtimeSeat);
router.post("/showtimes/:id/seats/unselect", unselectShowtimeSeat);
router.post("/showtimes/:id/seats/release", releaseUserSeats);

export default router;