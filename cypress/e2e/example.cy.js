describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/#/other-place/?message=testingmind+hello')
    // cy.get('[data-v-603fda2e=""]').should('have.text', ' ~testingmind hello~ ');
    // cy.contains('~testingmind hello~')
    /* ==== Generated with Cypress Studio ==== */
    cy.get('[data-v-603fda2e=""]').should('have.text', ' ~testingmind hello~ ');
    /* ==== End Cypress Studio ==== */
  })
})