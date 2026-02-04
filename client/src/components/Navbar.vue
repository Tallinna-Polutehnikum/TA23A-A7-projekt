<script>
export default {
    data() {
        return {
            theme: localStorage.getItem('theme') || 'light'
        };
    },
    methods: {
        toggleTheme() {
            this.theme = this.theme === 'light' ? 'dark' : 'light';
            localStorage.setItem('theme', this.theme);
            document.documentElement.setAttribute('data-theme', this.theme);
        }
    },
    mounted() {
        document.documentElement.setAttribute('data-theme', this.theme);
    }
};
</script>

<template>
    <nav class="navbar my-navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link class="navbar-item" to="/">Cinema</router-link>
        </div>

        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item" to="/movies">Movies</router-link>
                <router-link class="navbar-item" to="/seats?id=3">Seats</router-link>
                <router-link class="navbar-item" to="/seat-selector?id=3&tickets=3&seatType=single">Seat Selection</router-link>
                <router-link class="navbar-item" to="/email-verification?id=3&tickets=3&seatType=Single&seats=E13,F13,G13">Email Verification</router-link>
                <router-link class="navbar-item" to="/payment?email=Example@gmail.com&id=3&tickets=3&seatType=Single&seats=E13,F13,G13">Payment</router-link>
            </div>

            <div class="navbar-end">
                <div class="navbar-item">
                    <button class="button" @click="toggleTheme">
                        {{ theme === 'light' ? '☀️' : '🌙' }}
                    </button>
                </div>
            </div>
        </div>
    </nav>
</template>