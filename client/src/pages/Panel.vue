<script setup>
</script>

<template>
    <section class="section">
        <div class="container">
            <div class="columns is-centered">
                <div class="column is-10-tablet is-8-desktop is-7-widescreen">
                    <div class="box panel-box">
                        <h1 class="title has-text-centered">Admin Panel</h1>
                        <p class="title is-size-4">Add Movie</p>

                        <form autocomplete="off">
                            <div class="columns is-multiline">
                                <div class="column is-12">
                                    <div class="field">
                                        <label class="label">Movie Title</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Enter movie title">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-6">
                                    <div class="field">
                                        <label class="label">Genre</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Action, Drama, Sci-Fi">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-6">
                                    <div class="field">
                                        <label class="label">Age Rating</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="PG-13">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-4">
                                    <div class="field">
                                        <label class="label">Duration (min)</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="120">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-4">
                                    <div class="field">
                                        <label class="label">Release Year</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="2026">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-4">
                                    <div class="field">
                                        <label class="label">Language</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="English">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-6">
                                    <div class="field">
                                        <label class="label">Director</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Enter director name">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-6">
                                    <div class="field">
                                        <label class="label">Cast</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="Actor 1, Actor 2, Actor 3">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-12">
                                    <div class="field">
                                        <label class="label">Description</label>
                                        <div class="control">
                                            <textarea class="textarea" rows="5" placeholder="Write a short movie description"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-12">
                                    <div class="field">
                                        <label class="label">Trailer URL</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="https://youtube.com/...">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-6">
                                    <div class="field">
                                        <label class="label">Cover Image URL</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="https://example.com/cover.jpg">
                                        </div>
                                    </div>
                                </div>

                                <div class="column is-6">
                                    <div class="field">
                                        <label class="label">Header Image URL</label>
                                        <div class="control">
                                            <input class="input" type="text" placeholder="https://example.com/header.jpg">
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="button" class="button is-primary is-fullwidth mt-2">Save Movie</button>
                        </form>
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