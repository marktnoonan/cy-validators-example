import HelloList from "./HelloList.vue"

describe('<HelloList />', () => {
  it('renders', () => {

    const items = [
      { name: 'test-name-1', href: 'test-href-1' },
      { name: 'test-name-2', href: 'test-href-2' }
    ]

    cy.mount(<HelloList items={items} />)
    cy.validateComponent('HelloList', { items: items })
  })

  it('does not render without content prop', () => {
    cy.mount(<HelloList />)
    cy.validateComponent('HelloList', 'noContent')
  })
})