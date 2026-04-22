<script setup>
import { ref, onMounted } from 'vue';

const tickets = ref([]);

onMounted(() => {
  loadTickets();
});

function loadTickets() {
  try {
    const storedTickets = localStorage.getItem('tickets');

    if (!storedTickets) {
      tickets.value = [];
      return;
    }

    const parsed = JSON.parse(storedTickets);

    tickets.value = Array.isArray(parsed) ? parsed : [];
  } catch (err) {
    console.error('Failed to parse tickets from localStorage:', err);
    tickets.value = [];
    localStorage.removeItem('tickets');
  }
}

async function cancelTicket(bookingId) {
  try {
    const res = await fetch('http://localhost:5000/bookings/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId: Number(bookingId) })
    });

    const data = await res.json();

    if (!res.ok || !data.success) {
      console.error('Cancel failed:', data);
      return;
    }

    tickets.value = tickets.value.filter(
      t => Number(t.bookingId) !== Number(bookingId)
    );

    localStorage.setItem('tickets', JSON.stringify(tickets.value));

  } catch (e) {
    console.error('Request failed:', e);
  }
}
</script>

<template>
  <section class="section">
    <div class="container">
      <h1 class="title">My Tickets</h1>

      <div v-if="tickets.length === 0">
        No tickets found.
      </div>

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

          <button
            class="button is-danger mt-2"
            @click="cancelTicket(ticket.bookingId)"
          >
            Cancel Ticket
          </button>
        </div>
      </div>
    </div>
  </section>
</template>