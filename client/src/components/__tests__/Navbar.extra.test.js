// src/components/__tests__/Navbar.extra.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Navbar from '../Navbar.vue';

const RouterLinkStub = {
  name: 'RouterLink',
  template: '<a class="router-link-stub"><slot /></a>',
  props: ['to']
};

describe('Navbar.vue - Extra Coverage', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
  });

  it('handles theme toggle when theme is dark', async () => {
    localStorage.setItem('theme', 'dark');
    const wrapper = mount(Navbar, {
      global: { stubs: { 'router-link': RouterLinkStub } }
    });
    
    const themeBtn = wrapper.find('.button');
    await themeBtn.trigger('click');
    
    expect(wrapper.vm.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
  });

  it('mounted sets data-theme from localStorage', () => {
    localStorage.setItem('theme', 'dark');
    mount(Navbar, {
      global: { stubs: { 'router-link': RouterLinkStub } }
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
  });

  it('mounted sets default light theme when no localStorage', () => {
    mount(Navbar, {
      global: { stubs: { 'router-link': RouterLinkStub } }
    });
    expect(document.documentElement.getAttribute('data-theme')).toBe('light');
  });
});