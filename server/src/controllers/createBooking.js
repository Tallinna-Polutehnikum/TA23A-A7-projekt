import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createBooking = async (req, res, next) => {
  try {
    const { showtimeId, numberOfTickets, seats } = req.body || {};

    const parsedShowtimeId = Number(showtimeId);
    const parsedTicketCount = Number(numberOfTickets);
    const seatNumbers = Array.isArray(seats)
      ? seats.map((seat) => String(seat).trim()).filter(Boolean)
      : [];

    if (!Number.isInteger(parsedShowtimeId) || parsedShowtimeId <= 0) {
      return res.status(400).json({ error: "Valid showtimeId is required" });
    }

    if (!Number.isInteger(parsedTicketCount) || parsedTicketCount <= 0) {
      return res.status(400).json({ error: "Valid numberOfTickets is required" });
    }

    if (seatNumbers.length === 0) {
      return res.status(400).json({ error: "At least one seat is required" });
    }

    if (seatNumbers.length !== parsedTicketCount) {
      return res.status(400).json({ error: "Seat count must match number of tickets" });
    }

    const showtime = await prisma.showtimes.findUnique({
      where: { id: parsedShowtimeId },
      select: { id: true },
    });

    if (!showtime) {
      return res.status(404).json({ error: "Showtime not found" });
    }

    const seatRows = await prisma.seats.findMany({
      where: {
        showtime_id: parsedShowtimeId,
        seat_number: { in: seatNumbers },
      },
      select: {
        id: true,
        seat_number: true,
      },
    });

    if (seatRows.length !== seatNumbers.length) {
      return res.status(400).json({ error: "One or more selected seats are invalid" });
    }

    const alreadyBookedSeats = await prisma.seats.findMany({
      where: {
        id: { in: seatRows.map((seat) => seat.id) },
        booking_seats: {
          some: {},
        },
      },
      select: {
        seat_number: true,
      },
    });

    if (alreadyBookedSeats.length > 0) {
      return res.status(409).json({
        error: "One or more selected seats are already booked",
        seats: alreadyBookedSeats.map((seat) => seat.seat_number),
      });
    }

    const createdBooking = await prisma.$transaction(async (tx) => {
      const booking = await tx.bookings.create({
        data: {
          showtime_id: parsedShowtimeId,
          number_of_tickets: parsedTicketCount,
        },
      });

      await tx.booking_seats.createMany({
        data: seatRows.map((seat) => ({
          booking_id: booking.id,
          seat_id: seat.id,
        })),
      });

      await tx.seats.updateMany({
        where: {
          id: { in: seatRows.map((seat) => seat.id) },
        },
        data: {
          seat_available: false,
        },
      });

      return booking;
    });

    res.status(201).json({
      success: true,
      bookingId: createdBooking.id,
    });
  } catch (err) {
    next(err);
  }
};
