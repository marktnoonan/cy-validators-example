describe('the homepage', () => {
    it('renders expected contents', () => {
        cy.visit('/')
        cy.validateComponent('HelloWorld', {title: 'Welcome to Your Vue.js App'})
    })
})