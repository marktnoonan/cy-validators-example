import CounterEmitsEvent from './6CounterEmitsEvent.vue'

describe('<CounterEmitsEvent />', () => {
  it('renders', () => {
    const countedToFiveSpy = cy.spy().as('countedToFiveSpy')
    cy.mount(<CounterEmitsEvent onCountedToFive={countedToFiveSpy} />)

    // What is is responsible for:

    cy.contains('p', '0').should('be.visible')
    
    cy.findByLabelText('Increase count', {
      selector: 'button',
    }).as('countButton')

    Cypress._.times(10, () => {
      cy.get('@countButton').click()
    })

    cy.get('@countedToFiveSpy').should('have.been.calledOnce')

    // go to 11, component should error
    cy.get('@countButton').click()

    // make a stub to be called when there is an error
    const uncaughtExceptionStub = cy.stub().as('exception')

    Cypress.on('uncaught:exception', (err) => {
      // only call the stub if the error message is the one we want
      if (err.message.includes('This one goes up to 11!')) {
        uncaughtExceptionStub()

        // return false so Cypress doesn't fail the test
        return false
      }

      // still fail the test for other errors
      return true
    })

    // confirm the stub was called
    cy.get('@exception').should('have.been.calledOnce')
  })
})
