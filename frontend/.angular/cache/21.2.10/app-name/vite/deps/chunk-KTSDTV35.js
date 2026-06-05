import {
  dateUtilsTs
} from "./chunk-V5IPHRES.js";
import {
  EventsStrategy
} from "./chunk-HNNPSSXJ.js";
import {
  camelize,
  getHeight,
  getWidth,
  m_ready_callbacks_default,
  ready_callbacks_default,
  renderer_default,
  setWidth,
  styleProp,
  stylePropPrefix
} from "./chunk-H2RLU3GL.js";
import {
  call_once_default,
  m_events_engine_default
} from "./chunk-WDK64ZWV.js";
import {
  callbacks_default,
  config_default2 as config_default,
  dom_adapter_default,
  each,
  errors_default,
  extend,
  getNavigator,
  getWindow,
  hasProperty,
  hasWindow,
  isDate,
  isDefined,
  isExponential,
  isNumeric,
  isObject,
  isPlainObject,
  isString,
  m_callbacks_default,
  m_dom_adapter_default,
  m_window_default,
  map,
  uiLayerInitialized,
  when
} from "./chunk-CPBGCP6I.js";
import {
  __async
} from "./chunk-N6ESDQJH.js";

// node_modules/devextreme/esm/__internal/core/environment/hide_callback.js
var hideCallback = /* @__PURE__ */ (function() {
  let callbacks = [];
  return {
    add(callback) {
      if (!callbacks.includes(callback)) {
        callbacks.push(callback);
      }
    },
    remove(callback) {
      const indexOfCallback = callbacks.indexOf(callback);
      if (-1 !== indexOfCallback) {
        callbacks.splice(indexOfCallback, 1);
      }
    },
    fire() {
      const callback = callbacks.pop();
      const result = !!callback;
      if (result) {
        callback();
      }
      return result;
    },
    hasCallback: () => callbacks.length > 0
  };
})();
var fireCallback = () => hideCallback.fire();

// node_modules/devextreme/esm/common/core/environment/hide_top_overlay.js
var hide_top_overlay_default = fireCallback;

// node_modules/devextreme/esm/__internal/core/utils/m_resize_callbacks.js
var resizeCallbacks = (function() {
  let prevSize;
  const callbacks = m_callbacks_default();
  const originalCallbacksAdd = callbacks.add;
  const originalCallbacksRemove = callbacks.remove;
  if (!m_window_default.hasWindow()) {
    return callbacks;
  }
  const formatSize = function() {
    const window4 = m_window_default.getWindow();
    return {
      width: window4.innerWidth,
      height: window4.innerHeight
    };
  };
  const handleResize = function() {
    const now = formatSize();
    if (now.width === prevSize.width && now.height === prevSize.height) {
      return;
    }
    let changedDimension;
    if (now.width === prevSize.width) {
      changedDimension = "height";
    }
    if (now.height === prevSize.height) {
      changedDimension = "width";
    }
    prevSize = now;
    callbacks.fire(changedDimension);
  };
  const setPrevSize = call_once_default(function() {
    prevSize = formatSize();
  });
  let removeListener;
  callbacks.add = function() {
    const result = originalCallbacksAdd.apply(callbacks, arguments);
    setPrevSize();
    m_ready_callbacks_default.add(function() {
      if (!removeListener && callbacks.has()) {
        removeListener = dom_adapter_default.listen(m_window_default.getWindow(), "resize", handleResize);
      }
    });
    return result;
  };
  callbacks.remove = function() {
    const result = originalCallbacksRemove.apply(callbacks, arguments);
    if (!callbacks.has() && removeListener) {
      removeListener();
      removeListener = void 0;
    }
    return result;
  };
  return callbacks;
})();
var m_resize_callbacks_default = resizeCallbacks;

// node_modules/devextreme/esm/core/utils/resize_callbacks.js
var resize_callbacks_default = resizeCallbacks;

// node_modules/devextreme/esm/__internal/core/utils/m_storage.js
var window = getWindow();
var getSessionStorage = function() {
  let sessionStorage;
  try {
    sessionStorage = window.sessionStorage;
  } catch (e) {
  }
  return sessionStorage;
};

// node_modules/devextreme/esm/__internal/core/utils/m_view_port.js
var ready = ready_callbacks_default.add;
var changeCallback = callbacks_default();
var $originalViewPort = renderer_default();
var value = /* @__PURE__ */ (function() {
  let $current;
  return function(element) {
    if (!arguments.length) {
      return $current;
    }
    const $element = renderer_default(element);
    $originalViewPort = $element;
    const isNewViewportFound = !!$element.length;
    const prevViewPort = value();
    $current = isNewViewportFound ? $element : renderer_default("body");
    changeCallback.fire(isNewViewportFound ? value() : renderer_default(), prevViewPort);
  };
})();
ready(function() {
  value(".dx-viewport");
});
function originalViewPort() {
  return $originalViewPort;
}

// node_modules/devextreme/esm/__internal/core/m_devices.js
var window2 = getWindow();
var KNOWN_UA_TABLE = {
  iPhone: "iPhone",
  iPhone5: "iPhone",
  iPhone6: "iPhone",
  iPhone6plus: "iPhone",
  iPad: "iPad",
  iPadMini: "iPad Mini",
  androidPhone: "Android Mobile",
  androidTablet: "Android",
  msSurface: "Windows ARM Tablet PC",
  desktop: "desktop"
};
var DEFAULT_DEVICE = {
  deviceType: "desktop",
  platform: "generic",
  version: [],
  phone: false,
  tablet: false,
  android: false,
  ios: false,
  generic: true,
  grade: "A",
  mac: false
};
var UA_PARSERS = {
  generic(userAgent) {
    const isPhone = /windows phone/i.test(userAgent) || userAgent.match(/WPDesktop/);
    const isTablet = !isPhone && /Windows(.*)arm(.*)Tablet PC/i.test(userAgent);
    const isDesktop = !isPhone && !isTablet && /msapphost/i.test(userAgent);
    const isMac = /((intel|ppc) mac os x)/.test(userAgent.toLowerCase());
    if (!(isPhone || isTablet || isDesktop || isMac)) {
      return null;
    }
    return {
      deviceType: isPhone ? "phone" : isTablet ? "tablet" : "desktop",
      platform: "generic",
      version: [],
      grade: "A",
      mac: isMac
    };
  },
  appleTouchDevice(userAgent) {
    const navigator = getNavigator();
    const isIpadOs = /Macintosh/i.test(userAgent) && (null === navigator || void 0 === navigator ? void 0 : navigator.maxTouchPoints) > 2;
    const isAppleDevice = /ip(hone|od|ad)/i.test(userAgent);
    if (!isAppleDevice && !isIpadOs) {
      return null;
    }
    const isPhone = /ip(hone|od)/i.test(userAgent);
    const matches = userAgent.match(/os\s{0,}X? (\d+)_(\d+)_?(\d+)?/i);
    const version = matches ? [parseInt(matches[1], 10), parseInt(matches[2], 10), parseInt(matches[3] || 0, 10)] : [];
    const isIPhone4 = 480 === window2.screen.height;
    const grade = isIPhone4 ? "B" : "A";
    const isDesktopMode = /Macintosh/i.test(userAgent) && !/Mobile/i.test(userAgent);
    return {
      deviceType: isDesktopMode ? "desktop" : isPhone ? "phone" : "tablet",
      platform: "ios",
      version,
      grade
    };
  },
  android(userAgent) {
    const isAndroid = /android|htc_|silk/i.test(userAgent);
    const isWinPhone = /windows phone/i.test(userAgent);
    if (!isAndroid || isWinPhone) {
      return null;
    }
    const isPhone = /mobile/i.test(userAgent);
    const matches = userAgent.match(/android (\d+)\.?(\d+)?\.?(\d+)?/i);
    const version = matches ? [parseInt(matches[1], 10), parseInt(matches[2] || 0, 10), parseInt(matches[3] || 0, 10)] : [];
    const worseThan4_4 = version.length > 1 && (version[0] < 4 || 4 === version[0] && version[1] < 4);
    const grade = worseThan4_4 ? "B" : "A";
    return {
      deviceType: isPhone ? "phone" : "tablet",
      platform: "android",
      version,
      grade
    };
  }
};
var UA_PARSERS_ARRAY = [UA_PARSERS.appleTouchDevice, UA_PARSERS.android, UA_PARSERS.generic];
var Devices = class {
  constructor(options) {
    this._window = (null === options || void 0 === options ? void 0 : options.window) ?? window2;
    this._realDevice = this._getDevice();
    this._currentDevice = void 0;
    this._currentOrientation = void 0;
    this._eventsStrategy = new EventsStrategy(this);
    this.changed = callbacks_default();
    if (hasWindow()) {
      ready_callbacks_default.add(this._recalculateOrientation.bind(this));
      resize_callbacks_default.add(this._recalculateOrientation.bind(this));
    }
  }
  current(deviceOrName) {
    if (deviceOrName) {
      this._currentDevice = this._getDevice(deviceOrName);
      this._forced = true;
      this.changed.fire();
      return;
    }
    if (!this._currentDevice) {
      deviceOrName = void 0;
      try {
        deviceOrName = this._getDeviceOrNameFromWindowScope();
      } catch (e) {
        deviceOrName = this._getDeviceNameFromSessionStorage();
      } finally {
        if (!deviceOrName) {
          deviceOrName = this._getDeviceNameFromSessionStorage();
        }
        if (deviceOrName) {
          this._forced = true;
        }
      }
      this._currentDevice = this._getDevice(deviceOrName);
    }
    return this._currentDevice;
  }
  real(forceDevice) {
    return extend({}, this._realDevice);
  }
  orientation() {
    return this._currentOrientation;
  }
  isForced() {
    return this._forced;
  }
  isRippleEmulator() {
    return !!this._window.tinyHippos;
  }
  _getCssClasses(device) {
    const result = [];
    const realDevice = this._realDevice;
    device = device || this.current();
    if (device.deviceType) {
      result.push(`dx-device-${device.deviceType}`);
      if ("desktop" !== device.deviceType) {
        result.push("dx-device-mobile");
      }
    }
    result.push(`dx-device-${realDevice.platform}`);
    if (realDevice.version && realDevice.version.length) {
      result.push(`dx-device-${realDevice.platform}-${realDevice.version[0]}`);
    }
    if (this.isSimulator()) {
      result.push("dx-simulator");
    }
    if (config_default().rtlEnabled) {
      result.push("dx-rtl");
    }
    return result;
  }
  attachCssClasses(element, device) {
    this._deviceClasses = this._getCssClasses(device).join(" ");
    renderer_default(element).addClass(this._deviceClasses);
  }
  detachCssClasses(element) {
    renderer_default(element).removeClass(this._deviceClasses);
  }
  isSimulator() {
    try {
      var _this$_window$top;
      return this._isSimulator || hasWindow() && this._window.top !== this._window.self && (null === (_this$_window$top = this._window.top) || void 0 === _this$_window$top ? void 0 : _this$_window$top["dx-force-device"]) || this.isRippleEmulator();
    } catch (e) {
      return false;
    }
  }
  forceSimulator() {
    this._isSimulator = true;
  }
  _getDevice(deviceName) {
    if ("genericPhone" === deviceName) {
      deviceName = {
        deviceType: "phone",
        platform: "generic",
        generic: true
      };
    }
    if (isPlainObject(deviceName)) {
      return this._fromConfig(deviceName);
    }
    let ua;
    if (deviceName) {
      ua = KNOWN_UA_TABLE[deviceName];
      if (!ua) {
        throw errors_default.Error("E0005");
      }
    } else {
      const navigator = getNavigator();
      ua = navigator.userAgent;
    }
    return this._fromUA(ua);
  }
  _getDeviceOrNameFromWindowScope() {
    var _this$_window$top2, _this$_window$top3;
    let result;
    if (hasWindow() && (null !== (_this$_window$top2 = this._window.top) && void 0 !== _this$_window$top2 && _this$_window$top2["dx-force-device-object"] || null !== (_this$_window$top3 = this._window.top) && void 0 !== _this$_window$top3 && _this$_window$top3["dx-force-device"])) {
      var _this$_window$top4, _this$_window$top5;
      result = (null === (_this$_window$top4 = this._window.top) || void 0 === _this$_window$top4 ? void 0 : _this$_window$top4["dx-force-device-object"]) || (null === (_this$_window$top5 = this._window.top) || void 0 === _this$_window$top5 ? void 0 : _this$_window$top5["dx-force-device"]);
    }
    return result;
  }
  _getDeviceNameFromSessionStorage() {
    const sessionStorage = getSessionStorage();
    if (!sessionStorage) {
      return;
    }
    const deviceOrName = sessionStorage.getItem("dx-force-device");
    try {
      return JSON.parse(deviceOrName);
    } catch (ex) {
      return deviceOrName;
    }
  }
  _fromConfig(config) {
    const result = extend({}, DEFAULT_DEVICE, this._currentDevice, config);
    const shortcuts = {
      phone: "phone" === result.deviceType,
      tablet: "tablet" === result.deviceType,
      android: "android" === result.platform,
      ios: "ios" === result.platform,
      generic: "generic" === result.platform
    };
    return extend(result, shortcuts);
  }
  _fromUA(ua) {
    for (let idx = 0; idx < UA_PARSERS_ARRAY.length; idx += 1) {
      const parser = UA_PARSERS_ARRAY[idx];
      const config = parser(ua);
      if (config) {
        return this._fromConfig(config);
      }
    }
    return DEFAULT_DEVICE;
  }
  _changeOrientation() {
    const $window = renderer_default(this._window);
    const orientation = getHeight($window) > getWidth($window) ? "portrait" : "landscape";
    if (this._currentOrientation === orientation) {
      return;
    }
    this._currentOrientation = orientation;
    this._eventsStrategy.fireEvent("orientationChanged", [{
      orientation
    }]);
  }
  _recalculateOrientation() {
    const windowWidth = getWidth(this._window);
    if (this._currentWidth === windowWidth) {
      return;
    }
    this._currentWidth = windowWidth;
    this._changeOrientation();
  }
  on(eventName, eventHandler) {
    this._eventsStrategy.on(eventName, eventHandler);
    return this;
  }
  off(eventName, eventHandler) {
    this._eventsStrategy.off(eventName, eventHandler);
    return this;
  }
};
var devices = new Devices();
when(uiLayerInitialized).done(() => {
  const viewPortElement = value();
  if (viewPortElement) {
    devices.attachCssClasses(viewPortElement);
  }
  changeCallback.add((viewPort, prevViewport) => {
    devices.detachCssClasses(prevViewport);
    devices.attachCssClasses(viewPort);
  });
});
var m_devices_default = devices;

