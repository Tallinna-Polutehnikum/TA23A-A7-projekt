const availableSeats = new Set();

export function getAvailableSeats(req, res) {
    res.send(JSON.stringify(Array.from(availableSeats)));
};

export function selectSeat(req, res) {
    const seatId = req.params.id;
    
    let success = false;
    if (!availableSeats.has(seatId)) {
        availableSeats.add(seatId);
        success = true;
    }

    res.send(
        JSON.stringify({
            takenSeats: Array.from(availableSeats),
            success: success
        })
    );
}

export function unselectSeat(req, res) {
    const seatId = req.params.id;
    if (availableSeats.has(seatId)) {
        availableSeats.delete(seatId);
    }

    res.send(JSON.stringify(Array.from(availableSeats)));
}