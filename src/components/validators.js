/* eslint-disable no-undef */

import { listItems } from "./list-items"

// 

/*
Structure of validators object is:
{
    [ComponentName]: {
        [StateValidatorFunction](options) {
            // assert the validity of the state
            // based on expected static values and dynamic values from `options`

            // these assertions are scoped to locate elements
            // *within the data-cy-component selector for that component*

            // `options.component` will let the validator access the component's
            // outermost layer itself
        }
    }
}
*/

export const validators = {
    App: {
        defaultRender(options) {

            // validate the entire component tree of HeaderBar
            cy.validate('HeaderBar', extendOptions(options, { testData: { activeItemName: 'Home' } }))

            // check some DOM elements directly owned by App
            cy.contains('Pretending to load...')
                .should('not.exist')

            cy.get('img')
                .should('have.attr', 'alt', 'Vue logo')
                .and('have.length', 2)

            // validate the entire component tree of HelloWorld
            cy.validate('HelloWorld', { testData: { title: 'Welcome to Your Vue.js App' } })

            // validate navigation
            cy.contains('Some other place').click()

            // we expect a change in HeaderBar state after changing routes, 
            // so revalidate now with the new expected "active" item
            cy.validate('HeaderBar', extendOptions(options, { testData: { activeItemName: 'Some other place' } }))

            // on the new route, OtherPlace view should be visible now
            // but we don't need to check the whole tree, just check
            // that the page-level components we expect are present or not
            cy.getComponent('OtherPlace').should('be.visible')
            cy.getComponent('HelloWorld').should('not.exist')

            // go back to home page
            cy.contains('Home').click()

            // again, we don't need to check the whole tree again, just makes sure the transition
            // worked, we should see HelloWord page again, and OtherPlace is gone
            cy.getComponent('HelloWorld').should('be.visible')
            cy.getComponent('OtherPlace').should('not.exist')
        },
        loading() {
            // in loading state, we should see the message
            cy.contains('p', 'Pretending to load...').should('be.visible')

            // the page components should not exist at all in the App loading state
            cy.getComponent('HelloWorld').should('not.exist')
            cy.getComponent('OtherPlace').should('not.exist')
        }
    },
    HelloWorld: {
        defaultRender(options) {
            // title is not static in HelloWorld so we need to get it from `options`
            const { title } = options.testData

            // if we don't have a title prop, throw an error and explain
            requireTruthy('title', options)

            // HelloWorld renders these headings itself, so we just do regular assertions
            cy.contains('h1', title).should('be.visible')
            cy.contains('h2', "Installed CLI Plugins").should('be.visible')
            cy.contains('h2', "Essential Links").should('be.visible')
            cy.contains('h2', "Ecosystem").should('be.visible')

            // validate direct child HelloIntro, always pass `options` down
            cy.validate('HelloIntro', options)

            // we have the same list multiple places, but with different sets of items
            // pass in the expected array for each list, using `extendOptions` to merge
            // with options we are passing down
            cy.validate('HelloList', extendOptions(options, { testData: { items: listItems.CLI } }))
            cy.validate('HelloList', extendOptions(options, { testData: { items: listItems.essentialLinks } }))
            cy.validate('HelloList', extendOptions(options, { testData: { items: listItems.ecosystem } }))

            // with no content, the list wrapper shouldn't render, so make sure that data-cy attribute is not found
            cy.getComponent('HelloList', { selector: 'data-cy="no-content-list"' }).should('not.exist')
        },
    },
    HelloListItem: {
        defaultRender(options) {
            const { component } = options

            // `component` in options is the `cy.get([data-cy-component="${componentName}"])`
            // element - commands happen *inside* this component root element, but sometimes
            // we might want to assert something about the root itself, so here's a way to access it
            component.should('have.prop', 'nodeName', 'LI')

            const { name, href, active } = options.testData

            requireTruthy('name', options)
            requireTruthy('href', options)

            if (active) {
                // since `component` comes from a `cy.get` it can match multiple elements
                // so in case more than one item is in the DOM (almost always), 
                // we use .filter() to narrow things down to check the single active item 
                component.filter('.active').should('contain', name)
            } else {
                component.filter(':not(.active)').should('contain', name)
            }

            // check the item exists, and has a link with the right content and href
            // and that the link format is OK according to our validLinkFormat function
            cy.contains('a', name)
                .should('be.visible')
                .within(($el) => {
                    expect($el.attr('href')).to.eq(href)
                        .and.satisfy(validLinkFormat)
                })
        },
    },
    HelloList: {
        defaultRender(options) {
            const { items } = options?.testData
            requireTruthy('items', options)

            // check this component renders a semantic UL element
            options.component.should('have.prop', 'nodeName', 'UL')

            // and use the HelloListItem validator to check each expected item
            items.forEach(item => {
                cy.validate('HelloListItem', extendOptions(options, { testData: item }))
            });
        },
    },
    HelloIntro: {
        defaultRender() {
            // HelloIntro text is static content, confirm it is rendered and visible:
            cy.contains('For a guide and recipes on how to configure / customize this project, check out the vue-cli documentation.').should('be.visible')
            cy.contains('a', 'vue-cli documentation').should('have.attr', 'href', 'https://cli.vuejs.org')

            // HelloIntro renders a disclosure widget, using slots to pass in the content,
            // so let's validate that the content was passed in properly and DisclosureWidget does what we expect
            cy.validate('DisclosureWidget', { testData: { title: 'For some interactivity, check this out', body: 'I am a Disclosure Widget being awesome.' } })
        }
    },
    ErrorMessage: {
        defaultRender(options) {
            const { message } = options.testData
            requireTruthy('message', options)

            // just make sure the error text shows up
            cy.contains('p', message).should('be.visible')
        }
    },
    HeaderBar: {
        defaultRender(options) {
            // in all situations, check the image
            cy.get('img').should('have.attr', 'alt', 'Vue logo')

            cy.validate('LoginForm')

            const { activeItemName } = options.testData

            // require an active item name, since there's no valid
            // case where HeaderBar does not have one active item
            requireTruthy('activeItemName', options)

            // these are static in the test for now
            // but could come from the real source of nav items in our app
            const items = [{
                name: 'Home',
                href: '#/',
            },
            {
                name: 'Some other place',
                href: '#/other-place'
            }]
            
            const shouldBeActive = items.findIndex((item) => item.name === activeItemName)

            // if the `activeItemName` does not match anything in the test data, throw an error
            if (shouldBeActive === -1) {
                throw new Error(`No nav item found with name matching ${activeItemName}`)
            }

            // set the one we want to be active, to be active
            items[shouldBeActive].active = true

            // now with the items all set up, validate the list
            cy.validate('HelloList', extendOptions(options, { testData: { items } }))
        }
    },
    OtherPlace: {
        defaultRender() {
            // slots/nesting example -- since OtherPlace.vue owns the markup in the slots for these DisclosureWidget component, 
            // we are interacting with some elements rendered through the child directly, as well as validating
            // the DisclosureWidget's behavior in this n

            // Is is proper to have the headings inside a button? Probably not, should check. The idea is:
            // OtherPlace owns that HTML, so this is where to validate it

            cy.contains('h1', 'Some Other Place').should('be.visible')
            cy.validate('DisclosureWidget', { testData: { title: 'Outer Disclosure Title', body: 'Outer body' } })
            cy.contains('h2', 'Outer Disclosure Title').click()
            cy.validate('DisclosureWidget', { testData: { title: 'Inner Disclosure Title', body: 'Inner Disclosure Body' } })
            cy.contains('h3', 'Inner Disclosure Title').click()
            cy.validate('DisclosureWidget', { testData: { title: 'Inner INNER Disclosure Title', body: 'Inner INNER Disclosure Body' } })
            cy.contains('h4', 'Inner INNER Disclosure Title').should('be.visible')
        }
    },
    DisclosureWidget: {
        defaultRender(options) {
            const { title, body } = options.testData

            requireTruthy('title', options)
            requireTruthy('body', options)

            // just open and close this thing and see if it has the expected title and contents
            cy.contains('button', title)
                .as('trigger')
                .should('be.visible')

            cy.get('@trigger')
                .click()

            cy.contains(body)
                .should('be.visible')

            cy.get('@trigger')
                .click()

            cy.contains(body)
                .should('not.be.visible')
        }
    },
    LoginForm: {
        defaultRender(options) {
            console.log('login form component', options.component)
            const name = 'test name'
            cy.contains('label', 'Name').should('be.visible')
            cy.get('input').type(name)
            cy.contains('button', 'Log In').click()
            cy.validate('LoginForm', 'loggedIn', extendOptions(options, {testData: {name}}) )
        },
        loggedIn(options) {
            const {name} = options.testData
            requireTruthy('name', options)

            // options.component.should('contain', `Hi ${name}!`)
            cy.contains(`Hi ${name}!`).should('be.visible')
        }
    }
}

// helpers

function validLinkFormat(href) {
    return href.startsWith('/') || href.startsWith('#') || href.startsWith('http')
}

function requireTruthy(propName, options) {
    const { componentName, state } = options.meta
    if (!options.testData[propName]) {
        throw new Error(`Cannot validate __${state}__ state of __${componentName}__ component without __${propName}__ prop.`)
    }
}

function extendOptions(optionsObject, objectToMerge) {
    const optsClone = Cypress._.cloneDeep(optionsObject)
    return Cypress._.merge(optsClone, objectToMerge)
}