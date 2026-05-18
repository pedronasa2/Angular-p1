import {
  widget_default
} from "./chunk-GIPB2Z36.js";
import {
  m_data_helper_default
} from "./chunk-D6FPLQ4Z.js";
import {
  DataSource,
  m_query_default,
  normalizeLoadResult
} from "./chunk-TVYHC7GO.js";
import {
  message_default2 as message_default
} from "./chunk-EMRGXNWD.js";
import {
  CLICK_EVENT_NAME,
  TemplateBase,
  action_default,
  addNamespace,
  attachInstanceToElement,
  eventData,
  eventDelta,
  findTemplates,
  fireEvent,
  focusable,
  getInstanceByElement,
  getPublicElement,
  getUniqueValues,
  isCommandKeyPressed,
  isMouseEvent,
  m_emitter_default,
  m_emitter_registrator_default,
  m_event_registrator_default,
  m_pointer_default,
  removeDuplicates,
  removeEvent
} from "./chunk-4VCY6VPW.js";
import {
  m_devices_default,
  m_support_default
} from "./chunk-KTSDTV35.js";
import {
  ui_errors_default
} from "./chunk-V5IPHRES.js";
import {
  getOuterHeight,
  getOuterWidth,
  renderer_default
} from "./chunk-H2RLU3GL.js";
import {
  m_events_engine_default
} from "./chunk-WDK64ZWV.js";
import {
  Deferred,
  class_default,
  compileGetter,
  deferRenderer,
  dom_adapter_default,
  each,
  ensureDefined,
  equalByValue,
  extend,
  fromPromise,
  getKeyHash,
  guid_default2 as guid_default,
  isDefined,
  isFunction,
  isNumeric,
  isObject,
  isPlainObject,
  isPrimitive,
  isPromise,
  isRenderer,
  isString,
  logger,
  m_window_default,
  noop,
  when
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/__internal/events/m_hold.js
var {
  abs
} = Math;
var HoldEmitter = m_emitter_default.inherit({
  start(e) {
    this._startEventData = eventData(e);
    this._startTimer(e);
  },
  _startTimer(e) {
    const holdTimeout = "timeout" in this ? this.timeout : 750;
    this._holdTimer = setTimeout(() => {
      this._requestAccept(e);
      this._fireEvent("dxhold", e, {
        target: e.target
      });
      this._forgetAccept();
    }, holdTimeout);
  },
  move(e) {
    if (this._touchWasMoved(e)) {
      this._cancel(e);
    }
  },
  _touchWasMoved(e) {
    const delta = eventDelta(this._startEventData, eventData(e));
    return abs(delta.x) > 5 || abs(delta.y) > 5;
  },
  end() {
    this._stopTimer();
  },
  _stopTimer() {
    clearTimeout(this._holdTimer);
  },
  cancel() {
    this._stopTimer();
  },
  dispose() {
    this._stopTimer();
  }
});
m_emitter_registrator_default({
  emitter: HoldEmitter,
  bubble: true,
  events: ["dxhold"]
});
var m_hold_default = {
  name: "dxhold"
};

// node_modules/devextreme/esm/__internal/events/m_contextmenu.js
var CONTEXTMENU_NAMESPACED_EVENT_NAME = addNamespace("contextmenu", "dxContexMenu");
var HOLD_NAMESPACED_EVENT_NAME = addNamespace(m_hold_default.name, "dxContexMenu");
var ContextMenu = class_default.inherit({
  setup(element) {
    const $element = renderer_default(element);
    m_events_engine_default.on($element, CONTEXTMENU_NAMESPACED_EVENT_NAME, this._contextMenuHandler.bind(this));
    if (m_support_default.touch || m_devices_default.isSimulator()) {
      m_events_engine_default.on($element, HOLD_NAMESPACED_EVENT_NAME, this._holdHandler.bind(this));
    }
  },
  _holdHandler(e) {
    if (isMouseEvent(e) && !m_devices_default.isSimulator()) {
      return;
    }
    this._fireContextMenu(e);
  },
  _contextMenuHandler(e) {
    this._fireContextMenu(e);
  },
  _fireContextMenu: (e) => fireEvent({
    type: "dxcontextmenu",
    originalEvent: e
  }),
  teardown(element) {
    m_events_engine_default.off(element, ".dxContexMenu");
  }
});
m_event_registrator_default("dxcontextmenu", new ContextMenu());
var name = "dxcontextmenu";

// node_modules/devextreme/esm/__internal/core/templates/m_bindable_template.js
var watchChanges = function(rawData, watchMethod, fields, fieldsMap, callback) {
  let fieldsDispose;
  const globalDispose = ((data, watchMethod2, callback2) => watchMethod2(() => data, callback2))(rawData, watchMethod, (dataWithRawFields) => {
    fieldsDispose && fieldsDispose();
    if (isPrimitive(dataWithRawFields)) {
      callback(dataWithRawFields);
      return;
    }
    fieldsDispose = (function(data, watchMethod2, fields2, fieldsMap2, callback2) {
      const resolvedData = {};
      const missedFields = fields2.slice();
      const watchHandlers = fields2.map((name2) => {
        const fieldGetter = fieldsMap2[name2];
        return watchMethod2(fieldGetter ? () => fieldGetter(data) : () => data[name2], (value) => {
          resolvedData[name2] = value;
          if (missedFields.length) {
            const index = missedFields.indexOf(name2);
            if (index >= 0) {
              missedFields.splice(index, 1);
            }
          }
          if (!missedFields.length) {
            callback2(resolvedData);
          }
        });
      });
      return function() {
        watchHandlers.forEach((dispose) => dispose());
      };
    })(dataWithRawFields, watchMethod, fields, fieldsMap, callback);
  });
  return function() {
    fieldsDispose && fieldsDispose();
    globalDispose && globalDispose();
  };
};
var BindableTemplate = class extends TemplateBase {
  constructor(render, fields, watchMethod, fieldsMap) {
    super();
    this._render = render;
    this._fields = fields;
    this._fieldsMap = fieldsMap || {};
    this._watchMethod = watchMethod;
  }
  _renderCore(options) {
    const $container = renderer_default(options.container);
    const dispose = watchChanges(options.model, this._watchMethod, this._fields, this._fieldsMap, (data) => {
      $container.empty();
      this._render($container, data, options.model);
    });
    m_events_engine_default.on($container, removeEvent, dispose);
    return $container.contents();
  }
};

// node_modules/devextreme/esm/__internal/ui/collection/item.js
var forcibleWatcher = (watchMethod, fn, callback) => {
  const filteredCallback = /* @__PURE__ */ (() => {
    let oldValue;
    return (value) => {
      if (oldValue !== value) {
        callback(value, oldValue);
        oldValue = value;
      }
    };
  })();
  return {
    dispose: watchMethod(fn, filteredCallback),
    force() {
      filteredCallback(fn());
    }
  };
};
var CollectionItem = class {
  constructor($element, options, rawData) {
    this._$element = $element;
    this._options = options;
    this._rawData = rawData;
    attachInstanceToElement($element, this, this._dispose);
    this._render();
  }
  _render() {
    const $placeholder = renderer_default("<div>").addClass("dx-item-content-placeholder");
    this._$element.append($placeholder);
    this._watchers = [];
    this._renderWatchers();
  }
  _renderWatchers() {
    this._startWatcher("disabled", this._renderDisabled.bind(this));
    this._startWatcher("visible", this._renderVisible.bind(this));
  }
  _startWatcher(field, render) {
    const rawData = this._rawData;
    const exprGetter = this._options.fieldGetter(field);
    const watcher = forcibleWatcher(this._options.watchMethod(), () => exprGetter(rawData), (value, oldValue) => {
      this._dirty = true;
      render(value, oldValue);
    });
    this._watchers.push(watcher);
  }
  setDataField() {
    this._dirty = false;
    each(this._watchers, (_, watcher) => {
      watcher.force();
    });
    return this._dirty;
  }
  _renderDisabled(value, oldValue) {
    this._$element.toggleClass("dx-state-disabled", !!value);
    this._$element.attr("aria-disabled", !!value);
    this._updateOwnerFocus(value);
  }
  _updateOwnerFocus(isDisabled) {
    const ownerComponent = this._options.owner;
    if (ownerComponent && isDisabled) {
      ownerComponent._resetItemFocus(this._$element);
    }
  }
  _renderVisible(value, oldValue) {
    this._$element.toggleClass("dx-state-invisible", void 0 !== value && !value);
  }
  _dispose() {
    each(this._watchers, (_, watcher) => {
      watcher.dispose();
    });
  }
  static getInstance($element) {
    return getInstanceByElement($element, this);
  }
  static isClickableItem(item) {
    return isObject(item) && "onClick" in item;
  }
};
var item_default = CollectionItem;

// node_modules/devextreme/esm/__internal/core/utils/m_selection_filter.js
var SelectionFilterCreator = function(selectedItemKeys, isSelectAll) {
  this.getLocalFilter = function(keyGetter, equalKeys, equalByReference, keyExpr) {
    equalKeys = void 0 === equalKeys ? equalByValue : equalKeys;
    return functionFilter.bind(this, equalKeys, keyGetter, equalByReference, keyExpr);
  };
  this.getExpr = function(keyExpr) {
    if (!keyExpr) {
      return;
    }
    let filterExpr;
    selectedItemKeys.forEach(function(key, index) {
      filterExpr = filterExpr || [];
      let filterExprPart;
      if (index > 0) {
        filterExpr.push(isSelectAll ? "and" : "or");
      }
      if (isString(keyExpr) || isFunction(keyExpr)) {
        filterExprPart = getFilterForPlainKey(keyExpr, key);
      } else {
        filterExprPart = (function(keyExpr2, itemKeyValue) {
          const filterExpr2 = [];
          for (let i = 0, {
            length
          } = keyExpr2; i < length; i++) {
            const currentKeyExpr = keyExpr2[i];
            const keyValueGetter = compileGetter(currentKeyExpr);
            const currentKeyValue = itemKeyValue && keyValueGetter(itemKeyValue);
            const filterExprPart2 = getFilterForPlainKey(currentKeyExpr, currentKeyValue);
            if (!filterExprPart2) {
              break;
            }
            if (i > 0) {
              filterExpr2.push(isSelectAll ? "or" : "and");
            }
            filterExpr2.push(filterExprPart2);
          }
          return filterExpr2;
        })(keyExpr, key);
      }
      filterExpr.push(filterExprPart);
    });
    if (filterExpr && 1 === filterExpr.length) {
      filterExpr = filterExpr[0];
    }
    return filterExpr;
  };
  this.getCombinedFilter = function(keyExpr, dataSourceFilter) {
    let forceCombinedFilter = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
    const filterExpr = this.getExpr(keyExpr);
    let combinedFilter = filterExpr;
    if ((forceCombinedFilter || isSelectAll) && dataSourceFilter) {
      if (filterExpr) {
        combinedFilter = [];
        combinedFilter.push(filterExpr);
        combinedFilter.push(dataSourceFilter);
      } else {
        combinedFilter = dataSourceFilter;
      }
    }
    return combinedFilter;
  };
  let selectedItemKeyHashesMap;
  const getSelectedItemKeyHashesMap = function(keyOf, keyExpr) {
    if (!selectedItemKeyHashesMap) {
      selectedItemKeyHashesMap = {};
      const normalizedKeys = normalizeKeys(selectedItemKeys, keyOf, keyExpr);
      for (let i = 0; i < normalizedKeys.length; i++) {
        selectedItemKeyHashesMap[getKeyHash(normalizedKeys[i])] = true;
      }
    }
    return selectedItemKeyHashesMap;
  };
  const normalizeKeys = function(keys, keyOf, keyExpr) {
    return Array.isArray(keyExpr) ? keys.map((key) => keyOf(key)) : keys;
  };
  function functionFilter(equalKeys, keyOf, equalByReference, keyExpr, item) {
    const key = keyOf(item);
    let keyHash;
    let i;
    if (!equalByReference) {
      keyHash = getKeyHash(key);
      if (!isObject(keyHash)) {
        const selectedKeyHashesMap = getSelectedItemKeyHashesMap(keyOf, keyExpr);
        if (selectedKeyHashesMap[keyHash]) {
          return !isSelectAll;
        }
        return !!isSelectAll;
      }
    }
    for (i = 0; i < selectedItemKeys.length; i++) {
      if (equalKeys(selectedItemKeys[i], key)) {
        return !isSelectAll;
      }
    }
    return !!isSelectAll;
  }
  function getFilterForPlainKey(keyExpr, keyValue) {
    if (void 0 === keyValue) {
      return;
    }
    return [keyExpr, isSelectAll ? "<>" : "=", keyValue];
  }
};

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.base.js
var ITEM_CLASS = "dx-item";
var EMPTY_COLLECTION = "dx-empty-collection";
var ITEM_PATH_REGEX = /^([^.]+\[\d+\]\.)+([\w.]+)$/;
var CollectionWidget = class extends widget_default {
  _activeStateUnit() {
    return `.${ITEM_CLASS}`;
  }
  _supportedKeys() {
    const move = (location, e) => {
      if (!isCommandKeyPressed(e)) {
        e.preventDefault();
        e.stopPropagation();
        this._moveFocus(location, e);
      }
    };
    return Object.assign({}, super._supportedKeys(), {
      space: (e) => {
        e.preventDefault();
        this._enterKeyHandler(e);
      },
      enter: this._enterKeyHandler,
      leftArrow: move.bind(this, "left"),
      rightArrow: move.bind(this, "right"),
      upArrow: move.bind(this, "up"),
      downArrow: move.bind(this, "down"),
      pageUp: move.bind(this, "up"),
      pageDown: move.bind(this, "down"),
      home: move.bind(this, "first"),
      end: move.bind(this, "last")
    });
  }
  _getHandlerExtendedParams(e, $target) {
    const params = extend({}, e, {
      target: $target.get(0),
      currentTarget: $target.get(0)
    });
    return params;
  }
  _enterKeyHandler(e) {
    const {
      focusedElement
    } = this.option();
    const $itemElement = renderer_default(focusedElement);
    if (!$itemElement.length) {
      return;
    }
    const itemData = this._getItemData($itemElement);
    if (item_default.isClickableItem(itemData)) {
      const actionArgs = {
        event: e
      };
      this._itemEventHandlerByHandler($itemElement, itemData.onClick, actionArgs);
    }
    this._itemClickHandler(this._getHandlerExtendedParams(e, $itemElement));
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      selectOnFocus: false,
      loopItemFocus: true,
      items: [],
      itemTemplate: "item",
      onItemRendered: null,
      onItemClick: null,
      onItemHold: null,
      itemHoldTimeout: 750,
      onItemContextMenu: null,
      onFocusedItemChanged: null,
      noDataText: message_default.format("dxCollectionWidget-noDataText"),
      encodeNoDataText: false,
      dataSource: null,
      _dataController: null,
      _itemAttributes: {},
      itemTemplateProperty: "template",
      focusedElement: null,
      displayExpr: void 0,
      disabledExpr: (data) => data ? data.disabled : void 0,
      visibleExpr: (data) => data ? data.visible : void 0
    });
  }
  _init() {
    this._compileDisplayGetter();
    this._initDataController();
    super._init();
    this._cleanRenderedItems();
    this._refreshDataSource();
  }
  _compileDisplayGetter() {
    const {
      displayExpr
    } = this.option();
    this._displayGetter = displayExpr ? compileGetter(displayExpr) : void 0;
  }
  _initTemplates() {
    this._initItemsFromMarkup();
    this._initDefaultItemTemplate();
    super._initTemplates();
  }
  _getAnonymousTemplateName() {
    return "item";
  }
  _initDefaultItemTemplate() {
    const fieldsMap = this._getFieldsMap();
    this._templateManager.addDefaultTemplates({
      item: new BindableTemplate(($container, data) => {
        if (isPlainObject(data)) {
          this._prepareDefaultItemTemplate(data, $container);
        } else {
          if (fieldsMap && isFunction(fieldsMap.text)) {
            data = fieldsMap.text(data);
          }
          $container.text(String(ensureDefined(data, "")));
        }
      }, this._getBindableFields(), this.option("integrationOptions.watchMethod"), fieldsMap)
    });
  }
  _getBindableFields() {
    return ["text", "html"];
  }
  _getFieldsMap() {
    if (this._displayGetter) {
      return {
        text: this._displayGetter
      };
    }
    return;
  }
  _prepareDefaultItemTemplate(data, $container) {
    const {
      text,
      html
    } = data;
    if (isDefined(text)) {
      $container.text(text);
    }
    if (isDefined(html)) {
      $container.html(html);
    }
  }
  _initItemsFromMarkup() {
    const rawItems = findTemplates(this.$element(), "dxItem");
    const {
      items: userItems = []
    } = this.option();
    if (!rawItems.length || userItems.length) {
      return;
    }
    const items = rawItems.map((_ref) => {
      let {
        element,
        options
      } = _ref;
      const isTemplateRequired = /\S/.test(element.innerHTML) && !options.template;
      if (isTemplateRequired) {
        options.template = this._prepareItemTemplate(element);
      } else {
        renderer_default(element).remove();
      }
      return options;
    });
    this.option("items", items);
  }
  _prepareItemTemplate(item) {
    const templateId = `tmpl-${new guid_default()}`;
    const $template = renderer_default(item).detach().clone().removeAttr("data-options").addClass("dx-template-wrapper");
    this._saveTemplate(templateId, $template);
    return templateId;
  }
  _dataSourceOptions() {
    return {
      paginate: false
    };
  }
  _cleanRenderedItems() {
    this._renderedItemsCount = 0;
  }
  _focusTarget() {
    return this.$element();
  }
  _focusInHandler(e) {
    super._focusInHandler(e);
    if (!this._isFocusTarget(e.target)) {
      return;
    }
    const {
      focusedElement
    } = this.option();
    const $focusedElement = renderer_default(focusedElement);
    if ($focusedElement.length) {
      this._shouldSkipSelectOnFocus = true;
      this._setFocusedItem($focusedElement);
      this._shouldSkipSelectOnFocus = false;
    } else {
      const $activeItem = this._getActiveItem();
      if ($activeItem.length) {
        this.option("focusedElement", getPublicElement($activeItem));
      }
    }
  }
  _focusOutHandler(e) {
    super._focusOutHandler(e);
    const {
      focusedElement
    } = this.option();
    const $target = renderer_default(focusedElement);
    this._updateFocusedItemState($target, false);
  }
  _findActiveTarget($element) {
    return $element.find(this._activeStateUnit());
  }
  _getActiveItem(last) {
    const {
      focusedElement
    } = this.option();
    const $focusedElement = renderer_default(focusedElement);
    if ($focusedElement.length) {
      return $focusedElement;
    }
    return this._determineFocusedElement(last);
  }
  _determineFocusedElement(last) {
    let index = this._getFocusedElementIndex();
    const activeElements = this._getActiveElement();
    const lastIndex = activeElements.length - 1;
    if (index < 0) {
      index = last ? lastIndex : 0;
    }
    return activeElements.eq(index);
  }
  _getFocusedElementIndex() {
    return 0;
  }
  _moveFocus(location, e) {
    const $items = this._getAvailableItems();
    let $newTarget = renderer_default();
    switch (location) {
      case "pageup":
      case "up":
        $newTarget = this._prevItem($items);
        break;
      case "pagedown":
      case "down":
        $newTarget = this._nextItem($items);
        break;
      case "right": {
        const {
          rtlEnabled
        } = this.option();
        $newTarget = rtlEnabled ? this._prevItem($items) : this._nextItem($items);
        break;
      }
      case "left": {
        const {
          rtlEnabled
        } = this.option();
        $newTarget = rtlEnabled ? this._nextItem($items) : this._prevItem($items);
        break;
      }
      case "first":
        $newTarget = $items.first();
        break;
      case "last":
        $newTarget = $items.last();
        break;
      default:
        return false;
    }
    if (0 !== $newTarget.length) {
      this.option("focusedElement", getPublicElement($newTarget));
    }
  }
  _getVisibleItems($itemElements) {
    const $items = $itemElements ?? this._itemElements();
    return $items.filter(":visible");
  }
  _getAvailableItems($itemElements) {
    return this._getVisibleItems($itemElements);
  }
  _prevItem($items) {
    const $target = this._getActiveItem();
    const targetIndex = $items.index($target);
    const $last = $items.last();
    let $item = renderer_default($items[targetIndex - 1]);
    const {
      loopItemFocus
    } = this.option();
    if (0 === $item.length && loopItemFocus) {
      $item = $last;
    }
    return $item;
  }
  _nextItem($items) {
    const $target = this._getActiveItem(true);
    const targetIndex = $items.index($target);
    const $first = $items.first();
    let $item = renderer_default($items[targetIndex + 1]);
    const {
      loopItemFocus
    } = this.option();
    if (0 === $item.length && loopItemFocus) {
      $item = $first;
    }
    return $item;
  }
  _selectFocusedItem($target) {
    this.selectItem($target);
  }
  _updateFocusedItemState(target, isFocused, needCleanItemId) {
    const $target = renderer_default(target);
    if ($target.length) {
      this._refreshActiveDescendant();
      this._refreshItemId($target, needCleanItemId);
      const {
        focusStateEnabled
      } = this.option();
      if (focusStateEnabled) {
        this._toggleFocusClass(isFocused, $target);
      }
    }
    this._updateParentActiveDescendant();
  }
  _getElementClassToSkipRefreshId() {
    return "";
  }
  _shouldSkipRefreshId(target) {
    const elementClass = this._getElementClassToSkipRefreshId();
    const shouldSkipRefreshId = renderer_default(target).hasClass(elementClass);
    return shouldSkipRefreshId;
  }
  _refreshActiveDescendant($target) {
    const {
      focusedElement
    } = this.option();
    if (isDefined(focusedElement)) {
      const shouldSetExistingId = this._shouldSkipRefreshId(focusedElement);
      const id = shouldSetExistingId ? renderer_default(focusedElement).attr("id") : this.getFocusedItemId();
      this.setAria("activedescendant", id, $target);
      return;
    }
    this.setAria("activedescendant", null, $target);
  }
  _refreshItemId($target, needCleanItemId) {
    const {
      focusedElement
    } = this.option();
    const shouldSkipRefreshId = this._shouldSkipRefreshId($target);
    if (shouldSkipRefreshId) {
      return;
    }
    if (!needCleanItemId && focusedElement) {
      this.setAria("id", this.getFocusedItemId(), $target);
    } else {
      this.setAria("id", null, $target);
    }
  }
  _isDisabled($element) {
    return $element && "true" === renderer_default($element).attr("aria-disabled");
  }
  _setFocusedItem($target) {
    if (!(null !== $target && void 0 !== $target && $target.length)) {
      return;
    }
    this._updateFocusedItemState($target, true);
    this.onFocusedItemChanged(this.getFocusedItemId());
    const {
      selectOnFocus
    } = this.option();
    const isTargetDisabled = this._isDisabled($target);
    if (selectOnFocus && !isTargetDisabled && !this._shouldSkipSelectOnFocus) {
      this._selectFocusedItem($target);
    }
  }
  _findItemElementByItem(item) {
    let result = renderer_default();
    const itemDataKey = this._itemDataKey();
    this.itemElements().each((_index, itemElement) => {
      const $item = renderer_default(itemElement);
      if ($item.data(itemDataKey) === item) {
        result = $item;
        return false;
      }
      return true;
    });
    return result;
  }
  _getIndexByItem(item) {
    const {
      items
    } = this.option();
    return items.indexOf(item);
  }
  _itemOptionChanged(item, property, value, prevValue) {
    const $item = this._findItemElementByItem(item);
    if (!$item.length) {
      return;
    }
    if (!this.constructor.ItemClass.getInstance($item).setDataField(property, value)) {
      this._refreshItem($item, item);
    }
    const isDisabling = "disabled" === property && value;
    if (isDisabling) {
      this._resetItemFocus($item);
    }
  }
  _resetItemFocus($item) {
    const {
      focusedElement
    } = this.option();
    if ($item.is(focusedElement)) {
      this._resetFocusedElement();
    }
  }
  _resetFocusedElement() {
    this.option("focusedElement", null);
  }
  _refreshItem($item, item) {
    const itemData = this._getItemData($item);
    const index = $item.data(this._itemIndexKey());
    this._renderItem(this._renderedItemsCount + index, itemData, null, $item);
  }
  _updateParentActiveDescendant() {
  }
  _optionChanged(args) {
    const {
      name: name2,
      value,
      previousValue,
      fullName
    } = args;
    if ("items" === name2) {
      const matches = fullName.match(ITEM_PATH_REGEX);
      if (null !== matches && void 0 !== matches && matches.length) {
        const property = matches[matches.length - 1];
        const itemPath = fullName.replace(`.${property}`, "");
        const item = this.option(itemPath);
        this._itemOptionChanged(item, property, value, previousValue);
        return;
      }
    }
    switch (name2) {
      case "items":
      case "_itemAttributes":
      case "itemTemplateProperty":
      case "useItemTextAsTitle":
        this._cleanRenderedItems();
        this._invalidate();
        break;
      case "dataSource":
        this._refreshDataSource();
        this._renderEmptyMessage();
        break;
      case "noDataText":
      case "encodeNoDataText":
        this._renderEmptyMessage();
        break;
      case "itemTemplate":
      case "visibleExpr":
      case "disabledExpr":
        this._invalidate();
        break;
      case "onItemRendered":
        this._createItemRenderAction();
        break;
      case "onItemClick":
      case "selectOnFocus":
      case "loopItemFocus":
        break;
      case "onItemHold":
      case "itemHoldTimeout":
        this._attachHoldEvent();
        break;
      case "onItemContextMenu":
        this._attachContextMenuEvent();
        break;
      case "onFocusedItemChanged":
        this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
        break;
      case "focusedElement":
        this._updateFocusedItemState(previousValue, false, true);
        this._setFocusedItem(renderer_default(value));
        break;
      case "displayExpr":
        this._compileDisplayGetter();
        this._initDefaultItemTemplate();
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _invalidate() {
    this._resetFocusedElement();
    super._invalidate();
  }
  _loadNextPage() {
    this._expectNextPageLoading();
    return this._dataController.loadNextPage();
  }
  _expectNextPageLoading() {
    this._startIndexForAppendedItems = 0;
  }
  _expectLastItemLoading() {
    this._startIndexForAppendedItems = -1;
  }
  _forgetNextPageLoading() {
    this._startIndexForAppendedItems = null;
  }
  _dataSourceChangedHandler(newItems, e) {
    const {
      items
    } = this.option();
    if (this._initialized && items && this._shouldAppendItems()) {
      this._renderedItemsCount = items.length;
      if (!this._isLastPage() || -1 !== this._startIndexForAppendedItems) {
        this.option().items = items.concat(newItems.slice(this._startIndexForAppendedItems));
      }
      this._forgetNextPageLoading();
      this._refreshContent();
    } else {
      this.option("items", newItems.slice());
    }
  }
  _refreshContent() {
    this._prepareContent();
    this._renderContent();
  }
  _dataSourceLoadErrorHandler() {
    this._forgetNextPageLoading();
    const {
      items
    } = this.option();
    this.option("items", items);
  }
  _shouldAppendItems() {
    return null != this._startIndexForAppendedItems && this._allowDynamicItemsAppend();
  }
  _allowDynamicItemsAppend() {
    return false;
  }
  _clean() {
    this._cleanFocusState();
    this._cleanItemContainer();
    if (this._inkRipple) {
      delete this._inkRipple;
    }
    this._resetActiveState();
  }
  _cleanItemContainer() {
    renderer_default(this._itemContainer()).empty();
  }
  _dispose() {
    super._dispose();
    clearTimeout(this._itemFocusTimeout);
  }
  _refresh() {
    this._cleanRenderedItems();
    super._refresh();
  }
  _itemContainer(searchEnabled, previousSelectAllEnabled) {
    return this.$element();
  }
  _itemClass() {
    return ITEM_CLASS;
  }
  _itemContentClass() {
    return `${this._itemClass()}-content`;
  }
  _itemResponseWaitClass() {
    return "dx-item-response-wait";
  }
  _itemSelector() {
    return `.${this._itemClass()}`;
  }
  _itemDataKey() {
    return "dxItemData";
  }
  _itemIndexKey() {
    return "dxItemIndex";
  }
  _itemElements() {
    return this._itemContainer().find(this._itemSelector());
  }
  _initMarkup() {
    super._initMarkup();
    this.onFocusedItemChanged = this._createActionByOption("onFocusedItemChanged");
    this.$element().addClass("dx-collection");
    this._prepareContent();
  }
  _prepareContent() {
    deferRenderer(() => {
      this._renderContentImpl();
    })();
  }
  _renderContent() {
    this._fireContentReadyAction();
  }
  _render() {
    super._render();
    this._attachClickEvent();
    this._attachHoldEvent();
    this._attachContextMenuEvent();
  }
  _getPointerEvent() {
    return m_pointer_default.down;
  }
  _attachClickEvent() {
    const itemSelector = this._itemSelector();
    const pointerDownEvent = m_pointer_default.down;
    const pointerUpEvent = m_pointer_default.up;
    const clickEventNamespace = addNamespace(CLICK_EVENT_NAME, this.NAME);
    const pointerDownEventNamespace = addNamespace(pointerDownEvent, this.NAME);
    const pointerUpEventNamespace = addNamespace(pointerUpEvent, this.NAME);
    const pointerDownAction = new action_default((args) => {
      const {
        event
      } = args;
      this._itemPointerHandler(event);
    });
    const pointerUpAction = new action_default((args) => {
      const {
        event
      } = args;
      this._itemPointerUpHandler(event);
    });
    m_events_engine_default.off(this._itemContainer(), clickEventNamespace, itemSelector);
    m_events_engine_default.off(this._itemContainer(), pointerDownEventNamespace, itemSelector);
    m_events_engine_default.off(this._itemContainer(), pointerUpEventNamespace, itemSelector);
    m_events_engine_default.on(this._itemContainer(), clickEventNamespace, itemSelector, (e) => this._itemClickHandler(e));
    m_events_engine_default.on(this._itemContainer(), pointerDownEventNamespace, itemSelector, (e) => {
      pointerDownAction.execute({
        element: renderer_default(e.target),
        event: e
      });
    });
    m_events_engine_default.on(this._itemContainer(), pointerUpEventNamespace, itemSelector, (e) => {
      pointerUpAction.execute({
        element: renderer_default(e.target),
        event: e
      });
    });
  }
  _itemClickHandler(e, args, config) {
    this._itemDXEventHandler(e, "onItemClick", args, config);
  }
  _handleItemFocus(e) {
    if (e.isDefaultPrevented()) {
      return;
    }
    const $target = renderer_default(e.target);
    const $closestItem = $target.closest(this._itemElements());
    const $closestFocusable = this._closestFocusable($target);
    if ($closestItem.length && this._isFocusTarget(null === $closestFocusable || void 0 === $closestFocusable ? void 0 : $closestFocusable.get(0))) {
      this._shouldSkipSelectOnFocus = true;
      this.option("focusedElement", getPublicElement($closestItem));
      this._shouldSkipSelectOnFocus = false;
    }
  }
  _itemPointerHandler(e) {
    const {
      focusStateEnabled
    } = this.option();
    if (!focusStateEnabled) {
      return;
    }
    this._itemFocusHandler = () => {
      clearTimeout(this._itemFocusTimeout);
      this._itemFocusHandler = void 0;
      this._handleItemFocus(e);
    };
    this._itemFocusTimeout = setTimeout(() => {
      this._forcePointerDownFocus();
    });
  }
  _itemPointerUpHandler(e) {
  }
  _closestFocusable($target) {
    if ($target.is(focusable)) {
      return $target;
    }
    let $nextTarget = $target.parent();
    while ($nextTarget.length && !dom_adapter_default.isDocument($nextTarget.get(0)) && !dom_adapter_default.isDocumentFragment($nextTarget.get(0))) {
      if ($nextTarget.is(focusable)) {
        return $nextTarget;
      }
      $nextTarget = $nextTarget.parent();
    }
    return;
  }
  _forcePointerDownFocus() {
    if (this._itemFocusHandler) {
      this._itemFocusHandler();
    }
  }
  _updateFocusState(e, isFocused) {
    super._updateFocusState(e, isFocused);
    this._forcePointerDownFocus();
  }
  _attachHoldEvent() {
    const $itemContainer = this._itemContainer();
    const itemSelector = this._itemSelector();
    const eventName = addNamespace(m_hold_default.name, this.NAME);
    m_events_engine_default.off($itemContainer, eventName, itemSelector);
    m_events_engine_default.on($itemContainer, eventName, itemSelector, {
      timeout: this._getHoldTimeout()
    }, this._itemHoldHandler.bind(this));
  }
  _getHoldTimeout() {
    const {
      itemHoldTimeout
    } = this.option();
    return itemHoldTimeout;
  }
  _shouldFireHoldEvent() {
    return this.hasActionSubscription("onItemHold");
  }
  _itemHoldHandler(e) {
    if (this._shouldFireHoldEvent()) {
      this._itemDXEventHandler(e, "onItemHold");
    } else {
      e.cancel = true;
    }
  }
  _attachContextMenuEvent() {
    const $itemContainer = this._itemContainer();
    const itemSelector = this._itemSelector();
    const eventName = addNamespace(name, this.NAME);
    m_events_engine_default.off($itemContainer, eventName, itemSelector);
    m_events_engine_default.on($itemContainer, eventName, itemSelector, this._itemContextMenuHandler.bind(this));
  }
  _shouldFireContextMenuEvent() {
    return this.hasActionSubscription("onItemContextMenu");
  }
  _itemContextMenuHandler(e) {
    if (this._shouldFireContextMenuEvent()) {
      this._itemDXEventHandler(e, "onItemContextMenu");
    } else {
      e.cancel = true;
    }
  }
  _renderContentImpl() {
    const {
      items
    } = this.option();
    const itemsToRender = items ?? [];
    if (this._renderedItemsCount) {
      this._renderItems(itemsToRender.slice(this._renderedItemsCount));
    } else {
      this._renderItems(itemsToRender);
    }
  }
  _renderItems(items) {
    if (items.length) {
      each(items, (index, itemData) => {
        this._renderItem(this._renderedItemsCount + index, itemData);
      });
    }
    this._renderEmptyMessage();
  }
  _getItemsContainer() {
    return this._itemContainer();
  }
  _setAttributes($element) {
    const {
      _itemAttributes
    } = this.option();
    const attributes = Object.assign({}, _itemAttributes);
    const {
      class: customClassValue
    } = attributes;
    if (customClassValue) {
      const currentClassValue = $element.get(0).className;
      attributes.class = [currentClassValue, customClassValue].join(" ");
    }
    $element.attr(attributes);
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const itemIndex = (null === index || void 0 === index ? void 0 : index.item) ?? index;
    const $containerToRender = $container ?? this._getItemsContainer();
    const $itemFrame = this._renderItemFrame(itemIndex, itemData, $containerToRender, $itemToReplace);
    this._setElementData($itemFrame, itemData, itemIndex);
    this._setAttributes($itemFrame);
    this._attachItemClickEvent(itemData, $itemFrame);
    const $itemContent = this._getItemContent($itemFrame);
    const {
      itemTemplate
    } = this.option();
    const renderContentPromise = this._renderItemContent({
      index: itemIndex,
      itemData,
      container: getPublicElement($itemContent),
      contentClass: this._itemContentClass(),
      defaultTemplateName: itemTemplate
    });
    when(renderContentPromise).done(($content) => {
      this._postprocessRenderItem({
        itemElement: $itemFrame,
        itemContent: $content,
        itemData,
        itemIndex
      });
      this._executeItemRenderAction(index, itemData, getPublicElement($itemFrame));
    });
    return $itemFrame;
  }
  _getItemContent($itemFrame) {
    const $itemContent = $itemFrame.find(".dx-item-content-placeholder");
    $itemContent.removeClass("dx-item-content-placeholder");
    return $itemContent;
  }
  _attachItemClickEvent(itemData, $itemElement) {
    if (!itemData || !item_default.isClickableItem(itemData)) {
      return;
    }
    m_events_engine_default.on($itemElement, CLICK_EVENT_NAME, (e) => {
      const actionArgs = {
        event: e
      };
      this._itemEventHandlerByHandler($itemElement, itemData.onClick, actionArgs);
    });
  }
  _renderItemContent(args) {
    const itemTemplateName = this._getItemTemplateName(args);
    const itemTemplate = this._getTemplate(itemTemplateName);
    this._addItemContentClasses(args);
    const $templateResult = renderer_default(this._createItemByTemplate(itemTemplate, args));
    if (!$templateResult.hasClass("dx-template-wrapper")) {
      return args.container;
    }
    return this._renderItemContentByNode(args, $templateResult);
  }
  _renderItemContentByNode(args, $node) {
    renderer_default(args.container).replaceWith($node);
    args.container = getPublicElement($node);
    this._addItemContentClasses(args);
    return $node;
  }
  _addItemContentClasses(args) {
    const classes = [ITEM_CLASS + "-content", args.contentClass];
    renderer_default(args.container).addClass(classes.join(" "));
  }
  _appendItemToContainer($container, $itemFrame, index) {
    $itemFrame.appendTo($container);
  }
  _renderItemFrame(index, itemData, $container, $itemToReplace) {
    const $itemFrame = renderer_default("<div>");
    new this.constructor.ItemClass($itemFrame, this._itemOptions(), itemData || {});
    if (null !== $itemToReplace && void 0 !== $itemToReplace && $itemToReplace.length) {
      $itemToReplace.replaceWith($itemFrame);
    } else {
      this._appendItemToContainer.call(this, $container, $itemFrame, index);
    }
    const {
      useItemTextAsTitle
    } = this.option();
    if (useItemTextAsTitle) {
      const displayValue = this._displayGetter ? this._displayGetter(itemData) : itemData;
      $itemFrame.attr("title", displayValue);
    }
    return $itemFrame;
  }
  _itemOptions() {
    return {
      watchMethod: () => this.option("integrationOptions.watchMethod"),
      owner: this,
      fieldGetter: (field) => {
        const expr = this.option(`${field}Expr`);
        const getter = compileGetter(expr);
        return getter;
      }
    };
  }
  _postprocessRenderItem(args) {
  }
  _executeItemRenderAction(index, itemData, itemElement) {
    this._getItemRenderAction()({
      itemElement,
      itemIndex: index,
      itemData
    });
  }
  _setElementData(element, data, index) {
    element.addClass([ITEM_CLASS, this._itemClass()].join(" ")).data(this._itemDataKey(), data).data(this._itemIndexKey(), index);
  }
  _createItemRenderAction() {
    this._itemRenderAction = this._createActionByOption("onItemRendered", {
      element: this.element(),
      excludeValidators: ["disabled", "readOnly"],
      category: "rendering"
    });
    return this._itemRenderAction;
  }
  _getItemRenderAction() {
    return this._itemRenderAction ?? this._createItemRenderAction();
  }
  _getItemTemplateName(args) {
    const data = args.itemData;
    const {
      itemTemplateProperty
    } = this.option();
    const templateProperty = args.templateProperty ?? itemTemplateProperty;
    const template = data && templateProperty ? data[templateProperty] : void 0;
    return template || args.defaultTemplateName;
  }
  _createItemByTemplate(itemTemplate, renderArgs) {
    const {
      itemData,
      container,
      index
    } = renderArgs;
    return itemTemplate.render({
      model: itemData,
      container,
      index,
      onRendered: this._onItemTemplateRendered(itemTemplate, renderArgs)
    });
  }
  _onItemTemplateRendered(itemTemplate, renderArgs) {
    return () => {
    };
  }
  _emptyMessageContainer() {
    return this._itemContainer();
  }
  _renderEmptyMessage(rootNodes) {
    const {
      items: userItems = [],
      noDataText
    } = this.option();
    const items = rootNodes ?? userItems;
    const hideNoData = !noDataText || (null === items || void 0 === items ? void 0 : items.length) || this._dataController.isLoading();
    if (hideNoData && this._$noData) {
      this._$noData.remove();
      this._$noData = null;
      this.setAria("label", void 0);
    }
    if (!hideNoData) {
      this._$noData = this._$noData ?? renderer_default("<div>").addClass("dx-empty-message");
      this._$noData.appendTo(this._emptyMessageContainer());
      const {
        encodeNoDataText
      } = this.option();
      if (encodeNoDataText) {
        this._$noData.text(noDataText);
      } else {
        this._$noData.html(noDataText);
      }
    }
    this.$element().toggleClass(EMPTY_COLLECTION, !hideNoData);
  }
  _itemDXEventHandler(dxEvent, handlerOptionName, actionArgs, actionConfig) {
    this._itemEventHandler(dxEvent.target, handlerOptionName, extend(actionArgs, {
      event: dxEvent
    }), actionConfig);
  }
  _itemEventHandler(initiator, handlerOptionName, actionArgs, actionConfig) {
    const action = this._createActionByOption(handlerOptionName, Object.assign({
      validatingTargetName: "itemElement"
    }, actionConfig));
    return this._itemEventHandlerImpl(initiator, action, actionArgs);
  }
  _itemEventHandlerByHandler(initiator, handler, actionArgs, actionConfig) {
    const action = this._createAction(handler, extend({
      validatingTargetName: "itemElement"
    }, actionConfig));
    return this._itemEventHandlerImpl(initiator, action, actionArgs);
  }
  _itemEventHandlerImpl(initiator, action, actionArgs) {
    const $itemElement = this._closestItemElement(renderer_default(initiator));
    const args = extend({}, actionArgs);
    return action(extend(actionArgs, this._extendActionArgs($itemElement), args));
  }
  _extendActionArgs($itemElement) {
    return {
      itemElement: getPublicElement($itemElement),
      itemIndex: this._itemElements().index($itemElement),
      itemData: this._getItemData($itemElement)
    };
  }
  _closestItemElement($element) {
    return renderer_default($element).closest(this._itemSelector());
  }
  _getItemData(itemElement) {
    return renderer_default(itemElement).data(this._itemDataKey());
  }
  _getSummaryItemsSize(dimension, items, includeMargin) {
    let result = 0;
    if (items) {
      each(items, (_index, item) => {
        if ("width" === dimension) {
          result += getOuterWidth(item, includeMargin ?? false);
        } else if ("height" === dimension) {
          result += getOuterHeight(item, includeMargin ?? false);
        }
      });
    }
    return result;
  }
  getFocusedItemId() {
    if (!this._focusedItemId) {
      this._focusedItemId = `dx-${new guid_default()}`;
    }
    return this._focusedItemId;
  }
  itemElements() {
    return this._itemElements();
  }
  itemsContainer() {
    return this._itemContainer();
  }
};
CollectionWidget.ItemClass = item_default;
CollectionWidget.include(m_data_helper_default);
var collection_widget_base_default = CollectionWidget;

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.edit.strategy.js
var EditStrategy = class {
  constructor(collectionWidget) {
    this._collectionWidget = collectionWidget;
  }
  _getItems() {
    const {
      items = []
    } = this._collectionWidget.option();
    return items;
  }
  getIndexByItemData(value) {
    return class_default.abstract();
  }
  getItemDataByIndex(index) {
    return class_default.abstract();
  }
  getKeysByItems(items) {
    return class_default.abstract();
  }
  getItemsByKeys(keys, items) {
    return class_default.abstract();
  }
  itemsGetter() {
    return class_default.abstract();
  }
  getKeyByIndex(index) {
    const resultIndex = this._denormalizeItemIndex(index);
    return this.getKeysByItems([this.getItemDataByIndex(resultIndex)])[0];
  }
  _equalKeys(key1, key2) {
    if (this._collectionWidget._isKeySpecified()) {
      return equalByValue(key1, key2);
    }
    return key1 === key2;
  }
  beginCache() {
    this._cache = {};
  }
  endCache() {
    this._cache = null;
  }
  getIndexByKey(key) {
    return class_default.abstract();
  }
  getNormalizedIndex(value) {
    if (this._isNode(value)) {
      return this._getNormalizedItemIndex(value);
    }
    if (this._isNormalizedItemIndex(value)) {
      return value;
    }
    if (this._isItemIndex(value)) {
      return this._normalizeItemIndex(value);
    }
    return this._normalizeItemIndex(this.getIndexByItemData(value));
  }
  getIndex(value) {
    if (this._isNode(value)) {
      return this._denormalizeItemIndex(this._getNormalizedItemIndex(value));
    }
    if (this._isNormalizedItemIndex(value)) {
      return this._denormalizeItemIndex(value);
    }
    if (this._isItemIndex(value)) {
      return value;
    }
    return this.getIndexByItemData(value);
  }
  getItemElement(value) {
    if (this._isNode(value)) {
      return renderer_default(value);
    }
    if (this._isNormalizedItemIndex(value)) {
      return this._getItemByNormalizedIndex(value);
    }
    if (this._isItemIndex(value)) {
      return this._getItemByNormalizedIndex(this._normalizeItemIndex(value));
    }
    const normalizedItemIndex = this._normalizeItemIndex(this.getIndexByItemData(value));
    return this._getItemByNormalizedIndex(normalizedItemIndex);
  }
  _isNode(el) {
    return dom_adapter_default.isNode(el && isRenderer(el) ? el.get(0) : el);
  }
  deleteItemAtIndex(index) {
    return class_default.abstract();
  }
  itemPlacementFunc(movingIndex, destinationIndex) {
    return this._itemsFromSameParent(movingIndex, destinationIndex) && movingIndex < destinationIndex ? "after" : "before";
  }
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    return class_default.abstract();
  }
  _isNormalizedItemIndex(index) {
    return "number" === typeof index && Math.round(index) === index;
  }
  _isItemIndex(index) {
    return class_default.abstract();
  }
  _getNormalizedItemIndex(value) {
    return class_default.abstract();
  }
  _normalizeItemIndex(index) {
    return class_default.abstract();
  }
  _denormalizeItemIndex(index) {
    return class_default.abstract();
  }
  _getItemByNormalizedIndex(index) {
    return class_default.abstract();
  }
  _itemsFromSameParent(movingIndex, destinationIndex) {
    return class_default.abstract();
  }
};
var collection_widget_edit_strategy_default = EditStrategy;

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.edit.strategy.plain.js
var PlainEditStrategy = class extends collection_widget_edit_strategy_default {
  _getPlainItems() {
    return this._getItems() ?? [];
  }
  getIndexByItemData(itemData) {
    const keyOf = this._collectionWidget.keyOf.bind(this._collectionWidget);
    if (keyOf) {
      return this.getIndexByKey(keyOf(itemData));
    }
    return this._getPlainItems().indexOf(itemData);
  }
  getItemDataByIndex(index) {
    return this._getPlainItems()[index];
  }
  deleteItemAtIndex(index) {
    this._getPlainItems().splice(index, 1);
  }
  itemsGetter() {
    return this._getPlainItems();
  }
  getKeysByItems(items) {
    const keyOf = this._collectionWidget.keyOf.bind(this._collectionWidget);
    let result = items;
    if (keyOf) {
      result = items.map((item) => keyOf(item));
    }
    return result;
  }
  getIndexByKey(key) {
    const cache = this._cache;
    const keys = (null === cache || void 0 === cache ? void 0 : cache.keys) ?? this.getKeysByItems(this._getPlainItems());
    if (cache && !cache.keys) {
      cache.keys = keys;
    }
    if ("object" === typeof key) {
      for (let i = 0; i < keys.length; i += 1) {
        if (this._equalKeys(key, keys[i])) {
          return i;
        }
      }
    } else {
      return keys.indexOf(key);
    }
    return -1;
  }
  getItemsByKeys(keys, items) {
    return (items ?? keys).slice();
  }
  moveItemAtIndexToIndex(movingIndex, destinationIndex) {
    const items = this._getPlainItems();
    const movedItemData = items[movingIndex];
    items.splice(movingIndex, 1);
    items.splice(destinationIndex, 0, movedItemData);
  }
  _isItemIndex(index) {
    return this._isNormalizedItemIndex(index);
  }
  _getNormalizedItemIndex(itemElement) {
    return this._collectionWidget._itemElements().index(itemElement);
  }
  _normalizeItemIndex(index) {
    return index;
  }
  _denormalizeItemIndex(index) {
    return index;
  }
  _getItemByNormalizedIndex(index) {
    return index > -1 ? this._collectionWidget._itemElements().eq(index) : null;
  }
  _itemsFromSameParent(_firstIndex, _secondIndex) {
    return true;
  }
};
var collection_widget_edit_strategy_plain_default = PlainEditStrategy;

