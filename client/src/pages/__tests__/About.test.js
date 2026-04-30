import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import About from '../About.vue';

// Mock ContributorCard properly
vi.mock('@/components/ContributorCard.vue', () => ({
  default: {
    name: 'ContributorCard',
    template: '<div class="mock-contributor-card" data-testid="contributor-card">{{ contributor.name }}</div>',
    props: ['contributor']
  }
}));

describe('About.vue', () => {
  it('renders about page title', () => {
    const wrapper = mount(About);
    expect(wrapper.html()).toContain('About Cinema app');
  });

  it('displays project description', () => {
    const wrapper = mount(About);
    expect(wrapper.text()).toContain('full-stack web application');
  });

  it('renders contributors section', () => {
    const wrapper = mount(About);
    expect(wrapper.text()).toContain('Contributors');
  });

  it('displays all three contributors', () => {
    const wrapper = mount(About);
    expect(wrapper.text()).toContain('Martin Pruus');
    expect(wrapper.text()).toContain('Relina Russak');
    expect(wrapper.text()).toContain('Tauri Tammela');
  });

  it('has correct CSS classes', () => {
    const wrapper = mount(About);
    expect(wrapper.find('.section').exists()).toBe(true);
    expect(wrapper.find('.box').exists()).toBe(true);
  });
});