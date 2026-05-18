import {
  scroll_view_default
} from "./chunk-SGWDUQQ7.js";
import {
  BindableTemplate,
  collection_widget_async_default,
  findChanges,
  item_default,
  resize_observer_default
} from "./chunk-PUYGF7OU.js";
import {
  deviceDependentOptions
} from "./chunk-W6QKVPSX.js";
import {
  DRAG_END_EVENT,
  DRAG_EVENT,
  DRAG_START_EVENT,
  OverlayPositionController,
  create,
  isLastZIndexInStack,
  overlay_default,
  remove
} from "./chunk-VLTKSH4G.js";
import {
  indexByKey,
  insert,
  isGroupItemsArray,
  keysEqual,
  update
} from "./chunk-TVYHC7GO.js";
import {
  button_default,
  getImageContainer,
  render2 as render
} from "./chunk-G4HHHCUP.js";
import {
  m_emitter_gesture_default
} from "./chunk-3PDP5MJ3.js";
import {
  message_default2 as message_default
} from "./chunk-EMRGXNWD.js";
import {
  current,
  isFluent,
  isMaterial,
  isMaterialBased,
  waitWebFont
} from "./chunk-J6BDSVIG.js";
import {
  CLICK_EVENT_NAME,
  EmptyTemplate,
  addNamespace,
  component_registrator_default,
  contains,
  dom_component_default,
  eventData,
  fx_default,
  getBoundingRect,
  getPublicElement,
  locate,
  m_emitter_registrator_default,
  m_pointer_default,
  move,
  triggerResizeEvent
} from "./chunk-4VCY6VPW.js";
import {
  devices_default,
  fitIntoRange,
  inRange,
  m_support_default,
  originalViewPort
} from "./chunk-KTSDTV35.js";
import {
  addOffsetToMaxHeight,
  addOffsetToMinHeight,
  camelize,
  getHeight,
  getInnerHeight,
  getInnerWidth,
  getOffset,
  getOuterHeight,
  getOuterWidth,
  getVerticalOffsets,
  getVisibleHeight,
  getWidth,
  renderer_default,
  setHeight,
  titleize
} from "./chunk-H2RLU3GL.js";
import {
  m_events_engine_default
} from "./chunk-WDK64ZWV.js";
import {
  Deferred,
  compileGetter,
  dom_adapter_default,
  each,
  ensureDefined,
  extend,
  getWindow,
  guid_default2 as guid_default,
  hasWindow,
  isDefined,
  isFunction,
  isObject,
  isPlainObject,
  isWindow,
  m_window_default,
  noop,
  pairToObject,
  when
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/__internal/ui/resizable/resizable.js
var RESIZABLE = "dxResizable";
var DRAGSTART_START_EVENT_NAME = addNamespace(DRAG_START_EVENT, RESIZABLE);
var DRAGSTART_EVENT_NAME = addNamespace(DRAG_EVENT, RESIZABLE);
var DRAGSTART_END_EVENT_NAME = addNamespace(DRAG_END_EVENT, RESIZABLE);
var SIDE_BORDER_WIDTH_STYLES = {
  left: "borderLeftWidth",
  top: "borderTopWidth",
  right: "borderRightWidth",
  bottom: "borderBottomWidth"
};
var Resizable = class extends dom_component_default {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      handles: "all",
      step: "1",
      stepPrecision: "simple",
      minWidth: 30,
      maxWidth: 1 / 0,
      minHeight: 30,
      maxHeight: 1 / 0,
      roundStepValue: true,
      keepAspectRatio: true
    });
  }
  _init() {
    super._init();
    this.$element().addClass("dx-resizable");
  }
  _initMarkup() {
    super._initMarkup();
    this._renderHandles();
  }
  _render() {
    super._render();
    this._renderActions();
  }
  _renderActions() {
    this._resizeStartAction = this._createActionByOption("onResizeStart");
    this._resizeEndAction = this._createActionByOption("onResizeEnd");
    this._resizeAction = this._createActionByOption("onResize");
  }
  _renderHandles() {
    this._handles = [];
    const {
      handles
    } = this.option();
    if ("none" === handles || !handles) {
      return;
    }
    const directions = "all" === handles ? ["top", "bottom", "left", "right"] : handles.split(" ");
    const activeHandlesMap = {};
    each(directions, (index, handleName) => {
      activeHandlesMap[handleName] = true;
      this._renderHandle(handleName);
    });
    if (activeHandlesMap.bottom && activeHandlesMap.right) {
      this._renderHandle("corner-bottom-right");
    }
    if (activeHandlesMap.bottom && activeHandlesMap.left) {
      this._renderHandle("corner-bottom-left");
    }
    if (activeHandlesMap.top && activeHandlesMap.right) {
      this._renderHandle("corner-top-right");
    }
    if (activeHandlesMap.top && activeHandlesMap.left) {
      this._renderHandle("corner-top-left");
    }
    this._attachEventHandlers();
  }
  _renderHandle(handleName) {
    const $handle = renderer_default("<div>").addClass("dx-resizable-handle").addClass(`dx-resizable-handle-${handleName}`).appendTo(this.$element());
    this._handles.push($handle);
  }
  _attachEventHandlers() {
    if (this.option("disabled")) {
      return;
    }
    const handlers = {};
    handlers[DRAGSTART_START_EVENT_NAME] = this._dragStartHandler.bind(this);
    handlers[DRAGSTART_EVENT_NAME] = this._dragHandler.bind(this);
    handlers[DRAGSTART_END_EVENT_NAME] = this._dragEndHandler.bind(this);
    this._handles.forEach((handleElement) => {
      m_events_engine_default.on(handleElement, handlers, {
        direction: "both",
        immediate: true
      });
    });
  }
  _detachEventHandlers() {
    this._handles.forEach((handleElement) => {
      m_events_engine_default.off(handleElement);
    });
  }
  _toggleEventHandlers(shouldAttachEvents) {
    if (shouldAttachEvents) {
      this._attachEventHandlers();
    } else {
      this._detachEventHandlers();
    }
  }
  _getElementSize() {
    const $element = this.$element();
    return "border-box" === $element.css("boxSizing") ? {
      width: getOuterWidth($element),
      height: getOuterHeight($element)
    } : {
      width: getWidth($element),
      height: getHeight($element)
    };
  }
  _dragStartHandler(e) {
    var _this$_resizeStartAct;
    const $element = this.$element();
    if ($element.is(".dx-state-disabled, .dx-state-disabled *")) {
      e.cancel = true;
      return;
    }
    this._toggleResizingClass(true);
    this._movingSides = this._getMovingSides(e);
    this._elementLocation = locate($element);
    this._elementSize = this._getElementSize();
    this._renderDragOffsets(e);
    null === (_this$_resizeStartAct = this._resizeStartAction) || void 0 === _this$_resizeStartAct || _this$_resizeStartAct.call(this, {
      event: e,
      width: this._elementSize.width,
      height: this._elementSize.height,
      handles: this._movingSides
    });
    e.targetElements = null;
  }
  _toggleResizingClass(value) {
    this.$element().toggleClass("dx-resizable-resizing", value);
  }
  _renderDragOffsets(e) {
    const area = this._getArea();
    if (!area) {
      return;
    }
    const $handle = renderer_default(e.target).closest(".dx-resizable-handle");
    const handleWidth = getOuterWidth($handle);
    const handleHeight = getOuterHeight($handle);
    const handleOffset = $handle.offset() ?? {
      left: 0,
      top: 0
    };
    const areaOffset = area.offset;
    const scrollOffset = this._getAreaScrollOffset();
    this._leftMaxOffset = handleOffset.left - areaOffset.left - scrollOffset.scrollX;
    e.maxLeftOffset = this._leftMaxOffset;
    this._rightMaxOffset = areaOffset.left + area.width - handleOffset.left - handleWidth + scrollOffset.scrollX;
    e.maxRightOffset = this._rightMaxOffset;
    this._topMaxOffset = handleOffset.top - areaOffset.top - scrollOffset.scrollY;
    e.maxTopOffset = this._topMaxOffset;
    this._bottomMaxOffset = areaOffset.top + area.height - handleOffset.top - handleHeight + scrollOffset.scrollY;
    e.maxBottomOffset = this._bottomMaxOffset;
  }
  _getBorderWidth($element, direction) {
    if (isWindow($element.get(0))) {
      return 0;
    }
    const borderWidth = $element.css(SIDE_BORDER_WIDTH_STYLES[direction]);
    return parseInt(borderWidth, 10) || 0;
  }
  _proportionate(direction, value) {
    const size = this._elementSize;
    const factor = "x" === direction ? size.width / size.height : size.height / size.width;
    return value * factor;
  }
  _getProportionalDelta(delta) {
    const {
      x,
      y
    } = delta;
    const proportionalY = this._proportionate("y", x);
    if (proportionalY >= y) {
      return {
        x,
        y: proportionalY
      };
    }
    const proportionalX = this._proportionate("x", y);
    if (proportionalX >= x) {
      return {
        x: proportionalX,
        y
      };
    }
    return {
      x: 0,
      y: 0
    };
  }
  _getDirectionName(axis) {
    const sides = this._movingSides;
    if ("x" === axis) {
      return sides.left ? "left" : "right";
    }
    return sides.top ? "top" : "bottom";
  }
  _fitIntoArea(axis, value) {
    const directionName = this._getDirectionName(axis);
    return Math.min(value, this[`_${directionName}MaxOffset`] ?? 1 / 0);
  }
  _fitDeltaProportionally(delta) {
    let fittedDelta = Object.assign({}, delta);
    const size = this._elementSize;
    const {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    } = this.option();
    const calculateWidth = () => size.width + fittedDelta.x;
    const calculateHeight = () => size.height + fittedDelta.y;
    const isInArea = (axis) => fittedDelta[axis] === this._fitIntoArea(axis, fittedDelta[axis]);
    const isFittedX = () => inRange(calculateWidth(), minWidth, maxWidth) && isInArea("x");
    const isFittedY = () => inRange(calculateHeight(), minHeight, maxHeight) && isInArea("y");
    if (!isFittedX()) {
      const x = this._fitIntoArea("x", fitIntoRange(calculateWidth(), minWidth, maxWidth) - size.width);
      fittedDelta = {
        x,
        y: this._proportionate("y", x)
      };
    }
    if (!isFittedY()) {
      const y = this._fitIntoArea("y", fitIntoRange(calculateHeight(), minHeight, maxHeight) - size.height);
      fittedDelta = {
        x: this._proportionate("x", y),
        y
      };
    }
    return isFittedX() && isFittedY() ? fittedDelta : {
      x: 0,
      y: 0
    };
  }
  _fitDelta(delta) {
    const {
      x,
      y
    } = delta;
    const size = this._elementSize;
    const {
      minWidth,
      minHeight,
      maxWidth,
      maxHeight
    } = this.option();
    return {
      x: fitIntoRange(size.width + x, minWidth, maxWidth) - size.width,
      y: fitIntoRange(size.height + y, minHeight, maxHeight) - size.height
    };
  }
  _getDeltaByOffset(offset) {
    const sides = this._movingSides;
    const shouldKeepAspectRatio = this._isCornerHandler(sides) && this.option("keepAspectRatio");
    let delta = {
      x: offset.x * (sides.left ? -1 : 1),
      y: offset.y * (sides.top ? -1 : 1)
    };
    if (shouldKeepAspectRatio) {
      const proportionalDelta = this._getProportionalDelta(delta);
      const fittedProportionalDelta = this._fitDeltaProportionally(proportionalDelta);
      delta = fittedProportionalDelta;
    } else {
      const fittedDelta = this._fitDelta(delta);
      const roundedFittedDelta = this._roundByStep(fittedDelta);
      delta = roundedFittedDelta;
    }
    return delta;
  }
  _updatePosition(delta, elementDimensions) {
    const {
      width,
      height
    } = elementDimensions;
    const location = this._elementLocation;
    const sides = this._movingSides;
    const $element = this.$element();
    const elementRect = this._getElementSize();
    const offsetTop = delta.y * (sides.top ? -1 : 1) - ((elementRect.height || height) - height);
    const offsetLeft = delta.x * (sides.left ? -1 : 1) - ((elementRect.width || width) - width);
    move($element, {
      top: location.top + (sides.top ? offsetTop : 0),
      left: location.left + (sides.left ? offsetLeft : 0)
    });
  }
  _dragHandler(e) {
    const offset = this._getOffset(e);
    const delta = this._getDeltaByOffset(offset);
    const dimensions = this._updateDimensions(delta);
    this._updatePosition(delta, dimensions);
    this._triggerResizeAction(e, dimensions);
  }
  _updateDimensions(delta) {
    const isAbsoluteSize = (size2) => "px" === size2.substring(size2.length - 2);
    const {
      stepPrecision
    } = this.option();
    const isStepPrecisionStrict = "strict" === stepPrecision;
    const size = this._elementSize;
    const width = size.width + delta.x;
    const height = size.height + delta.y;
    const elementStyle = this.$element()[0].style;
    const shouldRenderWidth = delta.x || isStepPrecisionStrict || isAbsoluteSize(elementStyle.width);
    const shouldRenderHeight = delta.y || isStepPrecisionStrict || isAbsoluteSize(elementStyle.height);
    if (shouldRenderWidth) {
      this.option({
        width
      });
    }
    if (shouldRenderHeight) {
      this.option({
        height
      });
    }
    return {
      width: shouldRenderWidth ? width : size.width,
      height: shouldRenderHeight ? height : size.height
    };
  }
  _triggerResizeAction(e, elementDimensions) {
    var _this$_resizeAction;
    const {
      width,
      height
    } = elementDimensions;
    null === (_this$_resizeAction = this._resizeAction) || void 0 === _this$_resizeAction || _this$_resizeAction.call(this, {
      event: e,
      width: this.option("width") || width,
      height: this.option("height") || height,
      handles: this._movingSides
    });
    triggerResizeEvent(this.$element());
  }
  _isCornerHandler(sides) {
    return 0 === Object.values(sides).reduce((xor, value) => xor ^ value, 0);
  }
  _getOffset(e) {
    const {
      offset
    } = e;
    const sides = this._movingSides;
    if (!sides.left && !sides.right) {
      offset.x = 0;
    }
    if (!sides.top && !sides.bottom) {
      offset.y = 0;
    }
    return offset;
  }
  _roundByStep(delta) {
    const {
      stepPrecision
    } = this.option();
    return "strict" === stepPrecision ? this._roundStrict(delta) : this._roundNotStrict(delta);
  }
  _getSteps() {
    const {
      step,
      roundStepValue
    } = this.option();
    return pairToObject(step, !roundStepValue);
  }
  _roundNotStrict(delta) {
    const {
      h,
      v
    } = this._getSteps();
    return {
      x: delta.x - delta.x % h,
      y: delta.y - delta.y % v
    };
  }
  _roundStrict(delta) {
    const sides = this._movingSides;
    const offset = {
      x: delta.x * (sides.left ? -1 : 1),
      y: delta.y * (sides.top ? -1 : 1)
    };
    const steps = this._getSteps();
    const location = this._elementLocation;
    const size = this._elementSize;
    const xPos = sides.left ? location.left : location.left + size.width;
    const yPos = sides.top ? location.top : location.top + size.height;
    const newXShift = (xPos + offset.x) % steps.h;
    const newYShift = (yPos + offset.y) % steps.v;
    const sign = Math.sign || ((x) => {
      const offsetX = +x;
      if (0 === offsetX || isNaN(offsetX)) {
        return offsetX;
      }
      return offsetX > 0 ? 1 : -1;
    });
    const separatorOffset = (stepValue, offsetValue) => (1 + 0.2 * sign(offsetValue)) % 1 * stepValue;
    const isSmallOffset = (offsetValue, stepValue) => Math.abs(offsetValue) < 0.2 * stepValue;
    let newOffsetX = offset.x - newXShift;
    let newOffsetY = offset.y - newYShift;
    if (newXShift > separatorOffset(steps.h, offset.x)) {
      newOffsetX += steps.h;
    }
    if (newYShift > separatorOffset(steps.v, offset.y)) {
      newOffsetY += steps.v;
    }
    const roundedOffset_x = (sides.left || sides.right) && !isSmallOffset(offset.x, steps.h) ? newOffsetX : 0, roundedOffset_y = (sides.top || sides.bottom) && !isSmallOffset(offset.y, steps.v) ? newOffsetY : 0;
    return {
      x: roundedOffset_x * (sides.left ? -1 : 1),
      y: roundedOffset_y * (sides.top ? -1 : 1)
    };
  }
  _getMovingSides(e) {
    const $target = renderer_default(e.target);
    const hasCornerTopLeftClass = $target.hasClass("dx-resizable-handle-corner-top-left");
    const hasCornerTopRightClass = $target.hasClass("dx-resizable-handle-corner-top-right");
    const hasCornerBottomLeftClass = $target.hasClass("dx-resizable-handle-corner-bottom-left");
    const hasCornerBottomRightClass = $target.hasClass("dx-resizable-handle-corner-bottom-right");
    return {
      top: $target.hasClass("dx-resizable-handle-top") || hasCornerTopLeftClass || hasCornerTopRightClass,
      left: $target.hasClass("dx-resizable-handle-left") || hasCornerTopLeftClass || hasCornerBottomLeftClass,
      bottom: $target.hasClass("dx-resizable-handle-bottom") || hasCornerBottomLeftClass || hasCornerBottomRightClass,
      right: $target.hasClass("dx-resizable-handle-right") || hasCornerTopRightClass || hasCornerBottomRightClass
    };
  }
  _getArea() {
    let {
      area
    } = this.option();
    if (isFunction(area)) {
      area = area.call(this);
    }
    if (isPlainObject(area)) {
      return this._getAreaFromObject(area);
    }
    return this._getAreaFromElement(area);
  }
  _getAreaScrollOffset() {
    const {
      area
    } = this.option();
    const isElement = !isFunction(area) && !isPlainObject(area);
    const scrollOffset = {
      scrollY: 0,
      scrollX: 0
    };
    if (isElement) {
      const areaElement = renderer_default(area)[0];
      if (isWindow(areaElement)) {
        scrollOffset.scrollX = areaElement.pageXOffset;
        scrollOffset.scrollY = areaElement.pageYOffset;
      }
    }
    return scrollOffset;
  }
  _getAreaFromObject(area) {
    const result = {
      width: area.right - area.left,
      height: area.bottom - area.top,
      offset: {
        left: area.left,
        top: area.top
      }
    };
    this._correctAreaGeometry(result);
    return result;
  }
  _getAreaFromElement(area) {
    const $area = renderer_default(area);
    if (!$area.length) {
      return;
    }
    const result = {
      width: getInnerWidth($area),
      height: getInnerHeight($area),
      offset: extend({
        top: 0,
        left: 0
      }, isWindow($area[0]) ? {} : $area.offset())
    };
    this._correctAreaGeometry(result, $area);
    return result;
  }
  _correctAreaGeometry(result, $area) {
    const areaBorderLeft = $area ? this._getBorderWidth($area, "left") : 0;
    const areaBorderTop = $area ? this._getBorderWidth($area, "top") : 0;
    result.offset.left += areaBorderLeft + this._getBorderWidth(this.$element(), "left");
    result.offset.top += areaBorderTop + this._getBorderWidth(this.$element(), "top");
    result.width -= getOuterWidth(this.$element()) - getInnerWidth(this.$element());
    result.height -= getOuterHeight(this.$element()) - getInnerHeight(this.$element());
  }
  _dragEndHandler(e) {
    var _this$_resizeEndActio;
    const $element = this.$element();
    null === (_this$_resizeEndActio = this._resizeEndAction) || void 0 === _this$_resizeEndActio || _this$_resizeEndActio.call(this, {
      event: e,
      width: getOuterWidth($element),
      height: getOuterHeight($element),
      handles: this._movingSides
    });
    this._toggleResizingClass(false);
  }
  _renderWidth(width) {
    const {
      minWidth,
      maxWidth
    } = this.option();
    this.option("width", fitIntoRange(width, minWidth, maxWidth));
  }
  _renderHeight(height) {
    const {
      minHeight,
      maxHeight
    } = this.option();
    this.option("height", fitIntoRange(height, minHeight, maxHeight));
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case "disabled":
        this._toggleEventHandlers(!value);
        super._optionChanged(args);
        break;
      case "handles":
        this._invalidate();
        break;
      case "minWidth":
      case "maxWidth":
        if (hasWindow()) {
          this._renderWidth(getOuterWidth(this.$element()));
        }
        break;
      case "minHeight":
      case "maxHeight":
        if (hasWindow()) {
          this._renderHeight(getOuterHeight(this.$element()));
        }
        break;
      case "onResize":
      case "onResizeStart":
      case "onResizeEnd":
        this._renderActions();
        break;
      case "area":
      case "stepPrecision":
      case "step":
      case "roundStepValue":
      case "keepAspectRatio":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _clean() {
    this.$element().find(".dx-resizable-handle").remove();
  }
  _useTemplates() {
    return false;
  }
};
component_registrator_default(RESIZABLE, Resizable);
var resizable_default = Resizable;

