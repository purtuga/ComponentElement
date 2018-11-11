//--------------------------------------------------------------
// Utilities to work with polyfills like ShadyCSS
//--------------------------------------------------------------
import {GLOBAL} from "common-micro-libs/src/jsutils/getGlobal"
import {domFind} from "common-micro-libs/src/domutils/domFind.js"
import {getState} from "./utils"

//===========================================================================================
const removeElement = ele => ele.parentNode.removeChild(ele);
export const supportsShadyCSS = () => !!GLOBAL.ShadyCSS;

/**
 * Scopes the CSS of a given template for the Component by using ShadyCSS.
 *
 * @param template
 * @param eleInstance
 */
export function scopeCss (template, eleInstance) {
    if (supportsShadyCSS()) {
        GLOBAL.ShadyCSS.prepareTemplate(template, eleInstance.constructor.tagName);
    }
}

/**
 * Prepares the rendered content by removing style elements - since they were sopped
 * during `scopeCss`
 *
 * @param renderedContent
 * @param componentInstance
 */
export function prepareRenderedContent(renderOutput, eleInstance) {
    if (supportsShadyCSS()) {
        const state = getState(eleInstance);

        if (!state.templateEle) {
            state.templateEle = document.createElement("template");
        }

        state.templateEle.innerHTML = "";

        // TODO: any momoization can happen here?

        if ("string" === typeof renderOutput) {
            state.templateEle.innerHTML = renderOutput;
        } else {
            state.templateEle.appendChild(renderOutput);
        }

        if (!state.isCssScopingDone) {
            state.isCssScopingDone = true;
            scopeCss(state.templateEle, eleInstance)
        }

        const view = document.importNode(state.templateEle.content, true);
        state.templateEle.textContent = "";

        // Remove <style> element
        domFind(view, "style").forEach(removeElement);
        return view;
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