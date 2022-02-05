# Component Validator Pattern

This repo is just a little playground to explore a testing pattern that can be used when your component tests and E2E tests are both run with Cypress. It's not quite Page Objects, it's not quite Angular Component Harnesses, but it's in that ballpark in terms of the kind of problems it wants to solve: duplication (or near duplication) of code for assertions and actions across different tests.

Component validators are reusable snippets of Cypress test code. At the smallest level, they validate that a single component, in single state, is functioning correctly. This can mean asserting the contents of the DOM, but also performing some interactions and checking the results. Whatever gives us confidence that the component is doing its job correctly for users. Component validators don't mess with props or check framework specific events.

## Background

Components exist in a hierarchy. There are architectural components like layouts, small utility components act as basic building blocks, as well as larger components that are directly recognizable in a design system. 

As the levels of nesting and complexity increase in a component-based application, component tests can become difficult to manage, and it can feel like things like test setup and assertions start be duplicated at multiple layers of the system.

Using component validators, our goal is that in the full spectrum of specs, from the smallest component test to the longest E2E user journey, the test code to validate a certain component in a certain state is only written once, and reused as needed.

This repo is an example of how this might work. Component tests are a responsible for mounting and setting up the component for testing each state, and then calling `cy.validate()` with the component's name, state to validate, and an options object containing anything else needed, like variable data.

`validators.js` contains almost all of the assertions and interactions for our tests, organized in an object according to component name, and then the name of the sate to be tested. `cy.validate` will look up these validators when called with a component name and state to validate.

Since the validators themselves are just regular Cypress code, they can make DOM assertions and click around, but also use the `cy.validate` command to assert the expected state of direct child components of the component being tested. In this way, tests of higher level component, and even E2E tests, can fully check the validity of the entire component tree, starting at any given node in that tree, without duplicating a single assertion or interaction in the code.

This is why the `home.cy.js` test can be 2 lines long, but still check every image, title, link, and interactive element on the page.

---

## Recommendations

Let's use the classic Arrange, Act, and Assert language to show what E2E Specs, Component Specs, and Validators are responsible for when used in this way.
### Component Validators

Do:

- ✅ ASSERT (direct): Make __assertions about the DOM__ directly rendered by that component in that state
- ✅ ACT & ASSERT (direct): Perform any UI actions that should be possible in that state and assert they worked. Assert that __unwanted actions can't be performed__ (disabled buttons, double clicking same button, etc).
- ✅ ACT & ASSERT (indirect): Call the validators for all direct child components, using the `props` in the `options` object to set any data controlled by the current Spec.

Don't:

- ⛔️ ARRANGE: Never use a component's API in a validator, we are already checking a specific state that's been set up by other means. Props, events, etc should be touched in __that component's spec file__.
- ⛔️ ASSERT: In a component validator, don't assert the state any descendent components directly, instead, use the existing validators for the direct child components, describing the expected state. Only make assertions about, and interact directly with, DOM elements directly rendered by (or "owned" by) the component under test. The whole rest of the component tree will be validated through these parent-child relationships.

### Component Specs

Dos:

- ✅ ARRANGE (direct): Use the __component's API__ (props, slots, etc) to set up each state of the component to be tested
- ✅ ACT & ASSERT (indirect): Call the __validator__ for that state
- ✅ ACT & ASSERT (direct): Test any __events__ that are supposed to be emitted, using `cy.spy()` on event handlers, or, if needed with framework-specific hooks

Don't:

- ⛔️ ARRANGE: Never access the __instance__ of any component other than the component under test. If a descendant component needs to be in a particular state, we should reach it the same way a user would, or through intercepts/fixtures/options passed that lead to that state. Setting/checking a child component __partially reimplements the isolated component spec__ for that component, but what we want tp validate from a parent component is not the child's behavior in isolation, but that __the component is used correctly by other components__.


### End-to-End Specs

Do:

- ✅ ARRANGE (direct): Use `cy.visit()` to visit a page of the running app. Use tools like `cy.intercept()`, "shortcuts" like [App Actions](https://applitools.com/blog/page-objects-app-actions-cypress/) to put the app into the desired states.
- ✅ ACT & ASSERT (direct): Test anything about the page that's not possible in a component test, for whatever reason. It shouldn't be much, but it depends on the app.
- ✅ ACT & ASSERT (indirect): Call the validators for all top level components on the page. This will often be just one component. Pass in any non-static data that internal components don't request on on their own via `props` in the validators `options` parameter.

Don't:

- ⛔️ ASSERT: Don't add assertions about parts of the DOM rendered by a component. Add those assertions to the appropriate state validation for that component, with `props` to pass if need be. If it seems like a state is missing, add the state as a validation of that component. The goal is that no component state is _possible_ in the UI that isn't asserted about in a component test.


### General

Validators should be "written once, called at least twice". At minimum, we should call the call the validator for a given component, in a given state, from the actual component spec and from a parent component's validator (or an E2E test, if it has no parent component).

The difference between calling, say, the `defaultRender` validator of the `HelloListItem` component from the `HelloListItem` __component spec__ and the parent `HelloList` `defaultRender` state __validator__, is in how the state is created: 

- In the spec, we sets a `content` prop directly on the `ListItem` when it is mounted. It confirms the API of the component matches expectations in the `defaultRender` state - given a content object, it uses the `name` and `href` from that object to make a list item with a link to that `href`. Over time, this test ensures the shape of the Lego brick isn't changing.
- When the `HelloList` component __validator__ for the state where a `defaultRender` is expected for `HelloListItem` is called, the `HelloList` component __spec__ has passed an array of `items` as a prop to `HelloList`. By calling `cy.validate('HelloListItem', { props: { name: item.name, href: item.href } })` for each `item` in the array, we confirm the child component was __used correctly__ by the parent - all the expected children rendered. No extra assertion code had to be written.


### Edges Cases, Escape Hatches, & Shenanigans

There's some stuff going on in this repo to make the pattern easier to implement. Some of it is Vue-specific, like `data-cy-component="$options.name"`.

TODO: more details about testing that components _don't_ appear, avoiding scoping assertions inside components, adding escape hatches to only check a certain depth or ignore expensive checks with an `ignore array or something.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Test
```
npm run serve
npx cypress open
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
