import ParagraphWithSlotAndProp from './ParagraphWithSlotAndProp.vue'

describe('<ParagraphWithSlotAndProp />', () => {
  it('renders large paragraph with expected content', () => {
    cy.mount(<ParagraphWithSlotAndProp size='large'>Hello I'm slot content!</ParagraphWithSlotAndProp>)

    cy.contains('p.large', `Hello I'm slot content!`)
    .should('be.visible')
  })
})