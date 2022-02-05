describe('the other place', () => {
    it('renders some content', () => {
        cy.visit('/#/other-place')

        cy.validate('HeaderBar', {props: {activeItemName: 'Some other place'}})

        cy.validate('OtherPlace')
    })
})