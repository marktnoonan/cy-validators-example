/* eslint-disable no-undef */
import LoginForm from "./LoginForm.vue"

describe('<LoginForm />', {viewportHeight: 60, viewportWidth: 300}, () => {
  it('renders', () => {
    cy.mount(<LoginForm />)
    cy.validate(LoginForm.name, {testData: {name: 'Frank'}})
  })
})