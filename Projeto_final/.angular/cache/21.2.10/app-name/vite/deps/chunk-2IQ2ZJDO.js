import {
  ready_callbacks_default,
  renderer_default
} from "./chunk-H2RLU3GL.js";
import {
  one
} from "./chunk-ZF2YRQQJ.js";
import {
  m_events_engine_default
} from "./chunk-WDK64ZWV.js";
import {
  ajax_default,
  http_request_default
} from "./chunk-PTEJQ6I5.js";
import {
  Deferred,
  config_default2 as config_default,
  dom_adapter_default,
  equalByValue
} from "./chunk-CPBGCP6I.js";
import {
  isPlatformServer
} from "./chunk-G6HUHDH7.js";
import {
  XhrFactory
} from "./chunk-NYFTHFMT.js";
import {
  Component,
  DOCUMENT,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  Injector,
  Input,
  IterableDiffers,
  NgModule,
  NgZone,
  Optional,
  PLATFORM_ID,
  Renderer2,
  TemplateRef,
  TransferState,
  VERSION,
  ViewContainerRef,
  createNgModule,
  inject,
  makeStateKey,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵNgOnChangesFeature,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵgetInheritedFactory,
  ɵɵinject
} from "./chunk-G3Y3JP6Z.js";

// node_modules/devextreme/esm/events/events.types.js
var triggerHandler = m_events_engine_default.triggerHandler;

