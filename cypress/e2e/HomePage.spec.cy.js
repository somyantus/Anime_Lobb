import { createPinia, setActivePinia } from "pinia"
import { useStore } from "../../src/stores/store"


describe('Home Page', () => {

  let store;

  beforeEach(() => {
    setActivePinia(createPinia())

    store = useStore()

    cy.request({
        method: 'GET',
        url: 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent',
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.dHVzaGFyLnNhaW5pQGxvYmIuaW4.1InOHLHAMipL7u-8BHmP92fVbWADx9iiC9H0N1Cc6pc'
        }
    }).then(res => {
      store.animeData = res.body
    })

  })


  it('It Renders Successfully', () => {
    cy.visit('/')
    cy.get('.image-link').click()
    cy.url().should('contain', '/content')
  })

  it('Reloads Page correctly', () => {
    cy.intercept('GET', 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent').as('getContent')
    cy.visit('/')
    cy.get('.refresh-button').click()
    cy.wait('@getContent').then(res => {
      const refreshData = res.response.body
      store.animeData = refreshData

      const name = refreshData.content.userName.split(' ')
      const initials = name.map(name => name.charAt(0).toUpperCase()).join('')

      cy.get('.initials').should('contain', initials)
    })
  })
})