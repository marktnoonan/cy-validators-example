describe('the homepage', () => {
    it('renders expected contents', () => {
        // go to the app
        cy.visit('/')
        
        // the image is part of App.vue so not covered by any component test, check it here
        cy.get('img').should('have.attr', 'alt', 'Vue logo')

        // the title comes from App.vue, so pass it as part of the `options` object
        cy.validateComponent('HelloWorld', {title: 'Welcome to Your Vue.js App'})

        // this is now a complete e2e test covering the content and semantic
        // correctness of every piece of content on the page, and the href for every link

        // How this works:
          
        // HelloWorld validator checks the title and subheadings headings directly, since it owns them, then:
        //  - It calls the HelloIntro validator, which checks the intro paragraph and link
        //  - Calls the HelloList validator 3 times, passing it the list contents array for each list
        //      - HelloList validator checks for a <ul>, and for each item in the list content array,
        //      it calls HelloListItem validator
        //          - HelloListItem validator makes sure the <li> contains an <a> with correct href and content
       
})


        

         