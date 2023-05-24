import App from './App.vue'
import router from './router'

describe('<App />', { viewportHeight: 800, viewportWidth: 1200 }, () => {
  it('renders', () => {
    cy.mount(<App />, {
      global: {
        plugins: [router],
      },
    })

    cy.validate(App.name, 'loading')

    cy.validate(App.name)

  })
})
