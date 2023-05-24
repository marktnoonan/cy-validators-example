import FancyMessage from './FancyMessage.vue'

describe('FancyMessage.cy.js', () => {
  it('shows a fallback message when no message is passed', () => {
     cy.mount(<FancyMessage />)
     cy.contains('p', '~no message~').should('be.visible')
  })

  it('shows a message when passed as a prop', () => {
    cy.mount(<FancyMessage message="hello" />)
    cy.contains('p', '~hello~').should('be.visible')

    const longText = "very long text to show that it wraps in certain rare situations"
    cy.mount(<FancyMessage message={longText} />)
    cy.contains('p', `~${longText}~`).should('be.visible')

 })
})