# ComponentElement

A base class for building Widgets using CustomElements

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

Include a [polyfill](https://github.com/WebReflection/document-register-element) prior to any web component being loaded.  Something like this will work:
 
```html
<head>
    <script>
        if (!('customElements' in window)) {
            document.write('<' + 'script src="//cdnjs.cloudflare.com/ajax/libs/document-register-element/1.7.1/document-register-element.js"></' + 'script>');
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

Props can be defined using the `prop` decorator. Props defined this way are automatically reflected in on the component instance under the `props` property. When defining a `prop` on a ComponentElement class, the property getter will be used to obtain the initial value for the property (default value), while the property setter method (if any) can be used to validate the input received. 

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

tbd...


## License

MIT

____

## TODO

- [x] Support for Class.propsDef (will replace current private object. Will allow for use without Decorators)
- [ ] Support reflecting props to attribute (but only if they were defined by user as attr? or always? maybe option like: reflect: true || reflect: "always")
- [ ] support Boolean props (@prop(type: Boolean))
- [x] Support html attributes defined as ka-bab syntax
- [x] create two new instance methods: `$()` = select single element, and: `$$()` select multiples
- [x] expose instance `$ui` -- Pointer to either shadowRoot or element
- [x] Add static property `shadowMode` - default it to true
- [ ] ComponentElement.template should support also being a Template Element.
- [ ] Integrate ShadyCSS if detected in Global and env. does not support Scoped CSS
- [ ] Remove dependency on ObservableData. Probably under-utilized for base class functionality.



