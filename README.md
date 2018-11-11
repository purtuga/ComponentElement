# ComponentElement

A base class for building Widgets using CustomElements.

Features:

-   Normalizes the use of Props by allowing them to be set via html Attributes, or on the Element's instance.
-   Creates aliases for camelCase props so that they can be set in all lowercase or as ka-bob case.
-   All props are stored in one location (`element.props`).
-   change to props triggers render

## Example

```javascript
import {ComponentElement, prop} from "@purtuga/component-element";

export default class MyWidget extends ComponentElement {
    static get tagName() { return "my-widget"; }
    
    @prop({ attr: true }) blue = false; 
    
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
    
    render() {
        return `
<style>
h1 {
    color: red;
}
.blue {
    color: blue;
}
<h1 class="${ this.props.blue ? "blue" : ""}">Your list name is: ${this.props.listName}</h1>
`;
    }
}
```

## Installation

```bash
$ npm install @purtuga/component-element --save
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
    
    
-   `required` : `{Boolean}` If prop value is required. `elmenet.hasRequiredProps` will use this to calculate its value. 


## Lifecycle

The following lifecycle hooks are provided on the Element's instance. These are all instance methods that can be defined on your custom element.

```
    didInit()
        |
    didMount()
        \
         \
          \
            willRender() -> render() -> didRender()
          /
         /
        /
    didUnmount()
        |
    didDestroy()
    
```

-   `didInit`: Called only once - when the component class is intantiated
-   `didMount`: Called every time component is connected to DOM
-   Render cycle, which is also executed every time props change:
    -   `willRender()` Called prior to `render()`. Reutrning a `boolean` `false` will cancel render
    -   `render()`: generate the markup for the view. Should return html (either string or DOM/DocumentFragment)
    -   `didRender()`: Post render.
-   `didUnmount()`: Element disconnected from DOM
-   `didDestroy()`: Element's destroy callback were executed

## License

MIT

____

## TODO

- [ ] Support same level of prop reflection as the @prop decorator




