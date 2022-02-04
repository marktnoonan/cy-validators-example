import OtherPlace from "./OtherPlace.vue"

describe('<OtherPlace />', {viewportHeight: 800, viewportWidth: 1200}, () => {
  it('renders', () => {

    cy.mount(<OtherPlace />)

    // Pass the test title as an option to the validator.
    // The validator already knows everything else it needs to check
    // about the component because there is only static content there.
    cy.validateComponent(OtherPlace.name)
  })
})