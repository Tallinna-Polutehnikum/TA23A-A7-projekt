import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ContributorCard from '../ContributorCard.vue';

describe('ContributorCard.vue', () => {
  const mockContributor = {
    name: 'Martin Pruus',
    username: 'martinprs',
    avatarUrl: 'https://avatars.githubusercontent.com/u/144675657?v=4',
    githubUrl: 'https://github.com/martinprs'
  };

  it('renders contributor name correctly', () => {
    const wrapper = mount(ContributorCard, {
      props: { contributor: mockContributor }
    });
    expect(wrapper.text()).toContain('Martin Pruus');
  });

  it('renders username correctly', () => {
    const wrapper = mount(ContributorCard, {
      props: { contributor: mockContributor }
    });
    expect(wrapper.text()).toContain('@martinprs');
  });

  it('renders avatar image with correct src', () => {
    const wrapper = mount(ContributorCard, {
      props: { contributor: mockContributor }
    });
    const img = wrapper.find('img');
    expect(img.attributes('src')).toBe(mockContributor.avatarUrl);
  });

  it('renders GitHub link with correct href and target', () => {
    const wrapper = mount(ContributorCard, {
      props: { contributor: mockContributor }
    });
    const link = wrapper.find('a.button');
    expect(link.attributes('href')).toBe(mockContributor.githubUrl);
    expect(link.attributes('target')).toBe('_blank');
    expect(link.attributes('rel')).toBe('noopener noreferrer');
  });

  it('has correct CSS classes', () => {
    const wrapper = mount(ContributorCard, {
      props: { contributor: mockContributor }
    });
    expect(wrapper.find('.card').exists()).toBe(true);
    expect(wrapper.find('.card-content').exists()).toBe(true);
    expect(wrapper.find('.media').exists()).toBe(true);
  });
});