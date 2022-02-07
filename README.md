# Component Validator Pattern

This repo is just a little playground to explore a testing pattern that can be used when your component tests and E2E tests are both run with Cypress. It's not quite Page Objects, it's not quite Angular Component Harnesses, but it's in that ballpark in terms of the kind of problems it wants to solve: duplication (or near duplication) of code for assertions and actions across different tests.

Component validators are reusable snippets of Cypress test code. At the smallest level, they validate that a single component, in single state, is functioning correctly. This can mean asserting the contents of the DOM, but also performing some interactions and checking the results. Whatever gives us confidence that the component is doing its job correctly for users. Component validators don't mess with props or check framework specific events.

## Background

Components exist in a hierarchy. There are architectural components like layouts, small utility components act as basic building blocks, as well as in-between components that are directly recognizable in a design system. 

As the levels of nesting and complexity increase in a component-based application, component tests can become difficult to manage, and it can feel like things like test setup and assertions start be duplicated at multiple layers of the system.

Using component validators, our goal is that in the full spectrum of specs, from the smallest component test to the longest E2E user journey, the test code to validate a certain component in a certain state is only written once, and reused as needed.

This repo is an example of how this might work. Component tests are a responsible for mounting and setting up the component for testing each state, and then calling `cy.validate()` with the component's name, state to validate, and an options object containing anything else needed, like variable data.

`validators.js` contains almost all of the assertions and interactions for our tests, organized in an object according to component name, and then the name of the sate to be tested. `cy.validate` will look up these validators when called with a component name and state to validate.

Since the validators themselves are just regular Cypress code, they can make DOM assertions and click around, but also use the `cy.validate` command to assert the expected state of direct child components of the component being tested. In this way, tests of higher level component, and even E2E tests, can fully check the validity of the entire component tree, starting at any given node in that tree, without duplicating a single assertion or interaction in the code.

This is why the `home.cy.js` test can be just a fwe lines long, but still check every image, title, link, and interactive element on the page. And of course, we don't need to check the entire component tree all the time, on every page. So there are ways to be more specific about what to check and how deep to go.

---

## Recommendations

Let's use the classic Arrange, Act, and Assert language to show what E2E Specs, Component Specs, and Validators are responsible for when used in this way. 
These are guidelines, break them if needed. Maybe comment explaining why you need to break them.
### Component Validators

Do:

- ✅ ASSERT: Make __assertions about the DOM__ directly rendered by that component in that state
- ✅ ACT & ASSERT: Perform any UI actions that should be possible in that state and assert they worked. Assert that __unwanted actions can't be performed__ (disabled buttons, double clicking same button, etc).
- ✅ ACT & ASSERT: Call the validators for all direct child components, using the `props` in the `options` object to set any data controlled by the current Spec.

Don't:

- ⛔️ ARRANGE: Never use a component's API in a validator, we are already checking a specific state that's been set up by other means. Props, events, etc should be touched in __that component's spec file__.
- ⛔️ ASSERT: In a component validator, don't assert the state any descendent components directly, instead, use the existing validators for the direct child components, describing the expected state. Only make assertions about, and interact directly with, DOM elements directly rendered by (or "owned" by) the component under test. The whole rest of the component tree will be validated through these parent-child relationships.

Notes: 

Component validators are scoped to run commands against the DOM __within__ a component. The top level element (the one with the `data-cy-component` attribute) itself is outside the scope of your regular commands and assertions in a validator. That layer is available in validators as `component` in the `options` object.
### Component Specs

Dos:

- ✅ ARRANGE: Use the __component's API__ (props, slots, etc) to set up each state of the component to be tested
- ✅ ACT & ASSERT: Call the __validator__ for that state
- ✅ ACT & ASSERT: Test any __events__ that are supposed to be emitted, using `cy.spy()` on event handlers, or, if needed with framework-specific hooks

Don't:

- ⛔️ ARRANGE: Never access the __instance__ of any component other than the component under test. If a descendant component needs to be in a particular state, we should reach it the same way a user would, or through intercepts/fixtures/options passed that lead to that state. Setting/checking a child component __partially reimplements the isolated component spec__ for that component, but what we want tp validate from a parent component is not the child's behavior in isolation, but that __the component is used correctly by other components__.

Notes:

If your test is checking static content, try to pull it from your actual data source for that content if you can, or modify your setup to share content between tests and application code. If your components have dependencies on your store or router, passing in your real store or router, not a mock. Although, if it's possible, it's sometimes good hint that maybe you can uncouple your components from their data sources by using some indirect layer like a composable or data-provider component, which makes isolated testing of behavior a little easier.

Sometimes the component spec might end up testing things that are better managed in the component itself. A good example is checking the correctness of a link's format, the way `HelloListItem` is testing in this repo. We want to fail if consuming components don't pass proper links. But it would be better if the component itself checks the props and throws an error when bad links are passed, then our tests can confirm this error happens.

