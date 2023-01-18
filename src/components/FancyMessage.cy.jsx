import FancyMessage from './FancyMessage.vue'

describe('FancyMessage.cy.js', () => {
  it('shows a fallback message when no message is passed', () => {
     cy.mount(<FancyMessage />)
  })

  it('shows a message when passed as a prop', () => {
    cy.mount(<FancyMessage message="hello" />)

    const longText = "very long text to show that it wraps in certain rare situations"
    cy.mount(<FancyMessage message={longText} />)
 })
})