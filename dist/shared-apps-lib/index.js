import { jsx, Fragment } from 'react/jsx-runtime';
import React, { useMemo, useState, useEffect, memo, Suspense } from 'react';
import { toast } from 'react-toastify';
import watchRTC from '@testrtc/watchrtc-sdk';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$n =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var objectGetOwnPropertyDescriptor = {};

var fails$k = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$j = fails$k;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$j(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var fails$i = fails$k;

var functionBindNative = !fails$i(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var call$j = Function.prototype.call;

var functionCall = NATIVE_BIND$3 ? call$j.bind(call$j) : function () {
  return call$j.apply(call$j, arguments);
};

var objectPropertyIsEnumerable = {};

var $propertyIsEnumerable = {}.propertyIsEnumerable;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor$4 = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor$4 && !$propertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.es/ecma262/#sec-object.prototype.propertyisenumerable
objectPropertyIsEnumerable.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor$4(this, V);
  return !!descriptor && descriptor.enumerable;
} : $propertyIsEnumerable;

var createPropertyDescriptor$5 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var NATIVE_BIND$2 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var call$i = FunctionPrototype$2.call;
var uncurryThisWithBind = NATIVE_BIND$2 && FunctionPrototype$2.bind.bind(call$i, call$i);

var functionUncurryThis = NATIVE_BIND$2 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$i.apply(fn, arguments);
  };
};

var uncurryThis$j = functionUncurryThis;

var toString$8 = uncurryThis$j({}.toString);
var stringSlice$3 = uncurryThis$j(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$3(toString$8(it), 8, -1);
};

var uncurryThis$i = functionUncurryThis;
var fails$h = fails$k;
var classof$8 = classofRaw$2;

var $Object$4 = Object;
var split$1 = uncurryThis$i(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$h(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$8(it) == 'String' ? split$1(it, '') : $Object$4(it);
} : $Object$4;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$6 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$5 = isNullOrUndefined$6;

var $TypeError$f = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$7 = function (it) {
  if (isNullOrUndefined$5(it)) throw $TypeError$f("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$2 = indexedObject;
var requireObjectCoercible$6 = requireObjectCoercible$7;

var toIndexedObject$5 = function (it) {
  return IndexedObject$2(requireObjectCoercible$6(it));
};

var documentAll$2 = typeof document == 'object' && document.all;

// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot
// eslint-disable-next-line unicorn/no-typeof-undefined -- required for testing
var IS_HTMLDDA = typeof documentAll$2 == 'undefined' && documentAll$2 !== undefined;

var documentAll_1 = {
  all: documentAll$2,
  IS_HTMLDDA: IS_HTMLDDA
};

var $documentAll$1 = documentAll_1;

var documentAll$1 = $documentAll$1.all;

// `IsCallable` abstract operation
// https://tc39.es/ecma262/#sec-iscallable
var isCallable$m = $documentAll$1.IS_HTMLDDA ? function (argument) {
  return typeof argument == 'function' || argument === documentAll$1;
} : function (argument) {
  return typeof argument == 'function';
};

var isCallable$l = isCallable$m;
var $documentAll = documentAll_1;

var documentAll = $documentAll.all;

var isObject$a = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable$l(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable$l(it);
};

var global$m = global$n;
var isCallable$k = isCallable$m;

var aFunction = function (argument) {
  return isCallable$k(argument) ? argument : undefined;
};

var getBuiltIn$8 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$m[namespace]) : global$m[namespace] && global$m[namespace][method];
};

var uncurryThis$h = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$h({}.isPrototypeOf);

var getBuiltIn$7 = getBuiltIn$8;

var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

var global$l = global$n;
var userAgent$3 = engineUserAgent;

var process$4 = global$l.process;
var Deno$1 = global$l.Deno;
var versions = process$4 && process$4.versions || Deno$1 && Deno$1.version;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  // in old Chrome, versions of V8 isn't V8 = Chrome / 10
  // but their correct versions are not interesting for us
  version = match[0] > 0 && match[0] < 4 ? 1 : +(match[0] + match[1]);
}

// BrowserFS NodeJS `process` polyfill incorrectly set `.v8` to `0.0`
// so check `userAgent` even if `.v8` exists, but 0
if (!version && userAgent$3) {
  match = userAgent$3.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$3.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$1 = engineV8Version;
var fails$g = fails$k;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$g(function () {
  var symbol = Symbol();
  // Chrome 38 Symbol has incorrect toString conversion
  // `get-own-property-symbols` polyfill symbols converted to object are not Symbol instances
  return !String(symbol) || !(Object(symbol) instanceof Symbol) ||
    // Chrome 38-40 symbols are not inherited from DOM collections prototypes to instances
    !Symbol.sham && V8_VERSION$1 && V8_VERSION$1 < 41;
});

/* eslint-disable es/no-symbol -- required for testing */

var NATIVE_SYMBOL$1 = symbolConstructorDetection;

var useSymbolAsUid = NATIVE_SYMBOL$1
  && !Symbol.sham
  && typeof Symbol.iterator == 'symbol';

var getBuiltIn$6 = getBuiltIn$8;
var isCallable$j = isCallable$m;
var isPrototypeOf$2 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var $Object$3 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID$1 ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$6('Symbol');
  return isCallable$j($Symbol) && isPrototypeOf$2($Symbol.prototype, $Object$3(it));
};

var $String$3 = String;

var tryToString$4 = function (argument) {
  try {
    return $String$3(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$i = isCallable$m;
var tryToString$3 = tryToString$4;

var $TypeError$e = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$8 = function (argument) {
  if (isCallable$i(argument)) return argument;
  throw $TypeError$e(tryToString$3(argument) + ' is not a function');
};

var aCallable$7 = aCallable$8;
var isNullOrUndefined$4 = isNullOrUndefined$6;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$5 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$4(func) ? undefined : aCallable$7(func);
};

var call$h = functionCall;
var isCallable$h = isCallable$m;
var isObject$9 = isObject$a;

var $TypeError$d = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$h(fn = input.toString) && !isObject$9(val = call$h(fn, input))) return val;
  if (isCallable$h(fn = input.valueOf) && !isObject$9(val = call$h(fn, input))) return val;
  if (pref !== 'string' && isCallable$h(fn = input.toString) && !isObject$9(val = call$h(fn, input))) return val;
  throw $TypeError$d("Can't convert object to primitive value");
};

var shared$4 = {exports: {}};

var isPure = false;

var global$k = global$n;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$5 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$5(global$k, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$k[key] = value;
  } return value;
};

var global$j = global$n;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$j[SHARED] || defineGlobalProperty$2(SHARED, {});

var sharedStore = store$3;

var store$2 = sharedStore;

