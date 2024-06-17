import { mount } from '@vue/test-utils';

import InitialsDateComponent from '../InitialsDateComponent.vue';
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

describe('InitialsDateComponent.vue', () => {
    it('updates current date, day, and month on mount', async () => {

        vi.mocked(useStore).mockReturnValue({
            animeData: {
                content: {
                    userName: 'john doe',
                },
            },
        });

        // Mounting the component
        const wrapper = await mount(InitialsDateComponent);

        // Expectation: Verify that current date, day, and month are updated correctly
        const currentDateDayMonth = wrapper.find('.date-day').text();
       
        expect(currentDateDayMonth).toContain('Monday'); // Adjust the day according to the current day
        expect(currentDateDayMonth).toContain(new Date().getDate()); // Adjust the date according to the current date
        expect(currentDateDayMonth).toContain('June'); // Adjust the month according to the current month

        wrapper.unmount();
    });

    it('computes initials correctly from username', () => {
        
        vi.mocked(useStore).mockReturnValue({
            animeData: {
                content: {
                    userName: 'john doe',
                },
            },
        });

        // Mounting the component
        const wrapper = mount(InitialsDateComponent);

        // Expectation: Verify that initials are computed correctly from the username
        const initials = wrapper.find('.initials p').text();
        expect(initials).toBe('JD');

        wrapper.unmount();
    });
});
