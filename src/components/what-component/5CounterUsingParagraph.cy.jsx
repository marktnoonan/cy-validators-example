import CounterUsingParagraph from './5CounterUsingParagraph.vue'

describe('<CounterUsingParagraph />', () => {
  it('renders', () => {
    cy.mount(<CounterUsingParagraph />)
    
    cy.contains('p', '0').should('be.visible')

    cy.findByLabelText('Increase count', {
      selector: 'button'
    }).as('incrementButton')

    cy.get('@incrementButton').click()
    cy.get('@incrementButton').click()

    cy.contains('p', '0').should('not.exist')
    cy.contains('p', '2').should('be.visible')
  })
})