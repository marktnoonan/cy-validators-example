describe('the other place', () => {
    it('renders some content', () => {
        // go to the target page
        cy.visit('/#/other-place?message=hello+there')

        cy.contains('~hello there~').should('be.visible')
        cy.get('h1').should('have.text', 'Some Other Place');
        cy.contains('Log In 😀').click()
        cy.contains('Log Out 😀')
    })
})
