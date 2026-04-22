import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const cancelBooking = async (req, res, next) => {
  try {
    const { bookingId } = req.body || {};
    if (!bookingId) {
      return res.status(400).json({ error: "bookingId is required" });
    }

    // Find the booking and associated seats
    const booking = await prisma.bookings.findUnique({
      where: { id: Number(bookingId) },
      include: { booking_seats: true },
    });
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Release seats
    const seatIds = booking.booking_seats.map(bs => bs.seat_id);
    await prisma.seats.updateMany({
      where: { id: { in: seatIds } },
      data: { seat_available: true },
    });

    // Delete booking seats and booking
    await prisma.booking_seats.deleteMany({ where: { booking_id: booking.id } });
    await prisma.bookings.delete({ where: { id: booking.id } });

    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
