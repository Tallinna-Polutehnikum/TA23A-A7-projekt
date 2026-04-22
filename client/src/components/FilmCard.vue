<script setup>
import { useRouter } from 'vue-router';

// Accept movie as prop
const props = defineProps({
  movie: {
    type: Object,
    required: true
  }
});

const router = useRouter();

const goToMovies = () => {
  router.push({ path: '/movies', query: { id: props.movie.id } });
};
</script>

<template>
  <div class="card" @click="goToMovies">
    <div class="card-image">
      <img :src="`http://localhost:5000/${movie.images[0]?.film_cover}`" alt="Movie cover" />
    </div>
    <div class="card-content">
      <p class="title is-4">{{ movie.title }}</p>
      <p class="subtitle is-6">{{ movie.genre }}</p>
    </div>
  </div>
</template>

<style scoped>
.card {
  height: 100%;
}

.card-image {
  aspect-ratio: 2 / 3;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.card:hover {
  cursor: pointer;
}
</style>
