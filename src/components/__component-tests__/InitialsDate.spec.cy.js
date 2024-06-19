import { mount } from 'cypress/vue'
import { createPinia, setActivePinia } from 'pinia'

import { useStore } from '@/stores/store'

import InitialsDateComponent from '../InitialsDateComponent.vue'

describe('Initials Date component', () => {
   let store

   beforeEach(() => {
      setActivePinia(createPinia())
      store = useStore()

      cy.request({
         method: 'GET',
         url: 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent',
         headers: {
            Authorization:
               'Bearer eyJhbGciOiJIUzI1NiJ9.dHVzaGFyLnNhaW5pQGxvYmIuaW4.1InOHLHAMipL7u-8BHmP92fVbWADx9iiC9H0N1Cc6pc'
         }
      }).then((res) => {
         store.animeData = res.body
         mount(InitialsDateComponent)
      })
   })

   it('Root Element exists', async () => {
      cy.get('[data-cy-root]').should('exist')
   })

   it('Date check', () => {
      const date = new Date()
      let currentDate, currentDay, currentMonth
      currentDate = date.getDate()
      currentDay = date.toLocaleDateString('en-US', { weekday: 'long' })
      currentMonth = date.toLocaleDateString('en-US', { month: 'long' })
      cy.get('.date-day')
         .should('exist')
         .should('contain', `${currentDay} ${currentDate} ${currentMonth}`)
   })

   it('Today Check', () => {
      cy.get('.today').should('exist').should('contain', 'Today')
   })

   it('Initials check', () => {
      const words = store.animeData.content.userName.split(' ')
      const initials = words.map((word) => word.charAt(0).toUpperCase()).join('')

      cy.get('.initials p').should('exist').should('contain', initials)
   })
})
