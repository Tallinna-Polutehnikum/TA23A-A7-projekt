import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getShowtimes = async (req, res, next) => {
  try {
    const { id } = req.params;

    const showtime = await prisma.showtimes.findUnique({
      where: { id: parseInt(id) },
    });

    if (!showtime) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    res.json(showtime);
  } catch (err) {
    next(err);
  }
};
