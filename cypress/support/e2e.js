import { addValidateCommands } from './addValidateCommands'

addValidateCommands()

Cypress.SelectorPlayground.defaults({
    onElement: ($el) => {
      const component = $el.closest('[data-cy-component]')
      const studioActive = !!window.top.document.querySelector('.studio-active')
      if (component && !studioActive) {
        return `[data-cy-component=${component.data('cyComponent')}]`
      }
    },
  })