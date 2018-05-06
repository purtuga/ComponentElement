//--------------------------------------------------------------
// Utilities to work with polyfills like ShadyCSS
//--------------------------------------------------------------
import {GLOBAL} from "common-micro-libs/src/jsutils/getGlobal"
import {getComponentTemplate} from "./utils"

//===========================================================================================
const supportsShadyCSS = () => !!GLOBAL.ShadyCSS;

// FIXME: code below should check also for native support for CEs (protect against polyfills loaded in a native env?)

/**
 * Prepares the component's styles for the given `define` tag name.
 * Method should be called at the time the Element is registered into CustomElementsRegistry
 *
 * @param {ComponentElement} Component
 * @param {String} tagName
 */
export function prepareComponentTemplate(Component, tagName){
    if (supportsShadyCSS()) {
        GLOBAL.ShadyCSS.prepareTemplate(getComponentTemplate(Component), tagName);
    }
}

/**
 * Styles the instance of a custom element using ShadyCSS
 *
 * @param {HTMLElement} componentInstance
 */
export function styleComponentInstanceElement(componentInstance) {
    if (supportsShadyCSS()) {
        GLOBAL.ShadyCSS.styleElement(componentInstance);
    }
}

/**
 * Restyles a component's sub-tree. Use it when DOM might have been altered dynamically
 * and polyfilled styles needs to be applied.
 *
 * @param {HTMLElement} componentInstance
 */
export function reStyleComponentInstanceSubtree(componentInstance) {
    if (supportsShadyCSS()) {
        GLOBAL.ShadyCSS.styleSubtree(componentInstance)
    }
}