import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function updateTrailers() {
  const movies = [
    { id: 1, title: "Inception", trailer: "https://www.youtube.com/embed/YoHD9XEInc0" },
    { id: 2, title: "Spirited Away", trailer: "https://www.youtube.com/embed/ByXuk9QqQkk" },
    { id: 3, title: "Your Name", trailer: "https://www.youtube.com/embed/xU47nhruN-Q" },
    { id: 4, title: "Black Swan", trailer: "https://www.youtube.com/embed/5jaI1XOB-bs" }
  ];

  for (const m of movies) {
    await prisma.movies.update({
      where: { id: m.id },
      data: { trailer_url: m.trailer }
    });
    console.log(`Updated ${m.title}`);
  }
  console.log("All trailers updated!");
  await prisma.$disconnect();
}

updateTrailers().catch(err => {
  console.error(err);
  process.exit(1);
});
