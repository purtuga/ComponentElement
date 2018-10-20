# ComponentElement

A base class for building Widgets using CustomElements.

Features:

-   Normalizes the use of Props by allowing them to be set via html Attributes, or on the Element's instance.
-   Creates aliases for camelCase props so that they can be set in all lowercase or as ka-bob case.
-   All props are stored in one location (`element.props`).
-   Initialization is delayed until all required props are provided (assist with use of data binding libraries)

## Example

```javascript
import {ComponentElement, prop} from "component-element";

export default class MyWidget extends ComponentElement {
    static get tagName() { return "my-widget"; }
    static get template() {
        return `<div><h2>My Widget</h2><slot></slot></div>`;
    };
    
    @prop
    get listName() {
        return "tasks"; // default value
    }
    set listName(newValue) {
        if (!newValue) {
            console.log(`"${ newValue }" is not a valid listName`);
        }
        return this.listName;
    }
}
```

## Polyfill

Include a [polyfill](https://www.webcomponents.org/polyfills) prior to any web component being loaded.  Something like this will work:
 
```html
<head>
    <script>
        if (!("Promise" in window)) {
            document.write('<' + 'script src="/' + '/cdnjs.cloudflare.com/ajax/libs/core-js/2.5.3/core.min.js"></' + 'script>');
            console.log("core-js requested");
        }
        if (!('customElements' in window)) {
            document.write('<' + 'script src="/' + '/cdnjs.cloudflare.com/ajax/libs/webcomponentsjs/2.0.2/webcomponents-bundle.js"></' + 'script>');
            console.log("CE pollyfill requested");
        }
    </script>
</head>
<body>

    <!-- now load your web components/app -->
</body>

```

## Props

Props can be defined one of two ways: 

### A. Via Static property `propsDef`

tbd...


### B. Via `@prop` Decorator

Props can be defined using the `prop` decorator. Props defined this way are automatically reflected in on the component instance under the `props` property. When defining a `prop` on a ComponentElement class, the property getter will be used to obtain the initial value for the property (default value), while the property setter method (if any) will be used as a filter for when the value is being changed - ex. can be used to validate the input received and in turn return a different value to be stored. 

The following options exists for this decorator:

```javascript
prop({
    required: true,
    attr: true
})
```

-   `attr` : `{Boolean}` can the prop be set via an html attribute. (reminder: html attribute values only accept `{String}` and `{Boolean}` values).
    
    __IMPORTANT__: HTML attribute are initially rendered in all lowercase. This in turn conflicts with the way properties are normally created and used in JavaScript (camelCase). ComponentElement will create a set of aliases for each property: one in all lower case, and another in kebob case. 
    
    So a prop named `listName` that is set as `attr: true`, could be defined in html as `listname` (all lowercase):
    
    ```html
    <div listname="some value here"></div>
    ```
     
     or `list-name` (kebob):
      
    ```html
    <div list-name="some value here"></div>
    ```
    
     Or, through javascript, be set using `ele.setAttribute("listName", "value")`. In all cases, the value will be reflected in the ComponentElement's instance `props` under the initial value defined (in this example `listName`).  
    
    
-   `required` : `{Boolean}` If prop value is required. `ready` callback will not be executed until all required props have been set.


## Lifecycle

The following lifecycle hooks are provided on the Element's instance. These are all instance methods that can be defined on your custom element.

```
  init      <-----------------------<
    |                               |
    |                               |
  ready     <---------<             |
    |                 |             |
    |                 |             |
    |              unready      destroyed
    |                 ^             |
    |                /|             |
    |     ----------' |             |
    |    /            |             |
  mounted             |             |
   |    ^             |             |
   |     \            |             |
   |      \           |             |
   |       \          |             |
   |        ^         |             |
  unmounted +---------^-------------^
              
```

-   `init()`: called when the component is first initialized (called from constructor). Can be used (for example) to show an initial UI state while the rest completes (ex. loading...). At this stage, ShadowRoot has been created (if static property `useShadow` is true and browser supports it, but there is no UI yet (see below)
-   `ready()`: called when all required props have been provided. At this point, the Template is inserted into the root of the Elements, replacing any prior content.
-   `mounted()`: Happens only after `init` and only if Element is part of DOM (CE `connectedCallback` has been triggered). This method can be called multiple times, since ELement can be removed/added to DOM multiple times.
-   `unready`: Happens if at any point required `props` are removed/unset.
-   `unmounted()`: Happens only after an Element is mounted. Could be called multiple times.  When unmounted, element's destroy logic is automatically called (after `delayDestroy` static property value has been reached).  When unmounted, if required props change, component could also invoke `unready`, but only if before `destroy` logic is invoked.



## License

MIT

____

## TODO

- [x] Support for Class.propsDef (will replace current private object. Will allow for use without Decorators)
- [ ] Support same level of prop reflection as the @prop decorator
- [ ] Support reflecting props to attribute (but only if they were defined by user as attr? or always? maybe option like: reflect: true || reflect: "always")
- [x] support Boolean props (`@prop(type: Boolean)`) - when set as "attr: true", then removeAttribute/setAttribute.
- [x] Support html attributes defined as ka-bab syntax
- [x] create two new instance methods: `$()` = select single element, and: `$$()` select multiples
- [x] expose instance `$ui` -- Pointer to either shadowRoot or element
- [x] Add static property `shadowMode` - default it to true
- [x] ComponentElement.template should support also being a Template Element.
- [ ] Integrate ShadyCSS if detected in Global and env. does not support Scoped CSS
- [x] Remove dependency on ObservableData. Probably under-utilized for base class functionality.
- [x] Add onPropChange(callback) method
- [x] Create new `@bind` decorator - adds method to the prototype as a lazy getter, which on first call, will bind the method to the instance.



