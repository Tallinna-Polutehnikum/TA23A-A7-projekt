<template>
    <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.4/css/all.css">

    <div class="column is-four-fifths">
        <div class="field has-addons">
            <div class="control is-expanded">
                <input class="input is-normal" type="text" placeholder="Insert film name" />
            </div>
            <div class="control">
                <button class="button is-primary">Search</button>
            </div>
        </div>
    </div>

    <div class="column">
        <div class="dropdown is-hoverable">
            <div class="dropdown-trigger">
                <button class="button genre_button" aria-haspopup="true" aria-controls="dropdown-menu">
                    <span>Genre</span>
                    <span class="icon is-small">
                        <i class="fas fa-angle-down" aria-hidden="true"></i>
                    </span>
                </button>
            </div>
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                    <a href="#" class="dropdown-item">Animation</a>
                    <a href="#" class="dropdown-item">Anime</a>
                    <a href="#" class="dropdown-item">Ballet</a>
                    <a href="#" class="dropdown-item">Documentary</a>
                    <a href="#" class="dropdown-item">Drama</a>
                    <a href="#" class="dropdown-item">Fantasy</a>
                    <a href="#" class="dropdown-item">Family</a>
                    <a href="#" class="dropdown-item">Comedy</a>
                    <a href="#" class="dropdown-item">Concert</a>
                    <a href="#" class="dropdown-item">Crime</a>
                    <a href="#" class="dropdown-item">Action</a>
                    <a href="#" class="dropdown-item">Black humor</a>
                    <a href="#" class="dropdown-item">Mystery</a>
                    <a href="#" class="dropdown-item">Music</a>
                    <a href="#" class="dropdown-item">Musical</a>
                    <a href="#" class="dropdown-item">Doll movie</a>
                    <a href="#" class="dropdown-item">Opera</a>
                    <a href="#" class="dropdown-item">Horror</a>
                    <a href="#" class="dropdown-item">Adventure</a>
                    <a href="#" class="dropdown-item">Romance</a>
                    <a href="#" class="dropdown-item">Sport</a>
                    <a href="#" class="dropdown-item">Theater</a>
                    <a href="#" class="dropdown-item">Thiller</a>
                    <a href="#" class="dropdown-item">Ci-Fi</a>
                </div>
            </div>
        </div>
    </div>
</template>