// node_modules/devextreme/esm/ui/resizable.js
var resizable_default2 = resizable_default;

// node_modules/devextreme/esm/__internal/ui/toolbar/constants.js
var TOOLBAR_CLASS = "dx-toolbar";

// node_modules/devextreme/esm/__internal/ui/toolbar/toolbar.base.js
var TOOLBAR_ITEM_DATA_KEY = "dxToolbarItemDataKey";
var ToolbarBase = class extends collection_widget_async_default {
  _getSynchronizableOptionsForCreateComponent() {
    return super._getSynchronizableOptionsForCreateComponent().filter((item) => "disabled" !== item);
  }
  _initTemplates() {
    super._initTemplates();
    const template = new BindableTemplate(($container, data, rawModel) => {
      if (isPlainObject(data)) {
        const {
          text,
          html,
          widget
        } = data;
        if (text) {
          $container.text(text).wrapInner("<div>");
        }
        if (html) {
          $container.html(html);
        }
        if ("dxDropDownButton" === widget) {
          data.options = data.options ?? {};
          if (!isDefined(data.options.stylingMode)) {
            data.options.stylingMode = this.option("useFlatButtons") ? "text" : "contained";
          }
        }
        if ("dxButton" === widget) {
          if (this.option("useFlatButtons")) {
            data.options = data.options ?? {};
            data.options.stylingMode = data.options.stylingMode ?? "text";
          }
          if (this.option("useDefaultButtons")) {
            data.options = data.options ?? {};
            data.options.type = data.options.type ?? "default";
          }
        }
      } else {
        $container.text(String(data));
      }
      this._getTemplate("dx-polymorph-widget").render({
        container: $container,
        model: rawModel,
        parent: this
      });
    }, ["text", "html", "widget", "options"], this.option("integrationOptions.watchMethod"));
    this._templateManager.addDefaultTemplates({
      item: template,
      menuItem: template
    });
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      renderAs: "topToolbar",
      grouped: false,
      useFlatButtons: false,
      useDefaultButtons: false
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: () => isMaterialBased(current()),
      options: {
        useFlatButtons: true
      }
    }]);
  }
  _itemContainer() {
    return this._$toolbarItemsContainer.find([".dx-toolbar-before", ".dx-toolbar-center", ".dx-toolbar-after"].join(","));
  }
  _itemClass() {
    return "dx-toolbar-item";
  }
  _itemDataKey() {
    return TOOLBAR_ITEM_DATA_KEY;
  }
  _dimensionChanged(dimension) {
    if (this._disposed) {
      return;
    }
    this._arrangeItems();
    this._applyCompactMode();
  }
  _initMarkup() {
    this._renderToolbar();
    this._renderSections();
    super._initMarkup();
  }
  _render() {
    super._render();
    this._updateDimensionsInMaterial();
  }
  _postProcessRenderItems() {
    this._arrangeItems();
  }
  _renderToolbar() {
    this.$element().addClass(TOOLBAR_CLASS);
    this._$toolbarItemsContainer = renderer_default("<div>").addClass("dx-toolbar-items-container").appendTo(this.$element());
    this.setAria("role", "toolbar");
  }
  _renderSections() {
    const $container = this._$toolbarItemsContainer;
    each(["before", "center", "after"], (_, section) => {
      const sectionClass = `dx-toolbar-${section}`;
      const $section = $container.find(`.${sectionClass}`);
      if (!$section.length) {
        this[`_$${section}Section`] = renderer_default("<div>").addClass(sectionClass).attr("role", "presentation").appendTo($container);
      }
    });
  }
  _arrangeItems(width) {
    var _this$_$centerSection, _this$_$beforeSection, _this$_$afterSection, _$label$position;
    const elementWidth = width ?? getWidth(this.$element());
    null === (_this$_$centerSection = this._$centerSection) || void 0 === _this$_$centerSection || _this$_$centerSection.css({
      margin: "0 auto",
      float: "none"
    });
    const beforeWidth = getOuterWidth(null === (_this$_$beforeSection = this._$beforeSection) || void 0 === _this$_$beforeSection ? void 0 : _this$_$beforeSection.get(0)) ?? 0;
    const afterWidth = getOuterWidth(null === (_this$_$afterSection = this._$afterSection) || void 0 === _this$_$afterSection ? void 0 : _this$_$afterSection.get(0)) ?? 0;
    this._alignCenterSection(beforeWidth, afterWidth, elementWidth);
    const $label = this._$toolbarItemsContainer.find(".dx-toolbar-label").eq(0);
    const $section = $label.parent();
    if (!$label.length) {
      return;
    }
    const labelOffset = beforeWidth ?? (null === (_$label$position = $label.position()) || void 0 === _$label$position ? void 0 : _$label$position.left);
    const widthBeforeSection = $section.hasClass("dx-toolbar-before") ? 0 : labelOffset;
    const widthAfterSection = $section.hasClass("dx-toolbar-after") ? 0 : afterWidth;
    let elemsAtSectionWidth = 0;
    $section.children().not(".dx-toolbar-label").each((_, element) => {
      elemsAtSectionWidth += getOuterWidth(element);
    });
    const freeSpace = elementWidth - elemsAtSectionWidth;
    const sectionMaxWidth = Math.max(freeSpace - widthBeforeSection - widthAfterSection, 0);
    if ($section.hasClass("dx-toolbar-before")) {
      if (this._$beforeSection) {
        this._alignSection(this._$beforeSection, sectionMaxWidth);
      }
    } else {
      const labelPaddings = getOuterWidth($label) - getWidth($label);
      $label.css("maxWidth", sectionMaxWidth - labelPaddings);
    }
  }
  _alignCenterSection(beforeWidth, afterWidth, elementWidth) {
    var _this$_$beforeSection2, _this$_$afterSection2;
    if (!this._$centerSection) {
      return;
    }
    this._alignSection(this._$centerSection, elementWidth - beforeWidth - afterWidth);
    const isRTL = this.option("rtlEnabled");
    const leftWidth = isRTL ? afterWidth : beforeWidth;
    const rightWidth = isRTL ? beforeWidth : afterWidth;
    const centerEl = this._$centerSection.get(0);
    const centerLeft = centerEl.offsetLeft;
    const centerRight = centerLeft + centerEl.offsetWidth;
    const beforeEl = null === (_this$_$beforeSection2 = this._$beforeSection) || void 0 === _this$_$beforeSection2 ? void 0 : _this$_$beforeSection2.get(0);
    const afterEl = null === (_this$_$afterSection2 = this._$afterSection) || void 0 === _this$_$afterSection2 ? void 0 : _this$_$afterSection2.get(0);
    const leftSectionRight = afterEl ? afterEl.offsetLeft + afterEl.offsetWidth : 0;
    const leftSectionRightLTR = beforeEl ? beforeEl.offsetLeft + beforeEl.offsetWidth : 0;
    const leftRight = isRTL ? leftSectionRight : leftSectionRightLTR;
    const rightLeft = isRTL ? (null === beforeEl || void 0 === beforeEl ? void 0 : beforeEl.offsetLeft) ?? elementWidth : (null === afterEl || void 0 === afterEl ? void 0 : afterEl.offsetLeft) ?? elementWidth;
    if (leftRight > centerLeft || centerRight > rightLeft) {
      this._$centerSection.css({
        marginLeft: leftWidth,
        marginRight: rightWidth,
        float: leftWidth > rightWidth ? "none" : "right"
      });
    }
  }
  _alignSection($section, maxWidth) {
    const $labels = $section.find(".dx-toolbar-label");
    const labels = $labels.toArray();
    const maxWidthWithoutPaddings = maxWidth - this._getCurrentLabelsPaddings(labels);
    const currentWidth = this._getCurrentLabelsWidth(labels);
    const difference = Math.abs(currentWidth - maxWidthWithoutPaddings);
    if (maxWidthWithoutPaddings < currentWidth) {
      const reversedLabels = labels.reverse();
      this._alignSectionLabels(reversedLabels, difference, false);
    } else {
      this._alignSectionLabels(labels, difference, true);
    }
  }
  _alignSectionLabels(labels, difference, expanding) {
    const getRealLabelWidth = (label) => getOuterWidth(label) ?? 0;
    for (let i = 0; i < labels.length; i++) {
      const $label = renderer_default(labels[i]);
      const currentLabelWidth = Math.ceil(getRealLabelWidth(labels[i]));
      let labelMaxWidth = 0;
      if (expanding) {
        $label.css("maxWidth", "inherit");
      }
      const width = expanding ? getRealLabelWidth(labels[i]) : currentLabelWidth;
      const possibleLabelWidth = Math.ceil(width);
      if (possibleLabelWidth < difference) {
        labelMaxWidth = expanding ? possibleLabelWidth : 0;
        difference -= possibleLabelWidth;
      } else {
        labelMaxWidth = expanding ? currentLabelWidth + difference : currentLabelWidth - difference;
        $label.css("maxWidth", labelMaxWidth);
        break;
      }
      $label.css("maxWidth", labelMaxWidth);
    }
  }
  _applyCompactMode() {
    const $element = renderer_default(this.element());
    $element.removeClass("dx-toolbar-compact");
    if (this.option("compactMode") && this._getSummaryItemsSize("width", this._itemElements(), true) > getWidth($element)) {
      $element.addClass("dx-toolbar-compact");
    }
  }
  _getCurrentLabelsWidth(labels) {
    let width = 0;
    labels.forEach((label) => {
      width += getOuterWidth(label);
    });
    return width;
  }
  _getCurrentLabelsPaddings(labels) {
    let padding = 0;
    labels.forEach((label) => {
      padding += getOuterWidth(label) - getWidth(label);
    });
    return padding;
  }
  _renderItem(index, itemData, $container, $itemToReplace) {
    const location = itemData.location ?? "center";
    const container = $container ?? this[`_$${location}Section`];
    const itemHasText = !!(itemData.text ?? itemData.html);
    const $itemElement = super._renderItem(index, itemData, container, $itemToReplace);
    $itemElement.toggleClass("dx-toolbar-button", !itemHasText).toggleClass("dx-toolbar-label", itemHasText).addClass(itemData.cssClass ?? "");
    return $itemElement;
  }
  _renderGroupedItems() {
    each(this.option("items"), (groupIndex, group) => {
      const groupItems = group.items;
      const $container = renderer_default("<div>").addClass("dx-toolbar-group");
      const location = group.location ?? "center";
      if (!(null !== groupItems && void 0 !== groupItems && groupItems.length)) {
        return;
      }
      each(groupItems, (itemIndex, item) => {
        this._renderItem(itemIndex, item, $container);
      });
      this._$toolbarItemsContainer.find(`.dx-toolbar-${location}`).append($container);
    });
  }
  _renderItems(items) {
    const grouped = this.option("grouped") && items.length && items[0].items;
    if (grouped) {
      this._renderGroupedItems();
    } else {
      super._renderItems(items);
    }
  }
  _getToolbarItems() {
    const {
      items = []
    } = this.option();
    return items;
  }
  _renderContentImpl() {
    const items = this._getToolbarItems();
    this.$element().toggleClass("dx-toolbar-mini", 0 === items.length);
    if (this._renderedItemsCount) {
      this._renderItems(items.slice(this._renderedItemsCount));
    } else {
      this._renderItems(items);
    }
    this._applyCompactMode();
  }
  _renderEmptyMessage() {
  }
  _clean() {
    this._$toolbarItemsContainer.children().empty();
    this.$element().empty();
    delete this._$beforeSection;
    delete this._$centerSection;
    delete this._$afterSection;
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._arrangeItems();
    }
  }
  _isVisible() {
    return getWidth(this.$element()) > 0 && getHeight(this.$element()) > 0;
  }
  _getIndexByItem(item) {
    return this._getToolbarItems().indexOf(item);
  }
  _itemOptionChanged(item, property, value, prevValue) {
    super._itemOptionChanged(item, property, value, prevValue);
    this._arrangeItems();
  }
  _optionChanged(args) {
    const {
      name
    } = args;
    switch (name) {
      case "width":
        super._optionChanged(args);
        this._dimensionChanged();
        break;
      case "renderAs":
      case "useFlatButtons":
      case "useDefaultButtons":
        this._invalidate();
        break;
      case "compactMode":
        this._applyCompactMode();
        break;
      case "grouped":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _dispose() {
    super._dispose();
    clearTimeout(this._waitParentAnimationTimeout);
  }
  _updateDimensionsInMaterial() {
    if (isMaterial(current())) {
      const _waitParentAnimationFinished = () => new Promise((resolve) => {
        const check = () => {
          let readyToResolve = true;
          this.$element().parents().each((_, parent) => {
            if (fx_default.isAnimating(renderer_default(parent).get(0))) {
              readyToResolve = false;
              return false;
            }
            return true;
          });
          if (readyToResolve) {
            resolve();
          }
          return readyToResolve;
        };
        const runCheck = () => {
          clearTimeout(this._waitParentAnimationTimeout);
          this._waitParentAnimationTimeout = setTimeout(() => check() || runCheck(), 15);
        };
        runCheck();
      });
      const _checkWebFontForLabelsLoaded = () => {
        const $labels = this.$element().find(".dx-toolbar-label");
        const promises = [];
        $labels.each((_, label) => {
          const text = renderer_default(label).text();
          const fontWeight = renderer_default(label).css("fontWeight");
          promises.push(waitWebFont(text, fontWeight));
          return true;
        });
        return Promise.all(promises);
      };
      Promise.all([_waitParentAnimationFinished(), _checkWebFontForLabelsLoaded()]).then(() => {
        this._dimensionChanged();
      });
    }
  }
};
component_registrator_default("dxToolbarBase", ToolbarBase);
var toolbar_base_default = ToolbarBase;

// node_modules/devextreme/esm/__internal/ui/popup/m_popup_drag.js
var PopupDrag = class {
  constructor(config) {
    this.init(config);
  }
  init(_ref) {
    let {
      dragEnabled,
      handle,
      draggableElement,
      positionController
    } = _ref;
    this._positionController = positionController;
    this._draggableElement = draggableElement;
    this._handle = handle;
    this._dragEnabled = dragEnabled;
    this.unsubscribe();
    if (!dragEnabled) {
      return;
    }
    this.subscribe();
  }
  moveDown(e) {
    this._moveTo(5, 0, e);
  }
  moveUp(e) {
    this._moveTo(-5, 0, e);
  }
  moveLeft(e) {
    this._moveTo(0, -5, e);
  }
  moveRight(e) {
    this._moveTo(0, 5, e);
  }
  subscribe() {
    const eventNames = this._getEventNames();
    m_events_engine_default.on(this._handle, eventNames.startEventName, (e) => {
      this._dragStartHandler(e);
    });
    m_events_engine_default.on(this._handle, eventNames.updateEventName, (e) => {
      this._dragUpdateHandler(e);
    });
    m_events_engine_default.on(this._handle, eventNames.endEventName, (e) => {
      this._dragEndHandler(e);
    });
  }
  unsubscribe() {
    const eventNames = this._getEventNames();
    m_events_engine_default.off(this._handle, eventNames.startEventName);
    m_events_engine_default.off(this._handle, eventNames.updateEventName);
    m_events_engine_default.off(this._handle, eventNames.endEventName);
  }
  _getEventNames() {
    const startEventName = addNamespace(DRAG_START_EVENT, "overlayDrag");
    const updateEventName = addNamespace(DRAG_EVENT, "overlayDrag");
    const endEventName = addNamespace(DRAG_END_EVENT, "overlayDrag");
    return {
      startEventName,
      updateEventName,
      endEventName
    };
  }
  _dragStartHandler(e) {
    const allowedOffsets = this._getAllowedOffsets();
    this._prevOffset = {
      x: 0,
      y: 0
    };
    e.targetElements = [];
    e.maxTopOffset = allowedOffsets.top;
    e.maxBottomOffset = allowedOffsets.bottom;
    e.maxLeftOffset = allowedOffsets.left;
    e.maxRightOffset = allowedOffsets.right;
  }
  _dragUpdateHandler(e) {
    const targetOffset = {
      top: e.offset.y - this._prevOffset.y,
      left: e.offset.x - this._prevOffset.x
    };
    this._moveByOffset(targetOffset);
    this._prevOffset = e.offset;
  }
  _dragEndHandler(event) {
    this._positionController.dragHandled();
    this._positionController.detectVisualPositionChange(event);
  }
  _moveTo(top, left, e) {
    if (!this._dragEnabled) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    const offset = this._fitOffsetIntoAllowedRange(top, left);
    this._moveByOffset(offset);
    this._dragEndHandler(e);
  }
  _fitOffsetIntoAllowedRange(top, left) {
    const allowedOffsets = this._getAllowedOffsets();
    return {
      top: fitIntoRange(top, -allowedOffsets.top, allowedOffsets.bottom),
      left: fitIntoRange(left, -allowedOffsets.left, allowedOffsets.right)
    };
  }
  _getContainerDimensions() {
    const document = dom_adapter_default.getDocument();
    const container = this._positionController.$dragResizeContainer.get(0);
    let containerWidth = getOuterWidth(container);
    let containerHeight = getOuterHeight(container);
    if (isWindow(container)) {
      containerHeight = Math.max(document.body.clientHeight, containerHeight);
      containerWidth = Math.max(document.body.clientWidth, containerWidth);
    }
    return {
      width: containerWidth,
      height: containerHeight
    };
  }
  _getContainerPosition() {
    const container = this._positionController.$dragResizeContainer.get(0);
    return isWindow(container) ? {
      top: 0,
      left: 0
    } : getOffset(container);
  }
  _getElementPosition() {
    return getOffset(this._draggableElement);
  }
  _getInnerDelta() {
    const containerDimensions = this._getContainerDimensions();
    const elementDimensions = this._getElementDimensions();
    return {
      x: containerDimensions.width - elementDimensions.width,
      y: containerDimensions.height - elementDimensions.height
    };
  }
  _getOuterDelta() {
    const {
      width,
      height
    } = this._getElementDimensions();
    const {
      outsideDragFactor
    } = this._positionController;
    return {
      x: width * outsideDragFactor,
      y: height * outsideDragFactor
    };
  }
  _getFullDelta() {
    const fullDelta = this._getInnerDelta();
    const outerDelta = this._getOuterDelta();
    return {
      x: fullDelta.x + outerDelta.x,
      y: fullDelta.y + outerDelta.y
    };
  }
  _getElementDimensions() {
    return {
      width: this._draggableElement.offsetWidth,
      height: this._draggableElement.offsetHeight
    };
  }
  _getAllowedOffsets() {
    const fullDelta = this._getFullDelta();
    const isDragAllowed = fullDelta.y >= 0 && fullDelta.x >= 0;
    if (!isDragAllowed) {
      return {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
      };
    }
    const elementPosition = this._getElementPosition();
    const containerPosition = this._getContainerPosition();
    const outerDelta = this._getOuterDelta();
    return {
      top: elementPosition.top - containerPosition.top + outerDelta.y,
      bottom: -elementPosition.top + containerPosition.top + fullDelta.y,
      left: elementPosition.left - containerPosition.left + outerDelta.x,
      right: -elementPosition.left + containerPosition.left + fullDelta.x
    };
  }
  _moveByOffset(offset) {
    const currentPosition = locate(this._draggableElement);
    const newPosition = {
      left: currentPosition.left + offset.left,
      top: currentPosition.top + offset.top
    };
    move(this._draggableElement, newPosition);
  }
};
var m_popup_drag_default = PopupDrag;

// node_modules/devextreme/esm/__internal/ui/popup/m_popup_overflow_manager.js
var overflowManagerMock = {
  setOverflow: noop,
  restoreOverflow: noop
};
var createBodyOverflowManager = () => {
  if (!m_window_default.hasWindow()) {
    return overflowManagerMock;
  }
  const window3 = m_window_default.getWindow();
  const {
    documentElement
  } = dom_adapter_default.getDocument();
  const body = dom_adapter_default.getBody();
  const isIosDevice = "ios" === devices_default.real().platform;
  const prevSettings = {
    overflow: null,
    overflowX: null,
    overflowY: null,
    paddingRight: null,
    position: null,
    top: null,
    left: null
  };
  return {
    setOverflow: isIosDevice ? () => {
      if (isDefined(prevSettings.position) || "fixed" === body.style.position) {
        return;
      }
      const {
        scrollY,
        scrollX
      } = window3;
      prevSettings.position = body.style.position;
      prevSettings.top = body.style.top;
      prevSettings.left = body.style.left;
      body.style.setProperty("position", "fixed");
      body.style.setProperty("top", -scrollY + "px");
      body.style.setProperty("left", -scrollX + "px");
    } : () => {
      (() => {
        const scrollBarWidth = window3.innerWidth - documentElement.clientWidth;
        if (prevSettings.paddingRight || scrollBarWidth <= 0) {
          return;
        }
        const paddingRight = window3.getComputedStyle(body).getPropertyValue("padding-right");
        const computedBodyPaddingRight = parseInt(paddingRight, 10);
        prevSettings.paddingRight = computedBodyPaddingRight;
        body.style.setProperty("padding-right", `${computedBodyPaddingRight + scrollBarWidth}px`);
      })();
      if (prevSettings.overflow || "hidden" === body.style.overflow) {
        return;
      }
      prevSettings.overflow = body.style.overflow;
      prevSettings.overflowX = body.style.overflowX;
      prevSettings.overflowY = body.style.overflowY;
      body.style.setProperty("overflow", "hidden");
    },
    restoreOverflow: isIosDevice ? () => {
      if (!isDefined(prevSettings.position)) {
        return;
      }
      const scrollY = -parseInt(body.style.top, 10);
      const scrollX = -parseInt(body.style.left, 10);
      ["position", "top", "left"].forEach((property) => {
        if (prevSettings[property]) {
          body.style.setProperty(property, prevSettings[property]);
        } else {
          body.style.removeProperty(property);
        }
      });
      window3.scrollTo(scrollX, scrollY);
      prevSettings.position = null;
    } : () => {
      (() => {
        if (!isDefined(prevSettings.paddingRight)) {
          return;
        }
        if (prevSettings.paddingRight) {
          body.style.setProperty("padding-right", `${prevSettings.paddingRight}px`);
        } else {
          body.style.removeProperty("padding-right");
        }
        prevSettings.paddingRight = null;
      })();
      ["overflow", "overflowX", "overflowY"].forEach((property) => {
        if (!isDefined(prevSettings[property])) {
          return;
        }
        const propertyInKebabCase = property.replace(/(X)|(Y)/, (symbol) => `-${symbol.toLowerCase()}`);
        if (prevSettings[property]) {
          body.style.setProperty(propertyInKebabCase, prevSettings[property]);
        } else {
          body.style.removeProperty(propertyInKebabCase);
        }
        prevSettings[property] = null;
      });
    }
  };
};

// node_modules/devextreme/esm/__internal/ui/popup/popup_position_controller.js
var window = m_window_default.getWindow();
var PopupPositionController = class extends OverlayPositionController {
  constructor(params) {
    super(params);
    const superProperties = this._properties;
    const {
      properties
    } = params;
    const {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    } = properties;
    this._properties = Object.assign({}, superProperties, {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
    this._$dragResizeContainer = void 0;
    this._updateDragResizeContainer();
  }
  get $dragResizeContainer() {
    return this._$dragResizeContainer;
  }
  get outsideDragFactor() {
    if (this._properties.dragOutsideBoundary) {
      return 1;
    }
    return this._properties.outsideDragFactor;
  }
  set outsideDragFactor(outsideDragFactor) {
    this._properties.outsideDragFactor = outsideDragFactor;
  }
  set fullScreen(fullScreen) {
    this._properties.fullScreen = fullScreen;
    if (fullScreen) {
      this._fullScreenEnabled();
    } else {
      this._fullScreenDisabled();
    }
  }
  set dragAndResizeArea(dragAndResizeArea) {
    this._properties.dragAndResizeArea = dragAndResizeArea;
    this._updateDragResizeContainer();
  }
  set dragOutsideBoundary(dragOutsideBoundary) {
    this._properties.dragOutsideBoundary = dragOutsideBoundary;
    this._updateDragResizeContainer();
  }
  updateContainer(container) {
    super.updateContainer(container);
    this._updateDragResizeContainer();
  }
  dragHandled() {
    this.restorePositionOnNextRender(false);
  }
  resizeHandled() {
    this.restorePositionOnNextRender(false);
  }
  positionContent() {
    if (this._properties.fullScreen) {
      if (this._$content) {
        move(this._$content, {
          top: 0,
          left: 0
        });
      }
      this.detectVisualPositionChange();
    } else {
      var _this$_properties$for, _this$_properties;
      null === (_this$_properties$for = (_this$_properties = this._properties).forceApplyBindings) || void 0 === _this$_properties$for || _this$_properties$for.call(_this$_properties);
      super.positionContent();
    }
  }
  clean() {
    this._$dragResizeContainer = void 0;
    super.clean();
  }
  _normalizePosition(position) {
    const normalizedPosition = super._normalizePosition(position);
    if (this._properties.fullScreen) {
      normalizedPosition.of = "window";
    }
    return normalizedPosition;
  }
  _updateDragResizeContainer() {
    this._$dragResizeContainer = this._getDragResizeContainer();
  }
  _getDragResizeContainer() {
    if (this._properties.dragOutsideBoundary) {
      return renderer_default(window);
    }
    if (this._properties.dragAndResizeArea) {
      return renderer_default(this._properties.dragAndResizeArea);
    }
    const isContainerDefined = originalViewPort().get(0) || this._properties.container;
    return isContainerDefined ? this._$markupContainer : renderer_default(window);
  }
  _getVisualContainer() {
    if (this._properties.fullScreen) {
      return renderer_default(window);
    }
    return super._getVisualContainer();
  }
  _fullScreenEnabled() {
    this.restorePositionOnNextRender(false);
  }
  _fullScreenDisabled() {
    this.restorePositionOnNextRender(true);
  }
};

// node_modules/devextreme/esm/__internal/ui/popup/m_popup.js
var window2 = m_window_default.getWindow();
var ALLOWED_TOOLBAR_ITEM_ALIASES = ["cancel", "clear", "done"];
var HEIGHT_STRATEGIES = {
  static: "",
  inherit: "dx-popup-inherit-height",
  flex: "dx-popup-flex-height"
};
var getButtonPlace = (name) => {
  const device = devices_default.current();
  const {
    platform
  } = device;
  let toolbar = "bottom";
  let location = "before";
  if ("ios" === platform) {
    switch (name) {
      case "cancel":
        toolbar = "top";
        break;
      case "clear":
        toolbar = "top";
        location = "after";
        break;
      case "done":
        location = "after";
    }
  } else if ("android" === platform) {
    switch (name) {
      case "cancel":
      case "done":
        location = "after";
    }
  }
  return {
    toolbar,
    location
  };
};
var getLocalizationKey = (itemType) => "done" === itemType.toLowerCase() ? "OK" : camelize(itemType, true);
var getHeightStrategyChangeOffset = (currentHeightStrategyClass, popupVerticalPaddings) => currentHeightStrategyClass === HEIGHT_STRATEGIES.flex ? -popupVerticalPaddings : 0;
var Popup = class extends overlay_default {
  _supportedKeys() {
    return Object.assign({}, super._supportedKeys(), {
      upArrow: (e) => {
        var _this$_drag;
        null === (_this$_drag = this._drag) || void 0 === _this$_drag || _this$_drag.moveUp(e);
      },
      downArrow: (e) => {
        var _this$_drag2;
        null === (_this$_drag2 = this._drag) || void 0 === _this$_drag2 || _this$_drag2.moveDown(e);
      },
      leftArrow: (e) => {
        var _this$_drag3;
        null === (_this$_drag3 = this._drag) || void 0 === _this$_drag3 || _this$_drag3.moveLeft(e);
      },
      rightArrow: (e) => {
        var _this$_drag4;
        null === (_this$_drag4 = this._drag) || void 0 === _this$_drag4 || _this$_drag4.moveRight(e);
      }
    });
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      fullScreen: false,
      title: "",
      showTitle: true,
      titleTemplate: "title",
      onTitleRendered: null,
      dragOutsideBoundary: false,
      dragEnabled: false,
      enableBodyScroll: true,
      outsideDragFactor: 0,
      onResizeStart: null,
      onResize: null,
      onResizeEnd: null,
      resizeEnabled: false,
      toolbarItems: [],
      showCloseButton: false,
      bottomTemplate: "bottom",
      useDefaultToolbarButtons: false,
      useFlatToolbarButtons: false,
      autoResizeEnabled: true
    });
  }
  _defaultOptionsRules() {
    return super._defaultOptionsRules().concat([{
      device: {
        platform: "ios"
      },
      options: {
        animation: this._iosAnimation
      }
    }, {
      device: {
        platform: "android"
      },
      options: {
        animation: this._androidAnimation
      }
    }, {
      device: {
        platform: "generic"
      },
      options: {
        showCloseButton: true
      }
    }, {
      device: (device) => "desktop" === devices_default.real().deviceType && "generic" === device.platform,
      options: {
        dragEnabled: true
      }
    }, {
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }, {
      device: () => isMaterialBased(current()),
      options: {
        useFlatToolbarButtons: true
      }
    }, {
      device: () => isMaterial(current()),
      options: {
        useDefaultToolbarButtons: true,
        showCloseButton: false
      }
    }]);
  }
  _iosAnimation() {
    return {
      show: {
        type: "slide",
        duration: 400,
        from: {
          position: {
            my: "top",
            at: "bottom"
          }
        },
        to: {
          position: {
            my: "center",
            at: "center"
          }
        }
      },
      hide: {
        type: "slide",
        duration: 400,
        from: {
          opacity: 1,
          position: {
            my: "center",
            at: "center"
          }
        },
        to: {
          opacity: 1,
          position: {
            my: "top",
            at: "bottom"
          }
        }
      }
    };
  }
  _androidAnimation() {
    return this.option("fullScreen") ? {
      show: {
        type: "slide",
        duration: 300,
        from: {
          top: "30%",
          opacity: 0
        },
        to: {
          top: 0,
          opacity: 1
        }
      },
      hide: {
        type: "slide",
        duration: 300,
        from: {
          top: 0,
          opacity: 1
        },
        to: {
          top: "30%",
          opacity: 0
        }
      }
    } : {
      show: {
        type: "fade",
        duration: 400,
        from: 0,
        to: 1
      },
      hide: {
        type: "fade",
        duration: 400,
        from: 1,
        to: 0
      }
    };
  }
  _init() {
    var _this$$wrapper, _this$_$content;
    const {
      _wrapperClassExternal: popupWrapperClassExternal
    } = this.option();
    const popupWrapperClasses = popupWrapperClassExternal ? `dx-popup-wrapper ${popupWrapperClassExternal}` : "dx-popup-wrapper";
    super._init();
    this._createBodyOverflowManager();
    this._updateResizeCallbackSkipCondition();
    this.$element().addClass("dx-popup");
    null === (_this$$wrapper = this.$wrapper()) || void 0 === _this$$wrapper || _this$$wrapper.addClass(popupWrapperClasses);
    this._$popupContent = null === (_this$_$content = this._$content) || void 0 === _this$_$content ? void 0 : _this$_$content.wrapInner(renderer_default("<div>").addClass("dx-popup-content")).children().eq(0);
    this._toggleContentScrollClass();
    this.$overlayContent().attr("role", "dialog");
  }
  _render() {
    const isFullscreen = Boolean(this.option("fullScreen"));
    this._toggleFullScreenClass(isFullscreen);
    super._render();
  }
  _createBodyOverflowManager() {
    this._bodyOverflowManager = createBodyOverflowManager();
  }
  _toggleFullScreenClass(value) {
    this.$overlayContent().toggleClass("dx-popup-fullscreen", value).toggleClass("dx-popup-normal", !value);
  }
  _initTemplates() {
    super._initTemplates();
    this._templateManager.addDefaultTemplates({
      title: new EmptyTemplate(),
      bottom: new EmptyTemplate()
    });
  }
  _getActionsList() {
    return super._getActionsList().concat(["onResizeStart", "onResize", "onResizeEnd"]);
  }
  _contentResizeHandler(entry) {
    if (!this._shouldSkipContentResize(entry)) {
      this._renderGeometry({
        shouldOnlyReposition: true
      });
    }
  }
  _isShowAnimationResizing() {
    const animation = this.option("animation");
    return ["to", "from"].some((prop) => {
      var _animation$show;
      const config = null === animation || void 0 === animation || null === (_animation$show = animation.show) || void 0 === _animation$show ? void 0 : _animation$show[prop];
      return isObject(config) && ("width" in config || "height" in config);
    });
  }
  _updateResizeCallbackSkipCondition() {
    const isShowAnimationResizing = this._isShowAnimationResizing();
    this._shouldSkipContentResize = (entry) => isShowAnimationResizing && this._showAnimationProcessing || this._areContentDimensionsRendered(entry);
  }
  _observeContentResize(shouldObserve) {
    var _this$_$content2;
    if (!this.option("useResizeObserver")) {
      return;
    }
    const contentElement = null === (_this$_$content2 = this._$content) || void 0 === _this$_$content2 ? void 0 : _this$_$content2.get(0);
    if (shouldObserve) {
      resize_observer_default.observe(contentElement, (entry) => {
        this._contentResizeHandler(entry);
      });
    } else {
      resize_observer_default.unobserve(contentElement);
    }
  }
  _areContentDimensionsRendered(entry) {
    var _entry$contentBoxSize, _this$_renderedDimens3, _this$_renderedDimens4;
    const contentBox = null === (_entry$contentBoxSize = entry.contentBoxSize) || void 0 === _entry$contentBoxSize ? void 0 : _entry$contentBoxSize[0];
    if (contentBox) {
      var _this$_renderedDimens, _this$_renderedDimens2;
      return parseInt(contentBox.inlineSize, 10) === (null === (_this$_renderedDimens = this._renderedDimensions) || void 0 === _this$_renderedDimens ? void 0 : _this$_renderedDimens.width) && parseInt(contentBox.blockSize, 10) === (null === (_this$_renderedDimens2 = this._renderedDimensions) || void 0 === _this$_renderedDimens2 ? void 0 : _this$_renderedDimens2.height);
    }
    const {
      contentRect
    } = entry;
    return parseInt(contentRect.width, 10) === (null === (_this$_renderedDimens3 = this._renderedDimensions) || void 0 === _this$_renderedDimens3 ? void 0 : _this$_renderedDimens3.width) && parseInt(contentRect.height, 10) === (null === (_this$_renderedDimens4 = this._renderedDimensions) || void 0 === _this$_renderedDimens4 ? void 0 : _this$_renderedDimens4.height);
  }
  _renderContent() {
    super._renderContent();
    this._observeContentResize(true);
  }
  _processContentRendering() {
    this._renderTopToolbar();
    this._renderBottomToolbar();
    this._renderResize();
    super._processContentRendering();
  }
  _getTopToolbarItems() {
    const {
      showTitle,
      title
    } = this.option();
    const {
      ios: isIOS
    } = devices_default.current();
    const items = this._getToolbarItems("top");
    if (showTitle && Boolean(title)) {
      items.unshift({
        location: isIOS ? "center" : "before",
        text: title
      });
    }
    return items;
  }
  _renderTopToolbar() {
    const {
      showTitle
    } = this.option();
    const items = this._getTopToolbarItems();
    const shouldBeShown = showTitle || items.length > 0;
    if (shouldBeShown) {
      var _this$_$topToolbar;
      if (this._$topToolbar) {
        this._updateToolbarOptions("top", {
          items
        });
      } else {
        this._renderTopToolbarImpl();
      }
      null === (_this$_$topToolbar = this._$topToolbar) || void 0 === _this$_$topToolbar || _this$_$topToolbar.toggleClass("dx-has-close-button", this._hasCloseButton());
    } else {
      var _this$_$topToolbar2;
      null === (_this$_$topToolbar2 = this._$topToolbar) || void 0 === _this$_$topToolbar2 || _this$_$topToolbar2.remove();
      this._$topToolbar = void 0;
    }
    this._toggleAriaLabel();
  }
  _renderTopToolbarImpl() {
    var _this$_$topToolbar3;
    null === (_this$_$topToolbar3 = this._$topToolbar) || void 0 === _this$_$topToolbar3 || _this$_$topToolbar3.remove();
    const items = this._getTopToolbarItems();
    const $content = this.$content();
    if (!$content) {
      return;
    }
    const $toolbarContainer = renderer_default("<div>").addClass("dx-popup-title").insertBefore($content);
    this._$topToolbar = this._renderToolbar("titleTemplate", items, $toolbarContainer, {
      onInitialized: (e) => {
        this._topToolbar = e.component;
      }
    });
    this._$topToolbar.addClass("dx-popup-title");
    this._renderDrag();
    this._executeTitleRenderAction(this._$topToolbar);
  }
  _renderBottomToolbar() {
    const items = this._getToolbarItems("bottom");
    if (!items.length) {
      var _this$_$bottomToolbar;
      null === (_this$_$bottomToolbar = this._$bottomToolbar) || void 0 === _this$_$bottomToolbar || _this$_$bottomToolbar.remove();
      this._$bottomToolbar = void 0;
      return;
    }
    if (this._$bottomToolbar) {
      this._updateToolbarOptions("bottom", {
        items
      });
    } else {
      this._renderBottomToolbarImpl();
    }
    this._toggleClasses();
  }
  _renderBottomToolbarImpl() {
    var _this$_$bottomToolbar2;
    null === (_this$_$bottomToolbar2 = this._$bottomToolbar) || void 0 === _this$_$bottomToolbar2 || _this$_$bottomToolbar2.remove();
    const items = this._getToolbarItems("bottom");
    const $content = this.$content();
    if (!$content) {
      return;
    }
    const $toolbarContainer = renderer_default("<div>").addClass("dx-popup-bottom").insertAfter($content);
    this._$bottomToolbar = this._renderToolbar("bottomTemplate", items, $toolbarContainer, {
      compactMode: true,
      onInitialized: (e) => {
        this._bottomToolbar = e.component;
      }
    });
    this._$bottomToolbar.addClass("dx-popup-bottom");
  }
  _triggerToolbarResizeEvent() {
    [this._$topToolbar, this._$bottomToolbar].forEach(($toolbar) => {
      if ($toolbar) {
        triggerResizeEvent($toolbar);
        triggerResizeEvent($toolbar);
      }
    });
  }
  _renderToolbar(optionName, items, $container) {
    let additionalToolbarOptions = arguments.length > 3 && void 0 !== arguments[3] ? arguments[3] : {};
    const template = this._getTemplateByOption(optionName);
    const isEmptyTemplate = template instanceof EmptyTemplate;
    if (isEmptyTemplate) {
      return this._renderByPolymorphicTemplate(items, $container, additionalToolbarOptions);
    }
    return this._renderByTemplate(template, $container);
  }
  _getIntegrationOptions() {
    const {
      integrationOptions
    } = this.option();
    return Object.assign({}, integrationOptions, {
      skipTemplates: ["content", "title"]
    });
  }
  _renderByPolymorphicTemplate(items, $container, additionalToolbarOptions) {
    const {
      disabled,
      rtlEnabled,
      useDefaultToolbarButtons,
      useFlatToolbarButtons
    } = this.option();
    const integrationOptions = this._getIntegrationOptions();
    const toolbarOptions = extend(additionalToolbarOptions, {
      disabled,
      rtlEnabled,
      items,
      useDefaultButtons: useDefaultToolbarButtons,
      useFlatButtons: useFlatToolbarButtons,
      integrationOptions
    });
    const template = this._getTemplate("dx-polymorph-widget");
    template.render({
      container: $container,
      model: {
        widget: this._getToolbarName(),
        options: toolbarOptions
      }
    });
    const $toolbar = $container.children("div");
    $container.replaceWith($toolbar);
    return $toolbar;
  }
  _renderByTemplate(template, $container) {
    const $result = renderer_default(template.render({
      container: getPublicElement($container)
    }));
    const resultInContainer = contains($container.get(0), $result.get(0));
    if (!resultInContainer) {
      $container.append($result);
    }
    return $container;
  }
  _updateToolbarOptions(toolbar, options) {
    const instance = "top" === toolbar ? this._topToolbar : this._bottomToolbar;
    if (!instance) {
      return;
    }
    const integrationOptions = this._getIntegrationOptions();
    instance.option(Object.assign({}, options, {
      integrationOptions
    }));
  }
  _toggleAriaLabel() {
    var _this$_$topToolbar4;
    const {
      title,
      showTitle
    } = this.option();
    const shouldSetAriaLabel = showTitle && Boolean(title);
    const titleId = shouldSetAriaLabel ? new guid_default().toString() : null;
    null === (_this$_$topToolbar4 = this._$topToolbar) || void 0 === _this$_$topToolbar4 || _this$_$topToolbar4.find(".dx-toolbar-label").eq(0).attr("id", titleId);
    this.$overlayContent().attr("aria-labelledby", titleId);
  }
  _animateShowing() {
    this._triggerToolbarResizeEvent();
    super._animateShowing();
  }
  _renderVisibilityAnimate(visible) {
    return super._renderVisibilityAnimate(visible);
  }
  _hide() {
    this._observeContentResize(false);
    return super._hide();
  }
  _executeTitleRenderAction($titleElement) {
    this._getTitleRenderAction()({
      titleElement: getPublicElement($titleElement)
    });
  }
  _getTitleRenderAction() {
    return this._titleRenderAction ?? this._createTitleRenderAction();
  }
  _createTitleRenderAction() {
    this._titleRenderAction = this._createActionByOption("onTitleRendered", {
      element: this.element(),
      excludeValidators: ["disabled", "readOnly"]
    });
    return this._titleRenderAction;
  }
  _getCloseButton() {
    return {
      toolbar: "top",
      location: "after",
      template: this._getCloseButtonRenderer()
    };
  }
  _getCloseButtonRenderer() {
    return (_, __, container) => {
      const $button = renderer_default("<div>").addClass("dx-closebutton");
      this._createComponent($button, button_default, {
        icon: "close",
        onClick: this._createToolbarItemAction(void 0),
        stylingMode: "text",
        integrationOptions: {}
      });
      renderer_default(container).append($button);
    };
  }
  _getToolbarItems(toolbar) {
    const {
      platform: currentPlatform
    } = devices_default.current();
    const {
      toolbarItems
    } = this.option();
    const toolbarsItems = [];
    this._toolbarItemClasses = [];
    let index = 0;
    each(toolbarItems, (_, data) => {
      const isShortcut = isDefined(data.shortcut);
      const item = isShortcut ? getButtonPlace(data.shortcut) : data;
      if (isShortcut && "ios" === currentPlatform && index < 2) {
        item.toolbar = "top";
        index++;
      }
      item.toolbar = data.toolbar || item.toolbar || "top";
      if (item && item.toolbar === toolbar) {
        if (isShortcut) {
          extend(item, {
            location: data.location
          }, this._getToolbarItemByAlias(data));
        }
        const isLTROrder = "generic" === currentPlatform;
        if ("done" === data.shortcut && isLTROrder || "cancel" === data.shortcut && !isLTROrder) {
          toolbarsItems.unshift(item);
        } else {
          toolbarsItems.push(item);
        }
      }
    });
    if ("top" === toolbar && this._hasCloseButton()) {
      toolbarsItems.push(this._getCloseButton());
    }
    return toolbarsItems;
  }
  _hasCloseButton() {
    const {
      showCloseButton,
      showTitle
    } = this.option();
    return showCloseButton && showTitle;
  }
  _getToolbarButtonStylingMode(shortcut) {
    if (isFluent(current())) {
      return "done" === shortcut ? "contained" : "outlined";
    }
    return this.option("useFlatToolbarButtons") ? "text" : "contained";
  }
  _getToolbarButtonType(shortcut) {
    if (isFluent(current()) && "done" === shortcut || this.option("useDefaultToolbarButtons")) {
      return "default";
    }
    return "normal";
  }
  _getToolbarItemByAlias(data) {
    const itemType = data.shortcut;
    if (!ALLOWED_TOOLBAR_ITEM_ALIASES.includes(itemType)) {
      return false;
    }
    const itemConfig = extend({
      text: message_default.format(getLocalizationKey(itemType)),
      onClick: this._createToolbarItemAction(data.onClick),
      integrationOptions: {},
      type: this._getToolbarButtonType(itemType),
      stylingMode: this._getToolbarButtonStylingMode(itemType)
    }, data.options || {});
    const itemClass = `dx-popup-${itemType}`;
    this._toolbarItemClasses.push(itemClass);
    return {
      template: (_, __, container) => {
        const $toolbarItem = renderer_default("<div>").addClass(itemClass).appendTo(container);
        this._createComponent($toolbarItem, button_default, itemConfig);
      }
    };
  }
  _createToolbarItemAction(clickAction) {
    return this._createAction(clickAction, {
      afterExecute(e) {
        e.component.hide();
      }
    });
  }
  _getToolbarName() {
    return "dxToolbarBase";
  }
  _toggleDisabledState(value) {
    var _this$$content;
    super._toggleDisabledState(...arguments);
    null === (_this$$content = this.$content()) || void 0 === _this$$content || _this$$content.toggleClass("dx-state-disabled", Boolean(value));
  }
  _toggleClasses() {
    const aliases = ALLOWED_TOOLBAR_ITEM_ALIASES;
    each(aliases, (_, alias) => {
      var _this$$wrapper2, _this$_$bottomToolbar3;
      const className = `dx-popup-${alias}`;
      const isVisible = this._toolbarItemClasses.includes(className);
      null === (_this$$wrapper2 = this.$wrapper()) || void 0 === _this$$wrapper2 || _this$$wrapper2.toggleClass(`${className}-visible`, isVisible);
      null === (_this$_$bottomToolbar3 = this._$bottomToolbar) || void 0 === _this$_$bottomToolbar3 || _this$_$bottomToolbar3.toggleClass(className, isVisible);
    });
  }
  _toggleFocusClass(isFocused, $element) {
    super._toggleFocusClass(isFocused, $element);
    if (isFocused && !isLastZIndexInStack(this._zIndex)) {
      var _this$_$wrapper, _this$_$content3;
      const zIndex = create(this._zIndexInitValue());
      remove(this._zIndex);
      this._zIndex = zIndex;
      null === (_this$_$wrapper = this._$wrapper) || void 0 === _this$_$wrapper || _this$_$wrapper.css("zIndex", zIndex);
      null === (_this$_$content3 = this._$content) || void 0 === _this$_$content3 || _this$_$content3.css("zIndex", zIndex);
    }
  }
  _toggleContentScrollClass() {
    var _this$$content2;
    const isNativeScrollingEnabled = !this.option("preventScrollEvents");
    null === (_this$$content2 = this.$content()) || void 0 === _this$$content2 || _this$$content2.toggleClass("dx-popup-content-scrollable", isNativeScrollingEnabled);
  }
  _getPositionControllerConfig() {
    const superConfiguration = super._getPositionControllerConfig();
    const {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    } = this.option();
    const properties = Object.assign({}, superConfiguration.properties, {
      fullScreen,
      forceApplyBindings,
      dragOutsideBoundary,
      dragAndResizeArea,
      outsideDragFactor
    });
    const elements = Object.assign({}, superConfiguration.elements);
    const configuration = {
      properties,
      elements
    };
    return configuration;
  }
  _initPositionController() {
    if (this._positionController) {
      return;
    }
    this._positionController = new PopupPositionController(this._getPositionControllerConfig());
  }
  _getDragTarget() {
    return this.topToolbar();
  }
  _renderGeometry() {
    let options = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
    const {
      visible,
      useResizeObserver
    } = this.option();
    const {
      forceStopAnimation,
      shouldOnlyReposition,
      isDimensionChange
    } = options;
    if (visible && m_window_default.hasWindow()) {
      const isAnimated = this._showAnimationProcessing;
      const shouldRepeatAnimation = isAnimated && !forceStopAnimation && useResizeObserver;
      this._isAnimationPaused = shouldRepeatAnimation || void 0;
      this._stopAnimation();
      if (shouldOnlyReposition) {
        this._renderPosition(false);
      } else {
        this._renderGeometryImpl(isDimensionChange);
      }
      if (shouldRepeatAnimation) {
        this._animateShowing();
        this._isAnimationPaused = void 0;
      }
    }
  }
  _cacheDimensions() {
    if (!this.option("useResizeObserver")) {
      return;
    }
    this._renderedDimensions = {
      width: parseInt(getWidth(this._$content), 10),
      height: parseInt(getHeight(this._$content), 10)
    };
  }
  _renderGeometryImpl() {
    let isDimensionChange = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    if (!isDimensionChange) {
      this._resetContentHeight();
    }
    super._renderGeometryImpl();
    this._cacheDimensions();
    this._setContentHeight();
  }
  _resetContentHeight() {
    const height = this._getOptionValue("height");
    if ("auto" === height) {
      var _this$$content3;
      null === (_this$$content3 = this.$content()) || void 0 === _this$$content3 || _this$$content3.css({
        height: "auto",
        maxHeight: "none"
      });
    }
  }
  _renderDrag() {
    var _this$_$content4;
    const $dragTarget = this._getDragTarget();
    const {
      dragEnabled
    } = this.option();
    if (!$dragTarget) {
      return;
    }
    const config = {
      dragEnabled,
      handle: $dragTarget.get(0),
      draggableElement: null === (_this$_$content4 = this._$content) || void 0 === _this$_$content4 ? void 0 : _this$_$content4.get(0),
      positionController: this._positionController
    };
    if (this._drag) {
      this._drag.init(config);
    } else {
      this._drag = new m_popup_drag_default(config);
    }
    this.$overlayContent().toggleClass("dx-popup-draggable", dragEnabled);
  }
  _renderResize() {
    if (!this._$content) {
      return;
    }
    this._resizable = this._createComponent(this._$content, resizable_default2, {
      handles: this.option("resizeEnabled") ? "all" : "none",
      onResizeStart: (e) => {
        var _this$_actions, _this$_actions$onResi;
        this._observeContentResize(false);
        null === (_this$_actions = this._actions) || void 0 === _this$_actions || null === (_this$_actions$onResi = _this$_actions.onResizeStart) || void 0 === _this$_actions$onResi || _this$_actions$onResi.call(_this$_actions, e);
      },
      onResize: (e) => {
        var _this$_actions2, _this$_actions2$onRes;
        this._setContentHeight();
        null === (_this$_actions2 = this._actions) || void 0 === _this$_actions2 || null === (_this$_actions2$onRes = _this$_actions2.onResize) || void 0 === _this$_actions2$onRes || _this$_actions2$onRes.call(_this$_actions2, e);
      },
      onResizeEnd: (e) => {
        this._resizeEndHandler(e);
        this._observeContentResize(true);
      },
      minHeight: 100,
      minWidth: 100,
      area: this._positionController.$dragResizeContainer,
      keepAspectRatio: false
    });
  }
  _resizeEndHandler(e) {
    var _this$_actions3, _this$_actions3$onRes;
    const width = this._resizable.option("width");
    const height = this._resizable.option("height");
    if (width) {
      this._setOptionWithoutOptionChange("width", width);
    }
    if (height) {
      this._setOptionWithoutOptionChange("height", height);
    }
    this._cacheDimensions();
    this._positionController.resizeHandled();
    this._positionController.detectVisualPositionChange(e.event);
    null === (_this$_actions3 = this._actions) || void 0 === _this$_actions3 || null === (_this$_actions3$onRes = _this$_actions3.onResizeEnd) || void 0 === _this$_actions3$onRes || _this$_actions3$onRes.call(_this$_actions3, e);
  }
  _setContentHeight() {
    var _this$$content4;
    const {
      forceApplyBindings
    } = this.option();
    (forceApplyBindings ?? noop)();
    const overlayContent = this.$overlayContent().get(0);
    const currentHeightStrategyClass = this._chooseHeightStrategy(overlayContent);
    null === (_this$$content4 = this.$content()) || void 0 === _this$$content4 || _this$$content4.css(this._getHeightCssStyles(currentHeightStrategyClass, overlayContent));
    this._setHeightClasses(this.$overlayContent(), currentHeightStrategyClass);
  }
  _chooseHeightStrategy(overlayContent) {
    const isAutoWidth = "auto" === overlayContent.style.width || "" === overlayContent.style.width;
    let currentHeightStrategyClass = HEIGHT_STRATEGIES.static;
    if (this._isAutoHeight() && this.option("autoResizeEnabled")) {
      if (isAutoWidth) {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.inherit;
      } else {
        currentHeightStrategyClass = HEIGHT_STRATEGIES.flex;
      }
    }
    return currentHeightStrategyClass;
  }
  _getHeightCssStyles(currentHeightStrategyClass, overlayContent) {
    let cssStyles = {};
    const contentMaxHeight = this._getOptionValue("maxHeight", overlayContent);
    const contentMinHeight = this._getOptionValue("minHeight", overlayContent);
    const popupHeightParts = this._splitPopupHeight();
    const heightStrategyChangeOffset = getHeightStrategyChangeOffset(currentHeightStrategyClass, popupHeightParts.popupVerticalPaddings);
    const toolbarsAndVerticalOffsetsHeight = popupHeightParts.header + popupHeightParts.footer + popupHeightParts.contentVerticalOffsets + popupHeightParts.popupVerticalOffsets + heightStrategyChangeOffset;
    if (currentHeightStrategyClass === HEIGHT_STRATEGIES.static) {
      if (!this._isAutoHeight() || contentMaxHeight || contentMinHeight) {
        const overlayHeight = this.option("fullScreen") ? Math.min(getBoundingRect(overlayContent).height, m_window_default.getWindow().innerHeight) : getBoundingRect(overlayContent).height;
        const contentHeight = overlayHeight - toolbarsAndVerticalOffsetsHeight;
        cssStyles = {
          height: Math.max(0, contentHeight),
          minHeight: "auto",
          maxHeight: "auto"
        };
      }
    } else {
      const container = renderer_default(this._positionController.$visualContainer).get(0);
      const maxHeightValue = addOffsetToMaxHeight(contentMaxHeight, -toolbarsAndVerticalOffsetsHeight, container);
      const minHeightValue = addOffsetToMinHeight(contentMinHeight, -toolbarsAndVerticalOffsetsHeight, container);
      cssStyles = {
        height: "auto",
        minHeight: minHeightValue,
        maxHeight: maxHeightValue
      };
    }
    return cssStyles;
  }
  _setHeightClasses($container, currentClass) {
    let excessClasses = "";
    for (const name in HEIGHT_STRATEGIES) {
      if (HEIGHT_STRATEGIES[name] !== currentClass) {
        excessClasses += ` ${HEIGHT_STRATEGIES[name]}`;
      }
    }
    $container.removeClass(excessClasses).addClass(currentClass);
  }
  _isAutoHeight() {
    return "auto" === this.$overlayContent().get(0).style.height;
  }
  _splitPopupHeight() {
    var _this$$content5, _this$$content6;
    const topToolbar = this.topToolbar();
    const bottomToolbar = this.bottomToolbar();
    return {
      header: getVisibleHeight(null === topToolbar || void 0 === topToolbar ? void 0 : topToolbar.get(0)),
      footer: getVisibleHeight(null === bottomToolbar || void 0 === bottomToolbar ? void 0 : bottomToolbar.get(0)),
      contentVerticalOffsets: getVerticalOffsets(this.$overlayContent().get(0), true),
      popupVerticalOffsets: getVerticalOffsets(null === (_this$$content5 = this.$content()) || void 0 === _this$$content5 ? void 0 : _this$$content5.get(0), true),
      popupVerticalPaddings: getVerticalOffsets(null === (_this$$content6 = this.$content()) || void 0 === _this$$content6 ? void 0 : _this$$content6.get(0), false)
    };
  }
  _isAllWindowCovered() {
    const {
      fullScreen
    } = this.option();
    return super._isAllWindowCovered() || Boolean(fullScreen);
  }
  _renderDimensions() {
    if (this.option("fullScreen")) {
      this.$overlayContent().css({
        width: "100%",
        height: "100%",
        minWidth: "",
        maxWidth: "",
        minHeight: "",
        maxHeight: ""
      });
    } else {
      super._renderDimensions();
    }
    if (m_window_default.hasWindow()) {
      this._renderFullscreenWidthClass();
    }
  }
  _dimensionChanged() {
    this._renderGeometry({
      isDimensionChange: true
    });
  }
  _clean() {
    super._clean();
    this._observeContentResize(false);
  }
  _dispose() {
    super._dispose();
    this._toggleBodyScroll(true);
    this._$topToolbar = null;
    this._$bottomToolbar = null;
    this._$popupContent = null;
  }
  _renderFullscreenWidthClass() {
    const isFullScreen = getOuterWidth(this.$overlayContent()) === getWidth(window2);
    this.$overlayContent().toggleClass("dx-popup-fullscreen-width", isFullScreen);
  }
  _toggleSafariScrolling() {
    if (!this.option("enableBodyScroll")) {
      return;
    }
    super._toggleSafariScrolling();
  }
  _toggleBodyScroll(enabled) {
    if (!this._bodyOverflowManager) {
      return;
    }
    const {
      setOverflow,
      restoreOverflow
    } = this._bodyOverflowManager;
    if (enabled) {
      restoreOverflow();
    } else {
      setOverflow();
    }
  }
  refreshPosition() {
    this._renderPosition();
  }
  _optionChanged(args) {
    var _this$_resizable2;
    const {
      value,
      name
    } = args;
    switch (name) {
      case "rtlEnabled":
      case "disabled": {
        super._optionChanged(args);
        const options = {
          [name]: Boolean(value)
        };
        this._updateToolbarOptions("top", options);
        this._updateToolbarOptions("bottom", options);
        break;
      }
      case "animation":
        this._updateResizeCallbackSkipCondition();
        break;
      case "enableBodyScroll":
        if (this.option("visible")) {
          this._toggleBodyScroll(value);
        }
        break;
      case "showTitle":
      case "title":
        this._renderTopToolbar();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "titleTemplate":
        this._renderTopToolbarImpl();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "bottomTemplate":
        this._renderBottomToolbarImpl();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "container":
        super._optionChanged(args);
        if (this.option("resizeEnabled")) {
          var _this$_resizable;
          null === (_this$_resizable = this._resizable) || void 0 === _this$_resizable || _this$_resizable.option("area", this._positionController.$dragResizeContainer);
        }
        break;
      case "width":
      case "height":
        super._optionChanged(args);
        null === (_this$_resizable2 = this._resizable) || void 0 === _this$_resizable2 || _this$_resizable2.option(name, value);
        break;
      case "onTitleRendered":
        this._createTitleRenderAction();
        break;
      case "toolbarItems":
      case "useDefaultToolbarButtons":
      case "useFlatToolbarButtons":
        this._renderTopToolbar();
        this._renderBottomToolbar();
        this._renderGeometry();
        this._triggerToolbarResizeEvent();
        break;
      case "dragEnabled":
        this._renderDrag();
        break;
      case "dragAndResizeArea":
        this._positionController.dragAndResizeArea = value;
        if (this.option("resizeEnabled")) {
          this._resizable.option("area", this._positionController.$dragResizeContainer);
        }
        this._positionController.positionContent();
        break;
      case "dragOutsideBoundary":
        this._positionController.dragOutsideBoundary = value;
        if (this.option("resizeEnabled")) {
          this._resizable.option("area", this._positionController.$dragResizeContainer);
        }
        break;
      case "outsideDragFactor":
        this._positionController.outsideDragFactor = value;
        break;
      case "resizeEnabled":
        this._renderResize();
        this._renderGeometry();
        break;
      case "autoResizeEnabled":
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "fullScreen":
        this._positionController.fullScreen = value;
        this._toggleFullScreenClass(Boolean(value));
        this._toggleSafariScrolling();
        this._renderGeometry();
        triggerResizeEvent(this.$overlayContent());
        break;
      case "showCloseButton":
        this._renderTopToolbar();
        break;
      case "preventScrollEvents":
        super._optionChanged(args);
        this._toggleContentScrollClass();
        break;
      default:
        super._optionChanged(args);
    }
  }
  bottomToolbar() {
    return this._$bottomToolbar;
  }
  topToolbar() {
    return this._$topToolbar;
  }
  $content() {
    return this._$popupContent;
  }
  content() {
    return getPublicElement(this.$content());
  }
  $overlayContent() {
    return this._$content;
  }
  getFocusableElements() {
    const $wrapper = this.$wrapper();
    if (!$wrapper) {
      return renderer_default();
    }
    return $wrapper.find("[tabindex]").filter((_, item) => item.getAttribute("tabindex") >= 0);
  }
};
component_registrator_default("dxPopup", Popup);
var m_popup_default = Popup;

// node_modules/devextreme/esm/__internal/ui/collection/collection_widget.live_update.js
var PRIVATE_KEY_FIELD = "__dx_key__";
var CollectionWidgetLiveUpdate = class extends collection_widget_async_default {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      repaintChangesOnly: false
    });
  }
  reload() {
  }
  _init() {
    super._init();
    this._refreshItemsCache();
  }
  _findItemElementByKey(key) {
    let result = renderer_default();
    const keyExpr = this.key();
    this.itemElements().each((_, item) => {
      const $item = renderer_default(item);
      const itemData = this._getItemData($item);
      if (keyExpr ? keysEqual(keyExpr, this.keyOf(itemData), key) : this._isItemEquals(itemData, key)) {
        result = $item;
        return false;
      }
      return true;
    });
    return result;
  }
  _dataSourceChangedHandler(newItems, e) {
    if (null !== e && void 0 !== e && e.changes) {
      this._modifyByChanges(e.changes);
    } else {
      super._dataSourceChangedHandler(newItems, e);
      this._refreshItemsCache();
    }
  }
  _isItemEquals(item1, item2) {
    let itemToCompare = item1;
    if (item1 && "object" === typeof item1 && item1.__dx_key__) {
      itemToCompare = item1.data;
    }
    try {
      return JSON.stringify(itemToCompare) === JSON.stringify(item2);
    } catch (e) {
      return itemToCompare === item2;
    }
  }
  _isItemStrictEquals(item1, item2) {
    return this._isItemEquals(item1, item2);
  }
  _shouldAddNewGroup(changes, items) {
    let result = false;
    const {
      grouped
    } = this.option();
    if (grouped) {
      if (!changes.length) {
        result = true;
      }
      each(changes, (i, change) => {
        if ("insert" === change.type) {
          result = true;
          each(items, (_, item) => {
            if (void 0 !== change.data.key && change.data.key === item.key) {
              result = false;
              return false;
            }
            return true;
          });
        }
      });
    }
    return result;
  }
  _partialRefresh() {
    const {
      repaintChangesOnly
    } = this.option();
    if (repaintChangesOnly) {
      const keyOf = (data) => {
        if (data && void 0 !== data.__dx_key__) {
          return data.__dx_key__;
        }
        return this.keyOf(data);
      };
      const result = findChanges({
        oldItems: this._itemsCache,
        newItems: this._editStrategy.itemsGetter(),
        getKey: keyOf,
        isItemEquals: this._isItemStrictEquals.bind(this),
        detectReorders: true
      });
      if (result && this._itemsCache.length && !this._shouldAddNewGroup(result, this._itemsCache)) {
        this._modifyByChanges(result, true);
        this._renderEmptyMessage();
        return true;
      }
      this._refreshItemsCache();
    }
    return false;
  }
  _refreshItemsCache() {
    const {
      repaintChangesOnly
    } = this.option();
    if (repaintChangesOnly) {
      const items = this._editStrategy.itemsGetter();
      try {
        this._itemsCache = extend(true, [], items);
        if (!this.key()) {
          this._itemsCache = this._itemsCache.map((itemCache, index) => ({
            [PRIVATE_KEY_FIELD]: items[index],
            data: itemCache
          }));
        }
      } catch (e) {
        this._itemsCache = extend([], items);
      }
    }
  }
  _updateByChange(keyInfo, items, change, isPartialRefresh) {
    if (isPartialRefresh) {
      this._renderItem(change.index, change.data, null, this._findItemElementByKey(change.key));
    } else {
      const changedItem = items[indexByKey(keyInfo, items, change.key)];
      if (changedItem) {
        update(keyInfo, items, change.key, change.data).done(() => {
          this._renderItem(items.indexOf(changedItem), changedItem, null, this._findItemElementByKey(change.key));
        });
      }
    }
  }
  _insertByChange(keyInfo, items, change, isPartialRefresh) {
    when(isPartialRefresh ?? insert(keyInfo, items, change.data, change.index)).done(() => {
      this._beforeItemElementInserted(change);
      this._renderItem(change.index ?? items.length, change.data);
      this._afterItemElementInserted();
    });
  }
  _updateSelectionAfterRemoveByChange(removeIndex) {
    const {
      selectedIndex,
      selectedItems = []
    } = this.option();
    const index = selectedIndex;
    if (index > removeIndex) {
      this.option("selectedIndex", index - 1);
    } else if (index === removeIndex && 1 === selectedItems.length) {
      this.option("selectedItems", []);
    } else {
      this._normalizeSelectedItems();
    }
  }
  _beforeItemElementInserted(change) {
    const {
      selectedIndex
    } = this.option();
    const index = selectedIndex;
    if (change.index <= index) {
      this.option("selectedIndex", index + 1);
    }
  }
  _afterItemElementInserted() {
    this._renderEmptyMessage();
  }
  _removeByChange(keyInfo, items, change, isPartialRefresh) {
    const index = isPartialRefresh ? change.index : indexByKey(keyInfo, items, change.key);
    const removedItem = isPartialRefresh ? change.oldItem : items[index];
    if (removedItem) {
      const $removedItemElement = this._findItemElementByKey(change.key);
      const deletedActionArgs = this._extendActionArgs($removedItemElement);
      this._waitDeletingPrepare($removedItemElement).done(() => {
        if (isPartialRefresh) {
          this._updateIndicesAfterIndex(index - 1);
          this._afterItemElementDeleted($removedItemElement, deletedActionArgs);
          this._updateSelectionAfterRemoveByChange(index);
        } else {
          this._deleteItemElementByIndex(index);
          this._afterItemElementDeleted($removedItemElement, deletedActionArgs);
        }
      });
    }
  }
  _modifyByChanges(changes, isPartialRefresh) {
    const items = this._editStrategy.itemsGetter();
    const keyInfo = {
      key: this.key.bind(this),
      keyOf: this.keyOf.bind(this)
    };
    const dataController = this._dataController;
    const paginate = dataController.paginate();
    const group = dataController.group();
    let filteredChanges = changes;
    if (paginate || group) {
      filteredChanges = changes.filter((item) => "insert" !== item.type || void 0 !== item.index);
    }
    filteredChanges.forEach((change) => this[`_${change.type}ByChange`](keyInfo, items, change, isPartialRefresh));
    this._renderedItemsCount = items.length;
    this._refreshItemsCache();
    this._fireContentReadyAction();
  }
  _appendItemToContainer($container, $itemFrame, index) {
    const nextSiblingElement = $container.children(this._itemSelector())[index];
    dom_adapter_default.insertElement($container[0], $itemFrame[0], nextSiblingElement);
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case "items": {
        const isItemsUpdated = this._partialRefresh();
        if (!isItemsUpdated) {
          super._optionChanged(args);
        }
        break;
      }
      case "dataSource": {
        const {
          repaintChangesOnly
        } = this.option();
        if (!repaintChangesOnly || !value) {
          this.option("items", []);
        }
        super._optionChanged(args);
        break;
      }
      case "repaintChangesOnly":
        break;
      default:
        super._optionChanged(args);
    }
  }
};
var collection_widget_live_update_default = CollectionWidgetLiveUpdate;

