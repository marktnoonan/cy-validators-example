describe('the homepage', () => {
    it('renders error if a query param is passed', () => {
        cy.visit('/#/?test=ohno')
    })
    it('renders expected contents on successful visit', () => {
        cy.visit('/')
    })
})
