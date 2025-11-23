import { Router } from "express";

// importige enda controller
import homePageMovies from "./controllers/homePageMovies.js";

const router = Router();

// tehke route oma controllerile
router.get("/home", homePageMovies);

export default router;