// node_modules/devextreme/esm/__internal/ui/selection/selection.strategy.js
var SelectionStrategy = class {
  constructor(options) {
    this._lastSelectAllPageDeferred = Deferred().reject();
    this.options = options;
    this._setOption("disabledItemKeys", []);
    this._clearItemKeys();
  }
  _clearItemKeys() {
    this._setOption("addedItemKeys", []);
    this._setOption("removedItemKeys", []);
    this._setOption("removedItems", []);
    this._setOption("addedItems", []);
  }
  validate() {
  }
  _setOption(name2, value) {
    this.options[name2] = value;
  }
  onSelectionChanging() {
    const {
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems,
      onSelectionChanging = noop
    } = this.options;
    const selectionChangingArgs = {
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems,
      cancel: false
    };
    onSelectionChanging(selectionChangingArgs);
    return selectionChangingArgs.cancel;
  }
  _callCallbackIfNotCanceled(callback, cancelCallback) {
    const cancelResult = this.onSelectionChanging();
    if (isPromise(cancelResult)) {
      cancelResult.then((cancel) => {
        if (!cancel) {
          callback();
        } else {
          cancelCallback();
        }
      }).catch(() => {
        callback();
      });
    } else if (!cancelResult) {
      callback();
    } else {
      cancelCallback();
    }
  }
  onSelectionChanged() {
    const {
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems,
      onSelectionChanged = noop
    } = this.options;
    this._clearItemKeys();
    onSelectionChanged({
      selectedItems,
      selectedItemKeys,
      addedItemKeys,
      removedItemKeys,
      addedItems,
      removedItems
    });
  }
  equalKeys(key1, key2) {
    if (this.options.equalByReference) {
      if (isObject(key1) && isObject(key2)) {
        return key1 === key2;
      }
    }
    return equalByValue(key1, key2);
  }
  getSelectableItems(items) {
    return items.filter((item) => !(null !== item && void 0 !== item && item.disabled));
  }
  _clearSelection(keys, preserve, isDeselect, isSelectAll) {
    let normalizedKeys = keys || [];
    normalizedKeys = Array.isArray(normalizedKeys) ? normalizedKeys : [normalizedKeys];
    this.validate();
    return this.selectedItemKeys(normalizedKeys, preserve, isDeselect, isSelectAll);
  }
  _removeTemplateProperty(remoteFilter) {
    if (Array.isArray(remoteFilter)) {
      return remoteFilter.map((f) => this._removeTemplateProperty(f));
    }
    if (isObject(remoteFilter)) {
      delete remoteFilter.template;
    }
    return remoteFilter;
  }
  _getQueryParams() {
    const {
      sensitivity
    } = this.options;
    if (!sensitivity) {
      return;
    }
    return {
      langParams: {
        collatorOptions: {
          sensitivity
        }
      }
    };
  }
  _loadFilteredData(remoteFilter, localFilter, select, isSelectAll) {
    const filterLength = encodeURI(JSON.stringify(this._removeTemplateProperty(remoteFilter))).length;
    const needLoadAllData = this.options.maxFilterLengthInRequest && filterLength > this.options.maxFilterLengthInRequest;
    const deferred = Deferred();
    const queryParams = this._getQueryParams();
    const loadOptions = Object.assign({
      filter: needLoadAllData ? void 0 : remoteFilter,
      select: needLoadAllData ? this.options.dataFields() : select || this.options.dataFields()
    }, queryParams);
    if (remoteFilter && Array.isArray(remoteFilter) && 0 === remoteFilter.length) {
      deferred.resolve([]);
    } else {
      this.options.load(loadOptions).done((items) => {
        let filteredItems = !Array.isArray(items) && isPlainObject(items) ? items.data : items;
        if (localFilter && !isSelectAll) {
          filteredItems = filteredItems.filter(localFilter);
        } else if (needLoadAllData) {
          filteredItems = m_query_default(filteredItems).filter(remoteFilter).toArray();
        }
        deferred.resolve(filteredItems);
      }).fail((error) => {
        deferred.reject(error);
      });
    }
    return deferred;
  }
  updateSelectedItemKeyHash(keys) {
    for (let i = 0; i < keys.length; i += 1) {
      const keyHash = getKeyHash(keys[i]);
      if (!isObject(keyHash)) {
        this.options.keyHashIndices[keyHash] = this.options.keyHashIndices[keyHash] || [];
        const keyIndices = this.options.keyHashIndices[keyHash];
        keyIndices.push(i);
      }
    }
  }
  _isAnyItemSelected(items) {
    if (items.find((item) => this.options.isItemSelected(item))) {
      return;
    }
    return false;
  }
  _getFullSelectAllState() {
    const items = this.options.plainItems();
    const {
      filter
    } = this.options;
    const dataFilter = filter();
    let selectedItems = this.options.ignoreDisabledItems ? this.options.selectedItems : this.options.selectedItems.filter((item) => !(null !== item && void 0 !== item && item.disabled));
    if (dataFilter) {
      selectedItems = m_query_default(selectedItems).filter(dataFilter).toArray();
    }
    const selectedItemsLength = selectedItems.length;
    const disabledItemsLength = items.length - this.getSelectableItems(items).length;
    if (!selectedItemsLength) {
      return this._isAnyItemSelected(items);
    }
    if (selectedItemsLength >= this.options.totalCount() - disabledItemsLength) {
      return true;
    }
    return;
  }
  _getVisibleSelectAllState() {
    const items = this.getSelectableItems(this.options.plainItems());
    let hasSelectedItems = false;
    let hasUnselectedItems = false;
    items.forEach((item) => {
      const itemData = this.options.getItemData(item);
      const key = this.options.keyOf(itemData);
      if (this.options.isSelectableItem(item)) {
        if (this.isItemKeySelected(key)) {
          hasSelectedItems = true;
        } else {
          hasUnselectedItems = true;
        }
      }
    });
    if (hasSelectedItems) {
      return !hasUnselectedItems ? true : void 0;
    }
    return false;
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys, forceCombinedFilter) {
    throw new Error("selectedItemKeys method should be overriden");
  }
  isItemKeySelected(itemKey) {
    throw new Error("isItemKeySelected method should be overriden");
  }
  isItemDataSelected(itemKey) {
    throw new Error("isItemKeySelected method should be overriden");
  }
  addSelectedItem(itemKey, dataOrIsSelectAll, skipFilter) {
    throw new Error("addSelectedItem method should be overriden");
  }
  removeSelectedItem(itemKey) {
    throw new Error("removeSelectedItem method should be overriden");
  }
  _selectAllPlainItems(isDeselect) {
    const items = this.getSelectableItems(this.options.plainItems());
    items.forEach((item) => {
      if (this.options.isSelectableItem(item)) {
        const itemData = this.options.getItemData(item);
        const itemKey = this.options.keyOf(itemData);
        const isSelected = this.isItemKeySelected(itemKey);
        if (!isSelected && !isDeselect) {
          this.addSelectedItem(itemKey, itemData);
        }
        if (isSelected && isDeselect) {
          this.removeSelectedItem(itemKey);
        }
      }
    });
  }
};

