import NewPage from './NewPage.vue'

describe('<NewPage />', { viewportHeight: 800, viewportWidth: 1200 }, () => {
  it('renders', () => {
    cy.mount(<NewPage />)
    cy.contains('~hello~')
  })
})
