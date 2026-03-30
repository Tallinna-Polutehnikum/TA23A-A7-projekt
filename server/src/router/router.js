// src/router/router.js
import express from "express";
import { PrismaClient } from "@prisma/client"; // ✅ Import Prisma
import cors from "cors";

const router = express.Router();
const prisma = new PrismaClient(); // ✅ Initialize Prisma

router.use(cors());
router.use(express.json());

// ================================
// GET all movies (optional search)
// ================================
router.get("/home", async (req, res) => {
  const search = req.query.q || ""; // optional search query
  try {
    const movies = await prisma.movies.findMany({
      where: {
        OR: [
          { title: { contains: search } },   // removed `mode`
          { genre: { contains: search } },   // removed `mode`
          { director: { contains: search } },// removed `mode`
        ],
      },
      include: { images: true },
    });
    res.json(movies);
  } catch (err) {
    console.error("FetchMovies Error:", err);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

// ================================
// CREATE a new movie
// ================================
router.post("/movies", async (req, res) => {
  const {
    title,
    genre,
    age_rating,
    duration,
    director,
    cast,
    description,
    trailer_url,
    images,
  } = req.body;

  try {
    const movie = await prisma.movies.create({
      data: {
        title,
        genre,
        age_rating,
        duration: Number(duration),
        director,
        cast,
        description,
        trailer_url,
        images: {
          create: {
            film_cover: images?.film_cover || "https://via.placeholder.com/300x450",
            film_header_image:
              images?.film_header_image || "https://via.placeholder.com/300x450",
          },
        },
      },
      include: { images: true },
    });

    res.json(movie);
  } catch (err) {
    console.error("CreateMovie Error:", err);
    res.status(500).json({ error: "Failed to save movie" });
  }
});

// ================================
// DELETE a movie
// ================================
router.delete("/movies/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // delete associated images first (foreign key)
    await prisma.images.deleteMany({
      where: { movie_id: Number(id) },
    });

    // delete the movie
    await prisma.movies.delete({
      where: { id: Number(id) },
    });

    res.json({ message: "Movie deleted successfully" });
  } catch (err) {
    console.error("DeleteMovie Error:", err);
    res.status(500).json({ error: "Failed to delete movie" });
  }
});

export default router;