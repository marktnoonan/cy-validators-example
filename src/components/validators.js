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
        }
    }
}
*/

export const validators = {
    App: {
        defaultRender() {
            cy.validateComponent('HeaderBar')
            cy.contains('p', 'Pretending to load...').should('not.exist')
            cy.get('img').should('have.attr', 'alt', 'Vue logo')
            cy.validateComponent('HelloWorld', { props: { title: 'Welcome to Your Vue.js App' } })
        },
        loading() {
            cy.contains('p', 'Pretending to load...').should('be.visible')
        },
        error(options) {
            requireTruthy('message', options)
            cy.validateComponent('ErrorMessage', options)
            cy.getCyComponent('HelloWorld').should('not.exist')
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
            cy.validateComponent('HelloIntro')

            // nested list components, just validate
            cy.validateComponent('HelloList', { props: { items: listItems.CLI } })
            cy.validateComponent('HelloList', { props: { items: listItems.essentialLinks } })
            cy.validateComponent('HelloList', { props: { items: listItems.ecosystem } })
            cy.validateComponent('HelloList', 'noContent', { selector: '[data-cy=no-content-list]', scopeToComponentName: false })
        },
    },
    HelloListItem: {
        defaultRender(options) {
            const { name, href } = options.props

            requireTruthy('name', options)
            requireTruthy('href', options)
            // check the item exists, and has a link with the right content and href
            cy.contains('li a', name)
                .should('be.visible')
                .should('have.attr', 'href', href)
        },
        noContent(options) {
            cy.get(`${options.selector} li`).should('not.exist')
        }
    },
    HelloList: {
        defaultRender(options) {
            const { items } = options?.props
            requireTruthy('items', options)
            cy.get('ul').within(() => {
                items.forEach(item => {
                    cy.validateComponent('HelloListItem', { props: { name: item.name, href: item.href } })
                });
            })
        },
        noContent(options) {
            requireFalsy('items', options)
            cy.get(options.selector + 'ul').should('not.exist')
            cy.validateComponent('HelloListItem', 'noContent', { scopeToComponentName: false, selector: options.selector })
        }
    },
    HelloIntro: {
        defaultRender() {
            cy.contains('For a guide and recipes on how to configure / customize this project, check out the vue-cli documentation.').should('be.visible')
            cy.contains('a', 'vue-cli documentation').should('have.attr', 'href', 'https://cli.vuejs.org')

            cy.contains('I am a details element being awesome.')
                .as('detailsElement')
                .should('not.have.attr', 'open')

            cy.contains('For some interactivity, check this out')
                .as('summaryElement')
                .click()

            cy.get('@detailsElement').should('have.attr', 'open')
            cy.get('@summaryElement').click()
            cy.get('@detailsElement').should('not.have.attr', 'open')
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
        defaultRender() {
            const items =[ {
                name: 'Home',
                href: '#/'
            },
            {
                name: 'Some other place',
                href: '#/other-place'
            }
        ]
            cy.validateComponent('HelloList', { props: { items }})
        }
    }
}

function requireTruthy(propName, options) {
    const { componentName, state } = options.meta
    if (!options.props[propName]) {
        throw new Error(`Cannot validate __${state}__ state of __${componentName}__ component without __${propName}__ prop.`)
    }
}

function requireFalsy(propName, options) {
    const { componentName, state } = options.meta
    if (options.props[propName]) {
        throw new Error(`Cannot validate __${state}__ state of __${componentName}__ component when __${propName}__ prop has a value.`)
    }
}