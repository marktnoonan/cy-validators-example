import Counter from './2Counter.vue'

describe('<Counter />', () => {
  it('renders', () => {
    cy.mount(<Counter />)

    cy.log('oh')

    // What is is responsible for:
    
    cy.contains('p', '0').should('be.visible')

    cy.findByLabelText('Increase count', {
      selector: 'button'
    })
    .click()
    .click()

    cy.contains('p', '0').should('not.exist')
    cy.contains('p', '2').should('be.visible')
  })
})