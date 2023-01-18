import App from './App.vue'
import router from './router'

describe('<App />', { viewportHeight: 800, viewportWidth: 1200 }, () => {
  it('renders', () => {
    cy.mount(<App />, {
      global: {
        plugins: [router],
      },
    })

  })

  // there is a URL-driven error state that can't be tested in CT
  // so we have to do that only in E2E.
})
