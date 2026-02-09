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
        <p class="countdown"><strong>{{ countdownDisplay }}</strong></p>
        <h2 class="subtitle"><strong>{{ movieTitle }}</strong></h2>
        <p><strong>Date:</strong> {{ formatDate(showtimeDate) }}</p>
        <p><strong>Time:</strong> {{ formatTime(showtimeTime) }}</p>
        <p><strong>Location:</strong> {{ location }}</p>
        <p><strong>Seats:</strong> {{ seatType }}</p>
				<h2 class="subtitle mt-4 mb-1"><strong>Tickets left: {{ seatsRemaining }}</strong></h2>
        
        <button 
          class="button is-primary" 
          @click="proceedToPayment"
          :disabled="selectedSeats.length !== tickets"
        >
          Proceed to payment
        </button>
            </aside>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const $router = useRouter()
const tickets = parseInt(route.query.tickets) || 1
const storedUserId = localStorage.getItem("UserId")
const userId = storedUserId ? storedUserId.replace(/^"|"$/g, "") : crypto.randomUUID()
const showtimeId = route.query.id
const numRows = 8
const seatsPerRow = 15

const seatLayout = ref([])
const selectedSeats = ref([])
const movieTitle = ref('')
const showtimeDate = ref(null)
const showtimeTime = ref(null)
const location = ref('')
const seatType = ref('Single')
const countdownSeconds = ref(10 * 60)
let countdownTimerId = null
const timerStorageKey = `seatTimer:${showtimeId}:${userId}`
const ticketsStorageKey = `seatTickets:${showtimeId}:${userId}`

function createSeatLayout() {
  const layout = []
  for (let row = 0; row < numRows; row++) {
    const rowSeats = []
    
    for (let seat = 1; seat <= seatsPerRow; seat++) {
      const seatId = `${String.fromCharCode(65 + row)}${seat}`
      rowSeats.push({
        id: seatId,
        number: seat,
      })
    }
    layout.push(rowSeats)
  }
  return layout
}

seatLayout.value = createSeatLayout()

function updateTakenSeats(takenSeats) {
  for (let row = 0; row < numRows; row++) {
    for (let seatIndex = 0; seatIndex < seatsPerRow; seatIndex++) {
      const seat = seatLayout.value[row][seatIndex];
    if (selectedSeats.value.includes(seat.id)) continue;
    if (takenSeats.includes(seat.id)) {
        seat.occupied = true;
      } else {
        seat.occupied = false;
      }
    }
  }
}


async function fetchShowtimeSeats() {
  if (!showtimeId) return
  const res = await fetch(
    `http://localhost:5000/showtimes/${showtimeId}/seats?userId=${encodeURIComponent(userId)}`
  )
  const { takenSeats, userSeats } = await res.json()
  selectedSeats.value = userSeats
  updateTakenSeats(takenSeats)
}

async function initializeSeatSelection() {
  await fetchShowtimeSeats()

  const storedTickets = parseInt(localStorage.getItem(ticketsStorageKey), 10)
  const ticketsChanged = Number.isFinite(storedTickets) && storedTickets !== tickets

  if (ticketsChanged || selectedSeats.value.length > tickets) {
    await releaseAllSelectedSeats()
    localStorage.removeItem(timerStorageKey)
    countdownSeconds.value = 10 * 60
  }

  localStorage.setItem(ticketsStorageKey, String(tickets))
}

async function toggleSeatSelection(seatId) {
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

  let removedSeatId = null
  if (selectedSeats.value.length > tickets) {
    removedSeatId = selectedSeats.value.shift()
  }

  if (removedSeatId) {
    const res = await fetch(`http://localhost:5000/showtimes/${showtimeId}/seats/unselect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId: removedSeatId, userId }),
    })
    const { takenSeats } = await res.json()
    updateTakenSeats(takenSeats)
  }

  if (selectedSeats.value.includes(seatId)) {
    const res = await fetch(`http://localhost:5000/showtimes/${showtimeId}/seats/select`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId, userId }),
    })

    const { takenSeats, success } = await res.json()
    if (success === false) {
      selectedSeats.value = selectedSeats.value.filter(id => id !== seatId)
    }

    updateTakenSeats(takenSeats)
  } else {
    const res = await fetch(`http://localhost:5000/showtimes/${showtimeId}/seats/unselect`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ seatId, userId }),
    })
    const { takenSeats } = await res.json()
    updateTakenSeats(takenSeats)
  }
}

