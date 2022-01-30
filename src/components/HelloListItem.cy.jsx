import HelloListItem from "./HelloListItem.vue"

describe('<HelloListItem />', { viewportHeight: 40, viewportWidth: 200 }, () => {
  it('does not render without content prop', () => {
    cy.mount(<HelloListItem />)
    cy.validateComponent(HelloListItem.name, 'noContent', { scopeToComponentName: false })

  })
  
  it('renders', () => {
    const testName = 'hello test'
    const testHref = 'test-link-href'

    cy.mount(<HelloListItem content={{ name: testName, href: testHref }} />)
    cy.validateComponent(HelloListItem.name, { props: { name: testName, href: testHref } })
  })

})