// node_modules/devextreme/esm/__internal/core/utils/m_support.js
var {
  maxTouchPoints
} = getNavigator();
var transitionEndEventNames = {
  webkitTransition: "webkitTransitionEnd",
  MozTransition: "transitionend",
  OTransition: "oTransitionEnd",
  transition: "transitionend"
};
var supportProp = function(prop) {
  return !!styleProp(prop);
};
var isNativeScrollingSupported = function() {
  const {
    platform,
    mac: isMac
  } = m_devices_default.real();
  const isNativeScrollDevice = "ios" === platform || "android" === platform || isMac;
  return isNativeScrollDevice;
};
var inputType = function(type) {
  if ("text" === type) {
    return true;
  }
  const input = dom_adapter_default.createElement("input");
  try {
    input.setAttribute("type", type);
    input.value = "wrongValue";
    return !input.value;
  } catch (e) {
    return false;
  }
};
var detectTouchEvents = function(hasWindowProperty, maxTouchPoints2) {
  return (hasWindowProperty("ontouchstart") || !!maxTouchPoints2) && !hasWindowProperty("callPhantom");
};
var detectPointerEvent = function(hasWindowProperty) {
  return hasWindowProperty("PointerEvent");
};
var touchEvents = detectTouchEvents(hasProperty, maxTouchPoints);
var pointerEvents = detectPointerEvent(hasProperty);
var touchPointersPresent = !!maxTouchPoints;
var touch = touchEvents || pointerEvents && touchPointersPresent;
var transition = call_once_default(function() {
  return supportProp("transition");
});
var transitionEndEventName = call_once_default(function() {
  return transitionEndEventNames[styleProp("transition")];
});
var animation = call_once_default(function() {
  return supportProp("animation");
});
var nativeScrolling = isNativeScrollingSupported();
var m_support_default = {
  animation,
  inputType,
  nativeScrolling,
  pointerEvents,
  styleProp,
  stylePropPrefix,
  supportProp,
  touch,
  touchEvents,
  transition,
  transitionEndEventName
};

// node_modules/devextreme/esm/__internal/core/environment/init_mobile_viewport.js
var window3 = getWindow();
var initMobileViewport = function(options) {
  options = extend({}, options);
  let realDevice = m_devices_default.real();
  const {
    allowZoom
  } = options;
  const {
    allowPan
  } = options;
  const allowSelection = "allowSelection" in options ? options.allowSelection : "generic" === realDevice.platform;
  if (!renderer_default("meta[name=viewport]").length) {
    renderer_default("<meta>").attr("name", "viewport").appendTo("head");
  }
  const metaVerbs = ["width=device-width"];
  const msTouchVerbs = [];
  if (allowZoom) {
    msTouchVerbs.push("pinch-zoom");
  } else {
    metaVerbs.push("initial-scale=1.0", "maximum-scale=1.0, user-scalable=no");
  }
  if (allowPan) {
    msTouchVerbs.push("pan-x", "pan-y");
  }
  if (!allowPan && !allowZoom) {
    renderer_default("html, body").css({
      msContentZooming: "none",
      msUserSelect: "none",
      overflow: "hidden"
    });
  } else {
    renderer_default("html").css("msOverflowStyle", "-ms-autohiding-scrollbar");
  }
  if (!allowSelection && m_support_default.supportProp("userSelect")) {
    renderer_default(".dx-viewport").css(styleProp("userSelect"), "none");
  }
  renderer_default("meta[name=viewport]").attr("content", metaVerbs.join());
  renderer_default("html").css("msTouchAction", msTouchVerbs.join(" ") || "none");
  realDevice = m_devices_default.real();
  if (m_support_default.touch) {
    m_events_engine_default.off(m_dom_adapter_default.getDocument(), ".dxInitMobileViewport");
    m_events_engine_default.on(m_dom_adapter_default.getDocument(), "dxpointermove.dxInitMobileViewport", (e) => {
      const count = e.pointers.length;
      const isTouchEvent = "touch" === e.pointerType;
      const zoomDisabled = !allowZoom && count > 1;
      const panDisabled = !allowPan && 1 === count && !e.isScrollingEvent;
      if (isTouchEvent && (zoomDisabled || panDisabled)) {
        e.preventDefault();
      }
    });
  }
  if (realDevice.ios) {
    const isPhoneGap = "file:" === m_dom_adapter_default.getLocation().protocol;
    if (!isPhoneGap) {
      m_resize_callbacks_default.add(() => {
        const windowWidth = getWidth(window3);
        setWidth(renderer_default("body"), windowWidth);
      });
    }
  }
  if (realDevice.android) {
    m_resize_callbacks_default.add(() => {
      setTimeout(() => {
        const activeElement = m_dom_adapter_default.getActiveElement();
        if (activeElement.scrollIntoViewIfNeeded) {
          activeElement.scrollIntoViewIfNeeded();
        } else {
          activeElement.scrollIntoView(false);
        }
      });
    });
  }
};

// node_modules/devextreme/esm/common/core/environment/init_mobile_viewport.js
var init_mobile_viewport_default = initMobileViewport;

// node_modules/devextreme/esm/__internal/scheduler/utils/macro_task_array/dispatcher.js
var macroTaskIdSet = /* @__PURE__ */ new Set();
var schedule = (callback, macroTaskTimeoutMs) => __async(null, null, function* () {
  return new Promise((resolve) => {
    const taskId = setTimeout(() => {
      callback();
      macroTaskIdSet.delete(taskId);
      resolve();
    }, macroTaskTimeoutMs);
    macroTaskIdSet.add(taskId);
  });
});
var dispose = () => {
  Array.from(macroTaskIdSet).forEach((id) => {
    clearTimeout(id);
    macroTaskIdSet.delete(id);
  });
};
var dispatcher_default = {
  schedule,
  dispose
};

// node_modules/devextreme/esm/__internal/scheduler/utils/macro_task_array/methods.js
var macroTaskArrayForEach = function(_0, _1) {
  return __async(this, arguments, function* (array, callback) {
    let step = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
    let macroTaskTimeoutMs = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
    const promises = [];
    const batchesCount = Math.ceil(array.length / step);
    for (let batchIdx = 0; batchIdx < batchesCount; batchIdx += 1) {
      const scheduledTask = dispatcher_default.schedule(() => {
        const startIdx = batchIdx * step;
        const maxIdx = startIdx + step;
        for (let idx = startIdx; idx < maxIdx && void 0 !== array[idx]; idx += 1) {
          callback(array[idx]);
        }
      }, macroTaskTimeoutMs);
      promises.push(scheduledTask);
    }
    yield Promise.all(promises);
  });
};
var macroTaskArrayMap = function(_0, _1) {
  return __async(this, arguments, function* (array, callback) {
    let step = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 100;
    let macroTaskTimeoutMs = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : 0;
    const result = [];
    yield macroTaskArrayForEach(array, (item) => {
      result.push(callback(item));
    }, step, macroTaskTimeoutMs);
    return result;
  });
};

// node_modules/devextreme/esm/__internal/scheduler/utils/macro_task_array/index.js
var macro_task_array_default = {
  forEach: macroTaskArrayForEach,
  map: macroTaskArrayMap,
  dispose: dispatcher_default.dispose
};

