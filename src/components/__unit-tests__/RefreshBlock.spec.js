import RefreshBlock from '../RefreshBlock.vue';
import { useStore } from '@/stores/store';
import makeRequest from '@/axios/wrapper';
import { mount } from '@vue/test-utils';

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

const requestMocks = vi.hoisted(() => {
    return {
        makeRequest: vi.fn()
    }
})

vi.mock('@/axios/wrapper', () => {
    return {
        makeRequest: requestMocks.makeRequest,
        default: vi.fn()
    }
})

describe('RefreshBlock.vue', () => {
    it('renders correctly in horizontal layout', async () => {
        // Mocking store data
        
        vi.mocked(useStore).mockReturnValue({
            animeData: {
                content: {
                    logo: 'test-logo.png',
                    title: 'Test Title',
                },
            },
            setLoading: vi.fn(),
            setAnimeData: vi.fn()
        });

        // Mount the component with props
        const wrapper = mount(RefreshBlock, {
            props: {
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
                layout: 'horizontal',
            },
        });

        // Expectations
        expect(wrapper.find('.horizontal-main').exists()).toBe(true);
        expect(wrapper.find('.logo').attributes('src')).toBe('test-logo.png');
        expect(wrapper.find('.title p').text()).toBe('Test Title');
        expect(wrapper.find('.refresh-button').text()).toBe('Refresh');

        wrapper.unmount();
    });

    it('calls loadData method when refresh button is clicked', async () => {
        
        const setLoadingMock = vi.fn()
        const setAnimeDataMock = vi.fn()
        vi.mocked(useStore).mockReturnValue({
            animeData: {
                content: {
                    logo: 'test-logo.png',
                    title: 'Test Title',
                },
            },
            setLoading: setLoadingMock,
            setAnimeData: setAnimeDataMock
        });

        vi.mocked(makeRequest).mockResolvedValue({});

        // Mount the component with props
        const wrapper = mount(RefreshBlock, {
            props: {
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
                layout: 'horizontal',
            },
        });

        // Trigger click event on refresh button
        await wrapper.find('.refresh-button').trigger('click');

        // Expectations
        expect(setLoadingMock).toHaveBeenCalledWith(true);
        expect(makeRequest).toHaveBeenCalledWith({ method: 'GET', url: 'prod/getContent' });
        expect(setLoadingMock).toHaveBeenCalledWith(false);
        expect(setAnimeDataMock).toHaveBeenCalled();

        wrapper.unmount();
    });

    it('renders correctly in vertical layout', async () => {
        // Mocking store data
        // const storeMock = mock(useStore);
        vi.mocked(useStore).mockReturnValue({
            animeData: {
                content: {
                    logo: 'test-logo.png',
                    title: 'Test Title',
                },
            },
            setLoading: vi.fn(),
            setAnimeData: vi.fn()
        });

        // Mount the component with props
        const wrapper = mount(RefreshBlock, {
            props: {
                padding: '1rem',
                borderRadius: '0.5rem',
                boxShadow: 'rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px',
                layout: 'vertical',
            },
        });

        // Expectations
        expect(wrapper.find('.vertical-main').exists()).toBe(true);
        expect(wrapper.find('.logo').attributes('src')).toBe('test-logo.png');
        expect(wrapper.find('.vertical-title').text()).toBe('Test Title');
        expect(wrapper.find('.vertical-refresh-button').text()).toBe('Refresh');

        wrapper.unmount();
    });
});
