<template>
	<section class="section">
		<div class="container" style="max-width: 500px">
			<div class="box mb-4">
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

		await this.fetchShowtimeData();
	},

	beforeUnmount() {
		if (this.observer) this.observer.disconnect();
	},

	methods: {
		async fetchShowtimeData() {
			try {
				const showtimeId = this.$route.query.id;
				
				const showtimeResponse = await fetch(`http://localhost:5000/showtimes/${showtimeId}`);
				const showtime = await showtimeResponse.json();
				
				this.showtimeDate = showtime.show_date;
				this.showtimeTime = showtime.show_time;
				this.location = showtime.location;
				this.movieId = showtime.movie_id;
				
				const movieResponse = await fetch(`http://localhost:5000/movies/${showtime.movie_id}`);
				const movie = await movieResponse.json();
				
				this.movieTitle = movie.title;
			} catch (error) {
				console.error("Error fetching showtime data:", error);
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
			this.tickets++;
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
