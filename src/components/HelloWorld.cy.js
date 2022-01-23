import Helloworld from "./HelloWorld.vue"

describe('<Helloworld />', () => {
  it('renders', () => {

    // create a test title
    const testTitle = 'hello test'

    // use the component's props to set the test title
    cy.mount(Helloworld, { props: {title: testTitle} })

    // Pass the test title as an option to the validator.
    // The validator already knows everything else it needs to check
    // about the component because there is only static content there.
    cy.validateComponent('HelloWorld', {title: testTitle})
  })
})