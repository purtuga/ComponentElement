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
        return __webpack_require__(__webpack_require__.s = 48);
    }([ /* 0 */
    /***/
    function(module, exports, __webpack_require__) {
        var store = __webpack_require__(31)("wks");
        var uid = __webpack_require__(14);
        var _Symbol = __webpack_require__(1).Symbol;
        var USE_SYMBOL = "function" == typeof _Symbol;
        var $exports = module.exports = function(name) {
            return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)("Symbol." + name));
        };
        $exports.store = store;
    }, /* 1 */
    /***/
    function(module, exports) {
        // https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
        var global = module.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
        "number" == typeof __g && (__g = global);
    }, /* 2 */
    /***/
    function(module, exports) {
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        module.exports = function(it) {
            return "object" === ("undefined" === typeof it ? "undefined" : _typeof(it)) ? null !== it : "function" === typeof it;
        };
    }, /* 3 */
    /***/
    function(module, exports, __webpack_require__) {
        // Thank's IE8 for his funny defineProperty
        module.exports = !__webpack_require__(15)(function() {
            return 7 != Object.defineProperty({}, "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 4 */
    /***/
    function(module, exports) {
        var hasOwnProperty = {}.hasOwnProperty;
        module.exports = function(it, key) {
            return hasOwnProperty.call(it, key);
        };
    }, /* 5 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(1);
        var hide = __webpack_require__(6);
        var has = __webpack_require__(4);
        var SRC = __webpack_require__(14)("src");
        var $toString = Function.toString;
        var TPL = ("" + $toString).split("toString");
        __webpack_require__(16).inspectSource = function(it) {
            return $toString.call(it);
        };
        (module.exports = function(O, key, val, safe) {
            var isFunction = "function" == typeof val;
            isFunction && (has(val, "name") || hide(val, "name", key));
            if (O[key] === val) return;
            isFunction && (has(val, SRC) || hide(val, SRC, O[key] ? "" + O[key] : TPL.join(String(key))));
            if (O === global) O[key] = val; else if (safe) O[key] ? O[key] = val : hide(O, key, val); else {
                delete O[key];
                hide(O, key, val);
            }
        })(Function.prototype, "toString", function() {
            return "function" == typeof this && this[SRC] || $toString.call(this);
        });
    }, /* 6 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(7);
        var createDesc = __webpack_require__(21);
        module.exports = __webpack_require__(3) ? function(object, key, value) {
            return dP.f(object, key, createDesc(1, value));
        } : function(object, key, value) {
            object[key] = value;
            return object;
        };
    }, /* 7 */
    /***/
    function(module, exports, __webpack_require__) {
        var anObject = __webpack_require__(8);
        var IE8_DOM_DEFINE = __webpack_require__(32);
        var toPrimitive = __webpack_require__(34);
        var dP = Object.defineProperty;
        exports.f = __webpack_require__(3) ? Object.defineProperty : function(O, P, Attributes) {
            anObject(O);
            P = toPrimitive(P, true);
            anObject(Attributes);
            if (IE8_DOM_DEFINE) try {
                return dP(O, P, Attributes);
            } catch (e) {}
            if ("get" in Attributes || "set" in Attributes) throw TypeError("Accessors not supported!");
            "value" in Attributes && (O[P] = Attributes.value);
            return O;
        };
    }, /* 8 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(2);
        module.exports = function(it) {
            if (!isObject(it)) throw TypeError(it + " is not an object!");
            return it;
        };
    }, /* 9 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(1);
        var core = __webpack_require__(16);
        var hide = __webpack_require__(6);
        var redefine = __webpack_require__(5);
        var ctx = __webpack_require__(10);
        var $export = function $export(type, name, source) {
            var IS_FORCED = type & $export.F;
            var IS_GLOBAL = type & $export.G;
            var IS_STATIC = type & $export.S;
            var IS_PROTO = type & $export.P;
            var IS_BIND = type & $export.B;
            var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {}).prototype;
            var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
            var expProto = exports.prototype || (exports.prototype = {});
            var key, own, out, exp;
            IS_GLOBAL && (source = name);
            for (key in source) {
                // contains in native
                own = !IS_FORCED && target && void 0 !== target[key];
                // export native or passed
                out = (own ? target : source)[key];
                // bind timers to global for call from export context
                exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && "function" == typeof out ? ctx(Function.call, out) : out;
                // extend global
                target && redefine(target, key, out, type & $export.U);
                // export
                exports[key] != out && hide(exports, key, exp);
                IS_PROTO && expProto[key] != out && (expProto[key] = out);
            }
        };
        global.core = core;
        // type bitmap
        $export.F = 1;
        // forced
        $export.G = 2;
        // global
        $export.S = 4;
        // static
        $export.P = 8;
        // proto
        $export.B = 16;
        // bind
        $export.W = 32;
        // wrap
        $export.U = 64;
        // safe
        $export.R = 128;
        // real proto method for `library`
        module.exports = $export;
    }, /* 10 */
    /***/
    function(module, exports, __webpack_require__) {
        // optional / simple context binding
        var aFunction = __webpack_require__(35);
        module.exports = function(fn, that, length) {
            aFunction(fn);
            if (void 0 === that) return fn;
            switch (length) {
              case 1:
                return function(a) {
                    return fn.call(that, a);
                };

              case 2:
                return function(a, b) {
                    return fn.call(that, a, b);
                };

              case 3:
                return function(a, b, c) {
                    return fn.call(that, a, b, c);
                };
            }
            return function() {
                return fn.apply(that, arguments);
            };
        };
    }, /* 11 */
    /***/
    function(module, exports) {
        module.exports = {};
    }, /* 12 */
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
    }, /* 13 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export Set */
        var Set = __webpack_require__(50);
        /* harmony default export */
        __webpack_exports__.a = Set;
    }, /* 14 */
    /***/
    function(module, exports) {
        var id = 0;
        var px = Math.random();
        module.exports = function(key) {
            return "Symbol(".concat(void 0 === key ? "" : key, ")_", (++id + px).toString(36));
        };
    }, /* 15 */
    /***/
    function(module, exports) {
        module.exports = function(exec) {
            try {
                return !!exec();
            } catch (e) {
                return true;
            }
        };
    }, /* 16 */
    /***/
    function(module, exports) {
        var core = module.exports = {
            version: "2.5.3"
        };
        "number" == typeof __e && (__e = core);
    }, /* 17 */
    /***/
    function(module, exports, __webpack_require__) {
        // to indexed object, toObject with fallback for non-array-like ES3 strings
        var IObject = __webpack_require__(58);
        var defined = __webpack_require__(23);
        module.exports = function(it) {
            return IObject(defined(it));
        };
    }, /* 18 */
    /***/
    function(module, exports, __webpack_require__) {
        var ctx = __webpack_require__(10);
        var call = __webpack_require__(69);
        var isArrayIter = __webpack_require__(70);
        var anObject = __webpack_require__(8);
        var toLength = __webpack_require__(38);
        var getIterFn = __webpack_require__(71);
        var BREAK = {};
        var RETURN = {};
        var exports = module.exports = function(iterable, entries, fn, that, ITERATOR) {
            var iterFn = ITERATOR ? function() {
                return iterable;
            } : getIterFn(iterable);
            var f = ctx(fn, that, entries ? 2 : 1);
            var index = 0;
            var length, step, iterator, result;
            if ("function" != typeof iterFn) throw TypeError(iterable + " is not iterable!");
            // fast case for arrays with default iterator
            if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
                result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
                if (result === BREAK || result === RETURN) return result;
            } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done; ) {
                result = call(iterator, f, step.value, entries);
                if (result === BREAK || result === RETURN) return result;
            }
        };
        exports.BREAK = BREAK;
        exports.RETURN = RETURN;
    }, /* 19 */
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
    }, /* 20 */
    /***/
    function(module, exports, __webpack_require__) {
        // getting tag from 19.1.3.6 Object.prototype.toString()
        var cof = __webpack_require__(30);
        var TAG = __webpack_require__(0)("toStringTag");
        // ES3 wrong here
        var ARG = "Arguments" == cof(function() {
            return arguments;
        }());
        // fallback for IE11 Script Access Denied error
        var tryGet = function(it, key) {
            try {
                return it[key];
            } catch (e) {}
        };
        module.exports = function(it) {
            var O, T, B;
            return void 0 === it ? "Undefined" : null === it ? "Null" : "string" == typeof (T = tryGet(O = Object(it), TAG)) ? T : ARG ? cof(O) : "Object" == (B = cof(O)) && "function" == typeof O.callee ? "Arguments" : B;
        };
    }, /* 21 */
    /***/
    function(module, exports) {
        module.exports = function(bitmap, value) {
            return {
                enumerable: !(1 & bitmap),
                configurable: !(2 & bitmap),
                writable: !(4 & bitmap),
                value: value
            };
        };
    }, /* 22 */
    /***/
    function(module, exports) {
        // 7.1.4 ToInteger
        var ceil = Math.ceil;
        var floor = Math.floor;
        module.exports = function(it) {
            return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
        };
    }, /* 23 */
    /***/
    function(module, exports) {
        // 7.2.1 RequireObjectCoercible(argument)
        module.exports = function(it) {
            if (void 0 == it) throw TypeError("Can't call method on  " + it);
            return it;
        };
    }, /* 24 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var LIBRARY = __webpack_require__(54);
        var $export = __webpack_require__(9);
        var redefine = __webpack_require__(5);
        var hide = __webpack_require__(6);
        var has = __webpack_require__(4);
        var Iterators = __webpack_require__(11);
        var $iterCreate = __webpack_require__(55);
        var setToStringTag = __webpack_require__(26);
        var getPrototypeOf = __webpack_require__(62);
        var ITERATOR = __webpack_require__(0)("iterator");
        var BUGGY = !([].keys && "next" in [].keys());
        var returnThis = function() {
            return this;
        };
        module.exports = function(Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
            $iterCreate(Constructor, NAME, next);
            var getMethod = function(kind) {
                if (!BUGGY && kind in proto) return proto[kind];
                switch (kind) {
                  case "keys":
                  case "values":
                    return function() {
                        return new Constructor(this, kind);
                    };
                }
                return function() {
                    return new Constructor(this, kind);
                };
            };
            var TAG = NAME + " Iterator";
            var DEF_VALUES = "values" == DEFAULT;
            var VALUES_BUG = false;
            var proto = Base.prototype;
            var $native = proto[ITERATOR] || proto["@@iterator"] || DEFAULT && proto[DEFAULT];
            var $default = !BUGGY && $native || getMethod(DEFAULT);
            var $entries = DEFAULT ? DEF_VALUES ? getMethod("entries") : $default : void 0;
            var $anyNative = "Array" == NAME ? proto.entries || $native : $native;
            var methods, key, IteratorPrototype;
            // Fix native
            if ($anyNative) {
                IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
                if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
                    // Set @@toStringTag to native iterators
                    setToStringTag(IteratorPrototype, TAG, true);
                    // fix for some old engines
                    LIBRARY || has(IteratorPrototype, ITERATOR) || hide(IteratorPrototype, ITERATOR, returnThis);
                }
            }
            // fix Array#{values, @@iterator}.name in V8 / FF
            if (DEF_VALUES && $native && "values" !== $native.name) {
                VALUES_BUG = true;
                $default = function() {
                    return $native.call(this);
                };
            }
            // Define iterator
            LIBRARY && !FORCED || !BUGGY && !VALUES_BUG && proto[ITERATOR] || hide(proto, ITERATOR, $default);
            // Plug for library
            Iterators[NAME] = $default;
            Iterators[TAG] = returnThis;
            if (DEFAULT) {
                methods = {
                    values: DEF_VALUES ? $default : getMethod("values"),
                    keys: IS_SET ? $default : getMethod("keys"),
                    entries: $entries
                };
                if (FORCED) for (key in methods) key in proto || redefine(proto, key, methods[key]); else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
            }
            return methods;
        };
    }, /* 25 */
    /***/
    function(module, exports, __webpack_require__) {
        var shared = __webpack_require__(31)("keys");
        var uid = __webpack_require__(14);
        module.exports = function(key) {
            return shared[key] || (shared[key] = uid(key));
        };
    }, /* 26 */
    /***/
    function(module, exports, __webpack_require__) {
        var def = __webpack_require__(7).f;
        var has = __webpack_require__(4);
        var TAG = __webpack_require__(0)("toStringTag");
        module.exports = function(it, tag, stat) {
            it && !has(it = stat ? it : it.prototype, TAG) && def(it, TAG, {
                configurable: true,
                value: tag
            });
        };
    }, /* 27 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return ComponentElement;
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_observable_data_src_ObservableObject__ = __webpack_require__(28);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(47);
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var _createClass = function() {
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
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
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
        }
        var _fixBabelExtend = function(O) {
            var gPO = O.getPrototypeOf || function(o) {
                return o.__proto__;
            }, sPO = O.setPrototypeOf || function(o, p) {
                o.__proto__ = p;
                return o;
            }, construct = "object" === ("undefined" === typeof Reflect ? "undefined" : _typeof(Reflect)) ? Reflect.construct : function(Parent, args, Class) {
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
            _inherits(ComponentElement, _HTMLElement);
            function ComponentElement() {
                var _ref;
                var _ret;
                _classCallCheck(this, ComponentElement);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                var _this = _possibleConstructorReturn(this, (_ref = ComponentElement.__proto__ || Object.getPrototypeOf(ComponentElement)).call.apply(_ref, [ this ].concat(args)));
                setupComponent(_this);
                return _ret = _this, _possibleConstructorReturn(_this, _ret);
            }
            //==============================================================
            //  Static Members
            //==============================================================
            /**
     * Return default registration tag name
     *
     * @return {String}
     */
            _createClass(ComponentElement, [ {
                key: "attributeChangedCallback",
                //==============================================================
                //  Instance Members
                //==============================================================
                // Reflects changed html attributes to state.props
                value: function(name, oldValue, newValue) {
                    Object.keys(this.constructor.__props).some(function(propName) {
                        if (propName.toLowerCase() === name) {
                            name = propName;
                            return true;
                        }
                    });
                    this.props[name] = newValue;
                }
            }, {
                key: "destroy",
                value: function() {
                    if (__WEBPACK_IMPORTED_MODULE_1__utils__.a.has(this)) {
                        var state = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.b)(this);
                        __WEBPACK_IMPORTED_MODULE_1__utils__.a.delete(this);
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
                    Object(__WEBPACK_IMPORTED_MODULE_1__utils__.b)(this).destroyCallbacks.push(callback);
                }
            }, {
                key: "init",
                //~~~~~~~~~~~~~~~~~~~~~~ LIFE CYCLE HOOKS ~~~~~~~~~~~~~~~~~~~~~~
                /**
         * Called to initialize the component, but only after only after all required
         * props have been provided.  This method could be called multiple times, if component
         * has been destroyed, but then re-attached to the DOM Tree.
         *
         */
                value: function() {}
            }, {
                key: "ready",
                value: function() {}
            }, {
                key: "unready",
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
                    if (__WEBPACK_IMPORTED_MODULE_1__utils__.a.has(this)) {
                        var state = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.b)(this);
                        if (state.destroyQueued) {
                            clearTimeout(state.destroyQueued);
                            state.destroyQueued = null;
                        }
                        state.isMounted = true;
                        state.ready && this.mounted();
                    } else setupComponent(this);
                }
            }, {
                key: "disconnectedCallback",
                value: function() {
                    // Delay calling .destroy() by 60s, just in case user re-attaches component back to dom.
                    // This seems to be currently the only way to ensure attached `onDestroy` logic run when
                    // the element is no longer needed.
                    if (__WEBPACK_IMPORTED_MODULE_1__utils__.a.has(this)) {
                        var state = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.b)(this);
                        state.destroyQueued || (state.destroyQueued = setTimeout(this.destroy.bind(this), this.constructor.delayDestroy));
                        state.isMounted = false;
                        state.ready && this.unmounted();
                    }
                }
            }, {
                key: "props",
                get: function() {
                    if (this.constructor.prototype === this) throw new Error("can't be used on own prototype");
                    if (this._$props) return this._$props;
                    // On first call - setup the property on the instance
                    var propDefintions = this.constructor.__props;
                    var props = {};
                    Object.keys(propDefintions).forEach(function(propName) {
                        props[propName] = null;
                    });
                    props = new __WEBPACK_IMPORTED_MODULE_0_observable_data_src_ObservableObject__.a(props);
                    Object.defineProperty(this, "_$props", {
                        value: props
                    });
                    return props;
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
                    return 5e3;
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
        function setupComponent(component) {
            var state = Object(__WEBPACK_IMPORTED_MODULE_1__utils__.b)(component);
            var handleReadyChanges = function() {
                if (state.ready) {
                    if (!state.hasTemplate) {
                        state.content.innerHTML = component.constructor.template;
                        state.hasTemplate = true;
                    }
                    component.ready();
                    state.isMounted && component.mounted();
                } else state.hasTemplate && component.unready();
            };
            component.constructor.useShadow && SHADOW_DOM_SUPPORTED ? component.shadowRoot ? state.content = component.shadowRoot : state.content = component.attachShadow({
                mode: "open"
            }) : state.content = component;
            component.init();
            state.readyWatcher = Object(__WEBPACK_IMPORTED_MODULE_0_observable_data_src_ObservableObject__.b)(state, "ready", handleReadyChanges);
            handleReadyChanges();
        }
    }, /* 28 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export createComputedProp */
        /* unused harmony export observableAssign */
        /* unused harmony export makeObservable */
        /* harmony export (immutable) */
        __webpack_exports__.b = watchProp;
        /* unused harmony export watchPropOnce */
        /* unused harmony export unwatchProp */
        /* unused harmony export notifyPropWatchers */
        /* unused harmony export observableMixin */
        /* unused harmony export ObservableObject */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__ = __webpack_require__(29);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(19);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(45);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(46);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(13);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_5__common__ = __webpack_require__(86);
        /* unused harmony reexport setDependencyTracker */
        /* unused harmony reexport unsetDependencyTracker */
        /* unused harmony reexport stopDependeeNotifications */
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //=======================================================
        var OBJECT = Object;
        // aliases
        var objectCreate = OBJECT.create;
        var objectDefineProperty = OBJECT.defineProperty;
        var objectHasOwnProperty = Object(__WEBPACK_IMPORTED_MODULE_5__common__.f)(__WEBPACK_IMPORTED_MODULE_5__common__.c.hasOwnProperty);
        var objectKeys = Object.keys;
        var noopEventListener = objectCreate({
            off: function() {}
        });
        /**
 * Adds the ability to observe `Object` property values for changes.
 * Uses an internal `EventEmitter` instance to list and trigger events,
 * and `Object.defineProperty` getter/setters to setup watchers on
 * property values.
 *
 * Currently has no support for addition or deletion from the object,
 * but with the ES7 forth coming Proxy functionality, that will be
 * added.
 *
 * @class ObservableObject
 * @extends Compose
 *
 * @param {Object} [model]
 * @param {Object} [options]
 * @param {Boolean} [options.watchAll=true]
 *  if `model` was given on input, then all properties will be automatically made watchable.
 * @param {Boolean} [options.deep=true]
 *  If set to true, the model is walked and all deep objects made observable as well
 *
 * @example
 *
 * // Used as a mixin
 * var myObj = {
 *      first: "paul",
 *      last: "tavares"
 * };
 *
 * ObservableObject.mixin(myObj);
 *
 * myObj.on("first", function(newValue, oldValue){
 *      alert("first name was changed");
 * });
 *
 * @example
 *
 * // Used as part of a class prototype
 * var MyModel = Compose.extend(ObservableObject);
 *
 * var user = MyModel.create({
 *      first: "paul",
 *      last: "tavares"
 * });
 *
 * user.on("first", function(newValue, oldValue){
 *  alert("first name was change")
 * });
 *
 */
        var ObservableObject = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend(/** @lends ObservableObject.prototype */ {
            init: function(model, options) {
                var opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, this.getFactory().defaults, options);
                if (model) {
                    // FIXME: need to create prop that uses original getter/setters from `model` - or no?
                    Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)(this, model);
                    opt.watchAll && makeObservable(this, null, opt.deep);
                    getInstance(this).opt = opt;
                }
            },
            /**
     * Add a callback to changes on a given property
     *
     * @param {String|Object} prop
     *  Object property name. If wanting to list to all changes to the object, the
     *  object instance itself can be passed as the prop.
     *
     * @param {Function} callback
     *  A callback function to list to the event. The callback function
     *  can cancel any queued event callbacks by returning `true` (boolean).
     *
     * @return {EventListener}
     *
     * @example
     *
     * obj.on("firstName", () => {});
     *
     * // List to all changes
     * obj.on(obj, () => {});
     */
            on: function(prop, callback) {
                return watchProp(this, prop, callback);
            },
            /**
     * Remove a callback the listening queue of a for a given property name
     *
     * @param {String} prop
     *  Object property name
     *
     * @param {Function} callback
     *  The callback that should be removed.
     */
            off: function(prop, callback) {
                unwatchProp(this, prop, callback);
            },
            /**
     * Add a callback for changes on a given property that is called only once
     *
     * @param {String} prop
     *  Object property name
     *
     * @param {Function} callback
     *  The callback that should be removed.
     */
            once: function(prop, callback) {
                return watchPropOnce(this, prop, callback);
            },
            /**
     * Emit an event and execute any callback listening. Any of the listening
     * events can cancel the calling of queued callbacks by returning `true`
     * (boolean)
     *
     * @param {String} prop
     */
            emit: function(prop) {
                return notifyPropWatchers(this, prop);
            },
            /**
     * Copies the properties of one or more objects into the current observable
     * and makes those properties "watchable".
     *
     * @param {...Object} args
     *
     * @returns {Object}
     */
            assign: function() {
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                return observableAssign.apply(void 0, [ this ].concat(_toConsumableArray(args)));
            },
            /**
     * Sets a property on the observable object and automatically makes it watchable
     *
     * @param {String} propName
     * @param {*} [value]
     * @returns {*}
     */
            setProp: function(propName, value) {
                makePropWatchable(this, propName);
                return this[propName] = value;
            }
        });
        /**
 * Returns the private Instance data for this object
 *
 * @private
 * @param {Object} observableObj
 *
 * @return {EventEmitter}
 */
        function getInstance(observableObj) {
            if (!__WEBPACK_IMPORTED_MODULE_5__common__.d.has(observableObj)) {
                var instData = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_EventEmitter__.a.create();
                var watched = instData.watched = {};
                var isQueued = false;
                Object(__WEBPACK_IMPORTED_MODULE_5__common__.k)(observableObj);
                instData.opt = Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_objectExtend__.a)({}, ObservableObject.defaults);
                instData.notify = function() {
                    if (isQueued) return;
                    isQueued = true;
                    Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_nextTick__.a)(function() {
                        instData.emit("");
                        isQueued = false;
                    });
                };
                __WEBPACK_IMPORTED_MODULE_5__common__.d.set(observableObj, instData);
                observableObj.onDestroy && observableObj.onDestroy(function() {
                    objectKeys(watched).forEach(function(propName) {
                        watched[propName].destroy();
                        // FIXME remove property getter/setter on the object (if still there)
                        delete watched[propName];
                    });
                    delete instData.watched;
                    __WEBPACK_IMPORTED_MODULE_5__common__.d.delete(observableObj);
                    instData.destroy();
                }.bind(observableObj));
            }
            return __WEBPACK_IMPORTED_MODULE_5__common__.d.get(observableObj);
        }
        /**
 * A property setup
 *
 * @private
 * @class Observable~PropertySetup
 * @extends Compose
 */
        var PropertySetup = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_Compose__.a.extend(/** @lends Observable~PropertySetup.prototype */ {
            init: function(observable, propName) {
                var _this = this;
                this.dependees = new __WEBPACK_IMPORTED_MODULE_4_common_micro_libs_src_jsutils_es6_Set__.a();
                this.propName = propName;
                this._obj = observable;
                this.onDestroy(function() {
                    _this.dependees.clear();
                    _this.rmDepEvListener && _this.rmDepEvListener.off();
                    _this._obj = null;
                });
            },
            propName: "",
            /** @type Array */
            dependees: null,
            oldVal: null,
            newVal: null,
            queued: false,
            isComputed: false,
            /**
     * Notifies everyone that is listening for events on this property
     *
     * @param [noDelay=false]
     */
            notify: function(noDelay) {
                var _this2 = this;
                var propSetup = this;
                // Queue up calling all dependee notifiers
                this.dependees.forEach(function(cb) {
                    return Object(__WEBPACK_IMPORTED_MODULE_5__common__.i)(cb);
                });
                // If emitting of events for this property was already queued, exit
                if (propSetup.queued) return;
                propSetup.queued = true;
                if (noDelay) {
                    this._emit();
                    return;
                }
                Object(__WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_nextTick__.a)(function() {
                    return _this2._emit();
                });
            },
            _emit: function() {
                this.queued = false;
                getInstance(this._obj).emit(this.propName, this.newVal, this.oldVal);
                this.oldVal = null;
            },
            /**
     * Removes a callback from the list of dependees
     * @param {Function} cb
     */
            removeDependee: function(cb) {
                this.dependees.delete(cb);
                // Remove listener if no dependees
                if (this.rmDepEvListener && 0 === this.dependees.size) {
                    this.rmDepEvListener.off();
                    this.rmDepEvListener = null;
                }
            },
            /**
     * Stores global dependees into this Property list of dependees
     */
            storeDependees: function() {
                Object(__WEBPACK_IMPORTED_MODULE_5__common__.m)(this.dependees);
                // If we have dependees, then setup an internal event bus listener
                this.dependees.size > 0 && !this.rmDepEvListener && (this.rmDepEvListener = Object(__WEBPACK_IMPORTED_MODULE_5__common__.h)(__WEBPACK_IMPORTED_MODULE_5__common__.a, this.removeDependee.bind(this)));
            }
        });
        /**
 * Checks to see if a given property on this object already has a watcher
 * and if not, it sets one up for it.
 *
 * @private
 * @param {ObservableObject} observable
 * @param {String} propName
 * @param {Function} [valueGetter]
 * @param {Function} [valueSetter]
 * @param {Boolean} [enumerable=true]
 *
 * @return {EventEmitter}
 */
        function makePropWatchable(observable, propName, valueGetter, valueSetter) {
            var enumerable = !(arguments.length > 4 && void 0 !== arguments[4]) || arguments[4];
            var inst = getInstance(observable);
            var watched = inst.watched;
            if (watched[propName]) return inst;
            var currentValue = void 0;
            var emitNotification = !(propName in observable);
            var propDescriptor = Object.getOwnPropertyDescriptor(observable, propName);
            if (propDescriptor) {
                if (false === propDescriptor.configurable) // TODO: should we throw()?
                return;
                valueGetter = valueGetter || propDescriptor.get;
                valueSetter = valueSetter || propDescriptor.set;
                valueGetter || (currentValue = propDescriptor.value);
            }
            // if we're able to remove the current property (ex. Constants would fail),
            // then change this attribute to be watched
            if (delete observable[propName]) {
                var propSetup = watched[propName] = PropertySetup.create(observable, propName);
                propSetup.oldVal = propSetup.newVal = currentValue;
                objectDefineProperty(observable, propName, {
                    enumerable: enumerable,
                    configurable: true,
                    // Getter will either delegate to the prior getter(),
                    // or return the value that was originally assigned to the property
                    get: function() {
                        propSetup.storeDependees();
                        return valueGetter ? valueGetter() : propSetup.newVal;
                    },
                    // Setter is how we detect changes to the value.
                    set: function(newValue) {
                        if (propSetup.isComputed) return;
                        var oldValue = valueGetter ? valueGetter() : propSetup.newVal;
                        if (valueSetter) newValue = valueSetter.call(observable, newValue); else {
                            propSetup.oldVal = oldValue;
                            propSetup.newVal = newValue;
                        }
                        // Dirty checking...
                        // Only trigger if values are different. Also, only add a trigger
                        // if one is not already queued.
                        if (newValue !== oldValue) {
                            inst.opt.deep && newValue && Object(__WEBPACK_IMPORTED_MODULE_5__common__.g)(newValue) && makeObservable(newValue, null, true);
                            propSetup.notify();
                        }
                    }
                });
            } else console.log(new Error("Unable to watch property [" + propName + "] - delete failed"));
            emitNotification && inst.notify();
            return inst;
        }
        /**
 * Created a computed property on a given object
 *
 * @param {Object} observable
 * @param {String} propName
 * @param {Function} valueGenerator
 * @param {Boolean} [enumerable=true]
 */
        function createComputedProp(observable, propName, valueGenerator) {
            var enumerable = !(arguments.length > 3 && void 0 !== arguments[3]) || arguments[3];
            if (observable && propName && valueGenerator) {
                var runValueGenerator = true;
                var propValue = void 0;
                var dependencyChangeNotifier = function() {
                    // Trigger the Object property setter(). This does nothing as far as the
                    // computed value does, but provides compatibility for any code that
                    // might have overwritten the setter in order ot also listen for changes
                    // outside of this lib.
                    observable[propName] = "";
                    // Reset the internally cached prop value and set the flag to run the
                    // generator and then notify listeners.
                    propValue = null;
                    runValueGenerator = true;
                    getInstance(observable).watched[propName].notify();
                };
                var valueGetter = function() {
                    // FIXME: should we detect circular loops?
                    if (!runValueGenerator) return propValue;
                    Object(__WEBPACK_IMPORTED_MODULE_5__common__.j)(dependencyChangeNotifier);
                    try {
                        propValue = valueGenerator.call(observable);
                    } catch (e) {
                        Object(__WEBPACK_IMPORTED_MODULE_5__common__.n)(dependencyChangeNotifier);
                        throw e;
                    }
                    Object(__WEBPACK_IMPORTED_MODULE_5__common__.n)(dependencyChangeNotifier);
                    runValueGenerator = false;
                    return propValue;
                };
                var valueSetter = function() {
                    /* FIXME: should this anything? */
                    return propValue;
                };
                var inst = getInstance(observable);
                dependencyChangeNotifier[__WEBPACK_IMPORTED_MODULE_5__common__.b] = true;
                // If this propName is already being watched, then first destroy that instance
                if (propName in inst.watched) {
                    inst.watched[propName].destroy();
                    delete inst.watched[propName];
                }
                makePropWatchable(observable, propName, valueGetter, valueSetter, enumerable);
                inst.watched[propName].isComputed = true;
                inst.watched[propName].onDestroy(function() {
                    Object(__WEBPACK_IMPORTED_MODULE_5__common__.l)(dependencyChangeNotifier);
                    delete inst.watched[propName];
                    delete observable[propName];
                    observable[propName] = propValue;
                });
                return Object.create({
                    destroy: function() {
                        inst.watched[propName] && inst.watched[propName].destroy(true);
                    }
                });
            }
        }
        /**
 * Assign the properties of one (or more) objects to the observable and
 * makes those properties "watchable"
 *
 * @param {Object} observable
 * @param {...Object} objs
 *
 * @return {Object} observable
 */
        function observableAssign(observable) {
            for (var _len2 = arguments.length, objs = Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) objs[_key2 - 1] = arguments[_key2];
            objs.length && Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objs, function(obj) {
                Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(obj), function(key) {
                    makePropWatchable(observable, key);
                    observable[key] = obj[key];
                });
            });
            return observable;
        }
        /**
 * Makes an Object observable or a given property of the object observable.
 *
 * @param {Object} observable
 *  The object that should be made observable.
 *
 * @param {String} [propName]
 *  if left unset, then all existing `own properties` of the object will
 *  be made observable.
 *
 * @param {Boolean} [deep=false]
 *  If set to `true` then the object, or the value the given `prop` (if defined)
 *  will be "walked" and any object found made an observable as well.
 *
 * @param {Function} [onEach]
 *  A callback function to be called as each property is "walked". The property value
 *  is provided on input to the callback
 */
        function makeObservable(observable, propName, deep, onEach) {
            if (observable) {
                propName ? makePropWatchable(observable, propName) : Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(observable), function(prop) {
                    return makePropWatchable(observable, prop);
                });
                deep && Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(observable), function(key) {
                    observable[key] && Object(__WEBPACK_IMPORTED_MODULE_5__common__.g)(observable[key]) && makeObservable(observable[key], null, deep, onEach);
                    onEach && onEach(observable[key]);
                });
            }
        }
        /**
 * Watch a given object property for changes.
 *
 * @param {Object} observable
 * @param {String} propName
 *  The `observable` property name or, if wanting to list to all property changes,
 *  the actual `observable` instance
 * @param {Function} notifier
 *
 * @returns {EventEmitter#EventListener}
 */
        function watchProp(observable, propName, notifier) {
            var inst = getInstance(observable);
            if (propName === observable) return inst.on(inst, notifier);
            if (objectHasOwnProperty(observable, propName)) {
                makePropWatchable(observable, propName);
                return inst.on(propName, notifier);
            }
            return noopEventListener;
        }
        /**
 * Watch for changes on a given object property only once
 * (automatically stops listening after the first invocation).
 *
 * @param {Object} observable
 * @param {String} propName
 * @param {Function} notifier
 * @returns {EventEmitter#EventListener}
 */
        function watchPropOnce(observable, propName, notifier) {
            var inst = getInstance(observable);
            if (propName === observable) return inst.once(inst, notifier);
            if (objectHasOwnProperty(observable, propName)) {
                makePropWatchable(observable, propName);
                return inst.once(propName, notifier);
            }
            return noopEventListener;
        }
        /**
 * Stop watching an object property.
 *
 * @param {Object} observable
 * @param {String} propName
 * @param {Function} notifier
 */
        function unwatchProp(observable, propName, notifier) {
            return getInstance(observable).off(propName, notifier);
        }
        /**
 * Notifies watchers of a given Observable property
 *
 * @param {Object} observable
 * @param {String} propName
 */
        function notifyPropWatchers(observable, propName) {
            var watched = getInstance(observable).watched;
            watched[propName] && watched[propName].notify(true);
        }
        /**
 * Adds ObservableObject capabilities to an object.
 *
 * @method ObservableObject.mixin
 *
 * @param {Object} observable
 *
 * @return {Object}
 *  Same object that was given on input will be returned
 */
        function observableMixin(observable) {
            observable && Object(__WEBPACK_IMPORTED_MODULE_5__common__.e)(objectKeys(ObservableObject.prototype), function(method) {
                method in observable && observable[method] === ObservableObject.prototype[method] || objectDefineProperty(observable, method, {
                    value: ObservableObject.prototype[method],
                    enumerable: false,
                    configurable: true
                });
            });
            return observable;
        }
        ObservableObject.createComputed = createComputedProp;
        ObservableObject.mixin = observableMixin;
        /**
 * Default options to the ObservableObject constructor
 *
 * @type Object
 * @name ObservableObject.defaults
 */
        ObservableObject.defaults = {
            watchAll: true,
            deep: true
        };
        /* harmony default export */
        __webpack_exports__.a = ObservableObject;
    }, /* 29 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export getDestroyCallback */
        /* unused harmony export Compose */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__objectExtend__ = __webpack_require__(19);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__dataStore__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__queueCallback__ = __webpack_require__(49);
        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
        }
        function _possibleConstructorReturn(self, call) {
            if (!self) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return !call || "object" !== typeof call && "function" !== typeof call ? self : call;
        }
        function _inherits(subClass, superClass) {
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
        }
        //=========================================================
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_1__dataStore__.a.create();
        var COMMON_DESTROY_METHOD_NAME = [ "destroy", // Compose
        "remove", // DOM Events Listeners
        "off" ];
        // Aliases
        Object.create;
        // return all KEYs of an object, even those that are not iterable
        function objectKeys(prototype) {
            var k = void 0, keys = [];
            for (k in prototype) keys.push(k);
            return keys;
        }
        // Base instance methods for Compose'd object
        var baseMethods = /** @lends Compose.prototype */ {
            /**
     * Property indicating whether instance has been destroyed
     */
            isDestroyed: false,
            /**
     * instance initializing code
     */
            init: function() {},
            /**
     * Destroys the instance, by removing its private data.
     * Any attached `onDestroy` callback will be executed `async` - queued and
     * called on next event loop
     *
     * @param {Boolean} [executeCallbacksNow=false]
     */
            destroy: function(executeCallbacksNow) {
                if (PRIVATE.has(this)) {
                    var destroyCallbacks = PRIVATE.get(this);
                    PRIVATE.delete(this);
                    executeCallbacksNow ? destroyCallbacks.forEach(callOnDestroyCallback) : Object(__WEBPACK_IMPORTED_MODULE_2__queueCallback__.a)(function() {
                        return destroyCallbacks.forEach(callOnDestroyCallback);
                    });
                }
                "boolean" === typeof this.isDestroyed && (this.isDestroyed = true);
            },
            /**
     * Adds a callback to the queue to be called when this object's `.destroy()`
     * is called.
     *
     * @param {Function} callback
     */
            onDestroy: function(callback) {
                getInstanceState(this).push(callback);
            },
            /**
     * Returns the factory for this instance.
     *
     * @return {Compose}
     */
            getFactory: function() {
                if (this.constructor) return this.constructor;
            }
        };
        var staticMethods = /** @lends Compose */ {
            /**
     * Creates an new factory based on the prototye of the current Factory
     * and any other Factory given on input.
     *
     * @return {Compose}
     */
            extend: function() {
                var Class = function(_ref) {
                    _inherits(Class, _ref);
                    function Class() {
                        _classCallCheck(this, Class);
                        return _possibleConstructorReturn(this, (Class.__proto__ || Object.getPrototypeOf(Class)).apply(this, arguments));
                    }
                    return Class;
                }(this);
                for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
                Object(__WEBPACK_IMPORTED_MODULE_0__objectExtend__.a)(Class.prototype, args.reduce(function(newProto, obj) {
                    if (obj) {
                        var thisObjProto = obj.prototype || obj;
                        objectKeys(thisObjProto).forEach(function(objKey) {
                            newProto[objKey] = thisObjProto[objKey];
                        });
                    }
                    return newProto;
                }, {}));
                return Class;
            },
            /**
     * Checks if the Object given on input looks like an instance of this Factory.
     *
     * @return {Boolean}
     */
            isInstanceOf: function(instanceObj) {
                if (!instanceObj) return false;
                var neededKeys = objectKeys(this.prototype);
                // If any prototype key is not in the object prototype, then return false
                return !neededKeys.some(function(protoKey) {
                    return "undefined" === typeof instanceObj[protoKey];
                });
            },
            /**
     * Creates an instance object based on this factory.
     *
     * @return {Object}
     */
            create: function() {
                return new (Function.prototype.bind.apply(this, [ null ].concat(Array.prototype.slice.call(arguments))))();
            },
            /**
     * Returns a standard callback that can be used to remove cleanup instance state
     * from specific Store (WeakMap). Returned function will destroy known Instances
     * that have destroy methods.
     *
     * @param {Object} instanceState
     * @param {WeakMap} [stateStore]
     *
     * @return {Function}
     *
     * @example
     *
     * const MY_PRIVATE = new WeakMap();
     * cont NewWdg = Componse.extend({
     *      init() {
     *          const state = {};
     *          MY_PRIVATE.set(this, state);
     *          ...
     *
     *          this.onDestroy(Compose.getDestroyCallback(state, MY_PRIVATE));
     *      }
     * });
     */
            getDestroyCallback: getDestroyCallback
        };
        /**
 * Returns a standard callback that can be used to remove cleanup instance state
 * from specific Store (WeakMap). Returned function will destroy known Instances
 * that have destroy methods.
 *
 * @method Compose~getDestroyCallback
 *
 * @param {Object} instanceState
 * @param {WeakMap} [stateStore]
 *
 * @return {Function}
 *
 * @example
 *
 * const MY_PRIVATE = new WeakMap();
 * cont NewWdg = Componse.extend({
 *      init() {
 *          const state = {};
 *          MY_PRIVATE.set(this, state);
 *          ...
 *
 *          this.onDestroy(Compose.getDestroyCallback(state, MY_PRIVATE));
 *      }
 * });
 */
        function getDestroyCallback(instanceState, stateStore) {
            return function() {
                instanceState && // Destroy all Compose object
                Object.keys(instanceState).forEach(function(prop) {
                    if (instanceState[prop]) {
                        COMMON_DESTROY_METHOD_NAME.some(function(method) {
                            if (instanceState[prop][method] && ("remove" !== method || !(instanceState[prop] instanceof Node))) {
                                instanceState[prop][method]();
                                return true;
                            }
                        });
                        instanceState[prop] = void 0;
                    }
                });
                stateStore && stateStore.has && stateStore.has(instanceState) && stateStore.delete(instanceState);
            };
        }
        function getInstanceState(inst) {
            PRIVATE.has(inst) || PRIVATE.set(inst, []);
            return PRIVATE.get(inst);
        }
        function callOnDestroyCallback(callback) {
            "function" === typeof callback && callback();
        }
        /**
 * Composes new factory methods from a list of given Objects/Classes.
 *
 * @class Compose
 * @borrows Compose~getDestroyCallback as Compose.getDestroyCallback
 *
 * @example
 *
 * var Widget = Compose.create(Model, Events);
 *
 * myWidget = Widget.create();
 *
 */
        var Compose = function() {
            function ComposeConstructor() {
                for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) args[_key2] = arguments[_key2];
                // Called with `new`?
                if (this && this.constructor && this instanceof this.constructor) return this.init.apply(this, args);
                // called directly
                return new (Function.prototype.bind.apply(ComposeConstructor, [ null ].concat(args)))();
            }
            ComposeConstructor.prototype.constructor = ComposeConstructor;
            return ComposeConstructor;
        }();
        Object(__WEBPACK_IMPORTED_MODULE_0__objectExtend__.a)(Compose.prototype, baseMethods);
        Object(__WEBPACK_IMPORTED_MODULE_0__objectExtend__.a)(Compose, staticMethods);
        /* harmony default export */
        __webpack_exports__.a = Compose;
    }, /* 30 */
    /***/
    function(module, exports) {
        var toString = {}.toString;
        module.exports = function(it) {
            return toString.call(it).slice(8, -1);
        };
    }, /* 31 */
    /***/
    function(module, exports, __webpack_require__) {
        var global = __webpack_require__(1);
        var store = global["__core-js_shared__"] || (global["__core-js_shared__"] = {});
        module.exports = function(key) {
            return store[key] || (store[key] = {});
        };
    }, /* 32 */
    /***/
    function(module, exports, __webpack_require__) {
        module.exports = !__webpack_require__(3) && !__webpack_require__(15)(function() {
            return 7 != Object.defineProperty(__webpack_require__(33)("div"), "a", {
                get: function() {
                    return 7;
                }
            }).a;
        });
    }, /* 33 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(2);
        var document = __webpack_require__(1).document;
        // typeof document.createElement is 'object' in old IE
        var is = isObject(document) && isObject(document.createElement);
        module.exports = function(it) {
            return is ? document.createElement(it) : {};
        };
    }, /* 34 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.1 ToPrimitive(input [, PreferredType])
        var isObject = __webpack_require__(2);
        // instead of the ES6 spec version, we didn't implement @@toPrimitive case
        // and the second argument - flag - preferred type is a string
        module.exports = function(it, S) {
            if (!isObject(it)) return it;
            var fn, val;
            if (S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            if ("function" == typeof (fn = it.valueOf) && !isObject(val = fn.call(it))) return val;
            if (!S && "function" == typeof (fn = it.toString) && !isObject(val = fn.call(it))) return val;
            throw TypeError("Can't convert object to primitive value");
        };
    }, /* 35 */
    /***/
    function(module, exports) {
        module.exports = function(it) {
            if ("function" != typeof it) throw TypeError(it + " is not a function!");
            return it;
        };
    }, /* 36 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
        var anObject = __webpack_require__(8);
        var dPs = __webpack_require__(56);
        var enumBugKeys = __webpack_require__(39);
        var IE_PROTO = __webpack_require__(25)("IE_PROTO");
        var Empty = function() {};
        // Create object with fake `null` prototype: use iframe Object with cleared prototype
        var _createDict = function() {
            // Thrash, waste and sodomy: IE GC bug
            var iframe = __webpack_require__(33)("iframe");
            var i = enumBugKeys.length;
            var iframeDocument;
            iframe.style.display = "none";
            __webpack_require__(61).appendChild(iframe);
            iframe.src = "javascript:";
            // eslint-disable-line no-script-url
            // createDict = iframe.contentWindow.Object;
            // html.removeChild(iframe);
            iframeDocument = iframe.contentWindow.document;
            iframeDocument.open();
            iframeDocument.write("<script>document.F=Object<\/script>");
            iframeDocument.close();
            _createDict = iframeDocument.F;
            for (;i--; ) delete _createDict.prototype[enumBugKeys[i]];
            return _createDict();
        };
        module.exports = Object.create || function(O, Properties) {
            var result;
            if (null !== O) {
                Empty.prototype = anObject(O);
                result = new Empty();
                Empty.prototype = null;
                // add "__proto__" for Object.getPrototypeOf polyfill
                result[IE_PROTO] = O;
            } else result = _createDict();
            return void 0 === Properties ? result : dPs(result, Properties);
        };
    }, /* 37 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.14 / 15.2.3.14 Object.keys(O)
        var $keys = __webpack_require__(57);
        var enumBugKeys = __webpack_require__(39);
        module.exports = Object.keys || function(O) {
            return $keys(O, enumBugKeys);
        };
    }, /* 38 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.15 ToLength
        var toInteger = __webpack_require__(22);
        var min = Math.min;
        module.exports = function(it) {
            return it > 0 ? min(toInteger(it), 9007199254740991) : 0;
        };
    }, /* 39 */
    /***/
    function(module, exports) {
        // IE 8- don't enum bug keys
        module.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
    }, /* 40 */
    /***/
    function(module, exports) {
        module.exports = function(done, value) {
            return {
                value: value,
                done: !!done
            };
        };
    }, /* 41 */
    /***/
    function(module, exports, __webpack_require__) {
        var redefine = __webpack_require__(5);
        module.exports = function(target, src, safe) {
            for (var key in src) redefine(target, key, src[key], safe);
            return target;
        };
    }, /* 42 */
    /***/
    function(module, exports) {
        module.exports = function(it, Constructor, name, forbiddenField) {
            if (!(it instanceof Constructor) || void 0 !== forbiddenField && forbiddenField in it) throw TypeError(name + ": incorrect invocation!");
            return it;
        };
    }, /* 43 */
    /***/
    function(module, exports, __webpack_require__) {
        var _typeof = "function" === typeof Symbol && "symbol" === typeof Symbol.iterator ? function(obj) {
            return typeof obj;
        } : function(obj) {
            return obj && "function" === typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
        };
        var META = __webpack_require__(14)("meta");
        var isObject = __webpack_require__(2);
        var has = __webpack_require__(4);
        var setDesc = __webpack_require__(7).f;
        var id = 0;
        var isExtensible = Object.isExtensible || function() {
            return true;
        };
        var FREEZE = !__webpack_require__(15)(function() {
            return isExtensible(Object.preventExtensions({}));
        });
        var setMeta = function(it) {
            setDesc(it, META, {
                value: {
                    i: "O" + ++id,
                    // object ID
                    w: {}
                }
            });
        };
        var fastKey = function(it, create) {
            // return primitive with prefix
            if (!isObject(it)) return "symbol" == ("undefined" === typeof it ? "undefined" : _typeof(it)) ? it : ("string" == typeof it ? "S" : "P") + it;
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return "F";
                // not necessary to add metadata
                if (!create) return "E";
                // add missing metadata
                setMeta(it);
            }
            return it[META].i;
        };
        var getWeak = function(it, create) {
            if (!has(it, META)) {
                // can't set metadata to uncaught frozen object
                if (!isExtensible(it)) return true;
                // not necessary to add metadata
                if (!create) return false;
                // add missing metadata
                setMeta(it);
            }
            return it[META].w;
        };
        // add metadata on freeze-family methods calling
        var onFreeze = function(it) {
            FREEZE && meta.NEED && isExtensible(it) && !has(it, META) && setMeta(it);
            return it;
        };
        var meta = module.exports = {
            KEY: META,
            NEED: false,
            fastKey: fastKey,
            getWeak: getWeak,
            onFreeze: onFreeze
        };
    }, /* 44 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(2);
        module.exports = function(it, TYPE) {
            if (!isObject(it) || it._t !== TYPE) throw TypeError("Incompatible receiver, " + TYPE + " required!");
            return it;
        };
    }, /* 45 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export EventEmitter */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__Compose__ = __webpack_require__(29);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__dataStore__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__es6_Set__ = __webpack_require__(13);
        //----------------------------------------------------------------
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_1__dataStore__.a.create();
        var arraySlice = Function.call.bind(Array.prototype.slice);
        var isFunction = function(fn) {
            return "function" === typeof fn;
        };
        var objectKeys = Object.keys;
        /**
 * Emits events. Use it to extend other modules and thus add events to them.
 *
 * @class EventEmitter
 * @extends Compose
 */
        var EventEmitter = __WEBPACK_IMPORTED_MODULE_0__Compose__.a.extend(/** @lends EventEmitter.prototype */ {
            /**
     * Add a callback to a given event name
     *
     * @param {String} evName
     *  The event name to be listened to or a list of event sperated by a space.
     *  The EventEmitter instance can be used as the `evName` as well which will
     *  essentially listen to all events.
     *  Note that this special event however, will change the arguments
     *  passed to the callback by pre-pending the Event Name (`String`) and
     *  appending the Component instance.
     *
     * @param {Function} callback
     *  A callback function to listen to the event. The callback function
     *  can cancel any queued event callbacks by returning `true` (boolean).
     *
     * @return {EventEmitter#EventListener}
     *
     * @example
     *
     * events.on("some-event", (...args) => {});
     *
     * // List to all events
     * events.on(events, (evNameTriggered, ...args) => {}
     */
            on: function(evName, callback) {
                var _this = this;
                var _getSetup$call = getSetup.call(this), all = _getSetup$call.all, listeners = _getSetup$call.listeners;
                var events = getEventNameList(evName).reduce(function(eventList, eventName) {
                    var off = void 0;
                    // If eventName is `this` then listen to all events
                    if (eventName === _this) {
                        all.add(callback);
                        off = function() {
                            return all.delete(callback);
                        };
                    } else {
                        eventName in listeners || (listeners[eventName] = new __WEBPACK_IMPORTED_MODULE_2__es6_Set__.a());
                        listeners[eventName].add(callback);
                        off = function() {
                            return listeners[eventName].delete(callback);
                        };
                    }
                    eventList[eventName] = {
                        off: off
                    };
                    return eventList;
                }, {});
                /**
         * EventEmitter Listener object, returned when one of the listener setter methods
         * (ex. `on()`, `once()`, `pipe`) are used.
         *
         * @typedef {Object} EventEmitter~EventListener
         *
         * @property {Object} listeners
         *  An object with the individual listeners. Each respective event listener
         *  has an `off()` method to turn that listener off.
         *
         * @property {Function} off
         *  Remove callback from event.
         */
                var response = {
                    off: function() {
                        objectKeys(events).forEach(function(eventName) {
                            return events[eventName].off();
                        });
                    }
                };
                response.listeners = events;
                return response;
            },
            /**
     * Remove a callback from a given event
     *
     * @param {String} evName
     * @param {Function} callback
     *
     */
            off: function(evName, callback) {
                var _getSetup$call2 = getSetup.call(this), all = _getSetup$call2.all, listeners = _getSetup$call2.listeners;
                if (evName === this) {
                    all.delete(callback);
                    return;
                }
                listeners[evName] && listeners.delete(callback);
            },
            /**
     * Add a callback to a given event name that is executed only once.
     *
     * @param {String} evName
     *  The event name. This can be a list of event delimited with a space. Each
     *  event listeners will be triggered at most once.
     * @param {Function} callback
     *
     * @return {EventEmitter#EventListener}
     */
            once: function(evName, callback) {
                var _this2 = this;
                var events = getEventNameList(evName).reduce(function(eventListeners, eventName) {
                    var eventNameListener = _this2.on(evName, function() {
                        eventNameListener.off();
                        callback.apply(void 0, arguments);
                    });
                    eventListeners[eventName] = eventNameListener;
                    return eventListeners;
                }, {});
                var response = {
                    off: function() {
                        objectKeys(events).forEach(function(eventName) {
                            return events[eventName].off();
                        });
                    }
                };
                response.listeners = events;
                return response;
            },
            /**
     * Emit an event and execute any callback listening. Any of the listening
     * events can cancel the calling of queued callbacks by returning `true`
     * (boolean)
     *
     * @param {String} evName
     *  The event name to be triggered. __NOTE__: can not be a `"*"` or the EventEmitter
     *  instance since they holds special meaning.
     *
     * @param {...*} callbackArgs
     */
            emit: function(evName) {
                if ("*" === evName || evName === this) {
                    console.log("EventEmitter#emit(): can not emit to events to '*'");
                    // jshint ignore:line
                    return;
                }
                var setup = getSetup.call(this);
                var eventListeners = setup.listeners;
                var eventPipes = setup.pipes;
                var eventAll = setup.all;
                var args = arraySlice(arguments, 1);
                var isCanceled = false;
                var callbackHandler = function(callback) {
                    if (isFunction(callback)) {
                        var response = callback.apply(callback, args);
                        // if a boolean true was returned, don't call any more listeners.
                        if (true === response) {
                            isCanceled = true;
                            return true;
                        }
                    }
                };
                // Regular event listeners
                if (eventListeners[evName] && eventListeners[evName].size) {
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = void 0;
                    try {
                        for (var _step, _iterator = eventListeners[evName][Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            var cb = _step.value;
                            if (callbackHandler(cb)) break;
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            !_iteratorNormalCompletion && _iterator.return && _iterator.return();
                        } finally {
                            if (_didIteratorError) throw _iteratorError;
                        }
                    }
                }
                // Event listeners for all events
                if (!isCanceled && ("*" in eventListeners || eventAll.size)) {
                    // Special event "*": pass event name and instance
                    args = arraySlice(arguments, 0);
                    args.push(this);
                    if (eventListeners["*"] && eventListeners["*"].size) {
                        var _iteratorNormalCompletion2 = true;
                        var _didIteratorError2 = false;
                        var _iteratorError2 = void 0;
                        try {
                            for (var _step2, _iterator2 = eventListeners["*"][Symbol.iterator](); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                                var _cb = _step2.value;
                                if (callbackHandler(_cb)) break;
                            }
                        } catch (err) {
                            _didIteratorError2 = true;
                            _iteratorError2 = err;
                        } finally {
                            try {
                                !_iteratorNormalCompletion2 && _iterator2.return && _iterator2.return();
                            } finally {
                                if (_didIteratorError2) throw _iteratorError2;
                            }
                        }
                    }
                    if (eventAll.size) {
                        var _iteratorNormalCompletion3 = true;
                        var _didIteratorError3 = false;
                        var _iteratorError3 = void 0;
                        try {
                            for (var _step3, _iterator3 = eventAll[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                var _cb2 = _step3.value;
                                if (callbackHandler(_cb2)) break;
                            }
                        } catch (err) {
                            _didIteratorError3 = true;
                            _iteratorError3 = err;
                        } finally {
                            try {
                                !_iteratorNormalCompletion3 && _iterator3.return && _iterator3.return();
                            } finally {
                                if (_didIteratorError3) throw _iteratorError3;
                            }
                        }
                    }
                    // set args back to original
                    args = arraySlice(arguments, 1);
                }
                if (eventPipes.size) {
                    var _iteratorNormalCompletion4 = true;
                    var _didIteratorError4 = false;
                    var _iteratorError4 = void 0;
                    try {
                        for (var _step4, _iterator4 = eventPipes[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                            var pipe = _step4.value;
                            pipe && pipe(evName, args);
                        }
                    } catch (err) {
                        _didIteratorError4 = true;
                        _iteratorError4 = err;
                    } finally {
                        try {
                            !_iteratorNormalCompletion4 && _iterator4.return && _iterator4.return();
                        } finally {
                            if (_didIteratorError4) throw _iteratorError4;
                        }
                    }
                }
            },
            /**
     * Emit the events from one instance of EventEmitter to another. Useful
     * for when multiple components are used together as part of a larger
     * component and have the need to emit events to a common EventEmitter.
     *
     * @param {EventEmitter} pipeTo
     *  The EventEmitter instance object to where events should be piped.
     *  Can also be an object/class having an `emit(evName, data)` method.
     *
     * @param {String} [prefix]
     *  If defined, prefix will be added to any event emited. Example:
     *  if defining `foo-` as the prefix, then every event emitted will
     *  prefixed wth this value. So a `click` event on the source will
     *  be piped as `foo-click`.
     *
     * @param {Boolean} [includeInstance=true]
     *  When set to `true` (default), the piped event will include the source
     *  instance as an additional argument to the event that is piped.
     *
     *  @return {EventListener}
     */
            pipe: function(pipeTo, prefix, includeInstance) {
                var _this3 = this;
                if (!pipeTo || !pipeTo.emit) return {
                    off: function() {}
                };
                var pipes = getSetup.call(this).pipes;
                var pipeEvToReceiver = function(triggeredEvName, args) {
                    prefix ? args.unshift(prefix + triggeredEvName) : args.unshift(triggeredEvName);
                    (includeInstance || "undefined" === typeof includeInstance) && args.push(_this3);
                    pipeTo.emit.apply(pipeTo, args);
                };
                pipes.add(pipeEvToReceiver);
                return {
                    off: function() {
                        pipes.delete(pipeEvToReceiver);
                    }
                };
            },
            /**
     * Returns a boolean indicating if the current EventEmitter has listener
     * @returns {Boolean}
     */
            hasListeners: function() {
                var _getSetup$call3 = getSetup.call(this), listeners = _getSetup$call3.listeners, pipes = _getSetup$call3.pipes;
                return objectKeys(listeners).some(function(evName) {
                    return !!listeners[evName].size;
                }) || !!pipes.size;
            }
        });
        /**
 * Returns the instance setup object. Creates it if it does not have one.
 * @private
 * @this EventEmitter
 */
        function getSetup() {
            if (!PRIVATE.has(this)) {
                /*
            listeners: {
                'evName': Set[ Callbacks ]
            },
            pipes: Set[ Callbacks ]
            all: Set[ Callbacks ]
        */
                PRIVATE.set(this, {
                    listeners: {},
                    pipes: new __WEBPACK_IMPORTED_MODULE_2__es6_Set__.a(),
                    all: new __WEBPACK_IMPORTED_MODULE_2__es6_Set__.a()
                });
                // When this object is destroyed, remove all data
                this.onDestroy && this.onDestroy(function() {
                    PRIVATE.has(this) && PRIVATE.delete(this);
                }.bind(this));
            }
            return PRIVATE.get(this);
        }
        function getEventNameList(eventNamesStr) {
            if ("string" === typeof eventNamesStr) return eventNamesStr.split(/\s+/);
            return [ eventNamesStr ];
        }
        /**
 * Adds event emitter functionality to an object
 *
 * @param {Object} target
 */
        EventEmitter.mixin = function(target) {
            target && [ "on", "off", "emit", "once", "pipe" ].forEach(function(method) {
                Object.defineProperty(target, method, {
                    configurable: true,
                    value: EventEmitter.prototype[method].bind(target)
                });
            });
        };
        /* harmony default export */
        __webpack_exports__.a = EventEmitter;
    }, /* 46 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export nextTick */
        var reIsNativeCode = /native code/i;
        /**
 * Executes a function at the end of the current event Loop - during micro-task processing
 *
 * @param {Function} callback
 */
        var nextTick = function() {
            if ("undefined" !== typeof setImediate && reIsNativeCode.test(setImediate.toString())) return setImediate;
            // Native Promsie? Use it.
            if ("function" === typeof Promise && reIsNativeCode.test(Promise.toString())) {
                var resolved = Promise.resolve();
                return function(fn) {
                    resolved.then(fn).catch(function(e) {
                        return console.log(e);
                    });
                };
            }
            // fallback to setTimeout
            // From: https://bugzilla.mozilla.org/show_bug.cgi?id=686201#c68
            var immediates = [];
            var processing = false;
            function processPending() {
                setTimeout(function() {
                    immediates.shift()();
                    immediates.length ? processPending() : processing = false;
                }, 0);
            }
            return function(fn) {
                immediates.push(fn);
                if (!processing) {
                    processing = true;
                    processPending();
                }
            };
        }();
        /* harmony default export */
        __webpack_exports__.a = nextTick;
    }, /* 47 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return PRIVATE;
        });
        /* harmony export (immutable) */
        __webpack_exports__.b = getState;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableObject__ = __webpack_require__(28);
        //============================================================================
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_dataStore__.a.create();
        function getState(instance) {
            if (!PRIVATE.has(instance)) {
                var state = {
                    ready: false,
                    // We have all required params
                    readyWatcher: null,
                    props: instance.props,
                    content: null,
                    destroyCallbacks: [],
                    destroyQueued: null,
                    binder: null,
                    isMounted: false,
                    hasTemplate: false
                };
                // Create all props
                var propDefintions = instance.constructor.__props;
                var required = Object.keys(propDefintions).filter(function(propName) {
                    return propDefintions[propName].required;
                });
                __WEBPACK_IMPORTED_MODULE_1_observable_data_src_ObservableObject__.a.createComputed(state, "ready", function() {
                    // the `instance[propName]` forces the property to be created on the HTML element's instance
                    return !required.length || required.every(function(propName) {
                        return !!instance[propName] && !!state.props[propName];
                    });
                });
                PRIVATE.set(instance, state);
            }
            return PRIVATE.get(instance);
        }
    }, /* 48 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        Object.defineProperty(__webpack_exports__, "__esModule", {
            value: true
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__ComponentElement__ = __webpack_require__(27);
        /* harmony namespace reexport (by provided) */
        __webpack_require__.d(__webpack_exports__, "ComponentElement", function() {
            return __WEBPACK_IMPORTED_MODULE_0__ComponentElement__.a;
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1__decorators__ = __webpack_require__(87);
        /* harmony namespace reexport (by provided) */
        __webpack_require__.d(__webpack_exports__, "prop", function() {
            return __WEBPACK_IMPORTED_MODULE_1__decorators__.a;
        });
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(47);
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "getState", function() {
            return __WEBPACK_IMPORTED_MODULE_2__utils__.b;
        });
        /* harmony reexport (binding) */
        __webpack_require__.d(__webpack_exports__, "default", function() {
            return __WEBPACK_IMPORTED_MODULE_0__ComponentElement__.a;
        });
    }, /* 49 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export queueCallback */
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0__es6_Set__ = __webpack_require__(13);
        function _toConsumableArray(arr) {
            if (Array.isArray(arr)) {
                for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];
                return arr2;
            }
            return Array.from(arr);
        }
        //===============================================
        var callbacks = new __WEBPACK_IMPORTED_MODULE_0__es6_Set__.a();
        var queue = void 0;
        /**
 * Queue a callback to be executed after at the start of next event loop.
 * This differs from `nextTick` in that callbacks are not executed during
 * micro-processing, but rather on next event loop, so this is not ideal
 * for logic that can cause UI reflow.
 *
 * @param {Function} cb
 */
        function queueCallback(cb) {
            if ("function" === typeof cb) {
                callbacks.add(cb);
                queue || (queue = setTimeout(flushQueue, 0));
            }
        }
        /* harmony default export */
        __webpack_exports__.a = queueCallback;
        function flushQueue() {
            var cbList = [].concat(_toConsumableArray(callbacks));
            callbacks.clear();
            queue = null;
            var cb = void 0;
            for (;cb = cbList.shift(); ) {
                cb();
                cb = null;
            }
        }
    }, /* 50 */
    /***/
    function(module, exports, __webpack_require__) {
        __webpack_require__(51);
        __webpack_require__(52);
        __webpack_require__(64);
        __webpack_require__(67);
        __webpack_require__(79);
        __webpack_require__(82);
        __webpack_require__(84);
        module.exports = __webpack_require__(16).Set;
    }, /* 51 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        // 19.1.3.6 Object.prototype.toString()
        var classof = __webpack_require__(20);
        var test = {};
        test[__webpack_require__(0)("toStringTag")] = "z";
        test + "" != "[object z]" && __webpack_require__(5)(Object.prototype, "toString", function() {
            return "[object " + classof(this) + "]";
        }, true);
    }, /* 52 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var $at = __webpack_require__(53)(true);
        // 21.1.3.27 String.prototype[@@iterator]()
        __webpack_require__(24)(String, "String", function(iterated) {
            this._t = String(iterated);
            // target
            this._i = 0;
        }, function() {
            var O = this._t;
            var index = this._i;
            var point;
            if (index >= O.length) return {
                value: void 0,
                done: true
            };
            point = $at(O, index);
            this._i += point.length;
            return {
                value: point,
                done: false
            };
        });
    }, /* 53 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(22);
        var defined = __webpack_require__(23);
        // true  -> String#at
        // false -> String#codePointAt
        module.exports = function(TO_STRING) {
            return function(that, pos) {
                var s = String(defined(that));
                var i = toInteger(pos);
                var l = s.length;
                var a, b;
                if (i < 0 || i >= l) return TO_STRING ? "" : void 0;
                a = s.charCodeAt(i);
                return a < 55296 || a > 56319 || i + 1 === l || (b = s.charCodeAt(i + 1)) < 56320 || b > 57343 ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : b - 56320 + (a - 55296 << 10) + 65536;
            };
        };
    }, /* 54 */
    /***/
    function(module, exports) {
        module.exports = false;
    }, /* 55 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var create = __webpack_require__(36);
        var descriptor = __webpack_require__(21);
        var setToStringTag = __webpack_require__(26);
        var IteratorPrototype = {};
        // 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
        __webpack_require__(6)(IteratorPrototype, __webpack_require__(0)("iterator"), function() {
            return this;
        });
        module.exports = function(Constructor, NAME, next) {
            Constructor.prototype = create(IteratorPrototype, {
                next: descriptor(1, next)
            });
            setToStringTag(Constructor, NAME + " Iterator");
        };
    }, /* 56 */
    /***/
    function(module, exports, __webpack_require__) {
        var dP = __webpack_require__(7);
        var anObject = __webpack_require__(8);
        var getKeys = __webpack_require__(37);
        module.exports = __webpack_require__(3) ? Object.defineProperties : function(O, Properties) {
            anObject(O);
            var keys = getKeys(Properties);
            var length = keys.length;
            var i = 0;
            var P;
            for (;length > i; ) dP.f(O, P = keys[i++], Properties[P]);
            return O;
        };
    }, /* 57 */
    /***/
    function(module, exports, __webpack_require__) {
        var has = __webpack_require__(4);
        var toIObject = __webpack_require__(17);
        var arrayIndexOf = __webpack_require__(59)(false);
        var IE_PROTO = __webpack_require__(25)("IE_PROTO");
        module.exports = function(object, names) {
            var O = toIObject(object);
            var i = 0;
            var result = [];
            var key;
            for (key in O) key != IE_PROTO && has(O, key) && result.push(key);
            // Don't enum bug & hidden keys
            for (;names.length > i; ) has(O, key = names[i++]) && (~arrayIndexOf(result, key) || result.push(key));
            return result;
        };
    }, /* 58 */
    /***/
    function(module, exports, __webpack_require__) {
        // fallback for non-array-like ES3 and non-enumerable old V8 strings
        var cof = __webpack_require__(30);
        // eslint-disable-next-line no-prototype-builtins
        module.exports = Object("z").propertyIsEnumerable(0) ? Object : function(it) {
            return "String" == cof(it) ? it.split("") : Object(it);
        };
    }, /* 59 */
    /***/
    function(module, exports, __webpack_require__) {
        // false -> Array#indexOf
        // true  -> Array#includes
        var toIObject = __webpack_require__(17);
        var toLength = __webpack_require__(38);
        var toAbsoluteIndex = __webpack_require__(60);
        module.exports = function(IS_INCLUDES) {
            return function($this, el, fromIndex) {
                var O = toIObject($this);
                var length = toLength(O.length);
                var index = toAbsoluteIndex(fromIndex, length);
                var value;
                // Array#includes uses SameValueZero equality algorithm
                // eslint-disable-next-line no-self-compare
                if (IS_INCLUDES && el != el) for (;length > index; ) {
                    value = O[index++];
                    // eslint-disable-next-line no-self-compare
                    if (value != value) return true;
                } else for (;length > index; index++) if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
                return !IS_INCLUDES && -1;
            };
        };
    }, /* 60 */
    /***/
    function(module, exports, __webpack_require__) {
        var toInteger = __webpack_require__(22);
        var max = Math.max;
        var min = Math.min;
        module.exports = function(index, length) {
            index = toInteger(index);
            return index < 0 ? max(index + length, 0) : min(index, length);
        };
    }, /* 61 */
    /***/
    function(module, exports, __webpack_require__) {
        var document = __webpack_require__(1).document;
        module.exports = document && document.documentElement;
    }, /* 62 */
    /***/
    function(module, exports, __webpack_require__) {
        // 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
        var has = __webpack_require__(4);
        var toObject = __webpack_require__(63);
        var IE_PROTO = __webpack_require__(25)("IE_PROTO");
        var ObjectProto = Object.prototype;
        module.exports = Object.getPrototypeOf || function(O) {
            O = toObject(O);
            if (has(O, IE_PROTO)) return O[IE_PROTO];
            if ("function" == typeof O.constructor && O instanceof O.constructor) return O.constructor.prototype;
            return O instanceof Object ? ObjectProto : null;
        };
    }, /* 63 */
    /***/
    function(module, exports, __webpack_require__) {
        // 7.1.13 ToObject(argument)
        var defined = __webpack_require__(23);
        module.exports = function(it) {
            return Object(defined(it));
        };
    }, /* 64 */
    /***/
    function(module, exports, __webpack_require__) {
        var $iterators = __webpack_require__(65);
        var getKeys = __webpack_require__(37);
        var redefine = __webpack_require__(5);
        var global = __webpack_require__(1);
        var hide = __webpack_require__(6);
        var Iterators = __webpack_require__(11);
        var wks = __webpack_require__(0);
        var ITERATOR = wks("iterator");
        var TO_STRING_TAG = wks("toStringTag");
        var ArrayValues = Iterators.Array;
        var DOMIterables = {
            CSSRuleList: true,
            // TODO: Not spec compliant, should be false.
            CSSStyleDeclaration: false,
            CSSValueList: false,
            ClientRectList: false,
            DOMRectList: false,
            DOMStringList: false,
            DOMTokenList: true,
            DataTransferItemList: false,
            FileList: false,
            HTMLAllCollection: false,
            HTMLCollection: false,
            HTMLFormElement: false,
            HTMLSelectElement: false,
            MediaList: true,
            // TODO: Not spec compliant, should be false.
            MimeTypeArray: false,
            NamedNodeMap: false,
            NodeList: true,
            PaintRequestList: false,
            Plugin: false,
            PluginArray: false,
            SVGLengthList: false,
            SVGNumberList: false,
            SVGPathSegList: false,
            SVGPointList: false,
            SVGStringList: false,
            SVGTransformList: false,
            SourceBufferList: false,
            StyleSheetList: true,
            // TODO: Not spec compliant, should be false.
            TextTrackCueList: false,
            TextTrackList: false,
            TouchList: false
        };
        for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
            var NAME = collections[i];
            var explicit = DOMIterables[NAME];
            var Collection = global[NAME];
            var proto = Collection && Collection.prototype;
            var key;
            if (proto) {
                proto[ITERATOR] || hide(proto, ITERATOR, ArrayValues);
                proto[TO_STRING_TAG] || hide(proto, TO_STRING_TAG, NAME);
                Iterators[NAME] = ArrayValues;
                if (explicit) for (key in $iterators) proto[key] || redefine(proto, key, $iterators[key], true);
            }
        }
    }, /* 65 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var addToUnscopables = __webpack_require__(66);
        var step = __webpack_require__(40);
        var Iterators = __webpack_require__(11);
        var toIObject = __webpack_require__(17);
        // 22.1.3.4 Array.prototype.entries()
        // 22.1.3.13 Array.prototype.keys()
        // 22.1.3.29 Array.prototype.values()
        // 22.1.3.30 Array.prototype[@@iterator]()
        module.exports = __webpack_require__(24)(Array, "Array", function(iterated, kind) {
            this._t = toIObject(iterated);
            // target
            this._i = 0;
            // next index
            this._k = kind;
        }, function() {
            var O = this._t;
            var kind = this._k;
            var index = this._i++;
            if (!O || index >= O.length) {
                this._t = void 0;
                return step(1);
            }
            if ("keys" == kind) return step(0, index);
            if ("values" == kind) return step(0, O[index]);
            return step(0, [ index, O[index] ]);
        }, "values");
        // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
        Iterators.Arguments = Iterators.Array;
        addToUnscopables("keys");
        addToUnscopables("values");
        addToUnscopables("entries");
    }, /* 66 */
    /***/
    function(module, exports, __webpack_require__) {
        // 22.1.3.31 Array.prototype[@@unscopables]
        var UNSCOPABLES = __webpack_require__(0)("unscopables");
        var ArrayProto = Array.prototype;
        void 0 == ArrayProto[UNSCOPABLES] && __webpack_require__(6)(ArrayProto, UNSCOPABLES, {});
        module.exports = function(key) {
            ArrayProto[UNSCOPABLES][key] = true;
        };
    }, /* 67 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var strong = __webpack_require__(68);
        var validate = __webpack_require__(44);
        // 23.2 Set Objects
        module.exports = __webpack_require__(73)("Set", function(get) {
            return function() {
                return get(this, arguments.length > 0 ? arguments[0] : void 0);
            };
        }, {
            // 23.2.3.1 Set.prototype.add(value)
            add: function(value) {
                return strong.def(validate(this, "Set"), value = 0 === value ? 0 : value, value);
            }
        }, strong);
    }, /* 68 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var dP = __webpack_require__(7).f;
        var create = __webpack_require__(36);
        var redefineAll = __webpack_require__(41);
        var ctx = __webpack_require__(10);
        var anInstance = __webpack_require__(42);
        var forOf = __webpack_require__(18);
        var $iterDefine = __webpack_require__(24);
        var step = __webpack_require__(40);
        var setSpecies = __webpack_require__(72);
        var DESCRIPTORS = __webpack_require__(3);
        var fastKey = __webpack_require__(43).fastKey;
        var validate = __webpack_require__(44);
        var SIZE = DESCRIPTORS ? "_s" : "size";
        var getEntry = function(that, key) {
            // fast case
            var index = fastKey(key);
            var entry;
            if ("F" !== index) return that._i[index];
            // frozen object case
            for (entry = that._f; entry; entry = entry.n) if (entry.k == key) return entry;
        };
        module.exports = {
            getConstructor: function(wrapper, NAME, IS_MAP, ADDER) {
                var C = wrapper(function(that, iterable) {
                    anInstance(that, C, NAME, "_i");
                    that._t = NAME;
                    // collection type
                    that._i = create(null);
                    // index
                    that._f = void 0;
                    // first entry
                    that._l = void 0;
                    // last entry
                    that[SIZE] = 0;
                    // size
                    void 0 != iterable && forOf(iterable, IS_MAP, that[ADDER], that);
                });
                redefineAll(C.prototype, {
                    // 23.1.3.1 Map.prototype.clear()
                    // 23.2.3.2 Set.prototype.clear()
                    clear: function() {
                        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
                            entry.r = true;
                            entry.p && (entry.p = entry.p.n = void 0);
                            delete data[entry.i];
                        }
                        that._f = that._l = void 0;
                        that[SIZE] = 0;
                    },
                    // 23.1.3.3 Map.prototype.delete(key)
                    // 23.2.3.4 Set.prototype.delete(value)
                    delete: function(key) {
                        var that = validate(this, NAME);
                        var entry = getEntry(that, key);
                        if (entry) {
                            var next = entry.n;
                            var prev = entry.p;
                            delete that._i[entry.i];
                            entry.r = true;
                            prev && (prev.n = next);
                            next && (next.p = prev);
                            that._f == entry && (that._f = next);
                            that._l == entry && (that._l = prev);
                            that[SIZE]--;
                        }
                        return !!entry;
                    },
                    // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
                    // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
                    forEach: function(callbackfn) {
                        validate(this, NAME);
                        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : void 0, 3);
                        var entry;
                        for (;entry = entry ? entry.n : this._f; ) {
                            f(entry.v, entry.k, this);
                            // revert to the last existing entry
                            for (;entry && entry.r; ) entry = entry.p;
                        }
                    },
                    // 23.1.3.7 Map.prototype.has(key)
                    // 23.2.3.7 Set.prototype.has(value)
                    has: function(key) {
                        return !!getEntry(validate(this, NAME), key);
                    }
                });
                DESCRIPTORS && dP(C.prototype, "size", {
                    get: function() {
                        return validate(this, NAME)[SIZE];
                    }
                });
                return C;
            },
            def: function(that, key, value) {
                var entry = getEntry(that, key);
                var prev, index;
                // change existing entry
                if (entry) entry.v = value; else {
                    that._l = entry = {
                        i: index = fastKey(key, true),
                        // <- index
                        k: key,
                        // <- key
                        v: value,
                        // <- value
                        p: prev = that._l,
                        // <- previous entry
                        n: void 0,
                        // <- next entry
                        r: false
                    };
                    that._f || (that._f = entry);
                    prev && (prev.n = entry);
                    that[SIZE]++;
                    // add to index
                    "F" !== index && (that._i[index] = entry);
                }
                return that;
            },
            getEntry: getEntry,
            setStrong: function(C, NAME, IS_MAP) {
                // add .keys, .values, .entries, [@@iterator]
                // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
                $iterDefine(C, NAME, function(iterated, kind) {
                    this._t = validate(iterated, NAME);
                    // target
                    this._k = kind;
                    // kind
                    this._l = void 0;
                }, function() {
                    var that = this;
                    var kind = that._k;
                    var entry = that._l;
                    // revert to the last existing entry
                    for (;entry && entry.r; ) entry = entry.p;
                    // get next entry
                    if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
                        // or finish the iteration
                        that._t = void 0;
                        return step(1);
                    }
                    // return step by kind
                    if ("keys" == kind) return step(0, entry.k);
                    if ("values" == kind) return step(0, entry.v);
                    return step(0, [ entry.k, entry.v ]);
                }, IS_MAP ? "entries" : "values", !IS_MAP, true);
                // add [@@species], 23.1.2.2, 23.2.2.2
                setSpecies(NAME);
            }
        };
    }, /* 69 */
    /***/
    function(module, exports, __webpack_require__) {
        // call something on iterator step with safe closing on error
        var anObject = __webpack_require__(8);
        module.exports = function(iterator, fn, value, entries) {
            try {
                return entries ? fn(anObject(value)[0], value[1]) : fn(value);
            } catch (e) {
                var ret = iterator.return;
                void 0 !== ret && anObject(ret.call(iterator));
                throw e;
            }
        };
    }, /* 70 */
    /***/
    function(module, exports, __webpack_require__) {
        // check on default Array iterator
        var Iterators = __webpack_require__(11);
        var ITERATOR = __webpack_require__(0)("iterator");
        var ArrayProto = Array.prototype;
        module.exports = function(it) {
            return void 0 !== it && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
        };
    }, /* 71 */
    /***/
    function(module, exports, __webpack_require__) {
        var classof = __webpack_require__(20);
        var ITERATOR = __webpack_require__(0)("iterator");
        var Iterators = __webpack_require__(11);
        module.exports = __webpack_require__(16).getIteratorMethod = function(it) {
            if (void 0 != it) return it[ITERATOR] || it["@@iterator"] || Iterators[classof(it)];
        };
    }, /* 72 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var global = __webpack_require__(1);
        var dP = __webpack_require__(7);
        var DESCRIPTORS = __webpack_require__(3);
        var SPECIES = __webpack_require__(0)("species");
        module.exports = function(KEY) {
            var C = global[KEY];
            DESCRIPTORS && C && !C[SPECIES] && dP.f(C, SPECIES, {
                configurable: true,
                get: function() {
                    return this;
                }
            });
        };
    }, /* 73 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        var global = __webpack_require__(1);
        var $export = __webpack_require__(9);
        var redefine = __webpack_require__(5);
        var redefineAll = __webpack_require__(41);
        var meta = __webpack_require__(43);
        var forOf = __webpack_require__(18);
        var anInstance = __webpack_require__(42);
        var isObject = __webpack_require__(2);
        var fails = __webpack_require__(15);
        var $iterDetect = __webpack_require__(74);
        var setToStringTag = __webpack_require__(26);
        var inheritIfRequired = __webpack_require__(75);
        module.exports = function(NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
            var Base = global[NAME];
            var C = Base;
            var ADDER = IS_MAP ? "set" : "add";
            var proto = C && C.prototype;
            var O = {};
            var fixMethod = function(KEY) {
                var fn = proto[KEY];
                redefine(proto, KEY, "delete" == KEY ? function(a) {
                    return !(IS_WEAK && !isObject(a)) && fn.call(this, 0 === a ? 0 : a);
                } : "has" == KEY ? function(a) {
                    return !(IS_WEAK && !isObject(a)) && fn.call(this, 0 === a ? 0 : a);
                } : "get" == KEY ? function(a) {
                    return IS_WEAK && !isObject(a) ? void 0 : fn.call(this, 0 === a ? 0 : a);
                } : "add" == KEY ? function(a) {
                    fn.call(this, 0 === a ? 0 : a);
                    return this;
                } : function(a, b) {
                    fn.call(this, 0 === a ? 0 : a, b);
                    return this;
                });
            };
            if ("function" == typeof C && (IS_WEAK || proto.forEach && !fails(function() {
                new C().entries().next();
            }))) {
                var instance = new C();
                // early implementations not supports chaining
                var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
                // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
                var THROWS_ON_PRIMITIVES = fails(function() {
                    instance.has(1);
                });
                // most early implementations doesn't supports iterables, most modern - not close it correctly
                var ACCEPT_ITERABLES = $iterDetect(function(iter) {
                    new C(iter);
                });
                // eslint-disable-line no-new
                // for early implementations -0 and +0 not the same
                var BUGGY_ZERO = !IS_WEAK && fails(function() {
                    // V8 ~ Chromium 42- fails only with 5+ elements
                    var $instance = new C();
                    var index = 5;
                    for (;index--; ) $instance[ADDER](index, index);
                    return !$instance.has(-0);
                });
                if (!ACCEPT_ITERABLES) {
                    C = wrapper(function(target, iterable) {
                        anInstance(target, C, NAME);
                        var that = inheritIfRequired(new Base(), target, C);
                        void 0 != iterable && forOf(iterable, IS_MAP, that[ADDER], that);
                        return that;
                    });
                    C.prototype = proto;
                    proto.constructor = C;
                }
                if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
                    fixMethod("delete");
                    fixMethod("has");
                    IS_MAP && fixMethod("get");
                }
                (BUGGY_ZERO || HASNT_CHAINING) && fixMethod(ADDER);
                // weak collections should not contains .clear method
                IS_WEAK && proto.clear && delete proto.clear;
            } else {
                // create collection constructor
                C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
                redefineAll(C.prototype, methods);
                meta.NEED = true;
            }
            setToStringTag(C, NAME);
            O[NAME] = C;
            $export($export.G + $export.W + $export.F * (C != Base), O);
            IS_WEAK || common.setStrong(C, NAME, IS_MAP);
            return C;
        };
    }, /* 74 */
    /***/
    function(module, exports, __webpack_require__) {
        var ITERATOR = __webpack_require__(0)("iterator");
        var SAFE_CLOSING = false;
        try {
            var riter = [ 7 ][ITERATOR]();
            riter.return = function() {
                SAFE_CLOSING = true;
            };
            // eslint-disable-next-line no-throw-literal
            Array.from(riter, function() {
                throw 2;
            });
        } catch (e) {}
        module.exports = function(exec, skipClosing) {
            if (!skipClosing && !SAFE_CLOSING) return false;
            var safe = false;
            try {
                var arr = [ 7 ];
                var iter = arr[ITERATOR]();
                iter.next = function() {
                    return {
                        done: safe = true
                    };
                };
                arr[ITERATOR] = function() {
                    return iter;
                };
                exec(arr);
            } catch (e) {}
            return safe;
        };
    }, /* 75 */
    /***/
    function(module, exports, __webpack_require__) {
        var isObject = __webpack_require__(2);
        var setPrototypeOf = __webpack_require__(76).set;
        module.exports = function(that, target, C) {
            var S = target.constructor;
            var P;
            S !== C && "function" == typeof S && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf && setPrototypeOf(that, P);
            return that;
        };
    }, /* 76 */
    /***/
    function(module, exports, __webpack_require__) {
        // Works with __proto__ only. Old v8 can't work with null proto objects.
        /* eslint-disable no-proto */
        var isObject = __webpack_require__(2);
        var anObject = __webpack_require__(8);
        var check = function(O, proto) {
            anObject(O);
            if (!isObject(proto) && null !== proto) throw TypeError(proto + ": can't set as prototype!");
        };
        module.exports = {
            set: Object.setPrototypeOf || ("__proto__" in {} ? // eslint-disable-line
            function(test, buggy, set) {
                try {
                    set = __webpack_require__(10)(Function.call, __webpack_require__(77).f(Object.prototype, "__proto__").set, 2);
                    set(test, []);
                    buggy = !(test instanceof Array);
                } catch (e) {
                    buggy = true;
                }
                return function(O, proto) {
                    check(O, proto);
                    buggy ? O.__proto__ = proto : set(O, proto);
                    return O;
                };
            }({}, false) : void 0),
            check: check
        };
    }, /* 77 */
    /***/
    function(module, exports, __webpack_require__) {
        var pIE = __webpack_require__(78);
        var createDesc = __webpack_require__(21);
        var toIObject = __webpack_require__(17);
        var toPrimitive = __webpack_require__(34);
        var has = __webpack_require__(4);
        var IE8_DOM_DEFINE = __webpack_require__(32);
        var gOPD = Object.getOwnPropertyDescriptor;
        exports.f = __webpack_require__(3) ? gOPD : function(O, P) {
            O = toIObject(O);
            P = toPrimitive(P, true);
            if (IE8_DOM_DEFINE) try {
                return gOPD(O, P);
            } catch (e) {}
            if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
        };
    }, /* 78 */
    /***/
    function(module, exports) {
        exports.f = {}.propertyIsEnumerable;
    }, /* 79 */
    /***/
    function(module, exports, __webpack_require__) {
        // https://github.com/DavidBruant/Map-Set.prototype.toJSON
        var $export = __webpack_require__(9);
        $export($export.P + $export.R, "Set", {
            toJSON: __webpack_require__(80)("Set")
        });
    }, /* 80 */
    /***/
    function(module, exports, __webpack_require__) {
        // https://github.com/DavidBruant/Map-Set.prototype.toJSON
        var classof = __webpack_require__(20);
        var from = __webpack_require__(81);
        module.exports = function(NAME) {
            return function() {
                if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
                return from(this);
            };
        };
    }, /* 81 */
    /***/
    function(module, exports, __webpack_require__) {
        var forOf = __webpack_require__(18);
        module.exports = function(iter, ITERATOR) {
            var result = [];
            forOf(iter, false, result.push, result, ITERATOR);
            return result;
        };
    }, /* 82 */
    /***/
    function(module, exports, __webpack_require__) {
        // https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
        __webpack_require__(83)("Set");
    }, /* 83 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        // https://tc39.github.io/proposal-setmap-offrom/
        var $export = __webpack_require__(9);
        module.exports = function(COLLECTION) {
            $export($export.S, COLLECTION, {
                of: function() {
                    var length = arguments.length;
                    var A = new Array(length);
                    for (;length--; ) A[length] = arguments[length];
                    return new this(A);
                }
            });
        };
    }, /* 84 */
    /***/
    function(module, exports, __webpack_require__) {
        // https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
        __webpack_require__(85)("Set");
    }, /* 85 */
    /***/
    function(module, exports, __webpack_require__) {
        "use strict";
        // https://tc39.github.io/proposal-setmap-offrom/
        var $export = __webpack_require__(9);
        var aFunction = __webpack_require__(35);
        var ctx = __webpack_require__(10);
        var forOf = __webpack_require__(18);
        module.exports = function(COLLECTION) {
            $export($export.S, COLLECTION, {
                from: function(source) {
                    var mapFn = arguments[1];
                    var mapping, A, n, cb;
                    aFunction(this);
                    mapping = void 0 !== mapFn;
                    mapping && aFunction(mapFn);
                    if (void 0 == source) return new this();
                    A = [];
                    if (mapping) {
                        n = 0;
                        cb = ctx(mapFn, arguments[2], 2);
                        forOf(source, false, function(nextItem) {
                            A.push(cb(nextItem, n++));
                        });
                    } else forOf(source, false, A.push, A);
                    return new this(A);
                }
            });
        };
    }, /* 86 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "d", function() {
            return PRIVATE;
        });
        /* unused harmony export INTERNAL_EVENTS */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return EV_STOP_DEPENDEE_NOTIFICATION;
        });
        /* unused harmony export ARRAY_PROTOTYPE */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "c", function() {
            return OBJECT_PROTOTYPE;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "b", function() {
            return IS_COMPUTED_NOTIFIER;
        });
        /* unused harmony export OBSERVABLE_FLAG */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "f", function() {
            return bindCallTo;
        });
        /* unused harmony export dependeeList */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "h", function() {
            return onInternalEvent;
        });
        /* unused harmony export emitInternalEvent */
        /* unused harmony export isArray */
        /* unused harmony export arrayIndexOf */
        /* unused harmony export arraySplice */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "e", function() {
            return arrayForEach;
        });
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "g", function() {
            return isPureObject;
        });
        /* unused harmony export isObservable */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "k", function() {
            return setObservableFlag;
        });
        /* harmony export (immutable) */
        __webpack_exports__.j = setDependencyTracker;
        /* harmony export (immutable) */
        __webpack_exports__.n = unsetDependencyTracker;
        /* harmony export (immutable) */
        __webpack_exports__.l = stopDependeeNotifications;
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "i", function() {
            return queueDependeeNotifier;
        });
        /* harmony export (immutable) */
        __webpack_exports__.m = storeDependeeNotifiers;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__ = __webpack_require__(45);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__ = __webpack_require__(46);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__ = __webpack_require__(12);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_Set__ = __webpack_require__(13);
        //=======================================================================
        var NOOP = function() {};
        var PRIVATE = __WEBPACK_IMPORTED_MODULE_2_common_micro_libs_src_jsutils_dataStore__.a.create();
        var INTERNAL_EVENTS = __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_EventEmitter__.a.create();
        var EV_STOP_DEPENDEE_NOTIFICATION = "1";
        var ARRAY_PROTOTYPE = Array.prototype;
        var OBJECT_PROTOTYPE = Object.prototype;
        var IS_COMPUTED_NOTIFIER = "__od_cn__";
        var bindCallTo = Function.call.bind.bind(Function.call);
        var dependeeList = new __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_Set__.a();
        var onInternalEvent = INTERNAL_EVENTS.on.bind(INTERNAL_EVENTS);
        var emitInternalEvent = INTERNAL_EVENTS.emit.bind(INTERNAL_EVENTS);
        Array.isArray;
        bindCallTo(ARRAY_PROTOTYPE.indexOf);
        bindCallTo(ARRAY_PROTOTYPE.splice);
        var arrayForEach = bindCallTo(ARRAY_PROTOTYPE.forEach);
        var isPureObject = function(obj) {
            return obj && "[object Object]" === OBJECT_PROTOTYPE.toString.call(obj);
        };
        var setObservableFlag = function(obj) {
            return obj && Object.defineProperty(obj, "___observable_data___", {
                get: function() {
                    return NOOP;
                }
            });
        };
        /**
 * Allows for adding a Dependee notifier to the global list of dependency trackers.
 *
 * @param {Function} dependeeNotifier
 */
        function setDependencyTracker(dependeeNotifier) {
            dependeeNotifier && dependeeList.add(dependeeNotifier);
        }
        /**
 * Removes a Dependee notifier from the global list of dependency trackers.
 *
 * @param {Function} dependeeNotifier
 */
        function unsetDependencyTracker(dependeeNotifier) {
            if (!dependeeNotifier) return;
            dependeeList.delete(dependeeNotifier);
        }
        /**
 * Removes a Dependee notifier from any stored ObservableProperty list of dependees, thus
 * stopping all notifications to that depenedee.
 *
 * @param {Function} dependeeNotifier
 */
        function stopDependeeNotifications(dependeeNotifier) {
            dependeeNotifier && emitInternalEvent(EV_STOP_DEPENDEE_NOTIFICATION, dependeeNotifier);
        }
        var queueDependeeNotifier = function() {
            var dependeeNotifiers = new __WEBPACK_IMPORTED_MODULE_3_common_micro_libs_src_jsutils_es6_Set__.a();
            var execNotifiers = function() {
                dependeeNotifiers.forEach(function(notifierCb) {
                    return notifierCb();
                });
                dependeeNotifiers.clear();
            };
            return function(notifierCb) {
                // Computed property notifiers are lightweight, so execute
                // these now and don't queue them.
                if (notifierCb[IS_COMPUTED_NOTIFIER]) {
                    notifierCb();
                    return;
                }
                if (!notifierCb || dependeeNotifiers.has(notifierCb)) return;
                var callNextTick = !dependeeNotifiers.size;
                dependeeNotifiers.add(notifierCb);
                callNextTick && Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_nextTick__.a)(execNotifiers);
            };
        }();
        function storeDependeeNotifiers(store) {
            store && dependeeList.size && dependeeList.forEach(function(dependeeCallback) {
                return store.add(dependeeCallback);
            });
        }
    }, /* 87 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* harmony export (immutable) */
        __webpack_exports__.a = prop;
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__ = __webpack_require__(19);
        /* harmony import */
        var __WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_runtime_aliases__ = __webpack_require__(88);
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
            Object(__WEBPACK_IMPORTED_MODULE_0_common_micro_libs_src_jsutils_objectExtend__.a)(getPropDef(Proto, prop), options);
            descriptor.get = descriptor.set = lazyProp(prop, descriptor.get, descriptor.set);
            return descriptor;
        }
        function getClassProps(Proto) {
            Proto.constructor.__props || Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_runtime_aliases__.a)(Proto.constructor, "__props", {
                configurable: true,
                value: {}
            });
            return Proto.constructor.__props;
        }
        function getPropDef(Proto, name) {
            var classProps = getClassProps(Proto);
            classProps[name] || (classProps[name] = {
                name: name,
                attr: false,
                required: false
            });
            return classProps[name];
        }
        /**
 * Return a getter/setter function to be used in a Property descriptor. When invoked first time as
 * part of an instance, it will setup the actually get/set function that will persist Props to the
 * instance `instance.props`
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
            var $propName = "_$" + propName;
            return function() {
                var isUpdateMode = 1 === arguments.length;
                if (-1 !== Object.getOwnPropertyNames(this).indexOf($propName)) return isUpdateMode ? this[$propName] = arguments[0] : this[$propName];
                Object(__WEBPACK_IMPORTED_MODULE_1_common_micro_libs_src_jsutils_runtime_aliases__.a)(this, $propName, {
                    configurable: true,
                    get: function() {
                        return this.props[propName];
                    },
                    set: function(newValue) {
                        setter && (newValue = setter.call(this, newValue));
                        return this.props[propName] = newValue;
                    }
                });
                this.props[propName] = getter();
                // update mode
                if (isUpdateMode) return this[$propName] = arguments[0];
                return this[$propName];
            };
        }
    }, /* 88 */
    /***/
    function(module, __webpack_exports__, __webpack_require__) {
        "use strict";
        /* unused harmony export functionBind */
        /* unused harmony export functionBindCall */
        /* harmony export (binding) */
        __webpack_require__.d(__webpack_exports__, "a", function() {
            return objectDefineProperty;
        });
        /* unused harmony export objectDefineProperties */
        /* unused harmony export objectKeys */
        /* unused harmony export arrayForEach */
        /* unused harmony export arrayIndexOf */
        /* unused harmony export arraySplice */
        // Function
        // functionBind(fn, fnParent)
        var functionBind = Function.bind.call.bind(Function.bind);
        // functionBindCall(Array.prototype.forEach)
        var functionBindCall = functionBind(Function.call.bind, Function.call);
        // Object
        var objectDefineProperty = Object.defineProperty;
        Object.defineProperties;
        Object.keys;
        // Array
        var arr = [];
        functionBindCall(arr.forEach);
        functionBindCall(arr.indexOf);
        functionBindCall(arr.splice);
    } ]);
});
//# sourceMappingURL=component-element.js.map