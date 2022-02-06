/* eslint-disable no-undef */
describe('the other place', () => {
    it('renders some content', () => {
        // go to the target page
        cy.visit('/#/other-place')

        // check HeaderBar with depth of 1 to confirm the component is found on the page
        // it is fully tests in `home.cy.js` so no need to duplicate here
        cy.validate('HeaderBar', {depth: 1})

        cy.validate('OtherPlace')
    })
})