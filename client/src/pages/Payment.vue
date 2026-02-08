<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <h1 class="title has-text-centered">Payment</h1>

            <div class="box summary-box">
              <h2 class="subtitle is-size-4 mb-3"><strong>Summary</strong></h2>
              <p><strong>Movie:</strong> {{ bookingDetails.movie }}</p>
              <p><strong>Date:</strong> {{ bookingDetails.date }}</p>
              <p><strong>Time:</strong> {{ bookingDetails.time }}</p>
              <p><strong>Seats:</strong> {{ bookingDetails.seats }}</p>
              <p><strong>Tickets:</strong> {{ bookingDetails.ticketCount }}</p>
              <hr class="my-3">
              <p class="has-text-weight-bold is-size-5">
                <strong>Total: €{{ totalAmount }}</strong>
              </p>
            </div>
            <h1 class="title has-text-centered is-size-4">Payment Method</h1>
            <div class="buttons">
              <button 
                class="Method button" 
                :class="{ 'is-primary': selectedMethod === 'card' }"
                @click="selectMethod('card')"
              >
                Credit/Debit Card
              </button>
              <button 
                class="Method button" 
                :class="{ 'is-primary': selectedMethod === 'paypal' }"
                @click="selectMethod('paypal')"
              >
                PayPal
              </button>
              <button 
                class="Method button" 
                :class="{ 'is-primary': selectedMethod === 'googlepay' }"
                @click="selectMethod('googlepay')"
              >
                Google Pay
              </button>
              <button 
                class="Method button" 
                :class="{ 'is-primary': selectedMethod === 'applepay' }"
                @click="selectMethod('applepay')"
              >
                Apple Pay
              </button>
            </div>

            <div v-if="selectedMethod === 'card'" class="mt-4">
              <div class="field">
                <label class="label">Card Number</label>
                <input 
                  class="input" 
                  :class="{ 'is-danger': cardError.number }"
                  type="text" 
                  placeholder="1234 5678 9012 3456"
                  v-model="cardDetails.number"
                  maxlength="19"
                >
                <p v-if="cardError.number" class="help is-danger">{{ cardError.number }}</p>
              </div>

              <div class="field">
                <label class="label">Cardholder Name</label>
                <input 
                  class="input" 
                  :class="{ 'is-danger': cardError.name }"
                  type="text" 
                  placeholder="John Doe"
                  v-model="cardDetails.name"
                >
                <p v-if="cardError.name" class="help is-danger">{{ cardError.name }}</p>
              </div>

              <div class="columns">
                <div class="column">
                  <div class="field">
                    <label class="label">Expiry Date</label>
                    <input 
                      class="input" 
                      :class="{ 'is-danger': cardError.expiry }"
                      type="text" 
                      placeholder="MM/YY"
                      v-model="cardDetails.expiry"
                      maxlength="5"
                      @input="formatExpiry"
                    >
                    <p v-if="cardError.expiry" class="help is-danger">{{ cardError.expiry }}</p>
                  </div>
                </div>
                <div class="column">
                  <div class="field">
                    <label class="label">CVV</label>
                    <input 
                      class="input" 
                      :class="{ 'is-danger': cardError.cvv }"
                      type="text" 
                      placeholder="123"
                      v-model="cardDetails.cvv"
                      maxlength="3"
                      @input="formatCVV"
                    >
                    <p v-if="cardError.cvv" class="help is-danger">{{ cardError.cvv }}</p>
                  </div>
                </div>
              </div>
            </div>

            <button 
              class="button is-primary is-fullwidth is-medium mt-4"
              @click="processPayment"
              :class="{ 'is-loading': processing }"
            >
              Pay €{{ totalAmount }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const selectedMethod = ref('')
const processing = ref(false)
const cardDetails = ref({ number: '', name: '', expiry: '', cvv: '' })
const cardError = ref({ number: '', name: '', expiry: '', cvv: '' })

const bookingDetails = ref({
  movie: '',
  date: '',
  time: '',
  location: '',
  seats: '',
  ticketCount: 0
})

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

async function fetchShowtimeData() {
  try {
    const showtimeId = route.query.id
    
    const showtimeResponse = await fetch(`http://localhost:5000/showtimes/${showtimeId}`)
    const showtime = await showtimeResponse.json()
    
    const movieResponse = await fetch(`http://localhost:5000/movies/${showtime.movie_id}`)
    const movie = await movieResponse.json()
    
    bookingDetails.value = {
      movie: movie.title,
      date: formatDate(showtime.show_date),
      time: formatTime(showtime.show_time),
      location: showtime.location,
      seats: route.query.seats || '',
      ticketCount: parseInt(route.query.tickets) || 0
    }
  } catch (error) {
    console.error('Error fetching showtime data:', error)
  }
}

onMounted(() => {
  fetchShowtimeData()
})

const totalAmount = computed(() => (bookingDetails.value.ticketCount * 8.54).toFixed(2))

function selectMethod(method) {
  selectedMethod.value = method
  cardError.value = { number: '', name: '', expiry: '', cvv: '' }
}

function formatExpiry(e) {
  let value = e.target.value.replace(/\D/g, '')
  if (value.length >= 2) value = value.slice(0, 2) + '/' + value.slice(2, 4)
  cardDetails.value.expiry = value
}

function formatCVV(e) {
  cardDetails.value.cvv = e.target.value.replace(/\D/g, '').slice(0, 3)
}

function processPayment() {
  if (!selectedMethod.value) return
  
  if (selectedMethod.value === 'card') {
    cardError.value = { number: '', name: '', expiry: '', cvv: '' }
    
    if (cardDetails.value.number.length < 13) {
      cardError.value.number = 'Card number must be at least 13 digits'
      return
    }
    if (!cardDetails.value.name.trim()) {
      cardError.value.name = 'Cardholder name is required'
      return
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.value.expiry)) {
      cardError.value.expiry = 'Invalid expiry date (use MM/YY)'
      return
    }
    if (cardDetails.value.cvv.length !== 3) {
      cardError.value.cvv = 'CVV must be 3 digits'
      return
    }
  }
  
  processing.value = true
  setTimeout(() => {
    processing.value = false
    alert('Payment successful!')
  }, 2000)
}
</script>

<style scoped>
.Method {
  margin-left: 10%;
  display: flex;
  width: 80%;
  height: 5vw;
  margin-right: 10px;
  font-size: large;
}
</style>