// node_modules/devextreme/esm/__internal/core/localization/default_date_names.js
var MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var PERIODS = ["AM", "PM"];
var QUARTERS = ["Q1", "Q2", "Q3", "Q4"];
var cutCaptions = (captions, format) => {
  const lengthByFormat = {
    abbreviated: 3,
    short: 2,
    narrow: 1
  };
  return map(captions, (caption) => caption.substr(0, lengthByFormat[format]));
};
var default_date_names_default = {
  getMonthNames: (format) => cutCaptions(MONTHS, format),
  getDayNames: (format) => cutCaptions(DAYS, format),
  getQuarterNames: (_format) => QUARTERS,
  getPeriodNames: (_format) => PERIODS
};

// node_modules/devextreme/esm/common/core/localization/default_date_names.js
var default_date_names_default2 = default_date_names_default;

// node_modules/devextreme/esm/__internal/core/localization/ldml/date.formatter.js
function leftPad(text, length) {
  while (text.length < length) {
    text = `0${text}`;
  }
  return text;
}
var FORMAT_TYPES = {
  3: "abbreviated",
  4: "wide",
  5: "narrow"
};
var LDML_FORMATTERS = {
  y(date, count, useUtc) {
    let year = date[useUtc ? "getUTCFullYear" : "getFullYear"]();
    if (2 === count) {
      year %= 100;
    }
    return leftPad(year.toString(), count);
  },
  M(date, count, useUtc, dateParts) {
    const month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    const formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, "format")[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  L(date, count, useUtc, dateParts) {
    const month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    const formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getMonthNames(formatType, "standalone")[month];
    }
    return leftPad((month + 1).toString(), Math.min(count, 2));
  },
  Q(date, count, useUtc, dateParts) {
    const month = date[useUtc ? "getUTCMonth" : "getMonth"]();
    const quarter = Math.floor(month / 3);
    const formatType = FORMAT_TYPES[count];
    if (formatType) {
      return dateParts.getQuarterNames(formatType)[quarter];
    }
    return leftPad((quarter + 1).toString(), Math.min(count, 2));
  },
  E(date, count, useUtc, dateParts) {
    const day = date[useUtc ? "getUTCDay" : "getDay"]();
    const formatType = FORMAT_TYPES[count < 3 ? 3 : count];
    return dateParts.getDayNames(formatType)[day];
  },
  a(date, count, useUtc, dateParts) {
    const hours = date[useUtc ? "getUTCHours" : "getHours"]();
    const period = hours < 12 ? 0 : 1;
    const formatType = FORMAT_TYPES[count];
    return dateParts.getPeriodNames(formatType)[period];
  },
  d: (date, count, useUtc) => leftPad(date[useUtc ? "getUTCDate" : "getDate"]().toString(), Math.min(count, 2)),
  H: (date, count, useUtc) => leftPad(date[useUtc ? "getUTCHours" : "getHours"]().toString(), Math.min(count, 2)),
  h(date, count, useUtc) {
    const hours = date[useUtc ? "getUTCHours" : "getHours"]();
    return leftPad((hours % 12 || 12).toString(), Math.min(count, 2));
  },
  m: (date, count, useUtc) => leftPad(date[useUtc ? "getUTCMinutes" : "getMinutes"]().toString(), Math.min(count, 2)),
  s: (date, count, useUtc) => leftPad(date[useUtc ? "getUTCSeconds" : "getSeconds"]().toString(), Math.min(count, 2)),
  S: (date, count, useUtc) => leftPad(date[useUtc ? "getUTCMilliseconds" : "getMilliseconds"]().toString(), 3).substr(0, count),
  x(date, count, useUtc) {
    const timezoneOffset = useUtc ? 0 : date.getTimezoneOffset();
    const signPart = timezoneOffset > 0 ? "-" : "+";
    const timezoneOffsetAbs = Math.abs(timezoneOffset);
    const hours = Math.floor(timezoneOffsetAbs / 60);
    const minutes = timezoneOffsetAbs % 60;
    const hoursPart = leftPad(hours.toString(), 2);
    const minutesPart = leftPad(minutes.toString(), 2);
    return signPart + hoursPart + (count >= 3 ? ":" : "") + (count > 1 || minutes ? minutesPart : "");
  },
  X(date, count, useUtc) {
    if (useUtc || !date.getTimezoneOffset()) {
      return "Z";
    }
    return LDML_FORMATTERS.x(date, count, useUtc);
  },
  Z: (date, count, useUtc) => LDML_FORMATTERS.X(date, count >= 5 ? 3 : 2, useUtc)
};
var getFormatter = (format, dateParts) => (date) => {
  let charIndex;
  let formatter;
  let char;
  let charCount = 0;
  let isEscaping = false;
  let isCurrentCharEqualsNext;
  let result = "";
  if (!date) {
    return null;
  }
  if (!format) {
    return date;
  }
  const useUtc = format.endsWith("Z") || format.endsWith("'Z'");
  for (charIndex = 0; charIndex < format.length; charIndex += 1) {
    char = format[charIndex];
    formatter = LDML_FORMATTERS[char];
    isCurrentCharEqualsNext = char === format[charIndex + 1];
    charCount += 1;
    if (!isCurrentCharEqualsNext) {
      if (formatter && !isEscaping) {
        result += formatter(date, charCount, useUtc, dateParts);
      }
      charCount = 0;
    }
    if ("'" === char && !isCurrentCharEqualsNext) {
      isEscaping = !isEscaping;
    } else if (isEscaping || !formatter) {
      result += char;
    }
    if ("'" === char && isCurrentCharEqualsNext) {
      charIndex += 1;
    }
  }
  return result;
};

// node_modules/devextreme/esm/__internal/core/utils/m_date_serialization.js
var ISO_PARTIAL_DATE_PATTERN = /^\d{4,}(-\d{2})?$/;
var ISO8601_PATTERN = /^(\d{4,})(-)?(\d{2})(-)?(\d{2})(?:T(\d{2})(:)?(\d{2})?(:)?(\d{2}(?:\.(\d{1,3})\d*)?)?)?(Z|([+-])(\d{2})(:)?(\d{2})?)?$/;
var ISO8601_TIME_PATTERN = /^(\d{2}):(\d{2})(:(\d{2}))?$/;
var ISO8601_PATTERN_PARTS = ["", "yyyy", "", "MM", "", "dd", "THH", "", "mm", "", "ss", ".SSS"];
var DATE_SERIALIZATION_PATTERN = /^(\d{4})\/(\d{2})\/(\d{2})$/;
var dateParser = function(text, skipISO8601Parsing) {
  let result;
  if (isString(text) && !skipISO8601Parsing) {
    result = parseISO8601String(text);
  }
  return result || parseDate(text);
};
function getTimePart(part) {
  return +part || 0;
}
function createLocalDateFromUTCTimestamp(timestamp) {
  const utc = new Date(timestamp);
  return new Date(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate());
}
function isISOPartialDateString(text) {
  return ISO_PARTIAL_DATE_PATTERN.test(text);
}
function parseDate(text) {
  const isDefaultSerializationFormat = "yyyy/MM/dd" === getDateSerializationFormat(text);
  const parsedValue = !isDate(text) && Date.parse(text);
  if (!parsedValue && isDefaultSerializationFormat) {
    const parts = text.match(DATE_SERIALIZATION_PATTERN);
    if (parts) {
      const newDate = new Date(getTimePart(parts[1]), getTimePart(parts[2]), getTimePart(parts[3]));
      newDate.setFullYear(getTimePart(parts[1]));
      newDate.setMonth(getTimePart(parts[2]) - 1);
      newDate.setDate(getTimePart(parts[3]));
      return newDate;
    }
  }
  if (!isNumeric(parsedValue)) {
    return text;
  }
  return isISOPartialDateString(text) ? createLocalDateFromUTCTimestamp(parsedValue) : new Date(parsedValue);
}
function parseISO8601String(text) {
  let parts = text.match(ISO8601_PATTERN);
  if (!parts) {
    parts = text.match(ISO8601_TIME_PATTERN);
    if (parts) {
      return new Date(0, 0, 0, getTimePart(parts[1]), getTimePart(parts[2]), getTimePart(parts[4]));
    }
    return;
  }
  const year = getTimePart(parts[1]);
  const month = --parts[3];
  const day = parts[5];
  let timeZoneHour = 0;
  let timeZoneMinute = 0;
  const correctYear = (d) => {
    year < 100 && d.setFullYear(year);
    return d;
  };
  timeZoneHour = getTimePart(parts[14]);
  timeZoneMinute = getTimePart(parts[16]);
  if ("-" === parts[13]) {
    timeZoneHour = -timeZoneHour;
    timeZoneMinute = -timeZoneMinute;
  }
  const hour = getTimePart(parts[6]) - timeZoneHour;
  const minute = getTimePart(parts[8]) - timeZoneMinute;
  const second = getTimePart(parts[10]);
  const millisecond = (function(part) {
    part = part || "";
    return getTimePart(part) * 10 ** (3 - part.length);
  })(parts[11]);
  if (parts[12]) {
    return correctYear(new Date(Date.UTC(year, month, day, hour, minute, second, millisecond)));
  }
  return correctYear(new Date(year, month, day, hour, minute, second, millisecond));
}
var getIso8601Format = function(text, useUtc) {
  let parts = text.match(ISO8601_PATTERN);
  let result = "";
  if (!parts) {
    parts = text.match(ISO8601_TIME_PATTERN);
    if (parts) {
      return parts[3] ? "HH:mm:ss" : "HH:mm";
    }
    return;
  }
  for (let i = 1; i < ISO8601_PATTERN_PARTS.length; i++) {
    if (parts[i]) {
      result += ISO8601_PATTERN_PARTS[i] || parts[i];
    }
  }
  if ("Z" === parts[12]) {
    result += "'Z'";
  }
  if (parts[14]) {
    if (parts[15]) {
      result += "xxx";
    } else if (parts[16]) {
      result += "xx";
    } else {
      result += "x";
    }
  }
  return result;
};
var deserializeDate = function(value2) {
  if ("number" === typeof value2) {
    return new Date(value2);
  }
  return dateParser(value2, !config_default().forceIsoDateParsing);
};
var serializeDate = function(value2, serializationFormat) {
  if (!serializationFormat) {
    return value2;
  }
  if (!isDate(value2)) {
    return null;
  }
  if ("number" === serializationFormat) {
    return value2 && value2.valueOf ? value2.valueOf() : null;
  }
  return getFormatter(serializationFormat, default_date_names_default2)(value2);
};
var getDateSerializationFormat = function(value2) {
  if ("number" === typeof value2) {
    return "number";
  }
  if (isString(value2)) {
    let format;
    if (config_default().forceIsoDateParsing) {
      format = getIso8601Format(value2);
    }
    if (format) {
      return format;
    }
    if (value2.includes(":")) {
      return "yyyy/MM/dd HH:mm:ss";
    }
    return "yyyy/MM/dd";
  }
  if (value2) {
    return null;
  }
};
var dateSerialization = {
  createLocalDateFromUTCTimestamp,
  dateParser,
  deserializeDate,
  serializeDate,
  getDateSerializationFormat
};

// node_modules/devextreme/esm/core/utils/date_serialization.js
var date_serialization_default = dateSerialization;

