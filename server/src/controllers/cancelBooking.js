import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const cancelBooking = async (req, res) => {
  try {
    const bookingId = Number(req.body.bookingId);

    if (!bookingId) {
      return res.status(400).json({ success: false, error: "Missing bookingId" });
    }

    // STEP 1: FORCE GET seat_ids directly from table
    const bookingSeats = await prisma.booking_seats.findMany({
      where: { booking_id: bookingId },
      select: { seat_id: true },
    });

    const seatIds = bookingSeats.map(s => s.seat_id);

    // STEP 2: delete pivot
    await prisma.booking_seats.deleteMany({
      where: { booking_id: bookingId },
    });

    // STEP 3: free seats
    if (seatIds.length > 0) {
      await prisma.seats.updateMany({
        where: { id: { in: seatIds } },
        data: { seat_available: true },
      });
    }

    // STEP 4: delete booking
    await prisma.bookings.delete({
      where: { id: bookingId },
    });

    return res.json({
      success: true,
      freedSeats: seatIds,
    });

  } catch (err) {
    console.error("CANCEL ERROR:", err);
    return res.status(500).json({
      success: false,
      error: "Cancel failed",
    });
  }
};