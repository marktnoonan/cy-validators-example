import Paragraph from './1Paragraph.vue'

describe('<Paragraph />', () => {
  it('renders', () => {
    cy.mount(<Paragraph />)
    cy.contains('p', `Hello I'm a paragraph!`)
    .should('be.visible')
  })
})