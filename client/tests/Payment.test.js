/**
 * @vitest-environment jsdom
 */
import { mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'
import Payment from '../src/pages/Payment.vue'

const pushMock = vi.fn()

describe('Payment.vue', () => {
  it('payment processes when method selected', async () => {
    const wrapper = mount(Payment, {
      global: {
        mocks: {
          $route: { query: { tickets: 2, email: 'test@example.com' } },
          $router: { push: pushMock },
        },
      },
    })

    await wrapper.vm.$nextTick()

    const buttons = wrapper.findAll('button')
    const paypalBtn = buttons.find(b => b.text().toLowerCase().includes('paypal'))
    if (paypalBtn) await paypalBtn.trigger('click')

    expect(wrapper.vm.selectedMethod.toLowerCase()).toBe('paypal')
  })
})