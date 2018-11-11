import {ComponentElement} from "../src/ComponentElement.js";
import {prop} from "../src/decorators/prop.js";

describe("Prop Decorator", function () {
    const PropComponent = class extends ComponentElement {
        @prop one = "one";         // with default value
        @prop valueOne;         // no default value

        @prop                   // As getter (default) / setter (filter)
        get valueTwo() { return "value-two"; }
        set valueTwo(v) { return "value-two-only"; }

        @prop() valueThree;
        @prop() valueFour = "value-four";
        @prop({ attr: true }) valueFive;
        @prop({ boolean: true }) valueSix;
        @prop({ required: true }) valueSeven;
    };

    describe("Creates Property definition", function () {
        it("should have propsDef on class definition", function () {
            expect(PropComponent).to
                .have.property("propsDef")
                .and.be.an("object", "propsDef is not an object!");
        });

        it("should have properties defined in propsDef", function () {
            [
                "one",
                "valueOne",
                "valueTwo",
                "valueThree",
                "valueFour"
            ].forEach(propName => expect(PropComponent.propsDef).to.have.property(propName))
        });

        it("should have default options", function () {
            const propOne = PropComponent.propsDef.one;

            expect(propOne).to.have.property("name");

            expect(propOne, "attr value not setup as expected in propDefintion")
                .to.have.property("attr")
                .and.be.a("boolean")
                .and.to.equal(false);

            expect(propOne, "required value not setup as expected in propDefinition")
                .to.have.property("required")
                .and.be.a("boolean")
                .and.to.equal(false);

            expect(propOne, "boolean value not setup as expected in propDefinition")
                .to.have.property("boolean")
                .and.be.a("boolean")
                .and.to.equal(false);
        });

        it("should have default initializer", function () {
            expect(PropComponent.propsDef.one.default()).to.equal("one");
            expect(PropComponent.propsDef.valueOne.default()).to.be.undefined;
            expect(PropComponent.propsDef.valueTwo.default()).to.equal("value-two");
        });

        it("should have proper aliases", function () {
            const valueOneProp = PropComponent.propsDef.valueOne;

            expect(PropComponent.propsDef.one.aliases.length).to.equal(0);
            expect(valueOneProp.aliases)
                .to.have.lengthOf(2)
                .and.include("valueone")
                .and.include("value-one");
        });

        it("should use options", function () {
            expect(PropComponent.propsDef.valueFive.attr, "valueFinve attr is not true!").to.be.true;
            expect(PropComponent.propsDef.valueSix.attr, "valueSiz attr is not true!").to.be.true;
            expect(PropComponent.propsDef.valueSix.boolean, "valueSix boolean is not true!").to.be.true;
            expect(PropComponent.propsDef.valueSeven.required, "valueSeven required is not true!").to.be.true;
        });
    });

    describe("Sets up prototype properties", function () {
        const PropComponentPrototype = Object.getOwnPropertyDescriptors(PropComponent.prototype);

        it("should setup own name on prototype", function () {
            [
                "one",
                "valueOne",
                "valueTwo",
                "valueThree",
                "valueFour",
                "valueFive",
                "valueSix",
                "valueSeven"
            ].forEach(propName => expect(PropComponentPrototype).to.have.property(propName));
        });

        it("should setup aliases on prototype", function () {
            Object.values(ComponentElement.propsDef)
                .map(propDef => propDef.aliases)
                .reduce((arr, aliases) => arr.push(...aliases), [])
                .forEach(propName => expect(PropComponentPrototype).to.have.property(propName))
        });
    });

    describe("Should extend prior props when sub-classed", function () {
        const SubPropComponent = class extends PropComponent {
            @prop one;
            @prop subValueOne = ""
        };

        it("should should retain/copy prior props", function () {
            Object.keys(PropComponent.propsDef)
                .forEach(propName => (
                    expect(
                        SubPropComponent.propsDef,
                        `Sub-class missing '${propName}' from parent class`
                    ).to.have.property(propName)
                ));
        });

        it("should override super prop", function () {
            expect(SubPropComponent.propsDef.one.default()).to.be.undefined;
        });
    });
});