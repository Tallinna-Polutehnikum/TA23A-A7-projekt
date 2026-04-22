<script setup>
defineProps({
    contributor: {
        type: Object,
        required: true,
    },
});
</script>

<template>
    <div class="card">
        <div class="card-content">
            <div class="media">
                <div class="media-left">
                    <figure class="image is-128x128">
                        <img class="is-rounded" :src="contributor.avatarUrl" />
                    </figure>
                </div>
                <div class="content">
                    <p class="title is-4">{{ contributor.name }}</p>
                    <p class="subtitle is-6">@{{ contributor.username }}</p>
                    <a class="button is-link" :href="contributor.githubUrl" target="_blank" rel="noopener noreferrer">
                        <figure class="image is-24x24">
                            <img class="is-rounded" src="https://github.githubassets.com/favicons/favicon.png" />
                        </figure>
                        <p class="is-6" style="margin-left: 5px;">GitHub</p>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>