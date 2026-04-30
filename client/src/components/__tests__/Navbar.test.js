import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Navbar from '../Navbar.vue';

// Mock router-link component
const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a class="router-link-stub"><slot /></a>',
  props: ['to']
};

describe('Navbar.vue', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('initializes with light theme when no theme in localStorage', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
    expect(wrapper.vm.theme).toBe('light');
  });

  it('initializes with theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
    expect(wrapper.vm.theme).toBe('dark');
  });

  it('sets data-theme attribute on mounted based on stored theme', () => {
    localStorage.setItem('theme', 'dark');
    mount(Navbar, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('toggles theme from light to dark on button click', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
    expect(wrapper.vm.theme).toBe('light');
    const themeBtn = wrapper.find('.button');
    await themeBtn.trigger('click');
    expect(wrapper.vm.theme).toBe('dark');
  });

  it('toggles theme from dark to light on button click', async () => {
    localStorage.setItem('theme', 'dark');
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.vm.theme).toBe('dark');
    const themeBtn = wrapper.find('.button');
    await themeBtn.trigger('click');
    expect(wrapper.vm.theme).toBe('light');
  });

  it('saves theme to localStorage on toggle', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
    const themeBtn = wrapper.find('.button');
    await themeBtn.trigger('click');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('updates documentElement data-theme on each toggle', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
    const themeBtn = wrapper.find('.button');
    
    await themeBtn.trigger('click');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    
    await themeBtn.trigger('click');
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });

  it('displays sun emoji for light theme', () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
    const themeBtn = wrapper.find('.button');
    expect(themeBtn.text()).toContain('☀️');
  });

  it('displays moon emoji for dark theme', async () => {
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          'router-link': RouterLinkStub
        }
      }
    });
    const themeBtn = wrapper.find('.button');
    await themeBtn.trigger('click');
    expect(themeBtn.text()).toContain('🌙');
  });
});