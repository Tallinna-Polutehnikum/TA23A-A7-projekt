<script setup>
import { defineProps, defineEmits, computed } from 'vue';

const props = defineProps({
  totalPages: Number,
  currentPage: Number
});

const emit = defineEmits(['page-changed']);

const pages = computed(() => Array.from({ length: props.totalPages }, (_, i) => i + 1));

function goToPage(p) {
  if (p < 1) p = 1;
  if (p > props.totalPages) p = props.totalPages;
  emit('page-changed', p);
}
</script>
<template>
  <nav class="pagination is-centered">
    <a 
      class="pagination-previous" 
      :class="{ 'is-disabled': props.currentPage === 1 }"
      @click="props.currentPage !== 1 && goToPage(props.currentPage - 1)"
    >
      Previous
    </a>
    <a 
      class="pagination-next" 
      :class="{ 'is-disabled': props.currentPage === props.totalPages }"
      @click="props.currentPage !== props.totalPages && goToPage(props.currentPage + 1)"
    >
      Next
    </a>
    <ul class="pagination-list">
      <li v-for="p in pages" :key="p">
        <a 
          href="#" 
          class="pagination-link" 
          :class="{ 'is-current': p === props.currentPage }" 
          @click.prevent="goToPage(p)"
        >
          {{ p }}
        </a>
      </li>
    </ul>
  </nav>
</template>
