<script setup>
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// Movie data
const movieData = ref(null);

// Gallery
const showGallery = ref(false);
const currentIndex = ref(0);

// Filters
const selectedCity = ref("All cinemas");
const selectedDay = ref("All days");
const cities = ref(["All cinemas"]);
const days = ref(["All days"]);

// Utils
function formatDate(date) {
  const d = new Date(date);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = String(d.getFullYear()).slice(2);
  return `${dd}.${mm}.${yy}`;
}

// Fetch movie by ID from backend, or first movie if no ID
const fetchMovie = async () => {
  try {
    let id = route.params.id;

    // If no ID, fetch all movies and pick first
    if (!id) {
      const resAll = await fetch("http://localhost:5000/home"); // route that returns all movies
      if (!resAll.ok) throw new Error("Failed to fetch movies");
      const allMovies = await resAll.json();
      if (!allMovies.length) return;
      id = allMovies[0].id;
    }

    const res = await fetch(`http://localhost:5000/movies/${id}`);
    if (!res.ok) throw new Error("Movie not found");
    const data = await res.json();
    movieData.value = data;

    // Extract unique cities from showtimes
    const movieCities = data.showtimes.map(s => s.city);
    cities.value = ["All cinemas", ...new Set(movieCities)];

    // Fill next 7 days dynamically
    days.value = ["All days"];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.value.push(formatDate(d));
    }
  } catch (err) {
    console.error(err);
  }
};

onMounted(fetchMovie);

// Watch for route changes
watch(() => route.params.id, () => {
  fetchMovie();
});

// Filtered showtimes
const filteredShowtimes = computed(() => {
  if (!movieData.value) return [];
  return movieData.value.showtimes.filter(s => {
    const matchCity = selectedCity.value === "All cinemas" || s.city === selectedCity.value;
    const matchDay = selectedDay.value === "All days" || formatDate(s.show_date) === selectedDay.value;
    return matchCity && matchDay;
  }).sort((a, b) => new Date(`${a.show_date}T${a.show_time}`) - new Date(`${b.show_date}T${b.show_time}`));
});

// Gallery photos
const photos = computed(() => {
  if (!movieData.value || !movieData.value.images) return [];
  return movieData.value.images.flatMap(img => img.gallery.map(g => g.image));
});

// Gallery controls
const openGallery = (index = 0) => { currentIndex.value = index; showGallery.value = true; };
const closeGallery = () => (showGallery.value = false);
const nextPhoto = () => (currentIndex.value = (currentIndex.value + 1) % photos.value.length);
const prevPhoto = () => (currentIndex.value = (currentIndex.value - 1 + photos.value.length) % photos.value.length);

// Scroll to showtimes
const goToShowtimes = () => { document.getElementById("showtimes").scrollIntoView({ behavior: "smooth" }); };
const goToSeats = () => { router.push("/seats"); };
</script>

