import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMovieInfo = async (req, res, next) => {
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
    
    res.json(movie);
  } catch (err) {
    next(err);
  }
};
