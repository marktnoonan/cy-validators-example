describe('the other place', () => {
    it('renders some content', () => {
        // go to the target page
        cy.visit('/#/other-place')

        // check HeaderBar with depth of 1
        cy.validate('HeaderBar', {depth: 1})

        cy.validate('OtherPlace')
    })
})