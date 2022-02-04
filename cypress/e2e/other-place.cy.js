describe('the other place', () => {
    it('renders some content', () => {
        cy.visit('/#/other-place')

        cy.validateComponent('HeaderBar', {props: {activeItemName: 'Some other place'}})

        cy.validateComponent('OtherPlace')
    })
})