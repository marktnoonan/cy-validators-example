export const validators = {
    HelloWorld: {
      defaultRender (options = { title: 'some-test-title'}) {
        cy.contains('h1', options.title).should('be.visible')
        cy.contains('h2', "Installed CLI Plugins").should('be.visible')
        cy.contains('h2', "Essential Links").should('be.visible')
        cy.contains('h2', "Ecosystem").should('be.visible')
      },
    },
  }
  