// node_modules/devextreme/esm/__internal/ui/selection/selection.strategy.deferred.js
var DeferredStrategy = class extends SelectionStrategy {
  getSelectedItems() {
    return this._loadFilteredData(this.options.selectionFilter);
  }
  getSelectedItemKeys() {
    const d = Deferred();
    const key = this.options.key();
    const select = isString(key) ? [key] : key;
    const getKey = (item) => this.options.keyOf(item);
    this._loadFilteredData(this.options.selectionFilter, null, select).done((items) => {
      const keys = (Array.isArray(items) ? items : []).map(getKey);
      d.resolve(keys);
    }).fail((error) => {
      d.reject(error);
    });
    return d.promise();
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll) {
    if (isSelectAll) {
      const filter = this.options.filter();
      const needResetSelectionFilter = !filter || JSON.stringify(filter) === JSON.stringify(this.options.selectionFilter) && isDeselect;
      if (needResetSelectionFilter) {
        this._setOption("selectionFilter", isDeselect ? [] : null);
      } else {
        this._addSelectionFilter(isDeselect, filter, isSelectAll);
      }
    } else {
      if (!preserve) {
        this._setOption("selectionFilter", []);
      }
      keys.forEach((key) => {
        if (isDeselect) {
          this.removeSelectedItem(key);
        } else {
          this.addSelectedItem(key, isSelectAll, !preserve);
        }
      });
    }
    this.onSelectionChanged();
    return Deferred().resolve();
  }
  setSelectedItems(keys) {
    this._setOption("selectionFilter", null);
    keys.forEach((key) => {
      this.addSelectedItem(key);
    });
  }
  isItemDataSelected(itemData) {
    return this.isItemKeySelected(itemData);
  }
  isItemKeySelected(itemData) {
    const {
      selectionFilter
    } = this.options;
    if (!selectionFilter) {
      return true;
    }
    const queryParams = this._getQueryParams();
    return !!m_query_default([itemData], queryParams).filter(selectionFilter).toArray().length;
  }
  _getKeyExpr() {
    const keyField = this.options.key();
    if (Array.isArray(keyField) && 1 === keyField.length) {
      return keyField[0];
    }
    return keyField;
  }
  _normalizeKey(key) {
    const keyExpr = this.options.key();
    if (Array.isArray(keyExpr) && 1 === keyExpr.length) {
      return key[keyExpr[0]];
    }
    return key;
  }
  _getFilterByKey(key) {
    const keyField = this._getKeyExpr();
    let filter = [keyField, "=", this._normalizeKey(key)];
    if (Array.isArray(keyField)) {
      filter = [];
      for (let i = 0; i < keyField.length; i += 1) {
        filter.push([keyField[i], "=", key[keyField[i]]]);
        if (i !== keyField.length - 1) {
          filter.push("and");
        }
      }
    }
    return filter;
  }
  addSelectedItem(key, isSelectAll, skipFilter) {
    const filter = this._getFilterByKey(key);
    this._addSelectionFilter(false, filter, isSelectAll, skipFilter);
  }
  removeSelectedItem(key) {
    const filter = this._getFilterByKey(key);
    this._addSelectionFilter(true, filter);
  }
  validate() {
    const {
      key
    } = this.options;
    if (key && void 0 === key()) {
      throw ui_errors_default.Error("E1042", "Deferred selection");
    }
  }
  _findSubFilter(selectionFilter, filter) {
    if (!selectionFilter) {
      return -1;
    }
    const filterString = JSON.stringify(filter);
    for (let index = 0; index < selectionFilter.length; index += 1) {
      const subFilter = selectionFilter[index];
      if (subFilter && JSON.stringify(subFilter) === filterString) {
        return index;
      }
    }
    return -1;
  }
  _isLastSubFilter(selectionFilter, filter) {
    if (selectionFilter && filter) {
      return this._findSubFilter(selectionFilter, filter) === selectionFilter.length - 1 || 0 === this._findSubFilter([selectionFilter], filter);
    }
    return false;
  }
  _addFilterOperator(selectionFilter, filterOperator) {
    let filter = selectionFilter;
    if (filter.length > 1 && isString(filter[1]) && filter[1] !== filterOperator) {
      filter = [filter];
    }
    if (Array.isArray(filter) && filter.length) {
      filter.push(filterOperator);
    }
    return filter;
  }
  _denormalizeFilter(filter) {
    let resultFilter = filter;
    if (resultFilter && isString(resultFilter[0])) {
      resultFilter = [resultFilter];
    }
    return resultFilter;
  }
  _isOnlyNegativeFiltersLeft(filters) {
    return filters.every((filterItem, i) => {
      if (i % 2 === 0) {
        return Array.isArray(filterItem) && "!" === filterItem[0];
      }
      return "and" === filterItem;
    });
  }
  _addSelectionFilter(isDeselect, filter, isSelectAll, skipFilter) {
    var _selectionFilter;
    const currentOperation = isDeselect ? "and" : "or";
    let needAddFilter = true;
    let selectionFilter = this.options.selectionFilter || [];
    selectionFilter = this._denormalizeFilter(selectionFilter);
    if (null !== (_selectionFilter = selectionFilter) && void 0 !== _selectionFilter && _selectionFilter.length && !skipFilter) {
      const removedIndex = this._removeSameFilter(selectionFilter, filter, isDeselect, isSelectAll);
      const filterIndex = this._removeSameFilter(selectionFilter, filter, !isDeselect);
      const shouldCleanFilter = isDeselect && (-1 !== removedIndex || -1 !== filterIndex) && this._isOnlyNegativeFiltersLeft(selectionFilter);
      if (shouldCleanFilter) {
        selectionFilter = [];
      }
      const isKeyOperatorsAfterRemoved = this._isKeyFilter(filter) && this._hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex);
      needAddFilter = !!(null !== filter && void 0 !== filter && filter.length) && !isKeyOperatorsAfterRemoved;
    }
    if (needAddFilter) {
      selectionFilter = this._addFilterOperator(selectionFilter, currentOperation);
      if (Array.isArray(selectionFilter) && filter) {
        const currentFilter = isDeselect ? ["!", filter] : filter;
        selectionFilter.push(currentFilter);
      }
    }
    selectionFilter = this._normalizeFilter(selectionFilter);
    this._setOption("selectionFilter", !isDeselect && !selectionFilter.length ? null : selectionFilter);
  }
  _normalizeFilter(filter) {
    let resultFilter = filter;
    if (resultFilter && 1 === resultFilter.length) {
      [resultFilter] = resultFilter;
    }
    return resultFilter;
  }
  _removeFilterByIndex(filter, filterIndex, isSelectAll) {
    const operation = filter[1];
    if (filterIndex > 0) {
      filter.splice(filterIndex - 1, 2);
    } else {
      filter.splice(filterIndex, 2);
    }
    if (isSelectAll && "and" === operation) {
      filter.splice(0, filter.length);
    }
  }
  _isSimpleKeyFilter(filter, key) {
    return 3 === (null === filter || void 0 === filter ? void 0 : filter.length) && filter[0] === key && "=" === filter[1];
  }
  _isKeyFilter(filter) {
    if (2 === (null === filter || void 0 === filter ? void 0 : filter.length) && "!" === (null === filter || void 0 === filter ? void 0 : filter[0])) {
      return this._isKeyFilter(filter[1]);
    }
    const keyField = this._getKeyExpr();
    if (Array.isArray(keyField)) {
      if ((null === filter || void 0 === filter ? void 0 : filter.length) !== 2 * keyField.length - 1) {
        return false;
      }
      for (let i = 0; i < keyField.length; i += 1) {
        if (i > 0 && "and" !== (null === filter || void 0 === filter ? void 0 : filter[2 * i - 1])) {
          return false;
        }
        if (!this._isSimpleKeyFilter(null === filter || void 0 === filter ? void 0 : filter[2 * i], keyField[i])) {
          return false;
        }
      }
      return true;
    }
    return this._isSimpleKeyFilter(filter, keyField);
  }
  _hasKeyFiltersOnlyStartingFromIndex(selectionFilter, filterIndex) {
    if (filterIndex >= 0) {
      for (let i = filterIndex; i < selectionFilter.length; i += 1) {
        if ("string" !== typeof selectionFilter[i] && !this._isKeyFilter(selectionFilter[i])) {
          return false;
        }
      }
      return true;
    }
    return false;
  }
  _removeSameFilter(selectionFilter, filter, inverted, isSelectAll) {
    const sameFilter = inverted ? ["!", filter] : filter;
    if (JSON.stringify(sameFilter) === JSON.stringify(selectionFilter)) {
      selectionFilter.splice(0, selectionFilter.length);
      return 0;
    }
    const filterIndex = this._findSubFilter(selectionFilter, sameFilter);
    if (filterIndex >= 0) {
      this._removeFilterByIndex(selectionFilter, filterIndex, isSelectAll);
      return filterIndex;
    }
    for (let i = 0; i < selectionFilter.length; i += 1) {
      if (Array.isArray(selectionFilter[i]) && selectionFilter[i].length > 2) {
        const innerFilterIndex = this._removeSameFilter(selectionFilter[i], sameFilter, false, isSelectAll);
        if (innerFilterIndex >= 0) {
          if (!selectionFilter[i].length) {
            this._removeFilterByIndex(selectionFilter, i, isSelectAll);
          } else if (1 === selectionFilter[i].length) {
            const [firstFilter] = selectionFilter[i];
            selectionFilter[i] = firstFilter;
          }
          return innerFilterIndex;
        }
      }
    }
    return -1;
  }
  getSelectAllState() {
    const filter = this.options.filter();
    let {
      selectionFilter
    } = this.options;
    if (!selectionFilter) {
      return true;
    }
    if (!selectionFilter.length) {
      return false;
    }
    if (!(null !== filter && void 0 !== filter && filter.length)) {
      return;
    }
    selectionFilter = this._denormalizeFilter(selectionFilter);
    if (this._isLastSubFilter(selectionFilter, filter)) {
      return true;
    }
    if (this._isLastSubFilter(selectionFilter, ["!", filter])) {
      return false;
    }
    return;
  }
  loadSelectedItemsWithFilter() {
    const componentFilter = this.options.filter();
    const {
      selectionFilter
    } = this.options;
    const filter = componentFilter ? [componentFilter, "and", selectionFilter] : selectionFilter;
    return this._loadFilteredData(filter);
  }
  _onePageSelectAll(isDeselect) {
    this._selectAllPlainItems(isDeselect);
    this.onSelectionChanged();
    return Deferred().resolve();
  }
};

