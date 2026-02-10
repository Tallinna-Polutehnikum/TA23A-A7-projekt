<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

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
                        <div class="confirmation-stack">
                            <div class="title_container">
                                <h1 class="title has-text-centered mgb-large">Thank you for the purchase!</h1>
                            </div>
                            <div class="ticket_info_container">
                                <p class="has-text-centered">
                                    Thank you for purchasing your movie ticket! We have sent the ticket on the e-mail
                                    address: example.example.com
                                </p>
                                <p><strong>Film info</strong></p>
                                <p>Title:</p>
                                <p>Genre:</p>
                                <p>Duration:</p>
                                <br>
                                <p><strong>Showtime</strong></p>
                                <p>Starting:</p>
                                <p>Location:</p>
                                <p>Seat:</p>
                            </div>
                            <div class="buttons_container">
                                <!--
                                <button class="button is-fullwidth is-medium mt-4">
                                    Download a copy
                                </button>
                                -->
                                <button class="button is-primary is-fullwidth is-medium mt-4" @click="goToHome">
                                    Home
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<style scoped>
.title_container {
    margin-bottom: 20px;
}
</style>