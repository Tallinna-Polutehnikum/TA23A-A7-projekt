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

    // Shift showtime to be relative to today
    const seedDate = new Date("2025-12-24"); // Original seed date
    const today = new Date();
    const daysOffset = Math.floor((today - seedDate) / (1000 * 60 * 60 * 24));
    
    const adjustedShowtime = {
      ...showtime,
      show_date: (() => {
        const newDate = new Date(showtime.show_date);
        newDate.setDate(newDate.getDate() + daysOffset);
        return newDate;
      })()
    };

    res.json(adjustedShowtime);
  } catch (err) {
    next(err);
  }
};
