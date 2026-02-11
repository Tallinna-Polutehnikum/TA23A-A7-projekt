<script setup>
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const email = route.query.email;
const title = route.query.title;
const genre = route.query.genre;
const duration = route.query.duration;
const date = route.query.date;
const time = route.query.time;
const location = route.query.location;
const seats = route.query.seats;
const tickets = route.query.tickets;
const total = route.query.total;

function goToHome() {
    router.push("/");
}
</script>

<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-half">
                    <div class="box">
                        <h1 class="title has-text-centered mb-5">Thank you for your purchase!</h1>
                        <p class="has-text-centered mb-5">
                            Thank you for purchasing your movie ticket! We have sent the ticket on the e-mail
                            address: {{ email }}
                        </p>
                        <div class="mb-5">
                            <p><strong>Film info</strong></p>
                            <p>Title: {{ title }}</p>
                            <p>Genre: {{ genre }}</p>
                            <p>Duration: {{ duration }} min</p>
                        </div>
                        <div class="mb-5">
                            <p><strong>Showtime</strong></p>
                            <p>Date & Time: {{ date }} at {{ time }}</p>
                            <p>Location: {{ location }}</p>
                            <p>Seats: {{ seats }}</p>
                        </div>
                        <div class="mb-5">
                            <p>Tickets: {{ tickets }}</p>
                            <p>Total: €{{ total }}</p>
                        </div>
                        <p class="has-text-centered mb-5">
                            Please present this ticket (digital or printed) at the entrance.<br>
                            For assistance, contact us at support@example.com.
                        </p>
                        <div class="buttons is-centered">
                            <button class="button is-primary is-fullwidth is-medium mt-4" @click="goToHome">
                                Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
</style>