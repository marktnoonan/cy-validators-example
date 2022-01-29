import { validators } from '../../src/components/validators.js'

const defaultOptions = { selector: '', props: {}, scopeToComponentName: true }

export function addValidateComponentCommand() {
  Cypress.Commands.add('validateComponent', (name, stateOrOptions, options) => {

    const resolvedState = typeof stateOrOptions === 'string' ? stateOrOptions : 'defaultRender'

    const resolvedOptions = typeof stateOrOptions === 'object' ?
      { ...defaultOptions, ...stateOrOptions } :
      { ...defaultOptions, ...options }
    console.log({ name, stateOrOptions, defaultOptions, resolvedOptions, options })

    const validatorFn = validators[name]?.[resolvedState]

    if (!validatorFn) {
      throw new Error(`No component validator found for ${resolvedState} of ${name}`)
    }

    if (resolvedOptions.scopeToComponentName === false) {
      return validatorFn(resolvedOptions)
    }

    return cy.get(`${resolvedOptions.selector}[data-cy-component=${name}]`)
      .parent()
      .within(() => validatorFn(resolvedOptions))
  })
}