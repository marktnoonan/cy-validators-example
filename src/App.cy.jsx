import App from "./App.vue"
import router from './router'


describe('<App />', () => {
  it('renders', () => {

    cy.mount(<App />, {
      global: {
        plugins: [router]
      }
    })

    cy.validateComponent(App.name, 'loading')

    cy.validateComponent(App.name)

  })
  
  // there is a URL-driven error state that can't be tested in CT
  // so we have to do that only in E2E.
})