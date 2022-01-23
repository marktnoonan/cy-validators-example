import HelloListItem from "./HelloListItem.vue"

describe('<HelloListItem />', () => {
  it('renders', () => {

    const testName = 'hello test'
    const testHref = 'test-link-href'

    cy.mount(<HelloListItem content={{name: testName, href: testHref}} />)
    cy.validateComponent('HelloListItem', {name: testName, href: testHref })
  })

  it('does not render without content prop', () => {
    cy.mount(<HelloListItem />)
    cy.validateComponent('HelloListItem', 'noContent')


  } )
})