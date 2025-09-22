<template>
	<div id="app">
		<nav
			class="navbar my-navbar"
			role="navigation"
			aria-label="main navigation"
		>
			<div class="navbar-brand">
				<router-link class="navbar-item" to="/">Cinema</router-link>
			</div>

			<div class="navbar-menu">
				<div class="navbar-start">
					<router-link class="navbar-item" to="/seats">Seats</router-link>
					<!-- Hiljem muudame aga praegu on testimiseks -->
				</div>
			</div>

				<div class="navbar-menu">
				<div class="navbar-start">
					<router-link class="navbar-item" to="/movies">Movies</router-link>
				</div>
			</div>
		</nav>

		<section class="section">
			<div class="container">
				<router-view />
			</div>
		</section>
	</div>
</template>
