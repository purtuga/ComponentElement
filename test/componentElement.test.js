import {ComponentElement} from "../src";

describe("ComponentElement", function () {
    class TestEle extends ComponentElement {
        static get tagName() {
            return "test-ele";
        }
    }

    TestEle.define();

    describe("Static Members", function () {
        [
            "tagName",
            "define",
            "delayDestroy",
            "useShadow",
            "shadowMode",
            "template",
            "renderTemplate",
            "eventInitOptions"
        ].forEach(propName => {
            it(`should have ${propName}`, function () {
                expect(TestEle).to.have.property(propName);
            });
        });
    });

});
