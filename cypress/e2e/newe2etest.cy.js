describe('empty spec', () => {
  it('passes', () => {
    cy.visit('/#/other-place/?message=hello-testingmind')
    cy.contains('~hello-testingmind~').should('be.visible')
  })
})