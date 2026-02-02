import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const getMovies = async (req, res, next) => {
  try {
    const movies = await prisma.movies.findMany({
      include: {
        images: true, // just get film_cover and film_header_image
        showtimes: true
      }
    });

    // prepend public URL to image filenames
    const moviesWithUrls = movies.map(movie => ({
      ...movie,
      images: movie.images.map(img => ({
        ...img,
        film_cover: `http://localhost:5000/images/${img.film_cover}`,
        film_header_image: `http://localhost:5000/images/${img.film_header_image}`
      }))
    }));

    res.json(moviesWithUrls);
  } catch (err) {
    next(err);
  }
};

export default getMovies;
