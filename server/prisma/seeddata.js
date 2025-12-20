const movies = [
    {
        title: "",
        genre: "",
        duration: 1,
        age_rating: "",
        director: "",
        cast: "",
        trailer_url: "",
        description: "",
    },
];

const images = [
    {
        film_cover: "",
        film_header_image: "",
        movie_id: 1,
    }
];

const gallery = [
    {
        gallery_image: "",
    }
];

const showtimes = [
    {
        movie_id: 1,
        show_date: new Date("1970-01-01"),
        show_time: new Date("1970-01-01T00:00:00Z"),
        location: "",
    }
];

const bookings = [
    {
        showtime_id: 1,
        number_of_tickets: 0,
    }
];

const seats = [
    {
        showtime_id: 1,
        seat_number: "",
        seat_type: "single",
        seat_available: true,
    }
];

const booking_seats = [
    {
        booking_id: 1,
        seat_id: 1,
    }
];

const image_gallery = [
    {
        image_id: 1,
        gallery_id: 1,
    }
];

export default { movies, images, gallery, showtimes, bookings, seats, booking_seats, image_gallery }