async function releaseAllSelectedSeats() {
  if (selectedSeats.value.length === 0) return

  selectedSeats.value = []

  try {
    const res = await fetch(`http://localhost:5000/showtimes/${showtimeId}/seats/release`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId }),
    })
    const { takenSeats } = await res.json()
    updateTakenSeats(takenSeats)
  } catch (error) {
    console.error('Error releasing seats:', error)
  }
}

async function fetchShowtimeData() {
  if (!showtimeId) return
  
  try {
    const showtimeResponse = await fetch(`http://localhost:5000/showtimes/${showtimeId}`)
    const showtime = await showtimeResponse.json()
    
    showtimeDate.value = showtime.show_date
    showtimeTime.value = showtime.show_time
    location.value = showtime.location
    
    const movieResponse = await fetch(`http://localhost:5000/movies/${showtime.movie_id}`)
    const movie = await movieResponse.json()
    
    movieTitle.value = movie.title
  } catch (error) {
    console.error('Error fetching showtime data:', error)
  }
}

function formatDate(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('en-GB')
}

function formatTime(timeString) {
  if (!timeString) return ''
  const time = new Date(timeString)
  return time.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
}

const seatsRemaining = computed(() => tickets - selectedSeats.value.length)

const countdownDisplay = computed(() => {
  const minutes = Math.floor(countdownSeconds.value / 60)
  const seconds = countdownSeconds.value % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
})

function proceedToPayment() {
  $router.push({
    path: '/email-verification',
    query: {
      id: showtimeId,
      tickets: tickets,
      seatType: seatType.value,
      seats: selectedSeats.value.join(','),
    }
  })
}

onMounted(() => {
  fetchShowtimeData()
  initializeSeatSelection()
  if (!localStorage.getItem("UserId")) {
    localStorage.setItem("UserId", userId)
  }

  const storedEndTime = parseInt(localStorage.getItem(timerStorageKey), 10)
  let endTime = Number.isFinite(storedEndTime)
    ? storedEndTime
    : Date.now() + countdownSeconds.value * 1000

  if (!Number.isFinite(storedEndTime)) {
    localStorage.setItem(timerStorageKey, String(endTime))
  }

  countdownSeconds.value = Math.max(0, Math.ceil((endTime - Date.now()) / 1000))

  countdownTimerId = setInterval(async () => {
    const remainingSeconds = Math.max(0, Math.ceil((endTime - Date.now()) / 1000))
    countdownSeconds.value = remainingSeconds

    if (remainingSeconds <= 0) {
      clearInterval(countdownTimerId)
      countdownTimerId = null
      localStorage.removeItem(timerStorageKey)
      await releaseAllSelectedSeats()
      $router.push('/movies')
    }
  }, 1000)
})

onUnmounted(() => {
  if (countdownTimerId) {
    clearInterval(countdownTimerId)
    countdownTimerId = null
  }
})

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
  font-size: 1.1rem;
  color: rgb(0, 0, 0);
  background: #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 2px solid transparent;
}

@media (prefers-color-scheme: dark) {
  .cell {
    color: rgb(229, 229, 229);
    background: #535353;
    border: 2px solid #ffffff31;
  }
}

:root[data-theme="dark"] .cell,
[data-theme="dark"] .cell {
  color: rgb(229, 229, 229);
  background-color: #535353;
}

:root[data-theme="light"] .cell,
[data-theme="light"] .cell {
  color: rgb(0, 0, 0);
  background-color: #dfdfdf;
}

.cell:hover {
  border: 2px solid #00d1b2b4;
}

.cell.is-selected {
  background-color: hsl(171, 100%, 41%);
  color: #000000;
  border: 3px solid #00d1b2;
}

.cell.is-occupied {
  color: #fff;
  cursor: not-allowed;
  opacity: 0.25;
}

.countdown {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.75rem;
}
</style>