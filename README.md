# ComponentElement

A base class for building Widgets using CustomElements

## Example

```javascript
import ComponentElement from "component-element";

export default class MyWidget extends ComponentElement {
    static get tagName() { return "my-widget"; }
    static get template() {
        return `<div><h2>My Widget</h2><slot></slot></div>`;
    };
}
```

## Polyfill

Include a [polyfill](https://github.com/WebReflection/document-register-element) prior to any web component being loaded.  Something like this will work:
 
```html
<head>
    <script>
        if (!('customElements' in window)) {
            document.write('<' + 'script src="//cdnjs.cloudflare.com/ajax/libs/document-register-element/1.5.0/document-register-element.js"></' + 'script>');
            console.log("CE pollyfill requested");
        }
    </script>
</head>
<body>

    <!-- now load your web components/app -->
</body>

```

## License

MIT