import { Router } from "express";

// importige enda controller
import getMovies from "./controllers/getMovies.js";
import { getMovieInfo } from "./controllers/getMovieInfo.js";
import { getShowtimes } from "./controllers/getShowtimes.js";

const router = Router();

// tehke route oma controllerile
router.get("/home", getMovies);
router.get("/movies/:id", getMovieInfo);
router.get("/showtimes/:id", getShowtimes);

export default router;
