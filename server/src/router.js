import { Router } from "express";

// importige enda controller
import homePageMovies from "./controllers/homePageMovies.js";
import { getMovieById } from "./controllers/movieController.js";
import { getShowtimeById } from "./controllers/showtimeController.js";


const router = Router();

// tehke route oma controllerile
router.get("/home", homePageMovies);
router.get("/movies/:id", getMovieById);
router.get("/showtimes/:id", getShowtimeById);



router.get("/images/:filename", async (req, res) => {
  const { filename } = req.params;
  // fetch image data from DB
  const image = await prisma.images.findUnique({ where: { film_cover: filename } });
  if (!image) return res.status(404).send("Not found");

  res.set("Content-Type", "image/jpeg"); // or png
  res.send(image.data); // if stored as BLOB
});



export default router;
