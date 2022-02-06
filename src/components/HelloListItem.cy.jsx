/* eslint-disable no-undef */
import HelloListItem from "./HelloListItem.vue"

const testContent = { name: 'hello test', href: 'test-link-href' }


describe('<HelloListItem />', { viewportHeight: 40, viewportWidth: 200 }, () => {
  it('does not render without content prop', () => {
    cy.mount(<HelloListItem />)
    cy.validate(HelloListItem.name, 'noContent', { scopeToComponentName: false })
  })

  it('renders and active state if item is active', () => {
    const content = {...testContent, active: true}
    cy.mount(<HelloListItem content={content} />)
    cy.validate(HelloListItem.name, { props: content })
  })
  
  it('renders in default state', () => {
    cy.mount(<HelloListItem content={testContent} />)
    cy.validate(HelloListItem.name, { props: testContent })
  })



})