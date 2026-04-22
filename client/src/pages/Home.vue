<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Filter from '../components/Filter.vue';
import FilmCard from '../components/FilmCard.vue';
import Pagination from '../components/Pagination.vue';

const movies = ref([]); // all movies from backend
const searchQuery = ref(''); // for search bar
const selectedGenre = ref('All'); // filter
const genres = ref([
  'All', 'Anime', 'Ballet', 'Documentary', 'Drama', 
  'Fantasy', 'Family', 'Comedy', 'Concert', 'Crime', 'Action', 
  'Black humor', 'Mystery', 'Music', 'Musical', 'Doll movie', 
  'Opera', 'Horror', 'Adventure', 'Romance', 'Sport', 'Theater', 'Thiller', 'Ci-Fi'
]);

// Pagination
const currentPage = ref(1);
const moviesPerPage = 12; // adjust
const paginatedMovies = ref([]);

// Fetch all movies
const fetchMovies = async () => {
  try {
    const res = await fetch('http://localhost:5000/home'); 
    if (!res.ok) throw new Error('Failed to fetch movies');
    movies.value = await res.json();
    updatePagination();
  } catch (err) {
    console.error(err);
  }
};

// Filtered movies (search + genre)
const filteredMovies = computed(() => {
  return movies.value.filter(movie => {
    const matchesGenre = selectedGenre.value === 'All' || movie.genre.includes(selectedGenre.value);
    const matchesSearch = movie.title.toLowerCase().includes(searchQuery.value.toLowerCase());
    return matchesGenre && matchesSearch;
  });
});

// Update paginated movies
const updatePagination = () => {
  const start = (currentPage.value - 1) * moviesPerPage;
  const end = start + moviesPerPage;
  paginatedMovies.value = filteredMovies.value.slice(start, end);
};

// Watch filters and search to reset page & update pagination
watch([searchQuery, selectedGenre, filteredMovies], () => {
  currentPage.value = 1;
  updatePagination();
});

// Handle page change from Pagination.vue
const changePage = (page) => {
  currentPage.value = page;
  updatePagination();
};

onMounted(fetchMovies);
</script>

<template>
  <!-- Filter + search -->
  <div class="filter mb-5">
    <Filter
      v-model:search="searchQuery"
      v-model:genre="selectedGenre"
      :genres="genres"
    />
  </div>

  <!-- Movies -->
  <div class="films mt-5 mb-5">
    <div class="columns is-multiline">
      <div v-if="paginatedMovies.length === 0" class="has-text-danger">
        No results :(
      </div>

      <div
        class="column is-one-quarter"
        v-for="film in paginatedMovies"
        :key="film.id"
      >
        <FilmCard :movie="film" />
      </div>
    </div>
  </div>

  <!-- Pagination -->
  <div class="pager mt-5" v-if="filteredMovies.length > moviesPerPage">
    <Pagination
      :total-pages="Math.ceil(filteredMovies.length / moviesPerPage)"
      :current-page="currentPage"
      @page-changed="changePage"
    />
  </div>
</template>

<style scoped>
.has-text-danger {
  text-align: center;
  width: 100%;
  margin-top: 20px;
}
</style>
