
import HeaderBar from './HeaderBar.vue'
import router from '../router'

describe('<HeaderBar />', { viewportHeight: 80, viewportWidth: 800 }, () => {
  it('renders', () => {
    cy.mount(<HeaderBar />, {
      global: {
        plugins: [router],
      },
    })
    cy.validate(HeaderBar.name, { testData: { activeItemName: 'Home' } })
  })
})