// node_modules/devextreme/esm/__internal/events/m_swipe.js
var SWIPE_START_EVENT = "dxswipestart";
var SWIPE_EVENT = "dxswipe";
var SWIPE_END_EVENT = "dxswipeend";
var HorizontalStrategy = {
  defaultItemSizeFunc() {
    return getWidth(this.getElement());
  },
  getBounds() {
    return [this._maxLeftOffset, this._maxRightOffset];
  },
  calcOffsetRatio(e) {
    const endEventData = eventData(e);
    return (endEventData.x - (this._savedEventData && this._savedEventData.x || 0)) / this._itemSizeFunc().call(this, e);
  },
  isFastSwipe(e) {
    const endEventData = eventData(e);
    return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.x - this._tickData.x) >= endEventData.time - this._tickData.time;
  }
};
var VerticalStrategy = {
  defaultItemSizeFunc() {
    return getHeight(this.getElement());
  },
  getBounds() {
    return [this._maxTopOffset, this._maxBottomOffset];
  },
  calcOffsetRatio(e) {
    const endEventData = eventData(e);
    return (endEventData.y - (this._savedEventData && this._savedEventData.y || 0)) / this._itemSizeFunc().call(this, e);
  },
  isFastSwipe(e) {
    const endEventData = eventData(e);
    return this.FAST_SWIPE_SPEED_LIMIT * Math.abs(endEventData.y - this._tickData.y) >= endEventData.time - this._tickData.time;
  }
};
var STRATEGIES = {
  horizontal: HorizontalStrategy,
  vertical: VerticalStrategy
};
var SwipeEmitter = m_emitter_gesture_default.inherit({
  TICK_INTERVAL: 300,
  FAST_SWIPE_SPEED_LIMIT: 10,
  ctor(element) {
    this.callBase(element);
    this.direction = "horizontal";
    this.elastic = true;
  },
  _getStrategy() {
    return STRATEGIES[this.direction];
  },
  _defaultItemSizeFunc() {
    return this._getStrategy().defaultItemSizeFunc.call(this);
  },
  _itemSizeFunc() {
    return this.itemSizeFunc || this._defaultItemSizeFunc;
  },
  _init(e) {
    this._tickData = eventData(e);
  },
  _start(e) {
    this._savedEventData = eventData(e);
    e = this._fireEvent("dxswipestart", e);
    if (!e.cancel) {
      this._maxLeftOffset = e.maxLeftOffset;
      this._maxRightOffset = e.maxRightOffset;
      this._maxTopOffset = e.maxTopOffset;
      this._maxBottomOffset = e.maxBottomOffset;
    }
  },
  _move(e) {
    const strategy = this._getStrategy();
    const moveEventData = eventData(e);
    let offset = strategy.calcOffsetRatio.call(this, e);
    offset = this._fitOffset(offset, this.elastic);
    if (moveEventData.time - this._tickData.time > this.TICK_INTERVAL) {
      this._tickData = moveEventData;
    }
    this._fireEvent("dxswipe", e, {
      offset
    });
    if (false !== e.cancelable) {
      e.preventDefault();
    }
  },
  _end(e) {
    const strategy = this._getStrategy();
    const offsetRatio = strategy.calcOffsetRatio.call(this, e);
    const isFast = strategy.isFastSwipe.call(this, e);
    let startOffset = offsetRatio;
    let targetOffset = this._calcTargetOffset(offsetRatio, isFast);
    startOffset = this._fitOffset(startOffset, this.elastic);
    targetOffset = this._fitOffset(targetOffset, false);
    this._fireEvent("dxswipeend", e, {
      offset: startOffset,
      targetOffset
    });
  },
  _fitOffset(offset, elastic) {
    const strategy = this._getStrategy();
    const bounds = strategy.getBounds.call(this);
    if (offset < -bounds[0]) {
      return elastic ? (-2 * bounds[0] + offset) / 3 : -bounds[0];
    }
    if (offset > bounds[1]) {
      return elastic ? (2 * bounds[1] + offset) / 3 : bounds[1];
    }
    return offset;
  },
  _calcTargetOffset(offsetRatio, isFast) {
    let result;
    if (isFast) {
      result = Math.ceil(Math.abs(offsetRatio));
      if (offsetRatio < 0) {
        result = -result;
      }
    } else {
      result = Math.round(offsetRatio);
    }
    return result;
  }
});
m_emitter_registrator_default({
  emitter: SwipeEmitter,
  events: ["dxswipestart", "dxswipe", "dxswipeend"]
});

