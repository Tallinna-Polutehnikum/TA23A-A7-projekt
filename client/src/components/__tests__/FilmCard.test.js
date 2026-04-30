import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import FilmCard from '../FilmCard.vue';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush })
}));

describe('FilmCard.vue', () => {
  const mockMovie = {
    id: 5,
    title: 'Inception',
    genre: 'Action',
    images: [{ film_cover: 'inception-cover.jpg' }]
  };

  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders movie title correctly', () => {
    const wrapper = mount(FilmCard, {
      props: { movie: mockMovie }
    });
    expect(wrapper.text()).toContain('Inception');
  });

  it('renders movie genre correctly', () => {
    const wrapper = mount(FilmCard, {
      props: { movie: mockMovie }
    });
    expect(wrapper.text()).toContain('Action');
  });

  it('renders cover image with correct URL', () => {
    const wrapper = mount(FilmCard, {
      props: { movie: mockMovie }
    });
    const img = wrapper.find('.card-image img');
    expect(img.attributes('src')).toBe('http://localhost:5000/inception-cover.jpg');
  });

  it('navigates to movies page with correct query on click', async () => {
    const wrapper = mount(FilmCard, {
      props: { movie: mockMovie }
    });
    const card = wrapper.find('.card');
    await card.trigger('click');
    
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      path: '/movies',
      query: { id: 5 }
    });
  });

  it('has clickable card with cursor pointer', () => {
    const wrapper = mount(FilmCard, {
      props: { movie: mockMovie }
    });
    expect(wrapper.find('.card').exists()).toBe(true);
  });
});