// node_modules/devextreme-angular/fesm2022/devextreme-angular-core.mjs
var DxTemplateHost = class {
  host;
  setHost(host) {
    this.host = host;
  }
  setTemplate(template) {
    this.host.setTemplate(template);
  }
};
var NgEventsStrategy = class {
  instance;
  zone;
  subscriptions = {};
  events = {};
  constructor(instance, zone) {
    this.instance = instance;
    this.zone = zone;
  }
  hasEvent(name) {
    return this.getEmitter(name).observers.length !== 0;
  }
  fireEvent(name, args) {
    const emitter = this.getEmitter(name);
    if (emitter.observers.length) {
      const internalSubs = this.subscriptions[name] || [];
      if (internalSubs.length === emitter.observers.length) {
        emitter.next(args?.[0]);
      } else {
        this.zone.run(() => emitter.next(args?.[0]));
      }
    }
  }
  on(name, handler) {
    if (typeof name === "string") {
      const eventSubscriptions = this.subscriptions[name] || [];
      const subcription = this.getEmitter(name).subscribe(handler?.bind(this.instance));
      const unsubscribe = subcription.unsubscribe.bind(subcription);
      eventSubscriptions.push({
        handler,
        unsubscribe
      });
      this.subscriptions[name] = eventSubscriptions;
    } else {
      const handlersObj = name;
      Object.keys(handlersObj).forEach((event) => this.on(event, handlersObj[event]));
    }
  }
  off(name, handler) {
    const eventSubscriptions = this.subscriptions[name] || [];
    if (handler) {
      eventSubscriptions.some((subscription, i) => {
        if (subscription.handler === handler) {
          subscription.unsubscribe();
          eventSubscriptions.splice(i, 1);
          return true;
        }
        return false;
      });
    } else {
      eventSubscriptions.forEach((subscription) => {
        subscription.unsubscribe();
      });
      eventSubscriptions.splice(0, eventSubscriptions.length);
    }
  }
  dispose() {
  }
  addEmitter(eventName, emitter) {
    this.events[eventName] = emitter;
  }
  getEmitter(eventName) {
    if (!this.events[eventName]) {
      this.events[eventName] = new EventEmitter();
    }
    return this.events[eventName];
  }
};
var EmitterHelper = class {
  zone;
  component;
  lockedValueChangeEvent = false;
  constructor(zone, component) {
    this.zone = zone;
    this.component = component;
  }
  fireNgEvent(eventName, eventArgs) {
    if (this.lockedValueChangeEvent && eventName === "valueChange") {
      return;
    }
    const emitter = this.component[eventName];
    if (emitter?.observers.length) {
      this.zone.run(() => {
        emitter.next(eventArgs?.[0]);
      });
    }
  }
  createEmitters(events) {
    events.forEach((event) => {
      this.component[event.emit] = new EventEmitter();
    });
  }
};
var WatcherHelper = class _WatcherHelper {
  _watchers = [];
  getWatchMethod() {
    const watchMethod = (valueGetter, valueChangeCallback, options) => {
      let oldValue = valueGetter();
      options = options || {};
      if (!options.skipImmediate) {
        valueChangeCallback(oldValue);
      }
      const watcher = () => {
        const newValue = valueGetter();
        if (this._isDifferentValues(oldValue, newValue, options.deep)) {
          valueChangeCallback(newValue);
          oldValue = newValue;
        }
      };
      this._watchers.push(watcher);
      return () => {
        const index = this._watchers.indexOf(watcher);
        if (index !== -1) {
          this._watchers.splice(index, 1);
        }
      };
    };
    return watchMethod;
  }
  _isDifferentValues(oldValue, newValue, deepCheck) {
    const comparableNewValue = this._toComparable(newValue);
    const comparableOldValue = this._toComparable(oldValue);
    const isObjectValues = comparableNewValue instanceof Object && comparableOldValue instanceof Object;
    if (deepCheck && isObjectValues) {
      return this._checkObjectsFields(newValue, oldValue);
    }
    return comparableNewValue !== comparableOldValue;
  }
  _toComparable(value) {
    if (value instanceof Date) {
      return value.getTime();
    }
    return value;
  }
  _checkObjectsFields(checkingFromObject, checkingToObject) {
    for (const field in checkingFromObject) {
      const oldValue = this._toComparable(checkingFromObject[field]);
      const newValue = this._toComparable(checkingToObject[field]);
      let isEqualObjects = false;
      if (typeof oldValue === "object" && typeof newValue === "object") {
        isEqualObjects = equalByValue(oldValue, newValue);
      }
      if (oldValue !== newValue && !isEqualObjects) {
        return true;
      }
    }
  }
  checkWatchers() {
    for (const watcher of this._watchers) {
      watcher();
    }
  }
  /** @nocollapse */
  static ɵfac = function WatcherHelper_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _WatcherHelper)();
  };
  /** @nocollapse */
  static ɵprov = ɵɵdefineInjectable({
    token: _WatcherHelper,
    factory: _WatcherHelper.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(WatcherHelper, [{
    type: Injectable
  }], null, null);
})();
function getElement(element) {
  return element.get ? element.get(0) : element;
}
var DEPRECATED_CONFIG_COMPONENTS = {
  "DxAccordionComponent": {
    "_hostSelector": "dx-accordion",
    "dxi-item": "dxi-accordion-item"
  },
  "DxActionSheetComponent": {
    "_hostSelector": "dx-action-sheet",
    "dxi-item": "dxi-action-sheet-item"
  },
  "DxAutocompleteComponent": {
    "_hostSelector": "dx-autocomplete",
    "dxi-button": "dxi-autocomplete-button",
    "dxi-item": "dxi-autocomplete-item",
    "dxi-toolbar-item": "dxi-autocomplete-toolbar-item",
    "dxo-animation": "dxo-autocomplete-animation",
    "dxo-at": "dxo-autocomplete-at",
    "dxo-boundary-offset": "dxo-autocomplete-boundary-offset",
    "dxo-collision": "dxo-autocomplete-collision",
    "dxo-drop-down-options": "dxo-autocomplete-drop-down-options",
    "dxo-from": "dxo-autocomplete-from",
    "dxo-hide": "dxo-autocomplete-hide",
    "dxo-my": "dxo-autocomplete-my",
    "dxo-offset": "dxo-autocomplete-offset",
    "dxo-options": "dxo-autocomplete-options",
    "dxo-position": "dxo-autocomplete-position",
    "dxo-show": "dxo-autocomplete-show",
    "dxo-to": "dxo-autocomplete-to"
  },
  "DxBarGaugeComponent": {
    "_hostSelector": "dx-bar-gauge",
    "dxo-animation": "dxo-bar-gauge-animation",
    "dxo-border": "dxo-bar-gauge-border",
    "dxo-export": "dxo-bar-gauge-export",
    "dxo-font": "dxo-bar-gauge-font",
    "dxo-format": "dxo-bar-gauge-format",
    "dxo-geometry": "dxo-bar-gauge-geometry",
    "dxo-item-text-format": "dxo-bar-gauge-item-text-format",
    "dxo-label": "dxo-bar-gauge-label",
    "dxo-legend": "dxo-bar-gauge-legend",
    "dxo-loading-indicator": "dxo-bar-gauge-loading-indicator",
    "dxo-margin": "dxo-bar-gauge-margin",
    "dxo-shadow": "dxo-bar-gauge-shadow",
    "dxo-size": "dxo-bar-gauge-size",
    "dxo-subtitle": "dxo-bar-gauge-subtitle",
    "dxo-title": "dxo-bar-gauge-title",
    "dxo-tooltip": "dxo-bar-gauge-tooltip"
  },
  "DxBoxComponent": {
    "_hostSelector": "dx-box",
    "dxi-item": "dxi-box-item"
  },
  "DxBulletComponent": {
    "_hostSelector": "dx-bullet",
    "dxo-border": "dxo-bullet-border",
    "dxo-font": "dxo-bullet-font",
    "dxo-format": "dxo-bullet-format",
    "dxo-margin": "dxo-bullet-margin",
    "dxo-shadow": "dxo-bullet-shadow",
    "dxo-size": "dxo-bullet-size",
    "dxo-tooltip": "dxo-bullet-tooltip"
  },
  "DxButtonGroupComponent": {
    "_hostSelector": "dx-button-group",
    "dxi-item": "dxi-button-group-item"
  },
  "DxCardViewComponent": {
    "_hostSelector": "dx-card-view",
    "dxi-change": "dxi-card-view-change",
    "dxi-column": "dxi-card-view-column",
    "dxi-custom-operation": "dxi-card-view-custom-operation",
    "dxi-field": "dxi-card-view-field",
    "dxi-group-item": "dxi-card-view-group-item",
    "dxi-item": "dxi-card-view-item",
    "dxi-tab": "dxi-card-view-tab",
    "dxi-toolbar-item": "dxi-card-view-toolbar-item",
    "dxi-validation-rule": "dxi-card-view-validation-rule",
    "dxo-animation": "dxo-card-view-animation",
    "dxo-at": "dxo-card-view-at",
    "dxo-boundary-offset": "dxo-card-view-boundary-offset",
    "dxo-button-options": "dxo-card-view-button-options",
    "dxo-col-count-by-screen": "dxo-card-view-col-count-by-screen",
    "dxo-collision": "dxo-card-view-collision",
    "dxo-column-chooser": "dxo-card-view-column-chooser",
    "dxo-editing": "dxo-card-view-editing",
    "dxo-filter-builder": "dxo-card-view-filter-builder",
    "dxo-filter-operation-descriptions": "dxo-card-view-filter-operation-descriptions",
    "dxo-filter-panel": "dxo-card-view-filter-panel",
    "dxo-form": "dxo-card-view-form",
    "dxo-form-item": "dxo-card-view-form-item",
    "dxo-format": "dxo-card-view-format",
    "dxo-from": "dxo-card-view-from",
    "dxo-group-operation-descriptions": "dxo-card-view-group-operation-descriptions",
    "dxo-header-filter": "dxo-card-view-header-filter",
    "dxo-hide": "dxo-card-view-hide",
    "dxo-label": "dxo-card-view-label",
    "dxo-load-panel": "dxo-card-view-load-panel",
    "dxo-lookup": "dxo-card-view-lookup",
    "dxo-my": "dxo-card-view-my",
    "dxo-offset": "dxo-card-view-offset",
    "dxo-pager": "dxo-card-view-pager",
    "dxo-paging": "dxo-card-view-paging",
    "dxo-position": "dxo-card-view-position",
    "dxo-remote-operations": "dxo-card-view-remote-operations",
    "dxo-scrolling": "dxo-card-view-scrolling",
    "dxo-search": "dxo-card-view-search",
    "dxo-search-panel": "dxo-card-view-search-panel",
    "dxo-selection": "dxo-card-view-selection",
    "dxo-show": "dxo-card-view-show",
    "dxo-sorting": "dxo-card-view-sorting",
    "dxo-tab-panel-options": "dxo-card-view-tab-panel-options",
    "dxo-texts": "dxo-card-view-texts",
    "dxo-to": "dxo-card-view-to",
    "dxo-toolbar": "dxo-card-view-toolbar"
  },
  "DxChartComponent": {
    "_hostSelector": "dx-chart",
    "dxi-annotation": "dxi-chart-annotation",
    "dxi-break": "dxi-chart-break",
    "dxi-constant-line": "dxi-chart-constant-line",
    "dxi-pane": "dxi-chart-pane",
    "dxi-series": "dxi-chart-series",
    "dxi-strip": "dxi-chart-strip",
    "dxi-value-axis": "dxi-chart-value-axis",
    "dxo-adaptive-layout": "dxo-chart-adaptive-layout",
    "dxo-aggregation": "dxo-chart-aggregation",
    "dxo-aggregation-interval": "dxo-chart-aggregation-interval",
    "dxo-animation": "dxo-chart-animation",
    "dxo-argument-axis": "dxo-chart-argument-axis",
    "dxo-argument-format": "dxo-chart-argument-format",
    "dxo-background-color": "dxo-chart-background-color",
    "dxo-border": "dxo-chart-border",
    "dxo-break-style": "dxo-chart-break-style",
    "dxo-color": "dxo-chart-color",
    "dxo-common-annotation-settings": "dxo-chart-common-annotation-settings",
    "dxo-common-axis-settings": "dxo-chart-common-axis-settings",
    "dxo-common-pane-settings": "dxo-chart-common-pane-settings",
    "dxo-common-series-settings": "dxo-chart-common-series-settings",
    "dxo-connector": "dxo-chart-connector",
    "dxo-constant-line-style": "dxo-chart-constant-line-style",
    "dxo-crosshair": "dxo-chart-crosshair",
    "dxo-data-prepare-settings": "dxo-chart-data-prepare-settings",
    "dxo-drag-box-style": "dxo-chart-drag-box-style",
    "dxo-export": "dxo-chart-export",
    "dxo-font": "dxo-chart-font",
    "dxo-format": "dxo-chart-format",
    "dxo-grid": "dxo-chart-grid",
    "dxo-hatching": "dxo-chart-hatching",
    "dxo-height": "dxo-chart-height",
    "dxo-horizontal-line": "dxo-chart-horizontal-line",
    "dxo-hover-style": "dxo-chart-hover-style",
    "dxo-image": "dxo-chart-image",
    "dxo-label": "dxo-chart-label",
    "dxo-legend": "dxo-chart-legend",
    "dxo-loading-indicator": "dxo-chart-loading-indicator",
    "dxo-margin": "dxo-chart-margin",
    "dxo-min-visual-range-length": "dxo-chart-min-visual-range-length",
    "dxo-minor-grid": "dxo-chart-minor-grid",
    "dxo-minor-tick": "dxo-chart-minor-tick",
    "dxo-minor-tick-interval": "dxo-chart-minor-tick-interval",
    "dxo-point": "dxo-chart-point",
    "dxo-reduction": "dxo-chart-reduction",
    "dxo-scroll-bar": "dxo-chart-scroll-bar",
    "dxo-selection-style": "dxo-chart-selection-style",
    "dxo-series-template": "dxo-chart-series-template",
    "dxo-shadow": "dxo-chart-shadow",
    "dxo-size": "dxo-chart-size",
    "dxo-strip-style": "dxo-chart-strip-style",
    "dxo-subtitle": "dxo-chart-subtitle",
    "dxo-tick": "dxo-chart-tick",
    "dxo-tick-interval": "dxo-chart-tick-interval",
    "dxo-title": "dxo-chart-title",
    "dxo-tooltip": "dxo-chart-tooltip",
    "dxo-url": "dxo-chart-url",
    "dxo-value-error-bar": "dxo-chart-value-error-bar",
    "dxo-vertical-line": "dxo-chart-vertical-line",
    "dxo-width": "dxo-chart-width",
    "dxo-zoom-and-pan": "dxo-chart-zoom-and-pan"
  },
  "DxChatComponent": {
    "_hostSelector": "dx-chat",
    "dxi-alert": "dxi-chat-alert",
    "dxi-item": "dxi-chat-item",
    "dxi-typing-user": "dxi-chat-typing-user",
    "dxo-author": "dxo-chat-author",
    "dxo-day-header-format": "dxo-chat-day-header-format",
    "dxo-editing": "dxo-chat-editing",
    "dxo-message-timestamp-format": "dxo-chat-message-timestamp-format",
    "dxo-user": "dxo-chat-user"
  },
  "DxCircularGaugeComponent": {
    "_hostSelector": "dx-circular-gauge",
    "dxi-range": "dxi-circular-gauge-range",
    "dxo-animation": "dxo-circular-gauge-animation",
    "dxo-background-color": "dxo-circular-gauge-background-color",
    "dxo-border": "dxo-circular-gauge-border",
    "dxo-color": "dxo-circular-gauge-color",
    "dxo-export": "dxo-circular-gauge-export",
    "dxo-font": "dxo-circular-gauge-font",
    "dxo-format": "dxo-circular-gauge-format",
    "dxo-geometry": "dxo-circular-gauge-geometry",
    "dxo-label": "dxo-circular-gauge-label",
    "dxo-loading-indicator": "dxo-circular-gauge-loading-indicator",
    "dxo-margin": "dxo-circular-gauge-margin",
    "dxo-minor-tick": "dxo-circular-gauge-minor-tick",
    "dxo-range-container": "dxo-circular-gauge-range-container",
    "dxo-scale": "dxo-circular-gauge-scale",
    "dxo-shadow": "dxo-circular-gauge-shadow",
    "dxo-size": "dxo-circular-gauge-size",
    "dxo-subtitle": "dxo-circular-gauge-subtitle",
    "dxo-subvalue-indicator": "dxo-circular-gauge-subvalue-indicator",
    "dxo-text": "dxo-circular-gauge-text",
    "dxo-tick": "dxo-circular-gauge-tick",
    "dxo-title": "dxo-circular-gauge-title",
    "dxo-tooltip": "dxo-circular-gauge-tooltip",
    "dxo-value-indicator": "dxo-circular-gauge-value-indicator"
  },
  "DxColorBoxComponent": {
    "_hostSelector": "dx-color-box",
    "dxi-button": "dxi-color-box-button",
    "dxi-toolbar-item": "dxi-color-box-toolbar-item",
    "dxo-animation": "dxo-color-box-animation",
    "dxo-at": "dxo-color-box-at",
    "dxo-boundary-offset": "dxo-color-box-boundary-offset",
    "dxo-collision": "dxo-color-box-collision",
    "dxo-drop-down-options": "dxo-color-box-drop-down-options",
    "dxo-from": "dxo-color-box-from",
    "dxo-hide": "dxo-color-box-hide",
    "dxo-my": "dxo-color-box-my",
    "dxo-offset": "dxo-color-box-offset",
    "dxo-options": "dxo-color-box-options",
    "dxo-position": "dxo-color-box-position",
    "dxo-show": "dxo-color-box-show",
    "dxo-to": "dxo-color-box-to"
  },
  "DxContextMenuComponent": {
    "_hostSelector": "dx-context-menu",
    "dxi-item": "dxi-context-menu-item",
    "dxo-animation": "dxo-context-menu-animation",
    "dxo-at": "dxo-context-menu-at",
    "dxo-boundary-offset": "dxo-context-menu-boundary-offset",
    "dxo-collision": "dxo-context-menu-collision",
    "dxo-delay": "dxo-context-menu-delay",
    "dxo-from": "dxo-context-menu-from",
    "dxo-hide": "dxo-context-menu-hide",
    "dxo-my": "dxo-context-menu-my",
    "dxo-offset": "dxo-context-menu-offset",
    "dxo-position": "dxo-context-menu-position",
    "dxo-show": "dxo-context-menu-show",
    "dxo-show-event": "dxo-context-menu-show-event",
    "dxo-show-submenu-mode": "dxo-context-menu-show-submenu-mode",
    "dxo-to": "dxo-context-menu-to"
  },
  "DxDataGridComponent": {
    "_hostSelector": "dx-data-grid",
    "dxi-button": "dxi-data-grid-button",
    "dxi-change": "dxi-data-grid-change",
    "dxi-column": "dxi-data-grid-column",
    "dxi-custom-operation": "dxi-data-grid-custom-operation",
    "dxi-field": "dxi-data-grid-field",
    "dxi-group-item": "dxi-data-grid-group-item",
    "dxi-item": "dxi-data-grid-item",
    "dxi-sort-by-group-summary-info": "dxi-data-grid-sort-by-group-summary-info",
    "dxi-toolbar-item": "dxi-data-grid-toolbar-item",
    "dxi-total-item": "dxi-data-grid-total-item",
    "dxi-validation-rule": "dxi-data-grid-validation-rule",
    "dxo-animation": "dxo-data-grid-animation",
    "dxo-at": "dxo-data-grid-at",
    "dxo-boundary-offset": "dxo-data-grid-boundary-offset",
    "dxo-col-count-by-screen": "dxo-data-grid-col-count-by-screen",
    "dxo-collision": "dxo-data-grid-collision",
    "dxo-column-chooser": "dxo-data-grid-column-chooser",
    "dxo-column-fixing": "dxo-data-grid-column-fixing",
    "dxo-cursor-offset": "dxo-data-grid-cursor-offset",
    "dxo-editing": "dxo-data-grid-editing",
    "dxo-export": "dxo-data-grid-export",
    "dxo-filter-builder": "dxo-data-grid-filter-builder",
    "dxo-filter-builder-popup": "dxo-data-grid-filter-builder-popup",
    "dxo-filter-operation-descriptions": "dxo-data-grid-filter-operation-descriptions",
    "dxo-filter-panel": "dxo-data-grid-filter-panel",
    "dxo-filter-row": "dxo-data-grid-filter-row",
    "dxo-form": "dxo-data-grid-form",
    "dxo-form-item": "dxo-data-grid-form-item",
    "dxo-format": "dxo-data-grid-format",
    "dxo-from": "dxo-data-grid-from",
    "dxo-group-operation-descriptions": "dxo-data-grid-group-operation-descriptions",
    "dxo-group-panel": "dxo-data-grid-group-panel",
    "dxo-grouping": "dxo-data-grid-grouping",
    "dxo-header-filter": "dxo-data-grid-header-filter",
    "dxo-hide": "dxo-data-grid-hide",
    "dxo-icons": "dxo-data-grid-icons",
    "dxo-keyboard-navigation": "dxo-data-grid-keyboard-navigation",
    "dxo-label": "dxo-data-grid-label",
    "dxo-load-panel": "dxo-data-grid-load-panel",
    "dxo-lookup": "dxo-data-grid-lookup",
    "dxo-master-detail": "dxo-data-grid-master-detail",
    "dxo-my": "dxo-data-grid-my",
    "dxo-offset": "dxo-data-grid-offset",
    "dxo-operation-descriptions": "dxo-data-grid-operation-descriptions",
    "dxo-pager": "dxo-data-grid-pager",
    "dxo-paging": "dxo-data-grid-paging",
    "dxo-popup": "dxo-data-grid-popup",
    "dxo-position": "dxo-data-grid-position",
    "dxo-remote-operations": "dxo-data-grid-remote-operations",
    "dxo-row-dragging": "dxo-data-grid-row-dragging",
    "dxo-scrolling": "dxo-data-grid-scrolling",
    "dxo-search": "dxo-data-grid-search",
    "dxo-search-panel": "dxo-data-grid-search-panel",
    "dxo-selection": "dxo-data-grid-selection",
    "dxo-show": "dxo-data-grid-show",
    "dxo-sorting": "dxo-data-grid-sorting",
    "dxo-state-storing": "dxo-data-grid-state-storing",
    "dxo-summary": "dxo-data-grid-summary",
    "dxo-texts": "dxo-data-grid-texts",
    "dxo-to": "dxo-data-grid-to",
    "dxo-toolbar": "dxo-data-grid-toolbar",
    "dxo-value-format": "dxo-data-grid-value-format"
  },
  "DxDateBoxComponent": {
    "_hostSelector": "dx-date-box",
    "dxi-button": "dxi-date-box-button",
    "dxi-toolbar-item": "dxi-date-box-toolbar-item",
    "dxo-animation": "dxo-date-box-animation",
    "dxo-at": "dxo-date-box-at",
    "dxo-boundary-offset": "dxo-date-box-boundary-offset",
    "dxo-calendar-options": "dxo-date-box-calendar-options",
    "dxo-collision": "dxo-date-box-collision",
    "dxo-display-format": "dxo-date-box-display-format",
    "dxo-drop-down-options": "dxo-date-box-drop-down-options",
    "dxo-from": "dxo-date-box-from",
    "dxo-hide": "dxo-date-box-hide",
    "dxo-my": "dxo-date-box-my",
    "dxo-offset": "dxo-date-box-offset",
    "dxo-options": "dxo-date-box-options",
    "dxo-position": "dxo-date-box-position",
    "dxo-show": "dxo-date-box-show",
    "dxo-to": "dxo-date-box-to"
  },
  "DxDateRangeBoxComponent": {
    "_hostSelector": "dx-date-range-box",
    "dxi-button": "dxi-date-range-box-button",
    "dxi-toolbar-item": "dxi-date-range-box-toolbar-item",
    "dxo-animation": "dxo-date-range-box-animation",
    "dxo-at": "dxo-date-range-box-at",
    "dxo-boundary-offset": "dxo-date-range-box-boundary-offset",
    "dxo-calendar-options": "dxo-date-range-box-calendar-options",
    "dxo-collision": "dxo-date-range-box-collision",
    "dxo-display-format": "dxo-date-range-box-display-format",
    "dxo-drop-down-options": "dxo-date-range-box-drop-down-options",
    "dxo-from": "dxo-date-range-box-from",
    "dxo-hide": "dxo-date-range-box-hide",
    "dxo-my": "dxo-date-range-box-my",
    "dxo-offset": "dxo-date-range-box-offset",
    "dxo-options": "dxo-date-range-box-options",
    "dxo-position": "dxo-date-range-box-position",
    "dxo-show": "dxo-date-range-box-show",
    "dxo-to": "dxo-date-range-box-to"
  },
  "DxDeferRenderingComponent": {
    "_hostSelector": "dx-defer-rendering",
    "dxo-animation": "dxo-defer-rendering-animation",
    "dxo-at": "dxo-defer-rendering-at",
    "dxo-boundary-offset": "dxo-defer-rendering-boundary-offset",
    "dxo-collision": "dxo-defer-rendering-collision",
    "dxo-from": "dxo-defer-rendering-from",
    "dxo-my": "dxo-defer-rendering-my",
    "dxo-offset": "dxo-defer-rendering-offset",
    "dxo-position": "dxo-defer-rendering-position",
    "dxo-to": "dxo-defer-rendering-to"
  },
  "DxDiagramComponent": {
    "_hostSelector": "dx-diagram",
    "dxi-command": "dxi-diagram-command",
    "dxi-connection-point": "dxi-diagram-connection-point",
    "dxi-custom-shape": "dxi-diagram-custom-shape",
    "dxi-group": "dxi-diagram-group",
    "dxi-item": "dxi-diagram-item",
    "dxi-tab": "dxi-diagram-tab",
    "dxo-auto-layout": "dxo-diagram-auto-layout",
    "dxo-context-menu": "dxo-diagram-context-menu",
    "dxo-context-toolbox": "dxo-diagram-context-toolbox",
    "dxo-default-item-properties": "dxo-diagram-default-item-properties",
    "dxo-edges": "dxo-diagram-edges",
    "dxo-editing": "dxo-diagram-editing",
    "dxo-export": "dxo-diagram-export",
    "dxo-grid-size": "dxo-diagram-grid-size",
    "dxo-history-toolbar": "dxo-diagram-history-toolbar",
    "dxo-main-toolbar": "dxo-diagram-main-toolbar",
    "dxo-nodes": "dxo-diagram-nodes",
    "dxo-page-size": "dxo-diagram-page-size",
    "dxo-properties-panel": "dxo-diagram-properties-panel",
    "dxo-toolbox": "dxo-diagram-toolbox",
    "dxo-view-toolbar": "dxo-diagram-view-toolbar",
    "dxo-zoom-level": "dxo-diagram-zoom-level"
  },
  "DxDraggableComponent": {
    "_hostSelector": "dx-draggable",
    "dxo-cursor-offset": "dxo-draggable-cursor-offset"
  },
  "DxDropDownBoxComponent": {
    "_hostSelector": "dx-drop-down-box",
    "dxi-button": "dxi-drop-down-box-button",
    "dxi-toolbar-item": "dxi-drop-down-box-toolbar-item",
    "dxo-animation": "dxo-drop-down-box-animation",
    "dxo-at": "dxo-drop-down-box-at",
    "dxo-boundary-offset": "dxo-drop-down-box-boundary-offset",
    "dxo-collision": "dxo-drop-down-box-collision",
    "dxo-drop-down-options": "dxo-drop-down-box-drop-down-options",
    "dxo-from": "dxo-drop-down-box-from",
    "dxo-hide": "dxo-drop-down-box-hide",
    "dxo-my": "dxo-drop-down-box-my",
    "dxo-offset": "dxo-drop-down-box-offset",
    "dxo-options": "dxo-drop-down-box-options",
    "dxo-position": "dxo-drop-down-box-position",
    "dxo-show": "dxo-drop-down-box-show",
    "dxo-to": "dxo-drop-down-box-to"
  },
  "DxDropDownButtonComponent": {
    "_hostSelector": "dx-drop-down-button",
    "dxi-item": "dxi-drop-down-button-item",
    "dxi-toolbar-item": "dxi-drop-down-button-toolbar-item",
    "dxo-animation": "dxo-drop-down-button-animation",
    "dxo-at": "dxo-drop-down-button-at",
    "dxo-boundary-offset": "dxo-drop-down-button-boundary-offset",
    "dxo-collision": "dxo-drop-down-button-collision",
    "dxo-drop-down-options": "dxo-drop-down-button-drop-down-options",
    "dxo-from": "dxo-drop-down-button-from",
    "dxo-hide": "dxo-drop-down-button-hide",
    "dxo-my": "dxo-drop-down-button-my",
    "dxo-offset": "dxo-drop-down-button-offset",
    "dxo-position": "dxo-drop-down-button-position",
    "dxo-show": "dxo-drop-down-button-show",
    "dxo-to": "dxo-drop-down-button-to"
  },
  "DxFileManagerComponent": {
    "_hostSelector": "dx-file-manager",
    "dxi-column": "dxi-file-manager-column",
    "dxi-file-selection-item": "dxi-file-manager-file-selection-item",
    "dxi-item": "dxi-file-manager-item",
    "dxi-toolbar-item": "dxi-file-manager-toolbar-item",
    "dxo-context-menu": "dxo-file-manager-context-menu",
    "dxo-details": "dxo-file-manager-details",
    "dxo-item-view": "dxo-file-manager-item-view",
    "dxo-notifications": "dxo-file-manager-notifications",
    "dxo-permissions": "dxo-file-manager-permissions",
    "dxo-toolbar": "dxo-file-manager-toolbar",
    "dxo-upload": "dxo-file-manager-upload"
  },
  "DxFilterBuilderComponent": {
    "_hostSelector": "dx-filter-builder",
    "dxi-custom-operation": "dxi-filter-builder-custom-operation",
    "dxi-field": "dxi-filter-builder-field",
    "dxo-filter-operation-descriptions": "dxo-filter-builder-filter-operation-descriptions",
    "dxo-format": "dxo-filter-builder-format",
    "dxo-group-operation-descriptions": "dxo-filter-builder-group-operation-descriptions",
    "dxo-lookup": "dxo-filter-builder-lookup"
  },
  "DxFormComponent": {
    "_hostSelector": "dx-form",
    "dxi-group-item": "dxi-form-group-item",
    "dxi-item": "dxi-form-item",
    "dxi-tab": "dxi-form-tab",
    "dxi-validation-rule": "dxi-form-validation-rule",
    "dxo-button-options": "dxo-form-button-options",
    "dxo-col-count-by-screen": "dxo-form-col-count-by-screen",
    "dxo-label": "dxo-form-label",
    "dxo-tab-panel-options": "dxo-form-tab-panel-options"
  },
  "DxFunnelComponent": {
    "_hostSelector": "dx-funnel",
    "dxo-adaptive-layout": "dxo-funnel-adaptive-layout",
    "dxo-border": "dxo-funnel-border",
    "dxo-connector": "dxo-funnel-connector",
    "dxo-export": "dxo-funnel-export",
    "dxo-font": "dxo-funnel-font",
    "dxo-format": "dxo-funnel-format",
    "dxo-hatching": "dxo-funnel-hatching",
    "dxo-hover-style": "dxo-funnel-hover-style",
    "dxo-item": "dxo-funnel-item",
    "dxo-label": "dxo-funnel-label",
    "dxo-legend": "dxo-funnel-legend",
    "dxo-loading-indicator": "dxo-funnel-loading-indicator",
    "dxo-margin": "dxo-funnel-margin",
    "dxo-selection-style": "dxo-funnel-selection-style",
    "dxo-shadow": "dxo-funnel-shadow",
    "dxo-size": "dxo-funnel-size",
    "dxo-subtitle": "dxo-funnel-subtitle",
    "dxo-title": "dxo-funnel-title",
    "dxo-tooltip": "dxo-funnel-tooltip"
  },
  "DxGalleryComponent": {
    "_hostSelector": "dx-gallery",
    "dxi-item": "dxi-gallery-item"
  },
  "DxGanttComponent": {
    "_hostSelector": "dx-gantt",
    "dxi-column": "dxi-gantt-column",
    "dxi-item": "dxi-gantt-item",
    "dxi-strip-line": "dxi-gantt-strip-line",
    "dxi-toolbar-item": "dxi-gantt-toolbar-item",
    "dxo-context-menu": "dxo-gantt-context-menu",
    "dxo-dependencies": "dxo-gantt-dependencies",
    "dxo-editing": "dxo-gantt-editing",
    "dxo-filter-row": "dxo-gantt-filter-row",
    "dxo-format": "dxo-gantt-format",
    "dxo-header-filter": "dxo-gantt-header-filter",
    "dxo-operation-descriptions": "dxo-gantt-operation-descriptions",
    "dxo-resource-assignments": "dxo-gantt-resource-assignments",
    "dxo-resources": "dxo-gantt-resources",
    "dxo-scale-type-range": "dxo-gantt-scale-type-range",
    "dxo-search": "dxo-gantt-search",
    "dxo-sorting": "dxo-gantt-sorting",
    "dxo-tasks": "dxo-gantt-tasks",
    "dxo-texts": "dxo-gantt-texts",
    "dxo-toolbar": "dxo-gantt-toolbar",
    "dxo-validation": "dxo-gantt-validation"
  },
  "DxHtmlEditorComponent": {
    "_hostSelector": "dx-html-editor",
    "dxi-command": "dxi-html-editor-command",
    "dxi-item": "dxi-html-editor-item",
    "dxi-mention": "dxi-html-editor-mention",
    "dxi-tab": "dxi-html-editor-tab",
    "dxi-toolbar-item": "dxi-html-editor-toolbar-item",
    "dxo-converter": "dxo-html-editor-converter",
    "dxo-file-uploader-options": "dxo-html-editor-file-uploader-options",
    "dxo-image-upload": "dxo-html-editor-image-upload",
    "dxo-media-resizing": "dxo-html-editor-media-resizing",
    "dxo-table-context-menu": "dxo-html-editor-table-context-menu",
    "dxo-table-resizing": "dxo-html-editor-table-resizing",
    "dxo-toolbar": "dxo-html-editor-toolbar",
    "dxo-variables": "dxo-html-editor-variables"
  },
  "DxLinearGaugeComponent": {
    "_hostSelector": "dx-linear-gauge",
    "dxi-range": "dxi-linear-gauge-range",
    "dxo-animation": "dxo-linear-gauge-animation",
    "dxo-background-color": "dxo-linear-gauge-background-color",
    "dxo-border": "dxo-linear-gauge-border",
    "dxo-color": "dxo-linear-gauge-color",
    "dxo-export": "dxo-linear-gauge-export",
    "dxo-font": "dxo-linear-gauge-font",
    "dxo-format": "dxo-linear-gauge-format",
    "dxo-geometry": "dxo-linear-gauge-geometry",
    "dxo-label": "dxo-linear-gauge-label",
    "dxo-loading-indicator": "dxo-linear-gauge-loading-indicator",
    "dxo-margin": "dxo-linear-gauge-margin",
    "dxo-minor-tick": "dxo-linear-gauge-minor-tick",
    "dxo-range-container": "dxo-linear-gauge-range-container",
    "dxo-scale": "dxo-linear-gauge-scale",
    "dxo-shadow": "dxo-linear-gauge-shadow",
    "dxo-size": "dxo-linear-gauge-size",
    "dxo-subtitle": "dxo-linear-gauge-subtitle",
    "dxo-subvalue-indicator": "dxo-linear-gauge-subvalue-indicator",
    "dxo-text": "dxo-linear-gauge-text",
    "dxo-tick": "dxo-linear-gauge-tick",
    "dxo-title": "dxo-linear-gauge-title",
    "dxo-tooltip": "dxo-linear-gauge-tooltip",
    "dxo-value-indicator": "dxo-linear-gauge-value-indicator",
    "dxo-width": "dxo-linear-gauge-width"
  },
  "DxListComponent": {
    "_hostSelector": "dx-list",
    "dxi-button": "dxi-list-button",
    "dxi-item": "dxi-list-item",
    "dxi-menu-item": "dxi-list-menu-item",
    "dxo-cursor-offset": "dxo-list-cursor-offset",
    "dxo-item-dragging": "dxo-list-item-dragging",
    "dxo-options": "dxo-list-options",
    "dxo-search-editor-options": "dxo-list-search-editor-options"
  },
  "DxLoadPanelComponent": {
    "_hostSelector": "dx-load-panel",
    "dxo-animation": "dxo-load-panel-animation",
    "dxo-at": "dxo-load-panel-at",
    "dxo-boundary-offset": "dxo-load-panel-boundary-offset",
    "dxo-collision": "dxo-load-panel-collision",
    "dxo-from": "dxo-load-panel-from",
    "dxo-hide": "dxo-load-panel-hide",
    "dxo-my": "dxo-load-panel-my",
    "dxo-offset": "dxo-load-panel-offset",
    "dxo-position": "dxo-load-panel-position",
    "dxo-show": "dxo-load-panel-show",
    "dxo-to": "dxo-load-panel-to"
  },
  "DxLookupComponent": {
    "_hostSelector": "dx-lookup",
    "dxi-item": "dxi-lookup-item",
    "dxi-toolbar-item": "dxi-lookup-toolbar-item",
    "dxo-animation": "dxo-lookup-animation",
    "dxo-at": "dxo-lookup-at",
    "dxo-boundary-offset": "dxo-lookup-boundary-offset",
    "dxo-collision": "dxo-lookup-collision",
    "dxo-drop-down-options": "dxo-lookup-drop-down-options",
    "dxo-from": "dxo-lookup-from",
    "dxo-hide": "dxo-lookup-hide",
    "dxo-hide-event": "dxo-lookup-hide-event",
    "dxo-my": "dxo-lookup-my",
    "dxo-offset": "dxo-lookup-offset",
    "dxo-position": "dxo-lookup-position",
    "dxo-show": "dxo-lookup-show",
    "dxo-show-event": "dxo-lookup-show-event",
    "dxo-to": "dxo-lookup-to"
  },
  "DxMapComponent": {
    "_hostSelector": "dx-map",
    "dxi-location": "dxi-map-location",
    "dxi-marker": "dxi-map-marker",
    "dxi-route": "dxi-map-route",
    "dxo-api-key": "dxo-map-api-key",
    "dxo-provider-config": "dxo-map-provider-config",
    "dxo-tooltip": "dxo-map-tooltip"
  },
  "DxMenuComponent": {
    "_hostSelector": "dx-menu",
    "dxi-item": "dxi-menu-item",
    "dxo-animation": "dxo-menu-animation",
    "dxo-at": "dxo-menu-at",
    "dxo-boundary-offset": "dxo-menu-boundary-offset",
    "dxo-collision": "dxo-menu-collision",
    "dxo-delay": "dxo-menu-delay",
    "dxo-from": "dxo-menu-from",
    "dxo-hide": "dxo-menu-hide",
    "dxo-my": "dxo-menu-my",
    "dxo-offset": "dxo-menu-offset",
    "dxo-position": "dxo-menu-position",
    "dxo-show": "dxo-menu-show",
    "dxo-show-first-submenu-mode": "dxo-menu-show-first-submenu-mode",
    "dxo-show-submenu-mode": "dxo-menu-show-submenu-mode",
    "dxo-to": "dxo-menu-to"
  },
  "DxMultiViewComponent": {
    "_hostSelector": "dx-multi-view",
    "dxi-item": "dxi-multi-view-item"
  },
  "DxNumberBoxComponent": {
    "_hostSelector": "dx-number-box",
    "dxi-button": "dxi-number-box-button",
    "dxo-format": "dxo-number-box-format",
    "dxo-options": "dxo-number-box-options"
  },
  "DxPieChartComponent": {
    "_hostSelector": "dx-pie-chart",
    "dxi-annotation": "dxi-pie-chart-annotation",
    "dxi-series": "dxi-pie-chart-series",
    "dxo-adaptive-layout": "dxo-pie-chart-adaptive-layout",
    "dxo-animation": "dxo-pie-chart-animation",
    "dxo-argument-format": "dxo-pie-chart-argument-format",
    "dxo-border": "dxo-pie-chart-border",
    "dxo-color": "dxo-pie-chart-color",
    "dxo-common-annotation-settings": "dxo-pie-chart-common-annotation-settings",
    "dxo-common-series-settings": "dxo-pie-chart-common-series-settings",
    "dxo-connector": "dxo-pie-chart-connector",
    "dxo-export": "dxo-pie-chart-export",
    "dxo-font": "dxo-pie-chart-font",
    "dxo-format": "dxo-pie-chart-format",
    "dxo-hatching": "dxo-pie-chart-hatching",
    "dxo-hover-style": "dxo-pie-chart-hover-style",
    "dxo-image": "dxo-pie-chart-image",
    "dxo-label": "dxo-pie-chart-label",
    "dxo-legend": "dxo-pie-chart-legend",
    "dxo-loading-indicator": "dxo-pie-chart-loading-indicator",
    "dxo-margin": "dxo-pie-chart-margin",
    "dxo-selection-style": "dxo-pie-chart-selection-style",
    "dxo-series-template": "dxo-pie-chart-series-template",
    "dxo-shadow": "dxo-pie-chart-shadow",
    "dxo-size": "dxo-pie-chart-size",
    "dxo-small-values-grouping": "dxo-pie-chart-small-values-grouping",
    "dxo-subtitle": "dxo-pie-chart-subtitle",
    "dxo-title": "dxo-pie-chart-title",
    "dxo-tooltip": "dxo-pie-chart-tooltip"
  },
  "DxPivotGridComponent": {
    "_hostSelector": "dx-pivot-grid",
    "dxo-export": "dxo-pivot-grid-export",
    "dxo-field-chooser": "dxo-pivot-grid-field-chooser",
    "dxo-field-panel": "dxo-pivot-grid-field-panel",
    "dxo-header-filter": "dxo-pivot-grid-header-filter",
    "dxo-load-panel": "dxo-pivot-grid-load-panel",
    "dxo-scrolling": "dxo-pivot-grid-scrolling",
    "dxo-search": "dxo-pivot-grid-search",
    "dxo-state-storing": "dxo-pivot-grid-state-storing",
    "dxo-texts": "dxo-pivot-grid-texts"
  },
  "DxPivotGridFieldChooserComponent": {
    "_hostSelector": "dx-pivot-grid-field-chooser",
    "dxo-header-filter": "dxo-pivot-grid-field-chooser-header-filter",
    "dxo-search": "dxo-pivot-grid-field-chooser-search",
    "dxo-texts": "dxo-pivot-grid-field-chooser-texts"
  },
  "DxPolarChartComponent": {
    "_hostSelector": "dx-polar-chart",
    "dxi-annotation": "dxi-polar-chart-annotation",
    "dxi-constant-line": "dxi-polar-chart-constant-line",
    "dxi-series": "dxi-polar-chart-series",
    "dxi-strip": "dxi-polar-chart-strip",
    "dxo-adaptive-layout": "dxo-polar-chart-adaptive-layout",
    "dxo-animation": "dxo-polar-chart-animation",
    "dxo-argument-axis": "dxo-polar-chart-argument-axis",
    "dxo-argument-format": "dxo-polar-chart-argument-format",
    "dxo-border": "dxo-polar-chart-border",
    "dxo-color": "dxo-polar-chart-color",
    "dxo-common-annotation-settings": "dxo-polar-chart-common-annotation-settings",
    "dxo-common-axis-settings": "dxo-polar-chart-common-axis-settings",
    "dxo-common-series-settings": "dxo-polar-chart-common-series-settings",
    "dxo-connector": "dxo-polar-chart-connector",
    "dxo-constant-line-style": "dxo-polar-chart-constant-line-style",
    "dxo-data-prepare-settings": "dxo-polar-chart-data-prepare-settings",
    "dxo-export": "dxo-polar-chart-export",
    "dxo-font": "dxo-polar-chart-font",
    "dxo-format": "dxo-polar-chart-format",
    "dxo-grid": "dxo-polar-chart-grid",
    "dxo-hatching": "dxo-polar-chart-hatching",
    "dxo-hover-style": "dxo-polar-chart-hover-style",
    "dxo-image": "dxo-polar-chart-image",
    "dxo-label": "dxo-polar-chart-label",
    "dxo-legend": "dxo-polar-chart-legend",
    "dxo-loading-indicator": "dxo-polar-chart-loading-indicator",
    "dxo-margin": "dxo-polar-chart-margin",
    "dxo-min-visual-range-length": "dxo-polar-chart-min-visual-range-length",
    "dxo-minor-grid": "dxo-polar-chart-minor-grid",
    "dxo-minor-tick": "dxo-polar-chart-minor-tick",
    "dxo-minor-tick-interval": "dxo-polar-chart-minor-tick-interval",
    "dxo-point": "dxo-polar-chart-point",
    "dxo-selection-style": "dxo-polar-chart-selection-style",
    "dxo-series-template": "dxo-polar-chart-series-template",
    "dxo-shadow": "dxo-polar-chart-shadow",
    "dxo-size": "dxo-polar-chart-size",
    "dxo-strip-style": "dxo-polar-chart-strip-style",
    "dxo-subtitle": "dxo-polar-chart-subtitle",
    "dxo-tick": "dxo-polar-chart-tick",
    "dxo-tick-interval": "dxo-polar-chart-tick-interval",
    "dxo-title": "dxo-polar-chart-title",
    "dxo-tooltip": "dxo-polar-chart-tooltip",
    "dxo-value-axis": "dxo-polar-chart-value-axis",
    "dxo-value-error-bar": "dxo-polar-chart-value-error-bar"
  },
  "DxPopoverComponent": {
    "_hostSelector": "dx-popover",
    "dxi-toolbar-item": "dxi-popover-toolbar-item",
    "dxo-animation": "dxo-popover-animation",
    "dxo-at": "dxo-popover-at",
    "dxo-boundary-offset": "dxo-popover-boundary-offset",
    "dxo-collision": "dxo-popover-collision",
    "dxo-from": "dxo-popover-from",
    "dxo-hide": "dxo-popover-hide",
    "dxo-hide-event": "dxo-popover-hide-event",
    "dxo-my": "dxo-popover-my",
    "dxo-offset": "dxo-popover-offset",
    "dxo-position": "dxo-popover-position",
    "dxo-show": "dxo-popover-show",
    "dxo-show-event": "dxo-popover-show-event",
    "dxo-to": "dxo-popover-to"
  },
  "DxRadioGroupComponent": {
    "_hostSelector": "dx-radio-group",
    "dxi-item": "dxi-radio-group-item"
  },
  "DxRangeSelectorComponent": {
    "_hostSelector": "dx-range-selector",
    "dxi-break": "dxi-range-selector-break",
    "dxi-series": "dxi-range-selector-series",
    "dxo-aggregation": "dxo-range-selector-aggregation",
    "dxo-aggregation-interval": "dxo-range-selector-aggregation-interval",
    "dxo-argument-format": "dxo-range-selector-argument-format",
    "dxo-background": "dxo-range-selector-background",
    "dxo-behavior": "dxo-range-selector-behavior",
    "dxo-border": "dxo-range-selector-border",
    "dxo-break-style": "dxo-range-selector-break-style",
    "dxo-chart": "dxo-range-selector-chart",
    "dxo-color": "dxo-range-selector-color",
    "dxo-common-series-settings": "dxo-range-selector-common-series-settings",
    "dxo-connector": "dxo-range-selector-connector",
    "dxo-data-prepare-settings": "dxo-range-selector-data-prepare-settings",
    "dxo-export": "dxo-range-selector-export",
    "dxo-font": "dxo-range-selector-font",
    "dxo-format": "dxo-range-selector-format",
    "dxo-hatching": "dxo-range-selector-hatching",
    "dxo-height": "dxo-range-selector-height",
    "dxo-hover-style": "dxo-range-selector-hover-style",
    "dxo-image": "dxo-range-selector-image",
    "dxo-indent": "dxo-range-selector-indent",
    "dxo-label": "dxo-range-selector-label",
    "dxo-loading-indicator": "dxo-range-selector-loading-indicator",
    "dxo-margin": "dxo-range-selector-margin",
    "dxo-marker": "dxo-range-selector-marker",
    "dxo-max-range": "dxo-range-selector-max-range",
    "dxo-min-range": "dxo-range-selector-min-range",
    "dxo-minor-tick": "dxo-range-selector-minor-tick",
    "dxo-minor-tick-interval": "dxo-range-selector-minor-tick-interval",
    "dxo-point": "dxo-range-selector-point",
    "dxo-reduction": "dxo-range-selector-reduction",
    "dxo-scale": "dxo-range-selector-scale",
    "dxo-selection-style": "dxo-range-selector-selection-style",
    "dxo-series-template": "dxo-range-selector-series-template",
    "dxo-shutter": "dxo-range-selector-shutter",
    "dxo-size": "dxo-range-selector-size",
    "dxo-slider-handle": "dxo-range-selector-slider-handle",
    "dxo-slider-marker": "dxo-range-selector-slider-marker",
    "dxo-subtitle": "dxo-range-selector-subtitle",
    "dxo-tick": "dxo-range-selector-tick",
    "dxo-tick-interval": "dxo-range-selector-tick-interval",
    "dxo-title": "dxo-range-selector-title",
    "dxo-url": "dxo-range-selector-url",
    "dxo-value-axis": "dxo-range-selector-value-axis",
    "dxo-value-error-bar": "dxo-range-selector-value-error-bar",
    "dxo-width": "dxo-range-selector-width"
  },
  "DxRangeSliderComponent": {
    "_hostSelector": "dx-range-slider",
    "dxo-format": "dxo-range-slider-format",
    "dxo-label": "dxo-range-slider-label",
    "dxo-tooltip": "dxo-range-slider-tooltip"
  },
  "DxResponsiveBoxComponent": {
    "_hostSelector": "dx-responsive-box",
    "dxi-col": "dxi-responsive-box-col",
    "dxi-item": "dxi-responsive-box-item",
    "dxi-location": "dxi-responsive-box-location",
    "dxi-row": "dxi-responsive-box-row"
  },
  "DxSankeyComponent": {
    "_hostSelector": "dx-sankey",
    "dxo-adaptive-layout": "dxo-sankey-adaptive-layout",
    "dxo-border": "dxo-sankey-border",
    "dxo-export": "dxo-sankey-export",
    "dxo-font": "dxo-sankey-font",
    "dxo-format": "dxo-sankey-format",
    "dxo-hatching": "dxo-sankey-hatching",
    "dxo-hover-style": "dxo-sankey-hover-style",
    "dxo-label": "dxo-sankey-label",
    "dxo-link": "dxo-sankey-link",
    "dxo-loading-indicator": "dxo-sankey-loading-indicator",
    "dxo-margin": "dxo-sankey-margin",
    "dxo-node": "dxo-sankey-node",
    "dxo-shadow": "dxo-sankey-shadow",
    "dxo-size": "dxo-sankey-size",
    "dxo-subtitle": "dxo-sankey-subtitle",
    "dxo-title": "dxo-sankey-title",
    "dxo-tooltip": "dxo-sankey-tooltip"
  },
  "DxSchedulerComponent": {
    "_hostSelector": "dx-scheduler",
    "dxi-item": "dxi-scheduler-item",
    "dxi-resource": "dxi-scheduler-resource",
    "dxi-toolbar-item": "dxi-scheduler-toolbar-item",
    "dxi-view": "dxi-scheduler-view",
    "dxo-appointment-dragging": "dxo-scheduler-appointment-dragging",
    "dxo-editing": "dxo-scheduler-editing",
    "dxo-options": "dxo-scheduler-options",
    "dxo-scrolling": "dxo-scheduler-scrolling",
    "dxo-toolbar": "dxo-scheduler-toolbar"
  },
  "DxSelectBoxComponent": {
    "_hostSelector": "dx-select-box",
    "dxi-button": "dxi-select-box-button",
    "dxi-item": "dxi-select-box-item",
    "dxi-toolbar-item": "dxi-select-box-toolbar-item",
    "dxo-animation": "dxo-select-box-animation",
    "dxo-at": "dxo-select-box-at",
    "dxo-boundary-offset": "dxo-select-box-boundary-offset",
    "dxo-collision": "dxo-select-box-collision",
    "dxo-drop-down-options": "dxo-select-box-drop-down-options",
    "dxo-from": "dxo-select-box-from",
    "dxo-hide": "dxo-select-box-hide",
    "dxo-my": "dxo-select-box-my",
    "dxo-offset": "dxo-select-box-offset",
    "dxo-options": "dxo-select-box-options",
    "dxo-position": "dxo-select-box-position",
    "dxo-show": "dxo-select-box-show",
    "dxo-to": "dxo-select-box-to"
  },
  "DxSliderComponent": {
    "_hostSelector": "dx-slider",
    "dxo-format": "dxo-slider-format",
    "dxo-label": "dxo-slider-label",
    "dxo-tooltip": "dxo-slider-tooltip"
  },
  "DxSortableComponent": {
    "_hostSelector": "dx-sortable",
    "dxo-cursor-offset": "dxo-sortable-cursor-offset"
  },
  "DxSparklineComponent": {
    "_hostSelector": "dx-sparkline",
    "dxo-border": "dxo-sparkline-border",
    "dxo-font": "dxo-sparkline-font",
    "dxo-format": "dxo-sparkline-format",
    "dxo-margin": "dxo-sparkline-margin",
    "dxo-shadow": "dxo-sparkline-shadow",
    "dxo-size": "dxo-sparkline-size",
    "dxo-tooltip": "dxo-sparkline-tooltip"
  },
  "DxSplitterComponent": {
    "_hostSelector": "dx-splitter",
    "dxi-item": "dxi-splitter-item"
  },
  "DxStepperComponent": {
    "_hostSelector": "dx-stepper",
    "dxi-item": "dxi-stepper-item"
  },
  "DxTabPanelComponent": {
    "_hostSelector": "dx-tab-panel",
    "dxi-item": "dxi-tab-panel-item"
  },
  "DxTabsComponent": {
    "_hostSelector": "dx-tabs",
    "dxi-item": "dxi-tabs-item"
  },
  "DxTagBoxComponent": {
    "_hostSelector": "dx-tag-box",
    "dxi-button": "dxi-tag-box-button",
    "dxi-item": "dxi-tag-box-item",
    "dxi-toolbar-item": "dxi-tag-box-toolbar-item",
    "dxo-animation": "dxo-tag-box-animation",
    "dxo-at": "dxo-tag-box-at",
    "dxo-boundary-offset": "dxo-tag-box-boundary-offset",
    "dxo-collision": "dxo-tag-box-collision",
    "dxo-drop-down-options": "dxo-tag-box-drop-down-options",
    "dxo-from": "dxo-tag-box-from",
    "dxo-hide": "dxo-tag-box-hide",
    "dxo-my": "dxo-tag-box-my",
    "dxo-offset": "dxo-tag-box-offset",
    "dxo-options": "dxo-tag-box-options",
    "dxo-position": "dxo-tag-box-position",
    "dxo-show": "dxo-tag-box-show",
    "dxo-to": "dxo-tag-box-to"
  },
  "DxTextBoxComponent": {
    "_hostSelector": "dx-text-box",
    "dxi-button": "dxi-text-box-button",
    "dxo-options": "dxo-text-box-options"
  },
  "DxTileViewComponent": {
    "_hostSelector": "dx-tile-view",
    "dxi-item": "dxi-tile-view-item"
  },
  "DxToastComponent": {
    "_hostSelector": "dx-toast",
    "dxo-animation": "dxo-toast-animation",
    "dxo-at": "dxo-toast-at",
    "dxo-boundary-offset": "dxo-toast-boundary-offset",
    "dxo-collision": "dxo-toast-collision",
    "dxo-from": "dxo-toast-from",
    "dxo-hide": "dxo-toast-hide",
    "dxo-my": "dxo-toast-my",
    "dxo-offset": "dxo-toast-offset",
    "dxo-position": "dxo-toast-position",
    "dxo-show": "dxo-toast-show",
    "dxo-to": "dxo-toast-to"
  },
  "DxToolbarComponent": {
    "_hostSelector": "dx-toolbar",
    "dxi-item": "dxi-toolbar-item"
  },
  "DxTooltipComponent": {
    "_hostSelector": "dx-tooltip",
    "dxo-animation": "dxo-tooltip-animation",
    "dxo-at": "dxo-tooltip-at",
    "dxo-boundary-offset": "dxo-tooltip-boundary-offset",
    "dxo-collision": "dxo-tooltip-collision",
    "dxo-from": "dxo-tooltip-from",
    "dxo-hide": "dxo-tooltip-hide",
    "dxo-hide-event": "dxo-tooltip-hide-event",
    "dxo-my": "dxo-tooltip-my",
    "dxo-offset": "dxo-tooltip-offset",
    "dxo-position": "dxo-tooltip-position",
    "dxo-show": "dxo-tooltip-show",
    "dxo-show-event": "dxo-tooltip-show-event",
    "dxo-to": "dxo-tooltip-to"
  },
  "DxTreeListComponent": {
    "_hostSelector": "dx-tree-list",
    "dxi-button": "dxi-tree-list-button",
    "dxi-change": "dxi-tree-list-change",
    "dxi-column": "dxi-tree-list-column",
    "dxi-custom-operation": "dxi-tree-list-custom-operation",
    "dxi-field": "dxi-tree-list-field",
    "dxi-item": "dxi-tree-list-item",
    "dxi-toolbar-item": "dxi-tree-list-toolbar-item",
    "dxi-validation-rule": "dxi-tree-list-validation-rule",
    "dxo-animation": "dxo-tree-list-animation",
    "dxo-at": "dxo-tree-list-at",
    "dxo-boundary-offset": "dxo-tree-list-boundary-offset",
    "dxo-col-count-by-screen": "dxo-tree-list-col-count-by-screen",
    "dxo-collision": "dxo-tree-list-collision",
    "dxo-column-chooser": "dxo-tree-list-column-chooser",
    "dxo-column-fixing": "dxo-tree-list-column-fixing",
    "dxo-cursor-offset": "dxo-tree-list-cursor-offset",
    "dxo-editing": "dxo-tree-list-editing",
    "dxo-filter-builder": "dxo-tree-list-filter-builder",
    "dxo-filter-builder-popup": "dxo-tree-list-filter-builder-popup",
    "dxo-filter-operation-descriptions": "dxo-tree-list-filter-operation-descriptions",
    "dxo-filter-panel": "dxo-tree-list-filter-panel",
    "dxo-filter-row": "dxo-tree-list-filter-row",
    "dxo-form": "dxo-tree-list-form",
    "dxo-form-item": "dxo-tree-list-form-item",
    "dxo-format": "dxo-tree-list-format",
    "dxo-from": "dxo-tree-list-from",
    "dxo-group-operation-descriptions": "dxo-tree-list-group-operation-descriptions",
    "dxo-header-filter": "dxo-tree-list-header-filter",
    "dxo-hide": "dxo-tree-list-hide",
    "dxo-icons": "dxo-tree-list-icons",
    "dxo-keyboard-navigation": "dxo-tree-list-keyboard-navigation",
    "dxo-label": "dxo-tree-list-label",
    "dxo-load-panel": "dxo-tree-list-load-panel",
    "dxo-lookup": "dxo-tree-list-lookup",
    "dxo-my": "dxo-tree-list-my",
    "dxo-offset": "dxo-tree-list-offset",
    "dxo-operation-descriptions": "dxo-tree-list-operation-descriptions",
    "dxo-pager": "dxo-tree-list-pager",
    "dxo-paging": "dxo-tree-list-paging",
    "dxo-popup": "dxo-tree-list-popup",
    "dxo-position": "dxo-tree-list-position",
    "dxo-remote-operations": "dxo-tree-list-remote-operations",
    "dxo-row-dragging": "dxo-tree-list-row-dragging",
    "dxo-scrolling": "dxo-tree-list-scrolling",
    "dxo-search": "dxo-tree-list-search",
    "dxo-search-panel": "dxo-tree-list-search-panel",
    "dxo-selection": "dxo-tree-list-selection",
    "dxo-show": "dxo-tree-list-show",
    "dxo-sorting": "dxo-tree-list-sorting",
    "dxo-state-storing": "dxo-tree-list-state-storing",
    "dxo-texts": "dxo-tree-list-texts",
    "dxo-to": "dxo-tree-list-to",
    "dxo-toolbar": "dxo-tree-list-toolbar"
  },
  "DxTreeMapComponent": {
    "_hostSelector": "dx-tree-map",
    "dxo-border": "dxo-tree-map-border",
    "dxo-colorizer": "dxo-tree-map-colorizer",
    "dxo-export": "dxo-tree-map-export",
    "dxo-font": "dxo-tree-map-font",
    "dxo-format": "dxo-tree-map-format",
    "dxo-group": "dxo-tree-map-group",
    "dxo-hover-style": "dxo-tree-map-hover-style",
    "dxo-label": "dxo-tree-map-label",
    "dxo-loading-indicator": "dxo-tree-map-loading-indicator",
    "dxo-margin": "dxo-tree-map-margin",
    "dxo-selection-style": "dxo-tree-map-selection-style",
    "dxo-shadow": "dxo-tree-map-shadow",
    "dxo-size": "dxo-tree-map-size",
    "dxo-subtitle": "dxo-tree-map-subtitle",
    "dxo-tile": "dxo-tree-map-tile",
    "dxo-title": "dxo-tree-map-title",
    "dxo-tooltip": "dxo-tree-map-tooltip"
  },
  "DxTreeViewComponent": {
    "_hostSelector": "dx-tree-view",
    "dxi-button": "dxi-tree-view-button",
    "dxi-item": "dxi-tree-view-item",
    "dxo-options": "dxo-tree-view-options",
    "dxo-search-editor-options": "dxo-tree-view-search-editor-options"
  },
  "DxValidationSummaryComponent": {
    "_hostSelector": "dx-validation-summary",
    "dxi-item": "dxi-validation-summary-item"
  },
  "DxValidatorComponent": {
    "_hostSelector": "dx-validator",
    "dxi-validation-rule": "dxi-validator-validation-rule",
    "dxo-adapter": "dxo-validator-adapter"
  },
  "DxVectorMapComponent": {
    "_hostSelector": "dx-vector-map",
    "dxi-annotation": "dxi-vector-map-annotation",
    "dxi-layer": "dxi-vector-map-layer",
    "dxi-legend": "dxi-vector-map-legend",
    "dxo-background": "dxo-vector-map-background",
    "dxo-border": "dxo-vector-map-border",
    "dxo-common-annotation-settings": "dxo-vector-map-common-annotation-settings",
    "dxo-control-bar": "dxo-vector-map-control-bar",
    "dxo-export": "dxo-vector-map-export",
    "dxo-font": "dxo-vector-map-font",
    "dxo-image": "dxo-vector-map-image",
    "dxo-label": "dxo-vector-map-label",
    "dxo-loading-indicator": "dxo-vector-map-loading-indicator",
    "dxo-margin": "dxo-vector-map-margin",
    "dxo-projection": "dxo-vector-map-projection",
    "dxo-shadow": "dxo-vector-map-shadow",
    "dxo-size": "dxo-vector-map-size",
    "dxo-source": "dxo-vector-map-source",
    "dxo-subtitle": "dxo-vector-map-subtitle",
    "dxo-title": "dxo-vector-map-title",
    "dxo-tooltip": "dxo-vector-map-tooltip"
  }
};
var WARNING_CODES = {
  LEGACY_CONFIG_COMPONENT_USED: {
    code: "W3001",
    template: "You are using the legacy {legacySelector} configuration component. Please upgrade to our new {replacement} configuration component. Upgrade instructions:\n\n  https://js.devexpress.com/Angular/Documentation/Guide/Common/DevExtreme_CLI/#Migrate_to_Named_Configuration_Components"
  }
};
function formatWarningMessage(template, args) {
  if (!args) {
    return template;
  }
  if (Array.isArray(args)) {
    return args.reduce((message, value, index) => replacePlaceholder(message, `{${index}}`, String(value)), template);
  }
  return Object.entries(args).reduce((message, [key, value]) => replacePlaceholder(message, `{${key}}`, String(value)), template);
}
function logWarning(warning, args) {
  if (typeof console === "undefined" || typeof console.warn !== "function") {
    return;
  }
  const message = formatWarningMessage(warning.template, args);
  console.warn(`${warning.code} - ${message}`);
}
function replacePlaceholder(message, placeholder, value) {
  return message.split(placeholder).join(value);
}
var warnedUsages = /* @__PURE__ */ new Set();
var NESTED_CLASS_NAME_REGEXP = /^(Dx[io][A-Z]\w+)Component$/;
function getLegacySelector(nestedOption) {
  const className = nestedOption?.constructor?.name;
  if (!className) {
    return void 0;
  }
  const match = NESTED_CLASS_NAME_REGEXP.exec(className);
  if (!match) {
    return void 0;
  }
  const [, legacyName] = match;
  return toKebabCase(legacyName);
}
function getHostMapping(host) {
  const visited = /* @__PURE__ */ new Set();
  let current = host;
  while (current && !visited.has(current)) {
    visited.add(current);
    const ctorName = current.constructor?.name;
    if (ctorName && Object.prototype.hasOwnProperty.call(DEPRECATED_CONFIG_COMPONENTS, ctorName)) {
      return DEPRECATED_CONFIG_COMPONENTS[ctorName];
    }
    current = current._host;
  }
  return void 0;
}
function warnIfLegacyNestedComponent(nestedOption, host) {
  const legacySelector = getLegacySelector(nestedOption);
  if (!legacySelector) {
    return;
  }
  const mappingEntry = getHostMapping(host);
  if (!mappingEntry) {
    return;
  }
  const replacement = mappingEntry[legacySelector];
  if (!replacement) {
    return;
  }
  const cacheKey = `${legacySelector}|${replacement}`;
  if (warnedUsages.has(cacheKey)) {
    return;
  }
  warnedUsages.add(cacheKey);
  logWarning(WARNING_CODES.LEGACY_CONFIG_COMPONENT_USED, {
    legacySelector,
    replacement
  });
}
function toKebabCase(value) {
  return value.replace(/([a-z0-9])([A-Z])/g, "$1-$2").replace(/([A-Z])([A-Z][a-z])/g, "$1-$2").toLowerCase();
}
var DX_TEMPLATE_WRAPPER_CLASS = "dx-template-wrapper";
var RenderData = class {
  model;
  index;
  container;
};
var DxTemplateDirective = class _DxTemplateDirective {
  templateRef;
  viewContainerRef;
  renderer;
  zone;
  set dxTemplateOf(value) {
    this.name = value;
  }
  name;
  constructor(templateRef, viewContainerRef, templateHost, renderer, zone) {
    this.templateRef = templateRef;
    this.viewContainerRef = viewContainerRef;
    this.renderer = renderer;
    this.zone = zone;
    templateHost.setTemplate(this);
  }
  renderTemplate(renderData) {
    const childView = this.viewContainerRef.createEmbeddedView(this.templateRef, {
      $implicit: renderData.model,
      index: renderData.index
    });
    const container = getElement(renderData.container);
    if (renderData.container) {
      childView.rootNodes.forEach((element) => {
        this.renderer.appendChild(container, element);
      });
    }
    return childView;
  }
  render(renderData) {
    let childView;
    if (this.zone.isStable) {
      childView = this.zone.run(() => this.renderTemplate(renderData));
    } else {
      childView = this.renderTemplate(renderData);
    }
    childView.detectChanges();
    childView.rootNodes.forEach((element) => {
      if (element.nodeType === 1) {
        dom_adapter_default.setClass(element, DX_TEMPLATE_WRAPPER_CLASS, true);
      }
      one(element, "dxremove", ({}, params) => {
        if (!params?._angularIntegration) {
          childView.destroy();
        }
      });
    });
    return childView.rootNodes;
  }
  /** @nocollapse */
  static ɵfac = function DxTemplateDirective_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxTemplateDirective)(ɵɵdirectiveInject(TemplateRef), ɵɵdirectiveInject(ViewContainerRef), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(NgZone));
  };
  /** @nocollapse */
  static ɵdir = ɵɵdefineDirective({
    type: _DxTemplateDirective,
    selectors: [["", "dxTemplate", ""]],
    inputs: {
      dxTemplateOf: "dxTemplateOf"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxTemplateDirective, [{
    type: Directive,
    args: [{
      selector: "[dxTemplate]",
      standalone: true
    }]
  }], () => [{
    type: TemplateRef
  }, {
    type: ViewContainerRef
  }, {
    type: DxTemplateHost
  }, {
    type: Renderer2
  }, {
    type: NgZone
  }], {
    dxTemplateOf: [{
      type: Input
    }]
  });
})();
var DxTemplateModule = class _DxTemplateModule {
  /** @nocollapse */
  static ɵfac = function DxTemplateModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxTemplateModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxTemplateModule,
    imports: [DxTemplateDirective],
    exports: [DxTemplateDirective]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxTemplateModule, [{
    type: NgModule,
    args: [{
      imports: [DxTemplateDirective],
      exports: [DxTemplateDirective]
    }]
  }], null, null);
})();
var VISIBILITY_CHANGE_SELECTOR = "dx-visibility-change-handler";
var BaseNestedOption = class _BaseNestedOption {
  _host;
  _hostOptionPath;
  _collectionContainerImpl;
  _initialOptions = {};
  constructor() {
    this._collectionContainerImpl = new CollectionNestedOptionContainerImpl(this._setOption.bind(this), this._filterItems.bind(this));
  }
  _optionChangedHandler(e) {
    const fullOptionPath = this._fullOptionPath();
    if (e.fullName.indexOf(fullOptionPath) === 0) {
      const optionName = e.fullName.slice(fullOptionPath.length);
      const emitter = this[`${optionName}Change`];
      if (emitter) {
        emitter.next(e.value);
      }
    }
  }
  _createEventEmitters(events) {
    events.forEach((event) => {
      this[event.emit] = new EventEmitter();
    });
  }
  _getOption(name) {
    if (this.isLinked) {
      return this.instance.option(this._fullOptionPath() + name);
    }
    return this._initialOptions[name];
  }
  _setOption(name, value) {
    if (this.isLinked) {
      const fullPath = this._fullOptionPath() + name;
      this.instance.option(fullPath, value);
    } else {
      this._initialOptions[name] = value;
    }
  }
  _addRemovedOption(name) {
    if (this.instance && this.removedNestedComponents) {
      this.removedNestedComponents.push(name);
    }
  }
  _deleteRemovedOptions(name) {
    if (this.instance && this.removedNestedComponents) {
      this.removedNestedComponents = this.removedNestedComponents.filter((x) => !x.startsWith(name));
    }
  }
  _addRecreatedComponent() {
    if (this.instance && this.recreatedNestedComponents) {
      this.recreatedNestedComponents.push({
        getOptionPath: () => this._getOptionPath()
      });
    }
  }
  _getOptionPath() {
    return this._hostOptionPath() + this._optionPath;
  }
  setHost(host, optionPath) {
    this._host = host;
    this._hostOptionPath = optionPath;
    this.optionChangedHandlers.subscribe(this._optionChangedHandler.bind(this));
  }
  setChildren(propertyName, items) {
    this.resetOptions(propertyName);
    return this._collectionContainerImpl.setChildren(propertyName, items);
  }
  _filterItems(items) {
    return items.filter((item) => item !== this);
  }
  get instance() {
    return this._host?.instance;
  }
  get resetOptions() {
    return this._host && this._host.resetOptions;
  }
  get isRecreated() {
    return this._host && this._host.isRecreated;
  }
  get removedNestedComponents() {
    return this._host && this._host.removedNestedComponents;
  }
  set removedNestedComponents(value) {
    this._host.removedNestedComponents = value;
  }
  get recreatedNestedComponents() {
    return this._host && this._host.recreatedNestedComponents;
  }
  set recreatedNestedComponents(value) {
    this._host.recreatedNestedComponents = value;
  }
  get isLinked() {
    return !!this.instance && this._host.isLinked;
  }
  get optionChangedHandlers() {
    return this._host && this._host.optionChangedHandlers;
  }
  /** @nocollapse */
  static ɵfac = function BaseNestedOption_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaseNestedOption)();
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _BaseNestedOption,
    selectors: [["ng-component"]],
    decls: 0,
    vars: 0,
    template: function BaseNestedOption_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BaseNestedOption, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], () => [], null);
})();
var CollectionNestedOptionContainerImpl = class {
  _setOption;
  _filterItems;
  _activatedQueries = {};
  constructor(_setOption, _filterItems) {
    this._setOption = _setOption;
    this._filterItems = _filterItems;
  }
  setChildren(propertyName, items) {
    if (this._filterItems) {
      items = this._filterItems(items);
    }
    if (items.length) {
      this._activatedQueries[propertyName] = true;
    }
    if (this._activatedQueries[propertyName]) {
      const widgetItems = items.map((item, index) => {
        item._index = index;
        return item._value;
      });
      this._setOption(propertyName, widgetItems);
    }
  }
};
var NestedOption = class _NestedOption extends BaseNestedOption {
  setHost(host, optionPath) {
    super.setHost(host, optionPath);
    this._host[this._optionPath] = this._initialOptions;
  }
  _fullOptionPath() {
    return `${this._getOptionPath()}.`;
  }
  /** @nocollapse */
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵNestedOption_BaseFactory;
    return function NestedOption_Factory(__ngFactoryType__) {
      return (ɵNestedOption_BaseFactory || (ɵNestedOption_BaseFactory = ɵɵgetInheritedFactory(_NestedOption)))(__ngFactoryType__ || _NestedOption);
    };
  })();
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _NestedOption,
    selectors: [["ng-component"]],
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function NestedOption_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NestedOption, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], null, null);
})();
var CollectionNestedOption = class _CollectionNestedOption extends BaseNestedOption {
  _index;
  _fullOptionPath() {
    return `${this._getOptionPath()}[${this._index}].`;
  }
  get _value() {
    return this._initialOptions;
  }
  get isLinked() {
    return this._index !== void 0 && !!this.instance && this._host.isLinked;
  }
  /** @nocollapse */
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵCollectionNestedOption_BaseFactory;
    return function CollectionNestedOption_Factory(__ngFactoryType__) {
      return (ɵCollectionNestedOption_BaseFactory || (ɵCollectionNestedOption_BaseFactory = ɵɵgetInheritedFactory(_CollectionNestedOption)))(__ngFactoryType__ || _CollectionNestedOption);
    };
  })();
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _CollectionNestedOption,
    selectors: [["ng-component"]],
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function CollectionNestedOption_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CollectionNestedOption, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], null, null);
})();
var triggerShownEvent = function(element) {
  const changeHandlers = [];
  if (!renderer_default(element).hasClass(VISIBILITY_CHANGE_SELECTOR)) {
    changeHandlers.push(element);
  }
  changeHandlers.push.apply(changeHandlers, element.querySelectorAll(`.${VISIBILITY_CHANGE_SELECTOR}`));
  for (let i = 0; i < changeHandlers.length; i++) {
    triggerHandler(changeHandlers[i], "dxshown");
  }
};
function extractTemplate(option, element, renderer, document) {
  if (!option.template === void 0 || !element.nativeElement.hasChildNodes()) {
    return;
  }
  const childNodes = [].slice.call(element.nativeElement.childNodes);
  const userContent = childNodes.filter((n) => {
    if (n.tagName) {
      const tagNamePrefix = n.tagName.toLowerCase().substr(0, 3);
      return !(tagNamePrefix === "dxi" || tagNamePrefix === "dxo");
    }
    return n.nodeName !== "#comment" && n.textContent.replace(/\s/g, "").length;
  });
  if (!userContent.length) {
    return;
  }
  option.template = {
    render: (renderData) => {
      const result = element.nativeElement;
      dom_adapter_default.setClass(result, DX_TEMPLATE_WRAPPER_CLASS, true);
      if (renderData.container) {
        const container = getElement(renderData.container);
        const resultInContainer = container.contains(element.nativeElement);
        renderer.appendChild(container, element.nativeElement);
        if (!resultInContainer) {
          const resultInBody = document.body.contains(container);
          if (resultInBody) {
            triggerShownEvent(result);
          }
        }
      }
      return result;
    }
  };
}
var NestedOptionHost = class {
  _host;
  _optionPath;
  getHost() {
    return this._host;
  }
  setHost(host, optionPath) {
    this._host = host;
    this._optionPath = optionPath || (() => "");
  }
  setNestedOption(nestedOption) {
    nestedOption.setHost(this._host, this._optionPath);
    warnIfLegacyNestedComponent(nestedOption, this._host);
  }
};
var outsideZoneEvents = ["mousemove", "mouseover", "mouseout"];
var insideZoneEvents = ["mouseup", "click", "mousedown", "transitionend", "wheel"];
var originalAdd;
var callbacks = [];
var readyCallbackAdd = function(callback) {
  if (!originalAdd) {
    originalAdd = this.callBase.bind(this);
  }
  callbacks.push(callback);
};
ready_callbacks_default.inject({
  add(callback) {
    return readyCallbackAdd.call(this, callback);
  }
});
var doInjections = (document, ngZone, xhrFactory) => {
  if (Number(VERSION.major) < 12) {
    console.warn("Your version of Angular is not supported. Please update your project to version 12 or later. Please refer to the Angular Update Guide for more information: https://update.angular.io");
  }
  dom_adapter_default.inject({
    _document: document,
    listen(...args) {
      const eventName = args[1];
      if (outsideZoneEvents.includes(eventName)) {
        return ngZone.runOutsideAngular(() => this.callBase.apply(this, args));
      }
      if (ngZone.isStable && insideZoneEvents.includes(eventName)) {
        return ngZone.run(() => this.callBase.apply(this, args));
      }
      return this.callBase.apply(this, args);
    },
    isElementNode(element) {
      return element && element.nodeType === 1;
    },
    isTextNode(element) {
      return element && element.nodeType === 3;
    },
    isDocument(element) {
      return element && element.nodeType === 9;
    }
  });
  http_request_default.inject({
    getXhr() {
      if (!xhrFactory) {
        return this.callBase.apply(this);
      }
      const _xhr = xhrFactory.build();
      if (!("withCredentials" in _xhr)) {
        _xhr.withCredentials = false;
      }
      return _xhr;
    }
  });
  const runReadyCallbacksInZone = () => {
    ngZone.run(() => {
      m_events_engine_default.set({});
      callbacks.forEach((callback) => originalAdd.call(null, callback));
      callbacks = [];
      ready_callbacks_default.fire();
    });
  };
  runReadyCallbacksInZone();
  readyCallbackAdd = (callback) => ngZone.run(() => callback());
  doInjections = runReadyCallbacksInZone;
};
var DxIntegrationModule = class _DxIntegrationModule {
  static initialized = false;
  constructor(document, ngZone, xhrFactory) {
    doInjections(document, ngZone, xhrFactory);
    _DxIntegrationModule.initialized = true;
  }
  /** @nocollapse */
  static ɵfac = function DxIntegrationModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxIntegrationModule)(ɵɵinject(DOCUMENT), ɵɵinject(NgZone), ɵɵinject(XhrFactory, 8));
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxIntegrationModule
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxIntegrationModule, [{
    type: NgModule,
    args: [{}]
  }], () => [{
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: NgZone
  }, {
    type: XhrFactory,
    decorators: [{
      type: Optional
    }]
  }], null);
})();
config_default({
  buyNowLink: "https://go.devexpress.com/Licensing_Installer_Watermark_DevExtremeAngular.aspx",
  licensingDocLink: "https://go.devexpress.com/Licensing_Documentation_DevExtremeAngular.aspx"
});
var serverStateKey;
var getServerStateKey = () => {
  if (!serverStateKey) {
    serverStateKey = makeStateKey("DX_isPlatformServer");
  }
  return serverStateKey;
};
var DxComponent = class _DxComponent {
  element;
  ngZone;
  watcherHelper;
  transferState;
  platformId;
  _initialOptions = {};
  _optionsToUpdate = {};
  _collectionContainerImpl;
  eventHelper;
  optionChangedHandlers = new EventEmitter();
  templates;
  instance;
  isLinked = true;
  changedOptions = {};
  removedNestedComponents = [];
  recreatedNestedComponents;
  widgetUpdateLocked = false;
  templateUpdateRequired = false;
  _updateTemplates() {
    if (this.templates.length && this.templateUpdateRequired) {
      const updatedTemplates = {};
      this.templates.forEach((template) => {
        updatedTemplates[template.name] = template;
      });
      this.instance.option("integrationOptions.templates", updatedTemplates);
      this.templates = Object.values(updatedTemplates);
      this.templateUpdateRequired = false;
    }
  }
  _initEvents() {
    this.instance.on("optionChanged", (e) => {
      this.changedOptions[e.name] = e.value;
      const value = e.name === e.fullName ? e.value : e.component.option(e.name);
      this.eventHelper.fireNgEvent(`${e.name}Change`, [value]);
      this.optionChangedHandlers.emit(e);
    });
  }
  _initOptions() {
    this._initialOptions.integrationOptions.watchMethod = this.watcherHelper.getWatchMethod();
  }
  _initPlatform() {
    if (this.transferState.hasKey(getServerStateKey())) {
      this._initialOptions.integrationOptions.renderedOnServer = this.transferState.get(getServerStateKey(), null);
    } else if (isPlatformServer(this.platformId)) {
      this.transferState.set(getServerStateKey(), true);
    }
  }
  _createEventEmitters(events) {
    const zone = this.ngZone;
    this.eventHelper.createEmitters(events);
    this._initialOptions.eventsStrategy = (instance) => {
      const strategy = new NgEventsStrategy(instance, zone);
      events.filter((event) => event.subscribe).forEach((event) => {
        strategy.addEmitter(event.subscribe, this[event.emit]);
      });
      return strategy;
    };
    this._initialOptions.nestedComponentOptions = function(component) {
      return {
        eventsStrategy: (instance) => new NgEventsStrategy(instance, zone),
        nestedComponentOptions: component.option("nestedComponentOptions")
      };
    };
  }
  _shouldOptionChange(name, value) {
    if (this.changedOptions.hasOwnProperty(name)) {
      const prevValue = this.changedOptions[name];
      delete this.changedOptions[name];
      return value !== prevValue;
    }
    return true;
  }
  clearChangedOptions() {
    this.changedOptions = {};
  }
  _getOption(name) {
    return this.instance ? this.instance.option(name) : this._initialOptions[name];
  }
  lockWidgetUpdate() {
    if (!this.widgetUpdateLocked && this.instance) {
      this.instance.beginUpdate();
      this.widgetUpdateLocked = true;
    }
  }
  unlockWidgetUpdate() {
    if (this.widgetUpdateLocked) {
      this.widgetUpdateLocked = false;
      this.instance.endUpdate();
    }
  }
  _setOption(name, value) {
    this.lockWidgetUpdate();
    if (!this._shouldOptionChange(name, value)) {
      return;
    }
    if (this.instance) {
      this.instance.option(name, value);
    } else {
      this._initialOptions[name] = value;
    }
  }
  _createWidget(element) {
    this._initialOptions.integrationOptions = {};
    this._initPlatform();
    this._initOptions();
    this._initialOptions.onInitializing = function() {
      this.beginUpdate();
    };
    this.instance = this._createInstance(element, this._initialOptions);
    this._initEvents();
    this._initialOptions = {};
  }
  _destroyWidget() {
    this.removedNestedComponents = [];
    if (this.instance) {
      const element = this.instance.element();
      triggerHandler(element, "dxremove", {
        _angularIntegration: true
      });
      this.instance.dispose();
      dom_adapter_default.removeElement(element);
    }
  }
  _setChildren(propertyName, value, className) {
    if (this.checkContentChildren(propertyName, value, className)) {
      this.setContentChildren(propertyName, value, className);
      this.setChildren(propertyName, value);
    }
  }
  constructor(element, ngZone, templateHost, watcherHelper, transferState, platformId) {
    this.element = element;
    this.ngZone = ngZone;
    this.watcherHelper = watcherHelper;
    this.transferState = transferState;
    this.platformId = platformId;
    if (!DxIntegrationModule.initialized) {
      createNgModule(DxIntegrationModule, inject(Injector));
    }
    this.templates = [];
    templateHost.setHost(this);
    this._collectionContainerImpl = new CollectionNestedOptionContainerImpl(this._setOption.bind(this));
    this.eventHelper = new EmitterHelper(ngZone, this);
  }
  ngOnChanges(changes) {
    for (const key in changes) {
      const change = changes[key];
      if (change.currentValue !== this[key]) {
        this._optionsToUpdate[key] = changes[key].currentValue;
      }
    }
  }
  ngOnInit() {
    this._createWidget(this.element.nativeElement);
  }
  ngDoCheck() {
    this.applyOptions();
  }
  ngAfterContentChecked() {
    this.applyOptions();
    this.resetOptions();
    this.unlockWidgetUpdate();
  }
  ngAfterViewInit() {
    this._updateTemplates();
    this.instance.endUpdate();
    this.recreatedNestedComponents = [];
  }
  ngAfterViewChecked() {
    this._updateTemplates();
  }
  applyOptions() {
    if (Object.keys(this._optionsToUpdate).length) {
      if (this.instance) {
        this.instance.option(this._optionsToUpdate);
      }
      this._optionsToUpdate = {};
    }
  }
  resetOptions(collectionName) {
    if (this.instance) {
      this.removedNestedComponents.filter((option) => option && !this.isRecreated(option) && collectionName ? option.startsWith(collectionName) : true).forEach((option) => {
        this.instance.resetOption(option);
      });
      this.removedNestedComponents = [];
      this.recreatedNestedComponents = [];
    }
  }
  isRecreated(name) {
    return this.recreatedNestedComponents && this.recreatedNestedComponents.some((nestedComponent) => nestedComponent.getOptionPath() === name);
  }
  setTemplate(template) {
    this.templates.push(template);
    this.templateUpdateRequired = true;
  }
  contentChildren = {};
  checkContentChildren(propertyName, items, className) {
    if (this.contentChildren[propertyName] && this.contentChildren[propertyName] !== className) {
      if (items.length > 0) {
        if (console && console.warn) {
          console.warn(`In ${this.constructor.name}, 
          the nested ${className} and ${this.contentChildren[propertyName]} components are incompatible. 
          Ensure that all nested components in the content area match.`);
        }
      }
      return false;
    }
    return true;
  }
  setContentChildren(propertyName, items, className) {
    if (items.length > 0) {
      this.contentChildren[propertyName] = className;
    }
  }
  setChildren(propertyName, items) {
    this.resetOptions(propertyName);
    return this._collectionContainerImpl.setChildren(propertyName, items);
  }
  /** @nocollapse */
  static ɵfac = function DxComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxComponent,
    selectors: [["ng-component"]],
    features: [ɵɵNgOnChangesFeature],
    decls: 0,
    vars: 0,
    template: function DxComponent_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxComponent, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], () => [{
    type: ElementRef
  }, {
    type: NgZone
  }, {
    type: DxTemplateHost
  }, {
    type: WatcherHelper
  }, {
    type: TransferState
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], null);
})();
var DxComponentExtension = class _DxComponentExtension extends DxComponent {
  createInstance(element) {
    this._createWidget(element);
  }
  ngOnInit() {
  }
  ngAfterViewInit() {
    this._createWidget(this.element.nativeElement);
    this.instance.endUpdate();
  }
  /** @nocollapse */
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵDxComponentExtension_BaseFactory;
    return function DxComponentExtension_Factory(__ngFactoryType__) {
      return (ɵDxComponentExtension_BaseFactory || (ɵDxComponentExtension_BaseFactory = ɵɵgetInheritedFactory(_DxComponentExtension)))(__ngFactoryType__ || _DxComponentExtension);
    };
  })();
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxComponentExtension,
    selectors: [["ng-component"]],
    features: [ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxComponentExtension_Template(rf, ctx) {
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxComponentExtension, [{
    type: Component,
    args: [{
      template: ""
    }]
  }], null, null);
})();
function isIterable(value) {
  return value && typeof value[Symbol.iterator] === "function";
}
var IterableDifferHelper = class _IterableDifferHelper {
  _differs;
  _host;
  _propertyDiffers = {};
  constructor(_differs) {
    this._differs = _differs;
  }
  setHost(host) {
    this._host = host;
  }
  setup(prop, changes) {
    if (prop in changes) {
      const value = changes[prop].currentValue;
      this.setupSingle(prop, value);
    }
  }
  setupSingle(prop, value) {
    if (value && Array.isArray(value)) {
      if (!this._propertyDiffers[prop]) {
        try {
          this._propertyDiffers[prop] = this._differs.find(value).create(null);
          return true;
        } catch (e) {
        }
      }
    } else {
      delete this._propertyDiffers[prop];
    }
    return false;
  }
  getChanges(prop, value) {
    if (this._propertyDiffers[prop]) {
      return this._propertyDiffers[prop].diff(value);
    }
  }
  checkChangedOptions(propName, hostValue) {
    return this._host.changedOptions[propName] === hostValue;
  }
  doCheck(prop) {
    if (this._propertyDiffers[prop] && this._host.instance) {
      const hostValue = this._host[prop];
      const changes = isIterable(hostValue) && this.getChanges(prop, hostValue);
      if (changes && !this.checkChangedOptions(prop, hostValue)) {
        this._host.lockWidgetUpdate();
        this._host.instance.option(prop, hostValue);
      }
    }
  }
  /** @nocollapse */
  static ɵfac = function IterableDifferHelper_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _IterableDifferHelper)(ɵɵinject(IterableDiffers));
  };
  /** @nocollapse */
  static ɵprov = ɵɵdefineInjectable({
    token: _IterableDifferHelper,
    factory: _IterableDifferHelper.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(IterableDifferHelper, [{
    type: Injectable
  }], () => [{
    type: IterableDiffers
  }], null);
})();
var DxServerTransferStateModule = class _DxServerTransferStateModule {
  state;
  platformId;
  constructor(state, platformId) {
    this.state = state;
    this.platformId = platformId;
    const that = this;
    ajax_default.inject({
      sendRequest(...args) {
        const key = makeStateKey(that.generateKey(args));
        const cachedData = that.state.get(key, null);
        if (isPlatformServer(that.platformId)) {
          const result = this.callBase.apply(this, args);
          result.always((data, status) => {
            const dataForCache = {
              data,
              status
            };
            that.state.set(key, dataForCache);
          });
          return result;
        }
        if (cachedData) {
          const d = Deferred();
          d.resolve(cachedData.data, cachedData.status);
          that.state.set(key, null);
          return d.promise();
        }
        return this.callBase.apply(this, args);
      }
    });
  }
  generateKey(args) {
    let keyValue = "";
    for (const key in args) {
      if (typeof args[key] === "object") {
        const objKey = this.generateKey(args[key]);
        keyValue += key + objKey;
      } else {
        keyValue += key + args[key];
      }
    }
    return keyValue;
  }
  /** @nocollapse */
  static ɵfac = function DxServerTransferStateModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxServerTransferStateModule)(ɵɵinject(TransferState), ɵɵinject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxServerTransferStateModule
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxServerTransferStateModule, [{
    type: NgModule,
    args: [{}]
  }], () => [{
    type: TransferState
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], null);
})();

export {
  DxTemplateHost,
  NgEventsStrategy,
  EmitterHelper,
  WatcherHelper,
  getElement,
  logWarning,
  DX_TEMPLATE_WRAPPER_CLASS,
  RenderData,
  DxTemplateDirective,
  DxTemplateModule,
  BaseNestedOption,
  CollectionNestedOptionContainerImpl,
  NestedOption,
  CollectionNestedOption,
  extractTemplate,
  NestedOptionHost,
  DxIntegrationModule,
  getServerStateKey,
  DxComponent,
  DxComponentExtension,
  IterableDifferHelper,
  DxServerTransferStateModule
};
//# sourceMappingURL=chunk-2IQ2ZJDO.js.map
