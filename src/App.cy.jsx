import App from "./App.vue"

describe('<App />', () => {
  it('renders', () => {

    cy.mount(<App />)

    cy.validateComponent(App.name, 'loading')

    cy.validateComponent(App.name, 'defaultRender')

  })
  
  // there is a URL-driven error state that can't be tested in CT
  // so we have to do that only in E2E.
})