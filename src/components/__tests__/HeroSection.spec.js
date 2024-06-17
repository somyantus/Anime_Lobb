import { mount } from '@vue/test-utils';

import HeroSection from '../HeroSection.vue';
import { useStore } from '@/stores/store';

const mocks = vi.hoisted(() => {
  return {
    useStore: vi.fn()
  }
})

vi.mock('@/stores/store.js', () => {
  return {
    useStore: mocks.useStore
  }
})


describe('HeroSection.vue', () => {
  it('renders correctly for small screen size', async () => {
   
    
    vi.mocked(useStore).mockReturnValue({
      animeData: {
        content: {
          subTitle: 'Test Subtitle',
        },
      },
      setScreensize: vi.fn()
    })

    // Set screen size to small
    global.innerWidth = 600;

    // Mount the component
    const wrapper = mount(HeroSection);

    // Expectations
    expect(wrapper.find('.hero-section').exists()).toBe(true);
    expect(wrapper.find('.small-hero-title').text()).toBe('Major Update');
    expect(wrapper.find('h1.title').text()).toBe('Test Subtitle');
    expect(wrapper.find('.overlay').exists()).toBe(true);

    wrapper.unmount();
  });

  it('renders correctly for medium screen size', async () => {
  
    vi.mocked(useStore).mockReturnValue({
      animeData: {
        content: {
          subTitle: 'Test Subtitle',
        },
      },
      setScreensize: vi.fn()
    });

    // Set screen size to medium
    global.innerWidth = 800;

    // Mount the component
    const wrapper = mount(HeroSection);

    // Expectations
    expect(wrapper.find('.hero-section').exists()).toBe(true);
    expect(wrapper.find('.small-hero-title').exists()).toBe(true);
    expect(wrapper.find('h1.title').text()).toBe('Test Subtitle');
    expect(wrapper.find('.overlay').exists()).toBe(true);

    wrapper.unmount();
  });
});
