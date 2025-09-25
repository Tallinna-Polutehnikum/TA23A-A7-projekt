<script setup>
// example image
import exampleImage from '../assets/photo1.jpg'
</script>

<template>
    <router-link class="navbar-item" to="movies">
        <div class="card">
            <div class="card-image">
                <img :src="exampleImage" alt="example image" />
            </div>
            <div class="card-content">
                <p class="title is-4">Title</p>
                <p class="subtitle is-6">Genre</p>
            </div>
        </div>
    </router-link>
</template>

<style scoped>
.card:hover {
    cursor: pointer;
}
</style>