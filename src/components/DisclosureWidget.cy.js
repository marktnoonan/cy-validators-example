/* eslint-disable no-undef */

import DisclosureWidget from './DisclosureWidget.vue'

describe(
  '<DisclosureWidget />',
  { viewportHeight: 300, viewportWidth: 300 },
  () => {
    it('renders when no slots are used', () => {
      cy.mount(<DisclosureWidget />)
      cy.validate(DisclosureWidget.name, {
        testData: {
          title: 'Untitled Disclosure',
          body: 'Panel with no details',
        },
      })
    })

    it('renders slot content', () => {
      cy.mount(
        <DisclosureWidget
          v-slots={{
            title: () => <>Test Title</>,
          }}
        >
          Test body
        </DisclosureWidget>
      )
      cy.validate(DisclosureWidget.name, {
        testData: { title: 'Test Title', body: 'Test body' },
      })
    })
  }
)
