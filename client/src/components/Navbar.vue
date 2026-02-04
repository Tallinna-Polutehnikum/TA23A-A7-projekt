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
    <!-- Needs bit more work to do, made initial changes -->
    <nav class="navbar my-navbar" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <div class="navbar-item">
                <img src="../assets/favicon.ico" alt="favicon">
            </div>
        </div>
        <div class="navbar-menu">
            <div class="navbar-start">
                <router-link class="navbar-item navbar-burger" to="/">Home</router-link>
                <router-link class="navbar-item navbar-burger" to="/panel">Panel</router-link>
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

