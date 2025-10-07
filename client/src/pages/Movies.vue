<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import cinemaImg from "../assets/cinema.jpg";
import photo1 from "../assets/Gallerypics/photo1.jpg";
import photo2 from "../assets/Gallerypics/photo2.jpg";
import photo3 from "../assets/Gallerypics/photo3.jpg";

const router = useRouter();

const photos = [photo1, photo2, photo3];
const showGallery = ref(false);
const currentIndex = ref(0);

const openGallery = (index = 0) => {
  currentIndex.value = index;
  showGallery.value = true;
};
const closeGallery = () => (showGallery.value = false);
const nextPhoto = () => (currentIndex.value = (currentIndex.value + 1) % photos.length);
const prevPhoto = () => (currentIndex.value = (currentIndex.value - 1 + photos.length) % photos.length);

const showtimesSection = ref(null);
const goToShowtimes = () => {
  showtimesSection.value?.scrollIntoView({ behavior: "smooth" });
};
const goToSeats = () => {
  router.push("/seats");
};

// Showtimes data
const showtimes = [
  { date: "2025-10-07", time: "11:00", location: "Apollo Kino Solaris", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-07", time: "12:00", location: "Apollo Kino Mustamäe", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-07", time: "13:00", location: "Apollo Kino Ülemiste", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-08", time: "14:00", location: "Apollo Kino Plaza", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-08", time: "20:00", location: "Apollo Kino Kristiine", city: "Tallinn", genre: "Thriller, Horror" },
  { date: "2025-10-09", time: "15:00", location: "Apollo Kino Lõunakeskus", city: "Tartu", genre: "Thriller, Horror" },
  { date: "2025-10-10", time: "18:00", location: "Apollo Kino Tasku", city: "Tartu", genre: "Thriller, Horror" },
];

// Sort by date then time
showtimes.sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

// Cinema selection
const selectedCity = ref("All cinemas");
const cities = ["All cinemas", "Tallinn", "Tartu", "Pärnu", "Saaremaa", "Narva", "Jõhvi", "Viljandi"];

// Generate next 7 days for day selector
function formatDate(date) {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return `${dd}.${mm}.${yy}`;
}
const days = ["All days"];
for (let i = 0; i < 7; i++) {
  const d = new Date();
  d.setDate(d.getDate() + i);
  days.push(formatDate(d));
}
const selectedDay = ref("All days");

// Filtered showtimes
const filteredShowtimes = computed(() => {
  return showtimes.filter(s => {
    const matchCity = selectedCity.value === "All cinemas" || s.city === selectedCity.value;
    const matchDay = selectedDay.value === "All days" || formatDate(s.date) === selectedDay.value;
    return matchCity && matchDay;
  });
});
</script>

