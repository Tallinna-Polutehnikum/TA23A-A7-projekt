<script setup>
import { useRouter } from 'vue-router';
import exampleImage from '../assets/photo1.jpg';

const router = useRouter();

function goToMovies() {
    router.push('/movies');
}
</script>

<template>
    <div class="card" @click="goToMovies">
        <div class="card-image">
            <img :src="exampleImage" alt="example image" />
        </div>
        <div class="card-content">
            <p class="title is-4">Title</p>
            <p class="subtitle is-6">Genre</p>
        </div>
    </div>
</template>

<style scoped>
.card:hover {
    cursor: pointer;
}
</style>