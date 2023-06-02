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

  it.only('Logs In with Happiness', () => {
    cy.mount(<LoginForm />)
    cy.contains('Log In 😀').click()
    cy.contains('Log Out 😀')

    // Note this doesn't mention HappyButton at all
    // Or its props/values etc.
  })
})
