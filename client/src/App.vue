<script setup>
import Navbar from './components/Navbar.vue';
</script>

<template>
	<div id="app">
		<Navbar></Navbar>
		<section class="section">
			<div class="container">
				<router-view />
			</div>
		</section>
	</div>
</template>
