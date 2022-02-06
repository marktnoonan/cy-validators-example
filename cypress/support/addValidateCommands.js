/* eslint-disable no-undef */
import { validators } from '../../src/components/validators.js'

const defaultOptions = { selector: '', props: {}, scopeToComponentName: true }


export function addValidateCommands() {
  Cypress.Commands.add('validate', (name, stateOrOptions, options) => {

    const resolvedState = typeof stateOrOptions === 'string' ? stateOrOptions : 'defaultRender'

    const resolvedOptions = typeof stateOrOptions === 'object' ?
      { ...defaultOptions, ...stateOrOptions } :
      { ...defaultOptions, ...options }

    // always reset meta, if options were passed through from another validator
    // we still want the current validator's name and state added for error messages
    resolvedOptions.meta = { componentName: name, state: resolvedState }
    const validatorFn = validators[name]?.[resolvedState]

    // send a helpful error if validator can't be found
    if (!validatorFn) {
      throw new Error(`No component validator found for ${resolvedState} state of ${name} component`)
    }

    // validator exists, let's log what we are doing
    Cypress.log({
      name: 'validate',
      message: `__${name}: ${resolvedState}__`,
      consoleProps: () => resolvedOptions
    })

    // return early if we've run out of depth
    if (typeof resolvedOptions.depth === 'number') {
      if (resolvedOptions.depth > 0) {
        resolvedOptions.depth--
      } else {
        cy.log('depth limit reached')
        return
      }
    }

    // if we aren't locating within a component, go on and validate
    if (resolvedOptions.scopeToComponentName === false) {
      return validatorFn(resolvedOptions)
    }
    

    return cy.getCyComponent(name, resolvedOptions.selector)
            .should('exist') // this assertion is useful for depth === 1, in case there are no internal top-level assertions 
            .as('component') 
            .within(() => validatorFn({...resolvedOptions, component: cy.get('@component')}))
  })

  Cypress.Commands.add('getCyComponent', (nameOrElement, selector) => {
    if (typeof nameOrElement === 'string') {
      
      if (!selector) {
        return cy.get(`[data-cy-component=${nameOrElement}]`)
      }
      return cy.get(`[data-cy-component=${nameOrElement}]`).filter(selector)
    } else {
      return nameOrElement.closest('[data-cy-component]')
    }
  })

}