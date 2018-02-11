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

Props can be defined using the `prop` decorator. Props defined this way are automatically reflected in on the component instance under the `props` property. When defining a `prop` on a CmponentElement class, the property getter will be used to obtain the initial value for the property (default value), while the property setter method (if any) can be used to validate the input received. 

The following options exists for this decorator:

```javascript
prop({
    required: true,
    attr: true
})
```

-   `attr` : `{Boolean}` can the prop be set via an html attribute. (reminder: html attribute values only accept `{String}` and `{Boolean}` values).
    IMPORTANT: When defined as an attribute, that attribute must be defined as all lower case - example: a prop named `listName` set an attribute, will need to be defined as `listname`:
    
    ```html
    <div listname="some value here"></div>
    ```
    
-   `required` : `{Boolean}` If prop value is required. `ready` callback will not be executed until all required props have been set.


## Lifecycle

tbd...


## License

MIT

____

## TODO

- [ ] Support for Class.propDef (will replace current private object. Will allow for use without Decorators)
- [ ] create two new instance methods: `$()` = select single element, and: `$$()` select multiples
- [ ] expose instance `$ui` -- Pointer to either shadowRoot or element



