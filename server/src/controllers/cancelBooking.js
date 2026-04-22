import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.body || {};

    if (!bookingId) {
      return res.status(400).json({ error: "bookingId is required" });
    }

    const id = Number(bookingId);

    const booking = await prisma.bookings.findUnique({
      where: { id },
      include: { booking_seats: true },
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    const seatIds = booking.booking_seats
      .map(bs => bs.seat_id)
      .filter(Boolean);

    await prisma.$transaction(async (tx) => {
      // 1. delete pivot table first
      await tx.booking_seats.deleteMany({
        where: { booking_id: id },
      });

      // 2. free seats only if seatIds exist
      if (seatIds.length > 0) {
        await tx.seats.updateMany({
          where: {
            id: { in: seatIds },
          },
          data: {
            seat_available: true,
          },
        });
      }

      // 3. delete booking last
      await tx.bookings.delete({
        where: { id },
      });
    });

    return res.json({
      success: true,
      freedSeats: seatIds,
    });
  } catch (err) {
    console.error("CancelBooking Error:", err);
    return res.status(500).json({
      error: "Failed to cancel booking",
    });
  }
};