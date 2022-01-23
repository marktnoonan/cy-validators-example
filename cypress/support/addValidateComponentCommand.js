import { validators } from '../../src/components/validators.js'

export function addValidateComponentCommand () {
  Cypress.Commands.add('validateComponent', (name, stateOrOptions, options = {}) => {
    // todo we need each validator to be globally unique for this to really work,
    // so we might want to use file paths or something as well as just the name

    const resolvedState = typeof stateOrOptions === 'string' ? stateOrOptions : 'defaultRender'
    const resolvedOptions = typeof stateOrOptions === 'object' ? stateOrOptions : options
    const validatorFn = validators[name]?.[resolvedState]
    console.log(validators.HelloWorld)
    if (!validatorFn) {
      throw new Error(`No component validator found for ${resolvedState} of ${name}`)
    }

    return cy.wrap(validatorFn(resolvedOptions))
  })
}