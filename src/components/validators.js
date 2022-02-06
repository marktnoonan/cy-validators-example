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

            // by default, these assertions are scoped to locate elements
            // *within the data-cy-component selector for that component*
            // - this can be disabled with the `scopeToComponentName` option
            // when calling `cy.validate` - useful to confirm a component doesn't exist
        }
    }
}
*/

export const validators = {
    App: {
        defaultRender(options) {
            cy.validate('HeaderBar', extendOptions(options, { props: { activeItemName: 'Home' } }))
            cy.contains('Pretending to load...').should('not.exist')
            cy.get('img').should('have.attr', 'alt', 'Vue logo')
            cy.contains('Some other place').click()
            cy.validate('HeaderBar', extendOptions(options, { props: { activeItemName: 'Some other place' } }))
            cy.validate('OtherPlace')

        },
        loading() {
            cy.contains('p', 'Pretending to load...').should('be.visible')
        }
    },
    HelloWorld: {
        defaultRender(options) {
            const { title } = options.props
            requireTruthy('title', options)
            // top level headings - plain assertions
            cy.contains('h1', title).should('be.visible')
            cy.contains('h2', "Installed CLI Plugins").should('be.visible')
            cy.contains('h2', "Essential Links").should('be.visible')
            cy.contains('h2', "Ecosystem").should('be.visible')

            // nested intro component, just validate
            cy.validate('HelloIntro', options)

            // nested list components, just validate
            cy.validate('HelloList', extendOptions(options, { props: { items: listItems.CLI } }))
            cy.validate('HelloList', extendOptions(options, { props: { items: listItems.essentialLinks } }))
            cy.validate('HelloList', extendOptions(options, { props: { items: listItems.ecosystem } }))
            cy.validate('HelloList', 'noContent', extendOptions(options, { selector: '[data-cy=no-content-list]', scopeToComponentName: false }))
        },
    },
    HelloListItem: {
        defaultRender(options) {
            const { component } = options
            component.should('have.prop', 'nodeName', 'LI')

            const { name, href, active } = options.props

            requireTruthy('name', options)
            requireTruthy('href', options)

            if (active) {
                component.filter('.active').should('contain', name)
            } else {
                component.filter(':not(.active)').should('contain', name)
            }

            // check the item exists, and has a link with the right content and href
            cy.contains('a', name)
                .should('be.visible')
                .within(($el) => {
                    expect($el.attr('href')).to.eq(href)
                    .and.satisfy(href => href.startsWith('/') || href.startsWith('#') || href.startsWith('http'))
                })
        },
        noContent(options) {
            cy.get(`${options.selector} li`).should('not.exist')
        },
    },
    HelloList: {
        defaultRender(options) {
            const { items } = options?.props
            requireTruthy('items', options)

            options.component.should('have.prop', 'nodeName', 'UL')
            items.forEach(item => {
                cy.validate('HelloListItem', extendOptions(options, { props: { name: item.name, href: item.href, active: item.active } }))
            });
        },
        noContent(options) {
            requireFalsy('items', options)
            cy.get(options.selector + 'ul').should('not.exist')
            cy.validate('HelloListItem', 'noContent', extendOptions(options, { scopeToComponentName: false, selector: options.selector }))
        }
    },
    HelloIntro: {
        defaultRender() {
            cy.contains('For a guide and recipes on how to configure / customize this project, check out the vue-cli documentation.').should('be.visible')
            cy.contains('a', 'vue-cli documentation').should('have.attr', 'href', 'https://cli.vuejs.org')
            cy.validate('DisclosureWidget', { props: { title: 'For some interactivity, check this out', body: 'I am a details element being awesome.' } })
        }
    },
    ErrorMessage: {
        defaultRender(options) {
            const { message } = options.props
            requireTruthy('message', options)
            cy.contains('p', message).should('be.visible')
        }
    },
    HeaderBar: {
        defaultRender(options) {
            const { activeItemName } = options.props
            requireTruthy('activeItemName', options, options.depth !== 0)

            if (activeItemName) {
                const items = [{
                    name: 'Home',
                    href: '#/',
                },
                {
                    name: 'Some other place',
                    href: '#/other-place'
                }]
                const shouldBeActive = items.findIndex((item) => item.name === activeItemName)
                if (shouldBeActive === -1) {
                    throw new Error(`No nav item found with name matching ${activeItemName}`)
                }
                items[shouldBeActive].active = true
                cy.validate('HelloList', extendOptions(options, { props: { items } }))
            }
        }
    },
    OtherPlace: {
        defaultRender() {
            // slots/nesting example -- since OtherPlace.vue owns the markup in the slots for these DisclosureWidget component, 
            // we are interacting with some elements rendered through the child directly, as well as validating
            // the DisclosureWidget's behavior in this n

            // Is is proper to have the headings inside a button? Probably not, should check.

            cy.contains('h1','Some Other Place').should('be.visible')
            cy.validate('DisclosureWidget', {props: {title: 'Outer Disclosure Title', body: 'Outer body'}})
            cy.contains('h2','Outer Disclosure Title').click()
            cy.validate('DisclosureWidget', {props: {title: 'Inner Disclosure Title', body: 'Inner Disclosure Body'}})
            cy.contains('h3', 'Inner Disclosure Title').click()
            cy.validate('DisclosureWidget', {props: {title: 'Inner INNER Disclosure Title', body: 'Inner INNER Disclosure Body'}})
            cy.contains('h4', 'Inner INNER Disclosure Title').should('be.visible')
        }
    },
    DisclosureWidget: {
        defaultRender(options) {
            const { title, body } = options.props

            requireTruthy('title', options)
            requireTruthy('body', options)

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
    }
}

// helpers

function requireTruthy(propName, options, extraCondition = true) {
    const { componentName, state } = options.meta
    if (!options.props[propName] && extraCondition) {
        throw new Error(`Cannot validate __${state}__ state of __${componentName}__ component without __${propName}__ prop.`)
    }
}

function requireFalsy(propName, options, extraCondition = true) {
    const { componentName, state } = options.meta
    if (options.props[propName] && extraCondition) {
        throw new Error(`Cannot validate __${state}__ state of __${componentName}__ component when __${propName}__ prop has a value.`)
    }
}

function extendOptions(optionsObject, objectToMerge) {
    const optsClone = Cypress._.cloneDeep(optionsObject)
    return Cypress._.merge(optsClone, objectToMerge)
}