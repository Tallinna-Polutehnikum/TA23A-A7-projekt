<script setup>
import Pagination from '../components/Pagination.vue';
import FilmCard from '../components/FilmCard.vue';
import Filter from '../components/Filter.vue';
</script>

<template>
    <!-- Search bar and genre dropdown -->
    <div class="columns">
        <Filter></Filter>
    </div>
    <!-- Film cards grid -->
    <div class="columns is-multiline">
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>

        <!--for grid test purpposes-->
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
        <div class="column is-one-quarter">
            <FilmCard></FilmCard>
        </div>
    </div>
    <!-- Pagination buttons -->
    <div class="columns">
        <Pagination></Pagination>
    </div>

</template>

<style scoped></style>