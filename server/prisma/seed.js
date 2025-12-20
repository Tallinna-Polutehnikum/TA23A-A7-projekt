import { PrismaClient } from "@prisma/client";
import seedData from "./seedData.js";

const prisma = new PrismaClient();

async function main() {
    console.log("Seeding database...");

    console.log("Seeding complete!");
}

main()
    .catch(e => console.error(e))
    .finally(() => prisma.$disconnect());