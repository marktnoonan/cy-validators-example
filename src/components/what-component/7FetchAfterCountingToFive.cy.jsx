import FetchAfterCountingToFive from './7FetchAfterCountingToFive.vue'

describe('<FetchAfterCountingToFive />', () => {
  it('example', () => {
    cy.mount(<FetchAfterCountingToFive />)
  })

  it('renders', {defaultCommandTimeout: 10}, () => {

    cy.intercept('https://swapi.dev/api/people/*').as('swapiCall')
    cy.mount(<FetchAfterCountingToFive />)
    cy.contains('p', '0').should('be.visible')

    cy.findByLabelText('Increase count', {
      selector: 'button',
    }).as('countButton')

    // NOTE: will be flaky
    Cypress._.times(10, () => {
      cy.get('@countButton').click()
    })

    cy.contains('Loading...')
    cy.wait('@swapiCall', {defaultCommandTimeout: 2000})
    cy.contains('li', 'Luke Skywalker').should('be.visible')

    cy.get('@countButton').click()


    cy.contains('li', 'Nigel Tufnel').should('be.visible')

  })
  it('renders with intercept', () => {
    cy.mount(<FetchAfterCountingToFive />)

    cy.intercept('https://swapi.dev/api/people/1/', {
      name: 'Chewbacca'
    })

    cy.contains('p', '0').should('be.visible')

    cy.findByLabelText('Increase count', {
      selector: 'button',
    }).as('countButton')

    Cypress._.times(10, () => {
      cy.get('@countButton').click()
    })

    // wait for the side effect from 
    cy.contains('li', 'Chewbacca').should('be.visible')

    cy.get('@countButton').click()

    cy.contains('li', 'Nigel Tufnel').should('be.visible')

  })
})