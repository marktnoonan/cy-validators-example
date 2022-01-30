import ErrorMessage from "./ErrorMessage.vue"

describe('<ErrorMessage />', {viewportHeight: 60, viewportWidth: 300}, () => {
  it('renders', () => {
    const message = 'test error message'
    cy.mount(<ErrorMessage message={message} />)
    cy.validateComponent(ErrorMessage.name, {props: {message}})
  })
})