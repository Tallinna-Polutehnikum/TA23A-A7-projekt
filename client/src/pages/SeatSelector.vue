<template>
  <section class="section">
    <div class="container">
      <div class="columns" ref>
          <div class="column is-three-quarters">
				<h2 class="screen subtitle "><strong>Screen</strong></h2>
              <div class="cinema-seating">
                <div
                  v-for="(rowSeats, rowIndex) in seatLayout"
                  :key="rowIndex"
                  class="seat-row"
                >
                  <div class="row-label">{{ String.fromCharCode(65 + rowIndex) }}</div>
                  <div class="seats-in-row">
                    <div
                      v-for="seat in rowSeats"
                      :key="seat.id"
                      class="cell"
                      :class="{ 
                        'is-selected': selectedSeats.includes(seat.id),
                        'is-occupied': seat.occupied
                      }"
                      @click="toggleSeatSelection(seat.id)"
                    >
                      {{ seat.number }}
                    </div>
                  </div>
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

				<h2 class="Seats subtitle "><strong>Available seats: {{ seatsRemaining }}</strong></h2>

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

const tickets = 1
const numRows = 8
const seatsPerRow = 15

const seatLayout = ref([])
const selectedSeats = ref([])

function createSeatLayout() {
  const layout = []
  for (let row = 0; row < numRows; row++) {
    const rowSeats = [] // Creates an array that holds seats for each row
    
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatId = `${String.fromCharCode(65 + row)}${seat}`
      rowSeats.push({
        id: seatId,
        number: seat,
        occupied: false // Math.random() < 0.2
      })
    }
    layout.push(rowSeats)
  }
  return layout
}

seatLayout.value = createSeatLayout()

function toggleSeatSelection(seatId) {
  const seat = seatLayout.value.flat().find(s => s.id === seatId)
  if (seat && seat.occupied) {
    return 
  }

  const idx = selectedSeats.value.indexOf(seatId)
  if (idx === -1) {
    selectedSeats.value.push(seatId)
  } else {
    selectedSeats.value.splice(idx, 1)
  }
  
  if (selectedSeats.value.length > tickets) {
    selectedSeats.value.splice(0, selectedSeats.value.length - tickets)
  }
}

const totalSeats = computed(() => seatLayout.value.flat().filter(seat => !seat.occupied).length)
const seatsRemaining = computed(() => totalSeats.value - selectedSeats.value.length)

</script>

<style >

.screen {
  align-items: center;
  justify-content: center;
  display: flex;
  margin-bottom: 2rem;
}

.cinema-seating {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.seat-row {
  display: flex;
  align-items: center;
}

.row-label {
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  color: #666;
}

.seats-in-row {
  display: flex;
  gap: .25rem;
}

.cell {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: #4d4d4d;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

.cell.is-selected {
  background-color: hsl(171, 100%, 41%);
  color: #000000;
  border: 2px solid #00d1b2;
}

.cell.is-occupied {
  background-color: #e74c3c;
  color: #fff;
  cursor: not-allowed;
  opacity: 0.7;
}
</style>