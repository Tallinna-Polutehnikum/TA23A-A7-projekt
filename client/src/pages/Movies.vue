<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import cinemaImg from "../assets/cinema.jpg";
import photo1 from "../assets/Gallerypics/photo1.jpg";
import photo2 from "../assets/Gallerypics/photo2.jpg";
import photo3 from "../assets/Gallerypics/photo3.jpg";

// Router
const router = useRouter();

// Film ja gallery andmed
const movieData = ref({
  title: "The Conjuring: Last Rites",
  ageRating: "K-12",
  genre: "Thriller, Horror",
  director: "Michael Chaves",
  duration: "2h 16min",
  cast: ["Vera Farmiga", "Patrick Wilson", "Madison Lawlor"],
  trailerUrl: "https://www.youtube.com/embed/_8UxSWnj49U?si=2vk8Xt62xfxnWkdi",
  description: [
    "“Kurja kutsumise” universumi üheksas peatükk “Kurja kutsumine 4. Viimased riitused” on New Line Cinema film, mille lavastas filmisarja veteran Michael Chaves...",
    "“Kurja kutsumine 4. Viimased riitused” on ikoonilise universumi järjekordne tõsielusündmustel põhinev peatükk...",
    "Lisaks Farmigale ja Wilsonile saab filmis näha Mia Tomlinsoni ja Ben Hardyt...",
    "Filmi lavastas Chaves ja stsenaariumi autorid on Ian Goldberg, Richard Naing...",
    "Chavese võttemeeskonna moodustasid operaator Eli Born, kunstnik John Frankish...",
    "“Kurja kutsumine 4. Viimased riitused” on New Line Cinema, A Safran Company...",
    "Film linastub ka innovaatilises ICE kinosaalis."
  ],
  photos: [photo1, photo2, photo3],
  mainPhoto: photo2
});

// Gallery
const photos = movieData.value.photos;
const showGallery = ref(false);
const currentIndex = ref(0);

const openGallery = (index = 0) => {
  currentIndex.value = index;
  showGallery.value = true;
};
const closeGallery = () => (showGallery.value = false);
const nextPhoto = () => (currentIndex.value = (currentIndex.value + 1) % photos.length);
const prevPhoto = () => (currentIndex.value = (currentIndex.value - 1 + photos.length) % photos.length);

// Showtimes scroll
const showtimesSection = ref(null);
const goToShowtimes = () => {
  showtimesSection.value?.scrollIntoView({ behavior: "smooth" });
};
const goToSeats = () => {
  router.push("/seats");
};

