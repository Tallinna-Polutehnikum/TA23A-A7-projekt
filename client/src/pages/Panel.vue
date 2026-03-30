<script setup>
import axios from "axios";
import { ref, onMounted } from "vue";

// ==========================
// Add Movie fields
// ==========================
const title = ref("");
const genre = ref("");
const age_rating = ref("");
const duration = ref("");
const director = ref("");
const cast = ref("");
const description = ref("");
const trailer_url = ref("");
const film_cover = ref("");
const film_header_image = ref("");

// Save movie function
const saveMovie = async () => {
  try {
    const res = await axios.post("http://localhost:5000/movies", {
      title: title.value,
      genre: genre.value,
      age_rating: age_rating.value,
      duration: Number(duration.value),
      director: director.value,
      cast: cast.value,
      description: description.value,
      trailer_url: trailer_url.value,
      images: {
        create: {
          film_cover: film_cover.value,
          film_header_image:
            film_header_image.value || "https://via.placeholder.com/300x450",
        },
      },
    });

    alert("Movie saved successfully!");
    console.log(res.data);

    // Clear form after saving
    title.value = "";
    genre.value = "";
    age_rating.value = "";
    duration.value = "";
    director.value = "";
    cast.value = "";
    description.value = "";
    trailer_url.value = "";
    film_cover.value = "";
    film_header_image.value = "";

    // Refresh movie list
    await fetchMovies();

  } catch (err) {
    console.error("CreateMovie Error:", err);
    alert("Failed to save movie");
  }
};

// ==========================
// Delete Movie fields
// ==========================
const movies = ref([]);
const searchQuery = ref("");

// Fetch movies (optionally filtered)
const fetchMovies = async () => {
  try {
    const res = await axios.get(`http://localhost:5000/home?q=${searchQuery.value}`);
    movies.value = res.data;
  } catch (err) {
    console.error("FetchMovies Error:", err);
    alert("Failed to fetch movies");
  }
};

// Delete a movie
const deleteMovie = async (id) => {
  if (!confirm("Are you sure you want to delete this movie?")) return;

  try {
    await axios.delete(`http://localhost:5000/movies/${id}`);
    alert("Movie deleted successfully!");
    // Refresh movie list
    await fetchMovies();
  } catch (err) {
    console.error("DeleteMovie Error:", err);
    alert("Failed to delete movie");
  }
};

// Scroll to section
const scrollTo = (id) => {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
};

// Fetch movies on mount
onMounted(() => {
  fetchMovies();
});
</script>

<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-10-tablet is-8-desktop is-7-widescreen">
          <div class="box panel-box">
            <h1 class="title has-text-centered">Admin Panel</h1>

            <!-- Navigation Buttons -->
            <div class="buttons is-centered mb-4">
              <button class="button is-link" @click="scrollTo('addMovie')">Add Movie</button>
              <button class="button is-info" @click="scrollTo('deleteMovie')">Delete Movie</button>
            </div>

            <!-- ================= Add Movie Section ================= -->
            <div id="addMovie">
              <p class="title is-size-4">Add Movie</p>
              <form @submit.prevent="saveMovie" autocomplete="off">
                <div class="columns is-multiline">

                  <div class="column is-12">
                    <div class="field">
                      <label class="label">Movie Title</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Enter movie title" v-model="title">
                      </div>
                    </div>
                  </div>

                  <div class="column is-6">
                    <div class="field">
                      <label class="label">Genre</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Action, Drama, Sci-Fi" v-model="genre">
                      </div>
                    </div>
                  </div>

                  <div class="column is-6">
                    <div class="field">
                      <label class="label">Age Rating</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="PG-13" v-model="age_rating">
                      </div>
                    </div>
                  </div>

                  <div class="column is-4">
                    <div class="field">
                      <label class="label">Duration (min)</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="120" v-model="duration">
                      </div>
                    </div>
                  </div>

                  <div class="column is-6">
                    <div class="field">
                      <label class="label">Director</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Enter director name" v-model="director">
                      </div>
                    </div>
                  </div>

                  <div class="column is-6">
                    <div class="field">
                      <label class="label">Cast</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="Actor 1, Actor 2, Actor 3" v-model="cast">
                      </div>
                    </div>
                  </div>

                  <div class="column is-12">
                    <div class="field">
                      <label class="label">Description</label>
                      <div class="control">
                        <textarea class="textarea" rows="5" placeholder="Write a short movie description" v-model="description"></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="column is-12">
                    <div class="field">
                      <label class="label">Trailer URL</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="https://youtube.com/..." v-model="trailer_url">
                      </div>
                    </div>
                  </div>

                  <div class="column is-6">
                    <div class="field">
                      <label class="label">Cover Image URL</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="https://example.com/cover.jpg" v-model="film_cover">
                      </div>
                    </div>
                  </div>

                  <div class="column is-6">
                    <div class="field">
                      <label class="label">Header Image URL</label>
                      <div class="control">
                        <input class="input" type="text" placeholder="https://example.com/header.jpg" v-model="film_header_image">
                      </div>
                    </div>
                  </div>

                  <div class="column is-12">
                    <button type="submit" class="button is-primary is-fullwidth mt-2">Save Movie</button>
                  </div>
                </div>
              </form>
            </div>

            <!-- ================= Delete Movie Section ================= -->
            <div id="deleteMovie" class="mt-6">
              <p class="title is-size-4">Delete Movie</p>

              <!-- Search box -->
              <div class="field">
                <div class="control">
                  <input
                    class="input"
                    type="text"
                    placeholder="Search by title, genre, director..."
                    v-model="searchQuery"
                    @input="fetchMovies"
                  >
                </div>
              </div>

              <!-- Movie list with delete buttons -->
              <div class="box" v-if="movies.length">
                <div v-for="movie in movies" :key="movie.id" class="mb-4">
                  <div class="columns is-vcentered">
                    <div class="column">
                      <strong>{{ movie.title }}</strong> — {{ movie.genre }} — {{ movie.director }}
                    </div>
                    <div class="column is-narrow">
                      <button class="button is-danger is-small" @click="deleteMovie(movie.id)">Delete</button>
                    </div>
                  </div>
                </div>
              </div>

              <p v-else>No movies found.</p>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.panel-box {
  padding: 2rem;
}

.subtitle {
  margin-top: -0.3rem;
  margin-bottom: 1.4rem;
}

.label {
  font-weight: 600;
}

.textarea {
  min-height: 130px;
}

@media (max-width: 768px) {
  .panel-box {
    padding: 1.2rem;
  }
}
</style>