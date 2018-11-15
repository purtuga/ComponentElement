//--------------------------------------------------------------
// Utilities to work with polyfills like ShadyCSS
//--------------------------------------------------------------
import {GLOBAL} from "@purtuga/common/src/jsutils/getGlobal"
import {domFind} from "@purtuga/common/src/domutils/domFind.js"
import {createElement} from "@purtuga/common/src/jsutils/runtime-aliases.js"
import {getComponentClassState} from "./utils.js"

//===========================================================================================
export const supportsShadyCSS = () => !!GLOBAL.ShadyCSS;
const removeElement = ele => ele.parentNode.removeChild(ele);
const isString = s => "string" === typeof s;

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
 *
 * @return {HTMLElement|DocumentFragment}
 */
export function prepareRenderedContent(renderOutput, eleInstance) {
    if (supportsShadyCSS()) {
        const isRenderOutputString = isString(renderOutput);
        const ComponentClassState = getComponentClassState(eleInstance.constructor);
        let {templateEle} = ComponentClassState;
        let view;

        // If Styles have not yet been scoped in the HEAD of the element for this CE Class,
        // then do it now this occurs only once per Component.
        if (!templateEle) {
            ComponentClassState.templateEle = templateEle = createElement("template");
            if (isRenderOutputString) {
                templateEle.innerHTML = renderOutput;
            } else {
                templateEle.appendChild(renderOutput.cloneNode(true));
            }
            scopeCss(templateEle , eleInstance);
        }

        // If the input was a string, then get a document fragment out of it
        if (isRenderOutputString) {
            templateEle.innerHTML = renderOutput;
            view = document.importNode(templateEle.content, true);
            templateEle.textContent = "";
        } else {
            view = renderOutput;
        }

        // Need to prepare this DOM by calling ShadyCSS.prepareTemplateDom so
        // that scoping classes are applied
        if (!view.content) {
            view.content = view;
        }

        GLOBAL.ShadyCSS.prepareTemplateDom(view, eleInstance.constructor.tagName);

        // TODO: any momoization can happen here?

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