<template>
  <div v-if="movieData">
    <!-- Main header image -->
    <div class="box cinema-img-box">
      <img :src="`http://localhost:5000/${movieData.images[0]?.film_header_image}`" alt="Cinema" class="cinema-img" />
    </div>

    <!-- Trailer + Film info -->
    <div class="columns trailer-film-columns">
      <div class="column box trailer-box">
        <iframe
          :src="movieData.trailer_url"
          title="YouTube video player"
          frameborder="0"
          allowfullscreen
        ></iframe>

        <!-- Gallery button -->
        <div class="gallery-btn-container">
          <button class="button is-primary" @click="openGallery(0)">Gallery</button>
        </div>
      </div>

      <div class="column box film-info-box">
        <h2 class="title is-3 has-text-white">{{ movieData.title }}</h2>
        <p><strong>Age Rating:</strong> {{ movieData.age_rating }}</p>
        <p><strong>Genre:</strong> {{ movieData.genre }}</p>
        <p>
          <strong>Director:</strong>
          <a :href="'https://www.google.com/search?q=' + encodeURIComponent(movieData.director)" target="_blank">{{ movieData.director }}</a>
        </p>
        <p><strong>Duration:</strong> {{ movieData.duration }} min</p>
        <p>
          <strong>Cast:</strong>
          <span v-for="(actor, i) in movieData.cast.split(',')" :key="i">
            <a :href="'https://www.google.com/search?q=' + encodeURIComponent(actor.trim())" target="_blank">{{ actor.trim() }}</a>
            <span v-if="i < movieData.cast.split(',').length-1">, </span>
          </span>
        </p>
        <button class="button is-primary full-width-btn" @click="goToShowtimes">Showtimes</button>
      </div>
    </div>

    <!-- Description + main photo -->
    <div class="description-section">
      <div class="description-text box">
        <p v-for="(desc, index) in movieData.description.split('. ')" :key="index">{{ desc }}.</p>
      </div>
      <div class="box photo-box">
        <img :src="`http://localhost:5000/${movieData.images[0]?.film_cover}`" alt="Photo" class="photo-right" />
      </div>
    </div>

    <!-- Showtimes section -->
    <div ref="showtimesSection" id="showtimes" class="showtimes-section">
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
          :key="s.id"
          class="box showtime-box"
        >
          <div>
            <strong>{{ formatDate(s.show_date) }} {{ s.show_time }} </strong> - {{ s.location }} - {{ s.city }}
          </div>
          <button class="button is-success is-pulled-right" @click="goToSeats">Find Seats</button>
        </div>
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
  </div>
</template>

<style scoped>
.cinema-img-box { width: 100%; max-width: 1500px; margin-left: 5px; margin-top: 50px; }
.cinema-img { width: 100%; height: auto; }
.trailer-film-columns { display: flex; gap: 40px; margin: 40px auto; max-width: 1200px; }
.trailer-box, .film-info-box { flex: 1; padding: 15px; box-sizing: border-box; }
.film-info-box { line-height: 1.9; height: 20rem; margin-top: 7.1%; }
.trailer-box iframe { width: 100%; height: 400px; }
.full-width-btn { width: 100%; margin-top: 20px; }
.gallery-btn-container { margin-top: 15px; text-align: center; clear: both; }
.gallery-overlay { position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; padding: 10px; }
.gallery-content { position: relative; text-align: center; max-width: 100%; max-height: 100%; }
.gallery-photo { max-width: 90vw; max-height: 70vh; object-fit: contain; }
.prev-btn, .next-btn { position: absolute; top: 50%; transform: translateY(-50%); z-index: 10; padding: 0.5rem 0.8rem; font-size: 1.2rem; }
.prev-btn { left: -50px; }
.next-btn { right: -50px; }
@media screen and (max-width: 768px) {
  .gallery-photo { max-width: 95vw; max-height: 40vh; }
  .prev-btn { left: 5px; top: 50%; transform: translateY(-50%); }
  .next-btn { right: 5px; top: 50%; transform: translateY(-50%); }
  .close-btn { top: 5px; right: 5px; padding: 0.5rem 0.8rem; font-size: 1rem; }
  .trailer-film-columns { flex-direction: column; align-items: center; }
  .trailer-box iframe { height: 250px; }
  .description-section { flex-direction: column; align-items: center; }
  .photo-right { width: 100%; height: auto; }
}
.description-section { display: flex; align-items: flex-start; margin-left: 50px; margin-top: 30px; gap: 50px; flex-wrap: wrap; }
.description-text { max-width: 600px; font-family: Arial, sans-serif; line-height: 1.8; }
.photo-box { padding: 10px; }
.photo-right { width: 520px; height: auto; max-height: 600px; object-fit: contain; }
.showtimes-section { margin: 30px auto; max-width: 800px; text-align: center; }
.showtime-box { display: flex; justify-content: space-between; align-items: center; margin-top: 10px; }
</style>