In general component specs are a good place to try impossible combinations of props, see the results, and then modify the component to prevent the impossible combinations by giving feedback to the developer at the point of use, not later, when the tests are run. It's not ideal if the component spec is the only place that knows a particular "rule" about the component's usage, and writing component specs can be a good way to notice that the component's API could be more informative about what is permitted and what is not.
### End-to-End Specs

Do:

- ✅ ARRANGE: Use `cy.visit()` to visit a page of the running app. Use tools like `cy.intercept()`, "shortcuts" like [App Actions](https://applitools.com/blog/page-objects-app-actions-cypress/) to put the app into the desired states.
- ✅ ACT & ASSERT: Test anything about the page that's not possible in a component test, for whatever reason. It shouldn't be much, but it depends on the app.
- ✅ ACT & ASSERT: Call the validators for components on the page that you are testing. This can be just one component - e.g. "validate the whole tree from the root App component". But it can also be more surgical, "validate the 'signup' flow for this user type" without re-testing the app header and footer. Pass in any non-static data that internal components need via `props` in the validators `options` parameter.

Don't:

- ⛔️ ASSERT: Don't add assertions about parts of the DOM rendered by a component. Add those assertions to the appropriate state validation for that component, with `props` to pass if need be. If it seems like a state is missing, add the state as a validation of that component. The goal is that no component state is _possible_ in the UI that isn't asserted about in a component test.

Notes:

This might be the layer at which you start having multiple instances of the same components on pages. For extra confidence that you are targeting the right instance of a component, you can use the trusty old `data-cy` or `data-test` attribute, and pass it as a `selector` in the `cy.validate` `options` object. For example:

```js
cy.validate('CommonCard', { selector: '[data-cy="promo-card-0"]', props: { cardTitle: 'New Offer' } })
```

This will run the validator against that particular `promo-card-0` instance of a `CommonCard` component on the page, and confirm the title says "New Offer" in that card. This would avoid, say, matching a different card on the page that happened to contain this same string.

### General

Validators should be "written once, called at least twice". At minimum, we should call the call the validator for a given component, in a given state, from the actual component spec and from a parent component's validator (or an E2E test, if it has no parent component).

The difference between calling, say, the `defaultRender` validator of the `HelloListItem` component from the `HelloListItem` __component spec__ and the parent `HelloList` `defaultRender` state __validator__, is in how the state is created: 

- In the spec, we sets a `content` prop directly on the `ListItem` when it is mounted. It confirms the API of the component matches expectations in the `defaultRender` state - given a content object, it uses the `name` and `href` from that object to make a list item with a link to that `href`. Over time, this test ensures the shape of the Lego brick isn't changing.
- When the `HelloList` component __validator__ for the state where a `defaultRender` is expected for `HelloListItem` is called, the `HelloList` component __spec__ has passed an array of `items` as a prop to `HelloList`. By calling `cy.validate('HelloListItem', { props: { name: item.name, href: item.href } })` for each `item` in the array, we confirm the child component was __used correctly__ by the parent - all the expected children rendered. No extra assertion code had to be written.


### Edges Cases, Escape Hatches, & Shenanigans

There's some stuff going on in this repo to make the pattern easier to implement. Some of it is Vue-specific, like `data-cy-component="$options.name"`.

TODO: more details about testing that components _don't_ appear, avoiding scoping assertions inside components, adding escape hatches to only check a certain depth or ignore expensive checks with an `ignore array or something.

#### Selector Playground

In this project, I've customized the behavior of the selector playground so that for `cy.get()` it will give you the selector for the component that owns the element you click. This selector is not intended to be used directly in specs (validators handle this) but it will tell you which validator to use if you want to assert about a specific element. 

Of course, this breaks the expected behavior of `cy.get()` in the playground, so it's just an example. In theory, the playground could know about the `data-cy-component` attribute and we wouldn't take over `cy.get()`'s playground behavior, we'd have a `cy.getComponent()` option that uses the component name to create something like `cy.getComponent('ListItem')` when you click on something where ListItem is the closest parent component.

Other topics to cover:

- Use of slots / Nested uses of the same component (related to slots)
- Component Testing with a router - especially the real router
- Depth of validations / Existence checks
- Multiple instances of same component on a page / Identifying specific instances with data-cy
- Refactoring - change code, keep selectors, tests should still pass, then update tests? Or update tests to reflect new architecture, they fail, change data-cy-component selectors to get tests passing, then refactor code to make the new selectors properly match the top level elements of components. Both work.
- Reporting - can we buildup a log of what parts of the component tree were tested in a given run? Can we flag component states that are tested from a component spec but never tested elsewhere (as in, maybe no consumer can ever reach this state, which would be good to know)

Shenanigans:

- data-cy-component
- grabbing the top-level component element
- conditionals within states (eg, active vs inactive) header nav items - make new state fn or fork assertions within a given state?
- hover/focus states etc?
- explain `extendOptions` and/or find a better name for it, or find a way to do this from `cy.validate` and not have to pass things down at all

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
