/* eslint-disable no-undef */
import HelloList from "./HelloList.vue"

describe('<HelloList />',{viewportHeight: 60, viewportWidth: 400}, () => {
  it('does not render without content prop', () => {
    cy.mount(<HelloList />)
    cy.getComponent(HelloList.name).should('not.exist')
  })

  it('renders', () => {
    const items = [
      { name: 'test-name-1', href: '#test-href-1' },
      { name: 'test-name-2', href: '#test-href-2' }
    ]
    cy.mount(<HelloList items={items} />)
    cy.validate(HelloList.name, { props: {items: items }})
  })
})