// node_modules/devextreme/esm/__internal/core/utils/m_array_compare.js
var getKeyWrapper = function(item, getKey) {
  const key = getKey(item);
  if (isObject(key)) {
    try {
      return JSON.stringify(key);
    } catch (e) {
      return key;
    }
  }
  return key;
};
var getSameNewByOld = function(oldItem, newItems, newIndexByKey, getKey) {
  const key = getKeyWrapper(oldItem, getKey);
  return newItems[newIndexByKey[key]];
};
var isKeysEqual = function(oldKeys, newKeys) {
  if (oldKeys.length !== newKeys.length) {
    return false;
  }
  for (let i = 0; i < newKeys.length; i++) {
    if (oldKeys[i] !== newKeys[i]) {
      return false;
    }
  }
  return true;
};
var mapIndexByKey = function(items, getKey) {
  const indexByKey = {};
  items.forEach((item, index) => {
    const key = getKeyWrapper(item, getKey);
    if (isDefined(indexByKey[String(key)])) {
      throw ui_errors_default.Error("E1040", key);
    }
    indexByKey[key] = index;
  });
  return indexByKey;
};
var findChanges = function(_ref) {
  let {
    oldItems,
    newItems,
    getKey,
    isItemEquals,
    detectReorders = false
  } = _ref;
  try {
    const oldIndexByKey = mapIndexByKey(oldItems, getKey);
    const newIndexByKey = mapIndexByKey(newItems, getKey);
    let addedCount = 0;
    let removeCount = 0;
    const result = [];
    const itemCount = Math.max(oldItems.length, newItems.length);
    for (let index = 0; index < itemCount + addedCount; index += 1) {
      const newItem = newItems[index];
      const oldNextIndex = index - addedCount + removeCount;
      const nextOldItem = oldItems[oldNextIndex];
      const isRemoved = !newItem || nextOldItem && !getSameNewByOld(nextOldItem, newItems, newIndexByKey, getKey);
      if (isRemoved) {
        if (nextOldItem) {
          result.push({
            type: "remove",
            key: getKey(nextOldItem),
            index,
            oldItem: nextOldItem
          });
          removeCount++;
          index--;
        }
      } else {
        const key = getKeyWrapper(newItem, getKey);
        const oldIndex = oldIndexByKey[key];
        const oldItem = oldItems[oldIndex];
        if (!oldItem) {
          addedCount++;
          result.push({
            type: "insert",
            data: newItem,
            index
          });
        } else if (oldIndex === oldNextIndex) {
          if (!isItemEquals(oldItem, newItem)) {
            result.push({
              type: "update",
              data: newItem,
              key: getKey(newItem),
              index,
              oldItem
            });
          }
        } else {
          if (!detectReorders) {
            return;
          }
          result.push({
            type: "remove",
            key: getKey(oldItem),
            index: oldIndex,
            oldItem
          });
          result.push({
            type: "insert",
            data: newItem,
            index
          });
          addedCount++;
          removeCount++;
        }
      }
    }
    if (detectReorders) {
      const removes = result.filter((r) => "remove" === r.type).sort((a, b) => b.index - a.index);
      const inserts = result.filter((i) => "insert" === i.type).sort((a, b) => a.index - b.index);
      const updates = result.filter((u) => "update" === u.type);
      return [...removes, ...inserts, ...updates];
    }
    return result;
  } catch (e) {
    logger.error(e);
    return;
  }
};

