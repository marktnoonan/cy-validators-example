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
    resolvedOptions.meta = {componentName: name, state: resolvedState}
    const validatorFn = validators[name]?.[resolvedState]

    if (!validatorFn) {
      throw new Error(`No component validator found for ${resolvedState} state of ${name} component`)
    }

    Cypress.log({
      name: 'validate', 
      message: `__${name}: ${resolvedState}__`,
      consoleProps: () => resolvedOptions
  })

    if (resolvedOptions.scopeToComponentName === false) {
      return validatorFn(resolvedOptions)
    }

    return cy.get(`${resolvedOptions.selector}[data-cy-component=${name}]`, {log: false})
      .parent({log: false})
      .within(() => validatorFn(resolvedOptions))
  })

  Cypress.Commands.add('getCyComponent', (name) => {
    return cy.get(`[data-cy-component=${name}]`)
  })
  
}