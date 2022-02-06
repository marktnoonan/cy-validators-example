/* eslint-disable no-undef */
import HelloListItem from "./HelloListItem.vue"

const testContent = { name: 'hello test', href: '#test-link-href' }


describe('<HelloListItem />', { viewportHeight: 40, viewportWidth: 200 }, () => {
  it('does not render without content prop', () => {
    cy.mount(<HelloListItem />)
    cy.getCyComponent(HelloListItem.name).should('not.exist')
  })

  it('renders and active state if item is active', () => {
    const content = { ...testContent, active: true }
    cy.mount(<HelloListItem content={content} />)
    cy.validate(HelloListItem.name, { props: content })
  })

  context('the default state', () => {
    it('renders with hash links', () => {
      cy.mount(<HelloListItem content={testContent} />)
      cy.validate(HelloListItem.name, { props: testContent })
    })
    it('renders with slash links', () => {
      const withSlash = { ...testContent, href: '/test' }
      cy.mount(<HelloListItem content={withSlash} />)
      cy.validate(HelloListItem.name, { props: withSlash })
    })
    it('renders with http links', () => {
      const withHttp = { ...testContent, href: 'http://test' }
      cy.mount(<HelloListItem content={withHttp} />)
      cy.validate(HelloListItem.name, { props: withHttp })
    })
  })
})