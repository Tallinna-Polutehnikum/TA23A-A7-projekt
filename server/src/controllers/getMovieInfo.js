import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMovieInfo = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movie = await prisma.movies.findUnique({
      where: { id: Number(id) },
      include: {
        images: {
          include: {
            gallery: true
          }
        },
        showtimes: true
      }
    });

    if (!movie) return res.status(404).json({ message: "Movie not found" });
    
    // Shift showtimes to be relative to today
    const seedDate = new Date("2025-12-24"); // Original seed date
    const today = new Date();
    const daysOffset = Math.floor((today - seedDate) / (1000 * 60 * 60 * 24));
    
    const adjustedMovie = {
      ...movie,
      showtimes: movie.showtimes.map(showtime => {
        const newDate = new Date(showtime.show_date);
        newDate.setDate(newDate.getDate() + daysOffset);
        return {
          ...showtime,
          show_date: newDate
        };
      })
    };
    
    res.json(adjustedMovie);
  } catch (err) {
    next(err);
  }
};
