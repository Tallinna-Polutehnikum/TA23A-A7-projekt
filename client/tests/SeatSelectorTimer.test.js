import { describe, it, expect, vi, beforeEach, afterEach } from "vitest"
import { mount } from "@vue/test-utils"
import SeatSelector from "../src/pages/SeatSelector.vue"
import { createRouter, createMemoryHistory } from "vue-router"

describe("SeatSelector.vue - Timer", () => {
  let wrapper
  let router

  beforeEach(async () => {
    vi.useFakeTimers() // use fake timers
    router = createRouter({
      history: createMemoryHistory(),
      routes: [{ path: "/", component: SeatSelector }],
    })

    wrapper = mount(SeatSelector, {
      global: { plugins: [router] },
    })

    await router.isReady()
  })

  afterEach(() => {
    vi.useRealTimers() // restore real timers
    wrapper.unmount()
  })

  it("timer starts at 10:00 and decreases", async () => {
    const timerEl = wrapper.find(".countdown strong")
    expect(timerEl.exists()).toBe(true)

    // Initial timer value
    expect(timerEl.text()).toBe("10:00")

    // Advance 1 second
    vi.advanceTimersByTime(1000)
    await wrapper.vm.$nextTick() // wait for DOM update

    expect(timerEl.text()).toBe("09:59") // now it should decrease

    // Advance 10 more seconds
    vi.advanceTimersByTime(10000)
    await wrapper.vm.$nextTick()

    expect(timerEl.text()).toBe("09:49") // decreased by 11 seconds total
  })
})