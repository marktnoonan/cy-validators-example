import { addValidateCommands } from './addValidateCommands'
import {mount} from "@cypress/vue"
// eslint-disable-next-line no-unused-vars
import styles from "../../src/global.css"

// eslint-disable-next-line no-undef
Cypress.Commands.add("mount", (component, options) => {
    const root = document.getElementById("__cy_root");

    // add class for the global styles
    root.classList.add('app')

    // identifier for root component
    root.dataset.cyComponent = "App"

    return mount(component, options)
});

addValidateCommands()

