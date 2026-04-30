// src/pages/__tests__/MyTickets.test.js
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import MyTickets from '../MyTickets.vue';

// Mock localStorage globally
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: vi.fn((key) => store[key] || null),
    setItem: vi.fn((key, value) => { store[key] = value.toString(); }),
    removeItem: vi.fn((key) => { delete store[key]; }),
    clear: vi.fn(() => { store = {}; })
  };
})();

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

describe('MyTickets.vue', () => {
  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
    global.fetch = vi.fn();
  });

  it('shows "No tickets found" when localStorage is empty', () => {
    const wrapper = mount(MyTickets);
    expect(wrapper.text()).toContain('No tickets found');
  });

  it('loads tickets from localStorage on mount', async () => {
    const mockTickets = [
      { bookingId: 1, movie: 'Inception', date: '2026-05-15', time: '19:30', location: 'Cinema 1', seatNumbers: 'A1,A2', tickets: 2, total: 17.08 }
    ];
    localStorageMock.setItem('tickets', JSON.stringify(mockTickets));
    
    const wrapper = mount(MyTickets);
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toContain('Inception');
    expect(wrapper.text()).toContain('Cinema 1');
  });

  it('handles invalid JSON in localStorage', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    localStorageMock.setItem('tickets', 'invalid json');
    
    const wrapper = mount(MyTickets);
    expect(wrapper.text()).toContain('No tickets found');
    
    consoleSpy.mockRestore();
  });

  it('handles non-array in localStorage', () => {
    localStorageMock.setItem('tickets', JSON.stringify({ not: 'array' }));
    
    const wrapper = mount(MyTickets);
    expect(wrapper.text()).toContain('No tickets found');
  });

  it('displays all ticket details correctly', async () => {
    const mockTickets = [{
      bookingId: 1,
      movie: 'Avatar',
      date: '2026-06-20',
      time: '21:00',
      location: 'Cinema 2',
      seatNumbers: 'B3,B4',
      tickets: 2,
      total: 17.08
    }];
    localStorageMock.setItem('tickets', JSON.stringify(mockTickets));
    
    const wrapper = mount(MyTickets);
    await wrapper.vm.$nextTick();
    
    expect(wrapper.text()).toContain('Avatar');
    expect(wrapper.text()).toContain('Cinema 2');
    expect(wrapper.text()).toContain('B3,B4');
  });

  it('has cancel button for each ticket', async () => {
    const mockTickets = [
      { bookingId: 1, movie: 'Movie 1', date: '2026-05-15', time: '19:30', location: 'Cinema 1', seatNumbers: 'A1', tickets: 1, total: 8.54 },
      { bookingId: 2, movie: 'Movie 2', date: '2026-05-16', time: '20:00', location: 'Cinema 2', seatNumbers: 'B1', tickets: 1, total: 8.54 }
    ];
    localStorageMock.setItem('tickets', JSON.stringify(mockTickets));
    
    const wrapper = mount(MyTickets);
    await wrapper.vm.$nextTick();
    
    const cancelButtons = wrapper.findAll('.button.is-danger');
    expect(cancelButtons).toHaveLength(2);
  });

  it('sends cancel request to backend when cancel button is clicked', async () => {
    const mockTickets = [{ bookingId: 123, movie: 'Test', date: '2026-05-15', time: '19:30', location: 'Cinema', seatNumbers: 'A1', tickets: 1, total: 8.54 }];
    localStorageMock.setItem('tickets', JSON.stringify(mockTickets));
    
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    });
    
    const wrapper = mount(MyTickets);
    await wrapper.vm.$nextTick();
    
    const cancelButton = wrapper.find('.button.is-danger');
    await cancelButton.trigger('click');
    
    expect(global.fetch).toHaveBeenCalledWith('http://localhost:5000/bookings/cancel', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bookingId: 123 })
    });
  });

  // UUS TEST: kata cancelTicket veakäsitlus (read 40-41)
  it('handles cancel request failure gracefully', async () => {
    const mockTickets = [{ bookingId: 456, movie: 'Test', date: '2026-05-15', time: '19:30', location: 'Cinema', seatNumbers: 'A1', tickets: 1, total: 8.54 }];
    localStorageMock.setItem('tickets', JSON.stringify(mockTickets));
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false })
    });
    
    const wrapper = mount(MyTickets);
    await wrapper.vm.$nextTick();
    
    const cancelButton = wrapper.find('.button.is-danger');
    await cancelButton.trigger('click');
    
    // Ticket should still be in list
    expect(wrapper.text()).toContain('Test');
    consoleSpy.mockRestore();
  });

  // UUS TEST: kata network error cancelTicket (read 51)
  it('handles network error when cancelling ticket', async () => {
    const mockTickets = [{ bookingId: 789, movie: 'Test2', date: '2026-05-15', time: '19:30', location: 'Cinema', seatNumbers: 'A1', tickets: 1, total: 8.54 }];
    localStorageMock.setItem('tickets', JSON.stringify(mockTickets));
    
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    global.fetch.mockRejectedValueOnce(new Error('Network error'));
    
    const wrapper = mount(MyTickets);
    await wrapper.vm.$nextTick();
    
    const cancelButton = wrapper.find('.button.is-danger');
    await cancelButton.trigger('click');
    
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});