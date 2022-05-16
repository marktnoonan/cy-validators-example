/* eslint-disable no-undef */

import HackBuddy from './HackBuddy.vue'

describe('HackBuddy.cy.js', () => {
  it('shows a fallback message when no message is passed', () => {
     cy.mount(<HackBuddy />)
     cy.contains('p', 'no message').should('be.visible')
  })

  it('shows a message when passed as a prop', () => {
    cy.mount(<HackBuddy message="hello" />)
    cy.contains('p', 'hello').should('be.visible')
 })
})