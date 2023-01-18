# Component Testing Playground App

Hi!

Here is an extended version of the Vue CLI starter App. It has a few extra bells and whistles that we can play around with for testing.

- Router 
- 2 pages
- Simulated log in & log out button
- Interactive components

The project is set up with some of my favorite features:

- Experimental Studio is turned on for E2E
- JSX support is configured for component tests
- Default command timeout is really low for component tests for fast feedback
- Cypress-testing-library is installed for accessible element locators
- Some runs have been recorded to the Cypress Cloud

Many component tests exist that mount components in various states, but the tests are not written. There are some component tests in the `what-component` section that are fully written as examples. Those components are not used in the app.

All of the functionality of this app can be fully tested with component tests, with the one exception of content that is driven by the URL. In component tests, there is no URL, and this functionality is tested by directly setting values in the router. In e2e tests, the real URL is used.

Things to consider doing:

- test all components, beginning from the smallest (`HelloListItem`)
- use the custom playground tooltips to see which components own which parts of the DOM
- customize the component-index.html to include some specific styles or elements
- write a reusable function that tests the same thing in both component and e2e tests
- make that function a custom cypress command used by both
- record an end to end test using Cypress Studio
- explore the tests in the `what-component` folder to see some different Vue scenarios tested

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
