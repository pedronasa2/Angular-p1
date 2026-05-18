import {
  _objectWithoutPropertiesLoose
} from "./chunk-E3OZNAC5.js";
import {
  EventsStrategy
} from "./chunk-HNNPSSXJ.js";
import {
  ready_callbacks_default,
  renderer_default
} from "./chunk-H2RLU3GL.js";
import {
  ajax_default
} from "./chunk-PTEJQ6I5.js";
import {
  Deferred,
  class_default,
  compileGetter,
  config_default2 as config_default,
  deepExtendArraySafe,
  dom_adapter_default,
  each,
  equalByValue,
  error_default,
  errors_default,
  extend,
  fromPromise,
  getWindow,
  grep,
  guid_default2 as guid_default,
  isBoolean,
  isDefined,
  isEmptyObject,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isString,
  m_common_default,
  map,
  noop,
  toComparable,
  when
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/__internal/data/m_errors.js
var errors = error_default(errors_default.ERROR_MESSAGES, {
  E4000: "[DevExpress.data]: {0}",
  E4001: "Unknown aggregating function is detected: '{0}'",
  E4002: "Unsupported OData protocol version is used",
  E4003: "Unknown filter operation is used: {0}",
  E4004: "The thenby() method is called before the sortby() method",
  E4005: "Store requires a key expression for this operation",
  E4006: "ArrayStore 'data' option must be an array",
  E4007: "Compound keys cannot be auto-generated",
  E4008: "Attempt to insert an item with a duplicated key",
  E4009: "Data item cannot be found",
  E4010: "CustomStore does not support creating queries",
  E4011: "Custom Store method is not implemented or is not a function: {0}",
  E4012: "Custom Store method returns an invalid value: {0}",
  E4013: "Local Store requires the 'name' configuration option is specified",
  E4014: "Unknown data type is specified for ODataStore: {0}",
  E4015: "Unknown entity name or alias is used: {0}",
  E4016: "The compileSetter(expr) method is called with 'self' passed as a parameter",
  E4017: "Keys cannot be modified",
  E4018: "The server has returned a non-numeric value in a response to an item count request",
  E4019: "Mixing of group operators inside a single group of filter expression is not allowed",
  E4020: "Unknown store type is detected: {0}",
  E4021: "The server response does not provide the totalCount value",
  E4022: "The server response does not provide the groupCount value",
  E4023: "Could not parse the following XML: {0}",
  E4024: "String function {0} cannot be used with the data field {1} of type {2}.",
  W4000: "Data returned from the server has an incorrect structure",
  W4001: 'The {0} field is listed in both "keyType" and "fieldTypes". The value of "fieldTypes" is used.',
  W4002: "Data loading has failed for some cells due to the following error: {0}"
});
var errorHandler = null;
var handleError = function(error) {
  var _errorHandler;
  null === (_errorHandler = errorHandler) || void 0 === _errorHandler || _errorHandler(error);
};
var setErrorHandler = (handler) => errorHandler = handler;

// node_modules/devextreme/esm/__internal/data/m_utils.js
var ready = ready_callbacks_default.add;
var XHR_ERROR_UNLOAD = "DEVEXTREME_XHR_ERROR_UNLOAD";
var normalizeBinaryCriterion = function(crit) {
  return [crit[0], crit.length < 3 ? "=" : String(crit[1]).toLowerCase(), crit.length < 2 ? true : crit[crit.length - 1]];
};
var normalizeSortingInfo = function(info) {
  if (!Array.isArray(info)) {
    info = [info];
  }
  return map(info, (i) => {
    const result = {
      selector: isFunction(i) || "string" === typeof i ? i : i.getter || i.field || i.selector,
      desc: !!(i.desc || "d" === String(i.dir).charAt(0).toLowerCase())
    };
    if (i.compare) {
      result.compare = i.compare;
    }
    return result;
  });
};
var errorMessageFromXhr = (function() {
  const textStatusMessages = {
    timeout: "Network connection timeout",
    error: "Unspecified network error",
    parsererror: "Unexpected server response"
  };
  let unloading;
  ready(() => {
    const window = getWindow();
    dom_adapter_default.listen(window, "beforeunload", () => {
      unloading = true;
    });
  });
  return function(xhr, textStatus) {
    if (unloading) {
      return XHR_ERROR_UNLOAD;
    }
    if (xhr.status < 400) {
      return (function(textStatus2) {
        let result = textStatusMessages[textStatus2];
        if (!result) {
          return textStatus2;
        }
        return result;
      })(textStatus);
    }
    return xhr.statusText;
  };
})();
var aggregators = {
  count: {
    seed: 0,
    step: (count) => 1 + count
  },
  sum: {
    seed: 0,
    step: (sum, item) => sum + item
  },
  min: {
    step: (min, item) => item < min ? item : min
  },
  max: {
    step: (max, item) => item > max ? item : max
  },
  avg: {
    seed: [0, 0],
    step: (pair, value) => [pair[0] + value, pair[1] + 1],
    finalize: (pair) => pair[1] ? pair[0] / pair[1] : NaN
  }
};
var processRequestResultLock = /* @__PURE__ */ (function() {
  let lockCount = 0;
  let lockDeferred;
  return {
    obtain: function() {
      if (0 === lockCount) {
        lockDeferred = new Deferred();
      }
      lockCount++;
    },
    release: function() {
      lockCount--;
      if (lockCount < 1) {
        lockDeferred.resolve();
      }
    },
    promise: function() {
      const deferred = 0 === lockCount ? new Deferred().resolve() : lockDeferred;
      return deferred.promise();
    },
    reset: function() {
      lockCount = 0;
      if (lockDeferred) {
        lockDeferred.resolve();
      }
    }
  };
})();
function isConjunctiveOperator(condition) {
  return /^(and|&&|&)$/i.test(condition);
}
var keysEqual = function(keyExpr, key1, key2) {
  if (Array.isArray(keyExpr)) {
    const names = map(key1, (v, k) => k);
    let name;
    for (let i = 0; i < names.length; i++) {
      name = names[i];
      if (!equalByValue(key1[name], key2[name], {
        strict: false
      })) {
        return false;
      }
    }
    return true;
  }
  return equalByValue(key1, key2, {
    strict: false
  });
};
var BASE64_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
var base64_encode = function(input) {
  if (!Array.isArray(input)) {
    input = stringToByteArray(String(input));
  }
  let result = "";
  function getBase64Char(index) {
    return BASE64_CHARS.charAt(index);
  }
  for (let i = 0; i < input.length; i += 3) {
    const octet1 = input[i];
    const octet2 = input[i + 1];
    const octet3 = input[i + 2];
    result += map([octet1 >> 2, (3 & octet1) << 4 | octet2 >> 4, isNaN(octet2) ? 64 : (15 & octet2) << 2 | octet3 >> 6, isNaN(octet3) ? 64 : 63 & octet3], getBase64Char).join("");
  }
  return result;
};
function stringToByteArray(str) {
  const bytes = [];
  let code;
  let i;
  for (i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    if (code < 128) {
      bytes.push(code);
    } else if (code < 2048) {
      bytes.push(192 + (code >> 6), 128 + (63 & code));
    } else if (code < 65536) {
      bytes.push(224 + (code >> 12), 128 + (code >> 6 & 63), 128 + (63 & code));
    } else if (code < 2097152) {
      bytes.push(240 + (code >> 18), 128 + (code >> 12 & 63), 128 + (code >> 6 & 63), 128 + (63 & code));
    }
  }
  return bytes;
}
var isUnaryOperation = function(crit) {
  return "!" === crit[0] && Array.isArray(crit[1]);
};
var isGroupOperator = function(value) {
  return "and" === value || "or" === value;
};
var isUniformEqualsByOr = function(crit) {
  if (crit.length > 2 && Array.isArray(crit[0]) && "or" === crit[1] && "string" === typeof crit[0][0] && "=" === crit[0][1]) {
    const [prop] = crit[0];
    return !crit.find((el, i) => i % 2 !== 0 ? "or" !== el : !Array.isArray(el) || 3 !== el.length || el[0] !== prop || "=" !== el[1]);
  }
  return false;
};
var isGroupCriterion = function(crit) {
  const first = crit[0];
  const second = crit[1];
  if (Array.isArray(first)) {
    return true;
  }
  if (isFunction(first)) {
    if (Array.isArray(second) || isFunction(second) || isGroupOperator(second)) {
      return true;
    }
  }
  return false;
};
var trivialPromise = function() {
  const d = new Deferred();
  return d.resolve.apply(d, arguments).promise();
};
var rejectedPromise = function() {
  const d = new Deferred();
  return d.reject.apply(d, arguments).promise();
};
function throttle(func, timeout) {
  let timeoutId;
  return function() {
    if (!timeoutId) {
      timeoutId = setTimeout(() => {
        timeoutId = void 0;
        func.call(this);
      }, isFunction(timeout) ? timeout() : timeout);
    }
    return timeoutId;
  };
}
function throttleChanges(func, timeout) {
  let cache = [];
  const throttled = throttle(function() {
    func.call(this, cache);
    cache = [];
  }, timeout);
  return function(changes) {
    if (Array.isArray(changes)) {
      cache.push(...changes);
    }
    return throttled.call(this, cache);
  };
}

// node_modules/devextreme/esm/__internal/data/m_array_query.js
var Iterator = class_default.inherit({
  toArray() {
    const result = [];
    this.reset();
    while (this.next()) {
      result.push(this.current());
    }
    return result;
  },
  countable: () => false
});
var ArrayIterator = Iterator.inherit({
  ctor(array) {
    this.array = array;
    this.index = -1;
  },
  next() {
    if (this.index + 1 < this.array.length) {
      this.index++;
      return true;
    }
    return false;
  },
  current() {
    return this.array[this.index];
  },
  reset() {
    this.index = -1;
  },
  toArray() {
    return this.array.slice(0);
  },
  countable: () => true,
  count() {
    return this.array.length;
  }
});
var WrappedIterator = Iterator.inherit({
  ctor(iter) {
    this.iter = iter;
  },
  next() {
    return this.iter.next();
  },
  current() {
    return this.iter.current();
  },
  reset() {
    return this.iter.reset();
  }
});
var MapIterator = WrappedIterator.inherit({
  ctor(iter, mapper) {
    this.callBase(iter);
    this.index = -1;
    this.mapper = mapper;
  },
  current() {
    return this.mapper(this.callBase(), this.index);
  },
  next() {
    const hasNext = this.callBase();
    if (hasNext) {
      this.index++;
    }
    return hasNext;
  }
});
var defaultCompare = function(xValue, yValue, options) {
  if (isString(xValue) && isString(yValue) && (null !== options && void 0 !== options && options.locale || null !== options && void 0 !== options && options.collatorOptions)) {
    return new Intl.Collator((null === options || void 0 === options ? void 0 : options.locale) || void 0, (null === options || void 0 === options ? void 0 : options.collatorOptions) || void 0).compare(xValue, yValue);
  }
  xValue = toComparable(xValue, false, options);
  yValue = toComparable(yValue, false, options);
  if (null === xValue && null !== yValue) {
    return -1;
  }
  if (null !== xValue && null === yValue) {
    return 1;
  }
  if (void 0 === xValue && void 0 !== yValue) {
    return 1;
  }
  if (void 0 !== xValue && void 0 === yValue) {
    return -1;
  }
  if (xValue < yValue) {
    return -1;
  }
  if (xValue > yValue) {
    return 1;
  }
  return 0;
};
var SortIterator = Iterator.inherit({
  ctor(iter, getter, desc, compare) {
    this.langParams = iter.langParams;
    if (!(iter instanceof MapIterator)) {
      iter = new MapIterator(iter, this._wrap);
      iter.langParams = this.langParams;
    }
    this.iter = iter;
    this.rules = [{
      getter,
      desc,
      compare,
      langParams: this.langParams
    }];
  },
  thenBy(getter, desc, compare) {
    const result = new SortIterator(this.sortedIter || this.iter, getter, desc, compare);
    if (!this.sortedIter) {
      result.rules = this.rules.concat(result.rules);
    }
    return result;
  },
  next() {
    this._ensureSorted();
    return this.sortedIter.next();
  },
  current() {
    this._ensureSorted();
    return this.sortedIter.current();
  },
  reset() {
    delete this.sortedIter;
  },
  countable() {
    return this.sortedIter || this.iter.countable();
  },
  count() {
    if (this.sortedIter) {
      return this.sortedIter.count();
    }
    return this.iter.count();
  },
  _ensureSorted() {
    const that = this;
    if (that.sortedIter) {
      return;
    }
    each(that.rules, function() {
      this.getter = compileGetter(this.getter);
    });
    that.sortedIter = new MapIterator(new ArrayIterator(this.iter.toArray().sort((x, y) => that._compare(x, y))), that._unwrap);
  },
  _wrap: (record, index) => ({
    index,
    value: record
  }),
  _unwrap: (wrappedItem) => wrappedItem.value,
  _getDefaultCompare: (langParams) => (xValue, yValue) => defaultCompare(xValue, yValue, langParams),
  _compare(x, y) {
    const xIndex = x.index;
    const yIndex = y.index;
    x = x.value;
    y = y.value;
    if (x === y) {
      return xIndex - yIndex;
    }
    for (let i = 0, rulesCount = this.rules.length; i < rulesCount; i++) {
      const rule = this.rules[i];
      const xValue = rule.getter(x);
      const yValue = rule.getter(y);
      const compare = rule.compare || this._getDefaultCompare(rule.langParams);
      const compareResult = compare(xValue, yValue);
      if (compareResult) {
        return rule.desc ? -compareResult : compareResult;
      }
    }
    return xIndex - yIndex;
  }
});
var compileCriteria = /* @__PURE__ */ (function() {
  let langParams = {};
  const _toComparable = (value) => toComparable(value, false, langParams);
  const compileGroup = function(crit) {
    if (isUniformEqualsByOr(crit)) {
      return ((crit2) => {
        const getter = compileGetter(crit2[0][0]);
        const filterValues = crit2.reduce((acc, item, i) => {
          if (i % 2 === 0) {
            acc.push(_toComparable(item[2]));
          }
          return acc;
        }, []);
        return (obj) => {
          const value = _toComparable(getter(obj));
          return filterValues.some((filterValue) => useStrictComparison(filterValue) ? value === filterValue : value == filterValue);
        };
      })(crit);
    }
    const ops = [];
    let isConjunctiveOperator2 = false;
    let isConjunctiveNextOperator = false;
    each(crit, function() {
      if (Array.isArray(this) || isFunction(this)) {
        if (ops.length > 1 && isConjunctiveOperator2 !== isConjunctiveNextOperator) {
          throw errors.Error("E4019");
        }
        ops.push(compileCriteria(this, langParams));
        isConjunctiveOperator2 = isConjunctiveNextOperator;
        isConjunctiveNextOperator = true;
      } else {
        isConjunctiveNextOperator = isConjunctiveOperator(this);
      }
    });
    return function(d) {
      let result = isConjunctiveOperator2;
      for (let i = 0; i < ops.length; i++) {
        if (ops[i](d) !== isConjunctiveOperator2) {
          result = !isConjunctiveOperator2;
          break;
        }
      }
      return result;
    };
  };
  const toString = function(value) {
    var _langParams;
    return isDefined(value) ? null !== (_langParams = langParams) && void 0 !== _langParams && _langParams.locale ? value.toLocaleString(langParams.locale) : value.toString() : "";
  };
  function compileEquals(getter, value, negate) {
    return function(obj) {
      obj = _toComparable(getter(obj));
      let result = useStrictComparison(value) ? obj === value : obj == value;
      if (negate) {
        result = !result;
      }
      return result;
    };
  }
  function useStrictComparison(value) {
    return "" === value || 0 === value || false === value;
  }
  return function(crit, options) {
    langParams = options || {};
    if (isFunction(crit)) {
      return crit;
    }
    if (isGroupCriterion(crit)) {
      return compileGroup(crit);
    }
    if (isUnaryOperation(crit)) {
      return (function(crit2) {
        const op = crit2[0];
        const criteria = compileCriteria(crit2[1], langParams);
        if ("!" === op) {
          return function(obj) {
            return !criteria(obj);
          };
        }
        throw errors.Error("E4003", op);
      })(crit);
    }
    return (function(crit2) {
      crit2 = normalizeBinaryCriterion(crit2);
      const getter = compileGetter(crit2[0]);
      const op = crit2[1];
      let value = crit2[2];
      value = _toComparable(value);
      const compare = (obj, operatorFn) => {
        obj = _toComparable(getter(obj));
        return (null == value || null == obj) && value !== obj ? false : operatorFn(obj, value);
      };
      switch (op.toLowerCase()) {
        case "=":
          return compileEquals(getter, value);
        case "<>":
          return compileEquals(getter, value, true);
        case ">":
          return (obj) => compare(obj, (a, b) => a > b);
        case "<":
          return (obj) => compare(obj, (a, b) => a < b);
        case ">=":
          return (obj) => compare(obj, (a, b) => a >= b);
        case "<=":
          return (obj) => compare(obj, (a, b) => a <= b);
        case "startswith":
          return (obj) => _toComparable(toString(getter(obj))).startsWith(value);
        case "endswith":
          return (obj) => _toComparable(toString(getter(obj))).endsWith(value);
        case "contains":
          return (obj) => _toComparable(toString(getter(obj))).includes(value);
        case "notcontains":
          return (obj) => !_toComparable(toString(getter(obj))).includes(value);
      }
      throw errors.Error("E4003", op);
    })(crit);
  };
})();
var FilterIterator = WrappedIterator.inherit({
  ctor(iter, criteria) {
    this.callBase(iter);
    this.langParams = iter.langParams;
    this.criteria = compileCriteria(criteria, this.langParams);
  },
  next() {
    while (this.iter.next()) {
      if (this.criteria(this.current())) {
        return true;
      }
    }
    return false;
  }
});
var GroupIterator = Iterator.inherit({
  ctor(iter, getter) {
    this.iter = iter;
    this.getter = getter;
  },
  next() {
    this._ensureGrouped();
    return this.groupedIter.next();
  },
  current() {
    this._ensureGrouped();
    return this.groupedIter.current();
  },
  reset() {
    delete this.groupedIter;
  },
  countable() {
    return !!this.groupedIter;
  },
  count() {
    return this.groupedIter.count();
  },
  _ensureGrouped() {
    if (this.groupedIter) {
      return;
    }
    const hash = {};
    const keys = [];
    const {
      iter
    } = this;
    const getter = compileGetter(this.getter);
    iter.reset();
    while (iter.next()) {
      const current = iter.current();
      const key = getter(current);
      if (key in hash) {
        hash[key].push(current);
      } else {
        hash[key] = [current];
        keys.push(key);
      }
    }
    this.groupedIter = new ArrayIterator(map(keys, (key) => ({
      key,
      items: hash[key]
    })));
  }
});
var SelectIterator = WrappedIterator.inherit({
  ctor(iter, getter) {
    this.callBase(iter);
    this.getter = compileGetter(getter);
  },
  current() {
    return this.getter(this.callBase());
  },
  countable() {
    return this.iter.countable();
  },
  count() {
    return this.iter.count();
  }
});
var SliceIterator = WrappedIterator.inherit({
  ctor(iter, skip, take) {
    this.callBase(iter);
    this.skip = Math.max(0, skip);
    this.take = Math.max(0, take);
    this.pos = 0;
  },
  next() {
    if (this.pos >= this.skip + this.take) {
      return false;
    }
    while (this.pos < this.skip && this.iter.next()) {
      this.pos++;
    }
    this.pos++;
    return this.iter.next();
  },
  reset() {
    this.callBase();
    this.pos = 0;
  },
  countable() {
    return this.iter.countable();
  },
  count() {
    return Math.min(this.iter.count() - this.skip, this.take);
  }
});
var arrayQueryImpl = function(iter, queryOptions) {
  queryOptions = queryOptions || {};
  if (!(iter instanceof Iterator)) {
    iter = new ArrayIterator(iter);
  }
  if (queryOptions.langParams) {
    iter.langParams = queryOptions.langParams;
  }
  const handleError2 = function(error) {
    const handler = queryOptions.errorHandler;
    if (handler) {
      handler(error);
    }
    handleError(error);
  };
  const aggregateCore = function(aggregator) {
    const d = new Deferred().fail(handleError2);
    let seed;
    const {
      step
    } = aggregator;
    const {
      finalize
    } = aggregator;
    try {
      iter.reset();
      if ("seed" in aggregator) {
        seed = aggregator.seed;
      } else {
        seed = iter.next() ? iter.current() : NaN;
      }
      let accumulator = seed;
      while (iter.next()) {
        accumulator = step(accumulator, iter.current());
      }
      d.resolve(finalize ? finalize(accumulator) : accumulator);
    } catch (x) {
      d.reject(x);
    }
    return d.promise();
  };
  const standardAggregate = function(name) {
    return aggregateCore(aggregators[name]);
  };
  const select = function(getter) {
    if (!isFunction(getter) && !Array.isArray(getter)) {
      getter = [].slice.call(arguments);
    }
    return chainQuery(new SelectIterator(iter, getter));
  };
  const selectProp = function(name) {
    return select(compileGetter(name));
  };
  function chainQuery(iter2) {
    return arrayQueryImpl(iter2, queryOptions);
  }
  return {
    toArray: () => iter.toArray(),
    enumerate() {
      const d = new Deferred().fail(handleError2);
      try {
        d.resolve(iter.toArray());
      } catch (x) {
        d.reject(x);
      }
      return d.promise();
    },
    setLangParams(options) {
      iter.langParams = options;
    },
    sortBy: (getter, desc, compare) => chainQuery(new SortIterator(iter, getter, desc, compare)),
    thenBy(getter, desc, compare) {
      if (iter instanceof SortIterator) {
        return chainQuery(iter.thenBy(getter, desc, compare));
      }
      throw errors.Error("E4004");
    },
    filter(criteria) {
      if (!Array.isArray(criteria)) {
        criteria = [].slice.call(arguments);
      }
      return chainQuery(new FilterIterator(iter, criteria));
    },
    slice(skip, take) {
      if (void 0 === take) {
        take = Number.MAX_VALUE;
      }
      return chainQuery(new SliceIterator(iter, skip, take));
    },
    select,
    groupBy: (getter) => chainQuery(new GroupIterator(iter, getter)),
    aggregate: function(seed, step, finalize) {
      if (arguments.length < 2) {
        return aggregateCore({
          step: arguments[0]
        });
      }
      return aggregateCore({
        seed,
        step,
        finalize
      });
    },
    count() {
      if (iter.countable()) {
        const d = new Deferred().fail(handleError2);
        try {
          d.resolve(iter.count());
        } catch (x) {
          d.reject(x);
        }
        return d.promise();
      }
      return standardAggregate("count");
    },
    sum(getter) {
      if (getter) {
        return selectProp(getter).sum();
      }
      return standardAggregate("sum");
    },
    min(getter) {
      if (getter) {
        return selectProp(getter).min();
      }
      return standardAggregate("min");
    },
    max(getter) {
      if (getter) {
        return selectProp(getter).max();
      }
      return standardAggregate("max");
    },
    avg(getter) {
      if (getter) {
        return selectProp(getter).avg();
      }
      return standardAggregate("avg");
    }
  };
};
var m_array_query_default = arrayQueryImpl;

// node_modules/devextreme/esm/__internal/data/m_array_utils.js
function hasKey(target, keyOrKeys) {
  let key;
  const keys = "string" === typeof keyOrKeys ? keyOrKeys.split() : keyOrKeys.slice();
  while (keys.length) {
    key = keys.shift();
    if (key in target) {
      return true;
    }
  }
  return false;
}
function findItems(keyInfo, items, key, groupCount) {
  let childItems;
  let result;
  if (groupCount) {
    for (let i = 0; i < items.length; i++) {
      childItems = items[i].items || items[i].collapsedItems || [];
      result = findItems(keyInfo, childItems || [], key, groupCount - 1);
      if (result) {
        return result;
      }
    }
  } else if (indexByKey(keyInfo, items, key) >= 0) {
    return items;
  }
}
function getItems(keyInfo, items, key, groupCount) {
  if (groupCount) {
    return findItems(keyInfo, items, key, groupCount) || [];
  }
  return items;
}
function generateDataByKeyMap(keyInfo, array) {
  if (keyInfo.key() && (!array._dataByKeyMap || array._dataByKeyMapLength !== array.length)) {
    const dataByKeyMap = {};
    const arrayLength = array.length;
    for (let i = 0; i < arrayLength; i++) {
      dataByKeyMap[JSON.stringify(keyInfo.keyOf(array[i]))] = array[i];
    }
    array._dataByKeyMap = dataByKeyMap;
    array._dataByKeyMapLength = arrayLength;
  }
}
function getCacheValue(array, key) {
  if (array._dataByKeyMap) {
    return array._dataByKeyMap[JSON.stringify(key)];
  }
}
function getHasKeyCacheValue(array, key) {
  if (array._dataByKeyMap) {
    return array._dataByKeyMap[JSON.stringify(key)];
  }
  return true;
}
function setDataByKeyMapValue(array, key, data) {
  if (array._dataByKeyMap) {
    array._dataByKeyMap[JSON.stringify(key)] = data;
    array._dataByKeyMapLength += data ? 1 : -1;
  }
}
function cloneInstanceWithChangedPaths(instance, changes, clonedInstances) {
  clonedInstances = clonedInstances || /* @__PURE__ */ new WeakMap();
  const result = instance ? Object.create(Object.getPrototypeOf(instance)) : {};
  if (instance) {
    clonedInstances.set(instance, result);
  }
  const instanceWithoutPrototype = Object.assign({}, instance);
  deepExtendArraySafe(result, instanceWithoutPrototype, true, true, true);
  for (const name in instanceWithoutPrototype) {
    const value = instanceWithoutPrototype[name];
    const change = null === changes || void 0 === changes ? void 0 : changes[name];
    if (isObject(value) && !isPlainObject(value) && isObject(change) && !clonedInstances.has(value)) {
      result[name] = cloneInstanceWithChangedPaths(value, change, clonedInstances);
    }
  }
  for (const name in result) {
    const prop = result[name];
    if (isObject(prop) && clonedInstances.has(prop)) {
      result[name] = clonedInstances.get(prop);
    }
  }
  return result;
}
function createObjectWithChanges(target, changes) {
  const result = cloneInstanceWithChangedPaths(target, changes);
  return deepExtendArraySafe(result, changes, true, true, true);
}
function applyBatch(_ref) {
  let {
    keyInfo,
    data,
    changes,
    groupCount,
    useInsertIndex,
    immutable,
    disableCache,
    logError,
    skipCopying
  } = _ref;
  const resultItems = true === immutable ? [...data] : data;
  changes.forEach((item) => {
    const items = "insert" === item.type ? resultItems : getItems(keyInfo, resultItems, item.key, groupCount);
    !disableCache && generateDataByKeyMap(keyInfo, items);
    switch (item.type) {
      case "update":
        update(keyInfo, items, item.key, item.data, true, immutable, logError);
        break;
      case "insert":
        insert(keyInfo, items, item.data, useInsertIndex && isDefined(item.index) ? item.index : -1, true, logError, skipCopying);
        break;
      case "remove":
        remove(keyInfo, items, item.key, true, logError);
    }
  });
  return resultItems;
}
function getErrorResult(isBatch, logError, errorCode) {
  return !isBatch ? rejectedPromise(errors.Error(errorCode)) : logError && errors.log(errorCode);
}
function applyChanges(data, changes) {
  let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  const {
    keyExpr = "id",
    immutable = true
  } = options;
  const keyGetter = compileGetter(keyExpr);
  const keyInfo = {
    key: () => keyExpr,
    keyOf: (obj) => keyGetter(obj)
  };
  return applyBatch({
    keyInfo,
    data,
    changes,
    immutable,
    disableCache: true,
    logError: true
  });
}
function update(keyInfo, array, key, data, isBatch, immutable, logError) {
  let target;
  const keyExpr = keyInfo.key();
  if (keyExpr) {
    if (hasKey(data, keyExpr) && !keysEqual(keyExpr, key, keyInfo.keyOf(data))) {
      return getErrorResult(isBatch, logError, "E4017");
    }
    target = getCacheValue(array, key);
    if (!target) {
      const index = indexByKey(keyInfo, array, key);
      if (index < 0) {
        return getErrorResult(isBatch, logError, "E4009");
      }
      target = array[index];
      if (true === immutable && isDefined(target)) {
        const newTarget = createObjectWithChanges(target, data);
        array[index] = newTarget;
        return !isBatch && trivialPromise(newTarget, key);
      }
    }
  } else {
    target = key;
  }
  deepExtendArraySafe(target, data, true, false, true, true);
  if (!isBatch) {
    if (config_default().useLegacyStoreResult) {
      return trivialPromise(key, data);
    }
    return trivialPromise(target, key);
  }
}
function insert(keyInfo, array, data, index, isBatch, logError, skipCopying) {
  let keyValue;
  const keyExpr = keyInfo.key();
  const obj = isPlainObject(data) && !skipCopying ? extend({}, data) : data;
  if (keyExpr) {
    keyValue = keyInfo.keyOf(obj);
    if (void 0 === keyValue || "object" === typeof keyValue && isEmptyObject(keyValue)) {
      if (Array.isArray(keyExpr)) {
        throw errors.Error("E4007");
      }
      keyValue = obj[keyExpr] = String(new guid_default());
    } else if (void 0 !== array[indexByKey(keyInfo, array, keyValue)]) {
      return getErrorResult(isBatch, logError, "E4008");
    }
  } else {
    keyValue = obj;
  }
  if (index >= 0) {
    array.splice(index, 0, obj);
  } else {
    array.push(obj);
  }
  setDataByKeyMapValue(array, keyValue, obj);
  if (!isBatch) {
    return trivialPromise(config_default().useLegacyStoreResult ? data : obj, keyValue);
  }
}
function remove(keyInfo, array, key, isBatch, logError) {
  const index = indexByKey(keyInfo, array, key);
  if (index > -1) {
    array.splice(index, 1);
    setDataByKeyMapValue(array, key, null);
  }
  if (!isBatch) {
    return trivialPromise(key);
  }
  if (index < 0) {
    return getErrorResult(isBatch, logError, "E4009");
  }
}
function indexByKey(keyInfo, array, key) {
  const keyExpr = keyInfo.key();
  if (!getHasKeyCacheValue(array, key)) {
    return -1;
  }
  for (let i = 0, arrayLength = array.length; i < arrayLength; i++) {
    if (keysEqual(keyExpr, keyInfo.keyOf(array[i]), key)) {
      return i;
    }
  }
  return -1;
}

// node_modules/devextreme/esm/__internal/data/m_store_helper.js
function multiLevelGroup(query2, groupInfo) {
  query2 = query2.groupBy(groupInfo[0].selector);
  if (groupInfo.length > 1) {
    query2 = query2.select((g) => extend({}, g, {
      items: multiLevelGroup(m_array_query_default(g.items), groupInfo.slice(1)).toArray()
    }));
  }
  return query2;
}
function arrangeSortingInfo(groupInfo, sortInfo) {
  const filteredGroup = [];
  each(groupInfo, (_, group) => {
    const collision = grep(sortInfo, (sort) => group.selector === sort.selector);
    if (collision.length < 1) {
      filteredGroup.push(group);
    }
  });
  return filteredGroup.concat(sortInfo);
}
function queryByOptions(query2, options, isCountQuery) {
  var _options;
  options = options || {};
  const {
    filter
  } = options;
  if (null !== (_options = options) && void 0 !== _options && _options.langParams) {
    var _query$setLangParams, _query;
    null === (_query$setLangParams = (_query = query2).setLangParams) || void 0 === _query$setLangParams || _query$setLangParams.call(_query, options.langParams);
  }
  if (filter) {
    query2 = query2.filter(filter);
  }
  if (isCountQuery) {
    return query2;
  }
  let {
    sort
  } = options;
  const {
    select
  } = options;
  let {
    group
  } = options;
  const {
    skip
  } = options;
  const {
    take
  } = options;
  if (group) {
    group = normalizeSortingInfo(group);
    group.keepInitialKeyOrder = !!options.group.keepInitialKeyOrder;
  }
  if (sort || group) {
    sort = normalizeSortingInfo(sort || []);
    if (group && !group.keepInitialKeyOrder) {
      sort = arrangeSortingInfo(group, sort);
    }
    each(sort, function(index) {
      query2 = query2[index ? "thenBy" : "sortBy"](this.selector, this.desc, this.compare);
    });
  }
  if (select) {
    query2 = query2.select(select);
  }
  if (group) {
    query2 = multiLevelGroup(query2, group);
  }
  if (take || skip) {
    query2 = query2.slice(skip || 0, take);
  }
  return query2;
}
var m_store_helper_default = {
  multiLevelGroup,
  arrangeSortingInfo,
  queryByOptions
};

// node_modules/devextreme/esm/__internal/data/m_abstract_store.js
var {
  abstract
} = class_default;
var {
  queryByOptions: queryByOptions2
} = m_store_helper_default;
var storeImpl = {};
var Store = class_default.inherit({
  _langParams: {},
  ctor(options) {
    const that = this;
    options = options || {};
    this._eventsStrategy = new EventsStrategy(this);
    each(["onLoaded", "onLoading", "onInserted", "onInserting", "onUpdated", "onUpdating", "onPush", "onRemoved", "onRemoving", "onModified", "onModifying"], (_, optionName) => {
      if (optionName in options) {
        that.on(optionName.slice(2).toLowerCase(), options[optionName]);
      }
    });
    this._key = options.key;
    this._errorHandler = options.errorHandler;
    this._useDefaultSearch = true;
  },
  _clearCache: noop,
  _customLoadOptions: () => null,
  key() {
    return this._key;
  },
  keyOf(obj) {
    if (!this._keyGetter) {
      this._keyGetter = compileGetter(this.key());
    }
    return this._keyGetter(obj);
  },
  _requireKey() {
    if (!this.key()) {
      throw errors.Error("E4005");
    }
  },
  load(options) {
    const that = this;
    options = options || {};
    this._eventsStrategy.fireEvent("loading", [options]);
    return this._withLock(this._loadImpl(options)).done((result) => {
      that._eventsStrategy.fireEvent("loaded", [result, options]);
    });
  },
  _loadImpl(options) {
    if (!isEmptyObject(this._langParams)) {
      options = options || {};
      options._langParams = Object.assign({}, this._langParams, options._langParams);
    }
    return queryByOptions2(this.createQuery(options), options).enumerate();
  },
  _withLock(task) {
    const result = new Deferred();
    task.done(function() {
      const that = this;
      const args = arguments;
      processRequestResultLock.promise().done(() => {
        result.resolveWith(that, args);
      });
    }).fail(function() {
      result.rejectWith(this, arguments);
    });
    return result;
  },
  createQuery: abstract,
  totalCount(options) {
    return this._totalCountImpl(options);
  },
  _totalCountImpl(options) {
    return queryByOptions2(this.createQuery(options), options, true).count();
  },
  byKey(key, extraOptions) {
    return this._addFailHandlers(this._withLock(this._byKeyImpl(key, extraOptions)));
  },
  _byKeyImpl: abstract,
  insert(values) {
    const that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("inserting", [values]);
    return that._addFailHandlers(that._insertImpl(values).done((callbackValues, callbackKey) => {
      that._eventsStrategy.fireEvent("inserted", [callbackValues, callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _insertImpl: abstract,
  update(key, values) {
    const that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("updating", [key, values]);
    return that._addFailHandlers(that._updateImpl(key, values).done(() => {
      that._eventsStrategy.fireEvent("updated", [key, values]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _updateImpl: abstract,
  push(changes) {
    const beforePushArgs = {
      changes,
      waitFor: []
    };
    this._eventsStrategy.fireEvent("beforePushAggregation", [beforePushArgs]);
    when(...beforePushArgs.waitFor).done(() => {
      this._pushImpl(changes);
      this._eventsStrategy.fireEvent("beforePush", [{
        changes
      }]);
      this._eventsStrategy.fireEvent("push", [changes]);
    });
  },
  _pushImpl: noop,
  remove(key) {
    const that = this;
    that._eventsStrategy.fireEvent("modifying");
    that._eventsStrategy.fireEvent("removing", [key]);
    return that._addFailHandlers(that._removeImpl(key).done((callbackKey) => {
      that._eventsStrategy.fireEvent("removed", [callbackKey]);
      that._eventsStrategy.fireEvent("modified");
    }));
  },
  _removeImpl: abstract,
  _addFailHandlers(deferred) {
    return deferred.fail(this._errorHandler).fail(handleError);
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});
Store.create = function(alias, options) {
  if (!(alias in storeImpl)) {
    throw errors.Error("E4020", alias);
  }
  return new storeImpl[alias](options);
};
Store.registerClass = function(type, alias) {
  if (alias) {
    storeImpl[alias] = type;
  }
  return type;
};
Store.inherit = /* @__PURE__ */ (function(inheritor) {
  return function(members, alias) {
    const type = inheritor.apply(this, [members]);
    Store.registerClass(type, alias);
    return type;
  };
})(Store.inherit);
var m_abstract_store_default = Store;

// node_modules/devextreme/esm/__internal/data/m_custom_store.js
var TOTAL_COUNT = "totalCount";
var LOAD = "load";
var BY_KEY = "byKey";
var INSERT = "insert";
var UPDATE = "update";
var REMOVE = "remove";
function isPromise(obj) {
  return obj && isFunction(obj.then);
}
function trivialPromise2(value) {
  return new Deferred().resolve(value).promise();
}
function ensureRequiredFuncOption(name, obj) {
  if (!isFunction(obj)) {
    throw errors.Error("E4011", name);
  }
}
function throwInvalidUserFuncResult(name) {
  throw errors.Error("E4012", name);
}
function createUserFuncFailureHandler(pendingDeferred) {
  return function(arg) {
    let error;
    if (arg instanceof Error) {
      error = arg;
    } else {
      error = new Error((function(promiseArguments) {
        const xhr = promiseArguments[0];
        const textStatus = promiseArguments[1];
        if (!xhr || !xhr.getResponseHeader) {
          return null;
        }
        return errorMessageFromXhr(xhr, textStatus);
      })(arguments) || arg && String(arg) || "Unknown error");
    }
    if (error.message !== XHR_ERROR_UNLOAD) {
      pendingDeferred.reject(error);
    }
  };
}
function invokeUserLoad(store, options) {
  const userFunc = store._loadFunc;
  let userResult;
  ensureRequiredFuncOption(LOAD, userFunc);
  userResult = userFunc.apply(store, [options]);
  if (Array.isArray(userResult)) {
    userResult = trivialPromise2(userResult);
  } else if (null === userResult || void 0 === userResult) {
    userResult = trivialPromise2([]);
  } else if (!isPromise(userResult)) {
    throwInvalidUserFuncResult(LOAD);
  }
  return fromPromise(userResult);
}
function invokeUserTotalCountFunc(store, options) {
  const userFunc = store._totalCountFunc;
  let userResult;
  if (!isFunction(userFunc)) {
    throw errors.Error("E4021");
  }
  userResult = userFunc.apply(store, [options]);
  if (!isPromise(userResult)) {
    userResult = Number(userResult);
    if (!isFinite(userResult)) {
      throwInvalidUserFuncResult(TOTAL_COUNT);
    }
    userResult = trivialPromise2(userResult);
  }
  return fromPromise(userResult);
}
function invokeUserByKeyFunc(store, key, extraOptions) {
  const userFunc = store._byKeyFunc;
  let userResult;
  ensureRequiredFuncOption(BY_KEY, userFunc);
  userResult = userFunc.apply(store, [key, extraOptions]);
  if (!isPromise(userResult)) {
    userResult = trivialPromise2(userResult);
  }
  return fromPromise(userResult);
}
function runRawLoad(pendingDeferred, store, userFuncOptions, continuation) {
  if (store.__rawData) {
    continuation(store.__rawData);
  } else {
    const loadPromise = store.__rawDataPromise || invokeUserLoad(store, userFuncOptions);
    if (store._cacheRawData) {
      store.__rawDataPromise = loadPromise;
    }
    loadPromise.always(() => {
      delete store.__rawDataPromise;
    }).done((rawData) => {
      if (store._cacheRawData) {
        store.__rawData = rawData;
      }
      continuation(rawData);
    }).fail((error) => {
      var _store$_errorHandler;
      const userFuncFailureHandler = createUserFuncFailureHandler(pendingDeferred);
      null === (_store$_errorHandler = store._errorHandler) || void 0 === _store$_errorHandler || _store$_errorHandler.call(store, error);
      userFuncFailureHandler(error);
    });
  }
}
function runRawLoadWithQuery(pendingDeferred, store, options, countOnly) {
  options = options || {};
  const userFuncOptions = {};
  if ("userData" in options) {
    userFuncOptions.userData = options.userData;
  }
  runRawLoad(pendingDeferred, store, userFuncOptions, (rawData) => {
    const rawDataQuery = m_array_query_default(rawData, {
      errorHandler: store._errorHandler
    });
    let itemsQuery;
    let totalCountQuery;
    const waitList = [];
    let items;
    let totalCount;
    if (!countOnly) {
      itemsQuery = m_store_helper_default.queryByOptions(rawDataQuery, options);
      if (itemsQuery === rawDataQuery) {
        items = rawData.slice(0);
      } else {
        waitList.push(itemsQuery.enumerate().done((asyncResult) => {
          items = asyncResult;
        }));
      }
    }
    if (options.requireTotalCount || countOnly) {
      totalCountQuery = m_store_helper_default.queryByOptions(rawDataQuery, options, true);
      if (totalCountQuery === rawDataQuery) {
        totalCount = rawData.length;
      } else {
        waitList.push(totalCountQuery.count().done((asyncResult) => {
          totalCount = asyncResult;
        }));
      }
    }
    when.apply(renderer_default, waitList).done(() => {
      if (countOnly) {
        pendingDeferred.resolve(totalCount);
      } else if (options.requireTotalCount) {
        pendingDeferred.resolve(items, {
          totalCount
        });
      } else {
        pendingDeferred.resolve(items);
      }
    }).fail((x) => {
      pendingDeferred.reject(x);
    });
  });
}
function runRawLoadWithKey(pendingDeferred, store, key) {
  runRawLoad(pendingDeferred, store, {}, (rawData) => {
    const keyExpr = store.key();
    let item;
    for (let i = 0, len = rawData.length; i < len; i++) {
      item = rawData[i];
      if (keysEqual(keyExpr, store.keyOf(rawData[i]), key)) {
        pendingDeferred.resolve(item);
        return;
      }
    }
    pendingDeferred.reject(errors.Error("E4009"));
  });
}
function isGroupItem(item) {
  if (void 0 === item || null === item || "object" !== typeof item) {
    return false;
  }
  return "key" in item && "items" in item;
}
function isLoadResultObject(res) {
  return !Array.isArray(res) && "data" in res;
}
function isGroupItemsArray(res) {
  return Array.isArray(res) && !!res.length && isGroupItem(res[0]);
}
function isItemsArray(res) {
  return Array.isArray(res) && !isGroupItem(res[0]);
}
var CustomStore = m_abstract_store_default.inherit({
  ctor(options) {
    options = options || {};
    this.callBase(options);
    this._useDefaultSearch = !!options.useDefaultSearch || "raw" === options.loadMode;
    this._loadMode = options.loadMode;
    this._cacheRawData = false !== options.cacheRawData;
    this._loadFunc = options[LOAD];
    this._totalCountFunc = options[TOTAL_COUNT];
    this._byKeyFunc = options[BY_KEY];
    this._insertFunc = options[INSERT];
    this._updateFunc = options[UPDATE];
    this._removeFunc = options[REMOVE];
  },
  _clearCache() {
    delete this.__rawData;
  },
  createQuery() {
    throw errors.Error("E4010");
  },
  clearRawDataCache() {
    this._clearCache();
  },
  _totalCountImpl(options) {
    let d = new Deferred();
    if ("raw" === this._loadMode && !this._totalCountFunc) {
      runRawLoadWithQuery(d, this, options, true);
    } else {
      invokeUserTotalCountFunc(this, options).done((count) => {
        d.resolve(Number(count));
      }).fail(createUserFuncFailureHandler(d));
      d = this._addFailHandlers(d);
    }
    return d.promise();
  },
  _pushImpl(changes) {
    if (this.__rawData) {
      applyBatch({
        keyInfo: this,
        data: this.__rawData,
        changes
      });
    }
  },
  _loadImpl(options) {
    let d = new Deferred();
    if ("raw" === this._loadMode) {
      runRawLoadWithQuery(d, this, options, false);
    } else {
      invokeUserLoad(this, options).done((data, extra) => {
        d.resolve(data, extra);
      }).fail(createUserFuncFailureHandler(d));
      d = this._addFailHandlers(d);
    }
    return d.promise();
  },
  _byKeyImpl(key, extraOptions) {
    const d = new Deferred();
    if (this._byKeyViaLoad()) {
      this._requireKey();
      runRawLoadWithKey(d, this, key);
    } else {
      invokeUserByKeyFunc(this, key, extraOptions).done((obj) => {
        d.resolve(obj);
      }).fail(createUserFuncFailureHandler(d));
    }
    return d.promise();
  },
  _byKeyViaLoad() {
    return "raw" === this._loadMode && !this._byKeyFunc;
  },
  _insertImpl(values) {
    const that = this;
    const userFunc = that._insertFunc;
    let userResult;
    const d = new Deferred();
    ensureRequiredFuncOption(INSERT, userFunc);
    userResult = userFunc.apply(that, [values]);
    if (!isPromise(userResult)) {
      userResult = trivialPromise2(userResult);
    }
    fromPromise(userResult).done((serverResponse) => {
      if (config_default().useLegacyStoreResult) {
        d.resolve(values, serverResponse);
      } else {
        d.resolve(serverResponse || values, that.keyOf(serverResponse));
      }
    }).fail(createUserFuncFailureHandler(d));
    return d.promise();
  },
  _updateImpl(key, values) {
    const userFunc = this._updateFunc;
    let userResult;
    const d = new Deferred();
    ensureRequiredFuncOption(UPDATE, userFunc);
    userResult = userFunc.apply(this, [key, values]);
    if (!isPromise(userResult)) {
      userResult = trivialPromise2(userResult);
    }
    fromPromise(userResult).done((serverResponse) => {
      if (config_default().useLegacyStoreResult) {
        d.resolve(key, values);
      } else {
        d.resolve(serverResponse || values, key);
      }
    }).fail(createUserFuncFailureHandler(d));
    return d.promise();
  },
  _removeImpl(key) {
    const userFunc = this._removeFunc;
    let userResult;
    const d = new Deferred();
    ensureRequiredFuncOption(REMOVE, userFunc);
    userResult = userFunc.apply(this, [key]);
    if (!isPromise(userResult)) {
      userResult = trivialPromise2();
    }
    fromPromise(userResult).done(() => {
      d.resolve(key);
    }).fail(createUserFuncFailureHandler(d));
    return d.promise();
  }
});
var m_custom_store_default = CustomStore;

// node_modules/devextreme/esm/common/data/query_adapters.js
var query_adapters_default = {};

// node_modules/devextreme/esm/__internal/data/m_remote_query.js
var remoteQueryImpl = function(url, queryOptions, tasks) {
  tasks = tasks || [];
  queryOptions = queryOptions || {};
  const createTask = function(name, args) {
    return {
      name,
      args
    };
  };
  const exec = function(executorTask) {
    const d = new Deferred();
    let _adapterFactory;
    let _adapter;
    let _taskQueue;
    let _currentTask;
    let _mergedSortArgs;
    const rejectWithNotify = function(error) {
      const handler = queryOptions.errorHandler;
      if (handler) {
        handler(error);
      }
      handleError(error);
      d.reject(error);
    };
    function mergeSortTask(task) {
      switch (task.name) {
        case "sortBy":
          _mergedSortArgs = [task.args];
          return true;
        case "thenBy":
          if (!_mergedSortArgs) {
            throw errors.Error("E4004");
          }
          _mergedSortArgs.push(task.args);
          return true;
      }
      return false;
    }
    try {
      _adapterFactory = queryOptions.adapter;
      if (!isFunction(_adapterFactory)) {
        _adapterFactory = query_adapters_default[_adapterFactory];
      }
      _adapter = _adapterFactory(queryOptions);
      _taskQueue = [].concat(tasks).concat(executorTask);
      const {
        optimize
      } = _adapter;
      if (optimize) {
        optimize(_taskQueue);
      }
      while (_taskQueue.length) {
        _currentTask = _taskQueue[0];
        if (!mergeSortTask(_currentTask)) {
          if (_mergedSortArgs) {
            _taskQueue.unshift(createTask("multiSort", [_mergedSortArgs]));
            _mergedSortArgs = null;
            continue;
          }
          if ("enumerate" !== String(_currentTask.name)) {
            if (!_adapter[_currentTask.name] || false === _adapter[_currentTask.name].apply(_adapter, _currentTask.args)) {
              break;
            }
          }
        }
        _taskQueue.shift();
      }
      !(function() {
        const head = _taskQueue[0];
        const unmergedTasks = [];
        if (head && "multiSort" === head.name) {
          _taskQueue.shift();
          each(head.args[0], function() {
            unmergedTasks.push(createTask(unmergedTasks.length ? "thenBy" : "sortBy", this));
          });
        }
        _taskQueue = unmergedTasks.concat(_taskQueue);
      })();
      _adapter.exec(url).done((result, extra) => {
        if (!_taskQueue.length) {
          d.resolve(result, extra);
        } else {
          let clientChain = m_array_query_default(result, {
            errorHandler: queryOptions.errorHandler
          });
          each(_taskQueue, function() {
            clientChain = clientChain[this.name].apply(clientChain, this.args);
          });
          clientChain.done(d.resolve).fail(d.reject);
        }
      }).fail(rejectWithNotify);
    } catch (x) {
      rejectWithNotify(x);
    }
    return d.promise();
  };
  const query2 = {};
  each(["sortBy", "thenBy", "filter", "slice", "select", "groupBy"], function() {
    const name = String(this);
    query2[name] = function() {
      return remoteQueryImpl(url, queryOptions, tasks.concat(createTask(name, arguments)));
    };
  });
  each(["count", "min", "max", "sum", "avg", "aggregate", "enumerate"], function() {
    const name = String(this);
    query2[name] = function() {
      return exec.call(this, createTask(name, arguments));
    };
  });
  return query2;
};
var m_remote_query_default = remoteQueryImpl;

// node_modules/devextreme/esm/__internal/data/query_implementation.js
var queryImpl = {
  array: m_array_query_default,
  remote: m_remote_query_default
};

// node_modules/devextreme/esm/__internal/data/m_query.js
var query = function() {
  const impl = Array.isArray(arguments[0]) ? "array" : "remote";
  return queryImpl[impl].apply(this, arguments);
};
var m_query_default = query;

// node_modules/devextreme/esm/__internal/data/m_array_store.js
var ArrayStore = m_abstract_store_default.inherit({
  ctor(options) {
    if (Array.isArray(options)) {
      options = {
        data: options
      };
    } else {
      options = options || {};
    }
    this.callBase(options);
    const initialArray = options.data;
    if (initialArray && !Array.isArray(initialArray)) {
      throw errors.Error("E4006");
    }
    this._array = initialArray || [];
  },
  createQuery() {
    return m_query_default(this._array, {
      errorHandler: this._errorHandler
    });
  },
  _byKeyImpl(key) {
    const index = indexByKey(this, this._array, key);
    if (-1 === index) {
      return rejectedPromise(errors.Error("E4009"));
    }
    return trivialPromise(this._array[index]);
  },
  _insertImpl(values) {
    return insert(this, this._array, values);
  },
  _pushImpl(changes) {
    applyBatch({
      keyInfo: this,
      data: this._array,
      changes
    });
  },
  _updateImpl(key, values) {
    return update(this, this._array, key, values);
  },
  _removeImpl(key) {
    return remove(this, this._array, key);
  },
  clear() {
    this._eventsStrategy.fireEvent("modifying");
    this._array = [];
    this._eventsStrategy.fireEvent("modified");
  }
}, "array");
var m_array_store_default = ArrayStore;

// node_modules/devextreme/esm/__internal/data/data_source/m_utils.js
var _excluded = ["items"];
var CANCELED_TOKEN = "canceled";
var isPending = (deferred) => "pending" === deferred.state();
var normalizeStoreLoadOptionAccessorArguments = (originalArguments) => {
  switch (originalArguments.length) {
    case 0:
      return;
    case 1:
      return originalArguments[0];
  }
  return [].slice.call(originalArguments);
};
var mapGroup = (group, level, mapper) => map(group, (item) => {
  const restItem = _objectWithoutPropertiesLoose(item, _excluded);
  return Object.assign({}, restItem, {
    items: mapRecursive(item.items, level - 1, mapper)
  });
});
var mapRecursive = (items, level, mapper) => {
  if (!Array.isArray(items)) {
    return items;
  }
  return level ? mapGroup(items, level, mapper) : map(items, mapper);
};
var mapDataRespectingGrouping = (items, mapper, groupInfo) => {
  const level = groupInfo ? normalizeSortingInfo(groupInfo).length : 0;
  return mapRecursive(items, level, mapper);
};
var normalizeLoadResult = (data, extra) => {
  var _data;
  if (null !== (_data = data) && void 0 !== _data && _data.data) {
    extra = data;
    data = data.data;
  }
  if (!Array.isArray(data)) {
    data = [data];
  }
  return {
    data,
    extra
  };
};
var createCustomStoreFromLoadFunc = (options) => {
  const storeConfig = {};
  each(["useDefaultSearch", "key", "load", "loadMode", "cacheRawData", "byKey", "lookup", "totalCount", "insert", "update", "remove"], function() {
    storeConfig[this] = options[this];
    delete options[this];
  });
  return new m_custom_store_default(storeConfig);
};
var createStoreFromConfig = (storeConfig) => {
  const alias = storeConfig.type;
  delete storeConfig.type;
  return m_abstract_store_default.create(alias, storeConfig);
};
var createCustomStoreFromUrl = (url, normalizationOptions) => new m_custom_store_default({
  load: () => ajax_default.sendRequest({
    url,
    dataType: "json"
  }),
  loadMode: null === normalizationOptions || void 0 === normalizationOptions ? void 0 : normalizationOptions.fromUrlLoadMode
});
var normalizeDataSourceOptions = (options, normalizationOptions) => {
  let store;
  if ("string" === typeof options) {
    options = {
      paginate: false,
      store: createCustomStoreFromUrl(options, normalizationOptions)
    };
  }
  if (void 0 === options) {
    options = [];
  }
  if (Array.isArray(options) || options instanceof m_abstract_store_default) {
    options = {
      store: options
    };
  } else {
    options = extend({}, options);
  }
  if (void 0 === options.store) {
    options.store = [];
  }
  store = options.store;
  if ("load" in options) {
    store = createCustomStoreFromLoadFunc(options);
  } else if (Array.isArray(store)) {
    store = new m_array_store_default(store);
  } else if (isPlainObject(store)) {
    store = createStoreFromConfig(extend({}, store));
  }
  options.store = store;
  return options;
};

// node_modules/devextreme/esm/__internal/data/data_source/m_operation_manager.js
var OperationManager = class {
  constructor() {
    this._counter = -1;
    this._deferreds = {};
  }
  add(deferred) {
    this._counter++;
    this._deferreds[this._counter] = deferred;
    return this._counter;
  }
  remove(operationId) {
    return delete this._deferreds[operationId];
  }
  cancel(operationId) {
    if (operationId in this._deferreds) {
      this._deferreds[operationId].reject(CANCELED_TOKEN);
      return true;
    }
    return false;
  }
  cancelAll() {
    while (this._counter > -1) {
      this.cancel(this._counter);
      this._counter--;
    }
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_queue.js
function createQueue(discardPendingTasks) {
  let _tasks = [];
  let _busy = false;
  function exec() {
    while (_tasks.length) {
      _busy = true;
      const task = _tasks.shift();
      const result = task();
      if (void 0 === result) {
        continue;
      }
      if (result.then) {
        when(result).always(exec);
        return;
      }
      throw errors_default.Error("E0015");
    }
    _busy = false;
  }
  return {
    add: function(task, removeTaskCallback) {
      if (!discardPendingTasks) {
        _tasks.push(task);
      } else {
        if (_tasks[0] && removeTaskCallback) {
          removeTaskCallback(_tasks[0]);
        }
        _tasks = [task];
      }
      if (!_busy) {
        exec();
      }
    },
    busy: function() {
      return _busy;
    }
  };
}
var enqueue = createQueue().add;

// node_modules/devextreme/esm/__internal/data/data_source/m_data_source.js
var DataSource = class_default.inherit({
  ctor(options) {
    options = normalizeDataSourceOptions(options);
    this._eventsStrategy = new EventsStrategy(this, {
      syncStrategy: true
    });
    this._store = options.store;
    this._changedTime = 0;
    const needThrottling = 0 !== options.pushAggregationTimeout;
    if (needThrottling) {
      const throttlingTimeout = void 0 === options.pushAggregationTimeout ? () => 5 * this._changedTime : options.pushAggregationTimeout;
      let pushDeferred;
      let lastPushWaiters;
      const throttlingPushHandler = throttleChanges((changes) => {
        pushDeferred.resolve();
        const storePushPending = when(...lastPushWaiters);
        storePushPending.done(() => this._onPush(changes));
        lastPushWaiters = void 0;
        pushDeferred = void 0;
      }, throttlingTimeout);
      this._onPushHandler = (args) => {
        this._aggregationTimeoutId = throttlingPushHandler(args.changes);
        if (!pushDeferred) {
          pushDeferred = new Deferred();
        }
        lastPushWaiters = args.waitFor;
        args.waitFor.push(pushDeferred.promise());
      };
      this._store.on("beforePushAggregation", this._onPushHandler);
    } else {
      this._onPushHandler = (changes) => this._onPush(changes);
      this._store.on("push", this._onPushHandler);
    }
    this._storeLoadOptions = this._extractLoadOptions(options);
    this._mapFunc = options.map;
    this._postProcessFunc = options.postProcess;
    this._pageIndex = void 0 !== options.pageIndex ? options.pageIndex : 0;
    this._pageSize = void 0 !== options.pageSize ? options.pageSize : 20;
    this._loadingCount = 0;
    this._loadQueue = this._createLoadQueue();
    this._searchValue = "searchValue" in options ? options.searchValue : null;
    this._searchOperation = options.searchOperation || "contains";
    this._searchExpr = options.searchExpr;
    this._paginate = options.paginate;
    this._reshapeOnPush = options.reshapeOnPush ?? false;
    each(["onChanged", "onLoadError", "onLoadingChanged", "onCustomizeLoadResult", "onCustomizeStoreLoadOptions"], (_, optionName) => {
      if (optionName in options) {
        this.on(optionName.substr(2, 1).toLowerCase() + optionName.substr(3), options[optionName]);
      }
    });
    this._operationManager = new OperationManager();
    this._init();
  },
  _init() {
    this._items = [];
    this._userData = {};
    this._totalCount = -1;
    this._isLoaded = false;
    if (!isDefined(this._paginate)) {
      this._paginate = !this.group();
    }
    this._isLastPage = !this._paginate;
  },
  dispose() {
    var _this$_delayedLoadTas;
    this._store.off("beforePushAggregation", this._onPushHandler);
    this._store.off("push", this._onPushHandler);
    this._eventsStrategy.dispose();
    clearTimeout(this._aggregationTimeoutId);
    null === (_this$_delayedLoadTas = this._delayedLoadTask) || void 0 === _this$_delayedLoadTas || _this$_delayedLoadTas.abort();
    this._operationManager.cancelAll();
    delete this._store;
    delete this._items;
    delete this._delayedLoadTask;
    this._disposed = true;
  },
  _extractLoadOptions(options) {
    const result = {};
    let names = ["sort", "filter", "langParams", "select", "group", "requireTotalCount"];
    const customNames = this._store._customLoadOptions();
    if (customNames) {
      names = names.concat(customNames);
    }
    each(names, function() {
      result[this] = options[this];
    });
    return result;
  },
  loadOptions() {
    return this._storeLoadOptions;
  },
  items() {
    return this._items;
  },
  pageIndex(newIndex) {
    if (!isNumeric(newIndex)) {
      return this._pageIndex;
    }
    this._pageIndex = newIndex;
    this._isLastPage = !this._paginate;
  },
  paginate(value) {
    if (!isBoolean(value)) {
      return this._paginate;
    }
    if (this._paginate !== value) {
      this._paginate = value;
      this.pageIndex(0);
    }
  },
  pageSize(value) {
    if (!isNumeric(value)) {
      return this._pageSize;
    }
    this._pageSize = value;
  },
  isLastPage() {
    return this._isLastPage;
  },
  generateStoreLoadOptionAccessor(optionName) {
    return (args) => {
      const normalizedArgs = normalizeStoreLoadOptionAccessorArguments(args);
      if (void 0 === normalizedArgs) {
        return this._storeLoadOptions[optionName];
      }
      this._storeLoadOptions[optionName] = normalizedArgs;
    };
  },
  sort() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return this.generateStoreLoadOptionAccessor("sort")(args);
  },
  filter() {
    const newFilter = normalizeStoreLoadOptionAccessorArguments(arguments);
    if (void 0 === newFilter) {
      return this._storeLoadOptions.filter;
    }
    this._storeLoadOptions.filter = newFilter;
    this.pageIndex(0);
  },
  group() {
    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }
    return this.generateStoreLoadOptionAccessor("group")(args);
  },
  select() {
    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }
    return this.generateStoreLoadOptionAccessor("select")(args);
  },
  requireTotalCount(value) {
    if (!isBoolean(value)) {
      return this._storeLoadOptions.requireTotalCount;
    }
    this._storeLoadOptions.requireTotalCount = value;
  },
  searchValue(value) {
    if (arguments.length < 1) {
      return this._searchValue;
    }
    this._searchValue = value;
    this.pageIndex(0);
  },
  searchOperation(op) {
    if (!isString(op)) {
      return this._searchOperation;
    }
    this._searchOperation = op;
    this.pageIndex(0);
  },
  searchExpr(expr) {
    const argc = arguments.length;
    if (0 === argc) {
      return this._searchExpr;
    }
    if (argc > 1) {
      expr = [].slice.call(arguments);
    }
    this._searchExpr = expr;
    this.pageIndex(0);
  },
  store() {
    return this._store;
  },
  key() {
    var _this$_store;
    return null === (_this$_store = this._store) || void 0 === _this$_store ? void 0 : _this$_store.key();
  },
  totalCount() {
    return this._totalCount;
  },
  isLoaded() {
    return this._isLoaded;
  },
  isLoading() {
    return this._loadingCount > 0;
  },
  beginLoading() {
    this._changeLoadingCount(1);
  },
  endLoading() {
    this._changeLoadingCount(-1);
  },
  _createLoadQueue: () => createQueue(),
  _changeLoadingCount(increment) {
    const oldLoading = this.isLoading();
    this._loadingCount += increment;
    const newLoading = this.isLoading();
    if (oldLoading ^ newLoading) {
      this._eventsStrategy.fireEvent("loadingChanged", [newLoading]);
    }
  },
  _scheduleLoadCallbacks(deferred) {
    this.beginLoading();
    deferred.always(() => {
      this.endLoading();
    });
  },
  _scheduleFailCallbacks(deferred) {
    var _this = this;
    deferred.fail(function() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      if (args[0] === CANCELED_TOKEN) {
        return;
      }
      _this._eventsStrategy.fireEvent("loadError", args);
    });
  },
  _fireChanged(args) {
    const date = /* @__PURE__ */ new Date();
    this._eventsStrategy.fireEvent("changed", args);
    this._changedTime = /* @__PURE__ */ new Date() - date;
  },
  _scheduleChangedCallbacks(deferred) {
    deferred.done(() => this._fireChanged());
  },
  loadSingle(propName, propValue) {
    const d = new Deferred();
    const key = this.key();
    const store = this._store;
    const options = this._createStoreLoadOptions();
    this._scheduleFailCallbacks(d);
    if (arguments.length < 2) {
      propValue = propName;
      propName = key;
    }
    delete options.skip;
    delete options.group;
    delete options.refresh;
    delete options.pageIndex;
    delete options.searchString;
    (() => {
      if (propName === key || store instanceof m_custom_store_default && !store._byKeyViaLoad()) {
        return store.byKey(propValue, options);
      }
      options.take = 1;
      options.filter = options.filter ? [options.filter, [propName, propValue]] : [propName, propValue];
      return store.load(options);
    })().fail(d.reject).done((data) => {
      const isEmptyArray = Array.isArray(data) && !data.length;
      if (!isDefined(data) || isEmptyArray) {
        d.reject(errors.Error("E4009"));
      } else {
        if (!Array.isArray(data)) {
          data = [data];
        }
        d.resolve(this._applyMapFunction(data)[0]);
      }
    });
    return d.promise();
  },
  load() {
    const d = new Deferred();
    const loadTask = () => {
      if (this._disposed) {
        return;
      }
      if (!isPending(d)) {
        return;
      }
      return this._loadFromStore(loadOperation, d);
    };
    this._scheduleLoadCallbacks(d);
    this._scheduleFailCallbacks(d);
    this._scheduleChangedCallbacks(d);
    const loadOperation = this._createLoadOperation(d);
    this._eventsStrategy.fireEvent("customizeStoreLoadOptions", [loadOperation]);
    this._loadQueue.add(() => {
      if ("number" === typeof loadOperation.delay) {
        this._delayedLoadTask = m_common_default.executeAsync(loadTask, loadOperation.delay);
      } else {
        loadTask();
      }
      return d.promise();
    });
    return d.promise({
      operationId: loadOperation.operationId
    });
  },
  _onPush(changes) {
    if (this._reshapeOnPush) {
      this.load();
    } else {
      const changingArgs = {
        changes
      };
      this._eventsStrategy.fireEvent("changing", [changingArgs]);
      const group = this.group();
      const items = this.items();
      let groupLevel = 0;
      let dataSourceChanges = this.paginate() || group ? changes.filter((item) => "update" === item.type) : changes;
      if (group) {
        groupLevel = Array.isArray(group) ? group.length : 1;
      }
      if (this._mapFunc) {
        dataSourceChanges.forEach((item) => {
          if ("insert" === item.type) {
            item.data = this._mapFunc(item.data);
          }
        });
      }
      if (changingArgs.postProcessChanges) {
        dataSourceChanges = changingArgs.postProcessChanges(dataSourceChanges);
      }
      applyBatch({
        keyInfo: this.store(),
        data: items,
        changes: dataSourceChanges,
        groupCount: groupLevel,
        useInsertIndex: true
      });
      this._fireChanged([{
        changes
      }]);
    }
  },
  _createLoadOperation(deferred) {
    const operationId = this._operationManager.add(deferred);
    const storeLoadOptions = this._createStoreLoadOptions();
    if (this._store && !isEmptyObject(null === storeLoadOptions || void 0 === storeLoadOptions ? void 0 : storeLoadOptions.langParams)) {
      this._store._langParams = Object.assign({}, this._store._langParams, storeLoadOptions.langParams);
    }
    deferred.always(() => this._operationManager.remove(operationId));
    return {
      operationId,
      storeLoadOptions
    };
  },
  reload() {
    const store = this.store();
    store._clearCache();
    this._init();
    return this.load();
  },
  cancel(operationId) {
    return this._operationManager.cancel(operationId);
  },
  cancelAll() {
    return this._operationManager.cancelAll();
  },
  _addSearchOptions(storeLoadOptions) {
    if (this._disposed) {
      return;
    }
    if (this.store()._useDefaultSearch) {
      this._addSearchFilter(storeLoadOptions);
    } else {
      storeLoadOptions.searchOperation = this._searchOperation;
      storeLoadOptions.searchValue = this._searchValue;
      storeLoadOptions.searchExpr = this._searchExpr;
    }
  },
  _createStoreLoadOptions() {
    const result = extend({}, this._storeLoadOptions);
    this._addSearchOptions(result);
    if (this._paginate) {
      if (this._pageSize) {
        result.skip = this._pageIndex * this._pageSize;
        result.take = this._pageSize;
      }
    }
    result.userData = this._userData;
    return result;
  },
  _addSearchFilter(storeLoadOptions) {
    const value = this._searchValue;
    const op = this._searchOperation;
    let selector = this._searchExpr;
    const searchFilter = [];
    if (!value) {
      return;
    }
    if (!selector) {
      selector = "this";
    }
    if (!Array.isArray(selector)) {
      selector = [selector];
    }
    each(selector, (i, item) => {
      if (searchFilter.length) {
        searchFilter.push("or");
      }
      searchFilter.push([item, op, value]);
    });
    if (storeLoadOptions.filter) {
      storeLoadOptions.filter = [searchFilter, storeLoadOptions.filter];
    } else {
      storeLoadOptions.filter = searchFilter;
    }
  },
  _loadFromStore(loadOptions, pendingDeferred) {
    const handleSuccess = (data, extra) => {
      if (this._disposed) {
        return;
      }
      if (!isPending(pendingDeferred)) {
        return;
      }
      const loadResult = extend(normalizeLoadResult(data, extra), loadOptions);
      this._eventsStrategy.fireEvent("customizeLoadResult", [loadResult]);
      when(loadResult.data).done((data2) => {
        loadResult.data = data2;
        this._processStoreLoadResult(loadResult, pendingDeferred);
      }).fail(pendingDeferred.reject);
    };
    if (loadOptions.data) {
      return new Deferred().resolve(loadOptions.data).done(handleSuccess);
    }
    return this.store().load(loadOptions.storeLoadOptions).done(handleSuccess).fail(pendingDeferred.reject);
  },
  _processStoreLoadResult(loadResult, pendingDeferred) {
    let {
      data
    } = loadResult;
    let {
      extra
    } = loadResult;
    const {
      storeLoadOptions
    } = loadResult;
    const resolvePendingDeferred = () => {
      this._isLoaded = true;
      this._totalCount = isFinite(extra.totalCount) ? extra.totalCount : -1;
      return pendingDeferred.resolve(data, extra);
    };
    const proceedLoadingTotalCount = () => {
      this.store().totalCount(storeLoadOptions).done((count) => {
        extra.totalCount = count;
        resolvePendingDeferred();
      }).fail(pendingDeferred.reject);
    };
    if (this._disposed) {
      return;
    }
    data = this._applyPostProcessFunction(this._applyMapFunction(data));
    if (!isObject(extra)) {
      extra = {};
    }
    this._items = data;
    if (!data.length || !this._paginate || this._pageSize && data.length < this._pageSize) {
      this._isLastPage = true;
    }
    if (storeLoadOptions.requireTotalCount && !isFinite(extra.totalCount)) {
      proceedLoadingTotalCount();
    } else {
      resolvePendingDeferred();
    }
  },
  _applyMapFunction(data) {
    if (this._mapFunc) {
      return mapDataRespectingGrouping(data, this._mapFunc, this.group());
    }
    return data;
  },
  _applyPostProcessFunction(data) {
    if (this._postProcessFunc) {
      return this._postProcessFunc(data);
    }
    return data;
  },
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  },
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
});

export {
  errors,
  errorHandler,
  handleError,
  setErrorHandler,
  XHR_ERROR_UNLOAD,
  normalizeBinaryCriterion,
  normalizeSortingInfo,
  errorMessageFromXhr,
  aggregators,
  isConjunctiveOperator,
  keysEqual,
  base64_encode,
  isUnaryOperation,
  createObjectWithChanges,
  applyBatch,
  applyChanges,
  update,
  insert,
  indexByKey,
  m_store_helper_default,
  m_abstract_store_default,
  isLoadResultObject,
  isGroupItemsArray,
  isItemsArray,
  m_custom_store_default,
  query_adapters_default,
  m_query_default,
  m_array_store_default,
  normalizeLoadResult,
  normalizeDataSourceOptions,
  DataSource
};
//# sourceMappingURL=chunk-TVYHC7GO.js.map
