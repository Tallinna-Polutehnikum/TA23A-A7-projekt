<script setup>
import Pagination from '../components/Pagination.vue';
import FilmCard from '../components/FilmCard.vue';
import Filter from '../components/Filter.vue';
</script>

<template>
    <!-- Search bar and genre dropdown -->
    <div class="filter">
        <Filter></Filter>
    </div>
    <!-- Film cards grid -->
    <div class="films">
        <div class="columns is-multiline">
            <div class="column is-one-quarter">
                <FilmCard></FilmCard>
            </div>
        </div>
    </div>
    <!-- Pagination buttons -->
    <div class="pagination">
        <Pagination></Pagination>
    </div>
</template>

<style scoped></style>