<script setup></script>

<template>
  <div>
    <h1>Welcome</h1>

    <router-link to="/movie">
      <img src="/cinema.jpg" alt="Cinema" style="width:300px; cursor:pointer;" />
    </router-link>

    <router-view />
  </div>
</template>

<style scoped></style>
