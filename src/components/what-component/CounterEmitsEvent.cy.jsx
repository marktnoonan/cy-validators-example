import CounterEmitsEvent from './CounterEmitsEvent.vue'

describe('<CounterEmitsEvent />', () => {
  it('renders', () => {

    const countToFiveSpy = cy.spy().as('countToFiveSpy')

    cy.mount(<CounterEmitsEvent onCountedToFive={countToFiveSpy} />)

    // What is is responsible for:
    
    cy.contains('p', '0').should('be.visible')

    cy.findByLabelText('Increase count', {
      selector: 'button'
    }).as('countButton')

    Cypress._.times(10, () => {
      cy.get('@countButton').click()
    })

    cy.get('@countToFiveSpy').should('have.been.calledOnce')
  })
})