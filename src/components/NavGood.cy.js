import Navigation from './NavGood.vue'

describe(
  'Testing semantic HTML',{
    viewportHeight: 80,
    viewportWidth: 300,
  },
  () => {
    it('has a home link', () => {
      cy.mount(Navigation)
      cy.contains('nav a', 'Home') // yay!
        .should('have.attr', 'href', '/home')
    })
  }
)
