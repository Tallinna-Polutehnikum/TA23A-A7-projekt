<script setup>
import ContributorCard from '@/components/ContributorCard.vue';

const contributors = [
    {
        name: "Martin Pruus",
        username: "martinprs",
        avatarUrl: "https://avatars.githubusercontent.com/u/144675657?v=4",
        githubUrl: "https://github.com/martinprs",
    },
    {
        name: "Relina Russak",
        username: "relinar",
        avatarUrl: "https://avatars.githubusercontent.com/u/145341776?v=4",
        githubUrl: "https://github.com/relinar",
    },
    {
        name: "Tauri Tammela",
        username: "markusmikk100",
        avatarUrl: "https://avatars.githubusercontent.com/u/47485001?v=4",
        githubUrl: "https://github.com/markusmikk100",
    },
];
</script>

<template>
    <section class="section">
        <div class="container">
            <div class="box">
                <div class="content">
                    <h1>About Cinema app</h1>
                    <p>
                        Cinema app is a full-stack web application that lets users browse movies, choose seats, and book
                        tickets online. This is not a legit site so you can't actually purchase a ticket to a movie, its
                        a team project for a school assignment.
                    </p>
                </div>
                <div class="developers">
                    <div class="content has-text-centered">
                        <p class="title is-4">Contributors</p>
                    </div>
                    <div class="columns is-multiline is-variable is-4">
                        <div v-for="(contributor, index) in contributors" :key="index" class="column is-4">
                            <ContributorCard :contributor="contributor" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.box {
    padding: 2rem;
}
</style>