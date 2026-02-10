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
                        <h1 class="title has-text-centered mb-5">Thank you for your purchase!</h1>
                        <p class="has-text-centered mb-5">
                            Thank you for purchasing your movie ticket! We have sent the ticket on the e-mail
                            address: example.example@gmail.com
                        </p>
                        <div class="mb-5">
                            <p><strong>Film info</strong></p>
                            <p>Title:</p>
                            <p>Genre:</p>
                            <p>Duration:</p>
                        </div>
                        <div class="mb-5">
                            <p><strong>Showtime</strong></p>
                            <p>Date & Time:</p>
                            <p>Location:</p>
                            <p>Seat:</p>
                        </div>
                        <div class="content mb-5">
                            <p>Ticket number:</p>
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