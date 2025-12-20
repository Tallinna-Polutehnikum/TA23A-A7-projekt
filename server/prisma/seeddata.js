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

function generateSeats() {
    return seatLayout.flatMap(({ row, count, type }) =>
        Array.from({ length: count }, (_, idx) => ({
            seat_number: `${row}${idx + 1}`,
            seat_type: type,
            seat_available: true,
        }))
    );
}

const movies = [
    {
        title: "Inception",
        genre: "Ci-Fi",
        duration: 148,
        age_rating: "PG-13",
        director: "Christopher Nolan",
        cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Ellen Page, Tom Hardy, Ken Watanabe, Marion Cotillard, Cillian Murphy, Michael Caine",
        trailer_url: "https://www.youtube.com/watch?v=YoHD9XEInc0",
        description:
            "A skilled thief who steals secrets through dream-sharing technology is offered a chance at redemption if he can successfully plant an idea into a target's subconscious.",
    },
    {
        title: "Spirited Away",
        genre: "Animation",
        duration: 125,
        age_rating: "PG",
        director: "Hayao Miyazaki",
        cast: "Rumi Hiiragi, Miyu Irino, Mari Natsuki, Takashi Naito",
        trailer_url: "https://www.youtube.com/watch?v=ByXuk9QqQkk",
        description:
            "A young girl enters a magical world ruled by a witch and must work to free her parents who have been transformed into pigs.",
    },
    {
        title: "Your Name",
        genre: "Anime",
        duration: 106,
        age_rating: "PG",
        director: "Makoto Shinkai",
        cast: "Ryunosuke Kamiki, Mone Kamishiraishi, Ryo Narita",
        trailer_url: "https://www.youtube.com/watch?v=xU47nhruN-Q",
        description:
            "Two strangers find themselves linked in a bizarre way. When a connection forms, will distance be the only thing to keep them apart?",
    },
    {
        title: "Black Swan",
        genre: "Ballet",
        duration: 108,
        age_rating: "R",
        director: "Darren Aronofsky",
        cast: "Natalie Portman, Mila Kunis, Vincent Cassel, Winona Ryder",
        trailer_url: "https://www.youtube.com/watch?v=5jaI1XOB-bs",
        description:
            "A committed dancer struggles to maintain her sanity after winning the lead role in a production of Tchaikovsky's Swan Lake.",
    },
    {
        title: "Planet Earth II",
        genre: "Documentary",
        duration: 50,
        age_rating: "G",
        director: "David Attenborough",
        cast: "David Attenborough",
        trailer_url: "https://www.youtube.com/watch?v=c8aFcHFu8QM",
        description:
            "Wildlife documentary series with David Attenborough, beginning with a look at the remote islands which offer sanctuary to some of the planet's rarest creatures.",
    },
    {
        title: "The Shawshank Redemption",
        genre: "Drama",
        duration: 142,
        age_rating: "R",
        director: "Frank Darabont",
        cast: "Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler",
        trailer_url: "https://www.youtube.com/watch?v=6hB3S9bIaco",
        description:
            "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    },
    {
        title: "The Lord of the Rings",
        genre: "Fantasy",
        duration: 178,
        age_rating: "PG-13",
        director: "Peter Jackson",
        cast: "Elijah Wood, Ian McKellen, Orlando Bloom, Viggo Mortensen",
        trailer_url: "https://www.youtube.com/watch?v=V75dMMIW2B4",
        description:
            "A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth.",
    },
    {
        title: "Toy Story",
        genre: "Family",
        duration: 81,
        age_rating: "G",
        director: "John Lasseter",
        cast: "Tom Hanks, Tim Allen, Don Rickles, Jim Varney",
        trailer_url: "https://www.youtube.com/watch?v=v-PjgYDrg70",
        description:
            "A cowboy doll is profoundly threatened when a new spaceman figure supplants him as top toy in a boy's room.",
    },
    {
        title: "The Grand Budapest Hotel",
        genre: "Comedy",
        duration: 99,
        age_rating: "R",
        director: "Wes Anderson",
        cast: "Ralph Fiennes, F. Murray Abraham, Mathieu Amalric, Adrien Brody",
        trailer_url: "https://www.youtube.com/watch?v=1Fg5iWmQjwk",
        description:
            "A writer encounters the owner of an aging high-class hotel, who tells him of his early years serving as a lobby boy.",
    },
    {
        title: "Live at Madison Square Garden",
        genre: "Concert",
        duration: 120,
        age_rating: "PG-13",
        director: "Various Artists",
        cast: "Various Artists",
        trailer_url: "https://www.youtube.com/watch?v=example",
        description:
            "An electrifying concert performance featuring world-class musicians at the iconic Madison Square Garden venue.",
    },
    {
        title: "The Godfather",
        genre: "Crime",
        duration: 175,
        age_rating: "R",
        director: "Francis Ford Coppola",
        cast: "Marlon Brando, Al Pacino, James Caan, Diane Keaton",
        trailer_url: "https://www.youtube.com/watch?v=sY1S34973zA",
        description:
            "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    },
    {
        title: "Mad Max Fury Road",
        genre: "Action",
        duration: 120,
        age_rating: "R",
        director: "George Miller",
        cast: "Tom Hardy, Charlize Theron, Nicholas Hoult, Hugh Keays-Byrne",
        trailer_url: "https://www.youtube.com/watch?v=hEJnMQG9ev8",
        description:
            "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners.",
    },
    {
        title: "In Bruges",
        genre: "Black humor",
        duration: 107,
        age_rating: "R",
        director: "Martin McDonagh",
        cast: "Colin Farrell, Brendan Gleeson, Ralph Fiennes",
        trailer_url: "https://www.youtube.com/watch?v=p6JVcHJurdg",
        description:
            "Guilt-stricken after a job gone wrong, hitman Ray and his partner await orders from their ruthless boss in Bruges, Belgium.",
    },
    {
        title: "Knives Out",
        genre: "Mystery",
        duration: 130,
        age_rating: "PG-13",
        director: "Rian Johnson",
        cast: "Daniel Craig, Chris Evans, Ana de Armas, Jamie Lee Curtis",
        trailer_url: "https://www.youtube.com/watch?v=qGqiHJTsRkQ",
        description:
            "A detective investigates the death of a patriarch of an eccentric, combative family.",
    },
    {
        title: "Whiplash",
        genre: "Music",
        duration: 106,
        age_rating: "R",
        director: "Damien Chazelle",
        cast: "Miles Teller, J.K. Simmons, Paul Reiser",
        trailer_url: "https://www.youtube.com/watch?v=7d_jQycdQGo",
        description:
            "A promising young drummer enrolls at a cut-throat music conservatory where his dreams are mentored by an instructor who will stop at nothing to realize a student's potential.",
    },
    {
        title: "La La Land",
        genre: "Musical",
        duration: 128,
        age_rating: "PG-13",
        director: "Damien Chazelle",
        cast: "Ryan Gosling, Emma Stone, John Legend, Rosemarie DeWitt",
        trailer_url: "https://www.youtube.com/watch?v=0pdqf4P9MB8",
        description:
            "While navigating their careers in Los Angeles, a pianist and an actress fall in love while attempting to reconcile their aspirations for the future.",
    },
    {
        title: "Barbie",
        genre: "Doll movie",
        duration: 114,
        age_rating: "PG-13",
        director: "Greta Gerwig",
        cast: "Margot Robbie, Ryan Gosling, America Ferrera, Will Ferrell",
        trailer_url: "https://www.youtube.com/watch?v=pBk4NYhWNMM",
        description:
            "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land. However, when they get a chance to go to the real world, they soon discover the joys and perils of living among humans.",
    },
    {
        title: "The Phantom of the Opera",
        genre: "Opera",
        duration: 143,
        age_rating: "PG-13",
        director: "Joel Schumacher",
        cast: "Gerard Butler, Emmy Rossum, Patrick Wilson, Miranda Richardson",
        trailer_url: "https://www.youtube.com/watch?v=h8xvyb7fqUc",
        description:
            "A young soprano becomes the obsession of a disfigured and murderous musical genius who lives beneath the Paris Opéra House.",
    },
    {
        title: "The Conjuring",
        genre: "Horror",
        duration: 112,
        age_rating: "R",
        director: "James Wan",
        cast: "Patrick Wilson, Vera Farmiga, Ron Livingston, Lili Taylor",
        trailer_url: "https://www.youtube.com/watch?v=k10ETZ41q5o",
        description:
            "Paranormal investigators Ed and Lorraine Warren work to help a family terrorized by a dark presence in their farmhouse.",
    },
    {
        title: "Indiana Jones Raiders of the Lost Ark",
        genre: "Adventure",
        duration: 115,
        age_rating: "PG",
        director: "Steven Spielberg",
        cast: "Harrison Ford, Karen Allen, Paul Freeman, Ronald Lacey",
        trailer_url: "https://www.youtube.com/watch?v=0W2vfqm4x4k",
        description:
            "In 1936, archaeologist and adventurer Indiana Jones is hired by the U.S. government to find the Ark of the Covenant before Adolf Hitler's Nazis can obtain its awesome powers.",
    },
    {
        title: "The Notebook",
        genre: "Romance",
        duration: 123,
        age_rating: "PG-13",
        director: "Nick Cassavetes",
        cast: "Ryan Gosling, Rachel McAdams, James Garner, Gena Rowlands",
        trailer_url: "https://www.youtube.com/watch?v=yDJIcYE32FQ",
        description:
            "A poor yet passionate young man falls in love with a rich young woman, giving her a sense of freedom, but they are soon separated because of their social differences.",
    },
    {
        title: "Rocky",
        genre: "Sport",
        duration: 120,
        age_rating: "PG",
        director: "John G. Avildsen",
        cast: "Sylvester Stallone, Talia Shire, Burt Young, Carl Weathers",
        trailer_url: "https://www.youtube.com/watch?v=3VKl-jkHAwY",
        description:
            "A small-time boxer gets a supremely rare chance to fight a heavy-weight champion in a bout in which he strives to go the distance for his self-respect.",
    },
    {
        title: "Hamilton",
        genre: "Theater",
        duration: 160,
        age_rating: "PG-13",
        director: "Thomas Kail",
        cast: "Lin-Manuel Miranda, Phillipa Soo, Leslie Odom Jr., Renée Elise Goldsberry",
        trailer_url: "https://www.youtube.com/watch?v=DSCKfXpAGHc",
        description:
            "The real life of one of America's foremost founding fathers and first Secretary of the Treasury, Alexander Hamilton, captured in a revolutionary musical.",
    },
    {
        title: "Gone Girl",
        genre: "Thriller",
        duration: 149,
        age_rating: "R",
        director: "David Fincher",
        cast: "Ben Affleck, Rosamund Pike, Neil Patrick Harris, Tyler Perry",
        trailer_url: "https://www.youtube.com/watch?v=2-_-1nJf8Vg",
        description:
            "With his wife's disappearance having become the focus of an intense media circus, a man sees the spotlight turned on him when it's suspected that he may not be innocent.",
    },
];

const images = [
    {
        film_cover: "/images/covers/inception.jpg",
        film_header_image: "/images/headers/inception.jpg",
        movie_id: 1,
    },
    {
        film_cover: "/images/covers/spiritedaway.jpg",
        film_header_image: "/images/headers/spiritedaway.jpg",
        movie_id: 2,
    },
    {
        film_cover: "/images/covers/yourname.jpg",
        film_header_image: "/images/headers/yourname.jpg",
        movie_id: 3,
    },
    {
        film_cover: "/images/covers/blackswan.jpg",
        film_header_image: "/images/headers/blackswan.jpg",
        movie_id: 4,
    },
    {
        film_cover: "/images/covers/planetearthii.jpg",
        film_header_image: "/images/headers/planetearthii.jpg",
        movie_id: 5,
    },
    {
        film_cover: "/images/covers/shawshankredemption.jpg",
        film_header_image: "/images/headers/shawshankredemption.jpg",
        movie_id: 6,
    },
    {
        film_cover: "/images/covers/lordoftherings.jpg",
        film_header_image: "/images/headers/lordoftherings.jpg",
        movie_id: 7,
    },
    {
        film_cover: "/images/covers/toystory.jpg",
        film_header_image: "/images/headers/toystory.jpg",
        movie_id: 8,
    },
    {
        film_cover: "/images/covers/grandbudapesthotel.jpg",
        film_header_image: "/images/headers/grandbudapesthotel.jpg",
        movie_id: 9,
    },
    {
        film_cover: "/images/covers/liveatmadisonsquaregarden.jpg",
        film_header_image: "/images/headers/liveatmadisonsquaregarden.jpg",
        movie_id: 10,
    },
    {
        film_cover: "/images/covers/godfather.jpg",
        film_header_image: "/images/headers/godfather.jpg",
        movie_id: 11,
    },
    {
        film_cover: "/images/covers/madmaxfuryroad.jpg",
        film_header_image: "/images/headers/madmaxfuryroad.jpg",
        movie_id: 12,
    },
    {
        film_cover: "/images/covers/inbruges.jpg",
        film_header_image: "/images/headers/inbruges.jpg",
        movie_id: 13,
    },
    {
        film_cover: "/images/covers/knivesout.jpg",
        film_header_image: "/images/headers/knivesout.jpg",
        movie_id: 14,
    },
    {
        film_cover: "/images/covers/whiplash.jpg",
        film_header_image: "/images/headers/whiplash.jpg",
        movie_id: 15,
    },
    {
        film_cover: "/images/covers/lalaland.jpg",
        film_header_image: "/images/headers/lalaland.jpg",
        movie_id: 16,
    },
    {
        film_cover: "/images/covers/barbie.jpg",
        film_header_image: "/images/headers/barbie.jpg",
        movie_id: 17,
    },
    {
        film_cover: "/images/covers/phantomoftheopera.jpg",
        film_header_image: "/images/headers/phantomoftheopera.jpg",
        movie_id: 18,
    },
    {
        film_cover: "/images/covers/conjuring.jpg",
        film_header_image: "/images/headers/conjuring.jpg",
        movie_id: 19,
    },
    {
        film_cover: "/images/covers/indianajonesraidersofthelostart.jpg",
        film_header_image: "/images/headers/indianajonesraidersofthelostart.jpg",
        movie_id: 20,
    },
    {
        film_cover: "/images/covers/notebook.jpg",
        film_header_image: "/images/headers/notebook.jpg",
        movie_id: 21,
    },
    {
        film_cover: "/images/covers/rocky.jpg",
        film_header_image: "/images/headers/rocky.jpg",
        movie_id: 22,
    },
    {
        film_cover: "/images/covers/hamilton.jpg",
        film_header_image: "/images/headers/hamilton.jpg",
        movie_id: 23,
    },
    {
        film_cover: "/images/covers/gonegirl.jpg",
        film_header_image: "/images/headers/gonegirl.jpg",
        movie_id: 24,
    },
];

const gallery = [
    // Inception
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
    // Spirited Away
    {
        image_id: 2,
        image: "/images/gallery/spiritedaway1.jpg",
    },
    {
        image_id: 2,
        image: "/images/gallery/spiritedaway2.jpg",
    },
    {
        image_id: 2,
        image: "/images/gallery/spiritedaway3.jpg",
    },
    // Your Name
    {
        image_id: 3,
        image: "/images/gallery/yourname1.jpg",
    },
    {
        image_id: 3,
        image: "/images/gallery/yourname2.jpg",
    },
    {
        image_id: 3,
        image: "/images/gallery/yourname3.jpg",
    },
    // Black Swan
    {
        image_id: 4,
        image: "/images/gallery/blackswan1.jpg",
    },
    {
        image_id: 4,
        image: "/images/gallery/blackswan2.jpg",
    },
    {
        image_id: 4,
        image: "/images/gallery/blackswan3.jpg",
    },
    // Planet Earth II
    {
        image_id: 5,
        image: "/images/gallery/planetearthii1.jpg",
    },
    {
        image_id: 5,
        image: "/images/gallery/planetearthii2.jpg",
    },
    {
        image_id: 5,
        image: "/images/gallery/planetearthii3.jpg",
    },
    // The Shawshank Redemption
    {
        image_id: 6,
        image: "/images/gallery/shawshankredemption1.jpg",
    },
    {
        image_id: 6,
        image: "/images/gallery/shawshankredemption2.jpg",
    },
    {
        image_id: 6,
        image: "/images/gallery/shawshankredemption3.jpg",
    },
    // Lord of the Rings
    {
        image_id: 7,
        image: "/images/gallery/lordoftherings1.jpg",
    },
    {
        image_id: 7,
        image: "/images/gallery/lordoftherings2.jpg",
    },
    {
        image_id: 7,
        image: "/images/gallery/lordoftherings3.jpg",
    },
    // Toy Story
    {
        image_id: 8,
        image: "/images/gallery/toystory1.jpg",
    },
    {
        image_id: 8,
        image: "/images/gallery/toystory2.jpg",
    },
    {
        image_id: 8,
        image: "/images/gallery/toystory3.jpg",
    },
    // Grand Budapest Hotel
    {
        image_id: 9,
        image: "/images/gallery/grandbudapesthotel1.jpg",
    },
    {
        image_id: 9,
        image: "/images/gallery/grandbudapesthotel2.jpg",
    },
    {
        image_id: 9,
        image: "/images/gallery/grandbudapesthotel3.jpg",
    },
    // Live at Madison Square Garden
    {
        image_id: 10,
        image: "/images/gallery/liveatmadisonsquaregarden1.jpg",
    },
    {
        image_id: 10,
        image: "/images/gallery/liveatmadisonsquaregarden2.jpg",
    },
    {
        image_id: 10,
        image: "/images/gallery/liveatmadisonsquaregarden3.jpg",
    },
    // The Godfather
    {
        image_id: 11,
        image: "/images/gallery/godfather1.jpg",
    },
    {
        image_id: 11,
        image: "/images/gallery/godfather2.jpg",
    },
    {
        image_id: 11,
        image: "/images/gallery/godfather3.jpg",
    },
    // Mad Max Fury Road
    {
        image_id: 12,
        image: "/images/gallery/madmaxfuryroad1.jpg",
    },
    {
        image_id: 12,
        image: "/images/gallery/madmaxfuryroad2.jpg",
    },
    {
        image_id: 12,
        image: "/images/gallery/madmaxfuryroad3.jpg",
    },
    // In Bruges
    {
        image_id: 13,
        image: "/images/gallery/inbruges1.jpg",
    },
    {
        image_id: 13,
        image: "/images/gallery/inbruges2.jpg",
    },
    {
        image_id: 13,
        image: "/images/gallery/inbruges3.jpg",
    },
    // Knives Out
    {
        image_id: 14,
        image: "/images/gallery/knivesout1.jpg",
    },
    {
        image_id: 14,
        image: "/images/gallery/knivesout2.jpg",
    },
    {
        image_id: 14,
        image: "/images/gallery/knivesout3.jpg",
    },
    // Whiplash
    {
        image_id: 15,
        image: "/images/gallery/whiplash1.jpg",
    },
    {
        image_id: 15,
        image: "/images/gallery/whiplash2.jpg",
    },
    {
        image_id: 15,
        image: "/images/gallery/whiplash3.jpg",
    },
    // La La Land
    {
        image_id: 16,
        image: "/images/gallery/lalaland1.jpg",
    },
    {
        image_id: 16,
        image: "/images/gallery/lalaland2.jpg",
    },
    {
        image_id: 16,
        image: "/images/gallery/lalaland3.jpg",
    },
    // Barbie
    {
        image_id: 17,
        image: "/images/gallery/barbie1.jpg",
    },
    {
        image_id: 17,
        image: "/images/gallery/barbie2.jpg",
    },
    {
        image_id: 17,
        image: "/images/gallery/barbie3.jpg",
    },
    // Phantom of the Opera
    {
        image_id: 18,
        image: "/images/gallery/phantomoftheopera1.jpg",
    },
    {
        image_id: 18,
        image: "/images/gallery/phantomoftheopera2.jpg",
    },
    {
        image_id: 18,
        image: "/images/gallery/phantomoftheopera3.jpg",
    },
    // The Conjuring
    {
        image_id: 19,
        image: "/images/gallery/conjuring1.jpg",
    },
    {
        image_id: 19,
        image: "/images/gallery/conjuring2.jpg",
    },
    {
        image_id: 19,
        image: "/images/gallery/conjuring3.jpg",
    },
    // Indiana Jones
    {
        image_id: 20,
        image: "/images/gallery/indianajonesraidersofthelostart1.jpg",
    },
    {
        image_id: 20,
        image: "/images/gallery/indianajonesraidersofthelostart2.jpg",
    },
    {
        image_id: 20,
        image: "/images/gallery/indianajonesraidersofthelostart3.jpg",
    },
    // The Notebook
    {
        image_id: 21,
        image: "/images/gallery/notebook1.jpg",
    },
    {
        image_id: 21,
        image: "/images/gallery/notebook2.jpg",
    },
    {
        image_id: 21,
        image: "/images/gallery/notebook3.jpg",
    },
    // Rocky
    {
        image_id: 22,
        image: "/images/gallery/rocky1.jpg",
    },
    {
        image_id: 22,
        image: "/images/gallery/rocky2.jpg",
    },
    {
        image_id: 22,
        image: "/images/gallery/rocky3.jpg",
    },
    // Hamilton
    {
        image_id: 23,
        image: "/images/gallery/hamilton1.jpg",
    },
    {
        image_id: 23,
        image: "/images/gallery/hamilton2.jpg",
    },
    {
        image_id: 23,
        image: "/images/gallery/hamilton3.jpg",
    },
    // Gone Girl
    {
        image_id: 24,
        image: "/images/gallery/gonegirl1.jpg",
    },
    {
        image_id: 24,
        image: "/images/gallery/gonegirl2.jpg",
    },
    {
        image_id: 24,
        image: "/images/gallery/gonegirl3.jpg",
    },
];

const showtimes = [
    // Inception
    {
        movie_id: 1,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T14:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 1,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T18:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 1,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T20:00:00Z"),
        location: "Tallinn 3",
    },
    // Spirited Away
    {
        movie_id: 2,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T15:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 2,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T12:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 2,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T17:00:00Z"),
        location: "Tallinn 3",
    },
    // Your Name
    {
        movie_id: 3,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T16:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 3,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T14:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 3,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T19:00:00Z"),
        location: "Tallinn 3",
    },
    // Black Swan
    {
        movie_id: 4,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T19:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 4,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T21:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 4,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T18:00:00Z"),
        location: "Tallinn 3",
    },
    // Planet Earth II
    {
        movie_id: 5,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T11:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 5,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T13:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 5,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T15:00:00Z"),
        location: "Tallinn 3",
    },
    // The Shawshank Redemption
    {
        movie_id: 6,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T20:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 6,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T19:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 6,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T21:00:00Z"),
        location: "Tallinn 3",
    },
    // Lord of the Rings
    {
        movie_id: 7,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T17:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 7,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T16:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 7,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T20:00:00Z"),
        location: "Tallinn 3",
    },
    // Toy Story
    {
        movie_id: 8,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T10:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 8,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T11:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 8,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T12:00:00Z"),
        location: "Tallinn 3",
    },
    // Grand Budapest Hotel
    {
        movie_id: 9,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T21:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 9,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T22:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 9,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T17:00:00Z"),
        location: "Tallinn 3",
    },
    // Live at Madison Square Garden
    {
        movie_id: 10,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T22:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 10,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T20:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 10,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T22:00:00Z"),
        location: "Tallinn 3",
    },
    // The Godfather
    {
        movie_id: 11,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T18:30:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 11,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T19:30:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 11,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T18:30:00Z"),
        location: "Tallinn 3",
    },
    // Mad Max Fury Road
    {
        movie_id: 12,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T20:30:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 12,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T21:30:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 12,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T20:30:00Z"),
        location: "Tallinn 3",
    },
    // In Bruges
    {
        movie_id: 13,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T19:30:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 13,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T18:30:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 13,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T19:30:00Z"),
        location: "Tallinn 3",
    },
    // Knives Out
    {
        movie_id: 14,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T17:30:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 14,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T18:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 14,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T17:30:00Z"),
        location: "Tallinn 3",
    },
    // Whiplash
    {
        movie_id: 15,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T16:30:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 15,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T17:30:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 15,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T16:30:00Z"),
        location: "Tallinn 3",
    },
    // La La Land
    {
        movie_id: 16,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T15:30:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 16,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T16:30:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 16,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T15:30:00Z"),
        location: "Tallinn 3",
    },
    // Barbie
    {
        movie_id: 17,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T13:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 17,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T14:30:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 17,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T13:30:00Z"),
        location: "Tallinn 3",
    },
    // Phantom of the Opera
    {
        movie_id: 18,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T18:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 18,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T19:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 18,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T18:00:00Z"),
        location: "Tallinn 3",
    },
    // The Conjuring
    {
        movie_id: 19,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T23:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 19,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T23:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 19,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T23:00:00Z"),
        location: "Tallinn 3",
    },
    // Indiana Jones
    {
        movie_id: 20,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T14:30:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 20,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T15:30:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 20,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T14:30:00Z"),
        location: "Tallinn 3",
    },
    // The Notebook
    {
        movie_id: 21,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T16:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 21,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T17:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 21,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T16:00:00Z"),
        location: "Tallinn 3",
    },
    // Rocky
    {
        movie_id: 22,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T12:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 22,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T13:30:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 22,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T12:30:00Z"),
        location: "Tallinn 3",
    },
    // Hamilton
    {
        movie_id: 23,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T19:00:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 23,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T20:00:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 23,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T19:00:00Z"),
        location: "Tallinn 3",
    },
    // Gone Girl
    {
        movie_id: 24,
        show_date: new Date("2025-12-24"),
        show_time: new Date("2025-12-24T21:30:00Z"),
        location: "Tallinn 1",
    },
    {
        movie_id: 24,
        show_date: new Date("2025-12-25"),
        show_time: new Date("2025-12-25T22:30:00Z"),
        location: "Tallinn 2",
    },
    {
        movie_id: 24,
        show_date: new Date("2025-12-26"),
        show_time: new Date("2025-12-26T21:30:00Z"),
        location: "Tallinn 3",
    },
];


const seats = [
    ...generateSeats(),
];

export default { movies, images, gallery, showtimes, seats, generateSeats }