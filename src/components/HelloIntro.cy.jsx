import HelloIntro from "./HelloIntro.vue"

describe('<HelloIntro />', () => {
  it('renders', () => {

    cy.mount(<HelloIntro />)
    cy.validateComponent('HelloIntro')
  })
})