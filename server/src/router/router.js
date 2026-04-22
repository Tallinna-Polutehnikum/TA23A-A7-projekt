
import express from "express";
import cors from "cors";
import getMovies from "../controllers/getMovies.js";
import { getMovieInfo } from "../controllers/getMovieInfo.js";
import { getShowtimes } from "../controllers/getShowtimes.js";
import { createMovie, deleteMovie } from "../controllers/movieCrud.js";
import {
  getShowtimeSeats,
  selectShowtimeSeat,
  unselectShowtimeSeat,
  releaseUserSeats,
} from "../controllers/seatController.js";
import { createBooking } from "../controllers/createBooking.js";
import { cancelBooking } from "../controllers/cancelBooking.js";

const router = express.Router();

router.use(cors());
router.use(express.json());

router.get("/home", getMovies);
router.get("/movies/:id", getMovieInfo);
router.post("/movies", createMovie);
router.delete("/movies/:id", deleteMovie);
router.get("/showtimes/:id", getShowtimes);
router.get("/showtimes/:id/seats", getShowtimeSeats);
router.post("/showtimes/:id/seats/select", selectShowtimeSeat);
router.post("/showtimes/:id/seats/unselect", unselectShowtimeSeat);
router.post("/showtimes/:id/seats/release", releaseUserSeats);
router.post("/bookings", createBooking);
router.post("/bookings/cancel", cancelBooking);

export default router;