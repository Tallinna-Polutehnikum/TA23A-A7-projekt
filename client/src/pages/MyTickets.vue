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

function cancelTicket(showtimeId) {
  // Remove the ticket with the given showtimeId from local storage
  tickets.value = tickets.value.filter(ticket => ticket.showtimeId !== showtimeId);
  localStorage.setItem('tickets', JSON.stringify(tickets.value));
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">My Tickets</h1>
      <div v-if="tickets.length === 0">No tickets found.</div>
      <div v-else>
        <div v-for="ticket in tickets" :key="ticket.showtimeId" class="box mb-4">
          <p><strong>Showtime ID:</strong> {{ ticket.showtimeId }}</p>
          <p><strong>Seats:</strong> {{ ticket.seatNumbers }}</p>
          <button class="button is-danger mt-2" @click="cancelTicket(ticket.showtimeId)">Cancel Ticket</button>
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
