//--------------------------------------------------------------
// Utilities to work with polyfills like ShadyCSS
//--------------------------------------------------------------
import {GLOBAL} from "@purtuga/common/src/jsutils/getGlobal"
import {domFind} from "@purtuga/common/src/domutils/domFind.js"
import {createElement, head, isString} from "@purtuga/common/src/jsutils/runtime-aliases.js"
import {getComponentClassState} from "./utils.js"

//===========================================================================================
export const supportsShadyCSS = () => !!GLOBAL.ShadyCSS;
const removeElement = ele => ele.parentNode.removeChild(ele);

/**
 * if runtime env. supports shadowRoot
 * @returns {boolean}
 */
export function supportsNativeShadowDom() {
    return (head.createShadowRoot || head.attachShadow) &&
        (!supportsShadyCSS() || GLOBAL.ShadyCSS.nativeShadow)
}

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
 * Prepares the rendered content by ensuring that the the first time the Element is
 * rendered, that the styles are extracted and scoped on the page (vai ShadyCSS). From
 * that point forward, the rendered content will only have its element css classes scoped.
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
            if (isRenderOutputString || renderOutput.innerHTML) {
                templateEle.innerHTML = renderOutput.innerHTML || renderOutput;
            } else {
                // Maybe its a DocumentFragment
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
        // FIXME: prepareTemplateDom now seems to assume/expect the input to be an instance HTMLElement - they are doing a getAttribute() on it.
        // let view2;
        // if (!view.content) {
        //     view2 = view;
        //     view = document.createElement("div");
        //     view.appendChild(view2);
        //     view.content = view;
        // }
        //
        // GLOBAL.ShadyCSS.prepareTemplateDom(view, eleInstance.constructor.tagName);
        //
        // // Remove <style> element
        // domFind(view, "style").forEach(removeElement);
        //
        // if (view2) {
        //     [].slice.call(view.childNodes).forEach(node => view2.appendChild(node));
        //     view = view2;
        // }


        // Need to prepare this DOM by calling ShadyCSS.prepareTemplateDom so
        // that scoping classes are applied
        if (!view.content) { // FIXME: should use isTemplate()
            view.content = view;
        }

        // FIXME: this is dangerous because it expects a certain internal implementation in prepareTemplateDom()
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