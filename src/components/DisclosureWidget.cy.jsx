import DisclosureWidget from './DisclosureWidget.vue'

describe(
  '<DisclosureWidget />',
  { viewportHeight: 300, viewportWidth: 300 },
  () => {
    it('renders when no slots are used', () => {
      // const testData = {
      //   title: 'Untitled Disclosure',
      //   body: 'Panel with no details',
      // }
      cy.mount(<DisclosureWidget />)
 
    })

    it('renders slot content', () => {

      const testData = {
        title: 'Test Title',
        body: 'Test body',
      }

      cy.mount(
        <DisclosureWidget
          v-slots={{
            title: () => <>{testData.title}</>,
          }}
        >
          {testData.body}
        </DisclosureWidget>
      )

    
    })
  }
)
