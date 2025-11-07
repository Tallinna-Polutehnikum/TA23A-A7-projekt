<script setup>
	import Navbar from './components/Navbar.vue';
</script>

<template>
	<div id="app" :class="theme">
		<Navbar />
		<section class="section">
			<div class="container">
				<router-view />
			</div>
		</section>
	</div>
</template>

<style scoped>

</style>