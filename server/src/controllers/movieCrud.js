import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// CREATE a new movie
export async function createMovie(req, res) {
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
}

// DELETE a movie
export async function deleteMovie(req, res) {
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
}
