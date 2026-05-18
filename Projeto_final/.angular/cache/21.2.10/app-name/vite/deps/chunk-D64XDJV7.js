import {
  XHR_ERROR_UNLOAD,
  applyChanges,
  errorMessageFromXhr,
  errors,
  handleError,
  isConjunctiveOperator,
  isUnaryOperation,
  m_abstract_store_default,
  m_array_store_default,
  m_query_default,
  normalizeBinaryCriterion,
  query_adapters_default
} from "./chunk-TVYHC7GO.js";
import {
  m_events_engine_default
} from "./chunk-WDK64ZWV.js";
import {
  ajax_default
} from "./chunk-PTEJQ6I5.js";
import {
  Deferred,
  class_default,
  config_default2 as config_default,
  dom_adapter_default,
  each,
  errors_default,
  extend,
  format,
  getWindow,
  grep,
  guid_default2 as guid_default,
  isDefined,
  isFunction,
  isObject,
  isPlainObject,
  map,
  type,
  when
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/common/data/apply_changes.js
var apply_changes_default = applyChanges;

// node_modules/devextreme/esm/__internal/data/m_endpoint_selector.js
var window = getWindow();
var IS_WINJS_ORIGIN;
var IS_LOCAL_ORIGIN;
function isLocalHostName(url) {
  return /^(localhost$|127\.)/i.test(url);
}
var EndpointSelector = function(config) {
  this.config = config;
  IS_WINJS_ORIGIN = "ms-appx:" === window.location.protocol;
  IS_LOCAL_ORIGIN = isLocalHostName(window.location.hostname);
};
EndpointSelector.prototype = {
  urlFor(key) {
    const bag = this.config[key];
    if (!bag) {
      throw errors_default.Error("E0006");
    }
    if (bag.production) {
      if (IS_WINJS_ORIGIN && !Debug.debuggerEnabled || !IS_WINJS_ORIGIN && !IS_LOCAL_ORIGIN) {
        return bag.production;
      }
    }
    return bag.local;
  }
};
var m_endpoint_selector_default = EndpointSelector;

// node_modules/devextreme/esm/__internal/data/m_local_store.js
var window2 = getWindow();
var LocalStoreBackend = class {
  constructor(store, storeOptions) {
    this._store = store;
    this._dirty = !!storeOptions.data;
    const {
      name
    } = storeOptions;
    if (!name) {
      throw errors.Error("E4013");
    }
    this._key = `dx-data-localStore-${name}`;
    this.save();
    const immediate = this._immediate = storeOptions.immediate;
    const flushInterval = Math.max(100, storeOptions.flushInterval || 1e4);
    if (!immediate) {
      const saveProxy = this.save.bind(this);
      setInterval(saveProxy, flushInterval);
      m_events_engine_default.on(window2, "beforeunload", saveProxy);
      if (window2.cordova) {
        dom_adapter_default.listen(dom_adapter_default.getDocument(), "pause", saveProxy, false);
      }
    }
  }
  notifyChanged() {
    this._dirty = true;
    if (this._immediate) {
      this.save();
    }
  }
  load() {
    this._store._array = this._loadImpl();
    this._dirty = false;
  }
  save() {
    if (!this._dirty) {
      return;
    }
    this._saveImpl(this._store._array);
    this._dirty = false;
  }
  _loadImpl() {
    const raw = window2.localStorage.getItem(this._key);
    if (raw) {
      return JSON.parse(raw);
    }
    return [];
  }
  _saveImpl(array) {
    if (!array.length) {
      window2.localStorage.removeItem(this._key);
    } else {
      window2.localStorage.setItem(this._key, JSON.stringify(array));
    }
  }
};
var LocalStore = class extends m_array_store_default {
  constructor(options) {
    if ("string" === typeof options) {
      options = {
        name: options
      };
    } else {
      options = options || {};
    }
    super(options);
    this._array = options.data || [];
    this._backend = new LocalStoreBackend(this, options);
    this._backend.load();
  }
  _clearCache() {
    this._backend.load();
  }
  clear() {
    super.clear();
    this._backend.notifyChanged();
  }
  _insertImpl(values) {
    const b = this._backend;
    return super._insertImpl(values).done(b.notifyChanged.bind(b));
  }
  _updateImpl(key, values) {
    const b = this._backend;
    return super._updateImpl(key, values).done(b.notifyChanged.bind(b));
  }
  _removeImpl(key) {
    const b = this._backend;
    return super._removeImpl(key).done(b.notifyChanged.bind(b));
  }
};
m_abstract_store_default.registerClass(LocalStore, "local");
var m_local_store_default = LocalStore;

// node_modules/devextreme/esm/__internal/data/odata/m_utils.js
var GUID_REGEX = /^(\{{0,1}([0-9a-fA-F]){8}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){4}-([0-9a-fA-F]){12}\}{0,1})$/;
var VERBOSE_DATE_REGEX = /^\/Date\((-?\d+)((\+|-)?(\d+)?)\)\/$/;
var ISO8601_DATE_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[-+]{1}\d{2}(:?)(\d{2})?)?$/;
var JSON_VERBOSE_MIME_TYPE = "application/json;odata=verbose";
var makeArray = (value) => "string" === type(value) ? value.split() : value;
var hasDot = (x) => /\./.test(x);
var pad = (text, length, right) => {
  text = String(text);
  while (text.length < length) {
    text = right ? `${text}0` : `0${text}`;
  }
  return text;
};
var formatISO8601 = (date, skipZeroTime, skipTimezone) => {
  const bag = [];
  const padLeft2 = (text) => pad(text, 2);
  bag.push(date.getFullYear());
  bag.push("-");
  bag.push(padLeft2(date.getMonth() + 1));
  bag.push("-");
  bag.push(padLeft2(date.getDate()));
  if (!(skipZeroTime && date.getHours() + date.getMinutes() + date.getSeconds() + date.getMilliseconds() < 1)) {
    bag.push("T");
    bag.push(padLeft2(date.getHours()));
    bag.push(":");
    bag.push(padLeft2(date.getMinutes()));
    bag.push(":");
    bag.push(padLeft2(date.getSeconds()));
    if (date.getMilliseconds()) {
      bag.push(".");
      bag.push(pad(date.getMilliseconds(), 3));
    }
    if (!skipTimezone) {
      bag.push("Z");
    }
  }
  return bag.join("");
};
var parseISO8601 = (isoString) => {
  const result = new Date(60 * (/* @__PURE__ */ new Date(0)).getTimezoneOffset() * 1e3);
  const chunks = isoString.replace("Z", "").split("T");
  const date = /(\d{4})-(\d{2})-(\d{2})/.exec(chunks[0]);
  const time = /(\d{2}):(\d{2}):(\d{2})\.?(\d{0,7})?/.exec(chunks[1]);
  result.setFullYear(Number(date[1]));
  result.setMonth(Number(date[2]) - 1);
  result.setDate(Number(date[3]));
  if (Array.isArray(time) && time.length) {
    result.setHours(Number(time[1]));
    result.setMinutes(Number(time[2]));
    result.setSeconds(Number(time[3]));
    let fractional = (time[4] || "").slice(0, 3);
    fractional = pad(fractional, 3, true);
    result.setMilliseconds(Number(fractional));
  }
  return result;
};
var isAbsoluteUrl = (url) => /^(?:[a-z]+:)?\/{2,2}/i.test(url);
var stripParams = (url) => {
  const index = url.indexOf("?");
  if (index > -1) {
    return url.substr(0, index);
  }
  return url;
};
var toAbsoluteUrl = (basePath, relativePath) => {
  let part;
  const baseParts = stripParams(basePath).split("/");
  const relativeParts = relativePath.split("/");
  baseParts.pop();
  while (relativeParts.length) {
    part = relativeParts.shift();
    if (".." === part) {
      baseParts.pop();
    } else {
      baseParts.push(part);
    }
  }
  return baseParts.join("/");
};
var param = (params) => {
  const result = [];
  for (const name in params) {
    result.push(`${name}=${params[name]}`);
  }
  return result.join("&");
};
var ajaxOptionsForRequest = function(protocolVersion, request) {
  var _options$beforeSend;
  let options = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : {};
  request = extend({
    async: true,
    method: "get",
    url: "",
    params: {},
    payload: null,
    headers: {},
    timeout: 3e4
  }, request);
  null === (_options$beforeSend = options.beforeSend) || void 0 === _options$beforeSend || _options$beforeSend.call(options, request);
  const {
    async,
    timeout,
    headers
  } = request;
  let {
    url,
    method
  } = request;
  const {
    jsonp,
    withCredentials
  } = options;
  method = (method || "get").toLowerCase();
  const isGet = "get" === method;
  const useJsonp = isGet && jsonp;
  const params = extend({}, request.params);
  const ajaxData = isGet ? params : (payload = request.payload, JSON.stringify(payload, function(key, value) {
    if (!(this[key] instanceof Date)) {
      return value;
    }
    value = formatISO8601(this[key]);
    switch (protocolVersion) {
      case 2:
        return value.substr(0, value.length - 1);
      case 3:
      case 4:
        return value;
      default:
        throw errors.Error("E4002");
    }
  }));
  var payload;
  const qs = !isGet && param(params);
  const contentType = !isGet && JSON_VERBOSE_MIME_TYPE;
  if (qs) {
    url += (url.indexOf("?") > -1 ? "&" : "?") + qs;
  }
  if (useJsonp) {
    ajaxData.$format = "json";
  }
  return {
    url,
    data: ajaxData,
    dataType: useJsonp ? "jsonp" : "json",
    jsonp: useJsonp && "$callback",
    method,
    async,
    timeout,
    headers,
    contentType,
    accepts: {
      json: [JSON_VERBOSE_MIME_TYPE, "text/plain"].join()
    },
    xhrFields: {
      withCredentials
    }
  };
};
var sendRequest = (protocolVersion, request, options) => {
  const {
    deserializeDates,
    fieldTypes,
    countOnly,
    isPaged
  } = options;
  const d = new Deferred();
  const ajaxOptions = ajaxOptionsForRequest(protocolVersion, request, options);
  ajax_default.sendRequest(ajaxOptions).always((obj, textStatus) => {
    const transformOptions = {
      deserializeDates,
      fieldTypes
    };
    const tuple = interpretJsonFormat(obj, textStatus, transformOptions, ajaxOptions);
    const {
      error,
      data,
      count
    } = tuple;
    let {
      nextUrl
    } = tuple;
    if (error) {
      if (error.message !== XHR_ERROR_UNLOAD) {
        d.reject(error);
      }
    } else if (countOnly) {
      if (isFinite(count)) {
        d.resolve(count);
      } else {
        d.reject(errors.Error("E4018"));
      }
    } else if (nextUrl && !isPaged) {
      if (!isAbsoluteUrl(nextUrl)) {
        nextUrl = toAbsoluteUrl(ajaxOptions.url, nextUrl);
      }
      sendRequest(protocolVersion, {
        url: nextUrl
      }, options).fail(d.reject).done((nextData) => d.resolve(data.concat(nextData)));
    } else {
      const extra = isFinite(count) ? {
        totalCount: count
      } : void 0;
      d.resolve(data, extra);
    }
  });
  return d.promise();
};
var formatDotNetError = (errorObj) => {
  let message;
  let currentMessage;
  let currentError = errorObj;
  if ("message" in errorObj) {
    var _errorObj$message;
    message = (null === (_errorObj$message = errorObj.message) || void 0 === _errorObj$message ? void 0 : _errorObj$message.value) || errorObj.message;
  }
  while (currentError = currentError.innererror || currentError.internalexception) {
    currentMessage = currentError.message;
    message = currentMessage ?? message;
    if (currentError.internalexception && -1 === message.indexOf("inner exception")) {
      break;
    }
  }
  return message;
};
var errorFromResponse = (obj, textStatus, ajaxOptions) => {
  var _response, _response2, _response3, _response4;
  if ("nocontent" === textStatus) {
    return null;
  }
  let message = "Unknown error";
  let response = obj;
  let httpStatus = 200;
  const errorData = {
    requestOptions: ajaxOptions
  };
  if ("success" !== textStatus) {
    const {
      status,
      responseText
    } = obj;
    httpStatus = status;
    message = errorMessageFromXhr(obj, textStatus);
    try {
      response = JSON.parse(responseText);
    } catch (x) {
    }
  }
  const errorObj = (null === (_response = response) || void 0 === _response ? void 0 : _response.then) || (null === (_response2 = response) || void 0 === _response2 ? void 0 : _response2.error) || (null === (_response3 = response) || void 0 === _response3 ? void 0 : _response3["odata.error"]) || (null === (_response4 = response) || void 0 === _response4 ? void 0 : _response4["@odata.error"]);
  if (errorObj) {
    message = formatDotNetError(errorObj) || message;
    errorData.errorDetails = errorObj;
    if (200 === httpStatus) {
      httpStatus = 500;
    }
    const customCode = Number(errorObj.code);
    if (isFinite(customCode) && customCode >= 400) {
      httpStatus = customCode;
    }
  }
  if (httpStatus >= 400 || 0 === httpStatus) {
    errorData.httpStatus = httpStatus;
    return extend(Error(message), errorData);
  }
  return null;
};
var interpretJsonFormat = (obj, textStatus, transformOptions, ajaxOptions) => {
  const error = errorFromResponse(obj, textStatus, ajaxOptions);
  if (error) {
    return {
      error
    };
  }
  if (!isPlainObject(obj)) {
    return {
      data: obj
    };
  }
  const value = "d" in obj && (Array.isArray(obj.d) || isObject(obj.d)) ? interpretVerboseJsonFormat(obj) : interpretLightJsonFormat(obj);
  transformTypes(value, transformOptions);
  return value;
};
var interpretVerboseJsonFormat = (_ref) => {
  let {
    d: data
  } = _ref;
  if (!isDefined(data)) {
    return {
      error: Error("Malformed or unsupported JSON response received")
    };
  }
  return {
    data: data.results ?? data,
    nextUrl: data.__next,
    count: parseInt(data.__count, 10)
  };
};
var interpretLightJsonFormat = (obj) => ({
  data: obj.value ?? obj,
  nextUrl: obj["@odata.nextLink"],
  count: parseInt(obj["@odata.count"], 10)
});
var EdmLiteral = class_default.inherit({
  ctor(value) {
    this._value = value;
  },
  valueOf() {
    return this._value;
  }
});
var transformTypes = function(obj) {
  let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
  each(obj, (key, value) => {
    if (null !== value && "object" === typeof value) {
      if ("results" in value) {
        obj[key] = value.results;
      }
      transformTypes(obj[key], options);
    } else if ("string" === typeof value) {
      const {
        fieldTypes,
        deserializeDates
      } = options;
      const canBeGuid = !fieldTypes || "String" !== fieldTypes[key];
      if (canBeGuid && GUID_REGEX.test(value)) {
        obj[key] = new guid_default(value);
      }
      if (false !== deserializeDates) {
        if (VERBOSE_DATE_REGEX.exec(value)) {
          const date = new Date(Number(RegExp.$1) + 60 * RegExp.$2 * 1e3);
          obj[key] = new Date(date.valueOf() + 60 * date.getTimezoneOffset() * 1e3);
        } else if (ISO8601_DATE_REGEX.test(value)) {
          obj[key] = new Date(parseISO8601(obj[key]).valueOf());
        }
      }
    }
  });
};
var serializeDate = (date) => `datetime'${formatISO8601(date, true, true)}'`;
var serializeString = (value) => `'${value.replace(/'/g, "''")}'`;
var serializePropName = (propName) => propName instanceof EdmLiteral ? propName.valueOf() : propName.replace(/\./g, "/");
var serializeValueV4 = (value) => {
  if (value instanceof Date) {
    return formatISO8601(value, false, false);
  }
  if (value instanceof guid_default) {
    return value.valueOf();
  }
  if (Array.isArray(value)) {
    return `[${value.map((item) => serializeValueV4(item)).join(",")}]`;
  }
  return serializeValueV2(value);
};
var serializeValueV2 = (value) => {
  if (value instanceof Date) {
    return serializeDate(value);
  }
  if (value instanceof guid_default) {
    return `guid'${value}'`;
  }
  if (value instanceof EdmLiteral) {
    return value.valueOf();
  }
  if ("string" === typeof value) {
    return serializeString(value);
  }
  return String(value);
};
var serializeValue = (value, protocolVersion) => {
  switch (protocolVersion) {
    case 2:
    case 3:
      return serializeValueV2(value);
    case 4:
      return serializeValueV4(value);
    default:
      throw errors.Error("E4002");
  }
};
var serializeKey = (key, protocolVersion) => {
  if (isPlainObject(key)) {
    const parts = [];
    each(key, (k, v) => parts.push(`${serializePropName(k)}=${serializeValue(v, protocolVersion)}`));
    return parts.join();
  }
  return serializeValue(key, protocolVersion);
};
var keyConverters = {
  String: (value) => `${value}`,
  Int32: (value) => Math.floor(value),
  Int64: (value) => value instanceof EdmLiteral ? value : new EdmLiteral(`${value}L`),
  Guid: (value) => value instanceof guid_default ? value : new guid_default(value),
  Boolean: (value) => !!value,
  Single: (value) => value instanceof EdmLiteral ? value : new EdmLiteral(`${value}f`),
  Decimal: (value) => value instanceof EdmLiteral ? value : new EdmLiteral(`${value}m`)
};
var convertPrimitiveValue = (type2, value) => {
  if (null === value) {
    return null;
  }
  const converter = keyConverters[type2];
  if (!converter) {
    throw errors.Error("E4014", type2);
  }
  return converter(value);
};
var generateSelect = (oDataVersion, select) => {
  if (!select) {
    return;
  }
  return oDataVersion < 4 ? serializePropName(select.join()) : grep(select, hasDot, true).join();
};
var formatCore = (hash) => {
  let result = "";
  const selectValue = [];
  const expandValue = [];
  each(hash, (key, value) => {
    if (Array.isArray(value)) {
      [].push.apply(selectValue, value);
    }
    if (isPlainObject(value)) {
      expandValue.push(`${key}${formatCore(value)}`);
    }
  });
  if (selectValue.length || expandValue.length) {
    result += "(";
    if (selectValue.length) {
      result += `$select=${map(selectValue, serializePropName).join()}`;
    }
    if (expandValue.length) {
      if (selectValue.length) {
        result += ";";
      }
      result += `$expand=${map(expandValue, serializePropName).join()}`;
    }
    result += ")";
  }
  return result;
};
var format2 = (hash) => {
  const result = [];
  each(hash, (key, value) => result.push(`${key}${formatCore(value)}`));
  return result.join();
};
var parseCore = (exprParts, root, stepper) => {
  const result = stepper(root, exprParts.shift(), exprParts);
  if (false === result) {
    return;
  }
  parseCore(exprParts, result, stepper);
};
var parseTree = (exprs, root, stepper) => each(exprs, (_, x) => parseCore(x.split("."), root, stepper));
var generatorV2 = (expand, select) => {
  const hash = {};
  if (expand) {
    each(makeArray(expand), function() {
      hash[serializePropName(this)] = 1;
    });
  }
  if (select) {
    each(makeArray(select), function() {
      const path = this.split(".");
      if (path.length < 2) {
        return;
      }
      path.pop();
      hash[serializePropName(path.join("."))] = 1;
    });
  }
  return map(hash, (_, v) => v).join();
};
var generatorV4 = (expand, select) => {
  const hash = {};
  if (expand || select) {
    if (expand) {
      parseTree(makeArray(expand), hash, (node, key, path) => {
        node[key] = node[key] || {};
        return !path.length ? false : node[key];
      });
    }
    if (select) {
      parseTree(grep(makeArray(select), hasDot), hash, (node, key, path) => {
        if (!path.length) {
          node[key] = node[key] || [];
          node[key].push(key);
          return false;
        }
        return node[key] = node[key] || {};
      });
    }
    return format2(hash);
  }
};
var generateExpand = (oDataVersion, expand, select) => oDataVersion < 4 ? generatorV2(expand, select) : generatorV4(expand, select);
var formatFunctionInvocationUrl = (baseUrl, args) => format("{0}({1})", baseUrl, map(args || {}, (value, key) => format("{0}={1}", key, value)).join(","));
var escapeServiceOperationParams = (params, version) => {
  if (!params) {
    return params;
  }
  const result = {};
  each(params, (k, v) => {
    result[k] = serializeValue(v, version);
  });
  return result;
};

