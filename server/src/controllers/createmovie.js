import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const createMovie = async (req, res) => {
  try {
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

    if (!title || !genre || !age_rating || !duration || !director || !cast || !description || !trailer_url) {
      return res.status(400).json({ message: "All movie fields are required" });
    }

    // Tagame, et film_cover ja film_header_image on alati string
    const film_cover = images?.film_cover || "https://via.placeholder.com/300x450";
    const film_header_image = images?.film_header_image || "https://via.placeholder.com/1280x720";

    const newMovie = await prisma.movies.create({
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
            film_cover,
            film_header_image,
          },
        },
      },
      include: {
        images: true,
      },
    });

    res.status(201).json(newMovie);
  } catch (err) {
    console.error("CreateMovie Error:", err);
    res.status(500).json({ message: "Failed to create movie", error: err.message });
  } finally {
    await prisma.$disconnect();
  }
};