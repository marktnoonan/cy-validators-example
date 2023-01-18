import DisclosureWidget from './components/DisclosureWidget.vue'

describe('<DisclosureWidget />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(DisclosureWidget)
  })
})