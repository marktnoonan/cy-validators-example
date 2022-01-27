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
    HelloWorld: {
        defaultRender(options) {
            
            // top level headings - plain assertions
            cy.contains('h1', options.title).should('be.visible')
            cy.contains('h2', "Installed CLI Plugins").should('be.visible')
            cy.contains('h2', "Essential Links").should('be.visible')
            cy.contains('h2', "Ecosystem").should('be.visible')

            // nested intro component, just validate
            cy.validateComponent('HelloIntro')

            // nested list components, just validate
            cy.validateComponent('HelloList', { items: listItems.CLI })
            cy.validateComponent('HelloList', { items: listItems.essentialLinks })
            cy.validateComponent('HelloList', { items: listItems.ecosystem })
        },
    },
    HelloListItem: {
        defaultRender(options) {
            cy.contains('li a', options.name)
                .should('be.visible')
                .should('have.attr', 'href', options.href)
        },
        noContent() {
            cy.get('li').should('not.exist')
        }
    },
    HelloList: {
        defaultRender(options) {
            if (!options.items) {
                throw new Error('Cannot validate default render of HelloList without `items` option')
            }
            cy.get('ul').within(() => {
                options.items?.forEach(item => {
                    cy.validateComponent('HelloListItem', { name: item.name, href: item.href })
                });
            })
        },
        noContent() {
            cy.get('ul').should('not.exist')
            cy.validateComponent('HelloListItem', 'noContent', {scopeToComponentName: false})
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
    }
}
