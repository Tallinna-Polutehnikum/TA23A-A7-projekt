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
            <a class="navbar-item">
                <img src="../assets/favicon.ico" alt="Cinema logo">
                <span>Cinema app</span>
            </a>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item navbar-burger" to="/">Movies</router-link>
                <router-link class="navbar-item navbar-burger" to="/About">About</router-link>
                <router-link class="navbar-item navbar-burger" to="/Contact">Contact</router-link>
                <router-link class="navbar-item navbar-burger" to="/Panel">Panel</router-link>
            </div>
            <div class="navbar-end">
                <router-link class="navbar-item navbar-burger" to="/my-tickets">
                    Tickets
                </router-link>
                <div class="navbar-item">
                    <a class="button " @click="toggleTheme">
                        {{ theme === 'light' ? '☀️' : '🌙' }}
                    </a>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.my-navbar {
    background-color: #13a6b9;
}

.navbar-item {
    font-weight: 500;
    color: #ffffff;
}

.navbar-burger {
    border-radius: 4px;
    padding: 10px 40px;
}

.navbar-burger:hover {
    background-color: rgba(0, 0, 0, 0.1);
}

.navbar-burger.router-link-active,
.navbar-burger.router-link-exact-active {
    background-color: rgba(0, 0, 0, 0.4);
}

.navbar-brand .navbar-item:hover,
.navbar-brand .navbar-item:focus {
    background-color: rgba(0, 0, 0, 0.1);
}
</style>