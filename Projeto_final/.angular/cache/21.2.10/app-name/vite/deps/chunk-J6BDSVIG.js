import {
  changeCallback,
  devices_default,
  originalViewPort,
  value
} from "./chunk-KTSDTV35.js";
import {
  ui_errors_default
} from "./chunk-V5IPHRES.js";
import {
  getOuterHeight,
  parseHTML,
  ready_callbacks_default,
  renderer_default
} from "./chunk-H2RLU3GL.js";
import {
  Deferred,
  callbacks_default,
  dom_adapter_default,
  each,
  getWindow,
  hasWindow,
  uiLayerInitialized,
  when
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/__internal/ui/m_themes_callback.js
var themeReadyCallback = callbacks_default();

// node_modules/devextreme/esm/__internal/ui/themes.js
var window = getWindow();
var ready = ready_callbacks_default.add;
var viewPort = value;
var viewPortChanged = changeCallback;
var initDeferred = new Deferred();
var DX_LINK_SELECTOR = "link[rel=dx-theme]";
var THEME_ATTR = "data-theme";
var ACTIVE_ATTR = "data-active";
var context;
var $activeThemeLink;
var knownThemes;
var currentThemeName;
var pendingThemeName;
var defaultTimeout = 15e3;
function readThemeMarker() {
  if (!hasWindow()) {
    return null;
  }
  const element = renderer_default("<div>", context).addClass("dx-theme-marker").appendTo(context.documentElement);
  let result;
  try {
    if (!(null !== window && void 0 !== window && window.getComputedStyle)) {
      return null;
    }
    result = window.getComputedStyle(element.get(0)).fontFamily;
    if (!result) {
      return null;
    }
    result = result.replace(/["']/g, "");
    if ("dx." !== result.substr(0, 3)) {
      return null;
    }
    return result.substr(3);
  } finally {
    element.remove();
  }
}
function isPendingThemeLoaded() {
  if (!pendingThemeName) {
    return true;
  }
  const anyThemePending = "any" === pendingThemeName;
  if ("resolved" === initDeferred.state() && anyThemePending) {
    return true;
  }
  const themeMarker = readThemeMarker();
  if (themeMarker && anyThemePending) {
    return true;
  }
  return themeMarker === pendingThemeName;
}
function waitForThemeLoad(themeName) {
  let waitStartTime;
  let timerId;
  let intervalCleared = true;
  pendingThemeName = themeName;
  function handleLoaded() {
    pendingThemeName = null;
    clearInterval(timerId);
    intervalCleared = true;
    themeReadyCallback.fire();
    themeReadyCallback.empty();
    initDeferred.resolve();
  }
  if (isPendingThemeLoaded() || !defaultTimeout) {
    handleLoaded();
  } else {
    if (!intervalCleared) {
      if (pendingThemeName) {
        pendingThemeName = themeName;
      }
      return;
    }
    waitStartTime = Date.now();
    intervalCleared = false;
    timerId = setInterval(() => {
      const isLoaded = isPendingThemeLoaded();
      const isTimeout = !isLoaded && Date.now() - waitStartTime > defaultTimeout;
      if (isTimeout) {
        ui_errors_default.log("W0004", pendingThemeName);
      }
      if (isLoaded || isTimeout) {
        handleLoaded();
      }
    }, 10);
  }
}
function processMarkup() {
  const $allThemeLinks = renderer_default(DX_LINK_SELECTOR, context);
  if (!$allThemeLinks.length) {
    return;
  }
  knownThemes = {};
  $activeThemeLink = renderer_default(parseHTML("<link rel=stylesheet>"), context);
  $allThemeLinks.each(function() {
    const link = renderer_default(this, context);
    const fullThemeName = link.attr(THEME_ATTR);
    const url = link.attr("href");
    const isActive = "true" === link.attr(ACTIVE_ATTR);
    knownThemes[fullThemeName] = {
      url,
      isActive
    };
  });
  $allThemeLinks.last().after($activeThemeLink);
  $allThemeLinks.remove();
}
function resolveFullThemeName(desiredThemeName) {
  const desiredThemeParts = desiredThemeName ? desiredThemeName.split(".") : [];
  let result = null;
  if (knownThemes) {
    if (desiredThemeName in knownThemes) {
      return desiredThemeName;
    }
    each(knownThemes, (knownThemeName, themeData) => {
      const knownThemeParts = knownThemeName.split(".");
      if (desiredThemeParts[0] && knownThemeParts[0] !== desiredThemeParts[0]) {
        return;
      }
      if (desiredThemeParts[1] && desiredThemeParts[1] !== knownThemeParts[1]) {
        return;
      }
      if (desiredThemeParts[2] && desiredThemeParts[2] !== knownThemeParts[2]) {
        return;
      }
      if (!result || themeData.isActive) {
        result = knownThemeName;
      }
      if (themeData.isActive) {
        return false;
      }
    });
  }
  return result;
}
function initContext(newContext) {
  try {
    if (newContext !== context) {
      knownThemes = null;
    }
  } catch (x) {
    knownThemes = null;
  }
  context = newContext;
}
function getCssClasses(themeName) {
  var _themeName;
  themeName = themeName || current();
  const result = [];
  const themeNameParts = null === (_themeName = themeName) || void 0 === _themeName ? void 0 : _themeName.split(".");
  if (themeNameParts) {
    result.push(`dx-theme-${themeNameParts[0]}`, `dx-theme-${themeNameParts[0]}-typography`);
    if (themeNameParts.length > 1) {
      result.push(`dx-color-scheme-${themeNameParts[1]}${isMaterialBased(themeName) ? `-${themeNameParts[2]}` : ""}`);
    }
  }
  return result;
}
var themeClasses;
function _attachCssClasses(element, themeName) {
  themeClasses = getCssClasses(themeName).join(" ");
  renderer_default(element).addClass(themeClasses);
  (() => {
    const pixelRatio = hasWindow() && window.devicePixelRatio;
    if (!pixelRatio || pixelRatio < 2) {
      return;
    }
    const $tester = renderer_default("<div>");
    $tester.css("border", ".5px solid transparent");
    renderer_default("body").append($tester);
    if (1 === getOuterHeight($tester)) {
      renderer_default(element).addClass("dx-hairlines");
      themeClasses += " dx-hairlines";
    }
    $tester.remove();
  })();
}
function attachCssClasses(element, themeName) {
  when(uiLayerInitialized).done(() => {
    _attachCssClasses(element, themeName);
  });
}
function detachCssClasses(element) {
  when(uiLayerInitialized).done(() => {
    renderer_default(element).removeClass(themeClasses);
  });
}
function current(options) {
  if (!arguments.length) {
    currentThemeName = currentThemeName || readThemeMarker();
    return currentThemeName;
  }
  detachCssClasses(viewPort());
  options = options || {};
  if ("string" === typeof options) {
    options = {
      theme: options
    };
  }
  const isAutoInit = options._autoInit;
  const {
    loadCallback
  } = options;
  let currentThemeData;
  currentThemeName = resolveFullThemeName(options.theme || currentThemeName);
  if (currentThemeName) {
    currentThemeData = knownThemes[currentThemeName];
  }
  if (loadCallback) {
    themeReadyCallback.add(loadCallback);
  }
  if (currentThemeData) {
    $activeThemeLink.attr("href", knownThemes[currentThemeName].url);
    if (themeReadyCallback.has() || "resolved" !== initDeferred.state() || options._forceTimeout) {
      waitForThemeLoad(currentThemeName);
    }
  } else if (isAutoInit) {
    if (hasWindow()) {
      waitForThemeLoad("any");
    }
    themeReadyCallback.fire();
    themeReadyCallback.empty();
  } else {
    throw ui_errors_default.Error("E0021", currentThemeName);
  }
  initDeferred.done(() => attachCssClasses(originalViewPort(), currentThemeName));
}
function init(options) {
  options = options || {};
  initContext(options.context || dom_adapter_default.getDocument());
  if (!context) {
    return;
  }
  processMarkup();
  currentThemeName = void 0;
  current(options);
}
function isTheme(themeRegExp, themeName) {
  if (!themeName) {
    themeName = currentThemeName || readThemeMarker();
  }
  return new RegExp(themeRegExp).test(themeName);
}
function isMaterial(themeName) {
  return isTheme("material", themeName);
}
function isFluent(themeName) {
  return isTheme("fluent", themeName);
}
function isMaterialBased(themeName) {
  return isMaterial(themeName) || isFluent(themeName);
}
function isGeneric(themeName) {
  return isTheme("generic", themeName);
}
function isDark(themeName) {
  return isTheme("dark", themeName);
}
function isCompact(themeName) {
  return isTheme("compact", themeName);
}
function themeReady(callback) {
  themeReadyCallback.add(callback);
}
function isWebFontLoaded(text, fontWeight) {
  var _testElement$parentNo;
  const document = dom_adapter_default.getDocument();
  const testElement = document.createElement("span");
  testElement.style.position = "absolute";
  testElement.style.top = "-9999px";
  testElement.style.left = "-9999px";
  testElement.style.visibility = "hidden";
  testElement.style.fontFamily = "arial";
  testElement.style.fontSize = "250px";
  testElement.style.fontWeight = fontWeight;
  testElement.innerHTML = text;
  document.body.appendChild(testElement);
  const etalonFontWidth = testElement.offsetWidth;
  testElement.style.fontFamily = "roboto, 'roboto fallback', arial";
  const testedFontWidth = testElement.offsetWidth;
  null === (_testElement$parentNo = testElement.parentNode) || void 0 === _testElement$parentNo || _testElement$parentNo.removeChild(testElement);
  return etalonFontWidth !== testedFontWidth;
}
function waitWebFont(text, fontWeight) {
  return new Promise((resolve) => {
    const clear = () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
      resolve();
    };
    const intervalId = setInterval(() => {
      if (isWebFontLoaded(text, fontWeight)) {
        clear();
      }
    }, 15);
    const timeoutId = setTimeout(clear, 2e3);
  });
}
function autoInit() {
  init({
    _autoInit: true,
    _forceTimeout: true
  });
  if (renderer_default(DX_LINK_SELECTOR, context).length) {
    throw ui_errors_default.Error("E0022");
  }
}
if (hasWindow()) {
  autoInit();
} else {
  ready(autoInit);
}
viewPortChanged.add((viewPort2, prevViewPort) => {
  initDeferred.done(() => {
    detachCssClasses(prevViewPort);
    attachCssClasses(viewPort2);
  });
});
devices_default.changed.add(() => {
  init({
    _autoInit: true
  });
});
function resetTheme() {
  var _$activeThemeLink;
  null === (_$activeThemeLink = $activeThemeLink) || void 0 === _$activeThemeLink || _$activeThemeLink.attr("href", "about:blank");
  currentThemeName = null;
  pendingThemeName = null;
  initDeferred = new Deferred();
}
function initialized(callback) {
  initDeferred.done(callback);
}
function setDefaultTimeout(timeout) {
  defaultTimeout = timeout;
}
var themes_default = {
  setDefaultTimeout,
  init,
  initialized,
  resetTheme,
  ready: themeReady,
  waitWebFont,
  isWebFontLoaded,
  isCompact,
  isDark,
  isGeneric,
  isMaterial,
  isFluent,
  isMaterialBased,
  detachCssClasses,
  attachCssClasses,
  current,
  waitForThemeLoad,
  isPendingThemeLoaded
};

// node_modules/devextreme/esm/ui/themes.js
var {
  setDefaultTimeout: setDefaultTimeout2,
  init: init2,
  initialized: initialized2,
  resetTheme: resetTheme2,
  ready: ready2,
  waitWebFont: waitWebFont2,
  isWebFontLoaded: isWebFontLoaded2,
  isCompact: isCompact2,
  isDark: isDark2,
  isGeneric: isGeneric2,
  isMaterial: isMaterial2,
  isFluent: isFluent2,
  isMaterialBased: isMaterialBased2,
  detachCssClasses: detachCssClasses2,
  attachCssClasses: attachCssClasses2,
  current: current2,
  waitForThemeLoad: waitForThemeLoad2,
  isPendingThemeLoaded: isPendingThemeLoaded2
} = themes_default;
var themes_default2 = themes_default;

export {
  setDefaultTimeout2 as setDefaultTimeout,
  init2 as init,
  initialized2 as initialized,
  resetTheme2 as resetTheme,
  ready2 as ready,
  waitWebFont2 as waitWebFont,
  isWebFontLoaded2 as isWebFontLoaded,
  isCompact2 as isCompact,
  isDark2 as isDark,
  isGeneric2 as isGeneric,
  isMaterial2 as isMaterial,
  isFluent2 as isFluent,
  isMaterialBased2 as isMaterialBased,
  detachCssClasses2 as detachCssClasses,
  attachCssClasses2 as attachCssClasses,
  current2 as current,
  waitForThemeLoad2 as waitForThemeLoad,
  isPendingThemeLoaded2 as isPendingThemeLoaded,
  themes_default2 as themes_default
};
//# sourceMappingURL=chunk-J6BDSVIG.js.map
