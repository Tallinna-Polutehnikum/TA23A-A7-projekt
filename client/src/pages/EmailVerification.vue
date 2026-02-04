<template>
  <section class="section">
    <div class="container">
      <div class="columns is-centered">
        <div class="column is-half">
          <div class="box">
            <h1 class="title has-text-centered">Confirmation email  </h1>
            <h2 class="subtitle has-text-centered">Please enter an email address where we can send the purchase confirmation.</h2>
            
            <div class="field">
              <label class="label">Email Address</label>
              <div class="control">
                <input 
                  class="input is-medium" 
                  :class="{ 'is-danger': emailError }"
                  type="email" 
                  placeholder="example@gmail.com"
                  v-model="email"
                  @keyup.enter="submitEmail"
                >
              </div>
              <p v-if="emailError" class="help is-danger">{{ emailError }}</p>
              <p v-else class="help">Please enter a valid email address</p>
            </div>

            <button 
              class="button is-primary is-fullwidth is-medium mt-4" 
              @click="submitEmail"
              :disabled="!email"
            >
              Continue to Payment
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>

import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const email = ref('')
const emailError = ref('')

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

function submitEmail() {
  if (!emailRegex.test(email.value)) {
    emailError.value = 'Please enter a valid email address'
  } else {
    router.push({ 
      path: '/payment', 
      query: {
        email: email.value,
        id: route.query.id,
        tickets: route.query.tickets,
        seatType: route.query.seatType,
        seats: route.query.seats,
      } 
    })
  }
}
</script>

<style scoped>
.box {
  padding: 3rem;
}
</style>
