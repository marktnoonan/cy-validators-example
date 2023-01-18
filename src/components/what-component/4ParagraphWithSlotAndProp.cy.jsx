import ParagraphWithSlotAndProp from './4ParagraphWithSlotAndProp.vue'

describe('<ParagraphWithSlotAndProp />', () => {
  it('renders large paragraph with expected content', () => {
    cy.mount(
      <ParagraphWithSlotAndProp size="large">
        Hello I'm slot content!
      </ParagraphWithSlotAndProp>
    )

    // we can test the class name directly - easy, but can be brittle
    cy.contains('p.large', `Hello I'm slot content!`).should('be.visible')

    // or we can make a more generic assertion that font size is bigger than 16
    // extra hoop to jump through
    cy.contains('p', `Hello I'm slot content!`).should(($el) => {
      const fontSizeInPx = Number(getComputedStyle($el[0]).fontSize.split('px')[0])
      expect(fontSizeInPx).to.be.greaterThan(16)
    })

    // but really we'd probably leave this to a visual regression test
  })

  it('renders regular paragraph with expected content', () => {
    cy.mount(
      <ParagraphWithSlotAndProp>
        Hello I'm regular text!
      </ParagraphWithSlotAndProp>
    )

    // we can test absence the class name directly - easy, but class name absence doesn't mean much
    cy.contains('p:not(.large)', `Hello I'm regular text!`).should('be.visible')

    // or we can make a more generic assertion that font size is 16px
    cy.contains('p', `Hello I'm regular text!`).should(($el) => {
      const fontSize = getComputedStyle($el[0]).fontSize
      expect(fontSize).to.eq('16px')
    })

    // but really we'd probably leave this to a visual regression test
  })
})
