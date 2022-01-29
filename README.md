# Using component validators 

Component validators are reusable snippets of Cypress test code. At the smallest level, they validate that a single component, in single state, is functioning correctly. This can mean asserting the contents of the DOM, but also performing some interactions and checking the results. Whatever gives us confidence that the component is doing its job correctly for users. Component validators don't mess with props or check framework specific events.

Components exist in a hierarchy. There are architectural components like layouts, small utility components act as basic building blocks, as well as larger components that are directly recognizable in a design system. 

As the levels of nesting and complexity increase in a component-based application, component tests can become difficult to manage, and it can feel like things like test setup and assertions start be duplicated at multiple layers of the system.

Using component validators, our goal is that in the full spectrum of specs, from the smallest component test to the longest E2E user journey, the test code to validate a certain component in a certain state is only written once, and reused as needed.

This repo is an example of how this might work. Component tests are a responsible for mounting and setting up the component for testing each state, and then calling `cy.validateComponent()` with the component's name, state to validate, and an options object containing anything else needed, like variable data.

`validators.js` contains almost all of the assertions and interactions for our tests, organized in an object according to component name, and then the name of the sate to be tested. `cy.validateComponent` will look up these validators when called with a component name and state to validate.

Since the validators themselves are just regular Cypress code, they can make DOM assertions and click around, but also use the `cy.validate` command to assert the expected state of direct child components of the component being tested. In this way, tests of higher level component, and even E2E tests, can fully check the validity of the entire component tree, without duplicating a single assertion or interaction in the code.

This is why the `home.cy.js` test can be 2 lines long, but still check every image, title, link, and interactive element on the page.


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
