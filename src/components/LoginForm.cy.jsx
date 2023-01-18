import LoginForm from './LoginForm.vue'

describe('<LoginForm />', { viewportHeight: 60, viewportWidth: 300 }, () => {
  it('Logs In', () => {
    cy.mount(<LoginForm />)
  })
  it('Logs Out', () => {
    cy.mount(<LoginForm />)
  })

  it.only('Logs In', () => {
    cy.mount(<LoginForm />)
  })
})
