import LoginForm from './LoginForm.vue'

describe('<LoginForm />', { viewportHeight: 60, viewportWidth: 300 }, () => {
  it('Logs In', () => {
    cy.mount(<LoginForm />)
    cy.validate(LoginForm.name, 'loginFlow', {testData: {username: 'Not Frank'}})
  })
  it('Logs Out', () => {
    cy.mount(<LoginForm />)
    cy.validate(LoginForm.name, 'loginFlow', {testData: {username: 'Not Frank'}})
    cy.validate(LoginForm.name, 'logoutFlow')
  })
})
