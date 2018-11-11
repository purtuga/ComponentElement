import {ComponentElement} from "../src/ComponentElement.js";
import {generateTagName, delay} from "./test-utils.js";
import {prop} from "../src/decorators/prop.js";

describe("ComponentElement", function () {
    describe("Static Members", function () {
        class TestEle extends ComponentElement {
            static get tagName() {
                return generateTagName();
            }
        }

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


    describe("Instance Members", function () {
        class TestEle extends ComponentElement {
            static get tagName() {
                return generateTagName();
            }
        }

        [
            "destroy",
            "onDestroy",
            "$",
            "$$",
            "didInit",
            "didMount",
            "willRender",
            "render",
            "didRender",
            "didUnmount",
            "didDestroy",
            "emit",
            "on",
            "onPropsChange"
        ].forEach(memberName => {
            it(`should have ${memberName} instance member`, function () {
                expect(TestEle.prototype, `Missing instance member: ${memberName}`).to.have.property(memberName);
            });
        })
    });


    describe("Lifecycle Hooks", function () {
        beforeEach(function () {
            this.playground = document.createElement("div");
            this.playground.setAttribute("style", "position:absolute;bottom: 10px; right: 10px;");
            document.body.appendChild(this.playground);

            const spies = this.spies = {
                didInit: sinon.spy(),
                didMount: sinon.spy(),
                willRender: sinon.spy(),
                render: sinon.spy(),
                didRender: sinon.spy(),
                didUnmount: sinon.spy(),
                didDestroy: sinon.spy()
            };

            this.Ele = class extends ComponentElement {
                static tagName = generateTagName();
                static delayDestroy = 2;

                @prop propOne;
                @prop propTwo;

                didInit() { spies.didInit(...arguments); }
                didMount() { spies.didMount(...arguments); }
                willRender() { spies.willRender(...arguments); }
                render() {
                    spies.render(...arguments);
                    return document.createElement("div");
                }
                didRender() { spies.didRender(...arguments); }
                didUnmount() { spies.didUnmount(...arguments); }
                didDestroy() { spies.didDestroy(...arguments); }
            };
            this.Ele.define();
        });

        afterEach(function () {
            if (this.playground && this.playground.parentNode) {
                this.playground.parentNode.removeChild(this.playground);
            }
        });

        describe("Instantiation after CE defined", function () {
            it("should call 'didInit' when element is created", function () {
                document.createElement(this.Ele.tagName);

                expect(this.spies.didInit.called, "didInit() was not called!").to.be.true;

                [
                    "didMount",
                    "willRender",
                    "render",
                    "didRender",
                    "didUnmount",
                    "didDestroy"
                ].forEach(hookName => (
                    expect(this.spies[hookName].called, `${hookName} should not have been called!`).to.be.false
                ));
            });

            it("should call 'didMount' when element is connected to DOM", function () {
                const ele = document.createElement(this.Ele.tagName);

                expect(this.spies.didInit.called, "didInit() was not called!").to.be.true;

                this.playground.appendChild(ele);

                expect(this.spies.didMount.called, "didMount() was not called!").to.be.true;
                expect(this.spies.didMount.calledOnce, "didMount() called more than once!").to.be.true;

                [
                    "willRender",
                    "render",
                    "didRender",
                    "didUnmount",
                    "didDestroy"
                ].forEach(hookName => (
                    expect(this.spies[hookName].called, `${hookName} should not have been called!`).to.be.false
                ));
            });

            it("should call execute render cycle when mounted", function () {
                const ele = document.createElement(this.Ele.tagName);
                this.playground.appendChild(ele);
                return delay().then(() => {
                    expect(this.spies.willRender.called, "willRender() was not called!").to.be.true;
                    expect(this.spies.render.called, "render() was not called!").to.be.true;
                    expect(this.spies.didRender.called, "didRender() was not called!").to.be.true;
                });
            });

            it("should call 'didUnmount' when element is disconnected from DOM", function () {
                const ele = document.createElement(this.Ele.tagName);
                this.playground.appendChild(ele);

                return delay().then(() => {
                    ele.remove();
                    expect(this.spies.didUnmount.called, `didUnmount was not called!`).to.be.true;
                    expect(this.spies.didDestroy.called, `didDestroy should NOT have been called!`).to.be.false;
                });
            });

            it("should call 'didDestroy' when element after destroy logic runs", function () {
                const ele = document.createElement(this.Ele.tagName);
                this.playground.appendChild(ele);

                return delay().then(() => {
                    ele.remove();
                    return delay(this.Ele.delayDestroy).then(() => {
                        expect(this.spies.didDestroy.called, `didDestroy was not called!`).to.be.true;
                    });
                });
            });

            it("should trigger render cycle if props change", function () {
                const ele = document.createElement(this.Ele.tagName);
                this.playground.appendChild(ele);
                return delay()
                    .then(() => {
                        expect(ele.isMounted, "Element should have been isMounted true").to.be.true;
                        expect(this.spies.willRender.callCount, "willRender() was not called 1 time!").to.equal(1);
                        expect(this.spies.render.callCount, "render() was not called 1 time!").to.equal(1);
                        expect(this.spies.didRender.callCount, "didRender() was not called 1 time!").to.equal(1);

                        // Multiple updates to a prop should generate just one Render cycle
                        ele.propOne = 1;
                        ele.props.propTwo = 1;
                        ele.props.propOne++;
                        ele.propTwo++;

                        return delay();
                    })
                    .then(() => {
                        expect(this.spies.willRender.callCount, "willRender() was not called 2 times!").to.equal(2);
                        expect(this.spies.render.callCount, "render() was not called 2 times!").to.equal(2);
                        expect(this.spies.didRender.callCount, "didRender() was not called 2 times!").to.equal(2);
                    });
            });

            it("should trigger didMount, render cycle on unmount/mount actions", function () {
                const ele = document.createElement(this.Ele.tagName);
                this.playground.appendChild(ele);
                return delay()
                    .then(() => {
                        expect(ele.isMounted, "Element should have been isMounted true").to.be.true;
                        expect(this.spies.willRender.callCount, "willRender() was not called 1 time!").to.equal(1);
                        expect(this.spies.render.callCount, "render() was not called 1 time!").to.equal(1);
                        expect(this.spies.didRender.callCount, "didRender() was not called 1 time!").to.equal(1);

                        ele.remove();
                        return delay();
                    })
                    .then(() => {
                        expect(this.spies.willRender.callCount, "willRender() call count is not 1!").to.equal(1);
                        expect(this.spies.render.callCount, "render() call count is not 1!").to.equal(1);
                        expect(this.spies.didRender.callCount, "didRender() call count is not 1!").to.equal(1);

                        expect(this.spies.didUnmount.callCount, "didUnmount() call count should be 1").to.equal(1);

                        this.playground.appendChild(ele);
                        return delay();
                    })
                    .then(() => {
                        expect(this.spies.didMount.callCount, "didMount() call count is not 2!").to.equal(2);
                        expect(this.spies.willRender.callCount, "willRender() call count is not 1!").to.equal(2);
                        expect(this.spies.render.callCount, "render() call count is not 1!").to.equal(2);
                        expect(this.spies.didRender.callCount, "didRender() call count is not 1!").to.equal(2);

                        expect(this.spies.didUnmount.callCount, "didUnmount() call count should be 1").to.equal(1);
                    });
            });
        });


        describe("Instantiation triggered by Element upgrade", function () {
            beforeEach(function () {
                const ParentEle = this.Ele;
                this.Ele = class extends ParentEle {
                    static tagName = generateTagName();
                }
            });

            it("should trigger expected lifecycle on upgrade", function () {
                const ele = document.createElement(this.Ele.tagName);

                Object.keys(this.spies).forEach(spyName => {
                    expect(this.spies[spyName].called, `${spyName} should have been called!`).to.be.false;
                });

                this.playground.appendChild(ele);

                Object.keys(this.spies).forEach(spyName => {
                    expect(this.spies[spyName].called, `${spyName} should have been called!`).to.be.false;
                });

                this.Ele.define();

                return delay()
                    .then(() => {
                        expect(this.spies.didInit.called, "didInit() was not called!").to.be.true;
                        expect(this.spies.didMount.called, "didMount() was not called!").to.be.true;
                        expect(this.spies.didMount.calledOnce, "didMount() called more than once!").to.be.true;
                        expect(this.spies.willRender.callCount, "willRender() was not called 1 time!").to.equal(1);
                        expect(this.spies.render.callCount, "render() was not called 1 time!").to.equal(1);
                        expect(this.spies.didRender.callCount, "didRender() was not called 1 time!").to.equal(1);

                        expect(this.spies.didUnmount.called, "didUnmount() should not have been called").to.be.false;
                        expect(ele.isMounted).to.be.true;
                    });
            });

            it("should handle instance props create pre-upgrade", function () {
                const ele = document.createElement(this.Ele.tagName);

                this.playground.appendChild(ele);
                ele.propOne = "test-prop-one";

                expect(ele.props).to.be.undefined;

                this.Ele.define();

                return delay()
                    .then(() => {
                        expect(ele.propOne, "instance prop value not set to expected value").to.equal("test-prop-one");
                        expect(ele.props.propOne, "instance props.propOne not set to expected value").to.equal("test-prop-one");

                        ele.propOne = "updated";
                        expect(ele.props.propOne).to.equal("updated");
                    });
            });
        });
    });

    describe("Props support", function () {
        beforeEach(function () {
            this.playground = document.createElement("div");
            this.playground.setAttribute("style", "position:absolute;bottom: 10px; right: 10px;");
            document.body.appendChild(this.playground);

            this.EleClass = class extends ComponentElement {
                static tagName = generateTagName();
                static delayDestroy = 2;

                @prop propOne;
                @prop propTwo = "prop two value";

                @prop({ attr: true }) propThree;
                @prop({ attr: true }) propFour = "prop four value";

                render() {
                    return `
<div id="propOne">${this.props.propOne || ""}</div>
<div id="propTwo">${this.props.propTwo || ""}</div>
<div id="propThree">${this.props.propThree || ""}</div>
<div id="propFour">${this.props.propFour || ""}</div>
`;
                }
            };
            this.EleClass.define();

            this.ele = document.createElement(this.EleClass.tagName);
            this.playground.appendChild(this.ele);
        });

        afterEach(function () {
            if (this.playground && this.playground.parentNode) {
                this.playground.parentNode.removeChild(this.playground);
            }
        });

        it("should render with default props", function () {
            return delay()
                .then(() => {
                    expect(this.ele.$("#propOne").textContent , "propOne DOM value check failed").to.be.empty;
                    expect(this.ele.$("#propTwo").textContent, "propTwo DOM Value check failed").to.equal("prop two value");
                    expect(this.ele.$("#propThree").textContent, "propThree DOM value check failed").to.be.empty;
                    expect(this.ele.$("#propFour").textContent, "propFour DOM value check failed").to.equal("prop four value");
                });
        });

        it("should proxy html attributes to props", function () {
            return delay()
                .then(() => {
                    this.ele.setAttribute("propThree", "Three value updated!");
                    this.ele.setAttribute("propFour", "Four value updated!");

                    expect(this.ele.props.propThree).to.equal("Three value updated!");
                    expect(this.ele.props.propFour).to.equal("Four value updated!");

                    return delay();
                })
                .then(() => {
                    expect(this.ele.$("#propThree").textContent, "propThree DOM value check failed").to.be.equal("Three value updated!");
                    expect(this.ele.$("#propFour").textContent, "propFour DOM value check failed").to.equal("Four value updated!");
                });
        });

        it("should support prop aliases via html attribute", function () {
            return delay()
                .then(() => {
                    // kebob casing alias
                    this.ele.setAttribute("prop-three", "Three value updated!");
                    this.ele.setAttribute("prop-four", "Four value updated!");

                    expect(this.ele.props.propThree).to.equal("Three value updated!");
                    expect(this.ele.props.propFour).to.equal("Four value updated!");

                    return delay();
                })
                .then(() => {
                    expect(this.ele.$("#propThree").textContent, "propThree DOM value check failed").to.be.equal("Three value updated!");
                    expect(this.ele.$("#propFour").textContent, "propFour DOM value check failed").to.equal("Four value updated!");

                    this.ele.removeAttribute("prop-three");
                    this.ele.removeAttribute("prop-four");

                    return delay();
                })
                .then(() => {
                    expect(this.ele.props.propThree).to.be.null
                    expect(this.ele.props.propFour).to.be.null;

                    // All lowercase alias
                    this.ele.setAttribute("propthree", "Three 2 value updated!");
                    this.ele.setAttribute("propfour", "Four 2 value updated!");

                    expect(this.ele.props.propThree).to.equal("Three 2 value updated!");
                    expect(this.ele.props.propFour).to.equal("Four 2 value updated!");
                });
        });

        it("should proxy instance props", function () {
            return delay()
                .then(() => {
                    this.ele.propOne = "One value updated!";
                    this.ele.propTwo = "Two value updated!";

                    expect(this.ele.props.propOne).to.equal("One value updated!");
                    expect(this.ele.props.propTwo).to.equal("Two value updated!");

                    return delay();
                })
                .then(() => {
                    expect(this.ele.$("#propOne").textContent, "propOne DOM value check failed").to.be.equal("One value updated!");
                    expect(this.ele.$("#propTwo").textContent, "propTwo DOM value check failed").to.equal("Two value updated!");
                });
        });


        it("should support prop aliases via instance props", function () {
            return delay()
                .then(() => {
                    this.ele["prop-one"] = "One value updated!";
                    this.ele["prop-two"] = "Two value updated!";

                    expect(this.ele.props.propOne).to.equal("One value updated!");
                    expect(this.ele.props.propTwo).to.equal("Two value updated!");

                    return delay();
                })
                .then(() => {
                    expect(this.ele.$("#propOne").textContent, "propOne DOM value check failed").to.be.equal("One value updated!");
                    expect(this.ele.$("#propTwo").textContent, "propTwo DOM value check failed").to.equal("Two value updated!");
                });
        });

        it("should handle boolean attributes", function () {
            expect(true).to.be.false; // FIXME: finish test: handle boolean attributes
        });

    });
});
