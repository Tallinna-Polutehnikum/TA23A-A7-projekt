// src/components/__tests__/Filter.watch.test.js
import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Filter from '../Filter.vue';

describe('Filter.vue - Watch branch coverage', () => {
  const mockGenres = ['All', 'Action', 'Comedy'];

  // See test katab watch funktsiooni haru, kus props.search MUUTUB
  it('watch updates localSearch when search prop changes to different value', async () => {
    const wrapper = mount(Filter, {
      props: { search: 'initial', genres: mockGenres }
    });
    
    // Algväärtus
    expect(wrapper.vm.localSearch).toBe('initial');
    
    // Muuda prop search teiseks väärtuseks - see käivitab watch
    await wrapper.setProps({ search: 'different' });
    expect(wrapper.vm.localSearch).toBe('different');
  });

  // See test katab watch funktsiooni haru, kus props.search EI MUUTU (sama väärtus)
  it('watch does nothing when search prop changes to same value', async () => {
    const wrapper = mount(Filter, {
      props: { search: 'same', genres: mockGenres }
    });
    
    wrapper.vm.localSearch = 'same';
    
    // Muuda prop search samaks väärtuseks
    await wrapper.setProps({ search: 'same' });
    
    // localSearch peaks ikka 'same' olema
    expect(wrapper.vm.localSearch).toBe('same');
  });

  // See test katab watch esmase seadistuse
  it('watch is set up correctly on component mount', () => {
    const wrapper = mount(Filter, {
      props: { search: 'mount test', genres: mockGenres }
    });
    
    // Kontrolli, et watch on seadistatud (localSearch võrdub props.search)
    expect(wrapper.vm.localSearch).toBe('mount test');
  });
});