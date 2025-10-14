<script setup>
function toggleDropdown() {
    console.log("Dropdown clicked");
}
</script>

<template>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css">

    <div class="filter_container">
        <!-- Search bar -->
        <div class="field has-addons search_bar">
            <div class="control is-expanded">
                <input class="input is-normal" type="text" placeholder="Insert film name" />
            </div>
            <div class="control">
                <button class="button is-primary">Search</button>
            </div>
        </div>

        <!-- Genre dropdown -->
        <div class="dropdown">
            <div class="dropdown-trigger">
                <button class="button is-primary" aria-haspopup="true" aria-controls="dropdown-menu" @click="toggleDropdown()">
                    <span>Genre</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                    <button class="dropdown-item">Animation</button>
                    <button class="dropdown-item">Anime</button>
                    <button class="dropdown-item">Ballet</button>
                    <button class="dropdown-item">Documentary</button>
                    <button class="dropdown-item">Drama</button>
                    <button class="dropdown-item">Fantasy</button>
                    <button class="dropdown-item">Family</button>
                    <button class="dropdown-item">Comedy</button>
                    <button class="dropdown-item">Concert</button>
                    <button class="dropdown-item">Crime</button>
                    <button class="dropdown-item">Action</button>
                    <button class="dropdown-item">Black humor</button>
                    <button class="dropdown-item">Mystery</button>
                    <button class="dropdown-item">Music</button>
                    <button class="dropdown-item">Musical</button>
                    <button class="dropdown-item">Doll movie</button>
                    <button class="dropdown-item">Opera</button>
                    <button class="dropdown-item">Horror</button>
                    <button class="dropdown-item">Adventure</button>
                    <button class="dropdown-item">Romance</button>
                    <button class="dropdown-item">Sport</button>
                    <button class="dropdown-item">Theater</button>
                    <button class="dropdown-item">Thiller</button>
                    <button class="dropdown-item">Ci-Fi</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.filter_container {
    display: flex;
    gap: 10px;
}

.search_bar {
    max-width: 100%;
    flex: 1;
}

.dropdown {
    height: 50px;
}

.dropdown-menu {
    max-height: 400px;
    overflow-y: auto;
}
</style>