// node_modules/devextreme/esm/__internal/data/odata/m_query_adapter.js
var STRING_FUNCTIONS = ["contains", "notcontains", "startswith", "endswith"];
var compileCriteria = (() => {
  let protocolVersion;
  let forceLowerCase;
  let fieldTypes;
  const createBinaryOperationFormatter = (op) => (prop, val) => `${prop} ${op} ${val}`;
  const createStringFuncFormatter = (op, reverse) => (prop, val) => {
    const bag = [op, "("];
    if (forceLowerCase) {
      prop = -1 === prop.indexOf("tolower(") ? `tolower(${prop})` : prop;
      val = val.toLowerCase();
    }
    if (reverse) {
      bag.push(val, ",", prop);
    } else {
      bag.push(prop, ",", val);
    }
    bag.push(")");
    return bag.join("");
  };
  const formatters = {
    "=": createBinaryOperationFormatter("eq"),
    "<>": createBinaryOperationFormatter("ne"),
    ">": createBinaryOperationFormatter("gt"),
    ">=": createBinaryOperationFormatter("ge"),
    "<": createBinaryOperationFormatter("lt"),
    "<=": createBinaryOperationFormatter("le"),
    startswith: createStringFuncFormatter("startswith"),
    endswith: createStringFuncFormatter("endswith")
  };
  const formattersV2 = extend({}, formatters, {
    contains: createStringFuncFormatter("substringof", true),
    notcontains: createStringFuncFormatter("not substringof", true)
  });
  const formattersV4 = extend({}, formatters, {
    contains: createStringFuncFormatter("contains"),
    notcontains: createStringFuncFormatter("not contains")
  });
  const compileBinary = (criteria) => {
    var _fieldTypes;
    criteria = normalizeBinaryCriterion(criteria);
    const op = criteria[1];
    const fieldName = criteria[0];
    const fieldType = fieldTypes && fieldTypes[fieldName];
    if (fieldType && (name = op, STRING_FUNCTIONS.some((funcName) => funcName === name)) && "String" !== fieldType) {
      throw new errors.Error("E4024", op, fieldName, fieldType);
    }
    var name;
    const formatters2 = 4 === protocolVersion ? formattersV4 : formattersV2;
    const formatter = formatters2[op.toLowerCase()];
    if (!formatter) {
      throw errors.Error("E4003", op);
    }
    let value = criteria[2];
    if (null !== (_fieldTypes = fieldTypes) && void 0 !== _fieldTypes && _fieldTypes[fieldName]) {
      value = convertPrimitiveValue(fieldTypes[fieldName], value);
    }
    return formatter(serializePropName(fieldName), serializeValue(value, protocolVersion));
  };
  const compileGroup = (criteria) => {
    const bag = [];
    let groupOperator;
    let nextGroupOperator;
    each(criteria, function(index, criterion) {
      if (Array.isArray(criterion)) {
        if (bag.length > 1 && groupOperator !== nextGroupOperator) {
          throw new errors.Error("E4019");
        }
        bag.push(`(${compileCore(criterion)})`);
        groupOperator = nextGroupOperator;
        nextGroupOperator = "and";
      } else {
        nextGroupOperator = isConjunctiveOperator(this) ? "and" : "or";
      }
    });
    return bag.join(` ${groupOperator} `);
  };
  const compileCore = (criteria) => {
    if (Array.isArray(criteria[0])) {
      return compileGroup(criteria);
    }
    if (isUnaryOperation(criteria)) {
      return ((criteria2) => {
        const op = criteria2[0];
        const crit = compileCore(criteria2[1]);
        if ("!" === op) {
          return `not (${crit})`;
        }
        throw errors.Error("E4003", op);
      })(criteria);
    }
    return compileBinary(criteria);
  };
  return (criteria, version, types, filterToLower) => {
    fieldTypes = types;
    forceLowerCase = filterToLower ?? config_default().oDataFilterToLower;
    protocolVersion = version;
    return compileCore(criteria);
  };
})();
var createODataQueryAdapter = (queryOptions) => {
  let _sorting = [];
  const _criteria = [];
  const _expand = queryOptions.expand;
  let _select;
  let _skip;
  let _take;
  let _countQuery;
  const _oDataVersion = queryOptions.version || 4;
  const hasSlice = () => _skip || void 0 !== _take;
  const hasFunction = (criterion) => {
    for (let i = 0; i < criterion.length; i++) {
      if (isFunction(criterion[i])) {
        return true;
      }
      if (Array.isArray(criterion[i]) && hasFunction(criterion[i])) {
        return true;
      }
    }
    return false;
  };
  const requestData = () => {
    const result = {};
    if (!_countQuery) {
      if (_sorting.length) {
        result.$orderby = _sorting.join(",");
      }
      if (_skip) {
        result.$skip = _skip;
      }
      if (void 0 !== _take) {
        result.$top = _take;
      }
      result.$select = generateSelect(_oDataVersion, _select) || void 0;
      result.$expand = generateExpand(_oDataVersion, _expand, _select) || void 0;
    }
    if (_criteria.length) {
      const criteria = _criteria.length < 2 ? _criteria[0] : _criteria;
      const fieldTypes = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.fieldTypes;
      const filterToLower = null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.filterToLower;
      result.$filter = compileCriteria(criteria, _oDataVersion, fieldTypes, filterToLower);
    }
    if (_countQuery) {
      result.$top = 0;
    }
    if (queryOptions.requireTotalCount || _countQuery) {
      if (4 !== _oDataVersion) {
        result.$inlinecount = "allpages";
      } else {
        result.$count = "true";
      }
    }
    return result;
  };
  return {
    optimize: (tasks) => {
      let selectIndex = -1;
      for (let i = 0; i < tasks.length; i++) {
        if ("select" === tasks[i].name) {
          selectIndex = i;
          break;
        }
      }
      if (selectIndex < 0 || !isFunction(tasks[selectIndex].args[0])) {
        return;
      }
      const nextTask = tasks[1 + selectIndex];
      if (!nextTask || "slice" !== nextTask.name) {
        return;
      }
      tasks[1 + selectIndex] = tasks[selectIndex];
      tasks[selectIndex] = nextTask;
    },
    exec: (url) => sendRequest(_oDataVersion, {
      url,
      params: extend(requestData(), null === queryOptions || void 0 === queryOptions ? void 0 : queryOptions.params)
    }, {
      beforeSend: queryOptions.beforeSend,
      jsonp: queryOptions.jsonp,
      withCredentials: queryOptions.withCredentials,
      countOnly: _countQuery,
      deserializeDates: queryOptions.deserializeDates,
      fieldTypes: queryOptions.fieldTypes,
      isPaged: isFinite(_take)
    }),
    multiSort(args) {
      let rules;
      if (hasSlice()) {
        return false;
      }
      for (let i = 0; i < args.length; i++) {
        const getter = args[i][0];
        const desc = !!args[i][1];
        let rule;
        if ("string" !== typeof getter) {
          return false;
        }
        rule = serializePropName(getter);
        if (desc) {
          rule += " desc";
        }
        rules = rules || [];
        rules.push(rule);
      }
      _sorting = rules;
    },
    slice(skipCount, takeCount) {
      if (hasSlice()) {
        return false;
      }
      _skip = skipCount;
      _take = takeCount;
    },
    filter(criterion) {
      if (hasSlice()) {
        return false;
      }
      if (!Array.isArray(criterion)) {
        criterion = [].slice.call(arguments);
      }
      if (hasFunction(criterion)) {
        return false;
      }
      if (_criteria.length) {
        _criteria.push("and");
      }
      _criteria.push(criterion);
    },
    select(expr) {
      if (_select || isFunction(expr)) {
        return false;
      }
      if (!Array.isArray(expr)) {
        expr = [].slice.call(arguments);
      }
      _select = expr;
    },
    count: () => _countQuery = true
  };
};
query_adapters_default.odata = createODataQueryAdapter;