// node_modules/devextreme/esm/__internal/core/utils/m_math.js
var sign = function(value2) {
  if (0 === value2) {
    return 0;
  }
  return value2 / Math.abs(value2);
};
var fitIntoRange = function(value2, minValue, maxValue) {
  const isMinValueUndefined = !minValue && 0 !== minValue;
  const isMaxValueUndefined = !maxValue && 0 !== maxValue;
  isMinValueUndefined && (minValue = !isMaxValueUndefined ? Math.min(value2, maxValue) : value2);
  isMaxValueUndefined && (maxValue = !isMinValueUndefined ? Math.max(value2, minValue) : value2);
  return Math.min(Math.max(value2, minValue), maxValue);
};
var inRange = function(value2, minValue, maxValue) {
  return value2 >= minValue && value2 <= maxValue;
};
function getExponent(value2) {
  const [_, exponentString] = value2.toExponential().split("e");
  return Math.abs(parseInt(exponentString, 10));
}
function getExponentialNotation(value2) {
  const parts = value2.toExponential().split("e");
  const mantissa = parseFloat(parts[0]);
  const exponent = parseInt(parts[1], 10);
  return {
    exponent,
    mantissa
  };
}
function multiplyInExponentialForm(value2, exponentShift) {
  const exponentialNotation = getExponentialNotation(value2);
  return parseFloat(`${exponentialNotation.mantissa}e${exponentialNotation.exponent + exponentShift}`);
}
function adjust(value2, interval) {
  const absValue = Math.abs(value2);
  const integerPart = absValue > 1 ? 10 : 0;
  const precision = getPrecision(interval ?? 0) + 2;
  const finalPrecision = precision > 7 ? 15 : 7;
  const [integerValuePart, fractionalValuePart] = value2.toString().split(".");
  const sourceValue = value2;
  const isExponentValue = isExponential(value2);
  if (isExponentValue) {
    return adjustExponential(value2, finalPrecision);
  }
  if (!fractionalValuePart) {
    return value2;
  }
  if (isExponential(interval)) {
    const expPrecision = integerValuePart.length + getExponent(interval);
    return parseFloat(sourceValue.toPrecision(expPrecision));
  }
  const fractionalPart = absValue - Math.floor(absValue);
  const adjustedValue = integerPart + fractionalPart;
  const separatedAdjustedValue = parseFloat(adjustedValue.toPrecision(finalPrecision)).toString().split(".");
  const isIntPartNotChanged = separatedAdjustedValue[0] === integerPart.toString();
  if (isIntPartNotChanged) {
    return parseFloat(`${integerValuePart}.${separatedAdjustedValue[1]}`);
  }
  return parseFloat(sourceValue.toPrecision(finalPrecision));
}
function adjustExponential(value2, precision) {
  const expValue = value2.toExponential();
  const [mantissa, _exponent] = expValue.split("e");
  if (!mantissa.includes(".")) {
    return parseFloat(expValue);
  }
  return parseFloat(value2.toPrecision(precision));
}
function getPrecision(value2) {
  const str = value2.toString();
  if (!str.includes(".")) {
    return 0;
  }
  const [_, fractionalPart] = str.split(".");
  const positionOfDelimiter = fractionalPart.indexOf("e");
  return positionOfDelimiter >= 0 ? positionOfDelimiter : fractionalPart.length;
}
function getRoot(x, n) {
  if (x < 0 && n % 2 !== 1) {
    return NaN;
  }
  const y = Math.abs(x) ** (1 / n);
  return n % 2 === 1 && x < 0 ? -y : y;
}
function solveCubicEquation(a, b, c, d) {
  if (Math.abs(a) < 1e-8) {
    a = b;
    b = c;
    c = d;
    if (Math.abs(a) < 1e-8) {
      a = b;
      b = c;
      if (Math.abs(a) < 1e-8) {
        return [];
      }
      return [-b / a];
    }
    const D2 = b * b - 4 * a * c;
    if (Math.abs(D2) < 1e-8) {
      return [-b / (2 * a)];
    }
    if (D2 > 0) {
      return [(-b + Math.sqrt(D2)) / (2 * a), (-b - Math.sqrt(D2)) / (2 * a)];
    }
    return [];
  }
  const p = (3 * a * c - b * b) / (3 * a * a);
  const q = (2 * b * b * b - 9 * a * b * c + 27 * a * a * d) / (27 * a * a * a);
  let roots;
  let u;
  if (Math.abs(p) < 1e-8) {
    roots = [getRoot(-q, 3)];
  } else if (Math.abs(q) < 1e-8) {
    roots = [0].concat(p < 0 ? [Math.sqrt(-p), -Math.sqrt(-p)] : []);
  } else {
    const D3 = q * q / 4 + p * p * p / 27;
    if (Math.abs(D3) < 1e-8) {
      roots = [-1.5 * q / p, 3 * q / p];
    } else if (D3 > 0) {
      u = getRoot(-q / 2 - Math.sqrt(D3), 3);
      roots = [u - p / (3 * u)];
    } else {
      u = 2 * Math.sqrt(-p / 3);
      const t = Math.acos(3 * q / p / u) / 3;
      const k = 2 * Math.PI / 3;
      roots = [u * Math.cos(t), u * Math.cos(t - k), u * Math.cos(t - 2 * k)];
    }
  }
  for (let i = 0; i < roots.length; i++) {
    roots[i] -= b / (3 * a);
  }
  return roots;
}
function trunc(value2) {
  return Math.trunc ? Math.trunc(value2) : value2 > 0 ? Math.floor(value2) : Math.ceil(value2);
}
function getRemainderByDivision(dividend, divider, digitsCount) {
  if (divider === parseInt(divider, 10)) {
    return dividend % divider;
  }
  const quotient = roundFloatPart(dividend / divider, digitsCount);
  return (quotient - parseInt(quotient, 10)) * divider;
}
function getExponentLength(value2) {
  var _valueString$split$;
  const valueString = value2.toString();
  return (null === (_valueString$split$ = valueString.split(".")[1]) || void 0 === _valueString$split$ ? void 0 : _valueString$split$.length) || parseInt(valueString.split("e-")[1], 10) || 0;
}
function roundFloatPart(value2) {
  let digitsCount = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  return parseFloat(value2.toFixed(digitsCount));
}

// node_modules/devextreme/esm/__internal/utils/toMilliseconds.js
var timeIntervals = {
  millisecond: 1,
  second: 1e3,
  minute: 6e4,
  hour: 36e5,
  day: 864e5,
  week: 6048e5,
  month: 2592e6,
  quarter: 7776e6,
  year: 31536e6
};
function toMilliseconds(value2) {
  return timeIntervals[value2];
}

