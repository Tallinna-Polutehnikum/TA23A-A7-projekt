// src/components/__tests__/Filter.extra.test.js
import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Filter from '../Filter.vue';

describe('Filter.vue - 100% Coverage', () => {
  const mockGenres = ['All', 'Action', 'Comedy', 'Drama'];

  // KATA read 14-15: watch funktsioon
  it('watch updates localSearch when search prop changes from external', async () => {
    const wrapper = mount(Filter, {
      props: { search: 'initial', genres: mockGenres }
    });
    
    // Kontrolli, et localSearch algab props.search väärtusega
    expect(wrapper.vm.localSearch).toBe('initial');
    
    // Muuda prop search - see käivitab watch funktsiooni
    await wrapper.setProps({ search: 'updated from parent' });
    
    // Nüüd localSearch peaks olema uuendatud (kattes read 14-15)
    expect(wrapper.vm.localSearch).toBe('updated from parent');
  });

  // Teine test watch-i jaoks - mitu korda muutmist
  it('watch handles multiple search prop changes correctly', async () => {
    const wrapper = mount(Filter, {
      props: { search: 'first', genres: mockGenres }
    });
    
    expect(wrapper.vm.localSearch).toBe('first');
    
    await wrapper.setProps({ search: 'second' });
    expect(wrapper.vm.localSearch).toBe('second');
    
    await wrapper.setProps({ search: 'third' });
    expect(wrapper.vm.localSearch).toBe('third');
  });

  // KATA selectGenre funktsioon (read 51)
  it('selectGenre properly closes dropdown after selection', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    
    // Ava dropdown
    wrapper.vm.isOpen = true;
    wrapper.vm.arrow = 'fa-angle-up';
    
    // Vali genre
    wrapper.vm.selectGenre('Action');
    
    // Kontrolli, et dropdown suleti ja arrow lähtestati
    expect(wrapper.vm.isOpen).toBe(false);
    expect(wrapper.vm.arrow).toBe('fa-angle-down');
  });

  // KATA selectGenre emit
  it('selectGenre emits update:genre event with correct value', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    
    wrapper.vm.selectGenre('Drama');
    
    expect(wrapper.emitted('update:genre')).toBeTruthy();
    expect(wrapper.emitted('update:genre')[0][0]).toBe('Drama');
  });

  // KATA toggleDropdown funktsionaalsus
  it('toggleDropdown opens and closes dropdown correctly', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    
    // Algseisund
    expect(wrapper.vm.isOpen).toBe(false);
    expect(wrapper.vm.arrow).toBe('fa-angle-down');
    
    // Avamine
    wrapper.vm.toggleDropdown();
    expect(wrapper.vm.isOpen).toBe(true);
    expect(wrapper.vm.arrow).toBe('fa-angle-up');
    
    // Sulgemine
    wrapper.vm.toggleDropdown();
    expect(wrapper.vm.isOpen).toBe(false);
    expect(wrapper.vm.arrow).toBe('fa-angle-down');
  });

  // KATA updateSearch funktsioon
  it('updateSearch updates localSearch from input event', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    
    const mockEvent = { target: { value: 'search term' } };
    wrapper.vm.updateSearch(mockEvent);
    
    expect(wrapper.vm.localSearch).toBe('search term');
  });

  // KATA searchMovies funktsioon
  it('searchMovies emits update:search with current localSearch', async () => {
    const wrapper = mount(Filter, {
      props: { search: '', genres: mockGenres }
    });
    
    wrapper.vm.localSearch = 'test movie';
    wrapper.vm.searchMovies();
    
    expect(wrapper.emitted('update:search')).toBeTruthy();
    expect(wrapper.emitted('update:search')[0][0]).toBe('test movie');
  });

  // KATA kui props.search muutub aga localSearch on juba sama
  it('watch does nothing when props.search equals localSearch', async () => {
    const wrapper = mount(Filter, {
      props: { search: 'same', genres: mockGenres }
    });
    
    wrapper.vm.localSearch = 'same';
    await wrapper.setProps({ search: 'same' });
    
    // localSearch peaks ikka 'same' olema
    expect(wrapper.vm.localSearch).toBe('same');
  });
});