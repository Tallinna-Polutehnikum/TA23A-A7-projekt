import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import Pagination from '../Pagination.vue';

describe('Pagination.vue', () => {
  it('renders correct number of page buttons', () => {
    const wrapper = mount(Pagination, {
      props: { totalPages: 7, currentPage: 1 }
    });
    const pageLinks = wrapper.findAll('.pagination-link');
    expect(pageLinks).toHaveLength(7);
  });

  it('displays current page number correctly', () => {
    const wrapper = mount(Pagination, {
      props: { totalPages: 10, currentPage: 4 }
    });
    const currentLink = wrapper.find('.pagination-link.is-current');
    expect(currentLink.text()).toBe('4');
  });

  it('previous button is disabled on first page', () => {
    const wrapper = mount(Pagination, {
      props: { totalPages: 5, currentPage: 1 }
    });
    const prevButton = wrapper.find('.pagination-previous');
    expect(prevButton.classes()).toContain('is-disabled');
  });

  it('next button is disabled on last page', () => {
    const wrapper = mount(Pagination, {
      props: { totalPages: 5, currentPage: 5 }
    });
    const nextButton = wrapper.find('.pagination-next');
    expect(nextButton.classes()).toContain('is-disabled');
  });

  it('emits page-changed with next page when clicking next', async () => {
    const wrapper = mount(Pagination, {
      props: { totalPages: 5, currentPage: 2 }
    });
    const nextButton = wrapper.find('.pagination-next');
    await nextButton.trigger('click');
    
    expect(wrapper.emitted('page-changed')).toBeTruthy();
    expect(wrapper.emitted('page-changed')[0][0]).toBe(3);
  });

  it('emits page-changed with previous page when clicking previous', async () => {
    const wrapper = mount(Pagination, {
      props: { totalPages: 5, currentPage: 3 }
    });
    const prevButton = wrapper.find('.pagination-previous');
    await prevButton.trigger('click');
    
    expect(wrapper.emitted('page-changed')[0][0]).toBe(2);
  });

  it('emits page-changed when clicking specific page number', async () => {
    const wrapper = mount(Pagination, {
      props: { totalPages: 5, currentPage: 1 }
    });
    const pageButtons = wrapper.findAll('.pagination-link');
    await pageButtons[3].trigger('click');
    expect(wrapper.emitted('page-changed')[0][0]).toBe(4);
  });

  it('does not emit when clicking disabled previous button', async () => {
    const wrapper = mount(Pagination, {
      props: { totalPages: 5, currentPage: 1 }
    });
    const prevButton = wrapper.find('.pagination-previous');
    await prevButton.trigger('click');
    expect(wrapper.emitted('page-changed')).toBeFalsy();
  });

  it('does not emit when clicking disabled next button', async () => {
    const wrapper = mount(Pagination, {
      props: { totalPages: 5, currentPage: 5 }
    });
    const nextButton = wrapper.find('.pagination-next');
    await nextButton.trigger('click');
    expect(wrapper.emitted('page-changed')).toBeFalsy();
  });
});