// node_modules/devextreme/esm/__internal/core/utils/m_date.js
var dateUnitIntervals = ["millisecond", "second", "minute", "hour", "day", "week", "month", "quarter", "year"];
var getDatesInterval = function(startDate, endDate, intervalUnit) {
  const delta = endDate.getTime() - startDate.getTime();
  const millisecondCount = toMilliseconds(intervalUnit) || 1;
  return Math.floor(delta / millisecondCount);
};
var getNextDateUnit = function(unit, withWeeks) {
  const interval = getDateUnitInterval(unit);
  switch (interval) {
    case "millisecond":
      return "second";
    case "second":
      return "minute";
    case "minute":
      return "hour";
    case "hour":
      return "day";
    case "day":
      return withWeeks ? "week" : "month";
    case "week":
      return "month";
    case "month":
      return "quarter";
    case "quarter":
    case "year":
      return "year";
    default:
      return 0;
  }
};
var convertMillisecondsToDateUnits = function(value2) {
  let i;
  let dateUnitCount;
  let dateUnitInterval;
  const dateUnitIntervals2 = ["millisecond", "second", "minute", "hour", "day", "month", "year"];
  const result = {};
  for (i = dateUnitIntervals2.length - 1; i >= 0; i--) {
    dateUnitInterval = dateUnitIntervals2[i];
    dateUnitCount = Math.floor(value2 / toMilliseconds(dateUnitInterval));
    if (dateUnitCount > 0) {
      result[`${dateUnitInterval}s`] = dateUnitCount;
      value2 -= convertDateUnitToMilliseconds(dateUnitInterval, dateUnitCount);
    }
  }
  return result;
};
var dateToMilliseconds = function(tickInterval) {
  let milliseconds = 0;
  if (isObject(tickInterval)) {
    each(tickInterval, function(key, value2) {
      milliseconds += convertDateUnitToMilliseconds(key.substr(0, key.length - 1), value2);
    });
  }
  if (isString(tickInterval)) {
    milliseconds = convertDateUnitToMilliseconds(tickInterval, 1);
  }
  return milliseconds;
};
function convertDateUnitToMilliseconds(dateUnit, count) {
  return toMilliseconds(dateUnit) * count;
}
function getDateUnitInterval(tickInterval) {
  let maxInterval = -1;
  let i;
  if (isString(tickInterval)) {
    return tickInterval;
  }
  if (isObject(tickInterval)) {
    each(tickInterval, function(key, value2) {
      for (i = 0; i < dateUnitIntervals.length; i++) {
        if (value2 && (key === `${dateUnitIntervals[i]}s` || key === dateUnitIntervals[i]) && maxInterval < i) {
          maxInterval = i;
        }
      }
    });
    return dateUnitIntervals[maxInterval];
  }
  return "";
}
var tickIntervalToFormatMap = {
  millisecond: "millisecond",
  second: "longtime",
  minute: "shorttime",
  hour: "shorttime",
  day: "day",
  week: "day",
  month: "month",
  quarter: "quarter",
  year: "year"
};
function getDateFormatByTickInterval(tickInterval) {
  return tickIntervalToFormatMap[getDateUnitInterval(tickInterval)] || "";
}
var getQuarter = function(month) {
  return Math.floor(month / 3);
};
var getFirstQuarterMonth = function(month) {
  return 3 * getQuarter(month);
};
function correctDateWithUnitBeginning(date, dateInterval, withCorrection, firstDayOfWeek) {
  date = new Date(date.getTime());
  const oldDate = new Date(date.getTime());
  let firstQuarterMonth;
  let month;
  const dateUnitInterval = getDateUnitInterval(dateInterval);
  switch (dateUnitInterval) {
    case "second":
      date = new Date(1e3 * Math.floor(oldDate.getTime() / 1e3));
      break;
    case "minute":
      date = new Date(6e4 * Math.floor(oldDate.getTime() / 6e4));
      break;
    case "hour":
      date = new Date(36e5 * Math.floor(oldDate.getTime() / 36e5));
      break;
    case "year":
      date.setMonth(0);
    case "month":
      date.setDate(1);
    case "day":
      date.setHours(0, 0, 0, 0);
      break;
    case "week":
      date = getFirstWeekDate(date, firstDayOfWeek || 0);
      date.setHours(0, 0, 0, 0);
      break;
    case "quarter":
      firstQuarterMonth = getFirstQuarterMonth(date.getMonth());
      month = date.getMonth();
      date.setDate(1);
      date.setHours(0, 0, 0, 0);
      if (month !== firstQuarterMonth) {
        date.setMonth(firstQuarterMonth);
      }
  }
  if (withCorrection && "hour" !== dateUnitInterval && "minute" !== dateUnitInterval && "second" !== dateUnitInterval) {
    fixTimezoneGap(oldDate, date);
  }
  return date;
}
function trimTime(date) {
  return correctDateWithUnitBeginning(date, "day");
}
var setToDayEnd = function(date) {
  const result = trimTime(date);
  result.setDate(result.getDate() + 1);
  return new Date(result.getTime() - 1);
};
var getDatesDifferences = function(date1, date2) {
  let counter = 0;
  const differences = {
    year: date1.getFullYear() !== date2.getFullYear(),
    month: date1.getMonth() !== date2.getMonth(),
    day: date1.getDate() !== date2.getDate(),
    hour: date1.getHours() !== date2.getHours(),
    minute: date1.getMinutes() !== date2.getMinutes(),
    second: date1.getSeconds() !== date2.getSeconds(),
    millisecond: date1.getMilliseconds() !== date2.getMilliseconds()
  };
  each(differences, function(key, value2) {
    if (value2) {
      counter++;
    }
  });
  if (0 === counter && 0 !== getTimezonesDifference(date1, date2)) {
    differences.hour = true;
    counter++;
  }
  differences.count = counter;
  return differences;
};
function addDateInterval(value2, interval, dir) {
  const result = new Date(value2.getTime());
  const intervalObject = isString(interval) ? getDateIntervalByString(interval.toLowerCase()) : isNumeric(interval) ? convertMillisecondsToDateUnits(interval) : interval;
  if (intervalObject.years) {
    result.setFullYear(result.getFullYear() + intervalObject.years * dir);
  }
  if (intervalObject.quarters) {
    result.setMonth(result.getMonth() + 3 * intervalObject.quarters * dir);
  }
  if (intervalObject.months) {
    result.setMonth(result.getMonth() + intervalObject.months * dir);
  }
  if (intervalObject.weeks) {
    result.setDate(result.getDate() + 7 * intervalObject.weeks * dir);
  }
  if (intervalObject.days) {
    result.setDate(result.getDate() + intervalObject.days * dir);
  }
  if (intervalObject.hours) {
    result.setTime(result.getTime() + 36e5 * intervalObject.hours * dir);
  }
  if (intervalObject.minutes) {
    result.setTime(result.getTime() + 6e4 * intervalObject.minutes * dir);
  }
  if (intervalObject.seconds) {
    result.setTime(result.getTime() + 1e3 * intervalObject.seconds * dir);
  }
  if (intervalObject.milliseconds) {
    result.setTime(result.getTime() + intervalObject.milliseconds * dir);
  }
  return result;
}
var addInterval = function(value2, interval, isNegative) {
  const dir = isNegative ? -1 : 1;
  return isDate(value2) ? addDateInterval(value2, interval, dir) : adjust(value2 + interval * dir, interval);
};
var getSequenceByInterval = function(min, max, interval) {
  const intervals = [];
  let cur;
  intervals.push(isDate(min) ? new Date(min.getTime()) : min);
  cur = min;
  while (cur < max) {
    cur = addInterval(cur, interval);
    intervals.push(cur);
  }
  return intervals;
};
var getViewFirstCellDate = function(viewType, date) {
  if ("month" === viewType) {
    return createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
  }
  if ("year" === viewType) {
    return createDateWithFullYear(date.getFullYear(), 0, date.getDate());
  }
  if ("decade" === viewType) {
    return createDateWithFullYear(getFirstYearInDecade(date), date.getMonth(), date.getDate());
  }
  if ("century" === viewType) {
    return createDateWithFullYear(getFirstDecadeInCentury(date), date.getMonth(), date.getDate());
  }
};
var getViewLastCellDate = function(viewType, date) {
  if ("month" === viewType) {
    return createDateWithFullYear(date.getFullYear(), date.getMonth(), getLastMonthDay(date));
  }
  if ("year" === viewType) {
    return createDateWithFullYear(date.getFullYear(), 11, date.getDate());
  }
  if ("decade" === viewType) {
    return createDateWithFullYear(getFirstYearInDecade(date) + 9, date.getMonth(), date.getDate());
  }
  if ("century" === viewType) {
    return createDateWithFullYear(getFirstDecadeInCentury(date) + 90, date.getMonth(), date.getDate());
  }
};
var getViewMinBoundaryDate = function(viewType, date) {
  const resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth(), 1);
  if ("month" === viewType) {
    return resultDate;
  }
  resultDate.setMonth(0);
  if ("year" === viewType) {
    return resultDate;
  }
  if ("decade" === viewType) {
    resultDate.setFullYear(getFirstYearInDecade(date));
  }
  if ("century" === viewType) {
    resultDate.setFullYear(getFirstDecadeInCentury(date));
  }
  return resultDate;
};
var getViewMaxBoundaryDate = function(viewType, date) {
  const resultDate = new Date(date);
  resultDate.setDate(getLastMonthDay(date));
  if ("month" === viewType) {
    return resultDate;
  }
  resultDate.setMonth(11);
  resultDate.setDate(getLastMonthDay(resultDate));
  if ("year" === viewType) {
    return resultDate;
  }
  if ("decade" === viewType) {
    resultDate.setFullYear(getFirstYearInDecade(date) + 9);
  }
  if ("century" === viewType) {
    resultDate.setFullYear(getFirstDecadeInCentury(date) + 99);
  }
  return resultDate;
};
function getLastMonthDay(date) {
  const resultDate = createDateWithFullYear(date.getFullYear(), date.getMonth() + 1, 0);
  return resultDate.getDate();
}
var getViewUp = function(typeView) {
  switch (typeView) {
    case "month":
      return "year";
    case "year":
      return "decade";
    case "decade":
      return "century";
  }
};
var getViewDown = function(typeView) {
  switch (typeView) {
    case "century":
      return "decade";
    case "decade":
      return "year";
    case "year":
      return "month";
  }
};
var getDifferenceInMonth = function(typeView) {
  let difference = 1;
  if ("year" === typeView) {
    difference = 12;
  }
  if ("decade" === typeView) {
    difference = 120;
  }
  if ("century" === typeView) {
    difference = 1200;
  }
  return difference;
};
var getDifferenceInMonthForCells = function(typeView) {
  let difference = 1;
  if ("decade" === typeView) {
    difference = 12;
  }
  if ("century" === typeView) {
    difference = 120;
  }
  return difference;
};
function getDateIntervalByString(intervalString) {
  const result = {};
  switch (intervalString) {
    case "year":
      result.years = 1;
      break;
    case "month":
      result.months = 1;
      break;
    case "quarter":
      result.months = 3;
      break;
    case "week":
      result.weeks = 1;
      break;
    case "day":
      result.days = 1;
      break;
    case "hour":
      result.hours = 1;
      break;
    case "minute":
      result.minutes = 1;
      break;
    case "second":
      result.seconds = 1;
      break;
    case "millisecond":
      result.milliseconds = 1;
  }
  return result;
}
function sameDate(date1, date2) {
  return sameMonthAndYear(date1, date2) && date1.getDate() === date2.getDate();
}
function sameMonthAndYear(date1, date2) {
  return sameYear(date1, date2) && date1.getMonth() === date2.getMonth();
}
function sameYear(date1, date2) {
  return date1 && date2 && date1.getFullYear() === date2.getFullYear();
}
function sameHoursAndMinutes(date1, date2) {
  return date1 && date2 && date1.getHours() === date2.getHours() && date1.getMinutes() === date2.getMinutes();
}
var sameDecade = function(date1, date2) {
  if (!isDefined(date1) || !isDefined(date2)) {
    return false;
  }
  const startDecadeDate1 = date1.getFullYear() - date1.getFullYear() % 10;
  const startDecadeDate2 = date2.getFullYear() - date2.getFullYear() % 10;
  return date1 && date2 && startDecadeDate1 === startDecadeDate2;
};
var sameCentury = function(date1, date2) {
  if (!isDefined(date1) || !isDefined(date2)) {
    return false;
  }
  const startCenturyDate1 = date1.getFullYear() - date1.getFullYear() % 100;
  const startCenturyDate2 = date2.getFullYear() - date2.getFullYear() % 100;
  return date1 && date2 && startCenturyDate1 === startCenturyDate2;
};
var sameDatesArrays = (arr1, arr2) => {
  if (!Array.isArray(arr1) || !Array.isArray(arr2) || arr1.length !== arr2.length) {
    return false;
  }
  return arr1.every((date1, index) => {
    const date2 = arr2[index];
    if ([date1, date2].some((date) => null !== date && !(date instanceof Date))) {
      return false;
    }
    if (date1 instanceof Date && date2 instanceof Date) {
      return sameDate(date1, date2);
    }
    return date1 === date2;
  });
};
function getFirstDecadeInCentury(date) {
  return date && date.getFullYear() - date.getFullYear() % 100;
}
function getFirstYearInDecade(date) {
  return date && date.getFullYear() - date.getFullYear() % 10;
}
var getShortDateFormat = function() {
  return "yyyy/MM/dd";
};
var getFirstMonthDate = function(date) {
  let offset = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  if (!isDefined(date)) {
    return;
  }
  const currentDate = new Date(date.getTime());
  const month = currentDate.getMonth() + offset;
  currentDate.setMonth(month);
  return createDateWithFullYear(currentDate.getFullYear(), month, 1);
};
var getLastMonthDate = function(date) {
  let offset = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0;
  if (!isDefined(date)) {
    return;
  }
  const currentDate = new Date(date.getTime());
  const month = currentDate.getMonth() + offset;
  currentDate.setMonth(month);
  return createDateWithFullYear(currentDate.getFullYear(), month + 1, 0);
};
function getFirstWeekDate(date, firstDayOfWeek) {
  const delta = (date.getDay() - firstDayOfWeek + 7) % 7;
  const result = new Date(date);
  result.setDate(date.getDate() - delta);
  return result;
}
function getUTCTime(date) {
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}
function getDayNumber(date) {
  const ms = getUTCTime(date) - getUTCTime(getFirstDateInYear(date.getFullYear()));
  return 1 + Math.floor(ms / toMilliseconds("day"));
}
function getFirstDateInYear(year) {
  return new Date(year, 0, 1);
}
function getLastDateInYear(year) {
  return new Date(year, 11, 31);
}
function getDayWeekNumber(date, firstDayOfWeek) {
  let day = date.getDay() - firstDayOfWeek + 1;
  if (day <= 0) {
    day += 7;
  }
  return day;
}
function getWeekNumber(date, firstDayOfWeek, rule) {
  const firstWeekDayInYear = getDayWeekNumber(getFirstDateInYear(date.getFullYear()), firstDayOfWeek);
  const lastWeekDayInYear = getDayWeekNumber(getLastDateInYear(date.getFullYear()), firstDayOfWeek);
  const daysInFirstWeek = 7 - firstWeekDayInYear + 1;
  let weekNumber = Math.ceil((getDayNumber(date) - daysInFirstWeek) / 7);
  switch (rule) {
    case "fullWeek":
      if (7 === daysInFirstWeek) {
        weekNumber += 1;
      }
      if (0 === weekNumber) {
        const lastDateInPreviousYear = getLastDateInYear(date.getFullYear() - 1);
        return getWeekNumber(lastDateInPreviousYear, firstDayOfWeek, rule);
      }
      return weekNumber;
    case "firstDay": {
      if (daysInFirstWeek > 0) {
        weekNumber += 1;
      }
      const isSunday = 7 === firstWeekDayInYear || 7 === lastWeekDayInYear;
      if (weekNumber > 52 && !isSunday || 54 === weekNumber) {
        weekNumber = 1;
      }
      return weekNumber;
    }
    case "firstFourDays": {
      if (daysInFirstWeek > 3) {
        weekNumber += 1;
      }
      const isThursday = 4 === firstWeekDayInYear || 4 === lastWeekDayInYear;
      if (weekNumber > 52 && !isThursday) {
        weekNumber = 1;
      }
      if (0 === weekNumber) {
        const lastDateInPreviousYear = getLastDateInYear(date.getFullYear() - 1);
        return getWeekNumber(lastDateInPreviousYear, firstDayOfWeek, rule);
      }
      return weekNumber;
    }
    default:
      return weekNumber;
  }
}
var normalizeDateByWeek = function(date, currentDate) {
  const differenceInDays = dateUtils.getDatesInterval(date, currentDate, "day");
  let resultDate = new Date(date);
  if (differenceInDays >= 6) {
    resultDate = new Date(resultDate.setDate(resultDate.getDate() + 7));
  }
  return resultDate;
};
var dateInRange = function(date, min, max, format) {
  if ("date" === format) {
    min = min && dateUtils.correctDateWithUnitBeginning(min, "day");
    max = max && dateUtils.correctDateWithUnitBeginning(max, "day");
    date = date && dateUtils.correctDateWithUnitBeginning(date, "day");
  }
  return normalizeDate(date, min, max) === date;
};
var intervalsOverlap = function(options) {
  const {
    firstMin,
    firstMax,
    secondMin,
    secondMax
  } = options;
  return firstMin <= secondMin && secondMin <= firstMax || firstMin > secondMin && firstMin < secondMax || firstMin < secondMax && firstMax > secondMax;
};
var dateTimeFromDecimal = function(number) {
  const hours = Math.floor(number);
  const minutes = Math.round(number % 1 * 60);
  return {
    hours,
    minutes
  };
};
var roundDateByStartDayHour = function(date, startDayHour) {
  const startTime = this.dateTimeFromDecimal(startDayHour);
  const result = new Date(date);
  if (date.getHours() === startTime.hours && date.getMinutes() < startTime.minutes || date.getHours() < startTime.hours) {
    result.setHours(startTime.hours, startTime.minutes, 0, 0);
  }
  return result;
};
function normalizeDate(date, min, max) {
  let normalizedDate = date;
  if (!isDefined(date)) {
    return date;
  }
  if (isDefined(min) && date < min) {
    normalizedDate = min;
  }
  if (isDefined(max) && date > max) {
    normalizedDate = max;
  }
  return normalizedDate;
}
function fixTimezoneGap(oldDate, newDate) {
  if (!isDefined(oldDate)) {
    return;
  }
  const diff = newDate.getHours() - oldDate.getHours();
  if (0 === diff) {
    return;
  }
  const sign2 = 1 === diff || -23 === diff ? -1 : 1;
  const trial = new Date(newDate.getTime() + 36e5 * sign2);
  if (sign2 > 0 || trial.getDate() === newDate.getDate()) {
    newDate.setTime(trial.getTime());
  }
}
var roundToHour = function(date) {
  const result = new Date(date.getTime());
  result.setHours(result.getHours() + 1);
  result.setMinutes(0);
  return result;
};
function getTimezonesDifference(min, max) {
  return 60 * (max.getTimezoneOffset() - min.getTimezoneOffset()) * 1e3;
}
var makeDate = function(date) {
  return new Date(date);
};
var getDatesOfInterval = function(startDate, endDate, step) {
  const result = [];
  let currentDate = new Date(startDate.getTime());
  while (currentDate < endDate) {
    result.push(new Date(currentDate.getTime()));
    currentDate = this.addInterval(currentDate, step);
  }
  return result;
};
var createDateWithFullYear = function(year) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  const result = new Date(year, ...args);
  result.setFullYear(year);
  return result;
};
var getMachineTimezoneName = () => {
  const hasIntl = "undefined" !== typeof Intl;
  return hasIntl ? Intl.DateTimeFormat().resolvedOptions().timeZone : null;
};
var getRangesByDates = (dates) => {
  const datesInMilliseconds = dates.map((value2) => correctDateWithUnitBeginning(value2, "day").getTime());
  const sortedDates = datesInMilliseconds.sort((a, b) => a - b);
  const msInDay = toMilliseconds("day");
  const ranges = [];
  let startDate = sortedDates[0];
  for (let i = 1; i <= sortedDates.length; ++i) {
    const nextDate = sortedDates[i];
    const currentDate = sortedDates[i - 1];
    const isNewRange = nextDate - currentDate > msInDay;
    if (isNewRange || i === sortedDates.length) {
      const range = startDate === sortedDates[i - 1] ? [startDate] : [startDate, sortedDates[i - 1]];
      const serializedRange = range.map((value2) => date_serialization_default.deserializeDate(value2));
      ranges.push(serializedRange);
      startDate = nextDate;
    }
  }
  return ranges;
};
var sameView = function(view, date1, date2) {
  return dateUtils[camelize(`same ${view}`)](date1, date2);
};
var dateUtils = {
  dateUnitIntervals,
  convertMillisecondsToDateUnits,
  dateToMilliseconds,
  getNextDateUnit,
  convertDateUnitToMilliseconds,
  getDateUnitInterval,
  getDateFormatByTickInterval,
  getDatesDifferences,
  correctDateWithUnitBeginning,
  trimTime,
  setToDayEnd,
  roundDateByStartDayHour,
  dateTimeFromDecimal,
  addDateInterval,
  addInterval,
  getSequenceByInterval,
  getDateIntervalByString,
  sameHoursAndMinutes,
  sameDate,
  sameMonthAndYear,
  sameMonth: sameMonthAndYear,
  sameYear,
  sameDecade,
  sameCentury,
  sameView,
  sameDatesArrays,
  getDifferenceInMonth,
  getDifferenceInMonthForCells,
  getFirstYearInDecade,
  getFirstDecadeInCentury,
  getShortDateFormat,
  getViewFirstCellDate,
  getViewLastCellDate,
  getViewDown,
  getViewUp,
  getLastMonthDay,
  getLastMonthDate,
  getFirstMonthDate,
  getFirstWeekDate,
  getWeekNumber,
  normalizeDateByWeek,
  getQuarter,
  getFirstQuarterMonth,
  dateInRange,
  intervalsOverlap,
  roundToHour,
  normalizeDate,
  getViewMinBoundaryDate,
  getViewMaxBoundaryDate,
  fixTimezoneGap,
  getTimezonesDifference,
  makeDate,
  getDatesInterval,
  getDatesOfInterval,
  createDateWithFullYear,
  getMachineTimezoneName,
  getRangesByDates
};