// node_modules/devextreme/esm/__internal/data/data_converter/grouped.js
function getDataSourceOptions(dataSource) {
  if (!isGroupItemsArray(dataSource) || dataSource.some((item) => 2 !== Object.keys(item).length)) {
    return dataSource;
  }
  let hasSimpleItems = false;
  const data = dataSource.reduce((accumulator, item) => {
    var _item$items;
    const items = (null === (_item$items = item.items) || void 0 === _item$items ? void 0 : _item$items.map((value) => {
      let innerItem = value;
      if (!isObject(innerItem)) {
        innerItem = {
          text: innerItem
        };
        hasSimpleItems = true;
      }
      const objectItem = innerItem;
      if (!("key" in objectItem)) {
        objectItem.key = item.key;
      }
      return objectItem;
    })) ?? [];
    return accumulator.concat(items);
  }, []);
  return {
    store: {
      type: "array",
      data
    },
    group: {
      selector: "key",
      keepInitialKeyOrder: true
    },
    searchExpr: hasSimpleItems ? "text" : void 0
  };
}

// node_modules/devextreme/esm/__internal/ui/list/item.js
var ListItem = class extends item_default {
  _renderWatchers() {
    super._renderWatchers();
    this._startWatcher("badge", this._renderBadge.bind(this));
    this._startWatcher("showChevron", this._renderShowChevron.bind(this));
  }
  _renderBadge(badge) {
    this._$element.children(".dx-list-item-badge-container").remove();
    if (!badge) {
      return;
    }
    const $badge = renderer_default("<div>").addClass("dx-list-item-badge-container").append(renderer_default("<div>").addClass("dx-list-item-badge").addClass("dx-badge").text(badge));
    const $chevron = this._$element.children(".dx-list-item-chevron-container").first();
    if ($chevron.length > 0) {
      $badge.insertBefore($chevron);
    } else {
      $badge.appendTo(this._$element);
    }
  }
  _renderShowChevron(showChevron) {
    this._$element.children(".dx-list-item-chevron-container").remove();
    if (!showChevron) {
      return;
    }
    const $chevronContainer = renderer_default("<div>").addClass("dx-list-item-chevron-container");
    const $chevron = renderer_default("<div>").addClass("dx-list-item-chevron");
    $chevronContainer.append($chevron).appendTo(this._$element);
  }
};
var item_default2 = ListItem;

