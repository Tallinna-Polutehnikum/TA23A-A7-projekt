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
  router.push(`/movies/${props.movie.id}`);
};
</script>

<template>
  <div class="card" @click="goToMovies">
    <div class="card-image">
      <img :src="movie.images[0]?.film_cover" alt="Movie cover" />
    </div>
    <div class="card-content">
      <p class="title is-4">{{ movie.title }}</p>
      <p class="subtitle is-6">{{ movie.genre }}</p>
    </div>
  </div>
</template>

<style scoped>
.card:hover {
  cursor: pointer;
}
</style>
