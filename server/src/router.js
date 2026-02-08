import { Router } from "express";

// importige enda controller
import getMovies from "./controllers/getMovies.js";
import { getMovieInfo } from "./controllers/getMovieInfo.js";
import { getShowtimes } from "./controllers/getShowtimes.js";
import { getAvailableSeats, selectSeat, unselectSeat } from "./controllers/seatController.js";

const router = Router();

// tehke route oma controllerile
router.get("/home", getMovies);
router.get("/movies/:id", getMovieInfo);
router.get("/showtimes/:id", getShowtimes);

router.get("/getAvailableSeats", getAvailableSeats);
router.post("/selectSeat/:id", selectSeat);
router.post("/unselectSeat/:id", unselectSeat);

export default router;