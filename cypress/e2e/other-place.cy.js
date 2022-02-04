describe('the other place', () => {
    it('renders some content', () => {
        cy.visit('/#/other-place')

        cy.validateComponent('HeaderBar')
        cy.validateComponent('HeaderBar', {props: {activeItemName: 'Other Place'}})

        cy.validateComponent('OtherPlace')
    })
})