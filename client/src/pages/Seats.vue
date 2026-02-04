<template>
	<section class="section">
		<div class="container" style="max-width: 500px">

			<div v-if="!showtimeId" class="box has-text-centered">
				<h1 class="title is-2 has-text-danger">Error</h1>
				<p class="subtitle">Showtime id missing</p>
				<button class="button is-primary" @click="$router.push('/movies')">
					Go to Movies
				</button>
			</div>

			<div v-else-if="error" class="box has-text-centered">
				<h1 class="title is-2 has-text-danger">Error</h1>
				<p class="subtitle">{{ error }}</p>
				<button class="button is-primary" @click="$router.push('/movies')">
					Go to Movies
				</button>
			</div>

			<!-- Main Content -->
			<div v-else-if="!error" class="box mb-4">
				<h1 class="title is-4 has-text-centered">Seat Selection</h1>
			<h2 class="subtitle title"><strong>{{ movieTitle }}</strong></h2>
			<p><strong>Date:</strong> {{ formatDate(showtimeDate) }}</p>
			<p><strong>Time:</strong> {{ formatTime(showtimeTime) }}</p>
			<p><strong>Location:</strong> {{ location }}</p>
				<header class="card-header">
					<h2 class="subtitle title">
						<strong>Choose seat type and tickets</strong>
					</h2>
				</header>

				<div class="card-content">
					<div class="buttons">
						<button
							class="button is-image"
							:class="{ 'is-primary': seatType === 'single' }"
							@click="seatType = 'single'"
						>
							<img
								class="seat-image"
								:src="getSingleSeatImage"
								alt="Single seat"
							/>
						</button>

						<button
							class="button is-image seat-button"
							:class="{ 'is-primary': seatType === 'double' }"
							@click="seatType = 'double'"
						>
							<img
								class="seat-image"
								:src="getDoubleSeatImage"
								alt="Double seat"
							/>
						</button>
					</div>

					<div class="ticket-section">
						<div class="ticket-row">
							<span class="ticket-label"><strong>Number of Tickets:</strong></span>
							<div class="field has-addons">
								<span class="ticket-number-display"><strong>{{ (ticketPrice * tickets).toFixed(2) }}€</strong></span>
								<p class="control">
									<button class="button" @click="decreaseTickets">-</button>
								</p>
								<div class="ticket-number-display">
									{{ tickets }}
								</div>
								<p class="control">
									<button class="button" @click="increaseTickets">+</button>
								</p>
							</div>
						</div>
					</div>

					<button
						class="button is-primary is-fullwidth"
						@click="$router.push({ path: '/seat-selector', query: { id: showtimeId, tickets: tickets, seatType: seatType } })"
					>
						Buy Tickets
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script>
import singleSeatLight from "../assets/Seats/single-seat.png";
import singleSeatDark from "../assets/Seats/single-seat-dark.png";
import doubleSeatLight from "../assets/Seats/double-seat.png";
import doubleSeatDark from "../assets/Seats/double-seat-dark.png";

export default {
	name: "Seats",
	data() {
		return {
			seatType: "single",
			tickets: 1,
			ticketPrice: 8.54,

			currentTheme: document.documentElement.getAttribute("data-theme") || "light",
			singleSeatLight,
			singleSeatDark,
			doubleSeatLight,
			doubleSeatDark,
			movieTitle: "",
			showtimeDate: null,
			showtimeTime: null,
			location: "",
			movieId: null,
			showtimeId: this.$route.query.id,
			loading: false,
			error: null,
		};
	},

	computed: {
		getSingleSeatImage() {
			return this.currentTheme === "dark"
				? this.singleSeatDark
				: this.singleSeatLight;
		},
		getDoubleSeatImage() {
			return this.currentTheme === "dark"
				? this.doubleSeatDark
				: this.doubleSeatLight;
		},
	},

	async mounted() {
		this.observer = new MutationObserver(() => {
			this.currentTheme = document.documentElement.getAttribute("data-theme") || "light";
		});
		this.observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		if (this.showtimeId) {
			await this.fetchShowtimeData();
		}
	},

	beforeUnmount() {
		if (this.observer) this.observer.disconnect();
	},

	methods: {
		async fetchShowtimeData() {
			this.loading = true;
			this.error = null;
			
			try {
				const showtimeId = this.$route.query.id;
				
				const showtimeResponse = await fetch(`http://localhost:5000/showtimes/${showtimeId}`);
				
				if (!showtimeResponse.ok) {
					this.error = "Showtime not found";
					return;
				}
				
				const showtime = await showtimeResponse.json();
				
				if (!showtime || !showtime.movie_id) {
					this.error = "Invalid showtime data";
					return;
				}
				
				this.showtimeDate = showtime.show_date;
				this.showtimeTime = showtime.show_time;
				this.location = showtime.location;
				this.movieId = showtime.movie_id;
				
				const movieResponse = await fetch(`http://localhost:5000/movies/${showtime.movie_id}`);
				
				if (!movieResponse.ok) {
					this.error = "Movie information not found";
					return;
				}
				
				const movie = await movieResponse.json();
				
				if (!movie || !movie.title) {
					this.error = "Movie title missing";
					return;
				}
				
				this.movieTitle = movie.title;
			} catch (error) {
				console.error("Error fetching showtime data:", error);
				this.error = "Failed to load showtime information";
			} finally {
				this.loading = false;
			}
		},
		formatDate(dateString) {
			if (!dateString) return "";
			const date = new Date(dateString);
			return date.toLocaleDateString('en-GB');
		},
		formatTime(timeString) {
			if (!timeString) return "";
			const time = new Date(timeString);
			return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
		},
		increaseTickets() {
			if (this.tickets < 10) this.tickets++;
		},
		decreaseTickets() {
			if (this.tickets > 1) this.tickets--;
		},
	},
};
</script>

<style scoped>
.title {
	margin-bottom: 0.7rem !important;
}

.seat-image {
	max-width: 50px;
}

.ticket-number-display {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 4rem;
	height: 2.5em;
	font-weight: bold;
}

.buttons {
	margin-bottom: 1.5rem !important;
	justify-content: center;
}

.ticket-section {
	margin-bottom: 1.5rem;
}

.ticket-row {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 1rem;
}

.button.is-success.is-fullwidth {
	margin-top: 0.5rem;
}

.card-header {
	margin-top: 2rem;
	margin-bottom: 0.5rem;
}
</style>
