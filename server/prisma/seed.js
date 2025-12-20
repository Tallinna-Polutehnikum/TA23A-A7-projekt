import { PrismaClient } from "@prisma/client";
import seeddata from "./seeddata.js";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    const movieIdMap = [];
    for (let i = 0; i < seeddata.movies.length; i++) {
        const created = await prisma.movies.create({ data: seeddata.movies[i] });
        movieIdMap[i + 1] = created.id;
    }

    const imageIdMap = [];
    for (let i = 0; i < seeddata.images.length; i++) {
        const img = seeddata.images[i];
        const created = await prisma.images.create({
            data: {
                film_cover: img.film_cover,
                film_header_image: img.film_header_image,
                movie_id: movieIdMap[img.movie_id],
            },
        });
        imageIdMap[i + 1] = created.id;
    }

    for (const g of seeddata.gallery) {
        await prisma.gallery.create({
            data: {
                image: g.image,
                image_id: imageIdMap[g.image_id],
            },
        });
    }

    const showtimeIds = [];
    for (const s of seeddata.showtimes) {
        const created = await prisma.showtimes.create({
            data: {
                movie_id: movieIdMap[s.movie_id],
                show_date: s.show_date,
                show_time: s.show_time,
                location: s.location,
            },
        });
        showtimeIds.push(created.id);
    }

    const baseSeats = seeddata.seats;
    for (const stId of showtimeIds) {
        const seatsToCreate = baseSeats.map((s) => ({
            showtime_id: stId,
            seat_number: s.seat_number,
            seat_type: s.seat_type,
            seat_available: true,
        }));
        await prisma.seats.createMany({ data: seatsToCreate });
    }

    console.log("Seeding complete!");
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());