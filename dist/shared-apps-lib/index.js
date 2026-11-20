import { jsx, Fragment } from 'react/jsx-runtime';
import React, { useContext, useState, createContext, memo, useRef, useEffect, useMemo, Suspense } from 'react';
import { toast } from 'react-toastify';
import watchRTC from '@testrtc/watchrtc-sdk';

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var fails$m = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};

var fails$l = fails$m;

var functionBindNative = !fails$l(function () {
  // eslint-disable-next-line es/no-function-prototype-bind -- safe
  var test = (function () { /* empty */ }).bind();
  // eslint-disable-next-line no-prototype-builtins -- safe
  return typeof test != 'function' || test.hasOwnProperty('prototype');
});

var NATIVE_BIND$3 = functionBindNative;

var FunctionPrototype$2 = Function.prototype;
var call$l = FunctionPrototype$2.call;
var uncurryThisWithBind = NATIVE_BIND$3 && FunctionPrototype$2.bind.bind(call$l, call$l);

var functionUncurryThis = NATIVE_BIND$3 ? uncurryThisWithBind : function (fn) {
  return function () {
    return call$l.apply(fn, arguments);
  };
};

var uncurryThis$m = functionUncurryThis;

var toString$a = uncurryThis$m({}.toString);
var stringSlice$4 = uncurryThis$m(''.slice);

var classofRaw$2 = function (it) {
  return stringSlice$4(toString$a(it), 8, -1);
};

var uncurryThis$l = functionUncurryThis;
var fails$k = fails$m;
var classof$8 = classofRaw$2;

