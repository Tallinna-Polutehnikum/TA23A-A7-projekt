const seatLayout = [
    { row: "A", count: 16, type: "single" },
    { row: "B", count: 16, type: "single" },
    { row: "C", count: 16, type: "single" },
    { row: "D", count: 8, type: "double" },
    { row: "E", count: 8, type: "double" },
    { row: "F", count: 16, type: "single" },
    { row: "G", count: 16, type: "single" },
    { row: "H", count: 16, type: "single" },
];

function generateSeats(showtimeId) {
    return seatLayout.flatMap(({ row, count, type }) =>
        Array.from({ length: count }, (_, idx) => ({
            showtime_id: showtimeId,
            seat_number: `${row}${idx + 1}`,
            seat_type: type,
            seat_available: true,
        }))
    );
}

const movies = [
    {
        title: "Inception",
        genre: "Science Fiction",
        duration: 148,
        age_rating: "PG-13",
        director: "Christopher Nolan",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy, Ken Watanabe, Marion Cotillard, Cillian Murphy, Michael Caine",
        trailer_url: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        description:
            "A skilled thief who steals secrets through dream-sharing technology is offered a chance at redemption if he can successfully plant an idea into a target's subconscious.",
    },
];

const images = [
    {
        film_cover: "/images/covers/inception.jpg",
        film_header_image: "/images/headers/inception.jpg",
        movie_id: 1,
    },
];

const gallery = [
    {
        image_id: 1,
        image: "/images/gallery/inception1.jpg",
    },
    {
        image_id: 1,
        image: "/images/gallery/inception2.jpg",
    },
    {
        image_id: 1,
        image: "/images/gallery/inception3.jpg",
    },
];

const showtimes = [
    {
        movie_id: 1,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T14:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 1,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T14:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 1,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T14:00:00Z"),
        location: "Tallinn 3",
    },
];

const seats = [
    ...generateSeats(1),
];

export default { movies, images, gallery, showtimes, seats, }