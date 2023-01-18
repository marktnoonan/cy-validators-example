import HelloIntro from './HelloIntro.vue'

describe('<HelloIntro />', { viewportHeight: 200 }, () => {
  it('renders', () => {
    cy.mount(<HelloIntro />)
  })
})