<template>
  <!-- main picture -->
  <img :src="cinemaImg" alt="Cinema" class="cinema-img" />

  <!-- trailer -->
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/_8UxSWnj49U?si=2vk8Xt62xfxnWkdi"
    title="YouTube video player"
    frameborder="0"
    allowfullscreen
    class="trailer"
  ></iframe>

  <!-- gallery button -->
  <div class="gallery-btn-container">
    <button class="button is-primary" @click="openGallery(0)">Gallery</button>
  </div>

  <!-- gallery overlay -->
  <div v-if="showGallery" class="gallery-overlay" @click.self="closeGallery">
    <div class="gallery-content">
      <img :src="photos[currentIndex]" class="gallery-photo" />
      <button class="button is-danger close-btn" @click="closeGallery">X</button>
      <button class="button is-success nav-btn prev-btn" @click="prevPhoto">‹</button>
      <button class="button is-success nav-btn next-btn" @click="nextPhoto">›</button>
    </div>
  </div>

  <!-- film info -->
  <div class="film-info">
    <h2>The Conjuring: Last Rites</h2>
    <p><strong>Age Rating:</strong> K-12</p>
    <p><strong>Genre:</strong> Thriller, Horror</p>
    <p>
      <strong>Director:</strong>
      <a :href="'https://www.google.com/search?q=' + encodeURIComponent('Michael Chaves')" target="_blank">Michael Chaves</a>
    </p>
    <p><strong>Duration:</strong> 2h 16min</p>
    <p>
      <strong>Cast:</strong>
      <a :href="'https://www.google.com/search?q=' + encodeURIComponent('Vera Farmiga')" target="_blank">Vera Farmiga</a>,
      <a :href="'https://www.google.com/search?q=' + encodeURIComponent('Patrick Wilson')" target="_blank">Patrick Wilson</a>,
      <a :href="'https://www.google.com/search?q=' + encodeURIComponent('Madison Lawlor')" target="_blank">Madison Lawlor</a>
    </p>

    <button class="button is-primary" @click="goToShowtimes">Showtimes</button>
  </div>

  <!-- description section -->
  <div class="description-section">
    <div class="description-text">
      <p>“Kurja kutsumise” universumi üheksas peatükk “Kurja kutsumine 4. Viimased riitused” on New Line Cinema film, mille lavastas filmisarja veteran Michael Chaves ja produtsendid on filmisarja loojad James Wan ja Peter Safran.</p>

      <p>“Kurja kutsumine 4. Viimased riitused” on ikoonilise “Kurja kutsumise” universumi järjekordne tõsielusündmustel põhinev peatükk. Vera Farmiga ja Patrick Wilson kehastavad globaalse hittsarja hirmuäratavas uusimas filmis viimast korda tuntud paranormaalsuste uurijaid Ed ja Lorraine Warrenit.</p>

      <p>Lisaks Farmigale ja Wilsonile saab filmis näha Mia Tomlinsoni ja Ben Hardyt vastavalt Edi ja Lorraine’i tütre Judy Warreni ja tema poiss-sõbra Tony Spera rollides. Steve Coulter kehastab taas isa Gordonit. Filmis mängivad veel Rebecca Calder, Elliot Cowan, Kíla Lord Cassidy, Beau Gadsdon, John Brotherton ja Shannon Kook.</p>

      <p>Filmi lavastas Chaves ja stsenaariumi autorid on Ian Goldberg, Richard Naing ja David Leslie Johnson-McGoldrick. Chad Hayesi ja Carey W. Hayesi loodud tegelaskujudel põhineva loo kirjutasid David Leslie Johnson-McGoldrick ja James Wan. Tegevprodutsendid on Michael Clear, Judson Scott, Natalia Safran, John Rickard, Hans Ritter ja David Leslie Johnson-McGoldrick.</p>

      <p>Chavese võttemeeskonna moodustasid operaator Eli Born, kunstnik John Frankish, monteerijad Elliot Greenberg ja Gregory Plotkin, visuaalefektide looja Scott Edelstein, visuaalefektide produtsent Eric Bruneau ja kostüümikunstnik Graham Churchyard. Näitlejad valisid Rose Wicksteed ja Sophie Kingston-Smith. Muusikaline juht oli Ian Broucek ja helilooja Benjamin Wallfisch.</p>

      <p>“Kurja kutsumine 4. Viimased riitused” on New Line Cinema, A Safran Company ja An Atomic Monster Productioni film, mida levitab üleilmselt Warner Bros. Pictures. Film linastub kinodes, ka IMAX-is, 5. septembrist 2025.</p>

      <p>Film linastub ka innovaatilises ICE kinosaalis.</p>
    </div>

    <img :src="photo2" alt="Photo 2" class="photo-right" />
  </div>

  <!-- showtimes section -->
  <div ref="showtimesSection" class="showtimes-section">
    <h2 class="title is-4">Showtimes</h2>
    <div class="field is-grouped is-align-items-center">
      <div class="control">
        <div class="select">
          <select v-model="selectedCity">
            <option v-for="city in cities" :key="city">{{ city }}</option>
          </select>
        </div>
      </div>
      <div class="control">
        <div class="select">
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
  <div v-for="(s, index) in filteredShowtimes" :key="index" class="box showtime-box">
    <div>
      <strong>{{ formatDate(s.date) }} {{ s.time }}</strong> - {{ s.location }} - {{ s.city }} - {{ s.genre }}
    </div>
    <button class="button is-primary is-pulled-right" @click="goToSeats">Find Seats</button>
  </div>
</div>
  </div>
</template>

<style scoped>
.cinema-img { width: 1500px; height: 300px; margin-left: 5px; margin-top: 50px; }
.trailer { float: left; margin-left: 100px; margin-top: 150px; }
.gallery-btn-container { float: left; margin-left: 350px; margin-top: 20px; clear: both; }
.gallery-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
.gallery-content { position: relative; text-align: center; }
.gallery-photo { max-width: 90vw; max-height: 80vh; }
.close-btn { position: absolute; top: 10px; right: 10px; }
.nav-btn { position: absolute; top: 50%; transform: translateY(-50%); }
.prev-btn { left: -50px; }
.next-btn { right: -50px; }
.film-info { font-family: Arial, sans-serif; line-height: 2.2; margin-left: 900px; margin-top: 150px; max-width: 800px; }
.description-section { display: flex; align-items: flex-start; margin-left: 50px; margin-top: 200px; gap: 50px; }
.description-text { max-width: 600px; font-family: Arial, sans-serif; line-height: 1.8; }
.photo-right { width: 600px; height: 900px; }
.showtimes-section { margin: 50px auto; max-width: 800px; text-align: center; }
.showtime-box { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
</style>
