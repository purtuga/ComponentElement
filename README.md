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

## License

MIT