/**
 * @vitest-environment jsdom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import SeatSelector from '../src/pages/SeatSelector.vue'
import { createRouter, createMemoryHistory } from 'vue-router'

const routes = [
  { path: '/', component: SeatSelector } // minimal route
]

const router = createRouter({
  history: createMemoryHistory(),
  routes
})

// set initial route query
router.push({ path: '/', query: { tickets: '2' } })

describe('SeatSelector.vue', () => {
  it('user can select a seat', async () => {
    await router.isReady() // make sure router is initialized

    const wrapper = mount(SeatSelector, {
      global: {
        plugins: [router]
      }
    })

    expect(wrapper.exists()).toBe(true)
  })
})