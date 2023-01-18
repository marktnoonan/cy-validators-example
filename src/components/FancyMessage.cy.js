import FancyMessage from './FancyMessage.vue'

describe('<FancyMessage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FancyMessage)
  })
})