// node_modules/devextreme/esm/__internal/ui/selection/selection.strategy.standard.js
var StandardStrategy = class extends SelectionStrategy {
  constructor(options) {
    super(options);
    this._lastSelectAllPageDeferred = Deferred().reject();
    this._initSelectedItemKeyHash();
  }
  _initSelectedItemKeyHash() {
    this._setOption("keyHashIndices", this.options.equalByReference ? null : {});
  }
  getSelectedItemKeys() {
    return this.options.selectedItemKeys.slice(0);
  }
  getSelectedItems() {
    return this.options.selectedItems.slice(0);
  }
  _preserveSelectionUpdate(items, isDeselect) {
    const {
      keyOf
    } = this.options;
    let keyIndicesToRemoveMap;
    if (!keyOf) {
      return;
    }
    const isBatchDeselect = isDeselect && items.length > 1 && !this.options.equalByReference;
    if (isBatchDeselect) {
      keyIndicesToRemoveMap = {};
    }
    items.forEach((item) => {
      const key = keyOf(item);
      if (isDeselect) {
        const keyIndex = this.removeSelectedItem(key, keyIndicesToRemoveMap, item && "object" === typeof item && "disabled" in item ? !!item.disabled : false);
        if (keyIndicesToRemoveMap && isNumeric(keyIndex) && keyIndex >= 0) {
          keyIndicesToRemoveMap[keyIndex] = true;
        }
      } else {
        this.addSelectedItem(key, item);
      }
    });
    if (isBatchDeselect) {
      this._batchRemoveSelectedItems(keyIndicesToRemoveMap);
    }
  }
  _batchRemoveSelectedItems(keyIndicesToRemoveMap) {
    const selectedItemKeys = this.options.selectedItemKeys.slice(0);
    const selectedItems = this.options.selectedItems.slice(0);
    this.options.selectedItemKeys.length = 0;
    this.options.selectedItems.length = 0;
    for (let i = 0; i < selectedItemKeys.length; i += 1) {
      if (!keyIndicesToRemoveMap[i]) {
        this.options.selectedItemKeys.push(selectedItemKeys[i]);
        this.options.selectedItems.push(selectedItems[i]);
      }
    }
    this._initSelectedItemKeyHash();
    this.updateSelectedItemKeyHash(this.options.selectedItemKeys);
  }
  _loadSelectedItemsCore(keys, isDeselect, isSelectAll, filter) {
    let forceCombinedFilter = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
    let deferred = Deferred();
    const key = this.options.key();
    if (!keys.length && !isSelectAll) {
      deferred.resolve([]);
      return deferred;
    }
    if (isSelectAll && isDeselect && !filter) {
      deferred.resolve(this.getSelectedItems());
      return deferred;
    }
    const selectionFilterCreator = new SelectionFilterCreator(keys, isSelectAll);
    const combinedFilter = selectionFilterCreator.getCombinedFilter(key, filter, forceCombinedFilter);
    let deselectedItems = [];
    if (isDeselect) {
      const {
        selectedItems
      } = this.options;
      deselectedItems = combinedFilter && keys.length !== selectedItems.length ? m_query_default(selectedItems).filter(combinedFilter).toArray() : selectedItems.slice(0);
    }
    let filteredItems = deselectedItems.length ? deselectedItems : this.options.plainItems(true).filter(this.options.isSelectableItem).map(this.options.getItemData);
    const localFilter = selectionFilterCreator.getLocalFilter(this.options.keyOf, this.equalKeys.bind(this), this.options.equalByReference, key);
    filteredItems = filteredItems.filter(localFilter);
    if (deselectedItems.length || !isSelectAll && filteredItems.length === keys.length) {
      deferred.resolve(filteredItems);
    } else {
      deferred = this._loadFilteredData(combinedFilter, localFilter, null, isSelectAll);
    }
    return deferred;
  }
  _replaceSelectionUpdate(items) {
    const {
      keyOf
    } = this.options;
    if (!keyOf) {
      return;
    }
    const internalKeys = items.map((item) => keyOf(item));
    this.setSelectedItems(internalKeys, items);
  }
  _warnOnIncorrectKeys(keys) {
    const {
      allowNullValue
    } = this.options;
    keys.forEach((key) => {
      if ((!allowNullValue || null !== key) && !this.isItemKeySelected(key)) {
        ui_errors_default.log("W1002", key);
      }
    });
  }
  _isMultiSelectEnabled() {
    const {
      mode
    } = this.options;
    return "all" === mode || "multiple" === mode;
  }
  _requestInProgress() {
    var _this$_lastLoadDeferr;
    return "pending" === (null === (_this$_lastLoadDeferr = this._lastLoadDeferred) || void 0 === _this$_lastLoadDeferr ? void 0 : _this$_lastLoadDeferr.state());
  }
  _concatRequestsItems(keys, oldRequestItems, isDeselect, updatedKeys) {
    let selectedItems = [];
    const deselectedItems = isDeselect ? keys : [];
    if (updatedKeys) {
      selectedItems = updatedKeys;
    } else {
      selectedItems = removeDuplicates(keys, this.options.selectedItemKeys);
    }
    return {
      addedItems: oldRequestItems.added.concat(selectedItems),
      removedItems: oldRequestItems.removed.concat(deselectedItems),
      keys
    };
  }
  _collectLastRequestData(keys, isDeselect, isSelectAll, updatedKeys) {
    const isDeselectAll = isDeselect && isSelectAll;
    const oldRequestItems = {
      added: [],
      removed: []
    };
    const multiSelectEnabled = this._isMultiSelectEnabled();
    const emptyData = {
      addedItems: [],
      removedItems: [],
      keys: []
    };
    if (!multiSelectEnabled) {
      return emptyData;
    }
    let lastRequestData = this._lastRequestData ?? emptyData;
    if (this._shouldMergeWithLastRequest) {
      if (isDeselectAll) {
        var _this$_lastLoadDeferr2;
        null === (_this$_lastLoadDeferr2 = this._lastLoadDeferred) || void 0 === _this$_lastLoadDeferr2 || _this$_lastLoadDeferr2.reject();
        lastRequestData = {};
      } else if (!isKeysEqual(keys, this.options.selectedItemKeys)) {
        var _lastRequestData, _lastRequestData2;
        oldRequestItems.added = null === (_lastRequestData = lastRequestData) || void 0 === _lastRequestData ? void 0 : _lastRequestData.addedItems;
        oldRequestItems.removed = null === (_lastRequestData2 = lastRequestData) || void 0 === _lastRequestData2 ? void 0 : _lastRequestData2.removedItems;
        if (!isDeselect) {
          var _this$_lastLoadDeferr3;
          null === (_this$_lastLoadDeferr3 = this._lastLoadDeferred) || void 0 === _this$_lastLoadDeferr3 || _this$_lastLoadDeferr3.reject();
        }
      }
    }
    lastRequestData = this._concatRequestsItems(keys, oldRequestItems, isDeselect, this._shouldMergeWithLastRequest ? void 0 : updatedKeys);
    return lastRequestData;
  }
  _updateKeysByLastRequestData(keys, isDeselect, isSelectAll) {
    let currentKeys = keys;
    if (this._isMultiSelectEnabled() && this._shouldMergeWithLastRequest && this._lastRequestData && !isDeselect && !isSelectAll) {
      var _this$_lastRequestDat;
      currentKeys = removeDuplicates([...keys, ...this._lastRequestData.addedItems], null === (_this$_lastRequestDat = this._lastRequestData) || void 0 === _this$_lastRequestDat ? void 0 : _this$_lastRequestDat.removedItems);
      currentKeys = getUniqueValues(currentKeys);
    }
    return currentKeys;
  }
  _loadSelectedItems(keys, isDeselect, isSelectAll, updatedKeys) {
    let forceCombinedFilter = arguments.length > 4 && void 0 !== arguments[4] ? arguments[4] : false;
    const deferred = Deferred();
    const filter = this.options.filter();
    this._shouldMergeWithLastRequest = this._requestInProgress();
    this._lastRequestData = this._collectLastRequestData(keys, isDeselect, isSelectAll, updatedKeys);
    when(this._lastLoadDeferred).always(() => {
      const currentKeys = this._updateKeysByLastRequestData(keys, isDeselect, isSelectAll);
      this._shouldMergeWithLastRequest = false;
      this._loadSelectedItemsCore(currentKeys, isDeselect, isSelectAll, filter, forceCombinedFilter).done((result) => {
        deferred.resolve(result);
      }).fail((error) => {
        deferred.reject(error);
      });
    });
    this._lastLoadDeferred = deferred;
    return deferred;
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys, forceCombinedFilter) {
    if (this._isCancelingInProgress) {
      return Deferred().reject();
    }
    const loadingDeferred = this._loadSelectedItems(keys, isDeselect, isSelectAll, updatedKeys, forceCombinedFilter);
    const selectionDeferred = Deferred();
    loadingDeferred.done((items) => {
      this._storeSelectionState();
      if (preserve) {
        this._preserveSelectionUpdate(items, isDeselect);
      } else {
        this._replaceSelectionUpdate(items);
      }
      this._isCancelingInProgress = true;
      this._callCallbackIfNotCanceled(() => {
        this._isCancelingInProgress = false;
        this.onSelectionChanged();
        selectionDeferred.resolve(items);
      }, () => {
        this._isCancelingInProgress = false;
        this._restoreSelectionState();
        selectionDeferred.reject();
      });
    });
    return selectionDeferred;
  }
  addSelectedItem(key, item) {
    if (isDefined(item) && !this.options.ignoreDisabledItems && item.disabled) {
      if (!this.options.disabledItemKeys.includes(key)) {
        this.options.disabledItemKeys.push(key);
      }
      return;
    }
    const keyHash = this._getKeyHash(key);
    if (-1 === this._indexOfSelectedItemKey(keyHash)) {
      if (!isObject(keyHash) && this.options.keyHashIndices) {
        this.options.keyHashIndices[keyHash] = [this.options.selectedItemKeys.length];
      }
      this.options.selectedItemKeys.push(key);
      this.options.addedItemKeys.push(key);
      this.options.addedItems.push(item);
      this.options.selectedItems.push(item);
    }
  }
  _getSelectedIndexByKey(key, ignoreIndicesMap) {
    const {
      selectedItemKeys
    } = this.options;
    return selectedItemKeys.findIndex((_, index) => !(null !== ignoreIndicesMap && void 0 !== ignoreIndicesMap && ignoreIndicesMap[index]) && this.equalKeys(selectedItemKeys[index], key));
  }
  _getSelectedIndexByHash(key, ignoreIndicesMap) {
    let indices = this.options.keyHashIndices[key];
    if (indices && indices.length > 1 && ignoreIndicesMap) {
      indices = indices.filter((index) => !ignoreIndicesMap[index]);
    }
    return indices && indices[0] >= 0 ? indices[0] : -1;
  }
  _indexOfSelectedItemKey(key, ignoreIndicesMap) {
    let selectedIndex = -1;
    if (this.options.equalByReference) {
      selectedIndex = this.options.selectedItemKeys.indexOf(key);
    } else if (isObject(key)) {
      selectedIndex = this._getSelectedIndexByKey(key, ignoreIndicesMap);
    } else {
      selectedIndex = this._getSelectedIndexByHash(key, ignoreIndicesMap);
    }
    return selectedIndex;
  }
  _shiftSelectedKeyIndices(keyIndex) {
    for (let currentKeyIndex = keyIndex; currentKeyIndex < this.options.selectedItemKeys.length; currentKeyIndex += 1) {
      const currentKey = this.options.selectedItemKeys[currentKeyIndex];
      const currentKeyHash = getKeyHash(currentKey);
      const currentKeyIndices = this.options.keyHashIndices[currentKeyHash];
      if (!currentKeyIndices) {
        continue;
      }
      for (let i = 0; i < currentKeyIndices.length; i += 1) {
        if (currentKeyIndices[i] > keyIndex) {
          currentKeyIndices[i] -= 1;
        }
      }
    }
  }
  removeSelectedItem(key, keyIndicesToRemoveMap, isDisabled) {
    if (!this.options.ignoreDisabledItems && isDisabled) {
      return;
    }
    const keyHash = this._getKeyHash(key);
    const isBatchDeselect = !!keyIndicesToRemoveMap;
    const keyIndex = this._indexOfSelectedItemKey(keyHash, keyIndicesToRemoveMap);
    if (keyIndex < 0) {
      return keyIndex;
    }
    this.options.removedItemKeys.push(key);
    this.options.removedItems.push(this.options.selectedItems[keyIndex]);
    if (isBatchDeselect) {
      return keyIndex;
    }
    this.options.selectedItemKeys.splice(keyIndex, 1);
    this.options.selectedItems.splice(keyIndex, 1);
    if (isObject(keyHash) || !this.options.keyHashIndices) {
      return keyIndex;
    }
    const keyIndices = this.options.keyHashIndices[keyHash];
    if (!keyIndices) {
      return keyIndex;
    }
    keyIndices.shift();
    if (!keyIndices.length) {
      delete this.options.keyHashIndices[keyHash];
    }
    this._shiftSelectedKeyIndices(keyIndex);
    return keyIndex;
  }
  _updateAddedItemKeys(keys, items) {
    for (let i = 0; i < keys.length; i += 1) {
      if (!this.isItemKeySelected(keys[i])) {
        this.options.addedItemKeys.push(keys[i]);
        this.options.addedItems.push(items[i]);
      }
    }
  }
  _updateRemovedItemKeys(_, oldSelectedKeys, oldSelectedItems) {
    for (let i = 0; i < oldSelectedKeys.length; i += 1) {
      if (!this.isItemKeySelected(oldSelectedKeys[i])) {
        this.options.removedItemKeys.push(oldSelectedKeys[i]);
        this.options.removedItems.push(oldSelectedItems[i]);
      }
    }
  }
  _isItemSelectionInProgress(key, checkPending) {
    const shouldCheckPending = checkPending && this._lastRequestData && this._requestInProgress();
    if (shouldCheckPending) {
      var _this$_lastRequestDat2;
      const addedItems = (null === (_this$_lastRequestDat2 = this._lastRequestData) || void 0 === _this$_lastRequestDat2 ? void 0 : _this$_lastRequestDat2.addedItems) ?? [];
      return addedItems.includes(key);
    }
    return false;
  }
  _getKeyHash(key) {
    return this.options.equalByReference ? key : getKeyHash(key);
  }
  setSelectedItems(keys, items) {
    this._updateAddedItemKeys(keys, items);
    const oldSelectedKeys = this.options.selectedItemKeys;
    const oldSelectedItems = this.options.selectedItems;
    if (!this.options.equalByReference) {
      this._initSelectedItemKeyHash();
      this.updateSelectedItemKeyHash(keys);
    }
    this._setOption("selectedItemKeys", keys);
    this._setOption("selectedItems", items);
    this._updateRemovedItemKeys(keys, oldSelectedKeys, oldSelectedItems);
  }
  isItemDataSelected(itemData) {
    let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const key = this.options.keyOf(itemData);
    return this.isItemKeySelected(key, options);
  }
  isItemKeySelected(key) {
    let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    let result = this._isItemSelectionInProgress(key, options.checkPending);
    if (!result) {
      const keyHash = this._getKeyHash(key);
      const index = this._indexOfSelectedItemKey(keyHash);
      result = -1 !== index;
    }
    return result;
  }
  getSelectAllState(visibleOnly) {
    if (visibleOnly) {
      return this._getVisibleSelectAllState();
    }
    return this._getFullSelectAllState();
  }
  loadSelectedItemsWithFilter() {
    const keyExpr = this.options.key();
    const keys = this.getSelectedItemKeys();
    const filter = this.options.filter();
    if (!keys.length) {
      return Deferred().resolve([]);
    }
    const selectionFilterCreator = new SelectionFilterCreator(keys);
    const combinedFilter = selectionFilterCreator.getCombinedFilter(keyExpr, filter, true);
    return this._loadFilteredData(combinedFilter);
  }
  _storeSelectionState() {
    const {
      selectedItems,
      selectedItemKeys,
      keyHashIndices
    } = this.options;
    this._storedSelectionState = {
      keyHashIndices: JSON.stringify(keyHashIndices),
      selectedItems: [...selectedItems],
      selectedItemKeys: [...selectedItemKeys]
    };
  }
  _restoreSelectionState() {
    this._clearItemKeys();
    if (!this._storedSelectionState) {
      return;
    }
    const {
      selectedItemKeys,
      selectedItems,
      keyHashIndices
    } = this._storedSelectionState;
    this._setOption("selectedItemKeys", selectedItemKeys);
    this._setOption("selectedItems", selectedItems);
    this._setOption("keyHashIndices", JSON.parse(keyHashIndices));
  }
  _onePageSelectAll(isDeselect) {
    if ("pending" === this._lastSelectAllPageDeferred.state()) {
      return Deferred().reject();
    }
    this._storeSelectionState();
    this._selectAllPlainItems(isDeselect);
    this._lastSelectAllPageDeferred = Deferred();
    this._callCallbackIfNotCanceled(() => {
      this.onSelectionChanged();
      this._lastSelectAllPageDeferred.resolve();
    }, () => {
      this._restoreSelectionState();
      this._lastSelectAllPageDeferred.reject();
    });
    return this._lastSelectAllPageDeferred;
  }
};

