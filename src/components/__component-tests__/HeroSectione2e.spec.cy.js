import { createPinia, setActivePinia } from 'pinia';
import { mount } from 'cypress/vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';

import { useStore } from '@/stores/store';
import HeroSection from '../HeroSection.vue';

describe('Hero Section Component', () => {

    let store;

    beforeEach(() => {
        setActivePinia(createPinia())

        store = useStore()
        library.add(fas);

        cy.request({
            method: 'GET',
            url: 'https://tzab40im77.execute-api.ap-south-1.amazonaws.com/prod/getContent',
            headers: {
                'Authorization': 'Bearer eyJhbGciOiJIUzI1NiJ9.dHVzaGFyLnNhaW5pQGxvYmIuaW4.1InOHLHAMipL7u-8BHmP92fVbWADx9iiC9H0N1Cc6pc'
            }
        }).then(res => {
            store.animeData = res.body
            mount(HeroSection, {
                global: {
                  components: {
                    'font-awesome-icon': FontAwesomeIcon,
                  },
                },
              });
        })
    })
    
    it('Root Element exists', async () => {
        cy.get('[data-cy-root]').should('exist')
    })
    
    it('Testing hero section for small screen sizes', async () => {
        cy.viewport(500, 800)
        
        cy.get('.hero-section').should('be.visible').should('have.css', 'background-image').and('include', `url("${store.animeData.content.thumbNailImage}")`)
        cy.get('.small-hero-title').should('contain', 'Major Update')
        cy.get('.title').should('contain', store.animeData.content.subTitle)
    })

    it('Testing hero section for larger screen sizes', async () => {
        cy.viewport(800, 800)
        
        cy.get('.hero-section').should('be.visible').should('have.css', 'background-image').and('include', `url("${store.animeData.content.thumbNailImage}")`)
        cy.get('.small-hero-title').should('contain', 'Major Update')
        cy.get('.title').should('contain', store.animeData.content.subTitle)
    })

    it('Should navigate to correct path on clicking close icon', () => {
        
        cy.get('.button-block').should('exist')
        cy.get('.close-button').should('exist')

        cy.get('.fa-xmark').click();
        cy.url().should('include', '/');
            

    })
})