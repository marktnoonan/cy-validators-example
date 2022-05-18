/* eslint-disable no-undef */
describe('new-page.cy.js', () => {
  it('should visit', () => {
    cy.visit('/#/new-page')
    cy.contains('New Page').should('be.visible')
    cy.contains('~hello~').should('be.visible')
  })
})
