import HelloListItem from "./HelloListItem.vue"

const testName = 'hello test'
const testHref = 'test-link-href'

describe('<HelloListItem />', { viewportHeight: 40, viewportWidth: 200 }, () => {
  it('does not render without content prop', () => {
    cy.mount(<HelloListItem />)
    cy.validateComponent(HelloListItem.name, 'noContent', { scopeToComponentName: false })

  })

  it('renders and active state if item is active', () => {
    cy.mount(<HelloListItem content={{ name: testName, href: testHref, active: true }} />)
    cy.validateComponent(HelloListItem.name, 'active')
  })
  
  it('renders in default state', () => {
    cy.mount(<HelloListItem content={{ name: testName, href: testHref }} />)
    cy.validateComponent(HelloListItem.name, { props: { name: testName, href: testHref } })
  })



})