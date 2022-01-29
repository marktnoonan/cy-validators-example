describe('the homepage', () => {
    it('renders expected contents', () => {
        cy.visit('/')
        cy.validateComponent('App')
    })
})

        // this is a complete e2e test covering the content and semantic
        // correctness of every piece of content on the page, and the href for every link

        // How this works:

        // App component test spec the image, and alt text, which aren't in any child component,
        // then calls the HelloWorld validator
        //  - HelloWorld validator checks the title and subheadings headings directly, since it owns them, then:
        //      - It calls the HelloIntro validator, which checks the intro paragraph link, and open/close interactions 
        //        of the details and summary elements
        //      - It calls the HelloList validator 3 times, passing it the list contents array for each list
        //          - HelloList validator checks for a <ul>, and for each item in the list content array,
        //            it calls HelloListItem validator
        //              - HelloListItem validator makes sure the <li> contains an <a> with correct href and content

