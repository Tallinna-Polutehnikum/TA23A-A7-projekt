<script setup>
import { ref, onMounted } from 'vue';

const tickets = ref([]);

onMounted(() => {
  loadTickets();
});

function loadTickets() {
  // Load tickets from local storage
  const storedTickets = localStorage.getItem('tickets');
  if (storedTickets) {
    tickets.value = JSON.parse(storedTickets);
  }
}

async function cancelTicket(bookingId) {
  try {
    await fetch('http://localhost:5000/bookings/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId })
    })
  } catch (e) {
    console.error('Backend cancel failed', e)
  }

  tickets.value = tickets.value.filter(ticket => ticket.bookingId !== bookingId)
  localStorage.setItem('tickets', JSON.stringify(tickets.value))
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">My Tickets</h1>
      <div v-if="tickets.length === 0">No tickets found.</div>
      <div v-else>
        <div v-for="ticket in tickets" :key="ticket.bookingId" class="box mb-4">
          <p><strong>Movie:</strong> {{ ticket.movie }}</p>
          <p>
            <strong>Date:</strong>
            {{ new Date(ticket.date).toLocaleDateString('en-GB') }}
          </p> 
          <p><strong>Time:</strong> {{ ticket.time }}</p>
          <p><strong>Location:</strong> {{ ticket.location }}</p>
          <p><strong>Seats:</strong> {{ ticket.seatNumbers }}</p>
          <p><strong>Tickets:</strong> {{ ticket.tickets }}</p>
          <p><strong>Total:</strong> €{{ ticket.total }}</p>
          <button class="button is-danger mt-2" @click="cancelTicket(ticket.bookingId)">Cancel Ticket</button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.title {
  margin-bottom: 2rem;
}
</style>