// node_modules/devextreme/esm/core/utils/date.js
var date_default = dateUtils;

// node_modules/devextreme/esm/__internal/scheduler/global_cache.js
var Cache = class {
  constructor() {
    this.cache = /* @__PURE__ */ new Map();
  }
  get size() {
    return this.cache.size;
  }
  clear() {
    this.cache.clear();
  }
  get(name) {
    return this.cache.get(name);
  }
  memo(name, valueCallback) {
    if (!this.cache.has(name)) {
      const value2 = valueCallback();
      if (isDefined(value2)) {
        this.cache.set(name, value2);
      }
    }
    return this.cache.get(name);
  }
  delete(name) {
    this.cache.delete(name);
  }
};
var globalCache = {
  timezones: new Cache(),
  DST: new Cache()
};

// node_modules/devextreme/esm/__internal/scheduler/timezones/timezone_list.js
var timezone_list_default = {
  value: ["Etc/GMT+12", "Etc/GMT+11", "Pacific/Midway", "Pacific/Niue", "Pacific/Pago_Pago", "Pacific/Samoa", "US/Samoa", "Etc/GMT+10", "HST", "Pacific/Honolulu", "Pacific/Johnston", "Pacific/Rarotonga", "Pacific/Tahiti", "US/Hawaii", "Pacific/Marquesas", "America/Adak", "America/Atka", "Etc/GMT+9", "Pacific/Gambier", "US/Aleutian", "America/Anchorage", "America/Juneau", "America/Metlakatla", "America/Nome", "America/Sitka", "America/Yakutat", "Etc/GMT+8", "Pacific/Pitcairn", "US/Alaska", "America/Creston", "America/Dawson_Creek", "America/Dawson", "America/Ensenada", "America/Fort_Nelson", "America/Hermosillo", "America/Los_Angeles", "America/Phoenix", "America/Santa_Isabel", "America/Tijuana", "America/Vancouver", "America/Whitehorse", "Canada/Pacific", "Canada/Yukon", "Etc/GMT+7", "Mexico/BajaNorte", "MST", "PST8PDT", "US/Arizona", "US/Pacific", "America/Belize", "America/Boise", "America/Cambridge_Bay", "America/Chihuahua", "America/Costa_Rica", "America/Denver", "America/Edmonton", "America/El_Salvador", "America/Guatemala", "America/Inuvik", "America/Managua", "America/Mazatlan", "America/Monterrey", "America/Ojinaga", "America/Regina", "America/Shiprock", "America/Swift_Current", "America/Tegucigalpa", "America/Yellowknife", "Canada/Mountain", "Canada/Saskatchewan", "Chile/EasterIsland", "Etc/GMT+6", "Mexico/BajaSur", "MST7MDT", "Navajo", "Pacific/Easter", "Pacific/Galapagos", "US/Mountain", "America/Atikokan", "America/Bahia_Banderas", "America/Bogota", "America/Cancun", "America/Cayman", "America/Chicago", "America/Coral_Harbour", "America/Eirunepe", "America/Guayaquil", "America/Indiana/Knox", "America/Indiana/Tell_City", "America/Jamaica", "America/Knox_IN", "America/Lima", "America/Matamoros", "America/Menominee", "America/Merida", "America/Mexico_City", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem", "America/Panama", "America/Porto_Acre", "America/Rainy_River", "America/Rankin_Inlet", "America/Resolute", "America/Rio_Branco", "America/Winnipeg", "Brazil/Acre", "Canada/Central", "CST6CDT", "EST", "Etc/GMT+5", "Jamaica", "Mexico/General", "US/Central", "US/Indiana-Starke", "America/Anguilla", "America/Antigua", "America/Aruba", "America/Asuncion", "America/Barbados", "America/Blanc-Sablon", "America/Boa_Vista", "America/Campo_Grande", "America/Caracas", "America/Cuiaba", "America/Curacao", "America/Detroit", "America/Dominica", "America/Fort_Wayne", "America/Grand_Turk", "America/Grenada", "America/Guadeloupe", "America/Guyana", "America/Havana", "America/Indiana/Indianapolis", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Indianapolis", "America/Iqaluit", "America/Kentucky/Louisville", "America/Kentucky/Monticello", "America/Kralendijk", "America/La_Paz", "America/Louisville", "America/Lower_Princes", "America/Manaus", "America/Marigot", "America/Martinique", "America/Montreal", "America/Montserrat", "America/Nassau", "America/New_York", "America/Nipigon", "America/Pangnirtung", "America/Port_of_Spain", "America/Port-au-Prince", "America/Porto_Velho", "America/Puerto_Rico", "America/Santiago", "America/Santo_Domingo", "America/St_Barthelemy", "America/St_Kitts", "America/St_Lucia", "America/St_Thomas", "America/St_Vincent", "America/Thunder_Bay", "America/Toronto", "America/Tortola", "America/Virgin", "Brazil/West", "Canada/Eastern", "Chile/Continental", "Cuba", "EST5EDT", "Etc/GMT+4", "US/East-Indiana", "US/Eastern", "US/Michigan", "America/Araguaina", "America/Argentina/Buenos_Aires", "America/Argentina/Catamarca", "America/Argentina/ComodRivadavia", "America/Argentina/Cordoba", "America/Argentina/Jujuy", "America/Argentina/La_Rioja", "America/Argentina/Mendoza", "America/Argentina/Rio_Gallegos", "America/Argentina/Salta", "America/Argentina/San_Juan", "America/Argentina/San_Luis", "America/Argentina/Tucuman", "America/Argentina/Ushuaia", "America/Bahia", "America/Belem", "America/Buenos_Aires", "America/Catamarca", "America/Cayenne", "America/Cordoba", "America/Fortaleza", "America/Glace_Bay", "America/Goose_Bay", "America/Halifax", "America/Jujuy", "America/Maceio", "America/Mendoza", "America/Moncton", "America/Montevideo", "America/Paramaribo", "America/Punta_Arenas", "America/Recife", "America/Rosario", "America/Santarem", "America/Sao_Paulo", "America/Thule", "Antarctica/Palmer", "Antarctica/Rothera", "Atlantic/Bermuda", "Atlantic/Stanley", "Brazil/East", "Canada/Atlantic", "Etc/GMT+3", "America/St_Johns", "Canada/Newfoundland", "America/Godthab", "America/Miquelon", "America/Noronha", "America/Nuuk", "Atlantic/South_Georgia", "Brazil/DeNoronha", "Etc/GMT+2", "Atlantic/Cape_Verde", "Etc/GMT+1", "Africa/Abidjan", "Africa/Accra", "Africa/Bamako", "Africa/Banjul", "Africa/Bissau", "Africa/Conakry", "Africa/Dakar", "Africa/Freetown", "Africa/Lome", "Africa/Monrovia", "Africa/Nouakchott", "Africa/Ouagadougou", "Africa/Sao_Tome", "Africa/Timbuktu", "America/Danmarkshavn", "America/Scoresbysund", "Atlantic/Azores", "Atlantic/Reykjavik", "Atlantic/St_Helena", "Etc/GMT-0", "Etc/GMT", "Etc/GMT+0", "Etc/GMT0", "Etc/Greenwich", "Etc/UCT", "Etc/Universal", "Etc/UTC", "Etc/Zulu", "GMT-0", "GMT", "GMT+0", "GMT0", "Greenwich", "Iceland", "UCT", "Universal", "UTC", "Zulu", "Africa/Algiers", "Africa/Bangui", "Africa/Brazzaville", "Africa/Casablanca", "Africa/Douala", "Africa/El_Aaiun", "Africa/Kinshasa", "Africa/Lagos", "Africa/Libreville", "Africa/Luanda", "Africa/Malabo", "Africa/Ndjamena", "Africa/Niamey", "Africa/Porto-Novo", "Africa/Tunis", "Atlantic/Canary", "Atlantic/Faeroe", "Atlantic/Faroe", "Atlantic/Madeira", "Eire", "Etc/GMT-1", "Europe/Belfast", "Europe/Dublin", "Europe/Guernsey", "Europe/Isle_of_Man", "Europe/Jersey", "Europe/Lisbon", "Europe/London", "GB-Eire", "GB", "Portugal", "WET", "Africa/Blantyre", "Africa/Bujumbura", "Africa/Cairo", "Africa/Ceuta", "Africa/Gaborone", "Africa/Harare", "Africa/Johannesburg", "Africa/Khartoum", "Africa/Kigali", "Africa/Lubumbashi", "Africa/Lusaka", "Africa/Maputo", "Africa/Maseru", "Africa/Mbabane", "Africa/Tripoli", "Africa/Windhoek", "Antarctica/Troll", "Arctic/Longyearbyen", "Atlantic/Jan_Mayen", "CET", "Egypt", "Etc/GMT-2", "Europe/Amsterdam", "Europe/Andorra", "Europe/Belgrade", "Europe/Berlin", "Europe/Bratislava", "Europe/Brussels", "Europe/Budapest", "Europe/Busingen", "Europe/Copenhagen", "Europe/Gibraltar", "Europe/Kaliningrad", "Europe/Ljubljana", "Europe/Luxembourg", "Europe/Madrid", "Europe/Malta", "Europe/Monaco", "Europe/Oslo", "Europe/Paris", "Europe/Podgorica", "Europe/Prague", "Europe/Rome", "Europe/San_Marino", "Europe/Sarajevo", "Europe/Skopje", "Europe/Stockholm", "Europe/Tirane", "Europe/Vaduz", "Europe/Vatican", "Europe/Vienna", "Europe/Warsaw", "Europe/Zagreb", "Europe/Zurich", "Libya", "MET", "Poland", "Africa/Addis_Ababa", "Africa/Asmara", "Africa/Asmera", "Africa/Dar_es_Salaam", "Africa/Djibouti", "Africa/Juba", "Africa/Kampala", "Africa/Mogadishu", "Africa/Nairobi", "Antarctica/Syowa", "Asia/Aden", "Asia/Amman", "Asia/Baghdad", "Asia/Bahrain", "Asia/Beirut", "Asia/Damascus", "Asia/Famagusta", "Asia/Gaza", "Asia/Hebron", "Asia/Istanbul", "Asia/Jerusalem", "Asia/Kuwait", "Asia/Nicosia", "Asia/Qatar", "Asia/Riyadh", "Asia/Tel_Aviv", "EET", "Etc/GMT-3", "Europe/Athens", "Europe/Bucharest", "Europe/Chisinau", "Europe/Helsinki", "Europe/Istanbul", "Europe/Kiev", "Europe/Kirov", "Europe/Mariehamn", "Europe/Minsk", "Europe/Moscow", "Europe/Nicosia", "Europe/Riga", "Europe/Simferopol", "Europe/Sofia", "Europe/Tallinn", "Europe/Tiraspol", "Europe/Uzhgorod", "Europe/Vilnius", "Europe/Zaporozhye", "Indian/Antananarivo", "Indian/Comoro", "Indian/Mayotte", "Israel", "Turkey", "W-SU", "Asia/Baku", "Asia/Dubai", "Asia/Muscat", "Asia/Tbilisi", "Asia/Yerevan", "Etc/GMT-4", "Europe/Astrakhan", "Europe/Samara", "Europe/Saratov", "Europe/Ulyanovsk", "Europe/Volgograd", "Indian/Mahe", "Indian/Mauritius", "Indian/Reunion", "Asia/Kabul", "Asia/Tehran", "Iran", "Antarctica/Mawson", "Asia/Aqtau", "Asia/Aqtobe", "Asia/Ashgabat", "Asia/Ashkhabad", "Asia/Atyrau", "Asia/Dushanbe", "Asia/Karachi", "Asia/Oral", "Asia/Qyzylorda", "Asia/Samarkand", "Asia/Tashkent", "Asia/Yekaterinburg", "Etc/GMT-5", "Indian/Kerguelen", "Indian/Maldives", "Asia/Calcutta", "Asia/Colombo", "Asia/Kolkata", "Asia/Kathmandu", "Asia/Katmandu", "Antarctica/Vostok", "Asia/Almaty", "Asia/Bishkek", "Asia/Dacca", "Asia/Dhaka", "Asia/Kashgar", "Asia/Omsk", "Asia/Qostanay", "Asia/Thimbu", "Asia/Thimphu", "Asia/Urumqi", "Etc/GMT-6", "Indian/Chagos", "Asia/Rangoon", "Asia/Yangon", "Indian/Cocos", "Antarctica/Davis", "Asia/Bangkok", "Asia/Barnaul", "Asia/Ho_Chi_Minh", "Asia/Hovd", "Asia/Jakarta", "Asia/Krasnoyarsk", "Asia/Novokuznetsk", "Asia/Novosibirsk", "Asia/Phnom_Penh", "Asia/Pontianak", "Asia/Saigon", "Asia/Tomsk", "Asia/Vientiane", "Etc/GMT-7", "Indian/Christmas", "Antarctica/Casey", "Asia/Brunei", "Asia/Choibalsan", "Asia/Chongqing", "Asia/Chungking", "Asia/Harbin", "Asia/Hong_Kong", "Asia/Irkutsk", "Asia/Kuala_Lumpur", "Asia/Kuching", "Asia/Macao", "Asia/Macau", "Asia/Makassar", "Asia/Manila", "Asia/Shanghai", "Asia/Singapore", "Asia/Taipei", "Asia/Ujung_Pandang", "Asia/Ulaanbaatar", "Asia/Ulan_Bator", "Australia/Perth", "Australia/West", "Etc/GMT-8", "Hongkong", "PRC", "ROC", "Singapore", "Australia/Eucla", "Asia/Chita", "Asia/Dili", "Asia/Jayapura", "Asia/Khandyga", "Asia/Pyongyang", "Asia/Seoul", "Asia/Tokyo", "Asia/Yakutsk", "Etc/GMT-9", "Japan", "Pacific/Palau", "ROK", "Australia/Adelaide", "Australia/Broken_Hill", "Australia/Darwin", "Australia/North", "Australia/South", "Australia/Yancowinna", "Antarctica/DumontDUrville", "Asia/Ust-Nera", "Asia/Vladivostok", "Australia/ACT", "Australia/Brisbane", "Australia/Canberra", "Australia/Currie", "Australia/Hobart", "Australia/Lindeman", "Australia/Melbourne", "Australia/NSW", "Australia/Queensland", "Australia/Sydney", "Australia/Tasmania", "Australia/Victoria", "Etc/GMT-10", "Pacific/Chuuk", "Pacific/Guam", "Pacific/Port_Moresby", "Pacific/Saipan", "Pacific/Truk", "Pacific/Yap", "Australia/LHI", "Australia/Lord_Howe", "Antarctica/Macquarie", "Asia/Magadan", "Asia/Sakhalin", "Asia/Srednekolymsk", "Etc/GMT-11", "Pacific/Bougainville", "Pacific/Efate", "Pacific/Guadalcanal", "Pacific/Kosrae", "Pacific/Norfolk", "Pacific/Noumea", "Pacific/Pohnpei", "Pacific/Ponape", "Antarctica/McMurdo", "Antarctica/South_Pole", "Asia/Anadyr", "Asia/Kamchatka", "Etc/GMT-12", "Kwajalein", "NZ", "Pacific/Auckland", "Pacific/Fiji", "Pacific/Funafuti", "Pacific/Kwajalein", "Pacific/Majuro", "Pacific/Nauru", "Pacific/Tarawa", "Pacific/Wake", "Pacific/Wallis", "NZ-CHAT", "Pacific/Chatham", "Etc/GMT-13", "Pacific/Apia", "Pacific/Enderbury", "Pacific/Fakaofo", "Pacific/Tongatapu", "Etc/GMT-14", "Pacific/Kiritimati"]
};

