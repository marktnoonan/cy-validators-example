import HeaderBar from "./HeaderBar.vue"

describe('<HeaderBar />', { viewportHeight: 80, viewportWidth: 800 }, () => {
  
  it('renders', () => {
    cy.mount(<HeaderBar />)
    cy.validateComponent(HeaderBar.name)
  })

})