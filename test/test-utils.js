/**
 * Generate a unique tagName for use in a new component
 *
 * @return {String}
 */
export const generateTagName = (() => {
    function * tagNameGenerator() {
        const unique = Math.random().toString(32).substr(2);
        let counter = 1;
        while (true) {
            yield `x-${unique}-${counter++}`;
        }
    }
    const tagNames = tagNameGenerator();

    return () => {
        return tagNames.next().value;
    }
})();