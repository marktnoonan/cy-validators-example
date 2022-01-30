import { validators } from '../../src/components/validators.js'

const defaultOptions = { selector: '', props: {}, scopeToComponentName: true }


export function addValidateComponentCommands() {

let validateComponentObserver = null
const ourMap = new WeakMap()

  

  Cypress.Commands.add('validateComponent', (nameOrElement, stateOrOptions, options) => {

    console.log('body', window.parent.document.querySelector('.aut-iframe').contentWindow.document.body)
    if (!validateComponentObserver) {
      validateComponentObserver = new MutationObserver((record) => {
        const componentThatChanged = record.find(item => item.target).target.closest('[data-cy-component]')
        console.log({record})
        ourMap.set(componentThatChanged, componentThatChanged.dataset.cyComponent)
        cy.validateComponent(componentThatChanged)
        console.log(ourMap)
      });
      validateComponentObserver.observe(
        window.parent.document.querySelector('.aut-iframe').contentWindow.document.body,
        {
          childList: true, subtree: true
        },
      )
    }

    
    const resolvedState = typeof stateOrOptions === 'string' ? stateOrOptions : 'defaultRender'

    const resolvedOptions = typeof stateOrOptions === 'object' ?
      { ...defaultOptions, ...stateOrOptions } :
      { ...defaultOptions, ...options }

    const resolvedName = typeof nameOrElement === 'string' ? nameOrElement : nameOrElement.dataset.cyComponent

    const resolvedEl = typeof nameOrElement === 'string' ? null : nameOrElement

    resolvedOptions.targetElement = resolvedEl
    // always reset meta, if options were passed through from another validator
    // we still want the current validator's name and state added for error messages
    resolvedOptions.meta = { componentName: resolvedName, state: resolvedState }
    const validatorFn = validators[resolvedName]?.[resolvedState]

    if (!validatorFn) {
      throw new Error(`No component validator found for ${resolvedState} state of ${resolvedName} component`)
    }

    Cypress.log({
      name: 'validate',
      message: `__${resolvedName}: ${resolvedState}__`,
      consoleProps: () => resolvedOptions
    })

    console.log(resolvedEl)

    if (resolvedOptions.scopeToComponentName === false || resolvedEl) {
      return validatorFn(resolvedOptions)
    }

    return cy.get(`${resolvedOptions.selector}[data-cy-component=${resolvedName}]`, { log: false })
      .parent({ log: false })
      .within(() => validatorFn(resolvedOptions))
  })

  Cypress.Commands.add('getCyComponent', (name) => {
    return cy.get(`[data-cy-component=${name}]`)
  })

}