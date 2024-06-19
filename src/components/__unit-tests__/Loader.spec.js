import { mount } from '@vue/test-utils'
import Loader from '../Loader.vue'
import { useStore } from '@/stores/store'

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

describe('Loader.vue', () => {
   it('renders loader when isLoading is true', async () => {
      vi.mocked(useStore).mockReturnValue({ isLoading: true })

      // Mounting the Loader component
      const wrapper = mount(Loader)

      // Expectation: Verify that loader is rendered
      expect(wrapper.find('.loader').exists()).toBe(true)
      expect(wrapper.find('.spinner').exists()).toBe(true)
      expect(wrapper.find('.message').text()).toBe('Loading please wait...')

      wrapper.unmount()
   })

   it('does not render loader when isLoading is false', async () => {
      vi.mocked(useStore).mockReturnValue({ isLoading: false })

      // Mounting the Loader component
      const wrapper = mount(Loader)

      // Expectation: Verify that loader is not rendered
      expect(wrapper.find('.loader').exists()).toBe(false)

      wrapper.unmount()
   })
})
