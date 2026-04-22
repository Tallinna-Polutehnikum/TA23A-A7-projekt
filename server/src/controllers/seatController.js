import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const showtimeSeatMap = new Map();

function getShowtimeMap(showtimeId) {
    if (!showtimeSeatMap.has(showtimeId)) {
        showtimeSeatMap.set(showtimeId, new Map());
    }
    return showtimeSeatMap.get(showtimeId);
}

async function getPersistedTakenSeats(showtimeId) {
    const showtimeIdNumber = Number(showtimeId);
    if (!Number.isInteger(showtimeIdNumber) || showtimeIdNumber <= 0) {
        return [];
    }

    const seats = await prisma.seats.findMany({
        where: {
            showtime_id: showtimeIdNumber,
            booking_seats: {
                some: {},
            },
        },
        select: {
            seat_number: true,
        },
    });

    return seats.map((seat) => seat.seat_number);
}

export async function getShowtimeSeats(req, res, next) {
    const showtimeId = req.params.id;
    const userId = req.query.userId;
    try {
        const seatMap = getShowtimeMap(showtimeId);
        const temporaryTakenSeats = Array.from(seatMap.keys());
        const persistedTakenSeats = await getPersistedTakenSeats(showtimeId);
        const takenSeats = Array.from(new Set([...temporaryTakenSeats, ...persistedTakenSeats]));
        const userSeats = userId
            ? Array.from(seatMap.entries())
                .filter(([, ownerId]) => ownerId === userId)
                .map(([seatId]) => seatId)
            : [];

        res.json({ takenSeats, userSeats });
    } catch (error) {
        next(error);
    }
}

export async function selectShowtimeSeat(req, res, next) {
    const showtimeId = req.params.id;
    const { seatId, userId } = req.body || {};
    if (!seatId || !userId) {
        res.status(400).json({ error: "seatId and userId are required" });
        return;
    }

    try {
        const persistedTakenSeats = await getPersistedTakenSeats(showtimeId);
        if (persistedTakenSeats.includes(seatId)) {
            res.json({
                takenSeats: persistedTakenSeats,
                success: false,
            });
            return;
        }

        const seatMap = getShowtimeMap(showtimeId);
        const currentOwner = seatMap.get(seatId);
        let success = false;

        if (!currentOwner) {
            seatMap.set(seatId, userId);
            success = true;
        } else if (currentOwner === userId) {
            success = true;
        }

        const temporaryTakenSeats = Array.from(seatMap.keys());
        const takenSeats = Array.from(new Set([...temporaryTakenSeats, ...persistedTakenSeats]));

        res.json({ takenSeats, success });
    } catch (error) {
        next(error);
    }
}

export async function unselectShowtimeSeat(req, res, next) {
    const showtimeId = req.params.id;
    const { seatId, userId } = req.body || {};
    if (!seatId || !userId) {
        res.status(400).json({ error: "seatId and userId are required" });
        return;
    }

    try {
        const seatMap = getShowtimeMap(showtimeId);
        if (seatMap.get(seatId) === userId) {
            seatMap.delete(seatId);
        }

        const temporaryTakenSeats = Array.from(seatMap.keys());
        const persistedTakenSeats = await getPersistedTakenSeats(showtimeId);
        const takenSeats = Array.from(new Set([...temporaryTakenSeats, ...persistedTakenSeats]));

        res.json({ takenSeats });
    } catch (error) {
        next(error);
    }
}

export async function releaseUserSeats(req, res, next) {
    const showtimeId = req.params.id;
    const { userId } = req.body || {};
    if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
    }

    try {
        const seatMap = getShowtimeMap(showtimeId);
        for (const [seatId, ownerId] of seatMap.entries()) {
            if (ownerId === userId) {
                seatMap.delete(seatId);
            }
        }

        const temporaryTakenSeats = Array.from(seatMap.keys());
        const persistedTakenSeats = await getPersistedTakenSeats(showtimeId);
        const takenSeats = Array.from(new Set([...temporaryTakenSeats, ...persistedTakenSeats]));

        res.json({ takenSeats });
    } catch (error) {
        next(error);
    }
}
