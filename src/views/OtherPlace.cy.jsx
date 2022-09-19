import OtherPlace from './OtherPlace.vue'
import router from '../router'

describe('<OtherPlace />', { viewportHeight: 800, viewportWidth: 1200 }, () => {
  it('renders default content when there is no route', () => {
    cy.mount(<OtherPlace />)
    cy.contains('p', '~Some other place message~')
  })

  it('renders messages from router', () => {
    cy.mount(<OtherPlace />, {
      global: {
        plugins: [router],
      },
    })
      .then(() => testMessageRendersFromRoute('test')) // test an example
      .then(() =>
        testMessageRendersFromRoute('new test that is much longer content-wise')
      ) // test a longer example

    // helper function to avoid repeated code
    function testMessageRendersFromRoute(message) {
      router.push({
        ...router.currentRoute,
        query: {
          message,
        },
      })
      return cy.contains('p', `~${message}~`)
    }
  })
})