// node_modules/devextreme/esm/__internal/scheduler/m_utils_time_zone.js
var timeZoneListSet = new Set(timezone_list_default.value);
var toMs = date_default.dateToMilliseconds;
var GMT = "GMT";
var offsetFormatRegexp = /^GMT(?:[+-]\d{2}:\d{2})?$/;
var createUTCDateWithLocalOffset = (date) => {
  if (!date) {
    return date;
  }
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()));
};
var createDateFromUTCWithLocalOffset = (date) => new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds());
var getTimezoneOffsetChangeInMinutes = (startDate, endDate, updatedStartDate, updatedEndDate) => getDaylightOffset(updatedStartDate, updatedEndDate) - getDaylightOffset(startDate, endDate);
var getTimezoneOffsetChangeInMs = (startDate, endDate, updatedStartDate, updatedEndDate) => getTimezoneOffsetChangeInMinutes(startDate, endDate, updatedStartDate, updatedEndDate) * toMs("minute");
var getDaylightOffset = (startDate, endDate) => new Date(startDate).getTimezoneOffset() - new Date(endDate).getTimezoneOffset();
var getDaylightOffsetInMs = (startDate, endDate) => getDaylightOffset(startDate, endDate) * toMs("minute");
var calculateTimezoneByValueCore = function(timeZone) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  const offset = getStringOffset(timeZone, date);
  if (void 0 === offset) {
    return;
  }
  if (offset === GMT) {
    return 0;
  }
  const isMinus = "-" === offset.substring(3, 4);
  const hours = offset.substring(4, 6);
  const minutes = offset.substring(7, 9);
  const result = parseInt(hours, 10) + parseInt(minutes, 10) / 60;
  return isMinus ? -result : result;
};
var calculateTimezoneByValue = function(timeZone) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  if (!timeZone) {
    return;
  }
  const isValidTimezone = timeZoneListSet.has(timeZone);
  if (!isValidTimezone) {
    errors_default.log("W0009", timeZone);
    return;
  }
  const dateObj = new Date(date);
  if (!dateUtilsTs.isValidDate(dateObj)) {
    return;
  }
  if (isEqualLocalTimeZone(timeZone)) {
    return -dateObj.getTimezoneOffset() / 60;
  }
  return calculateTimezoneByValueCore(timeZone, dateObj);
};
var getStringOffset = function(timeZone) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  let result = "";
  try {
    var _dateTimeFormat$forma;
    const dateTimeFormat = globalCache.timezones.memo(`intl${timeZone}`, () => new Intl.DateTimeFormat("en-US", {
      timeZone,
      timeZoneName: "longOffset"
    }));
    result = (null === (_dateTimeFormat$forma = dateTimeFormat.formatToParts(date).find((_ref) => {
      let {
        type
      } = _ref;
      return "timeZoneName" === type;
    })) || void 0 === _dateTimeFormat$forma ? void 0 : _dateTimeFormat$forma.value) ?? "";
  } catch (e) {
    errors_default.log("W0009", timeZone);
    return;
  }
  const isSupportedFormat = offsetFormatRegexp.test(result);
  if (!isSupportedFormat) {
    errors_default.log("W0009", timeZone);
    return;
  }
  return result;
};
var getOffsetNamePart = (offset) => {
  if (offset === GMT) {
    return `${offset} +00:00`;
  }
  return offset.replace(GMT, `${GMT} `);
};
var getTimezoneTitle = function(timeZone) {
  let date = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  if (!dateUtilsTs.isValidDate(date)) {
    return "";
  }
  const tzNamePart = timeZone.replace(/\//g, " - ").replace(/_/g, " ");
  const offset = getStringOffset(timeZone, date);
  if (void 0 === offset) {
    return;
  }
  const offsetNamePart = getOffsetNamePart(offset);
  return `(${offsetNamePart}) ${tzNamePart}`;
};
var _getDaylightOffsetByTimezone = (startDate, endDate, timeZone) => {
  const startDayOffset = calculateTimezoneByValue(timeZone, startDate);
  const endDayOffset = calculateTimezoneByValue(timeZone, endDate);
  if (void 0 === startDayOffset || void 0 === endDayOffset) {
    return 0;
  }
  return startDayOffset - endDayOffset;
};
var getCorrectedDateByDaylightOffsets = (convertedOriginalStartDate, convertedDate, date, timeZone, startDateTimezone) => {
  const daylightOffsetByCommonTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, timeZone);
  const daylightOffsetByAppointmentTimezone = _getDaylightOffsetByTimezone(convertedOriginalStartDate, convertedDate, startDateTimezone);
  const diff = daylightOffsetByCommonTimezone - daylightOffsetByAppointmentTimezone;
  return new Date(date.getTime() - diff * toMs("hour"));
};
var correctRecurrenceExceptionByTimezone = (exception, exceptionByStartDate) => {
  const timezoneOffset = (exception.getTimezoneOffset() - exceptionByStartDate.getTimezoneOffset()) / 60;
  return new Date(exception.getTime() + timezoneOffset * toMs("hour"));
};
var isTimezoneChangeInDate = (date) => {
  const startDayDate = new Date(new Date(date).setHours(0, 0, 0, 0));
  const endDayDate = new Date(new Date(date).setHours(23, 59, 59, 0));
  return startDayDate.getTimezoneOffset() - endDayDate.getTimezoneOffset() !== 0;
};
var getDateWithoutTimezoneChange = (date) => {
  const clonedDate = new Date(date);
  if (isTimezoneChangeInDate(clonedDate)) {
    const result = new Date(clonedDate);
    return new Date(result.setDate(result.getDate() + 1));
  }
  return clonedDate;
};
var isSameAppointmentDates = (startDate, endDate) => {
  endDate = new Date(endDate.getTime() - 1);
  return date_default.sameDate(startDate, endDate);
};
var getClientTimezoneOffset = function() {
  let date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : /* @__PURE__ */ new Date();
  return 6e4 * date.getTimezoneOffset();
};
var getDiffBetweenClientTimezoneOffsets = function() {
  let firstDate = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : /* @__PURE__ */ new Date();
  let secondDate = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : /* @__PURE__ */ new Date();
  return getClientTimezoneOffset(firstDate) - getClientTimezoneOffset(secondDate);
};
var getMachineTimezoneName2 = () => globalCache.timezones.memo("localTimezone", () => date_default.getMachineTimezoneName());
var isEqualLocalTimeZone = (timeZoneName) => {
  const localTimeZoneName = getMachineTimezoneName2();
  if (localTimeZoneName && localTimeZoneName === timeZoneName) {
    return true;
  }
  return false;
};
var addOffsetsWithoutDST = function(date) {
  for (var _len = arguments.length, offsets = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    offsets[_key - 1] = arguments[_key];
  }
  const newDate = dateUtilsTs.addOffsets(date, ...offsets);
  const daylightShift = getDaylightOffsetInMs(date, newDate);
  if (!daylightShift) {
    return newDate;
  }
  const correctLocalDate = dateUtilsTs.addOffsets(newDate, -daylightShift);
  const daylightSecondShift = getDaylightOffsetInMs(newDate, correctLocalDate);
  return !daylightSecondShift ? correctLocalDate : newDate;
};
var getTimeZones = function() {
  let date = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : /* @__PURE__ */ new Date();
  let timeZones = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : timezone_list_default.value;
  return timeZones.map((timezoneId) => ({
    id: timezoneId,
    title: getTimezoneTitle(timezoneId, date),
    offset: calculateTimezoneByValue(timezoneId, date)
  }));
};
var cacheTimeZones = () => __async(null, null, function* () {
  return globalCache.timezones.memo("timeZonesCachePromise", () => macro_task_array_default.map(timezone_list_default.value, (timezoneId) => ({
    id: timezoneId,
    title: getTimezoneTitle(timezoneId, /* @__PURE__ */ new Date())
  }), 10).then((data) => globalCache.timezones.memo("timeZonesCache", () => data)));
});
var getTimeZonesCache = () => globalCache.timezones.get("timeZonesCache") ?? [];
var isLocalTimeMidnightDST = (date) => {
  const startDayDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return 1 === startDayDate.getHours();
};
var utils = {
  getDaylightOffset,
  getDaylightOffsetInMs,
  getTimezoneOffsetChangeInMinutes,
  getTimezoneOffsetChangeInMs,
  calculateTimezoneByValue,
  getCorrectedDateByDaylightOffsets,
  isSameAppointmentDates,
  correctRecurrenceExceptionByTimezone,
  getClientTimezoneOffset,
  getDiffBetweenClientTimezoneOffsets,
  createUTCDateWithLocalOffset,
  createDateFromUTCWithLocalOffset,
  isTimezoneChangeInDate,
  getDateWithoutTimezoneChange,
  getMachineTimezoneName: getMachineTimezoneName2,
  isEqualLocalTimeZone,
  addOffsetsWithoutDST,
  getTimeZones,
  getTimeZonesCache,
  cacheTimeZones,
  isLocalTimeMidnightDST
};
var m_utils_time_zone_default = utils;

// node_modules/devextreme/esm/common/core/environment/time_zone_utils.js
var getTimeZones2 = m_utils_time_zone_default.getTimeZones;

// node_modules/devextreme/esm/core/devices.js
var devices_default = m_devices_default;

export {
  resize_callbacks_default,
  getSessionStorage,
  changeCallback,
  value,
  originalViewPort,
  m_devices_default,
  hideCallback,
  hide_top_overlay_default,
  inputType,
  pointerEvents,
  touch,
  m_support_default,
  init_mobile_viewport_default,
  macro_task_array_default,
  default_date_names_default,
  getFormatter,
  dateSerialization,
  date_serialization_default,
  sign,
  fitIntoRange,
  inRange,
  getExponent,
  multiplyInExponentialForm,
  adjust,
  getPrecision,
  solveCubicEquation,
  trunc,
  getRemainderByDivision,
  getExponentLength,
  roundFloatPart,
  dateUtils,
  date_default,
  Cache,
  globalCache,
  m_utils_time_zone_default,
  getTimeZones2 as getTimeZones,
  devices_default
};
//# sourceMappingURL=chunk-KTSDTV35.js.map
