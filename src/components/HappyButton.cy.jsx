import HappyButton from './HappyButton.vue'

describe('<HappyButton />', () => {
  it('renders', () => {
    cy.mount(<HappyButton text="hi" />)
  })
  it('renders hello', () => {
    cy.mount(<HappyButton text="hello" />)
  })
})