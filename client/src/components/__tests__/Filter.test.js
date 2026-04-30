// src/components/__tests__/Filter.test.js
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Filter from '../Filter.vue';

describe('Filter.vue', () => {
  const mockGenres = ['All', 'Action', 'Comedy', 'Drama', 'Horror'];

  it('renders search input with correct initial value', () => {
    const wrapper = mount(Filter, {
      props: { search: 'initial', genres: mockGenres }
    });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('initial');
  });

  it('updates local search when prop changes', async () => {
    const wrapper = mount(Filter, {
      props: { search: 'first', genres: mockGenres }
    });
    await wrapper.setProps({ search: 'updated' });
    const input = wrapper.find('input');
    expect(input.element.value).toBe('updated');
  });

  it('emits update:search when search button is clicked', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    const input = wrapper.find('input');
    await input.setValue('Matrix');
    const searchBtn = wrapper.find('.button.is-primary');
    await searchBtn.trigger('click');
    
    expect(wrapper.emitted('update:search')).toBeTruthy();
    expect(wrapper.emitted('update:search')[0][0]).toBe('Matrix');
  });

  // UUS TEST: kata watch funktsionaalsus (read 14-15)
  it('updates localSearch when search prop changes via watch', async () => {
    const wrapper = mount(Filter, {
      props: { search: 'initial', genres: mockGenres }
    });
    expect(wrapper.vm.localSearch).toBe('initial');
    
    await wrapper.setProps({ search: 'new value' });
    expect(wrapper.vm.localSearch).toBe('new value');
  });

  it('dropdown is closed by default', () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    expect(wrapper.find('.dropdown').classes()).not.toContain('is-active');
  });

  it('opens dropdown when genre button is clicked', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    const genreBtn = wrapper.find('.dropdown-trigger button');
    await genreBtn.trigger('click');
    expect(wrapper.find('.dropdown').classes()).toContain('is-active');
  });

  it('closes dropdown after selecting a genre', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    const genreBtn = wrapper.find('.dropdown-trigger button');
    await genreBtn.trigger('click');
    const genreOptions = wrapper.findAll('.dropdown-item');
    await genreOptions[2].trigger('click');
    expect(wrapper.find('.dropdown').classes()).not.toContain('is-active');
  });

  it('emits update:genre when a genre is selected', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    const genreBtn = wrapper.find('.dropdown-trigger button');
    await genreBtn.trigger('click');
    const genreOptions = wrapper.findAll('.dropdown-item');
    await genreOptions[3].trigger('click');
    expect(wrapper.emitted('update:genre')).toBeTruthy();
    expect(wrapper.emitted('update:genre')[0][0]).toBe('Drama');
  });

  it('renders all genre options', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    const genreBtn = wrapper.find('.dropdown-trigger button');
    await genreBtn.trigger('click');
    const genreOptions = wrapper.findAll('.dropdown-item');
    expect(genreOptions).toHaveLength(5);
    expect(genreOptions[0].text()).toBe('All');
    expect(genreOptions[4].text()).toBe('Horror');
  });

  it('changes arrow icon when dropdown opens/closes', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    const genreBtn = wrapper.find('.dropdown-trigger button');
    
    expect(wrapper.vm.arrow).toBe('fa-angle-down');
    await genreBtn.trigger('click');
    expect(wrapper.vm.arrow).toBe('fa-angle-up');
    await genreBtn.trigger('click');
    expect(wrapper.vm.arrow).toBe('fa-angle-down');
  });

  // UUS TEST: kata selectGenre funktsionaalsus (read 51)
  it('selectGenre closes dropdown and resets arrow', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    
    // Ava dropdown
    wrapper.vm.isOpen = true;
    wrapper.vm.arrow = 'fa-angle-up';
    
    // Vali genre
    wrapper.vm.selectGenre('Action');
    
    expect(wrapper.vm.isOpen).toBe(false);
    expect(wrapper.vm.arrow).toBe('fa-angle-down');
  });

  // UUS TEST: kata updateSearch funktsionaalsus
  it('updateSearch updates localSearch from input event', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    const input = wrapper.find('input');
    const mockEvent = { target: { value: 'test movie' } };
    
    wrapper.vm.updateSearch(mockEvent);
    expect(wrapper.vm.localSearch).toBe('test movie');
  });
});