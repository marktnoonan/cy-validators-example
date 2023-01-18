import HappyButton from './HappyButton.vue'

describe('<HappyButton />', () => {
  it('renders', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(<HappyButton text="hi" />)

    cy.contains('button', 'hi 😀')
  })

  it('renders hello', () => {
    // see: https://test-utils.vuejs.org/guide/
    cy.mount(
    <div style="margin-top: 20px">
      <HappyButton text="hello" />
    </div>
    )

    cy.contains('button', 'hello 😀')
  })
})