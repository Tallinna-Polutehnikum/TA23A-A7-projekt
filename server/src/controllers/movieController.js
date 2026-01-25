import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMovieById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await prisma.movies.findUnique({
      where: { id: Number(id) },
      include: {
        images: true,
        showtimes: true
      }
    });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    // prepend URL
    movie.images = movie.images.map(img => ({
      ...img,
      film_cover: `http://localhost:5000/images/${img.film_cover}`,
      film_header_image: `http://localhost:5000/images/${img.film_header_image}`
    }));

    res.json(movie);
  } catch (err) {
    next(err);
  }
};
