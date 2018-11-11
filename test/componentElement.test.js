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
});