// node_modules/devextreme/esm/__internal/ui/selection/selection.js
var Selection = class {
  constructor(options) {
    this.options = extend(this._getDefaultOptions(), options, {
      selectedItemKeys: options.selectedKeys ?? []
    });
    this._selectionStrategy = this.options.deferred ? new DeferredStrategy(this.options) : new StandardStrategy(this.options);
    this._focusedItemIndex = -1;
    if (!this.options.equalByReference) {
      this._selectionStrategy.updateSelectedItemKeyHash(this.options.selectedItemKeys);
    }
  }
  _getDefaultOptions() {
    const defaultOptions = {
      allowNullValue: false,
      deferred: false,
      equalByReference: false,
      mode: "multiple",
      selectedItems: [],
      selectionFilter: [],
      maxFilterLengthInRequest: 0,
      onSelectionChanged: noop,
      key() {
        return;
      },
      keyOf: (item) => item,
      load: () => Deferred().resolve([]),
      totalCount: () => -1,
      isSelectableItem: () => true,
      isItemSelected: () => false,
      getItemData: (item) => item,
      dataFields() {
        return;
      },
      filter() {
        return;
      }
    };
    return defaultOptions;
  }
  validate() {
    this._selectionStrategy.validate();
  }
  getSelectedItemKeys() {
    return this._selectionStrategy.getSelectedItemKeys();
  }
  _isStandardStrategy(strategy) {
    return this.options.deferred;
  }
  getSelectedItems() {
    return this._selectionStrategy.getSelectedItems();
  }
  selectionFilter(value) {
    if (void 0 === value) {
      return this.options.selectionFilter;
    }
    const filterIsChanged = this.options.selectionFilter !== value && JSON.stringify(this.options.selectionFilter) !== JSON.stringify(value);
    this.options.selectionFilter = value;
    if (filterIsChanged) {
      this.onSelectionChanged();
    }
    return;
  }
  setSelection(keys, updatedKeys) {
    return this.selectedItemKeys(keys, false, false, false, updatedKeys);
  }
  select(keys) {
    return this.selectedItemKeys(keys, true);
  }
  deselect(keys) {
    return this.selectedItemKeys(keys, true, true);
  }
  selectedItemKeys(keys, preserve, isDeselect, isSelectAll, updatedKeys) {
    let normalizedKeys = keys ?? [];
    normalizedKeys = Array.isArray(normalizedKeys) ? normalizedKeys : [normalizedKeys];
    this.validate();
    return this._selectionStrategy.selectedItemKeys(normalizedKeys, preserve, isDeselect, isSelectAll, updatedKeys);
  }
  clearSelection() {
    return this.selectedItemKeys([]);
  }
  _addSelectedItem(itemData, key) {
    this._selectionStrategy.addSelectedItem(key, itemData);
  }
  _removeSelectedItem(key) {
    this._selectionStrategy.removeSelectedItem(key);
  }
  _setSelectedItems(keys, items) {
    this._selectionStrategy.setSelectedItems(keys, items);
  }
  onSelectionChanged() {
    this._selectionStrategy.onSelectionChanged();
  }
  changeItemSelection(itemIndex) {
    var _this$options$allowLo, _this$options;
    let keys = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    let setFocusOnly = arguments.length > 2 ? arguments[2] : void 0;
    let isSelectedItemsChanged = false;
    const items = this.options.plainItems();
    const item = items[itemIndex];
    let focusedItemIndex = itemIndex;
    let deferred;
    const {
      isVirtualPaging
    } = this.options;
    const allowLoadByRange = null === (_this$options$allowLo = (_this$options = this.options).allowLoadByRange) || void 0 === _this$options$allowLo ? void 0 : _this$options$allowLo.call(_this$options);
    const {
      alwaysSelectByShift
    } = this.options;
    let indexOffset;
    let focusedItemNotInLoadedRange = false;
    let shiftFocusedItemNotInLoadedRange = false;
    const itemIsNotInLoadedRange = (index) => index >= 0 && !items.filter((it) => it.loadIndex === index).length;
    if (isVirtualPaging && isDefined(item)) {
      if (allowLoadByRange) {
        indexOffset = item.loadIndex - focusedItemIndex;
        focusedItemIndex = item.loadIndex;
      }
      focusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._focusedItemIndex);
      if (isDefined(this._shiftFocusedItemIndex)) {
        shiftFocusedItemNotInLoadedRange = itemIsNotInLoadedRange(this._shiftFocusedItemIndex);
      }
    }
    if (!this.isSelectable() || !this.isDataItem(item)) {
      return false;
    }
    const itemData = this.options.getItemData(item);
    const itemKey = this.options.keyOf(itemData);
    let allowSelectByShift = keys.shift;
    if (false === alwaysSelectByShift && allowSelectByShift) {
      allowSelectByShift = false !== allowLoadByRange || !focusedItemNotInLoadedRange && !shiftFocusedItemNotInLoadedRange;
    }
    if (allowSelectByShift && "multiple" === this.options.mode && this._focusedItemIndex >= 0) {
      if (allowLoadByRange && (focusedItemNotInLoadedRange || shiftFocusedItemNotInLoadedRange)) {
        isSelectedItemsChanged = focusedItemIndex !== this._shiftFocusedItemIndex || this._focusedItemIndex !== this._shiftFocusedItemIndex;
        if (isSelectedItemsChanged) {
          deferred = this.changeItemSelectionWhenShiftKeyInVirtualPaging(focusedItemIndex);
        }
      } else {
        isSelectedItemsChanged = this.changeItemSelectionWhenShiftKeyPressed(focusedItemIndex, items, indexOffset);
      }
    } else if (keys.control) {
      this._resetItemSelectionWhenShiftKeyPressed();
      if (!setFocusOnly) {
        const isSelected = this._selectionStrategy.isItemDataSelected(itemData);
        if ("single" === this.options.mode) {
          this.clearSelectedItems();
        }
        if (isSelected) {
          this._removeSelectedItem(itemKey);
        } else {
          this._addSelectedItem(itemData, itemKey);
        }
      }
      isSelectedItemsChanged = true;
    } else {
      this._resetItemSelectionWhenShiftKeyPressed();
      const isKeysEqual2 = this._selectionStrategy.equalKeys(this.options.selectedItemKeys[0], itemKey);
      if (1 !== this.options.selectedItemKeys.length || !isKeysEqual2) {
        this._setSelectedItems([itemKey], [itemData]);
        isSelectedItemsChanged = true;
      }
    }
    if (isSelectedItemsChanged) {
      when(deferred).done(() => {
        this._focusedItemIndex = focusedItemIndex;
        if (!setFocusOnly) {
          this.onSelectionChanged();
        }
      });
      return true;
    }
    return;
  }
  isDataItem(item) {
    return this.options.isSelectableItem(item);
  }
  isSelectable() {
    return "single" === this.options.mode || "multiple" === this.options.mode;
  }
  isItemDataSelected(data) {
    return this._selectionStrategy.isItemDataSelected(data, {
      checkPending: true
    });
  }
  isItemSelected(arg) {
    let options = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    return this._selectionStrategy.isItemKeySelected(arg, options);
  }
  _resetItemSelectionWhenShiftKeyPressed() {
    delete this._shiftFocusedItemIndex;
  }
  _resetFocusedItemIndex() {
    this._focusedItemIndex = -1;
  }
  changeItemSelectionWhenShiftKeyInVirtualPaging(loadIndex) {
    var _this$options$getLoad, _this$options2;
    const loadOptions = (null === (_this$options$getLoad = (_this$options2 = this.options).getLoadOptions) || void 0 === _this$options$getLoad ? void 0 : _this$options$getLoad.call(_this$options2, loadIndex, this._focusedItemIndex, this._shiftFocusedItemIndex)) ?? {};
    const deferred = Deferred();
    const indexOffset = loadOptions.skip;
    this.options.load(loadOptions).done((items) => {
      const filteredItems = !Array.isArray(items) && isPlainObject(items) ? items.data : items;
      this.changeItemSelectionWhenShiftKeyPressed(loadIndex, filteredItems, indexOffset);
      deferred.resolve();
    });
    return deferred.promise();
  }
  changeItemSelectionWhenShiftKeyPressed(itemIndex, items, indexOffset) {
    let isSelectedItemsChanged = false;
    const indexOffsetDefined = isDefined(indexOffset);
    let index = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
    const {
      keyOf
    } = this.options;
    const focusedItem = items[index];
    const focusedData = this.options.getItemData(focusedItem);
    const focusedKey = keyOf(focusedData);
    const isFocusedItemSelected = focusedItem && this.isItemDataSelected(focusedData);
    if (!isDefined(this._shiftFocusedItemIndex)) {
      this._shiftFocusedItemIndex = this._focusedItemIndex;
    }
    let itemIndexStep = 0;
    let itemKey;
    let startIndex = 0;
    let endIndex = 0;
    if (this._shiftFocusedItemIndex !== this._focusedItemIndex) {
      itemIndexStep = this._focusedItemIndex < this._shiftFocusedItemIndex ? 1 : -1;
      startIndex = indexOffsetDefined ? this._focusedItemIndex - indexOffset : this._focusedItemIndex;
      endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
      for (index = startIndex; index !== endIndex; index += itemIndexStep) {
        if (indexOffsetDefined || this.isDataItem(items[index])) {
          itemKey = keyOf(this.options.getItemData(items[index]));
          this._removeSelectedItem(itemKey);
          isSelectedItemsChanged = true;
        }
      }
    }
    if (itemIndex !== this._shiftFocusedItemIndex) {
      itemIndexStep = itemIndex < this._shiftFocusedItemIndex ? 1 : -1;
      startIndex = indexOffsetDefined ? itemIndex - indexOffset : itemIndex;
      endIndex = indexOffsetDefined ? this._shiftFocusedItemIndex - indexOffset : this._shiftFocusedItemIndex;
      for (index = startIndex; index !== endIndex; index += itemIndexStep) {
        if (indexOffsetDefined || this.isDataItem(items[index])) {
          const data = this.options.getItemData(items[index]);
          itemKey = keyOf(data);
          this._addSelectedItem(data, itemKey);
          isSelectedItemsChanged = true;
        }
      }
    }
    if ((indexOffsetDefined || this.isDataItem(focusedItem)) && !isFocusedItemSelected) {
      this._addSelectedItem(focusedData, focusedKey);
      isSelectedItemsChanged = true;
    }
    return isSelectedItemsChanged;
  }
  clearSelectedItems() {
    this._setSelectedItems([], []);
  }
  selectAll(isOnePage) {
    this._resetFocusedItemIndex();
    if (isOnePage) {
      return this._selectionStrategy._onePageSelectAll(false);
    }
    return this.selectedItemKeys([], true, false, true);
  }
  deselectAll(isOnePage) {
    this._resetFocusedItemIndex();
    if (isOnePage) {
      return this._selectionStrategy._onePageSelectAll(true);
    }
    return this.selectedItemKeys([], true, true, true);
  }
  getSelectAllState(visibleOnly) {
    return this._selectionStrategy.getSelectAllState(visibleOnly);
  }
  loadSelectedItemsWithFilter() {
    return this._selectionStrategy.loadSelectedItemsWithFilter();
  }
};

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.edit.js
var NOT_EXISTING_INDEX = -1;
var indexExists = (index) => index !== NOT_EXISTING_INDEX;
var CollectionWidget2 = class _CollectionWidget extends collection_widget_base_default {
  constructor(element, options) {
    _CollectionWidget._initUserOptions = options ?? {};
    super(element, options);
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    this._optionsByReference.selectedItem = true;
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      selectionMode: "none",
      selectionRequired: false,
      selectByClick: true,
      selectedItems: [],
      selectedItemKeys: [],
      maxFilterLengthInRequest: 1500,
      keyExpr: null,
      selectedIndex: NOT_EXISTING_INDEX,
      focusOnSelectedItem: true,
      selectedItem: null,
      onSelectionChanging: null,
      onSelectionChanged: null,
      onItemReordered: null,
      onItemDeleting: null,
      onItemDeleted: null
    });
  }
  _init() {
    this._userOptions = Object.assign({}, _CollectionWidget._initUserOptions);
    _CollectionWidget._initUserOptions = void 0;
    this._initEditStrategy();
    super._init();
    this._initKeyGetter();
    this._initActions();
    this._initSelectionModule();
  }
  _initKeyGetter() {
    const {
      keyExpr
    } = this.option();
    this._keyGetter = compileGetter(keyExpr);
  }
  _selectedItemClass() {
    return "dx-item-selected";
  }
  _getActionsList() {
    return ["onSelectionChanging", "onSelectionChanged"];
  }
  _initActions() {
    this._actions = {};
    const actions = this._getActionsList();
    actions.forEach((action) => {
      this._actions[action] = this._createActionByOption(action, {
        excludeValidators: ["disabled", "readOnly"]
      }) ?? noop;
    });
  }
  _getKeysByItems(selectedItems) {
    return this._editStrategy.getKeysByItems(selectedItems);
  }
  _getItemsByKeys(selectedItemKeys, selectedItems) {
    return this._editStrategy.getItemsByKeys(selectedItemKeys, selectedItems);
  }
  _getKeyByIndex(index) {
    return this._editStrategy.getKeyByIndex(index);
  }
  _getIndexByKey(key) {
    return this._editStrategy.getIndexByKey(key);
  }
  _getIndexByItemData(itemData) {
    return this._editStrategy.getIndexByItemData(itemData);
  }
  _isKeySpecified() {
    return !!this._dataController.key();
  }
  _getCombinedFilter() {
    return this._dataController.filter();
  }
  key() {
    const {
      keyExpr
    } = this.option();
    if (keyExpr) {
      return keyExpr;
    }
    return this._dataController.key();
  }
  keyOf(item) {
    const {
      keyExpr
    } = this.option();
    if (keyExpr) {
      return this._keyGetter(item);
    }
    if (this._dataController.store()) {
      return this._dataController.keyOf(item);
    }
    return item;
  }
  _nullValueSelectionSupported() {
    return false;
  }
  _initSelectionModule() {
    const that = this;
    const {
      itemsGetter
    } = this._editStrategy;
    const {
      selectionMode,
      maxFilterLengthInRequest
    } = this.option();
    this._selection = new Selection({
      allowNullValue: this._nullValueSelectionSupported(),
      mode: selectionMode,
      maxFilterLengthInRequest,
      equalByReference: !this._isKeySpecified(),
      onSelectionChanging: (args) => {
        var _this$_actions$onSele, _this$_actions;
        const isSelectionChanged = args.addedItemKeys.length || args.removedItemKeys.length;
        if (!this._rendered || !isSelectionChanged) {
          return;
        }
        const selectionChangingArgs = {
          removedItems: args.removedItems,
          addedItems: args.addedItems,
          cancel: false
        };
        null === (_this$_actions$onSele = (_this$_actions = this._actions).onSelectionChanging) || void 0 === _this$_actions$onSele || _this$_actions$onSele.call(_this$_actions, selectionChangingArgs);
        args.cancel = selectionChangingArgs.cancel;
      },
      onSelectionChanged: (args) => {
        if (args.addedItemKeys.length || args.removedItemKeys.length) {
          this.option("selectedItems", this._getItemsByKeys(args.selectedItemKeys, args.selectedItems));
          this._updateSelectedItems(args);
        }
      },
      filter: this._getCombinedFilter.bind(this),
      totalCount: () => {
        const {
          items = []
        } = this.option();
        const totalCount = this._dataController.totalCount();
        return totalCount >= 0 ? totalCount : this._getItemsCount(items);
      },
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this),
      load(options) {
        var _dataController$loadO;
        const dataController = that._dataController;
        options.customQueryParams = null === (_dataController$loadO = dataController.loadOptions()) || void 0 === _dataController$loadO ? void 0 : _dataController$loadO.customQueryParams;
        options.userData = dataController.userData();
        if (dataController.store()) {
          return dataController.loadFromStore(options).done((loadResult) => {
            if (that._disposed) {
              return;
            }
            const items = normalizeLoadResult(loadResult).data;
            dataController.applyMapFunction(items);
          });
        }
        return Deferred().resolve(this.plainItems());
      },
      dataFields: () => this._dataController.select(),
      plainItems: itemsGetter.bind(this._editStrategy)
    });
  }
  _getItemsCount(items) {
    return items.reduce((itemsCount, item) => {
      const subItemsCount = item.items ? this._getItemsCount(item.items) : 1;
      return itemsCount + subItemsCount;
    }, 0);
  }
  _initEditStrategy() {
    this._editStrategy = new collection_widget_edit_strategy_plain_default(this);
  }
  _getSelectedItemIndices(keys) {
    const indices = [];
    const selectedKeys = keys ?? this._selection.getSelectedItemKeys();
    this._editStrategy.beginCache();
    each(selectedKeys, (_, key) => {
      const selectedIndex = this._getIndexByKey(key);
      if (indexExists(selectedIndex)) {
        indices.push(selectedIndex);
      }
    });
    this._editStrategy.endCache();
    return indices;
  }
  _initMarkup() {
    this._rendering = true;
    if (!this._dataController.isLoading()) {
      this._syncSelectionOptions().done(() => {
        this._normalizeSelectedItems();
      });
    }
    super._initMarkup();
  }
  _render() {
    super._render();
    this._rendering = false;
  }
  _fireContentReadyAction() {
    this._rendering = false;
    this._rendered = true;
    super._fireContentReadyAction();
  }
  _syncSelectionOptions(byOption) {
    const selectedByOption = byOption ?? this._chooseSelectOption();
    switch (selectedByOption) {
      case "selectedIndex": {
        const {
          selectedIndex
        } = this.option();
        const selectedItem = this._editStrategy.getItemDataByIndex(selectedIndex ?? NOT_EXISTING_INDEX);
        if (isDefined(selectedItem)) {
          this._setOptionWithoutOptionChange("selectedItems", [selectedItem]);
          this._setOptionWithoutOptionChange("selectedItem", selectedItem);
          this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems([selectedItem]));
        } else {
          this._setOptionWithoutOptionChange("selectedItems", []);
          this._setOptionWithoutOptionChange("selectedItemKeys", []);
          this._setOptionWithoutOptionChange("selectedItem", null);
        }
        break;
      }
      case "selectedItems": {
        const {
          selectedItems = [],
          selectionRequired
        } = this.option();
        const selectedIndex = selectedItems.length ? this._editStrategy.getIndexByItemData(selectedItems[0]) : NOT_EXISTING_INDEX;
        if (selectionRequired && !indexExists(selectedIndex)) {
          return this._syncSelectionOptions("selectedIndex");
        }
        this._setOptionWithoutOptionChange("selectedItem", selectedItems[0]);
        this._setOptionWithoutOptionChange("selectedIndex", selectedIndex);
        this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems(selectedItems));
        break;
      }
      case "selectedItem": {
        const {
          selectedItem,
          selectionRequired
        } = this.option();
        const selectedIndex = this._editStrategy.getIndexByItemData(selectedItem);
        if (selectionRequired && !indexExists(selectedIndex)) {
          return this._syncSelectionOptions("selectedIndex");
        }
        if (isDefined(selectedItem)) {
          this._setOptionWithoutOptionChange("selectedItems", [selectedItem]);
          this._setOptionWithoutOptionChange("selectedIndex", selectedIndex);
          this._setOptionWithoutOptionChange("selectedItemKeys", this._editStrategy.getKeysByItems([selectedItem]));
        } else {
          this._setOptionWithoutOptionChange("selectedItems", []);
          this._setOptionWithoutOptionChange("selectedItemKeys", []);
          this._setOptionWithoutOptionChange("selectedIndex", NOT_EXISTING_INDEX);
        }
        break;
      }
      case "selectedItemKeys": {
        const {
          selectedItemKeys = [],
          selectionRequired
        } = this.option();
        if (selectionRequired) {
          const selectedItemIndex = this._getIndexByKey(selectedItemKeys[0]);
          if (!indexExists(selectedItemIndex)) {
            return this._syncSelectionOptions("selectedIndex");
          }
        }
        return this._selection.setSelection(selectedItemKeys);
      }
    }
    return Deferred().resolve();
  }
  _chooseSelectOption() {
    let optionName = "selectedIndex";
    const isOptionDefined = (name2) => {
      const {
        [name2]: optionValue
      } = this.option();
      const length = isDefined(optionValue) && Array.isArray(optionValue) && optionValue.length;
      return !!length || name2 in (this._userOptions ?? {});
    };
    if (isOptionDefined("selectedItems")) {
      optionName = "selectedItems";
    } else if (isOptionDefined("selectedItem")) {
      optionName = "selectedItem";
    } else if (isOptionDefined("selectedItemKeys")) {
      optionName = "selectedItemKeys";
    }
    return optionName;
  }
  _compareKeys(oldKeys, newKeys) {
    if (oldKeys.length !== newKeys.length) {
      return false;
    }
    for (let i = 0; i < newKeys.length; i += 1) {
      if (oldKeys[i] !== newKeys[i]) {
        return false;
      }
    }
    return true;
  }
  _normalizeSelectedItems() {
    const {
      selectionMode,
      selectedItems = [],
      items
    } = this.option();
    if ("none" === selectionMode) {
      this._setOptionWithoutOptionChange("selectedItems", []);
      this._syncSelectionOptions("selectedItems");
    } else if ("single" === selectionMode) {
      const newSelection = selectedItems ?? [];
      const {
        selectionRequired
      } = this.option();
      if (newSelection.length > 1 || !newSelection.length && selectionRequired && null !== items && void 0 !== items && items.length) {
        const currentSelection = this._selection.getSelectedItems();
        let normalizedSelection = newSelection[0] ?? currentSelection[0];
        if (void 0 === normalizedSelection) {
          normalizedSelection = this._editStrategy.itemsGetter()[0];
        }
        const {
          grouped
        } = this.option();
        const hasSubItems = (item) => isObject(item) && "items" in item && Array.isArray(item.items);
        if (grouped && hasSubItems(normalizedSelection)) {
          normalizedSelection.items = [normalizedSelection.items[0]];
        }
        this._selection.setSelection(this._getKeysByItems([normalizedSelection]));
        this._setOptionWithoutOptionChange("selectedItems", [normalizedSelection]);
        return this._syncSelectionOptions("selectedItems");
      }
      this._selection.setSelection(this._getKeysByItems(newSelection));
    } else {
      const newKeys = this._getKeysByItems(selectedItems);
      const oldKeys = this._selection.getSelectedItemKeys();
      if (!this._compareKeys(oldKeys, newKeys)) {
        this._selection.setSelection(newKeys);
      }
    }
    return Deferred().resolve();
  }
  _itemClickHandler(e, args, config) {
    let itemSelectPromise = Deferred().resolve();
    this._createAction((event) => {
      itemSelectPromise = this._itemSelectHandler(event.event) ?? itemSelectPromise;
    }, {
      validatingTargetName: "itemElement"
    })({
      itemElement: renderer_default(e.currentTarget),
      event: e
    });
    itemSelectPromise.always(() => {
      super._itemClickHandler(e, args, config);
    });
  }
  _itemSelectHandler(e, shouldIgnoreSelectByClick) {
    const {
      selectByClick
    } = this.option();
    if (!shouldIgnoreSelectByClick && !selectByClick) {
      return;
    }
    const $itemElement = e.currentTarget;
    if (this.isItemSelected($itemElement)) {
      this.unselectItem(e.currentTarget);
    } else {
      const itemSelectPromise = this.selectItem(e.currentTarget);
      return null === itemSelectPromise || void 0 === itemSelectPromise ? void 0 : itemSelectPromise.promise();
    }
  }
  _selectedItemElement(index) {
    return this._itemElements().eq(index);
  }
  _postprocessRenderItem(args) {
    const {
      selectionMode
    } = this.option();
    if ("none" !== selectionMode) {
      const $itemElement = renderer_default(args.itemElement);
      const normalizedItemIndex = this._editStrategy.getNormalizedIndex($itemElement.get(0));
      const isItemSelected = this._isItemSelected(normalizedItemIndex);
      this._processSelectableItem($itemElement, isItemSelected);
    }
  }
  _processSelectableItem($itemElement, isSelected) {
    $itemElement.toggleClass(this._selectedItemClass(), isSelected);
    this._setAriaSelectionAttribute($itemElement, String(isSelected));
  }
  _updateSelectedItems(args) {
    const {
      addedItemKeys,
      removedItemKeys
    } = args;
    if (this._rendered && (addedItemKeys.length || removedItemKeys.length)) {
      if (!this._rendering) {
        const addedSelection = [];
        const removedSelection = [];
        this._editStrategy.beginCache();
        for (let i = 0; i < addedItemKeys.length; i += 1) {
          const normalizedIndex = this._getIndexByKey(addedItemKeys[i]);
          addedSelection.push(normalizedIndex);
          this._addSelection(normalizedIndex);
        }
        for (let i = 0; i < removedItemKeys.length; i += 1) {
          const normalizedIndex = this._getIndexByKey(removedItemKeys[i]);
          removedSelection.push(normalizedIndex);
          this._removeSelection(normalizedIndex);
        }
        this._editStrategy.endCache();
        this._updateSelection(addedSelection, removedSelection);
      }
      this._actions.onSelectionChanged({
        addedItems: args.addedItems,
        removedItems: args.removedItems
      });
    }
  }
  _updateSelection(addedSelection, removedSelection) {
  }
  _setAriaSelectionAttribute($target, value) {
    this.setAria("selected", value, $target);
  }
  _getFocusedElementIndex() {
    const {
      focusOnSelectedItem
    } = this.option();
    return focusOnSelectedItem ? this._getFlatIndex() : super._getFocusedElementIndex();
  }
  _getFlatIndex() {
    const {
      selectedIndex = NOT_EXISTING_INDEX
    } = this.option();
    return selectedIndex;
  }
  _removeSelection(normalizedIndex) {
    const $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, false);
      m_events_engine_default.triggerHandler($itemElement, "stateChanged", false);
    }
  }
  _addSelection(normalizedIndex) {
    const $itemElement = this._editStrategy.getItemElement(normalizedIndex);
    if (indexExists(normalizedIndex)) {
      this._processSelectableItem($itemElement, true);
      m_events_engine_default.triggerHandler($itemElement, "stateChanged", true);
    }
  }
  _isItemSelected(index) {
    const key = this._getKeyByIndex(index);
    return this._selection.isItemSelected(key, {
      checkPending: true
    });
  }
  _optionChanged(args) {
    switch (args.name) {
      case "selectionMode":
        this._invalidate();
        break;
      case "dataSource":
        if (!args.value || Array.isArray(args.value) && !args.value.length) {
          this.option("selectedItemKeys", []);
        }
        super._optionChanged(args);
        break;
      case "selectedIndex":
      case "selectedItem":
      case "selectedItems":
      case "selectedItemKeys":
        this._syncSelectionOptions(args.name).done(() => {
          this._normalizeSelectedItems();
        });
        break;
      case "keyExpr":
        this._initKeyGetter();
        break;
      case "selectionRequired":
        this._normalizeSelectedItems();
        break;
      case "onSelectionChanging":
      case "onSelectionChanged":
        this._initActions();
        break;
      case "selectByClick":
      case "onItemDeleting":
      case "onItemDeleted":
      case "onItemReordered":
      case "maxFilterLengthInRequest":
      case "focusOnSelectedItem":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clearSelectedItems() {
    this._setOptionWithoutOptionChange("selectedItems", []);
    this._syncSelectionOptions("selectedItems");
  }
  _waitDeletingPrepare($itemElement) {
    if ($itemElement.data("dxItemDeleting")) {
      return Deferred().resolve().promise();
    }
    $itemElement.data("dxItemDeleting", true);
    const deferred = Deferred();
    const deletingActionArgs = {
      cancel: false
    };
    const deletePromise = this._itemEventHandler($itemElement, "onItemDeleting", deletingActionArgs, {
      excludeValidators: ["disabled", "readOnly"]
    });
    when(deletePromise).always(function(value) {
      const deletePromiseExists = !deletePromise;
      const deletePromiseResolved = !deletePromiseExists && "resolved" === deletePromise.state();
      const argumentsSpecified = !!arguments.length;
      const shouldDeleteImmediately = deletePromiseExists;
      const shouldDeleteWhenNoArgs = deletePromiseResolved && !argumentsSpecified;
      const shouldDeleteWithValue = deletePromiseResolved && value;
      const shouldDelete = shouldDeleteImmediately || shouldDeleteWhenNoArgs || shouldDeleteWithValue;
      when(fromPromise(deletingActionArgs.cancel)).always(() => {
        $itemElement.data("dxItemDeleting", false);
      }).done((cancel) => {
        if (shouldDelete && !cancel) {
          deferred.resolve();
        } else {
          deferred.reject();
        }
      }).fail(deferred.reject);
    });
    return deferred.promise();
  }
  _deleteItemFromDS($item) {
    const dataController = this._dataController;
    const deferred = Deferred();
    const {
      disabled
    } = this.option();
    const dataStore = dataController.store();
    if (!dataStore) {
      return Deferred().resolve().promise();
    }
    if (!dataStore.remove) {
      throw ui_errors_default.Error("E1011");
    }
    this.option("disabled", true);
    dataStore.remove(dataController.keyOf(this._getItemData($item))).done((key) => {
      if (void 0 !== key) {
        deferred.resolve();
      } else {
        deferred.reject();
      }
    }).fail(() => {
      deferred.reject();
    });
    deferred.always(() => {
      this.option("disabled", disabled);
    });
    return deferred;
  }
  _tryRefreshLastPage() {
    const deferred = Deferred();
    const {
      grouped
    } = this.option();
    if (this._isLastPage() || grouped) {
      deferred.resolve();
    } else {
      this._refreshLastPage().done(() => {
        deferred.resolve();
      });
    }
    return deferred.promise();
  }
  _refreshLastPage() {
    this._expectLastItemLoading();
    return this._dataController.load();
  }
  _updateSelectionAfterDelete(index) {
    const key = this._getKeyByIndex(index);
    this._selection.deselect([key]);
  }
  _updateIndicesAfterIndex(index) {
    const itemElements = this._itemElements();
    for (let i = index + 1; i < itemElements.length; i += 1) {
      renderer_default(itemElements[i]).data(this._itemIndexKey(), i - 1);
    }
  }
  _simulateOptionChange(optionName) {
    var _this$_optionChangedA;
    const optionValue = this.option(optionName);
    if (optionValue instanceof DataSource) {
      return;
    }
    null === (_this$_optionChangedA = this._optionChangedAction) || void 0 === _this$_optionChangedA || _this$_optionChangedA.call(this, {
      name: optionName,
      fullName: optionName,
      value: optionValue
    });
  }
  isItemSelected(itemElement) {
    return this._isItemSelected(this._editStrategy.getNormalizedIndex(itemElement));
  }
  selectItem(itemElement) {
    const {
      selectionMode
    } = this.option();
    if ("none" === selectionMode) {
      return Deferred().resolve();
    }
    const itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return Deferred().resolve();
    }
    const key = this._getKeyByIndex(itemIndex);
    if (this._selection.isItemSelected(key)) {
      return Deferred().resolve();
    }
    if ("single" === selectionMode) {
      return this._selection.setSelection([key]);
    }
    const {
      selectedItemKeys
    } = this.option();
    return this._selection.setSelection([...selectedItemKeys ?? [], key], [key]);
  }
  unselectItem(itemElement) {
    const itemIndex = this._editStrategy.getNormalizedIndex(itemElement);
    if (!indexExists(itemIndex)) {
      return;
    }
    const selectedItemKeys = this._selection.getSelectedItemKeys();
    const {
      selectionRequired
    } = this.option();
    if (selectionRequired && selectedItemKeys.length <= 1) {
      return;
    }
    const key = this._getKeyByIndex(itemIndex);
    if (!this._selection.isItemSelected(key, {
      checkPending: true
    })) {
      return;
    }
    this._selection.deselect([key]);
  }
  _deleteItemElementByIndex(index) {
    this._updateSelectionAfterDelete(index);
    this._updateIndicesAfterIndex(index);
    this._editStrategy.deleteItemAtIndex(index);
  }
  _afterItemElementDeleted($item, deletedActionArgs) {
    const changingOption = this._dataController.getDataSource() ? "dataSource" : "items";
    this._simulateOptionChange(changingOption);
    this._itemEventHandler($item, "onItemDeleted", deletedActionArgs, {
      beforeExecute() {
        $item.remove();
      },
      excludeValidators: ["disabled", "readOnly"]
    });
    this._renderEmptyMessage();
  }
  deleteItem(itemElement) {
    const deferred = Deferred();
    const $item = this._editStrategy.getItemElement(itemElement);
    const index = this._editStrategy.getNormalizedIndex(itemElement);
    const itemResponseWaitClass = this._itemResponseWaitClass();
    if (indexExists(index)) {
      this._waitDeletingPrepare($item).done(() => {
        $item.addClass(itemResponseWaitClass);
        const deletedActionArgs = this._extendActionArgs($item);
        this._deleteItemFromDS($item).done(() => {
          this._deleteItemElementByIndex(index);
          this._afterItemElementDeleted($item, deletedActionArgs);
          this._tryRefreshLastPage().done(() => {
            deferred.resolveWith(this);
          });
        }).fail(() => {
          $item.removeClass(itemResponseWaitClass);
          deferred.rejectWith(this);
        });
      }).fail(() => {
        deferred.rejectWith(this);
      });
    } else {
      deferred.rejectWith(this);
    }
    return deferred.promise();
  }
  reorderItem(itemElement, toItemElement) {
    const deferred = Deferred();
    const strategy = this._editStrategy;
    const $movingItem = strategy.getItemElement(itemElement);
    const $destinationItem = strategy.getItemElement(toItemElement);
    const movingIndex = strategy.getNormalizedIndex(itemElement);
    const destinationIndex = strategy.getNormalizedIndex(toItemElement);
    const changingOption = this._dataController.getDataSource() ? "dataSource" : "items";
    const canMoveItems = indexExists(movingIndex) && indexExists(destinationIndex) && movingIndex !== destinationIndex;
    if (canMoveItems) {
      deferred.resolveWith(this);
    } else {
      deferred.rejectWith(this);
    }
    return deferred.promise().done(() => {
      $destinationItem[strategy.itemPlacementFunc(movingIndex, destinationIndex)]($movingItem);
      strategy.moveItemAtIndexToIndex(movingIndex, destinationIndex);
      this._updateIndicesAfterIndex(movingIndex);
      this.option("selectedItems", this._getItemsByKeys(this._selection.getSelectedItemKeys(), this._selection.getSelectedItems()));
      if ("items" === changingOption) {
        this._simulateOptionChange(changingOption);
      }
      this._itemEventHandler($movingItem, "onItemReordered", {
        fromIndex: strategy.getIndex(movingIndex),
        toIndex: strategy.getIndex(destinationIndex)
      }, {
        excludeValidators: ["disabled", "readOnly"]
      });
    });
  }
};
CollectionWidget2._initUserOptions = {};
var collection_widget_edit_default = CollectionWidget2;

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.async.js
var CollectionWidgetAsync = class extends collection_widget_edit_default {
  _initMarkup() {
    this._asyncTemplateItemsMap = {};
    super._initMarkup();
  }
  _render() {
    super._render();
    this._planPostRenderActions();
  }
  _renderItemContent(args) {
    const renderContentDeferred = Deferred();
    const itemDeferred = Deferred();
    const uniqueKey = `dx${new guid_default()}`;
    this._asyncTemplateItemsMap[uniqueKey] = itemDeferred;
    const $itemContent = super._renderItemContent(Object.assign({}, args, {
      uniqueKey
    }));
    itemDeferred.done(() => {
      renderContentDeferred.resolve($itemContent);
    });
    return renderContentDeferred.promise();
  }
  _onItemTemplateRendered(itemTemplate, renderArgs) {
    return () => {
      const {
        uniqueKey
      } = renderArgs;
      if (uniqueKey) {
        var _this$_asyncTemplateI;
        null === (_this$_asyncTemplateI = this._asyncTemplateItemsMap[uniqueKey]) || void 0 === _this$_asyncTemplateI || _this$_asyncTemplateI.resolve();
      }
    };
  }
  _postProcessRenderItems() {
  }
  _planPostRenderActions() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    const d = Deferred();
    const asyncTemplateItems = Object.values(this._asyncTemplateItemsMap);
    when.apply(this, asyncTemplateItems).done(() => {
      this._postProcessRenderItems(...args);
      d.resolve().done(() => {
        this._asyncTemplateItemsMap = {};
      });
    });
    return d.promise();
  }
  _clean() {
    super._clean();
    const asyncTemplateItems = Object.values(this._asyncTemplateItemsMap);
    asyncTemplateItems.forEach((item) => {
      item.reject();
    });
    this._asyncTemplateItemsMap = {};
  }
};
var collection_widget_async_default = CollectionWidgetAsync;

