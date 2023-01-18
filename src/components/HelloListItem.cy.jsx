import HelloListItem from './HelloListItem.vue'

const testContent = { name: 'hello test', href: '#test-link-href' }

describe(
  '<HelloListItem />',
  { viewportHeight: 40, viewportWidth: 200 },
  () => {
    it('does not render without content prop', () => {
      cy.mount(<HelloListItem />)
    })

    it('renders and active state if item is active', () => {
      const content = { ...testContent, active: true }
      cy.mount(<HelloListItem content={content} />)
    })

    context('the default state', () => {
      it('renders with hash links', () => {
        cy.mount(<HelloListItem content={testContent} />)
      })
      it('renders with slash links', () => {
        const withSlash = { ...testContent, href: '/test' }
        cy.mount(<HelloListItem content={withSlash} />)
      })
      it('renders with http links', () => {
        const withHttp = { ...testContent, href: 'http://test' }
        cy.mount(<HelloListItem content={withHttp} />)
      })
    })
  }
)
