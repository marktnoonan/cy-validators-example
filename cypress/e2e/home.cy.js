describe('the homepage', () => {

    it('renders error if a query param is passed', () => {
        cy.visit('/?test=ohno')
        cy.validateComponent('App', 'loading')
        cy.validateComponent('App', 'error', {props: {message: 'No query params, please!'}}).pause()
    })
    it('renders expected contents on successful visit', () => {
        cy.visit('/')
        cy.validateComponent('App', 'loading')
        cy.validateComponent('App')
    })
})

// this is a complete suite of e2e tests covering the content and semantic
// correctness of every piece of content on the page, and the href for every link
// in loading, successful render, and error states

// How this works

// cy.validateComponent('App', 'loading') runs the App component "loading" state validators only
//
// cy.validateComponent('App') runs the App component "defaultRender" state validators.
// 
// App validator, checks the image and alt text, which aren't in any child component,
// then calls the HelloWorld validator
//  - HelloWorld validator checks the title and subheadings directly, since HelloWorld owns them, then:
//      - It calls the HelloIntro validator, which checks the intro paragraph link, and open/close interactions 
//        of the details and summary elements
//      - It calls the HelloList validator 3 times, passing it the list contents array for each list
//          - HelloList validator checks for a <ul>, and for each item in the list content array,
//            it calls HelloListItem validator
//              - HelloListItem validator makes sure the <li> contains an <a> with correct href and content
//
// In the second test, with a query param added in cy.visit(), we expect a different result.
// The application should still go through the loading state, and then reach the error state.
// This code passes down the expected Error message, and the App error state validator will know what to do with it:
//
//  cy.validateComponent('App', 'error', {props: {message: 'No query params, please!'}})