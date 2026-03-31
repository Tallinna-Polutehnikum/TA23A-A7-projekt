<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['update:search', 'update:genre']);

const isOpen = ref(false);
const arrow = ref('fa-angle-down');

function toggleDropdown() {
  isOpen.value = !isOpen.value;
  arrow.value = isOpen.value ? 'fa-angle-up' : 'fa-angle-down';
}

function selectGenre(g) {
  emit('update:genre', g);
  isOpen.value = false;
  arrow.value = 'fa-angle-down';
}

function updateSearch(e) {
  emit('update:search', e.target.value);
}
</script>

<template>
  <div class="filter_container">
    <!-- Search bar -->
    <div class="field has-addons search_bar">
      <div class="control is-expanded">
        <input class="input is-normal" type="text" placeholder="Insert film name" :value="search" @input="updateSearch"/>
      </div>
      <div class="control">
        <button class="button is-primary" @click="$emit('update:search', search)">Search</button>
      </div>
    </div>
<!-- Genre dropdown -->
<div class="dropdown" :class="{ 'is-active': isOpen }">
  <div class="dropdown-trigger">
    <button class="button is-primary" @click="toggleDropdown">
      <span>Genres</span> <!-- always show "Genres" -->
      <span class="icon">
        <i :class="['fas', arrow]" aria-hidden="true"></i>
      </span>
    </button>
  </div>
  <div class="dropdown-menu">
    <div class="dropdown-content">
      <button class="dropdown-item" v-for="g in genres" :key="g" @click="selectGenre(g)">{{ g }}</button>
    </div>
  </div>
 </div>
</div>

</template>

<style scoped>
.filter_container {
  display: flex;
  gap: 10px;
  align-items: center; /* vertically center search bar + dropdown */
}

.search_bar {
  flex: 1; /* take all available space */
}

.dropdown {
  flex: 0 0 auto; /* don’t grow, keep natural width */
  height: 50px;
}

</style>