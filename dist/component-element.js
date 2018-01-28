!function(root, factory) {
    "object" === typeof exports && "object" === typeof module ? module.exports = factory() : "function" === typeof define && define.amd ? define([], factory) : "object" === typeof exports ? exports.ComponentElement = factory() : root.ComponentElement = factory();
}("undefined" !== typeof self ? self : this, function() {
    /******/
    return function(modules) {
        // webpackBootstrap
        /******/
        // The module cache
        /******/
        var installedModules = {};
        /******/
        /******/
        // The require function
        /******/
        function __webpack_require__(moduleId) {
            /******/
            /******/
            // Check if module is in cache
            /******/
            if (installedModules[moduleId]) /******/
            return installedModules[moduleId].exports;
            /******/
            // Create a new module (and put it into the cache)
            /******/
            var module = installedModules[moduleId] = {
                /******/
                i: moduleId,
                /******/
                l: false,
                /******/
                exports: {}
            };
            /******/
            /******/
            // Execute the module function
            /******/
            modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
            /******/
            /******/
            // Flag the module as loaded
            /******/
            module.l = true;
            /******/
            /******/
            // Return the exports of the module
            /******/
            return module.exports;
        }
        /******/
        /******/
        /******/
        // expose the modules object (__webpack_modules__)
        /******/
        __webpack_require__.m = modules;
        /******/
        /******/
        // expose the module cache
        /******/
        __webpack_require__.c = installedModules;
        /******/
        /******/
        // define getter function for harmony exports
        /******/
        __webpack_require__.d = function(exports, name, getter) {
            /******/
            __webpack_require__.o(exports, name) || /******/
            Object.defineProperty(exports, name, {
                /******/
                configurable: false,
                /******/
                enumerable: true,
                /******/
                get: getter
            });
        };
        /******/
        /******/
        // getDefaultExport function for compatibility with non-harmony modules
        /******/
        __webpack_require__.n = function(module) {
            /******/
            var getter = module && module.__esModule ? /******/
            function() {
                return module.default;
            } : /******/
            function() {
                return module;
            };
            /******/
            __webpack_require__.d(getter, "a", getter);
            /******/
            return getter;
        };
        /******/
        /******/
        // Object.prototype.hasOwnProperty.call
        /******/
        __webpack_require__.o = function(object, property) {
            return Object.prototype.hasOwnProperty.call(object, property);
        };
        /******/
        /******/
        // __webpack_public_path__
        /******/
        __webpack_require__.p = "";
        /******/
        /******/
        // Load entry module and return exports
        /******/
        return __webpack_require__(__webpack_require__.s = 2);
    }([ /* 0 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return ComponentElement;
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
        var _fixBabelExtend = function(O) {
            var gPO = O.getPrototypeOf || function(o) {
                return o.__proto__;
            }, sPO = O.setPrototypeOf || function(o, p) {
                o.__proto__ = p;
                return o;
            }, construct = "object" === ("undefined" === typeof Reflect ? "undefined" : babelHelpers.typeof(Reflect)) ? Reflect.construct : function(Parent, args, Class) {
                var Constructor, a = [ null ];
                a.push.apply(a, args);
                Constructor = Parent.bind.apply(Parent, a);
                return sPO(new Constructor(), Class.prototype);
            };
            return function(Class) {
                var Parent = gPO(Class);
                return sPO(Class, sPO(function() {
                    return construct(Parent, arguments, gPO(this).constructor);
                }, Parent));
            };
        }(Object);
        //============================================================================
        var SHADOW_DOM_SUPPORTED = document.head.createShadowRoot || document.head.attachShadow;
        /**
 * A generic class for building widgets based on HTML Custom Elements.
 *
 */
        var ComponentElement = _fixBabelExtend(function(_HTMLElement) {
            babelHelpers.inherits(ComponentElement, _HTMLElement);
            function ComponentElement() {
                var _ref;
                var _ret;
                babelHelpers.classCallCheck(this, ComponentElement);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                var _this = babelHelpers.possibleConstructorReturn(this, (_ref = ComponentElement.__proto__ || Object.getPrototypeOf(ComponentElement)).call.apply(_ref, [ this ].concat(args)));
                var state = Object(__WEBPACK_IMPORTED_MODULE_0__utils__.b)(_this);
                state.content = _this.constructor.useShadow && SHADOW_DOM_SUPPORTED ? _this.attachShadow({
                    mode: "open"
                }) : _this;
                state.content.innerHTML = _this.constructor.template;
                _this.init();
                return _ret = _this, babelHelpers.possibleConstructorReturn(_this, _ret);
            }
            //==============================================================
            //  Static Members
            //==============================================================
            /**
     * Return default registration tag name
     *
     * @return {String}
     */
            babelHelpers.createClass(ComponentElement, [ {
                key: "attributeChangedCallback",
                //==============================================================
                //  Instance Members
                //==============================================================
                value: function(name, oldValue, newValue) {
                    Object.keys(this.constructor.__props).some(function(propName) {
                        if (propName.toLowerCase() === name) {
                            name = propName;
                            return true;
                        }
                    });
                    // set the value to stat.props
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils__.b)(this).props[name] = newValue;
                }
            }, {
                key: "destroy",
                value: function() {
                    if (__WEBPACK_IMPORTED_MODULE_0__utils__.a.has(this)) {
                        var state = Object(__WEBPACK_IMPORTED_MODULE_0__utils__.b)(this);
                        __WEBPACK_IMPORTED_MODULE_0__utils__.a.delete(this);
                        if (state.destroyQueued) {
                            clearTimeout(state.destroyQueued);
                            state.destroyQueued = null;
                        }
                        state.destroyCallbacks.splice(0).forEach(function(cb) {
                            return cb();
                        });
                    }
                }
            }, {
                key: "onDestroy",
                value: function(callback) {
                    Object(__WEBPACK_IMPORTED_MODULE_0__utils__.b)(this).destroyCallbacks.push(callback);
                }
            }, {
                key: "init",
                value: function() {}
            }, {
                key: "ready",
                value: function() {}
            }, {
                key: "mounted",
                value: function() {}
            }, {
                key: "unmounted",
                value: function() {}
            }, {
                key: "emit",
                value: function(eventName, data) {
                    this.dispatchEvent(new CustomEvent(eventName, {
                        detail: data
                    }));
                }
            }, {
                key: "connectedCallback",
                value: function() {
                    // Cancel destroy if it is queued
                    if (__WEBPACK_IMPORTED_MODULE_0__utils__.a.has(this)) {
                        var state = Object(__WEBPACK_IMPORTED_MODULE_0__utils__.b)(this);
                        if (state.destroyQueued) {
                            clearTimeout(state.destroyQueued);
                            state.destroyQueued = null;
                        }
                    }
                }
            }, {
                key: "disconnectedCallback",
                value: function() {
                    // Delay calling .destroy() by 60s, just in case user re-attaches component back to dom.
                    // This seems to be currently the only way to ensure attached `onDestroy` logic run when
                    // the element is no longer needed.
                    if (__WEBPACK_IMPORTED_MODULE_0__utils__.a.has(this)) {
                        var state = Object(__WEBPACK_IMPORTED_MODULE_0__utils__.b)(this);
                        state.destroyQueued || (state.destroyQueued = setTimeout(this.destroy.bind(this), this.constructor.delayDestroy));
                    }
                }
            } ], [ {
                key: "define",
                /**
         * Registers the web component. Uses tagName as default input param
         */
                value: function(name) {
                    customElements.define(name || this.tagName, this);
                }
            }, {
                key: "tagName",
                get: function() {
                    throw new Error("tagName not defined");
                }
            }, {
                key: "delayDestroy",
                get: function() {
                    return 3e4;
                }
            }, {
                key: "useShadow",
                get: function() {
                    return true;
                }
            }, {
                key: "template",
                get: function() {
                    return "<div></div>";
                }
            }, {
                key: "observedAttributes",
                get: function() {
                    var _this2 = this;
                    return Object.keys(this.__props || {}).filter(function(p) {
                        return _this2.__props[p].attr;
                    }).map(function(p) {
                        return p.toLowerCase();
                    });
                }
            } ]);
            return ComponentElement;
        }(HTMLElement));
    }, /* 1 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return PRIVATE;
        });
        /* harmony export (immutable) */
        __webpack_exports__.b = getInstanceState;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(5);
        //============================================================================
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_dataStore__.a.create();
        function getInstanceState(instance) {
            PRIVATE.has(instance) || PRIVATE.set(instance, {
                ready: false,
                props: {},
                content: null,
                destroyCallbacks: [],
                destroyQueued: null
            });
            return PRIVATE.get(instance);
        }
    }, /* 2 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(3);
        module.exports = __webpack_require__(4);
    }, /* 3 */
    /***/
    function(module, exports) {
        !function(global) {
            var babelHelpers = global.babelHelpers = {};
            babelHelpers.typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
                return typeof obj;
            } : function(obj) {
                return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
            };
            babelHelpers.jsx = function() {
                var REACT_ELEMENT_TYPE = "function" === typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                return function(type, props, key, children) {
                    var defaultProps = type && type.defaultProps;
                    var childrenLength = arguments.length - 3;
                    props || 0 === childrenLength || (props = {});
                    if (props && defaultProps) for (var propName in defaultProps) void 0 === props[propName] && (props[propName] = defaultProps[propName]); else props || (props = defaultProps || {});
                    if (1 === childrenLength) props.children = children; else if (childrenLength > 1) {
                        var childArray = Array(childrenLength);
                        for (var i = 0; i < childrenLength; i++) childArray[i] = arguments[i + 3];
                        props.children = childArray;
                    }
                    return {
                        $$typeof: REACT_ELEMENT_TYPE,
                        type: type,
                        key: void 0 === key ? null : "" + key,
                        ref: null,
                        props: props,
                        _owner: null
                    };
                };
            }();
            babelHelpers.asyncIterator = function(iterable) {
                if ("function" === typeof Symbol) {
                    if (Symbol.asyncIterator) {
                        var method = iterable[Symbol.asyncIterator];
                        if (null != method) return method.call(iterable);
                    }
                    if (Symbol.iterator) return iterable[Symbol.iterator]();
                }
                throw new TypeError("Object is not async iterable");
            };
            babelHelpers.asyncGenerator = function() {
                function AwaitValue(value) {
                    this.value = value;
                }
                function AsyncGenerator(gen) {
                    var front, back;
                    function send(key, arg) {
                        return new Promise(function(resolve, reject) {
                            var request = {
                                key: key,
                                arg: arg,
                                resolve: resolve,
                                reject: reject,
                                next: null
                            };
                            if (back) back = back.next = request; else {
                                front = back = request;
                                resume(key, arg);
                            }
                        });
                    }
                    function resume(key, arg) {
                        try {
                            var result = gen[key](arg);
                            var value = result.value;
                            value instanceof AwaitValue ? Promise.resolve(value.value).then(function(arg) {
                                resume("next", arg);
                            }, function(arg) {
                                resume("throw", arg);
                            }) : settle(result.done ? "return" : "normal", result.value);
                        } catch (err) {
                            settle("throw", err);
                        }
                    }
                    function settle(type, value) {
                        switch (type) {
                          case "return":
                            front.resolve({
                                value: value,
                                done: true
                            });
                            break;

                          case "throw":
                            front.reject(value);
                            break;

                          default:
                            front.resolve({
                                value: value,
                                done: false
                            });
                        }
                        front = front.next;
                        front ? resume(front.key, front.arg) : back = null;
                    }
                    this._invoke = send;
                    "function" !== typeof gen.return && (this.return = void 0);
                }
                "function" === typeof Symbol && Symbol.asyncIterator && (AsyncGenerator.prototype[Symbol.asyncIterator] = function() {
                    return this;
                });
                AsyncGenerator.prototype.next = function(arg) {
                    return this._invoke("next", arg);
                };
                AsyncGenerator.prototype.throw = function(arg) {
                    return this._invoke("throw", arg);
                };
                AsyncGenerator.prototype.return = function(arg) {
                    return this._invoke("return", arg);
                };
                return {
                    wrap: function(fn) {
                        return function() {
                            return new AsyncGenerator(fn.apply(this, arguments));
                        };
                    },
                    await: function(value) {
                        return new AwaitValue(value);
                    }
                };
            }();
            babelHelpers.asyncGeneratorDelegate = function(inner, awaitWrap) {
                var iter = {}, waiting = false;
                function pump(key, value) {
                    waiting = true;
                    value = new Promise(function(resolve) {
                        resolve(inner[key](value));
                    });
                    return {
                        done: false,
                        value: awaitWrap(value)
                    };
                }
                "function" === typeof Symbol && Symbol.iterator && (iter[Symbol.iterator] = function() {
                    return this;
                });
                iter.next = function(value) {
                    if (waiting) {
                        waiting = false;
                        return value;
                    }
                    return pump("next", value);
                };
                "function" === typeof inner.throw && (iter.throw = function(value) {
                    if (waiting) {
                        waiting = false;
                        throw value;
                    }
                    return pump("throw", value);
                });
                "function" === typeof inner.return && (iter.return = function(value) {
                    return pump("return", value);
                });
                return iter;
            };
            babelHelpers.asyncToGenerator = function(fn) {
                return function() {
                    var gen = fn.apply(this, arguments);
                    return new Promise(function(resolve, reject) {
                        function step(key, arg) {
                            try {
                                var info = gen[key](arg);
                                var value = info.value;
                            } catch (error) {
                                reject(error);
                                return;
                            }
                            if (!info.done) return Promise.resolve(value).then(function(value) {
                                step("next", value);
                            }, function(err) {
                                step("throw", err);
                            });
                            resolve(value);
                        }
                        return step("next");
                    });
                };
            };
            babelHelpers.classCallCheck = function(instance, Constructor) {
                if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
            };
            babelHelpers.createClass = function() {
                function defineProperties(target, props) {
                    for (var i = 0; i < props.length; i++) {
                        var descriptor = props[i];
                        descriptor.enumerable = descriptor.enumerable || false;
                        descriptor.configurable = true;
                        "value" in descriptor && (descriptor.writable = true);
                        Object.defineProperty(target, descriptor.key, descriptor);
                    }
                }
                return function(Constructor, protoProps, staticProps) {
                    protoProps && defineProperties(Constructor.prototype, protoProps);
                    staticProps && defineProperties(Constructor, staticProps);
                    return Constructor;
                };
            }();
            babelHelpers.defineEnumerableProperties = function(obj, descs) {
                for (var key in descs) {
                    var desc = descs[key];
                    desc.configurable = desc.enumerable = true;
                    "value" in desc && (desc.writable = true);
                    Object.defineProperty(obj, key, desc);
                }
                return obj;
            };
            babelHelpers.defaults = function(obj, defaults) {
                var keys = Object.getOwnPropertyNames(defaults);
                for (var i = 0; i < keys.length; i++) {
                    var key = keys[i];
                    var value = Object.getOwnPropertyDescriptor(defaults, key);
                    value && value.configurable && void 0 === obj[key] && Object.defineProperty(obj, key, value);
                }
                return obj;
            };
            babelHelpers.defineProperty = function(obj, key, value) {
                key in obj ? Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                }) : obj[key] = value;
                return obj;
            };
            babelHelpers.extends = Object.assign || function(target) {
                for (var i = 1; i < arguments.length; i++) {
                    var source = arguments[i];
                    for (var key in source) Object.prototype.hasOwnProperty.call(source, key) && (target[key] = source[key]);
                }
                return target;
            };
            babelHelpers.get = function get(object, property, receiver) {
                null === object && (object = Function.prototype);
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (void 0 === desc) {
                    var parent = Object.getPrototypeOf(object);
                    return null === parent ? void 0 : get(parent, property, receiver);
                }
                if ("value" in desc) return desc.value;
                var getter = desc.get;
                if (void 0 === getter) return;
                return getter.call(receiver);
            };
            babelHelpers.inherits = function(subClass, superClass) {
                if ("function" !== typeof superClass && null !== superClass) throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
                subClass.prototype = Object.create(superClass && superClass.prototype, {
                    constructor: {
                        value: subClass,
                        enumerable: false,
                        writable: true,
                        configurable: true
                    }
                });
                superClass && (Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass);
            };
            babelHelpers.instanceof = function(left, right) {
                return null != right && "undefined" !== typeof Symbol && right[Symbol.hasInstance] ? right[Symbol.hasInstance](left) : left instanceof right;
            };
            babelHelpers.interopRequireDefault = function(obj) {
                return obj && obj.__esModule ? obj : {
                    default: obj
                };
            };
            babelHelpers.interopRequireWildcard = function(obj) {
                if (obj && obj.__esModule) return obj;
                var newObj = {};
                if (null != obj) for (var key in obj) Object.prototype.hasOwnProperty.call(obj, key) && (newObj[key] = obj[key]);
                newObj.default = obj;
                return newObj;
            };
            babelHelpers.newArrowCheck = function(innerThis, boundThis) {
                if (innerThis !== boundThis) throw new TypeError("Cannot instantiate an arrow function");
            };
            babelHelpers.objectDestructuringEmpty = function(obj) {
                if (null == obj) throw new TypeError("Cannot destructure undefined");
            };
            babelHelpers.objectWithoutProperties = function(obj, keys) {
                var target = {};
                for (var i in obj) {
                    if (keys.indexOf(i) >= 0) continue;
                    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
                    target[i] = obj[i];
                }
                return target;
            };
            babelHelpers.possibleConstructorReturn = function(self, call) {
                if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
            };
            babelHelpers.selfGlobal = "undefined" === typeof global ? self : global;
            babelHelpers.set = function set(object, property, value, receiver) {
                var desc = Object.getOwnPropertyDescriptor(object, property);
                if (void 0 === desc) {
                    var parent = Object.getPrototypeOf(object);
                    null !== parent && set(parent, property, value, receiver);
                } else if ("value" in desc && desc.writable) desc.value = value; else {
                    var setter = desc.set;
                    void 0 !== setter && setter.call(receiver, value);
                }
                return value;
            };
            babelHelpers.slicedToArray = function() {
                function sliceIterator(arr, i) {
                    var _arr = [];
                    var _n = true;
                    var _d = false;
                    var _e = void 0;
                    try {
                        for (var _s, _i = arr[Symbol.iterator](); !(_n = (_s = _i.next()).done); _n = true) {
                            _arr.push(_s.value);
                            if (i && _arr.length === i) break;
                        }
                    } catch (err) {
                        _d = true;
                        _e = err;
                    } finally {
                        try {
                            !_n && _i.return && _i.return();
                        } finally {
                            if (_d) throw _e;
                        }
                    }
                    return _arr;
                }
                return function(arr, i) {
                    if (Array.isArray(arr)) return arr;
                    if (Symbol.iterator in Object(arr)) return sliceIterator(arr, i);
                    throw new TypeError("Invalid attempt to destructure non-iterable instance");
                };
            }();
            babelHelpers.slicedToArrayLoose = function(arr, i) {
                if (Array.isArray(arr)) return arr;
                if (Symbol.iterator in Object(arr)) {
                    var _arr = [];
                    for (var _step, _iterator = arr[Symbol.iterator](); !(_step = _iterator.next()).done; ) {
                        _arr.push(_step.value);
                        if (i && _arr.length === i) break;
                    }
                    return _arr;
                }
                throw new TypeError("Invalid attempt to destructure non-iterable instance");
            };
            babelHelpers.taggedTemplateLiteral = function(strings, raw) {
                return Object.freeze(Object.defineProperties(strings, {
                    raw: {
                        value: Object.freeze(raw)
                    }
                }));
            };
            babelHelpers.taggedTemplateLiteralLoose = function(strings, raw) {
                strings.raw = raw;
                return strings;
            };
            babelHelpers.temporalRef = function(val, name, undef) {
                if (val === undef) throw new ReferenceError(name + " is not defined - temporal dead zone");
                return val;
            };
            babelHelpers.temporalUndefined = {};
            babelHelpers.toArray = function(arr) {
                return Array.isArray(arr) ? arr : Array.from(arr);
            };
            babelHelpers.toConsumableArray = function(arr) {
                if (Array.isArray(arr)) {
                    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                    return arr2;
                }
                return Array.from(arr);
            };
        }("undefined" === typeof global ? self : global);
    }, /* 4 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: true
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__ComponentElement__ = __webpack_require__(0);
        /* harmony namespace reexport (by provided) */
        __webpack_require__.d(__webpack_exports__, "ComponentElement", function() {
            return __WEBPACK_IMPORTED_MODULE_0__ComponentElement__.a;
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__decorators__ = __webpack_require__(6);
        /* harmony namespace reexport (by provided) */
        __webpack_require__.d(__webpack_exports__, "prop", function() {
            return __WEBPACK_IMPORTED_MODULE_1__decorators__.a;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "default", function() {
            return __WEBPACK_IMPORTED_MODULE_0__ComponentElement__.a;
        });
    }, /* 5 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export dataStore */
        // POLYFILL FOR WEAKMAP
        //  [pt] changed how "delete" is defined so that it can work in IE8
        /* jshint ignore:start */
        /**
 * @license
 * Copyright (c) 2014 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
        "undefined" === typeof WeakMap && function() {
            var defineProperty = Object.defineProperty;
            var counter = Date.now() % 1e9;
            var WeakMap = function() {
                this.name = "__st" + (1e9 * Math.random() >>> 0) + counter++ + "__";
            };
            WeakMap.prototype = {
                set: function(key, value) {
                    var entry = key[this.name];
                    entry && entry[0] === key ? entry[1] = value : defineProperty(key, this.name, {
                        value: [ key, value ],
                        writable: true
                    });
                    return this;
                },
                get: function(key) {
                    var entry;
                    return (entry = key[this.name]) && entry[0] === key ? entry[1] : void 0;
                },
                // [pt] Quotes around the delete property needed for IE8
                delete: function(key) {
                    var entry = key[this.name];
                    if (!entry || entry[0] !== key) return false;
                    entry[0] = entry[1] = void 0;
                    return true;
                },
                has: function(key) {
                    var entry = key[this.name];
                    if (!entry) return false;
                    return entry[0] === key;
                }
            };
            window.WeakMap = WeakMap;
        }();
        /* jshint ignore:end */
        /**
 * Returns an object that contains an initialized WeakMap (`stash` property)
 * where data can be stored.
 *
 * @namespace dataStore
 *
 */
        var dataStore = /** @lends dataStore */ {
            /**
   * Stash data here.
   * @type WeakMap
   */
            stash: new WeakMap(),
            /**
   * Create a private data store and return it.
   * @return {WeakMap}
   */
            create: function() {
                return new WeakMap();
            }
        };
        /* harmony default export */
        __webpack_exports__.a = dataStore;
    }, /* 6 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = prop;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(1);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(7);
        /**
 * Create a ComponentElement property.
 * The property has the following characteristics:
 *
 *  -   Values, when set, are automatically copied to the Instance state.props
 *
 * @returns {Function}
 */
        function prop() {
            for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
            // Called with options? Return Design function
            if (args.length < 2) return setupProp.bind(null, args[0]);
            return setupProp.apply(void 0, [ null ].concat(args));
        }
        function setupProp(options, Proto, prop, descriptor) {
            Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)(getPropDef(Proto, prop), options);
            descriptor.get = descriptor.set = lazyProp(prop, descriptor.get, descriptor.set);
            return descriptor;
        }
        function getClassProps(Proto) {
            Proto.constructor.__props || Object.defineProperty(Proto.constructor, "__props", {
                configurable: true,
                value: {}
            });
            return Proto.constructor.__props;
        }
        function getPropDef(Proto, name) {
            var classProps = getClassProps(Proto);
            classProps[name] || (classProps[name] = {
                name: name,
                attr: false
            });
            return classProps[name];
        }
        /**
 * Return a getter/setter function to be used in a Property descriptor. When invoked first time as
 * part of an instance, it will setup the actually get/set function that will persist Props to the
 * instance `state.props`
 *
 * @private
 *
 * @param propName
 * @param getter
 * @param setter
 *
 * @returns {Function}
 */
        function lazyProp(propName, getter, setter) {
            return function() {
                Object.defineProperty(this, propName, {
                    configurable: true,
                    get: function() {
                        return Object(__WEBPACK_IMPORTED_MODULE_0__utils__.b)(this).props[propName];
                    },
                    set: function(newValue) {
                        setter && (newValue = setter.call(this, newValue));
                        return Object(__WEBPACK_IMPORTED_MODULE_0__utils__.b)(this).props[propName] = newValue;
                    }
                });
                Object(__WEBPACK_IMPORTED_MODULE_0__utils__.b)(this).props[propName] = getter();
                // update mode
                if (1 === arguments.length) return this[propName];
                return this[propName];
            };
        }
    }, /* 7 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export objectExtend */
        var OBJECT_TYPE = "[object Object]";
        var _toString = Function.call.bind(Object.prototype.toString);
        //============================================================
        /**
 * Extends an object with the properties of another.
 *
 * @param {Object|Boolean} mergeIntoObj
 *  The object that will have the properties of every other object provided
 *  on input merged into. This can also be a `Boolean`, in which case,
 *  a deep merge of objects will be done - argument number 2 will
 *  become the `mergeIntoObj`.
 * @param {...Object} mergeObjects
 *
 * @return {Object}
 */
        function objectExtend(mergeIntoObj) {
            var response = mergeIntoObj || {};
            for (var _len = arguments.length, mergeObjects = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) mergeObjects[_key - 1] = arguments[_key];
            var total = mergeObjects.length;
            var deepMerge = false;
            var i = void 0;
            var key = void 0;
            if ("boolean" === typeof mergeIntoObj) {
                deepMerge = mergeIntoObj;
                response = mergeObjects.shift() || {};
                total = mergeObjects.length;
            }
            for (i = 0; i < total; i++) {
                if (!mergeObjects[i]) continue;
                for (key in mergeObjects[i]) mergeObjects[i].hasOwnProperty(key) && (deepMerge && _toString(response[key]) === OBJECT_TYPE && _toString(mergeObjects[i][key]) === OBJECT_TYPE ? response[key] = objectExtend(true, response[key], mergeObjects[i][key]) : response[key] = mergeObjects[i][key]);
            }
            return response;
        }
        /* harmony default export */
        __webpack_exports__.a = objectExtend;
    } ]);
});
//# sourceMappingURL=component-element.js.map