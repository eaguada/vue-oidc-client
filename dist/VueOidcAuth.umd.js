(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["VueOidcAuth"] = factory(require("vue"));
	else
		root["VueOidcAuth"] = factory(root["Vue"]);
})((typeof self !== 'undefined' ? self : this), function(__WEBPACK_EXTERNAL_MODULE__8bbf__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fae3");
/******/ })
/************************************************************************/
/******/ ({

/***/ "1991":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var invoke = __webpack_require__("31f4");
var html = __webpack_require__("fab2");
var cel = __webpack_require__("230e");
var global = __webpack_require__("7726");
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__("2d95")(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),

/***/ "1fa8":
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__("cb7c");
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),

/***/ "214f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var fails = __webpack_require__("79e5");
var defined = __webpack_require__("be13");
var wks = __webpack_require__("2b4c");

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);
  var fns = exec(defined, SYMBOL, ''[KEY]);
  var strfn = fns[0];
  var rxfn = fns[1];
  if (fails(function () {
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  })) {
    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return rxfn.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return rxfn.call(string, this); }
    );
  }
};


/***/ }),

/***/ "230e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
var document = __webpack_require__("7726").document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),

/***/ "23c6":
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__("2d95");
var TAG = __webpack_require__("2b4c")('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),

/***/ "27ee":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("23c6");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var Iterators = __webpack_require__("84f2");
module.exports = __webpack_require__("8378").getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "2aba":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var hide = __webpack_require__("32e9");
var has = __webpack_require__("69a8");
var SRC = __webpack_require__("ca5a")('src');
var TO_STRING = 'toString';
var $toString = Function[TO_STRING];
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__("8378").inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});


/***/ }),

/***/ "2b4c":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("5537")('wks');
var uid = __webpack_require__("ca5a");
var Symbol = __webpack_require__("7726").Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "2d95":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "31f4":
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),

/***/ "32e9":
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__("86cc");
var createDesc = __webpack_require__("4630");
module.exports = __webpack_require__("9e1e") ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "33a4":
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__("84f2");
var ITERATOR = __webpack_require__("2b4c")('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),

/***/ "4588":
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),

/***/ "4630":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "4a59":
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__("9b43");
var call = __webpack_require__("1fa8");
var isArrayIter = __webpack_require__("33a4");
var anObject = __webpack_require__("cb7c");
var toLength = __webpack_require__("9def");
var getIterFn = __webpack_require__("27ee");
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),

/***/ "551c":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__("2d00");
var global = __webpack_require__("7726");
var ctx = __webpack_require__("9b43");
var classof = __webpack_require__("23c6");
var $export = __webpack_require__("5ca1");
var isObject = __webpack_require__("d3f4");
var aFunction = __webpack_require__("d8e8");
var anInstance = __webpack_require__("f605");
var forOf = __webpack_require__("4a59");
var speciesConstructor = __webpack_require__("ebd6");
var task = __webpack_require__("1991").set;
var microtask = __webpack_require__("8079")();
var newPromiseCapabilityModule = __webpack_require__("a5b8");
var perform = __webpack_require__("9c80");
var userAgent = __webpack_require__("a25f");
var promiseResolve = __webpack_require__("bcaa");
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__("2b4c")('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__("dcbc")($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__("7f20")($Promise, PROMISE);
__webpack_require__("7a56")(PROMISE);
Wrapper = __webpack_require__("8378")[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__("5cc5")(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),

/***/ "5537":
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__("8378");
var global = __webpack_require__("7726");
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__("2d00") ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5ca1":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var core = __webpack_require__("8378");
var hide = __webpack_require__("32e9");
var redefine = __webpack_require__("2aba");
var ctx = __webpack_require__("9b43");
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),

/***/ "5cc5":
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__("2b4c")('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),

/***/ "69a8":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "6a99":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__("d3f4");
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "7726":
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ "79e5":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),

/***/ "7a56":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__("7726");
var dP = __webpack_require__("86cc");
var DESCRIPTORS = __webpack_require__("9e1e");
var SPECIES = __webpack_require__("2b4c")('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),

/***/ "7f20":
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__("86cc").f;
var has = __webpack_require__("69a8");
var TAG = __webpack_require__("2b4c")('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),

/***/ "8079":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var macrotask = __webpack_require__("1991").set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__("2d95")(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),

/***/ "8378":
/***/ (function(module, exports) {

var core = module.exports = { version: '2.5.7' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ "84f2":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "86cc":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var IE8_DOM_DEFINE = __webpack_require__("c69a");
var toPrimitive = __webpack_require__("6a99");
var dP = Object.defineProperty;

exports.f = __webpack_require__("9e1e") ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "8bbf":
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE__8bbf__;

/***/ }),

/***/ "9b43":
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__("d8e8");
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "9c80":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),

/***/ "9def":
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__("4588");
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),

/***/ "9e1e":
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__("79e5")(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "a25f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("7726");
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),

/***/ "a481":
/***/ (function(module, exports, __webpack_require__) {

// @@replace logic
__webpack_require__("214f")('replace', 2, function (defined, REPLACE, $replace) {
  // 21.1.3.14 String.prototype.replace(searchValue, replaceValue)
  return [function replace(searchValue, replaceValue) {
    'use strict';
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined
      ? fn.call(searchValue, O, replaceValue)
      : $replace.call(String(O), searchValue, replaceValue);
  }, $replace];
});


/***/ }),

/***/ "a5b8":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__("d8e8");

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),

/***/ "bcaa":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("cb7c");
var isObject = __webpack_require__("d3f4");
var newPromiseCapability = __webpack_require__("a5b8");

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),

/***/ "be13":
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),

/***/ "c69a":
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__("9e1e") && !__webpack_require__("79e5")(function () {
  return Object.defineProperty(__webpack_require__("230e")('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "ca5a":
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),

/***/ "cb7c":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("d3f4");
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),

/***/ "d3f4":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "d8e8":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),

/***/ "dcbc":
/***/ (function(module, exports, __webpack_require__) {

var redefine = __webpack_require__("2aba");
module.exports = function (target, src, safe) {
  for (var key in src) redefine(target, key, src[key], safe);
  return target;
};


/***/ }),

/***/ "dd17":
/***/ (function(module, exports, __webpack_require__) {

!function webpackUniversalModuleDefinition(e,t){if(true)module.exports=t();else { var n, r; }}(window,function(){return function(e){var t={};function __webpack_require__(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return e[r].call(n.exports,n,n.exports,__webpack_require__),n.l=!0,n.exports}return __webpack_require__.m=e,__webpack_require__.c=t,__webpack_require__.d=function(e,t,r){__webpack_require__.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},__webpack_require__.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},__webpack_require__.t=function(e,t){if(1&t&&(e=__webpack_require__(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(__webpack_require__.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)__webpack_require__.d(r,n,function(t){return e[t]}.bind(null,n));return r},__webpack_require__.n=function(e){var t=e&&e.__esModule?function getDefault(){return e.default}:function getModuleExports(){return e};return __webpack_require__.d(t,"a",t),t},__webpack_require__.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},__webpack_require__.p="",__webpack_require__(__webpack_require__.s=45)}([function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}();var i={debug:function debug(){},info:function info(){},warn:function warn(){},error:function error(){}},o=void 0,s=void 0;(t.Log=function(){function Log(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Log)}return Log.reset=function reset(){s=3,o=i},Log.debug=function debug(){if(s>=4){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];o.debug.apply(o,Array.from(t))}},Log.info=function info(){if(s>=3){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];o.info.apply(o,Array.from(t))}},Log.warn=function warn(){if(s>=2){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];o.warn.apply(o,Array.from(t))}},Log.error=function error(){if(s>=1){for(var e=arguments.length,t=Array(e),r=0;r<e;r++)t[r]=arguments[r];o.error.apply(o,Array.from(t))}},n(Log,null,[{key:"NONE",get:function get(){return 0}},{key:"ERROR",get:function get(){return 1}},{key:"WARN",get:function get(){return 2}},{key:"INFO",get:function get(){return 3}},{key:"DEBUG",get:function get(){return 4}},{key:"level",get:function get(){return s},set:function set(e){if(!(0<=e&&e<=4))throw new Error("Invalid log level");s=e}},{key:"logger",get:function get(){return o},set:function set(e){if(!e.debug&&e.info&&(e.debug=e.info),!(e.debug&&e.info&&e.warn&&e.error))throw new Error("Invalid logger");o=e}}]),Log}()).reset()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}();var i={setInterval:function(e){function setInterval(t,r){return e.apply(this,arguments)}return setInterval.toString=function(){return e.toString()},setInterval}(function(e,t){return setInterval(e,t)}),clearInterval:function(e){function clearInterval(t){return e.apply(this,arguments)}return clearInterval.toString=function(){return e.toString()},clearInterval}(function(e){return clearInterval(e)})},o=!1,s=null;t.Global=function(){function Global(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Global)}return Global._testing=function _testing(){o=!0},Global.setXMLHttpRequest=function setXMLHttpRequest(e){s=e},n(Global,null,[{key:"location",get:function get(){if(!o)return location}},{key:"localStorage",get:function get(){if(!o&&"undefined"!=typeof window)return localStorage}},{key:"sessionStorage",get:function get(){if(!o&&"undefined"!=typeof window)return sessionStorage}},{key:"XMLHttpRequest",get:function get(){if(!o&&"undefined"!=typeof window)return s||XMLHttpRequest}},{key:"timer",get:function get(){if(!o)return i}}]),Global}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UrlUtility=void 0;var n=r(0),i=r(1);t.UrlUtility=function(){function UrlUtility(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UrlUtility)}return UrlUtility.addQueryParam=function addQueryParam(e,t,r){return e.indexOf("?")<0&&(e+="?"),"?"!==e[e.length-1]&&(e+="&"),e+=encodeURIComponent(t),e+="=",e+=encodeURIComponent(r)},UrlUtility.parseUrlFragment=function parseUrlFragment(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"#",r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.Global;"string"!=typeof e&&(e=r.location.href);var o=e.lastIndexOf(t);o>=0&&(e=e.substr(o+1));for(var s,a={},u=/([^&=]+)=([^&]*)/g,c=0;s=u.exec(e);)if(a[decodeURIComponent(s[1])]=decodeURIComponent(s[2]),c++>50)return n.Log.error("UrlUtility.parseUrlFragment: response exceeded expected number of parameters",e),{error:"Response exceeded expected number of parameters"};for(var h in a)return a;return{}},UrlUtility}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.MetadataService=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(17);t.MetadataService=function(){function MetadataService(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.JsonService;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,MetadataService),!e)throw i.Log.error("MetadataService: No settings passed to MetadataService"),new Error("settings");this._settings=e,this._jsonService=new t(["application/jwk-set+json"])}return MetadataService.prototype.getMetadata=function getMetadata(){var e=this;return this._settings.metadata?(i.Log.debug("MetadataService.getMetadata: Returning metadata from settings"),Promise.resolve(this._settings.metadata)):this.metadataUrl?(i.Log.debug("MetadataService.getMetadata: getting metadata from",this.metadataUrl),this._jsonService.getJson(this.metadataUrl).then(function(t){return i.Log.debug("MetadataService.getMetadata: json received"),e._settings.metadata=t,t})):(i.Log.error("MetadataService.getMetadata: No authority or metadataUrl configured on settings"),Promise.reject(new Error("No authority or metadataUrl configured on settings")))},MetadataService.prototype.getIssuer=function getIssuer(){return this._getMetadataProperty("issuer")},MetadataService.prototype.getAuthorizationEndpoint=function getAuthorizationEndpoint(){return this._getMetadataProperty("authorization_endpoint")},MetadataService.prototype.getUserInfoEndpoint=function getUserInfoEndpoint(){return this._getMetadataProperty("userinfo_endpoint")},MetadataService.prototype.getTokenEndpoint=function getTokenEndpoint(){return this._getMetadataProperty("token_endpoint",!0)},MetadataService.prototype.getCheckSessionIframe=function getCheckSessionIframe(){return this._getMetadataProperty("check_session_iframe",!0)},MetadataService.prototype.getEndSessionEndpoint=function getEndSessionEndpoint(){return this._getMetadataProperty("end_session_endpoint",!0)},MetadataService.prototype.getRevocationEndpoint=function getRevocationEndpoint(){return this._getMetadataProperty("revocation_endpoint",!0)},MetadataService.prototype._getMetadataProperty=function _getMetadataProperty(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return i.Log.debug("MetadataService.getMetadataProperty for: "+e),this.getMetadata().then(function(r){if(i.Log.debug("MetadataService.getMetadataProperty: metadata recieved"),void 0===r[e]){if(!0===t)return void i.Log.warn("MetadataService.getMetadataProperty: Metadata does not contain optional property "+e);throw i.Log.error("MetadataService.getMetadataProperty: Metadata does not contain property "+e),new Error("Metadata does not contain property "+e)}return r[e]})},MetadataService.prototype.getSigningKeys=function getSigningKeys(){var e=this;return this._settings.signingKeys?(i.Log.debug("MetadataService.getSigningKeys: Returning signingKeys from settings"),Promise.resolve(this._settings.signingKeys)):this._getMetadataProperty("jwks_uri").then(function(t){return i.Log.debug("MetadataService.getSigningKeys: jwks_uri received",t),e._jsonService.getJson(t).then(function(t){if(i.Log.debug("MetadataService.getSigningKeys: key set received",t),!t.keys)throw i.Log.error("MetadataService.getSigningKeys: Missing keys on keyset"),new Error("Missing keys on keyset");return e._settings.signingKeys=t.keys,e._settings.signingKeys})})},n(MetadataService,[{key:"metadataUrl",get:function get(){return this._metadataUrl||(this._settings.metadataUrl?this._metadataUrl=this._settings.metadataUrl:(this._metadataUrl=this._settings.authority,this._metadataUrl&&this._metadataUrl.indexOf(".well-known/openid-configuration")<0&&("/"!==this._metadataUrl[this._metadataUrl.length-1]&&(this._metadataUrl+="/"),this._metadataUrl+=".well-known/openid-configuration"))),this._metadataUrl}}]),MetadataService}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.State=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(r(14));t.State=function(){function State(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.id,r=e.data,n=e.created;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,State),this._id=t||(0,o.default)(),this._data=r,this._created="number"==typeof n&&n>0?n:parseInt(Date.now()/1e3)}return State.prototype.toStorageString=function toStorageString(){return i.Log.debug("State.toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created})},State.fromStorageString=function fromStorageString(e){return i.Log.debug("State.fromStorageString"),new State(JSON.parse(e))},State.clearStaleState=function clearStaleState(e,t){var r=Date.now()/1e3-t;return e.getAllKeys().then(function(t){i.Log.debug("State.clearStaleState: got keys",t);for(var n=[],o=function _loop(o){var s=t[o];a=e.get(s).then(function(t){var n=!1;if(t)try{var o=State.fromStorageString(t);i.Log.debug("State.clearStaleState: got item from key: ",s,o.created),o.created<=r&&(n=!0)}catch(e){i.Log.error("State.clearStaleState: Error parsing state for key",s,e.message),n=!0}else i.Log.debug("State.clearStaleState: no item in storage for key: ",s),n=!0;if(n)return i.Log.debug("State.clearStaleState: removed item for key: ",s),e.remove(s)}),n.push(a)},s=0;s<t.length;s++){var a;o(s)}return i.Log.debug("State.clearStaleState: waiting on promise count:",n.length),Promise.all(n)})},n(State,[{key:"id",get:function get(){return this._id}},{key:"data",get:function get(){return this._data}},{key:"created",get:function get(){return this._created}}]),State}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.WebStorageStateStore=void 0;var n=r(0),i=r(1);t.WebStorageStateStore=function(){function WebStorageStateStore(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.prefix,r=void 0===t?"oidc.":t,n=e.store,o=void 0===n?i.Global.localStorage:n;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,WebStorageStateStore),this._store=o,this._prefix=r}return WebStorageStateStore.prototype.set=function set(e,t){return n.Log.debug("WebStorageStateStore.set",e),e=this._prefix+e,this._store.setItem(e,t),Promise.resolve()},WebStorageStateStore.prototype.get=function get(e){n.Log.debug("WebStorageStateStore.get",e),e=this._prefix+e;var t=this._store.getItem(e);return Promise.resolve(t)},WebStorageStateStore.prototype.remove=function remove(e){n.Log.debug("WebStorageStateStore.remove",e),e=this._prefix+e;var t=this._store.getItem(e);return this._store.removeItem(e),Promise.resolve(t)},WebStorageStateStore.prototype.getAllKeys=function getAllKeys(){n.Log.debug("WebStorageStateStore.getAllKeys");for(var e=[],t=0;t<this._store.length;t++){var r=this._store.key(t);0===r.indexOf(this._prefix)&&e.push(r.substr(this._prefix.length))}return Promise.resolve(e)},WebStorageStateStore}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.OidcClientSettings=void 0;var n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},i=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),o=r(0),s=r(5),a=r(44),u=r(3);var c="id_token",h="openid",l=900,f=300;t.OidcClientSettings=function(){function OidcClientSettings(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.authority,r=e.metadataUrl,i=e.metadata,o=e.signingKeys,g=e.client_id,p=e.client_secret,d=e.response_type,v=void 0===d?c:d,y=e.scope,m=void 0===y?h:y,S=e.redirect_uri,b=e.post_logout_redirect_uri,F=e.prompt,_=e.display,w=e.max_age,E=e.ui_locales,x=e.acr_values,A=e.resource,C=e.filterProtocolClaims,P=void 0===C||C,I=e.loadUserInfo,k=void 0===I||I,B=e.staleStateAge,R=void 0===B?l:B,T=e.clockSkew,U=void 0===T?f:T,D=e.stateStore,M=void 0===D?new s.WebStorageStateStore:D,L=e.ResponseValidatorCtor,N=void 0===L?a.ResponseValidator:L,O=e.MetadataServiceCtor,H=void 0===O?u.MetadataService:O,j=e.extraQueryParams,K=void 0===j?{}:j;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OidcClientSettings),this._authority=t,this._metadataUrl=r,this._metadata=i,this._signingKeys=o,this._client_id=g,this._client_secret=p,this._response_type=v,this._scope=m,this._redirect_uri=S,this._post_logout_redirect_uri=b,this._prompt=F,this._display=_,this._max_age=w,this._ui_locales=E,this._acr_values=x,this._resource=A,this._filterProtocolClaims=!!P,this._loadUserInfo=!!k,this._staleStateAge=R,this._clockSkew=U,this._stateStore=M,this._validator=new N(this),this._metadataService=new H(this),this._extraQueryParams="object"===(void 0===K?"undefined":n(K))?K:{}}return i(OidcClientSettings,[{key:"client_id",get:function get(){return this._client_id},set:function set(e){if(this._client_id)throw o.Log.error("OidcClientSettings.set_client_id: client_id has already been assigned."),new Error("client_id has already been assigned.");this._client_id=e}},{key:"client_secret",get:function get(){return this._client_secret}},{key:"response_type",get:function get(){return this._response_type}},{key:"scope",get:function get(){return this._scope}},{key:"redirect_uri",get:function get(){return this._redirect_uri}},{key:"post_logout_redirect_uri",get:function get(){return this._post_logout_redirect_uri}},{key:"prompt",get:function get(){return this._prompt}},{key:"display",get:function get(){return this._display}},{key:"max_age",get:function get(){return this._max_age}},{key:"ui_locales",get:function get(){return this._ui_locales}},{key:"acr_values",get:function get(){return this._acr_values}},{key:"resource",get:function get(){return this._resource}},{key:"authority",get:function get(){return this._authority},set:function set(e){if(this._authority)throw o.Log.error("OidcClientSettings.set_authority: authority has already been assigned."),new Error("authority has already been assigned.");this._authority=e}},{key:"metadataUrl",get:function get(){return this._metadataUrl||(this._metadataUrl=this.authority,this._metadataUrl&&this._metadataUrl.indexOf(".well-known/openid-configuration")<0&&("/"!==this._metadataUrl[this._metadataUrl.length-1]&&(this._metadataUrl+="/"),this._metadataUrl+=".well-known/openid-configuration")),this._metadataUrl}},{key:"metadata",get:function get(){return this._metadata},set:function set(e){this._metadata=e}},{key:"signingKeys",get:function get(){return this._signingKeys},set:function set(e){this._signingKeys=e}},{key:"filterProtocolClaims",get:function get(){return this._filterProtocolClaims}},{key:"loadUserInfo",get:function get(){return this._loadUserInfo}},{key:"staleStateAge",get:function get(){return this._staleStateAge}},{key:"clockSkew",get:function get(){return this._clockSkew}},{key:"stateStore",get:function get(){return this._stateStore}},{key:"validator",get:function get(){return this._validator}},{key:"metadataService",get:function get(){return this._metadataService}},{key:"extraQueryParams",get:function get(){return this._extraQueryParams},set:function set(e){"object"===(void 0===e?"undefined":n(e))?this._extraQueryParams=e:this._extraQueryParams={}}}]),OidcClientSettings}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CordovaPopupWindow=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);var o="location=no,toolbar=no,zoom=no",s="_blank";t.CordovaPopupWindow=function(){function CordovaPopupWindow(e){var t=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CordovaPopupWindow),this._promise=new Promise(function(e,r){t._resolve=e,t._reject=r}),this.features=e.popupWindowFeatures||o,this.target=e.popupWindowTarget||s,this.redirect_uri=e.startUrl,i.Log.debug("CordovaPopupWindow.ctor: redirect_uri: "+this.redirect_uri)}return CordovaPopupWindow.prototype._isInAppBrowserInstalled=function _isInAppBrowserInstalled(e){return["cordova-plugin-inappbrowser","cordova-plugin-inappbrowser.inappbrowser","org.apache.cordova.inappbrowser"].some(function(t){return e.hasOwnProperty(t)})},CordovaPopupWindow.prototype.navigate=function navigate(e){if(e&&e.url){if(!window.cordova)return this._error("cordova is undefined");var t=window.cordova.require("cordova/plugin_list").metadata;if(!1===this._isInAppBrowserInstalled(t))return this._error("InAppBrowser plugin not found");this._popup=cordova.InAppBrowser.open(e.url,this.target,this.features),this._popup?(i.Log.debug("CordovaPopupWindow.navigate: popup successfully created"),this._exitCallbackEvent=this._exitCallback.bind(this),this._loadStartCallbackEvent=this._loadStartCallback.bind(this),this._popup.addEventListener("exit",this._exitCallbackEvent,!1),this._popup.addEventListener("loadstart",this._loadStartCallbackEvent,!1)):this._error("Error opening popup window")}else this._error("No url provided");return this.promise},CordovaPopupWindow.prototype._loadStartCallback=function _loadStartCallback(e){0===e.url.indexOf(this.redirect_uri)&&this._success({url:e.url})},CordovaPopupWindow.prototype._exitCallback=function _exitCallback(e){this._error(e)},CordovaPopupWindow.prototype._success=function _success(e){this._cleanup(),i.Log.debug("CordovaPopupWindow: Successful response from cordova popup window"),this._resolve(e)},CordovaPopupWindow.prototype._error=function _error(e){this._cleanup(),i.Log.error(e),this._reject(new Error(e))},CordovaPopupWindow.prototype.close=function close(){this._cleanup()},CordovaPopupWindow.prototype._cleanup=function _cleanup(){this._popup&&(i.Log.debug("CordovaPopupWindow: cleaning up popup"),this._popup.removeEventListener("exit",this._exitCallbackEvent,!1),this._popup.removeEventListener("loadstart",this._loadStartCallbackEvent,!1),this._popup.close()),this._popup=null},n(CordovaPopupWindow,[{key:"promise",get:function get(){return this._promise}}]),CordovaPopupWindow}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.TokenRevocationClient=void 0;var n=r(0),i=r(3),o=r(1);t.TokenRevocationClient=function(){function TokenRevocationClient(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.Global.XMLHttpRequest,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,TokenRevocationClient),!e)throw n.Log.error("TokenRevocationClient.ctor: No settings provided"),new Error("No settings provided.");this._settings=e,this._XMLHttpRequestCtor=t,this._metadataService=new r(this._settings)}return TokenRevocationClient.prototype.revoke=function revoke(e,t){var r=this;if(!e)throw n.Log.error("TokenRevocationClient.revoke: No accessToken provided"),new Error("No accessToken provided.");return this._metadataService.getRevocationEndpoint().then(function(i){if(i){n.Log.error("TokenRevocationClient.revoke: Revoking access token");var o=r._settings.client_id,s=r._settings.client_secret;return r._revoke(i,o,s,e)}if(t)throw n.Log.error("TokenRevocationClient.revoke: Revocation not supported"),new Error("Revocation not supported")})},TokenRevocationClient.prototype._revoke=function _revoke(e,t,r,i){var o=this;return new Promise(function(s,a){var u=new o._XMLHttpRequestCtor;u.open("POST",e),u.onload=function(){n.Log.debug("TokenRevocationClient.revoke: HTTP response received, status",u.status),200===u.status?s():a(Error(u.statusText+" ("+u.status+")"))};var c="client_id="+encodeURIComponent(t);r&&(c+="&client_secret="+encodeURIComponent(r)),c+="&token_type_hint="+encodeURIComponent("access_token"),c+="&token="+encodeURIComponent(i),u.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),u.send(c)})},TokenRevocationClient}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CheckSessionIFrame=void 0;var n=r(0);var i=2e3;t.CheckSessionIFrame=function(){function CheckSessionIFrame(e,t,r,n){var o=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CheckSessionIFrame),this._callback=e,this._client_id=t,this._url=r,this._interval=n||i,this._stopOnError=o;var s=r.indexOf("/",r.indexOf("//")+2);this._frame_origin=r.substr(0,s),this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="absolute",this._frame.style.display="none",this._frame.style.width=0,this._frame.style.height=0,this._frame.src=r}return CheckSessionIFrame.prototype.load=function load(){var e=this;return new Promise(function(t){e._frame.onload=function(){t()},window.document.body.appendChild(e._frame),e._boundMessageEvent=e._message.bind(e),window.addEventListener("message",e._boundMessageEvent,!1)})},CheckSessionIFrame.prototype._message=function _message(e){e.origin===this._frame_origin&&e.source===this._frame.contentWindow&&("error"===e.data?(n.Log.error("CheckSessionIFrame: error message from check session op iframe"),this._stopOnError&&this.stop()):"changed"===e.data?(n.Log.debug("CheckSessionIFrame: changed message from check session op iframe"),this.stop(),this._callback()):n.Log.debug("CheckSessionIFrame: "+e.data+" message from check session op iframe"))},CheckSessionIFrame.prototype.start=function start(e){var t=this;if(this._session_state!==e){n.Log.debug("CheckSessionIFrame.start"),this.stop(),this._session_state=e;var r=function send(){t._frame.contentWindow.postMessage(t._client_id+" "+t._session_state,t._frame_origin)};r(),this._timer=window.setInterval(r,this._interval)}},CheckSessionIFrame.prototype.stop=function stop(){this._session_state=null,this._timer&&(n.Log.debug("CheckSessionIFrame.stop"),window.clearInterval(this._timer),this._timer=null)},CheckSessionIFrame}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SessionMonitor=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(9);t.SessionMonitor=function(){function SessionMonitor(e){var t=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.CheckSessionIFrame;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SessionMonitor),!e)throw i.Log.error("SessionMonitor.ctor: No user manager passed to SessionMonitor"),new Error("userManager");this._userManager=e,this._CheckSessionIFrameCtor=r,this._userManager.events.addUserLoaded(this._start.bind(this)),this._userManager.events.addUserUnloaded(this._stop.bind(this)),this._userManager.getUser().then(function(e){e&&t._start(e)}).catch(function(e){i.Log.error("SessionMonitor ctor: error from getUser:",e.message)})}return SessionMonitor.prototype._start=function _start(e){var t=this,r=e.session_state;r&&(this._sub=e.profile.sub,this._sid=e.profile.sid,i.Log.debug("SessionMonitor._start: session_state:",r,", sub:",this._sub),this._checkSessionIFrame?this._checkSessionIFrame.start(r):this._metadataService.getCheckSessionIframe().then(function(e){if(e){i.Log.debug("SessionMonitor._start: Initializing check session iframe");var n=t._client_id,o=t._checkSessionInterval,s=t._stopCheckSessionOnError;t._checkSessionIFrame=new t._CheckSessionIFrameCtor(t._callback.bind(t),n,e,o,s),t._checkSessionIFrame.load().then(function(){t._checkSessionIFrame.start(r)})}else i.Log.warn("SessionMonitor._start: No check session iframe found in the metadata")}).catch(function(e){i.Log.error("SessionMonitor._start: Error from getCheckSessionIframe:",e.message)}))},SessionMonitor.prototype._stop=function _stop(){this._sub=null,this._sid=null,this._checkSessionIFrame&&(i.Log.debug("SessionMonitor._stop"),this._checkSessionIFrame.stop())},SessionMonitor.prototype._callback=function _callback(){var e=this;this._userManager.querySessionStatus().then(function(t){var r=!0;t?t.sub===e._sub?(r=!1,e._checkSessionIFrame.start(t.session_state),t.sid===e._sid?i.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, restarting check session iframe; session_state:",t.session_state):(i.Log.debug("SessionMonitor._callback: Same sub still logged in at OP, session state has changed, restarting check session iframe; session_state:",t.session_state),e._userManager.events._raiseUserSessionChanged())):i.Log.debug("SessionMonitor._callback: Different subject signed into OP:",t.sub):i.Log.debug("SessionMonitor._callback: Subject no longer signed into OP"),r&&(i.Log.debug("SessionMonitor._callback: SessionMonitor._callback; raising signed out event"),e._userManager.events._raiseUserSignedOut())}).catch(function(t){i.Log.debug("SessionMonitor._callback: Error calling queryCurrentSigninSession; raising signed out event",t.message),e._userManager.events._raiseUserSignedOut()})},n(SessionMonitor,[{key:"_settings",get:function get(){return this._userManager.settings}},{key:"_metadataService",get:function get(){return this._userManager.metadataService}},{key:"_client_id",get:function get(){return this._settings.client_id}},{key:"_checkSessionInterval",get:function get(){return this._settings.checkSessionInterval}},{key:"_stopCheckSessionOnError",get:function get(){return this._settings.stopCheckSessionOnError}}]),SessionMonitor}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Event=void 0;var n=r(0);t.Event=function(){function Event(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Event),this._name=e,this._callbacks=[]}return Event.prototype.addHandler=function addHandler(e){this._callbacks.push(e)},Event.prototype.removeHandler=function removeHandler(e){var t=this._callbacks.findIndex(function(t){return t===e});t>=0&&this._callbacks.splice(t,1)},Event.prototype.raise=function raise(){n.Log.debug("Event: Raising event: "+this._name);for(var e=0;e<this._callbacks.length;e++){var t;(t=this._callbacks)[e].apply(t,arguments)}},Event}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.AccessTokenEvents=void 0;var n=r(0),i=r(22);var o=60;t.AccessTokenEvents=function(){function AccessTokenEvents(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.accessTokenExpiringNotificationTime,r=void 0===t?o:t,n=e.accessTokenExpiringTimer,s=void 0===n?new i.Timer("Access token expiring"):n,a=e.accessTokenExpiredTimer,u=void 0===a?new i.Timer("Access token expired"):a;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,AccessTokenEvents),this._accessTokenExpiringNotificationTime=r,this._accessTokenExpiring=s,this._accessTokenExpired=u}return AccessTokenEvents.prototype.load=function load(e){if(e.access_token&&void 0!==e.expires_in){var t=e.expires_in;if(n.Log.debug("AccessTokenEvents.load: access token present, remaining duration:",t),t>0){var r=t-this._accessTokenExpiringNotificationTime;r<=0&&(r=1),n.Log.debug("AccessTokenEvents.load: registering expiring timer in:",r),this._accessTokenExpiring.init(r)}else n.Log.debug("AccessTokenEvents.load: canceling existing expiring timer becase we're past expiration."),this._accessTokenExpiring.cancel();var i=t+1;n.Log.debug("AccessTokenEvents.load: registering expired timer in:",i),this._accessTokenExpired.init(i)}else this._accessTokenExpiring.cancel(),this._accessTokenExpired.cancel()},AccessTokenEvents.prototype.unload=function unload(){n.Log.debug("AccessTokenEvents.unload: canceling existing access token timers"),this._accessTokenExpiring.cancel(),this._accessTokenExpired.cancel()},AccessTokenEvents.prototype.addAccessTokenExpiring=function addAccessTokenExpiring(e){this._accessTokenExpiring.addHandler(e)},AccessTokenEvents.prototype.removeAccessTokenExpiring=function removeAccessTokenExpiring(e){this._accessTokenExpiring.removeHandler(e)},AccessTokenEvents.prototype.addAccessTokenExpired=function addAccessTokenExpired(e){this._accessTokenExpired.addHandler(e)},AccessTokenEvents.prototype.removeAccessTokenExpired=function removeAccessTokenExpired(e){this._accessTokenExpired.removeHandler(e)},AccessTokenEvents}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.User=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);t.User=function(){function User(e){var t=e.id_token,r=e.session_state,n=e.access_token,i=e.token_type,o=e.scope,s=e.profile,a=e.expires_at,u=e.state;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,User),this.id_token=t,this.session_state=r,this.access_token=n,this.token_type=i,this.scope=o,this.profile=s,this.expires_at=a,this.state=u}return User.prototype.toStorageString=function toStorageString(){return i.Log.debug("User.toStorageString"),JSON.stringify({id_token:this.id_token,session_state:this.session_state,access_token:this.access_token,token_type:this.token_type,scope:this.scope,profile:this.profile,expires_at:this.expires_at})},User.fromStorageString=function fromStorageString(e){return i.Log.debug("User.fromStorageString"),new User(JSON.parse(e))},n(User,[{key:"expires_in",get:function get(){if(this.expires_at){var e=parseInt(Date.now()/1e3);return this.expires_at-e}}},{key:"expired",get:function get(){var e=this.expires_in;if(void 0!==e)return e<=0}},{key:"scopes",get:function get(){return(this.scope||"").split(" ")}}]),User}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default=
// @preserve Copyright (c) Microsoft Open Technologies, Inc.
function random(){for(var e="xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx",t="0123456789abcdef",r=0,n="",i=0;i<e.length;i++)"-"!==e[i]&&"4"!==e[i]&&(r=16*Math.random()|0),"x"===e[i]?n+=t[r]:"y"===e[i]?(r&=3,n+=t[r|=8]):n+=e[i];return n},e.exports=t.default},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SigninState=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(4),s=function _interopRequireDefault(e){return e&&e.__esModule?e:{default:e}}(r(14));t.SigninState=function(e){function SigninState(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.nonce,n=t.authority,i=t.client_id;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SigninState);var o=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,arguments[0]));return!0===r?o._nonce=(0,s.default)():r&&(o._nonce=r),o._authority=n,o._client_id=i,o}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(SigninState,e),SigninState.prototype.toStorageString=function toStorageString(){return i.Log.debug("SigninState.toStorageString"),JSON.stringify({id:this.id,data:this.data,created:this.created,nonce:this.nonce,authority:this.authority,client_id:this.client_id})},SigninState.fromStorageString=function fromStorageString(e){return i.Log.debug("SigninState.fromStorageString"),new SigninState(JSON.parse(e))},n(SigninState,[{key:"nonce",get:function get(){return this._nonce}},{key:"authority",get:function get(){return this._authority}},{key:"client_id",get:function get(){return this._client_id}}]),SigninState}(o.State)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ErrorResponse=void 0;var n=r(0);t.ErrorResponse=function(e){function ErrorResponse(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.error,i=t.error_description,o=t.error_uri,s=t.state;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ErrorResponse),!r)throw n.Log.error("No error passed to ErrorResponse"),new Error("error");var a=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,i||r));return a.name="ErrorResponse",a.error=r,a.error_description=i,a.error_uri=o,a.state=s,a}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(ErrorResponse,e),ErrorResponse}(Error)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.JsonService=void 0;var n=r(0),i=r(1);t.JsonService=function(){function JsonService(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.Global.XMLHttpRequest;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,JsonService),e&&Array.isArray(e)?this._contentTypes=e.slice():this._contentTypes=[],this._contentTypes.push("application/json"),this._XMLHttpRequest=t}return JsonService.prototype.getJson=function getJson(e,t){var r=this;if(!e)throw n.Log.error("JsonService.getJson: No url passed"),new Error("url");return n.Log.debug("JsonService.getJson, url: ",e),new Promise(function(i,o){var s=new r._XMLHttpRequest;s.open("GET",e);var a=r._contentTypes;s.onload=function(){if(n.Log.debug("JsonService.getJson: HTTP response received, status",s.status),200===s.status){var t=s.getResponseHeader("Content-Type");if(t)if(a.find(function(e){if(t.startsWith(e))return!0}))try{return void i(JSON.parse(s.responseText))}catch(e){return n.Log.error("JsonService.getJson: Error parsing JSON response",e.message),void o(e)}o(Error("Invalid response Content-Type: "+t+", from URL: "+e))}else o(Error(s.statusText+" ("+s.status+")"))},s.onerror=function(){n.Log.error("JsonService.getJson: network error"),o(Error("Network Error"))},t&&(n.Log.debug("JsonService.getJson: token passed, setting Authorization header"),s.setRequestHeader("Authorization","Bearer "+t)),s.send()})},JsonService}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.OidcClient=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(6),s=r(16),a=r(35),u=r(34),c=r(33),h=r(32),l=r(15),f=r(4);t.OidcClient=function(){function OidcClient(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,OidcClient),e instanceof o.OidcClientSettings?this._settings=e:this._settings=new o.OidcClientSettings(e)}return OidcClient.prototype.createSigninRequest=function createSigninRequest(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.response_type,n=t.scope,o=t.redirect_uri,s=t.data,u=t.state,c=t.prompt,h=t.display,l=t.max_age,f=t.ui_locales,g=t.id_token_hint,p=t.login_hint,d=t.acr_values,v=t.resource,y=t.request,m=t.request_uri,S=t.extraQueryParams,b=arguments[1];i.Log.debug("OidcClient.createSigninRequest");var F=this._settings.client_id;r=r||this._settings.response_type,n=n||this._settings.scope,o=o||this._settings.redirect_uri,c=c||this._settings.prompt,h=h||this._settings.display,l=l||this._settings.max_age,f=f||this._settings.ui_locales,d=d||this._settings.acr_values,v=v||this._settings.resource,S=S||this._settings.extraQueryParams;var _=this._settings.authority;return this._metadataService.getAuthorizationEndpoint().then(function(t){i.Log.debug("OidcClient.createSigninRequest: Received authorization endpoint",t);var w=new a.SigninRequest({url:t,client_id:F,redirect_uri:o,response_type:r,scope:n,data:s||u,authority:_,prompt:c,display:h,max_age:l,ui_locales:f,id_token_hint:g,login_hint:p,acr_values:d,resource:v,request:y,request_uri:m,extraQueryParams:S}),E=w.state;return(b=b||e._stateStore).set(E.id,E.toStorageString()).then(function(){return w})})},OidcClient.prototype.processSigninResponse=function processSigninResponse(e,t){var r=this;i.Log.debug("OidcClient.processSigninResponse");var n=new u.SigninResponse(e);return n.state?(t=t||this._stateStore).remove(n.state).then(function(e){if(!e)throw i.Log.error("OidcClient.processSigninResponse: No matching state found in storage"),new Error("No matching state found in storage");var t=l.SigninState.fromStorageString(e);return i.Log.debug("OidcClient.processSigninResponse: Received state from storage; validating response"),r._validator.validateSigninResponse(t,n)}):(i.Log.error("OidcClient.processSigninResponse: No state in response"),Promise.reject(new Error("No state in response")))},OidcClient.prototype.createSignoutRequest=function createSignoutRequest(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.id_token_hint,n=t.data,o=t.state,s=t.post_logout_redirect_uri,a=arguments[1];return i.Log.debug("OidcClient.createSignoutRequest"),s=s||this._settings.post_logout_redirect_uri,this._metadataService.getEndSessionEndpoint().then(function(t){if(!t)throw i.Log.error("OidcClient.createSignoutRequest: No end session endpoint url returned"),new Error("no end session endpoint");i.Log.debug("OidcClient.createSignoutRequest: Received end session endpoint",t);var u=new c.SignoutRequest({url:t,id_token_hint:r,post_logout_redirect_uri:s,data:n||o}),h=u.state;return h&&(i.Log.debug("OidcClient.createSignoutRequest: Signout request has state to persist"),(a=a||e._stateStore).set(h.id,h.toStorageString())),u})},OidcClient.prototype.processSignoutResponse=function processSignoutResponse(e,t){var r=this;i.Log.debug("OidcClient.processSignoutResponse");var n=new h.SignoutResponse(e);if(!n.state)return i.Log.debug("OidcClient.processSignoutResponse: No state in response"),n.error?(i.Log.warn("OidcClient.processSignoutResponse: Response was error: ",n.error),Promise.reject(new s.ErrorResponse(n))):Promise.resolve(n);var o=n.state;return(t=t||this._stateStore).remove(o).then(function(e){if(!e)throw i.Log.error("OidcClient.processSignoutResponse: No matching state found in storage"),new Error("No matching state found in storage");var t=f.State.fromStorageString(e);return i.Log.debug("OidcClient.processSignoutResponse: Received state from storage; validating response"),r._validator.validateSignoutResponse(t,n)})},OidcClient.prototype.clearStaleState=function clearStaleState(e){return i.Log.debug("OidcClient.clearStaleState"),e=e||this._stateStore,f.State.clearStaleState(e,this.settings.staleStateAge)},n(OidcClient,[{key:"_stateStore",get:function get(){return this.settings.stateStore}},{key:"_validator",get:function get(){return this.settings.validator}},{key:"_metadataService",get:function get(){return this.settings.metadataService}},{key:"settings",get:function get(){return this._settings}},{key:"metadataService",get:function get(){return this._metadataService}}]),OidcClient}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CordovaIFrameNavigator=void 0;var n=r(7);t.CordovaIFrameNavigator=function(){function CordovaIFrameNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CordovaIFrameNavigator)}return CordovaIFrameNavigator.prototype.prepare=function prepare(e){e.popupWindowFeatures="hidden=yes";var t=new n.CordovaPopupWindow(e);return Promise.resolve(t)},CordovaIFrameNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.CordovaPopupNavigator=void 0;var n=r(7);t.CordovaPopupNavigator=function(){function CordovaPopupNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,CordovaPopupNavigator)}return CordovaPopupNavigator.prototype.prepare=function prepare(e){var t=new n.CordovaPopupWindow(e);return Promise.resolve(t)},CordovaPopupNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SilentRenewService=void 0;var n=r(0);t.SilentRenewService=function(){function SilentRenewService(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SilentRenewService),this._userManager=e}return SilentRenewService.prototype.start=function start(){this._callback||(this._callback=this._tokenExpiring.bind(this),this._userManager.events.addAccessTokenExpiring(this._callback),this._userManager.getUser().then(function(e){}).catch(function(e){n.Log.error("SilentRenewService.start: Error from getUser:",e.message)}))},SilentRenewService.prototype.stop=function stop(){this._callback&&(this._userManager.events.removeAccessTokenExpiring(this._callback),delete this._callback)},SilentRenewService.prototype._tokenExpiring=function _tokenExpiring(){var e=this;this._userManager.signinSilent().then(function(e){n.Log.debug("SilentRenewService._tokenExpiring: Silent token renewal successful")},function(t){n.Log.error("SilentRenewService._tokenExpiring: Error from signinSilent:",t.message),e._userManager.events._raiseSilentRenewError(t)})},SilentRenewService}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.Timer=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(1),s=r(11);t.Timer=function(e){function Timer(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:o.Global.timer,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:void 0;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,Timer);var i=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t));return i._timer=r,i._nowFunc=n||function(){return Date.now()/1e3},i}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(Timer,e),Timer.prototype.init=function init(e){e<=0&&(e=1),e=parseInt(e);var t=this.now+e;if(this.expiration===t&&this._timerHandle)i.Log.debug("Timer.init timer "+this._name+" skipping initialization since already initialized for expiration:",this.expiration);else{this.cancel(),i.Log.debug("Timer.init timer "+this._name+" for duration:",e),this._expiration=t;var r=5;e<r&&(r=e),this._timerHandle=this._timer.setInterval(this._callback.bind(this),1e3*r)}},Timer.prototype.cancel=function cancel(){this._timerHandle&&(i.Log.debug("Timer.cancel: ",this._name),this._timer.clearInterval(this._timerHandle),this._timerHandle=null)},Timer.prototype._callback=function _callback(){var t=this._expiration-this.now;i.Log.debug("Timer.callback; "+this._name+" timer expires in:",t),this._expiration<=this.now&&(this.cancel(),e.prototype.raise.call(this))},n(Timer,[{key:"now",get:function get(){return parseInt(this._nowFunc())}},{key:"expiration",get:function get(){return this._expiration}}]),Timer}(s.Event)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserManagerEvents=void 0;var n=r(0),i=r(12),o=r(11);t.UserManagerEvents=function(e){function UserManagerEvents(t){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UserManagerEvents);var r=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t));return r._userLoaded=new o.Event("User loaded"),r._userUnloaded=new o.Event("User unloaded"),r._silentRenewError=new o.Event("Silent renew error"),r._userSignedOut=new o.Event("User signed out"),r._userSessionChanged=new o.Event("User session changed"),r}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(UserManagerEvents,e),UserManagerEvents.prototype.load=function load(t){var r=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];n.Log.debug("UserManagerEvents.load"),e.prototype.load.call(this,t),r&&this._userLoaded.raise(t)},UserManagerEvents.prototype.unload=function unload(){n.Log.debug("UserManagerEvents.unload"),e.prototype.unload.call(this),this._userUnloaded.raise()},UserManagerEvents.prototype.addUserLoaded=function addUserLoaded(e){this._userLoaded.addHandler(e)},UserManagerEvents.prototype.removeUserLoaded=function removeUserLoaded(e){this._userLoaded.removeHandler(e)},UserManagerEvents.prototype.addUserUnloaded=function addUserUnloaded(e){this._userUnloaded.addHandler(e)},UserManagerEvents.prototype.removeUserUnloaded=function removeUserUnloaded(e){this._userUnloaded.removeHandler(e)},UserManagerEvents.prototype.addSilentRenewError=function addSilentRenewError(e){this._silentRenewError.addHandler(e)},UserManagerEvents.prototype.removeSilentRenewError=function removeSilentRenewError(e){this._silentRenewError.removeHandler(e)},UserManagerEvents.prototype._raiseSilentRenewError=function _raiseSilentRenewError(e){n.Log.debug("UserManagerEvents._raiseSilentRenewError",e.message),this._silentRenewError.raise(e)},UserManagerEvents.prototype.addUserSignedOut=function addUserSignedOut(e){this._userSignedOut.addHandler(e)},UserManagerEvents.prototype.removeUserSignedOut=function removeUserSignedOut(e){this._userSignedOut.removeHandler(e)},UserManagerEvents.prototype._raiseUserSignedOut=function _raiseUserSignedOut(e){n.Log.debug("UserManagerEvents._raiseUserSignedOut"),this._userSignedOut.raise(e)},UserManagerEvents.prototype.addUserSessionChanged=function addUserSessionChanged(e){this._userSessionChanged.addHandler(e)},UserManagerEvents.prototype.removeUserSessionChanged=function removeUserSessionChanged(e){this._userSessionChanged.removeHandler(e)},UserManagerEvents.prototype._raiseUserSessionChanged=function _raiseUserSessionChanged(e){n.Log.debug("UserManagerEvents._raiseUserSessionChanged"),this._userSessionChanged.raise(e)},UserManagerEvents}(i.AccessTokenEvents)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.IFrameWindow=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);t.IFrameWindow=function(){function IFrameWindow(e){var t=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,IFrameWindow),this._promise=new Promise(function(e,r){t._resolve=e,t._reject=r}),this._boundMessageEvent=this._message.bind(this),window.addEventListener("message",this._boundMessageEvent,!1),this._frame=window.document.createElement("iframe"),this._frame.style.visibility="hidden",this._frame.style.position="absolute",this._frame.style.display="none",this._frame.style.width=0,this._frame.style.height=0,window.document.body.appendChild(this._frame)}return IFrameWindow.prototype.navigate=function navigate(e){if(e&&e.url){var t=e.silentRequestTimeout||1e4;i.Log.debug("IFrameWindow.navigate: Using timeout of:",t),this._timer=window.setTimeout(this._timeout.bind(this),t),this._frame.src=e.url}else this._error("No url provided");return this.promise},IFrameWindow.prototype._success=function _success(e){this._cleanup(),i.Log.debug("IFrameWindow: Successful response from frame window"),this._resolve(e)},IFrameWindow.prototype._error=function _error(e){this._cleanup(),i.Log.error(e),this._reject(new Error(e))},IFrameWindow.prototype.close=function close(){this._cleanup()},IFrameWindow.prototype._cleanup=function _cleanup(){this._frame&&(i.Log.debug("IFrameWindow: cleanup"),window.removeEventListener("message",this._boundMessageEvent,!1),window.clearTimeout(this._timer),window.document.body.removeChild(this._frame),this._timer=null,this._frame=null,this._boundMessageEvent=null)},IFrameWindow.prototype._timeout=function _timeout(){i.Log.debug("IFrameWindow.timeout"),this._error("Frame window timed out")},IFrameWindow.prototype._message=function _message(e){if(i.Log.debug("IFrameWindow.message"),this._timer&&e.origin===this._origin&&e.source===this._frame.contentWindow){var t=e.data;t?this._success({url:t}):this._error("Invalid response from frame")}},IFrameWindow.notifyParent=function notifyParent(e){i.Log.debug("IFrameWindow.notifyParent"),window.parent&&window!==window.parent&&(e=e||window.location.href)&&(i.Log.debug("IFrameWindow.notifyParent: posting url message to parent"),window.parent.postMessage(e,location.protocol+"//"+location.host))},n(IFrameWindow,[{key:"promise",get:function get(){return this._promise}},{key:"_origin",get:function get(){return location.protocol+"//"+location.host}}]),IFrameWindow}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.IFrameNavigator=void 0;var n=r(0),i=r(24);t.IFrameNavigator=function(){function IFrameNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,IFrameNavigator)}return IFrameNavigator.prototype.prepare=function prepare(e){var t=new i.IFrameWindow(e);return Promise.resolve(t)},IFrameNavigator.prototype.callback=function callback(e){n.Log.debug("IFrameNavigator.callback");try{return i.IFrameWindow.notifyParent(e),Promise.resolve()}catch(e){return Promise.reject(e)}},IFrameNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PopupWindow=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(2);var s=500,a="location=no,toolbar=no,width=500,height=500,left=100,top=100;",u="_blank";t.PopupWindow=function(){function PopupWindow(e){var t=this;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,PopupWindow),this._promise=new Promise(function(e,r){t._resolve=e,t._reject=r});var r=e.popupWindowTarget||u,n=e.popupWindowFeatures||a;this._popup=window.open("",r,n),this._popup&&(i.Log.debug("PopupWindow.ctor: popup successfully created"),this._checkForPopupClosedTimer=window.setInterval(this._checkForPopupClosed.bind(this),s))}return PopupWindow.prototype.navigate=function navigate(e){return this._popup?e&&e.url?(i.Log.debug("PopupWindow.navigate: Setting URL in popup"),this._id=e.id,this._id&&(window["popupCallback_"+e.id]=this._callback.bind(this)),this._popup.focus(),this._popup.window.location=e.url):(this._error("PopupWindow.navigate: no url provided"),this._error("No url provided")):this._error("PopupWindow.navigate: Error opening popup window"),this.promise},PopupWindow.prototype._success=function _success(e){i.Log.debug("PopupWindow.callback: Successful response from popup window"),this._cleanup(),this._resolve(e)},PopupWindow.prototype._error=function _error(e){i.Log.error("PopupWindow.error: ",e),this._cleanup(),this._reject(new Error(e))},PopupWindow.prototype.close=function close(){this._cleanup(!1)},PopupWindow.prototype._cleanup=function _cleanup(e){i.Log.debug("PopupWindow.cleanup"),window.clearInterval(this._checkForPopupClosedTimer),this._checkForPopupClosedTimer=null,delete window["popupCallback_"+this._id],this._popup&&!e&&this._popup.close(),this._popup=null},PopupWindow.prototype._checkForPopupClosed=function _checkForPopupClosed(){this._popup&&!this._popup.closed||this._error("Popup window closed")},PopupWindow.prototype._callback=function _callback(e,t){this._cleanup(t),e?(i.Log.debug("PopupWindow.callback success"),this._success({url:e})):(i.Log.debug("PopupWindow.callback: Invalid response from popup"),this._error("Invalid response from popup"))},PopupWindow.notifyOpener=function notifyOpener(e,t,r){if(window.opener){if(e=e||window.location.href){var n=o.UrlUtility.parseUrlFragment(e,r);if(n.state){var s="popupCallback_"+n.state,a=window.opener[s];a?(i.Log.debug("PopupWindow.notifyOpener: passing url message to opener"),a(e,t)):i.Log.warn("PopupWindow.notifyOpener: no matching callback found on opener")}else i.Log.warn("PopupWindow.notifyOpener: no state found in response url")}}else i.Log.warn("PopupWindow.notifyOpener: no window.opener. Can't complete notification.")},n(PopupWindow,[{key:"promise",get:function get(){return this._promise}}]),PopupWindow}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.PopupNavigator=void 0;var n=r(0),i=r(26);t.PopupNavigator=function(){function PopupNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,PopupNavigator)}return PopupNavigator.prototype.prepare=function prepare(e){var t=new i.PopupWindow(e);return Promise.resolve(t)},PopupNavigator.prototype.callback=function callback(e,t,r){n.Log.debug("PopupNavigator.callback");try{return i.PopupWindow.notifyOpener(e,t,r),Promise.resolve()}catch(e){return Promise.reject(e)}},PopupNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.RedirectNavigator=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);t.RedirectNavigator=function(){function RedirectNavigator(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,RedirectNavigator)}return RedirectNavigator.prototype.prepare=function prepare(){return Promise.resolve(this)},RedirectNavigator.prototype.navigate=function navigate(e){return e&&e.url?(window.location=e.url,Promise.resolve()):(i.Log.error("RedirectNavigator.navigate: No url provided"),Promise.reject(new Error("No url provided")))},n(RedirectNavigator,[{key:"url",get:function get(){return window.location.href}}]),RedirectNavigator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserManagerSettings=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=(r(0),r(6)),o=r(28),s=r(27),a=r(25),u=r(5),c=r(1);var h=60,l=2e3,f="id_token";t.UserManagerSettings=function(e){function UserManagerSettings(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.popup_redirect_uri,n=t.popup_post_logout_redirect_uri,i=t.popupWindowFeatures,g=t.popupWindowTarget,p=t.silent_redirect_uri,d=t.silentRequestTimeout,v=t.automaticSilentRenew,y=void 0!==v&&v,m=t.includeIdTokenInSilentRenew,S=void 0===m||m,b=t.monitorSession,F=void 0===b||b,_=t.checkSessionInterval,w=void 0===_?l:_,E=t.stopCheckSessionOnError,x=void 0===E||E,A=t.query_status_response_type,C=void 0===A?f:A,P=t.revokeAccessTokenOnSignout,I=void 0!==P&&P,k=t.accessTokenExpiringNotificationTime,B=void 0===k?h:k,R=t.redirectNavigator,T=void 0===R?new o.RedirectNavigator:R,U=t.popupNavigator,D=void 0===U?new s.PopupNavigator:U,M=t.iframeNavigator,L=void 0===M?new a.IFrameNavigator:M,N=t.userStore,O=void 0===N?new u.WebStorageStateStore({store:c.Global.sessionStorage}):N;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UserManagerSettings);var H=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,arguments[0]));return H._popup_redirect_uri=r,H._popup_post_logout_redirect_uri=n,H._popupWindowFeatures=i,H._popupWindowTarget=g,H._silent_redirect_uri=p,H._silentRequestTimeout=d,H._automaticSilentRenew=!!y,H._includeIdTokenInSilentRenew=S,H._accessTokenExpiringNotificationTime=B,H._monitorSession=F,H._checkSessionInterval=w,H._stopCheckSessionOnError=x,H._query_status_response_type=C,H._revokeAccessTokenOnSignout=I,H._redirectNavigator=T,H._popupNavigator=D,H._iframeNavigator=L,H._userStore=O,H}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(UserManagerSettings,e),n(UserManagerSettings,[{key:"popup_redirect_uri",get:function get(){return this._popup_redirect_uri}},{key:"popup_post_logout_redirect_uri",get:function get(){return this._popup_post_logout_redirect_uri}},{key:"popupWindowFeatures",get:function get(){return this._popupWindowFeatures}},{key:"popupWindowTarget",get:function get(){return this._popupWindowTarget}},{key:"silent_redirect_uri",get:function get(){return this._silent_redirect_uri}},{key:"silentRequestTimeout",get:function get(){return this._silentRequestTimeout}},{key:"automaticSilentRenew",get:function get(){return!(!this.silent_redirect_uri||!this._automaticSilentRenew)}},{key:"includeIdTokenInSilentRenew",get:function get(){return this._includeIdTokenInSilentRenew}},{key:"accessTokenExpiringNotificationTime",get:function get(){return this._accessTokenExpiringNotificationTime}},{key:"monitorSession",get:function get(){return this._monitorSession}},{key:"checkSessionInterval",get:function get(){return this._checkSessionInterval}},{key:"stopCheckSessionOnError",get:function get(){return this._stopCheckSessionOnError}},{key:"query_status_response_type",get:function get(){return this._query_status_response_type}},{key:"revokeAccessTokenOnSignout",get:function get(){return this._revokeAccessTokenOnSignout}},{key:"redirectNavigator",get:function get(){return this._redirectNavigator}},{key:"popupNavigator",get:function get(){return this._popupNavigator}},{key:"iframeNavigator",get:function get(){return this._iframeNavigator}},{key:"userStore",get:function get(){return this._userStore}}]),UserManagerSettings}(i.OidcClientSettings)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserManager=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0),o=r(18),s=r(29),a=r(13),u=r(23),c=r(21),h=r(10),l=r(8);t.UserManager=function(e){function UserManager(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c.SilentRenewService,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:h.SessionMonitor,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:l.TokenRevocationClient;!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UserManager),t instanceof s.UserManagerSettings||(t=new s.UserManagerSettings(t));var a=function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}(this,e.call(this,t));return a._events=new u.UserManagerEvents(t),a._silentRenewService=new r(a),a.settings.automaticSilentRenew&&(i.Log.debug("UserManager.ctor: automaticSilentRenew is configured, setting up silent renew"),a.startSilentRenew()),a.settings.monitorSession&&(i.Log.debug("UserManager.ctor: monitorSession is configured, setting up session monitor"),a._sessionMonitor=new n(a)),a._tokenRevocationClient=new o(a._settings),a}return function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(UserManager,e),UserManager.prototype.getUser=function getUser(){var e=this;return this._loadUser().then(function(t){return t?(i.Log.info("UserManager.getUser: user loaded"),e._events.load(t,!1),t):(i.Log.info("UserManager.getUser: user not found in storage"),null)})},UserManager.prototype.removeUser=function removeUser(){var e=this;return this.storeUser(null).then(function(){i.Log.info("UserManager.removeUser: user removed from storage"),e._events.unload()})},UserManager.prototype.signinRedirect=function signinRedirect(e){return this._signinStart(e,this._redirectNavigator).then(function(){i.Log.info("UserManager.signinRedirect: successful")})},UserManager.prototype.signinRedirectCallback=function signinRedirectCallback(e){return this._signinEnd(e||this._redirectNavigator.url).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinRedirectCallback: successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinRedirectCallback: no sub")),e})},UserManager.prototype.signinPopup=function signinPopup(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.redirect_uri||this.settings.popup_redirect_uri||this.settings.redirect_uri;return t?(e.redirect_uri=t,e.display="popup",this._signin(e,this._popupNavigator,{startUrl:t,popupWindowFeatures:e.popupWindowFeatures||this.settings.popupWindowFeatures,popupWindowTarget:e.popupWindowTarget||this.settings.popupWindowTarget}).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinPopup: signinPopup successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinPopup: no sub")),e})):(i.Log.error("UserManager.signinPopup: No popup_redirect_uri or redirect_uri configured"),Promise.reject(new Error("No popup_redirect_uri or redirect_uri configured")))},UserManager.prototype.signinPopupCallback=function signinPopupCallback(e){return this._signinCallback(e,this._popupNavigator).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinPopupCallback: successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinPopupCallback: no sub")),e}).catch(function(e){i.Log.error("UserManager.signinPopupCallback error: "+e&&e.message)})},UserManager.prototype.signinSilent=function signinSilent(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.redirect_uri||this.settings.silent_redirect_uri;if(!r)return i.Log.error("UserManager.signinSilent: No silent_redirect_uri configured"),Promise.reject(new Error("No silent_redirect_uri configured"));t.redirect_uri=r,t.prompt="none";return(t.id_token_hint||!this.settings.includeIdTokenInSilentRenew?Promise.resolve():this._loadUser().then(function(e){t.id_token_hint=e&&e.id_token})).then(function(){return e._signin(t,e._iframeNavigator,{startUrl:r,silentRequestTimeout:t.silentRequestTimeout||e.settings.silentRequestTimeout})}).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinSilent: successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinSilent: no sub")),e})},UserManager.prototype.signinSilentCallback=function signinSilentCallback(e){return this._signinCallback(e,this._iframeNavigator).then(function(e){return e&&(e.profile&&e.profile.sub?i.Log.info("UserManager.signinSilentCallback: successful, signed in sub: ",e.profile.sub):i.Log.info("UserManager.signinSilentCallback: no sub")),e})},UserManager.prototype.querySessionStatus=function querySessionStatus(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},r=t.redirect_uri||this.settings.silent_redirect_uri;return r?(t.redirect_uri=r,t.prompt="none",t.response_type=t.response_type||this.settings.query_status_response_type,t.scope="openid",this._signinStart(t,this._iframeNavigator,{startUrl:r,silentRequestTimeout:t.silentRequestTimeout||this.settings.silentRequestTimeout}).then(function(t){return e.processSigninResponse(t.url).then(function(e){if(i.Log.debug("UserManager.querySessionStatus: got signin response"),e.session_state&&e.profile.sub)return i.Log.info("UserManager.querySessionStatus: querySessionStatus success for sub: ",e.profile.sub),{session_state:e.session_state,sub:e.profile.sub,sid:e.profile.sid};i.Log.info("querySessionStatus successful, user not authenticated")})})):(i.Log.error("UserManager.querySessionStatus: No silent_redirect_uri configured"),Promise.reject(new Error("No silent_redirect_uri configured")))},UserManager.prototype._signin=function _signin(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this._signinStart(e,t,n).then(function(e){return r._signinEnd(e.url)})},UserManager.prototype._signinStart=function _signinStart(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return t.prepare(n).then(function(t){return i.Log.debug("UserManager._signinStart: got navigator window handle"),r.createSigninRequest(e).then(function(e){return i.Log.debug("UserManager._signinStart: got signin request"),n.url=e.url,n.id=e.state.id,t.navigate(n)}).catch(function(e){throw t.close&&(i.Log.debug("UserManager._signinStart: Error after preparing navigator, closing navigator window"),t.close()),e})})},UserManager.prototype._signinEnd=function _signinEnd(e){var t=this;return this.processSigninResponse(e).then(function(e){i.Log.debug("UserManager._signinEnd: got signin response");var r=new a.User(e);return t.storeUser(r).then(function(){return i.Log.debug("UserManager._signinEnd: user stored"),t._events.load(r),r})})},UserManager.prototype._signinCallback=function _signinCallback(e,t){return i.Log.debug("UserManager._signinCallback"),t.callback(e)},UserManager.prototype.signoutRedirect=function signoutRedirect(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.post_logout_redirect_uri||this.settings.post_logout_redirect_uri;return t&&(e.post_logout_redirect_uri=t),this._signoutStart(e,this._redirectNavigator).then(function(){i.Log.info("UserManager.signoutRedirect: successful")})},UserManager.prototype.signoutRedirectCallback=function signoutRedirectCallback(e){return this._signoutEnd(e||this._redirectNavigator.url).then(function(e){return i.Log.info("UserManager.signoutRedirectCallback: successful"),e})},UserManager.prototype.signoutPopup=function signoutPopup(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.post_logout_redirect_uri||this.settings.popup_post_logout_redirect_uri||this.settings.post_logout_redirect_uri;return e.post_logout_redirect_uri=t,e.display="popup",e.post_logout_redirect_uri&&(e.state=e.state||{}),this._signout(e,this._popupNavigator,{startUrl:t,popupWindowFeatures:e.popupWindowFeatures||this.settings.popupWindowFeatures,popupWindowTarget:e.popupWindowTarget||this.settings.popupWindowTarget}).then(function(){i.Log.info("UserManager.signinPopup: successful")})},UserManager.prototype.signoutPopupCallback=function signoutPopupCallback(e,t){void 0===t&&"boolean"==typeof e&&(t=e,e=null);return this._popupNavigator.callback(e,t,"?").then(function(){i.Log.info("UserManager.signoutPopupCallback: successful")})},UserManager.prototype._signout=function _signout(e,t){var r=this,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return this._signoutStart(e,t,n).then(function(e){return r._signoutEnd(e.url)})},UserManager.prototype._signoutStart=function _signoutStart(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=this,r=arguments[1],n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:{};return r.prepare(n).then(function(r){return i.Log.debug("UserManager._signoutStart: got navigator window handle"),t._loadUser().then(function(o){return i.Log.debug("UserManager._signoutStart: loaded current user from storage"),(t._settings.revokeAccessTokenOnSignout?t._revokeInternal(o):Promise.resolve()).then(function(){var s=e.id_token_hint||o&&o.id_token;return s&&(i.Log.debug("UserManager._signoutStart: Setting id_token into signout request"),e.id_token_hint=s),t.removeUser().then(function(){return i.Log.debug("UserManager._signoutStart: user removed, creating signout request"),t.createSignoutRequest(e).then(function(e){return i.Log.debug("UserManager._signoutStart: got signout request"),n.url=e.url,e.state&&(n.id=e.state.id),r.navigate(n)})})})}).catch(function(e){throw r.close&&(i.Log.debug("UserManager._signoutStart: Error after preparing navigator, closing navigator window"),r.close()),e})})},UserManager.prototype._signoutEnd=function _signoutEnd(e){return this.processSignoutResponse(e).then(function(e){return i.Log.debug("UserManager._signoutEnd: got signout response"),e})},UserManager.prototype.revokeAccessToken=function revokeAccessToken(){var e=this;return this._loadUser().then(function(t){return e._revokeInternal(t,!0).then(function(r){if(r)return i.Log.debug("UserManager.revokeAccessToken: removing token properties from user and re-storing"),t.access_token=null,t.expires_at=null,t.token_type=null,e.storeUser(t).then(function(){i.Log.debug("UserManager.revokeAccessToken: user stored"),e._events.load(t)})})}).then(function(){i.Log.info("UserManager.revokeAccessToken: access token revoked successfully")})},UserManager.prototype._revokeInternal=function _revokeInternal(e,t){var r=e&&e.access_token;return!r||r.indexOf(".")>=0?(i.Log.debug("UserManager.revokeAccessToken: no need to revoke due to no user, token, or JWT format"),Promise.resolve(!1)):this._tokenRevocationClient.revoke(r,t).then(function(){return!0})},UserManager.prototype.startSilentRenew=function startSilentRenew(){this._silentRenewService.start()},UserManager.prototype.stopSilentRenew=function stopSilentRenew(){this._silentRenewService.stop()},UserManager.prototype._loadUser=function _loadUser(){return this._userStore.get(this._userStoreKey).then(function(e){return e?(i.Log.debug("UserManager._loadUser: user storageString loaded"),a.User.fromStorageString(e)):(i.Log.debug("UserManager._loadUser: no user storageString"),null)})},UserManager.prototype.storeUser=function storeUser(e){if(e){i.Log.debug("UserManager.storeUser: storing user");var t=e.toStorageString();return this._userStore.set(this._userStoreKey,t)}return i.Log.debug("storeUser.storeUser: removing user"),this._userStore.remove(this._userStoreKey)},n(UserManager,[{key:"_redirectNavigator",get:function get(){return this.settings.redirectNavigator}},{key:"_popupNavigator",get:function get(){return this.settings.popupNavigator}},{key:"_iframeNavigator",get:function get(){return this.settings.iframeNavigator}},{key:"_userStore",get:function get(){return this.settings.userStore}},{key:"events",get:function get(){return this._events}},{key:"_userStoreKey",get:function get(){return"user:"+this.settings.authority+":"+this.settings.client_id}}]),UserManager}(o.OidcClient)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.InMemoryWebStorage=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(0);t.InMemoryWebStorage=function(){function InMemoryWebStorage(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,InMemoryWebStorage),this._data={}}return InMemoryWebStorage.prototype.getItem=function getItem(e){return i.Log.debug("InMemoryWebStorage.getItem",e),this._data[e]},InMemoryWebStorage.prototype.setItem=function setItem(e,t){i.Log.debug("InMemoryWebStorage.setItem",e),this._data[e]=t},InMemoryWebStorage.prototype.removeItem=function removeItem(e){i.Log.debug("InMemoryWebStorage.removeItem",e),delete this._data[e]},InMemoryWebStorage.prototype.key=function key(e){return Object.getOwnPropertyNames(this._data)[e]},n(InMemoryWebStorage,[{key:"length",get:function get(){return Object.getOwnPropertyNames(this._data).length}}]),InMemoryWebStorage}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SignoutResponse=void 0;var n=r(2);t.SignoutResponse=function SignoutResponse(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SignoutResponse);var t=n.UrlUtility.parseUrlFragment(e,"?");this.error=t.error,this.error_description=t.error_description,this.error_uri=t.error_uri,this.state=t.state}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SignoutRequest=void 0;var n=r(0),i=r(2),o=r(4);t.SignoutRequest=function SignoutRequest(e){var t=e.url,r=e.id_token_hint,s=e.post_logout_redirect_uri,a=e.data;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SignoutRequest),!t)throw n.Log.error("SignoutRequest.ctor: No url passed"),new Error("url");r&&(t=i.UrlUtility.addQueryParam(t,"id_token_hint",r)),s&&(t=i.UrlUtility.addQueryParam(t,"post_logout_redirect_uri",s),a&&(this.state=new o.State({data:a}),t=i.UrlUtility.addQueryParam(t,"state",this.state.id))),this.url=t}},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SigninResponse=void 0;var n=function(){function defineProperties(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,r){return t&&defineProperties(e.prototype,t),r&&defineProperties(e,r),e}}(),i=r(2);t.SigninResponse=function(){function SigninResponse(e){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SigninResponse);var t=i.UrlUtility.parseUrlFragment(e,"#");this.error=t.error,this.error_description=t.error_description,this.error_uri=t.error_uri,this.state=t.state,this.id_token=t.id_token,this.session_state=t.session_state,this.access_token=t.access_token,this.token_type=t.token_type,this.scope=t.scope,this.profile=void 0;var r=parseInt(t.expires_in);if("number"==typeof r&&r>0){var n=parseInt(Date.now()/1e3);this.expires_at=n+r}}return n(SigninResponse,[{key:"expires_in",get:function get(){if(this.expires_at){var e=parseInt(Date.now()/1e3);return this.expires_at-e}}},{key:"expired",get:function get(){var e=this.expires_in;if(void 0!==e)return e<=0}},{key:"scopes",get:function get(){return(this.scope||"").split(" ")}},{key:"isOpenIdConnect",get:function get(){return this.scopes.indexOf("openid")>=0||!!this.id_token}}]),SigninResponse}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.SigninRequest=void 0;var n=r(0),i=r(2),o=r(15);t.SigninRequest=function(){function SigninRequest(e){var t=e.url,r=e.client_id,s=e.redirect_uri,a=e.response_type,u=e.scope,c=e.authority,h=e.data,l=e.prompt,f=e.display,g=e.max_age,p=e.ui_locales,d=e.id_token_hint,v=e.login_hint,y=e.acr_values,m=e.resource,S=e.request,b=e.request_uri,F=e.extraQueryParams;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,SigninRequest),!t)throw n.Log.error("SigninRequest.ctor: No url passed"),new Error("url");if(!r)throw n.Log.error("SigninRequest.ctor: No client_id passed"),new Error("client_id");if(!s)throw n.Log.error("SigninRequest.ctor: No redirect_uri passed"),new Error("redirect_uri");if(!a)throw n.Log.error("SigninRequest.ctor: No response_type passed"),new Error("response_type");if(!u)throw n.Log.error("SigninRequest.ctor: No scope passed"),new Error("scope");if(!c)throw n.Log.error("SigninRequest.ctor: No authority passed"),new Error("authority");var _=SigninRequest.isOidc(a);this.state=new o.SigninState({nonce:_,data:h,client_id:r,authority:c}),t=i.UrlUtility.addQueryParam(t,"client_id",r),t=i.UrlUtility.addQueryParam(t,"redirect_uri",s),t=i.UrlUtility.addQueryParam(t,"response_type",a),t=i.UrlUtility.addQueryParam(t,"scope",u),t=i.UrlUtility.addQueryParam(t,"state",this.state.id),_&&(t=i.UrlUtility.addQueryParam(t,"nonce",this.state.nonce));var w={prompt:l,display:f,max_age:g,ui_locales:p,id_token_hint:d,login_hint:v,acr_values:y,resource:m,request:S,request_uri:b};for(var E in w)w[E]&&(t=i.UrlUtility.addQueryParam(t,E,w[E]));for(var x in F)t=i.UrlUtility.addQueryParam(t,x,F[x]);this.url=t}return SigninRequest.isOidc=function isOidc(e){return!!e.split(/\s+/g).filter(function(e){return"id_token"===e})[0]},SigninRequest.isOAuth=function isOAuth(e){return!!e.split(/\s+/g).filter(function(e){return"token"===e})[0]},SigninRequest}()},function(e,t){var r={}.toString;e.exports=Array.isArray||function(e){return"[object Array]"==r.call(e)}},function(e,t){t.read=function(e,t,r,n,i){var o,s,a=8*i-n-1,u=(1<<a)-1,c=u>>1,h=-7,l=r?i-1:0,f=r?-1:1,g=e[t+l];for(l+=f,o=g&(1<<-h)-1,g>>=-h,h+=a;h>0;o=256*o+e[t+l],l+=f,h-=8);for(s=o&(1<<-h)-1,o>>=-h,h+=n;h>0;s=256*s+e[t+l],l+=f,h-=8);if(0===o)o=1-c;else{if(o===u)return s?NaN:1/0*(g?-1:1);s+=Math.pow(2,n),o-=c}return(g?-1:1)*s*Math.pow(2,o-n)},t.write=function(e,t,r,n,i,o){var s,a,u,c=8*o-i-1,h=(1<<c)-1,l=h>>1,f=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,g=n?0:o-1,p=n?1:-1,d=t<0||0===t&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(a=isNaN(t)?1:0,s=h):(s=Math.floor(Math.log(t)/Math.LN2),t*(u=Math.pow(2,-s))<1&&(s--,u*=2),(t+=s+l>=1?f/u:f*Math.pow(2,1-l))*u>=2&&(s++,u/=2),s+l>=h?(a=0,s=h):s+l>=1?(a=(t*u-1)*Math.pow(2,i),s+=l):(a=t*Math.pow(2,l-1)*Math.pow(2,i),s=0));i>=8;e[r+g]=255&a,g+=p,a/=256,i-=8);for(s=s<<i|a,c+=i;c>0;e[r+g]=255&s,g+=p,s/=256,c-=8);e[r+g-p]|=128*d}},function(e,t,r){"use strict";t.byteLength=function byteLength(e){var t=getLens(e),r=t[0],n=t[1];return 3*(r+n)/4-n},t.toByteArray=function toByteArray(e){for(var t,r=getLens(e),n=r[0],s=r[1],a=new o(function _byteLength(e,t,r){return 3*(t+r)/4-r}(0,n,s)),u=0,c=s>0?n-4:n,h=0;h<c;h+=4)t=i[e.charCodeAt(h)]<<18|i[e.charCodeAt(h+1)]<<12|i[e.charCodeAt(h+2)]<<6|i[e.charCodeAt(h+3)],a[u++]=t>>16&255,a[u++]=t>>8&255,a[u++]=255&t;2===s&&(t=i[e.charCodeAt(h)]<<2|i[e.charCodeAt(h+1)]>>4,a[u++]=255&t);1===s&&(t=i[e.charCodeAt(h)]<<10|i[e.charCodeAt(h+1)]<<4|i[e.charCodeAt(h+2)]>>2,a[u++]=t>>8&255,a[u++]=255&t);return a},t.fromByteArray=function fromByteArray(e){for(var t,r=e.length,i=r%3,o=[],s=0,a=r-i;s<a;s+=16383)o.push(encodeChunk(e,s,s+16383>a?a:s+16383));1===i?(t=e[r-1],o.push(n[t>>2]+n[t<<4&63]+"==")):2===i&&(t=(e[r-2]<<8)+e[r-1],o.push(n[t>>10]+n[t>>4&63]+n[t<<2&63]+"="));return o.join("")};for(var n=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=0,u=s.length;a<u;++a)n[a]=s[a],i[s.charCodeAt(a)]=a;function getLens(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");return-1===r&&(r=t),[r,r===t?0:4-r%4]}function tripletToBase64(e){return n[e>>18&63]+n[e>>12&63]+n[e>>6&63]+n[63&e]}function encodeChunk(e,t,r){for(var n,i=[],o=t;o<r;o+=3)n=(e[o]<<16&16711680)+(e[o+1]<<8&65280)+(255&e[o+2]),i.push(tripletToBase64(n));return i.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},function(e,t){var r;r=function(){return this}();try{r=r||Function("return this")()||(0,eval)("this")}catch(e){"object"==typeof window&&(r=window)}e.exports=r},function(e,t,r){"use strict";(function(e){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
var n=r(38),i=r(37),o=r(36);function kMaxLength(){return Buffer.TYPED_ARRAY_SUPPORT?2147483647:1073741823}function createBuffer(e,t){if(kMaxLength()<t)throw new RangeError("Invalid typed array length");return Buffer.TYPED_ARRAY_SUPPORT?(e=new Uint8Array(t)).__proto__=Buffer.prototype:(null===e&&(e=new Buffer(t)),e.length=t),e}function Buffer(e,t,r){if(!(Buffer.TYPED_ARRAY_SUPPORT||this instanceof Buffer))return new Buffer(e,t,r);if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string");return allocUnsafe(this,e)}return from(this,e,t,r)}function from(e,t,r,n){if("number"==typeof t)throw new TypeError('"value" argument must not be a number');return"undefined"!=typeof ArrayBuffer&&t instanceof ArrayBuffer?function fromArrayBuffer(e,t,r,n){if(t.byteLength,r<0||t.byteLength<r)throw new RangeError("'offset' is out of bounds");if(t.byteLength<r+(n||0))throw new RangeError("'length' is out of bounds");t=void 0===r&&void 0===n?new Uint8Array(t):void 0===n?new Uint8Array(t,r):new Uint8Array(t,r,n);Buffer.TYPED_ARRAY_SUPPORT?(e=t).__proto__=Buffer.prototype:e=fromArrayLike(e,t);return e}(e,t,r,n):"string"==typeof t?function fromString(e,t,r){"string"==typeof r&&""!==r||(r="utf8");if(!Buffer.isEncoding(r))throw new TypeError('"encoding" must be a valid string encoding');var n=0|byteLength(t,r),i=(e=createBuffer(e,n)).write(t,r);i!==n&&(e=e.slice(0,i));return e}(e,t,r):function fromObject(e,t){if(Buffer.isBuffer(t)){var r=0|checked(t.length);return 0===(e=createBuffer(e,r)).length?e:(t.copy(e,0,0,r),e)}if(t){if("undefined"!=typeof ArrayBuffer&&t.buffer instanceof ArrayBuffer||"length"in t)return"number"!=typeof t.length||function isnan(e){return e!=e}(t.length)?createBuffer(e,0):fromArrayLike(e,t);if("Buffer"===t.type&&o(t.data))return fromArrayLike(e,t.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e,t)}function assertSize(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number');if(e<0)throw new RangeError('"size" argument must not be negative')}function allocUnsafe(e,t){if(assertSize(t),e=createBuffer(e,t<0?0:0|checked(t)),!Buffer.TYPED_ARRAY_SUPPORT)for(var r=0;r<t;++r)e[r]=0;return e}function fromArrayLike(e,t){var r=t.length<0?0:0|checked(t.length);e=createBuffer(e,r);for(var n=0;n<r;n+=1)e[n]=255&t[n];return e}function checked(e){if(e>=kMaxLength())throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+kMaxLength().toString(16)+" bytes");return 0|e}function byteLength(e,t){if(Buffer.isBuffer(e))return e.length;if("undefined"!=typeof ArrayBuffer&&"function"==typeof ArrayBuffer.isView&&(ArrayBuffer.isView(e)||e instanceof ArrayBuffer))return e.byteLength;"string"!=typeof e&&(e=""+e);var r=e.length;if(0===r)return 0;for(var n=!1;;)switch(t){case"ascii":case"latin1":case"binary":return r;case"utf8":case"utf-8":case void 0:return utf8ToBytes(e).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*r;case"hex":return r>>>1;case"base64":return base64ToBytes(e).length;default:if(n)return utf8ToBytes(e).length;t=(""+t).toLowerCase(),n=!0}}function swap(e,t,r){var n=e[t];e[t]=e[r],e[r]=n}function bidirectionalIndexOf(e,t,r,n,i){if(0===e.length)return-1;if("string"==typeof r?(n=r,r=0):r>2147483647?r=2147483647:r<-2147483648&&(r=-2147483648),r=+r,isNaN(r)&&(r=i?0:e.length-1),r<0&&(r=e.length+r),r>=e.length){if(i)return-1;r=e.length-1}else if(r<0){if(!i)return-1;r=0}if("string"==typeof t&&(t=Buffer.from(t,n)),Buffer.isBuffer(t))return 0===t.length?-1:arrayIndexOf(e,t,r,n,i);if("number"==typeof t)return t&=255,Buffer.TYPED_ARRAY_SUPPORT&&"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,r):Uint8Array.prototype.lastIndexOf.call(e,t,r):arrayIndexOf(e,[t],r,n,i);throw new TypeError("val must be string, number or Buffer")}function arrayIndexOf(e,t,r,n,i){var o,s=1,a=e.length,u=t.length;if(void 0!==n&&("ucs2"===(n=String(n).toLowerCase())||"ucs-2"===n||"utf16le"===n||"utf-16le"===n)){if(e.length<2||t.length<2)return-1;s=2,a/=2,u/=2,r/=2}function read(e,t){return 1===s?e[t]:e.readUInt16BE(t*s)}if(i){var c=-1;for(o=r;o<a;o++)if(read(e,o)===read(t,-1===c?0:o-c)){if(-1===c&&(c=o),o-c+1===u)return c*s}else-1!==c&&(o-=o-c),c=-1}else for(r+u>a&&(r=a-u),o=r;o>=0;o--){for(var h=!0,l=0;l<u;l++)if(read(e,o+l)!==read(t,l)){h=!1;break}if(h)return o}return-1}function hexWrite(e,t,r,n){r=Number(r)||0;var i=e.length-r;n?(n=Number(n))>i&&(n=i):n=i;var o=t.length;if(o%2!=0)throw new TypeError("Invalid hex string");n>o/2&&(n=o/2);for(var s=0;s<n;++s){var a=parseInt(t.substr(2*s,2),16);if(isNaN(a))return s;e[r+s]=a}return s}function utf8Write(e,t,r,n){return blitBuffer(utf8ToBytes(t,e.length-r),e,r,n)}function asciiWrite(e,t,r,n){return blitBuffer(function asciiToBytes(e){for(var t=[],r=0;r<e.length;++r)t.push(255&e.charCodeAt(r));return t}(t),e,r,n)}function latin1Write(e,t,r,n){return asciiWrite(e,t,r,n)}function base64Write(e,t,r,n){return blitBuffer(base64ToBytes(t),e,r,n)}function ucs2Write(e,t,r,n){return blitBuffer(function utf16leToBytes(e,t){for(var r,n,i,o=[],s=0;s<e.length&&!((t-=2)<0);++s)r=e.charCodeAt(s),n=r>>8,i=r%256,o.push(i),o.push(n);return o}(t,e.length-r),e,r,n)}function base64Slice(e,t,r){return 0===t&&r===e.length?n.fromByteArray(e):n.fromByteArray(e.slice(t,r))}function utf8Slice(e,t,r){r=Math.min(e.length,r);for(var n=[],i=t;i<r;){var o,a,u,c,h=e[i],l=null,f=h>239?4:h>223?3:h>191?2:1;if(i+f<=r)switch(f){case 1:h<128&&(l=h);break;case 2:128==(192&(o=e[i+1]))&&(c=(31&h)<<6|63&o)>127&&(l=c);break;case 3:o=e[i+1],a=e[i+2],128==(192&o)&&128==(192&a)&&(c=(15&h)<<12|(63&o)<<6|63&a)>2047&&(c<55296||c>57343)&&(l=c);break;case 4:o=e[i+1],a=e[i+2],u=e[i+3],128==(192&o)&&128==(192&a)&&128==(192&u)&&(c=(15&h)<<18|(63&o)<<12|(63&a)<<6|63&u)>65535&&c<1114112&&(l=c)}null===l?(l=65533,f=1):l>65535&&(l-=65536,n.push(l>>>10&1023|55296),l=56320|1023&l),n.push(l),i+=f}return function decodeCodePointsArray(e){var t=e.length;if(t<=s)return String.fromCharCode.apply(String,e);var r="",n=0;for(;n<t;)r+=String.fromCharCode.apply(String,e.slice(n,n+=s));return r}(n)}t.Buffer=Buffer,t.SlowBuffer=function SlowBuffer(e){+e!=e&&(e=0);return Buffer.alloc(+e)},t.INSPECT_MAX_BYTES=50,Buffer.TYPED_ARRAY_SUPPORT=void 0!==e.TYPED_ARRAY_SUPPORT?e.TYPED_ARRAY_SUPPORT:function typedArraySupport(){try{var e=new Uint8Array(1);return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()&&"function"==typeof e.subarray&&0===e.subarray(1,1).byteLength}catch(e){return!1}}(),t.kMaxLength=kMaxLength(),Buffer.poolSize=8192,Buffer._augment=function(e){return e.__proto__=Buffer.prototype,e},Buffer.from=function(e,t,r){return from(null,e,t,r)},Buffer.TYPED_ARRAY_SUPPORT&&(Buffer.prototype.__proto__=Uint8Array.prototype,Buffer.__proto__=Uint8Array,"undefined"!=typeof Symbol&&Symbol.species&&Buffer[Symbol.species]===Buffer&&Object.defineProperty(Buffer,Symbol.species,{value:null,configurable:!0})),Buffer.alloc=function(e,t,r){return function alloc(e,t,r,n){return assertSize(t),t<=0?createBuffer(e,t):void 0!==r?"string"==typeof n?createBuffer(e,t).fill(r,n):createBuffer(e,t).fill(r):createBuffer(e,t)}(null,e,t,r)},Buffer.allocUnsafe=function(e){return allocUnsafe(null,e)},Buffer.allocUnsafeSlow=function(e){return allocUnsafe(null,e)},Buffer.isBuffer=function isBuffer(e){return!(null==e||!e._isBuffer)},Buffer.compare=function compare(e,t){if(!Buffer.isBuffer(e)||!Buffer.isBuffer(t))throw new TypeError("Arguments must be Buffers");if(e===t)return 0;for(var r=e.length,n=t.length,i=0,o=Math.min(r,n);i<o;++i)if(e[i]!==t[i]){r=e[i],n=t[i];break}return r<n?-1:n<r?1:0},Buffer.isEncoding=function isEncoding(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},Buffer.concat=function concat(e,t){if(!o(e))throw new TypeError('"list" argument must be an Array of Buffers');if(0===e.length)return Buffer.alloc(0);var r;if(void 0===t)for(t=0,r=0;r<e.length;++r)t+=e[r].length;var n=Buffer.allocUnsafe(t),i=0;for(r=0;r<e.length;++r){var s=e[r];if(!Buffer.isBuffer(s))throw new TypeError('"list" argument must be an Array of Buffers');s.copy(n,i),i+=s.length}return n},Buffer.byteLength=byteLength,Buffer.prototype._isBuffer=!0,Buffer.prototype.swap16=function swap16(){var e=this.length;if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(var t=0;t<e;t+=2)swap(this,t,t+1);return this},Buffer.prototype.swap32=function swap32(){var e=this.length;if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(var t=0;t<e;t+=4)swap(this,t,t+3),swap(this,t+1,t+2);return this},Buffer.prototype.swap64=function swap64(){var e=this.length;if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(var t=0;t<e;t+=8)swap(this,t,t+7),swap(this,t+1,t+6),swap(this,t+2,t+5),swap(this,t+3,t+4);return this},Buffer.prototype.toString=function toString(){var e=0|this.length;return 0===e?"":0===arguments.length?utf8Slice(this,0,e):function slowToString(e,t,r){var n=!1;if((void 0===t||t<0)&&(t=0),t>this.length)return"";if((void 0===r||r>this.length)&&(r=this.length),r<=0)return"";if((r>>>=0)<=(t>>>=0))return"";for(e||(e="utf8");;)switch(e){case"hex":return hexSlice(this,t,r);case"utf8":case"utf-8":return utf8Slice(this,t,r);case"ascii":return asciiSlice(this,t,r);case"latin1":case"binary":return latin1Slice(this,t,r);case"base64":return base64Slice(this,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return utf16leSlice(this,t,r);default:if(n)throw new TypeError("Unknown encoding: "+e);e=(e+"").toLowerCase(),n=!0}}.apply(this,arguments)},Buffer.prototype.equals=function equals(e){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e||0===Buffer.compare(this,e)},Buffer.prototype.inspect=function inspect(){var e="",r=t.INSPECT_MAX_BYTES;return this.length>0&&(e=this.toString("hex",0,r).match(/.{2}/g).join(" "),this.length>r&&(e+=" ... ")),"<Buffer "+e+">"},Buffer.prototype.compare=function compare(e,t,r,n,i){if(!Buffer.isBuffer(e))throw new TypeError("Argument must be a Buffer");if(void 0===t&&(t=0),void 0===r&&(r=e?e.length:0),void 0===n&&(n=0),void 0===i&&(i=this.length),t<0||r>e.length||n<0||i>this.length)throw new RangeError("out of range index");if(n>=i&&t>=r)return 0;if(n>=i)return-1;if(t>=r)return 1;if(t>>>=0,r>>>=0,n>>>=0,i>>>=0,this===e)return 0;for(var o=i-n,s=r-t,a=Math.min(o,s),u=this.slice(n,i),c=e.slice(t,r),h=0;h<a;++h)if(u[h]!==c[h]){o=u[h],s=c[h];break}return o<s?-1:s<o?1:0},Buffer.prototype.includes=function includes(e,t,r){return-1!==this.indexOf(e,t,r)},Buffer.prototype.indexOf=function indexOf(e,t,r){return bidirectionalIndexOf(this,e,t,r,!0)},Buffer.prototype.lastIndexOf=function lastIndexOf(e,t,r){return bidirectionalIndexOf(this,e,t,r,!1)},Buffer.prototype.write=function write(e,t,r,n){if(void 0===t)n="utf8",r=this.length,t=0;else if(void 0===r&&"string"==typeof t)n=t,r=this.length,t=0;else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");t|=0,isFinite(r)?(r|=0,void 0===n&&(n="utf8")):(n=r,r=void 0)}var i=this.length-t;if((void 0===r||r>i)&&(r=i),e.length>0&&(r<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");n||(n="utf8");for(var o=!1;;)switch(n){case"hex":return hexWrite(this,e,t,r);case"utf8":case"utf-8":return utf8Write(this,e,t,r);case"ascii":return asciiWrite(this,e,t,r);case"latin1":case"binary":return latin1Write(this,e,t,r);case"base64":return base64Write(this,e,t,r);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return ucs2Write(this,e,t,r);default:if(o)throw new TypeError("Unknown encoding: "+n);n=(""+n).toLowerCase(),o=!0}},Buffer.prototype.toJSON=function toJSON(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};var s=4096;function asciiSlice(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(127&e[i]);return n}function latin1Slice(e,t,r){var n="";r=Math.min(e.length,r);for(var i=t;i<r;++i)n+=String.fromCharCode(e[i]);return n}function hexSlice(e,t,r){var n=e.length;(!t||t<0)&&(t=0),(!r||r<0||r>n)&&(r=n);for(var i="",o=t;o<r;++o)i+=toHex(e[o]);return i}function utf16leSlice(e,t,r){for(var n=e.slice(t,r),i="",o=0;o<n.length;o+=2)i+=String.fromCharCode(n[o]+256*n[o+1]);return i}function checkOffset(e,t,r){if(e%1!=0||e<0)throw new RangeError("offset is not uint");if(e+t>r)throw new RangeError("Trying to access beyond buffer length")}function checkInt(e,t,r,n,i,o){if(!Buffer.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance');if(t>i||t<o)throw new RangeError('"value" argument is out of bounds');if(r+n>e.length)throw new RangeError("Index out of range")}function objectWriteUInt16(e,t,r,n){t<0&&(t=65535+t+1);for(var i=0,o=Math.min(e.length-r,2);i<o;++i)e[r+i]=(t&255<<8*(n?i:1-i))>>>8*(n?i:1-i)}function objectWriteUInt32(e,t,r,n){t<0&&(t=4294967295+t+1);for(var i=0,o=Math.min(e.length-r,4);i<o;++i)e[r+i]=t>>>8*(n?i:3-i)&255}function checkIEEE754(e,t,r,n,i,o){if(r+n>e.length)throw new RangeError("Index out of range");if(r<0)throw new RangeError("Index out of range")}function writeFloat(e,t,r,n,o){return o||checkIEEE754(e,0,r,4),i.write(e,t,r,n,23,4),r+4}function writeDouble(e,t,r,n,o){return o||checkIEEE754(e,0,r,8),i.write(e,t,r,n,52,8),r+8}Buffer.prototype.slice=function slice(e,t){var r,n=this.length;if(e=~~e,t=void 0===t?n:~~t,e<0?(e+=n)<0&&(e=0):e>n&&(e=n),t<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e),Buffer.TYPED_ARRAY_SUPPORT)(r=this.subarray(e,t)).__proto__=Buffer.prototype;else{var i=t-e;r=new Buffer(i,void 0);for(var o=0;o<i;++o)r[o]=this[o+e]}return r},Buffer.prototype.readUIntLE=function readUIntLE(e,t,r){e|=0,t|=0,r||checkOffset(e,t,this.length);for(var n=this[e],i=1,o=0;++o<t&&(i*=256);)n+=this[e+o]*i;return n},Buffer.prototype.readUIntBE=function readUIntBE(e,t,r){e|=0,t|=0,r||checkOffset(e,t,this.length);for(var n=this[e+--t],i=1;t>0&&(i*=256);)n+=this[e+--t]*i;return n},Buffer.prototype.readUInt8=function readUInt8(e,t){return t||checkOffset(e,1,this.length),this[e]},Buffer.prototype.readUInt16LE=function readUInt16LE(e,t){return t||checkOffset(e,2,this.length),this[e]|this[e+1]<<8},Buffer.prototype.readUInt16BE=function readUInt16BE(e,t){return t||checkOffset(e,2,this.length),this[e]<<8|this[e+1]},Buffer.prototype.readUInt32LE=function readUInt32LE(e,t){return t||checkOffset(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},Buffer.prototype.readUInt32BE=function readUInt32BE(e,t){return t||checkOffset(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},Buffer.prototype.readIntLE=function readIntLE(e,t,r){e|=0,t|=0,r||checkOffset(e,t,this.length);for(var n=this[e],i=1,o=0;++o<t&&(i*=256);)n+=this[e+o]*i;return n>=(i*=128)&&(n-=Math.pow(2,8*t)),n},Buffer.prototype.readIntBE=function readIntBE(e,t,r){e|=0,t|=0,r||checkOffset(e,t,this.length);for(var n=t,i=1,o=this[e+--n];n>0&&(i*=256);)o+=this[e+--n]*i;return o>=(i*=128)&&(o-=Math.pow(2,8*t)),o},Buffer.prototype.readInt8=function readInt8(e,t){return t||checkOffset(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},Buffer.prototype.readInt16LE=function readInt16LE(e,t){t||checkOffset(e,2,this.length);var r=this[e]|this[e+1]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt16BE=function readInt16BE(e,t){t||checkOffset(e,2,this.length);var r=this[e+1]|this[e]<<8;return 32768&r?4294901760|r:r},Buffer.prototype.readInt32LE=function readInt32LE(e,t){return t||checkOffset(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},Buffer.prototype.readInt32BE=function readInt32BE(e,t){return t||checkOffset(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},Buffer.prototype.readFloatLE=function readFloatLE(e,t){return t||checkOffset(e,4,this.length),i.read(this,e,!0,23,4)},Buffer.prototype.readFloatBE=function readFloatBE(e,t){return t||checkOffset(e,4,this.length),i.read(this,e,!1,23,4)},Buffer.prototype.readDoubleLE=function readDoubleLE(e,t){return t||checkOffset(e,8,this.length),i.read(this,e,!0,52,8)},Buffer.prototype.readDoubleBE=function readDoubleBE(e,t){return t||checkOffset(e,8,this.length),i.read(this,e,!1,52,8)},Buffer.prototype.writeUIntLE=function writeUIntLE(e,t,r,n){(e=+e,t|=0,r|=0,n)||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var i=1,o=0;for(this[t]=255&e;++o<r&&(i*=256);)this[t+o]=e/i&255;return t+r},Buffer.prototype.writeUIntBE=function writeUIntBE(e,t,r,n){(e=+e,t|=0,r|=0,n)||checkInt(this,e,t,r,Math.pow(2,8*r)-1,0);var i=r-1,o=1;for(this[t+i]=255&e;--i>=0&&(o*=256);)this[t+i]=e/o&255;return t+r},Buffer.prototype.writeUInt8=function writeUInt8(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,1,255,0),Buffer.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),this[t]=255&e,t+1},Buffer.prototype.writeUInt16LE=function writeUInt16LE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):objectWriteUInt16(this,e,t,!0),t+2},Buffer.prototype.writeUInt16BE=function writeUInt16BE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,2,65535,0),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):objectWriteUInt16(this,e,t,!1),t+2},Buffer.prototype.writeUInt32LE=function writeUInt32LE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e):objectWriteUInt32(this,e,t,!0),t+4},Buffer.prototype.writeUInt32BE=function writeUInt32BE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,4,4294967295,0),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):objectWriteUInt32(this,e,t,!1),t+4},Buffer.prototype.writeIntLE=function writeIntLE(e,t,r,n){if(e=+e,t|=0,!n){var i=Math.pow(2,8*r-1);checkInt(this,e,t,r,i-1,-i)}var o=0,s=1,a=0;for(this[t]=255&e;++o<r&&(s*=256);)e<0&&0===a&&0!==this[t+o-1]&&(a=1),this[t+o]=(e/s>>0)-a&255;return t+r},Buffer.prototype.writeIntBE=function writeIntBE(e,t,r,n){if(e=+e,t|=0,!n){var i=Math.pow(2,8*r-1);checkInt(this,e,t,r,i-1,-i)}var o=r-1,s=1,a=0;for(this[t+o]=255&e;--o>=0&&(s*=256);)e<0&&0===a&&0!==this[t+o+1]&&(a=1),this[t+o]=(e/s>>0)-a&255;return t+r},Buffer.prototype.writeInt8=function writeInt8(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,1,127,-128),Buffer.TYPED_ARRAY_SUPPORT||(e=Math.floor(e)),e<0&&(e=255+e+1),this[t]=255&e,t+1},Buffer.prototype.writeInt16LE=function writeInt16LE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8):objectWriteUInt16(this,e,t,!0),t+2},Buffer.prototype.writeInt16BE=function writeInt16BE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,2,32767,-32768),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=e>>>8,this[t+1]=255&e):objectWriteUInt16(this,e,t,!1),t+2},Buffer.prototype.writeInt32LE=function writeInt32LE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,4,2147483647,-2147483648),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24):objectWriteUInt32(this,e,t,!0),t+4},Buffer.prototype.writeInt32BE=function writeInt32BE(e,t,r){return e=+e,t|=0,r||checkInt(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),Buffer.TYPED_ARRAY_SUPPORT?(this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e):objectWriteUInt32(this,e,t,!1),t+4},Buffer.prototype.writeFloatLE=function writeFloatLE(e,t,r){return writeFloat(this,e,t,!0,r)},Buffer.prototype.writeFloatBE=function writeFloatBE(e,t,r){return writeFloat(this,e,t,!1,r)},Buffer.prototype.writeDoubleLE=function writeDoubleLE(e,t,r){return writeDouble(this,e,t,!0,r)},Buffer.prototype.writeDoubleBE=function writeDoubleBE(e,t,r){return writeDouble(this,e,t,!1,r)},Buffer.prototype.copy=function copy(e,t,r,n){if(r||(r=0),n||0===n||(n=this.length),t>=e.length&&(t=e.length),t||(t=0),n>0&&n<r&&(n=r),n===r)return 0;if(0===e.length||0===this.length)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(r<0||r>=this.length)throw new RangeError("sourceStart out of bounds");if(n<0)throw new RangeError("sourceEnd out of bounds");n>this.length&&(n=this.length),e.length-t<n-r&&(n=e.length-t+r);var i,o=n-r;if(this===e&&r<t&&t<n)for(i=o-1;i>=0;--i)e[i+t]=this[i+r];else if(o<1e3||!Buffer.TYPED_ARRAY_SUPPORT)for(i=0;i<o;++i)e[i+t]=this[i+r];else Uint8Array.prototype.set.call(e,this.subarray(r,r+o),t);return o},Buffer.prototype.fill=function fill(e,t,r,n){if("string"==typeof e){if("string"==typeof t?(n=t,t=0,r=this.length):"string"==typeof r&&(n=r,r=this.length),1===e.length){var i=e.charCodeAt(0);i<256&&(e=i)}if(void 0!==n&&"string"!=typeof n)throw new TypeError("encoding must be a string");if("string"==typeof n&&!Buffer.isEncoding(n))throw new TypeError("Unknown encoding: "+n)}else"number"==typeof e&&(e&=255);if(t<0||this.length<t||this.length<r)throw new RangeError("Out of range index");if(r<=t)return this;var o;if(t>>>=0,r=void 0===r?this.length:r>>>0,e||(e=0),"number"==typeof e)for(o=t;o<r;++o)this[o]=e;else{var s=Buffer.isBuffer(e)?e:utf8ToBytes(new Buffer(e,n).toString()),a=s.length;for(o=0;o<r-t;++o)this[o+t]=s[o%a]}return this};var a=/[^+\/0-9A-Za-z-_]/g;function toHex(e){return e<16?"0"+e.toString(16):e.toString(16)}function utf8ToBytes(e,t){var r;t=t||1/0;for(var n=e.length,i=null,o=[],s=0;s<n;++s){if((r=e.charCodeAt(s))>55295&&r<57344){if(!i){if(r>56319){(t-=3)>-1&&o.push(239,191,189);continue}if(s+1===n){(t-=3)>-1&&o.push(239,191,189);continue}i=r;continue}if(r<56320){(t-=3)>-1&&o.push(239,191,189),i=r;continue}r=65536+(i-55296<<10|r-56320)}else i&&(t-=3)>-1&&o.push(239,191,189);if(i=null,r<128){if((t-=1)<0)break;o.push(r)}else if(r<2048){if((t-=2)<0)break;o.push(r>>6|192,63&r|128)}else if(r<65536){if((t-=3)<0)break;o.push(r>>12|224,r>>6&63|128,63&r|128)}else{if(!(r<1114112))throw new Error("Invalid code point");if((t-=4)<0)break;o.push(r>>18|240,r>>12&63|128,r>>6&63|128,63&r|128)}}return o}function base64ToBytes(e){return n.toByteArray(function base64clean(e){if((e=function stringtrim(e){return e.trim?e.trim():e.replace(/^\s+|\s+$/g,"")}(e).replace(a,"")).length<2)return"";for(;e.length%4!=0;)e+="=";return e}(e))}function blitBuffer(e,t,r,n){for(var i=0;i<n&&!(i+r>=t.length||i>=e.length);++i)t[i+r]=e[i];return i}}).call(this,r(39))},function(e,t,r){"use strict";(function(n){var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},u={userAgent:!1},p={};
/*!
Copyright (c) 2011, Yahoo! Inc. All rights reserved.
Code licensed under the BSD License:
http://developer.yahoo.com/yui/license.html
version: 2.9.0
*/
if(void 0===v)var v={};v.lang={extend:function extend(t,r,n){if(!r||!t)throw new Error("YAHOO.lang.extend failed, please check that all dependencies are included.");var i=function d(){};if(i.prototype=r.prototype,t.prototype=new i,t.prototype.constructor=t,t.superclass=r.prototype,r.prototype.constructor==Object.prototype.constructor&&(r.prototype.constructor=r),n){var o;for(o in n)t.prototype[o]=n[o];var s=function e(){},a=["toString","valueOf"];try{/MSIE/.test(u.userAgent)&&(s=function e(t,r){for(o=0;o<a.length;o+=1){var n=a[o],i=r[n];"function"==typeof i&&i!=Object.prototype[n]&&(t[n]=i)}})}catch(e){}s(t.prototype,n)}}};
/*! CryptoJS v3.1.2 core-fix.js
 * code.google.com/p/crypto-js
 * (c) 2009-2013 by Jeff Mott. All rights reserved.
 * code.google.com/p/crypto-js/wiki/License
 * THIS IS FIX of 'core.js' to fix Hmac issue.
 * https://code.google.com/p/crypto-js/issues/detail?id=84
 * https://crypto-js.googlecode.com/svn-history/r667/branches/3.x/src/core.js
 */
var y=y||function(e,t){var r={},n=r.lib={},i=n.Base=function(){function n(){}return{extend:function extend(e){n.prototype=this;var t=new n;return e&&t.mixIn(e),t.hasOwnProperty("init")||(t.init=function(){t.$super.init.apply(this,arguments)}),t.init.prototype=t,t.$super=this,t},create:function create(){var e=this.extend();return e.init.apply(e,arguments),e},init:function init(){},mixIn:function mixIn(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t]);e.hasOwnProperty("toString")&&(this.toString=e.toString)},clone:function clone(){return this.init.prototype.extend(this)}}}(),o=n.WordArray=i.extend({init:function init(e,t){e=this.words=e||[],this.sigBytes=void 0!=t?t:4*e.length},toString:function toString(e){return(e||a).stringify(this)},concat:function concat(e){var t=this.words,r=e.words,n=this.sigBytes,i=e.sigBytes;if(this.clamp(),n%4)for(var o=0;o<i;o++){var s=r[o>>>2]>>>24-o%4*8&255;t[n+o>>>2]|=s<<24-(n+o)%4*8}else for(o=0;o<i;o+=4)t[n+o>>>2]=r[o>>>2];return this.sigBytes+=i,this},clamp:function clamp(){var t=this.words,r=this.sigBytes;t[r>>>2]&=4294967295<<32-r%4*8,t.length=e.ceil(r/4)},clone:function clone(){var e=i.clone.call(this);return e.words=this.words.slice(0),e},random:function random(t){for(var r=[],n=0;n<t;n+=4)r.push(4294967296*e.random()|0);return new o.init(r,t)}}),s=r.enc={},a=s.Hex={stringify:function stringify(e){for(var t=e.words,r=e.sigBytes,n=[],i=0;i<r;i++){var o=t[i>>>2]>>>24-i%4*8&255;n.push((o>>>4).toString(16)),n.push((15&o).toString(16))}return n.join("")},parse:function parse(e){for(var t=e.length,r=[],n=0;n<t;n+=2)r[n>>>3]|=parseInt(e.substr(n,2),16)<<24-n%8*4;return new o.init(r,t/2)}},u=s.Latin1={stringify:function stringify(e){for(var t=e.words,r=e.sigBytes,n=[],i=0;i<r;i++){var o=t[i>>>2]>>>24-i%4*8&255;n.push(String.fromCharCode(o))}return n.join("")},parse:function parse(e){for(var t=e.length,r=[],n=0;n<t;n++)r[n>>>2]|=(255&e.charCodeAt(n))<<24-n%4*8;return new o.init(r,t)}},c=s.Utf8={stringify:function stringify(e){try{return decodeURIComponent(escape(u.stringify(e)))}catch(e){throw new Error("Malformed UTF-8 data")}},parse:function parse(e){return u.parse(unescape(encodeURIComponent(e)))}},h=n.BufferedBlockAlgorithm=i.extend({reset:function reset(){this._data=new o.init,this._nDataBytes=0},_append:function _append(e){"string"==typeof e&&(e=c.parse(e)),this._data.concat(e),this._nDataBytes+=e.sigBytes},_process:function _process(t){var r=this._data,n=r.words,i=r.sigBytes,s=this.blockSize,a=i/(4*s),u=(a=t?e.ceil(a):e.max((0|a)-this._minBufferSize,0))*s,c=e.min(4*u,i);if(u){for(var h=0;h<u;h+=s)this._doProcessBlock(n,h);var l=n.splice(0,u);r.sigBytes-=c}return new o.init(l,c)},clone:function clone(){var e=i.clone.call(this);return e._data=this._data.clone(),e},_minBufferSize:0}),l=(n.Hasher=h.extend({cfg:i.extend(),init:function init(e){this.cfg=this.cfg.extend(e),this.reset()},reset:function reset(){h.reset.call(this),this._doReset()},update:function update(e){return this._append(e),this._process(),this},finalize:function finalize(e){return e&&this._append(e),this._doFinalize()},blockSize:16,_createHelper:function _createHelper(e){return function(t,r){return new e.init(r).finalize(t)}},_createHmacHelper:function _createHmacHelper(e){return function(t,r){return new l.HMAC.init(e,r).finalize(t)}}}),r.algo={});return r}(Math);!function(e){var t,r=(t=y).lib,n=r.Base,i=r.WordArray;(t=t.x64={}).Word=n.extend({init:function init(e,t){this.high=e,this.low=t}}),t.WordArray=n.extend({init:function init(e,t){e=this.words=e||[],this.sigBytes=void 0!=t?t:8*e.length},toX32:function toX32(){for(var e=this.words,t=e.length,r=[],n=0;n<t;n++){var o=e[n];r.push(o.high),r.push(o.low)}return i.create(r,this.sigBytes)},clone:function clone(){for(var e=n.clone.call(this),t=e.words=this.words.slice(0),r=t.length,i=0;i<r;i++)t[i]=t[i].clone();return e}})}(),function(){var e=y,t=e.lib.WordArray;e.enc.Base64={stringify:function stringify(e){var t=e.words,r=e.sigBytes,n=this._map;e.clamp(),e=[];for(var i=0;i<r;i+=3)for(var o=(t[i>>>2]>>>24-i%4*8&255)<<16|(t[i+1>>>2]>>>24-(i+1)%4*8&255)<<8|t[i+2>>>2]>>>24-(i+2)%4*8&255,s=0;4>s&&i+.75*s<r;s++)e.push(n.charAt(o>>>6*(3-s)&63));if(t=n.charAt(64))for(;e.length%4;)e.push(t);return e.join("")},parse:function parse(e){var r=e.length,n=this._map;(i=n.charAt(64))&&(-1!=(i=e.indexOf(i))&&(r=i));for(var i=[],o=0,s=0;s<r;s++)if(s%4){var a=n.indexOf(e.charAt(s-1))<<s%4*2,u=n.indexOf(e.charAt(s))>>>6-s%4*2;i[o>>>2]|=(a|u)<<24-o%4*8,o++}return t.create(i,o)},_map:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="}}(),function(e){for(var t=y,r=(i=t.lib).WordArray,n=i.Hasher,i=t.algo,o=[],s=[],a=function u(e){return 4294967296*(e-(0|e))|0},u=2,c=0;64>c;){var h;e:{h=u;for(var l=e.sqrt(h),f=2;f<=l;f++)if(!(h%f)){h=!1;break e}h=!0}h&&(8>c&&(o[c]=a(e.pow(u,.5))),s[c]=a(e.pow(u,1/3)),c++),u++}var g=[];i=i.SHA256=n.extend({_doReset:function _doReset(){this._hash=new r.init(o.slice(0))},_doProcessBlock:function _doProcessBlock(e,t){for(var r=this._hash.words,n=r[0],i=r[1],o=r[2],a=r[3],u=r[4],c=r[5],h=r[6],l=r[7],f=0;64>f;f++){if(16>f)g[f]=0|e[t+f];else{var p=g[f-15],d=g[f-2];g[f]=((p<<25|p>>>7)^(p<<14|p>>>18)^p>>>3)+g[f-7]+((d<<15|d>>>17)^(d<<13|d>>>19)^d>>>10)+g[f-16]}p=l+((u<<26|u>>>6)^(u<<21|u>>>11)^(u<<7|u>>>25))+(u&c^~u&h)+s[f]+g[f],d=((n<<30|n>>>2)^(n<<19|n>>>13)^(n<<10|n>>>22))+(n&i^n&o^i&o),l=h,h=c,c=u,u=a+p|0,a=o,o=i,i=n,n=p+d|0}r[0]=r[0]+n|0,r[1]=r[1]+i|0,r[2]=r[2]+o|0,r[3]=r[3]+a|0,r[4]=r[4]+u|0,r[5]=r[5]+c|0,r[6]=r[6]+h|0,r[7]=r[7]+l|0},_doFinalize:function _doFinalize(){var t=this._data,r=t.words,n=8*this._nDataBytes,i=8*t.sigBytes;return r[i>>>5]|=128<<24-i%32,r[14+(i+64>>>9<<4)]=e.floor(n/4294967296),r[15+(i+64>>>9<<4)]=n,t.sigBytes=4*r.length,this._process(),this._hash},clone:function clone(){var e=n.clone.call(this);return e._hash=this._hash.clone(),e}});t.SHA256=n._createHelper(i),t.HmacSHA256=n._createHmacHelper(i)}(Math),function(){function a(){return r.create.apply(r,arguments)}for(var e=y,t=e.lib.Hasher,r=(i=e.x64).Word,n=i.WordArray,i=e.algo,o=[a(1116352408,3609767458),a(1899447441,602891725),a(3049323471,3964484399),a(3921009573,2173295548),a(961987163,4081628472),a(1508970993,3053834265),a(2453635748,2937671579),a(2870763221,3664609560),a(3624381080,2734883394),a(310598401,1164996542),a(607225278,1323610764),a(1426881987,3590304994),a(1925078388,4068182383),a(2162078206,991336113),a(2614888103,633803317),a(3248222580,3479774868),a(3835390401,2666613458),a(4022224774,944711139),a(264347078,2341262773),a(604807628,2007800933),a(770255983,1495990901),a(1249150122,1856431235),a(1555081692,3175218132),a(1996064986,2198950837),a(2554220882,3999719339),a(2821834349,766784016),a(2952996808,2566594879),a(3210313671,3203337956),a(3336571891,1034457026),a(3584528711,2466948901),a(113926993,3758326383),a(338241895,168717936),a(666307205,1188179964),a(773529912,1546045734),a(1294757372,1522805485),a(1396182291,2643833823),a(1695183700,2343527390),a(1986661051,1014477480),a(2177026350,1206759142),a(2456956037,344077627),a(2730485921,1290863460),a(2820302411,3158454273),a(3259730800,3505952657),a(3345764771,106217008),a(3516065817,3606008344),a(3600352804,1432725776),a(4094571909,1467031594),a(275423344,851169720),a(430227734,3100823752),a(506948616,1363258195),a(659060556,3750685593),a(883997877,3785050280),a(958139571,3318307427),a(1322822218,3812723403),a(1537002063,2003034995),a(1747873779,3602036899),a(1955562222,1575990012),a(2024104815,1125592928),a(2227730452,2716904306),a(2361852424,442776044),a(2428436474,593698344),a(2756734187,3733110249),a(3204031479,2999351573),a(3329325298,3815920427),a(3391569614,3928383900),a(3515267271,566280711),a(3940187606,3454069534),a(4118630271,4000239992),a(116418474,1914138554),a(174292421,2731055270),a(289380356,3203993006),a(460393269,320620315),a(685471733,587496836),a(852142971,1086792851),a(1017036298,365543100),a(1126000580,2618297676),a(1288033470,3409855158),a(1501505948,4234509866),a(1607167915,987167468),a(1816402316,1246189591)],s=[],u=0;80>u;u++)s[u]=a();i=i.SHA512=t.extend({_doReset:function _doReset(){this._hash=new n.init([new r.init(1779033703,4089235720),new r.init(3144134277,2227873595),new r.init(1013904242,4271175723),new r.init(2773480762,1595750129),new r.init(1359893119,2917565137),new r.init(2600822924,725511199),new r.init(528734635,4215389547),new r.init(1541459225,327033209)])},_doProcessBlock:function _doProcessBlock(e,t){for(var r=(l=this._hash.words)[0],n=l[1],i=l[2],a=l[3],u=l[4],c=l[5],h=l[6],l=l[7],f=r.high,g=r.low,p=n.high,d=n.low,v=i.high,y=i.low,m=a.high,S=a.low,b=u.high,F=u.low,_=c.high,w=c.low,E=h.high,x=h.low,A=l.high,C=l.low,P=f,I=g,k=p,B=d,R=v,T=y,U=m,D=S,M=b,L=F,N=_,O=w,H=E,j=x,K=A,V=C,q=0;80>q;q++){var W=s[q];if(16>q)var J=W.high=0|e[t+2*q],z=W.low=0|e[t+2*q+1];else{J=((z=(J=s[q-15]).high)>>>1|(Y=J.low)<<31)^(z>>>8|Y<<24)^z>>>7;var Y=(Y>>>1|z<<31)^(Y>>>8|z<<24)^(Y>>>7|z<<25),G=((z=(G=s[q-2]).high)>>>19|(X=G.low)<<13)^(z<<3|X>>>29)^z>>>6,X=(X>>>19|z<<13)^(X<<3|z>>>29)^(X>>>6|z<<26),$=(z=s[q-7]).high,Z=(Q=s[q-16]).high,Q=Q.low;J=(J=(J=J+$+((z=Y+z.low)>>>0<Y>>>0?1:0))+G+((z=z+X)>>>0<X>>>0?1:0))+Z+((z=z+Q)>>>0<Q>>>0?1:0);W.high=J,W.low=z}$=M&N^~M&H,Q=L&O^~L&j,W=P&k^P&R^k&R;var ee=I&B^I&T^B&T,te=(Y=(P>>>28|I<<4)^(P<<30|I>>>2)^(P<<25|I>>>7),G=(I>>>28|P<<4)^(I<<30|P>>>2)^(I<<25|P>>>7),(X=o[q]).high),re=X.low;Z=(Z=(Z=(Z=K+((M>>>14|L<<18)^(M>>>18|L<<14)^(M<<23|L>>>9))+((X=V+((L>>>14|M<<18)^(L>>>18|M<<14)^(L<<23|M>>>9)))>>>0<V>>>0?1:0))+$+((X=X+Q)>>>0<Q>>>0?1:0))+te+((X=X+re)>>>0<re>>>0?1:0))+J+((X=X+z)>>>0<z>>>0?1:0),W=Y+W+((z=G+ee)>>>0<G>>>0?1:0),K=H,V=j,H=N,j=O,N=M,O=L,M=U+Z+((L=D+X|0)>>>0<D>>>0?1:0)|0,U=R,D=T,R=k,T=B,k=P,B=I,P=Z+W+((I=X+z|0)>>>0<X>>>0?1:0)|0}g=r.low=g+I,r.high=f+P+(g>>>0<I>>>0?1:0),d=n.low=d+B,n.high=p+k+(d>>>0<B>>>0?1:0),y=i.low=y+T,i.high=v+R+(y>>>0<T>>>0?1:0),S=a.low=S+D,a.high=m+U+(S>>>0<D>>>0?1:0),F=u.low=F+L,u.high=b+M+(F>>>0<L>>>0?1:0),w=c.low=w+O,c.high=_+N+(w>>>0<O>>>0?1:0),x=h.low=x+j,h.high=E+H+(x>>>0<j>>>0?1:0),C=l.low=C+V,l.high=A+K+(C>>>0<V>>>0?1:0)},_doFinalize:function _doFinalize(){var e=this._data,t=e.words,r=8*this._nDataBytes,n=8*e.sigBytes;return t[n>>>5]|=128<<24-n%32,t[30+(n+128>>>10<<5)]=Math.floor(r/4294967296),t[31+(n+128>>>10<<5)]=r,e.sigBytes=4*t.length,this._process(),this._hash.toX32()},clone:function clone(){var e=t.clone.call(this);return e._hash=this._hash.clone(),e},blockSize:32}),e.SHA512=t._createHelper(i),e.HmacSHA512=t._createHmacHelper(i)}(),function(){var e=y,t=(i=e.x64).Word,r=i.WordArray,n=(i=e.algo).SHA512,i=i.SHA384=n.extend({_doReset:function _doReset(){this._hash=new r.init([new t.init(3418070365,3238371032),new t.init(1654270250,914150663),new t.init(2438529370,812702999),new t.init(355462360,4144912697),new t.init(1731405415,4290775857),new t.init(2394180231,1750603025),new t.init(3675008525,1694076839),new t.init(1203062813,3204075428)])},_doFinalize:function _doFinalize(){var e=n._doFinalize.call(this);return e.sigBytes-=16,e}});e.SHA384=n._createHelper(i),e.HmacSHA384=n._createHmacHelper(i)}();
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
var S,F="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",_="=";function hex2b64(e){var t,r,n="";for(t=0;t+3<=e.length;t+=3)r=parseInt(e.substring(t,t+3),16),n+=F.charAt(r>>6)+F.charAt(63&r);if(t+1==e.length?(r=parseInt(e.substring(t,t+1),16),n+=F.charAt(r<<2)):t+2==e.length&&(r=parseInt(e.substring(t,t+2),16),n+=F.charAt(r>>2)+F.charAt((3&r)<<4)),_)for(;(3&n.length)>0;)n+=_;return n}function b64tohex(e){var t,r,n,i="",o=0;for(t=0;t<e.length&&e.charAt(t)!=_;++t)(n=F.indexOf(e.charAt(t)))<0||(0==o?(i+=int2char(n>>2),r=3&n,o=1):1==o?(i+=int2char(r<<2|n>>4),r=15&n,o=2):2==o?(i+=int2char(r),i+=int2char(n>>2),r=3&n,o=3):(i+=int2char(r<<2|n>>4),i+=int2char(15&n),o=0));return 1==o&&(i+=int2char(r<<2)),i}function b64toBA(e){var t,r=b64tohex(e),n=new Array;for(t=0;2*t<r.length;++t)n[t]=parseInt(r.substring(2*t,2*t+2),16);return n}function BigInteger(e,t,r){null!=e&&("number"==typeof e?this.fromNumber(e,t,r):null==t&&"string"!=typeof e?this.fromString(e,256):this.fromString(e,t))}function nbi(){return new BigInteger(null)}"Microsoft Internet Explorer"==u.appName?(BigInteger.prototype.am=function am2(e,t,r,n,i,o){for(var s=32767&t,a=t>>15;--o>=0;){var u=32767&this[e],c=this[e++]>>15,h=a*u+c*s;i=((u=s*u+((32767&h)<<15)+r[n]+(1073741823&i))>>>30)+(h>>>15)+a*c+(i>>>30),r[n++]=1073741823&u}return i},S=30):"Netscape"!=u.appName?(BigInteger.prototype.am=function am1(e,t,r,n,i,o){for(;--o>=0;){var s=t*this[e++]+r[n]+i;i=Math.floor(s/67108864),r[n++]=67108863&s}return i},S=26):(BigInteger.prototype.am=function am3(e,t,r,n,i,o){for(var s=16383&t,a=t>>14;--o>=0;){var u=16383&this[e],c=this[e++]>>14,h=a*u+c*s;i=((u=s*u+((16383&h)<<14)+r[n]+i)>>28)+(h>>14)+a*c,r[n++]=268435455&u}return i},S=28),BigInteger.prototype.DB=S,BigInteger.prototype.DM=(1<<S)-1,BigInteger.prototype.DV=1<<S;BigInteger.prototype.FV=Math.pow(2,52),BigInteger.prototype.F1=52-S,BigInteger.prototype.F2=2*S-52;var w,E,C="0123456789abcdefghijklmnopqrstuvwxyz",P=new Array;for(w="0".charCodeAt(0),E=0;E<=9;++E)P[w++]=E;for(w="a".charCodeAt(0),E=10;E<36;++E)P[w++]=E;for(w="A".charCodeAt(0),E=10;E<36;++E)P[w++]=E;function int2char(e){return C.charAt(e)}function intAt(e,t){var r=P[e.charCodeAt(t)];return null==r?-1:r}function nbv(e){var t=nbi();return t.fromInt(e),t}function nbits(e){var t,r=1;return 0!=(t=e>>>16)&&(e=t,r+=16),0!=(t=e>>8)&&(e=t,r+=8),0!=(t=e>>4)&&(e=t,r+=4),0!=(t=e>>2)&&(e=t,r+=2),0!=(t=e>>1)&&(e=t,r+=1),r}function Classic(e){this.m=e}function Montgomery(e){this.m=e,this.mp=e.invDigit(),this.mpl=32767&this.mp,this.mph=this.mp>>15,this.um=(1<<e.DB-15)-1,this.mt2=2*e.t}function op_and(e,t){return e&t}function op_or(e,t){return e|t}function op_xor(e,t){return e^t}function op_andnot(e,t){return e&~t}function lbit(e){if(0==e)return-1;var t=0;return 0==(65535&e)&&(e>>=16,t+=16),0==(255&e)&&(e>>=8,t+=8),0==(15&e)&&(e>>=4,t+=4),0==(3&e)&&(e>>=2,t+=2),0==(1&e)&&++t,t}function cbit(e){for(var t=0;0!=e;)e&=e-1,++t;return t}function NullExp(){}function nNop(e){return e}function Barrett(e){this.r2=nbi(),this.q3=nbi(),BigInteger.ONE.dlShiftTo(2*e.t,this.r2),this.mu=this.r2.divide(e),this.m=e}Classic.prototype.convert=function cConvert(e){return e.s<0||e.compareTo(this.m)>=0?e.mod(this.m):e},Classic.prototype.revert=function cRevert(e){return e},Classic.prototype.reduce=function cReduce(e){e.divRemTo(this.m,null,e)},Classic.prototype.mulTo=function cMulTo(e,t,r){e.multiplyTo(t,r),this.reduce(r)},Classic.prototype.sqrTo=function cSqrTo(e,t){e.squareTo(t),this.reduce(t)},Montgomery.prototype.convert=function montConvert(e){var t=nbi();return e.abs().dlShiftTo(this.m.t,t),t.divRemTo(this.m,null,t),e.s<0&&t.compareTo(BigInteger.ZERO)>0&&this.m.subTo(t,t),t},Montgomery.prototype.revert=function montRevert(e){var t=nbi();return e.copyTo(t),this.reduce(t),t},Montgomery.prototype.reduce=function montReduce(e){for(;e.t<=this.mt2;)e[e.t++]=0;for(var t=0;t<this.m.t;++t){var r=32767&e[t],n=r*this.mpl+((r*this.mph+(e[t]>>15)*this.mpl&this.um)<<15)&e.DM;for(e[r=t+this.m.t]+=this.m.am(0,n,e,t,0,this.m.t);e[r]>=e.DV;)e[r]-=e.DV,e[++r]++}e.clamp(),e.drShiftTo(this.m.t,e),e.compareTo(this.m)>=0&&e.subTo(this.m,e)},Montgomery.prototype.mulTo=function montMulTo(e,t,r){e.multiplyTo(t,r),this.reduce(r)},Montgomery.prototype.sqrTo=function montSqrTo(e,t){e.squareTo(t),this.reduce(t)},BigInteger.prototype.copyTo=function bnpCopyTo(e){for(var t=this.t-1;t>=0;--t)e[t]=this[t];e.t=this.t,e.s=this.s},BigInteger.prototype.fromInt=function bnpFromInt(e){this.t=1,this.s=e<0?-1:0,e>0?this[0]=e:e<-1?this[0]=e+this.DV:this.t=0},BigInteger.prototype.fromString=function bnpFromString(e,t){var r;if(16==t)r=4;else if(8==t)r=3;else if(256==t)r=8;else if(2==t)r=1;else if(32==t)r=5;else{if(4!=t)return void this.fromRadix(e,t);r=2}this.t=0,this.s=0;for(var n=e.length,i=!1,o=0;--n>=0;){var s=8==r?255&e[n]:intAt(e,n);s<0?"-"==e.charAt(n)&&(i=!0):(i=!1,0==o?this[this.t++]=s:o+r>this.DB?(this[this.t-1]|=(s&(1<<this.DB-o)-1)<<o,this[this.t++]=s>>this.DB-o):this[this.t-1]|=s<<o,(o+=r)>=this.DB&&(o-=this.DB))}8==r&&0!=(128&e[0])&&(this.s=-1,o>0&&(this[this.t-1]|=(1<<this.DB-o)-1<<o)),this.clamp(),i&&BigInteger.ZERO.subTo(this,this)},BigInteger.prototype.clamp=function bnpClamp(){for(var e=this.s&this.DM;this.t>0&&this[this.t-1]==e;)--this.t},BigInteger.prototype.dlShiftTo=function bnpDLShiftTo(e,t){var r;for(r=this.t-1;r>=0;--r)t[r+e]=this[r];for(r=e-1;r>=0;--r)t[r]=0;t.t=this.t+e,t.s=this.s},BigInteger.prototype.drShiftTo=function bnpDRShiftTo(e,t){for(var r=e;r<this.t;++r)t[r-e]=this[r];t.t=Math.max(this.t-e,0),t.s=this.s},BigInteger.prototype.lShiftTo=function bnpLShiftTo(e,t){var r,n=e%this.DB,i=this.DB-n,o=(1<<i)-1,s=Math.floor(e/this.DB),a=this.s<<n&this.DM;for(r=this.t-1;r>=0;--r)t[r+s+1]=this[r]>>i|a,a=(this[r]&o)<<n;for(r=s-1;r>=0;--r)t[r]=0;t[s]=a,t.t=this.t+s+1,t.s=this.s,t.clamp()},BigInteger.prototype.rShiftTo=function bnpRShiftTo(e,t){t.s=this.s;var r=Math.floor(e/this.DB);if(r>=this.t)t.t=0;else{var n=e%this.DB,i=this.DB-n,o=(1<<n)-1;t[0]=this[r]>>n;for(var s=r+1;s<this.t;++s)t[s-r-1]|=(this[s]&o)<<i,t[s-r]=this[s]>>n;n>0&&(t[this.t-r-1]|=(this.s&o)<<i),t.t=this.t-r,t.clamp()}},BigInteger.prototype.subTo=function bnpSubTo(e,t){for(var r=0,n=0,i=Math.min(e.t,this.t);r<i;)n+=this[r]-e[r],t[r++]=n&this.DM,n>>=this.DB;if(e.t<this.t){for(n-=e.s;r<this.t;)n+=this[r],t[r++]=n&this.DM,n>>=this.DB;n+=this.s}else{for(n+=this.s;r<e.t;)n-=e[r],t[r++]=n&this.DM,n>>=this.DB;n-=e.s}t.s=n<0?-1:0,n<-1?t[r++]=this.DV+n:n>0&&(t[r++]=n),t.t=r,t.clamp()},BigInteger.prototype.multiplyTo=function bnpMultiplyTo(e,t){var r=this.abs(),n=e.abs(),i=r.t;for(t.t=i+n.t;--i>=0;)t[i]=0;for(i=0;i<n.t;++i)t[i+r.t]=r.am(0,n[i],t,i,0,r.t);t.s=0,t.clamp(),this.s!=e.s&&BigInteger.ZERO.subTo(t,t)},BigInteger.prototype.squareTo=function bnpSquareTo(e){for(var t=this.abs(),r=e.t=2*t.t;--r>=0;)e[r]=0;for(r=0;r<t.t-1;++r){var n=t.am(r,t[r],e,2*r,0,1);(e[r+t.t]+=t.am(r+1,2*t[r],e,2*r+1,n,t.t-r-1))>=t.DV&&(e[r+t.t]-=t.DV,e[r+t.t+1]=1)}e.t>0&&(e[e.t-1]+=t.am(r,t[r],e,2*r,0,1)),e.s=0,e.clamp()},BigInteger.prototype.divRemTo=function bnpDivRemTo(e,t,r){var n=e.abs();if(!(n.t<=0)){var i=this.abs();if(i.t<n.t)return null!=t&&t.fromInt(0),void(null!=r&&this.copyTo(r));null==r&&(r=nbi());var o=nbi(),s=this.s,a=e.s,u=this.DB-nbits(n[n.t-1]);u>0?(n.lShiftTo(u,o),i.lShiftTo(u,r)):(n.copyTo(o),i.copyTo(r));var c=o.t,h=o[c-1];if(0!=h){var l=h*(1<<this.F1)+(c>1?o[c-2]>>this.F2:0),f=this.FV/l,g=(1<<this.F1)/l,p=1<<this.F2,d=r.t,v=d-c,y=null==t?nbi():t;for(o.dlShiftTo(v,y),r.compareTo(y)>=0&&(r[r.t++]=1,r.subTo(y,r)),BigInteger.ONE.dlShiftTo(c,y),y.subTo(o,o);o.t<c;)o[o.t++]=0;for(;--v>=0;){var m=r[--d]==h?this.DM:Math.floor(r[d]*f+(r[d-1]+p)*g);if((r[d]+=o.am(0,m,r,v,0,c))<m)for(o.dlShiftTo(v,y),r.subTo(y,r);r[d]<--m;)r.subTo(y,r)}null!=t&&(r.drShiftTo(c,t),s!=a&&BigInteger.ZERO.subTo(t,t)),r.t=c,r.clamp(),u>0&&r.rShiftTo(u,r),s<0&&BigInteger.ZERO.subTo(r,r)}}},BigInteger.prototype.invDigit=function bnpInvDigit(){if(this.t<1)return 0;var e=this[0];if(0==(1&e))return 0;var t=3&e;return(t=(t=(t=(t=t*(2-(15&e)*t)&15)*(2-(255&e)*t)&255)*(2-((65535&e)*t&65535))&65535)*(2-e*t%this.DV)%this.DV)>0?this.DV-t:-t},BigInteger.prototype.isEven=function bnpIsEven(){return 0==(this.t>0?1&this[0]:this.s)},BigInteger.prototype.exp=function bnpExp(e,t){if(e>4294967295||e<1)return BigInteger.ONE;var r=nbi(),n=nbi(),i=t.convert(this),o=nbits(e)-1;for(i.copyTo(r);--o>=0;)if(t.sqrTo(r,n),(e&1<<o)>0)t.mulTo(n,i,r);else{var s=r;r=n,n=s}return t.revert(r)},BigInteger.prototype.toString=function bnToString(e){if(this.s<0)return"-"+this.negate().toString(e);var t;if(16==e)t=4;else if(8==e)t=3;else if(2==e)t=1;else if(32==e)t=5;else{if(4!=e)return this.toRadix(e);t=2}var r,n=(1<<t)-1,i=!1,o="",s=this.t,a=this.DB-s*this.DB%t;if(s-- >0)for(a<this.DB&&(r=this[s]>>a)>0&&(i=!0,o=int2char(r));s>=0;)a<t?(r=(this[s]&(1<<a)-1)<<t-a,r|=this[--s]>>(a+=this.DB-t)):(r=this[s]>>(a-=t)&n,a<=0&&(a+=this.DB,--s)),r>0&&(i=!0),i&&(o+=int2char(r));return i?o:"0"},BigInteger.prototype.negate=function bnNegate(){var e=nbi();return BigInteger.ZERO.subTo(this,e),e},BigInteger.prototype.abs=function bnAbs(){return this.s<0?this.negate():this},BigInteger.prototype.compareTo=function bnCompareTo(e){var t=this.s-e.s;if(0!=t)return t;var r=this.t;if(0!=(t=r-e.t))return this.s<0?-t:t;for(;--r>=0;)if(0!=(t=this[r]-e[r]))return t;return 0},BigInteger.prototype.bitLength=function bnBitLength(){return this.t<=0?0:this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)},BigInteger.prototype.mod=function bnMod(e){var t=nbi();return this.abs().divRemTo(e,null,t),this.s<0&&t.compareTo(BigInteger.ZERO)>0&&e.subTo(t,t),t},BigInteger.prototype.modPowInt=function bnModPowInt(e,t){var r;return r=e<256||t.isEven()?new Classic(t):new Montgomery(t),this.exp(e,r)},BigInteger.ZERO=nbv(0),BigInteger.ONE=nbv(1),NullExp.prototype.convert=nNop,NullExp.prototype.revert=nNop,NullExp.prototype.mulTo=function nMulTo(e,t,r){e.multiplyTo(t,r)},NullExp.prototype.sqrTo=function nSqrTo(e,t){e.squareTo(t)},Barrett.prototype.convert=function barrettConvert(e){if(e.s<0||e.t>2*this.m.t)return e.mod(this.m);if(e.compareTo(this.m)<0)return e;var t=nbi();return e.copyTo(t),this.reduce(t),t},Barrett.prototype.revert=function barrettRevert(e){return e},Barrett.prototype.reduce=function barrettReduce(e){for(e.drShiftTo(this.m.t-1,this.r2),e.t>this.m.t+1&&(e.t=this.m.t+1,e.clamp()),this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3),this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);e.compareTo(this.r2)<0;)e.dAddOffset(1,this.m.t+1);for(e.subTo(this.r2,e);e.compareTo(this.m)>=0;)e.subTo(this.m,e)},Barrett.prototype.mulTo=function barrettMulTo(e,t,r){e.multiplyTo(t,r),this.reduce(r)},Barrett.prototype.sqrTo=function barrettSqrTo(e,t){e.squareTo(t),this.reduce(t)};var I=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],R=(1<<26)/I[I.length-1];
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function Arcfour(){this.i=0,this.j=0,this.S=new Array}BigInteger.prototype.chunkSize=function bnpChunkSize(e){return Math.floor(Math.LN2*this.DB/Math.log(e))},BigInteger.prototype.toRadix=function bnpToRadix(e){if(null==e&&(e=10),0==this.signum()||e<2||e>36)return"0";var t=this.chunkSize(e),r=Math.pow(e,t),n=nbv(r),i=nbi(),o=nbi(),s="";for(this.divRemTo(n,i,o);i.signum()>0;)s=(r+o.intValue()).toString(e).substr(1)+s,i.divRemTo(n,i,o);return o.intValue().toString(e)+s},BigInteger.prototype.fromRadix=function bnpFromRadix(e,t){this.fromInt(0),null==t&&(t=10);for(var r=this.chunkSize(t),n=Math.pow(t,r),i=!1,o=0,s=0,a=0;a<e.length;++a){var u=intAt(e,a);u<0?"-"==e.charAt(a)&&0==this.signum()&&(i=!0):(s=t*s+u,++o>=r&&(this.dMultiply(n),this.dAddOffset(s,0),o=0,s=0))}o>0&&(this.dMultiply(Math.pow(t,o)),this.dAddOffset(s,0)),i&&BigInteger.ZERO.subTo(this,this)},BigInteger.prototype.fromNumber=function bnpFromNumber(e,t,r){if("number"==typeof t)if(e<2)this.fromInt(1);else for(this.fromNumber(e,r),this.testBit(e-1)||this.bitwiseTo(BigInteger.ONE.shiftLeft(e-1),op_or,this),this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(t);)this.dAddOffset(2,0),this.bitLength()>e&&this.subTo(BigInteger.ONE.shiftLeft(e-1),this);else{var n=new Array,i=7&e;n.length=1+(e>>3),t.nextBytes(n),i>0?n[0]&=(1<<i)-1:n[0]=0,this.fromString(n,256)}},BigInteger.prototype.bitwiseTo=function bnpBitwiseTo(e,t,r){var n,i,o=Math.min(e.t,this.t);for(n=0;n<o;++n)r[n]=t(this[n],e[n]);if(e.t<this.t){for(i=e.s&this.DM,n=o;n<this.t;++n)r[n]=t(this[n],i);r.t=this.t}else{for(i=this.s&this.DM,n=o;n<e.t;++n)r[n]=t(i,e[n]);r.t=e.t}r.s=t(this.s,e.s),r.clamp()},BigInteger.prototype.changeBit=function bnpChangeBit(e,t){var r=BigInteger.ONE.shiftLeft(e);return this.bitwiseTo(r,t,r),r},BigInteger.prototype.addTo=function bnpAddTo(e,t){for(var r=0,n=0,i=Math.min(e.t,this.t);r<i;)n+=this[r]+e[r],t[r++]=n&this.DM,n>>=this.DB;if(e.t<this.t){for(n+=e.s;r<this.t;)n+=this[r],t[r++]=n&this.DM,n>>=this.DB;n+=this.s}else{for(n+=this.s;r<e.t;)n+=e[r],t[r++]=n&this.DM,n>>=this.DB;n+=e.s}t.s=n<0?-1:0,n>0?t[r++]=n:n<-1&&(t[r++]=this.DV+n),t.t=r,t.clamp()},BigInteger.prototype.dMultiply=function bnpDMultiply(e){this[this.t]=this.am(0,e-1,this,0,0,this.t),++this.t,this.clamp()},BigInteger.prototype.dAddOffset=function bnpDAddOffset(e,t){if(0!=e){for(;this.t<=t;)this[this.t++]=0;for(this[t]+=e;this[t]>=this.DV;)this[t]-=this.DV,++t>=this.t&&(this[this.t++]=0),++this[t]}},BigInteger.prototype.multiplyLowerTo=function bnpMultiplyLowerTo(e,t,r){var n,i=Math.min(this.t+e.t,t);for(r.s=0,r.t=i;i>0;)r[--i]=0;for(n=r.t-this.t;i<n;++i)r[i+this.t]=this.am(0,e[i],r,i,0,this.t);for(n=Math.min(e.t,t);i<n;++i)this.am(0,e[i],r,i,0,t-i);r.clamp()},BigInteger.prototype.multiplyUpperTo=function bnpMultiplyUpperTo(e,t,r){--t;var n=r.t=this.t+e.t-t;for(r.s=0;--n>=0;)r[n]=0;for(n=Math.max(t-this.t,0);n<e.t;++n)r[this.t+n-t]=this.am(t-n,e[n],r,0,0,this.t+n-t);r.clamp(),r.drShiftTo(1,r)},BigInteger.prototype.modInt=function bnpModInt(e){if(e<=0)return 0;var t=this.DV%e,r=this.s<0?e-1:0;if(this.t>0)if(0==t)r=this[0]%e;else for(var n=this.t-1;n>=0;--n)r=(t*r+this[n])%e;return r},BigInteger.prototype.millerRabin=function bnpMillerRabin(e){var t=this.subtract(BigInteger.ONE),r=t.getLowestSetBit();if(r<=0)return!1;var n=t.shiftRight(r);(e=e+1>>1)>I.length&&(e=I.length);for(var i=nbi(),o=0;o<e;++o){i.fromInt(I[Math.floor(Math.random()*I.length)]);var s=i.modPow(n,this);if(0!=s.compareTo(BigInteger.ONE)&&0!=s.compareTo(t)){for(var a=1;a++<r&&0!=s.compareTo(t);)if(0==(s=s.modPowInt(2,this)).compareTo(BigInteger.ONE))return!1;if(0!=s.compareTo(t))return!1}}return!0},BigInteger.prototype.clone=
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function bnClone(){var e=nbi();return this.copyTo(e),e},BigInteger.prototype.intValue=function bnIntValue(){if(this.s<0){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]},BigInteger.prototype.byteValue=function bnByteValue(){return 0==this.t?this.s:this[0]<<24>>24},BigInteger.prototype.shortValue=function bnShortValue(){return 0==this.t?this.s:this[0]<<16>>16},BigInteger.prototype.signum=function bnSigNum(){return this.s<0?-1:this.t<=0||1==this.t&&this[0]<=0?0:1},BigInteger.prototype.toByteArray=function bnToByteArray(){var e=this.t,t=new Array;t[0]=this.s;var r,n=this.DB-e*this.DB%8,i=0;if(e-- >0)for(n<this.DB&&(r=this[e]>>n)!=(this.s&this.DM)>>n&&(t[i++]=r|this.s<<this.DB-n);e>=0;)n<8?(r=(this[e]&(1<<n)-1)<<8-n,r|=this[--e]>>(n+=this.DB-8)):(r=this[e]>>(n-=8)&255,n<=0&&(n+=this.DB,--e)),0!=(128&r)&&(r|=-256),0==i&&(128&this.s)!=(128&r)&&++i,(i>0||r!=this.s)&&(t[i++]=r);return t},BigInteger.prototype.equals=function bnEquals(e){return 0==this.compareTo(e)},BigInteger.prototype.min=function bnMin(e){return this.compareTo(e)<0?this:e},BigInteger.prototype.max=function bnMax(e){return this.compareTo(e)>0?this:e},BigInteger.prototype.and=function bnAnd(e){var t=nbi();return this.bitwiseTo(e,op_and,t),t},BigInteger.prototype.or=function bnOr(e){var t=nbi();return this.bitwiseTo(e,op_or,t),t},BigInteger.prototype.xor=function bnXor(e){var t=nbi();return this.bitwiseTo(e,op_xor,t),t},BigInteger.prototype.andNot=function bnAndNot(e){var t=nbi();return this.bitwiseTo(e,op_andnot,t),t},BigInteger.prototype.not=function bnNot(){for(var e=nbi(),t=0;t<this.t;++t)e[t]=this.DM&~this[t];return e.t=this.t,e.s=~this.s,e},BigInteger.prototype.shiftLeft=function bnShiftLeft(e){var t=nbi();return e<0?this.rShiftTo(-e,t):this.lShiftTo(e,t),t},BigInteger.prototype.shiftRight=function bnShiftRight(e){var t=nbi();return e<0?this.lShiftTo(-e,t):this.rShiftTo(e,t),t},BigInteger.prototype.getLowestSetBit=function bnGetLowestSetBit(){for(var e=0;e<this.t;++e)if(0!=this[e])return e*this.DB+lbit(this[e]);return this.s<0?this.t*this.DB:-1},BigInteger.prototype.bitCount=function bnBitCount(){for(var e=0,t=this.s&this.DM,r=0;r<this.t;++r)e+=cbit(this[r]^t);return e},BigInteger.prototype.testBit=function bnTestBit(e){var t=Math.floor(e/this.DB);return t>=this.t?0!=this.s:0!=(this[t]&1<<e%this.DB)},BigInteger.prototype.setBit=function bnSetBit(e){return this.changeBit(e,op_or)},BigInteger.prototype.clearBit=function bnClearBit(e){return this.changeBit(e,op_andnot)},BigInteger.prototype.flipBit=function bnFlipBit(e){return this.changeBit(e,op_xor)},BigInteger.prototype.add=function bnAdd(e){var t=nbi();return this.addTo(e,t),t},BigInteger.prototype.subtract=function bnSubtract(e){var t=nbi();return this.subTo(e,t),t},BigInteger.prototype.multiply=function bnMultiply(e){var t=nbi();return this.multiplyTo(e,t),t},BigInteger.prototype.divide=function bnDivide(e){var t=nbi();return this.divRemTo(e,t,null),t},BigInteger.prototype.remainder=function bnRemainder(e){var t=nbi();return this.divRemTo(e,null,t),t},BigInteger.prototype.divideAndRemainder=function bnDivideAndRemainder(e){var t=nbi(),r=nbi();return this.divRemTo(e,t,r),new Array(t,r)},BigInteger.prototype.modPow=function bnModPow(e,t){var r,n,i=e.bitLength(),o=nbv(1);if(i<=0)return o;r=i<18?1:i<48?3:i<144?4:i<768?5:6,n=i<8?new Classic(t):t.isEven()?new Barrett(t):new Montgomery(t);var s=new Array,a=3,u=r-1,c=(1<<r)-1;if(s[1]=n.convert(this),r>1){var h=nbi();for(n.sqrTo(s[1],h);a<=c;)s[a]=nbi(),n.mulTo(h,s[a-2],s[a]),a+=2}var l,f,g=e.t-1,p=!0,d=nbi();for(i=nbits(e[g])-1;g>=0;){for(i>=u?l=e[g]>>i-u&c:(l=(e[g]&(1<<i+1)-1)<<u-i,g>0&&(l|=e[g-1]>>this.DB+i-u)),a=r;0==(1&l);)l>>=1,--a;if((i-=a)<0&&(i+=this.DB,--g),p)s[l].copyTo(o),p=!1;else{for(;a>1;)n.sqrTo(o,d),n.sqrTo(d,o),a-=2;a>0?n.sqrTo(o,d):(f=o,o=d,d=f),n.mulTo(d,s[l],o)}for(;g>=0&&0==(e[g]&1<<i);)n.sqrTo(o,d),f=o,o=d,d=f,--i<0&&(i=this.DB-1,--g)}return n.revert(o)},BigInteger.prototype.modInverse=function bnModInverse(e){var t=e.isEven();if(this.isEven()&&t||0==e.signum())return BigInteger.ZERO;for(var r=e.clone(),n=this.clone(),i=nbv(1),o=nbv(0),s=nbv(0),a=nbv(1);0!=r.signum();){for(;r.isEven();)r.rShiftTo(1,r),t?(i.isEven()&&o.isEven()||(i.addTo(this,i),o.subTo(e,o)),i.rShiftTo(1,i)):o.isEven()||o.subTo(e,o),o.rShiftTo(1,o);for(;n.isEven();)n.rShiftTo(1,n),t?(s.isEven()&&a.isEven()||(s.addTo(this,s),a.subTo(e,a)),s.rShiftTo(1,s)):a.isEven()||a.subTo(e,a),a.rShiftTo(1,a);r.compareTo(n)>=0?(r.subTo(n,r),t&&i.subTo(s,i),o.subTo(a,o)):(n.subTo(r,n),t&&s.subTo(i,s),a.subTo(o,a))}return 0!=n.compareTo(BigInteger.ONE)?BigInteger.ZERO:a.compareTo(e)>=0?a.subtract(e):a.signum()<0?(a.addTo(e,a),a.signum()<0?a.add(e):a):a},BigInteger.prototype.pow=function bnPow(e){return this.exp(e,new NullExp)},BigInteger.prototype.gcd=function bnGCD(e){var t=this.s<0?this.negate():this.clone(),r=e.s<0?e.negate():e.clone();if(t.compareTo(r)<0){var n=t;t=r,r=n}var i=t.getLowestSetBit(),o=r.getLowestSetBit();if(o<0)return t;for(i<o&&(o=i),o>0&&(t.rShiftTo(o,t),r.rShiftTo(o,r));t.signum()>0;)(i=t.getLowestSetBit())>0&&t.rShiftTo(i,t),(i=r.getLowestSetBit())>0&&r.rShiftTo(i,r),t.compareTo(r)>=0?(t.subTo(r,t),t.rShiftTo(1,t)):(r.subTo(t,r),r.rShiftTo(1,r));return o>0&&r.lShiftTo(o,r),r},BigInteger.prototype.isProbablePrime=function bnIsProbablePrime(e){var t,r=this.abs();if(1==r.t&&r[0]<=I[I.length-1]){for(t=0;t<I.length;++t)if(r[0]==I[t])return!0;return!1}if(r.isEven())return!1;for(t=1;t<I.length;){for(var n=I[t],i=t+1;i<I.length&&n<R;)n*=I[i++];for(n=r.modInt(n);t<i;)if(n%I[t++]==0)return!1}return r.millerRabin(e)},BigInteger.prototype.square=function bnSquare(){var e=nbi();return this.squareTo(e),e},Arcfour.prototype.init=function ARC4init(e){var t,r,n;for(t=0;t<256;++t)this.S[t]=t;for(r=0,t=0;t<256;++t)r=r+this.S[t]+e[t%e.length]&255,n=this.S[t],this.S[t]=this.S[r],this.S[r]=n;this.i=0,this.j=0},Arcfour.prototype.next=function ARC4next(){var e;return this.i=this.i+1&255,this.j=this.j+this.S[this.i]&255,e=this.S[this.i],this.S[this.i]=this.S[this.j],this.S[this.j]=e,this.S[e+this.S[this.i]&255]};var T,U,D,M=256;
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */function rng_seed_time(){!function rng_seed_int(e){U[D++]^=255&e,U[D++]^=e>>8&255,U[D++]^=e>>16&255,U[D++]^=e>>24&255,D>=M&&(D-=M)}((new Date).getTime())}if(null==U){var L;if(U=new Array,D=0,void 0!==p&&(void 0!==p.crypto||void 0!==p.msCrypto)){var N=p.crypto||p.msCrypto;if(N.getRandomValues){var O=new Uint8Array(32);for(N.getRandomValues(O),L=0;L<32;++L)U[D++]=O[L]}else if("Netscape"==u.appName&&u.appVersion<"5"){var H=p.crypto.random(32);for(L=0;L<H.length;++L)U[D++]=255&H.charCodeAt(L)}}for(;D<M;)L=Math.floor(65536*Math.random()),U[D++]=L>>>8,U[D++]=255&L;D=0,rng_seed_time()}function rng_get_byte(){if(null==T){for(rng_seed_time(),(T=function prng_newstate(){return new Arcfour}()).init(U),D=0;D<U.length;++D)U[D]=0;D=0}return T.next()}function SecureRandom(){}
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function parseBigInt(e,t){return new BigInteger(e,t)}function oaep_mgf1_arr(e,t,r){for(var n="",i=0;n.length<t;)n+=r(String.fromCharCode.apply(String,e.concat([(4278190080&i)>>24,(16711680&i)>>16,(65280&i)>>8,255&i]))),i+=1;return n}function RSAKey(){this.n=null,this.e=0,this.d=null,this.p=null,this.q=null,this.dmp1=null,this.dmq1=null,this.coeff=null}
/*! (c) Tom Wu | http://www-cs-students.stanford.edu/~tjw/jsbn/
 */
function ECFieldElementFp(e,t){this.x=t,this.q=e}function ECPointFp(e,t,r,n){this.curve=e,this.x=t,this.y=r,this.z=null==n?BigInteger.ONE:n,this.zinv=null}function ECCurveFp(e,t,r){this.q=e,this.a=this.fromBigInteger(t),this.b=this.fromBigInteger(r),this.infinity=new ECPointFp(this,null,null)}SecureRandom.prototype.nextBytes=function rng_get_bytes(e){var t;for(t=0;t<e.length;++t)e[t]=rng_get_byte()},RSAKey.prototype.doPublic=function RSADoPublic(e){return e.modPowInt(this.e,this.n)},RSAKey.prototype.setPublic=function RSASetPublic(e,t){if(this.isPublic=!0,this.isPrivate=!1,"string"!=typeof e)this.n=e,this.e=t;else{if(!(null!=e&&null!=t&&e.length>0&&t.length>0))throw"Invalid RSA public key";this.n=parseBigInt(e,16),this.e=parseInt(t,16)}},RSAKey.prototype.encrypt=function RSAEncrypt(e){var t=function pkcs1pad2(e,t){if(t<e.length+11)throw"Message too long for RSA";for(var r=new Array,n=e.length-1;n>=0&&t>0;){var i=e.charCodeAt(n--);i<128?r[--t]=i:i>127&&i<2048?(r[--t]=63&i|128,r[--t]=i>>6|192):(r[--t]=63&i|128,r[--t]=i>>6&63|128,r[--t]=i>>12|224)}r[--t]=0;for(var o=new SecureRandom,s=new Array;t>2;){for(s[0]=0;0==s[0];)o.nextBytes(s);r[--t]=s[0]}return r[--t]=2,r[--t]=0,new BigInteger(r)}(e,this.n.bitLength()+7>>3);if(null==t)return null;var r=this.doPublic(t);if(null==r)return null;var n=r.toString(16);return 0==(1&n.length)?n:"0"+n},RSAKey.prototype.encryptOAEP=function RSAEncryptOAEP(e,t,r){var n=function oaep_pad(e,t,r,n){var i=V.crypto.MessageDigest,o=V.crypto.Util,s=null;if(r||(r="sha1"),"string"==typeof r&&(s=i.getCanonicalAlgName(r),n=i.getHashLength(s),r=function f(e){return hextorstr(o.hashHex(rstrtohex(e),s))}),e.length+2*n+2>t)throw"Message too long for RSA";var a,u="";for(a=0;a<t-e.length-2*n-2;a+=1)u+="\0";var c=r("")+u+""+e,h=new Array(n);(new SecureRandom).nextBytes(h);var l=oaep_mgf1_arr(h,c.length,r),g=[];for(a=0;a<c.length;a+=1)g[a]=c.charCodeAt(a)^l.charCodeAt(a);var p=oaep_mgf1_arr(g,h.length,r),d=[0];for(a=0;a<h.length;a+=1)d[a+1]=h[a]^p.charCodeAt(a);return new BigInteger(d.concat(g))}(e,this.n.bitLength()+7>>3,t,r);if(null==n)return null;var i=this.doPublic(n);if(null==i)return null;var o=i.toString(16);return 0==(1&o.length)?o:"0"+o},RSAKey.prototype.type="RSA",ECFieldElementFp.prototype.equals=function feFpEquals(e){return e==this||this.q.equals(e.q)&&this.x.equals(e.x)},ECFieldElementFp.prototype.toBigInteger=function feFpToBigInteger(){return this.x},ECFieldElementFp.prototype.negate=function feFpNegate(){return new ECFieldElementFp(this.q,this.x.negate().mod(this.q))},ECFieldElementFp.prototype.add=function feFpAdd(e){return new ECFieldElementFp(this.q,this.x.add(e.toBigInteger()).mod(this.q))},ECFieldElementFp.prototype.subtract=function feFpSubtract(e){return new ECFieldElementFp(this.q,this.x.subtract(e.toBigInteger()).mod(this.q))},ECFieldElementFp.prototype.multiply=function feFpMultiply(e){return new ECFieldElementFp(this.q,this.x.multiply(e.toBigInteger()).mod(this.q))},ECFieldElementFp.prototype.square=function feFpSquare(){return new ECFieldElementFp(this.q,this.x.square().mod(this.q))},ECFieldElementFp.prototype.divide=function feFpDivide(e){return new ECFieldElementFp(this.q,this.x.multiply(e.toBigInteger().modInverse(this.q)).mod(this.q))},ECPointFp.prototype.getX=function pointFpGetX(){return null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q)),this.curve.fromBigInteger(this.x.toBigInteger().multiply(this.zinv).mod(this.curve.q))},ECPointFp.prototype.getY=function pointFpGetY(){return null==this.zinv&&(this.zinv=this.z.modInverse(this.curve.q)),this.curve.fromBigInteger(this.y.toBigInteger().multiply(this.zinv).mod(this.curve.q))},ECPointFp.prototype.equals=function pointFpEquals(e){return e==this||(this.isInfinity()?e.isInfinity():e.isInfinity()?this.isInfinity():!!e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q).equals(BigInteger.ZERO)&&e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q).equals(BigInteger.ZERO))},ECPointFp.prototype.isInfinity=function pointFpIsInfinity(){return null==this.x&&null==this.y||this.z.equals(BigInteger.ZERO)&&!this.y.toBigInteger().equals(BigInteger.ZERO)},ECPointFp.prototype.negate=function pointFpNegate(){return new ECPointFp(this.curve,this.x,this.y.negate(),this.z)},ECPointFp.prototype.add=function pointFpAdd(e){if(this.isInfinity())return e;if(e.isInfinity())return this;var t=e.y.toBigInteger().multiply(this.z).subtract(this.y.toBigInteger().multiply(e.z)).mod(this.curve.q),r=e.x.toBigInteger().multiply(this.z).subtract(this.x.toBigInteger().multiply(e.z)).mod(this.curve.q);if(BigInteger.ZERO.equals(r))return BigInteger.ZERO.equals(t)?this.twice():this.curve.getInfinity();var n=new BigInteger("3"),i=this.x.toBigInteger(),o=this.y.toBigInteger(),s=(e.x.toBigInteger(),e.y.toBigInteger(),r.square()),a=s.multiply(r),u=i.multiply(s),c=t.square().multiply(this.z),h=c.subtract(u.shiftLeft(1)).multiply(e.z).subtract(a).multiply(r).mod(this.curve.q),l=u.multiply(n).multiply(t).subtract(o.multiply(a)).subtract(c.multiply(t)).multiply(e.z).add(t.multiply(a)).mod(this.curve.q),f=a.multiply(this.z).multiply(e.z).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(h),this.curve.fromBigInteger(l),f)},ECPointFp.prototype.twice=function pointFpTwice(){if(this.isInfinity())return this;if(0==this.y.toBigInteger().signum())return this.curve.getInfinity();var e=new BigInteger("3"),t=this.x.toBigInteger(),r=this.y.toBigInteger(),n=r.multiply(this.z),i=n.multiply(r).mod(this.curve.q),o=this.curve.a.toBigInteger(),s=t.square().multiply(e);BigInteger.ZERO.equals(o)||(s=s.add(this.z.square().multiply(o)));var a=(s=s.mod(this.curve.q)).square().subtract(t.shiftLeft(3).multiply(i)).shiftLeft(1).multiply(n).mod(this.curve.q),u=s.multiply(e).multiply(t).subtract(i.shiftLeft(1)).shiftLeft(2).multiply(i).subtract(s.square().multiply(s)).mod(this.curve.q),c=n.square().multiply(n).shiftLeft(3).mod(this.curve.q);return new ECPointFp(this.curve,this.curve.fromBigInteger(a),this.curve.fromBigInteger(u),c)},ECPointFp.prototype.multiply=function pointFpMultiply(e){if(this.isInfinity())return this;if(0==e.signum())return this.curve.getInfinity();var t,r=e,n=r.multiply(new BigInteger("3")),i=this.negate(),o=this;for(t=n.bitLength()-2;t>0;--t){o=o.twice();var s=n.testBit(t);s!=r.testBit(t)&&(o=o.add(s?this:i))}return o},ECPointFp.prototype.multiplyTwo=function pointFpMultiplyTwo(e,t,r){var n;n=e.bitLength()>r.bitLength()?e.bitLength()-1:r.bitLength()-1;for(var i=this.curve.getInfinity(),o=this.add(t);n>=0;)i=i.twice(),e.testBit(n)?i=r.testBit(n)?i.add(o):i.add(this):r.testBit(n)&&(i=i.add(t)),--n;return i},ECCurveFp.prototype.getQ=function curveFpGetQ(){return this.q},ECCurveFp.prototype.getA=function curveFpGetA(){return this.a},ECCurveFp.prototype.getB=function curveFpGetB(){return this.b},ECCurveFp.prototype.equals=function curveFpEquals(e){return e==this||this.q.equals(e.q)&&this.a.equals(e.a)&&this.b.equals(e.b)},ECCurveFp.prototype.getInfinity=function curveFpGetInfinity(){return this.infinity},ECCurveFp.prototype.fromBigInteger=function curveFpFromBigInteger(e){return new ECFieldElementFp(this.q,e)},ECCurveFp.prototype.decodePointHex=function curveFpDecodePointHex(e){switch(parseInt(e.substr(0,2),16)){case 0:return this.infinity;case 2:case 3:return null;case 4:case 6:case 7:var t=(e.length-2)/2,r=e.substr(2,t),n=e.substr(t+2,t);return new ECPointFp(this,this.fromBigInteger(new BigInteger(r,16)),this.fromBigInteger(new BigInteger(n,16)));default:return null}};
/*! Mike Samuel (c) 2009 | code.google.com/p/json-sans-eval
 */
var K=function(){var e=new RegExp('(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|(?:"(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))*"))',"g"),t=new RegExp("\\\\(?:([^u])|u(.{4}))","g"),r={'"':'"',"/":"/","\\":"\\",b:"\b",f:"\f",n:"\n",r:"\r",t:"\t"};function h(e,t,n){return t?r[t]:String.fromCharCode(parseInt(n,16))}var n=new String(""),o=(Object,Array,Object.hasOwnProperty);return function(r,a){var u,c,l=r.match(e),f=l[0],g=!1;"{"===f?u={}:"["===f?u=[]:(u=[],g=!0);for(var p=[u],d=1-g,v=l.length;d<v;++d){var y;switch((f=l[d]).charCodeAt(0)){default:(y=p[0])[c||y.length]=+f,c=void 0;break;case 34:if(-1!==(f=f.substring(1,f.length-1)).indexOf("\\")&&(f=f.replace(t,h)),y=p[0],!c){if(!(y instanceof Array)){c=f||n;break}c=y.length}y[c]=f,c=void 0;break;case 91:y=p[0],p.unshift(y[c||y.length]=[]),c=void 0;break;case 93:p.shift();break;case 102:(y=p[0])[c||y.length]=!1,c=void 0;break;case 110:(y=p[0])[c||y.length]=null,c=void 0;break;case 116:(y=p[0])[c||y.length]=!0,c=void 0;break;case 123:y=p[0],p.unshift(y[c||y.length]={}),c=void 0;break;case 125:p.shift()}}if(g){if(1!==p.length)throw new Error;u=u[0]}else if(p.length)throw new Error;if(a){u=function s(e,t){var r=e[t];if(r&&"object"===(void 0===r?"undefined":i(r))){var n=null;for(var u in r)if(o.call(r,u)&&r!==e){var c=s(r,u);void 0!==c?r[u]=c:(n||(n=[]),n.push(u))}if(n)for(var h=n.length;--h>=0;)delete r[n[h]]}return a.call(e,t,r)}({"":u},"")}return u}}();void 0!==V&&V||(V={}),void 0!==V.asn1&&V.asn1||(V.asn1={}),V.asn1.ASN1Util=new function(){this.integerToByteHex=function(e){var t=e.toString(16);return t.length%2==1&&(t="0"+t),t},this.bigIntToMinTwosComplementsHex=function(e){var t=e.toString(16);if("-"!=t.substr(0,1))t.length%2==1?t="0"+t:t.match(/^[0-7]/)||(t="00"+t);else{var r=t.substr(1).length;r%2==1?r+=1:t.match(/^[0-7]/)||(r+=2);for(var n="",i=0;i<r;i++)n+="f";t=new BigInteger(n,16).xor(e).add(BigInteger.ONE).toString(16).replace(/^-/,"")}return t},this.getPEMStringFromHex=function(e,t){return hextopem(e,t)},this.newObject=function(e){var t=V.asn1,r=t.DERBoolean,n=t.DERInteger,i=t.DERBitString,o=t.DEROctetString,s=t.DERNull,a=t.DERObjectIdentifier,u=t.DEREnumerated,c=t.DERUTF8String,h=t.DERNumericString,l=t.DERPrintableString,f=t.DERTeletexString,g=t.DERIA5String,p=t.DERUTCTime,d=t.DERGeneralizedTime,v=t.DERSequence,y=t.DERSet,m=t.DERTaggedObject,S=t.ASN1Util.newObject,b=Object.keys(e);if(1!=b.length)throw"key of param shall be only one.";var F=b[0];if(-1==":bool:int:bitstr:octstr:null:oid:enum:utf8str:numstr:prnstr:telstr:ia5str:utctime:gentime:seq:set:tag:".indexOf(":"+F+":"))throw"undefined key: "+F;if("bool"==F)return new r(e[F]);if("int"==F)return new n(e[F]);if("bitstr"==F)return new i(e[F]);if("octstr"==F)return new o(e[F]);if("null"==F)return new s(e[F]);if("oid"==F)return new a(e[F]);if("enum"==F)return new u(e[F]);if("utf8str"==F)return new c(e[F]);if("numstr"==F)return new h(e[F]);if("prnstr"==F)return new l(e[F]);if("telstr"==F)return new f(e[F]);if("ia5str"==F)return new g(e[F]);if("utctime"==F)return new p(e[F]);if("gentime"==F)return new d(e[F]);if("seq"==F){for(var _=e[F],w=[],E=0;E<_.length;E++){var x=S(_[E]);w.push(x)}return new v({array:w})}if("set"==F){for(_=e[F],w=[],E=0;E<_.length;E++){x=S(_[E]);w.push(x)}return new y({array:w})}if("tag"==F){var A=e[F];if("[object Array]"===Object.prototype.toString.call(A)&&3==A.length){var C=S(A[2]);return new m({tag:A[0],explicit:A[1],obj:C})}var P={};if(void 0!==A.explicit&&(P.explicit=A.explicit),void 0!==A.tag&&(P.tag=A.tag),void 0===A.obj)throw"obj shall be specified for 'tag'.";return P.obj=S(A.obj),new m(P)}},this.jsonToASN1HEX=function(e){return this.newObject(e).getEncodedHex()}},V.asn1.ASN1Util.oidHexToInt=function(e){for(var t="",r=parseInt(e.substr(0,2),16),n=(t=Math.floor(r/40)+"."+r%40,""),i=2;i<e.length;i+=2){var o=("00000000"+parseInt(e.substr(i,2),16).toString(2)).slice(-8);if(n+=o.substr(1,7),"0"==o.substr(0,1))t=t+"."+new BigInteger(n,2).toString(10),n=""}return t},V.asn1.ASN1Util.oidIntToHex=function(e){var t=function e(t){var r=t.toString(16);return 1==r.length&&(r="0"+r),r},r=function d(e){var r="",n=new BigInteger(e,10).toString(2),i=7-n.length%7;7==i&&(i=0);for(var o="",s=0;s<i;s++)o+="0";n=o+n;for(s=0;s<n.length-1;s+=7){var a=n.substr(s,7);s!=n.length-7&&(a="1"+a),r+=t(parseInt(a,2))}return r};if(!e.match(/^[0-9.]+$/))throw"malformed oid string: "+e;var n="",i=e.split("."),o=40*parseInt(i[0])+parseInt(i[1]);n+=t(o),i.splice(0,2);for(var s=0;s<i.length;s++)n+=r(i[s]);return n},V.asn1.ASN1Object=function(){this.getLengthHexFromValue=function(){if(void 0===this.hV||null==this.hV)throw"this.hV is null or undefined.";if(this.hV.length%2==1)throw"value hex must be even length: n="+"".length+",v="+this.hV;var e=this.hV.length/2,t=e.toString(16);if(t.length%2==1&&(t="0"+t),e<128)return t;var r=t.length/2;if(r>15)throw"ASN.1 length too long to represent by 8x: n = "+e.toString(16);return(128+r).toString(16)+t},this.getEncodedHex=function(){return(null==this.hTLV||this.isModified)&&(this.hV=this.getFreshValueHex(),this.hL=this.getLengthHexFromValue(),this.hTLV=this.hT+this.hL+this.hV,this.isModified=!1),this.hTLV},this.getValueHex=function(){return this.getEncodedHex(),this.hV},this.getFreshValueHex=function(){return""}},V.asn1.DERAbstractString=function(e){V.asn1.DERAbstractString.superclass.constructor.call(this);this.getString=function(){return this.s},this.setString=function(e){this.hTLV=null,this.isModified=!0,this.s=e,this.hV=utf8tohex(this.s).toLowerCase()},this.setStringHex=function(e){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=e},this.getFreshValueHex=function(){return this.hV},void 0!==e&&("string"==typeof e?this.setString(e):void 0!==e.str?this.setString(e.str):void 0!==e.hex&&this.setStringHex(e.hex))},v.lang.extend(V.asn1.DERAbstractString,V.asn1.ASN1Object),V.asn1.DERAbstractTime=function(e){V.asn1.DERAbstractTime.superclass.constructor.call(this);this.localDateToUTC=function(e){return utc=e.getTime()+6e4*e.getTimezoneOffset(),new Date(utc)},this.formatDate=function(e,t,r){var n=this.zeroPadding,i=this.localDateToUTC(e),o=String(i.getFullYear());"utc"==t&&(o=o.substr(2,2));var s=o+n(String(i.getMonth()+1),2)+n(String(i.getDate()),2)+n(String(i.getHours()),2)+n(String(i.getMinutes()),2)+n(String(i.getSeconds()),2);if(!0===r){var a=i.getMilliseconds();if(0!=a){var u=n(String(a),3);s=s+"."+(u=u.replace(/[0]+$/,""))}}return s+"Z"},this.zeroPadding=function(e,t){return e.length>=t?e:new Array(t-e.length+1).join("0")+e},this.getString=function(){return this.s},this.setString=function(e){this.hTLV=null,this.isModified=!0,this.s=e,this.hV=stohex(e)},this.setByDateValue=function(e,t,r,n,i,o){var s=new Date(Date.UTC(e,t-1,r,n,i,o,0));this.setByDate(s)},this.getFreshValueHex=function(){return this.hV}},v.lang.extend(V.asn1.DERAbstractTime,V.asn1.ASN1Object),V.asn1.DERAbstractStructured=function(e){V.asn1.DERAbstractString.superclass.constructor.call(this);this.setByASN1ObjectArray=function(e){this.hTLV=null,this.isModified=!0,this.asn1Array=e},this.appendASN1Object=function(e){this.hTLV=null,this.isModified=!0,this.asn1Array.push(e)},this.asn1Array=new Array,void 0!==e&&void 0!==e.array&&(this.asn1Array=e.array)},v.lang.extend(V.asn1.DERAbstractStructured,V.asn1.ASN1Object),V.asn1.DERBoolean=function(){V.asn1.DERBoolean.superclass.constructor.call(this),this.hT="01",this.hTLV="0101ff"},v.lang.extend(V.asn1.DERBoolean,V.asn1.ASN1Object),V.asn1.DERInteger=function(e){V.asn1.DERInteger.superclass.constructor.call(this),this.hT="02",this.setByBigInteger=function(e){this.hTLV=null,this.isModified=!0,this.hV=V.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)},this.setByInteger=function(e){var t=new BigInteger(String(e),10);this.setByBigInteger(t)},this.setValueHex=function(e){this.hV=e},this.getFreshValueHex=function(){return this.hV},void 0!==e&&(void 0!==e.bigint?this.setByBigInteger(e.bigint):void 0!==e.int?this.setByInteger(e.int):"number"==typeof e?this.setByInteger(e):void 0!==e.hex&&this.setValueHex(e.hex))},v.lang.extend(V.asn1.DERInteger,V.asn1.ASN1Object),V.asn1.DERBitString=function(e){if(void 0!==e&&void 0!==e.obj){var t=V.asn1.ASN1Util.newObject(e.obj);e.hex="00"+t.getEncodedHex()}V.asn1.DERBitString.superclass.constructor.call(this),this.hT="03",this.setHexValueIncludingUnusedBits=function(e){this.hTLV=null,this.isModified=!0,this.hV=e},this.setUnusedBitsAndHexValue=function(e,t){if(e<0||7<e)throw"unused bits shall be from 0 to 7: u = "+e;var r="0"+e;this.hTLV=null,this.isModified=!0,this.hV=r+t},this.setByBinaryString=function(e){var t=8-(e=e.replace(/0+$/,"")).length%8;8==t&&(t=0);for(var r=0;r<=t;r++)e+="0";var n="";for(r=0;r<e.length-1;r+=8){var i=e.substr(r,8),o=parseInt(i,2).toString(16);1==o.length&&(o="0"+o),n+=o}this.hTLV=null,this.isModified=!0,this.hV="0"+t+n},this.setByBooleanArray=function(e){for(var t="",r=0;r<e.length;r++)1==e[r]?t+="1":t+="0";this.setByBinaryString(t)},this.newFalseArray=function(e){for(var t=new Array(e),r=0;r<e;r++)t[r]=!1;return t},this.getFreshValueHex=function(){return this.hV},void 0!==e&&("string"==typeof e&&e.toLowerCase().match(/^[0-9a-f]+$/)?this.setHexValueIncludingUnusedBits(e):void 0!==e.hex?this.setHexValueIncludingUnusedBits(e.hex):void 0!==e.bin?this.setByBinaryString(e.bin):void 0!==e.array&&this.setByBooleanArray(e.array))},v.lang.extend(V.asn1.DERBitString,V.asn1.ASN1Object),V.asn1.DEROctetString=function(e){if(void 0!==e&&void 0!==e.obj){var t=V.asn1.ASN1Util.newObject(e.obj);e.hex=t.getEncodedHex()}V.asn1.DEROctetString.superclass.constructor.call(this,e),this.hT="04"},v.lang.extend(V.asn1.DEROctetString,V.asn1.DERAbstractString),V.asn1.DERNull=function(){V.asn1.DERNull.superclass.constructor.call(this),this.hT="05",this.hTLV="0500"},v.lang.extend(V.asn1.DERNull,V.asn1.ASN1Object),V.asn1.DERObjectIdentifier=function(e){var t=function b(e){var t=e.toString(16);return 1==t.length&&(t="0"+t),t},r=function a(e){var r="",n=new BigInteger(e,10).toString(2),i=7-n.length%7;7==i&&(i=0);for(var o="",s=0;s<i;s++)o+="0";n=o+n;for(s=0;s<n.length-1;s+=7){var u=n.substr(s,7);s!=n.length-7&&(u="1"+u),r+=t(parseInt(u,2))}return r};V.asn1.DERObjectIdentifier.superclass.constructor.call(this),this.hT="06",this.setValueHex=function(e){this.hTLV=null,this.isModified=!0,this.s=null,this.hV=e},this.setValueOidString=function(e){if(!e.match(/^[0-9.]+$/))throw"malformed oid string: "+e;var n="",i=e.split("."),o=40*parseInt(i[0])+parseInt(i[1]);n+=t(o),i.splice(0,2);for(var s=0;s<i.length;s++)n+=r(i[s]);this.hTLV=null,this.isModified=!0,this.s=null,this.hV=n},this.setValueName=function(e){var t=V.asn1.x509.OID.name2oid(e);if(""===t)throw"DERObjectIdentifier oidName undefined: "+e;this.setValueOidString(t)},this.getFreshValueHex=function(){return this.hV},void 0!==e&&("string"==typeof e?e.match(/^[0-2].[0-9.]+$/)?this.setValueOidString(e):this.setValueName(e):void 0!==e.oid?this.setValueOidString(e.oid):void 0!==e.hex?this.setValueHex(e.hex):void 0!==e.name&&this.setValueName(e.name))},v.lang.extend(V.asn1.DERObjectIdentifier,V.asn1.ASN1Object),V.asn1.DEREnumerated=function(e){V.asn1.DEREnumerated.superclass.constructor.call(this),this.hT="0a",this.setByBigInteger=function(e){this.hTLV=null,this.isModified=!0,this.hV=V.asn1.ASN1Util.bigIntToMinTwosComplementsHex(e)},this.setByInteger=function(e){var t=new BigInteger(String(e),10);this.setByBigInteger(t)},this.setValueHex=function(e){this.hV=e},this.getFreshValueHex=function(){return this.hV},void 0!==e&&(void 0!==e.int?this.setByInteger(e.int):"number"==typeof e?this.setByInteger(e):void 0!==e.hex&&this.setValueHex(e.hex))},v.lang.extend(V.asn1.DEREnumerated,V.asn1.ASN1Object),V.asn1.DERUTF8String=function(e){V.asn1.DERUTF8String.superclass.constructor.call(this,e),this.hT="0c"},v.lang.extend(V.asn1.DERUTF8String,V.asn1.DERAbstractString),V.asn1.DERNumericString=function(e){V.asn1.DERNumericString.superclass.constructor.call(this,e),this.hT="12"},v.lang.extend(V.asn1.DERNumericString,V.asn1.DERAbstractString),V.asn1.DERPrintableString=function(e){V.asn1.DERPrintableString.superclass.constructor.call(this,e),this.hT="13"},v.lang.extend(V.asn1.DERPrintableString,V.asn1.DERAbstractString),V.asn1.DERTeletexString=function(e){V.asn1.DERTeletexString.superclass.constructor.call(this,e),this.hT="14"},v.lang.extend(V.asn1.DERTeletexString,V.asn1.DERAbstractString),V.asn1.DERIA5String=function(e){V.asn1.DERIA5String.superclass.constructor.call(this,e),this.hT="16"},v.lang.extend(V.asn1.DERIA5String,V.asn1.DERAbstractString),V.asn1.DERUTCTime=function(e){V.asn1.DERUTCTime.superclass.constructor.call(this,e),this.hT="17",this.setByDate=function(e){this.hTLV=null,this.isModified=!0,this.date=e,this.s=this.formatDate(this.date,"utc"),this.hV=stohex(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"utc"),this.hV=stohex(this.s)),this.hV},void 0!==e&&(void 0!==e.str?this.setString(e.str):"string"==typeof e&&e.match(/^[0-9]{12}Z$/)?this.setString(e):void 0!==e.hex?this.setStringHex(e.hex):void 0!==e.date&&this.setByDate(e.date))},v.lang.extend(V.asn1.DERUTCTime,V.asn1.DERAbstractTime),V.asn1.DERGeneralizedTime=function(e){V.asn1.DERGeneralizedTime.superclass.constructor.call(this,e),this.hT="18",this.withMillis=!1,this.setByDate=function(e){this.hTLV=null,this.isModified=!0,this.date=e,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=stohex(this.s)},this.getFreshValueHex=function(){return void 0===this.date&&void 0===this.s&&(this.date=new Date,this.s=this.formatDate(this.date,"gen",this.withMillis),this.hV=stohex(this.s)),this.hV},void 0!==e&&(void 0!==e.str?this.setString(e.str):"string"==typeof e&&e.match(/^[0-9]{14}Z$/)?this.setString(e):void 0!==e.hex?this.setStringHex(e.hex):void 0!==e.date&&this.setByDate(e.date),!0===e.millis&&(this.withMillis=!0))},v.lang.extend(V.asn1.DERGeneralizedTime,V.asn1.DERAbstractTime),V.asn1.DERSequence=function(e){V.asn1.DERSequence.superclass.constructor.call(this,e),this.hT="30",this.getFreshValueHex=function(){for(var e="",t=0;t<this.asn1Array.length;t++){e+=this.asn1Array[t].getEncodedHex()}return this.hV=e,this.hV}},v.lang.extend(V.asn1.DERSequence,V.asn1.DERAbstractStructured),V.asn1.DERSet=function(e){V.asn1.DERSet.superclass.constructor.call(this,e),this.hT="31",this.sortFlag=!0,this.getFreshValueHex=function(){for(var e=new Array,t=0;t<this.asn1Array.length;t++){var r=this.asn1Array[t];e.push(r.getEncodedHex())}return 1==this.sortFlag&&e.sort(),this.hV=e.join(""),this.hV},void 0!==e&&void 0!==e.sortflag&&0==e.sortflag&&(this.sortFlag=!1)},v.lang.extend(V.asn1.DERSet,V.asn1.DERAbstractStructured),V.asn1.DERTaggedObject=function(e){V.asn1.DERTaggedObject.superclass.constructor.call(this),this.hT="a0",this.hV="",this.isExplicit=!0,this.asn1Object=null,this.setASN1Object=function(e,t,r){this.hT=t,this.isExplicit=e,this.asn1Object=r,this.isExplicit?(this.hV=this.asn1Object.getEncodedHex(),this.hTLV=null,this.isModified=!0):(this.hV=null,this.hTLV=r.getEncodedHex(),this.hTLV=this.hTLV.replace(/^../,t),this.isModified=!1)},this.getFreshValueHex=function(){return this.hV},void 0!==e&&(void 0!==e.tag&&(this.hT=e.tag),void 0!==e.explicit&&(this.isExplicit=e.explicit),void 0!==e.obj&&(this.asn1Object=e.obj,this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)))},v.lang.extend(V.asn1.DERTaggedObject,V.asn1.ASN1Object);var V,q,W,J=new function(){};function stoBA(e){for(var t=new Array,r=0;r<e.length;r++)t[r]=e.charCodeAt(r);return t}function BAtos(e){for(var t="",r=0;r<e.length;r++)t+=String.fromCharCode(e[r]);return t}function BAtohex(e){for(var t="",r=0;r<e.length;r++){var n=e[r].toString(16);1==n.length&&(n="0"+n),t+=n}return t}function stohex(e){return BAtohex(stoBA(e))}function b64tob64u(e){return e=(e=(e=e.replace(/\=/g,"")).replace(/\+/g,"-")).replace(/\//g,"_")}function b64utob64(e){return e.length%4==2?e+="==":e.length%4==3&&(e+="="),e=(e=e.replace(/-/g,"+")).replace(/_/g,"/")}function hextob64u(e){return e.length%2==1&&(e="0"+e),b64tob64u(hex2b64(e))}function b64utohex(e){return b64tohex(b64utob64(e))}function utf8tohex(e){return uricmptohex(encodeURIComponentAll(e))}function hextoutf8(e){return decodeURIComponent(hextouricmp(e))}function hextorstr(e){for(var t="",r=0;r<e.length-1;r+=2)t+=String.fromCharCode(parseInt(e.substr(r,2),16));return t}function rstrtohex(e){for(var t="",r=0;r<e.length;r++)t+=("0"+e.charCodeAt(r).toString(16)).slice(-2);return t}function hextob64(e){return hex2b64(e)}function hextob64nl(e){var t=hextob64(e).replace(/(.{64})/g,"$1\r\n");return t=t.replace(/\r\n$/,"")}function b64nltohex(e){return b64tohex(e.replace(/[^0-9A-Za-z\/+=]*/g,""))}function hextopem(e,t){return"-----BEGIN "+t+"-----\r\n"+hextob64nl(e)+"\r\n-----END "+t+"-----\r\n"}function pemtohex(e,t){if(-1==e.indexOf("-----BEGIN "))throw"can't find PEM header: "+t;return b64nltohex(e=void 0!==t?(e=e.replace("-----BEGIN "+t+"-----","")).replace("-----END "+t+"-----",""):(e=e.replace(/-----BEGIN [^-]+-----/,"")).replace(/-----END [^-]+-----/,""))}function zulutomsec(e){var t,r,n,i,o,s,a,u,c,h,l;if(l=e.match(/^(\d{2}|\d{4})(\d\d)(\d\d)(\d\d)(\d\d)(\d\d)(|\.\d+)Z$/))return u=l[1],t=parseInt(u),2===u.length&&(50<=t&&t<100?t=1900+t:0<=t&&t<50&&(t=2e3+t)),r=parseInt(l[2])-1,n=parseInt(l[3]),i=parseInt(l[4]),o=parseInt(l[5]),s=parseInt(l[6]),a=0,""!==(c=l[7])&&(h=(c.substr(1)+"00").substr(0,3),a=parseInt(h)),Date.UTC(t,r,n,i,o,s,a);throw"unsupported zulu format: "+e}function zulutosec(e){return~~(zulutomsec(e)/1e3)}function uricmptohex(e){return e.replace(/%/g,"")}function hextouricmp(e){return e.replace(/(..)/g,"%$1")}function ipv6tohex(e){var t="malformed IPv6 address";if(!e.match(/^[0-9A-Fa-f:]+$/))throw t;var r=(e=e.toLowerCase()).split(":").length-1;if(r<2)throw t;var n=":".repeat(7-r+2),i=(e=e.replace("::",n)).split(":");if(8!=i.length)throw t;for(var o=0;o<8;o++)i[o]=("0000"+i[o]).slice(-4);return i.join("")}function hextoipv6(e){if(!e.match(/^[0-9A-Fa-f]{32}$/))throw"malformed IPv6 address octet";for(var t=(e=e.toLowerCase()).match(/.{1,4}/g),r=0;r<8;r++)t[r]=t[r].replace(/^0+/,""),""==t[r]&&(t[r]="0");var n=(e=":"+t.join(":")+":").match(/:(0:){2,}/g);if(null===n)return e.slice(1,-1);var i="";for(r=0;r<n.length;r++)n[r].length>i.length&&(i=n[r]);return(e=e.replace(i,"::")).slice(1,-1)}function hextoip(e){var t="malformed hex value";if(!e.match(/^([0-9A-Fa-f][0-9A-Fa-f]){1,}$/))throw t;if(8!=e.length)return 32==e.length?hextoipv6(e):e;try{return parseInt(e.substr(0,2),16)+"."+parseInt(e.substr(2,2),16)+"."+parseInt(e.substr(4,2),16)+"."+parseInt(e.substr(6,2),16)}catch(e){throw t}}function encodeURIComponentAll(e){for(var t=encodeURIComponent(e),r="",n=0;n<t.length;n++)"%"==t[n]?(r+=t.substr(n,3),n+=2):r=r+"%"+stohex(t[n]);return r}function hextoposhex(e){return e.length%2==1?"0"+e:e.substr(0,1)>"7"?"00"+e:e}J.getLblen=function(e,t){if("8"!=e.substr(t+2,1))return 1;var r=parseInt(e.substr(t+3,1));return 0==r?-1:0<r&&r<10?r+1:-2},J.getL=function(e,t){var r=J.getLblen(e,t);return r<1?"":e.substr(t+2,2*r)},J.getVblen=function(e,t){var r;return""==(r=J.getL(e,t))?-1:("8"===r.substr(0,1)?new BigInteger(r.substr(2),16):new BigInteger(r,16)).intValue()},J.getVidx=function(e,t){var r=J.getLblen(e,t);return r<0?r:t+2*(r+1)},J.getV=function(e,t){var r=J.getVidx(e,t),n=J.getVblen(e,t);return e.substr(r,2*n)},J.getTLV=function(e,t){return e.substr(t,2)+J.getL(e,t)+J.getV(e,t)},J.getNextSiblingIdx=function(e,t){return J.getVidx(e,t)+2*J.getVblen(e,t)},J.getChildIdx=function(e,t){var r=J,n=new Array,i=r.getVidx(e,t);"03"==e.substr(t,2)?n.push(i+2):n.push(i);for(var o=r.getVblen(e,t),s=i,a=0;;){var u=r.getNextSiblingIdx(e,s);if(null==u||u-i>=2*o)break;if(a>=200)break;n.push(u),s=u,a++}return n},J.getNthChildIdx=function(e,t,r){return J.getChildIdx(e,t)[r]},J.getIdxbyList=function(e,t,r,n){var i,o,s=J;if(0==r.length){if(void 0!==n&&e.substr(t,2)!==n)throw"checking tag doesn't match: "+e.substr(t,2)+"!="+n;return t}return i=r.shift(),o=s.getChildIdx(e,t),s.getIdxbyList(e,o[i],r,n)},J.getTLVbyList=function(e,t,r,n){var i=J,o=i.getIdxbyList(e,t,r);if(void 0===o)throw"can't find nthList object";if(void 0!==n&&e.substr(o,2)!=n)throw"checking tag doesn't match: "+e.substr(o,2)+"!="+n;return i.getTLV(e,o)},J.getVbyList=function(e,t,r,n,i){var o,s,a=J;if(void 0===(o=a.getIdxbyList(e,t,r,n)))throw"can't find nthList object";return s=a.getV(e,o),!0===i&&(s=s.substr(2)),s},J.hextooidstr=function(e){var t=function h(e,t){return e.length>=t?e:new Array(t-e.length+1).join("0")+e},r=[],n=e.substr(0,2),i=parseInt(n,16);r[0]=new String(Math.floor(i/40)),r[1]=new String(i%40);for(var o=e.substr(2),s=[],a=0;a<o.length/2;a++)s.push(parseInt(o.substr(2*a,2),16));var u=[],c="";for(a=0;a<s.length;a++)128&s[a]?c+=t((127&s[a]).toString(2),7):(c+=t((127&s[a]).toString(2),7),u.push(new String(parseInt(c,2))),c="");var h=r.join(".");return u.length>0&&(h=h+"."+u.join(".")),h},J.dump=function(e,t,r,n){var i=J,o=i.getV,s=i.dump,a=i.getChildIdx,u=e;e instanceof V.asn1.ASN1Object&&(u=e.getEncodedHex());var c=function q(e,t){return e.length<=2*t?e:e.substr(0,t)+"..(total "+e.length/2+"bytes).."+e.substr(e.length-t,t)};void 0===t&&(t={ommit_long_octet:32}),void 0===r&&(r=0),void 0===n&&(n="");var h=t.ommit_long_octet;if("01"==u.substr(r,2))return"00"==(l=o(u,r))?n+"BOOLEAN FALSE\n":n+"BOOLEAN TRUE\n";if("02"==u.substr(r,2))return n+"INTEGER "+c(l=o(u,r),h)+"\n";if("03"==u.substr(r,2))return n+"BITSTRING "+c(l=o(u,r),h)+"\n";if("04"==u.substr(r,2)){var l=o(u,r);if(i.isASN1HEX(l)){var f=n+"OCTETSTRING, encapsulates\n";return f+=s(l,t,0,n+"  ")}return n+"OCTETSTRING "+c(l,h)+"\n"}if("05"==u.substr(r,2))return n+"NULL\n";if("06"==u.substr(r,2)){var g=o(u,r),p=V.asn1.ASN1Util.oidHexToInt(g),d=V.asn1.x509.OID.oid2name(p),v=p.replace(/\./g," ");return""!=d?n+"ObjectIdentifier "+d+" ("+v+")\n":n+"ObjectIdentifier ("+v+")\n"}if("0c"==u.substr(r,2))return n+"UTF8String '"+hextoutf8(o(u,r))+"'\n";if("13"==u.substr(r,2))return n+"PrintableString '"+hextoutf8(o(u,r))+"'\n";if("14"==u.substr(r,2))return n+"TeletexString '"+hextoutf8(o(u,r))+"'\n";if("16"==u.substr(r,2))return n+"IA5String '"+hextoutf8(o(u,r))+"'\n";if("17"==u.substr(r,2))return n+"UTCTime "+hextoutf8(o(u,r))+"\n";if("18"==u.substr(r,2))return n+"GeneralizedTime "+hextoutf8(o(u,r))+"\n";if("30"==u.substr(r,2)){if("3000"==u.substr(r,4))return n+"SEQUENCE {}\n";f=n+"SEQUENCE\n";var y=t;if((2==(b=a(u,r)).length||3==b.length)&&"06"==u.substr(b[0],2)&&"04"==u.substr(b[b.length-1],2)){d=i.oidname(o(u,b[0]));var m=JSON.parse(JSON.stringify(t));m.x509ExtName=d,y=m}for(var S=0;S<b.length;S++)f+=s(u,y,b[S],n+"  ");return f}if("31"==u.substr(r,2)){f=n+"SET\n";var b=a(u,r);for(S=0;S<b.length;S++)f+=s(u,t,b[S],n+"  ");return f}var F=parseInt(u.substr(r,2),16);if(0!=(128&F)){var _=31&F;if(0!=(32&F)){var f=n+"["+_+"]\n";for(b=a(u,r),S=0;S<b.length;S++)f+=s(u,t,b[S],n+"  ");return f}return"68747470"==(l=o(u,r)).substr(0,8)&&(l=hextoutf8(l)),"subjectAltName"===t.x509ExtName&&2==_&&(l=hextoutf8(l)),f=n+"["+_+"] "+l+"\n"}return n+"UNKNOWN("+u.substr(r,2)+") "+o(u,r)+"\n"},J.isASN1HEX=function(e){var t=J;if(e.length%2==1)return!1;var r=t.getVblen(e,0),n=e.substr(0,2),i=t.getL(e,0);return e.length-n.length-i.length==2*r},J.oidname=function(e){var t=V.asn1;V.lang.String.isHex(e)&&(e=t.ASN1Util.oidHexToInt(e));var r=t.x509.OID.oid2name(e);return""===r&&(r=e),r},void 0!==V&&V||(V={}),void 0!==V.lang&&V.lang||(V.lang={}),V.lang.String=function(){},"function"==typeof n?(q=function utf8tob64u(e){return b64tob64u(new n(e,"utf8").toString("base64"))},W=function b64utoutf8(e){return new n(b64utob64(e),"base64").toString("utf8")}):(q=function utf8tob64u(e){return hextob64u(uricmptohex(encodeURIComponentAll(e)))},W=function b64utoutf8(e){return decodeURIComponent(hextouricmp(b64utohex(e)))}),V.lang.String.isInteger=function(e){return!!e.match(/^[0-9]+$/)||!!e.match(/^-[0-9]+$/)},V.lang.String.isHex=function(e){return!(e.length%2!=0||!e.match(/^[0-9a-f]+$/)&&!e.match(/^[0-9A-F]+$/))},V.lang.String.isBase64=function(e){return!(!(e=e.replace(/\s+/g,"")).match(/^[0-9A-Za-z+\/]+={0,3}$/)||e.length%4!=0)},V.lang.String.isBase64URL=function(e){return!e.match(/[+/=]/)&&(e=b64utob64(e),V.lang.String.isBase64(e))},V.lang.String.isIntegerArray=function(e){return!!(e=e.replace(/\s+/g,"")).match(/^\[[0-9,]+\]$/)};void 0!==V&&V||(V={}),void 0!==V.crypto&&V.crypto||(V.crypto={}),V.crypto.Util=new function(){this.DIGESTINFOHEAD={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414"},this.DEFAULTPROVIDER={md5:"cryptojs",sha1:"cryptojs",sha224:"cryptojs",sha256:"cryptojs",sha384:"cryptojs",sha512:"cryptojs",ripemd160:"cryptojs",hmacmd5:"cryptojs",hmacsha1:"cryptojs",hmacsha224:"cryptojs",hmacsha256:"cryptojs",hmacsha384:"cryptojs",hmacsha512:"cryptojs",hmacripemd160:"cryptojs",MD5withRSA:"cryptojs/jsrsa",SHA1withRSA:"cryptojs/jsrsa",SHA224withRSA:"cryptojs/jsrsa",SHA256withRSA:"cryptojs/jsrsa",SHA384withRSA:"cryptojs/jsrsa",SHA512withRSA:"cryptojs/jsrsa",RIPEMD160withRSA:"cryptojs/jsrsa",MD5withECDSA:"cryptojs/jsrsa",SHA1withECDSA:"cryptojs/jsrsa",SHA224withECDSA:"cryptojs/jsrsa",SHA256withECDSA:"cryptojs/jsrsa",SHA384withECDSA:"cryptojs/jsrsa",SHA512withECDSA:"cryptojs/jsrsa",RIPEMD160withECDSA:"cryptojs/jsrsa",SHA1withDSA:"cryptojs/jsrsa",SHA224withDSA:"cryptojs/jsrsa",SHA256withDSA:"cryptojs/jsrsa",MD5withRSAandMGF1:"cryptojs/jsrsa",SHA1withRSAandMGF1:"cryptojs/jsrsa",SHA224withRSAandMGF1:"cryptojs/jsrsa",SHA256withRSAandMGF1:"cryptojs/jsrsa",SHA384withRSAandMGF1:"cryptojs/jsrsa",SHA512withRSAandMGF1:"cryptojs/jsrsa",RIPEMD160withRSAandMGF1:"cryptojs/jsrsa"},this.CRYPTOJSMESSAGEDIGESTNAME={md5:y.algo.MD5,sha1:y.algo.SHA1,sha224:y.algo.SHA224,sha256:y.algo.SHA256,sha384:y.algo.SHA384,sha512:y.algo.SHA512,ripemd160:y.algo.RIPEMD160},this.getDigestInfoHex=function(e,t){if(void 0===this.DIGESTINFOHEAD[t])throw"alg not supported in Util.DIGESTINFOHEAD: "+t;return this.DIGESTINFOHEAD[t]+e},this.getPaddedDigestInfoHex=function(e,t,r){var n=this.getDigestInfoHex(e,t),i=r/4;if(n.length+22>i)throw"key is too short for SigAlg: keylen="+r+","+t;for(var o="0001",s="00"+n,a="",u=i-o.length-s.length,c=0;c<u;c+=2)a+="ff";return o+a+s},this.hashString=function(e,t){return new V.crypto.MessageDigest({alg:t}).digestString(e)},this.hashHex=function(e,t){return new V.crypto.MessageDigest({alg:t}).digestHex(e)},this.sha1=function(e){return new V.crypto.MessageDigest({alg:"sha1",prov:"cryptojs"}).digestString(e)},this.sha256=function(e){return new V.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"}).digestString(e)},this.sha256Hex=function(e){return new V.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"}).digestHex(e)},this.sha512=function(e){return new V.crypto.MessageDigest({alg:"sha512",prov:"cryptojs"}).digestString(e)},this.sha512Hex=function(e){return new V.crypto.MessageDigest({alg:"sha512",prov:"cryptojs"}).digestHex(e)}},V.crypto.Util.md5=function(e){return new V.crypto.MessageDigest({alg:"md5",prov:"cryptojs"}).digestString(e)},V.crypto.Util.ripemd160=function(e){return new V.crypto.MessageDigest({alg:"ripemd160",prov:"cryptojs"}).digestString(e)},V.crypto.Util.SECURERANDOMGEN=new SecureRandom,V.crypto.Util.getRandomHexOfNbytes=function(e){var t=new Array(e);return V.crypto.Util.SECURERANDOMGEN.nextBytes(t),BAtohex(t)},V.crypto.Util.getRandomBigIntegerOfNbytes=function(e){return new BigInteger(V.crypto.Util.getRandomHexOfNbytes(e),16)},V.crypto.Util.getRandomHexOfNbits=function(e){var t=e%8,r=new Array((e-t)/8+1);return V.crypto.Util.SECURERANDOMGEN.nextBytes(r),r[0]=(255<<t&255^255)&r[0],BAtohex(r)},V.crypto.Util.getRandomBigIntegerOfNbits=function(e){return new BigInteger(V.crypto.Util.getRandomHexOfNbits(e),16)},V.crypto.Util.getRandomBigIntegerZeroToMax=function(e){for(var t=e.bitLength();;){var r=V.crypto.Util.getRandomBigIntegerOfNbits(t);if(-1!=e.compareTo(r))return r}},V.crypto.Util.getRandomBigIntegerMinToMax=function(e,t){var r=e.compareTo(t);if(1==r)throw"biMin is greater than biMax";if(0==r)return e;var n=t.subtract(e);return V.crypto.Util.getRandomBigIntegerZeroToMax(n).add(e)},V.crypto.MessageDigest=function(e){this.setAlgAndProvider=function(e,t){if(null!==(e=V.crypto.MessageDigest.getCanonicalAlgName(e))&&void 0===t&&(t=V.crypto.Util.DEFAULTPROVIDER[e]),-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(e)&&"cryptojs"==t){try{this.md=V.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[e].create()}catch(t){throw"setAlgAndProvider hash alg set fail alg="+e+"/"+t}this.updateString=function(e){this.md.update(e)},this.updateHex=function(e){var t=y.enc.Hex.parse(e);this.md.update(t)},this.digest=function(){return this.md.finalize().toString(y.enc.Hex)},this.digestString=function(e){return this.updateString(e),this.digest()},this.digestHex=function(e){return this.updateHex(e),this.digest()}}if(-1!=":sha256:".indexOf(e)&&"sjcl"==t){try{this.md=new sjcl.hash.sha256}catch(t){throw"setAlgAndProvider hash alg set fail alg="+e+"/"+t}this.updateString=function(e){this.md.update(e)},this.updateHex=function(e){var t=sjcl.codec.hex.toBits(e);this.md.update(t)},this.digest=function(){var e=this.md.finalize();return sjcl.codec.hex.fromBits(e)},this.digestString=function(e){return this.updateString(e),this.digest()},this.digestHex=function(e){return this.updateHex(e),this.digest()}}},this.updateString=function(e){throw"updateString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.updateHex=function(e){throw"updateHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digest=function(){throw"digest() not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digestString=function(e){throw"digestString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName},this.digestHex=function(e){throw"digestHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName},void 0!==e&&void 0!==e.alg&&(this.algName=e.alg,void 0===e.prov&&(this.provName=V.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName))},V.crypto.MessageDigest.getCanonicalAlgName=function(e){return"string"==typeof e&&(e=(e=e.toLowerCase()).replace(/-/,"")),e},V.crypto.MessageDigest.getHashLength=function(e){var t=V.crypto.MessageDigest,r=t.getCanonicalAlgName(e);if(void 0===t.HASHLENGTH[r])throw"not supported algorithm: "+e;return t.HASHLENGTH[r]},V.crypto.MessageDigest.HASHLENGTH={md5:16,sha1:20,sha224:28,sha256:32,sha384:48,sha512:64,ripemd160:20},V.crypto.Mac=function(e){this.setAlgAndProvider=function(e,t){if(null==(e=e.toLowerCase())&&(e="hmacsha1"),"hmac"!=(e=e.toLowerCase()).substr(0,4))throw"setAlgAndProvider unsupported HMAC alg: "+e;void 0===t&&(t=V.crypto.Util.DEFAULTPROVIDER[e]),this.algProv=e+"/"+t;var r=e.substr(4);if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(r)&&"cryptojs"==t){try{var n=V.crypto.Util.CRYPTOJSMESSAGEDIGESTNAME[r];this.mac=y.algo.HMAC.create(n,this.pass)}catch(e){throw"setAlgAndProvider hash alg set fail hashAlg="+r+"/"+e}this.updateString=function(e){this.mac.update(e)},this.updateHex=function(e){var t=y.enc.Hex.parse(e);this.mac.update(t)},this.doFinal=function(){return this.mac.finalize().toString(y.enc.Hex)},this.doFinalString=function(e){return this.updateString(e),this.doFinal()},this.doFinalHex=function(e){return this.updateHex(e),this.doFinal()}}},this.updateString=function(e){throw"updateString(str) not supported for this alg/prov: "+this.algProv},this.updateHex=function(e){throw"updateHex(hex) not supported for this alg/prov: "+this.algProv},this.doFinal=function(){throw"digest() not supported for this alg/prov: "+this.algProv},this.doFinalString=function(e){throw"digestString(str) not supported for this alg/prov: "+this.algProv},this.doFinalHex=function(e){throw"digestHex(hex) not supported for this alg/prov: "+this.algProv},this.setPassword=function(e){if("string"==typeof e){var t=e;return e.length%2!=1&&e.match(/^[0-9A-Fa-f]+$/)||(t=rstrtohex(e)),void(this.pass=y.enc.Hex.parse(t))}if("object"!=(void 0===e?"undefined":i(e)))throw"KJUR.crypto.Mac unsupported password type: "+e;t=null;if(void 0!==e.hex){if(e.hex.length%2!=0||!e.hex.match(/^[0-9A-Fa-f]+$/))throw"Mac: wrong hex password: "+e.hex;t=e.hex}if(void 0!==e.utf8&&(t=utf8tohex(e.utf8)),void 0!==e.rstr&&(t=rstrtohex(e.rstr)),void 0!==e.b64&&(t=b64tohex(e.b64)),void 0!==e.b64u&&(t=b64utohex(e.b64u)),null==t)throw"KJUR.crypto.Mac unsupported password type: "+e;this.pass=y.enc.Hex.parse(t)},void 0!==e&&(void 0!==e.pass&&this.setPassword(e.pass),void 0!==e.alg&&(this.algName=e.alg,void 0===e.prov&&(this.provName=V.crypto.Util.DEFAULTPROVIDER[this.algName]),this.setAlgAndProvider(this.algName,this.provName)))},V.crypto.Signature=function(e){var t=null;if(this._setAlgNames=function(){var e=this.algName.match(/^(.+)with(.+)$/);e&&(this.mdAlgName=e[1].toLowerCase(),this.pubkeyAlgName=e[2].toLowerCase())},this._zeroPaddingOfSignature=function(e,t){for(var r="",n=t/4-e.length,i=0;i<n;i++)r+="0";return r+e},this.setAlgAndProvider=function(e,t){if(this._setAlgNames(),"cryptojs/jsrsa"!=t)throw"provider not supported: "+t;if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)){try{this.md=new V.crypto.MessageDigest({alg:this.mdAlgName})}catch(e){throw"setAlgAndProvider hash alg set fail alg="+this.mdAlgName+"/"+e}this.init=function(e,t){var r=null;try{r=void 0===t?z.getKey(e):z.getKey(e,t)}catch(e){throw"init failed:"+e}if(!0===r.isPrivate)this.prvKey=r,this.state="SIGN";else{if(!0!==r.isPublic)throw"init failed.:"+r;this.pubKey=r,this.state="VERIFY"}},this.updateString=function(e){this.md.updateString(e)},this.updateHex=function(e){this.md.updateHex(e)},this.sign=function(){if(this.sHashHex=this.md.digest(),void 0!==this.ecprvhex&&void 0!==this.eccurvename){var e=new V.crypto.ECDSA({curve:this.eccurvename});this.hSign=e.signHex(this.sHashHex,this.ecprvhex)}else if(this.prvKey instanceof RSAKey&&"rsaandmgf1"===this.pubkeyAlgName)this.hSign=this.prvKey.signWithMessageHashPSS(this.sHashHex,this.mdAlgName,this.pssSaltLen);else if(this.prvKey instanceof RSAKey&&"rsa"===this.pubkeyAlgName)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex,this.mdAlgName);else if(this.prvKey instanceof V.crypto.ECDSA)this.hSign=this.prvKey.signWithMessageHash(this.sHashHex);else{if(!(this.prvKey instanceof V.crypto.DSA))throw"Signature: unsupported private key alg: "+this.pubkeyAlgName;this.hSign=this.prvKey.signWithMessageHash(this.sHashHex)}return this.hSign},this.signString=function(e){return this.updateString(e),this.sign()},this.signHex=function(e){return this.updateHex(e),this.sign()},this.verify=function(e){if(this.sHashHex=this.md.digest(),void 0!==this.ecpubhex&&void 0!==this.eccurvename)return new V.crypto.ECDSA({curve:this.eccurvename}).verifyHex(this.sHashHex,e,this.ecpubhex);if(this.pubKey instanceof RSAKey&&"rsaandmgf1"===this.pubkeyAlgName)return this.pubKey.verifyWithMessageHashPSS(this.sHashHex,e,this.mdAlgName,this.pssSaltLen);if(this.pubKey instanceof RSAKey&&"rsa"===this.pubkeyAlgName)return this.pubKey.verifyWithMessageHash(this.sHashHex,e);if(void 0!==V.crypto.ECDSA&&this.pubKey instanceof V.crypto.ECDSA)return this.pubKey.verifyWithMessageHash(this.sHashHex,e);if(void 0!==V.crypto.DSA&&this.pubKey instanceof V.crypto.DSA)return this.pubKey.verifyWithMessageHash(this.sHashHex,e);throw"Signature: unsupported public key alg: "+this.pubkeyAlgName}}},this.init=function(e,t){throw"init(key, pass) not supported for this alg:prov="+this.algProvName},this.updateString=function(e){throw"updateString(str) not supported for this alg:prov="+this.algProvName},this.updateHex=function(e){throw"updateHex(hex) not supported for this alg:prov="+this.algProvName},this.sign=function(){throw"sign() not supported for this alg:prov="+this.algProvName},this.signString=function(e){throw"digestString(str) not supported for this alg:prov="+this.algProvName},this.signHex=function(e){throw"digestHex(hex) not supported for this alg:prov="+this.algProvName},this.verify=function(e){throw"verify(hSigVal) not supported for this alg:prov="+this.algProvName},this.initParams=e,void 0!==e&&(void 0!==e.alg&&(this.algName=e.alg,void 0===e.prov?this.provName=V.crypto.Util.DEFAULTPROVIDER[this.algName]:this.provName=e.prov,this.algProvName=this.algName+":"+this.provName,this.setAlgAndProvider(this.algName,this.provName),this._setAlgNames()),void 0!==e.psssaltlen&&(this.pssSaltLen=e.psssaltlen),void 0!==e.prvkeypem)){if(void 0!==e.prvkeypas)throw"both prvkeypem and prvkeypas parameters not supported";try{t=z.getKey(e.prvkeypem);this.init(t)}catch(e){throw"fatal error to load pem private key: "+e}}},V.crypto.Cipher=function(e){},V.crypto.Cipher.encrypt=function(e,t,r){if(t instanceof RSAKey&&t.isPublic){var n=V.crypto.Cipher.getAlgByKeyAndName(t,r);if("RSA"===n)return t.encrypt(e);if("RSAOAEP"===n)return t.encryptOAEP(e,"sha1");var i=n.match(/^RSAOAEP(\d+)$/);if(null!==i)return t.encryptOAEP(e,"sha"+i[1]);throw"Cipher.encrypt: unsupported algorithm for RSAKey: "+r}throw"Cipher.encrypt: unsupported key or algorithm"},V.crypto.Cipher.decrypt=function(e,t,r){if(t instanceof RSAKey&&t.isPrivate){var n=V.crypto.Cipher.getAlgByKeyAndName(t,r);if("RSA"===n)return t.decrypt(e);if("RSAOAEP"===n)return t.decryptOAEP(e,"sha1");var i=n.match(/^RSAOAEP(\d+)$/);if(null!==i)return t.decryptOAEP(e,"sha"+i[1]);throw"Cipher.decrypt: unsupported algorithm for RSAKey: "+r}throw"Cipher.decrypt: unsupported key or algorithm"},V.crypto.Cipher.getAlgByKeyAndName=function(e,t){if(e instanceof RSAKey){if(-1!=":RSA:RSAOAEP:RSAOAEP224:RSAOAEP256:RSAOAEP384:RSAOAEP512:".indexOf(t))return t;if(null===t||void 0===t)return"RSA";throw"getAlgByKeyAndName: not supported algorithm name for RSAKey: "+t}throw"getAlgByKeyAndName: not supported algorithm name: "+t},V.crypto.OID=new function(){this.oidhex2name={"2a864886f70d010101":"rsaEncryption","2a8648ce3d0201":"ecPublicKey","2a8648ce380401":"dsa","2a8648ce3d030107":"secp256r1","2b8104001f":"secp192k1","2b81040021":"secp224r1","2b8104000a":"secp256k1","2b81040023":"secp521r1","2b81040022":"secp384r1","2a8648ce380403":"SHA1withDSA","608648016503040301":"SHA224withDSA","608648016503040302":"SHA256withDSA"}},void 0!==V&&V||(V={}),void 0!==V.crypto&&V.crypto||(V.crypto={}),V.crypto.ECDSA=function(e){var t=new SecureRandom;this.type="EC",this.isPrivate=!1,this.isPublic=!1,this.getBigRandom=function(e){return new BigInteger(e.bitLength(),t).mod(e.subtract(BigInteger.ONE)).add(BigInteger.ONE)},this.setNamedCurve=function(e){this.ecparams=V.crypto.ECParameterDB.getByName(e),this.prvKeyHex=null,this.pubKeyHex=null,this.curveName=e},this.setPrivateKeyHex=function(e){this.isPrivate=!0,this.prvKeyHex=e},this.setPublicKeyHex=function(e){this.isPublic=!0,this.pubKeyHex=e},this.getPublicKeyXYHex=function(){var e=this.pubKeyHex;if("04"!==e.substr(0,2))throw"this method supports uncompressed format(04) only";var t=this.ecparams.keylen/4;if(e.length!==2+2*t)throw"malformed public key hex length";var r={};return r.x=e.substr(2,t),r.y=e.substr(2+t),r},this.getShortNISTPCurveName=function(){var e=this.curveName;return"secp256r1"===e||"NIST P-256"===e||"P-256"===e||"prime256v1"===e?"P-256":"secp384r1"===e||"NIST P-384"===e||"P-384"===e?"P-384":null},this.generateKeyPairHex=function(){var e=this.ecparams.n,t=this.getBigRandom(e),r=this.ecparams.G.multiply(t),n=r.getX().toBigInteger(),i=r.getY().toBigInteger(),o=this.ecparams.keylen/4,s=("0000000000"+t.toString(16)).slice(-o),a="04"+("0000000000"+n.toString(16)).slice(-o)+("0000000000"+i.toString(16)).slice(-o);return this.setPrivateKeyHex(s),this.setPublicKeyHex(a),{ecprvhex:s,ecpubhex:a}},this.signWithMessageHash=function(e){return this.signHex(e,this.prvKeyHex)},this.signHex=function(e,t){var r=new BigInteger(t,16),n=this.ecparams.n,i=new BigInteger(e,16);do{var o=this.getBigRandom(n),s=this.ecparams.G.multiply(o).getX().toBigInteger().mod(n)}while(s.compareTo(BigInteger.ZERO)<=0);var a=o.modInverse(n).multiply(i.add(r.multiply(s))).mod(n);return V.crypto.ECDSA.biRSSigToASN1Sig(s,a)},this.sign=function(e,t){var r=t,n=this.ecparams.n,i=BigInteger.fromByteArrayUnsigned(e);do{var o=this.getBigRandom(n),s=this.ecparams.G.multiply(o).getX().toBigInteger().mod(n)}while(s.compareTo(BigInteger.ZERO)<=0);var a=o.modInverse(n).multiply(i.add(r.multiply(s))).mod(n);return this.serializeSig(s,a)},this.verifyWithMessageHash=function(e,t){return this.verifyHex(e,t,this.pubKeyHex)},this.verifyHex=function(e,t,r){var n,i,o,s=V.crypto.ECDSA.parseSigHex(t);n=s.r,i=s.s,o=ECPointFp.decodeFromHex(this.ecparams.curve,r);var a=new BigInteger(e,16);return this.verifyRaw(a,n,i,o)},this.verify=function(e,t,r){var n,o,s;if(Bitcoin.Util.isArray(t)){var a=this.parseSig(t);n=a.r,o=a.s}else{if("object"!==(void 0===t?"undefined":i(t))||!t.r||!t.s)throw"Invalid value for signature";n=t.r,o=t.s}if(r instanceof ECPointFp)s=r;else{if(!Bitcoin.Util.isArray(r))throw"Invalid format for pubkey value, must be byte array or ECPointFp";s=ECPointFp.decodeFrom(this.ecparams.curve,r)}var u=BigInteger.fromByteArrayUnsigned(e);return this.verifyRaw(u,n,o,s)},this.verifyRaw=function(e,t,r,n){var i=this.ecparams.n,o=this.ecparams.G;if(t.compareTo(BigInteger.ONE)<0||t.compareTo(i)>=0)return!1;if(r.compareTo(BigInteger.ONE)<0||r.compareTo(i)>=0)return!1;var s=r.modInverse(i),a=e.multiply(s).mod(i),u=t.multiply(s).mod(i);return o.multiply(a).add(n.multiply(u)).getX().toBigInteger().mod(i).equals(t)},this.serializeSig=function(e,t){var r=e.toByteArraySigned(),n=t.toByteArraySigned(),i=[];return i.push(2),i.push(r.length),(i=i.concat(r)).push(2),i.push(n.length),(i=i.concat(n)).unshift(i.length),i.unshift(48),i},this.parseSig=function(e){var t;if(48!=e[0])throw new Error("Signature not a valid DERSequence");if(2!=e[t=2])throw new Error("First element in signature must be a DERInteger");var r=e.slice(t+2,t+2+e[t+1]);if(2!=e[t+=2+e[t+1]])throw new Error("Second element in signature must be a DERInteger");var n=e.slice(t+2,t+2+e[t+1]);return t+=2+e[t+1],{r:BigInteger.fromByteArrayUnsigned(r),s:BigInteger.fromByteArrayUnsigned(n)}},this.parseSigCompact=function(e){if(65!==e.length)throw"Signature has the wrong length";var t=e[0]-27;if(t<0||t>7)throw"Invalid signature type";var r=this.ecparams.n;return{r:BigInteger.fromByteArrayUnsigned(e.slice(1,33)).mod(r),s:BigInteger.fromByteArrayUnsigned(e.slice(33,65)).mod(r),i:t}},this.readPKCS5PrvKeyHex=function(e){var t,r,n,i=J,o=V.crypto.ECDSA.getName,s=i.getVbyList;if(!1===i.isASN1HEX(e))throw"not ASN.1 hex string";try{t=s(e,0,[2,0],"06"),r=s(e,0,[1],"04");try{n=s(e,0,[3,0],"03").substr(2)}catch(e){}}catch(e){throw"malformed PKCS#1/5 plain ECC private key"}if(this.curveName=o(t),void 0===this.curveName)throw"unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(n),this.setPrivateKeyHex(r),this.isPublic=!1},this.readPKCS8PrvKeyHex=function(e){var t,r,n,i=J,o=V.crypto.ECDSA.getName,s=i.getVbyList;if(!1===i.isASN1HEX(e))throw"not ASN.1 hex string";try{s(e,0,[1,0],"06"),t=s(e,0,[1,1],"06"),r=s(e,0,[2,0,1],"04");try{n=s(e,0,[2,0,2,0],"03").substr(2)}catch(e){}}catch(e){throw"malformed PKCS#8 plain ECC private key"}if(this.curveName=o(t),void 0===this.curveName)throw"unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(n),this.setPrivateKeyHex(r),this.isPublic=!1},this.readPKCS8PubKeyHex=function(e){var t,r,n=J,i=V.crypto.ECDSA.getName,o=n.getVbyList;if(!1===n.isASN1HEX(e))throw"not ASN.1 hex string";try{o(e,0,[0,0],"06"),t=o(e,0,[0,1],"06"),r=o(e,0,[1],"03").substr(2)}catch(e){throw"malformed PKCS#8 ECC public key"}if(this.curveName=i(t),null===this.curveName)throw"unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(r)},this.readCertPubKeyHex=function(e,t){5!==t&&(t=6);var r,n,i=J,o=V.crypto.ECDSA.getName,s=i.getVbyList;if(!1===i.isASN1HEX(e))throw"not ASN.1 hex string";try{r=s(e,0,[0,t,0,1],"06"),n=s(e,0,[0,t,1],"03").substr(2)}catch(e){throw"malformed X.509 certificate ECC public key"}if(this.curveName=o(r),null===this.curveName)throw"unsupported curve name";this.setNamedCurve(this.curveName),this.setPublicKeyHex(n)},void 0!==e&&void 0!==e.curve&&(this.curveName=e.curve),void 0===this.curveName&&(this.curveName="secp256r1"),this.setNamedCurve(this.curveName),void 0!==e&&(void 0!==e.prv&&this.setPrivateKeyHex(e.prv),void 0!==e.pub&&this.setPublicKeyHex(e.pub))},V.crypto.ECDSA.parseSigHex=function(e){var t=V.crypto.ECDSA.parseSigHexInHexRS(e);return{r:new BigInteger(t.r,16),s:new BigInteger(t.s,16)}},V.crypto.ECDSA.parseSigHexInHexRS=function(e){var t=J,r=t.getChildIdx,n=t.getV;if("30"!=e.substr(0,2))throw"signature is not a ASN.1 sequence";var i=r(e,0);if(2!=i.length)throw"number of signature ASN.1 sequence elements seem wrong";var o=i[0],s=i[1];if("02"!=e.substr(o,2))throw"1st item of sequene of signature is not ASN.1 integer";if("02"!=e.substr(s,2))throw"2nd item of sequene of signature is not ASN.1 integer";return{r:n(e,o),s:n(e,s)}},V.crypto.ECDSA.asn1SigToConcatSig=function(e){var t=V.crypto.ECDSA.parseSigHexInHexRS(e),r=t.r,n=t.s;if("00"==r.substr(0,2)&&r.length%32==2&&(r=r.substr(2)),"00"==n.substr(0,2)&&n.length%32==2&&(n=n.substr(2)),r.length%32==30&&(r="00"+r),n.length%32==30&&(n="00"+n),r.length%32!=0)throw"unknown ECDSA sig r length error";if(n.length%32!=0)throw"unknown ECDSA sig s length error";return r+n},V.crypto.ECDSA.concatSigToASN1Sig=function(e){if(e.length/2*8%128!=0)throw"unknown ECDSA concatinated r-s sig  length error";var t=e.substr(0,e.length/2),r=e.substr(e.length/2);return V.crypto.ECDSA.hexRSSigToASN1Sig(t,r)},V.crypto.ECDSA.hexRSSigToASN1Sig=function(e,t){var r=new BigInteger(e,16),n=new BigInteger(t,16);return V.crypto.ECDSA.biRSSigToASN1Sig(r,n)},V.crypto.ECDSA.biRSSigToASN1Sig=function(e,t){var r=V.asn1,n=new r.DERInteger({bigint:e}),i=new r.DERInteger({bigint:t});return new r.DERSequence({array:[n,i]}).getEncodedHex()},V.crypto.ECDSA.getName=function(e){return"2a8648ce3d030107"===e?"secp256r1":"2b8104000a"===e?"secp256k1":"2b81040022"===e?"secp384r1":-1!=="|secp256r1|NIST P-256|P-256|prime256v1|".indexOf(e)?"secp256r1":-1!=="|secp256k1|".indexOf(e)?"secp256k1":-1!=="|secp384r1|NIST P-384|P-384|".indexOf(e)?"secp384r1":null},void 0!==V&&V||(V={}),void 0!==V.crypto&&V.crypto||(V.crypto={}),V.crypto.ECParameterDB=new function(){var e={},t={};function a(e){return new BigInteger(e,16)}this.getByName=function(r){var n=r;if(void 0!==t[n]&&(n=t[r]),void 0!==e[n])return e[n];throw"unregistered EC curve name: "+n},this.regist=function(r,n,i,o,s,u,c,h,l,f,g,p){e[r]={};var d=a(i),v=a(o),y=a(s),m=a(u),S=a(c),b=new ECCurveFp(d,v,y),F=b.decodePointHex("04"+h+l);e[r].name=r,e[r].keylen=n,e[r].curve=b,e[r].G=F,e[r].n=m,e[r].h=S,e[r].oid=g,e[r].info=p;for(var _=0;_<f.length;_++)t[f[_]]=r}},V.crypto.ECParameterDB.regist("secp128r1",128,"FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFDFFFFFFFFFFFFFFFFFFFFFFFC","E87579C11079F43DD824993C2CEE5ED3","FFFFFFFE0000000075A30D1B9038A115","1","161FF7528B899B2D0C28607CA52C5B86","CF5AC8395BAFEB13C02DA292DDED7A83",[],"","secp128r1 : SECG curve over a 128 bit prime field"),V.crypto.ECParameterDB.regist("secp160k1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFAC73","0","7","0100000000000000000001B8FA16DFAB9ACA16B6B3","1","3B4C382CE37AA192A4019E763036F4F5DD4D7EBB","938CF935318FDCED6BC28286531733C3F03C4FEE",[],"","secp160k1 : SECG curve over a 160 bit prime field"),V.crypto.ECParameterDB.regist("secp160r1",160,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF7FFFFFFC","1C97BEFC54BD7A8B65ACF89F81D4D4ADC565FA45","0100000000000000000001F4C8F927AED3CA752257","1","4A96B5688EF573284664698968C38BB913CBFC82","23A628553168947D59DCC912042351377AC5FB32",[],"","secp160r1 : SECG curve over a 160 bit prime field"),V.crypto.ECParameterDB.regist("secp192k1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFEE37","0","3","FFFFFFFFFFFFFFFFFFFFFFFE26F2FC170F69466A74DEFD8D","1","DB4FF10EC057E9AE26B07D0280B7F4341DA5D1B1EAE06C7D","9B2F2F6D9C5628A7844163D015BE86344082AA88D95E2F9D",[]),V.crypto.ECParameterDB.regist("secp192r1",192,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFC","64210519E59C80E70FA7E9AB72243049FEB8DEECC146B9B1","FFFFFFFFFFFFFFFFFFFFFFFF99DEF836146BC9B1B4D22831","1","188DA80EB03090F67CBF20EB43A18800F4FF0AFD82FF1012","07192B95FFC8DA78631011ED6B24CDD573F977A11E794811",[]),V.crypto.ECParameterDB.regist("secp224r1",224,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF000000000000000000000001","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFFFFFFFFFFFFFFFFFE","B4050A850C04B3ABF54132565044B0B7D7BFD8BA270B39432355FFB4","FFFFFFFFFFFFFFFFFFFFFFFFFFFF16A2E0B8F03E13DD29455C5C2A3D","1","B70E0CBD6BB4BF7F321390B94A03C1D356C21122343280D6115C1D21","BD376388B5F723FB4C22DFE6CD4375A05A07476444D5819985007E34",[]),V.crypto.ECParameterDB.regist("secp256k1",256,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFC2F","0","7","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141","1","79BE667EF9DCBBAC55A06295CE870B07029BFCDB2DCE28D959F2815B16F81798","483ADA7726A3C4655DA4FBFC0E1108A8FD17B448A68554199C47D08FFB10D4B8",[]),V.crypto.ECParameterDB.regist("secp256r1",256,"FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFF","FFFFFFFF00000001000000000000000000000000FFFFFFFFFFFFFFFFFFFFFFFC","5AC635D8AA3A93E7B3EBBD55769886BC651D06B0CC53B0F63BCE3C3E27D2604B","FFFFFFFF00000000FFFFFFFFFFFFFFFFBCE6FAADA7179E84F3B9CAC2FC632551","1","6B17D1F2E12C4247F8BCE6E563A440F277037D812DEB33A0F4A13945D898C296","4FE342E2FE1A7F9B8EE7EB4A7C0F9E162BCE33576B315ECECBB6406837BF51F5",["NIST P-256","P-256","prime256v1"]),V.crypto.ECParameterDB.regist("secp384r1",384,"FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEFFFFFFFF0000000000000000FFFFFFFC","B3312FA7E23EE7E4988E056BE3F82D19181D9C6EFE8141120314088F5013875AC656398D8A2ED19D2A85C8EDD3EC2AEF","FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC7634D81F4372DDF581A0DB248B0A77AECEC196ACCC52973","1","AA87CA22BE8B05378EB1C71EF320AD746E1D3B628BA79B9859F741E082542A385502F25DBF55296C3A545E3872760AB7","3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f",["NIST P-384","P-384"]),V.crypto.ECParameterDB.regist("secp521r1",521,"1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFC","051953EB9618E1C9A1F929A21A0B68540EEA2DA725B99B315F3B8B489918EF109E156193951EC7E937B1652C0BD3BB1BF073573DF883D2C34F1EF451FD46B503F00","1FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFA51868783BF2F966B7FCC0148F709A5D03BB5C9B8899C47AEBB6FB71E91386409","1","C6858E06B70404E9CD9E3ECB662395B4429C648139053FB521F828AF606B4D3DBAA14B5E77EFE75928FE1DC127A2FFA8DE3348B3C1856A429BF97E7E31C2E5BD66","011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650",["NIST P-521","P-521"]);var z=function(){var t=function d(e,t,n){return r(y.AES,e,t,n)},r=function k(e,t,r,n){var i=y.enc.Hex.parse(t),o=y.enc.Hex.parse(r),s=y.enc.Hex.parse(n),a={};a.key=o,a.iv=s,a.ciphertext=i;var u=e.decrypt(a,o,{iv:s});return y.enc.Hex.stringify(u)},n=function l(e,t,r){return i(y.AES,e,t,r)},i=function g(e,t,r,n){var i=y.enc.Hex.parse(t),o=y.enc.Hex.parse(r),s=y.enc.Hex.parse(n),a=e.encrypt(i,o,{iv:s}),u=y.enc.Hex.parse(a.toString());return y.enc.Base64.stringify(u)},s={"AES-256-CBC":{proc:t,eproc:n,keylen:32,ivlen:16},"AES-192-CBC":{proc:t,eproc:n,keylen:24,ivlen:16},"AES-128-CBC":{proc:t,eproc:n,keylen:16,ivlen:16},"DES-EDE3-CBC":{proc:function e(t,n,i){return r(y.TripleDES,t,n,i)},eproc:function o(e,t,r){return i(y.TripleDES,e,t,r)},keylen:24,ivlen:8},"DES-CBC":{proc:function a(e,t,n){return r(y.DES,e,t,n)},eproc:function f(e,t,r){return i(y.DES,e,t,r)},keylen:8,ivlen:8}},u=function n(e){var t={},r=e.match(new RegExp("DEK-Info: ([^,]+),([0-9A-Fa-f]+)","m"));r&&(t.cipher=r[1],t.ivsalt=r[2]);var i=e.match(new RegExp("-----BEGIN ([A-Z]+) PRIVATE KEY-----"));i&&(t.type=i[1]);var o=-1,s=0;-1!=e.indexOf("\r\n\r\n")&&(o=e.indexOf("\r\n\r\n"),s=2),-1!=e.indexOf("\n\n")&&(o=e.indexOf("\n\n"),s=1);var a=e.indexOf("-----END");if(-1!=o&&-1!=a){var u=e.substring(o+2*s,a-s);u=u.replace(/\s+/g,""),t.data=u}return t},c=function j(e,t,r){for(var n=r.substring(0,16),i=y.enc.Hex.parse(n),o=y.enc.Utf8.parse(t),a=s[e].keylen+s[e].ivlen,u="",c=null;;){var h=y.algo.MD5.create();if(null!=c&&h.update(c),h.update(o),h.update(i),c=h.finalize(),(u+=y.enc.Hex.stringify(c)).length>=2*a)break}var l={};return l.keyhex=u.substr(0,2*s[e].keylen),l.ivhex=u.substr(2*s[e].keylen,2*s[e].ivlen),l},g=function b(e,t,r,n){var i=y.enc.Base64.parse(e),o=y.enc.Hex.stringify(i);return(0,s[t].proc)(o,r,n)};return{version:"1.0.0",parsePKCS5PEM:function parsePKCS5PEM(e){return u(e)},getKeyAndUnusedIvByPasscodeAndIvsalt:function getKeyAndUnusedIvByPasscodeAndIvsalt(e,t,r){return c(e,t,r)},decryptKeyB64:function decryptKeyB64(e,t,r,n){return g(e,t,r,n)},getDecryptedKeyHex:function getDecryptedKeyHex(e,t){var r=u(e),n=(r.type,r.cipher),i=r.ivsalt,o=r.data,s=c(n,t,i).keyhex;return g(o,n,s,i)},getEncryptedPKCS5PEMFromPrvKeyHex:function getEncryptedPKCS5PEMFromPrvKeyHex(e,t,r,n,i){var o="";if(void 0!==n&&null!=n||(n="AES-256-CBC"),void 0===s[n])throw"KEYUTIL unsupported algorithm: "+n;void 0!==i&&null!=i||(i=function m(e){var t=y.lib.WordArray.random(e);return y.enc.Hex.stringify(t)}(s[n].ivlen).toUpperCase());var a=function h(e,t,r,n){return(0,s[t].eproc)(e,r,n)}(t,n,c(n,r,i).keyhex,i);o="-----BEGIN "+e+" PRIVATE KEY-----\r\n";return o+="Proc-Type: 4,ENCRYPTED\r\n",o+="DEK-Info: "+n+","+i+"\r\n",o+="\r\n",o+=a.replace(/(.{64})/g,"$1\r\n"),o+="\r\n-----END "+e+" PRIVATE KEY-----\r\n"},parseHexOfEncryptedPKCS8:function parseHexOfEncryptedPKCS8(e){var t=J,r=t.getChildIdx,n=t.getV,i={},o=r(e,0);if(2!=o.length)throw"malformed format: SEQUENCE(0).items != 2: "+o.length;i.ciphertext=n(e,o[1]);var s=r(e,o[0]);if(2!=s.length)throw"malformed format: SEQUENCE(0.0).items != 2: "+s.length;if("2a864886f70d01050d"!=n(e,s[0]))throw"this only supports pkcs5PBES2";var a=r(e,s[1]);if(2!=s.length)throw"malformed format: SEQUENCE(0.0.1).items != 2: "+a.length;var u=r(e,a[1]);if(2!=u.length)throw"malformed format: SEQUENCE(0.0.1.1).items != 2: "+u.length;if("2a864886f70d0307"!=n(e,u[0]))throw"this only supports TripleDES";i.encryptionSchemeAlg="TripleDES",i.encryptionSchemeIV=n(e,u[1]);var c=r(e,a[0]);if(2!=c.length)throw"malformed format: SEQUENCE(0.0.1.0).items != 2: "+c.length;if("2a864886f70d01050c"!=n(e,c[0]))throw"this only supports pkcs5PBKDF2";var h=r(e,c[1]);if(h.length<2)throw"malformed format: SEQUENCE(0.0.1.0.1).items < 2: "+h.length;i.pbkdf2Salt=n(e,h[0]);var l=n(e,h[1]);try{i.pbkdf2Iter=parseInt(l,16)}catch(e){throw"malformed format pbkdf2Iter: "+l}return i},getPBKDF2KeyHexFromParam:function getPBKDF2KeyHexFromParam(e,t){var r=y.enc.Hex.parse(e.pbkdf2Salt),n=e.pbkdf2Iter,i=y.PBKDF2(t,r,{keySize:6,iterations:n});return y.enc.Hex.stringify(i)},_getPlainPKCS8HexFromEncryptedPKCS8PEM:function _getPlainPKCS8HexFromEncryptedPKCS8PEM(e,t){var r=pemtohex(e,"ENCRYPTED PRIVATE KEY"),n=this.parseHexOfEncryptedPKCS8(r),i=z.getPBKDF2KeyHexFromParam(n,t),o={};o.ciphertext=y.enc.Hex.parse(n.ciphertext);var s=y.enc.Hex.parse(i),a=y.enc.Hex.parse(n.encryptionSchemeIV),u=y.TripleDES.decrypt(o,s,{iv:a});return y.enc.Hex.stringify(u)},getKeyFromEncryptedPKCS8PEM:function getKeyFromEncryptedPKCS8PEM(e,t){var r=this._getPlainPKCS8HexFromEncryptedPKCS8PEM(e,t);return this.getKeyFromPlainPrivatePKCS8Hex(r)},parsePlainPrivatePKCS8Hex:function parsePlainPrivatePKCS8Hex(e){var t=J,r=t.getChildIdx,n=t.getV,i={algparam:null};if("30"!=e.substr(0,2))throw"malformed plain PKCS8 private key(code:001)";var o=r(e,0);if(3!=o.length)throw"malformed plain PKCS8 private key(code:002)";if("30"!=e.substr(o[1],2))throw"malformed PKCS8 private key(code:003)";var s=r(e,o[1]);if(2!=s.length)throw"malformed PKCS8 private key(code:004)";if("06"!=e.substr(s[0],2))throw"malformed PKCS8 private key(code:005)";if(i.algoid=n(e,s[0]),"06"==e.substr(s[1],2)&&(i.algparam=n(e,s[1])),"04"!=e.substr(o[2],2))throw"malformed PKCS8 private key(code:006)";return i.keyidx=t.getVidx(e,o[2]),i},getKeyFromPlainPrivatePKCS8PEM:function getKeyFromPlainPrivatePKCS8PEM(e){var t=pemtohex(e,"PRIVATE KEY");return this.getKeyFromPlainPrivatePKCS8Hex(t)},getKeyFromPlainPrivatePKCS8Hex:function getKeyFromPlainPrivatePKCS8Hex(e){var t,r=this.parsePlainPrivatePKCS8Hex(e);if("2a864886f70d010101"==r.algoid)t=new RSAKey;else if("2a8648ce380401"==r.algoid)t=new V.crypto.DSA;else{if("2a8648ce3d0201"!=r.algoid)throw"unsupported private key algorithm";t=new V.crypto.ECDSA}return t.readPKCS8PrvKeyHex(e),t},_getKeyFromPublicPKCS8Hex:function _getKeyFromPublicPKCS8Hex(e){var t,r=J.getVbyList(e,0,[0,0],"06");if("2a864886f70d010101"===r)t=new RSAKey;else if("2a8648ce380401"===r)t=new V.crypto.DSA;else{if("2a8648ce3d0201"!==r)throw"unsupported PKCS#8 public key hex";t=new V.crypto.ECDSA}return t.readPKCS8PubKeyHex(e),t},parsePublicRawRSAKeyHex:function parsePublicRawRSAKeyHex(e){var t=J,r=t.getChildIdx,n=t.getV,i={};if("30"!=e.substr(0,2))throw"malformed RSA key(code:001)";var o=r(e,0);if(2!=o.length)throw"malformed RSA key(code:002)";if("02"!=e.substr(o[0],2))throw"malformed RSA key(code:003)";if(i.n=n(e,o[0]),"02"!=e.substr(o[1],2))throw"malformed RSA key(code:004)";return i.e=n(e,o[1]),i},parsePublicPKCS8Hex:function parsePublicPKCS8Hex(e){var t=J,r=t.getChildIdx,n=t.getV,i={algparam:null},o=r(e,0);if(2!=o.length)throw"outer DERSequence shall have 2 elements: "+o.length;var s=o[0];if("30"!=e.substr(s,2))throw"malformed PKCS8 public key(code:001)";var a=r(e,s);if(2!=a.length)throw"malformed PKCS8 public key(code:002)";if("06"!=e.substr(a[0],2))throw"malformed PKCS8 public key(code:003)";if(i.algoid=n(e,a[0]),"06"==e.substr(a[1],2)?i.algparam=n(e,a[1]):"30"==e.substr(a[1],2)&&(i.algparam={},i.algparam.p=t.getVbyList(e,a[1],[0],"02"),i.algparam.q=t.getVbyList(e,a[1],[1],"02"),i.algparam.g=t.getVbyList(e,a[1],[2],"02")),"03"!=e.substr(o[1],2))throw"malformed PKCS8 public key(code:004)";return i.key=n(e,o[1]).substr(2),i}}}();z.getKey=function(e,t,r){var n=(v=J).getChildIdx,i=(v.getV,v.getVbyList),o=V.crypto,s=o.ECDSA,a=o.DSA,u=RSAKey,c=pemtohex,h=z;if(void 0!==u&&e instanceof u)return e;if(void 0!==s&&e instanceof s)return e;if(void 0!==a&&e instanceof a)return e;if(void 0!==e.curve&&void 0!==e.xy&&void 0===e.d)return new s({pub:e.xy,curve:e.curve});if(void 0!==e.curve&&void 0!==e.d)return new s({prv:e.d,curve:e.curve});if(void 0===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0===e.d)return(C=new u).setPublic(e.n,e.e),C;if(void 0===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0!==e.d&&void 0!==e.p&&void 0!==e.q&&void 0!==e.dp&&void 0!==e.dq&&void 0!==e.co&&void 0===e.qi)return(C=new u).setPrivateEx(e.n,e.e,e.d,e.p,e.q,e.dp,e.dq,e.co),C;if(void 0===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0!==e.d&&void 0===e.p)return(C=new u).setPrivate(e.n,e.e,e.d),C;if(void 0!==e.p&&void 0!==e.q&&void 0!==e.g&&void 0!==e.y&&void 0===e.x)return(C=new a).setPublic(e.p,e.q,e.g,e.y),C;if(void 0!==e.p&&void 0!==e.q&&void 0!==e.g&&void 0!==e.y&&void 0!==e.x)return(C=new a).setPrivate(e.p,e.q,e.g,e.y,e.x),C;if("RSA"===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0===e.d)return(C=new u).setPublic(b64utohex(e.n),b64utohex(e.e)),C;if("RSA"===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0!==e.d&&void 0!==e.p&&void 0!==e.q&&void 0!==e.dp&&void 0!==e.dq&&void 0!==e.qi)return(C=new u).setPrivateEx(b64utohex(e.n),b64utohex(e.e),b64utohex(e.d),b64utohex(e.p),b64utohex(e.q),b64utohex(e.dp),b64utohex(e.dq),b64utohex(e.qi)),C;if("RSA"===e.kty&&void 0!==e.n&&void 0!==e.e&&void 0!==e.d)return(C=new u).setPrivate(b64utohex(e.n),b64utohex(e.e),b64utohex(e.d)),C;if("EC"===e.kty&&void 0!==e.crv&&void 0!==e.x&&void 0!==e.y&&void 0===e.d){var l=(A=new s({curve:e.crv})).ecparams.keylen/4,f="04"+("0000000000"+b64utohex(e.x)).slice(-l)+("0000000000"+b64utohex(e.y)).slice(-l);return A.setPublicKeyHex(f),A}if("EC"===e.kty&&void 0!==e.crv&&void 0!==e.x&&void 0!==e.y&&void 0!==e.d){l=(A=new s({curve:e.crv})).ecparams.keylen/4,f="04"+("0000000000"+b64utohex(e.x)).slice(-l)+("0000000000"+b64utohex(e.y)).slice(-l);var g=("0000000000"+b64utohex(e.d)).slice(-l);return A.setPublicKeyHex(f),A.setPrivateKeyHex(g),A}if("pkcs5prv"===r){var p,d=e,v=J;if(9===(p=n(d,0)).length)(C=new u).readPKCS5PrvKeyHex(d);else if(6===p.length)(C=new a).readPKCS5PrvKeyHex(d);else{if(!(p.length>2&&"04"===d.substr(p[1],2)))throw"unsupported PKCS#1/5 hexadecimal key";(C=new s).readPKCS5PrvKeyHex(d)}return C}if("pkcs8prv"===r)return C=h.getKeyFromPlainPrivatePKCS8Hex(e);if("pkcs8pub"===r)return h._getKeyFromPublicPKCS8Hex(e);if("x509pub"===r)return X509.getPublicKeyFromCertHex(e);if(-1!=e.indexOf("-END CERTIFICATE-",0)||-1!=e.indexOf("-END X509 CERTIFICATE-",0)||-1!=e.indexOf("-END TRUSTED CERTIFICATE-",0))return X509.getPublicKeyFromCertPEM(e);if(-1!=e.indexOf("-END PUBLIC KEY-")){var y=pemtohex(e,"PUBLIC KEY");return h._getKeyFromPublicPKCS8Hex(y)}if(-1!=e.indexOf("-END RSA PRIVATE KEY-")&&-1==e.indexOf("4,ENCRYPTED")){var m=c(e,"RSA PRIVATE KEY");return h.getKey(m,null,"pkcs5prv")}if(-1!=e.indexOf("-END DSA PRIVATE KEY-")&&-1==e.indexOf("4,ENCRYPTED")){var S=i(k=c(e,"DSA PRIVATE KEY"),0,[1],"02"),b=i(k,0,[2],"02"),F=i(k,0,[3],"02"),_=i(k,0,[4],"02"),w=i(k,0,[5],"02");return(C=new a).setPrivate(new BigInteger(S,16),new BigInteger(b,16),new BigInteger(F,16),new BigInteger(_,16),new BigInteger(w,16)),C}if(-1!=e.indexOf("-END PRIVATE KEY-"))return h.getKeyFromPlainPrivatePKCS8PEM(e);if(-1!=e.indexOf("-END RSA PRIVATE KEY-")&&-1!=e.indexOf("4,ENCRYPTED")){var E=h.getDecryptedKeyHex(e,t),x=new RSAKey;return x.readPKCS5PrvKeyHex(E),x}if(-1!=e.indexOf("-END EC PRIVATE KEY-")&&-1!=e.indexOf("4,ENCRYPTED")){var A,C=i(k=h.getDecryptedKeyHex(e,t),0,[1],"04"),P=i(k,0,[2,0],"06"),I=i(k,0,[3,0],"03").substr(2);if(void 0===V.crypto.OID.oidhex2name[P])throw"undefined OID(hex) in KJUR.crypto.OID: "+P;return(A=new s({curve:V.crypto.OID.oidhex2name[P]})).setPublicKeyHex(I),A.setPrivateKeyHex(C),A.isPublic=!1,A}if(-1!=e.indexOf("-END DSA PRIVATE KEY-")&&-1!=e.indexOf("4,ENCRYPTED")){var k;S=i(k=h.getDecryptedKeyHex(e,t),0,[1],"02"),b=i(k,0,[2],"02"),F=i(k,0,[3],"02"),_=i(k,0,[4],"02"),w=i(k,0,[5],"02");return(C=new a).setPrivate(new BigInteger(S,16),new BigInteger(b,16),new BigInteger(F,16),new BigInteger(_,16),new BigInteger(w,16)),C}if(-1!=e.indexOf("-END ENCRYPTED PRIVATE KEY-"))return h.getKeyFromEncryptedPKCS8PEM(e,t);throw"not supported argument"},z.generateKeypair=function(e,t){if("RSA"==e){var r=t;(s=new RSAKey).generate(r,"10001"),s.isPrivate=!0,s.isPublic=!0;var n=new RSAKey,i=s.n.toString(16),o=s.e.toString(16);return n.setPublic(i,o),n.isPrivate=!1,n.isPublic=!0,(a={}).prvKeyObj=s,a.pubKeyObj=n,a}if("EC"==e){var s,a,u=t,c=new V.crypto.ECDSA({curve:u}).generateKeyPairHex();return(s=new V.crypto.ECDSA({curve:u})).setPublicKeyHex(c.ecpubhex),s.setPrivateKeyHex(c.ecprvhex),s.isPrivate=!0,s.isPublic=!1,(n=new V.crypto.ECDSA({curve:u})).setPublicKeyHex(c.ecpubhex),n.isPrivate=!1,n.isPublic=!0,(a={}).prvKeyObj=s,a.pubKeyObj=n,a}throw"unknown algorithm: "+e},z.getPEM=function(e,t,r,n,i,s){var a=V,u=a.asn1,c=u.DERObjectIdentifier,h=u.DERInteger,l=u.ASN1Util.newObject,f=u.x509.SubjectPublicKeyInfo,g=a.crypto,p=g.DSA,d=g.ECDSA,v=RSAKey;function A(e){return l({seq:[{int:0},{int:{bigint:e.n}},{int:e.e},{int:{bigint:e.d}},{int:{bigint:e.p}},{int:{bigint:e.q}},{int:{bigint:e.dmp1}},{int:{bigint:e.dmq1}},{int:{bigint:e.coeff}}]})}function B(e){return l({seq:[{int:1},{octstr:{hex:e.prvKeyHex}},{tag:["a0",!0,{oid:{name:e.curveName}}]},{tag:["a1",!0,{bitstr:{hex:"00"+e.pubKeyHex}}]}]})}function x(e){return l({seq:[{int:0},{int:{bigint:e.p}},{int:{bigint:e.q}},{int:{bigint:e.g}},{int:{bigint:e.y}},{int:{bigint:e.x}}]})}if((void 0!==v&&e instanceof v||void 0!==p&&e instanceof p||void 0!==d&&e instanceof d)&&1==e.isPublic&&(void 0===t||"PKCS8PUB"==t))return hextopem(F=new f(e).getEncodedHex(),"PUBLIC KEY");if("PKCS1PRV"==t&&void 0!==v&&e instanceof v&&(void 0===r||null==r)&&1==e.isPrivate)return hextopem(F=A(e).getEncodedHex(),"RSA PRIVATE KEY");if("PKCS1PRV"==t&&void 0!==d&&e instanceof d&&(void 0===r||null==r)&&1==e.isPrivate){var m=new c({name:e.curveName}).getEncodedHex(),S=B(e).getEncodedHex(),b="";return b+=hextopem(m,"EC PARAMETERS"),b+=hextopem(S,"EC PRIVATE KEY")}if("PKCS1PRV"==t&&void 0!==p&&e instanceof p&&(void 0===r||null==r)&&1==e.isPrivate)return hextopem(F=x(e).getEncodedHex(),"DSA PRIVATE KEY");if("PKCS5PRV"==t&&void 0!==v&&e instanceof v&&void 0!==r&&null!=r&&1==e.isPrivate){var F=A(e).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("RSA",F,r,n,s)}if("PKCS5PRV"==t&&void 0!==d&&e instanceof d&&void 0!==r&&null!=r&&1==e.isPrivate){F=B(e).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("EC",F,r,n,s)}if("PKCS5PRV"==t&&void 0!==p&&e instanceof p&&void 0!==r&&null!=r&&1==e.isPrivate){F=x(e).getEncodedHex();return void 0===n&&(n="DES-EDE3-CBC"),this.getEncryptedPKCS5PEMFromPrvKeyHex("DSA",F,r,n,s)}var _=function o(e,t){var r=w(e,t);return new l({seq:[{seq:[{oid:{name:"pkcs5PBES2"}},{seq:[{seq:[{oid:{name:"pkcs5PBKDF2"}},{seq:[{octstr:{hex:r.pbkdf2Salt}},{int:r.pbkdf2Iter}]}]},{seq:[{oid:{name:"des-EDE3-CBC"}},{octstr:{hex:r.encryptionSchemeIV}}]}]}]},{octstr:{hex:r.ciphertext}}]}).getEncodedHex()},w=function c(e,t){var r=y.lib.WordArray.random(8),n=y.lib.WordArray.random(8),i=y.PBKDF2(t,r,{keySize:6,iterations:100}),o=y.enc.Hex.parse(e),s=y.TripleDES.encrypt(o,i,{iv:n})+"",a={};return a.ciphertext=s,a.pbkdf2Salt=y.enc.Hex.stringify(r),a.pbkdf2Iter=100,a.encryptionSchemeAlg="DES-EDE3-CBC",a.encryptionSchemeIV=y.enc.Hex.stringify(n),a};if("PKCS8PRV"==t&&void 0!=v&&e instanceof v&&1==e.isPrivate){var E=A(e).getEncodedHex();F=l({seq:[{int:0},{seq:[{oid:{name:"rsaEncryption"}},{null:!0}]},{octstr:{hex:E}}]}).getEncodedHex();return void 0===r||null==r?hextopem(F,"PRIVATE KEY"):hextopem(S=_(F,r),"ENCRYPTED PRIVATE KEY")}if("PKCS8PRV"==t&&void 0!==d&&e instanceof d&&1==e.isPrivate){E=new l({seq:[{int:1},{octstr:{hex:e.prvKeyHex}},{tag:["a1",!0,{bitstr:{hex:"00"+e.pubKeyHex}}]}]}).getEncodedHex(),F=l({seq:[{int:0},{seq:[{oid:{name:"ecPublicKey"}},{oid:{name:e.curveName}}]},{octstr:{hex:E}}]}).getEncodedHex();return void 0===r||null==r?hextopem(F,"PRIVATE KEY"):hextopem(S=_(F,r),"ENCRYPTED PRIVATE KEY")}if("PKCS8PRV"==t&&void 0!==p&&e instanceof p&&1==e.isPrivate){E=new h({bigint:e.x}).getEncodedHex(),F=l({seq:[{int:0},{seq:[{oid:{name:"dsa"}},{seq:[{int:{bigint:e.p}},{int:{bigint:e.q}},{int:{bigint:e.g}}]}]},{octstr:{hex:E}}]}).getEncodedHex();return void 0===r||null==r?hextopem(F,"PRIVATE KEY"):hextopem(S=_(F,r),"ENCRYPTED PRIVATE KEY")}throw"unsupported object nor format"},z.getKeyFromCSRPEM=function(e){var t=pemtohex(e,"CERTIFICATE REQUEST");return z.getKeyFromCSRHex(t)},z.getKeyFromCSRHex=function(e){var t=z.parseCSRHex(e);return z.getKey(t.p8pubkeyhex,null,"pkcs8pub")},z.parseCSRHex=function(e){var t=J,r=t.getChildIdx,n=t.getTLV,i={},o=e;if("30"!=o.substr(0,2))throw"malformed CSR(code:001)";var s=r(o,0);if(s.length<1)throw"malformed CSR(code:002)";if("30"!=o.substr(s[0],2))throw"malformed CSR(code:003)";var a=r(o,s[0]);if(a.length<3)throw"malformed CSR(code:004)";return i.p8pubkeyhex=n(o,a[2]),i},z.getJWKFromKey=function(e){var t={};if(e instanceof RSAKey&&e.isPrivate)return t.kty="RSA",t.n=hextob64u(e.n.toString(16)),t.e=hextob64u(e.e.toString(16)),t.d=hextob64u(e.d.toString(16)),t.p=hextob64u(e.p.toString(16)),t.q=hextob64u(e.q.toString(16)),t.dp=hextob64u(e.dmp1.toString(16)),t.dq=hextob64u(e.dmq1.toString(16)),t.qi=hextob64u(e.coeff.toString(16)),t;if(e instanceof RSAKey&&e.isPublic)return t.kty="RSA",t.n=hextob64u(e.n.toString(16)),t.e=hextob64u(e.e.toString(16)),t;if(e instanceof V.crypto.ECDSA&&e.isPrivate){if("P-256"!==(n=e.getShortNISTPCurveName())&&"P-384"!==n)throw"unsupported curve name for JWT: "+n;var r=e.getPublicKeyXYHex();return t.kty="EC",t.crv=n,t.x=hextob64u(r.x),t.y=hextob64u(r.y),t.d=hextob64u(e.prvKeyHex),t}if(e instanceof V.crypto.ECDSA&&e.isPublic){var n;if("P-256"!==(n=e.getShortNISTPCurveName())&&"P-384"!==n)throw"unsupported curve name for JWT: "+n;r=e.getPublicKeyXYHex();return t.kty="EC",t.crv=n,t.x=hextob64u(r.x),t.y=hextob64u(r.y),t}throw"not supported key object"},RSAKey.getPosArrayOfChildrenFromHex=function(e){return J.getChildIdx(e,0)},RSAKey.getHexValueArrayOfChildrenFromHex=function(e){var t,r=J.getV,n=r(e,(t=RSAKey.getPosArrayOfChildrenFromHex(e))[0]),i=r(e,t[1]),o=r(e,t[2]),s=r(e,t[3]),a=r(e,t[4]),u=r(e,t[5]),c=r(e,t[6]),h=r(e,t[7]),l=r(e,t[8]);return(t=new Array).push(n,i,o,s,a,u,c,h,l),t},RSAKey.prototype.readPrivateKeyFromPEMString=function(e){var t=pemtohex(e),r=RSAKey.getHexValueArrayOfChildrenFromHex(t);this.setPrivateEx(r[1],r[2],r[3],r[4],r[5],r[6],r[7],r[8])},RSAKey.prototype.readPKCS5PrvKeyHex=function(e){var t=RSAKey.getHexValueArrayOfChildrenFromHex(e);this.setPrivateEx(t[1],t[2],t[3],t[4],t[5],t[6],t[7],t[8])},RSAKey.prototype.readPKCS8PrvKeyHex=function(e){var t,r,n,i,o,s,a,u,c=J,h=c.getVbyList;if(!1===c.isASN1HEX(e))throw"not ASN.1 hex string";try{t=h(e,0,[2,0,1],"02"),r=h(e,0,[2,0,2],"02"),n=h(e,0,[2,0,3],"02"),i=h(e,0,[2,0,4],"02"),o=h(e,0,[2,0,5],"02"),s=h(e,0,[2,0,6],"02"),a=h(e,0,[2,0,7],"02"),u=h(e,0,[2,0,8],"02")}catch(e){throw"malformed PKCS#8 plain RSA private key"}this.setPrivateEx(t,r,n,i,o,s,a,u)},RSAKey.prototype.readPKCS5PubKeyHex=function(e){var t=J,r=t.getV;if(!1===t.isASN1HEX(e))throw"keyHex is not ASN.1 hex string";var n=t.getChildIdx(e,0);if(2!==n.length||"02"!==e.substr(n[0],2)||"02"!==e.substr(n[1],2))throw"wrong hex for PKCS#5 public key";var i=r(e,n[0]),o=r(e,n[1]);this.setPublic(i,o)},RSAKey.prototype.readPKCS8PubKeyHex=function(e){var t=J;if(!1===t.isASN1HEX(e))throw"not ASN.1 hex string";if("06092a864886f70d010101"!==t.getTLVbyList(e,0,[0,0]))throw"not PKCS8 RSA public key";var r=t.getTLVbyList(e,0,[1,0]);this.readPKCS5PubKeyHex(r)},RSAKey.prototype.readCertPubKeyHex=function(e,t){var r,n;(r=new X509).readCertHex(e),n=r.getPublicKeyHex(),this.readPKCS8PubKeyHex(n)};var Y=new RegExp("");function _zeroPaddingOfSignature(e,t){for(var r="",n=t/4-e.length,i=0;i<n;i++)r+="0";return r+e}function pss_mgf1_str(e,t,r){for(var n="",i=0;n.length<t;)n+=hextorstr(r(rstrtohex(e+String.fromCharCode.apply(String,[(4278190080&i)>>24,(16711680&i)>>16,(65280&i)>>8,255&i])))),i+=1;return n}function _rsasign_getAlgNameAndHashFromHexDisgestInfo(e){for(var t in V.crypto.Util.DIGESTINFOHEAD){var r=V.crypto.Util.DIGESTINFOHEAD[t],n=r.length;if(e.substring(0,n)==r)return[t,e.substring(n)]}return[]}function X509(){var e=J,t=e.getChildIdx,r=e.getV,n=e.getTLV,i=e.getVbyList,o=e.getTLVbyList,s=e.getIdxbyList,a=e.getVidx,u=e.oidname,c=X509,h=pemtohex;this.hex=null,this.version=0,this.foffset=0,this.aExtInfo=null,this.getVersion=function(){return null===this.hex||0!==this.version?this.version:"a003020102"!==o(this.hex,0,[0,0])?(this.version=1,this.foffset=-1,1):(this.version=3,3)},this.getSerialNumberHex=function(){return i(this.hex,0,[0,1+this.foffset],"02")},this.getSignatureAlgorithmField=function(){return u(i(this.hex,0,[0,2+this.foffset,0],"06"))},this.getIssuerHex=function(){return o(this.hex,0,[0,3+this.foffset],"30")},this.getIssuerString=function(){return c.hex2dn(this.getIssuerHex())},this.getSubjectHex=function(){return o(this.hex,0,[0,5+this.foffset],"30")},this.getSubjectString=function(){return c.hex2dn(this.getSubjectHex())},this.getNotBefore=function(){var e=i(this.hex,0,[0,4+this.foffset,0]);return e=e.replace(/(..)/g,"%$1"),e=decodeURIComponent(e)},this.getNotAfter=function(){var e=i(this.hex,0,[0,4+this.foffset,1]);return e=e.replace(/(..)/g,"%$1"),e=decodeURIComponent(e)},this.getPublicKeyHex=function(){return e.getTLVbyList(this.hex,0,[0,6+this.foffset],"30")},this.getPublicKeyIdx=function(){return s(this.hex,0,[0,6+this.foffset],"30")},this.getPublicKeyContentIdx=function(){var e=this.getPublicKeyIdx();return s(this.hex,e,[1,0],"30")},this.getPublicKey=function(){return z.getKey(this.getPublicKeyHex(),null,"pkcs8pub")},this.getSignatureAlgorithmName=function(){return u(i(this.hex,0,[1,0],"06"))},this.getSignatureValueHex=function(){return i(this.hex,0,[2],"03",!0)},this.verifySignature=function(e){var t=this.getSignatureAlgorithmName(),r=this.getSignatureValueHex(),n=o(this.hex,0,[0],"30"),i=new V.crypto.Signature({alg:t});return i.init(e),i.updateHex(n),i.verify(r)},this.parseExt=function(){if(3!==this.version)return-1;var r=s(this.hex,0,[0,7,0],"30"),n=t(this.hex,r);this.aExtInfo=new Array;for(var o=0;o<n.length;o++){var u={critical:!1},c=0;3===t(this.hex,n[o]).length&&(u.critical=!0,c=1),u.oid=e.hextooidstr(i(this.hex,n[o],[0],"06"));var h=s(this.hex,n[o],[1+c]);u.vidx=a(this.hex,h),this.aExtInfo.push(u)}},this.getExtInfo=function(e){var t=this.aExtInfo,r=e;if(e.match(/^[0-9.]+$/)||(r=V.asn1.x509.OID.name2oid(e)),""!==r)for(var n=0;n<t.length;n++)if(t[n].oid===r)return t[n]},this.getExtBasicConstraints=function(){var e=this.getExtInfo("basicConstraints");if(void 0===e)return e;var t=r(this.hex,e.vidx);if(""===t)return{};if("0101ff"===t)return{cA:!0};if("0101ff02"===t.substr(0,8)){var n=r(t,6);return{cA:!0,pathLen:parseInt(n,16)}}throw"basicConstraints parse error"},this.getExtKeyUsageBin=function(){var e=this.getExtInfo("keyUsage");if(void 0===e)return"";var t=r(this.hex,e.vidx);if(t.length%2!=0||t.length<=2)throw"malformed key usage value";var n=parseInt(t.substr(0,2)),i=parseInt(t.substr(2),16).toString(2);return i.substr(0,i.length-n)},this.getExtKeyUsageString=function(){for(var e=this.getExtKeyUsageBin(),t=new Array,r=0;r<e.length;r++)"1"==e.substr(r,1)&&t.push(X509.KEYUSAGE_NAME[r]);return t.join(",")},this.getExtSubjectKeyIdentifier=function(){var e=this.getExtInfo("subjectKeyIdentifier");return void 0===e?e:r(this.hex,e.vidx)},this.getExtAuthorityKeyIdentifier=function(){var e=this.getExtInfo("authorityKeyIdentifier");if(void 0===e)return e;for(var i={},o=n(this.hex,e.vidx),s=t(o,0),a=0;a<s.length;a++)"80"===o.substr(s[a],2)&&(i.kid=r(o,s[a]));return i},this.getExtExtKeyUsageName=function(){var e=this.getExtInfo("extKeyUsage");if(void 0===e)return e;var i=new Array,o=n(this.hex,e.vidx);if(""===o)return i;for(var s=t(o,0),a=0;a<s.length;a++)i.push(u(r(o,s[a])));return i},this.getExtSubjectAltName=function(){for(var e=this.getExtSubjectAltName2(),t=new Array,r=0;r<e.length;r++)"DNS"===e[r][0]&&t.push(e[r][1]);return t},this.getExtSubjectAltName2=function(){var e,i,o,s=this.getExtInfo("subjectAltName");if(void 0===s)return s;for(var a=new Array,u=n(this.hex,s.vidx),c=t(u,0),h=0;h<c.length;h++)o=u.substr(c[h],2),e=r(u,c[h]),"81"===o&&(i=hextoutf8(e),a.push(["MAIL",i])),"82"===o&&(i=hextoutf8(e),a.push(["DNS",i])),"84"===o&&(i=X509.hex2dn(e,0),a.push(["DN",i])),"86"===o&&(i=hextoutf8(e),a.push(["URI",i])),"87"===o&&(i=hextoip(e),a.push(["IP",i]));return a},this.getExtCRLDistributionPointsURI=function(){var e=this.getExtInfo("cRLDistributionPoints");if(void 0===e)return e;for(var r=new Array,n=t(this.hex,e.vidx),o=0;o<n.length;o++)try{var s=hextoutf8(i(this.hex,n[o],[0,0,0],"86"));r.push(s)}catch(e){}return r},this.getExtAIAInfo=function(){var e=this.getExtInfo("authorityInfoAccess");if(void 0===e)return e;for(var r={ocsp:[],caissuer:[]},n=t(this.hex,e.vidx),o=0;o<n.length;o++){var s=i(this.hex,n[o],[0],"06"),a=i(this.hex,n[o],[1],"86");"2b06010505073001"===s&&r.ocsp.push(hextoutf8(a)),"2b06010505073002"===s&&r.caissuer.push(hextoutf8(a))}return r},this.getExtCertificatePolicies=function(){var e=this.getExtInfo("certificatePolicies");if(void 0===e)return e;for(var o=n(this.hex,e.vidx),s=[],a=t(o,0),c=0;c<a.length;c++){var h={},l=t(o,a[c]);if(h.id=u(r(o,l[0])),2===l.length)for(var f=t(o,l[1]),g=0;g<f.length;g++){var p=i(o,f[g],[0],"06");"2b06010505070201"===p?h.cps=hextoutf8(i(o,f[g],[1])):"2b06010505070202"===p&&(h.unotice=hextoutf8(i(o,f[g],[1,0])))}s.push(h)}return s},this.readCertPEM=function(e){this.readCertHex(h(e))},this.readCertHex=function(e){this.hex=e,this.getVersion();try{s(this.hex,0,[0,7],"a3"),this.parseExt()}catch(e){}},this.getInfo=function(){var e,t,r;if(e="Basic Fields\n",e+="  serial number: "+this.getSerialNumberHex()+"\n",e+="  signature algorithm: "+this.getSignatureAlgorithmField()+"\n",e+="  issuer: "+this.getIssuerString()+"\n",e+="  notBefore: "+this.getNotBefore()+"\n",e+="  notAfter: "+this.getNotAfter()+"\n",e+="  subject: "+this.getSubjectString()+"\n",e+="  subject public key info: \n",e+="    key algorithm: "+(t=this.getPublicKey()).type+"\n","RSA"===t.type&&(e+="    n="+hextoposhex(t.n.toString(16)).substr(0,16)+"...\n",e+="    e="+hextoposhex(t.e.toString(16))+"\n"),void 0!==(r=this.aExtInfo)&&null!==r){e+="X509v3 Extensions:\n";for(var n=0;n<r.length;n++){var i=r[n],o=V.asn1.x509.OID.oid2name(i.oid);""===o&&(o=i.oid);var s="";if(!0===i.critical&&(s="CRITICAL"),e+="  "+o+" "+s+":\n","basicConstraints"===o){var a=this.getExtBasicConstraints();void 0===a.cA?e+="    {}\n":(e+="    cA=true",void 0!==a.pathLen&&(e+=", pathLen="+a.pathLen),e+="\n")}else if("keyUsage"===o)e+="    "+this.getExtKeyUsageString()+"\n";else if("subjectKeyIdentifier"===o)e+="    "+this.getExtSubjectKeyIdentifier()+"\n";else if("authorityKeyIdentifier"===o){var u=this.getExtAuthorityKeyIdentifier();void 0!==u.kid&&(e+="    kid="+u.kid+"\n")}else{if("extKeyUsage"===o)e+="    "+this.getExtExtKeyUsageName().join(", ")+"\n";else if("subjectAltName"===o)e+="    "+this.getExtSubjectAltName2()+"\n";else if("cRLDistributionPoints"===o)e+="    "+this.getExtCRLDistributionPointsURI()+"\n";else if("authorityInfoAccess"===o){var c=this.getExtAIAInfo();void 0!==c.ocsp&&(e+="    ocsp: "+c.ocsp.join(",")+"\n"),void 0!==c.caissuer&&(e+="    caissuer: "+c.caissuer.join(",")+"\n")}else if("certificatePolicies"===o)for(var h=this.getExtCertificatePolicies(),l=0;l<h.length;l++)void 0!==h[l].id&&(e+="    policy oid: "+h[l].id+"\n"),void 0!==h[l].cps&&(e+="    cps: "+h[l].cps+"\n")}}}return e+="signature algorithm: "+this.getSignatureAlgorithmName()+"\n",e+="signature: "+this.getSignatureValueHex().substr(0,16)+"...\n"}}Y.compile("[^0-9a-f]","gi"),RSAKey.prototype.sign=function(e,t){var r=function b(e){return V.crypto.Util.hashString(e,t)}(e);return this.signWithMessageHash(r,t)},RSAKey.prototype.signWithMessageHash=function(e,t){var r=parseBigInt(V.crypto.Util.getPaddedDigestInfoHex(e,t,this.n.bitLength()),16);return _zeroPaddingOfSignature(this.doPrivate(r).toString(16),this.n.bitLength())},RSAKey.prototype.signPSS=function(e,t,r){var n=function c(e){return V.crypto.Util.hashHex(e,t)}(rstrtohex(e));return void 0===r&&(r=-1),this.signWithMessageHashPSS(n,t,r)},RSAKey.prototype.signWithMessageHashPSS=function(e,t,r){var n,i=hextorstr(e),s=i.length,a=this.n.bitLength()-1,u=Math.ceil(a/8),c=function o(e){return V.crypto.Util.hashHex(e,t)};if(-1===r||void 0===r)r=s;else if(-2===r)r=u-s-2;else if(r<-2)throw"invalid salt length";if(u<s+r+2)throw"data too long";var h="";r>0&&(h=new Array(r),(new SecureRandom).nextBytes(h),h=String.fromCharCode.apply(String,h));var l=hextorstr(c(rstrtohex("\0\0\0\0\0\0\0\0"+i+h))),f=[];for(n=0;n<u-r-s-2;n+=1)f[n]=0;var g=String.fromCharCode.apply(String,f)+""+h,p=pss_mgf1_str(l,g.length,c),d=[];for(n=0;n<g.length;n+=1)d[n]=g.charCodeAt(n)^p.charCodeAt(n);var v=65280>>8*u-a&255;for(d[0]&=~v,n=0;n<s;n++)d.push(l.charCodeAt(n));return d.push(188),_zeroPaddingOfSignature(this.doPrivate(new BigInteger(d)).toString(16),this.n.bitLength())},RSAKey.prototype.verify=function(e,t){var r=parseBigInt(t=(t=t.replace(Y,"")).replace(/[ \n]+/g,""),16);if(r.bitLength()>this.n.bitLength())return 0;var n=_rsasign_getAlgNameAndHashFromHexDisgestInfo(this.doPublic(r).toString(16).replace(/^1f+00/,""));if(0==n.length)return!1;var i=n[0];return n[1]==function a(e){return V.crypto.Util.hashString(e,i)}(e)},RSAKey.prototype.verifyWithMessageHash=function(e,t){var r=parseBigInt(t=(t=t.replace(Y,"")).replace(/[ \n]+/g,""),16);if(r.bitLength()>this.n.bitLength())return 0;var n=_rsasign_getAlgNameAndHashFromHexDisgestInfo(this.doPublic(r).toString(16).replace(/^1f+00/,""));if(0==n.length)return!1;n[0];return n[1]==e},RSAKey.prototype.verifyPSS=function(t,r,n,i){var o=function e(t){return V.crypto.Util.hashHex(t,n)}(rstrtohex(t));return void 0===i&&(i=-1),this.verifyWithMessageHashPSS(o,r,n,i)},RSAKey.prototype.verifyWithMessageHashPSS=function(e,t,n,i){var o=new BigInteger(t,16);if(o.bitLength()>this.n.bitLength())return!1;var s,a=function r(e){return V.crypto.Util.hashHex(e,n)},u=hextorstr(e),c=u.length,h=this.n.bitLength()-1,l=Math.ceil(h/8);if(-1===i||void 0===i)i=c;else if(-2===i)i=l-c-2;else if(i<-2)throw"invalid salt length";if(l<c+i+2)throw"data too long";var f=this.doPublic(o).toByteArray();for(s=0;s<f.length;s+=1)f[s]&=255;for(;f.length<l;)f.unshift(0);if(188!==f[l-1])throw"encoded message does not end in 0xbc";var g=(f=String.fromCharCode.apply(String,f)).substr(0,l-c-1),p=f.substr(g.length,c),d=65280>>8*l-h&255;if(0!=(g.charCodeAt(0)&d))throw"bits beyond keysize not zero";var v=pss_mgf1_str(p,g.length,a),y=[];for(s=0;s<g.length;s+=1)y[s]=g.charCodeAt(s)^v.charCodeAt(s);y[0]&=~d;var m=l-c-i-2;for(s=0;s<m;s+=1)if(0!==y[s])throw"leftmost octets not zero";if(1!==y[m])throw"0x01 marker not found";return p===hextorstr(a(rstrtohex("\0\0\0\0\0\0\0\0"+u+String.fromCharCode.apply(String,y.slice(-i)))))},RSAKey.SALT_LEN_HLEN=-1,RSAKey.SALT_LEN_MAX=-2,RSAKey.SALT_LEN_RECOVER=-2,X509.hex2dn=function(e,t){if(void 0===t&&(t=0),"30"!==e.substr(t,2))throw"malformed DN";for(var r=new Array,n=J.getChildIdx(e,t),i=0;i<n.length;i++)r.push(X509.hex2rdn(e,n[i]));return"/"+(r=r.map(function(e){return e.replace("/","\\/")})).join("/")},X509.hex2rdn=function(e,t){if(void 0===t&&(t=0),"31"!==e.substr(t,2))throw"malformed RDN";for(var r=new Array,n=J.getChildIdx(e,t),i=0;i<n.length;i++)r.push(X509.hex2attrTypeValue(e,n[i]));return(r=r.map(function(e){return e.replace("+","\\+")})).join("+")},X509.hex2attrTypeValue=function(e,t){var r=J,n=r.getV;if(void 0===t&&(t=0),"30"!==e.substr(t,2))throw"malformed attribute type and value";var i=r.getChildIdx(e,t);2!==i.length||e.substr(i[0],2);var o=n(e,i[0]),s=V.asn1.ASN1Util.oidHexToInt(o);return V.asn1.x509.OID.oid2atype(s)+"="+hextorstr(n(e,i[1]))},X509.getPublicKeyFromCertHex=function(e){var t=new X509;return t.readCertHex(e),t.getPublicKey()},X509.getPublicKeyFromCertPEM=function(e){var t=new X509;return t.readCertPEM(e),t.getPublicKey()},X509.getPublicKeyInfoPropOfCertPEM=function(e){var t,r,n=J.getVbyList,i={};return i.algparam=null,(t=new X509).readCertPEM(e),r=t.getPublicKeyHex(),i.keyhex=n(r,0,[1],"03").substr(2),i.algoid=n(r,0,[0,0],"06"),"2a8648ce3d0201"===i.algoid&&(i.algparam=n(r,0,[0,1],"06")),i},X509.KEYUSAGE_NAME=["digitalSignature","nonRepudiation","keyEncipherment","dataEncipherment","keyAgreement","keyCertSign","cRLSign","encipherOnly","decipherOnly"],void 0!==V&&V||(V={}),void 0!==V.jws&&V.jws||(V.jws={}),V.jws.JWS=function(){var e=V.jws.JWS.isSafeJSONString;this.parseJWS=function(t,r){if(void 0===this.parsedJWS||!r&&void 0===this.parsedJWS.sigvalH){var n=t.match(/^([^.]+)\.([^.]+)\.([^.]+)$/);if(null==n)throw"JWS signature is not a form of 'Head.Payload.SigValue'.";var i=n[1],o=n[2],s=n[3],a=i+"."+o;if(this.parsedJWS={},this.parsedJWS.headB64U=i,this.parsedJWS.payloadB64U=o,this.parsedJWS.sigvalB64U=s,this.parsedJWS.si=a,!r){var u=b64utohex(s),c=parseBigInt(u,16);this.parsedJWS.sigvalH=u,this.parsedJWS.sigvalBI=c}var h=W(i),l=W(o);if(this.parsedJWS.headS=h,this.parsedJWS.payloadS=l,!e(h,this.parsedJWS,"headP"))throw"malformed JSON string for JWS Head: "+h}}},V.jws.JWS.sign=function(e,t,r,n,o){var s,a,u,c=V,h=c.jws.JWS,l=h.readSafeJSONString,f=h.isSafeJSONString,g=c.crypto,p=(g.ECDSA,g.Mac),d=g.Signature,v=JSON;if("string"!=typeof t&&"object"!=(void 0===t?"undefined":i(t)))throw"spHeader must be JSON string or object: "+t;if("object"==(void 0===t?"undefined":i(t))&&(a=t,s=v.stringify(a)),"string"==typeof t){if(!f(s=t))throw"JWS Head is not safe JSON string: "+s;a=l(s)}if(u=r,"object"==(void 0===r?"undefined":i(r))&&(u=v.stringify(r)),""!=e&&null!=e||void 0===a.alg||(e=a.alg),""!=e&&null!=e&&void 0===a.alg&&(a.alg=e,s=v.stringify(a)),e!==a.alg)throw"alg and sHeader.alg doesn't match: "+e+"!="+a.alg;var y=null;if(void 0===h.jwsalg2sigalg[e])throw"unsupported alg name: "+e;y=h.jwsalg2sigalg[e];var m=q(s)+"."+q(u),S="";if("Hmac"==y.substr(0,4)){if(void 0===n)throw"mac key shall be specified for HS* alg";var b=new p({alg:y,prov:"cryptojs",pass:n});b.updateString(m),S=b.doFinal()}else{var F;if(-1!=y.indexOf("withECDSA"))(F=new d({alg:y})).init(n,o),F.updateString(m),hASN1Sig=F.sign(),S=V.crypto.ECDSA.asn1SigToConcatSig(hASN1Sig);else if("none"!=y)(F=new d({alg:y})).init(n,o),F.updateString(m),S=F.sign()}return m+"."+hextob64u(S)},V.jws.JWS.verify=function(e,t,r){var n,o=V,s=o.jws.JWS,a=s.readSafeJSONString,u=o.crypto,c=u.ECDSA,h=u.Mac,l=u.Signature;void 0!==i(RSAKey)&&(n=RSAKey);var f=e.split(".");if(3!==f.length)return!1;var g=f[0]+"."+f[1],p=b64utohex(f[2]),d=a(W(f[0])),v=null,y=null;if(void 0===d.alg)throw"algorithm not specified in header";if((y=(v=d.alg).substr(0,2),null!=r&&"[object Array]"===Object.prototype.toString.call(r)&&r.length>0)&&-1==(":"+r.join(":")+":").indexOf(":"+v+":"))throw"algorithm '"+v+"' not accepted in the list";if("none"!=v&&null===t)throw"key shall be specified to verify.";if("string"==typeof t&&-1!=t.indexOf("-----BEGIN ")&&(t=z.getKey(t)),!("RS"!=y&&"PS"!=y||t instanceof n))throw"key shall be a RSAKey obj for RS* and PS* algs";if("ES"==y&&!(t instanceof c))throw"key shall be a ECDSA obj for ES* algs";var m=null;if(void 0===s.jwsalg2sigalg[d.alg])throw"unsupported alg name: "+v;if("none"==(m=s.jwsalg2sigalg[v]))throw"not supported";if("Hmac"==m.substr(0,4)){if(void 0===t)throw"hexadecimal key shall be specified for HMAC";var S=new h({alg:m,pass:t});return S.updateString(g),p==S.doFinal()}if(-1!=m.indexOf("withECDSA")){var b,F=null;try{F=c.concatSigToASN1Sig(p)}catch(e){return!1}return(b=new l({alg:m})).init(t),b.updateString(g),b.verify(F)}return(b=new l({alg:m})).init(t),b.updateString(g),b.verify(p)},V.jws.JWS.parse=function(e){var t,r,n,i=e.split("."),o={};if(2!=i.length&&3!=i.length)throw"malformed sJWS: wrong number of '.' splitted elements";return t=i[0],r=i[1],3==i.length&&(n=i[2]),o.headerObj=V.jws.JWS.readSafeJSONString(W(t)),o.payloadObj=V.jws.JWS.readSafeJSONString(W(r)),o.headerPP=JSON.stringify(o.headerObj,null,"  "),null==o.payloadObj?o.payloadPP=W(r):o.payloadPP=JSON.stringify(o.payloadObj,null,"  "),void 0!==n&&(o.sigHex=b64utohex(n)),o},V.jws.JWS.verifyJWT=function(e,t,r){var n=V.jws,o=n.JWS,s=o.readSafeJSONString,a=o.inArray,u=o.includedArray,c=e.split("."),h=c[0],l=c[1],f=(b64utohex(c[2]),s(W(h))),g=s(W(l));if(void 0===f.alg)return!1;if(void 0===r.alg)throw"acceptField.alg shall be specified";if(!a(f.alg,r.alg))return!1;if(void 0!==g.iss&&"object"===i(r.iss)&&!a(g.iss,r.iss))return!1;if(void 0!==g.sub&&"object"===i(r.sub)&&!a(g.sub,r.sub))return!1;if(void 0!==g.aud&&"object"===i(r.aud))if("string"==typeof g.aud){if(!a(g.aud,r.aud))return!1}else if("object"==i(g.aud)&&!u(g.aud,r.aud))return!1;var p=n.IntDate.getNow();return void 0!==r.verifyAt&&"number"==typeof r.verifyAt&&(p=r.verifyAt),void 0!==r.gracePeriod&&"number"==typeof r.gracePeriod||(r.gracePeriod=0),!(void 0!==g.exp&&"number"==typeof g.exp&&g.exp+r.gracePeriod<p)&&(!(void 0!==g.nbf&&"number"==typeof g.nbf&&p<g.nbf-r.gracePeriod)&&(!(void 0!==g.iat&&"number"==typeof g.iat&&p<g.iat-r.gracePeriod)&&((void 0===g.jti||void 0===r.jti||g.jti===r.jti)&&!!o.verify(e,t,r.alg))))},V.jws.JWS.includedArray=function(e,t){var r=V.jws.JWS.inArray;if(null===e)return!1;if("object"!==(void 0===e?"undefined":i(e)))return!1;if("number"!=typeof e.length)return!1;for(var n=0;n<e.length;n++)if(!r(e[n],t))return!1;return!0},V.jws.JWS.inArray=function(e,t){if(null===t)return!1;if("object"!==(void 0===t?"undefined":i(t)))return!1;if("number"!=typeof t.length)return!1;for(var r=0;r<t.length;r++)if(t[r]==e)return!0;return!1},V.jws.JWS.jwsalg2sigalg={HS256:"HmacSHA256",HS384:"HmacSHA384",HS512:"HmacSHA512",RS256:"SHA256withRSA",RS384:"SHA384withRSA",RS512:"SHA512withRSA",ES256:"SHA256withECDSA",ES384:"SHA384withECDSA",PS256:"SHA256withRSAandMGF1",PS384:"SHA384withRSAandMGF1",PS512:"SHA512withRSAandMGF1",none:"none"},V.jws.JWS.isSafeJSONString=function(e,t,r){var n=null;try{return"object"!=(void 0===(n=K(e))?"undefined":i(n))?0:n.constructor===Array?0:(t&&(t[r]=n),1)}catch(e){return 0}},V.jws.JWS.readSafeJSONString=function(e){var t=null;try{return"object"!=(void 0===(t=K(e))?"undefined":i(t))?null:t.constructor===Array?null:t}catch(e){return null}},V.jws.JWS.getEncodedSignatureValueFromJWS=function(e){var t=e.match(/^[^.]+\.[^.]+\.([^.]+)$/);if(null==t)throw"JWS signature is not a form of 'Head.Payload.SigValue'.";return t[1]},V.jws.JWS.getJWKthumbprint=function(e){if("RSA"!==e.kty&&"EC"!==e.kty&&"oct"!==e.kty)throw"unsupported algorithm for JWK Thumprint";var t="{";if("RSA"===e.kty){if("string"!=typeof e.n||"string"!=typeof e.e)throw"wrong n and e value for RSA key";t+='"e":"'+e.e+'",',t+='"kty":"'+e.kty+'",',t+='"n":"'+e.n+'"}'}else if("EC"===e.kty){if("string"!=typeof e.crv||"string"!=typeof e.x||"string"!=typeof e.y)throw"wrong crv, x and y value for EC key";t+='"crv":"'+e.crv+'",',t+='"kty":"'+e.kty+'",',t+='"x":"'+e.x+'",',t+='"y":"'+e.y+'"}'}else if("oct"===e.kty){if("string"!=typeof e.k)throw"wrong k value for oct(symmetric) key";t+='"kty":"'+e.kty+'",',t+='"k":"'+e.k+'"}'}var r=rstrtohex(t);return hextob64u(V.crypto.Util.hashHex(r,"sha256"))},V.jws.IntDate={},V.jws.IntDate.get=function(e){var t=V.jws.IntDate,r=t.getNow,n=t.getZulu;if("now"==e)return r();if("now + 1hour"==e)return r()+3600;if("now + 1day"==e)return r()+86400;if("now + 1month"==e)return r()+2592e3;if("now + 1year"==e)return r()+31536e3;if(e.match(/Z$/))return n(e);if(e.match(/^[0-9]+$/))return parseInt(e);throw"unsupported format: "+e},V.jws.IntDate.getZulu=function(e){return zulutosec(e)},V.jws.IntDate.getNow=function(){return~~(new Date/1e3)},V.jws.IntDate.intDate2UTCString=function(e){return new Date(1e3*e).toUTCString()},V.jws.IntDate.intDate2Zulu=function(e){var t=new Date(1e3*e);return("0000"+t.getUTCFullYear()).slice(-4)+("00"+(t.getUTCMonth()+1)).slice(-2)+("00"+t.getUTCDate()).slice(-2)+("00"+t.getUTCHours()).slice(-2)+("00"+t.getUTCMinutes()).slice(-2)+("00"+t.getUTCSeconds()).slice(-2)+"Z"},t.SecureRandom=SecureRandom,t.rng_seed_time=rng_seed_time,t.BigInteger=BigInteger,t.RSAKey=RSAKey,t.ECDSA=V.crypto.ECDSA,t.DSA=V.crypto.DSA,t.Signature=V.crypto.Signature,t.MessageDigest=V.crypto.MessageDigest,t.Mac=V.crypto.Mac,t.Cipher=V.crypto.Cipher,t.KEYUTIL=z,t.ASN1HEX=J,t.X509=X509,t.CryptoJS=y,t.b64tohex=b64tohex,t.b64toBA=b64toBA,t.stoBA=stoBA,t.BAtos=BAtos,t.BAtohex=BAtohex,t.stohex=stohex,t.stob64=function stob64(e){return hex2b64(stohex(e))},t.stob64u=function stob64u(e){return b64tob64u(hex2b64(stohex(e)))},t.b64utos=function b64utos(e){return BAtos(b64toBA(b64utob64(e)))},t.b64tob64u=b64tob64u,t.b64utob64=b64utob64,t.hex2b64=hex2b64,t.hextob64u=hextob64u,t.b64utohex=b64utohex,t.utf8tob64u=q,t.b64utoutf8=W,t.utf8tob64=function utf8tob64(e){return hex2b64(uricmptohex(encodeURIComponentAll(e)))},t.b64toutf8=function b64toutf8(e){return decodeURIComponent(hextouricmp(b64tohex(e)))},t.utf8tohex=utf8tohex,t.hextoutf8=hextoutf8,t.hextorstr=hextorstr,t.rstrtohex=rstrtohex,t.hextob64=hextob64,t.hextob64nl=hextob64nl,t.b64nltohex=b64nltohex,t.hextopem=hextopem,t.pemtohex=pemtohex,t.hextoArrayBuffer=function hextoArrayBuffer(e){if(e.length%2!=0)throw"input is not even length";if(null==e.match(/^[0-9A-Fa-f]+$/))throw"input is not hexadecimal";for(var t=new ArrayBuffer(e.length/2),r=new DataView(t),n=0;n<e.length/2;n++)r.setUint8(n,parseInt(e.substr(2*n,2),16));return t},t.ArrayBuffertohex=function ArrayBuffertohex(e){for(var t="",r=new DataView(e),n=0;n<e.byteLength;n++)t+=("00"+r.getUint8(n).toString(16)).slice(-2);return t},t.zulutomsec=zulutomsec,t.zulutosec=zulutosec,t.zulutodate=function zulutodate(e){return new Date(zulutomsec(e))},t.datetozulu=function datetozulu(e,t,r){var n,i=e.getUTCFullYear();if(t){if(i<1950||2049<i)throw"not proper year for UTCTime: "+i;n=(""+i).slice(-2)}else n=("000"+i).slice(-4);if(n+=("0"+(e.getUTCMonth()+1)).slice(-2),n+=("0"+e.getUTCDate()).slice(-2),n+=("0"+e.getUTCHours()).slice(-2),n+=("0"+e.getUTCMinutes()).slice(-2),n+=("0"+e.getUTCSeconds()).slice(-2),r){var o=e.getUTCMilliseconds();0!==o&&(n+="."+(o=(o=("00"+o).slice(-3)).replace(/0+$/g,"")))}return n+="Z"},t.uricmptohex=uricmptohex,t.hextouricmp=hextouricmp,t.ipv6tohex=ipv6tohex,t.hextoipv6=hextoipv6,t.hextoip=hextoip,t.iptohex=function iptohex(e){var t="malformed IP address";if(!(e=e.toLowerCase(e)).match(/^[0-9.]+$/)){if(e.match(/^[0-9a-f:]+$/)&&-1!==e.indexOf(":"))return ipv6tohex(e);throw t}var r=e.split(".");if(4!==r.length)throw t;var n="";try{for(var i=0;i<4;i++)n+=("0"+parseInt(r[i]).toString(16)).slice(-2);return n}catch(e){throw t}},t.encodeURIComponentAll=encodeURIComponentAll,t.newline_toUnix=function newline_toUnix(e){return e=e.replace(/\r\n/gm,"\n")},t.newline_toDos=function newline_toDos(e){return e=(e=e.replace(/\r\n/gm,"\n")).replace(/\n/gm,"\r\n")},t.hextoposhex=hextoposhex,t.intarystrtohex=function intarystrtohex(e){e=(e=(e=e.replace(/^\s*\[\s*/,"")).replace(/\s*\]\s*$/,"")).replace(/\s*/g,"");try{return e.split(/,/).map(function(e,t,r){var n=parseInt(e);if(n<0||255<n)throw"integer not in range 0-255";return("00"+n.toString(16)).slice(-2)}).join("")}catch(e){throw"malformed integer array string: "+e}},t.strdiffidx=function strdiffidx(e,t){var r=e.length;e.length>t.length&&(r=t.length);for(var n=0;n<r;n++)if(e.charCodeAt(n)!=t.charCodeAt(n))return n;return e.length!=t.length?r:-1},t.KJUR=V,t.crypto=V.crypto,t.asn1=V.asn1,t.jws=V.jws,t.lang=V.lang}).call(this,r(40).Buffer)},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.JoseUtil=void 0;var n=r(41),i=r(0);var o=["RS256","RS384","RS512","PS256","PS384","PS512","ES256","ES384","ES512"];t.JoseUtil=function(){function JoseUtil(){!function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,JoseUtil)}return JoseUtil.parseJwt=function parseJwt(e){i.Log.debug("JoseUtil.parseJwt");try{var t=n.jws.JWS.parse(e);return{header:t.headerObj,payload:t.payloadObj}}catch(e){i.Log.error(e)}},JoseUtil.validateJwt=function validateJwt(e,t,r,o,s,a){i.Log.debug("JoseUtil.validateJwt");try{if("RSA"===t.kty)if(t.e&&t.n)t=n.KEYUTIL.getKey(t);else{if(!t.x5c||!t.x5c.length)return i.Log.error("JoseUtil.validateJwt: RSA key missing key material",t),Promise.reject(new Error("RSA key missing key material"));var u=(0,n.b64tohex)(t.x5c[0]);t=n.X509.getPublicKeyFromCertHex(u)}else{if("EC"!==t.kty)return i.Log.error("JoseUtil.validateJwt: Unsupported key type",t&&t.kty),Promise.reject(new Error("Unsupported key type: "+t&&t.kty));if(!(t.crv&&t.x&&t.y))return i.Log.error("JoseUtil.validateJwt: EC key missing key material",t),Promise.reject(new Error("EC key missing key material"));t=n.KEYUTIL.getKey(t)}return JoseUtil._validateJwt(e,t,r,o,s,a)}catch(e){return i.Log.error(e&&e.message||e),Promise.reject("JWT validation failed")}},JoseUtil._validateJwt=function _validateJwt(e,t,r,s,a,u){a||(a=0),u||(u=parseInt(Date.now()/1e3));var c=JoseUtil.parseJwt(e).payload;if(!c.iss)return i.Log.error("JoseUtil._validateJwt: issuer was not provided"),Promise.reject(new Error("issuer was not provided"));if(c.iss!==r)return i.Log.error("JoseUtil._validateJwt: Invalid issuer in token",c.iss),Promise.reject(new Error("Invalid issuer in token: "+c.iss));if(!c.aud)return i.Log.error("JoseUtil._validateJwt: aud was not provided"),Promise.reject(new Error("aud was not provided"));if(!(c.aud===s||Array.isArray(c.aud)&&c.aud.indexOf(s)>=0))return i.Log.error("JoseUtil._validateJwt: Invalid audience in token",c.aud),Promise.reject(new Error("Invalid audience in token: "+c.aud));var h=u+a,l=u-a;if(!c.iat)return i.Log.error("JoseUtil._validateJwt: iat was not provided"),Promise.reject(new Error("iat was not provided"));if(h<c.iat)return i.Log.error("JoseUtil._validateJwt: iat is in the future",c.iat),Promise.reject(new Error("iat is in the future: "+c.iat));if(c.nbf&&h<c.nbf)return i.Log.error("JoseUtil._validateJwt: nbf is in the future",c.nbf),Promise.reject(new Error("nbf is in the future: "+c.nbf));if(!c.exp)return i.Log.error("JoseUtil._validateJwt: exp was not provided"),Promise.reject(new Error("exp was not provided"));if(c.exp<l)return i.Log.error("JoseUtil._validateJwt: exp is in the past",c.exp),Promise.reject(new Error("exp is in the past:"+c.exp));try{if(!n.jws.JWS.verify(e,t,o))return i.Log.error("JoseUtil._validateJwt: signature validation failed"),Promise.reject(new Error("signature validation failed"))}catch(e){return i.Log.error(e&&e.message||e),Promise.reject(new Error("signature validation failed"))}return Promise.resolve()},JoseUtil.hashString=function hashString(e,t){try{return n.crypto.Util.hashString(e,t)}catch(e){i.Log.error(e)}},JoseUtil.hexToBase64Url=function hexToBase64Url(e){try{return(0,n.hextob64u)(e)}catch(e){i.Log.error(e)}},JoseUtil}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserInfoService=void 0;var n=r(17),i=r(3),o=r(0);t.UserInfoService=function(){function UserInfoService(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:n.JsonService,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:i.MetadataService;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,UserInfoService),!e)throw o.Log.error("UserInfoService.ctor: No settings passed"),new Error("settings");this._settings=e,this._jsonService=new t,this._metadataService=new r(this._settings)}return UserInfoService.prototype.getClaims=function getClaims(e){var t=this;return e?this._metadataService.getUserInfoEndpoint().then(function(r){return o.Log.debug("UserInfoService.getClaims: received userinfo url",r),t._jsonService.getJson(r,e).then(function(e){return o.Log.debug("UserInfoService.getClaims: claims received",e),e})}):(o.Log.error("UserInfoService.getClaims: No token passed"),Promise.reject(new Error("A token is required")))},UserInfoService}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.ResponseValidator=void 0;var n=r(0),i=r(3),o=r(43),s=r(16),a=r(42);var u=["nonce","at_hash","iat","nbf","exp","aud","iss","c_hash"];t.ResponseValidator=function(){function ResponseValidator(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:i.MetadataService,r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o.UserInfoService,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:a.JoseUtil;if(function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,ResponseValidator),!e)throw n.Log.error("ResponseValidator.ctor: No settings passed to ResponseValidator"),new Error("settings");this._settings=e,this._metadataService=new t(this._settings),this._userInfoService=new r(this._settings),this._joseUtil=s}return ResponseValidator.prototype.validateSigninResponse=function validateSigninResponse(e,t){var r=this;return n.Log.debug("ResponseValidator.validateSigninResponse"),this._processSigninParams(e,t).then(function(t){return n.Log.debug("ResponseValidator.validateSigninResponse: state processed"),r._validateTokens(e,t).then(function(e){return n.Log.debug("ResponseValidator.validateSigninResponse: tokens validated"),r._processClaims(e).then(function(e){return n.Log.debug("ResponseValidator.validateSigninResponse: claims processed"),e})})})},ResponseValidator.prototype.validateSignoutResponse=function validateSignoutResponse(e,t){return e.id!==t.state?(n.Log.error("ResponseValidator.validateSignoutResponse: State does not match"),Promise.reject(new Error("State does not match"))):(n.Log.debug("ResponseValidator.validateSignoutResponse: state validated"),t.state=e.data,t.error?(n.Log.warn("ResponseValidator.validateSignoutResponse: Response was error",t.error),Promise.reject(new s.ErrorResponse(t))):Promise.resolve(t))},ResponseValidator.prototype._processSigninParams=function _processSigninParams(e,t){if(e.id!==t.state)return n.Log.error("ResponseValidator._processSigninParams: State does not match"),Promise.reject(new Error("State does not match"));if(!e.client_id)return n.Log.error("ResponseValidator._processSigninParams: No client_id on state"),Promise.reject(new Error("No client_id on state"));if(!e.authority)return n.Log.error("ResponseValidator._processSigninParams: No authority on state"),Promise.reject(new Error("No authority on state"));if(this._settings.authority){if(this._settings.authority&&this._settings.authority!==e.authority)return n.Log.error("ResponseValidator._processSigninParams: authority mismatch on settings vs. signin state"),Promise.reject(new Error("authority mismatch on settings vs. signin state"))}else this._settings.authority=e.authority;if(this._settings.client_id){if(this._settings.client_id&&this._settings.client_id!==e.client_id)return n.Log.error("ResponseValidator._processSigninParams: client_id mismatch on settings vs. signin state"),Promise.reject(new Error("client_id mismatch on settings vs. signin state"))}else this._settings.client_id=e.client_id;return n.Log.debug("ResponseValidator._processSigninParams: state validated"),t.state=e.data,t.error?(n.Log.warn("ResponseValidator._processSigninParams: Response was error",t.error),Promise.reject(new s.ErrorResponse(t))):e.nonce&&!t.id_token?(n.Log.error("ResponseValidator._processSigninParams: Expecting id_token in response"),Promise.reject(new Error("No id_token in response"))):!e.nonce&&t.id_token?(n.Log.error("ResponseValidator._processSigninParams: Not expecting id_token in response"),Promise.reject(new Error("Unexpected id_token in response"))):Promise.resolve(t)},ResponseValidator.prototype._processClaims=function _processClaims(e){var t=this;if(e.isOpenIdConnect){if(n.Log.debug("ResponseValidator._processClaims: response is OIDC, processing claims"),e.profile=this._filterProtocolClaims(e.profile),this._settings.loadUserInfo&&e.access_token)return n.Log.debug("ResponseValidator._processClaims: loading user info"),this._userInfoService.getClaims(e.access_token).then(function(r){return n.Log.debug("ResponseValidator._processClaims: user info claims received from user info endpoint"),r.sub!==e.profile.sub?(n.Log.error("ResponseValidator._processClaims: sub from user info endpoint does not match sub in access_token"),Promise.reject(new Error("sub from user info endpoint does not match sub in access_token"))):(e.profile=t._mergeClaims(e.profile,r),n.Log.debug("ResponseValidator._processClaims: user info claims received, updated profile:",e.profile),e)});n.Log.debug("ResponseValidator._processClaims: not loading user info")}else n.Log.debug("ResponseValidator._processClaims: response is not OIDC, not processing claims");return Promise.resolve(e)},ResponseValidator.prototype._mergeClaims=function _mergeClaims(e,t){var r=Object.assign({},e);for(var n in t){var i=t[n];Array.isArray(i)||(i=[i]);for(var o=0;o<i.length;o++){var s=i[o];r[n]?Array.isArray(r[n])?r[n].indexOf(s)<0&&r[n].push(s):r[n]!==s&&(r[n]=[r[n],s]):r[n]=s}}return r},ResponseValidator.prototype._filterProtocolClaims=function _filterProtocolClaims(e){n.Log.debug("ResponseValidator._filterProtocolClaims, incoming claims:",e);var t=Object.assign({},e);return this._settings._filterProtocolClaims?(u.forEach(function(e){delete t[e]}),n.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims filtered",t)):n.Log.debug("ResponseValidator._filterProtocolClaims: protocol claims not filtered"),t},ResponseValidator.prototype._validateTokens=function _validateTokens(e,t){return t.id_token?t.access_token?(n.Log.debug("ResponseValidator._validateTokens: Validating id_token and access_token"),this._validateIdTokenAndAccessToken(e,t)):(n.Log.debug("ResponseValidator._validateTokens: Validating id_token"),this._validateIdToken(e,t)):(n.Log.debug("ResponseValidator._validateTokens: No id_token to validate"),Promise.resolve(t))},ResponseValidator.prototype._validateIdTokenAndAccessToken=function _validateIdTokenAndAccessToken(e,t){var r=this;return this._validateIdToken(e,t).then(function(e){return r._validateAccessToken(e)})},ResponseValidator.prototype._validateIdToken=function _validateIdToken(e,t){var r=this;if(!e.nonce)return n.Log.error("ResponseValidator._validateIdToken: No nonce on state"),Promise.reject(new Error("No nonce on state"));var i=this._joseUtil.parseJwt(t.id_token);if(!i||!i.header||!i.payload)return n.Log.error("ResponseValidator._validateIdToken: Failed to parse id_token",i),Promise.reject(new Error("Failed to parse id_token"));if(e.nonce!==i.payload.nonce)return n.Log.error("ResponseValidator._validateIdToken: Invalid nonce in id_token"),Promise.reject(new Error("Invalid nonce in id_token"));var o=i.header.kid;return this._metadataService.getIssuer().then(function(s){return n.Log.debug("ResponseValidator._validateIdToken: Received issuer"),r._metadataService.getSigningKeys().then(function(a){if(!a)return n.Log.error("ResponseValidator._validateIdToken: No signing keys from metadata"),Promise.reject(new Error("No signing keys from metadata"));n.Log.debug("ResponseValidator._validateIdToken: Received signing keys");var u=void 0;if(o)u=a.filter(function(e){return e.kid===o})[0];else{if((a=r._filterByAlg(a,i.header.alg)).length>1)return n.Log.error("ResponseValidator._validateIdToken: No kid found in id_token and more than one key found in metadata"),Promise.reject(new Error("No kid found in id_token and more than one key found in metadata"));u=a[0]}if(!u)return n.Log.error("ResponseValidator._validateIdToken: No key matching kid or alg found in signing keys"),Promise.reject(new Error("No key matching kid or alg found in signing keys"));var c=e.client_id,h=r._settings.clockSkew;return n.Log.debug("ResponseValidator._validateIdToken: Validaing JWT; using clock skew (in seconds) of: ",h),r._joseUtil.validateJwt(t.id_token,u,s,c,h).then(function(){return n.Log.debug("ResponseValidator._validateIdToken: JWT validation successful"),i.payload.sub?(t.profile=i.payload,t):(n.Log.error("ResponseValidator._validateIdToken: No sub present in id_token"),Promise.reject(new Error("No sub present in id_token")))})})})},ResponseValidator.prototype._filterByAlg=function _filterByAlg(e,t){var r=null;if(t.startsWith("RS"))r="RSA";else if(t.startsWith("PS"))r="PS";else{if(!t.startsWith("ES"))return n.Log.debug("ResponseValidator._filterByAlg: alg not supported: ",t),[];r="EC"}return n.Log.debug("ResponseValidator._filterByAlg: Looking for keys that match kty: ",r),e=e.filter(function(e){return e.kty===r}),n.Log.debug("ResponseValidator._filterByAlg: Number of keys that match kty: ",r,e.length),e},ResponseValidator.prototype._validateAccessToken=function _validateAccessToken(e){if(!e.profile)return n.Log.error("ResponseValidator._validateAccessToken: No profile loaded from id_token"),Promise.reject(new Error("No profile loaded from id_token"));if(!e.profile.at_hash)return n.Log.error("ResponseValidator._validateAccessToken: No at_hash in id_token"),Promise.reject(new Error("No at_hash in id_token"));if(!e.id_token)return n.Log.error("ResponseValidator._validateAccessToken: No id_token"),Promise.reject(new Error("No id_token"));var t=this._joseUtil.parseJwt(e.id_token);if(!t||!t.header)return n.Log.error("ResponseValidator._validateAccessToken: Failed to parse id_token",t),Promise.reject(new Error("Failed to parse id_token"));var r=t.header.alg;if(!r||5!==r.length)return n.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",r),Promise.reject(new Error("Unsupported alg: "+r));var i=r.substr(2,3);if(!i)return n.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",r,i),Promise.reject(new Error("Unsupported alg: "+r));if(256!==(i=parseInt(i))&&384!==i&&512!==i)return n.Log.error("ResponseValidator._validateAccessToken: Unsupported alg:",r,i),Promise.reject(new Error("Unsupported alg: "+r));var o="sha"+i,s=this._joseUtil.hashString(e.access_token,o);if(!s)return n.Log.error("ResponseValidator._validateAccessToken: access_token hash failed:",o),Promise.reject(new Error("Failed to validate at_hash"));var a=s.substr(0,s.length/2),u=this._joseUtil.hexToBase64Url(a);return u!==e.profile.at_hash?(n.Log.error("ResponseValidator._validateAccessToken: Failed to validate at_hash",u,e.profile.at_hash),Promise.reject(new Error("Failed to validate at_hash"))):(n.Log.debug("ResponseValidator._validateAccessToken: success"),Promise.resolve(e))},ResponseValidator}()},function(e,t,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r(0),i=r(18),o=r(6),s=r(5),a=r(31),u=r(30),c=r(12),h=r(3),l=r(20),f=r(19),g=r(9),p=r(8),d=r(10),v=r(1),y=r(13);t.default={Log:n.Log,OidcClient:i.OidcClient,OidcClientSettings:o.OidcClientSettings,WebStorageStateStore:s.WebStorageStateStore,InMemoryWebStorage:a.InMemoryWebStorage,UserManager:u.UserManager,AccessTokenEvents:c.AccessTokenEvents,MetadataService:h.MetadataService,CordovaPopupNavigator:l.CordovaPopupNavigator,CordovaIFrameNavigator:f.CordovaIFrameNavigator,CheckSessionIFrame:g.CheckSessionIFrame,TokenRevocationClient:p.TokenRevocationClient,SessionMonitor:d.SessionMonitor,Global:v.Global,User:y.User},e.exports=t.default}])});

/***/ }),

/***/ "ebd6":
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__("cb7c");
var aFunction = __webpack_require__("d8e8");
var SPECIES = __webpack_require__("2b4c")('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),

/***/ "f605":
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),

/***/ "fab2":
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__("7726").document;
module.exports = document && document.documentElement;


/***/ }),

/***/ "fae3":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var setPublicPath_i
  if ((setPublicPath_i = window.document.currentScript) && (setPublicPath_i = setPublicPath_i.src.match(/(.+\/)[^/]+\.js$/))) {
    __webpack_require__.p = setPublicPath_i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.promise.js
var es6_promise = __webpack_require__("551c");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es6.regexp.replace.js
var es6_regexp_replace = __webpack_require__("a481");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/builtin/es6/objectSpread.js

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}
// EXTERNAL MODULE: external {"commonjs":"vue","commonjs2":"vue","root":"Vue"}
var external_commonjs_vue_commonjs2_vue_root_Vue_ = __webpack_require__("8bbf");
var external_commonjs_vue_commonjs2_vue_root_Vue_default = /*#__PURE__*/__webpack_require__.n(external_commonjs_vue_commonjs2_vue_root_Vue_);

// EXTERNAL MODULE: ./node_modules/oidc-client/lib/oidc-client.min.js
var oidc_client_min = __webpack_require__("dd17");

// CONCATENATED MODULE: ./src/VueOidcAuth.js





oidc_client_min["Log"].level = oidc_client_min["Log"].DEBUG;
/**
 * Indicates the sign in behavior.
 */

var SignInType = {
  /**
   * Uses the main browser window to do sign-in.
   */
  Window: 0,

  /**
   * Uses a popup window to do sign-in.
   */
  Popup: 1,

  /**
   * Uses a hidden iframe to do sign-in.
   */
  Silent: 2,

  /**
   * String value map for Window.
   */
  0: 'Window',

  /**
   * String value map for Popup.
   */
  1: 'Popup',

  /**
   * String value map for Silent.
   */
  2: 'Silent'
};

function createOidcAuth(_authName, defaultSignInType, _appUrl, oidcConfig) {
  var logger = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : console;

  if (!_authName) {
    throw new Error('Auth name is required.');
  }

  if (defaultSignInType !== SignInType.Window && defaultSignInType !== SignInType.Popup) {
    throw new Error('Only window or popup are valid default signin types.');
  }

  if (!_appUrl) {
    throw new Error('App base url is required.');
  }

  if (!oidcConfig) {
    throw new Error('No config provided to oidc auth.');
  }

  oidc_client_min["Log"].logger = logger; // merge config with defaults

  var config = _objectSpread({
    response_type: 'id_token',
    scope: 'openid profile',
    automaticSilentRenew: true,
    userStore: new oidc_client_min["WebStorageStateStore"]({
      store: localStorage
    }),
    post_logout_redirect_uri: _appUrl
  }, oidcConfig, {
    // all properties after this are not user configurable
    redirect_uri: "".concat(_appUrl, "auth/signinwin/").concat(_authName),
    popup_post_logout_redirect_uri: "".concat(_appUrl, "auth/signoutpop/").concat(_authName),
    popup_redirect_uri: "".concat(_appUrl, "auth/signinpop/").concat(_authName),
    silent_redirect_uri: "".concat(_appUrl, "auth/signinsilent/").concat(_authName)
  });

  oidc_client_min["Log"].debug("Creating new oidc auth as ".concat(_authName));
  var mgr = new oidc_client_min["UserManager"](config); ///////////////////////////////
  // events
  ///////////////////////////////

  mgr.events.addAccessTokenExpiring(function () {
    oidc_client_min["Log"].debug("".concat(_authName, " auth token expiring"));
  });
  mgr.events.addAccessTokenExpired(function () {
    oidc_client_min["Log"].debug("".concat(_authName, " auth token expired"));

    if (auth.isAuthenticated) {
      mgr.signinSilent().then(function () {
        oidc_client_min["Log"].debug("".concat(_authName, " auth silent renew after token expiration"));
      }).catch(function () {
        oidc_client_min["Log"].debug("".concat(_authName, " auth silent renew error token expiration"));
        auth.signOut();
      });
    }
  });
  mgr.events.addSilentRenewError(function (e) {
    oidc_client_min["Log"].error("".concat(_authName, " auth silent renew error"), e.message); // TODO: need to restart renew manually?
    // if (auth.isAuthenticated) {
    //   setTimeout(() => {
    //     mgr.signinSilent();
    //   }, 5000);
    // }
  });
  mgr.events.addUserLoaded(function (user) {
    auth.user = user;
  });
  mgr.events.addUserUnloaded(function () {
    auth.user = undefined; // redirect if on protected route (best method here?)

    oidc_client_min["Log"].debug("".concat(_authName, " auth user unloaded"));

    if (auth.myRouter) {
      var current = auth.myRouter.currentRoute;

      if (current && current.meta.authName === _authName) {
        auth.myRouter.replace('/');
      }
    }
  });
  mgr.events.addUserSignedOut(function () {
    oidc_client_min["Log"].debug("".concat(_authName, " auth user signed out"));
    auth.user = undefined;
  });

  function _signIn(type, args) {
    switch (type) {
      case SignInType.Popup:
        return mgr.signinPopup(args);

      case SignInType.Silent:
        return mgr.signinSilent(args);
    }

    return mgr.signinRedirect(args);
  }

  function redirectAfterSignout(router) {
    if (router) {
      var current = router.currentRoute;

      if (current && current.meta.authName === _authName) {
        router.replace('/');
        return;
      }
    } //   window.location.reload(true);


    if (_appUrl) window.location = _appUrl;
  }

  var _inited = false;
  var auth = new external_commonjs_vue_commonjs2_vue_root_Vue_default.a({
    data: function data() {
      return {
        user: undefined
      };
    },
    computed: {
      appUrl: function appUrl() {
        return _appUrl;
      },
      authName: function authName() {
        return _authName;
      },
      isAuthenticated: function isAuthenticated() {
        return !!this.user && !this.user.expired;
      },
      accessToken: function accessToken() {
        return !!this.user && !this.user.expired ? this.user.access_token : '';
      },
      userProfile: function userProfile() {
        return !!this.user && !this.user.expired ? this.user.profile : {};
      }
    },
    methods: {
      startup: function startup() {
        var _this = this;

        var path = window.location.pathname;

        if (path.indexOf('/signinpop/') > -1) {
          mgr.signinPopupCallback();
          return Promise.resolve(false);
        } else if (path.indexOf('/signinsilent/') > -1) {
          mgr.signinSilentCallback();
          return Promise.resolve(false);
        } else if (path.indexOf('/signoutpop/') > -1) {
          mgr.signoutPopupCallback();
          return Promise.resolve(false);
        }

        if (_inited) {
          return Promise.resolve(true);
        } else {
          // load user from storage
          return mgr.getUser().then(function (test) {
            _inited = true;

            if (test && !test.expired) {
              _this.user = test;
            }

            return true;
          }).catch(function (err) {
            oidc_client_min["Log"].warn("Auth startup err = ".concat(err));
            return false;
          });
        }
      },
      useRouter: function useRouter(router) {
        var _this2 = this;

        this.myRouter = router;

        var guard = function guard(to, from, next) {
          if (to.matched.some(function (record) {
            return record.meta.authName === _this2.authName;
          })) {
            if (_this2.isAuthenticated) {
              next();
            } else {
              _signIn(defaultSignInType, {
                state: {
                  to: to
                }
              }).then(function () {
                if (defaultSignInType === SignInType.Window) {
                  next(false);
                } else {
                  next();
                }
              }).catch(function () {
                return next(false);
              });
            }
          } else {
            next();
          }
        };

        router.beforeEach(guard);
        router.addRoutes([{
          path: "/auth/signinwin/".concat(_authName),
          name: 'signinwin',
          component: {
            render: function render(h) {
              return h('div');
            },
            created: function created() {
              mgr.signinRedirectCallback().then(function (data) {
                oidc_client_min["Log"].debug("".concat(_authName, " Window signin callback success"), data); // need to manually redirect for window type
                // goto original secure route or root

                var redirect = data.state ? data.state.to : null;
                if (router) router.replace(redirect || '/');else window.location = _appUrl;
              }).catch(function (err) {
                oidc_client_min["Log"].error("".concat(_authName, " Window signin callback error"), err);
                if (router) router.replace('/');else window.location = _appUrl;
              });
            }
          }
        }]);
      },
      signIn: function signIn(args) {
        return _signIn(defaultSignInType, args);
      },
      signOut: function signOut(args) {
        if (defaultSignInType === SignInType.Popup) {
          var router = this.myRouter;
          return mgr.signoutPopup(args).then(function () {
            redirectAfterSignout(router);
          }).catch(function () {
            // could be window closed
            redirectAfterSignout(router);
          });
        }

        return mgr.signoutRedirect(args);
      }
    }
  });
  return auth;
}


// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib-no-default.js
/* concated harmony reexport SignInType */__webpack_require__.d(__webpack_exports__, "SignInType", function() { return SignInType; });
/* concated harmony reexport createOidcAuth */__webpack_require__.d(__webpack_exports__, "createOidcAuth", function() { return createOidcAuth; });




/***/ })

/******/ });
});
//# sourceMappingURL=VueOidcAuth.umd.js.map