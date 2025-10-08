<template>
	<section class="section">
		<div class="container" style="max-width: 500px">
			<h1 class="title is-4 has-text-centered">Seat Selection</h1>

			<!-- Film information -->
			<div class="box mb-4">
				<h2 class="subtitle title"><strong>Film Title</strong></h2>
				<p><strong>Date:</strong> 2024-06-15</p>
				<p><strong>Time:</strong> 19:30</p>
				<p><strong>Location:</strong> Cinema Hall 1</p>
			</div>
			<!-- Ticket buying -->
			<div class="box mb-4">
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
							<span class="ticket-label"
								><strong>Number of Tickets:</strong></span
							>
							<div class="field has-addons">
								<p class="control">
									<button class="button" @click="decreaseTickets">-</button>
								</p>
								<p class="control"></p>
								<div class="ticket-number-display">
									{{ tickets }}
								</div>
								<p class="control">
									<button class="button" @click="increaseTickets">+</button>
								</p>
							</div>
						</div>
					</div>
					<router-link class="button is-primary is-fullwidth" to="seat-selector" @click="buyTickets">
						Buy Tickets
					</router-link>
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
			isDarkTheme: false,
			singleSeatLight,
			singleSeatDark,
			doubleSeatLight,
			doubleSeatDark,
		};
	},

	// Watch for theme changes for seat images
	computed: {
		getSingleSeatImage() {
			if (this.isDarkTheme) {
				return this.singleSeatDark;
			} else {
				return this.singleSeatLight;
			}
		},
		getDoubleSeatImage() {
			if (this.isDarkTheme) {
				return this.doubleSeatDark;
			} else {
				return this.doubleSeatLight;
			}
		},
	},

	// Listen for theme changes
	mounted() {
		this.checkTheme();
		const observer = new MutationObserver(() => this.checkTheme());
		observer.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme", "class"],
		});
		this.themeObserver = observer;
	},
	beforeUnmount() {
		if (this.themeObserver) {
			this.themeObserver.disconnect();
		}
	},
	methods: {
		checkTheme() {
			const htmlElement = document.documentElement;
			const bodyElement = document.body;

			const isDark =
				htmlElement.getAttribute("data-theme") === "dark" ||
				bodyElement.classList.contains("theme-dark") ||
				bodyElement.classList.contains("dark-theme") ||
				htmlElement.classList.contains("theme-dark") ||
				window.matchMedia("(prefers-color-scheme: dark)").matches;

			this.isDarkTheme = isDark;
		},

		// Ticket logic
		increaseTickets() {
			this.tickets++;
		},
		decreaseTickets() {
			if (this.tickets > 1) this.tickets--;
		},
		buyTickets() {
			console.log("Seat type:", this.seatType);
			console.log("Tickets:", this.tickets);
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
</style>
