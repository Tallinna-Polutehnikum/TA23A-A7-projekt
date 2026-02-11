import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function updateDescriptions() {
  const movies = [
    { 
      id: 1, 
      description: "Dom Cobb is a skilled thief with a unique ability to infiltrate people's dreams and steal their deepest secrets. Haunted by guilt over a tragic past, he is offered a chance at redemption from a powerful businessman: successfully plant an idea in someone's subconscious rather than steal one. Cobb assembles a talented team and begins an ambitious heist that requires them to venture deeper into the layers of dreams than anyone has gone before. As they delve further into the complex dream worlds, the lines between reality and illusion blur, and they face increasingly dangerous obstacles. With time running out and the boundaries of reality crumbling around them, Cobb must confront the demons from his past to complete the mission. This mind-bending masterpiece explores themes of perception, reality, and the power of ideas."
    },
    { 
      id: 2, 
      description: "When 10-year-old Chihiro and her parents stumble upon a mysterious abandoned theme park, her parents' greed leads them to eat mysterious food and transforms them into pigs. Trapped in this magical world, Chihiro must navigate a bathhouse run by the enigmatic Yubaba, a witch who controls everyone through magical contracts. With the help of an enigmatic boy named Haku, Chihiro embarks on a perilous quest to rescue her parents and find a way to escape this enchanted realm. Along her extraordinary journey, she encounters a cast of magical creatures, spirits, and learns valuable lessons about kindness, courage, and her own identity. This breathtaking animated masterpiece becomes a tale of growing up, self-discovery, and finding one's inner strength in the face of adversity and darkness."
    },
    { 
      id: 3, 
      description: "In this enchanting tale, high school seniors Taki and Mitsuha mysteriously swap bodies across time and space, though they are completely unaware of each other's true existence. Taki, a busy Tokyo high school student, suddenly finds himself living as a rural girl in the Japanese countryside, struggling to adapt to her simple mountain life. Mitsuha experiences Taki's vibrant urban Tokyo lifestyle, marveling at the city's dazzling wonders and modern technology. As they continue to switch bodies unexpectedly, they begin leaving each other messages and gradually learning about one another's lives and dreams. A deep emotional connection forms between these two souls separated by geography and circumstance. When the supernatural body-swapping mysteriously stops without explanation, Taki becomes desperate to find Mitsuha. Their quest to meet becomes an epic journey that defies time and space itself."
    },
    { 
      id: 4, 
      description: "Nina Sayers is a dedicated prima ballerina at a prestigious New York City ballet company, living under the shadow of her domineering mother and the immense pressure to achieve perfection. When she wins the coveted lead role of both the White Swan and the Black Swan in Swan Lake, her lifelong dream finally seems within reach. However, as rehearsals intensify and opening night approaches, Nina begins to blur the lines between reality and illusion. Her body starts transforming in disturbing and impossible ways, and she experiences intense paranoia. Rivalry with a sensual new dancer and her mother's overbearing control push Nina deeper into a spiral of psychological deterioration. As the premiere nears and her grip on reality becomes increasingly fragile, Nina must confront her inner demons. This dark psychological thriller explores the destructive toll of perfectionism, jealousy, and the obsessive nature of artistic pursuit."
    }
  ];

  for (const m of movies) {
    await prisma.movies.update({
      where: { id: m.id },
      data: { description: m.description }
    });
    console.log(`Updated movie ${m.id}`);
  }
  console.log("All descriptions updated!");
  await prisma.$disconnect();
}

updateDescriptions().catch(err => {
  console.error(err);
  process.exit(1);
});