// node_modules/devextreme/esm/__internal/data/odata/m_request_dispatcher.js
var RequestDispatcher = class {
  constructor(options) {
    options = options || {};
    this._url = String(options.url).replace(/\/+$/, "");
    this._beforeSend = options.beforeSend;
    this._jsonp = options.jsonp;
    this._version = options.version || 4;
    this._withCredentials = options.withCredentials;
    this._deserializeDates = options.deserializeDates;
    this._filterToLower = options.filterToLower;
  }
  sendRequest(url, method, params, payload) {
    return sendRequest(this.version, {
      url,
      method,
      params: params || {},
      payload
    }, {
      beforeSend: this._beforeSend,
      jsonp: this._jsonp,
      withCredentials: this._withCredentials,
      deserializeDates: this._deserializeDates
    });
  }
  get version() {
    return this._version;
  }
  get beforeSend() {
    return this._beforeSend;
  }
  get url() {
    return this._url;
  }
  get jsonp() {
    return this._jsonp;
  }
  get filterToLower() {
    return this._filterToLower;
  }
};

// node_modules/devextreme/esm/__internal/data/odata/m_store.js
var ANONYMOUS_KEY_NAME = "5d46402c-7899-4ea9-bd81-8b73c47c7683";
var expandKeyType = (key, keyType) => ({
  [key]: keyType
});
var mergeFieldTypesWithKeyType = (fieldTypes, keyType) => {
  const result = {};
  for (const field in fieldTypes) {
    result[field] = fieldTypes[field];
  }
  for (const keyName in keyType) {
    if (keyName in result) {
      if (result[keyName] !== keyType[keyName]) {
        errors.log("W4001", keyName);
      }
    } else {
      result[keyName] = keyType[keyName];
    }
  }
  return result;
};
var ODataStore = m_abstract_store_default.inherit({
  ctor(options) {
    this.callBase(options);
    this._requestDispatcher = new RequestDispatcher(options);
    let key = this.key();
    let {
      fieldTypes
    } = options;
    let {
      keyType
    } = options;
    if (keyType) {
      const keyTypeIsString = "string" === typeof keyType;
      if (!key) {
        key = keyTypeIsString ? ANONYMOUS_KEY_NAME : Object.keys(keyType);
        this._legacyAnonymousKey = key;
      }
      if (keyTypeIsString) {
        keyType = expandKeyType(key, keyType);
      }
      fieldTypes = mergeFieldTypesWithKeyType(fieldTypes, keyType);
    }
    this._fieldTypes = fieldTypes || {};
    if (2 === this.version()) {
      this._updateMethod = "MERGE";
    } else {
      this._updateMethod = "PATCH";
    }
  },
  _customLoadOptions: () => ["expand", "customQueryParams"],
  _byKeyImpl(key, extraOptions) {
    const params = {};
    if (extraOptions) {
      params.$expand = generateExpand(this.version(), extraOptions.expand, extraOptions.select) || void 0;
      params.$select = generateSelect(this.version(), extraOptions.select) || void 0;
    }
    return this._requestDispatcher.sendRequest(this._byKeyUrl(key), "GET", params);
  },
  createQuery(loadOptions) {
    let url;
    const queryOptions = {
      adapter: "odata",
      beforeSend: this._requestDispatcher.beforeSend,
      errorHandler: this._errorHandler,
      jsonp: this._requestDispatcher.jsonp,
      version: this._requestDispatcher.version,
      withCredentials: this._requestDispatcher._withCredentials,
      expand: null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.expand,
      requireTotalCount: null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.requireTotalCount,
      deserializeDates: this._requestDispatcher._deserializeDates,
      fieldTypes: this._fieldTypes
    };
    url = (null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.urlOverride) ?? this._requestDispatcher.url;
    if (isDefined(this._requestDispatcher.filterToLower)) {
      queryOptions.filterToLower = this._requestDispatcher.filterToLower;
    }
    if (null !== loadOptions && void 0 !== loadOptions && loadOptions.customQueryParams) {
      const params = escapeServiceOperationParams(null === loadOptions || void 0 === loadOptions ? void 0 : loadOptions.customQueryParams, this.version());
      if (4 === this.version()) {
        url = formatFunctionInvocationUrl(url, params);
      } else {
        queryOptions.params = params;
      }
    }
    return m_query_default(url, queryOptions);
  },
  _insertImpl(values) {
    this._requireKey();
    const d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._requestDispatcher.url, "POST", null, values)).done((serverResponse) => d.resolve(serverResponse && !config_default().useLegacyStoreResult ? serverResponse : values, this.keyOf(serverResponse))).fail(d.reject);
    return d.promise();
  },
  _updateImpl(key, values) {
    const d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._byKeyUrl(key), this._updateMethod, null, values)).done((serverResponse) => config_default().useLegacyStoreResult ? d.resolve(key, values) : d.resolve(serverResponse || values, key)).fail(d.reject);
    return d.promise();
  },
  _removeImpl(key) {
    const d = new Deferred();
    when(this._requestDispatcher.sendRequest(this._byKeyUrl(key), "DELETE")).done(() => d.resolve(key)).fail(d.reject);
    return d.promise();
  },
  _convertKey(value) {
    let result = value;
    const fieldTypes = this._fieldTypes;
    const key = this.key() || this._legacyAnonymousKey;
    if (Array.isArray(key)) {
      result = {};
      for (let i = 0; i < key.length; i++) {
        const keyName = key[i];
        result[keyName] = convertPrimitiveValue(fieldTypes[keyName], value[keyName]);
      }
    } else if (fieldTypes[key]) {
      result = convertPrimitiveValue(fieldTypes[key], value);
    }
    return result;
  },
  _byKeyUrl(value) {
    const baseUrl = this._requestDispatcher.url;
    const convertedKey = this._convertKey(value);
    return `${baseUrl}(${encodeURIComponent(serializeKey(convertedKey, this.version()))})`;
  },
  version() {
    return this._requestDispatcher.version;
  }
}, "odata");
var m_store_default = ODataStore;