// Näidised (dünaamilised, saab hiljem API-st laadida)
const showtimes = ref([
  { date: "2025-10-07", time: "11:00", location: "Apollo Kino Solaris", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-07", time: "12:00", location: "Apollo Kino Mustamäe", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-07", time: "13:00", location: "Apollo Kino Ülemiste", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-08", time: "14:00", location: "Apollo Kino Plaza", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-08", time: "20:00", location: "Apollo Kino Kristiine", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-09", time: "15:00", location: "Apollo Kino Lõunakeskus", city: "Tartu", genre: "Thriller, Horror" },
  { date: "2025-10-10", time: "18:00", location: "Apollo Kino Tasku", city: "Tartu", genre: "Thriller, Horror" }
]);

// Sorteeri kuupäeva järgi
showtimes.value.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

// Cities ja days (dünaamiliselt)
const selectedCity = ref("All cinemas");
const cities = ["All cinemas", "Tallinn", "Tartu", "Pärnu", "Saaremaa", "Narva", "Jõhvi", "Viljandi"];

function formatDate(date) {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return `${dd}.${mm}.${yy}`;
}

// days dünaamiliselt järgmised 7 päeva + "All days"
const days = ref(["All days"]);
for (let i = 0; i < 7; i++) {
  const d = new Date();
  d.setDate(d.getDate() + i);
  days.value.push(formatDate(d));
}
const selectedDay = ref("All days");

// Filtreeritud showtimes
const filteredShowtimes = computed(() => {
  return showtimes.value.filter(s => {
    const matchCity = selectedCity.value === "All cinemas" || s.city === selectedCity.value;
    const matchDay = selectedDay.value === "All days" || formatDate(s.date) === selectedDay.value;
    return matchCity && matchDay;
  });
});
</script>

<template>
  <!-- Main image -->
  <div class="box cinema-img-box">
    <img :src="cinemaImg" alt="Cinema" class="cinema-img" />
  </div>

  <!-- Trailer + Film info side by side -->
  <div class="columns trailer-film-columns">
    <!-- Trailer in its own box -->
   <div class="column box trailer-box">
  <iframe
    :src="movieData.trailerUrl"
    title="YouTube video player"
    frameborder="0"
    allowfullscreen
  ></iframe>

  <!-- Gallery button kohe treileri all -->
  <div class="gallery-btn-container">
    <button class="button is-primary" @click="openGallery(0)">Gallery</button>
  </div>
</div>


 <!-- Gallery overlay -->
  <div v-if="showGallery" class="gallery-overlay" @click.self="closeGallery">
    <div class="gallery-content">
      <img :src="photos[currentIndex]" class="gallery-photo" />
      <button class="button is-danger close-btn" @click="closeGallery">X</button>
      <button class="button is-success nav-btn prev-btn" @click="prevPhoto">‹</button>
      <button class="button is-success nav-btn next-btn" @click="nextPhoto">›</button>
    </div>
  </div>

    <!-- Film info in its own box -->
    <div class="column box film-info-box">
      <h2 class="title is-3 has-text-white">{{ movieData.title }}</h2>
      <p><strong>Age Rating:</strong> {{ movieData.ageRating }}</p>
      <p><strong>Genre:</strong> {{ movieData.genre }}</p>
      <p>
        <strong>Director: </strong>
        <a :href="'https://www.google.com/search?q=' + encodeURIComponent(movieData.director)" target="_blank">{{ movieData.director }}</a>
      </p>
      <p><strong>Duration:</strong> {{ movieData.duration }}</p>
      <p>
        <strong>Cast: </strong>
        <span v-for="(actor, i) in movieData.cast" :key="i">
          <a :href="'https://www.google.com/search?q=' + encodeURIComponent(actor)" target="_blank">{{ actor }}</a><span v-if="i < movieData.cast.length-1">, </span>
        </span>
      </p>
      <button class="button is-primary full-width-btn" @click="goToShowtimes">Showtimes</button>
    </div>
  </div>

 
 

  <!-- Description section -->
  <div class="description-section">
    <div class="description-text box">
      <p v-for="(desc, index) in movieData.description" :key="index">{{ desc }}</p>
    </div>
    <div class="box photo-box">
      <img :src="movieData.mainPhoto" alt="Photo" class="photo-right" />
    </div>
  </div>

  <!-- Showtimes -->
  <div ref="showtimesSection" class="showtimes-section">
    <h2 class="title is-4 has-text-white">Showtimes</h2>

    <div class="field is-grouped is-align-items-center is-justify-content-center">
      <div class="control">
        <div class="select is-primary">
          <select v-model="selectedCity">
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
        </div>
      </div>
      <div class="control">
        <div class="select is-primary">
          <select v-model="selectedDay">
            <option v-for="day in days" :key="day">{{ day }}</option>
          </select>
        </div>
      </div>
    </div>

    <div class="showtime-boxes">
      <div v-if="filteredShowtimes.length === 0" class="has-text-danger mt-4">
        No results :(
      </div>

      <div
        v-for="(s, index) in filteredShowtimes"
        :key="index"
        class="box showtime-box"
      >
        <div>
          <strong>{{ formatDate(s.date) }} {{ s.time }}</strong> - {{ s.location }} - {{ s.city }} 
        </div>
        <button class="button is-success is-pulled-right" @click="goToSeats">Find Seats</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* --- sama stiil nagu sul --- */
.cinema-img-box { width: 100%; max-width: 1500px; margin-left: 5px; margin-top: 50px; }
.cinema-img { width: 100%; height: auto; }
.trailer-film-columns { display: flex; gap: 40px; margin: 40px auto; max-width: 1200px; }
.trailer-box, .film-info-box { flex: 1; padding: 15px; box-sizing: border-box; }
.film-info-box { line-height: 1.9; }
.trailer-box iframe { width: 100%; height: 400px; }
.full-width-btn { width: 100%; margin-top: 20px; }
.gallery-btn-container {
  margin-top: 15px;
  text-align: center; /* keskele */
  clear: both;
}
/* Gallery overlay ja sisu */
.gallery-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 10px; /* väikene padding mobiilil */
}

.gallery-content {
  position: relative;
  text-align: center;
  max-width: 100%;
  max-height: 100%;
}

/* Pilt */
.gallery-photo {
  max-width: 90vw;
  max-height: 70vh;
  object-fit: contain;
}

/* Nupud */
.prev-btn,
.next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
  padding: 0.5rem 0.8rem;
  font-size: 1.2rem;
}

.prev-btn {
  left: -50px;
}

.next-btn {
  right: -50px;
}

/* Mobiilil */
@media screen and (max-width: 768px) {
  .gallery-photo {
    max-width: 95vw;
    max-height: 40vh; 
  }

  .prev-btn {
    left: 5px;
    top: 50%;
    transform: translateY(-50%);
  }
  .next-btn {
    right: 5px;
    top: 50%;
    transform: translateY(-50%);
  }

  .close-btn {
    top: 5px;
    right: 5px;
    padding: 0.5rem 0.8rem;
    font-size: 1rem;
  }
}


.description-section { display: flex; align-items: flex-start; margin-left: 50px; margin-top: 200px; gap: 50px; flex-wrap: wrap; }
.description-text { max-width: 600px; font-family: Arial, sans-serif; line-height: 1.8; }
.photo-box { padding: 10px; }
.photo-right {
  width: 520px;
  height: auto;        /* automaatne kõrgus, säilitab proportsiooni */
  max-height: 600px;   /* maksimaalne kõrgus */
  object-fit: contain;  /* kogu pilt kasti sisse */
}
.showtimes-section { margin: 50px auto; max-width: 800px; text-align: center; }
.showtime-box { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
@media screen and (max-width: 768px) {
  .trailer-film-columns { flex-direction: column; align-items: center; }
  .trailer-box iframe { height: 250px; }
  .description-section { flex-direction: column; align-items: center; }
  .photo-right { width: 100%; height: auto; }
}
</style>
