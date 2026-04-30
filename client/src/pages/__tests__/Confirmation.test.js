import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Confirmation from '../Confirmation.vue';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => ({
    query: {
      email: 'test@example.com',
      title: 'Inception',
      genre: 'Action',
      duration: '148',
      date: '15.05.2026',
      time: '19:30',
      location: 'Cinema City',
      seats: 'A1, A2',
      tickets: '2',
      total: '17.08'
    }
  })
}));

describe('Confirmation.vue', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders thank you message', () => {
    const wrapper = mount(Confirmation);
    expect(wrapper.text()).toContain('Thank you for your purchase!');
  });

  it('displays email address from query params', () => {
    const wrapper = mount(Confirmation);
    expect(wrapper.text()).toContain('test@example.com');
  });

  it('displays movie information', () => {
    const wrapper = mount(Confirmation);
    expect(wrapper.text()).toContain('Inception');
    expect(wrapper.text()).toContain('Action');
    expect(wrapper.text()).toContain('148 min');
  });

  it('displays showtime information', () => {
    const wrapper = mount(Confirmation);
    expect(wrapper.text()).toContain('15.05.2026 at 19:30');
    expect(wrapper.text()).toContain('Cinema City');
    expect(wrapper.text()).toContain('A1, A2');
  });

  it('displays ticket information', () => {
    const wrapper = mount(Confirmation);
    expect(wrapper.text()).toContain('Tickets: 2');
    expect(wrapper.text()).toContain('Total: €17.08');
  });

  it('home button navigates to home page', async () => {
    const wrapper = mount(Confirmation);
    const homeButton = wrapper.find('button');
    await homeButton.trigger('click');
    expect(mockPush).toHaveBeenCalledWith('/');
  });

  it('displays assistance message', () => {
    const wrapper = mount(Confirmation);
    expect(wrapper.text()).toContain('present this ticket');
    expect(wrapper.text()).toContain('support@example.com');
  });
});