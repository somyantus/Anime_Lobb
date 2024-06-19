import { createPinia, setActivePinia } from 'pinia'
import { useStore } from '../../src/stores/store'

describe('Content Page', () => {
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
      })
   })

   it('It Renders Successfully', () => {
      cy.visit('/content')
      cy.get('.close-button').click()
      cy.url().should('contain', '/')
   })

   it('Refresh Blocks Work properly for small screen', () => {
      cy.intercept(
         'GET',
         'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent'
      ).as('getContent')
      cy.visit('/content')

      cy.viewport(500, 500)
      cy.get('.vertical-refresh-button').should('exist').click()
      cy.wait('@getContent').then((res) => {
         const refreshData = res.response.body
         store.animeData = refreshData
         cy.get('.vertical-main .vertical-title').should('contain', refreshData.content.title)
      })
   })

   it('Horizontal layout of Refresh Blocks Work properly for larger screen', () => {
      cy.intercept(
         'GET',
         'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent'
      ).as('getContent')
      cy.visit('/content')

      cy.viewport(800, 900)
      cy.get('.refresh-button').should('exist').click()
      cy.wait('@getContent').then((res) => {
         const refreshData = res.response.body
         store.animeData = refreshData
         cy.get('.horizontal-main .title').should('contain', refreshData.content.title)
      })
   })

   it('Vertical layout of Refresh Blocks Work properly for larger screen', () => {
      cy.intercept(
         'GET',
         'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent'
      ).as('getContent')
      cy.visit('/content')

      cy.viewport(800, 900)
      cy.get('.vertical-refresh-button').should('exist').click()
      cy.wait('@getContent').then((res) => {
         const refreshData = res.response.body
         store.animeData = refreshData
         cy.get('.vertical-main .vertical-title').should('contain', refreshData.content.title)
      })
   })
})
