import { addValidateComponentCommand } from './addValidateComponentCommand'
import {mount} from "@cypress/vue"
import styles from "../../src/global.css"

Cypress.Commands.add("mount", (component, options) => {
    const root = document.getElementById("__cy_root");

    // add class for the global styles
    root.classList.add('app')

    return mount(component, options)
});

addValidateComponentCommand()

