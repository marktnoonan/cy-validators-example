import App from "./App.vue"

describe('<App />', () => {
  it('renders', () => {

    cy.mount(<App />)

    cy.validateComponent('App', { scopeToComponentName: false })

  })
})