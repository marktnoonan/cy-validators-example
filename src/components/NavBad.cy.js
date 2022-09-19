import Navigation from './NavBad.vue'

describe('Testing generic containers', {
  viewportHeight: 80,
  viewportWidth: 300,
},
() => {
  it('has a home link', () => {
    cy.mount(Navigation)
    cy.contains('nav a', 'Home') // Boo 👎
    .should('have.attr', 'href', '/home')
  })
})