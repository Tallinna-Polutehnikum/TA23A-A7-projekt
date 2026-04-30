import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Contact from '../Contact.vue';

describe('Contact.vue', () => {
  it('renders contact page title', () => {
    const wrapper = mount(Contact);
    expect(wrapper.text()).toContain('Contact');
  });

  it('displays support email address', () => {
    const wrapper = mount(Contact);
    expect(wrapper.text()).toContain('support@cinemaexample.com');
  });

  it('displays phone number', () => {
    const wrapper = mount(Contact);
    expect(wrapper.text()).toContain('+372 6769420');
  });

  it('displays support hours', () => {
    const wrapper = mount(Contact);
    expect(wrapper.text()).toContain('Monday-Friday, 09:00-17:00');
  });

  it('has correct box structure', () => {
    const wrapper = mount(Contact);
    expect(wrapper.find('.box').exists()).toBe(true);
    expect(wrapper.find('.content').exists()).toBe(true);
  });
});