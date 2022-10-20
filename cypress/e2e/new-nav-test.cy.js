describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/#/other-place?message=testingmind')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-v-603fda2e=""]').should('have.text', ' ~testingmind~ ');
    /* ==== End Cypress Studio ==== */
  })
})