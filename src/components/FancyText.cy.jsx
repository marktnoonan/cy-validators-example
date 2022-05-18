/* eslint-disable no-undef */
import FancyText from "./FancyText.vue"

describe('FancyText.cy.jsx', () => {
  it('playground', () => {
    cy.mount(FancyText)
  })
  it('shows default content with no props', () => {
    cy.mount(FancyText)
    cy.contains('h1', '~default content~')
  })

  it('shows custom content with content', () => {
    cy.mount(<FancyText content="custom" />)
    cy.contains('h1', '~custom~')
  })
})