var $Object$4 = Object;
var split$3 = uncurryThis$l(''.split);

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var indexedObject = fails$k(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins -- safe
  return !$Object$4('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof$8(it) == 'String' ? split$3(it, '') : $Object$4(it);
} : $Object$4;

// we can't use just `it == null` since of `document.all` special case
// https://tc39.es/ecma262/#sec-IsHTMLDDA-internal-slot-aec
var isNullOrUndefined$6 = function (it) {
  return it === null || it === undefined;
};

var isNullOrUndefined$5 = isNullOrUndefined$6;

var $TypeError$g = TypeError;

// `RequireObjectCoercible` abstract operation
// https://tc39.es/ecma262/#sec-requireobjectcoercible
var requireObjectCoercible$7 = function (it) {
  if (isNullOrUndefined$5(it)) throw $TypeError$g("Can't call method on " + it);
  return it;
};

// toObject with fallback for non-array-like ES3 strings
var IndexedObject$2 = indexedObject;
var requireObjectCoercible$6 = requireObjectCoercible$7;

var toIndexedObject$5 = function (it) {
  return IndexedObject$2(requireObjectCoercible$6(it));
};

var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global$o =
  // eslint-disable-next-line es/no-global-this -- safe
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  // eslint-disable-next-line no-restricted-globals -- safe
  check(typeof self == 'object' && self) ||
  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
  // eslint-disable-next-line no-new-func -- fallback
  (function () { return this; })() || Function('return this')();

var shared$4 = {exports: {}};

var isPure = false;

var global$n = global$o;

// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$6 = Object.defineProperty;

var defineGlobalProperty$3 = function (key, value) {
  try {
    defineProperty$6(global$n, key, { value: value, configurable: true, writable: true });
  } catch (error) {
    global$n[key] = value;
  } return value;
};

var global$m = global$o;
var defineGlobalProperty$2 = defineGlobalProperty$3;

var SHARED = '__core-js_shared__';
var store$3 = global$m[SHARED] || defineGlobalProperty$2(SHARED, {});

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

var $Object$3 = Object;

// `ToObject` abstract operation
// https://tc39.es/ecma262/#sec-toobject
var toObject$6 = function (argument) {
  return $Object$3(requireObjectCoercible$5(argument));
};

var uncurryThis$k = functionUncurryThis;
var toObject$5 = toObject$6;

var hasOwnProperty = uncurryThis$k({}.hasOwnProperty);

// `HasOwnProperty` abstract operation
// https://tc39.es/ecma262/#sec-hasownproperty
// eslint-disable-next-line es/no-object-hasown -- safe
var hasOwnProperty_1 = Object.hasOwn || function hasOwn(it, key) {
  return hasOwnProperty(toObject$5(it), key);
};

var uncurryThis$j = functionUncurryThis;

var id = 0;
var postfix = Math.random();
var toString$9 = uncurryThis$j(1.0.toString);

var uid$2 = function (key) {
  return 'Symbol(' + (key === undefined ? '' : key) + ')_' + toString$9(++id + postfix, 36);
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

var global$l = global$o;
var isCallable$l = isCallable$m;

var aFunction = function (argument) {
  return isCallable$l(argument) ? argument : undefined;
};

var getBuiltIn$8 = function (namespace, method) {
  return arguments.length < 2 ? aFunction(global$l[namespace]) : global$l[namespace] && global$l[namespace][method];
};

var getBuiltIn$7 = getBuiltIn$8;

var engineUserAgent = getBuiltIn$7('navigator', 'userAgent') || '';

var global$k = global$o;
var userAgent$5 = engineUserAgent;

var process$4 = global$k.process;
var Deno$1 = global$k.Deno;
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
if (!version && userAgent$5) {
  match = userAgent$5.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent$5.match(/Chrome\/(\d+)/);
    if (match) version = +match[1];
  }
}

var engineV8Version = version;

/* eslint-disable es/no-symbol -- required for testing */

var V8_VERSION$1 = engineV8Version;
var fails$j = fails$m;

// eslint-disable-next-line es/no-object-getownpropertysymbols -- required for testing
var symbolConstructorDetection = !!Object.getOwnPropertySymbols && !fails$j(function () {
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

var global$j = global$o;
var shared$3 = shared$4.exports;
var hasOwn$c = hasOwnProperty_1;
var uid$1 = uid$2;
var NATIVE_SYMBOL = symbolConstructorDetection;
var USE_SYMBOL_AS_UID$1 = useSymbolAsUid;

var WellKnownSymbolsStore = shared$3('wks');
var Symbol$1 = global$j.Symbol;
var symbolFor = Symbol$1 && Symbol$1['for'];
var createWellKnownSymbol = USE_SYMBOL_AS_UID$1 ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid$1;

var wellKnownSymbol$j = function (name) {
  if (!hasOwn$c(WellKnownSymbolsStore, name) || !(NATIVE_SYMBOL || typeof WellKnownSymbolsStore[name] == 'string')) {
    var description = 'Symbol.' + name;
    if (NATIVE_SYMBOL && hasOwn$c(Symbol$1, name)) {
      WellKnownSymbolsStore[name] = Symbol$1[name];
    } else if (USE_SYMBOL_AS_UID$1 && symbolFor) {
      WellKnownSymbolsStore[name] = symbolFor(description);
    } else {
      WellKnownSymbolsStore[name] = createWellKnownSymbol(description);
    }
  } return WellKnownSymbolsStore[name];
};

var isCallable$k = isCallable$m;
var $documentAll = documentAll_1;

var documentAll = $documentAll.all;

var isObject$a = $documentAll.IS_HTMLDDA ? function (it) {
  return typeof it == 'object' ? it !== null : isCallable$k(it) || it === documentAll;
} : function (it) {
  return typeof it == 'object' ? it !== null : isCallable$k(it);
};

var isObject$9 = isObject$a;

var $String$3 = String;
var $TypeError$f = TypeError;

// `Assert: Type(argument) is Object`
var anObject$h = function (argument) {
  if (isObject$9(argument)) return argument;
  throw $TypeError$f($String$3(argument) + ' is not an object');
};

var objectDefineProperties = {};

var fails$i = fails$m;

// Detect IE8's incomplete defineProperty implementation
var descriptors = !fails$i(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});

var DESCRIPTORS$c = descriptors;
var fails$h = fails$m;

// V8 ~ Chrome 36-
// https://bugs.chromium.org/p/v8/issues/detail?id=3334
var v8PrototypeDefineBug = DESCRIPTORS$c && fails$h(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(function () { /* empty */ }, 'prototype', {
    value: 42,
    writable: false
  }).prototype != 42;
});

var objectDefineProperty = {};

var global$i = global$o;
var isObject$8 = isObject$a;

var document$3 = global$i.document;
// typeof document.createElement is 'object' in old IE
var EXISTS$1 = isObject$8(document$3) && isObject$8(document$3.createElement);

var documentCreateElement$2 = function (it) {
  return EXISTS$1 ? document$3.createElement(it) : {};
};

var DESCRIPTORS$b = descriptors;
var fails$g = fails$m;
var createElement$1 = documentCreateElement$2;

// Thanks to IE8 for its funny defineProperty
var ie8DomDefine = !DESCRIPTORS$b && !fails$g(function () {
  // eslint-disable-next-line es/no-object-defineproperty -- required for testing
  return Object.defineProperty(createElement$1('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});

var NATIVE_BIND$2 = functionBindNative;

var call$k = Function.prototype.call;

var functionCall = NATIVE_BIND$2 ? call$k.bind(call$k) : function () {
  return call$k.apply(call$k, arguments);
};

var uncurryThis$i = functionUncurryThis;

var objectIsPrototypeOf = uncurryThis$i({}.isPrototypeOf);

var getBuiltIn$6 = getBuiltIn$8;
var isCallable$j = isCallable$m;
var isPrototypeOf$3 = objectIsPrototypeOf;
var USE_SYMBOL_AS_UID = useSymbolAsUid;

var $Object$2 = Object;

var isSymbol$2 = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  var $Symbol = getBuiltIn$6('Symbol');
  return isCallable$j($Symbol) && isPrototypeOf$3($Symbol.prototype, $Object$2(it));
};

var $String$2 = String;

var tryToString$5 = function (argument) {
  try {
    return $String$2(argument);
  } catch (error) {
    return 'Object';
  }
};

var isCallable$i = isCallable$m;
var tryToString$4 = tryToString$5;

var $TypeError$e = TypeError;

// `Assert: IsCallable(argument) is true`
var aCallable$9 = function (argument) {
  if (isCallable$i(argument)) return argument;
  throw $TypeError$e(tryToString$4(argument) + ' is not a function');
};

var aCallable$8 = aCallable$9;
var isNullOrUndefined$4 = isNullOrUndefined$6;

// `GetMethod` abstract operation
// https://tc39.es/ecma262/#sec-getmethod
var getMethod$5 = function (V, P) {
  var func = V[P];
  return isNullOrUndefined$4(func) ? undefined : aCallable$8(func);
};

var call$j = functionCall;
var isCallable$h = isCallable$m;
var isObject$7 = isObject$a;

var $TypeError$d = TypeError;

// `OrdinaryToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-ordinarytoprimitive
var ordinaryToPrimitive$1 = function (input, pref) {
  var fn, val;
  if (pref === 'string' && isCallable$h(fn = input.toString) && !isObject$7(val = call$j(fn, input))) return val;
  if (isCallable$h(fn = input.valueOf) && !isObject$7(val = call$j(fn, input))) return val;
  if (pref !== 'string' && isCallable$h(fn = input.toString) && !isObject$7(val = call$j(fn, input))) return val;
  throw $TypeError$d("Can't convert object to primitive value");
};

var call$i = functionCall;
var isObject$6 = isObject$a;
var isSymbol$1 = isSymbol$2;
var getMethod$4 = getMethod$5;
var ordinaryToPrimitive = ordinaryToPrimitive$1;
var wellKnownSymbol$i = wellKnownSymbol$j;

var $TypeError$c = TypeError;
var TO_PRIMITIVE = wellKnownSymbol$i('toPrimitive');

// `ToPrimitive` abstract operation
// https://tc39.es/ecma262/#sec-toprimitive
var toPrimitive$1 = function (input, pref) {
  if (!isObject$6(input) || isSymbol$1(input)) return input;
  var exoticToPrim = getMethod$4(input, TO_PRIMITIVE);
  var result;
  if (exoticToPrim) {
    if (pref === undefined) pref = 'default';
    result = call$i(exoticToPrim, input, pref);
    if (!isObject$6(result) || isSymbol$1(result)) return result;
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

var DESCRIPTORS$a = descriptors;
var IE8_DOM_DEFINE$1 = ie8DomDefine;
var V8_PROTOTYPE_DEFINE_BUG$1 = v8PrototypeDefineBug;
var anObject$g = anObject$h;
var toPropertyKey$2 = toPropertyKey$3;

var $TypeError$b = TypeError;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var $defineProperty = Object.defineProperty;
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor$1 = Object.getOwnPropertyDescriptor;
var ENUMERABLE = 'enumerable';
var CONFIGURABLE$1 = 'configurable';
var WRITABLE = 'writable';

// `Object.defineProperty` method
// https://tc39.es/ecma262/#sec-object.defineproperty
objectDefineProperty.f = DESCRIPTORS$a ? V8_PROTOTYPE_DEFINE_BUG$1 ? function defineProperty(O, P, Attributes) {
  anObject$g(O);
  P = toPropertyKey$2(P);
  anObject$g(Attributes);
  if (typeof O === 'function' && P === 'prototype' && 'value' in Attributes && WRITABLE in Attributes && !Attributes[WRITABLE]) {
    var current = $getOwnPropertyDescriptor$1(O, P);
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
  anObject$g(O);
  P = toPropertyKey$2(P);
  anObject$g(Attributes);
  if (IE8_DOM_DEFINE$1) try {
    return $defineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw $TypeError$b('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

var ceil = Math.ceil;
var floor$3 = Math.floor;

// `Math.trunc` method
// https://tc39.es/ecma262/#sec-math.trunc
// eslint-disable-next-line es/no-math-trunc -- safe
var mathTrunc = Math.trunc || function trunc(x) {
  var n = +x;
  return (n > 0 ? floor$3 : ceil)(n);
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
var lengthOfArrayLike$6 = function (obj) {
  return toLength$2(obj.length);
};

var toIndexedObject$4 = toIndexedObject$5;
var toAbsoluteIndex$1 = toAbsoluteIndex$2;
var lengthOfArrayLike$5 = lengthOfArrayLike$6;

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod$2 = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject$4($this);
    var length = lengthOfArrayLike$5(O);
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

var hiddenKeys$4 = {};

var uncurryThis$h = functionUncurryThis;
var hasOwn$b = hasOwnProperty_1;
var toIndexedObject$3 = toIndexedObject$5;
var indexOf$1 = arrayIncludes.indexOf;
var hiddenKeys$3 = hiddenKeys$4;

var push$4 = uncurryThis$h([].push);

var objectKeysInternal = function (object, names) {
  var O = toIndexedObject$3(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !hasOwn$b(hiddenKeys$3, key) && hasOwn$b(O, key) && push$4(result, key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (hasOwn$b(O, key = names[i++])) {
    ~indexOf$1(result, key) || push$4(result, key);
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

// `Object.keys` method
// https://tc39.es/ecma262/#sec-object.keys
// eslint-disable-next-line es/no-object-keys -- safe
var objectKeys$2 = Object.keys || function keys(O) {
  return internalObjectKeys$1(O, enumBugKeys$2);
};

var DESCRIPTORS$9 = descriptors;
var V8_PROTOTYPE_DEFINE_BUG = v8PrototypeDefineBug;
var definePropertyModule$5 = objectDefineProperty;
var anObject$f = anObject$h;
var toIndexedObject$2 = toIndexedObject$5;
var objectKeys$1 = objectKeys$2;

// `Object.defineProperties` method
// https://tc39.es/ecma262/#sec-object.defineproperties
// eslint-disable-next-line es/no-object-defineproperties -- safe
objectDefineProperties.f = DESCRIPTORS$9 && !V8_PROTOTYPE_DEFINE_BUG ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject$f(O);
  var props = toIndexedObject$2(Properties);
  var keys = objectKeys$1(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule$5.f(O, key = keys[index++], props[key]);
  return O;
};

var getBuiltIn$5 = getBuiltIn$8;

var html$2 = getBuiltIn$5('document', 'documentElement');

var shared$2 = shared$4.exports;
var uid = uid$2;

var keys = shared$2('keys');

var sharedKey$3 = function (key) {
  return keys[key] || (keys[key] = uid(key));
};

/* global ActiveXObject -- old IE, WSH */

var anObject$e = anObject$h;
var definePropertiesModule = objectDefineProperties;
var enumBugKeys$1 = enumBugKeys$3;
var hiddenKeys$2 = hiddenKeys$4;
var html$1 = html$2;
var documentCreateElement$1 = documentCreateElement$2;
var sharedKey$2 = sharedKey$3;

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO$1 = sharedKey$2('IE_PROTO');

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
  var length = enumBugKeys$1.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys$1[length]];
  return NullProtoObject();
};

hiddenKeys$2[IE_PROTO$1] = true;

// `Object.create` method
// https://tc39.es/ecma262/#sec-object.create
// eslint-disable-next-line es/no-object-create -- safe
var objectCreate = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject$e(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO$1] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : definePropertiesModule.f(result, Properties);
};

var wellKnownSymbol$h = wellKnownSymbol$j;
var create$3 = objectCreate;
var defineProperty$5 = objectDefineProperty.f;

var UNSCOPABLES = wellKnownSymbol$h('unscopables');
var ArrayPrototype$1 = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype$1[UNSCOPABLES] == undefined) {
  defineProperty$5(ArrayPrototype$1, UNSCOPABLES, {
    configurable: true,
    value: create$3(null)
  });
}

// add a key to Array.prototype[@@unscopables]
var addToUnscopables$2 = function (key) {
  ArrayPrototype$1[UNSCOPABLES][key] = true;
};

var iterators = {};

var global$h = global$o;
var isCallable$g = isCallable$m;

var WeakMap$1 = global$h.WeakMap;

var weakMapBasicDetection = isCallable$g(WeakMap$1) && /native code/.test(String(WeakMap$1));

var createPropertyDescriptor$5 = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

var DESCRIPTORS$8 = descriptors;
var definePropertyModule$4 = objectDefineProperty;
var createPropertyDescriptor$4 = createPropertyDescriptor$5;

var createNonEnumerableProperty$5 = DESCRIPTORS$8 ? function (object, key, value) {
  return definePropertyModule$4.f(object, key, createPropertyDescriptor$4(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

var NATIVE_WEAK_MAP = weakMapBasicDetection;
var global$g = global$o;
var isObject$5 = isObject$a;
var createNonEnumerableProperty$4 = createNonEnumerableProperty$5;
var hasOwn$a = hasOwnProperty_1;
var shared$1 = sharedStore;
var sharedKey$1 = sharedKey$3;
var hiddenKeys$1 = hiddenKeys$4;

var OBJECT_ALREADY_INITIALIZED = 'Object already initialized';
var TypeError$4 = global$g.TypeError;
var WeakMap = global$g.WeakMap;
var set$1, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set$1(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject$5(it) || (state = get(it)).type !== TYPE) {
      throw TypeError$4('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP || shared$1.state) {
  var store$1 = shared$1.state || (shared$1.state = new WeakMap());
  /* eslint-disable no-self-assign -- prototype methods protection */
  store$1.get = store$1.get;
  store$1.has = store$1.has;
  store$1.set = store$1.set;
  /* eslint-enable no-self-assign -- prototype methods protection */
  set$1 = function (it, metadata) {
    if (store$1.has(it)) throw TypeError$4(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    store$1.set(it, metadata);
    return metadata;
  };
  get = function (it) {
    return store$1.get(it) || {};
  };
  has = function (it) {
    return store$1.has(it);
  };
} else {
  var STATE = sharedKey$1('state');
  hiddenKeys$1[STATE] = true;
  set$1 = function (it, metadata) {
    if (hasOwn$a(it, STATE)) throw TypeError$4(OBJECT_ALREADY_INITIALIZED);
    metadata.facade = it;
    createNonEnumerableProperty$4(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return hasOwn$a(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return hasOwn$a(it, STATE);
  };
}

var internalState = {
  set: set$1,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};

var objectGetOwnPropertyDescriptor = {};

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

var DESCRIPTORS$7 = descriptors;
var call$h = functionCall;
var propertyIsEnumerableModule$1 = objectPropertyIsEnumerable;
var createPropertyDescriptor$3 = createPropertyDescriptor$5;
var toIndexedObject$1 = toIndexedObject$5;
var toPropertyKey$1 = toPropertyKey$3;
var hasOwn$9 = hasOwnProperty_1;
var IE8_DOM_DEFINE = ie8DomDefine;

// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var $getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.es/ecma262/#sec-object.getownpropertydescriptor
objectGetOwnPropertyDescriptor.f = DESCRIPTORS$7 ? $getOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject$1(O);
  P = toPropertyKey$1(P);
  if (IE8_DOM_DEFINE) try {
    return $getOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (hasOwn$9(O, P)) return createPropertyDescriptor$3(!call$h(propertyIsEnumerableModule$1.f, O, P), O[P]);
};

var makeBuiltIn$3 = {exports: {}};

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

var uncurryThis$g = functionUncurryThis;
var isCallable$f = isCallable$m;
var store = sharedStore;

var functionToString = uncurryThis$g(Function.toString);

// this helper broken in `core-js@3.4.1-3.4.4`, so we can't use `shared` helper
if (!isCallable$f(store.inspectSource)) {
  store.inspectSource = function (it) {
    return functionToString(it);
  };
}

var inspectSource$3 = store.inspectSource;

var fails$f = fails$m;
var isCallable$e = isCallable$m;
var hasOwn$7 = hasOwnProperty_1;
var DESCRIPTORS$5 = descriptors;
var CONFIGURABLE_FUNCTION_NAME$1 = functionName.CONFIGURABLE;
var inspectSource$2 = inspectSource$3;
var InternalStateModule$5 = internalState;

var enforceInternalState = InternalStateModule$5.enforce;
var getInternalState$3 = InternalStateModule$5.get;
// eslint-disable-next-line es/no-object-defineproperty -- safe
var defineProperty$4 = Object.defineProperty;

var CONFIGURABLE_LENGTH = DESCRIPTORS$5 && !fails$f(function () {
  return defineProperty$4(function () { /* empty */ }, 'length', { value: 8 }).length !== 8;
});

var TEMPLATE = String(String).split('String');

var makeBuiltIn$2 = makeBuiltIn$3.exports = function (value, name, options) {
  if (String(name).slice(0, 7) === 'Symbol(') {
    name = '[' + String(name).replace(/^Symbol\(([^)]*)\)/, '$1') + ']';
  }
  if (options && options.getter) name = 'get ' + name;
  if (options && options.setter) name = 'set ' + name;
  if (!hasOwn$7(value, 'name') || (CONFIGURABLE_FUNCTION_NAME$1 && value.name !== name)) {
    if (DESCRIPTORS$5) defineProperty$4(value, 'name', { value: name, configurable: true });
    else value.name = name;
  }
  if (CONFIGURABLE_LENGTH && options && hasOwn$7(options, 'arity') && value.length !== options.arity) {
    defineProperty$4(value, 'length', { value: options.arity });
  }
  try {
    if (options && hasOwn$7(options, 'constructor') && options.constructor) {
      if (DESCRIPTORS$5) defineProperty$4(value, 'prototype', { writable: false });
    // in V8 ~ Chrome 53, prototypes of some methods, like `Array.prototype.values`, are non-writable
    } else if (value.prototype) value.prototype = undefined;
  } catch (error) { /* empty */ }
  var state = enforceInternalState(value);
  if (!hasOwn$7(state, 'source')) {
    state.source = TEMPLATE.join(typeof name == 'string' ? name : '');
  } return value;
};

// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
// eslint-disable-next-line no-extend-native -- required
Function.prototype.toString = makeBuiltIn$2(function toString() {
  return isCallable$e(this) && getInternalState$3(this).source || inspectSource$2(this);
}, 'toString');

var isCallable$d = isCallable$m;
var definePropertyModule$3 = objectDefineProperty;
var makeBuiltIn$1 = makeBuiltIn$3.exports;
var defineGlobalProperty$1 = defineGlobalProperty$3;

var defineBuiltIn$a = function (O, key, value, options) {
  if (!options) options = {};
  var simple = options.enumerable;
  var name = options.name !== undefined ? options.name : key;
  if (isCallable$d(value)) makeBuiltIn$1(value, name, options);
  if (options.global) {
    if (simple) O[key] = value;
    else defineGlobalProperty$1(key, value);
  } else {
    try {
      if (!options.unsafe) delete O[key];
      else if (O[key]) simple = true;
    } catch (error) { /* empty */ }
    if (simple) O[key] = value;
    else definePropertyModule$3.f(O, key, {
      value: value,
      enumerable: false,
      configurable: !options.nonConfigurable,
      writable: !options.nonWritable
    });
  } return O;
};

var objectGetOwnPropertyNames = {};

var internalObjectKeys = objectKeysInternal;
var enumBugKeys = enumBugKeys$3;

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.es/ecma262/#sec-object.getownpropertynames
// eslint-disable-next-line es/no-object-getownpropertynames -- safe
objectGetOwnPropertyNames.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};

var objectGetOwnPropertySymbols = {};

// eslint-disable-next-line es/no-object-getownpropertysymbols -- safe
objectGetOwnPropertySymbols.f = Object.getOwnPropertySymbols;

var getBuiltIn$4 = getBuiltIn$8;
var uncurryThis$f = functionUncurryThis;
var getOwnPropertyNamesModule = objectGetOwnPropertyNames;
var getOwnPropertySymbolsModule$1 = objectGetOwnPropertySymbols;
var anObject$d = anObject$h;

var concat$1 = uncurryThis$f([].concat);

// all object keys, includes non-enumerable and symbols
var ownKeys$1 = getBuiltIn$4('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject$d(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule$1.f;
  return getOwnPropertySymbols ? concat$1(keys, getOwnPropertySymbols(it)) : keys;
};

var hasOwn$6 = hasOwnProperty_1;
var ownKeys = ownKeys$1;
var getOwnPropertyDescriptorModule = objectGetOwnPropertyDescriptor;
var definePropertyModule$2 = objectDefineProperty;

var copyConstructorProperties$1 = function (target, source, exceptions) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule$2.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!hasOwn$6(target, key) && !(exceptions && hasOwn$6(exceptions, key))) {
      defineProperty(target, key, getOwnPropertyDescriptor(source, key));
    }
  }
};

var fails$e = fails$m;
var isCallable$c = isCallable$m;

var replacement = /#|\.prototype\./;

var isForced$2 = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : isCallable$c(detection) ? fails$e(detection)
    : !!detection;
};

var normalize = isForced$2.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced$2.data = {};
var NATIVE = isForced$2.NATIVE = 'N';
var POLYFILL = isForced$2.POLYFILL = 'P';

var isForced_1 = isForced$2;

var global$f = global$o;
var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;
var createNonEnumerableProperty$3 = createNonEnumerableProperty$5;
var defineBuiltIn$9 = defineBuiltIn$a;
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
    target = global$f;
  } else if (STATIC) {
    target = global$f[TARGET] || defineGlobalProperty(TARGET, {});
  } else {
    target = (global$f[TARGET] || {}).prototype;
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
    defineBuiltIn$9(target, key, sourceProperty, options);
  }
};

var fails$d = fails$m;

var correctPrototypeGetter = !fails$d(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  // eslint-disable-next-line es/no-object-getprototypeof -- required for testing
  return Object.getPrototypeOf(new F()) !== F.prototype;
});

var hasOwn$5 = hasOwnProperty_1;
var isCallable$b = isCallable$m;
var toObject$4 = toObject$6;
var sharedKey = sharedKey$3;
var CORRECT_PROTOTYPE_GETTER = correctPrototypeGetter;

var IE_PROTO = sharedKey('IE_PROTO');
var $Object$1 = Object;
var ObjectPrototype = $Object$1.prototype;

// `Object.getPrototypeOf` method
// https://tc39.es/ecma262/#sec-object.getprototypeof
// eslint-disable-next-line es/no-object-getprototypeof -- safe
var objectGetPrototypeOf = CORRECT_PROTOTYPE_GETTER ? $Object$1.getPrototypeOf : function (O) {
  var object = toObject$4(O);
  if (hasOwn$5(object, IE_PROTO)) return object[IE_PROTO];
  var constructor = object.constructor;
  if (isCallable$b(constructor) && object instanceof constructor) {
    return constructor.prototype;
  } return object instanceof $Object$1 ? ObjectPrototype : null;
};

var fails$c = fails$m;
var isCallable$a = isCallable$m;
var isObject$4 = isObject$a;
var getPrototypeOf$1 = objectGetPrototypeOf;
var defineBuiltIn$8 = defineBuiltIn$a;
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

var NEW_ITERATOR_PROTOTYPE = !isObject$4(IteratorPrototype$2) || fails$c(function () {
  var test = {};
  // FF44- legacy iterators case
  return IteratorPrototype$2[ITERATOR$7].call(test) !== test;
});

if (NEW_ITERATOR_PROTOTYPE) IteratorPrototype$2 = {};

// `%IteratorPrototype%[@@iterator]()` method
// https://tc39.es/ecma262/#sec-%iteratorprototype%-@@iterator
if (!isCallable$a(IteratorPrototype$2[ITERATOR$7])) {
  defineBuiltIn$8(IteratorPrototype$2, ITERATOR$7, function () {
    return this;
  });
}

var iteratorsCore = {
  IteratorPrototype: IteratorPrototype$2,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS$1
};

var defineProperty$3 = objectDefineProperty.f;
var hasOwn$4 = hasOwnProperty_1;
var wellKnownSymbol$f = wellKnownSymbol$j;

var TO_STRING_TAG$3 = wellKnownSymbol$f('toStringTag');

var setToStringTag$5 = function (target, TAG, STATIC) {
  if (target && !STATIC) target = target.prototype;
  if (target && !hasOwn$4(target, TO_STRING_TAG$3)) {
    defineProperty$3(target, TO_STRING_TAG$3, { configurable: true, value: TAG });
  }
};

var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;
var create$2 = objectCreate;
var createPropertyDescriptor$2 = createPropertyDescriptor$5;
var setToStringTag$4 = setToStringTag$5;
var Iterators$4 = iterators;

var returnThis$1 = function () { return this; };

var iteratorCreateConstructor = function (IteratorConstructor, NAME, next, ENUMERABLE_NEXT) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create$2(IteratorPrototype$1, { next: createPropertyDescriptor$2(+!ENUMERABLE_NEXT, next) });
  setToStringTag$4(IteratorConstructor, TO_STRING_TAG, false);
  Iterators$4[TO_STRING_TAG] = returnThis$1;
  return IteratorConstructor;
};

var isCallable$9 = isCallable$m;

var $String$1 = String;
var $TypeError$a = TypeError;

var aPossiblePrototype$1 = function (argument) {
  if (typeof argument == 'object' || isCallable$9(argument)) return argument;
  throw $TypeError$a("Can't set " + $String$1(argument) + ' as a prototype');
};

/* eslint-disable no-proto -- safe */

var uncurryThis$e = functionUncurryThis;
var anObject$c = anObject$h;
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
    setter = uncurryThis$e(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set);
    setter(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject$c(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);

var $$f = _export;
var call$g = functionCall;
var FunctionName = functionName;
var isCallable$8 = isCallable$m;
var createIteratorConstructor$1 = iteratorCreateConstructor;
var getPrototypeOf = objectGetPrototypeOf;
var setPrototypeOf$1 = objectSetPrototypeOf;
var setToStringTag$3 = setToStringTag$5;
var createNonEnumerableProperty$2 = createNonEnumerableProperty$5;
var defineBuiltIn$7 = defineBuiltIn$a;
var wellKnownSymbol$e = wellKnownSymbol$j;
var Iterators$3 = iterators;
var IteratorsCore = iteratorsCore;

var PROPER_FUNCTION_NAME$1 = FunctionName.PROPER;
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
          defineBuiltIn$7(CurrentIteratorPrototype, ITERATOR$6, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag$3(CurrentIteratorPrototype, TO_STRING_TAG, true);
    }
  }

  // fix Array.prototype.{ values, @@iterator }.name in V8 / FF
  if (PROPER_FUNCTION_NAME$1 && DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    if (CONFIGURABLE_FUNCTION_NAME) {
      createNonEnumerableProperty$2(IterablePrototype, 'name', VALUES);
    } else {
      INCORRECT_VALUES_NAME = true;
      defaultIterator = function values() { return call$g(nativeIterator, this); };
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
        defineBuiltIn$7(IterablePrototype, KEY, methods[KEY]);
      }
    } else $$f({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  // define iterator
  if (IterablePrototype[ITERATOR$6] !== defaultIterator) {
    defineBuiltIn$7(IterablePrototype, ITERATOR$6, defaultIterator, { name: DEFAULT });
  }
  Iterators$3[NAME] = defaultIterator;

  return methods;
};

// `CreateIterResultObject` abstract operation
// https://tc39.es/ecma262/#sec-createiterresultobject
var createIterResultObject$2 = function (value, done) {
  return { value: value, done: done };
};

var toIndexedObject = toIndexedObject$5;
var addToUnscopables$1 = addToUnscopables$2;
var Iterators$2 = iterators;
var InternalStateModule$4 = internalState;
var defineProperty$2 = objectDefineProperty.f;
var defineIterator$1 = iteratorDefine;
var createIterResultObject$1 = createIterResultObject$2;
var DESCRIPTORS$4 = descriptors;

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState$4 = InternalStateModule$4.set;
var getInternalState$2 = InternalStateModule$4.getterFor(ARRAY_ITERATOR);

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
var es_array_iterator = defineIterator$1(Array, 'Array', function (iterated, kind) {
  setInternalState$4(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState$2(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return createIterResultObject$1(undefined, true);
  }
  if (kind == 'keys') return createIterResultObject$1(index, false);
  if (kind == 'values') return createIterResultObject$1(target[index], false);
  return createIterResultObject$1([index, target[index]], false);
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
if (DESCRIPTORS$4 && values.name !== 'values') try {
  defineProperty$2(values, 'name', { value: 'values' });
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

var global$e = global$o;
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
  handlePrototype(global$e[COLLECTION_NAME] && global$e[COLLECTION_NAME].prototype, COLLECTION_NAME);
}

handlePrototype(DOMTokenListPrototype, 'DOMTokenList');

var wellKnownSymbol$c = wellKnownSymbol$j;

var TO_STRING_TAG$1 = wellKnownSymbol$c('toStringTag');
var test$1 = {};

test$1[TO_STRING_TAG$1] = 'z';

var toStringTagSupport = String(test$1) === '[object z]';

var TO_STRING_TAG_SUPPORT = toStringTagSupport;
var isCallable$7 = isCallable$m;
var classofRaw$1 = classofRaw$2;
var wellKnownSymbol$b = wellKnownSymbol$j;

var TO_STRING_TAG = wellKnownSymbol$b('toStringTag');
var $Object = Object;

// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw$1(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
var classof$7 = TO_STRING_TAG_SUPPORT ? classofRaw$1 : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = $Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw$1(O)
    // ES3 arguments fallback
    : (result = classofRaw$1(O)) == 'Object' && isCallable$7(O.callee) ? 'Arguments' : result;
};

var classof$6 = classof$7;

var $String = String;

var toString$8 = function (argument) {
  if (classof$6(argument) === 'Symbol') throw TypeError('Cannot convert a Symbol value to a string');
  return $String(argument);
};

var anObject$b = anObject$h;

// `RegExp.prototype.flags` getter implementation
// https://tc39.es/ecma262/#sec-get-regexp.prototype.flags
var regexpFlags$1 = function () {
  var that = anObject$b(this);
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

var call$f = functionCall;
var hasOwn$3 = hasOwnProperty_1;
var isPrototypeOf$2 = objectIsPrototypeOf;
var regExpFlags = regexpFlags$1;

var RegExpPrototype$2 = RegExp.prototype;

var regexpGetFlags = function (R) {
  var flags = R.flags;
  return flags === undefined && !('flags' in RegExpPrototype$2) && !hasOwn$3(R, 'flags') && isPrototypeOf$2(RegExpPrototype$2, R)
    ? call$f(regExpFlags, R) : flags;
};

var PROPER_FUNCTION_NAME = functionName.PROPER;
var defineBuiltIn$6 = defineBuiltIn$a;
var anObject$a = anObject$h;
var $toString$2 = toString$8;
var fails$b = fails$m;
var getRegExpFlags = regexpGetFlags;

var TO_STRING = 'toString';
var RegExpPrototype$1 = RegExp.prototype;
var nativeToString = RegExpPrototype$1[TO_STRING];

var NOT_GENERIC = fails$b(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = PROPER_FUNCTION_NAME && nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.es/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  defineBuiltIn$6(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject$a(this);
    var pattern = $toString$2(R.source);
    var flags = $toString$2(getRegExpFlags(R));
    return '/' + pattern + '/' + flags;
  }, { unsafe: true });
}

var fails$a = fails$m;
var global$d = global$o;

// babel-minify and Closure Compiler transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
var $RegExp$2 = global$d.RegExp;

var UNSUPPORTED_Y$1 = fails$a(function () {
  var re = $RegExp$2('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

// UC Browser bug
// https://github.com/zloirock/core-js/issues/1008
var MISSED_STICKY = UNSUPPORTED_Y$1 || fails$a(function () {
  return !$RegExp$2('a', 'y').sticky;
});

var BROKEN_CARET = UNSUPPORTED_Y$1 || fails$a(function () {
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

var fails$9 = fails$m;
var global$c = global$o;

// babel-minify and Closure Compiler transpiles RegExp('.', 's') -> /./s and it causes SyntaxError
var $RegExp$1 = global$c.RegExp;

var regexpUnsupportedDotAll = fails$9(function () {
  var re = $RegExp$1('.', 's');
  return !(re.dotAll && re.exec('\n') && re.flags === 's');
});

var fails$8 = fails$m;
var global$b = global$o;

// babel-minify and Closure Compiler transpiles RegExp('(?<a>b)', 'g') -> /(?<a>b)/g and it causes SyntaxError
var $RegExp = global$b.RegExp;

var regexpUnsupportedNcg = fails$8(function () {
  var re = $RegExp('(?<a>b)', 'g');
  return re.exec('b').groups.a !== 'b' ||
    'b'.replace(re, '$<a>c') !== 'bc';
});

/* eslint-disable regexp/no-empty-capturing-group, regexp/no-empty-group, regexp/no-lazy-ends -- testing */
/* eslint-disable regexp/no-useless-quantifier -- testing */
var call$e = functionCall;
var uncurryThis$d = functionUncurryThis;
var toString$7 = toString$8;
var regexpFlags = regexpFlags$1;
var stickyHelpers = regexpStickyHelpers;
var shared = shared$4.exports;
var create$1 = objectCreate;
var getInternalState$1 = internalState.get;
var UNSUPPORTED_DOT_ALL = regexpUnsupportedDotAll;
var UNSUPPORTED_NCG = regexpUnsupportedNcg;

var nativeReplace = shared('native-string-replace', String.prototype.replace);
var nativeExec = RegExp.prototype.exec;
var patchedExec = nativeExec;
var charAt$5 = uncurryThis$d(''.charAt);
var indexOf = uncurryThis$d(''.indexOf);
var replace$3 = uncurryThis$d(''.replace);
var stringSlice$3 = uncurryThis$d(''.slice);

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  call$e(nativeExec, re1, 'a');
  call$e(nativeExec, re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y || UNSUPPORTED_DOT_ALL || UNSUPPORTED_NCG;

if (PATCH) {
  patchedExec = function exec(string) {
    var re = this;
    var state = getInternalState$1(re);
    var str = toString$7(string);
    var raw = state.raw;
    var result, reCopy, lastIndex, match, i, object, group;

    if (raw) {
      raw.lastIndex = re.lastIndex;
      result = call$e(patchedExec, raw, str);
      re.lastIndex = raw.lastIndex;
      return result;
    }

    var groups = state.groups;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = call$e(regexpFlags, re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = replace$3(flags, 'y', '');
      if (indexOf(flags, 'g') === -1) {
        flags += 'g';
      }

      strCopy = stringSlice$3(str, re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && charAt$5(str, re.lastIndex - 1) !== '\n')) {
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

    match = call$e(nativeExec, sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = stringSlice$3(match.input, charsAdded);
        match[0] = stringSlice$3(match[0], charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn't work for /(.?)?/
      call$e(nativeReplace, match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    if (match && groups) {
      match.groups = object = create$1(null);
      for (i = 0; i < groups.length; i++) {
        group = groups[i];
        object[group[0]] = match[group[1]];
      }
    }

    return match;
  };
}

var regexpExec$2 = patchedExec;

var $$e = _export;
var exec$3 = regexpExec$2;

// `RegExp.prototype.exec` method
// https://tc39.es/ecma262/#sec-regexp.prototype.exec
$$e({ target: 'RegExp', proto: true, forced: /./.exec !== exec$3 }, {
  exec: exec$3
});

var classof$5 = classofRaw$2;
var global$a = global$o;

var engineIsNode = classof$5(global$a.process) == 'process';

var getBuiltIn$3 = getBuiltIn$8;
var definePropertyModule$1 = objectDefineProperty;
var wellKnownSymbol$a = wellKnownSymbol$j;
var DESCRIPTORS$3 = descriptors;

var SPECIES$3 = wellKnownSymbol$a('species');

var setSpecies$1 = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn$3(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule$1.f;

  if (DESCRIPTORS$3 && Constructor && !Constructor[SPECIES$3]) {
    defineProperty(Constructor, SPECIES$3, {
      configurable: true,
      get: function () { return this; }
    });
  }
};

var isPrototypeOf$1 = objectIsPrototypeOf;

var $TypeError$9 = TypeError;

var anInstance$3 = function (it, Prototype) {
  if (isPrototypeOf$1(Prototype, it)) return it;
  throw $TypeError$9('Incorrect invocation');
};

var uncurryThis$c = functionUncurryThis;
var fails$7 = fails$m;
var isCallable$6 = isCallable$m;
var classof$4 = classof$7;
var getBuiltIn$2 = getBuiltIn$8;
var inspectSource$1 = inspectSource$3;

var noop = function () { /* empty */ };
var empty = [];
var construct = getBuiltIn$2('Reflect', 'construct');
var constructorRegExp = /^\s*(?:class|function)\b/;
var exec$2 = uncurryThis$c(constructorRegExp.exec);
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
  switch (classof$4(argument)) {
    case 'AsyncFunction':
    case 'GeneratorFunction':
    case 'AsyncGeneratorFunction': return false;
  }
  try {
    // we can't check .prototype since constructors produced by .bind haven't it
    // `Function#toString` throws on some built-it function in some legacy engines
    // (for example, `DOMQuad` and similar in FF41-)
    return INCORRECT_TO_STRING || !!exec$2(constructorRegExp, inspectSource$1(argument));
  } catch (error) {
    return true;
  }
};

isConstructorLegacy.sham = true;

// `IsConstructor` abstract operation
// https://tc39.es/ecma262/#sec-isconstructor
var isConstructor$2 = !construct || fails$7(function () {
  var called;
  return isConstructorModern(isConstructorModern.call)
    || !isConstructorModern(Object)
    || !isConstructorModern(function () { called = true; })
    || called;
}) ? isConstructorLegacy : isConstructorModern;

var isConstructor$1 = isConstructor$2;
var tryToString$3 = tryToString$5;

var $TypeError$8 = TypeError;

// `Assert: IsConstructor(argument) is true`
var aConstructor$1 = function (argument) {
  if (isConstructor$1(argument)) return argument;
  throw $TypeError$8(tryToString$3(argument) + ' is not a constructor');
};

var anObject$9 = anObject$h;
var aConstructor = aConstructor$1;
var isNullOrUndefined$3 = isNullOrUndefined$6;
var wellKnownSymbol$9 = wellKnownSymbol$j;

var SPECIES$2 = wellKnownSymbol$9('species');

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
var call$d = FunctionPrototype.call;

// eslint-disable-next-line es/no-reflect -- safe
var functionApply = typeof Reflect == 'object' && Reflect.apply || (NATIVE_BIND$1 ? call$d.bind(apply$1) : function () {
  return call$d.apply(apply$1, arguments);
});

var classofRaw = classofRaw$2;
var uncurryThis$b = functionUncurryThis;

var functionUncurryThisClause = function (fn) {
  // Nashorn bug:
  //   https://github.com/zloirock/core-js/issues/1128
  //   https://github.com/zloirock/core-js/issues/1130
  if (classofRaw(fn) === 'Function') return uncurryThis$b(fn);
};

var uncurryThis$a = functionUncurryThisClause;
var aCallable$7 = aCallable$9;
var NATIVE_BIND = functionBindNative;

var bind$7 = uncurryThis$a(uncurryThis$a.bind);

// optional / simple context binding
var functionBindContext = function (fn, that) {
  aCallable$7(fn);
  return that === undefined ? fn : NATIVE_BIND ? bind$7(fn, that) : function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};

var uncurryThis$9 = functionUncurryThis;

var arraySlice$3 = uncurryThis$9([].slice);

var $TypeError$7 = TypeError;

var validateArgumentsLength$3 = function (passed, required) {
  if (passed < required) throw $TypeError$7('Not enough arguments');
  return passed;
};

var userAgent$4 = engineUserAgent;

var engineIsIos = /(?:ipad|iphone|ipod).*applewebkit/i.test(userAgent$4);

var global$9 = global$o;
var apply = functionApply;
var bind$6 = functionBindContext;
var isCallable$5 = isCallable$m;
var hasOwn$2 = hasOwnProperty_1;
var fails$6 = fails$m;
var html = html$2;
var arraySlice$2 = arraySlice$3;
var createElement = documentCreateElement$2;
var validateArgumentsLength$2 = validateArgumentsLength$3;
var IS_IOS$1 = engineIsIos;
var IS_NODE$4 = engineIsNode;

var set = global$9.setImmediate;
var clear = global$9.clearImmediate;
var process$3 = global$9.process;
var Dispatch = global$9.Dispatch;
var Function$1 = global$9.Function;
var MessageChannel = global$9.MessageChannel;
var String$1 = global$9.String;
var counter = 0;
var queue$1 = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var $location, defer, channel, port;

try {
  // Deno throws a ReferenceError on `location` access without `--location` flag
  $location = global$9.location;
} catch (error) { /* empty */ }

var run = function (id) {
  if (hasOwn$2(queue$1, id)) {
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
  global$9.postMessage(String$1(id), $location.protocol + '//' + $location.host);
};

// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!set || !clear) {
  set = function setImmediate(handler) {
    validateArgumentsLength$2(arguments.length, 1);
    var fn = isCallable$5(handler) ? handler : Function$1(handler);
    var args = arraySlice$2(arguments, 1);
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
    defer = bind$6(port.postMessage, port);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (
    global$9.addEventListener &&
    isCallable$5(global$9.postMessage) &&
    !global$9.importScripts &&
    $location && $location.protocol !== 'file:' &&
    !fails$6(post)
  ) {
    defer = post;
    global$9.addEventListener('message', listener, false);
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

var userAgent$3 = engineUserAgent;
var global$8 = global$o;

var engineIsIosPebble = /ipad|iphone|ipod/i.test(userAgent$3) && global$8.Pebble !== undefined;

var userAgent$2 = engineUserAgent;

var engineIsWebosWebkit = /web0s(?!.*chrome)/i.test(userAgent$2);

var global$7 = global$o;
var bind$5 = functionBindContext;
var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
var macrotask = task$1.set;
var IS_IOS = engineIsIos;
var IS_IOS_PEBBLE = engineIsIosPebble;
var IS_WEBOS_WEBKIT = engineIsWebosWebkit;
var IS_NODE$3 = engineIsNode;

var MutationObserver = global$7.MutationObserver || global$7.WebKitMutationObserver;
var document$2 = global$7.document;
var process$2 = global$7.process;
var Promise$1 = global$7.Promise;
// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
var queueMicrotaskDescriptor = getOwnPropertyDescriptor$2(global$7, 'queueMicrotask');
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
    then = bind$5(promise.then, promise);
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
    macrotask = bind$5(macrotask, global$7);
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

var global$6 = global$o;

var hostReportErrors$1 = function (a, b) {
  var console = global$6.console;
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

var global$5 = global$o;

var promiseNativeConstructor = global$5.Promise;

/* global Deno -- Deno case */

var engineIsDeno = typeof Deno == 'object' && Deno && typeof Deno.version == 'object';

var IS_DENO$1 = engineIsDeno;
var IS_NODE$2 = engineIsNode;

var engineIsBrowser = !IS_DENO$1 && !IS_NODE$2
  && typeof window == 'object'
  && typeof document == 'object';

var global$4 = global$o;
var NativePromiseConstructor$3 = promiseNativeConstructor;
var isCallable$4 = isCallable$m;
var isForced = isForced_1;
var inspectSource = inspectSource$3;
var wellKnownSymbol$8 = wellKnownSymbol$j;
var IS_BROWSER = engineIsBrowser;
var IS_DENO = engineIsDeno;
var V8_VERSION = engineV8Version;

NativePromiseConstructor$3 && NativePromiseConstructor$3.prototype;
var SPECIES$1 = wellKnownSymbol$8('species');
var SUBCLASSING = false;
var NATIVE_PROMISE_REJECTION_EVENT$1 = isCallable$4(global$4.PromiseRejectionEvent);

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

var aCallable$6 = aCallable$9;

var $TypeError$6 = TypeError;

var PromiseCapability = function (C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw $TypeError$6('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aCallable$6(resolve);
  this.reject = aCallable$6(reject);
};

// `NewPromiseCapability` abstract operation
// https://tc39.es/ecma262/#sec-newpromisecapability
newPromiseCapability$2.f = function (C) {
  return new PromiseCapability(C);
};

var $$d = _export;
var IS_NODE$1 = engineIsNode;
var global$3 = global$o;
var call$c = functionCall;
var defineBuiltIn$5 = defineBuiltIn$a;
var setPrototypeOf = objectSetPrototypeOf;
var setToStringTag$2 = setToStringTag$5;
var setSpecies = setSpecies$1;
var aCallable$5 = aCallable$9;
var isCallable$3 = isCallable$m;
var isObject$3 = isObject$a;
var anInstance$2 = anInstance$3;
var speciesConstructor = speciesConstructor$1;
var task = task$1.set;
var microtask = microtask$1;
var hostReportErrors = hostReportErrors$1;
var perform$2 = perform$3;
var Queue = queue;
var InternalStateModule$3 = internalState;
var NativePromiseConstructor$2 = promiseNativeConstructor;
var PromiseConstructorDetection = promiseConstructorDetection;
var newPromiseCapabilityModule$3 = newPromiseCapability$2;

var PROMISE = 'Promise';
var FORCED_PROMISE_CONSTRUCTOR$4 = PromiseConstructorDetection.CONSTRUCTOR;
var NATIVE_PROMISE_REJECTION_EVENT = PromiseConstructorDetection.REJECTION_EVENT;
var NATIVE_PROMISE_SUBCLASSING = PromiseConstructorDetection.SUBCLASSING;
var getInternalPromiseState = InternalStateModule$3.getterFor(PROMISE);
var setInternalState$3 = InternalStateModule$3.set;
var NativePromisePrototype$1 = NativePromiseConstructor$2 && NativePromiseConstructor$2.prototype;
var PromiseConstructor = NativePromiseConstructor$2;
var PromisePrototype = NativePromisePrototype$1;
var TypeError$3 = global$3.TypeError;
var document$1 = global$3.document;
var process$1 = global$3.process;
var newPromiseCapability$1 = newPromiseCapabilityModule$3.f;
var newGenericPromiseCapability = newPromiseCapability$1;

var DISPATCH_EVENT = !!(document$1 && document$1.createEvent && global$3.dispatchEvent);
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
  return isObject$3(it) && isCallable$3(then = it.then) ? then : false;
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
        reject(TypeError$3('Promise-chain cycle'));
      } else if (then = isThenable(result)) {
        call$c(then, result, resolve, reject);
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
    global$3.dispatchEvent(event);
  } else event = { promise: promise, reason: reason };
  if (!NATIVE_PROMISE_REJECTION_EVENT && (handler = global$3['on' + name])) handler(event);
  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
};

var onUnhandled = function (state) {
  call$c(task, global$3, function () {
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
  call$c(task, global$3, function () {
    var promise = state.facade;
    if (IS_NODE$1) {
      process$1.emit('rejectionHandled', promise);
    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
  });
};

var bind$4 = function (fn, state, unwrap) {
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
    if (state.facade === value) throw TypeError$3("Promise can't be resolved itself");
    var then = isThenable(value);
    if (then) {
      microtask(function () {
        var wrapper = { done: false };
        try {
          call$c(then, value,
            bind$4(internalResolve, wrapper, state),
            bind$4(internalReject, wrapper, state)
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
    anInstance$2(this, PromisePrototype);
    aCallable$5(executor);
    call$c(Internal, this);
    var state = getInternalPromiseState(this);
    try {
      executor(bind$4(internalResolve, state), bind$4(internalReject, state));
    } catch (error) {
      internalReject(state, error);
    }
  };

  PromisePrototype = PromiseConstructor.prototype;

  // eslint-disable-next-line no-unused-vars -- required for `.length`
  Internal = function Promise(executor) {
    setInternalState$3(this, {
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
  Internal.prototype = defineBuiltIn$5(PromisePrototype, 'then', function then(onFulfilled, onRejected) {
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
    this.resolve = bind$4(internalResolve, state);
    this.reject = bind$4(internalReject, state);
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
      defineBuiltIn$5(NativePromisePrototype$1, 'then', function then(onFulfilled, onRejected) {
        var that = this;
        return new PromiseConstructor(function (resolve, reject) {
          call$c(nativeThen, that, resolve, reject);
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

$$d({ global: true, constructor: true, wrap: true, forced: FORCED_PROMISE_CONSTRUCTOR$4 }, {
  Promise: PromiseConstructor
});

setToStringTag$2(PromiseConstructor, PROMISE, false);
setSpecies(PROMISE);

var wellKnownSymbol$7 = wellKnownSymbol$j;
var Iterators$1 = iterators;

var ITERATOR$4 = wellKnownSymbol$7('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
var isArrayIteratorMethod$2 = function (it) {
  return it !== undefined && (Iterators$1.Array === it || ArrayPrototype[ITERATOR$4] === it);
};

var classof$3 = classof$7;
var getMethod$3 = getMethod$5;
var isNullOrUndefined$2 = isNullOrUndefined$6;
var Iterators = iterators;
var wellKnownSymbol$6 = wellKnownSymbol$j;

var ITERATOR$3 = wellKnownSymbol$6('iterator');

var getIteratorMethod$4 = function (it) {
  if (!isNullOrUndefined$2(it)) return getMethod$3(it, ITERATOR$3)
    || getMethod$3(it, '@@iterator')
    || Iterators[classof$3(it)];
};

var call$b = functionCall;
var aCallable$4 = aCallable$9;
var anObject$8 = anObject$h;
var tryToString$2 = tryToString$5;
var getIteratorMethod$3 = getIteratorMethod$4;

var $TypeError$5 = TypeError;

var getIterator$3 = function (argument, usingIterator) {
  var iteratorMethod = arguments.length < 2 ? getIteratorMethod$3(argument) : usingIterator;
  if (aCallable$4(iteratorMethod)) return anObject$8(call$b(iteratorMethod, argument));
  throw $TypeError$5(tryToString$2(argument) + ' is not iterable');
};

var call$a = functionCall;
var anObject$7 = anObject$h;
var getMethod$2 = getMethod$5;

var iteratorClose$2 = function (iterator, kind, value) {
  var innerResult, innerError;
  anObject$7(iterator);
  try {
    innerResult = getMethod$2(iterator, 'return');
    if (!innerResult) {
      if (kind === 'throw') throw value;
      return value;
    }
    innerResult = call$a(innerResult, iterator);
  } catch (error) {
    innerError = true;
    innerResult = error;
  }
  if (kind === 'throw') throw value;
  if (innerError) throw innerResult;
  anObject$7(innerResult);
  return value;
};

var bind$3 = functionBindContext;
var call$9 = functionCall;
var anObject$6 = anObject$h;
var tryToString$1 = tryToString$5;
var isArrayIteratorMethod$1 = isArrayIteratorMethod$2;
var lengthOfArrayLike$4 = lengthOfArrayLike$6;
var isPrototypeOf = objectIsPrototypeOf;
var getIterator$2 = getIterator$3;
var getIteratorMethod$2 = getIteratorMethod$4;
var iteratorClose$1 = iteratorClose$2;

var $TypeError$4 = TypeError;

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
  var fn = bind$3(unboundFunction, that);
  var iterator, iterFn, index, length, result, next, step;

  var stop = function (condition) {
    if (iterator) iteratorClose$1(iterator, 'normal', condition);
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
    iterFn = getIteratorMethod$2(iterable);
    if (!iterFn) throw $TypeError$4(tryToString$1(iterable) + ' is not iterable');
    // optimisation for array iterators
    if (isArrayIteratorMethod$1(iterFn)) {
      for (index = 0, length = lengthOfArrayLike$4(iterable); length > index; index++) {
        result = callFn(iterable[index]);
        if (result && isPrototypeOf(ResultPrototype, result)) return result;
      } return new Result(false);
    }
    iterator = getIterator$2(iterable, iterFn);
  }

  next = IS_RECORD ? iterable.next : iterator.next;
  while (!(step = call$9(next, iterator)).done) {
    try {
      result = callFn(step.value);
    } catch (error) {
      iteratorClose$1(iterator, 'throw', error);
    }
    if (typeof result == 'object' && result && isPrototypeOf(ResultPrototype, result)) return result;
  } return new Result(false);
};

var wellKnownSymbol$5 = wellKnownSymbol$j;

var ITERATOR$2 = wellKnownSymbol$5('iterator');
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

var $$c = _export;
var call$8 = functionCall;
var aCallable$3 = aCallable$9;
var newPromiseCapabilityModule$2 = newPromiseCapability$2;
var perform$1 = perform$3;
var iterate$1 = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION$1 = promiseStaticsIncorrectIteration;

// `Promise.all` method
// https://tc39.es/ecma262/#sec-promise.all
$$c({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION$1 }, {
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$2.f(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform$1(function () {
      var $promiseResolve = aCallable$3(C.resolve);
      var values = [];
      var counter = 0;
      var remaining = 1;
      iterate$1(iterable, function (promise) {
        var index = counter++;
        var alreadyCalled = false;
        remaining++;
        call$8($promiseResolve, C, promise).then(function (value) {
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

var $$b = _export;
var FORCED_PROMISE_CONSTRUCTOR$2 = promiseConstructorDetection.CONSTRUCTOR;
var NativePromiseConstructor = promiseNativeConstructor;
var getBuiltIn$1 = getBuiltIn$8;
var isCallable$2 = isCallable$m;
var defineBuiltIn$4 = defineBuiltIn$a;

var NativePromisePrototype = NativePromiseConstructor && NativePromiseConstructor.prototype;

// `Promise.prototype.catch` method
// https://tc39.es/ecma262/#sec-promise.prototype.catch
$$b({ target: 'Promise', proto: true, forced: FORCED_PROMISE_CONSTRUCTOR$2, real: true }, {
  'catch': function (onRejected) {
    return this.then(undefined, onRejected);
  }
});

// makes sure that native promise-based APIs `Promise#catch` properly works with patched `Promise#then`
if (isCallable$2(NativePromiseConstructor)) {
  var method = getBuiltIn$1('Promise').prototype['catch'];
  if (NativePromisePrototype['catch'] !== method) {
    defineBuiltIn$4(NativePromisePrototype, 'catch', method, { unsafe: true });
  }
}

var $$a = _export;
var call$7 = functionCall;
var aCallable$2 = aCallable$9;
var newPromiseCapabilityModule$1 = newPromiseCapability$2;
var perform = perform$3;
var iterate = iterate$2;
var PROMISE_STATICS_INCORRECT_ITERATION = promiseStaticsIncorrectIteration;

// `Promise.race` method
// https://tc39.es/ecma262/#sec-promise.race
$$a({ target: 'Promise', stat: true, forced: PROMISE_STATICS_INCORRECT_ITERATION }, {
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapabilityModule$1.f(C);
    var reject = capability.reject;
    var result = perform(function () {
      var $promiseResolve = aCallable$2(C.resolve);
      iterate(iterable, function (promise) {
        call$7($promiseResolve, C, promise).then(capability.resolve, reject);
      });
    });
    if (result.error) reject(result.value);
    return capability.promise;
  }
});

var $$9 = _export;
var call$6 = functionCall;
var newPromiseCapabilityModule = newPromiseCapability$2;
var FORCED_PROMISE_CONSTRUCTOR$1 = promiseConstructorDetection.CONSTRUCTOR;

// `Promise.reject` method
// https://tc39.es/ecma262/#sec-promise.reject
$$9({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR$1 }, {
  reject: function reject(r) {
    var capability = newPromiseCapabilityModule.f(this);
    call$6(capability.reject, undefined, r);
    return capability.promise;
  }
});

var anObject$5 = anObject$h;
var isObject$2 = isObject$a;
var newPromiseCapability = newPromiseCapability$2;

var promiseResolve$1 = function (C, x) {
  anObject$5(C);
  if (isObject$2(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

var $$8 = _export;
var getBuiltIn = getBuiltIn$8;
var FORCED_PROMISE_CONSTRUCTOR = promiseConstructorDetection.CONSTRUCTOR;
var promiseResolve = promiseResolve$1;

getBuiltIn('Promise');

// `Promise.resolve` method
// https://tc39.es/ecma262/#sec-promise.resolve
$$8({ target: 'Promise', stat: true, forced: FORCED_PROMISE_CONSTRUCTOR }, {
  resolve: function resolve(x) {
    return promiseResolve(this, x);
  }
});

var $$7 = _export;
var $includes = arrayIncludes.includes;
var fails$5 = fails$m;
var addToUnscopables = addToUnscopables$2;

// FF99+ bug
var BROKEN_ON_SPARSE = fails$5(function () {
  return !Array(1).includes();
});

// `Array.prototype.includes` method
// https://tc39.es/ecma262/#sec-array.prototype.includes
$$7({ target: 'Array', proto: true, forced: BROKEN_ON_SPARSE }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.es/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');

var isObject$1 = isObject$a;
var classof$2 = classofRaw$2;
var wellKnownSymbol$4 = wellKnownSymbol$j;

var MATCH$1 = wellKnownSymbol$4('match');

// `IsRegExp` abstract operation
// https://tc39.es/ecma262/#sec-isregexp
var isRegexp = function (it) {
  var isRegExp;
  return isObject$1(it) && ((isRegExp = it[MATCH$1]) !== undefined ? !!isRegExp : classof$2(it) == 'RegExp');
};

var isRegExp = isRegexp;

var $TypeError$3 = TypeError;

var notARegexp = function (it) {
  if (isRegExp(it)) {
    throw $TypeError$3("The method doesn't accept regular expressions");
  } return it;
};

var wellKnownSymbol$3 = wellKnownSymbol$j;

var MATCH = wellKnownSymbol$3('match');

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

var $$6 = _export;
var uncurryThis$8 = functionUncurryThis;
var notARegExp$1 = notARegexp;
var requireObjectCoercible$4 = requireObjectCoercible$7;
var toString$6 = toString$8;
var correctIsRegExpLogic$1 = correctIsRegexpLogic;

var stringIndexOf = uncurryThis$8(''.indexOf);

// `String.prototype.includes` method
// https://tc39.es/ecma262/#sec-string.prototype.includes
$$6({ target: 'String', proto: true, forced: !correctIsRegExpLogic$1('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~stringIndexOf(
      toString$6(requireObjectCoercible$4(this)),
      toString$6(notARegExp$1(searchString)),
      arguments.length > 1 ? arguments[1] : undefined
    );
  }
});

var DESCRIPTORS$2 = descriptors;
var uncurryThis$7 = functionUncurryThis;
var call$5 = functionCall;
var fails$4 = fails$m;
var objectKeys = objectKeys$2;
var getOwnPropertySymbolsModule = objectGetOwnPropertySymbols;
var propertyIsEnumerableModule = objectPropertyIsEnumerable;
var toObject$3 = toObject$6;
var IndexedObject$1 = indexedObject;

// eslint-disable-next-line es/no-object-assign -- safe
var $assign = Object.assign;
// eslint-disable-next-line es/no-object-defineproperty -- required for testing
var defineProperty$1 = Object.defineProperty;
var concat = uncurryThis$7([].concat);

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
var objectAssign = !$assign || fails$4(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS$2 && $assign({ b: 1 }, $assign(defineProperty$1({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty$1(this, 'b', {
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
  return $assign({}, A)[symbol] != 7 || objectKeys($assign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars -- required for `.length`
  var T = toObject$3(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject$1(arguments[index++]);
    var keys = getOwnPropertySymbols ? concat(objectKeys(S), getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS$2 || call$5(propertyIsEnumerable, S, key)) T[key] = S[key];
    }
  } return T;
} : $assign;

var $$5 = _export;
var assign$1 = objectAssign;

// `Object.assign` method
// https://tc39.es/ecma262/#sec-object.assign
// eslint-disable-next-line es/no-object-assign -- required for testing
$$5({ target: 'Object', stat: true, arity: 2, forced: Object.assign !== assign$1 }, {
  assign: assign$1
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

var $$4 = _export;
var uncurryThis$6 = functionUncurryThisClause;
var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
var toLength$1 = toLength$3;
var toString$5 = toString$8;
var notARegExp = notARegexp;
var requireObjectCoercible$3 = requireObjectCoercible$7;
var correctIsRegExpLogic = correctIsRegexpLogic;

// eslint-disable-next-line es/no-string-prototype-endswith -- safe
var nativeEndsWith = uncurryThis$6(''.endsWith);
var slice = uncurryThis$6(''.slice);
var min = Math.min;

var CORRECT_IS_REGEXP_LOGIC = correctIsRegExpLogic('endsWith');
// https://github.com/zloirock/core-js/pull/702
var MDN_POLYFILL_BUG = !CORRECT_IS_REGEXP_LOGIC && !!function () {
  var descriptor = getOwnPropertyDescriptor$1(String.prototype, 'endsWith');
  return descriptor && !descriptor.writable;
}();

// `String.prototype.endsWith` method
// https://tc39.es/ecma262/#sec-string.prototype.endswith
$$4({ target: 'String', proto: true, forced: !MDN_POLYFILL_BUG && !CORRECT_IS_REGEXP_LOGIC }, {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = toString$5(requireObjectCoercible$3(this));
    notARegExp(searchString);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = that.length;
    var end = endPosition === undefined ? len : min(toLength$1(endPosition), len);
    var search = toString$5(searchString);
    return nativeEndsWith
      ? nativeEndsWith(that, search, end)
      : slice(that, end - search.length, end) === search;
  }
});

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
 * @param cxaVersion - version of CXone Agent
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
 * Returns the complete URL to the TPI (third-party integration) remote entry file for an embedded app.
 * @param appType - The type identifier of the third-party integration app.
 * @param cxaVersion - The version hash of CXone Agent.
 * @returns The complete URL to the TPI remote entry file.
 * @example getTPIRemoteEntryUrl(appType, cxaVersion)
 */
function getTPIRemoteEntryUrl(appType, cxaVersion) {
  const currentUrl = window.location.origin;
  if (appType) {
    return `${currentUrl}${currentUrl.endsWith('/') ? '' : '/'}${cxaVersion ? cxaVersion + '/tpi/' : ''}${appType + '/'}remoteEntry.js`;
  }
  return '';
}
/**
 * Import script dynamically as a container
 * @param url - url for remote script
 * @example - loadModule(url);
 */
function loadModule(url) {
  try {
    return import( /* webpackIgnore:true */url);
  } catch (error) {
    console.error(`Failed to load module from ${url}`, error);
    throw error;
  }
}
/**
 * Helper method to load the container in the DOM, used in loadRemoteModule & loadIntegrationModule
 *
 * @param container - container of the module to load
 * @param appType - type of remote embedded app
 * @param remoteModuleKey - key to store remote module in map
 * @param moduleName - exported module name from remote entry
 * @example
 * ```
 * initContainer(container, appType, remoteModuleKey, moduleName);
 * ```
 */
function initContainer(container, appType, remoteModuleKey, moduleName) {
  return __awaiter(this, void 0, void 0, function* () {
    yield container.init(__webpack_share_scopes__.default);
    const factory = yield container.get(moduleName);
    const Module = factory();
    remoteContainerMap.set(appType, container);
    remoteModuleMap.set(remoteModuleKey, Module);
    return Module;
  });
}
/**
 * Method to load remote Integration Module from remoteEntry.js file
 * @param appType - type of remote embedded app
 * @param remoteEntryUrl - url of the remote entry
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
    return container ? initContainer(container, appType, remoteModuleKey, defaultModuleName) : null;
  });
}
/**
 * Method to load remote Integration Module from remoteEntry.js file
 * IMPORTANT: This method should only be used after useScript method is called to load remoteEntry.js file
 *
 * @param appType - type of remote embedded app
 * @param remoteName - module federation defined remote name
 * @param moduleName - exported module name from remote entry
 * @example
 * ```
 * const { ready, failed } = useScript({
 *   scriptSrc: REMOTE_ENTRY,
 *   scriptType: 'text/javascript',
 * });
 *
 * const Component = lazy(loadRemoteModule(CcfAppType.LvAppSpace, REMOTE_NAME, `./${moduleName}`));
 * ```
 */
function loadRemoteModule(appType, remoteName, moduleName) {
  return () => __awaiter(this, void 0, void 0, function* () {
    const remoteModuleKey = `${appType}:${remoteName}${moduleName}`;
    if (remoteModuleMap.has(remoteModuleKey)) return remoteModuleMap.get(remoteModuleKey);
    if (!initialSharingScopeCreated) {
      initialSharingScopeCreated = true;
      yield __webpack_init_sharing__('default');
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const container = window[remoteName];
    return container ? initContainer(container, appType, remoteModuleKey, moduleName) : null;
  });
}

const GlobalContext = /*#__PURE__*/createContext(undefined);
/**
 * Custom hook to access the version context.
 * Throws an error if used outside of the GlobalContextProvider.
 * @example
 * ```
 * const { tpiVersion, setTPIVersion } = useGlobalContext();
 * ```
 */
const useGlobalContext = () => {
  const ctx = useContext(GlobalContext);
  if (!ctx) throw new Error('useGlobalContext must be used inside GlobalContext.Provider');
  return ctx;
};
/**
 * Provides the version context to its child components.
 * @param children - The child React nodes that will have access to the version context.
 * @returns A context provider for version state.
 * @example
 * ```
 *  <GlobalContextProvider>
 *    <Component />
 *  </GlobalContextProvider>
 * ```
 */
const GlobalContextProvider = ({
  children
}) => {
  const [tpiVersion, setTPIVersion] = useState('');
  return jsx(GlobalContext.Provider, Object.assign({
    value: {
      tpiVersion,
      setTPIVersion
    }
  }, {
    children: children
  }));
};

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
  CcfAppType["LvAppSpace"] = "lv";
  CcfAppType["CXoneAgentChat"] = "cxac";
})(CcfAppType || (CcfAppType = {}));

/**
 * Embedded apps can access this class
 * Passing true / false based on the feature toggle present
 * Not able to use the Feature Toggle Service and LocalStorageHelper due to circular dependency
 */
class Embeddedappsfeaturetoggleservice {
  /**
   * check the feature toggle exist
   * @param featureName - feature toggle name
   * @example - isFeatureToggleEnabled()
   */
  static isFeatureToggleEnabled(featureName) {
    const features = JSON.parse(localStorage.getItem('feature_toggles') || '[]');
    if (features) {
      return Array.isArray(features) && (features === null || features === void 0 ? void 0 : features.includes(featureName));
    }
    return false;
  }
}

/**
 * This component will act as middleman to load integration component as per the AppType
 * @param props - IntegrationComponentProps type
 * @returns - Either integration component or empty jsx fragment
 * @example - IntegrationComponentLoader
 */
const IntegrationComponentLoader = /*#__PURE__*/memo(props => {
  //Fetch and load remote entry file of remote app
  // Dev Note: Uncomment below line to run app locally and comment out line with getRemoteEntryUrl() method
  //const remoteEntryUrl = useRef<string>(props.appType == 'cxa-chrome-os' ? 'http://localhost:4204/remoteEntry.js' : 'http://localhost:4202/remoteEntry.js');
  const remoteEntryUrl = useRef(getRemoteEntryUrl(props.appType, ''));
  const [isRemoteModuleLoaded, setIsRemoteModuleLoaded] = useState(false);
  const nonVersionedApps = [CcfAppType.CXoneAgentMsTeams.toString(), CcfAppType.CXoneAgentMsDynamics.toString()];
  const {
    tpiVersion
  } = useGlobalContext();
  const isAppRunningLocally = /^(http|https):\/\/(localhost)/.test(window.location.href); // To identify if the app is running locally
  /**
   * Loads the CRM remote entry module.
   * @param remoteEntryUrl - The URL of the remote entry module.
   * @example
   * ```
   * loadCRMRemoteEntryModule('http://localhost:4202/remoteEntry.js');
   * ```
   */
  function loadCRMRemoteEntryModule(remoteEntryModuleUrl) {
    try {
      if (remoteEntryModuleUrl) {
        const head = document.querySelector('head');
        const script = document.createElement('script');
        script.src = remoteEntryModuleUrl;
        script.type = 'module';
        script.async = true;
        script.onload = () => {
          setIsRemoteModuleLoaded(true);
        };
        script.onerror = () => {
          console.error('Failed to load remote entry script:', remoteEntryModuleUrl);
        };
        head === null || head === void 0 ? void 0 : head.appendChild(script);
        return script;
      }
    } catch (error) {
      console.error('Error loading remote entry:', remoteEntryModuleUrl, error);
    }
    return null;
  }
  /**
   * Checks if a remote entry file is available in S3.
   * @param url - The URL of the file to check
   * @returns A promise that resolves to true if the file exists and is a JavaScript file, false otherwise
   * @example
   * ```
   * isRemoteEntryFileAvailableInS3(remoteURL);
   * ```
   */
  const isRemoteEntryFileAvailableInS3 = url => __awaiter(void 0, void 0, void 0, function* () {
    try {
      // Use HEAD request to check if the file exists without downloading its content
      const response = yield fetch(url, {
        method: 'HEAD'
      });
      if (!response.ok) {
        return false;
      }
      const contentType = response.headers.get('content-type') || '';
      // accept if the response type is JavaScript. The default redirection from CF will return 'text/html' if the file is not present
      return contentType.includes('text/javascript');
    } catch (error) {
      return false;
    }
  });
  useEffect(() => {
    let script;
    // No versioning CXoneAgent MsTeams and CXoneAgent MsDynamics apps
    if (isAppRunningLocally || props.appType && nonVersionedApps.includes(props.appType)) {
      script = loadCRMRemoteEntryModule(remoteEntryUrl.current);
    }
    return () => {
      var _a;
      (_a = script === null || script === void 0 ? void 0 : script.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.appType]);
  useEffect(() => {
    let script;
    // Load versioned remote entry for other embedded apps
    if (!isAppRunningLocally && props.appType && tpiVersion && nonVersionedApps.indexOf(props.appType) === -1) {
      const unversionedRemoteEntryURL = getRemoteEntryUrl(props.appType, '');
      const versionedRemoteEntryURL = getTPIRemoteEntryUrl(props.appType, tpiVersion);
      /**
       * Checks if the CRM remote file exists and sets the remote entry URL availability state.
       * @example
       * checkCRMRemoteFile();
       */
      const isCRMVersioningFTEnabled = Embeddedappsfeaturetoggleservice.isFeatureToggleEnabled("release-cxa-versioning-for-tpi-apps-CRM-18330" /* EmbeddedFeatureToggles.RELEASE_CXA_VERSIONING_FOR_TPI_APPS_CRM_18330 */);
      if (isCRMVersioningFTEnabled) (() => __awaiter(void 0, void 0, void 0, function* () {
        // to support older versions first we need to verify if the CRM remote entry present inside the versioned hash folder
        const versionedFileExists = yield isRemoteEntryFileAvailableInS3(versionedRemoteEntryURL);
        remoteEntryUrl.current = versionedFileExists ? versionedRemoteEntryURL : unversionedRemoteEntryURL;
        script = loadCRMRemoteEntryModule(remoteEntryUrl.current);
      }))();else {
        // when the CRM versioning feature toggle is disabled, use the unversioned remote entry URL
        remoteEntryUrl.current = unversionedRemoteEntryURL;
        script = loadCRMRemoteEntryModule(remoteEntryUrl.current);
      }
    }
    return () => {
      var _a;
      (_a = script === null || script === void 0 ? void 0 : script.parentNode) === null || _a === void 0 ? void 0 : _a.removeChild(script);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tpiVersion, props.appType]);
  const IntegrationComponent = useMemo(() => {
    if (!isRemoteModuleLoaded) return null;
    return /*#__PURE__*/React.lazy(loadIntegrationModule(props.appType, remoteEntryUrl.current));
  }, [props.appType, isRemoteModuleLoaded]);
  //If remote entry file is not loaded, then skip loading embedded module
  if (!isRemoteModuleLoaded) {
    return jsx(Fragment, {});
  }
  return jsx(Suspense, Object.assign({
    fallback: null
  }, {
    children: IntegrationComponent && jsx(IntegrationComponent, Object.assign({}, props))
  }));
});

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
  CcfMessageType["SetCtdCustomAgentUrl"] = "Ccf_Set_Ctd_Custom_Agent_Url";
  CcfMessageType["ScreenAgentPing"] = "screenAgent_ping";
  CcfMessageType["ScreenAgentConnect"] = "screenAgent_connect";
  CcfMessageType["ScreenAgentDisconnect"] = "screenAgent_disconnect";
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
   *@remarks - enum for session switched event
   */
  CXoneAgentEvents["CXONE_SESSION_SWITCHED_EVENT"] = "SessionSwitchedEvent";
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
  /**
   * @remarks - enum for voicemail contact type
   */
  CXoneAgentEvents["CXONE_VOICE_MAIL_CONTACT_EVENT"] = "VoiceMailContact";
  /**
   * @remarks - enum for workitem contact type
   */
  CXoneAgentEvents["CXONE_WORKITEM_CONTACT_EVENT"] = "WorkItemContact";
  /**
   * @remarks - enum for contact selection changed event
   */
  CXoneAgentEvents["CXONE_CONTACT_SELECTION_EVENT"] = "ContactSelectionEvent";
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
  /**
   * A callback call
   */
  CXoneCallContactStatus["CALL_BACK_DISCONNECTED"] = "CallBackDisconnected";
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

var fails$3 = fails$m;
var wellKnownSymbol$2 = wellKnownSymbol$j;
var IS_PURE = isPure;

var ITERATOR$1 = wellKnownSymbol$2('iterator');

var urlConstructorDetection = !fails$3(function () {
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

var defineBuiltIn$3 = defineBuiltIn$a;

var defineBuiltIns$1 = function (target, src, options) {
  for (var key in src) defineBuiltIn$3(target, key, src[key], options);
  return target;
};

var toPropertyKey = toPropertyKey$3;
var definePropertyModule = objectDefineProperty;
var createPropertyDescriptor$1 = createPropertyDescriptor$5;

var createProperty$2 = function (object, key, value) {
  var propertyKey = toPropertyKey(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor$1(0, value));
  else object[propertyKey] = value;
};

var toAbsoluteIndex = toAbsoluteIndex$2;
var lengthOfArrayLike$3 = lengthOfArrayLike$6;
var createProperty$1 = createProperty$2;

var $Array$1 = Array;
var max = Math.max;

var arraySliceSimple = function (O, start, end) {
  var length = lengthOfArrayLike$3(O);
  var k = toAbsoluteIndex(start, length);
  var fin = toAbsoluteIndex(end === undefined ? length : end, length);
  var result = $Array$1(max(fin - k, 0));
  for (var n = 0; k < fin; k++, n++) createProperty$1(result, n, O[k]);
  result.length = n;
  return result;
};

var arraySlice$1 = arraySliceSimple;

var floor$2 = Math.floor;

var mergeSort = function (array, comparefn) {
  var length = array.length;
  var middle = floor$2(length / 2);
  return length < 8 ? insertionSort(array, comparefn) : merge(
    array,
    mergeSort(arraySlice$1(array, 0, middle), comparefn),
    mergeSort(arraySlice$1(array, middle), comparefn),
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

var $$3 = _export;
var global$2 = global$o;
var call$4 = functionCall;
var uncurryThis$5 = functionUncurryThis;
var DESCRIPTORS$1 = descriptors;
var USE_NATIVE_URL$1 = urlConstructorDetection;
var defineBuiltIn$2 = defineBuiltIn$a;
var defineBuiltIns = defineBuiltIns$1;
var setToStringTag$1 = setToStringTag$5;
var createIteratorConstructor = iteratorCreateConstructor;
var InternalStateModule$2 = internalState;
var anInstance$1 = anInstance$3;
var isCallable$1 = isCallable$m;
var hasOwn$1 = hasOwnProperty_1;
var bind$2 = functionBindContext;
var classof$1 = classof$7;
var anObject$4 = anObject$h;
var isObject = isObject$a;
var $toString$1 = toString$8;
var create = objectCreate;
var createPropertyDescriptor = createPropertyDescriptor$5;
var getIterator$1 = getIterator$3;
var getIteratorMethod$1 = getIteratorMethod$4;
var validateArgumentsLength$1 = validateArgumentsLength$3;
var wellKnownSymbol$1 = wellKnownSymbol$j;
var arraySort = arraySort$1;

var ITERATOR = wellKnownSymbol$1('iterator');
var URL_SEARCH_PARAMS = 'URLSearchParams';
var URL_SEARCH_PARAMS_ITERATOR = URL_SEARCH_PARAMS + 'Iterator';
var setInternalState$2 = InternalStateModule$2.set;
var getInternalParamsState = InternalStateModule$2.getterFor(URL_SEARCH_PARAMS);
var getInternalIteratorState = InternalStateModule$2.getterFor(URL_SEARCH_PARAMS_ITERATOR);
// eslint-disable-next-line es/no-object-getownpropertydescriptor -- safe
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Avoid NodeJS experimental warning
var safeGetBuiltIn = function (name) {
  if (!DESCRIPTORS$1) return global$2[name];
  var descriptor = getOwnPropertyDescriptor(global$2, name);
  return descriptor && descriptor.value;
};

var nativeFetch = safeGetBuiltIn('fetch');
var NativeRequest = safeGetBuiltIn('Request');
var Headers = safeGetBuiltIn('Headers');
var RequestPrototype = NativeRequest && NativeRequest.prototype;
var HeadersPrototype = Headers && Headers.prototype;
var RegExp$1 = global$2.RegExp;
var TypeError$2 = global$2.TypeError;
var decodeURIComponent = global$2.decodeURIComponent;
var encodeURIComponent$1 = global$2.encodeURIComponent;
var charAt$4 = uncurryThis$5(''.charAt);
var join$2 = uncurryThis$5([].join);
var push$3 = uncurryThis$5([].push);
var replace$2 = uncurryThis$5(''.replace);
var shift$1 = uncurryThis$5([].shift);
var splice = uncurryThis$5([].splice);
var split$2 = uncurryThis$5(''.split);
var stringSlice$2 = uncurryThis$5(''.slice);

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
  var result = replace$2(it, plus, ' ');
  var bytes = 4;
  try {
    return decodeURIComponent(result);
  } catch (error) {
    while (bytes) {
      result = replace$2(result, percentSequence(bytes--), percentDecode);
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
  return replace$2(encodeURIComponent$1(it), find, replacer);
};

var URLSearchParamsIterator = createIteratorConstructor(function Iterator(params, kind) {
  setInternalState$2(this, {
    type: URL_SEARCH_PARAMS_ITERATOR,
    iterator: getIterator$1(getInternalParamsState(params).entries),
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
    else this.parseQuery(typeof init == 'string' ? charAt$4(init, 0) === '?' ? stringSlice$2(init, 1) : init : $toString$1(init));
  }
};

URLSearchParamsState.prototype = {
  type: URL_SEARCH_PARAMS,
  bindURL: function (url) {
    this.url = url;
    this.update();
  },
  parseObject: function (object) {
    var iteratorMethod = getIteratorMethod$1(object);
    var iterator, next, step, entryIterator, entryNext, first, second;

    if (iteratorMethod) {
      iterator = getIterator$1(object, iteratorMethod);
      next = iterator.next;
      while (!(step = call$4(next, iterator)).done) {
        entryIterator = getIterator$1(anObject$4(step.value));
        entryNext = entryIterator.next;
        if (
          (first = call$4(entryNext, entryIterator)).done ||
          (second = call$4(entryNext, entryIterator)).done ||
          !call$4(entryNext, entryIterator).done
        ) throw TypeError$2('Expected sequence with length 2');
        push$3(this.entries, { key: $toString$1(first.value), value: $toString$1(second.value) });
      }
    } else for (var key in object) if (hasOwn$1(object, key)) {
      push$3(this.entries, { key: key, value: $toString$1(object[key]) });
    }
  },
  parseQuery: function (query) {
    if (query) {
      var attributes = split$2(query, '&');
      var index = 0;
      var attribute, entry;
      while (index < attributes.length) {
        attribute = attributes[index++];
        if (attribute.length) {
          entry = split$2(attribute, '=');
          push$3(this.entries, {
            key: deserialize(shift$1(entry)),
            value: deserialize(join$2(entry, '='))
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
      push$3(result, serialize(entry.key) + '=' + serialize(entry.value));
    } return join$2(result, '&');
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
  anInstance$1(this, URLSearchParamsPrototype);
  var init = arguments.length > 0 ? arguments[0] : undefined;
  setInternalState$2(this, new URLSearchParamsState(init));
};

var URLSearchParamsPrototype = URLSearchParamsConstructor.prototype;

defineBuiltIns(URLSearchParamsPrototype, {
  // `URLSearchParams.prototype.append` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-append
  append: function append(name, value) {
    validateArgumentsLength$1(arguments.length, 2);
    var state = getInternalParamsState(this);
    push$3(state.entries, { key: $toString$1(name), value: $toString$1(value) });
    state.updateURL();
  },
  // `URLSearchParams.prototype.delete` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-delete
  'delete': function (name) {
    validateArgumentsLength$1(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var key = $toString$1(name);
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
    validateArgumentsLength$1(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString$1(name);
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) return entries[index].value;
    }
    return null;
  },
  // `URLSearchParams.prototype.getAll` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-getall
  getAll: function getAll(name) {
    validateArgumentsLength$1(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString$1(name);
    var result = [];
    var index = 0;
    for (; index < entries.length; index++) {
      if (entries[index].key === key) push$3(result, entries[index].value);
    }
    return result;
  },
  // `URLSearchParams.prototype.has` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-has
  has: function has(name) {
    validateArgumentsLength$1(arguments.length, 1);
    var entries = getInternalParamsState(this).entries;
    var key = $toString$1(name);
    var index = 0;
    while (index < entries.length) {
      if (entries[index++].key === key) return true;
    }
    return false;
  },
  // `URLSearchParams.prototype.set` method
  // https://url.spec.whatwg.org/#dom-urlsearchparams-set
  set: function set(name, value) {
    validateArgumentsLength$1(arguments.length, 1);
    var state = getInternalParamsState(this);
    var entries = state.entries;
    var found = false;
    var key = $toString$1(name);
    var val = $toString$1(value);
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
    if (!found) push$3(entries, { key: key, value: val });
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
    var boundFunction = bind$2(callback, arguments.length > 1 ? arguments[1] : undefined);
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
defineBuiltIn$2(URLSearchParamsPrototype, ITERATOR, URLSearchParamsPrototype.entries, { name: 'entries' });

// `URLSearchParams.prototype.toString` method
// https://url.spec.whatwg.org/#urlsearchparams-stringification-behavior
defineBuiltIn$2(URLSearchParamsPrototype, 'toString', function toString() {
  return getInternalParamsState(this).serialize();
}, { enumerable: true });

setToStringTag$1(URLSearchParamsConstructor, URL_SEARCH_PARAMS);

$$3({ global: true, constructor: true, forced: !USE_NATIVE_URL$1 }, {
  URLSearchParams: URLSearchParamsConstructor
});

// Wrap `fetch` and `Request` for correct work with polyfilled `URLSearchParams`
if (!USE_NATIVE_URL$1 && isCallable$1(Headers)) {
  var headersHas = uncurryThis$5(HeadersPrototype.has);
  var headersSet = uncurryThis$5(HeadersPrototype.set);

  var wrapRequestOptions = function (init) {
    if (isObject(init)) {
      var body = init.body;
      var headers;
      if (classof$1(body) === URL_SEARCH_PARAMS) {
        headers = init.headers ? new Headers(init.headers) : new Headers();
        if (!headersHas(headers, 'content-type')) {
          headersSet(headers, 'content-type', 'application/x-www-form-urlencoded;charset=UTF-8');
        }
        return create(init, {
          body: createPropertyDescriptor(0, $toString$1(body)),
          headers: createPropertyDescriptor(0, headers)
        });
      }
    } return init;
  };

  if (isCallable$1(nativeFetch)) {
    $$3({ global: true, enumerable: true, dontCallGetSet: true, forced: true }, {
      fetch: function fetch(input /* , init */) {
        return nativeFetch(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
      }
    });
  }

  if (isCallable$1(NativeRequest)) {
    var RequestConstructor = function Request(input /* , init */) {
      anInstance$1(this, RequestPrototype);
      return new NativeRequest(input, arguments.length > 1 ? wrapRequestOptions(arguments[1]) : {});
    };

    RequestPrototype.constructor = RequestConstructor;
    RequestConstructor.prototype = RequestPrototype;

    $$3({ global: true, constructor: true, dontCallGetSet: true, forced: true }, {
      Request: RequestConstructor
    });
  }
}

var web_urlSearchParams_constructor = {
  URLSearchParams: URLSearchParamsConstructor,
  getState: getInternalParamsState
};

// TODO: Remove from `core-js@4` since it's moved to entry points

var uncurryThis$4 = functionUncurryThisClause;
var defineBuiltIn$1 = defineBuiltIn$a;
var regexpExec$1 = regexpExec$2;
var fails$2 = fails$m;
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
    var uncurriedNativeRegExpMethod = uncurryThis$4(/./[SYMBOL]);
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      var uncurriedNativeMethod = uncurryThis$4(nativeMethod);
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

    defineBuiltIn$1(String.prototype, KEY, methods[0]);
    defineBuiltIn$1(RegExpPrototype, SYMBOL, methods[1]);
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

var call$3 = functionCall;
var anObject$3 = anObject$h;
var isCallable = isCallable$m;
var classof = classofRaw$2;
var regexpExec = regexpExec$2;

var $TypeError$2 = TypeError;

// `RegExpExec` abstract operation
// https://tc39.es/ecma262/#sec-regexpexec
var regexpExecAbstract = function (R, S) {
  var exec = R.exec;
  if (isCallable(exec)) {
    var result = call$3(exec, R, S);
    if (result !== null) anObject$3(result);
    return result;
  }
  if (classof(R) === 'RegExp') return call$3(regexpExec, R, S);
  throw $TypeError$2('RegExp#exec called on incompatible receiver');
};

var call$2 = functionCall;
var fixRegExpWellKnownSymbolLogic$1 = fixRegexpWellKnownSymbolLogic;
var anObject$2 = anObject$h;
var isNullOrUndefined$1 = isNullOrUndefined$6;
var requireObjectCoercible$2 = requireObjectCoercible$7;
var sameValue = sameValue$1;
var toString$4 = toString$8;
var getMethod$1 = getMethod$5;
var regExpExec$1 = regexpExecAbstract;

// @@search logic
fixRegExpWellKnownSymbolLogic$1('search', function (SEARCH, nativeSearch, maybeCallNative) {
  return [
    // `String.prototype.search` method
    // https://tc39.es/ecma262/#sec-string.prototype.search
    function search(regexp) {
      var O = requireObjectCoercible$2(this);
      var searcher = isNullOrUndefined$1(regexp) ? undefined : getMethod$1(regexp, SEARCH);
      return searcher ? call$2(searcher, regexp, O) : new RegExp(regexp)[SEARCH](toString$4(O));
    },
    // `RegExp.prototype[@@search]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@search
    function (string) {
      var rx = anObject$2(this);
      var S = toString$4(string);
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
  let appType;
  if (appConfig.applicationName === 'Agent-Chat') {
    appType = 'cxac';
  } else {
    // in case appType is not provided, use default 'cxa'
    appType = app && Object.values(CcfAppType).includes(app) ? app : 'cxa';
  }
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

var uncurryThis$3 = functionUncurryThis;
var toIntegerOrInfinity = toIntegerOrInfinity$3;
var toString$3 = toString$8;
var requireObjectCoercible$1 = requireObjectCoercible$7;

var charAt$3 = uncurryThis$3(''.charAt);
var charCodeAt$1 = uncurryThis$3(''.charCodeAt);
var stringSlice$1 = uncurryThis$3(''.slice);

var createMethod$1 = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = toString$3(requireObjectCoercible$1($this));
    var position = toIntegerOrInfinity(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = charCodeAt$1(S, position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = charCodeAt$1(S, position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING
          ? charAt$3(S, position)
          : first
        : CONVERT_TO_STRING
          ? stringSlice$1(S, position, position + 2)
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

var charAt$2 = stringMultibyte.charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.es/ecma262/#sec-advancestringindex
var advanceStringIndex$1 = function (S, index, unicode) {
  return index + (unicode ? charAt$2(S, index).length : 1);
};

var call$1 = functionCall;
var fixRegExpWellKnownSymbolLogic = fixRegexpWellKnownSymbolLogic;
var anObject$1 = anObject$h;
var isNullOrUndefined = isNullOrUndefined$6;
var toLength = toLength$3;
var toString$2 = toString$8;
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
      return matcher ? call$1(matcher, regexp, O) : new RegExp(regexp)[MATCH](toString$2(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.es/ecma262/#sec-regexp.prototype-@@match
    function (string) {
      var rx = anObject$1(this);
      var S = toString$2(string);
      var res = maybeCallNative(nativeMatch, rx, S);

      if (res.done) return res.value;

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = toString$2(result[0]);
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
        // Set parsing error flag so initialize thunk can detect and handle it
        dispatch(setData({
          __parsingError: true
        }));
        dispatch(initialize());
        return -1;
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

var aCallable$1 = aCallable$9;
var toObject$2 = toObject$6;
var IndexedObject = indexedObject;
var lengthOfArrayLike$2 = lengthOfArrayLike$6;

var $TypeError$1 = TypeError;

// `Array.prototype.{ reduce, reduceRight }` methods implementation
var createMethod = function (IS_RIGHT) {
  return function (that, callbackfn, argumentsLength, memo) {
    aCallable$1(callbackfn);
    var O = toObject$2(that);
    var self = IndexedObject(O);
    var length = lengthOfArrayLike$2(O);
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
        throw $TypeError$1('Reduce of empty array with no initial value');
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

var fails$1 = fails$m;

var arrayMethodIsStrict$2 = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails$1(function () {
    // eslint-disable-next-line no-useless-call -- required for testing
    method.call(null, argument || function () { return 1; }, 1);
  });
};

var $$2 = _export;
var $reduce = arrayReduce.left;
var arrayMethodIsStrict$1 = arrayMethodIsStrict$2;
var CHROME_VERSION = engineV8Version;
var IS_NODE = engineIsNode;

var STRICT_METHOD$1 = arrayMethodIsStrict$1('reduce');
// Chrome 80-82 has a critical bug
// https://bugs.chromium.org/p/chromium/issues/detail?id=1049982
var CHROME_BUG = !IS_NODE && CHROME_VERSION > 79 && CHROME_VERSION < 83;

// `Array.prototype.reduce` method
// https://tc39.es/ecma262/#sec-array.prototype.reduce
$$2({ target: 'Array', proto: true, forced: !STRICT_METHOD$1 || CHROME_BUG }, {
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
        const isAu2Matched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/sov1.au/);
        const isEu2Matched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/sov1.eu/);
        const isUk2Matched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/sov1.uk/);
        const isUk3Matched = browserUrl === null || browserUrl === void 0 ? void 0 : browserUrl.match(/sov2.uk/);
        if (isEnvMatched) {
          cxoneHostname = `https://cxone.${isEnvMatched}.niceincontact.com`;
        } else if (isFedMatched) {
          cxoneHostname = 'https://cxone-gov.niceincontact.com';
        } else if (isAu2Matched) {
          cxoneHostname = 'https://nicecxone-sov1.au';
        } else if (isEu2Matched) {
          cxoneHostname = 'https://nicecxone-sov1.eu';
        } else if (isUk2Matched) {
          cxoneHostname = 'https://nicecxone-sov1.uk';
        } else if (isUk3Matched) {
          cxoneHostname = 'https://nicecxone-sov2.uk';
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

var tryToString = tryToString$5;

var $TypeError = TypeError;

var deletePropertyOrThrow$1 = function (O, P) {
  if (!delete O[P]) throw $TypeError('Cannot delete property ' + tryToString(P) + ' of ' + tryToString(O));
};

var userAgent$1 = engineUserAgent;

var firefox = userAgent$1.match(/firefox\/(\d+)/i);

var engineFfVersion = !!firefox && +firefox[1];

var UA = engineUserAgent;

var engineIsIeOrEdge = /MSIE|Trident/.test(UA);

var userAgent = engineUserAgent;

var webkit = userAgent.match(/AppleWebKit\/(\d+)\./);

var engineWebkitVersion = !!webkit && +webkit[1];

var $$1 = _export;
var uncurryThis$2 = functionUncurryThis;
var aCallable = aCallable$9;
var toObject$1 = toObject$6;
var lengthOfArrayLike$1 = lengthOfArrayLike$6;
var deletePropertyOrThrow = deletePropertyOrThrow$1;
var toString$1 = toString$8;
var fails = fails$m;
var internalSort = arraySort$1;
var arrayMethodIsStrict = arrayMethodIsStrict$2;
var FF = engineFfVersion;
var IE_OR_EDGE = engineIsIeOrEdge;
var V8 = engineV8Version;
var WEBKIT = engineWebkitVersion;

var test = [];
var nativeSort = uncurryThis$2(test.sort);
var push$2 = uncurryThis$2(test.push);

// IE8-
var FAILS_ON_UNDEFINED = fails(function () {
  test.sort(undefined);
});
// V8 bug
var FAILS_ON_NULL = fails(function () {
  test.sort(null);
});
// Old WebKit
var STRICT_METHOD = arrayMethodIsStrict('sort');

var STABLE_SORT = !fails(function () {
  // feature detection can be too slow, so check engines versions
  if (V8) return V8 < 70;
  if (FF && FF > 3) return;
  if (IE_OR_EDGE) return true;
  if (WEBKIT) return WEBKIT < 603;

  var result = '';
  var code, chr, value, index;

  // generate an array with more 512 elements (Chakra and old V8 fails only in this case)
  for (code = 65; code < 76; code++) {
    chr = String.fromCharCode(code);

    switch (code) {
      case 66: case 69: case 70: case 72: value = 3; break;
      case 68: case 71: value = 4; break;
      default: value = 2;
    }

    for (index = 0; index < 47; index++) {
      test.push({ k: chr + index, v: value });
    }
  }

  test.sort(function (a, b) { return b.v - a.v; });

  for (index = 0; index < test.length; index++) {
    chr = test[index].k.charAt(0);
    if (result.charAt(result.length - 1) !== chr) result += chr;
  }

  return result !== 'DGBEFHACIJK';
});

var FORCED = FAILS_ON_UNDEFINED || !FAILS_ON_NULL || !STRICT_METHOD || !STABLE_SORT;

var getSortCompare = function (comparefn) {
  return function (x, y) {
    if (y === undefined) return -1;
    if (x === undefined) return 1;
    if (comparefn !== undefined) return +comparefn(x, y) || 0;
    return toString$1(x) > toString$1(y) ? 1 : -1;
  };
};

// `Array.prototype.sort` method
// https://tc39.es/ecma262/#sec-array.prototype.sort
$$1({ target: 'Array', proto: true, forced: FORCED }, {
  sort: function sort(comparefn) {
    if (comparefn !== undefined) aCallable(comparefn);

    var array = toObject$1(this);

    if (STABLE_SORT) return comparefn === undefined ? nativeSort(array) : nativeSort(array, comparefn);

    var items = [];
    var arrayLength = lengthOfArrayLike$1(array);
    var itemsLength, index;

    for (index = 0; index < arrayLength; index++) {
      if (index in array) push$2(items, array[index]);
    }

    internalSort(items, getSortCompare(comparefn));

    itemsLength = lengthOfArrayLike$1(items);
    index = 0;

    while (index < itemsLength) array[index] = items[index++];
    while (index < arrayLength) deletePropertyOrThrow(array, index++);

    return array;
  }
});

/**
 * Reads the `screenPopBeforeAccept` parameter the search workflow sets on a record. The
 * parameter is optional and opt-in - a record without it may only be shown once the agent
 * has accepted the interaction. Studio stores the flag as a string, so both forms are
 * accepted here.
 * @param record - record from the agent workflow payload
 * @returns true when the record may be shown before the agent accepts
 * @example - isScreenPopBeforeAcceptFlagged(pinRecord);
 */
function isScreenPopBeforeAcceptFlagged(record) {
  const flag = record === null || record === void 0 ? void 0 : record.screenPopBeforeAccept;
  return typeof flag === 'string' ? flag.toLowerCase() === 'true' : flag === true;
}
/**
 * Whether a record's `screenPop` flag means "pop this record".
 *
 * The flag is typed `boolean`, but it does NOT always arrive as one. A Studio script that
 * builds its payload by hand (`payload.<...>.screenPop='True'` then `payload.asjson()`)
 * serializes it as a STRING, and neither SDK model coerces it — `agent-workflow-event-record.ts`
 * and `agent-workflow-event-pinrecords.ts` both assign `data?.screenPop` straight through,
 * unlike the adjacent `linkable`, which IS string-coerced. Other consumers of the same flag
 * already compare against the string form (`create-entity.ts`, the workflow config editor),
 * confirming strings are a real wire shape.
 *
 * Comparing with `=== true` therefore silently dropped every hand-built payload. Accepting the
 * string restores the behaviour these scripts were written against, while still treating
 * `false` / `'false'` as an explicit opt-out — master used a bare truthy check, which wrongly
 * popped on the string `'false'` too, and that looseness is deliberately NOT restored.
 * @param value - The raw `screenPop` value off the record.
 * @returns true when the record should be screen popped.
 * @example isScreenPopEnabled('True') // true
 */
function isScreenPopEnabled(value) {
  return value === true || typeof value === 'string' && value.toLowerCase() === 'true';
}
/**
 * Keeps only the first CRM result of a workflow response. With the multi-CRM toggle OFF the
 * legacy customer card renders only `result[0]`, and `triggerCRMScreenPop` popped only that
 * result before multi-CRM. It now pops every result, so legacy callers pass the response through
 * this first - otherwise a script with two CRM instances pops records the agent cannot see.
 * @param activityData - The activity data from agent workflow
 * @returns the same response holding only its first CRM result
 * @example - triggerCRMScreenPop(limitToFirstCrmResult(activityData));
 */
function limitToFirstCrmResult(activityData) {
  if (!(activityData === null || activityData === void 0 ? void 0 : activityData.result)) {
    return activityData;
  }
  return Object.assign(Object.assign({}, activityData), {
    result: activityData.result.slice(0, 1)
  });
}
/**
 * Common helper function to contain shared functions which can be used across apps.
 * @param activityData - The activity data from agent workflow
 * @param action - Optional action parameter
 * @param isBeforeAccept - true when the pop is happening while the contact is still
 * ringing. Only records the workflow flagged `screenPopBeforeAccept` pop in that case;
 * every other record pops once the agent accepts.
 * @param alreadyPoppedRecordIds - ids of the records that already popped for this contact
 * while it was ringing. Those records are skipped on the post-accept pop so the agent is not
 * sent to the same CRM page twice. Every other record - flagged or not - pops as before.
 * @returns ids of the records that were screen popped
 * @example - triggerCRMScreenPop(screenPopData, 'screenPop');
 */
function triggerCRMScreenPop(activityData, action, isBeforeAccept = false, alreadyPoppedRecordIds = []) {
  var _a, _b;
  const poppedRecordIds = [];
  if (!activityData) {
    return poppedRecordIds;
  }
  /**
   * Splits the records by the stage they belong to. Before accept only the records the
   * workflow opted in to pop; after accept every record pops, minus the ones that already
   * popped while the contact was ringing. The parameter is absent for existing workflows,
   * which must keep their accept-first behaviour.
   * @param records - records to filter
   * @returns records that are allowed to pop at this point in the contact lifecycle
   * @example - allowedForCurrentStage(pinRecords);
   */
  const allowedForCurrentStage = records => {
    const allRecords = records || [];
    if (isBeforeAccept) {
      return allRecords.filter(record => isScreenPopBeforeAcceptFlagged(record));
    }
    return alreadyPoppedRecordIds.length > 0 ? allRecords.filter(record => !alreadyPoppedRecordIds.includes(String(record.id))) : allRecords;
  };
  /**
   * Sorts records by the numeric position value when at least one record includes a position field.
   * @example sortRecordsByPositionIfPresent(records);
   */
  const sortRecordsByPositionIfPresent = records => {
    const hasPositionColumn = records.some(record => Object.prototype.hasOwnProperty.call(record, 'position'));
    if (!hasPositionColumn) {
      return records;
    }
    /**
     * Converts a record position value to a sortable number.
     * @example getPositionValue(record);
     */
    const getPositionValue = record => {
      const rawPosition = record.position;
      const parsedPosition = Number(rawPosition);
      return Number.isFinite(parsedPosition) ? parsedPosition : Number.POSITIVE_INFINITY;
    };
    return [...records].sort((leftRecord, rightRecord) => getPositionValue(leftRecord) - getPositionValue(rightRecord));
  };
  const screenPopEventArgs = {};
  screenPopEventArgs.detail = {
    contactId: activityData.contactId
  };
  if (action && action !== '') {
    screenPopEventArgs.detail.actionType = action;
  }
  /**
   * Function to initiate screen pop for a set of records belonging to a specific CRM
   * @param records - records to screen pop
   * @param baseUrl - base URL of the CRM system
   * @param crm - CRM system type (e.g. 'salesforce', 'servicenow', 'msd') sourced from `system.type`
   * @example - handleScreenPop(records, baseUrl, crm);
   */
  const handleScreenPop = (records, baseUrl, crm) => {
    for (const record of records) {
      const activityRecord = {
        display: record.display,
        id: record.id,
        label: record.label,
        type: record.type,
        url: baseUrl + record.url,
        crm
      };
      screenPopEventArgs.detail.activityRecord = activityRecord;
      const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, screenPopEventArgs);
      window.dispatchEvent(customEvent);
      poppedRecordIds.push(String(record.id));
    }
  };
  for (const crmResult of activityData.result) {
    const rawPinRecords = sortRecordsByPositionIfPresent((_a = crmResult === null || crmResult === void 0 ? void 0 : crmResult.pinRecords) !== null && _a !== void 0 ? _a : []);
    const rawRelatedRecords = sortRecordsByPositionIfPresent((_b = crmResult === null || crmResult === void 0 ? void 0 : crmResult.records) !== null && _b !== void 0 ? _b : []);
    const pinRecords = allowedForCurrentStage(rawPinRecords);
    const relatedRecords = allowedForCurrentStage(rawRelatedRecords);
    const isSingleMatchResult = rawRelatedRecords.length === 1;
    const baseUrl = crmResult.system.baseUrl;
    const crm = crmResult.system.type;
    // Pin records (e.g. the record a create workflow just made) pop before related records,
    // as they did before multi-CRM. Zendesk drops a user routeTo that is followed within
    // milliseconds by a ticket routeTo, so the reverse order loses the search match (CXIFW-7464).
    if (pinRecords.length > 0) {
      const screenPopPinRecords = pinRecords.filter(record => isScreenPopEnabled(record.screenPop));
      if (screenPopPinRecords.length > 0) {
        handleScreenPop(screenPopPinRecords, baseUrl, crm);
      }
    }
    if (relatedRecords.length > 0) {
      if (isSingleMatchResult) {
        const singleRecord = relatedRecords[0];
        const hasScreenPop = Object.prototype.hasOwnProperty.call(singleRecord, 'screenPop');
        const shouldScreenPopSingleRecord = !hasScreenPop || isScreenPopEnabled(singleRecord.screenPop);
        if (shouldScreenPopSingleRecord) {
          handleScreenPop([singleRecord], baseUrl, crm);
        }
      } else {
        const screenPopRelatedRecords = relatedRecords.filter(record => Object.prototype.hasOwnProperty.call(record, 'screenPop') && isScreenPopEnabled(record.screenPop));
        if (screenPopRelatedRecords.length > 0) {
          handleScreenPop(screenPopRelatedRecords, baseUrl, crm);
        }
      }
    }
  }
  return poppedRecordIds;
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

var charAt$1 = stringMultibyte.charAt;
var toString = toString$8;
var InternalStateModule$1 = internalState;
var defineIterator = iteratorDefine;
var createIterResultObject = createIterResultObject$2;

var STRING_ITERATOR = 'String Iterator';
var setInternalState$1 = InternalStateModule$1.set;
var getInternalState = InternalStateModule$1.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.es/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState$1(this, {
    type: STRING_ITERATOR,
    string: toString(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.es/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return createIterResultObject(undefined, true);
  point = charAt$1(string, index);
  state.index += point.length;
  return createIterResultObject(point, false);
});

var makeBuiltIn = makeBuiltIn$3.exports;
var defineProperty = objectDefineProperty;

var defineBuiltInAccessor$1 = function (target, name, descriptor) {
  if (descriptor.get) makeBuiltIn(descriptor.get, name, { getter: true });
  if (descriptor.set) makeBuiltIn(descriptor.set, name, { setter: true });
  return defineProperty.f(target, name, descriptor);
};

var anObject = anObject$h;
var iteratorClose = iteratorClose$2;

// call something on iterator step with safe closing on error
var callWithSafeIterationClosing$1 = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  } catch (error) {
    iteratorClose(iterator, 'throw', error);
  }
};

var bind$1 = functionBindContext;
var call = functionCall;
var toObject = toObject$6;
var callWithSafeIterationClosing = callWithSafeIterationClosing$1;
var isArrayIteratorMethod = isArrayIteratorMethod$2;
var isConstructor = isConstructor$2;
var lengthOfArrayLike = lengthOfArrayLike$6;
var createProperty = createProperty$2;
var getIterator = getIterator$3;
var getIteratorMethod = getIteratorMethod$4;

var $Array = Array;

// `Array.from` method implementation
// https://tc39.es/ecma262/#sec-array.from
var arrayFrom$1 = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var IS_CONSTRUCTOR = isConstructor(this);
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  if (mapping) mapfn = bind$1(mapfn, argumentsLength > 2 ? arguments[2] : undefined);
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod && !(this === $Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = getIterator(O, iteratorMethod);
    next = iterator.next;
    result = IS_CONSTRUCTOR ? new this() : [];
    for (;!(step = call(next, iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = lengthOfArrayLike(O);
    result = IS_CONSTRUCTOR ? new this(length) : $Array(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};

// based on https://github.com/bestiejs/punycode.js/blob/master/punycode.js
var uncurryThis$1 = functionUncurryThis;

var maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
var base = 36;
var tMin = 1;
var tMax = 26;
var skew = 38;
var damp = 700;
var initialBias = 72;
var initialN = 128; // 0x80
var delimiter = '-'; // '\x2D'
var regexNonASCII = /[^\0-\u007E]/; // non-ASCII chars
var regexSeparators = /[.\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
var OVERFLOW_ERROR = 'Overflow: input needs wider integers to process';
var baseMinusTMin = base - tMin;

var $RangeError = RangeError;
var exec$1 = uncurryThis$1(regexSeparators.exec);
var floor$1 = Math.floor;
var fromCharCode = String.fromCharCode;
var charCodeAt = uncurryThis$1(''.charCodeAt);
var join$1 = uncurryThis$1([].join);
var push$1 = uncurryThis$1([].push);
var replace$1 = uncurryThis$1(''.replace);
var split$1 = uncurryThis$1(''.split);
var toLowerCase$1 = uncurryThis$1(''.toLowerCase);

/**
 * Creates an array containing the numeric code points of each Unicode
 * character in the string. While JavaScript uses UCS-2 internally,
 * this function will convert a pair of surrogate halves (each of which
 * UCS-2 exposes as separate characters) into a single code point,
 * matching UTF-16.
 */
var ucs2decode = function (string) {
  var output = [];
  var counter = 0;
  var length = string.length;
  while (counter < length) {
    var value = charCodeAt(string, counter++);
    if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
      // It's a high surrogate, and there is a next character.
      var extra = charCodeAt(string, counter++);
      if ((extra & 0xFC00) == 0xDC00) { // Low surrogate.
        push$1(output, ((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
      } else {
        // It's an unmatched surrogate; only append this code unit, in case the
        // next code unit is the high surrogate of a surrogate pair.
        push$1(output, value);
        counter--;
      }
    } else {
      push$1(output, value);
    }
  }
  return output;
};

/**
 * Converts a digit/integer into a basic code point.
 */
var digitToBasic = function (digit) {
  //  0..25 map to ASCII a..z or A..Z
  // 26..35 map to ASCII 0..9
  return digit + 22 + 75 * (digit < 26);
};

/**
 * Bias adaptation function as per section 3.4 of RFC 3492.
 * https://tools.ietf.org/html/rfc3492#section-3.4
 */
var adapt = function (delta, numPoints, firstTime) {
  var k = 0;
  delta = firstTime ? floor$1(delta / damp) : delta >> 1;
  delta += floor$1(delta / numPoints);
  while (delta > baseMinusTMin * tMax >> 1) {
    delta = floor$1(delta / baseMinusTMin);
    k += base;
  }
  return floor$1(k + (baseMinusTMin + 1) * delta / (delta + skew));
};

/**
 * Converts a string of Unicode symbols (e.g. a domain name label) to a
 * Punycode string of ASCII-only symbols.
 */
var encode = function (input) {
  var output = [];

  // Convert the input in UCS-2 to an array of Unicode code points.
  input = ucs2decode(input);

  // Cache the length.
  var inputLength = input.length;

  // Initialize the state.
  var n = initialN;
  var delta = 0;
  var bias = initialBias;
  var i, currentValue;

  // Handle the basic code points.
  for (i = 0; i < input.length; i++) {
    currentValue = input[i];
    if (currentValue < 0x80) {
      push$1(output, fromCharCode(currentValue));
    }
  }

  var basicLength = output.length; // number of basic code points.
  var handledCPCount = basicLength; // number of code points that have been handled;

  // Finish the basic string with a delimiter unless it's empty.
  if (basicLength) {
    push$1(output, delimiter);
  }

  // Main encoding loop:
  while (handledCPCount < inputLength) {
    // All non-basic code points < n have been handled already. Find the next larger one:
    var m = maxInt;
    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue >= n && currentValue < m) {
        m = currentValue;
      }
    }

    // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>, but guard against overflow.
    var handledCPCountPlusOne = handledCPCount + 1;
    if (m - n > floor$1((maxInt - delta) / handledCPCountPlusOne)) {
      throw $RangeError(OVERFLOW_ERROR);
    }

    delta += (m - n) * handledCPCountPlusOne;
    n = m;

    for (i = 0; i < input.length; i++) {
      currentValue = input[i];
      if (currentValue < n && ++delta > maxInt) {
        throw $RangeError(OVERFLOW_ERROR);
      }
      if (currentValue == n) {
        // Represent delta as a generalized variable-length integer.
        var q = delta;
        var k = base;
        while (true) {
          var t = k <= bias ? tMin : (k >= bias + tMax ? tMax : k - bias);
          if (q < t) break;
          var qMinusT = q - t;
          var baseMinusT = base - t;
          push$1(output, fromCharCode(digitToBasic(t + qMinusT % baseMinusT)));
          q = floor$1(qMinusT / baseMinusT);
          k += base;
        }

        push$1(output, fromCharCode(digitToBasic(q)));
        bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
        delta = 0;
        handledCPCount++;
      }
    }

    delta++;
    n++;
  }
  return join$1(output, '');
};

var stringPunycodeToAscii = function (input) {
  var encoded = [];
  var labels = split$1(replace$1(toLowerCase$1(input), regexSeparators, '\u002E'), '.');
  var i, label;
  for (i = 0; i < labels.length; i++) {
    label = labels[i];
    push$1(encoded, exec$1(regexNonASCII, label) ? 'xn--' + encode(label) : label);
  }
  return join$1(encoded, '.');
};

// TODO: in core-js@4, move /modules/ dependencies to public entries for better optimization by tools like `preset-env`

var $ = _export;
var DESCRIPTORS = descriptors;
var USE_NATIVE_URL = urlConstructorDetection;
var global$1 = global$o;
var bind = functionBindContext;
var uncurryThis = functionUncurryThis;
var defineBuiltIn = defineBuiltIn$a;
var defineBuiltInAccessor = defineBuiltInAccessor$1;
var anInstance = anInstance$3;
var hasOwn = hasOwnProperty_1;
var assign = objectAssign;
var arrayFrom = arrayFrom$1;
var arraySlice = arraySliceSimple;
var codeAt = stringMultibyte.codeAt;
var toASCII = stringPunycodeToAscii;
var $toString = toString$8;
var setToStringTag = setToStringTag$5;
var validateArgumentsLength = validateArgumentsLength$3;
var URLSearchParamsModule = web_urlSearchParams_constructor;
var InternalStateModule = internalState;

var setInternalState = InternalStateModule.set;
var getInternalURLState = InternalStateModule.getterFor('URL');
var URLSearchParams$1 = URLSearchParamsModule.URLSearchParams;
var getInternalSearchParamsState = URLSearchParamsModule.getState;

var NativeURL = global$1.URL;
var TypeError$1 = global$1.TypeError;
var parseInt = global$1.parseInt;
var floor = Math.floor;
var pow = Math.pow;
var charAt = uncurryThis(''.charAt);
var exec = uncurryThis(/./.exec);
var join = uncurryThis([].join);
var numberToString = uncurryThis(1.0.toString);
var pop = uncurryThis([].pop);
var push = uncurryThis([].push);
var replace = uncurryThis(''.replace);
var shift = uncurryThis([].shift);
var split = uncurryThis(''.split);
var stringSlice = uncurryThis(''.slice);
var toLowerCase = uncurryThis(''.toLowerCase);
var unshift = uncurryThis([].unshift);

var INVALID_AUTHORITY = 'Invalid authority';
var INVALID_SCHEME = 'Invalid scheme';
var INVALID_HOST = 'Invalid host';
var INVALID_PORT = 'Invalid port';

var ALPHA = /[a-z]/i;
// eslint-disable-next-line regexp/no-obscure-range -- safe
var ALPHANUMERIC = /[\d+-.a-z]/i;
var DIGIT = /\d/;
var HEX_START = /^0x/i;
var OCT = /^[0-7]+$/;
var DEC = /^\d+$/;
var HEX = /^[\da-f]+$/i;
/* eslint-disable regexp/no-control-character -- safe */
var FORBIDDEN_HOST_CODE_POINT = /[\0\t\n\r #%/:<>?@[\\\]^|]/;
var FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT = /[\0\t\n\r #/:<>?@[\\\]^|]/;
var LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE = /^[\u0000-\u0020]+|[\u0000-\u0020]+$/g;
var TAB_AND_NEW_LINE = /[\t\n\r]/g;
/* eslint-enable regexp/no-control-character -- safe */
var EOF;

// https://url.spec.whatwg.org/#ipv4-number-parser
var parseIPv4 = function (input) {
  var parts = split(input, '.');
  var partsLength, numbers, index, part, radix, number, ipv4;
  if (parts.length && parts[parts.length - 1] == '') {
    parts.length--;
  }
  partsLength = parts.length;
  if (partsLength > 4) return input;
  numbers = [];
  for (index = 0; index < partsLength; index++) {
    part = parts[index];
    if (part == '') return input;
    radix = 10;
    if (part.length > 1 && charAt(part, 0) == '0') {
      radix = exec(HEX_START, part) ? 16 : 8;
      part = stringSlice(part, radix == 8 ? 1 : 2);
    }
    if (part === '') {
      number = 0;
    } else {
      if (!exec(radix == 10 ? DEC : radix == 8 ? OCT : HEX, part)) return input;
      number = parseInt(part, radix);
    }
    push(numbers, number);
  }
  for (index = 0; index < partsLength; index++) {
    number = numbers[index];
    if (index == partsLength - 1) {
      if (number >= pow(256, 5 - partsLength)) return null;
    } else if (number > 255) return null;
  }
  ipv4 = pop(numbers);
  for (index = 0; index < numbers.length; index++) {
    ipv4 += numbers[index] * pow(256, 3 - index);
  }
  return ipv4;
};

// https://url.spec.whatwg.org/#concept-ipv6-parser
// eslint-disable-next-line max-statements -- TODO
var parseIPv6 = function (input) {
  var address = [0, 0, 0, 0, 0, 0, 0, 0];
  var pieceIndex = 0;
  var compress = null;
  var pointer = 0;
  var value, length, numbersSeen, ipv4Piece, number, swaps, swap;

  var chr = function () {
    return charAt(input, pointer);
  };

  if (chr() == ':') {
    if (charAt(input, 1) != ':') return;
    pointer += 2;
    pieceIndex++;
    compress = pieceIndex;
  }
  while (chr()) {
    if (pieceIndex == 8) return;
    if (chr() == ':') {
      if (compress !== null) return;
      pointer++;
      pieceIndex++;
      compress = pieceIndex;
      continue;
    }
    value = length = 0;
    while (length < 4 && exec(HEX, chr())) {
      value = value * 16 + parseInt(chr(), 16);
      pointer++;
      length++;
    }
    if (chr() == '.') {
      if (length == 0) return;
      pointer -= length;
      if (pieceIndex > 6) return;
      numbersSeen = 0;
      while (chr()) {
        ipv4Piece = null;
        if (numbersSeen > 0) {
          if (chr() == '.' && numbersSeen < 4) pointer++;
          else return;
        }
        if (!exec(DIGIT, chr())) return;
        while (exec(DIGIT, chr())) {
          number = parseInt(chr(), 10);
          if (ipv4Piece === null) ipv4Piece = number;
          else if (ipv4Piece == 0) return;
          else ipv4Piece = ipv4Piece * 10 + number;
          if (ipv4Piece > 255) return;
          pointer++;
        }
        address[pieceIndex] = address[pieceIndex] * 256 + ipv4Piece;
        numbersSeen++;
        if (numbersSeen == 2 || numbersSeen == 4) pieceIndex++;
      }
      if (numbersSeen != 4) return;
      break;
    } else if (chr() == ':') {
      pointer++;
      if (!chr()) return;
    } else if (chr()) return;
    address[pieceIndex++] = value;
  }
  if (compress !== null) {
    swaps = pieceIndex - compress;
    pieceIndex = 7;
    while (pieceIndex != 0 && swaps > 0) {
      swap = address[pieceIndex];
      address[pieceIndex--] = address[compress + swaps - 1];
      address[compress + --swaps] = swap;
    }
  } else if (pieceIndex != 8) return;
  return address;
};

var findLongestZeroSequence = function (ipv6) {
  var maxIndex = null;
  var maxLength = 1;
  var currStart = null;
  var currLength = 0;
  var index = 0;
  for (; index < 8; index++) {
    if (ipv6[index] !== 0) {
      if (currLength > maxLength) {
        maxIndex = currStart;
        maxLength = currLength;
      }
      currStart = null;
      currLength = 0;
    } else {
      if (currStart === null) currStart = index;
      ++currLength;
    }
  }
  if (currLength > maxLength) {
    maxIndex = currStart;
    maxLength = currLength;
  }
  return maxIndex;
};

// https://url.spec.whatwg.org/#host-serializing
var serializeHost = function (host) {
  var result, index, compress, ignore0;
  // ipv4
  if (typeof host == 'number') {
    result = [];
    for (index = 0; index < 4; index++) {
      unshift(result, host % 256);
      host = floor(host / 256);
    } return join(result, '.');
  // ipv6
  } else if (typeof host == 'object') {
    result = '';
    compress = findLongestZeroSequence(host);
    for (index = 0; index < 8; index++) {
      if (ignore0 && host[index] === 0) continue;
      if (ignore0) ignore0 = false;
      if (compress === index) {
        result += index ? ':' : '::';
        ignore0 = true;
      } else {
        result += numberToString(host[index], 16);
        if (index < 7) result += ':';
      }
    }
    return '[' + result + ']';
  } return host;
};

var C0ControlPercentEncodeSet = {};
var fragmentPercentEncodeSet = assign({}, C0ControlPercentEncodeSet, {
  ' ': 1, '"': 1, '<': 1, '>': 1, '`': 1
});
var pathPercentEncodeSet = assign({}, fragmentPercentEncodeSet, {
  '#': 1, '?': 1, '{': 1, '}': 1
});
var userinfoPercentEncodeSet = assign({}, pathPercentEncodeSet, {
  '/': 1, ':': 1, ';': 1, '=': 1, '@': 1, '[': 1, '\\': 1, ']': 1, '^': 1, '|': 1
});

var percentEncode = function (chr, set) {
  var code = codeAt(chr, 0);
  return code > 0x20 && code < 0x7F && !hasOwn(set, chr) ? chr : encodeURIComponent(chr);
};

// https://url.spec.whatwg.org/#special-scheme
var specialSchemes = {
  ftp: 21,
  file: null,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
};

// https://url.spec.whatwg.org/#windows-drive-letter
var isWindowsDriveLetter = function (string, normalized) {
  var second;
  return string.length == 2 && exec(ALPHA, charAt(string, 0))
    && ((second = charAt(string, 1)) == ':' || (!normalized && second == '|'));
};

// https://url.spec.whatwg.org/#start-with-a-windows-drive-letter
var startsWithWindowsDriveLetter = function (string) {
  var third;
  return string.length > 1 && isWindowsDriveLetter(stringSlice(string, 0, 2)) && (
    string.length == 2 ||
    ((third = charAt(string, 2)) === '/' || third === '\\' || third === '?' || third === '#')
  );
};

// https://url.spec.whatwg.org/#single-dot-path-segment
var isSingleDot = function (segment) {
  return segment === '.' || toLowerCase(segment) === '%2e';
};

// https://url.spec.whatwg.org/#double-dot-path-segment
var isDoubleDot = function (segment) {
  segment = toLowerCase(segment);
  return segment === '..' || segment === '%2e.' || segment === '.%2e' || segment === '%2e%2e';
};

// States:
var SCHEME_START = {};
var SCHEME = {};
var NO_SCHEME = {};
var SPECIAL_RELATIVE_OR_AUTHORITY = {};
var PATH_OR_AUTHORITY = {};
var RELATIVE = {};
var RELATIVE_SLASH = {};
var SPECIAL_AUTHORITY_SLASHES = {};
var SPECIAL_AUTHORITY_IGNORE_SLASHES = {};
var AUTHORITY = {};
var HOST = {};
var HOSTNAME = {};
var PORT = {};
var FILE = {};
var FILE_SLASH = {};
var FILE_HOST = {};
var PATH_START = {};
var PATH = {};
var CANNOT_BE_A_BASE_URL_PATH = {};
var QUERY = {};
var FRAGMENT = {};

var URLState = function (url, isBase, base) {
  var urlString = $toString(url);
  var baseState, failure, searchParams;
  if (isBase) {
    failure = this.parse(urlString);
    if (failure) throw TypeError$1(failure);
    this.searchParams = null;
  } else {
    if (base !== undefined) baseState = new URLState(base, true);
    failure = this.parse(urlString, null, baseState);
    if (failure) throw TypeError$1(failure);
    searchParams = getInternalSearchParamsState(new URLSearchParams$1());
    searchParams.bindURL(this);
    this.searchParams = searchParams;
  }
};

URLState.prototype = {
  type: 'URL',
  // https://url.spec.whatwg.org/#url-parsing
  // eslint-disable-next-line max-statements -- TODO
  parse: function (input, stateOverride, base) {
    var url = this;
    var state = stateOverride || SCHEME_START;
    var pointer = 0;
    var buffer = '';
    var seenAt = false;
    var seenBracket = false;
    var seenPasswordToken = false;
    var codePoints, chr, bufferCodePoints, failure;

    input = $toString(input);

    if (!stateOverride) {
      url.scheme = '';
      url.username = '';
      url.password = '';
      url.host = null;
      url.port = null;
      url.path = [];
      url.query = null;
      url.fragment = null;
      url.cannotBeABaseURL = false;
      input = replace(input, LEADING_AND_TRAILING_C0_CONTROL_OR_SPACE, '');
    }

    input = replace(input, TAB_AND_NEW_LINE, '');

    codePoints = arrayFrom(input);

    while (pointer <= codePoints.length) {
      chr = codePoints[pointer];
      switch (state) {
        case SCHEME_START:
          if (chr && exec(ALPHA, chr)) {
            buffer += toLowerCase(chr);
            state = SCHEME;
          } else if (!stateOverride) {
            state = NO_SCHEME;
            continue;
          } else return INVALID_SCHEME;
          break;

        case SCHEME:
          if (chr && (exec(ALPHANUMERIC, chr) || chr == '+' || chr == '-' || chr == '.')) {
            buffer += toLowerCase(chr);
          } else if (chr == ':') {
            if (stateOverride && (
              (url.isSpecial() != hasOwn(specialSchemes, buffer)) ||
              (buffer == 'file' && (url.includesCredentials() || url.port !== null)) ||
              (url.scheme == 'file' && !url.host)
            )) return;
            url.scheme = buffer;
            if (stateOverride) {
              if (url.isSpecial() && specialSchemes[url.scheme] == url.port) url.port = null;
              return;
            }
            buffer = '';
            if (url.scheme == 'file') {
              state = FILE;
            } else if (url.isSpecial() && base && base.scheme == url.scheme) {
              state = SPECIAL_RELATIVE_OR_AUTHORITY;
            } else if (url.isSpecial()) {
              state = SPECIAL_AUTHORITY_SLASHES;
            } else if (codePoints[pointer + 1] == '/') {
              state = PATH_OR_AUTHORITY;
              pointer++;
            } else {
              url.cannotBeABaseURL = true;
              push(url.path, '');
              state = CANNOT_BE_A_BASE_URL_PATH;
            }
          } else if (!stateOverride) {
            buffer = '';
            state = NO_SCHEME;
            pointer = 0;
            continue;
          } else return INVALID_SCHEME;
          break;

        case NO_SCHEME:
          if (!base || (base.cannotBeABaseURL && chr != '#')) return INVALID_SCHEME;
          if (base.cannotBeABaseURL && chr == '#') {
            url.scheme = base.scheme;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            url.cannotBeABaseURL = true;
            state = FRAGMENT;
            break;
          }
          state = base.scheme == 'file' ? FILE : RELATIVE;
          continue;

        case SPECIAL_RELATIVE_OR_AUTHORITY:
          if (chr == '/' && codePoints[pointer + 1] == '/') {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
            pointer++;
          } else {
            state = RELATIVE;
            continue;
          } break;

        case PATH_OR_AUTHORITY:
          if (chr == '/') {
            state = AUTHORITY;
            break;
          } else {
            state = PATH;
            continue;
          }

        case RELATIVE:
          url.scheme = base.scheme;
          if (chr == EOF) {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
          } else if (chr == '/' || (chr == '\\' && url.isSpecial())) {
            state = RELATIVE_SLASH;
          } else if (chr == '?') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.query = base.query;
            url.fragment = '';
            state = FRAGMENT;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            url.path = arraySlice(base.path);
            url.path.length--;
            state = PATH;
            continue;
          } break;

        case RELATIVE_SLASH:
          if (url.isSpecial() && (chr == '/' || chr == '\\')) {
            state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          } else if (chr == '/') {
            state = AUTHORITY;
          } else {
            url.username = base.username;
            url.password = base.password;
            url.host = base.host;
            url.port = base.port;
            state = PATH;
            continue;
          } break;

        case SPECIAL_AUTHORITY_SLASHES:
          state = SPECIAL_AUTHORITY_IGNORE_SLASHES;
          if (chr != '/' || charAt(buffer, pointer + 1) != '/') continue;
          pointer++;
          break;

        case SPECIAL_AUTHORITY_IGNORE_SLASHES:
          if (chr != '/' && chr != '\\') {
            state = AUTHORITY;
            continue;
          } break;

        case AUTHORITY:
          if (chr == '@') {
            if (seenAt) buffer = '%40' + buffer;
            seenAt = true;
            bufferCodePoints = arrayFrom(buffer);
            for (var i = 0; i < bufferCodePoints.length; i++) {
              var codePoint = bufferCodePoints[i];
              if (codePoint == ':' && !seenPasswordToken) {
                seenPasswordToken = true;
                continue;
              }
              var encodedCodePoints = percentEncode(codePoint, userinfoPercentEncodeSet);
              if (seenPasswordToken) url.password += encodedCodePoints;
              else url.username += encodedCodePoints;
            }
            buffer = '';
          } else if (
            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
            (chr == '\\' && url.isSpecial())
          ) {
            if (seenAt && buffer == '') return INVALID_AUTHORITY;
            pointer -= arrayFrom(buffer).length + 1;
            buffer = '';
            state = HOST;
          } else buffer += chr;
          break;

        case HOST:
        case HOSTNAME:
          if (stateOverride && url.scheme == 'file') {
            state = FILE_HOST;
            continue;
          } else if (chr == ':' && !seenBracket) {
            if (buffer == '') return INVALID_HOST;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PORT;
            if (stateOverride == HOSTNAME) return;
          } else if (
            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
            (chr == '\\' && url.isSpecial())
          ) {
            if (url.isSpecial() && buffer == '') return INVALID_HOST;
            if (stateOverride && buffer == '' && (url.includesCredentials() || url.port !== null)) return;
            failure = url.parseHost(buffer);
            if (failure) return failure;
            buffer = '';
            state = PATH_START;
            if (stateOverride) return;
            continue;
          } else {
            if (chr == '[') seenBracket = true;
            else if (chr == ']') seenBracket = false;
            buffer += chr;
          } break;

        case PORT:
          if (exec(DIGIT, chr)) {
            buffer += chr;
          } else if (
            chr == EOF || chr == '/' || chr == '?' || chr == '#' ||
            (chr == '\\' && url.isSpecial()) ||
            stateOverride
          ) {
            if (buffer != '') {
              var port = parseInt(buffer, 10);
              if (port > 0xFFFF) return INVALID_PORT;
              url.port = (url.isSpecial() && port === specialSchemes[url.scheme]) ? null : port;
              buffer = '';
            }
            if (stateOverride) return;
            state = PATH_START;
            continue;
          } else return INVALID_PORT;
          break;

        case FILE:
          url.scheme = 'file';
          if (chr == '/' || chr == '\\') state = FILE_SLASH;
          else if (base && base.scheme == 'file') {
            if (chr == EOF) {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
            } else if (chr == '?') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.host = base.host;
              url.path = arraySlice(base.path);
              url.query = base.query;
              url.fragment = '';
              state = FRAGMENT;
            } else {
              if (!startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
                url.host = base.host;
                url.path = arraySlice(base.path);
                url.shortenPath();
              }
              state = PATH;
              continue;
            }
          } else {
            state = PATH;
            continue;
          } break;

        case FILE_SLASH:
          if (chr == '/' || chr == '\\') {
            state = FILE_HOST;
            break;
          }
          if (base && base.scheme == 'file' && !startsWithWindowsDriveLetter(join(arraySlice(codePoints, pointer), ''))) {
            if (isWindowsDriveLetter(base.path[0], true)) push(url.path, base.path[0]);
            else url.host = base.host;
          }
          state = PATH;
          continue;

        case FILE_HOST:
          if (chr == EOF || chr == '/' || chr == '\\' || chr == '?' || chr == '#') {
            if (!stateOverride && isWindowsDriveLetter(buffer)) {
              state = PATH;
            } else if (buffer == '') {
              url.host = '';
              if (stateOverride) return;
              state = PATH_START;
            } else {
              failure = url.parseHost(buffer);
              if (failure) return failure;
              if (url.host == 'localhost') url.host = '';
              if (stateOverride) return;
              buffer = '';
              state = PATH_START;
            } continue;
          } else buffer += chr;
          break;

        case PATH_START:
          if (url.isSpecial()) {
            state = PATH;
            if (chr != '/' && chr != '\\') continue;
          } else if (!stateOverride && chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            state = PATH;
            if (chr != '/') continue;
          } break;

        case PATH:
          if (
            chr == EOF || chr == '/' ||
            (chr == '\\' && url.isSpecial()) ||
            (!stateOverride && (chr == '?' || chr == '#'))
          ) {
            if (isDoubleDot(buffer)) {
              url.shortenPath();
              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else if (isSingleDot(buffer)) {
              if (chr != '/' && !(chr == '\\' && url.isSpecial())) {
                push(url.path, '');
              }
            } else {
              if (url.scheme == 'file' && !url.path.length && isWindowsDriveLetter(buffer)) {
                if (url.host) url.host = '';
                buffer = charAt(buffer, 0) + ':'; // normalize windows drive letter
              }
              push(url.path, buffer);
            }
            buffer = '';
            if (url.scheme == 'file' && (chr == EOF || chr == '?' || chr == '#')) {
              while (url.path.length > 1 && url.path[0] === '') {
                shift(url.path);
              }
            }
            if (chr == '?') {
              url.query = '';
              state = QUERY;
            } else if (chr == '#') {
              url.fragment = '';
              state = FRAGMENT;
            }
          } else {
            buffer += percentEncode(chr, pathPercentEncodeSet);
          } break;

        case CANNOT_BE_A_BASE_URL_PATH:
          if (chr == '?') {
            url.query = '';
            state = QUERY;
          } else if (chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            url.path[0] += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case QUERY:
          if (!stateOverride && chr == '#') {
            url.fragment = '';
            state = FRAGMENT;
          } else if (chr != EOF) {
            if (chr == "'" && url.isSpecial()) url.query += '%27';
            else if (chr == '#') url.query += '%23';
            else url.query += percentEncode(chr, C0ControlPercentEncodeSet);
          } break;

        case FRAGMENT:
          if (chr != EOF) url.fragment += percentEncode(chr, fragmentPercentEncodeSet);
          break;
      }

      pointer++;
    }
  },
  // https://url.spec.whatwg.org/#host-parsing
  parseHost: function (input) {
    var result, codePoints, index;
    if (charAt(input, 0) == '[') {
      if (charAt(input, input.length - 1) != ']') return INVALID_HOST;
      result = parseIPv6(stringSlice(input, 1, -1));
      if (!result) return INVALID_HOST;
      this.host = result;
    // opaque host
    } else if (!this.isSpecial()) {
      if (exec(FORBIDDEN_HOST_CODE_POINT_EXCLUDING_PERCENT, input)) return INVALID_HOST;
      result = '';
      codePoints = arrayFrom(input);
      for (index = 0; index < codePoints.length; index++) {
        result += percentEncode(codePoints[index], C0ControlPercentEncodeSet);
      }
      this.host = result;
    } else {
      input = toASCII(input);
      if (exec(FORBIDDEN_HOST_CODE_POINT, input)) return INVALID_HOST;
      result = parseIPv4(input);
      if (result === null) return INVALID_HOST;
      this.host = result;
    }
  },
  // https://url.spec.whatwg.org/#cannot-have-a-username-password-port
  cannotHaveUsernamePasswordPort: function () {
    return !this.host || this.cannotBeABaseURL || this.scheme == 'file';
  },
  // https://url.spec.whatwg.org/#include-credentials
  includesCredentials: function () {
    return this.username != '' || this.password != '';
  },
  // https://url.spec.whatwg.org/#is-special
  isSpecial: function () {
    return hasOwn(specialSchemes, this.scheme);
  },
  // https://url.spec.whatwg.org/#shorten-a-urls-path
  shortenPath: function () {
    var path = this.path;
    var pathSize = path.length;
    if (pathSize && (this.scheme != 'file' || pathSize != 1 || !isWindowsDriveLetter(path[0], true))) {
      path.length--;
    }
  },
  // https://url.spec.whatwg.org/#concept-url-serializer
  serialize: function () {
    var url = this;
    var scheme = url.scheme;
    var username = url.username;
    var password = url.password;
    var host = url.host;
    var port = url.port;
    var path = url.path;
    var query = url.query;
    var fragment = url.fragment;
    var output = scheme + ':';
    if (host !== null) {
      output += '//';
      if (url.includesCredentials()) {
        output += username + (password ? ':' + password : '') + '@';
      }
      output += serializeHost(host);
      if (port !== null) output += ':' + port;
    } else if (scheme == 'file') output += '//';
    output += url.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
    if (query !== null) output += '?' + query;
    if (fragment !== null) output += '#' + fragment;
    return output;
  },
  // https://url.spec.whatwg.org/#dom-url-href
  setHref: function (href) {
    var failure = this.parse(href);
    if (failure) throw TypeError$1(failure);
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-origin
  getOrigin: function () {
    var scheme = this.scheme;
    var port = this.port;
    if (scheme == 'blob') try {
      return new URLConstructor(scheme.path[0]).origin;
    } catch (error) {
      return 'null';
    }
    if (scheme == 'file' || !this.isSpecial()) return 'null';
    return scheme + '://' + serializeHost(this.host) + (port !== null ? ':' + port : '');
  },
  // https://url.spec.whatwg.org/#dom-url-protocol
  getProtocol: function () {
    return this.scheme + ':';
  },
  setProtocol: function (protocol) {
    this.parse($toString(protocol) + ':', SCHEME_START);
  },
  // https://url.spec.whatwg.org/#dom-url-username
  getUsername: function () {
    return this.username;
  },
  setUsername: function (username) {
    var codePoints = arrayFrom($toString(username));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.username = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.username += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-password
  getPassword: function () {
    return this.password;
  },
  setPassword: function (password) {
    var codePoints = arrayFrom($toString(password));
    if (this.cannotHaveUsernamePasswordPort()) return;
    this.password = '';
    for (var i = 0; i < codePoints.length; i++) {
      this.password += percentEncode(codePoints[i], userinfoPercentEncodeSet);
    }
  },
  // https://url.spec.whatwg.org/#dom-url-host
  getHost: function () {
    var host = this.host;
    var port = this.port;
    return host === null ? ''
      : port === null ? serializeHost(host)
      : serializeHost(host) + ':' + port;
  },
  setHost: function (host) {
    if (this.cannotBeABaseURL) return;
    this.parse(host, HOST);
  },
  // https://url.spec.whatwg.org/#dom-url-hostname
  getHostname: function () {
    var host = this.host;
    return host === null ? '' : serializeHost(host);
  },
  setHostname: function (hostname) {
    if (this.cannotBeABaseURL) return;
    this.parse(hostname, HOSTNAME);
  },
  // https://url.spec.whatwg.org/#dom-url-port
  getPort: function () {
    var port = this.port;
    return port === null ? '' : $toString(port);
  },
  setPort: function (port) {
    if (this.cannotHaveUsernamePasswordPort()) return;
    port = $toString(port);
    if (port == '') this.port = null;
    else this.parse(port, PORT);
  },
  // https://url.spec.whatwg.org/#dom-url-pathname
  getPathname: function () {
    var path = this.path;
    return this.cannotBeABaseURL ? path[0] : path.length ? '/' + join(path, '/') : '';
  },
  setPathname: function (pathname) {
    if (this.cannotBeABaseURL) return;
    this.path = [];
    this.parse(pathname, PATH_START);
  },
  // https://url.spec.whatwg.org/#dom-url-search
  getSearch: function () {
    var query = this.query;
    return query ? '?' + query : '';
  },
  setSearch: function (search) {
    search = $toString(search);
    if (search == '') {
      this.query = null;
    } else {
      if ('?' == charAt(search, 0)) search = stringSlice(search, 1);
      this.query = '';
      this.parse(search, QUERY);
    }
    this.searchParams.update();
  },
  // https://url.spec.whatwg.org/#dom-url-searchparams
  getSearchParams: function () {
    return this.searchParams.facade;
  },
  // https://url.spec.whatwg.org/#dom-url-hash
  getHash: function () {
    var fragment = this.fragment;
    return fragment ? '#' + fragment : '';
  },
  setHash: function (hash) {
    hash = $toString(hash);
    if (hash == '') {
      this.fragment = null;
      return;
    }
    if ('#' == charAt(hash, 0)) hash = stringSlice(hash, 1);
    this.fragment = '';
    this.parse(hash, FRAGMENT);
  },
  update: function () {
    this.query = this.searchParams.serialize() || null;
  }
};

// `URL` constructor
// https://url.spec.whatwg.org/#url-class
var URLConstructor = function URL(url /* , base */) {
  var that = anInstance(this, URLPrototype);
  var base = validateArgumentsLength(arguments.length, 1) > 1 ? arguments[1] : undefined;
  var state = setInternalState(that, new URLState(url, false, base));
  if (!DESCRIPTORS) {
    that.href = state.serialize();
    that.origin = state.getOrigin();
    that.protocol = state.getProtocol();
    that.username = state.getUsername();
    that.password = state.getPassword();
    that.host = state.getHost();
    that.hostname = state.getHostname();
    that.port = state.getPort();
    that.pathname = state.getPathname();
    that.search = state.getSearch();
    that.searchParams = state.getSearchParams();
    that.hash = state.getHash();
  }
};

var URLPrototype = URLConstructor.prototype;

var accessorDescriptor = function (getter, setter) {
  return {
    get: function () {
      return getInternalURLState(this)[getter]();
    },
    set: setter && function (value) {
      return getInternalURLState(this)[setter](value);
    },
    configurable: true,
    enumerable: true
  };
};

if (DESCRIPTORS) {
  // `URL.prototype.href` accessors pair
  // https://url.spec.whatwg.org/#dom-url-href
  defineBuiltInAccessor(URLPrototype, 'href', accessorDescriptor('serialize', 'setHref'));
  // `URL.prototype.origin` getter
  // https://url.spec.whatwg.org/#dom-url-origin
  defineBuiltInAccessor(URLPrototype, 'origin', accessorDescriptor('getOrigin'));
  // `URL.prototype.protocol` accessors pair
  // https://url.spec.whatwg.org/#dom-url-protocol
  defineBuiltInAccessor(URLPrototype, 'protocol', accessorDescriptor('getProtocol', 'setProtocol'));
  // `URL.prototype.username` accessors pair
  // https://url.spec.whatwg.org/#dom-url-username
  defineBuiltInAccessor(URLPrototype, 'username', accessorDescriptor('getUsername', 'setUsername'));
  // `URL.prototype.password` accessors pair
  // https://url.spec.whatwg.org/#dom-url-password
  defineBuiltInAccessor(URLPrototype, 'password', accessorDescriptor('getPassword', 'setPassword'));
  // `URL.prototype.host` accessors pair
  // https://url.spec.whatwg.org/#dom-url-host
  defineBuiltInAccessor(URLPrototype, 'host', accessorDescriptor('getHost', 'setHost'));
  // `URL.prototype.hostname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hostname
  defineBuiltInAccessor(URLPrototype, 'hostname', accessorDescriptor('getHostname', 'setHostname'));
  // `URL.prototype.port` accessors pair
  // https://url.spec.whatwg.org/#dom-url-port
  defineBuiltInAccessor(URLPrototype, 'port', accessorDescriptor('getPort', 'setPort'));
  // `URL.prototype.pathname` accessors pair
  // https://url.spec.whatwg.org/#dom-url-pathname
  defineBuiltInAccessor(URLPrototype, 'pathname', accessorDescriptor('getPathname', 'setPathname'));
  // `URL.prototype.search` accessors pair
  // https://url.spec.whatwg.org/#dom-url-search
  defineBuiltInAccessor(URLPrototype, 'search', accessorDescriptor('getSearch', 'setSearch'));
  // `URL.prototype.searchParams` getter
  // https://url.spec.whatwg.org/#dom-url-searchparams
  defineBuiltInAccessor(URLPrototype, 'searchParams', accessorDescriptor('getSearchParams'));
  // `URL.prototype.hash` accessors pair
  // https://url.spec.whatwg.org/#dom-url-hash
  defineBuiltInAccessor(URLPrototype, 'hash', accessorDescriptor('getHash', 'setHash'));
}

// `URL.prototype.toJSON` method
// https://url.spec.whatwg.org/#dom-url-tojson
defineBuiltIn(URLPrototype, 'toJSON', function toJSON() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

// `URL.prototype.toString` method
// https://url.spec.whatwg.org/#URL-stringification-behavior
defineBuiltIn(URLPrototype, 'toString', function toString() {
  return getInternalURLState(this).serialize();
}, { enumerable: true });

if (NativeURL) {
  var nativeCreateObjectURL = NativeURL.createObjectURL;
  var nativeRevokeObjectURL = NativeURL.revokeObjectURL;
  // `URL.createObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
  if (nativeCreateObjectURL) defineBuiltIn(URLConstructor, 'createObjectURL', bind(nativeCreateObjectURL, NativeURL));
  // `URL.revokeObjectURL` method
  // https://developer.mozilla.org/en-US/docs/Web/API/URL/revokeObjectURL
  if (nativeRevokeObjectURL) defineBuiltIn(URLConstructor, 'revokeObjectURL', bind(nativeRevokeObjectURL, NativeURL));
}

setToStringTag(URLConstructor, 'URL');

$({ global: true, constructor: true, forced: !USE_NATIVE_URL, sham: !DESCRIPTORS }, {
  URL: URLConstructor
});

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
    var _a, _b;
    const target = {
      type: "PopEntity",
      params: {
        entity: source.activityRecord.type,
        entityId: source.activityRecord.id,
        entityLabel: source.activityRecord.label,
        url: source.activityRecord.url,
        data: ((_a = source.activityRecord) === null || _a === void 0 ? void 0 : _a.data) || '',
        crmType: ((_b = source.activityRecord) === null || _b === void 0 ? void 0 : _b.crm) || ''
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
      direction: source.direction,
      screenPopUrl: source.screenPopUrl,
      isInbound: source.isInbound
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
    var _a, _b;
    const target = {
      interactionId: source.interactionId,
      contactId: source.contactID,
      skillId: source.skillId,
      skillName: source.skill,
      status: source.status,
      customerName: source.customerName,
      eventType: (_a = source.eventDetails) === null || _a === void 0 ? void 0 : _a.eventType,
      type: source.type,
      isCaseAssigned: source.isCaseAssigned,
      direction: (_b = source.case) === null || _b === void 0 ? void 0 : _b.direction
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
  /**
  * Transforms object to CXoneVoiceMailContactData that can be used by any integration apps.
  * @param source - Source object from CCF SDK that has VoiceMail Contact Details
  * @returns Object for Integration Apps
  * @example - NA -
  */
  static toVoiceMailContactData(source) {
    const target = {
      interactionId: source.interactionId,
      contactId: source.contactID,
      skillId: source.skill,
      skillName: source.skillName,
      status: source.status,
      type: source.type,
      finalState: source.finalState,
      screenPopUrl: source.voiceMailEventData.screenPopUrl,
      from: source.voiceMailEventData.from,
      to: source.voiceMailEventData.to
    };
    return target;
  }
  /**
   * Transforms object to CXoneWorkItemContactData that can be used by any integration apps.
   * @param source - Source object from CCF SDK that has WorkItem Contact Details
   * @returns Object for Integration Apps
   * @example - NA -
   */
  static toWorkItemContactData(source) {
    const target = {
      interactionId: source.interactionId,
      contactId: source.contactID,
      skillId: source.skill,
      skillName: source.skillName,
      status: source.status,
      type: source.type,
      finalState: source.finalState,
      screenPopUrl: source.workItemEventData.screenPopUrl
    };
    return target;
  }
}

/**
 * Maps the canonical CRM key (see {@link normalizeCrmType}) to the `?app=` identifier
 * of the CRM integration that owns that record.
 *
 * Covers all 6 embedded CRM apps. Non-embedded apps (cxa, cxai, cxai_rc, cxa_msteams)
 * are intentionally excluded — screenpop routing is only relevant for embedded CRMs.
 *
 * If a `crmType` is NOT found here, the record is forwarded to the current handler
 * as a safe default (unknown / future CRM types).
 */
const CRM_TYPE_TO_APP_ID = {
  salesforce: 'cxa_sfdc',
  servicenow: 'cxa_snow',
  msd: 'cxa_msd',
  zendesk: 'cxa_zd',
  oracle: 'cxa_osc',
  kustomer: 'cxa_kustomer'
};
/**
 * Normalizes a raw `system.type` value (lowercased) sent by the backend to the canonical
 * CRM key used by {@link CRM_TYPE_TO_APP_ID}.
 *
 * `system.type` is NOT a single fixed string across tenants/configs — it can arrive as a
 * full display name or an alternate type code (e.g. `'Microsoft Dynamics 365'`, `'dynamics'`,
 * `'cxa_msd'`, `'Service Now'`) rather than the tidy `'msd'` / `'servicenow'` literal. Mirrors
 * the same variant matching `getCrmIconUrl` (ccf-crm-icons.tsx) already needs for the same
 * field, so screenpop routing recognizes the record's CRM instead of falling through to
 * "unknown CRM type" and forwarding it to whichever CRM happens to be currently embedded
 * (CXIFW-5773).
 * @param crmType - Lowercased `system.type` value.
 * @returns The canonical CRM key, or `undefined` if no known CRM matches.
 * @example normalizeCrmType('microsoft dynamics 365') // 'msd'
 */
function normalizeCrmType(crmType) {
  if (crmType.includes('salesforce')) return 'salesforce';
  if (crmType.includes('zendesk')) return 'zendesk';
  if (crmType.includes('service') && crmType.includes('now')) return 'servicenow';
  if (crmType.includes('microsoft') && crmType.includes('dynamics') || crmType === 'msd' || crmType === 'dynamics' || crmType === 'cxa_msd') return 'msd';
  if (crmType.includes('oracle') || crmType === 'cxa_osc') return 'oracle';
  if (crmType.includes('kustomer')) return 'kustomer';
  return undefined;
}
/**
 * CXone Agent Interfaces
 */
class CXoneAgentIntegrationManager {
  /**
   * Constructor to initialize instance.
   * @param embeddedAgentIntegration - CRM-specific integration instance.
   * @example
   * ```
   * new CXoneAgentIntegrationManager(integration)
   * ```
   */
  constructor(embeddedAgentIntegration) {
    this.eventHandlerAdded = false;
    /** Stores [eventName, boundHandler] pairs so they can be removed by destroy(). */
    this.boundListeners = [];
    this.agentIntegration = embeddedAgentIntegration;
  }
  /**
   * Handler of Screenpop CustomEvent raised from CXone Agent (on Click of Customer Card Activity).
   *
   * Two-step routing logic:
   *   `crmType` is populated by the backend on adaptive-card / pinned-record clicks (system.type).
   *
   *   Step 1 — CRM type check:
   *     The manager reads `?app=` from the current page URL and compares it against
   *     the expected app identifier from `CRM_TYPE_TO_APP_ID`:
   *     - Match   → proceed to Step 2.
   *     - Mismatch → foreign CRM type → open the URL in a new browser tab and return.
   *
   *   Step 2 — CRM instance check (only reached when Step 1 matches):
   *     Extracts the first hostname label from both `?base=` (current tab's CRM instance)
   *     and the screenpop URL (target record's CRM instance) and compares them.
   *     First label is used (not full hostname) to handle CRMs that serve the same tenant
   *     from multiple domains (e.g. Salesforce: myorg.my.salesforce.com and
   *     myorg.lightning.force.com share the first label "myorg").
   *     - Same label  → same CRM instance → forward to the integration handler.
   *     - Diff label  → different instance → open the URL in a new browser tab and return.
   *     - `?base=` absent or URL malformed → skip instance check, handle locally.
   *
   *   Fallbacks:
   *     - `crmType` absent (ACD-triggered pop) → forward unconditionally.
   *     - `crmType` not in map (unknown / future CRM) → forward as safe default.
   * @example
   */
  handleCXoneScreenPopEvent(event) {
    var _a, _b, _c, _d;
    const eventData = event.detail;
    const screenpopData = CcfIntegrationTransformer.toScreenPopEntityData(eventData);
    const crmType = (_b = (_a = screenpopData.params) === null || _a === void 0 ? void 0 : _a.crmType) === null || _b === void 0 ? void 0 : _b.toLowerCase();
    if (crmType) {
      const normalizedCrmType = normalizeCrmType(crmType);
      const expectedAppId = normalizedCrmType ? CRM_TYPE_TO_APP_ID[normalizedCrmType] : undefined;
      if (expectedAppId) {
        const urlParams = new URLSearchParams(window.location.search);
        const currentApp = urlParams.get('app');
        if (expectedAppId !== currentApp) {
          // Step 1: Foreign CRM type — open the record URL in a new browser tab.
          if ((_c = screenpopData.params) === null || _c === void 0 ? void 0 : _c.url) {
            const newTab = window.open(screenpopData.params.url, '_blank', 'noopener,noreferrer');
            // Prevent reverse-tabnabbing: the opened page must not be able to
            // redirect this app via window.opener.
            if (newTab) newTab.opener = null;
          }
          return;
        }
        // Step 2: Same CRM type — check if it is the same CRM instance.
        // An agent may have two tabs open for the same CRM type but different customer
        // instances (e.g. customer-A.service-now.com vs customer-B.service-now.com).
        // In that case the screenpop belongs to the other instance and must be opened
        // in a new tab, not handled locally.
        //
        // Comparison uses only the first hostname label (tenant subdomain) rather than
        // the full hostname to handle CRMs that use multiple domains for the same tenant.
        // Salesforce example: ?base=myorg.my.salesforce.com vs screenpop URL on
        // myorg.lightning.force.com — both share the same first label "myorg" and must
        // be treated as the same instance.
        //
        // For Salesforce specifically, prefer `sfdcIframeOrigin` over `base`: Salesforce
        // injects this param itself on every load, reflecting the actual embedding org,
        // so it can't go stale/misconfigured the way an admin-typed `base` (CTI Adapter
        // URL) can. Scoped to `normalizedCrmType === 'salesforce'` so this has no effect
        // on other CRMs (ServiceNow, MSD, Zendesk, Oracle, Kustomer), which keep reading
        // `base` exactly as before.
        const sfdcIframeOrigin = normalizedCrmType === 'salesforce' ? urlParams.get('sfdcIframeOrigin') : null;
        const currentBase = sfdcIframeOrigin || urlParams.get('base');
        const targetUrl = (_d = screenpopData.params) === null || _d === void 0 ? void 0 : _d.url;
        if (currentBase && targetUrl) {
          try {
            const currentTenant = new URL(currentBase).hostname.split('.')[0];
            const targetTenant = new URL(targetUrl).hostname.split('.')[0];
            if (currentTenant !== targetTenant) {
              // Same CRM type, different instance — open in a new tab.
              const newTab = window.open(targetUrl, '_blank', 'noopener,noreferrer');
              // Prevent reverse-tabnabbing.
              if (newTab) newTab.opener = null;
              return;
            }
          } catch (error) {
            // Malformed URL — fall through and handle locally as safe default.
            console.error('[CxoneAgentIntegrationManager] Malformed URL in screenpop tenant comparison — handling locally.', {
              currentBase,
              targetUrl,
              error
            });
          }
        }
      }
      // Unknown crmType (not in map) → forward as safe default.
    }
    // crmType absent (ACD-triggered pop) → forward unconditionally.
    this.agentIntegration.handleCXoneScreenpop(screenpopData);
  }
  /**
   * Handler of contact selecrion CustomEvent raised from CXone Agent (on contact selection changes)
   * @example
   */
  handleCXoneContactSelectionEvent(event) {
    const contactId = event.detail.contactId;
    this.agentIntegration.handleCXoneContactSelectionChanged(contactId);
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
   * Callback method invoked from Integration Module to perform action in CMA based on sesion switch in MSD
   */
  handleIntegrationSessionSwitched(params) {
    const eventArgs = {};
    eventArgs.detail = params;
    const customEvent = new CustomEvent(CXoneAgentEvents.CXONE_SESSION_SWITCHED_EVENT, eventArgs);
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
    // eslint-disable-next-line @nice-cxone/ccf/required-tsdoc
    const register = (event, handler, options) => {
      const bound = handler.bind(this);
      this.boundListeners.push([event, bound]);
      window.addEventListener(event, bound, options);
    };
    register(CXoneAgentEvents.CXONE_SCREEN_POP_EVENT, this.handleCXoneScreenPopEvent);
    register(CXoneAgentEvents.CXONE_VOICE_CONTACT_EVENT, this.handleCXoneVoiceContactEvent);
    register(CXoneAgentEvents.CXONE_DIGITAL_CONTACT_EVENT, this.handleCXoneDigitalContactEvent);
    register(CXoneAgentEvents.CXONE_AGENT_STATE_CHANGE, this.handleCXoneAgentStateChangeEvent);
    register(CXoneAgentEvents.CXONE_AGENT_APP_INITIALIZED, this.handleCXoneAgentAppInitializedEvent, {
      once: true
    });
    register(CXoneAgentEvents.CXONE_AGENT_AUTH_REQUEST, this.handleCXoneAgentAuthRequest);
    register(CXoneAgentEvents.CXONE_AGENT_LOG_OFF, this.handleCXoneAgentLogOff);
    register(CXoneAgentEvents.CXONE_PRESENCE_SYNC_EVENT, this.handleCXonePresenceSyncEvent);
    register(CXoneAgentEvents.CXONE_AGENT_HOME_INITIALIZED, this.handleCXoneAgentHomeInitialized);
    register(CXoneAgentEvents.CXONE_VOICE_MAIL_CONTACT_EVENT, this.handleCXoneVoiceMailContactEvent);
    register(CXoneAgentEvents.CXONE_WORKITEM_CONTACT_EVENT, this.handleCXoneWorkItemContactEvent);
    register(CXoneAgentEvents.CXONE_CONTACT_SELECTION_EVENT, this.handleCXoneContactSelectionEvent);
  }
  /**
   * Method to initialize listeners for all the events initiated by CXoneAgent Home apps.
   */
  handleCXoneAgentHomeInitialized(event) {
    this.agentIntegration.getPartnerAccountDetails(this.handleIntegrationPresenceSyncRule);
    // send the current translations to integration app
    const eventData = event.detail;
    this.agentIntegration.handleCurrentTranslations(eventData);
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
    this.agentIntegration.onSessionSwitched(this.handleIntegrationSessionSwitched);
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
   * Removes all window event listeners registered by this manager instance.
   * Call this in tests (afterEach) or when the embedding page unmounts to prevent
   * listener accumulation across multiple manager instances sharing the same window.
   * @example manager.destroy()
   */
  destroy() {
    this.boundListeners.forEach(([event, bound]) => {
      window.removeEventListener(event, bound);
    });
    this.boundListeners.length = 0;
    this.eventHandlerAdded = false;
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
  /**
   * Handler of VoiceMail Contact CustomEvent raised from CXone Agent
   * @example
   */
  handleCXoneVoiceMailContactEvent(event) {
    const eventData = event.detail;
    const voiceMailContactData = CcfIntegrationTransformer.toVoiceMailContactData(eventData);
    this.agentIntegration.handleCXoneVoiceMailContactEvent(voiceMailContactData);
  }
  /**
   * Handler of WorkItem Contact CustomEvent raised from CXone Agent
   * @example
   */
  handleCXoneWorkItemContactEvent(event) {
    const eventData = event.detail;
    const workItemContactData = CcfIntegrationTransformer.toWorkItemContactData(eventData);
    this.agentIntegration.handleCXoneWorkItemContactEvent(workItemContactData);
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

export { AgentStates, CXoneAgentEvents, CXoneAgentIntegrationManager, CXoneCallContactStatus, CXoneDigitalContactStatus, CXoneDigitalEventType, CcfAppParamHelper, CcfAppType, CcfGenericConstants, CcfMessageType, CcfRegexPatterns, CcfValidationHelper, CxaExtensionAdapter, Embeddedappsfeaturetoggleservice, GlobalContextProvider, IntegrationComponentLoader, WatchRTCService, cxs, getAgentRemoteEntryUrl, getRemoteEntryUrl, getTPIRemoteEntryUrl, isScreenPopBeforeAcceptFlagged, limitToFirstCrmResult, loadIntegrationModule, loadRemoteModule, triggerCRMScreenPop, useGlobalContext, useScript };
