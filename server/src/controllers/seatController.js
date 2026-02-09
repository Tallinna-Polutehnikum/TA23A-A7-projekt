const showtimeSeatMap = new Map();

function getShowtimeMap(showtimeId) {
    if (!showtimeSeatMap.has(showtimeId)) {
        showtimeSeatMap.set(showtimeId, new Map());
    }
    return showtimeSeatMap.get(showtimeId);
}

export function getShowtimeSeats(req, res) {
    const showtimeId = req.params.id;
    const userId = req.query.userId;
    const seatMap = getShowtimeMap(showtimeId);
    const takenSeats = Array.from(seatMap.keys());
    const userSeats = userId
        ? Array.from(seatMap.entries())
            .filter(([, ownerId]) => ownerId === userId)
            .map(([seatId]) => seatId)
        : [];

    res.json({ takenSeats, userSeats });
}

export function selectShowtimeSeat(req, res) {
    const showtimeId = req.params.id;
    const { seatId, userId } = req.body || {};
    if (!seatId || !userId) {
        res.status(400).json({ error: "seatId and userId are required" });
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

    res.json({ takenSeats: Array.from(seatMap.keys()), success });
}

export function unselectShowtimeSeat(req, res) {
    const showtimeId = req.params.id;
    const { seatId, userId } = req.body || {};
    if (!seatId || !userId) {
        res.status(400).json({ error: "seatId and userId are required" });
        return;
    }

    const seatMap = getShowtimeMap(showtimeId);
    if (seatMap.get(seatId) === userId) {
        seatMap.delete(seatId);
    }

    res.json({ takenSeats: Array.from(seatMap.keys()) });
}

export function releaseUserSeats(req, res) {
    const showtimeId = req.params.id;
    const { userId } = req.body || {};
    if (!userId) {
        res.status(400).json({ error: "userId is required" });
        return;
    }

    const seatMap = getShowtimeMap(showtimeId);
    for (const [seatId, ownerId] of seatMap.entries()) {
        if (ownerId === userId) {
            seatMap.delete(seatId);
        }
    }

    res.json({ takenSeats: Array.from(seatMap.keys()) });
}
