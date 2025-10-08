<template>
  <section class="section">
    <div class="container">
      <div class="columns" ref>
          <div class="column is-three-quarters">
				<h2 class="screen subtitle "><strong>Screen</strong></h2>
              <div class="row is-col-min-2">
                <div
                v-for="seat in seats"
                :key="seat"
                class="cell"
                :class="{ 'is-selected': selectedSeats.includes(seat) }"
                @click="toggleSeatSelection(seat)"
                >
                  {{ seat }}
            </div>
          </div>
              <div class="row is-col-min-2">
                <div
                v-for="seat in seats"
                :key="seat"
                class="cell"
                :class="{ 'is-selected': selectedSeats.includes(seat) }"
                @click="toggleSeatSelection(seat)"
                >
                {{ seat }}
            </div>
        </div>
      </div>
        

        <div class="column is-one-quarter">
          <aside class="box infobox">
				<h2 class="subtitle"><strong>Film Title</strong></h2>
				<p><strong>Date:</strong> 2024-06-15</p>
				<p><strong>Time:</strong> 19:30</p>
				<p><strong>Location:</strong> Cinema Hall 1</p>
				<p><strong>Seats:</strong> Single</p>
				<p><strong>Tickets:</strong> {{ tickets }}</p>


				<h2 class="Seats subtitle "><strong>Seats remaining:
                    {{ seatsRemaining }}
                </strong></h2>

                <button class="button is-primary">Proceed to payment</button>
            </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { ref } from 'vue'
const tickets = 8

const row = ref(Array.from({ length: 5 }, (_, i) => i + 1))
const seats = ref(Array.from({ length: 25 }, (_, i) => i + 1))

const selectedSeats = ref([])

function toggleSeatSelection(seat) {
  const idx = selectedSeats.value.indexOf(seat)
  if (idx === -1) {
    selectedSeats.value.push(seat)
  } else {
    selectedSeats.value.splice(idx, 1)
  }
  if (selectedSeats.value.length > tickets) {
    selectedSeats.value.splice(0, selectedSeats.value.length - tickets)
  }
}

const seatsRemaining = computed(() => seats.value.length - selectedSeats.value.length)

</script>

<style >

.screen {
  align-items: center;
  justify-content: center;
  display: flex;
}

.row {
  display: flex;
  justify-content: center;
}

.cell {
  width: 2rem;
  height: 2rem;
  min-width: 1rem;
  font-size: calc(.6rem + .8vw);
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  background: #4d4d4d;
  cursor: pointer;
}

.cell.is-selected {
  background-color: hsl(171, 100%, 41%);
  color: #000000;
  border: 1px solid rgba(0,0,0,0.2);
}

.infobox {
position: relative;
}

.Seats {
  margin-top: 3rem;
}

</style>