// node_modules/devextreme/esm/__internal/utils/type_conversion.js
function toNumber(attribute) {
  return attribute ? Number(attribute.replace("px", "")) : 0;
}

// node_modules/devextreme/esm/__internal/ui/scroll_view/utils/get_element_style.js
function getElementStyle(el) {
  var _getWindow$getCompute, _getWindow;
  return el && hasWindow() ? null === (_getWindow$getCompute = (_getWindow = getWindow()).getComputedStyle) || void 0 === _getWindow$getCompute ? void 0 : _getWindow$getCompute.call(_getWindow, el) : null;
}
function getElementMargin(element, side) {
  const style = getElementStyle(element);
  return style ? toNumber(style[`margin${titleize(side)}`]) : 0;
}

// node_modules/devextreme/esm/__internal/ui/list/list.base.js
var LIST_SELECT_CHECKBOX = "dx-list-select-checkbox";
var LIST_SELECT_RADIOBUTTON = "dx-list-select-radiobutton";
var _scrollView = null;
function getScrollView() {
  return _scrollView ?? scroll_view_default;
}
var ListBase = class extends collection_widget_live_update_default {
  _feedbackShowTimeout() {
    return 70;
  }
  _supportedKeys() {
    return Object.assign({}, super._supportedKeys(), {
      leftArrow: noop,
      rightArrow: noop,
      pageUp(e) {
        this._moveFocusPerPage(e, "prev");
      },
      pageDown(e) {
        this._moveFocusPerPage(e, "next");
      }
    });
  }
  _moveFocusPerPage(e, direction) {
    if (this._isLastItemFocused(direction)) {
      return;
    }
    e.preventDefault();
    e.stopPropagation();
    let $item = this._getEdgeVisibleItem(direction);
    const {
      focusedElement
    } = this.option();
    const isFocusedItem = $item.is(renderer_default(focusedElement));
    if (isFocusedItem) {
      this.scrollTo(this._getItemLocation($item, direction));
      $item = this._getEdgeVisibleItem(direction);
    }
    this.option("focusedElement", getPublicElement($item));
    this.scrollToItem($item);
  }
  _isLastItemFocused(direction) {
    const lastItemInDirection = "prev" === direction ? this._itemElements().first() : this._itemElements().last();
    const {
      focusedElement
    } = this.option();
    return lastItemInDirection.is(renderer_default(focusedElement));
  }
  _getNextItem($item, direction) {
    const $items = this._getAvailableItems();
    const itemIndex = $items.index($item);
    if ("prev" === direction) {
      return renderer_default($items[itemIndex - 1]);
    }
    return renderer_default($items[itemIndex + 1]);
  }
  _getEdgeVisibleItem(direction) {
    const scrollTop = this.scrollTop();
    const containerHeight = getHeight(this.$element());
    const {
      focusedElement
    } = this.option();
    let $item = renderer_default(focusedElement);
    let isItemVisible = true;
    if (!$item.length) {
      return renderer_default();
    }
    while (isItemVisible) {
      var _$nextItem$position;
      const $nextItem = this._getNextItem($item, direction);
      if (!$nextItem.length) {
        break;
      }
      const nextItemLocation = ((null === (_$nextItem$position = $nextItem.position()) || void 0 === _$nextItem$position ? void 0 : _$nextItem$position.top) ?? 0) + getOuterHeight($nextItem) / 2;
      isItemVisible = nextItemLocation < containerHeight + scrollTop && nextItemLocation > scrollTop;
      if (isItemVisible) {
        $item = $nextItem;
      }
    }
    return $item;
  }
  _getItemLocation($item, direction) {
    if ("prev" === direction) {
      return $item.position().top - getHeight(this.$element()) + getOuterHeight($item);
    }
    return $item.position().top;
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      hoverStateEnabled: true,
      pullRefreshEnabled: false,
      scrollingEnabled: true,
      selectByClick: true,
      showScrollbar: "onScroll",
      useNativeScrolling: true,
      bounceEnabled: true,
      scrollByContent: true,
      scrollByThumb: false,
      pullingDownText: message_default.format("dxList-pullingDownText"),
      pulledDownText: message_default.format("dxList-pulledDownText"),
      refreshingText: message_default.format("dxList-refreshingText"),
      pageLoadingText: message_default.format("dxList-pageLoadingText"),
      onScroll: null,
      onPullRefresh: null,
      onPageLoading: null,
      pageLoadMode: "scrollBottom",
      nextButtonText: message_default.format("dxList-nextButtonText"),
      onItemSwipe: null,
      grouped: false,
      onGroupRendered: null,
      collapsibleGroups: false,
      groupTemplate: "group",
      indicateLoading: true,
      activeStateEnabled: true,
      _itemAttributes: {
        role: "option"
      },
      useInkRipple: false,
      wrapItemText: false,
      _swipeEnabled: true,
      showChevronExpr: (data) => null === data || void 0 === data ? void 0 : data.showChevron,
      badgeExpr: (data) => null === data || void 0 === data ? void 0 : data.badge,
      _onItemsRendered: () => {
      }
    });
  }
  _defaultOptionsRules() {
    const themeName = current();
    return super._defaultOptionsRules().concat(deviceDependentOptions(), [{
      device: () => !m_support_default.nativeScrolling,
      options: {
        useNativeScrolling: false
      }
    }, {
      device: (device) => !m_support_default.nativeScrolling && !devices_default.isSimulator() && "desktop" === devices_default.real().deviceType && "generic" === device.platform,
      options: {
        showScrollbar: "onHover",
        pageLoadMode: "nextButton"
      }
    }, {
      device: () => "desktop" === devices_default.real().deviceType && !devices_default.isSimulator(),
      options: {
        focusStateEnabled: true
      }
    }, {
      device: () => isMaterial(themeName),
      options: {
        useInkRipple: true
      }
    }, {
      device: () => isMaterialBased(themeName),
      options: {
        pullingDownText: "",
        pulledDownText: "",
        refreshingText: "",
        pageLoadingText: ""
      }
    }]);
  }
  _visibilityChanged(visible) {
    if (visible) {
      this._updateLoadingState(true);
    }
  }
  _itemClass() {
    return "dx-list-item";
  }
  _itemDataKey() {
    return "dxListItemData";
  }
  _itemContainer() {
    return this._$container;
  }
  _getItemsContainer() {
    return this._$listContainer;
  }
  _cleanItemContainer() {
    super._cleanItemContainer();
    const listContainer = this._getItemsContainer();
    renderer_default(listContainer).empty();
    listContainer.appendTo(this._$container);
  }
  _saveSelectionChangeEvent(e) {
    this._selectionChangeEventInstance = e;
  }
  _getSelectionChangeEvent() {
    return this._selectionChangeEventInstance;
  }
  _refreshItemElements() {
    const {
      grouped
    } = this.option();
    const $itemsContainer = this._getItemsContainer();
    if (grouped) {
      this._itemElementsCache = $itemsContainer.children(".dx-list-group").children(".dx-list-group-body").children(this._itemSelector());
    } else {
      this._itemElementsCache = $itemsContainer.children(this._itemSelector());
    }
  }
  _getItemAndHeaderElements() {
    const itemSelector = `> .dx-list-group-body > ${this._itemSelector()}`;
    const itemAndHeaderSelector = `${itemSelector}, > .dx-list-group-header`;
    const $listGroup = this._getItemsContainer().children(".dx-list-group");
    return $listGroup.find(itemAndHeaderSelector);
  }
  _getAvailableItems($itemElements) {
    const {
      collapsibleGroups
    } = this.option();
    if (collapsibleGroups) {
      const $elements = this._getItemAndHeaderElements();
      return $elements.filter((_index, element) => {
        if (renderer_default(element).hasClass("dx-list-group-header")) {
          return true;
        }
        return !renderer_default(element).closest(".dx-list-group").hasClass("dx-list-group-collapsed");
      });
    }
    return super._getAvailableItems($itemElements);
  }
  _modifyByChanges(changes, isPartialRefresh) {
    super._modifyByChanges(changes, isPartialRefresh);
    this._refreshItemElements();
    this._updateLoadingState(true);
  }
  reorderItem(itemElement, toItemElement) {
    const promise = super.reorderItem(itemElement, toItemElement);
    return promise.done(() => {
      this._refreshItemElements();
    });
  }
  deleteItem(itemElement) {
    const promise = super.deleteItem(itemElement);
    return promise.done(() => {
      this._refreshItemElements();
    });
  }
  _itemElements() {
    return this._itemElementsCache;
  }
  _itemSelectHandler(e) {
    const {
      selectionMode
    } = this.option();
    const isSingleSelectedItemClicked = "single" === selectionMode && this.isItemSelected(e.currentTarget);
    if (isSingleSelectedItemClicked) {
      return;
    }
    const isSelectionControlClicked = renderer_default(e.target).closest(`.${LIST_SELECT_CHECKBOX}`).length || renderer_default(e.target).closest(`.${LIST_SELECT_RADIOBUTTON}`).length;
    if (isSelectionControlClicked) {
      this.option("focusedElement", getPublicElement(renderer_default(e.currentTarget)));
    }
    return super._itemSelectHandler(e, isSelectionControlClicked);
  }
  _allowDynamicItemsAppend() {
    return true;
  }
  _activeStateUnit() {
    const {
      collapsibleGroups
    } = this.option();
    const selectors = [".dx-list-item", ".dx-list-select-all"];
    if (collapsibleGroups) {
      selectors.push(".dx-list-group-header");
    }
    return selectors.join(",");
  }
  _init() {
    super._init();
    this._dataController.resetDataSourcePageIndex();
    this._$container = this.$element();
    this._$listContainer = renderer_default("<div>").addClass("dx-list-items");
    this._initScrollView();
    this._createGroupRenderAction();
  }
  _scrollBottomMode() {
    const {
      pageLoadMode
    } = this.option();
    return "scrollBottom" === pageLoadMode;
  }
  _nextButtonMode() {
    const {
      pageLoadMode
    } = this.option();
    return "nextButton" === pageLoadMode;
  }
  _dataSourceOptions() {
    const scrollBottom = this._scrollBottomMode();
    const nextButton = this._nextButtonMode();
    return Object.assign({}, super._dataSourceOptions(), {
      paginate: ensureDefined(scrollBottom || nextButton, true)
    });
  }
  _getSpecificDataSourceOption() {
    const {
      grouped
    } = this.option();
    const dataSource = this.option("dataSource");
    if (dataSource && grouped) {
      return getDataSourceOptions(dataSource);
    }
    return dataSource;
  }
  _getGroupContainerByIndex(groupIndex) {
    return this._getItemsContainer().find(".dx-list-group").eq(groupIndex).find(".dx-list-group-body");
  }
  _dataSourceFromUrlLoadMode() {
    return "raw";
  }
  _initScrollView() {
    const {
      height,
      width,
      disabled,
      showScrollbar,
      useNativeScrolling,
      bounceEnabled,
      scrollByContent,
      scrollByThumb,
      pullingDownText,
      pulledDownText,
      refreshingText,
      pageLoadingText,
      scrollingEnabled,
      pullRefreshEnabled
    } = this.option();
    const isPullRefreshEnabled = scrollingEnabled && pullRefreshEnabled;
    const autoPagingEnabled = scrollingEnabled && this._scrollBottomMode() && !!this._dataController.getDataSource();
    this._scrollView = this._createComponent(this.$element(), getScrollView(), {
      height,
      width,
      disabled: disabled || !scrollingEnabled,
      onScroll: (e) => {
        this._scrollHandler(e);
      },
      onPullDown: isPullRefreshEnabled ? this._pullDownHandler.bind(this) : null,
      onReachBottom: autoPagingEnabled ? this._scrollBottomHandler.bind(this) : null,
      showScrollbar,
      useNative: useNativeScrolling,
      bounceEnabled,
      scrollByContent,
      scrollByThumb,
      pullingDownText,
      pulledDownText,
      refreshingText,
      reachBottomText: pageLoadingText,
      useKeyboard: false
    });
    this._$container = renderer_default(this._scrollView.content());
    this._$listContainer.appendTo(this._$container);
    const {
      wrapItemText
    } = this.option();
    this._toggleWrapItemText(wrapItemText);
    this._createScrollViewActions();
  }
  _toggleWrapItemText(value) {
    this._$listContainer.toggleClass("dx-wrap-item-text", value);
  }
  _createScrollViewActions() {
    this._scrollAction = this._createActionByOption("onScroll");
    this._pullRefreshAction = this._createActionByOption("onPullRefresh");
    this._pageLoadingAction = this._createActionByOption("onPageLoading");
  }
  _scrollHandler(e) {
    var _this$_scrollAction;
    null === (_this$_scrollAction = this._scrollAction) || void 0 === _this$_scrollAction || _this$_scrollAction.call(this, e);
  }
  _initTemplates() {
    this._templateManager.addDefaultTemplates({
      group: new BindableTemplate(($container, data) => {
        if (isPlainObject(data)) {
          if (data.key) {
            $container.text(data.key);
          }
        } else {
          $container.text(String(data));
        }
      }, ["key"], this.option("integrationOptions.watchMethod"))
    });
    super._initTemplates();
  }
  _prepareDefaultItemTemplate(data, $container) {
    super._prepareDefaultItemTemplate(data, $container);
    if (data.icon) {
      const $imageContainer = getImageContainer(data.icon);
      if (!$imageContainer) {
        return;
      }
      const $icon = $imageContainer.addClass("dx-list-item-icon");
      const $iconContainer = renderer_default("<div>").addClass("dx-list-item-icon-container");
      $iconContainer.append($icon);
      $container.prepend($iconContainer);
    }
  }
  _getBindableFields() {
    return ["text", "html", "icon"];
  }
  _updateLoadingState(tryLoadMore) {
    const dataController = this._dataController;
    const scrollBottomMode = this._scrollBottomMode();
    const isDataControllerLoading = dataController.isLoading();
    const isLastPage = this._isLastPage();
    const shouldLoadNextPage = scrollBottomMode && Boolean(tryLoadMore) && !isDataControllerLoading && !isLastPage;
    if (this._shouldContinueLoading(shouldLoadNextPage)) {
      this._infiniteDataLoading();
    } else {
      this._scrollView.release(!shouldLoadNextPage && !dataController.isLoading());
      this._toggleNextButton(this._shouldRenderNextButton() && !this._isLastPage());
      this._loadIndicationSuppressed(false);
    }
  }
  _shouldRenderNextButton() {
    return this._nextButtonMode() && this._dataController.isLoaded();
  }
  _isDataSourceFirstLoadCompleted(newValue) {
    if (isDefined(newValue)) {
      this._isFirstLoadCompleted = newValue;
    }
    return this._isFirstLoadCompleted;
  }
  _dataSourceLoadingChangedHandler(isLoading) {
    if (this._loadIndicationSuppressed()) {
      return;
    }
    const {
      indicateLoading
    } = this.option();
    if (isLoading && indicateLoading) {
      this._showLoadingIndicatorTimer = setTimeout(() => {
        const isEmpty = !this._itemElements().length;
        const shouldIndicateLoading = !isEmpty || this._isDataSourceFirstLoadCompleted();
        if (shouldIndicateLoading) {
          var _this$_scrollView;
          null === (_this$_scrollView = this._scrollView) || void 0 === _this$_scrollView || _this$_scrollView.startLoading();
        }
      });
    } else {
      var _this$_scrollView2;
      clearTimeout(this._showLoadingIndicatorTimer);
      null === (_this$_scrollView2 = this._scrollView) || void 0 === _this$_scrollView2 || _this$_scrollView2.finishLoading();
    }
    if (!isLoading) {
      this._isDataSourceFirstLoadCompleted(false);
    }
  }
  _dataSourceChangedHandler(newItems, e) {
    if (!this._shouldAppendItems() && hasWindow()) {
      var _this$_scrollView3;
      null === (_this$_scrollView3 = this._scrollView) || void 0 === _this$_scrollView3 || _this$_scrollView3.scrollTo(0);
    }
    super._dataSourceChangedHandler(newItems, e);
    this._isDataSourceFirstLoadCompleted(true);
  }
  _refreshContent() {
    this._prepareContent();
    this._fireContentReadyAction();
  }
  _hideLoadingIfLoadIndicationOff() {
    const {
      indicateLoading
    } = this.option();
    if (!indicateLoading) {
      this._dataSourceLoadingChangedHandler(false);
    }
  }
  _loadIndicationSuppressed(value) {
    if (arguments.length) {
      this._isLoadIndicationSuppressed = value;
    }
    return this._isLoadIndicationSuppressed;
  }
  _scrollViewIsFull() {
    const scrollView = this._scrollView;
    return !scrollView || getHeight(scrollView.content()) > getHeight(scrollView.container());
  }
  _pullDownHandler() {
    var _this$_pullRefreshAct;
    const pullRefreshArgs = {
      component: this,
      element: this.element()
    };
    null === (_this$_pullRefreshAct = this._pullRefreshAction) || void 0 === _this$_pullRefreshAct || _this$_pullRefreshAct.call(this, pullRefreshArgs);
    const dataController = this._dataController;
    if (dataController.getDataSource() && !dataController.isLoading()) {
      this._clearSelectedItems();
      dataController.pageIndex(0);
      dataController.reload();
    } else {
      this._updateLoadingState();
    }
  }
  _shouldContinueLoading(shouldLoadNextPage) {
    var _this$_scrollView$scr;
    if (!shouldLoadNextPage) {
      return false;
    }
    const $content = this._scrollView.content();
    const $container = this._scrollView.container();
    const contentHeight = getHeight($content);
    const containerHeight = getHeight($container);
    const offsetTop = (null === (_this$_scrollView$scr = this._scrollView.scrollOffset()) || void 0 === _this$_scrollView$scr ? void 0 : _this$_scrollView$scr.top) ?? 0;
    const isBottomReached = contentHeight - containerHeight < offsetTop;
    const isFull = this._scrollViewIsFull();
    return shouldLoadNextPage && !isFull || isBottomReached;
  }
  _infiniteDataLoading() {
    const isElementVisible = this.$element().is(":visible");
    if (isElementVisible) {
      clearTimeout(this._loadNextPageTimer);
      this._loadNextPageTimer = setTimeout(() => {
        this._loadNextPage();
      });
    }
  }
  _scrollBottomHandler(e) {
    var _this$_pageLoadingAct;
    null === (_this$_pageLoadingAct = this._pageLoadingAction) || void 0 === _this$_pageLoadingAct || _this$_pageLoadingAct.call(this, e);
    const dataController = this._dataController;
    if (!dataController.isLoading() && !this._isLastPage()) {
      this._loadNextPage();
    } else {
      this._updateLoadingState();
    }
  }
  _renderItems(items) {
    const {
      grouped
    } = this.option();
    if (grouped) {
      each(items, this._renderGroup.bind(this));
      this._attachGroupCollapseEvent();
      this._renderEmptyMessage();
      if (isMaterial(current())) {
        this.attachGroupHeaderInkRippleEvents();
      }
    } else {
      super._renderItems(items);
    }
    this._refreshItemElements();
    this._updateLoadingState(true);
  }
  _postProcessRenderItems() {
    const {
      _onItemsRendered: onItemsRendered
    } = this.option();
    null === onItemsRendered || void 0 === onItemsRendered || onItemsRendered();
  }
  _attachGroupCollapseEvent() {
    const {
      collapsibleGroups
    } = this.option();
    const eventNameClick = addNamespace(CLICK_EVENT_NAME, this.NAME);
    const $element = this.$element();
    $element.toggleClass("dx-list-collapsible-groups", collapsibleGroups);
    m_events_engine_default.off($element, eventNameClick, ".dx-list-group-header");
    if (collapsibleGroups) {
      m_events_engine_default.on($element, eventNameClick, ".dx-list-group-header", (e) => {
        this._processGroupCollapse(e);
      });
    }
  }
  _processGroupCollapse(e) {
    const action = this._createAction((evt) => {
      var _evt$event;
      const {
        focusStateEnabled
      } = this.option();
      const $group = renderer_default(null === (_evt$event = evt.event) || void 0 === _evt$event ? void 0 : _evt$event.currentTarget).parent();
      this._collapseGroupHandler($group);
      if (focusStateEnabled) {
        const groupHeader = getPublicElement($group.find(".dx-list-group-header"));
        this.option({
          focusedElement: groupHeader
        });
      }
    }, {
      validatingTargetName: "element"
    });
    action({
      event: e
    });
  }
  _enterKeyHandler(e) {
    const {
      collapsibleGroups,
      focusedElement
    } = this.option();
    const isGroupHeader = renderer_default(focusedElement).hasClass("dx-list-group-header");
    if (collapsibleGroups && isGroupHeader) {
      const params = this._getHandlerExtendedParams(e, renderer_default(focusedElement));
      this._processGroupCollapse(params);
      return;
    }
    super._enterKeyHandler(e);
  }
  _collapseGroupHandler($group, toggle) {
    const deferred = Deferred();
    const $groupHeader = $group.children(".dx-list-group-header");
    const collapsed = $group.hasClass("dx-list-group-collapsed");
    this._updateGroupHeaderAriaExpanded($groupHeader, collapsed);
    if (collapsed === toggle) {
      return deferred.resolve();
    }
    const $groupBody = $group.children(".dx-list-group-body");
    const startHeight = getOuterHeight($groupBody);
    let endHeight = 0;
    if (collapsed) {
      setHeight($groupBody, "auto");
      endHeight = getOuterHeight($groupBody);
    }
    $group.toggleClass("dx-list-group-collapsed", toggle);
    const groupBodyElement = $groupBody.get(0);
    if (fx_default.isAnimating(groupBodyElement)) {
      fx_default.stop(groupBodyElement, false);
    }
    fx_default.animate(groupBodyElement, {
      type: "custom",
      from: {
        height: startHeight
      },
      to: {
        height: endHeight
      },
      duration: 200,
      complete: () => {
        this.updateDimensions();
        this._updateLoadingState(true);
        deferred.resolve();
      }
    });
    return deferred.promise();
  }
  _dataSourceLoadErrorHandler() {
    this._forgetNextPageLoading();
    if (this._initialized) {
      this._renderEmptyMessage();
      this._updateLoadingState();
    }
  }
  _initMarkup() {
    this._itemElementsCache = renderer_default();
    this.$element().addClass("dx-list");
    super._initMarkup();
    const {
      useInkRipple
    } = this.option();
    if (useInkRipple) {
      this._renderInkRipple();
    }
    const elementAria = {
      role: "group",
      roledescription: message_default.format("dxList-ariaRoleDescription")
    };
    this.setAria(elementAria, this.$element());
    this.setAria({
      role: "application"
    }, this._focusTarget());
    this._setListAria();
  }
  _isMultiSelectMode() {
    const {
      selectionMode
    } = this.option();
    return "multiple" === selectionMode || "all" === selectionMode;
  }
  _setListAria() {
    const {
      items,
      allowItemDeleting,
      collapsibleGroups
    } = this.option();
    const label = allowItemDeleting ? message_default.format("dxList-listAriaLabel-deletable") : message_default.format("dxList-listAriaLabel");
    const shouldSetAria = (null === items || void 0 === items ? void 0 : items.length) && !collapsibleGroups;
    const listArea = {
      role: shouldSetAria ? "listbox" : void 0,
      label: shouldSetAria ? label : void 0,
      multiselectable: shouldSetAria && this._isMultiSelectMode() ? "true" : void 0
    };
    this.setAria(listArea, this._$listContainer);
  }
  _focusTarget() {
    return this._itemContainer();
  }
  _renderInkRipple() {
    this._inkRipple = render();
  }
  _toggleActiveState($element, value, event) {
    super._toggleActiveState($element, value);
    if (!this._inkRipple) {
      return;
    }
    const config = {
      element: $element,
      event
    };
    if (value) {
      if (isMaterial(current())) {
        this._inkRippleTimer = setTimeout(() => {
          var _this$_inkRipple;
          null === (_this$_inkRipple = this._inkRipple) || void 0 === _this$_inkRipple || _this$_inkRipple.showWave(config);
        }, 35);
      } else {
        this._inkRipple.showWave(config);
      }
    } else {
      clearTimeout(this._inkRippleTimer);
      this._inkRipple.hideWave(config);
    }
  }
  _postprocessRenderItem(args) {
    this._refreshItemElements();
    super._postprocessRenderItem(args);
    const {
      _swipeEnabled
    } = this.option();
    if (_swipeEnabled) {
      this._attachSwipeEvent(renderer_default(args.itemElement));
    }
  }
  _getElementClassToSkipRefreshId() {
    return "dx-list-group-header";
  }
  _attachSwipeEvent($itemElement) {
    const endEventName = addNamespace(SWIPE_END_EVENT, this.NAME);
    m_events_engine_default.on($itemElement, endEventName, (e) => {
      this._itemSwipeEndHandler(e);
    });
  }
  _itemSwipeEndHandler(e) {
    this._itemDXEventHandler(e, "onItemSwipe", {
      direction: e.offset < 0 ? "left" : "right"
    });
  }
  _nextButtonHandler() {
    var _this$_pageLoadingAct2;
    const pageLoadingArgs = {
      component: this,
      element: this.element()
    };
    null === (_this$_pageLoadingAct2 = this._pageLoadingAction) || void 0 === _this$_pageLoadingAct2 || _this$_pageLoadingAct2.call(this, pageLoadingArgs);
    const dataController = this._dataController;
    if (dataController.getDataSource() && !dataController.isLoading()) {
      var _this$_$nextButton;
      this._scrollView.toggleLoading(true);
      null === (_this$_$nextButton = this._$nextButton) || void 0 === _this$_$nextButton || _this$_$nextButton.detach();
      this._loadIndicationSuppressed(true);
      this._loadNextPage();
    }
  }
  _setGroupAria($group, groupHeaderId) {
    const {
      collapsibleGroups
    } = this.option();
    const groupAria = {
      role: collapsibleGroups ? void 0 : "group",
      labelledby: collapsibleGroups ? void 0 : groupHeaderId
    };
    this.setAria(groupAria, $group);
  }
  _updateGroupHeaderAriaExpanded($groupHeader, expanded) {
    this.setAria({
      expanded
    }, $groupHeader);
  }
  _setGroupHeaderAria($groupHeader, listGroupBodyId) {
    const {
      collapsibleGroups
    } = this.option();
    const groupHeaderAria = {
      role: collapsibleGroups ? "button" : void 0,
      expanded: collapsibleGroups ? true : void 0,
      controls: collapsibleGroups ? listGroupBodyId : void 0
    };
    this.setAria(groupHeaderAria, $groupHeader);
  }
  _setGroupBodyAria($groupBody, groupHeaderId) {
    const {
      collapsibleGroups
    } = this.option();
    const groupHeaderAria = {
      role: collapsibleGroups ? "listbox" : void 0,
      labelledby: collapsibleGroups ? groupHeaderId : void 0,
      multiselectable: collapsibleGroups && this._isMultiSelectMode() ? "true" : void 0
    };
    this.setAria(groupHeaderAria, $groupBody);
  }
  _renderGroup(index, group) {
    var _this$_groupRenderAct;
    const $groupElement = renderer_default("<div>").addClass("dx-list-group").appendTo(this._getItemsContainer());
    const groupHeaderId = `dx-${new guid_default().toString()}`;
    const $groupHeaderElement = renderer_default("<div>").addClass("dx-list-group-header").attr("id", groupHeaderId).appendTo($groupElement);
    const {
      groupTemplate: templateName
    } = this.option();
    const groupTemplate = this._getTemplate(group.template ?? templateName, group, index, $groupHeaderElement);
    const renderArgs = {
      index,
      itemData: group,
      container: getPublicElement($groupHeaderElement)
    };
    this._createItemByTemplate(groupTemplate, renderArgs);
    renderer_default("<div>").addClass("dx-list-group-header-indicator").prependTo($groupHeaderElement);
    const groupBodyId = `dx-${new guid_default().toString()}`;
    const $groupBody = renderer_default("<div>").addClass("dx-list-group-body").attr("id", groupBodyId).appendTo($groupElement);
    const groupItemsGetter = compileGetter("items");
    each(groupItemsGetter(group) || [], (itemIndex, item) => {
      this._renderItem({
        group: index,
        item: itemIndex
      }, item, $groupBody);
    });
    null === (_this$_groupRenderAct = this._groupRenderAction) || void 0 === _this$_groupRenderAct || _this$_groupRenderAct.call(this, {
      groupElement: getPublicElement($groupElement),
      groupIndex: index,
      groupData: group
    });
    this._setGroupAria($groupElement, groupHeaderId);
    this._setGroupHeaderAria($groupHeaderElement, groupBodyId);
    this._setGroupBodyAria($groupBody, groupHeaderId);
  }
  downInkRippleHandler(e) {
    this._toggleActiveState(renderer_default(e.currentTarget), true, e);
  }
  upInkRippleHandler(e) {
    this._toggleActiveState(renderer_default(e.currentTarget), false, e);
  }
  attachGroupHeaderInkRippleEvents() {
    const selector = ".dx-list-group-header";
    const $element = this.$element();
    this._downInkRippleHandler = this._downInkRippleHandler ?? this.downInkRippleHandler.bind(this);
    this._upInkRippleHandler = this._upInkRippleHandler ?? this.upInkRippleHandler.bind(this);
    m_events_engine_default.off($element, m_pointer_default.down, selector, this._downInkRippleHandler);
    m_events_engine_default.on($element, m_pointer_default.down, selector, this._downInkRippleHandler);
    m_events_engine_default.off($element, [m_pointer_default.up, m_pointer_default.out].join(" "), selector, this._upInkRippleHandler);
    m_events_engine_default.on($element, [m_pointer_default.up, m_pointer_default.out].join(" "), selector, this._upInkRippleHandler);
  }
  _createGroupRenderAction() {
    this._groupRenderAction = this._createActionByOption("onGroupRendered");
  }
  _clean() {
    clearTimeout(this._inkRippleTimer);
    if (this._$nextButton) {
      this._$nextButton.remove();
      this._$nextButton = null;
    }
    super._clean();
  }
  _dispose() {
    this._isDataSourceFirstLoadCompleted(false);
    clearTimeout(this._holdTimer);
    clearTimeout(this._loadNextPageTimer);
    clearTimeout(this._showLoadingIndicatorTimer);
    super._dispose();
  }
  _toggleDisabledState(value) {
    super._toggleDisabledState(value);
    const {
      scrollingEnabled
    } = this.option();
    this._scrollView.option("disabled", value || !scrollingEnabled);
  }
  _toggleNextButton(value) {
    const dataController = this._dataController;
    const $nextButton = this._getNextButton();
    this.$element().toggleClass("dx-has-next", value);
    if (value && dataController.isLoaded()) {
      $nextButton.appendTo(this._itemContainer());
    }
    if (!value) {
      $nextButton.detach();
    }
  }
  _getNextButton() {
    if (!this._$nextButton) {
      this._$nextButton = this._createNextButton();
    }
    return this._$nextButton;
  }
  _createNextButton() {
    const $result = renderer_default("<div>").addClass("dx-list-next-button");
    const $button = renderer_default("<div>").appendTo($result);
    const {
      nextButtonText
    } = this.option();
    this._createComponent($button, button_default, {
      text: nextButtonText,
      onClick: () => {
        this._nextButtonHandler();
      },
      type: isMaterialBased(current()) ? "default" : void 0,
      integrationOptions: {}
    });
    return $result;
  }
  _moveFocus(location) {
    super._moveFocus(location);
    const {
      focusedElement
    } = this.option();
    if (focusedElement) {
      this.scrollToItem(focusedElement);
    }
  }
  _refresh() {
    if (!hasWindow()) {
      super._refresh();
    } else {
      const scrollTop = this._scrollView.scrollTop();
      super._refresh();
      if (scrollTop) {
        this._scrollView.scrollTo(scrollTop);
      }
    }
  }
  _optionChanged(args) {
    const {
      name,
      value
    } = args;
    switch (name) {
      case "pageLoadMode":
        this._toggleNextButton(!!value);
        this._initScrollView();
        break;
      case "dataSource":
        super._optionChanged(args);
        this._initScrollView();
        this._updateLoadingState(true);
        this._isDataSourceFirstLoadCompleted(false);
        break;
      case "items":
        super._optionChanged(args);
        this._isDataSourceFirstLoadCompleted(false);
        break;
      case "pullingDownText":
      case "pulledDownText":
      case "refreshingText":
      case "pageLoadingText":
      case "showScrollbar":
      case "bounceEnabled":
      case "scrollByContent":
      case "scrollByThumb":
      case "useNativeScrolling":
      case "scrollingEnabled":
      case "pullRefreshEnabled":
        this._initScrollView();
        this._updateLoadingState(true);
        break;
      case "nextButtonText":
      case "onItemSwipe":
      case "useInkRipple":
      case "grouped":
      case "groupTemplate":
      case "collapsibleGroups":
      case "showChevronExpr":
      case "badgeExpr":
        this._invalidate();
        break;
      case "onScroll":
      case "onPullRefresh":
      case "onPageLoading":
        this._createScrollViewActions();
        break;
      case "wrapItemText":
        this._toggleWrapItemText(value);
        break;
      case "onGroupRendered":
        this._createGroupRenderAction();
        break;
      case "width":
      case "height":
        super._optionChanged(args);
        this._scrollView.option(name, value);
        this._scrollView.update();
        break;
      case "indicateLoading":
        this._hideLoadingIfLoadIndicationOff();
        break;
      case "visible":
        super._optionChanged(args);
        this._scrollView.update();
        break;
      case "rtlEnabled":
        this._initScrollView();
        super._optionChanged(args);
        break;
      case "_swipeEnabled":
      case "_onItemsRendered":
      case "selectByClick":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _extendActionArgs($itemElement) {
    const {
      grouped
    } = this.option();
    if (!grouped) {
      return super._extendActionArgs($itemElement);
    }
    const $group = $itemElement.closest(".dx-list-group");
    const $item = $group.find(".dx-list-item");
    return Object.assign({}, super._extendActionArgs($itemElement), {
      itemIndex: {
        group: $group.index(),
        item: $item.index($itemElement)
      }
    });
  }
  expandGroup(groupIndex) {
    const deferred = Deferred();
    const $group = this._getItemsContainer().find(".dx-list-group").eq(groupIndex);
    this._collapseGroupHandler($group, false).done(() => {
      deferred.resolveWith(this);
    });
    return deferred.promise();
  }
  collapseGroup(groupIndex) {
    const deferred = Deferred();
    const $group = this._getItemsContainer().find(".dx-list-group").eq(groupIndex);
    this._collapseGroupHandler($group, true).done(() => {
      deferred.resolveWith(this);
    });
    return deferred;
  }
  updateDimensions() {
    const deferred = Deferred();
    if (this._scrollView) {
      this._scrollView.update().done(() => {
        if (!this._scrollViewIsFull()) {
          this._updateLoadingState(true);
        }
        deferred.resolveWith(this);
      });
    } else {
      deferred.resolveWith(this);
    }
    return deferred.promise();
  }
  reload() {
    super.reload();
    this.scrollTo(0);
    this._pullDownHandler();
  }
  repaint() {
    this.scrollTo(0);
    super.repaint();
  }
  scrollTop() {
    return this._scrollView.scrollOffset().top ?? 0;
  }
  clientHeight() {
    return this._scrollView.clientHeight();
  }
  scrollHeight() {
    return this._scrollView.scrollHeight();
  }
  scrollBy(distance) {
    this._scrollView.scrollBy(distance);
  }
  scrollTo(location) {
    this._scrollView.scrollTo(location);
  }
  scrollToItem(itemElement) {
    if (!isDefined(itemElement)) {
      return;
    }
    const $item = this._editStrategy.getItemElement(itemElement);
    this._scrollView.scrollToElement($item, {
      bottom: getElementMargin(null === $item || void 0 === $item ? void 0 : $item.get(0), "bottom")
    });
  }
  _dimensionChanged() {
    this.updateDimensions();
  }
};
ListBase.ItemClass = item_default2;

export {
  PRIVATE_KEY_FIELD,
  collection_widget_live_update_default,
  TOOLBAR_CLASS,
  toolbar_base_default,
  resizable_default2 as resizable_default,
  m_popup_default,
  getDataSourceOptions,
  SWIPE_START_EVENT,
  SWIPE_EVENT,
  SWIPE_END_EVENT,
  ListBase
};
//# sourceMappingURL=chunk-VTM4WH44.js.map
