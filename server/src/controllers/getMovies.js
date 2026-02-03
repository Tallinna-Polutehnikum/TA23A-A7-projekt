import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getMovies = async (req, res, next) => {
  try {
    const movies = await prisma.movies.findMany({
      select: {
        id: true,
        title: true,
        genre: true,
        images: {
          select: {
            film_cover: true,
          }
        }
      }
    });
    res.json(movies);
  } catch (err) {
    next(err);
  }
};

export default getMovies;
