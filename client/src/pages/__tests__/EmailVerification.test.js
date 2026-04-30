import { describe, it, expect, beforeEach, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import EmailVerification from '../EmailVerification.vue';

const mockPush = vi.fn();
vi.mock('vue-router', () => ({
  useRouter: () => ({ push: mockPush }),
  useRoute: () => ({ query: { id: '5', tickets: '2', seatType: 'single', seats: 'A1,A2' } })
}));

describe('EmailVerification.vue', () => {
  beforeEach(() => {
    mockPush.mockClear();
  });

  it('renders email input field', () => {
    const wrapper = mount(EmailVerification);
    expect(wrapper.find('input[type="email"]').exists()).toBe(true);
  });

  it('renders title and subtitle correctly', () => {
    const wrapper = mount(EmailVerification);
    expect(wrapper.text()).toContain('Confirmation email');
    expect(wrapper.text()).toContain('Please enter an email address');
  });

  it('button is disabled when email is empty', () => {
    const wrapper = mount(EmailVerification);
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeDefined();
  });

  it('button is enabled when email is provided', async () => {
    const wrapper = mount(EmailVerification);
    const input = wrapper.find('input');
    await input.setValue('test@example.com');
    const button = wrapper.find('button');
    expect(button.attributes('disabled')).toBeUndefined();
  });

  it('shows error for invalid email format', async () => {
    const wrapper = mount(EmailVerification);
    const input = wrapper.find('input');
    await input.setValue('invalid-email');
    const button = wrapper.find('button');
    await button.trigger('click');
    
    expect(wrapper.vm.emailError).toBe('Please enter a valid email address');
    expect(wrapper.find('.help.is-danger').exists()).toBe(true);
  });

  it('validates email with regex correctly', async () => {
    const wrapper = mount(EmailVerification);
    
    wrapper.vm.email = 'test@example.com';
    wrapper.vm.submitEmail();
    expect(wrapper.vm.emailError).toBe('');
    
    wrapper.vm.email = 'plainaddress';
    wrapper.vm.submitEmail();
    expect(wrapper.vm.emailError).toBe('Please enter a valid email address');
  });

  it('navigates to payment with correct query params on valid email', async () => {
    const wrapper = mount(EmailVerification);
    const input = wrapper.find('input');
    await input.setValue('test@cinema.com');
    const button = wrapper.find('button');
    await button.trigger('click');
    
    expect(mockPush).toHaveBeenCalledTimes(1);
    expect(mockPush).toHaveBeenCalledWith({
      path: '/payment',
      query: expect.objectContaining({
        email: 'test@cinema.com',
        id: '5',
        tickets: '2'
      })
    });
  });

  it('submits on Enter key press', async () => {
    const wrapper = mount(EmailVerification);
    const input = wrapper.find('input');
    await input.setValue('enter@test.com');
    await input.trigger('keyup.enter');
    expect(mockPush).toHaveBeenCalled();
  });
});