// node_modules/devextreme/esm/__internal/core/m_resize_observer.js
var window = m_window_default.getWindow();
var ResizeObserverMock = {
  observe: noop,
  unobserve: noop,
  disconnect: noop
};
var ResizeObserverSingleton = class {
  constructor() {
    if (!m_window_default.hasWindow() || !window.ResizeObserver) {
      return ResizeObserverMock;
    }
    this._callbacksMap = /* @__PURE__ */ new Map();
    this._observer = new window.ResizeObserver((entries) => {
      entries.forEach((entry) => {
        var _this$_callbacksMap$g;
        null === (_this$_callbacksMap$g = this._callbacksMap.get(entry.target)) || void 0 === _this$_callbacksMap$g || _this$_callbacksMap$g(entry);
      });
    });
  }
  observe(element, callback) {
    this._callbacksMap.set(element, callback);
    this._observer.observe(element);
  }
  unobserve(element) {
    this._callbacksMap.delete(element);
    this._observer.unobserve(element);
  }
  disconnect() {
    this._callbacksMap.clear();
    this._observer.disconnect();
  }
};
var resizeObserverSingleton = new ResizeObserverSingleton();

// node_modules/devextreme/esm/core/resize_observer.js
var resize_observer_default = resizeObserverSingleton;

export {
  BindableTemplate,
  findChanges,
  m_hold_default,
  name,
  item_default,
  collection_widget_edit_strategy_plain_default,
  SelectionFilterCreator,
  Selection,
  NOT_EXISTING_INDEX,
  indexExists,
  collection_widget_edit_default,
  collection_widget_async_default,
  resizeObserverSingleton,
  resize_observer_default
};
//# sourceMappingURL=chunk-PUYGF7OU.js.map