// node_modules/devextreme/esm/__internal/data/odata/m_context.js
var ODataContext = class_default.inherit({
  ctor(options) {
    this._requestDispatcher = new RequestDispatcher(options);
    this._errorHandler = options.errorHandler;
    each(options.entities || [], (entityAlias, entityOptions) => {
      this[entityAlias] = new m_store_default(extend({}, options, {
        url: `${this._requestDispatcher.url}/${encodeURIComponent(entityOptions.name || entityAlias)}`
      }, entityOptions));
    });
  },
  get(operationName, params) {
    return this.invoke(operationName, params, "GET");
  },
  invoke(operationName) {
    let params = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    let httpMethod = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "POST";
    httpMethod = httpMethod.toLowerCase();
    const d = new Deferred();
    let url = `${this._requestDispatcher.url}/${encodeURIComponent(operationName)}`;
    let payload;
    if (4 === this.version()) {
      if ("get" === httpMethod) {
        url = formatFunctionInvocationUrl(url, escapeServiceOperationParams(params, this.version()));
        params = null;
      } else if ("post" === httpMethod) {
        payload = params;
        params = null;
      }
    }
    when(this._requestDispatcher.sendRequest(url, httpMethod, escapeServiceOperationParams(params, this.version()), payload)).done((r) => {
      if (isPlainObject(r) && operationName in r) {
        r = r[operationName];
      }
      d.resolve(r);
    }).fail(this._errorHandler).fail(handleError).fail(d.reject);
    return d.promise();
  },
  objectLink(entityAlias, key) {
    const store = this[entityAlias];
    if (!store) {
      throw errors.Error("E4015", entityAlias);
    }
    if (!isDefined(key)) {
      return null;
    }
    return {
      __metadata: {
        uri: store._byKeyUrl(key)
      }
    };
  },
  version() {
    return this._requestDispatcher.version;
  }
});
var m_context_default = ODataContext;

export {
  apply_changes_default,
  m_endpoint_selector_default,
  m_local_store_default,
  EdmLiteral,
  keyConverters,
  m_store_default,
  m_context_default
};
//# sourceMappingURL=chunk-D64XDJV7.js.map
