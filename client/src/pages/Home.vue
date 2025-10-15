<script setup>
import Filter from '../components/Filter.vue';
import FilmCard from '../components/FilmCard.vue';
import Pagination from '../components/Pagination.vue';
</script>

<template>
    <!-- Search bar and genre dropdown -->
    <div class="filter mb-5">
        <Filter></Filter>
    </div>
    <!-- Film cards grid -->
    <div class="films mt-5 mb-5">
        <div class="columns is-multiline">
            <div class="column is-one-quarter" v-for="films in 20" :key="films"> <!-- for testing purpposes -->
                <FilmCard/>
            </div>
        </div>
    </div>
    <!-- Pagination buttons -->
    <div class="pager mt-5">
        <Pagination></Pagination>
    </div>
</template>

<style scoped></style>