import { addValidateCommands } from './addValidateCommands'

addValidateCommands()

Cypress.SelectorPlayground.defaults({
    onElement: ($el) => {
      const component = $el.closest('[data-cy-component]')
  
      if (component) {
        return `[data-cy-component=${component.data('cyComponent')}]`
      }
    },
  })