(shared$4.exports = function (key, value) {
  return store$2[key] || (store$2[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.27.1',
  mode: 'global',
  copyright: '© 2014-2022 Denis Pushkarev (zloirock.ru)',
  license: 'https://github.com/zloirock/core-js/blob/v3.27.1/LICENSE',
  source: 'https://github.com/zloirock/core-js'
});

var requireObjectCoercible$5 = requireObjectCoercible$7;

var $Object$2 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$4 = function (argument) {
  return $Object$2(requireObjectCoercible$5(argument));
};

var uncurryThis$g = functionUncurryThis;
var toObject$3 = toObject$4;

var hasOwnProperty = uncurryThis$g({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$3(it), key);
};

var uncurryThis$f = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$7 = uncurryThis$f(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$7(++id + postfix, 36);
};

var global$i = global$n;
var shared$3 = shared$4.exports;
var hasOwn$a = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var WellKnownSymbolsStore = shared$3('wks');
var Symbol$1 = global$i.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$j = function (name) {
  if (!hasOwn$a(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$a(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var call$g = functionCall;
var isObject$8 = isObject$a;
var isSymbol$1 = isSymbol$2;
var getMethod$4 = getMethod$5;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$i = wellKnownSymbol$j;

var $TypeError$c = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$i('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$8(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$g(exoticToPrim, input, pref);
    if (!isObject$8(result) || isSymbol$1(result)) return result;
    throw $TypeError$c("Can't convert object to primitive value");
  }
  if (pref === undefined) pref = 'number';
  return ordinaryToPrimitive(input, pref);
};

var toPrimitive = toPrimitive$1;
var isSymbol = isSymbol$2;

// `ToPropertyKey` abstract operation
// https://tc39.es/ecma262/#sec-topropertykey
var toPropertyKey$3 = function (argument) {
  var key = toPrimitive(argument, 'string');
  return isSymbol(key) ? key : key + '';
};

var global$h = global$n;
var isObject$7 = isObject$a;

var document$3 = global$h.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$7(document$3) && isObject$7(document$3.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$b = descriptors;
var fails$f = fails$k;
var createElement$1 = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$b && !fails$f(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var DESCRIPTORS$a = descriptors;
var call$f = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$4 = createPropertyDescriptor$5;
var toIndexedObject$4 = toIndexedObject$5;
var toPropertyKey$2 = toPropertyKey$3;
var hasOwn$9 = hasOwnProperty_1;
var IE8_DOM_DEFINE$1 = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$a ? $getOwnPropertyDescriptor$1 : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$4(O);
  P = toPropertyKey$2(P);
  if (IE8_DOM_DEFINE$1) try {
    return $getOwnPropertyDescriptor$1(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$9(O, P)) return createPropertyDescriptor$4(!call$f(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var objectDefineProperty = {};

var DESCRIPTORS$9 = descriptors;
var fails$e = fails$k;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$9 && fails$e(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var isObject$6 = isObject$a;

var $String$2 = String;
var $TypeError$b = TypeError;

// `Assert: Type(argument) is Object`
var anObject$f = function (argument) {
  if (isObject$6(argument)) return argument;
  throw $TypeError$b($String$2(argument) + ' is not an object');
};

var DESCRIPTORS$8 = descriptors;
var IE8_DOM_DEFINE = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$e = anObject$f;
var toPropertyKey$1 = toPropertyKey$3;

var $TypeError$a = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$8 ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$e(O);
  P = toPropertyKey$1(P);
  anObject$e(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor(O, P);
    if (current && current[WRITABLE]) {
      O[P] = Attributes.value;
      Attributes = {
        configurable: CONFIGURABLE$1 in Attributes ? Attributes[CONFIGURABLE$1] : current[CONFIGURABLE$1],
        enumerable: ENUMERABLE in Attributes ? Attributes[ENUMERABLE] : current[ENUMERABLE],
        writable: false
      };
    }
  } return $defineProperty(O, P, Attributes);
} : $defineProperty : function defineProperty(O, P, Attributes) {
  anObject$e(O);
  P = toPropertyKey$1(P);
  anObject$e(Attributes);
  if (IE8_DOM_DEFINE) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$a('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var DESCRIPTORS$7 = descriptors;
var definePropertyModule$5 = objectDefineProperty;
var createPropertyDescriptor$3 = createPropertyDescriptor$5;

var createNonEnumerableProperty$5 = DESCRIPTORS$7 ? function (object, key, value) {
  return definePropertyModule$5.f(object, key, createPropertyDescriptor$3(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var makeBuiltIn$2 = {exports: {}};

var DESCRIPTORS$6 = descriptors;
var hasOwn$8 = hasOwnProperty_1;

var FunctionPrototype$1 = Function.prototype;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getDescriptor = DESCRIPTORS$6 && Object.getOwnPropertyDescriptor;

var EXISTS = hasOwn$8(FunctionPrototype$1, 'name');
// additional protection from minified / mangled / dropped function names
var PROPER = EXISTS && (function something() { /* empty */ }).name === 'something';
var CONFIGURABLE = EXISTS && (!DESCRIPTORS$6 || (DESCRIPTORS$6 && getDescriptor(FunctionPrototype$1, 'name').configurable));

var functionName = {
  EXISTS: EXISTS,
  PROPER: PROPER,
  CONFIGURABLE: CONFIGURABLE
};

var uncurryThis$e = functionUncurryThis;
var isCallable$g = isCallable$m;
var store$1 = sharedStore;

var functionToString = uncurryThis$e(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$g(store$1.inspectSource)) {
  store$1.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store$1.inspectSource;

var global$g = global$n;
var isCallable$f = isCallable$m;

var WeakMap$1 = global$g.WeakMap;

var weakMapBasicDetection = isCallable$f(WeakMap$1) && /native code/.test(String(WeakMap$1));

var shared$2 = shared$4.exports;
var uid = uid$2;

var keys = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

var hiddenKeys$4 = {};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$f = global$n;
var isObject$5 = isObject$a;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$7 = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$2 = sharedKey$3;
var hiddenKeys$3 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$3 = global$f.TypeError;
var WeakMap = global$f.WeakMap;
var set$1, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$5(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$3('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store = shared$1.state || (shared$1.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store.get = store.get;
  store.has = store.has;
  store.set = store.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set$1 = function (it, metadata) {
    if (store.has(it)) throw TypeError$3(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store.get(it) || {};
  };
  has = function (it) {
    return store.has(it);
  };
} else {
  var STATE = sharedKey$2('state');
  hiddenKeys$3[STATE] = true;
  set$1 = function (it, metadata) {
    if (hasOwn$7(it, STATE)) throw TypeError$3(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$7(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$7(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var fails$d = fails$k;
var isCallable$e = isCallable$m;
var hasOwn$6 = hasOwnProperty_1;
var DESCRIPTORS$5 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$3;
var InternalStateModule$3 = internalState;

var enforceInternalState = InternalStateModule$3.enforce;
var getInternalState$2 = InternalStateModule$3.get;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$4 = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS$5 && !fails$d(function () {
  return defineProperty$4(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$1 = makeBuiltIn$2.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$6(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
    if (DESCRIPTORS$5) defineProperty$4(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$6(options, 'arity') && value.length !== options.arity) {
    defineProperty$4(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$6(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$5) defineProperty$4(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$6(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$1(function toString() {
  return isCallable$e(this) && getInternalState$2(this).source || inspectSource$2(this);
}, 'toString');

var isCallable$d = isCallable$m;
var definePropertyModule$4 = objectDefineProperty;
var makeBuiltIn = makeBuiltIn$2.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$8 = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$d(value)) makeBuiltIn(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$4.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var ceil = Math.ceil;
var floor$1 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$1 : ceil)(n);
};

var trunc = mathTrunc;

// `ToIntegerOrInfinity` abstract operation
// https://tc39.es/ecma262/#sec-tointegerorinfinity
var toIntegerOrInfinity$3 = function (argument) {
  var number = +argument;
  // eslint-disable-next-line no-self-compare -- NaN check
  return number !== number || number === 0 ? 0 : trunc(number);
};

var toIntegerOrInfinity$2 = toIntegerOrInfinity$3;

var max$1 = Math.max;
var min$2 = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
var toAbsoluteIndex$2 = function (index, length) {
  var integer = toIntegerOrInfinity$2(index);
  return integer < 0 ? max$1(integer + length, 0) : min$2(integer, length);
};

var toIntegerOrInfinity$1 = toIntegerOrInfinity$3;

var min$1 = Math.min;

// `ToLength` abstract operation
// https://tc39.es/ecma262/#sec-tolength
var toLength$3 = function (argument) {
  return argument > 0 ? min$1(toIntegerOrInfinity$1(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};

var toLength$2 = toLength$3;

// `LengthOfArrayLike` abstract operation
// https://tc39.es/ecma262/#sec-lengthofarraylike
var lengthOfArrayLike$4 = function (obj) {
  return toLength$2(obj.length);
};

var toIndexedObject$3 = toIndexedObject$5;
var toAbsoluteIndex$1 = toAbsoluteIndex$2;
var lengthOfArrayLike$3 = lengthOfArrayLike$4;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$3($this);
    var length = lengthOfArrayLike$3(O);
    var index = toAbsoluteIndex$1(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare -- NaN check
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare -- NaN check
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

var arrayIncludes = {
  // `Array.prototype.includes` method
  // https://tc39.es/ecma262/#sec-array.prototype.includes
  includes: createMethod$2(true),
  // `Array.prototype.indexOf` method
  // https://tc39.es/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod$2(false)
};

var uncurryThis$d = functionUncurryThis;
var hasOwn$5 = hasOwnProperty_1;
var toIndexedObject$2 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$2 = hiddenKeys$4;

var push$1 = uncurryThis$d([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$2(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$5(hiddenKeys$2, key) && hasOwn$5(O, key) && push$1(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$5(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$1(result, key);
  }
  return result;
};

// IE8- don't enum bug keys
var enumBugKeys$3 = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];

var internalObjectKeys$1 = objectKeysInternal;
var enumBugKeys$2 = enumBugKeys$3;

var hiddenKeys$1 = enumBugKeys$2.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys$1(O, hiddenKeys$1);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$5 = getBuiltIn$8;
var uncurryThis$c = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$d = anObject$f;

var concat$1 = uncurryThis$c([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$5('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$d(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$4 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$3 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$3.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$4(target, key) && !(exceptions && hasOwn$4(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$c = fails$k;
var isCallable$c = isCallable$m;

var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$c(detection) ? fails$c(detection)
    : !!detection;
};

var normalize = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';

var isForced_1 = isForced$2;

var global$e = global$n;
var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var defineBuiltIn$7 = defineBuiltIn$8;
var defineGlobalProperty = defineGlobalProperty$3;
var copyConstructorProperties = copyConstructorProperties$1;
var isForced$1 = isForced_1;

/*
  options.target         - name of the target object
  options.global         - target is the global object
  options.stat           - export as static methods of target
  options.proto          - export as prototype methods of target
  options.real           - real prototype method for the `pure` version
  options.forced         - export even if the native feature is available
  options.bind           - bind methods to the target, required for the `pure` version
  options.wrap           - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe         - use the simple assignment of property instead of delete + defineProperty
  options.sham           - add a flag to not completely full polyfills
  options.enumerable     - export as enumerable property
  options.dontCallGetSet - prevent calling a getter on target
  options.name           - the .name of the function if it does not match the key
*/
var _export = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global$e;
  } else if (STATIC) {
    target = global$e[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$e[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.dontCallGetSet) {
      descriptor = getOwnPropertyDescriptor$3(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced$1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty == typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty$3(sourceProperty, 'sham', true);
    }
    defineBuiltIn$7(target, key, sourceProperty, options);
  }
};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys$1 = enumBugKeys$3;

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys$1);
};

var DESCRIPTORS$4 = descriptors;
var uncurryThis$b = functionUncurryThis;
var call$e = functionCall;
var fails$b = fails$k;
var objectKeys$1 = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$2 = toObject$4;
var IndexedObject$1 = indexedObject;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$3 = Object.defineProperty;
var concat = uncurryThis$b([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$b(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$4 && $assign({ b: 1 }, $assign(defineProperty$3({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$3(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line es/no-symbol -- safe
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return $assign({}, A)[symbol] != 7 || objectKeys$1($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$2(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject$1(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys$1(S), getOwnPropertySymbols(S)) : objectKeys$1(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$4 || call$e(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var $$d = _export;
var assign = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$d({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign }, {
  assign: assign
});

var objectDefineProperties = {};

var DESCRIPTORS$3 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$2 = objectDefineProperty;
var anObject$c = anObject$f;
var toIndexedObject$1 = toIndexedObject$5;
var objectKeys = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$3 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$c(O);
  var props = toIndexedObject$1(Properties);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$2.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$4 = getBuiltIn$8;

var html$2 = getBuiltIn$4('document', 'documentElement');

/* global ActiveXObject -- old IE, WSH */

var anObject$b = anObject$f;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys = enumBugKeys$3;
var hiddenKeys = hiddenKeys$4;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$1 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$1('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement$1('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html$1.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    activeXDocument = new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = typeof document != 'undefined'
    ? document.domain && activeXDocument
      ? NullProtoObjectViaActiveX(activeXDocument) // old IE
      : NullProtoObjectViaIFrame()
    : NullProtoObjectViaActiveX(activeXDocument); // WSH
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$b(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$h = wellKnownSymbol$j;
var create$3 = objectCreate;
var defineProperty$2 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$h('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  defineProperty$2(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$3(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$2 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var iterators = {};

var fails$a = fails$k;

var correctPrototypeGetter = !fails$a(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$3 = hasOwnProperty_1;
var isCallable$b = isCallable$m;
var toObject$1 = toObject$4;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object$1 = Object;
var ObjectPrototype = $Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
  var object = toObject$1(O);
  if (hasOwn$3(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$b(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object$1 ? ObjectPrototype : null;
};

var fails$9 = fails$k;
var isCallable$a = isCallable$m;
var isObject$4 = isObject$a;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$6 = defineBuiltIn$8;
var wellKnownSymbol$g = wellKnownSymbol$j;

var ITERATOR$7 = wellKnownSymbol$g('iterator');
var BUGGY_SAFARI_ITERATORS$1 = false;

// `%IteratorPrototype%` object
// https://tc39.es/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype$2, PrototypeOfArrayIteratorPrototype, arrayIterator;

/* eslint-disable es/no-array-prototype-keys -- safe */
if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS$1 = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf$1(getPrototypeOf$1(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype$2 = PrototypeOfArrayIteratorPrototype;
  }
}

var NEW_ITERATOR_PROTOTYPE = !isObject$4(IteratorPrototype$2) || fails$9(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$7].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$a(IteratorPrototype$2[ITERATOR$7])) {
  defineBuiltIn$6(IteratorPrototype$2, ITERATOR$7, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$1 = objectDefineProperty.f;
var hasOwn$2 = hasOwnProperty_1;
var wellKnownSymbol$f = wellKnownSymbol$j;

var TO_STRING_TAG$3 = wellKnownSymbol$f('toStringTag');

var setToStringTag$4 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$2(target, TO_STRING_TAG$3)) {
    defineProperty$1(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$2 = objectCreate;
var createPropertyDescriptor$2 = createPropertyDescriptor$5;
var setToStringTag$3 = setToStringTag$4;
var Iterators$4 = iterators;

var returnThis$1 = function () { return this; };

var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$2(IteratorPrototype$1, { next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next) });
  setToStringTag$3(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var isCallable$9 = isCallable$m;

var $String$1 = String;
var $TypeError$9 = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$9(argument)) return argument;
  throw $TypeError$9("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$a = functionUncurryThis;
var anObject$a = anObject$f;
var aPossiblePrototype = aPossiblePrototype$1;

// `Object.setPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
// eslint-disable-next-line es/no-object-setprototypeof -- safe
var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    // eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
    setter = uncurryThis$a(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$a(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $$c = _export;
var call$d = functionCall;
var FunctionName = functionName;
var isCallable$8 = isCallable$m;
var createIteratorConstructor$1 = iteratorCreateConstructor;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var setToStringTag$2 = setToStringTag$4;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var defineBuiltIn$5 = defineBuiltIn$8;
var wellKnownSymbol$e = wellKnownSymbol$j;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME = FunctionName.PROPER;
var CONFIGURABLE_FUNCTION_NAME = FunctionName.CONFIGURABLE;
var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR$6 = wellKnownSymbol$e('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

var iteratorDefine = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor$1(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR$6]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (CurrentIteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf$1) {
          setPrototypeOf$1(CurrentIteratorPrototype, IteratorPrototype);
        } else if (!isCallable$8(CurrentIteratorPrototype[ITERATOR$6])) {
          defineBuiltIn$5(CurrentIteratorPrototype, ITERATOR$6, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$2(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$d(nativeIterator, this); };
    }
  }

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        defineBuiltIn$5(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$c({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$6] !== defaultIterator) {
    defineBuiltIn$5(IterablePrototype, ITERATOR$6, defaultIterator, { name: DEFAULT });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
var createIterResultObject$1 = function (value, done) {
  return { value: value, done: done };
};

var toIndexedObject = toIndexedObject$5;
var addToUnscopables$1 = addToUnscopables$2;
var Iterators$2 = iterators;
var InternalStateModule$2 = internalState;
var defineProperty = objectDefineProperty.f;
var defineIterator = iteratorDefine;
var createIterResultObject = createIterResultObject$1;
var DESCRIPTORS$2 = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$2 = InternalStateModule$2.set;
var getInternalState$1 = InternalStateModule$2.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.es/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.es/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.es/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.es/ecma262/#sec-createarrayiterator
var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState$2(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$1(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject(undefined, true);
  }
  if (kind == 'keys') return createIterResultObject(index, false);
  if (kind == 'values') return createIterResultObject(target[index], false);
  return createIterResultObject([index, target[index]], false);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.es/ecma262/#sec-createunmappedargumentsobject
// https://tc39.es/ecma262/#sec-createmappedargumentsobject
var values = Iterators$2.Arguments = Iterators$2.Array;

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables$1('keys');
addToUnscopables$1('values');
addToUnscopables$1('entries');

// V8 ~ Chrome 45- bug
if (DESCRIPTORS$2 && values.name !== 'values') try {
  defineProperty(values, 'name', { value: 'values' });
} catch (error) { /* empty */ }

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
var domIterables = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};

// in old WebKit versions, `element.classList` is not an instance of global `DOMTokenList`
var documentCreateElement = documentCreateElement$2;

var classList = documentCreateElement('span').classList;
var DOMTokenListPrototype$1 = classList && classList.constructor && classList.constructor.prototype;

var domTokenListPrototype = DOMTokenListPrototype$1 === Object.prototype ? undefined : DOMTokenListPrototype$1;

var global$d = global$n;
var DOMIterables = domIterables;
var DOMTokenListPrototype = domTokenListPrototype;
var ArrayIteratorMethods = es_array_iterator;
var createNonEnumerableProperty$1 = createNonEnumerableProperty$5;
var wellKnownSymbol$d = wellKnownSymbol$j;

var ITERATOR$5 = wellKnownSymbol$d('iterator');
var TO_STRING_TAG$2 = wellKnownSymbol$d('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

var handlePrototype = function (CollectionPrototype, COLLECTION_NAME) {
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
      createNonEnumerableProperty$1(CollectionPrototype, ITERATOR$5, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR$5] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG$2]) {
      createNonEnumerableProperty$1(CollectionPrototype, TO_STRING_TAG$2, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty$1(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
};

for (var COLLECTION_NAME in DOMIterables) {
  handlePrototype(global$d[COLLECTION_NAME] && global$d[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var classofRaw$1 = classofRaw$2;
var uncurryThis$9 = functionUncurryThis;

var functionUncurryThisClause = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw$1(fn) === 'Function') return uncurryThis$9(fn);
};

var wellKnownSymbol$c = wellKnownSymbol$j;

var TO_STRING_TAG$1 = wellKnownSymbol$c('toStringTag');
var test = {};

test[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$7 = isCallable$m;
var classofRaw = classofRaw$2;
var wellKnownSymbol$b = wellKnownSymbol$j;

var TO_STRING_TAG = wellKnownSymbol$b('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$7 = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && isCallable$7(O.callee) ? 'Arguments' : result;
};

var classof$6 = classof$7;

var $String = String;

var toString$6 = function (argument) {
  if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

var isObject$3 = isObject$a;
var classof$5 = classofRaw$2;
var wellKnownSymbol$a = wellKnownSymbol$j;

var MATCH$1 = wellKnownSymbol$a('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$3(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$5(it) == 'RegExp');
};

var isRegExp = isRegexp;

var $TypeError$8 = TypeError;

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw $TypeError$8("The method doesn't accept regular expressions");
  } return it;
};

var wellKnownSymbol$9 = wellKnownSymbol$j;

var MATCH = wellKnownSymbol$9('match');

var correctIsRegexpLogic = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (error1) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (error2) { /* empty */ }
  } return false;
};

var $$b = _export;
var uncurryThis$8 = functionUncurryThisClause;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var toLength$1 = toLength$3;
var toString$5 = toString$6;
var notARegExp$1 = notARegexp;
var requireObjectCoercible$4 = requireObjectCoercible$7;
var correctIsRegExpLogic$1 = correctIsRegexpLogic;

// eslint-disable-next-line es/no-string-prototype-endswith -- safe
var nativeEndsWith = uncurryThis$8(''.endsWith);
var slice = uncurryThis$8(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic$1('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor$2(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$$b({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString$5(requireObjectCoercible$4(this));
    notARegExp$1(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min(toLength$1(endPosition), len);
    var search = toString$5(searchString);
    return nativeEndsWith
      ? nativeEndsWith(that, search, end)
      : slice(that, end - search.length, end) === search;
  }
});

var classof$4 = classofRaw$2;
var global$c = global$n;

var engineIsNode = classof$4(global$c.process) == 'process';

var getBuiltIn$3 = getBuiltIn$8;
var definePropertyModule$1 = objectDefineProperty;
var wellKnownSymbol$8 = wellKnownSymbol$j;
var DESCRIPTORS$1 = descriptors;

var SPECIES$3 = wellKnownSymbol$8('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule$1.f;

  if (DESCRIPTORS$1 && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var isPrototypeOf$1 = objectIsPrototypeOf;

var $TypeError$7 = TypeError;

var anInstance$2 = function (it, Prototype) {
  if (isPrototypeOf$1(Prototype, it)) return it;
  throw $TypeError$7('Incorrect invocation');
};

var uncurryThis$7 = functionUncurryThis;
var fails$8 = fails$k;
var isCallable$6 = isCallable$m;
var classof$3 = classof$7;
var getBuiltIn$2 = getBuiltIn$8;
var inspectSource$1 = inspectSource$3;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn$2('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$1 = uncurryThis$7(constructorRegExp.exec);
var INCORRECT_TO_STRING = !constructorRegExp.exec(noop);

var isConstructorModern = function isConstructor(argument) {
  if (!isCallable$6(argument)) return false;
  try {
    construct(noop, empty, argument);
    return true;
  } catch (error) {
    return false;
  }
};

var isConstructorLegacy = function isConstructor(argument) {
  if (!isCallable$6(argument)) return false;
  switch (classof$3(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$1(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$1 = !construct || fails$8(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isConstructor = isConstructor$1;
var tryToString$2 = tryToString$4;

var $TypeError$6 = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor(argument)) return argument;
  throw $TypeError$6(tryToString$2(argument) + ' is not a constructor');
};

var anObject$9 = anObject$f;
var aConstructor = aConstructor$1;
var isNullOrUndefined$3 = isNullOrUndefined$6;
var wellKnownSymbol$7 = wellKnownSymbol$j;

var SPECIES$2 = wellKnownSymbol$7('species');

// `SpeciesConstructor` abstract operation
// https://tc39.es/ecma262/#sec-speciesconstructor
var speciesConstructor$1 = function (O, defaultConstructor) {
  var C = anObject$9(O).constructor;
  var S;
  return C === undefined || isNullOrUndefined$3(S = anObject$9(C)[SPECIES$2]) ? defaultConstructor : aConstructor(S);
};

var NATIVE_BIND$1 = functionBindNative;

var FunctionPrototype = Function.prototype;
var apply$1 = FunctionPrototype.apply;
var call$c = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$c.bind(apply$1) : function () {
  return call$c.apply(apply$1, arguments);
});

var uncurryThis$6 = functionUncurryThisClause;
var aCallable$6 = aCallable$8;
var NATIVE_BIND = functionBindNative;

var bind$5 = uncurryThis$6(uncurryThis$6.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$6(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$5(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var uncurryThis$5 = functionUncurryThis;

var arraySlice$2 = uncurryThis$5([].slice);

var $TypeError$5 = TypeError;

var validateArgumentsLength$2 = function (passed, required) {
  if (passed < required) throw $TypeError$5('Not enough arguments');
  return passed;
};

var userAgent$2 = engineUserAgent;

var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$2);

var global$b = global$n;
var apply = functionApply;
var bind$4 = functionBindContext;
var isCallable$5 = isCallable$m;
var hasOwn$1 = hasOwnProperty_1;
var fails$7 = fails$k;
var html = html$2;
var arraySlice$1 = arraySlice$2;
var createElement = documentCreateElement$2;
var validateArgumentsLength$1 = validateArgumentsLength$2;
var IS_IOS$1 = engineIsIos;
var IS_NODE$4 = engineIsNode;

var set = global$b.setImmediate;
var clear = global$b.clearImmediate;
var process$3 = global$b.process;
var Dispatch = global$b.Dispatch;
var Function$1 = global$b.Function;
var MessageChannel = global$b.MessageChannel;
var String$1 = global$b.String;
var counter = 0;
var queue$1 = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = global$b.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn$1(queue$1, id)) {
    var fn = queue$1[id];
    delete queue$1[id];
    fn();
  }
};

var runner = function (id) {
  return function () {
    run(id);
  };
};

var listener = function (event) {
  run(event.data);
};

var post = function (id) {
  // old engines have not location.origin
  global$b.postMessage(String$1(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength$1(arguments.length, 1);
    var fn = isCallable$5(handler) ? handler : Function$1(handler);
    var args = arraySlice$1(arguments, 1);
    queue$1[++counter] = function () {
      apply(fn, undefined, args);
    };
    defer(counter);
    return counter;
  };
  clear = function clearImmediate(id) {
    delete queue$1[id];
  };
  // Node.js 0.8-
  if (IS_NODE$4) {
    defer = function (id) {
      process$3.nextTick(runner(id));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(runner(id));
    };
  // Browsers with MessageChannel, includes WebWorkers
  // except iOS - https://github.com/zloirock/core-js/issues/624
  } else if (MessageChannel && !IS_IOS$1) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = bind$4(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$b.addEventListener &&
    isCallable$5(global$b.postMessage) &&
    !global$b.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails$7(post)
  ) {
    defer = post;
    global$b.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in createElement('script')) {
    defer = function (id) {
      html.appendChild(createElement('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(runner(id), 0);
    };
  }
}

var task$1 = {
  set: set,
  clear: clear
};

var userAgent$1 = engineUserAgent;
var global$a = global$n;

var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$1) && global$a.Pebble !== undefined;

var userAgent = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent);

var global$9 = global$n;
var bind$3 = functionBindContext;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$3 = engineIsNode;

var MutationObserver = global$9.MutationObserver || global$9.WebKitMutationObserver;
var document$2 = global$9.document;
var process$2 = global$9.process;
var Promise$1 = global$9.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$1(global$9, 'queueMicrotask');
var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

var flush, head, last, notify$1, toggle, node, promise, then;

// modern engines have queueMicrotask method
if (!queueMicrotask) {
  flush = function () {
    var parent, fn;
    if (IS_NODE$3 && (parent = process$2.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (error) {
        if (head) notify$1();
        else last = undefined;
        throw error;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
  // also except WebOS Webkit https://github.com/zloirock/core-js/issues/898
  if (!IS_IOS && !IS_NODE$3 && !IS_WEBOS_WEBKIT && MutationObserver && document$2) {
    toggle = true;
    node = document$2.createTextNode('');
    new MutationObserver(flush).observe(node, { characterData: true });
    notify$1 = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (!IS_IOS_PEBBLE && Promise$1 && Promise$1.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    promise = Promise$1.resolve(undefined);
    // workaround of WebKit ~ iOS Safari 10.1 bug
    promise.constructor = Promise$1;
    then = bind$3(promise.then, promise);
    notify$1 = function () {
      then(flush);
    };
  // Node.js without promises
  } else if (IS_NODE$3) {
    notify$1 = function () {
      process$2.nextTick(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessage
  // - onreadystatechange
  // - setTimeout
  } else {
    // strange IE + webpack dev server bug - use .bind(global)
    macrotask = bind$3(macrotask, global$9);
    notify$1 = function () {
      macrotask(flush);
    };
  }
}

var microtask$1 = queueMicrotask || function (fn) {
  var task = { fn: fn, next: undefined };
  if (last) last.next = task;
  if (!head) {
    head = task;
    notify$1();
  } last = task;
};

var global$8 = global$n;

var hostReportErrors$1 = function (a, b) {
  var console = global$8.console;
  if (console && console.error) {
    arguments.length == 1 ? console.error(a) : console.error(a, b);
  }
};

var perform$3 = function (exec) {
  try {
    return { error: false, value: exec() };
  } catch (error) {
    return { error: true, value: error };
  }
};

var Queue$1 = function () {
  this.head = null;
  this.tail = null;
};

Queue$1.prototype = {
  add: function (item) {
    var entry = { item: item, next: null };
    if (this.head) this.tail.next = entry;
    else this.head = entry;
    this.tail = entry;
  },
  get: function () {
    var entry = this.head;
    if (entry) {
      this.head = entry.next;
      if (this.tail === entry) this.tail = null;
      return entry.item;
    }
  }
};

var queue = Queue$1;

var global$7 = global$n;

var promiseNativeConstructor = global$7.Promise;

/* global Deno -- Deno case */

var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

var IS_DENO$1 = engineIsDeno;
var IS_NODE$2 = engineIsNode;

var engineIsBrowser = !IS_DENO$1 && !IS_NODE$2
  && typeof window == 'object'
  && typeof document == 'object';

var global$6 = global$n;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var isCallable$4 = isCallable$m;
var isForced = isForced_1;
var inspectSource = inspectSource$3;
var wellKnownSymbol$6 = wellKnownSymbol$j;
var IS_BROWSER = engineIsBrowser;
var IS_DENO = engineIsDeno;
var V8_VERSION = engineV8Version;

NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var SPECIES$1 = wellKnownSymbol$6('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$4(global$6.PromiseRejectionEvent);

var FORCED_PROMISE_CONSTRUCTOR$5 = isForced('Promise', function () {
  var PROMISE_CONSTRUCTOR_SOURCE = inspectSource(NativePromiseConstructor$3);
  var GLOBAL_CORE_JS_PROMISE = PROMISE_CONSTRUCTOR_SOURCE !== String(NativePromiseConstructor$3);
  // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
  // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
  // We can't detect it synchronously, so just check versions
  if (!GLOBAL_CORE_JS_PROMISE && V8_VERSION === 66) return true;
  // We can't use @@species feature detection in V8 since it causes
  // deoptimization and performance degradation
  // https://github.com/zloirock/core-js/issues/679
  if (!V8_VERSION || V8_VERSION < 51 || !/native code/.test(PROMISE_CONSTRUCTOR_SOURCE)) {
    // Detect correctness of subclassing with @@species support
    var promise = new NativePromiseConstructor$3(function (resolve) { resolve(1); });
    var FakePromise = function (exec) {
      exec(function () { /* empty */ }, function () { /* empty */ });
    };
    var constructor = promise.constructor = {};
    constructor[SPECIES$1] = FakePromise;
    SUBCLASSING = promise.then(function () { /* empty */ }) instanceof FakePromise;
    if (!SUBCLASSING) return true;
  // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
  } return !GLOBAL_CORE_JS_PROMISE && (IS_BROWSER || IS_DENO) && !NATIVE_PROMISE_REJECTION_EVENT$1;
});

var promiseConstructorDetection = {
  CONSTRUCTOR: FORCED_PROMISE_CONSTRUCTOR$5,
  REJECTION_EVENT: NATIVE_PROMISE_REJECTION_EVENT$1,
  SUBCLASSING: SUBCLASSING
};

var newPromiseCapability$2 = {};

var aCallable$5 = aCallable$8;

var $TypeError$4 = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw $TypeError$4('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$5(resolve);
  this.reject = aCallable$5(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$a = _export;
var IS_NODE$1 = engineIsNode;
var global$5 = global$n;
var call$b = functionCall;
var defineBuiltIn$4 = defineBuiltIn$8;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag$1 = setToStringTag$4;
var setSpecies = setSpecies$1;
var aCallable$4 = aCallable$8;
var isCallable$3 = isCallable$m;
var isObject$2 = isObject$a;
var anInstance$1 = anInstance$2;
var speciesConstructor = speciesConstructor$1;
var task = task$1.set;
var microtask = microtask$1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue;
var InternalStateModule$1 = internalState;
var NativePromiseConstructor$2 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule$1.getterFor(PROMISE);
var setInternalState$1 = InternalStateModule$1.set;
var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
var PromiseConstructor = NativePromiseConstructor$2;
var PromisePrototype = NativePromisePrototype$1;
var TypeError$2 = global$5.TypeError;
var document$1 = global$5.document;
var process$1 = global$5.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$5.dispatchEvent);
var UNHANDLED_REJECTION = 'unhandledrejection';
var REJECTION_HANDLED = 'rejectionhandled';
var PENDING = 0;
var FULFILLED = 1;
var REJECTED = 2;
var HANDLED = 1;
var UNHANDLED = 2;

var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

// helpers
var isThenable = function (it) {
  var then;
  return isObject$2(it) && isCallable$3(then = it.then) ? then : false;
};

var callReaction = function (reaction, state) {
  var value = state.value;
  var ok = state.state == FULFILLED;
  var handler = ok ? reaction.ok : reaction.fail;
  var resolve = reaction.resolve;
  var reject = reaction.reject;
  var domain = reaction.domain;
  var result, then, exited;
  try {
    if (handler) {
      if (!ok) {
        if (state.rejection === UNHANDLED) onHandleUnhandled(state);
        state.rejection = HANDLED;
      }
      if (handler === true) result = value;
      else {
        if (domain) domain.enter();
        result = handler(value); // can throw
        if (domain) {
          domain.exit();
          exited = true;
        }
      }
      if (result === reaction.promise) {
        reject(TypeError$2('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call$b(then, result, resolve, reject);
      } else resolve(result);
    } else reject(value);
  } catch (error) {
    if (domain && !exited) domain.exit();
    reject(error);
  }
};

var notify = function (state, isReject) {
  if (state.notified) return;
  state.notified = true;
  microtask(function () {
    var reactions = state.reactions;
    var reaction;
    while (reaction = reactions.get()) {
      callReaction(reaction, state);
    }
    state.notified = false;
    if (isReject && !state.rejection) onUnhandled(state);
  });
};

var dispatchEvent = function (name, promise, reason) {
  var event, handler;
  if (DISPATCH_EVENT) {
    event = document$1.createEvent('Event');
    event.promise = promise;
    event.reason = reason;
    event.initEvent(name, false, true);
    global$5.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$5['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$b(task, global$5, function () {
    var promise = state.facade;
    var value = state.value;
    var IS_UNHANDLED = isUnhandled(state);
    var result;
    if (IS_UNHANDLED) {
      result = perform$2(function () {
        if (IS_NODE$1) {
          process$1.emit('unhandledRejection', value, promise);
        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
      if (result.error) throw result.value;
    }
  });
};

var isUnhandled = function (state) {
  return state.rejection !== HANDLED && !state.parent;
};

var onHandleUnhandled = function (state) {
  call$b(task, global$5, function () {
    var promise = state.facade;
    if (IS_NODE$1) {
      process$1.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$2 = function (fn, state, unwrap) {
  return function (value) {
    fn(state, value, unwrap);
  };
};

var internalReject = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  state.value = value;
  state.state = REJECTED;
  notify(state, true);
};

var internalResolve = function (state, value, unwrap) {
  if (state.done) return;
  state.done = true;
  if (unwrap) state = unwrap;
  try {
    if (state.facade === value) throw TypeError$2("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$b(then, value,
            bind$2(internalResolve, wrapper, state),
            bind$2(internalReject, wrapper, state)
          );
        } catch (error) {
          internalReject(wrapper, error, state);
        }
      });
    } else {
      state.value = value;
      state.state = FULFILLED;
      notify(state, false);
    }
  } catch (error) {
    internalReject({ done: false }, error, state);
  }
};

// constructor polyfill
if (FORCED_PROMISE_CONSTRUCTOR$4) {
  // 25.4.3.1 Promise(executor)
  PromiseConstructor = function Promise(executor) {
    anInstance$1(this, PromisePrototype);
    aCallable$4(executor);
    call$b(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$2(internalResolve, state), bind$2(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState$1(this, {
      type: PROMISE,
      done: false,
      notified: false,
      parent: false,
      reactions: new Queue(),
      rejection: false,
      state: PENDING,
      value: undefined
    });
  };

  // `Promise.prototype.then` method
  // https://tc39.es/ecma262/#sec-promise.prototype.then
  Internal.prototype = defineBuiltIn$4(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
    var state = getInternalPromiseState(this);
    var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
    state.parent = true;
    reaction.ok = isCallable$3(onFulfilled) ? onFulfilled : true;
    reaction.fail = isCallable$3(onRejected) && onRejected;
    reaction.domain = IS_NODE$1 ? process$1.domain : undefined;
    if (state.state == PENDING) state.reactions.add(reaction);
    else microtask(function () {
      callReaction(reaction, state);
    });
    return reaction.promise;
  });

  OwnPromiseCapability = function () {
    var promise = new Internal();
    var state = getInternalPromiseState(promise);
    this.promise = promise;
    this.resolve = bind$2(internalResolve, state);
    this.reject = bind$2(internalReject, state);
  };

  newPromiseCapabilityModule$3.f = newPromiseCapability$1 = function (C) {
    return C === PromiseConstructor || C === PromiseWrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };

  if (isCallable$3(NativePromiseConstructor$2) && NativePromisePrototype$1 !== Object.prototype) {
    nativeThen = NativePromisePrototype$1.then;

    if (!NATIVE_PROMISE_SUBCLASSING) {
      // make `Promise#then` return a polyfilled `Promise` for native promise-based APIs
      defineBuiltIn$4(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call$b(nativeThen, that, resolve, reject);
        }).then(onFulfilled, onRejected);
      // https://github.com/zloirock/core-js/issues/640
      }, { unsafe: true });
    }

    // make `.constructor === Promise` work for native promise-based APIs
    try {
      delete NativePromisePrototype$1.constructor;
    } catch (error) { /* empty */ }

    // make `instanceof Promise` work for native promise-based APIs
    if (setPrototypeOf) {
      setPrototypeOf(NativePromisePrototype$1, PromisePrototype);
    }
  }
}

$$a({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});

setToStringTag$1(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

var wellKnownSymbol$5 = wellKnownSymbol$j;
var Iterators$1 = iterators;

var ITERATOR$4 = wellKnownSymbol$5('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$1 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$4] === it);
};

var classof$2 = classof$7;
var getMethod$3 = getMethod$5;
var isNullOrUndefined$2 = isNullOrUndefined$6;
var Iterators = iterators;
var wellKnownSymbol$4 = wellKnownSymbol$j;

var ITERATOR$3 = wellKnownSymbol$4('iterator');

var getIteratorMethod$3 = function (it) {
  if (!isNullOrUndefined$2(it)) return getMethod$3(it, ITERATOR$3)
    || getMethod$3(it, '@@iterator')
    || Iterators[classof$2(it)];
};

var call$a = functionCall;
var aCallable$3 = aCallable$8;
var anObject$8 = anObject$f;
var tryToString$1 = tryToString$4;
var getIteratorMethod$2 = getIteratorMethod$3;

var $TypeError$3 = TypeError;

var getIterator$2 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$2(argument) : usingIterator;
  if (aCallable$3(iteratorMethod)) return anObject$8(call$a(iteratorMethod, argument));
  throw $TypeError$3(tryToString$1(argument) + ' is not iterable');
};

var call$9 = functionCall;
var anObject$7 = anObject$f;
var getMethod$2 = getMethod$5;

var iteratorClose$1 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$7(iterator);
  try {
    innerResult = getMethod$2(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$9(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$7(innerResult);
  return value;
};

var bind$1 = functionBindContext;
var call$8 = functionCall;
var anObject$6 = anObject$f;
var tryToString = tryToString$4;
var isArrayIteratorMethod = isArrayIteratorMethod$1;
var lengthOfArrayLike$2 = lengthOfArrayLike$4;
var isPrototypeOf = objectIsPrototypeOf;
var getIterator$1 = getIterator$2;
var getIteratorMethod$1 = getIteratorMethod$3;
var iteratorClose = iteratorClose$1;

var $TypeError$2 = TypeError;

var Result = function (stopped, result) {
  this.stopped = stopped;
  this.result = result;
};

var ResultPrototype = Result.prototype;

var iterate$2 = function (iterable, unboundFunction, options) {
  var that = options && options.that;
  var AS_ENTRIES = !!(options && options.AS_ENTRIES);
  var IS_RECORD = !!(options && options.IS_RECORD);
  var IS_ITERATOR = !!(options && options.IS_ITERATOR);
  var INTERRUPTED = !!(options && options.INTERRUPTED);
  var fn = bind$1(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose(iterator, 'normal', condition);
    return new Result(true, condition);
  };

  var callFn = function (value) {
    if (AS_ENTRIES) {
      anObject$6(value);
      return INTERRUPTED ? fn(value[0], value[1], stop) : fn(value[0], value[1]);
    } return INTERRUPTED ? fn(value, stop) : fn(value);
  };

  if (IS_RECORD) {
    iterator = iterable.iterator;
  } else if (IS_ITERATOR) {
    iterator = iterable;
  } else {
    iterFn = getIteratorMethod$1(iterable);
    if (!iterFn) throw $TypeError$2(tryToString(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod(iterFn)) {
      for (index = 0, length = lengthOfArrayLike$2(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator$1(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$8(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};

var wellKnownSymbol$3 = wellKnownSymbol$j;

var ITERATOR$2 = wellKnownSymbol$3('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR$2] = function () {
    return this;
  };
  // eslint-disable-next-line es/no-array-from, no-throw-literal -- required for testing
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

var checkCorrectnessOfIteration$1 = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR$2] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};

var NativePromiseConstructor$1 = promiseNativeConstructor;
var checkCorrectnessOfIteration = checkCorrectnessOfIteration$1;
var FORCED_PROMISE_CONSTRUCTOR$3 = promiseConstructorDetection.CONSTRUCTOR;

var promiseStaticsIncorrectIteration = FORCED_PROMISE_CONSTRUCTOR$3 || !checkCorrectnessOfIteration(function (iterable) {
  NativePromiseConstructor$1.all(iterable).then(undefined, function () { /* empty */ });
});

var $$9 = _export;
var call$7 = functionCall;
var aCallable$2 = aCallable$8;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$1 = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$9({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$2.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aCallable$2(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$7($promiseResolve, C, promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$8 = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor = promiseNativeConstructor;
var getBuiltIn$1 = getBuiltIn$8;
var isCallable$2 = isCallable$m;
var defineBuiltIn$3 = defineBuiltIn$8;

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$8({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$2(NativePromiseConstructor)) {
  var method = getBuiltIn$1('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn$3(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}

var $$7 = _export;
var call$6 = functionCall;
var aCallable$1 = aCallable$8;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$7({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable$1(C.resolve);
      iterate(iterable, function (promise) {
        call$6($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$6 = _export;
var call$5 = functionCall;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$6({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call$5(capability.reject, undefined, r);
    return capability.promise;
  }
});

var anObject$5 = anObject$f;
var isObject$1 = isObject$a;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$5(C);
  if (isObject$1(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$5 = _export;
var getBuiltIn = getBuiltIn$8;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve = promiseResolve$1;

getBuiltIn('Promise');

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$5({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

const defaultModuleName = './Module';
const remoteModuleMap = new Map();
const remoteContainerMap = new Map();
let initialSharingScopeCreated = false;
/**
 * Method to get remote entry URL for CXone Agent
 * @param cxaVersion - version of CXone Agent
 * @example getAgentRemoteEntryUrl(cxaVersion)
 */
function getAgentRemoteEntryUrl(cxaVersion) {
  const currentUrl = window.location.origin;
  if (cxaVersion) {
    return `${currentUrl}${currentUrl.endsWith('/') ? '' : '/'}${cxaVersion ? cxaVersion + '/' : ''}remoteEntry.js`;
  }
  return '';
}
/**
 * Method to get remote entry URL for Embedded App
 * @param appType - type of remote embedded app
 * @example getRemoteEntryUrl(appType)
 */
function getRemoteEntryUrl(appType, cxaVersion) {
  const currentUrl = window.location.origin;
  if (appType) {
    return `${currentUrl}${currentUrl.endsWith('/') ? '' : '/'}${cxaVersion ? cxaVersion + '/' : ''}${appType + '/'}remoteEntry.js`;
  }
  return '';
}
/**
 * Import script dynamically as a container
 * @param url - url for remote script
 * @example - loadModule(url);
 */
function loadModule(url) {
  return import( /* webpackIgnore:true */url);
}
/**
 * Method to load remote Integration Module from remoteEntry.js file
 * @param appType - type of remote embedded app
 * @example loadIntegrationModule(appType)
 */
function loadIntegrationModule(appType, remoteEntryUrl) {
  return () => __awaiter(this, void 0, void 0, function* () {
    const remoteModuleKey = `${appType}:${defaultModuleName}`;
    if (remoteModuleMap.has(remoteModuleKey)) {
      return remoteModuleMap.get(remoteModuleKey);
    }
    if (!initialSharingScopeCreated) {
      initialSharingScopeCreated = true;
      yield __webpack_init_sharing__('default');
    }
    const container = remoteEntryUrl ? yield loadModule(remoteEntryUrl) : null;
    if (container) {
      yield container.init(__webpack_share_scopes__.default);
      remoteContainerMap.set(appType, container);
      const factory = yield container.get(defaultModuleName);
      const Module = factory();
      remoteModuleMap.set(remoteModuleKey, Module);
      return Module;
    }
  });
}

/**
 * Hook to load custom script dynamically
 * @param props - of type UseScriptProps()
 * @returns - whether script is loaded successfully or failed
 * @example - useScript(props);
 */
const useScript = props => {
  const urlCache = useMemo(() => new Set(), []);
  const [scriptStatus, updateScriptStatus] = useState({
    ready: false,
    failed: false
  });
  const head = useMemo(() => document.querySelector('head'), []);
  const script = useMemo(() => document.createElement('script'), []);
  useEffect(() => {
    var _a, _b;
    if (!props.scriptSrc) return;
    //check if script already exists or not
    if (urlCache.has(props.scriptSrc)) {
      updateScriptStatus({
        ready: true,
        failed: scriptStatus.failed
      });
      return;
    }
    if (!head) return;
    script.src = props.scriptSrc;
    script.type = (_a = props.scriptType) !== null && _a !== void 0 ? _a : 'text/javascript';
    script.async = true;
    (_b = props.attributes) === null || _b === void 0 ? void 0 : _b.forEach(attr => {
      script.setAttribute(attr.name, attr.value);
    });
    updateScriptStatus({
      ready: false,
      failed: false
    });
    script.onload = () => {
      console.log(`Dynamic Script Loaded: ${props.scriptSrc}`);
      urlCache.add(props.scriptSrc);
      updateScriptStatus({
        ready: true,
        failed: scriptStatus.failed
      });
    };
    script.onerror = () => {
      console.error(`Dynamic Script Not Loaded: ${props.scriptSrc}`);
      updateScriptStatus({
        ready: false,
        failed: true
      });
    };
    head.appendChild(script);
    return () => {
      head.removeChild(script);
      console.log('[useScript] Removing Dynamic script: ', props.scriptSrc);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.scriptSrc]);
  return {
    ready: scriptStatus.ready,
    failed: scriptStatus.failed
  };
};

/**
 * This component will act as middleman to load integration component as per the AppType
 * @param props - IntegrationComponentProps type
 * @returns - Either integration component or empty jsx fragment
 * @example - IntegrationComponentLoader
 */
const IntegrationComponentLoader = /*#__PURE__*/memo(props => {
  //Fetch and load remote entry file of remote app
  // Dev Note: Uncomment below line to run app locally and comment out line with getRemoteEntryUrl() method
  //const remoteEntryUrl = props.appType == 'cxa-chrome-os' ? 'http://localhost:4204/remoteEntry.js' : 'http://localhost:4202/remoteEntry.js';
  const remoteEntryUrl = getRemoteEntryUrl(props.appType, '');
  const {
    ready,
    failed
  } = useScript({
    scriptSrc: remoteEntryUrl,
    //This will make sure that remoteEntry.js file is loaded only once.
    scriptType: 'module'
  });
  const IntegrationComponent = useMemo(() => /*#__PURE__*/React.lazy(loadIntegrationModule(props.appType, remoteEntryUrl)), [props.appType]);
  //If remote entry file is not loaded, then skip loading embedded module
  if (!ready || failed) {
    return jsx(Fragment, {});
  }
  return jsx(Suspense, Object.assign({
    fallback: null
  }, {
    children: IntegrationComponent && jsx(IntegrationComponent, Object.assign({}, props))
  }));
});

/**
 * Shared enum for defining CCF Application Types
 */
var CcfAppType;
(function (CcfAppType) {
  CcfAppType["CXoneAgent"] = "cxa";
  CcfAppType["CXoneAgentBrowserExt"] = "cxai";
  CcfAppType["CXoneAgentExtRingCentral"] = "cxai_rc";
  CcfAppType["CXoneAgentMsDynamics"] = "cxa_msd";
  CcfAppType["CXoneAgentServiceNow"] = "cxa_snow";
  CcfAppType["CXoneAgentZendesk"] = "cxa_zd";
  CcfAppType["CXoneAgentOracle"] = "cxa_osc";
  CcfAppType["CXoneAgentMsTeams"] = "cxa_msteams";
  CcfAppType["CXoneAgentSalesforce"] = "cxa_sfdc";
  CcfAppType["CXoneAgentKustomer"] = "cxa_kustomer";
})(CcfAppType || (CcfAppType = {}));

/**
 * Generic enum to save common constants which needs to be shared between multiple apps
 */
var CcfGenericConstants;
(function (CcfGenericConstants) {
  CcfGenericConstants["CXoneAgentCtdExt"] = "cxa_ctd";
})(CcfGenericConstants || (CcfGenericConstants = {}));

/**
 * Generic enum for Message Types which needs to be shared between multiple apps.
 */
var CcfMessageType;
(function (CcfMessageType) {
  CcfMessageType["Initialize"] = "Ccf_Initialize";
  CcfMessageType["InitializeAck"] = "Ccf_Initialize_Ack";
  CcfMessageType["Authenticated"] = "Ccf_Authenticated";
  CcfMessageType["UnAuthenticated"] = "Ccf_Un_Authenticated";
  CcfMessageType["AgentStateUpdated"] = "Ccf_Agent_State_Updated";
  CcfMessageType["AgentInitials"] = "Ccf_Agent_Initials";
  CcfMessageType["ConnectAgentLeg"] = "Ccf_Connect_Agent_Leg";
  CcfMessageType["ConnectAgentLegAck"] = "Ccf_Connect_Agent_Leg_Ack";
  CcfMessageType["TabContentUpdated"] = "Ccf_Tab_Content_Updated";
  CcfMessageType["CtdDialedNumber"] = "Ccf_Ctd_Dialed_Number";
  CcfMessageType["SetObSkillsAvailable"] = "Ccf_Set_Ob_Skills_Available";
  CcfMessageType["QueueCounterDetails"] = "Ccf_Queue_Counte_Details";
})(CcfMessageType || (CcfMessageType = {}));

/**
 * Generic class to save common regex which needs to be shared between multiple apps
 */
class CcfRegexPatterns {}
/**
 * Check for E164 format for the phone number
 */
CcfRegexPatterns.phoneNumberFormat = /(\+\d{1,3}\s?-?)?((\(\d{3}\)\s?)|(\d{3})(\s|-?))(\d{3}(\s|-?))(\d{4})/gi;
/**
 * string with special characters
 */
CcfRegexPatterns.specialCharFormat = /[`~!@$%^&()_|\-=?;:'",.<>{}[\]\s\\]/gi;
/**
 * string with special char and alphabets in phone number
 */
CcfRegexPatterns.specialPhoneCharFormat = /[`~!@$%^&_|=?;:'",<>{}\\a-zA-Z]+/gim;

/**
 * Enum for CXone agent Event types
 */
var CXoneAgentEvents;
(function (CXoneAgentEvents) {
  /**
   * @remarks - enum for screen pop event
   */
  CXoneAgentEvents["CXONE_SCREEN_POP_EVENT"] = "ScreenPopEvent";
  /**
   *@remarks - enum for click to call event
   */
  CXoneAgentEvents["CXONE_CLICK_TO_DIAL_EVENT"] = "ClickToDialEvent";
  /**
   * @remarks - enum for voice contact type
   */
  CXoneAgentEvents["CXONE_VOICE_CONTACT_EVENT"] = "VoiceContact";
  /**
   * @remarks - enum for digital contact type
   */
  CXoneAgentEvents["CXONE_DIGITAL_CONTACT_EVENT"] = "DigitalContactEvent";
  /**
   * @remarks - enum for agent state change
   */
  CXoneAgentEvents["CXONE_AGENT_STATE_CHANGE"] = "AgentStateChange";
  /**
   * @remarks - enum for locale request to integration app (e.g. ms teams)
   */
  CXoneAgentEvents["CXONE_AGENT_APP_INITIALIZED"] = "AgentAppInitialized";
  /**
   * @remarks - This event will be emitted when the teams app receives the authentication URL.
   */
  CXoneAgentEvents["CXONE_AGENT_AUTH_REQUEST"] = "CXoneAgentAuthRequest";
  /**
   * @remarks - This event will be fired when the user has completed the SSO authentication and we want to redirect to the home page.
   */
  CXoneAgentEvents["CXONE_AGENT_AUTH_RESPONSE"] = "CXoneAgentAuthResponse";
  /**
   * @remarks - enum for agent locale received
   */
  CXoneAgentEvents["CXONE_AGENT_UPDATE_LOCALE_EVENT"] = "AgentUpdateLocaleEvent";
  /**
   * @remarks -Event to dispatch to CXone App once the Embedded App is successfully initialized
   * This event will basically help CXone to understand if it needs to execute only after the
   * embedded-app has initialized.
   */
  CXoneAgentEvents["EMBEDDED_APP_INITIALIZED"] = "EmbeddedAppInitialized";
  /**
   * @remarks - enum for agent logoff
   */
  CXoneAgentEvents["CXONE_AGENT_LOG_OFF"] = "CXoneAgentLogOff";
  /**
   * @remarks - enum for agent logoff
   */
  CXoneAgentEvents["CXONE_VISUAL_NOTIFICATION"] = "CXoneVisualNotification";
  /**
   * @remarks - enum for contact switch event
   */
  CXoneAgentEvents["CONTACT_SWITCH_EVENT"] = "ContactSwitchEvent";
  /**
  * @remarks - enum for presence sync rules
  */
  CXoneAgentEvents["CXONE_PRESENCE_SYNC_EVENT"] = "CXonePresenceSyncEvent";
  /**
   * @remarks -
   */
  CXoneAgentEvents["CXONE_AGENT_PRESENCE_SYNC_RULE"] = "CXoneAgentPresenceSyncRules";
  /**
   * @remarks
   */
  CXoneAgentEvents["CXONE_AGENT_SET_PRESENCE_STATE"] = "CXoneAgentSetPresenceState";
  /**
   * @remarks
   */
  CXoneAgentEvents["CXONE_AGENT_HOME_INITIALIZED"] = "CXoneAgentHomeInitialized";
  /**
   * @remarks - enum for capturing the events when the CRM entity navigation is changed
   */
  CXoneAgentEvents["CXONE_CRM_ENTITY_NAVIGATION_CHANGE"] = "CxoneCRMEntityNavigationChange";
})(CXoneAgentEvents || (CXoneAgentEvents = {}));

var CXoneCallContactStatus;
(function (CXoneCallContactStatus) {
  /**
   * Call is being masked
   */
  CXoneCallContactStatus["MASKING"] = "Masking";
  /**
   * Call is on hold
   */
  CXoneCallContactStatus["HOLDING"] = "Holding";
  /**
   * Call is in progress
   */
  CXoneCallContactStatus["ACTIVE"] = "Active";
  /**
   * Call is disconnected
   */
  CXoneCallContactStatus["DISCONNECTED"] = "Disconnected";
  /**
   * Agent dialing oubound call
   */
  CXoneCallContactStatus["DIALING"] = "Dialing";
  /**
   * A call is incoming
   */
  CXoneCallContactStatus["INCOMING"] = "Incoming";
  /**
   * A conference call is joined
   */
  CXoneCallContactStatus["JOINED"] = "Joined";
})(CXoneCallContactStatus || (CXoneCallContactStatus = {}));

/**
 * Enum for Digital Case Status
 */
var CXoneDigitalContactStatus;
(function (CXoneDigitalContactStatus) {
  /**
   * Initial Case Status when the contact is accepted by agent
   */
  CXoneDigitalContactStatus["NEW"] = "new";
  /**
   * Contact is being handled by agent
   */
  CXoneDigitalContactStatus["OPEN"] = "open";
  /**
   * The communication is still in progress for the contact
   */
  CXoneDigitalContactStatus["PENDING"] = "pending";
  /**
   * The contact is escalated to some other agent
   */
  CXoneDigitalContactStatus["ESCALATED"] = "escalated";
  /**
   * The contact is resolved after communication
   */
  CXoneDigitalContactStatus["RESOLVED"] = "resolved";
  /**
   * The contact is closed when there is no further communication
   */
  CXoneDigitalContactStatus["CLOSED"] = "closed";
  /**
   * The contact is initiated but not yet accepted
   */
  CXoneDigitalContactStatus["INCOMING"] = "Incoming";
})(CXoneDigitalContactStatus || (CXoneDigitalContactStatus = {}));

/**
 * Enum for Event Types generated by CXone Digital
 */
var CXoneDigitalEventType;
(function (CXoneDigitalEventType) {
  /**
   * Event type for digital case inbox assignee changed.
   */
  CXoneDigitalEventType["CASE_INBOX_ASSIGNEE_CHANGED"] = "CaseInboxAssigneeChanged";
  /**
   * Event type for digital case status changed.
   */
  CXoneDigitalEventType["CASE_STATUS_CHANGED"] = "CaseStatusChanged";
  /**
   * Event type for digital message added into case.
   */
  CXoneDigitalEventType["MESSAGE_ADDED_INTO_CASE"] = "MessageAddedIntoCase";
  /**
   * Event type for digital contact assigned to Agent UI (Not websocket event).
   */
  CXoneDigitalEventType["CASE_INBOX_ASSIGNED"] = "CaseInboxAssigned";
  /**
   * Event type for digital contact unassigned from Agent UI (Not websocket event).
   */
  CXoneDigitalEventType["CASE_INBOX_UNASSIGNED"] = "CaseInboxUnassigned";
})(CXoneDigitalEventType || (CXoneDigitalEventType = {}));

var AgentStates;
(function (AgentStates) {
  /**
   * Agent state is available
   */
  AgentStates["Available"] = "available";
  /**
   * Agent state is unavailable
   */
  AgentStates["Unavailable"] = "unavailable";
  /**
   * Agent state is working
   */
  AgentStates["Working"] = "working";
  /**
   * Agent state is loggedOff
   */
  AgentStates["LoggedOff"] = "loggedOff";
})(AgentStates || (AgentStates = {}));

/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Common helper class to contain shared functions which can be used across apps.
 */
class CcfValidationHelper {}
/**
 * convert JSON string to an object
 * @example - parseJson(data);
 */
CcfValidationHelper.parseJson = data => {
  try {
    data = typeof data === 'string' ? JSON.parse(data) : data;
    return data;
  } catch (error) {
    return null;
  }
};

var fails$6 = fails$k;
var wellKnownSymbol$2 = wellKnownSymbol$j;
var IS_PURE = isPure;

var ITERATOR$1 = wellKnownSymbol$2('iterator');

var urlConstructorDetection = !fails$6(function () {
  // eslint-disable-next-line unicorn/relative-url-style -- required for testing
  var url = new URL('b?a=1&b=2&c=3', 'http://a');
  var searchParams = url.searchParams;
  var result = '';
  url.pathname = 'c%20d';
  searchParams.forEach(function (value, key) {
    searchParams['delete']('b');
    result += key + value;
  });
  return (IS_PURE && !url.toJSON)
    || !searchParams.sort
    || url.href !== 'http://a/c%20d?a=1&c=3'
    || searchParams.get('c') !== '3'
    || String(new URLSearchParams('?a=1')) !== 'a=1'
    || !searchParams[ITERATOR$1]
    // throws in Edge
    || new URL('https://a@b').username !== 'a'
    || new URLSearchParams(new URLSearchParams('a=b')).get('a') !== 'b'
    // not punycoded in Edge
    || new URL('http://тест').host !== 'xn--e1aybc'
    // not escaped in Chrome 62-
    || new URL('http://a#б').hash !== '#%D0%B1'
    // fails in Chrome 66-
    || result !== 'a1c3'
    // throws in Safari
    || new URL('http://x', undefined).host !== 'x';
});

var defineBuiltIn$2 = defineBuiltIn$8;

var defineBuiltIns$1 = function (target, src, options) {
  for (var key in src) defineBuiltIn$2(target, key, src[key], options);
  return target;
};

var toPropertyKey = toPropertyKey$3;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$5;

var createProperty$1 = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor$1(0, value));
  else object[propertyKey] = value;
};

var toAbsoluteIndex = toAbsoluteIndex$2;
var lengthOfArrayLike$1 = lengthOfArrayLike$4;
var createProperty = createProperty$1;

var $Array = Array;
var max = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$1(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty(result, n, O[k]);
  result.length = n;
  return result;
};

var arraySlice = arraySliceSimple;

var floor = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice(array, 0, middle), comparefn),
    mergeSort(arraySlice(array, middle), comparefn),
    comparefn
  );
};

var insertionSort = function (array, comparefn) {
  var length = array.length;
  var i = 1;
  var element, j;

  while (i < length) {
    j = i;
    element = array[i];
    while (j && comparefn(array[j - 1], element) > 0) {
      array[j] = array[--j];
    }
    if (j !== i++) array[j] = element;
  } return array;
};

var merge = function (array, left, right, comparefn) {
  var llength = left.length;
  var rlength = right.length;
  var lindex = 0;
  var rindex = 0;

  while (lindex < llength || rindex < rlength) {
    array[lindex + rindex] = (lindex < llength && rindex < rlength)
      ? comparefn(left[lindex], right[rindex]) <= 0 ? left[lindex++] : right[rindex++]
      : lindex < llength ? left[lindex++] : right[rindex++];
  } return array;
};

var arraySort$1 = mergeSort;

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $$4 = _export;
var global$4 = global$n;
var call$4 = functionCall;
var uncurryThis$4 = functionUncurryThis;
var DESCRIPTORS = descriptors;
var USE_NATIVE_URL = urlConstructorDetection;
var defineBuiltIn$1 = defineBuiltIn$8;
var defineBuiltIns = defineBuiltIns$1;
var setToStringTag = setToStringTag$4;
var createIteratorConstructor = iteratorCreateConstructor;
var InternalStateModule = internalState;
var anInstance = anInstance$2;
var isCallable$1 = isCallable$m;
var hasOwn = hasOwnProperty_1;
var bind = functionBindContext;
var classof$1 = classof$7;
var anObject$4 = anObject$f;
var isObject = isObject$a;
var $toString = toString$6;
var create$1 = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$5;
var getIterator = getIterator$2;
var getIteratorMethod = getIteratorMethod$3;
var validateArgumentsLength = validateArgumentsLength$2;
var wellKnownSymbol$1 = wellKnownSymbol$j;
var arraySort = arraySort$1;

var ITERATOR = wellKnownSymbol$1('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState = InternalStateModule.set;
var getInternalParamsState = InternalStateModule.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule.getterFor(URL_SEARCH_PARAMS_ITERATOR);
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
var safeGetBuiltIn = function (name) {
  if (!DESCRIPTORS) return global$4[name];
  var descriptor = getOwnPropertyDescriptor(global$4, name);
  return descriptor && descriptor.value;
};

var nativeFetch = safeGetBuiltIn('fetch');
var NativeRequest = safeGetBuiltIn('Request');
var Headers = safeGetBuiltIn('Headers');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp$1 = global$4.RegExp;
var TypeError$1 = global$4.TypeError;
var decodeURIComponent = global$4.decodeURIComponent;
var encodeURIComponent = global$4.encodeURIComponent;
var charAt$3 = uncurryThis$4(''.charAt);
var join = uncurryThis$4([].join);
var push = uncurryThis$4([].push);
var replace$1 = uncurryThis$4(''.replace);
var shift = uncurryThis$4([].shift);
var splice = uncurryThis$4([].splice);
var split = uncurryThis$4(''.split);
var stringSlice$2 = uncurryThis$4(''.slice);

var plus = /\+/g;
var sequences = Array(4);

var percentSequence = function (bytes) {
  return sequences[bytes - 1] || (sequences[bytes - 1] = RegExp$1('((?:%[\\da-f]{2}){' + bytes + '})', 'gi'));
};

var percentDecode = function (sequence) {
  try {
    return decodeURIComponent(sequence);
  } catch (error) {
    return sequence;
  }
};

var deserialize = function (it) {
  var result = replace$1(it, plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace$1(result, percentSequence(bytes--), percentDecode);
    }
    return result;
  }
};

var find = /[!'()~]|%20/g;

var replacements = {
  '!': '%21',
  "'": '%27',
  '(': '%28',
  ')': '%29',
  '~': '%7E',
  '%20': '+'
};

var replacer = function (match) {
  return replacements[match];
};

var serialize = function (it) {
  return replace$1(encodeURIComponent(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator(getInternalParamsState(params).entries),
    kind: kind
  });
}, 'Iterator', function next() {
  var state = getInternalIteratorState(this);
  var kind = state.kind;
  var step = state.iterator.next();
  var entry = step.value;
  if (!step.done) {
    step.value = kind === 'keys' ? entry.key : kind === 'values' ? entry.value : [entry.key, entry.value];
  } return step;
}, true);

var URLSearchParamsState = function (init) {
  this.entries = [];
  this.url = null;

  if (init !== undefined) {
    if (isObject(init)) this.parseObject(init);
    else this.parseQuery(typeof init == 'string' ? charAt$3(init, 0) === '?' ? stringSlice$2(init, 1) : init : $toString(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var iteratorMethod = getIteratorMethod(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call$4(next, iterator)).done) {
        entryIterator = getIterator(anObject$4(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call$4(entryNext, entryIterator)).done ||
          (second = call$4(entryNext, entryIterator)).done ||
          !call$4(entryNext, entryIterator).done
        ) throw TypeError$1('Expected sequence with length 2');
        push(this.entries, { key: $toString(first.value), value: $toString(second.value) });
      }
    } else for (var key in object) if (hasOwn(object, key)) {
      push(this.entries, { key: key, value: $toString(object[key]) });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var attributes = split(query, '&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split(attribute, '=');
          push(this.entries, {
            key: deserialize(shift(entry)),
            value: deserialize(join(entry, '='))
          });
        }
      }
    }
  },
  serialize: function () {
    var entries = this.entries;
    var result = [];
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      push(result, serialize(entry.key) + '=' + serialize(entry.value));
    } return join(result, '&');
  },
  update: function () {
    this.entries.length = 0;
    this.parseQuery(this.url.query);
  },
  updateURL: function () {
    if (this.url) this.url.update();
  }
};

// `URLSearchParams` constructor
// https://url.spec.whatwg.org/#interface-urlsearchparams
var URLSearchParamsConstructor = function URLSearchParams(/* init */) {
  anInstance(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  setInternalState(this, new URLSearchParamsState(init));
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength(arguments.length, 2);
    var state = getInternalParamsState(this);
    push(state.entries, { key: $toString(name), value: $toString(value) });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index].key === key) splice(entries, index, 1);
      else index++;
    }
    state.updateURL();
  },
  // `URLSearchParams.prototype.get` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-get
  get: function get(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString(name);
    var val = $toString(value);
    var index = 0;
    var entry;
    for (; index < entries.length; index++) {
      entry = entries[index];
      if (entry.key === key) {
        if (found) splice(entries, index--, 1);
        else {
          found = true;
          entry.value = val;
        }
      }
    }
    if (!found) push(entries, { key: key, value: val });
    state.updateURL();
  },
  // `URLSearchParams.prototype.sort` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-sort
  sort: function sort() {
    var state = getInternalParamsState(this);
    arraySort(state.entries, function (a, b) {
      return a.key > b.key ? 1 : -1;
    });
    state.updateURL();
  },
  // `URLSearchParams.prototype.forEach` method
  forEach: function forEach(callback /* , thisArg */) {
    var entries = getInternalParamsState(this).entries;
    var boundFunction = bind(callback, arguments.length > 1 ? arguments[1] : undefined);
    var index = 0;
    var entry;
    while (index < entries.length) {
      entry = entries[index++];
      boundFunction(entry.value, entry.key, this);
    }
  },
  // `URLSearchParams.prototype.keys` method
  keys: function keys() {
    return new URLSearchParamsIterator(this, 'keys');
  },
  // `URLSearchParams.prototype.values` method
  values: function values() {
    return new URLSearchParamsIterator(this, 'values');
  },
  // `URLSearchParams.prototype.entries` method
  entries: function entries() {
    return new URLSearchParamsIterator(this, 'entries');
  }
}, { enumerable: true });

// `URLSearchParams.prototype[@@iterator]` method
defineBuiltIn$1(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
defineBuiltIn$1(URLSearchParamsPrototype, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });

setToStringTag(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$$4({ global: true, constructor: true, forced: !USE_NATIVE_URL }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL && isCallable$1(Headers)) {
  var headersHas = uncurryThis$4(HeadersPrototype.has);
  var headersSet = uncurryThis$4(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof$1(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create$1(init, {
          body: createPropertyDescriptor(0, $toString(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable$1(nativeFetch)) {
    $$4({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable$1(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $$4({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

var anObject$3 = anObject$f;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$3(this);
  var result = '';
  if (that.hasIndices) result += 'd';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.unicodeSets) result += 'v';
  if (that.sticky) result += 'y';
  return result;
};

var fails$5 = fails$k;
var global$3 = global$n;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$3.RegExp;

var UNSUPPORTED_Y$1 = fails$5(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$5(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$5(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = $RegExp$2('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});

var regexpStickyHelpers = {
  BROKEN_CARET: BROKEN_CARET,
  MISSED_STICKY: MISSED_STICKY,
  UNSUPPORTED_Y: UNSUPPORTED_Y$1
};

var fails$4 = fails$k;
var global$2 = global$n;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$2.RegExp;

var regexpUnsupportedDotAll = fails$4(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$3 = fails$k;
var global$1 = global$n;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$1.RegExp;

var regexpUnsupportedNcg = fails$3(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$3 = functionCall;
var uncurryThis$3 = functionUncurryThis;
var toString$4 = toString$6;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4.exports;
var create = objectCreate;
var getInternalState = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$2 = uncurryThis$3(''.charAt);
var indexOf = uncurryThis$3(''.indexOf);
var replace = uncurryThis$3(''.replace);
var stringSlice$1 = uncurryThis$3(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$3(nativeExec, re1, 'a');
  call$3(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState(re);
    var str = toString$4(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$3(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$3(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$1(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$2(str, re.lastIndex - 1) !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = call$3(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$1(match.input, charsAdded);
        match[0] = stringSlice$1(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call$3(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$3 = _export;
var exec = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$3({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$2 = functionUncurryThisClause;
var defineBuiltIn = defineBuiltIn$8;
var regexpExec$1 = regexpExec$2;
var fails$2 = fails$k;
var wellKnownSymbol = wellKnownSymbol$j;
var createNonEnumerableProperty = createNonEnumerableProperty$5;

var SPECIES = wellKnownSymbol('species');
var RegExpPrototype = RegExp.prototype;

var fixRegexpWellKnownSymbolLogic = function (KEY, exec, FORCED, SHAM) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails$2(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails$2(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    FORCED
  ) {
    var uncurriedNativeRegExpMethod = uncurryThis$2(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$2(nativeMethod);
      var $exec = regexp.exec;
      if ($exec === regexpExec$1 || $exec === RegExpPrototype.exec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: uncurriedNativeRegExpMethod(regexp, str, arg2) };
        }
        return { done: true, value: uncurriedNativeMethod(str, regexp, arg2) };
      }
      return { done: false };
    });

    defineBuiltIn(String.prototype, KEY, methods[0]);
    defineBuiltIn(RegExpPrototype, SYMBOL, methods[1]);
  }

  if (SHAM) createNonEnumerableProperty(RegExpPrototype[SYMBOL], 'sham', true);
};

// `SameValue` abstract operation
// https://tc39.es/ecma262/#sec-samevalue
// eslint-disable-next-line es/no-object-is -- safe
var sameValue$1 = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare -- NaN check
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

var call$2 = functionCall;
var anObject$2 = anObject$f;
var isCallable = isCallable$m;
var classof = classofRaw$2;
var regexpExec = regexpExec$2;

var $TypeError$1 = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call$2(exec, R, S);
    if (result !== null) anObject$2(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call$2(regexpExec, R, S);
  throw $TypeError$1('RegExp#exec called on incompatible receiver');
};

var call$1 = functionCall;
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var anObject$1 = anObject$f;
var isNullOrUndefined$1 = isNullOrUndefined$6;
var requireObjectCoercible$3 = requireObjectCoercible$7;
var sameValue = sameValue$1;
var toString$3 = toString$6;
var getMethod$1 = getMethod$5;
var regExpExec$1 = regexpExecAbstract;

// @@search logic
fixRegExpWellKnownSymbolLogic$1('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible$3(this);
      var searcher = isNullOrUndefined$1(regexp) ? undefined : getMethod$1(regexp, SEARCH);
      return searcher ? call$1(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$3(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject$1(this);
      var S = toString$3(string);
      var res = maybeCallNative(nativeSearch, rx, S);

      if (res.done) return res.value;

      var previousLastIndex = rx.lastIndex;
      if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
      var result = regExpExec$1(rx, S);
      if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
      return result === null ? -1 : result.index;
    }
  ];
});

var $$2 = _export;
var $includes = arrayIncludes.includes;
var fails$1 = fails$k;
var addToUnscopables = addToUnscopables$2;

// FF99+ bug
var BROKEN_ON_SPARSE = fails$1(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$$2({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

var $$1 = _export;
var uncurryThis$1 = functionUncurryThis;
var notARegExp = notARegexp;
var requireObjectCoercible$2 = requireObjectCoercible$7;
var toString$2 = toString$6;
var correctIsRegExpLogic = correctIsRegexpLogic;

var stringIndexOf = uncurryThis$1(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$$1({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString$2(requireObjectCoercible$2(this)),
      toString$2(notARegExp(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});

/**
 * Method to create app parameters
 * @example
 * const appParams = CcfAppParamHelper(appConfig)
 */
function CcfAppParamHelper(appConfig) {
  var _a, _b, _c;
  const searchParams = new URLSearchParams(window.location.search);
  const app = searchParams.get('app') || searchParams.get('state');
  // in case appType is not provided, use default 'cxa'
  const appType = app && Object.values(CcfAppType).includes(app) ? app : 'cxa';
  const appParams = appConfig[appType];
  const env = (_a = getEnvironment(appConfig.cxoneSystemIssuer)) === null || _a === void 0 ? void 0 : _a.toLowerCase();
  const envCxoneClientId = (_c = (_b = appConfig[appType]) === null || _b === void 0 ? void 0 : _b.environment[env]) === null || _c === void 0 ? void 0 : _c.cxoneClientId;
  // override the environment specific clientid if provided in the app-configuration.json file
  envCxoneClientId && (appParams.cxoneClientId = envCxoneClientId);
  appParams.queryString = window.location.search;
  return appParams;
}
/**
 * identify the environment based on the hostname
 * @param cxoneHostname - system host name
 * @returns
 * @example
 * ```
 * const env = getEnvironment('https://cxone.dev.niceincontact.com');
 * ```
 */
const getEnvironment = cxoneHostname => {
  const defaultEnv = 'production';
  const environments = {
    'https://cxone.dev.niceincontact.com': 'dev',
    'https://cxone.test.niceincontact.com': 'test',
    'https://cxone.staging.niceincontact.com': 'staging'
  };
  // get the environment from the NX_DEST_ENV variable otherwise fallback to production
  let currentEnvironment = process.env.NX_DEST_ENV || defaultEnv;
  const browserUrl = window.location.origin;
  // calculate the environment based on the hostname for localhost case
  if (browserUrl.indexOf('//localhost') !== -1) {
    currentEnvironment = environments[cxoneHostname] || currentEnvironment;
  }
  return currentEnvironment;
};

/**
 * Main adapter class for CXone Browser Extension
 */
class CxaExtensionAdapter {
  constructor() {
    this.cxoneExtensionId = '';
  }
  /**
   * Method to create singleton object of the class
   * @example
   */
  static get instance() {
    if (!CxaExtensionAdapter.singleton) {
      CxaExtensionAdapter.singleton = new CxaExtensionAdapter();
    }
    return CxaExtensionAdapter.singleton;
  }
  /**
   * sends message to the cxone extension
   * @param data  - the actual data to be passed to the chrome extension
   * @example
   * ```
   *  sendMessageToExtension({type:'Initialize',data:{}})
   * ```
   */
  sendMessageToExtension(data) {
    if (!this.cxoneExtensionId) {
      return;
    }
    try {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      chrome.runtime.sendMessage(this.cxoneExtensionId, data, () => {
        if (chrome.runtime.lastError) return;
      });
    } catch (error) {
      console.log(`Failed to send message. ${JSON.stringify(error)}`);
    }
  }
}

var uncurryThis = functionUncurryThis;
var toIntegerOrInfinity = toIntegerOrInfinity$3;
var toString$1 = toString$6;
var requireObjectCoercible$1 = requireObjectCoercible$7;

var charAt$1 = uncurryThis(''.charAt);
var charCodeAt = uncurryThis(''.charCodeAt);
var stringSlice = uncurryThis(''.slice);

var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$1(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$1(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice(S, position, position + 2)
          : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

var stringMultibyte = {
  // `String.prototype.codePointAt` method
  // https://tc39.es/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod$1(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod$1(true)
};

var charAt = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};

var call = functionCall;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject = anObject$f;
var isNullOrUndefined = isNullOrUndefined$6;
var toLength = toLength$3;
var toString = toString$6;
var requireObjectCoercible = requireObjectCoercible$7;
var getMethod = getMethod$5;
var advanceStringIndex = advanceStringIndex$1;
var regExpExec = regexpExecAbstract;

// @@match logic
fixRegExpWellKnownSymbolLogic('match', function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.es/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = isNullOrUndefined(regexp) ? undefined : getMethod(regexp, MATCH);
      return matcher ? call(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject(this);
      var S = toString(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});

/**
 * Class for desktop studio helpers.
 */
class StudioForDesktop {
  constructor() {
    this.fillData = (payload, dispatch, initialize, setToken, setData) => {
      let data = payload;
      try {
        data = JSON.parse(data);
      } catch (error) {
        console.error(error);
      }
      const {
        Meta = {},
        Data = {}
      } = data !== null && data !== void 0 ? data : {};
      if (!(Meta === null || Meta === void 0 ? void 0 : Meta.token)) {
        return -1;
      }
      dispatch(setToken(Meta === null || Meta === void 0 ? void 0 : Meta.token));
      dispatch(setData(Data));
      dispatch(initialize());
      return 0;
    };
    this.setupCommunicationInterface = (dispatch, initialize, setToken, setData) => {
      window.fillData = this.setfillData(this.fillData, dispatch, initialize, setToken, setData);
    };
    this.populate = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data, closeAfterSave) => __awaiter(this, void 0, void 0, function* () {
      var _a, _b;
      const window = (_a = this['getWindowObject']()) !== null && _a !== void 0 ? _a : {};
      yield (_b = window === null || window === void 0 ? void 0 : window.boundAsync) === null || _b === void 0 ? void 0 : _b.populate(JSON.stringify({
        Data: data
      }));
      if (!closeAfterSave) {
        yield this.close();
      }
    });
    this.close = () => __awaiter(this, void 0, void 0, function* () {
      var _c, _d;
      const window = (_c = this['getWindowObject']()) !== null && _c !== void 0 ? _c : {};
      yield (_d = window === null || window === void 0 ? void 0 : window.boundAsync) === null || _d === void 0 ? void 0 : _d.closeDialog();
    });
    this.getWindowObject = () => window;
    this.setfillData = (fillData, dispatch, initialize, setToken, setData) => payload => fillData(payload, dispatch, initialize, setToken, setData);
  }
}
/**
 * Class for web studio helpers.
 */
class StudioForWeb {
  constructor() {
    this.eventListenerForCommunicationInterface = (message, dispatch, initialize, setToken, setData) => {
      const {
        data = {}
      } = message !== null && message !== void 0 ? message : {};
      if ((data === null || data === void 0 ? void 0 : data.issuer) === 'cxs') {
        this.actionId = data === null || data === void 0 ? void 0 : data.actionId;
        this.uid = data === null || data === void 0 ? void 0 : data.uid;
        Studio.instance.setContext('web');
        dispatch(setToken(data === null || data === void 0 ? void 0 : data.token));
        dispatch(setData(data === null || data === void 0 ? void 0 : data.properties));
        dispatch(initialize());
      }
    };
    this.onMessage = (dispatch, initialize, setToken, setData) => message => this.eventListenerForCommunicationInterface(message, dispatch, initialize, setToken, setData);
    this.setupCommunicationInterface = (origin, dispatch, initialize, setToken, setData) => {
      var _a;
      (_a = window === null || window === void 0 ? void 0 : window.parent) === null || _a === void 0 ? void 0 : _a.postMessage({
        cxsEditorReady: true,
        origin
      }, '*');
      window === null || window === void 0 ? void 0 : window.addEventListener('message', this.onMessage(dispatch, initialize, setToken, setData), false);
    };
    this.populate = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data, closeAfterSave) => {
      var _a;
      (_a = window === null || window === void 0 ? void 0 : window.parent) === null || _a === void 0 ? void 0 : _a.postMessage({
        actionId: this.actionId,
        uid: this.uid,
        properties: data,
        origin: 'iframe'
      }, '*');
      if (!closeAfterSave) {
        this.close();
      }
    };
    this.close = () => {
      var _a;
      (_a = window === null || window === void 0 ? void 0 : window.parent) === null || _a === void 0 ? void 0 : _a.postMessage({
        actionId: this.actionId,
        uid: this.uid,
        close: true
      }, "*");
    };
  }
}
/**
 * Class for studio helpers.
 */
class Studio {
  constructor() {
    this._context = 'desktop';
    this.desktop = new StudioForDesktop();
    this.web = new StudioForWeb();
    /**
     * Method for updating editor context.
     */
    this.setContext = context => {
      this._context = context;
    };
    /**
     * Method for populating studio action with editor data.
     * @example
     * ```
     * const studio = Studio.instace;
     * ```
     */
    this.populate = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data, closeAfterSave) => __awaiter(this, void 0, void 0, function* () {
      const context = this.context;
      switch (context) {
        case 'desktop':
          {
            yield this.desktop.populate(data, closeAfterSave);
            break;
          }
        case 'web':
          {
            this.web.populate(data, closeAfterSave);
            break;
          }
      }
    });
    /**
     * Method for populating studio action with editor data.
     * @example
     * ```
     * const studio = Studio.instace;
     * ```
     */
    this.close = () => __awaiter(this, void 0, void 0, function* () {
      const context = this.context;
      switch (context) {
        case 'desktop':
          {
            yield this.desktop.close();
            break;
          }
        case 'web':
          {
            this.web.close();
            break;
          }
      }
    });
  }
  /**
   * Method to create singleton object of the class
   * @example
   * ```
   * const studio = Studio.instace;
   * ```
   */
  static get instance() {
    if (!Studio.studio) {
      Studio.studio = new Studio();
    }
    return Studio.studio;
  }
  /**
   * Method to get editor context.
   * @example
   */
  get context() {
    return this._context;
  }
}

var aCallable = aCallable$8;
var toObject = toObject$4;
var IndexedObject = indexedObject;
var lengthOfArrayLike = lengthOfArrayLike$4;

var $TypeError = TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable(callbackfn);
    var O = toObject(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike(O);
    var index = IS_RIGHT ? length - 1 : 0;
    var i = IS_RIGHT ? -1 : 1;
    if (argumentsLength < 2) while (true) {
      if (index in self) {
        memo = self[index];
        index += i;
        break;
      }
      index += i;
      if (IS_RIGHT ? index < 0 : length <= index) {
        throw $TypeError('Reduce of empty array with no initial value');
      }
    }
    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
    return memo;
  };
};

var arrayReduce = {
  // `Array.prototype.reduce` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduce
  left: createMethod(false),
  // `Array.prototype.reduceRight` method
  // https://tc39.es/ecma262/#sec-array.prototype.reduceright
  right: createMethod(true)
};

var fails = fails$k;

var arrayMethodIsStrict$1 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

var $ = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict = arrayMethodIsStrict$1;
var CHROME_VERSION = engineV8Version;
var IS_NODE = engineIsNode;

var STRICT_METHOD = arrayMethodIsStrict('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$({ target: 'Array', proto: true, forced: !STRICT_METHOD || CHROME_BUG }, {
  reduce: function reduce(callbackfn /* , initialValue */) {
    var length = arguments.length;
    return $reduce(this, callbackfn, length, length > 1 ? arguments[1] : undefined);
  }
});

/**
 * Class for validating workflow parameter values.
 */
class Validate$2 {
  constructor() {
    /**
     * Helper method to check if parameters are valid
     * @param parameter - specific property string value that has been decoded
     * @param configurationByConfigurationId - object of configurations ID keys and its asscoiated data.
     * @param property - studio action workflow property we are looking for.
     * @example - validateParameter()
     */
    this.validateConfigIdExists = (parameter, configurationByConfigurationId, property) => {
      var _a;
      if (!(Object.keys(parameter).length > 0)) {
        return false;
      }
      if (!((parameter === null || parameter === void 0 ? void 0 : parameter.configurationId) && ((_a = configurationByConfigurationId[parameter === null || parameter === void 0 ? void 0 : parameter.configurationId]) === null || _a === void 0 ? void 0 : _a.id))) {
        toast.error(`${property} configuration is inactive or does not exist`);
        return false;
      }
      return true;
    };
    /**
     * Helper method to check if parameters are valid
     * @param workflowObjects - array of all workflow objects that have been decoded from studio
     * @example - allWorklfowConfigIdsSame([searchWorkflow,timelineWorkflow,dataMemorializationWorkflow])
     */
    this.areAllWorkflowConfigIdsEqual = workflowObjects => {
      const validWorkflows = workflowObjects.filter(obj => Object.keys(obj).length > 0);
      if (validWorkflows.length === 0) {
        return null;
      }
      const [workflow = {}] = validWorkflows !== null && validWorkflows !== void 0 ? validWorkflows : [];
      const returnedWorkflow = validWorkflows.reduce((firstWorkflow, currentWorkflow) => {
        return (currentWorkflow === null || currentWorkflow === void 0 ? void 0 : currentWorkflow.configurationId) !== (firstWorkflow === null || firstWorkflow === void 0 ? void 0 : firstWorkflow.configurationId) ? null : firstWorkflow;
      }, workflow);
      if (!returnedWorkflow) {
        return null;
      }
      return returnedWorkflow === null || returnedWorkflow === void 0 ? void 0 : returnedWorkflow.configurationId;
    };
    /**
     * Helper method to check if parameters are valid
     * @param workflowObjects - array of all workflow objects that have been decoded from studio
     * @example - allWorklfowConfigIdsSame([searchWorkflow,timelineWorkflow,dataMemorializationWorkflow])
     */
    this.isWorkflowOfCorrectType = (workflowActionType, workflowParamValue = {}, workflowsByConfiguration = []) => {
      if (!(Object.keys(workflowParamValue).length > 0)) {
        return false;
      }
      const isWorkflowTypeCorrect = workflowsByConfiguration.some(obj => (obj === null || obj === void 0 ? void 0 : obj.workflowId) === (workflowParamValue === null || workflowParamValue === void 0 ? void 0 : workflowParamValue.workflowId) && (obj === null || obj === void 0 ? void 0 : obj.workflowAction) === workflowActionType);
      if (!isWorkflowTypeCorrect) {
        if (workflowActionType === 'DataMemorialization') {
          toast.error('Invalid workflow for dataMemorializationWorkflow');
        } else {
          toast.error(`Invalid workflow for ${workflowActionType.toLowerCase()}Workflow`);
        }
      }
      return isWorkflowTypeCorrect;
    };
  }
}

/**
 * Class for validating parameter values.
 */
class ValidateBase {
  constructor() {
    this.isProvided = value => (value !== null && value !== void 0 ? value : '').length > 0;
  }
}
/**
 * Class for validating workflow parameter values.
 */
class ValidateWorkflow extends ValidateBase {
  constructor() {
    super(...arguments);
    this.isValid = (workflowId, workflows = []) => (workflows !== null && workflows !== void 0 ? workflows : []).some(workflow => (workflow === null || workflow === void 0 ? void 0 : workflow.workflowId) === workflowId);
  }
}
/**
 * Class for validating workflow parameter values.
 */
class ValidateConfiguration extends ValidateBase {
  constructor() {
    super(...arguments);
    this.isValid = (configurationId, configurationByConfigurationId = {}) => {
      var _a;
      return Object.keys((_a = configurationByConfigurationId[configurationId]) !== null && _a !== void 0 ? _a : {}).includes('id');
    };
  }
}
/**
 * Class for parameter validation.
 */
class Validate$1 {
  constructor() {
    this.configuration = new ValidateConfiguration();
    this.workflow = new ValidateWorkflow();
  }
}

/**
 * Class for parameter validation.
 */
class Validate {
  constructor() {
    this.workflowConfiguration = new Validate$2();
    this.workflowExecute = new Validate$1();
  }
  /**
   * Method to create singleton object of the class.
   * ```
   * @example
   * const validate = Validate.instance;
   * ```
   */
  static get instance() {
    if (!Validate.singleton) {
      Validate.singleton = new Validate();
    }
    return Validate.singleton;
  }
}

/**
 * Class for CXS helpers.
 */
class Helpers {
  constructor() {
    this.studio = Studio.instance;
    this.validate = Validate.instance;
    /**
     * Method to get cxone host name
     * @example
     * const cxoneHostName = getCXoneSystemIssuer()
     */
    this.getCXoneSystemIssuer = (browserUrl, cxoneSystemIssuer) => {
      let cxoneHostname = cxoneSystemIssuer;
      if (!browserUrl.includes('//localhost')) {
        const isEnvMatched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/dev|test|staging/);
        const isFedMatched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/na2./);
        const isFedHighMatched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/na3./);
        const isAu2Matched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/sov1.au/);
        const isEu2Matched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/sov1.eu/);
        if (isEnvMatched) {
          cxoneHostname = `https://cxone.${isEnvMatched}.niceincontact.com`;
        } else if (isFedMatched) {
          cxoneHostname = 'https://cxone-gov.niceincontact.com';
        } else if (isFedHighMatched) {
          cxoneHostname = 'https://nicecxone-fed.com';
        } else if (isAu2Matched) {
          cxoneHostname = 'https://nicecxone-sov1.au';
        } else if (isEu2Matched) {
          cxoneHostname = 'https://nicecxone-sov1.eu';
        } else {
          cxoneHostname = 'https://cxone.niceincontact.com';
        }
      }
      return cxoneHostname;
    };
  }
  /**
   * Method to create singleton object of the class
   * @example
   * ```
   * const Helpers = Helpers.instace;
   * ```
   */
  static get instance() {
    if (!Helpers.helpers) {
      Helpers.helpers = new Helpers();
    }
    return Helpers.helpers;
  }
}
const cxs = Helpers.instance;

/**
 * Common helper class to contain shared functions which can be used across apps.
 * @example - triggerCRMScreenPop(screenPopData);
 */
function triggerCRMScreenPop(activityData, action) {
  var _a, _b, _c, _d;
  if (!activityData) {
    return;
  }
  const pinRecords = (_a = activityData === null || activityData === void 0 ? void 0 : activityData.result[0]) === null || _a === void 0 ? void 0 : _a.pinRecords;
  const relatedRecords = (_b = activityData === null || activityData === void 0 ? void 0 : activityData.result[0]) === null || _b === void 0 ? void 0 : _b.records;
  const screenPopBaseUrl = (_d = (_c = activityData.result) === null || _c === void 0 ? void 0 : _c[0]) === null || _d === void 0 ? void 0 : _d.system.baseUrl;
  const screenPopEventArgs = {};
  screenPopEventArgs.detail = {
    contactId: activityData.contactId,
    actionType: action
  };
  if (action && action !== '') {
    screenPopEventArgs.detail.actionType = action;
  }
  /**
   * Function to initiate screen pop
   * @param activityData - activity data response received from the workflow
   * @example - handleScreenPop(screenPopData);
   */
  const handleScreenPop = records => {
    for (const record of records) {
      const activityRecord = {
        display: record.display,
        id: record.id,
        label: record.label,
        type: record.type,
        url: screenPopBaseUrl + record.url
      };
      screenPopEventArgs.detail.activityRecord = activityRecord;
      const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, screenPopEventArgs);
      window.dispatchEvent(customEvent);
    }
  };
  if (pinRecords && pinRecords.length > 0) {
    const screenPopPinRecords = pinRecords.filter(record => record.screenPop);
    if (screenPopPinRecords.length > 0) {
      handleScreenPop(screenPopPinRecords);
    }
  }
  if (relatedRecords && relatedRecords.length > 0) {
    if (relatedRecords.length === 1) {
      handleScreenPop(relatedRecords);
    } else {
      const screenPopRelatedRecords = relatedRecords.filter(record => record.screenPop);
      if (screenPopRelatedRecords.length > 0) {
        handleScreenPop(screenPopRelatedRecords);
      }
    }
  }
}

/**
 * Utility class to transform type from SDK to Integration schema.
 * This is to be used by this library, not needed to export from index
 */
class CcfIntegrationTransformer {
  /**
   * Transforms object to CXoneScreenPopData that can be used by any integration apps.
   * @param source - Source object from CCF SDK that has the CRM Search Result
   * @returns Object for Integration Apps
   * @example - NA -
   */
  static toScreenPopEntityData(source) {
    var _a;
    const target = {
      type: "PopEntity",
      params: {
        entity: source.activityRecord.type,
        entityId: source.activityRecord.id,
        entityLabel: source.activityRecord.label,
        url: source.activityRecord.url,
        data: ((_a = source.activityRecord) === null || _a === void 0 ? void 0 : _a.data) || ''
      },
      contactId: source.contactId,
      actionType: source.actionType
    };
    return target;
  }
  /**
   * Transforms object to CXoneVoiceContactData that can be used by any integration apps.
   * @param source - Source object from CCF SDK that has Voice Contact Details
   * @returns Object for Integration Apps
   * @example - NA -
   */
  static toVoiceContactData(source) {
    const target = {
      interactionId: source.interactionId,
      contactId: source.contactID,
      skillId: source.skill,
      skillName: source.skillName,
      status: source.status,
      type: source.type,
      finalState: source.finalState,
      ani: source.ani,
      dnis: source.dnis,
      direction: source.direction
    };
    return target;
  }
  /**
   * Transforms object to CXoneDigitalContactData that can be used by any integration apps.
   * @param source - Source object from CCF SDK that has Digital Contact Details
   * @returns Object for Integration Apps
   * @example - NA -
   */
  static toDigitalContactData(source) {
    var _a;
    const target = {
      interactionId: source.interactionId,
      contactId: source.contactID,
      skillId: source.skillId,
      skillName: source.skill,
      status: source.status,
      customerName: source.customerName,
      eventType: (_a = source.eventDetails) === null || _a === void 0 ? void 0 : _a.eventType,
      type: source.type,
      isCaseAssigned: source.isCaseAssigned
    };
    return target;
  }
  /**
   * Transforms object to CXoneAgentStateData that can be used by any integration apps.
   * @param source - Source object from CCF SDK that has agent state Details
   * @returns Object for Integration Apps
   * @example - NA -
   */
  static toAgentCurrentStateData(source) {
    const target = {
      reason: source.currentState.reason,
      state: source.currentState.state,
      isACW: source.currentState.isACW,
      startTime: source.currentState.startTime,
      acwTimeout: source.currentState.acwTimeout,
      cxoneState: source.currentState.cxoneState
    };
    return target;
  }
  /**
   * Transforms object to CXoneAuthRequestData that can be used by any integration apps.
   * @param source - Source object from CXone Agent that has Auth Request information
   * @returns Object for Integration Apps
   * @example - NA -
   */
  static toCXoneAuthRequestData(source) {
    const target = {
      authorizeUrl: source.authUrl
    };
    return target;
  }
}

/**
 * CXone Agent Interfaces
 */
class CXoneAgentIntegrationManager {
  /**
   * Constructor to initialize instance
   * @example
   */
  constructor(embeddedAgentIntegration) {
    this.eventHandlerAdded = false;
    this.agentIntegration = embeddedAgentIntegration;
  }
  /**
   * Handler of Screenpop CustomEvent raised from CXone Agent (on Click of Customer Card Activity)
   * @example
   */
  handleCXoneScreenPopEvent(event) {
    const eventData = event.detail;
    const screepopData = CcfIntegrationTransformer.toScreenPopEntityData(eventData);
    this.agentIntegration.handleCXoneScreenpop(screepopData);
  }
  /**
   * Handler of DigitalContact CustomEvent raised from CXone Agent (on Contact Status Changes)
   * @example
   */
  handleCXoneDigitalContactEvent(event) {
    const eventData = event.detail;
    const digitalContactData = CcfIntegrationTransformer.toDigitalContactData(eventData);
    this.agentIntegration.handleCXoneDigitalContactEvent(digitalContactData);
  }
  /**
   * Handler of VoiceContact CustomEvent raised from CXone Agent (on Contact Status Changes)
   * @example
   */
  handleCXoneVoiceContactEvent(event) {
    const eventData = event.detail;
    const voiceContactData = CcfIntegrationTransformer.toVoiceContactData(eventData);
    this.agentIntegration.handleCXoneVoiceContactEvent(voiceContactData);
  }
  /**
   * Handler for Agent state change event raised from CXone Agent (on Contact Status Changes)
   * @example
   */
  handleCXoneAgentStateChangeEvent(event) {
    const eventData = event.detail;
    const agentCurrentStateData = CcfIntegrationTransformer.toAgentCurrentStateData(eventData);
    this.agentIntegration.handleCXoneAgentStateChangeEvent(agentCurrentStateData);
  }
  /**
   * Callback method invoked from Integration Module to start click-to-dial functionality in CXone Agent
   */
  handleIntegrationClickToAct(params) {
    const eventArgs = {};
    eventArgs.detail = params;
    const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_CLICK_TO_DIAL_EVENT, eventArgs);
    window.dispatchEvent(customEvent);
    return true;
  }
  /**
   * Callback method invoked from Integration Module to send/update locale to CXone Agent.
   */
  handleIntegrationUpdateLocale(params) {
    const eventArgs = {};
    eventArgs.detail = params;
    const localeSignal = new CustomEvent(CXoneAgentEvents.CXONE_AGENT_UPDATE_LOCALE_EVENT, eventArgs);
    window.dispatchEvent(localeSignal);
    return true;
  }
  /**
   * Callback method invoked from Integration Module to send the partner account details to listner
   * @example -
   * ```
   * handleIntegrationPresenceSyncRule(params as CXonePartnerAccountDetails)
   * ```
   */
  handleIntegrationPresenceSyncRule(params) {
    const eventArgs = {};
    eventArgs.detail = params;
    const presenceSync = new CustomEvent(CXoneAgentEvents.CXONE_AGENT_PRESENCE_SYNC_RULE, eventArgs);
    window.dispatchEvent(presenceSync);
    return true;
  }
  /** General handler method for executing stuff once cxone-agent application is initialized
   * e.g. sending locale
   */
  handleCXoneAgentAppInitializedEvent(event) {
    this.registerIntegrationAppEvents();
  }
  /**
  * Handler of Authentication URL CustomEvent raised from CXone Agent (on Click of Login Button)
  * @example handleCXoneAgentAuthRequest(event: CustomEvent)
  */
  handleCXoneAgentAuthRequest(event) {
    const eventData = event.detail;
    const authReqData = CcfIntegrationTransformer.toCXoneAuthRequestData(eventData);
    this.agentIntegration.handleCXoneAuthRequest(authReqData);
    this.initCXoneAuthResponseCallbackHandler();
  }
  /**
  * Handler of callback method which sends the authentication code.
  * @example initCXoneAuthResponseCallbackHandler()
  */
  initCXoneAuthResponseCallbackHandler() {
    this.agentIntegration.onAuthResponse(this.dispatchAuthStatusToCXoneAgent);
  }
  /**
  * Handler of Authentication Response received from MS Teams embedded app once the auth is successful.
  * params - Event with authentication parameters.
  *
  * @example dispatchAuthStatusToCXoneAgent(CustomEvent)
  */
  dispatchAuthStatusToCXoneAgent(params) {
    const eventArgs = {};
    eventArgs.detail = params;
    const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_AGENT_AUTH_RESPONSE, eventArgs);
    window.dispatchEvent(customEvent);
    return true;
  }
  /**
  * Handler of CustomEvent raised for CXone Agent Logoff (Session End)
  * @example handleCXoneAgentAuthRequest(event: CustomEvent)
  */
  handleCXoneAgentLogOff(event) {
    this.agentIntegration.finalize();
  }
  /**
   * Handler of callback method which sends the presence sync rules to crm
   * @example -
   * ```
   * this.handleCXonePresenceSyncEvent(event as CustomEventInit)
   * ```
   */
  handleCXonePresenceSyncEvent(event) {
    const eventData = event.detail;
    this.agentIntegration.handleCXonePresenceSyncEvent(eventData);
  }
  /**
   * Method to add listeners for all the events coming from cxone-agent application
   */
  registerCXoneAgentEvents() {
    window.addEventListener(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, this.handleCXoneScreenPopEvent.bind(this));
    window.addEventListener(CXoneAgentEvents.CXONE_VOICE_CONTACT_EVENT, this.handleCXoneVoiceContactEvent.bind(this));
    window.addEventListener(CXoneAgentEvents.CXONE_DIGITAL_CONTACT_EVENT, this.handleCXoneDigitalContactEvent.bind(this));
    window.addEventListener(CXoneAgentEvents.CXONE_AGENT_STATE_CHANGE, this.handleCXoneAgentStateChangeEvent.bind(this));
    window.addEventListener(CXoneAgentEvents.CXONE_AGENT_APP_INITIALIZED, this.handleCXoneAgentAppInitializedEvent.bind(this), {
      once: true
    });
    window.addEventListener(CXoneAgentEvents.CXONE_AGENT_AUTH_REQUEST, this.handleCXoneAgentAuthRequest.bind(this));
    window.addEventListener(CXoneAgentEvents.CXONE_AGENT_LOG_OFF, this.handleCXoneAgentLogOff.bind(this));
    window.addEventListener(CXoneAgentEvents.CXONE_PRESENCE_SYNC_EVENT, this.handleCXonePresenceSyncEvent.bind(this));
    window.addEventListener(CXoneAgentEvents.CXONE_AGENT_HOME_INITIALIZED, this.handleCXoneAgentHomeInitialized.bind(this));
  }
  /**
   * Method to initialize listeners for all the events initiated by CXoneAgent Home apps.
   */
  handleCXoneAgentHomeInitialized() {
    this.agentIntegration.getPartnerAccountDetails(this.handleIntegrationPresenceSyncRule);
  }
  /**
   * Method to initialize listeners for all the events initiated by integration apps.
   */
  registerIntegrationAppEvents() {
    this.agentIntegration.onLocaleChange(this.handleIntegrationUpdateLocale);
  }
  /**
   * Initializes this module and adds handler for CXone Agent CustomEvent
   * @param integration - instance of integration module
   * @example const added = connector.addEventHandlers(integration);
   */
  initialize() {
    this.agentIntegration.onClickToAct(this.handleIntegrationClickToAct);
    if (this.eventHandlerAdded) {
      //Event Listeners already added
      return false; // return early.
    }

    this.registerCXoneAgentEvents();
    this.dispatchInitializationStatusToHost();
    this.eventHandlerAdded = true;
    return true;
  }
  /**
  * @remarks -Event to dispatch to CXone App once the Embedded App is successfully initialized
  * This event will basically help CXone to understand if it needs to execute only after the
  * embedded-app has initialized.
  */
  dispatchInitializationStatusToHost() {
    const eventArgs = {};
    eventArgs.detail = {
      embeddedAppInitialized: true
    };
    const customEvent = new CustomEvent(CXoneAgentEvents.EMBEDDED_APP_INITIALIZED, eventArgs);
    window.dispatchEvent(customEvent);
    return true;
  }
}

/**
 * Class responsible for passing the necessary information like BUId, Agent Id, Agent leg ID etc. for the watchRTC integration.
 */
class WatchRTCService {
  constructor() {
    this.isWatchRTCInitialized = false;
    this.initOptions = {
      rtcApiKey: '',
      rtcRoomId: '',
      rtcPeerId: '',
      buID: '',
      clusterId: '',
      CXoneAgentConsoleType: '',
      CXoneAgentConsoleVersion: ''
    };
  }
  /**
    * Method to create singleton object of the class
    * ```
    * @example
    * const watchRTCService = WatchRTCService.instance;
    * ```
    */
  static get instance() {
    if (!WatchRTCService.singleton) {
      WatchRTCService.singleton = new WatchRTCService();
    }
    return WatchRTCService.singleton;
  }
  /**
   * construct the message for initializing the watchRTC
   */
  getWatchRTCInitOptions(roomId) {
    return {
      rtcApiKey: this.initOptions.rtcApiKey,
      rtcRoomId: roomId,
      rtcPeerId: this.initOptions.rtcPeerId
    };
  }
  /**
   * construct the message for passing agent specific message to webrtc i.e agentlefid, buid, clusterid etc.
   */
  getWatchRTCAgentOptions() {
    return {
      buID: this.initOptions.buID,
      clusterId: this.initOptions.clusterId,
      CXoneAgentConsoleType: this.initOptions.CXoneAgentConsoleType,
      CXoneAgentConsoleVersion: this.initOptions.CXoneAgentConsoleVersion
    };
  }
  /**
  * initialize watchRTC
  * @param options -   all the options required for voice quality monitor service
  * @example
  * ```
  * init({})
  * ```
  */
  init(options) {
    this.initOptions = options;
    this.isWatchRTCInitialized = false;
  }
  /**
   * pass agentLegId to the watchRTC
   * @param agentLegId -  pass the agentleg id when ever the agent leg connection attempt is made.
   * @example updateAgentLegId(43222)
   */
  updateAgentLegId(agentLegId) {
    // don't invoke the initialization until we get the agentleg id
    if (!this.isWatchRTCInitialized) {
      watchRTC.init(this.getWatchRTCInitOptions(agentLegId));
      this.isWatchRTCInitialized = true;
    }
    watchRTC.setConfig(this.getWatchRTCInitOptions(agentLegId));
    watchRTC.addKeys(this.getWatchRTCAgentOptions());
  }
}

export { AgentStates, CXoneAgentEvents, CXoneAgentIntegrationManager, CXoneCallContactStatus, CXoneDigitalContactStatus, CXoneDigitalEventType, CcfAppParamHelper, CcfAppType, CcfGenericConstants, CcfMessageType, CcfRegexPatterns, CcfValidationHelper, CxaExtensionAdapter, IntegrationComponentLoader, WatchRTCService, cxs, getAgentRemoteEntryUrl, getRemoteEntryUrl, loadIntegrationModule, triggerCRMScreenPop, useScript };
