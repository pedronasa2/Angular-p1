import {
  resize_observer_default
} from "./chunk-EADW2SLN.js";
import {
  load_indicator_default2 as load_indicator_default
} from "./chunk-UZPV5REL.js";
import {
  button_default,
  validation_engine_default
} from "./chunk-G4HHHCUP.js";
import {
  message_default2 as message_default
} from "./chunk-EMRGXNWD.js";
import {
  current,
  isFluent,
  isMaterial
} from "./chunk-J6BDSVIG.js";
import {
  overlay_default
} from "./chunk-VLTKSH4G.js";
import {
  widget_default
} from "./chunk-GIPB2Z36.js";
import {
  ACTIVE_EVENT_NAME,
  CLICK_EVENT_NAME,
  EVENT_NAME,
  HOVEREND,
  HOVERSTART,
  addNamespace,
  browser_default,
  clipboardText,
  component_registrator_default,
  createEvent,
  focused,
  getDefaultAlignment,
  isCommandKeyPressed,
  m_dom_default,
  m_pointer_default,
  normalizeKeyName
} from "./chunk-4VCY6VPW.js";
import {
  devices_default
} from "./chunk-KTSDTV35.js";
import {
  ui_errors_default
} from "./chunk-V5IPHRES.js";
import {
  data,
  getOuterWidth,
  getWidth,
  renderer_default
} from "./chunk-H2RLU3GL.js";
import {
  m_events_engine_default
} from "./chunk-WDK64ZWV.js";
import {
  Deferred,
  callbacks_default,
  config_default2 as config_default,
  dom_adapter_default,
  each,
  encodeHtml,
  extend,
  getWindow,
  guid_default2 as guid_default,
  hasWindow,
  isDefined,
  isEmpty,
  isFunction
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/__internal/ui/m_validation_message.js
var INVALID_MESSAGE = "dx-invalid-message";
var INVALID_MESSAGE_AUTO = "dx-invalid-message-auto";
var INVALID_MESSAGE_ALWAYS = "dx-invalid-message-always";
var INVALID_MESSAGE_CONTENT = "dx-invalid-message-content";
var ValidationMessage = class extends overlay_default {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      integrationOptions: {},
      templatesRenderAsynchronously: false,
      shading: false,
      width: "auto",
      height: "auto",
      hideOnOutsideClick: false,
      animation: null,
      visible: true,
      propagateOutsideClick: true,
      _checkParentVisibility: false,
      rtlEnabled: false,
      contentTemplate: this._renderInnerHtml,
      maxWidth: "100%",
      container: this.$element(),
      mode: "auto",
      preventScrollEvents: false,
      positionSide: "top",
      offset: {
        h: 0,
        v: 0
      }
    });
  }
  _init() {
    super._init();
    this.updateMaxWidth();
    this._updatePosition();
  }
  _initMarkup() {
    super._initMarkup();
    this._ensureMessageNotEmpty();
    this._updatePositionByTarget();
    this._toggleModeClass();
    this._updateContentId();
  }
  _updatePositionByTarget() {
    const {
      target
    } = this.option();
    this.option("position.of", target);
  }
  _ensureMessageNotEmpty() {
    this._textMarkup = this._getTextMarkup();
    const shouldShowMessage = this.option("visible") && this._textMarkup;
    this._toggleVisibilityClasses(shouldShowMessage);
  }
  _toggleVisibilityClasses(visible) {
    if (visible) {
      var _this$$wrapper;
      this.$element().addClass(INVALID_MESSAGE);
      null === (_this$$wrapper = this.$wrapper()) || void 0 === _this$$wrapper || _this$$wrapper.addClass(INVALID_MESSAGE);
    } else {
      var _this$$wrapper2;
      this.$element().removeClass(INVALID_MESSAGE);
      null === (_this$$wrapper2 = this.$wrapper()) || void 0 === _this$$wrapper2 || _this$$wrapper2.removeClass(INVALID_MESSAGE);
    }
  }
  _updateContentId() {
    var _this$$content;
    const {
      container,
      contentId
    } = this.option();
    const id = contentId ?? renderer_default(container).attr("aria-describedby");
    null === (_this$$content = this.$content()) || void 0 === _this$$content || _this$$content.addClass(INVALID_MESSAGE_CONTENT).attr("id", id);
  }
  _renderInnerHtml(element) {
    const $element = element && renderer_default(element);
    null === $element || void 0 === $element || $element.html(this._textMarkup);
  }
  _getTextMarkup() {
    const validationErrors = this.option("validationErrors") ?? [];
    let validationErrorMessage = "";
    validationErrors.forEach((err) => {
      const separator = validationErrorMessage ? "<br />" : "";
      validationErrorMessage += separator + encodeHtml((null === err || void 0 === err ? void 0 : err.message) ?? "");
    });
    return validationErrorMessage;
  }
  _toggleModeClass() {
    var _this$$wrapper3;
    const {
      mode
    } = this.option();
    null === (_this$$wrapper3 = this.$wrapper()) || void 0 === _this$$wrapper3 || _this$$wrapper3.toggleClass(INVALID_MESSAGE_AUTO, "auto" === mode).toggleClass(INVALID_MESSAGE_ALWAYS, "always" === mode);
  }
  updateMaxWidth() {
    const target = this.option("target");
    const targetWidth = getOuterWidth(target);
    let maxWidth = "100%";
    if (targetWidth) {
      maxWidth = Math.max(targetWidth, 100);
    }
    this.option({
      maxWidth
    });
  }
  _getPositionsArray(positionSide, rtlSide) {
    switch (positionSide) {
      case "top":
        return [`${rtlSide} bottom`, `${rtlSide} top`];
      case "left":
        return ["right", "left"];
      case "right":
        return ["left", "right"];
      default:
        return [`${rtlSide} top`, `${rtlSide} bottom`];
    }
  }
  _updatePosition() {
    const {
      positionSide,
      rtlEnabled,
      offset: componentOffset,
      boundary
    } = this.option();
    const rtlSide = getDefaultAlignment(rtlEnabled);
    const positions = this._getPositionsArray(positionSide, rtlSide);
    const offset = Object.assign({}, componentOffset);
    this.$element().addClass(`dx-invalid-message-${positionSide}`);
    if (rtlEnabled && "left" !== positionSide && "right" !== positionSide) {
      offset.h = -offset.h;
    }
    if ("top" === positionSide) {
      offset.v = -offset.v;
    }
    if ("left" === positionSide) {
      offset.h = -offset.h;
    }
    this.option("position", {
      offset,
      boundary,
      my: positions[0],
      at: positions[1],
      collision: "none flip"
    });
  }
  _optionChanged(args) {
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case "target":
        this._updatePositionByTarget();
        this.updateMaxWidth();
        super._optionChanged(args);
        break;
      case "boundary":
        this.option("position.boundary", value);
        break;
      case "mode":
        this._toggleModeClass();
        break;
      case "rtlEnabled":
      case "offset":
      case "positionSide":
        this.$element().removeClass(`dx-invalid-message-${previousValue}`);
        this._updatePosition();
        break;
      case "container":
        this._updateContentId();
        super._optionChanged(args);
        break;
      case "contentId":
        this._updateContentId();
        break;
      case "validationErrors":
        this._ensureMessageNotEmpty();
        this._renderInnerHtml(this.$content());
        break;
      default:
        super._optionChanged(args);
    }
  }
};
component_registrator_default("dxValidationMessage", ValidationMessage);
var m_validation_message_default = ValidationMessage;

// node_modules/devextreme/esm/ui/validation_message.js
var validation_message_default = m_validation_message_default;

// node_modules/devextreme/esm/__internal/ui/editor/editor.js
var INVALID_MESSAGE_AUTO2 = "dx-invalid-message-auto";
var DX_INVALID_BADGE_CLASS = "dx-show-invalid-badge";
var VALIDATION_TARGET = "dx-validation-target";
var ALLOWED_STYLING_MODES = ["outlined", "filled", "underlined"];
var VALIDATION_MESSAGE_KEYS_MAP = {
  validationMessageMode: "mode",
  validationMessagePosition: "positionSide",
  validationMessageOffset: "offset",
  validationBoundary: "boundary"
};
var Editor = class _Editor extends widget_default {
  static isEditor(instance) {
    return instance instanceof _Editor;
  }
  ctor(element, options) {
    this.showValidationMessageTimeout = void 0;
    this.validationRequest = callbacks_default();
    super.ctor(element, options);
  }
  _createElement(element) {
    super._createElement(element);
    const $element = this.$element();
    if ($element) {
      data($element[0], VALIDATION_TARGET, this);
    }
  }
  _initOptions(options) {
    super._initOptions(options);
    this.option(validation_engine_default.initValidationOptions(options));
  }
  _init() {
    this._initialValue = this.option("value");
    super._init();
    const {
      validationTooltipOptions
    } = this.option();
    this._options.cache("validationTooltipOptions", validationTooltipOptions);
    const $element = this.$element();
    $element.addClass(DX_INVALID_BADGE_CLASS);
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      value: null,
      name: "",
      onValueChanged: null,
      readOnly: false,
      isValid: true,
      validationError: null,
      validationErrors: null,
      validationStatus: "valid",
      validationMessageMode: "auto",
      validationMessagePosition: "bottom",
      validationBoundary: void 0,
      validationMessageOffset: {
        h: 0,
        v: 0
      },
      validationTooltipOptions: {},
      _cached_validationTooltipOptions: {},
      _showValidationMessage: true,
      isDirty: false
    });
  }
  _shouldAttachKeyboardEvents() {
    const {
      readOnly
    } = this.option();
    return !readOnly;
  }
  _attachKeyboardEvents() {
    if (this._shouldAttachKeyboardEvents()) {
      super._attachKeyboardEvents();
    }
  }
  _setOptionsByReference() {
    super._setOptionsByReference();
    extend(this._optionsByReference, {
      validationError: true
    });
  }
  _createValueChangeAction() {
    this._valueChangeAction = this._createActionByOption("onValueChanged", {
      excludeValidators: ["disabled", "readOnly"]
    });
  }
  _suppressValueChangeAction() {
    this._valueChangeActionSuppressed = true;
  }
  _resumeValueChangeAction() {
    this._valueChangeActionSuppressed = false;
  }
  _initMarkup() {
    this._toggleReadOnlyState();
    const {
      name,
      _onMarkupRendered: markupRendered
    } = this.option();
    this._setSubmitElementName(name);
    super._initMarkup();
    this._renderValidationState();
    null === markupRendered || void 0 === markupRendered || markupRendered();
  }
  _raiseValueChangeAction(value, previousValue) {
    if (!this._valueChangeAction) {
      this._createValueChangeAction();
    }
    this._valueChangeAction(this._valueChangeArgs(value, previousValue));
  }
  _valueChangeArgs(value, previousValue) {
    return {
      value,
      previousValue,
      event: this._valueChangeEventInstance
    };
  }
  _saveValueChangeEvent(e) {
    this._valueChangeEventInstance = e;
  }
  _focusInHandler(e) {
    const {
      validationMessageMode
    } = this.option();
    const isValidationMessageShownOnFocus = "auto" === validationMessageMode;
    if (this._canValueBeChangedByClick() && isValidationMessageShownOnFocus) {
      var _this$_validationMess;
      const $validationMessageWrapper = null === (_this$_validationMess = this._validationMessage) || void 0 === _this$_validationMess ? void 0 : _this$_validationMess.$wrapper();
      null === $validationMessageWrapper || void 0 === $validationMessageWrapper || $validationMessageWrapper.removeClass(INVALID_MESSAGE_AUTO2);
      clearTimeout(this.showValidationMessageTimeout);
      this.showValidationMessageTimeout = setTimeout(() => null === $validationMessageWrapper || void 0 === $validationMessageWrapper ? void 0 : $validationMessageWrapper.addClass(INVALID_MESSAGE_AUTO2), 150);
    }
    super._focusInHandler(e);
  }
  _canValueBeChangedByClick() {
    return false;
  }
  _getStylingModePrefix() {
    return "dx-editor-";
  }
  _renderStylingMode() {
    const {
      stylingMode
    } = this.option();
    const prefix = this._getStylingModePrefix();
    const allowedStylingClasses = ALLOWED_STYLING_MODES.map((mode) => prefix + mode);
    allowedStylingClasses.forEach((className) => this.$element().removeClass(className));
    let stylingModeClass = prefix + String(stylingMode);
    if (!allowedStylingClasses.includes(stylingModeClass)) {
      const optionName = "stylingMode";
      const defaultOptionValue = this._getDefaultOptions()[optionName];
      const platformOptionValue = this._convertRulesToOptions(this._defaultOptionsRules())[optionName];
      stylingModeClass = prefix + (platformOptionValue ?? defaultOptionValue);
    }
    this.$element().addClass(stylingModeClass);
  }
  _getValidationErrors() {
    let {
      validationErrors
    } = this.option();
    const {
      validationError
    } = this.option();
    if (!validationErrors && validationError) {
      validationErrors = [validationError];
    }
    return validationErrors;
  }
  _disposeValidationMessage() {
    if (this._$validationMessage) {
      this._$validationMessage.remove();
      this.setAria("describedby", null);
      this._$validationMessage = void 0;
      this._validationMessage = void 0;
    }
  }
  _toggleValidationClasses(isInvalid) {
    this.$element().toggleClass("dx-invalid", isInvalid);
    this.setAria("invalid", isInvalid || void 0);
  }
  _renderValidationState() {
    const {
      validationStatus,
      _showValidationMessage: showValidationMessage
    } = this.option();
    const isValid = this.option("isValid") && "invalid" !== validationStatus;
    const validationErrors = this._getValidationErrors();
    const $element = this.$element();
    this._toggleValidationClasses(!isValid);
    if (!hasWindow() || !showValidationMessage) {
      return;
    }
    this._disposeValidationMessage();
    if (!isValid && validationErrors) {
      const {
        validationMessageMode,
        validationMessageOffset,
        validationBoundary,
        rtlEnabled
      } = this.option();
      this._$validationMessage = renderer_default("<div>").appendTo($element);
      const validationMessageContentId = `dx-${new guid_default()}`;
      this.setAria("describedby", validationMessageContentId);
      this._validationMessage = new validation_message_default(this._$validationMessage, extend({
        validationErrors,
        rtlEnabled,
        target: this._getValidationMessageTarget(),
        visualContainer: $element,
        mode: validationMessageMode,
        positionSide: this._getValidationMessagePosition(),
        offset: validationMessageOffset,
        boundary: validationBoundary,
        contentId: validationMessageContentId
      }, this._options.cache("validationTooltipOptions")));
      this._bindInnerWidgetOptions(this._validationMessage, "validationTooltipOptions");
    }
  }
  _getValidationMessagePosition() {
    const {
      validationMessagePosition
    } = this.option();
    return validationMessagePosition;
  }
  _getValidationMessageTarget() {
    return this.$element();
  }
  _toggleReadOnlyState() {
    const {
      readOnly
    } = this.option();
    this._toggleBackspaceHandler(readOnly);
    this.$element().toggleClass("dx-state-readonly", !!readOnly);
    this._setAriaReadonly(readOnly);
  }
  _setAriaReadonly(readOnly) {
    this.setAria("readonly", readOnly || void 0);
  }
  _toggleBackspaceHandler(isReadOnly) {
    const $eventTarget = this._keyboardEventBindingTarget();
    const eventName = addNamespace("keydown", "editorReadOnly");
    m_events_engine_default.off($eventTarget, eventName);
    if (isReadOnly) {
      m_events_engine_default.on($eventTarget, eventName, (e) => {
        if ("backspace" === normalizeKeyName(e)) {
          e.preventDefault();
        }
      });
    }
  }
  _dispose() {
    const element = this.$element()[0];
    data(element, VALIDATION_TARGET, null);
    clearTimeout(this.showValidationMessageTimeout);
    this._disposeValidationMessage();
    super._dispose();
  }
  _setSubmitElementName(name) {
    const $submitElement = this._getSubmitElement();
    if (!$submitElement) {
      return;
    }
    if (name && name.length > 0) {
      $submitElement.attr("name", name);
    } else {
      $submitElement.removeAttr("name");
    }
  }
  _getSubmitElement() {
    return null;
  }
  _setValidationMessageOption(_ref) {
    var _this$_validationMess2;
    let {
      name,
      value
    } = _ref;
    const optionKey = VALIDATION_MESSAGE_KEYS_MAP[String(name)] ? VALIDATION_MESSAGE_KEYS_MAP[String(name)] : name;
    null === (_this$_validationMess2 = this._validationMessage) || void 0 === _this$_validationMess2 || _this$_validationMess2.option(optionKey, value);
  }
  _hasActiveElement() {
    return false;
  }
  _optionChanged(args) {
    var _this$_validationMess3;
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case "onValueChanged":
        this._createValueChangeAction();
        break;
      case "readOnly":
        this._toggleReadOnlyState();
        this._refreshFocusState();
        break;
      case "value":
        if (value != previousValue) {
          this.option("isDirty", this._initialValue !== value);
          this.validationRequest.fire({
            value,
            editor: this
          });
        }
        if (!this._valueChangeActionSuppressed) {
          this._raiseValueChangeAction(value, previousValue);
          this._saveValueChangeEvent(void 0);
        }
        break;
      case "width":
        super._optionChanged(args);
        null === (_this$_validationMess3 = this._validationMessage) || void 0 === _this$_validationMess3 || _this$_validationMess3.updateMaxWidth();
        break;
      case "name":
        this._setSubmitElementName(value);
        break;
      case "isValid":
      case "validationError":
      case "validationErrors":
      case "validationStatus":
        this.option(validation_engine_default.synchronizeValidationOptions(args, this.option()));
        this._renderValidationState();
        break;
      case "validationBoundary":
      case "validationMessageMode":
      case "validationMessagePosition":
      case "validationMessageOffset":
        this._setValidationMessageOption(args);
        break;
      case "rtlEnabled":
        this._setValidationMessageOption(args);
        super._optionChanged(args);
        break;
      case "validationTooltipOptions":
        this._innerWidgetOptionChanged(this._validationMessage, args);
        break;
      case "_cached_validationTooltipOptions":
      case "_showValidationMessage":
      case "isDirty":
        break;
      default:
        super._optionChanged(args);
    }
  }
  _resetToInitialValue() {
    this.option("value", this._initialValue);
  }
  blur() {
    if (this._hasActiveElement()) {
      m_dom_default.resetActiveElement();
    }
  }
  clear() {
    const defaultOptions = this._getDefaultOptions();
    this.option("value", defaultOptions.value);
  }
  reset() {
    let value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
    if (arguments.length) {
      this._initialValue = value;
    }
    this._resetToInitialValue();
    this.option("isDirty", false);
    this.option("isValid", true);
  }
};
var editor_default = Editor;

// node_modules/devextreme/esm/__internal/ui/text_box/texteditor_button_collection/button.js
var isButtonInstance = (instance) => instance instanceof button_default;
var TextEditorButton = class {
  constructor(name, editor, options) {
    this.instance = null;
    this.$container = null;
    this.$placeMarker = null;
    this.editor = editor;
    this.name = name;
    this.options = options || {};
  }
  _addPlaceMarker($container) {
    this.$placeMarker = renderer_default("<div>").appendTo($container);
  }
  _addToContainer($element) {
    const {
      $placeMarker,
      $container
    } = this;
    if ($placeMarker) {
      $placeMarker.replaceWith($element);
    } else if ($container) {
      $element.appendTo($container);
    }
  }
  _attachEvents(instance, $element) {
    throw new Error("Not implemented");
  }
  _create() {
    throw new Error("Not implemented");
  }
  _isRendered() {
    return !!this.instance;
  }
  _isVisible() {
    const {
      editor,
      options
    } = this;
    return options.visible || !(null !== editor && void 0 !== editor && editor.option("readOnly"));
  }
  _isDisabled() {
    throw new Error("Not implemented");
  }
  _shouldRender() {
    return this._isVisible() && !this._isRendered();
  }
  dispose() {
    var _this$$placeMarker;
    const {
      instance
    } = this;
    if (instance) {
      if (isButtonInstance(instance)) {
        instance.dispose();
        instance.$element().remove();
        instance._$element = null;
      } else {
        instance.remove();
      }
    }
    this.instance = null;
    this.editor = null;
    this.$container = null;
    null === (_this$$placeMarker = this.$placeMarker) || void 0 === _this$$placeMarker || _this$$placeMarker.remove();
    this.$placeMarker = null;
  }
  render() {
    let $container = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this.$container;
    this.$container = $container;
    if (this._isVisible()) {
      const {
        instance,
        $element
      } = this._create() ?? {};
      this.instance = instance;
      this._attachEvents(instance, $element);
    } else if ($container) {
      this._addPlaceMarker($container);
    }
  }
  update() {
    if (this._shouldRender()) {
      this.render();
    }
    return !!this.instance;
  }
};

// node_modules/devextreme/esm/__internal/ui/text_box/text_editor.clear.js
var pointerDown = m_pointer_default.down;
var ClearButton = class extends TextEditorButton {
  _create() {
    const $element = renderer_default("<span>").addClass("dx-clear-button-area").append(renderer_default("<span>").addClass("dx-icon").addClass("dx-icon-clear"));
    this._addToContainer($element);
    this.update(true);
    return {
      instance: $element,
      $element
    };
  }
  _isVisible() {
    const {
      editor
    } = this;
    return !!(null !== editor && void 0 !== editor && editor._isClearButtonVisible());
  }
  _attachEvents(instance, $button) {
    var _this$editor;
    const editorName = (null === (_this$editor = this.editor) || void 0 === _this$editor ? void 0 : _this$editor.NAME) ?? "";
    m_events_engine_default.on($button, addNamespace(pointerDown, editorName), (e) => {
      e.preventDefault();
      if ("mouse" !== e.pointerType) {
        var _this$editor2;
        null === (_this$editor2 = this.editor) || void 0 === _this$editor2 || _this$editor2._clearValueHandler(e);
      }
    });
    m_events_engine_default.on($button, addNamespace(CLICK_EVENT_NAME, editorName), (e) => {
      var _this$editor3;
      return null === (_this$editor3 = this.editor) || void 0 === _this$editor3 ? void 0 : _this$editor3._clearValueHandler(e);
    });
  }
  _legacyRender($editor, isVisible) {
    $editor.toggleClass("dx-show-clear-button", isVisible);
  }
  update() {
    let rendered = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : false;
    if (!rendered) {
      super.update();
    }
    const {
      editor,
      instance
    } = this;
    if (!editor) {
      return false;
    }
    const $editor = editor.$element();
    const isVisible = this._isVisible();
    if (instance) {
      instance.toggleClass("dx-state-invisible", !isVisible);
    }
    this._legacyRender($editor, isVisible);
    return isVisible;
  }
};

// node_modules/devextreme/esm/__internal/ui/text_box/text_editor.label.js
var TextEditorLabel = class {
  constructor(props) {
    this.NAME = "dxLabel";
    this._props = props;
    this._id = `dx-texteditor-label-${new guid_default()}`;
    this._render();
    this._toggleMarkupVisibility();
  }
  _isVisible() {
    return !!this._props.text && "hidden" !== this._props.mode;
  }
  _render() {
    this._$before = renderer_default("<div>").addClass("dx-label-before");
    this._$labelSpan = renderer_default("<span>");
    this._$label = renderer_default("<div>").addClass("dx-label").append(this._$labelSpan);
    this._$after = renderer_default("<div>").addClass("dx-label-after");
    this._$root = renderer_default("<div>").addClass("dx-texteditor-label").attr("id", this._id).append(this._$before).append(this._$label).append(this._$after);
    this._updateMark();
    this._updateText();
    this._updateBeforeWidth();
    this._updateMaxWidth();
  }
  _toggleMarkupVisibility() {
    const visible = this._isVisible();
    this._updateEditorBeforeButtonsClass(visible);
    this._updateEditorLabelClass(visible);
    visible ? this._$root.appendTo(this._props.$editor) : this._$root.detach();
    this._attachEvents();
  }
  _attachEvents() {
    const clickEventName = addNamespace(CLICK_EVENT_NAME, this.NAME);
    const hoverStartEventName = addNamespace(HOVERSTART, this.NAME);
    const activeEventName = addNamespace(ACTIVE_EVENT_NAME, this.NAME);
    m_events_engine_default.off(this._$labelSpan, clickEventName);
    m_events_engine_default.off(this._$labelSpan, hoverStartEventName);
    m_events_engine_default.off(this._$labelSpan, activeEventName);
    if (this._isVisible() && this._isOutsideMode()) {
      m_events_engine_default.on(this._$labelSpan, clickEventName, (e) => {
        var _getWindow;
        const selectedText = null === (_getWindow = getWindow()) || void 0 === _getWindow || null === (_getWindow = _getWindow.getSelection()) || void 0 === _getWindow ? void 0 : _getWindow.toString();
        if ("" === selectedText) {
          this._props.onClickHandler();
          e.preventDefault();
        }
      });
      m_events_engine_default.on(this._$labelSpan, hoverStartEventName, (e) => {
        this._props.onHoverHandler(e);
      });
      m_events_engine_default.on(this._$labelSpan, activeEventName, (e) => {
        this._props.onActiveHandler(e);
      });
    }
  }
  _updateEditorLabelClass(visible) {
    this._props.$editor.removeClass("dx-texteditor-with-floating-label").removeClass("dx-texteditor-label-outside").removeClass("dx-texteditor-with-label");
    if (visible) {
      const labelClass = "floating" === this._props.mode ? "dx-texteditor-with-floating-label" : "dx-texteditor-with-label";
      this._props.$editor.addClass(labelClass);
      if (this._isOutsideMode()) {
        this._props.$editor.addClass("dx-texteditor-label-outside");
      }
    }
  }
  _isOutsideMode() {
    return "outside" === this._props.mode;
  }
  _updateEditorBeforeButtonsClass() {
    let visible = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : this._isVisible();
    this._props.$editor.removeClass("dx-texteditor-with-before-buttons");
    if (visible) {
      const beforeButtonsClass = this._props.containsButtonsBefore ? "dx-texteditor-with-before-buttons" : "";
      this._props.$editor.addClass(beforeButtonsClass);
    }
  }
  _updateMark() {
    this._$labelSpan.attr("data-mark", this._props.mark ?? null);
  }
  _updateText() {
    this._$labelSpan.text(this._props.text ?? "");
  }
  _updateBeforeWidth() {
    if (this._isVisible()) {
      var _this$_$before;
      const width = this._props.beforeWidth ?? this._props.getBeforeWidth();
      null === (_this$_$before = this._$before) || void 0 === _this$_$before || _this$_$before.css({
        width
      });
      this._updateLabelTransform();
    }
  }
  _updateLabelTransform() {
    let offset = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    this._$labelSpan.css("transform", "");
    if (this._isVisible() && this._isOutsideMode()) {
      const sign = this._props.rtlEnabled ? 1 : -1;
      const labelTranslateX = sign * (getWidth(this._$before) + offset);
      this._$labelSpan.css("transform", `translateX(${labelTranslateX}px)`);
    }
  }
  _updateMaxWidth() {
    if (this._isVisible() && !this._isOutsideMode()) {
      const maxWidth = this._props.containerWidth ?? this._props.getContainerWidth();
      this._$label.css({
        maxWidth
      });
    }
  }
  $element() {
    return this._$root;
  }
  isVisible() {
    return this._isVisible();
  }
  getId() {
    if (this._isVisible()) {
      return this._id;
    }
    return;
  }
  updateMode(mode) {
    this._props.mode = mode;
    this._toggleMarkupVisibility();
    this._updateBeforeWidth();
    this._updateMaxWidth();
  }
  updateText(text) {
    this._props.text = text;
    this._updateText();
    this._toggleMarkupVisibility();
    this._updateBeforeWidth();
    this._updateMaxWidth();
  }
  updateMark(mark) {
    this._props.mark = mark;
    this._updateMark();
  }
  updateContainsButtonsBefore(containsButtonsBefore) {
    this._props.containsButtonsBefore = containsButtonsBefore;
    this._updateEditorBeforeButtonsClass();
  }
  updateBeforeWidth(beforeWidth) {
    this._props.beforeWidth = beforeWidth;
    this._updateBeforeWidth();
  }
  updateMaxWidth(containerWidth) {
    this._props.containerWidth = containerWidth;
    this._updateMaxWidth();
  }
};

// node_modules/devextreme/esm/__internal/ui/text_box/texteditor_button_collection/custom.js
var CustomButton = class extends TextEditorButton {
  _attachEvents(instance, $element) {
    m_events_engine_default.on($element, HOVERSTART, () => {
      var _this$editor;
      null === (_this$editor = this.editor) || void 0 === _this$editor || _this$editor.$element().addClass("dx-custom-button-hovered");
    });
    m_events_engine_default.on($element, HOVEREND, () => {
      var _this$editor2;
      null === (_this$editor2 = this.editor) || void 0 === _this$editor2 || _this$editor2.$element().removeClass("dx-custom-button-hovered");
    });
    m_events_engine_default.on($element, CLICK_EVENT_NAME, (e) => {
      e.stopPropagation();
    });
  }
  _create() {
    const {
      editor
    } = this;
    if (!editor) {
      return;
    }
    const $element = renderer_default("<div>");
    this._addToContainer($element);
    const instance = editor._createComponent($element, button_default, Object.assign({}, this.options, {
      ignoreParentReadOnly: true,
      disabled: this._isDisabled(),
      integrationOptions: this._prepareIntegrationOptions(editor)
    }));
    return {
      instance,
      $element
    };
  }
  _prepareIntegrationOptions(editor) {
    return Object.assign({}, editor.option("integrationOptions"), {
      skipTemplates: ["content"]
    });
  }
  update() {
    const isUpdated = super.update();
    if (isButtonInstance(this.instance)) {
      this.instance.option("disabled", this._isDisabled());
    }
    return isUpdated;
  }
  _isVisible() {
    var _this$editor3;
    const {
      visible
    } = (null === (_this$editor3 = this.editor) || void 0 === _this$editor3 ? void 0 : _this$editor3.option()) ?? {};
    return !!visible;
  }
  _isDisabled() {
    var _this$editor4;
    const isDefinedByUser = void 0 !== this.options.disabled;
    if (isDefinedByUser) {
      if (isButtonInstance(this.instance)) {
        return this.instance.option("disabled");
      }
      return this.options.disabled;
    }
    const {
      readOnly
    } = (null === (_this$editor4 = this.editor) || void 0 === _this$editor4 ? void 0 : _this$editor4.option()) ?? {};
    return readOnly;
  }
};

// node_modules/devextreme/esm/__internal/ui/text_box/texteditor_button_collection/index.js
function checkButtonInfo(buttonInfo) {
  (() => {
    if (!buttonInfo || "object" !== typeof buttonInfo || Array.isArray(buttonInfo)) {
      throw ui_errors_default.Error("E1053");
    }
  })();
  (() => {
    if (!("name" in buttonInfo)) {
      throw ui_errors_default.Error("E1054");
    }
  })();
  (() => {
    const {
      name
    } = buttonInfo;
    if ("string" !== typeof name) {
      throw ui_errors_default.Error("E1055");
    }
  })();
  (() => {
    const {
      location
    } = buttonInfo;
    if ("location" in buttonInfo && "after" !== location && "before" !== location) {
      buttonInfo.location = "after";
    }
  })();
}
function checkNamesUniqueness(existingNames, newName) {
  if (existingNames.includes(newName)) {
    throw ui_errors_default.Error("E1055", newName);
  }
  existingNames.push(newName);
}
function isPredefinedButtonName(name, predefinedButtonsInfo) {
  return !!predefinedButtonsInfo.find((info) => info.name === name);
}
var TextEditorButtonCollection = class {
  constructor(editor, defaultButtonsInfo) {
    this.buttons = [];
    this.defaultButtonsInfo = defaultButtonsInfo;
    this.editor = editor;
  }
  _compileButtonInfo(buttons) {
    const names = [];
    return buttons.map((button) => {
      if ("string" === typeof button) {
        const defaultButtonInfo = this.defaultButtonsInfo.find((_ref) => {
          let {
            name: name2
          } = _ref;
          return name2 === button;
        });
        if (!defaultButtonInfo) {
          throw ui_errors_default.Error("E1056", this.editor.NAME, button);
        }
        checkNamesUniqueness(names, button);
        return defaultButtonInfo;
      }
      checkButtonInfo(button);
      const isDefaultButton = isPredefinedButtonName(button.name, this.defaultButtonsInfo);
      if (isDefaultButton) {
        const defaultButtonInfo = this.defaultButtonsInfo.find((_ref2) => {
          let {
            name: name2
          } = _ref2;
          return name2 === button.name;
        });
        if (!defaultButtonInfo) {
          throw ui_errors_default.Error("E1056", this.editor.NAME, button);
        }
        checkNamesUniqueness(names, button);
        return defaultButtonInfo;
      }
      const {
        name = ""
      } = button;
      checkNamesUniqueness(names, name);
      return Object.assign({}, button, {
        Ctor: CustomButton
      });
    });
  }
  _createButton(buttonsInfo) {
    const {
      Ctor,
      options,
      name
    } = buttonsInfo;
    const button = new Ctor(name, this.editor, options ?? {});
    this.buttons.push(button);
    return button;
  }
  _renderButtons(buttons, $container, targetLocation) {
    let $buttonsContainer = null;
    const buttonsInfo = buttons ? this._compileButtonInfo(buttons) : this.defaultButtonsInfo;
    buttonsInfo.forEach((buttonInfo) => {
      const {
        location = "after"
      } = buttonInfo;
      if (location === targetLocation) {
        this._createButton(buttonInfo).render((() => {
          $buttonsContainer = $buttonsContainer ?? renderer_default("<div>").addClass("dx-texteditor-buttons-container");
          if ("before" === targetLocation) {
            $container.prepend($buttonsContainer);
          } else {
            $container.append($buttonsContainer);
          }
          return $buttonsContainer;
        })());
      }
    });
    return $buttonsContainer;
  }
  clean() {
    this.buttons.forEach((button) => button.dispose());
    this.buttons = [];
  }
  getButton(buttonName) {
    const button = this.buttons.find((_ref3) => {
      let {
        name
      } = _ref3;
      return name === buttonName;
    });
    return null === button || void 0 === button ? void 0 : button.instance;
  }
  renderAfterButtons(buttons, $container) {
    return this._renderButtons(buttons, $container, "after");
  }
  renderBeforeButtons(buttons, $container) {
    return this._renderButtons(buttons, $container, "before");
  }
  updateButtons(names) {
    this.buttons.forEach((button) => {
      if (!names || names.includes(button.name)) {
        button.update();
      }
    });
  }
};

// node_modules/devextreme/esm/__internal/ui/text_box/m_text_editor.base.js
var TEXTEDITOR_CLASS = "dx-texteditor";
var TEXTEDITOR_INPUT_CONTAINER_CLASS = "dx-texteditor-input-container";
var TEXTEDITOR_INPUT_CLASS = "dx-texteditor-input";
var EVENTS_LIST = ["KeyDown", "KeyPress", "KeyUp", "Change", "Cut", "Copy", "Paste", "Input"];
var CONTROL_KEYS = ["tab", "enter", "shift", "control", "alt", "escape", "pageUp", "pageDown", "end", "home", "leftArrow", "upArrow", "rightArrow", "downArrow"];
var TextEditorLabelCreator = TextEditorLabel;
var checkButtonsOptionType = (buttons) => {
  if (isDefined(buttons) && !Array.isArray(buttons)) {
    throw ui_errors_default.Error("E1053");
  }
};
var TextEditorBase = class extends editor_default {
  ctor(element, options) {
    if (options) {
      checkButtonsOptionType(options.buttons);
    }
    this._buttonCollection = new TextEditorButtonCollection(this, this._getDefaultButtons());
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    this._labelContainerElement = null;
    super.ctor(element, options);
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      buttons: void 0,
      value: "",
      spellcheck: false,
      showClearButton: false,
      valueChangeEvent: "change",
      placeholder: "",
      inputAttr: {},
      onFocusIn: null,
      onFocusOut: null,
      onKeyDown: null,
      onKeyUp: null,
      onChange: null,
      onInput: null,
      onCut: null,
      onCopy: null,
      onPaste: null,
      onEnterKey: null,
      mode: "text",
      hoverStateEnabled: true,
      focusStateEnabled: true,
      text: void 0,
      stylingMode: config_default().editorStylingMode || "outlined",
      showValidationMark: true,
      label: "",
      labelMode: "static",
      labelMark: "",
      displayValueFormatter: (value) => isDefined(value) && false !== value ? value : ""
    });
  }
  _defaultOptionsRules() {
    const rules = [...super._defaultOptionsRules(), {
      device() {
        const themeName = current();
        return isMaterial(themeName);
      },
      options: {
        labelMode: "floating",
        stylingMode: config_default().editorStylingMode || "filled"
      }
    }, {
      device() {
        const themeName = current();
        return isFluent(themeName);
      },
      options: {
        labelMode: "outside"
      }
    }];
    return rules;
  }
  _getDefaultButtons() {
    return [{
      name: "clear",
      Ctor: ClearButton
    }];
  }
  _isClearButtonVisible() {
    return this.option("showClearButton") && !this.option("readOnly");
  }
  _input() {
    return this.$element().find(".dx-texteditor-input").first();
  }
  _isFocused() {
    return focused(this._input()) || super._isFocused();
  }
  _inputWrapper() {
    return this.$element();
  }
  _buttonsContainer() {
    return this._inputWrapper().find(".dx-texteditor-buttons-container").eq(0);
  }
  _isControlKey(key) {
    return CONTROL_KEYS.includes(key);
  }
  _renderStylingMode() {
    super._renderStylingMode();
    const {
      stylingMode
    } = this.option();
    this._updateButtonsStyling(stylingMode);
  }
  _initMarkup() {
    this.$element().addClass("dx-texteditor");
    this._renderInput();
    this._renderButtonContainers();
    this._renderStylingMode();
    this._renderInputType();
    this._renderPlaceholder();
    this._renderProps();
    super._initMarkup();
    this._renderValue();
    this._renderLabel();
  }
  _render() {
    super._render();
    this._refreshValueChangeEvent();
    this._refreshEvents();
    this._renderEnterKeyAction();
    this._renderEmptinessEvent();
  }
  _renderInput() {
    this._$textEditorContainer = renderer_default("<div>").addClass("dx-texteditor-container").appendTo(this.$element());
    this._$textEditorInputContainer = renderer_default("<div>").addClass("dx-texteditor-input-container").appendTo(this._$textEditorContainer);
    this._$textEditorInputContainer.append(this._createInput());
  }
  _getInputContainer() {
    return this._$textEditorInputContainer;
  }
  _renderPendingIndicator() {
    this.$element().addClass("dx-validation-pending");
    const $inputContainer = this._getInputContainer();
    if (!$inputContainer) {
      return;
    }
    const $indicatorElement = renderer_default("<div>").addClass("dx-pending-indicator").appendTo($inputContainer);
    this._pendingIndicator = this._createComponent($indicatorElement, load_indicator_default, {});
  }
  _disposePendingIndicator() {
    if (!this._pendingIndicator) {
      return;
    }
    this._pendingIndicator.dispose();
    this._pendingIndicator.$element().remove();
    this._pendingIndicator = null;
    this.$element().removeClass("dx-validation-pending");
  }
  _renderValidationState() {
    super._renderValidationState();
    const {
      validationStatus,
      showValidationMark
    } = this.option();
    const isPending = "pending" === validationStatus;
    if (isPending) {
      if (!this._pendingIndicator) {
        this._renderPendingIndicator();
      }
      this._showValidMark = false;
    } else {
      if ("invalid" === validationStatus) {
        this._showValidMark = false;
      }
      if (!this._showValidMark && true === showValidationMark) {
        this._showValidMark = "valid" === validationStatus && !!this._pendingIndicator;
      }
      this._disposePendingIndicator();
    }
    this._toggleValidMark();
  }
  _getButtonsContainer() {
    return this._$textEditorContainer;
  }
  _renderButtonContainers() {
    const {
      buttons
    } = this.option();
    const $buttonsContainer = this._getButtonsContainer();
    if (!$buttonsContainer) {
      return;
    }
    this._$beforeButtonsContainer = this._buttonCollection.renderBeforeButtons(buttons, $buttonsContainer);
    this._$afterButtonsContainer = this._buttonCollection.renderAfterButtons(buttons, $buttonsContainer);
  }
  _cleanButtonContainers() {
    var _this$_$beforeButtons, _this$_$afterButtonsC;
    null === (_this$_$beforeButtons = this._$beforeButtonsContainer) || void 0 === _this$_$beforeButtons || _this$_$beforeButtons.remove();
    null === (_this$_$afterButtonsC = this._$afterButtonsContainer) || void 0 === _this$_$afterButtonsC || _this$_$afterButtonsC.remove();
    this._buttonCollection.clean();
  }
  _clean() {
    this._buttonCollection.clean();
    this._disposePendingIndicator();
    this._unobserveLabelContainerResize();
    super._clean();
    this._$beforeButtonsContainer = null;
    this._$afterButtonsContainer = null;
    this._$textEditorContainer = null;
    this._$textEditorInputContainer = null;
    this._$placeholder = null;
  }
  _createInput() {
    const $input = renderer_default("<input>");
    this._applyInputAttributes($input, this.option("inputAttr"));
    return $input;
  }
  _setSubmitElementName(name) {
    const {
      inputAttr
    } = this.option();
    super._setSubmitElementName(name || (null === inputAttr || void 0 === inputAttr ? void 0 : inputAttr.name) || "");
  }
  _applyInputAttributes($input) {
    let customAttributes = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
    const inputAttributes = extend(this._getDefaultAttributes(), customAttributes);
    $input.attr(inputAttributes);
    $input.addClass("dx-texteditor-input");
    this._setInputMinHeight($input);
  }
  _setInputMinHeight($input) {
    $input.css("minHeight", this.option("height") ? "0" : "");
  }
  _getPlaceholderAttr() {
    const {
      ios: ios2,
      mac: mac2
    } = devices_default.real();
    const {
      placeholder
    } = this.option();
    const value = placeholder || (ios2 || mac2 ? " " : null);
    return value;
  }
  _getDefaultAttributes() {
    const defaultAttributes = {
      autocomplete: "off",
      placeholder: this._getPlaceholderAttr()
    };
    return defaultAttributes;
  }
  _updateButtons(names) {
    this._buttonCollection.updateButtons(names);
  }
  _updateButtonsStyling(editorStylingMode) {
    each(this.option("buttons"), (_, _ref) => {
      let {
        options,
        name: buttonName
      } = _ref;
      if (options && !options.stylingMode && this.option("visible")) {
        const buttonInstance = this.getButton(buttonName);
        if (null !== buttonInstance && void 0 !== buttonInstance && buttonInstance.option) {
          buttonInstance.option("stylingMode", "underlined" === editorStylingMode ? "text" : "contained");
        }
      }
    });
  }
  _renderValue() {
    const renderInputDeferred = this._renderInputValue();
    const renderInputPromise = renderInputDeferred.promise();
    return renderInputPromise;
  }
  _renderInputValue(value) {
    const {
      value: optionValue,
      text,
      displayValue,
      displayValueFormatter
    } = this.option();
    const finalValue = value ?? optionValue;
    let textValue = text;
    if (void 0 !== displayValue && null !== finalValue) {
      textValue = null === displayValueFormatter || void 0 === displayValueFormatter ? void 0 : displayValueFormatter(displayValue);
    } else if (!isDefined(textValue)) {
      textValue = null === displayValueFormatter || void 0 === displayValueFormatter ? void 0 : displayValueFormatter(finalValue);
    }
    this.option({
      text: textValue
    });
    const inputElementValue = this._input().val();
    if (inputElementValue !== (isDefined(textValue) ? textValue : "")) {
      this._renderDisplayText(textValue);
    } else {
      this._toggleEmptinessEventHandler();
    }
    return Deferred().resolve();
  }
  _renderDisplayText(text) {
    this._input().val(text);
    this._toggleEmptinessEventHandler();
  }
  _isValueValid() {
    if (this._input().length) {
      const {
        validity
      } = this._input().get(0);
      if (validity) {
        return Boolean(validity.valid);
      }
    }
    return true;
  }
  _toggleEmptiness(isEmpty2) {
    this.$element().toggleClass("dx-texteditor-empty", isEmpty2);
    this._togglePlaceholder(isEmpty2);
  }
  _togglePlaceholder(isEmpty2) {
    this.$element().find(".dx-placeholder").eq(0).toggleClass("dx-state-invisible", !isEmpty2);
  }
  _renderProps() {
    this._toggleReadOnlyState();
    this._toggleSpellcheckState();
    this._toggleTabIndex();
  }
  _toggleDisabledState(value) {
    super._toggleDisabledState(value);
    const $input = this._input();
    $input.prop("disabled", value);
  }
  _toggleTabIndex() {
    const $input = this._input();
    const {
      disabled,
      focusStateEnabled
    } = this.option();
    if (disabled || !focusStateEnabled) {
      $input.attr("tabIndex", -1);
    } else {
      $input.removeAttr("tabIndex");
    }
  }
  _toggleReadOnlyState() {
    this._input().prop("readOnly", this._readOnlyPropValue());
    super._toggleReadOnlyState();
  }
  _readOnlyPropValue() {
    const {
      readOnly
    } = this.option();
    return !!readOnly;
  }
  _toggleSpellcheckState() {
    const {
      spellcheck
    } = this.option();
    this._input().prop("spellcheck", Boolean(spellcheck));
  }
  _unobserveLabelContainerResize() {
    if (this._labelContainerElement) {
      resize_observer_default.unobserve(this._labelContainerElement);
      this._labelContainerElement = null;
    }
  }
  _getLabelContainer() {
    return this._input();
  }
  _getLabelContainerWidth() {
    return getWidth(this._getLabelContainer());
  }
  _getLabelBeforeWidth() {
    const buttonsBeforeWidth = this._$beforeButtonsContainer && getWidth(this._$beforeButtonsContainer);
    return buttonsBeforeWidth ?? 0;
  }
  _updateLabelWidth() {
    this._label.updateBeforeWidth(this._getLabelBeforeWidth());
    this._label.updateMaxWidth(this._getLabelContainerWidth());
  }
  _getFieldElement() {
    return this._getLabelContainer();
  }
  _setFieldAria(force) {
    var _this$_label;
    const inputAttr = this.option("inputAttr");
    const ariaLabel = null === inputAttr || void 0 === inputAttr ? void 0 : inputAttr["aria-label"];
    const labelId = null === (_this$_label = this._label) || void 0 === _this$_label ? void 0 : _this$_label.getId();
    const value = ariaLabel ? void 0 : labelId;
    if (value || force) {
      const aria = {
        labelledby: value,
        label: ariaLabel
      };
      this.setAria(aria, this._getFieldElement());
    }
  }
  _renderLabel() {
    this._unobserveLabelContainerResize();
    this._labelContainerElement = renderer_default(this._getLabelContainer()).get(0);
    const {
      label,
      labelMode,
      labelMark,
      rtlEnabled
    } = this.option();
    const labelConfig = {
      onClickHandler: () => {
        this.focus();
      },
      onHoverHandler: (e) => {
        e.stopPropagation();
      },
      onActiveHandler: (e) => {
        e.stopPropagation();
      },
      $editor: this.$element(),
      text: label,
      mark: labelMark,
      mode: labelMode,
      rtlEnabled,
      containsButtonsBefore: !!this._$beforeButtonsContainer,
      getContainerWidth: () => this._getLabelContainerWidth(),
      getBeforeWidth: () => this._getLabelBeforeWidth()
    };
    this._label = new TextEditorLabelCreator(labelConfig);
    this._setFieldAria();
    if (this._labelContainerElement) {
      resize_observer_default.observe(this._labelContainerElement, this._updateLabelWidth.bind(this));
    }
  }
  _renderPlaceholder() {
    this._renderPlaceholderMarkup();
    this._attachPlaceholderEvents();
  }
  _renderPlaceholderMarkup() {
    if (this._$placeholder) {
      this._$placeholder.remove();
      this._$placeholder = null;
    }
    const $input = this._input();
    const placeholder = this.option("placeholder");
    const placeholderAttributes = {
      id: placeholder ? `dx-${new guid_default()}` : void 0,
      "data-dx_placeholder": placeholder
    };
    this._$placeholder = renderer_default("<div>").attr(placeholderAttributes);
    this._$placeholder.insertAfter($input);
    this._$placeholder.addClass("dx-placeholder");
  }
  _attachPlaceholderEvents() {
    const startEvent = addNamespace(m_pointer_default.up, this.NAME);
    m_events_engine_default.on(this._$placeholder, startEvent, () => {
      m_events_engine_default.trigger(this._input(), "focus");
    });
    this._toggleEmptinessEventHandler();
  }
  _placeholder() {
    return this._$placeholder ?? renderer_default();
  }
  _clearValueHandler(e) {
    const $input = this._input();
    e.stopPropagation();
    this._saveValueChangeEvent(e);
    this._clearValue();
    if (!this._isFocused()) {
      m_events_engine_default.trigger($input, "focus");
    }
    m_events_engine_default.trigger($input, "input");
  }
  _clearValue() {
    this.clear();
  }
  _renderEvents() {
    const $input = this._input();
    EVENTS_LIST.forEach((event) => {
      const actionName = `on${event}`;
      const hasActionSubscription = this.hasActionSubscription(actionName);
      if (hasActionSubscription) {
        const action = this._createActionByOption(actionName, {
          excludeValidators: ["readOnly"]
        });
        m_events_engine_default.on($input, addNamespace(event.toLowerCase(), this.NAME), (e) => {
          if (this._disposed) {
            return;
          }
          action({
            event: e
          });
        });
      }
    });
  }
  _refreshEvents() {
    const $input = this._input();
    EVENTS_LIST.forEach((event) => {
      m_events_engine_default.off($input, addNamespace(event.toLowerCase(), this.NAME));
    });
    this._renderEvents();
  }
  _keyPressHandler(e) {
    this.option("text", this._input().val());
  }
  _keyDownHandler(e) {
    const $input = this._input();
    const isCtrlEnter = e.ctrlKey && "enter" === normalizeKeyName(e);
    const {
      value
    } = this.option();
    const isNewValue = $input.val() !== value;
    if (isCtrlEnter && isNewValue) {
      m_events_engine_default.trigger($input, "change");
    }
  }
  _getValueChangeEventOptionName() {
    return "valueChangeEvent";
  }
  _renderValueChangeEvent() {
    const valueChangeEventOptionName = this._getValueChangeEventOptionName();
    const {
      [valueChangeEventOptionName]: actionName
    } = this.option();
    const keyPressEvent = addNamespace(this._renderValueEventName(), `${this.NAME}TextChange`);
    const valueChangeEvent = addNamespace(actionName, `${this.NAME}ValueChange`);
    const keyDownEvent = addNamespace("keydown", `${this.NAME}TextChange`);
    const $input = this._input();
    m_events_engine_default.on($input, keyPressEvent, this._keyPressHandler.bind(this));
    m_events_engine_default.on($input, valueChangeEvent, this._valueChangeEventHandler.bind(this));
    m_events_engine_default.on($input, keyDownEvent, this._keyDownHandler.bind(this));
  }
  _cleanValueChangeEvent() {
    const valueChangeNamespace = `.${this.NAME}ValueChange`;
    const textChangeNamespace = `.${this.NAME}TextChange`;
    m_events_engine_default.off(this._input(), valueChangeNamespace);
    m_events_engine_default.off(this._input(), textChangeNamespace);
  }
  _refreshValueChangeEvent() {
    this._cleanValueChangeEvent();
    this._renderValueChangeEvent();
  }
  _renderValueEventName() {
    return "input change keypress";
  }
  _focusTarget() {
    return this._input();
  }
  _focusEventTarget() {
    return this.$element();
  }
  _isInput(element) {
    return element === this._input().get(0);
  }
  _preventNestedFocusEvent(event) {
    if (event.isDefaultPrevented()) {
      return true;
    }
    let shouldPrevent = this._isNestedTarget(event.relatedTarget);
    if ("focusin" === event.type) {
      shouldPrevent = shouldPrevent && this._isNestedTarget(event.target) && !this._isInput(event.target);
    } else if (!shouldPrevent) {
      this._toggleFocusClass(false, this.$element());
    }
    if (shouldPrevent) {
      event.preventDefault();
    }
    return shouldPrevent;
  }
  _isNestedTarget(target) {
    return !!this.$element().find(target).length;
  }
  _focusClassTarget($element) {
    return this.$element();
  }
  _focusInHandler(event) {
    this._preventNestedFocusEvent(event);
    super._focusInHandler(event);
  }
  _focusOutHandler(event) {
    this._preventNestedFocusEvent(event);
    super._focusOutHandler(event);
  }
  _toggleFocusClass(isFocused, $element) {
    super._toggleFocusClass(isFocused, this._focusClassTarget($element));
  }
  _hasFocusClass(element) {
    return super._hasFocusClass(renderer_default(element || this.$element()));
  }
  _renderEmptinessEvent() {
    const $input = this._input();
    m_events_engine_default.on($input, "input blur", this._toggleEmptinessEventHandler.bind(this));
  }
  _toggleEmptinessEventHandler() {
    const text = this._input().val();
    const isEmpty2 = ("" === text || null === text) && this._isValueValid();
    this._toggleEmptiness(isEmpty2);
  }
  _valueChangeEventHandler(e, formattedValue) {
    if (this.option("readOnly")) {
      return;
    }
    this._saveValueChangeEvent(e);
    this.option("value", arguments.length > 1 ? formattedValue : this._input().val());
    this._saveValueChangeEvent(void 0);
  }
  _renderEnterKeyAction() {
    this._enterKeyAction = this._createActionByOption("onEnterKey", {
      excludeValidators: ["readOnly"]
    });
    m_events_engine_default.off(this._input(), "keyup.onEnterKey.dxTextEditor");
    m_events_engine_default.on(this._input(), "keyup.onEnterKey.dxTextEditor", this._enterKeyHandlerUp.bind(this));
  }
  _enterKeyHandlerUp(e) {
    if (this._disposed) {
      return;
    }
    if ("enter" === normalizeKeyName(e)) {
      var _this$_enterKeyAction;
      null === (_this$_enterKeyAction = this._enterKeyAction) || void 0 === _this$_enterKeyAction || _this$_enterKeyAction.call(this, {
        event: e
      });
    }
  }
  _updateValue() {
    this._options.silent("text", null);
    this._renderValue();
  }
  _dispose() {
    this._enterKeyAction = void 0;
    super._dispose();
  }
  _getSubmitElement() {
    return this._input();
  }
  _hasActiveElement() {
    const input = this._input()[0];
    const activeElement = dom_adapter_default.getActiveElement(input);
    return this._input().is(activeElement);
  }
  _optionChanged(args) {
    const {
      name,
      fullName,
      value
    } = args;
    const eventName = name.replace("on", "");
    if (EVENTS_LIST.includes(eventName)) {
      this._refreshEvents();
      return;
    }
    switch (name) {
      case "valueChangeEvent":
        this._refreshValueChangeEvent();
        this._refreshFocusEvent();
        this._refreshEvents();
        break;
      case "onValueChanged":
        this._createValueChangeAction();
        break;
      case "focusStateEnabled":
        super._optionChanged(args);
        this._toggleTabIndex();
        break;
      case "spellcheck":
        this._toggleSpellcheckState();
        break;
      case "mode":
        this._renderInputType();
        break;
      case "onEnterKey":
        this._renderEnterKeyAction();
        break;
      case "placeholder":
        this._renderPlaceholder();
        this._setFieldAria(true);
        this._input().attr({
          placeholder: this._getPlaceholderAttr()
        });
        break;
      case "label":
        this._label.updateText(value ?? "");
        this._setFieldAria(true);
        break;
      case "labelMark":
        this._label.updateMark(value ?? "");
        break;
      case "labelMode":
        this._label.updateMode(value);
        this._setFieldAria();
        break;
      case "width":
        super._optionChanged(args);
        this._label.updateMaxWidth(this._getLabelContainerWidth());
        break;
      case "readOnly":
      case "disabled":
        this._updateButtons();
        super._optionChanged(args);
        break;
      case "showClearButton":
        this._updateButtons(["clear"]);
        break;
      case "text":
      case "showValidationMark":
        break;
      case "value":
        this._updateValue();
        super._optionChanged(args);
        break;
      case "inputAttr":
        this._applyInputAttributes(this._input(), this.option(name));
        break;
      case "stylingMode":
        this._renderStylingMode();
        this._updateLabelWidth();
        break;
      case "buttons": {
        if (fullName === name) {
          checkButtonsOptionType(value);
        }
        this._cleanButtonContainers();
        this._renderButtonContainers();
        const {
          stylingMode
        } = this.option();
        this._updateButtonsStyling(stylingMode);
        this._updateLabelWidth();
        this._label.updateContainsButtonsBefore(!!this._$beforeButtonsContainer);
        break;
      }
      case "visible":
        super._optionChanged(args);
        if (value && this.option("buttons")) {
          this._cleanButtonContainers();
          this._renderButtonContainers();
          const {
            stylingMode
          } = this.option();
          this._updateButtonsStyling(stylingMode);
        }
        break;
      case "displayValueFormatter":
        this._invalidate();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _renderInputType() {
    const {
      mode
    } = this.option();
    this._setInputType(mode);
  }
  _setInputType(type) {
    const input = this._input();
    const typeValue = "search" === type ? "text" : type;
    try {
      input.prop("type", typeValue ?? "text");
    } catch (e) {
      input.prop("type", "text");
    }
  }
  getButton(name) {
    return this._buttonCollection.getButton(name);
  }
  focus() {
    m_events_engine_default.trigger(this._input(), "focus");
  }
  clear() {
    if (this._showValidMark) {
      this._showValidMark = false;
      this._renderValidationState();
    }
    const defaultOptions = this._getDefaultOptions();
    if (this.option("value") === defaultOptions.value) {
      this._options.silent("text", "");
      this._renderValue();
    } else {
      this.option("value", defaultOptions.value);
    }
  }
  _resetInputText() {
    this._options.silent("text", this._initialValue);
    this._renderValue();
  }
  _isValueEqualToInitial() {
    const {
      value
    } = this.option();
    const initialValue = this._initialValue;
    return value === initialValue;
  }
  _resetToInitialValue() {
    const shouldResetInputText = this._isValueEqualToInitial();
    if (shouldResetInputText) {
      this._resetInputText();
    } else {
      super._resetToInitialValue();
    }
    this._disposePendingIndicator();
    this._showValidMark = false;
    this._toggleValidMark();
  }
  _toggleValidMark() {
    this.$element().toggleClass("dx-valid", !!this._showValidMark);
  }
  reset() {
    let value = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
    if (arguments.length) {
      super.reset(value);
    } else {
      super.reset();
    }
  }
  on(eventName, eventHandler) {
    const result = super.on(eventName, eventHandler);
    if ("string" === typeof eventName) {
      const event = eventName.charAt(0).toUpperCase() + eventName.substr(1);
      if (EVENTS_LIST.includes(event)) {
        this._refreshEvents();
      }
    }
    return result;
  }
};
var m_text_editor_base_default = TextEditorBase;

// node_modules/devextreme/esm/__internal/ui/text_box/text_editor.mask.rule.js
var BaseMaskRule = class {
  constructor(config) {
    this._value = " ";
    extend(this, config);
  }
  next(rule) {
    if (!arguments.length) {
      return this._next;
    }
    this._next = rule;
    return;
  }
  _prepareHandlingArgs(args, config) {
    const configuration = config ?? {};
    const handlingProperty = Object.prototype.hasOwnProperty.call(args, "value") ? "value" : "text";
    const finalConfig = Object.assign({}, args, {
      start: configuration.start ?? args.start,
      length: configuration.length ?? args.length,
      index: (args.index ?? 0) + 1
    });
    finalConfig[handlingProperty] = configuration.str ?? args[handlingProperty];
    return finalConfig;
  }
  first() {
    let index = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    const newIndex = index + 1;
    return this.next().first(newIndex);
  }
  isAccepted(caret2) {
    return false;
  }
  adjustedCaret(caret2, isForwardDirection, char) {
    return isForwardDirection ? this._adjustedForward(caret2, 0, char) : this._adjustedBackward(caret2, 0, char);
  }
  _adjustedForward(caret2, index, char) {
  }
  _adjustedBackward(caret2, index, char) {
  }
  isValid(args) {
  }
  reset() {
  }
  clear(args) {
  }
  text() {
  }
  value() {
  }
  rawValue() {
  }
  handle(args) {
  }
};
var EmptyMaskRule = class extends BaseMaskRule {
  next() {
  }
  handle() {
    return 0;
  }
  text() {
    return "";
  }
  value() {
    return "";
  }
  first() {
    return 0;
  }
  rawValue() {
    return "";
  }
  adjustedCaret() {
    return 0;
  }
  isValid() {
    return true;
  }
};
var MaskRule = class extends BaseMaskRule {
  text() {
    const isValueEqualEmptyChar = " " === this._value;
    const value = isValueEqualEmptyChar ? this.maskChar : this._value;
    const finalValue = `${value}${this.next().text() ?? ""}`;
    return finalValue;
  }
  value() {
    const finalValue = `${this._value}${this.next().value() ?? ""}`;
    return finalValue;
  }
  rawValue() {
    const finalValue = `${this._value}${this.next().rawValue() ?? ""}`;
    return finalValue;
  }
  handle(args) {
    const str = Object.prototype.hasOwnProperty.call(args, "value") ? args.value : args.text;
    if (!str || !str.length || !args.length) {
      return 0;
    }
    if (args.start) {
      return this.next().handle(this._prepareHandlingArgs(args, {
        start: args.start - 1
      }));
    }
    const char = str[0];
    const rest = str.substring(1);
    this._tryAcceptChar(char, args);
    const isAccepted = this._accepted();
    const rule = isAccepted ? this.next() : this;
    const handlingArgs = this._prepareHandlingArgs(args, {
      str: rest,
      length: args.length - 1
    });
    const handledResult = rule.handle(handlingArgs);
    const result = isAccepted ? handledResult + 1 : handledResult;
    return result;
  }
  clear(args) {
    this._tryAcceptChar(" ", args);
    this.next().clear(this._prepareHandlingArgs(args));
  }
  reset() {
    this._accepted(false);
    this.next().reset();
  }
  _tryAcceptChar(char, args) {
    var _args$fullText, _args$fullText2;
    this._accepted(false);
    if (!this._isAllowed(char, args)) {
      return;
    }
    const acceptedChar = " " === char ? this.maskChar ?? "" : char;
    const fullTextSubstring1 = (null === (_args$fullText = args.fullText) || void 0 === _args$fullText ? void 0 : _args$fullText.substring(0, args.index)) ?? "";
    const fullTextSubstring2 = (null === (_args$fullText2 = args.fullText) || void 0 === _args$fullText2 ? void 0 : _args$fullText2.substring((args.index ?? 0) + 1)) ?? "";
    args.fullText = `${fullTextSubstring1}${acceptedChar}${fullTextSubstring2}`;
    this._accepted(true);
    this._value = char;
  }
  _accepted(value) {
    if (!arguments.length) {
      return !!this._isAccepted;
    }
    this._isAccepted = !!value;
  }
  first() {
    let index = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    return " " === this._value ? index : super.first(index);
  }
  _isAllowed(char, args) {
    if (" " === char) {
      return true;
    }
    return this._isValid(char, args);
  }
  _isValid(char, args) {
    const {
      allowedChars
    } = this;
    if (allowedChars instanceof RegExp) {
      return allowedChars.test(char);
    }
    if (isFunction(allowedChars)) {
      return allowedChars(char, null === args || void 0 === args ? void 0 : args.index, null === args || void 0 === args ? void 0 : args.fullText);
    }
    if (Array.isArray(allowedChars)) {
      return allowedChars.includes(char);
    }
    return allowedChars === char;
  }
  isAccepted(caret2) {
    return Boolean(0 === caret2 ? this._accepted() : this.next().isAccepted(caret2 - 1));
  }
  _adjustedForward(caret2, index, char) {
    if (index >= caret2) {
      return index;
    }
    return this.next()._adjustedForward(caret2, index + 1, char) || index + 1;
  }
  _adjustedBackward(caret2, index) {
    if (index >= caret2 - 1) {
      return caret2;
    }
    return this.next()._adjustedBackward(caret2, index + 1) || index + 1;
  }
  isValid(args) {
    return this._isValid(this._value, args) && this.next().isValid(this._prepareHandlingArgs(args));
  }
};
var StubMaskRule = class extends MaskRule {
  value() {
    return this.next().value();
  }
  handle(args) {
    const hasValueProperty = Object.prototype.hasOwnProperty.call(args, "value");
    const str = hasValueProperty ? args.value : args.text;
    if (!(null !== str && void 0 !== str && str.length) || !args.length) {
      return 0;
    }
    if (args.start || hasValueProperty) {
      const handlingArgs = this._prepareHandlingArgs(args, {
        start: args.start && args.start - 1
      });
      return this.next().handle(handlingArgs);
    }
    const char = str[0];
    const rest = str.substring(1);
    this._tryAcceptChar(char);
    const nextArgs = this._isAllowed(char) ? this._prepareHandlingArgs(args, {
      str: rest,
      length: args.length - 1
    }) : args;
    return (this.next().handle(nextArgs) ?? 0) + 1;
  }
  clear(args) {
    this._accepted(false);
    this.next().clear(this._prepareHandlingArgs(args));
  }
  _tryAcceptChar(char) {
    this._accepted(this._isValid(char));
  }
  _isValid(char) {
    return char === this.maskChar;
  }
  first() {
    let index = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 0;
    const newIndex = index + 1;
    return this.next().first(newIndex);
  }
  _adjustedForward(caret2, index, char) {
    if (index >= caret2 && char === this.maskChar) {
      return index;
    }
    if (caret2 === index + 1 && this._accepted()) {
      return caret2;
    }
    return this.next()._adjustedForward(caret2, index + 1, char);
  }
  _adjustedBackward(caret2, index) {
    if (index >= caret2 - 1) {
      return 0;
    }
    return this.next()._adjustedBackward(caret2, index + 1);
  }
  isValid(args) {
    return Boolean(this.next().isValid(this._prepareHandlingArgs(args)));
  }
};

// node_modules/devextreme/esm/__internal/ui/text_box/text_editor.mask.strategy.js
var BLUR_EVENT = "blur beforedeactivate";
var DELETE_INPUT_TYPES = ["deleteContentBackward", "deleteSoftLineBackward", "deleteContent", "deleteHardLineBackward"];
var HISTORY_INPUT_TYPES = ["historyUndo", "historyRedo"];
var EVENT_NAMES = ["focusIn", "focusOut", "input", "paste", "cut", "drop", "beforeInput"];
var getEmptyString = (length) => " ".repeat(length);
var MaskStrategy = class {
  constructor(editor) {
    this.editor = editor;
  }
  _editorOption(name, value) {
    return this.editor.option(...arguments);
  }
  _editorInput() {
    return this.editor._input();
  }
  _editorCaret(newCaret) {
    if (!newCaret) {
      return this.editor._caret();
    }
    this.editor._caret(newCaret);
  }
  _attachChangeEventHandler() {
    const valueChangeEvent = this._editorOption("valueChangeEvent");
    if (!(null !== valueChangeEvent && void 0 !== valueChangeEvent && valueChangeEvent.split(" ").includes("change"))) {
      return;
    }
    const $input = this._editorInput();
    const namespace = addNamespace(BLUR_EVENT, "dxMask");
    m_events_engine_default.on($input, namespace, (e) => {
      this.editor._changeHandler(e);
    });
  }
  _beforeInputHandler() {
    this._previousText = this._editorOption("text");
    this._prevCaret = this._editorCaret();
  }
  _inputHandler(event) {
    const {
      originalEvent
    } = event;
    if (!originalEvent) {
      return;
    }
    const {
      inputType
    } = originalEvent;
    if (HISTORY_INPUT_TYPES.includes(inputType)) {
      this._handleHistoryInputEvent();
    } else if (DELETE_INPUT_TYPES.includes(inputType)) {
      this._handleBackwardDeleteInputEvent();
    } else {
      const currentCaret = this._editorCaret();
      if (!(null !== currentCaret && void 0 !== currentCaret && currentCaret.end)) {
        return;
      }
      this._clearSelectedText();
      this._autoFillHandler(originalEvent);
      this._editorCaret(currentCaret);
      this._handleInsertTextInputEvent(originalEvent.data);
    }
    if (this._editorOption("text") === this._previousText) {
      event.stopImmediatePropagation();
    }
  }
  _handleHistoryInputEvent() {
    const caret2 = this._editorCaret();
    this._updateEditorMask({
      start: null === caret2 || void 0 === caret2 ? void 0 : caret2.start,
      length: ((null === caret2 || void 0 === caret2 ? void 0 : caret2.end) ?? 0) - ((null === caret2 || void 0 === caret2 ? void 0 : caret2.start) ?? 0),
      text: ""
    });
    this._editorCaret(this._prevCaret);
  }
  _handleBackwardDeleteInputEvent() {
    this._clearSelectedText(true);
    const caret2 = this._editorCaret();
    this.editor.setForwardDirection();
    this.editor._adjustCaret();
    const adjustedForwardCaret = this._editorCaret();
    if ((null === adjustedForwardCaret || void 0 === adjustedForwardCaret ? void 0 : adjustedForwardCaret.start) !== (null === caret2 || void 0 === caret2 ? void 0 : caret2.start)) {
      this.editor.setBackwardDirection();
      this.editor._adjustCaret();
    }
  }
  _clearSelectedText(isDeleteInputEvent) {
    const selectionLength = this._prevCaret && (this._prevCaret.end ?? 0) - (this._prevCaret.start ?? 0);
    const length = selectionLength || Number(Boolean(isDeleteInputEvent));
    const caret2 = this._editorCaret();
    if (!this._isAutoFill()) {
      this.editor.setBackwardDirection();
      this._updateEditorMask({
        start: null === caret2 || void 0 === caret2 ? void 0 : caret2.start,
        length,
        text: getEmptyString(length)
      });
    }
  }
  _handleInsertTextInputEvent(data2) {
    var _this$_prevCaret;
    const text = data2 ?? "";
    this.editor.setForwardDirection();
    const hasValidChars = this._updateEditorMask({
      start: (null === (_this$_prevCaret = this._prevCaret) || void 0 === _this$_prevCaret ? void 0 : _this$_prevCaret.start) ?? 0,
      length: text.length || 1,
      text
    });
    if (!hasValidChars) {
      this._editorCaret(this._prevCaret);
    }
  }
  _updateEditorMask(args) {
    var _args$text;
    const textLength = (null === (_args$text = args.text) || void 0 === _args$text ? void 0 : _args$text.length) ?? 0;
    const processedCharsCount = this.editor._handleChain(args) ?? 0;
    this.editor._displayMask();
    if (this.editor.isForwardDirection()) {
      const {
        start = 0,
        end = 0
      } = this._editorCaret() ?? {};
      const correction = processedCharsCount - textLength;
      const hasSkippedStub = processedCharsCount > 1;
      if (hasSkippedStub && 1 === textLength) {
        this._editorCaret({
          start: start + correction,
          end: end + correction
        });
      }
      this.editor._adjustCaret();
    }
    return Boolean(processedCharsCount);
  }
  _focusInHandler() {
    this.editor._showMaskPlaceholder();
    this.editor.setForwardDirection();
    if (!this.editor._isValueEmpty() && this._editorOption("isValid")) {
      this.editor._adjustCaret();
    } else {
      if (!this.editor._maskRulesChain) {
        return;
      }
      const caret2 = this.editor._maskRulesChain.first();
      this._caretTimeout = setTimeout(() => {
        this._editorCaret({
          start: caret2,
          end: caret2
        });
      }, 0);
    }
  }
  _focusOutHandler(event) {
    this.editor._changeHandler(event);
    if ("onFocus" === this._editorOption("showMaskMode") && this.editor._isValueEmpty()) {
      this._editorOption("text", "");
      this.editor._renderDisplayText("");
    }
  }
  _delHandler(event) {
    this.editor._maskKeyHandler(event, () => {
      if (!this.editor._hasSelection()) {
        this.editor._handleKey(" ");
      }
      return;
    });
  }
  _cutHandler(event) {
    const caret2 = this._editorCaret();
    const inputVal = this._editorInput().val();
    const selectedText = inputVal.substring(null === caret2 || void 0 === caret2 ? void 0 : caret2.start, null === caret2 || void 0 === caret2 ? void 0 : caret2.end);
    this.editor._maskKeyHandler(event, () => clipboardText(event, selectedText));
  }
  _dropHandler() {
    this._clearDragTimer();
    this._dragTimer = setTimeout(() => {
      const value = this.editor._convertToValue(this._editorInput().val());
      this._editorOption("value", value);
    });
  }
  _pasteHandler(event) {
    if (this._editorOption("disabled")) {
      return;
    }
    const caret2 = this._editorCaret();
    this.editor._maskKeyHandler(event, () => {
      var _this$editor$_maskRul;
      const pastedText = clipboardText(event);
      if (!pastedText) {
        return;
      }
      const restText = null === (_this$editor$_maskRul = this.editor._maskRulesChain) || void 0 === _this$editor$_maskRul ? void 0 : _this$editor$_maskRul.text().substring((null === caret2 || void 0 === caret2 ? void 0 : caret2.end) ?? 0);
      const accepted = this.editor._handleChain({
        text: pastedText,
        start: null === caret2 || void 0 === caret2 ? void 0 : caret2.start,
        length: pastedText.length
      });
      const newCaret = ((null === caret2 || void 0 === caret2 ? void 0 : caret2.start) ?? 0) + accepted;
      this.editor._handleChain({
        text: restText,
        start: newCaret,
        length: null === restText || void 0 === restText ? void 0 : restText.length
      });
      this.editor._caret({
        start: newCaret,
        end: newCaret
      });
      return;
    });
  }
  _autoFillHandler(event) {
    const inputVal = this._editorInput().val();
    this._inputHandlerTimer = setTimeout(() => {
      if (this._isAutoFill()) {
        this.editor._maskKeyHandler(event, () => {
          this.editor._handleChain({
            text: inputVal,
            start: 0,
            length: inputVal.length
          });
          return;
        });
        this.editor._validateMask();
      }
    });
  }
  _isAutoFill() {
    const $input = this._editorInput();
    if (browser_default.webkit) {
      const input = $input.get(0);
      return (null === input || void 0 === input ? void 0 : input.matches(":-webkit-autofill")) ?? false;
    }
    return false;
  }
  _clearDragTimer() {
    clearTimeout(this._dragTimer);
  }
  _clearTimers() {
    this._clearDragTimer();
    clearTimeout(this._caretTimeout);
    clearTimeout(this._inputHandlerTimer);
  }
  getHandler(handlerName) {
    return (args) => {
      var _this;
      null === (_this = this[`_${handlerName}Handler`]) || void 0 === _this || _this.call(this, args);
    };
  }
  attachEvents() {
    const $input = this._editorInput();
    EVENT_NAMES.forEach((eventName) => {
      const namespace = addNamespace(eventName.toLowerCase(), "dxMask");
      m_events_engine_default.on($input, namespace, this.getHandler(eventName));
    });
    this._attachChangeEventHandler();
  }
  detachEvents() {
    this._clearTimers();
    m_events_engine_default.off(this._editorInput(), ".dxMask");
  }
  clean() {
    this._clearTimers();
  }
};

// node_modules/devextreme/esm/__internal/ui/text_box/utils.caret.js
var {
  ios,
  mac
} = devices_default.real();
var isFocusingOnCaretChange = ios || mac;
var getCaret = (input) => {
  let range = {
    start: 0,
    end: 0
  };
  try {
    range = {
      start: input.selectionStart ?? 0,
      end: input.selectionEnd ?? 0
    };
  } catch (e) {
    range = {
      start: 0,
      end: 0
    };
  }
  return range;
};
var setCaret = (input, selection) => {
  try {
    input.selectionStart = selection.start ?? null;
    input.selectionEnd = selection.end ?? null;
  } catch (e) {
  }
};
var caret = function(input, selection) {
  let force = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : false;
  const inputElement = renderer_default(input).get(0);
  if (!isDefined(selection)) {
    return getCaret(inputElement);
  }
  if (!force && isFocusingOnCaretChange && dom_adapter_default.getActiveElement(inputElement) !== inputElement) {
    return;
  }
  setCaret(inputElement, selection);
  return;
};
var utils_caret_default = caret;

// node_modules/devextreme/esm/__internal/ui/text_box/text_editor.mask.js
var isNumericChar = (char) => /[0-9]/.test(char);
var isLiteralChar = (char) => {
  const code = char.charCodeAt(0);
  return code > 64 && code < 91 || code > 96 && code < 123 || code > 127;
};
var isSpaceChar = (char) => " " === char;
var buildInMaskRules = {
  0: /[0-9]/,
  9: /[0-9\s]/,
  "#": /[-+0-9\s]/,
  L: (char) => isLiteralChar(char),
  l: (char) => isLiteralChar(char) || isSpaceChar(char),
  C: /\S/,
  c: /./,
  A: (char) => isLiteralChar(char) || isNumericChar(char),
  a: (char) => isLiteralChar(char) || isNumericChar(char) || isSpaceChar(char)
};
var TextEditorMask = class extends m_text_editor_base_default {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      mask: "",
      maskChar: "_",
      maskRules: {},
      maskInvalidMessage: message_default.format("validation-mask"),
      useMaskedValue: false,
      showMaskMode: "always"
    });
  }
  _supportedKeys() {
    const result = super._supportedKeys();
    const keyHandlerMap = {
      del: this._maskStrategy.getHandler("del"),
      enter: this._changeHandler
    };
    Object.entries(keyHandlerMap).forEach((_ref) => {
      let [key, handler] = _ref;
      const parentHandler = result[key];
      result[key] = (e) => {
        const {
          mask
        } = this.option();
        if (mask && handler) {
          handler.call(this, e);
        }
        null === parentHandler || void 0 === parentHandler || parentHandler(e);
      };
    });
    return result;
  }
  _getSubmitElement() {
    const {
      mask
    } = this.option();
    const submitElement = !mask ? super._getSubmitElement() : this._$hiddenElement;
    return submitElement;
  }
  _init() {
    super._init();
    this._initMaskStrategy();
  }
  _initMaskStrategy() {
    this._maskStrategy = new MaskStrategy(this);
  }
  _initMarkup() {
    this._renderHiddenElement();
    super._initMarkup();
  }
  _attachMouseWheelEventHandlers() {
    if (!this._hasMouseWheelHandler()) {
      return;
    }
    const input = this._input();
    const eventName = addNamespace(EVENT_NAME, this.NAME);
    const mouseWheelAction = this._createAction((e) => {
      const {
        event
      } = e;
      if (focused(input) && !isCommandKeyPressed(event)) {
        this._onMouseWheel(event);
        event.preventDefault();
        event.stopPropagation();
      }
    });
    m_events_engine_default.off(input, eventName);
    m_events_engine_default.on(input, eventName, (e) => {
      mouseWheelAction({
        event: e
      });
    });
  }
  _hasMouseWheelHandler() {
    return false;
  }
  _onMouseWheel(e) {
  }
  _useMaskBehavior() {
    const {
      mask
    } = this.option();
    return Boolean(mask);
  }
  _attachDropEventHandler() {
    const useMaskBehavior = this._useMaskBehavior();
    if (!useMaskBehavior) {
      return;
    }
    const eventName = addNamespace("drop", this.NAME);
    const input = this._input();
    m_events_engine_default.off(input, eventName);
    m_events_engine_default.on(input, eventName, (e) => {
      e.preventDefault();
    });
  }
  _render() {
    this._attachMouseWheelEventHandlers();
    this._renderMask();
    super._render();
    this._attachDropEventHandler();
  }
  _renderHiddenElement() {
    const {
      mask
    } = this.option();
    if (mask) {
      this._$hiddenElement = renderer_default("<input>").attr("type", "hidden").appendTo(this._inputWrapper());
    }
  }
  _removeHiddenElement() {
    var _this$_$hiddenElement;
    null === (_this$_$hiddenElement = this._$hiddenElement) || void 0 === _this$_$hiddenElement || _this$_$hiddenElement.remove();
  }
  _renderMask() {
    this.$element().removeClass("dx-texteditor-masked");
    this._maskRulesChain = null;
    this._maskStrategy.detachEvents();
    const {
      mask
    } = this.option();
    if (!mask) {
      return;
    }
    this.$element().addClass("dx-texteditor-masked");
    this._maskStrategy.attachEvents();
    this._parseMask();
    this._renderMaskedValue();
  }
  _changeHandler(e) {
    const $input = this._input();
    const inputValue = $input.val();
    if (inputValue === this._changedValue) {
      return;
    }
    this._changedValue = inputValue;
    const changeEvent = createEvent(e, {
      type: "change"
    });
    m_events_engine_default.trigger($input, changeEvent);
  }
  _parseMask() {
    const {
      maskRules
    } = this.option();
    this._maskRules = extend({}, buildInMaskRules, maskRules);
    this._maskRulesChain = this._parseMaskRule(0);
  }
  _parseMaskRule(index) {
    const {
      mask
    } = this.option();
    if (!isDefined(mask) || index >= mask.length) {
      return new EmptyMaskRule({});
    }
    const currentMaskChar = mask[index];
    const isEscapedChar = "\\" === currentMaskChar;
    const result = isEscapedChar ? new StubMaskRule({
      maskChar: mask[index + 1]
    }) : this._getMaskRule(currentMaskChar);
    const nextIndex = index + 1 + Number(isEscapedChar);
    const recursiveResult = this._parseMaskRule(nextIndex);
    result.next(recursiveResult);
    return result;
  }
  _getMaskRule(pattern) {
    if (!this._maskRules) {
      return new StubMaskRule({
        maskChar: pattern
      });
    }
    const matchingEntry = Object.entries(this._maskRules).find((_ref2) => {
      let [rulePattern] = _ref2;
      return rulePattern === pattern;
    });
    if (matchingEntry) {
      const [, allowedChars] = matchingEntry;
      const ruleConfig = {
        pattern,
        allowedChars
      };
      const {
        maskChar
      } = this.option();
      return new MaskRule(extend({
        maskChar: maskChar || " "
      }, ruleConfig));
    }
    return new StubMaskRule({
      maskChar: pattern
    });
  }
  _renderMaskedValue() {
    if (!this._maskRulesChain) {
      return;
    }
    const {
      value: optionValue
    } = this.option();
    const value = optionValue || "";
    this._maskRulesChain.clear(this._normalizeChainArguments());
    const chainArgs = {
      length: null === value || void 0 === value ? void 0 : value.length
    };
    const prop = this._isMaskedValueMode() ? "text" : "value";
    chainArgs[prop] = value;
    this._handleChain(chainArgs);
    this._displayMask();
  }
  _replaceSelectedText(text, selection, char) {
    if (void 0 === char) {
      return text;
    }
    const textBefore = text.slice(0, selection.start);
    const textAfter = text.slice(selection.end);
    const edited = `${textBefore}${char}${textAfter}`;
    return edited;
  }
  _isMaskedValueMode() {
    const {
      useMaskedValue
    } = this.option();
    return Boolean(useMaskedValue);
  }
  _displayMask(caret2) {
    const currentCaret = caret2 ?? this._caret();
    const finalCaret = {
      start: (null === currentCaret || void 0 === currentCaret ? void 0 : currentCaret.start) ?? 0,
      end: (null === currentCaret || void 0 === currentCaret ? void 0 : currentCaret.end) ?? 0
    };
    this._renderValue();
    this._caret(finalCaret);
  }
  _isValueEmpty() {
    return isEmpty(this._value);
  }
  _shouldShowMask() {
    const {
      showMaskMode
    } = this.option();
    if ("onFocus" === showMaskMode) {
      return focused(this._input()) || !this._isValueEmpty();
    }
    return true;
  }
  _showMaskPlaceholder() {
    if (this._shouldShowMask()) {
      var _this$_maskRulesChain;
      const text = null === (_this$_maskRulesChain = this._maskRulesChain) || void 0 === _this$_maskRulesChain ? void 0 : _this$_maskRulesChain.text();
      this.option({
        text
      });
      const {
        showMaskMode
      } = this.option();
      if ("onFocus" === showMaskMode) {
        this._renderDisplayText(text);
      }
    }
  }
  _renderValue() {
    if (this._maskRulesChain) {
      this._showMaskPlaceholder();
      if (this._$hiddenElement) {
        const value = this._maskRulesChain.value();
        const submitElementValue = !isEmpty(value) ? this._getPreparedValue() : "";
        this._$hiddenElement.val(submitElementValue);
      }
    }
    return super._renderValue();
  }
  _getPreparedValue() {
    return this._convertToValue().replace(/\s+$/, "");
  }
  _valueChangeEventHandler() {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    if (!this._maskRulesChain) {
      super._valueChangeEventHandler(...args);
      return;
    }
    const [e] = args;
    this._saveValueChangeEvent(e);
    const preparedValue = this._getPreparedValue();
    this.option({
      value: preparedValue
    });
  }
  _isControlKeyFired(e) {
    const normalizedKeyName = normalizeKeyName(e);
    const isControlKey = isDefined(normalizedKeyName) ? this._isControlKey(normalizedKeyName) : false;
    return isControlKey || isCommandKeyPressed(e);
  }
  _handleChain(args) {
    var _this$_maskRulesChain2;
    const handledCount = (null === (_this$_maskRulesChain2 = this._maskRulesChain) || void 0 === _this$_maskRulesChain2 ? void 0 : _this$_maskRulesChain2.handle(this._normalizeChainArguments(args))) ?? 0;
    this._updateMaskInfo();
    return handledCount;
  }
  _normalizeChainArguments(args) {
    var _this$_maskRulesChain3;
    return Object.assign({}, args, {
      index: 0,
      fullText: null === (_this$_maskRulesChain3 = this._maskRulesChain) || void 0 === _this$_maskRulesChain3 ? void 0 : _this$_maskRulesChain3.text()
    });
  }
  _convertToValue(text) {
    if (this._isMaskedValueMode()) {
      return this._replaceMaskCharWithEmpty(text || this._textValue || "");
    }
    return text || this._value || "";
  }
  _replaceMaskCharWithEmpty(text) {
    const {
      maskChar
    } = this.option();
    return text.replace(new RegExp(maskChar, "g"), " ");
  }
  _maskKeyHandler(e, keyHandler) {
    const {
      readOnly
    } = this.option();
    if (readOnly) {
      return;
    }
    this.setForwardDirection();
    e.preventDefault();
    this._handleSelection();
    const previousText = this._input().val();
    const raiseInputEvent = () => {
      if (previousText !== this._input().val()) {
        m_events_engine_default.trigger(this._input(), "input");
      }
    };
    const handled = keyHandler();
    if (handled) {
      handled.then(raiseInputEvent);
    } else {
      var _this$_maskRulesChain4;
      this.setForwardDirection();
      this._adjustCaret();
      this._displayMask();
      null === (_this$_maskRulesChain4 = this._maskRulesChain) || void 0 === _this$_maskRulesChain4 || _this$_maskRulesChain4.reset();
      raiseInputEvent();
    }
  }
  _handleKey(key, direction) {
    this._direction(direction || "forward");
    this._adjustCaret(key);
    this._handleKeyChain(key);
    this._moveCaret();
  }
  _handleSelection() {
    if (!this._hasSelection()) {
      return;
    }
    const caret2 = this._caret();
    const caretStart = (null === caret2 || void 0 === caret2 ? void 0 : caret2.start) ?? 0;
    const caretEnd = (null === caret2 || void 0 === caret2 ? void 0 : caret2.end) ?? 0;
    const emptyChars = new Array(caretEnd - caretStart + 1).join(" ");
    this._handleKeyChain(emptyChars);
  }
  _handleKeyChain(chars) {
    const caret2 = this._caret();
    const caretStart = (null === caret2 || void 0 === caret2 ? void 0 : caret2.start) ?? 0;
    const caretEnd = (null === caret2 || void 0 === caret2 ? void 0 : caret2.end) ?? 0;
    const start = this.isForwardDirection() ? caretStart : caretStart - 1;
    const end = this.isForwardDirection() ? caretEnd : caretEnd - 1;
    const length = start === end ? 1 : end - start;
    this._handleChain({
      text: chars,
      start,
      length
    });
  }
  _tryMoveCaretBackward() {
    var _this$_caret, _this$_caret2;
    this.setBackwardDirection();
    const currentCaret = null === (_this$_caret = this._caret()) || void 0 === _this$_caret ? void 0 : _this$_caret.start;
    this._adjustCaret();
    return !currentCaret || currentCaret !== (null === (_this$_caret2 = this._caret()) || void 0 === _this$_caret2 ? void 0 : _this$_caret2.start);
  }
  _adjustCaret(char) {
    var _this$_caret3, _this$_maskRulesChain5;
    const caretStart = (null === (_this$_caret3 = this._caret()) || void 0 === _this$_caret3 ? void 0 : _this$_caret3.start) ?? 0;
    const isForwardDirection = this.isForwardDirection();
    const caret2 = null === (_this$_maskRulesChain5 = this._maskRulesChain) || void 0 === _this$_maskRulesChain5 ? void 0 : _this$_maskRulesChain5.adjustedCaret(caretStart, isForwardDirection, char ?? "");
    this._caret({
      start: caret2,
      end: caret2
    });
  }
  _moveCaret() {
    var _this$_caret4, _this$_maskRulesChain6;
    const currentCaret = (null === (_this$_caret4 = this._caret()) || void 0 === _this$_caret4 ? void 0 : _this$_caret4.start) ?? 0;
    const maskRuleIndex = currentCaret + (this.isForwardDirection() ? 0 : -1);
    const caret2 = null !== (_this$_maskRulesChain6 = this._maskRulesChain) && void 0 !== _this$_maskRulesChain6 && _this$_maskRulesChain6.isAccepted(maskRuleIndex) ? currentCaret + (this.isForwardDirection() ? 1 : -1) : currentCaret;
    this._caret({
      start: caret2,
      end: caret2
    });
  }
  _caret(position, force) {
    const $input = this._input();
    if (!$input.length) {
      return;
    }
    if (arguments.length > 0) {
      utils_caret_default($input, position, force);
      return;
    }
    return utils_caret_default($input);
  }
  _hasSelection() {
    const caret2 = this._caret();
    return (null === caret2 || void 0 === caret2 ? void 0 : caret2.start) !== (null === caret2 || void 0 === caret2 ? void 0 : caret2.end);
  }
  _direction(direction) {
    if (!arguments.length) {
      return this._typingDirection;
    }
    this._typingDirection = direction;
  }
  setForwardDirection() {
    this._direction("forward");
  }
  setBackwardDirection() {
    this._direction("backward");
  }
  isForwardDirection() {
    return "forward" === this._direction();
  }
  _updateMaskInfo() {
    var _this$_maskRulesChain7, _this$_maskRulesChain8;
    this._textValue = null === (_this$_maskRulesChain7 = this._maskRulesChain) || void 0 === _this$_maskRulesChain7 ? void 0 : _this$_maskRulesChain7.text();
    this._value = null === (_this$_maskRulesChain8 = this._maskRulesChain) || void 0 === _this$_maskRulesChain8 ? void 0 : _this$_maskRulesChain8.value();
  }
  _clean() {
    var _this$_maskStrategy;
    null === (_this$_maskStrategy = this._maskStrategy) || void 0 === _this$_maskStrategy || _this$_maskStrategy.clean();
    super._clean();
  }
  _validateMask() {
    if (!this._maskRulesChain) {
      return;
    }
    const {
      maskInvalidMessage,
      value
    } = this.option();
    const defaultValidationError = {
      editorSpecific: true,
      message: maskInvalidMessage
    };
    const isValid = isEmpty(value) || this._maskRulesChain.isValid(this._normalizeChainArguments());
    const validationError = isValid ? null : defaultValidationError;
    this.option({
      isValid,
      validationError
    });
  }
  _updateHiddenElement() {
    this._removeHiddenElement();
    const {
      mask
    } = this.option();
    if (mask) {
      this._input().removeAttr("name");
      this._renderHiddenElement();
    }
    const {
      name
    } = this.option();
    this._setSubmitElementName(name);
  }
  _updateMaskOption() {
    this._updateHiddenElement();
    this._renderMask();
    this._validateMask();
    this._refreshValueChangeEvent();
  }
  _processEmptyMask(mask) {
    if (mask) {
      return;
    }
    const {
      value
    } = this.option();
    this.option({
      text: value,
      isValid: true,
      validationError: null
    });
    this.validationRequest.fire({
      value,
      editor: this
    });
    this._renderValue();
  }
  _optionChanged(args) {
    switch (args.name) {
      case "mask":
        this._updateMaskOption();
        this._processEmptyMask(args.value);
        break;
      case "maskChar":
      case "maskRules":
      case "useMaskedValue":
        this._updateMaskOption();
        break;
      case "value":
        this._renderMaskedValue();
        this._validateMask();
        super._optionChanged(args);
        this._changedValue = this._input().val();
        break;
      case "maskInvalidMessage":
        break;
      case "showMaskMode":
        this.option({
          text: ""
        });
        this._renderValue();
        break;
      default:
        super._optionChanged(args);
    }
  }
  clear() {
    const {
      value: defaultValue
    } = this._getDefaultOptions();
    const {
      value
    } = this.option();
    if (value === defaultValue) {
      this._renderMaskedValue();
    }
    super.clear();
  }
};
var text_editor_mask_default = TextEditorMask;

// node_modules/devextreme/esm/__internal/ui/text_box/m_text_box.js
var window = getWindow();
var ignoreKeys = ["backspace", "tab", "enter", "pageUp", "pageDown", "end", "home", "leftArrow", "rightArrow", "downArrow", "upArrow", "del"];
var TextBox = class extends text_editor_mask_default {
  ctor(element, options) {
    if (options) {
      this._showClearButton = options.showClearButton;
    }
    super.ctor(element, options);
  }
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      value: "",
      mode: "text",
      maxLength: null
    });
  }
  _initMarkup() {
    this.$element().addClass("dx-textbox");
    super._initMarkup();
    this.setAria("role", "textbox");
  }
  _renderInputType() {
    super._renderInputType();
    this._renderSearchMode();
  }
  _useTemplates() {
    return false;
  }
  _renderProps() {
    super._renderProps();
    this._toggleMaxLengthProp();
  }
  _toggleMaxLengthProp() {
    const maxLength = this._getMaxLength();
    if (maxLength && maxLength > 0) {
      this._input().attr("maxLength", maxLength);
    } else {
      this._input().removeAttr("maxLength");
    }
  }
  _renderSearchMode() {
    const {
      mode
    } = this.option();
    if ("search" === mode) {
      this.$element().addClass("dx-searchbox");
      this._renderSearchIcon();
      if (void 0 === this._showClearButton) {
        const {
          showClearButton
        } = this.option();
        this._showClearButton = showClearButton;
        this.option("showClearButton", true);
      }
    } else {
      this.$element().removeClass("dx-searchbox");
      if (this._$searchIcon) {
        this._$searchIcon.remove();
      }
      this.option("showClearButton", void 0 === this._showClearButton ? this.option("showClearButton") : this._showClearButton);
      delete this._showClearButton;
    }
  }
  _renderSearchIcon() {
    const $searchIcon = renderer_default("<div>").addClass("dx-icon").addClass("dx-icon-search");
    $searchIcon.prependTo(this._input().parent());
    this._$searchIcon = $searchIcon;
  }
  _getLabelContainerWidth() {
    if (this._$searchIcon) {
      const $inputContainer = this._input().parent();
      return getWidth($inputContainer) - this._getLabelBeforeWidth();
    }
    return super._getLabelContainerWidth();
  }
  _getLabelBeforeWidth() {
    let labelBeforeWidth = super._getLabelBeforeWidth();
    if (this._$searchIcon) {
      labelBeforeWidth += getOuterWidth(this._$searchIcon);
    }
    return labelBeforeWidth;
  }
  _optionChanged(args) {
    switch (args.name) {
      case "maxLength":
        this._toggleMaxLengthProp();
        break;
      case "mode":
        super._optionChanged(args);
        this._updateLabelWidth();
        break;
      case "mask":
        super._optionChanged(args);
        this._toggleMaxLengthProp();
        break;
      default:
        super._optionChanged(args);
    }
  }
  _onKeyDownCutOffHandler(e) {
    const actualMaxLength = this._getMaxLength();
    if (actualMaxLength && !e.ctrlKey && !this._hasSelection()) {
      const $input = renderer_default(e.target);
      const key = normalizeKeyName(e);
      this._cutOffExtraChar($input);
      return $input.val().length < actualMaxLength || ignoreKeys.includes(key) || "" !== window.getSelection().toString();
    }
    return true;
  }
  _onChangeCutOffHandler(e) {
    const $input = renderer_default(e.target);
    if (this.option("maxLength")) {
      this._cutOffExtraChar($input);
    }
  }
  _cutOffExtraChar($input) {
    const actualMaxLength = this._getMaxLength();
    const textInput = $input.val();
    if (actualMaxLength && textInput.length > actualMaxLength) {
      $input.val(textInput.substr(0, actualMaxLength));
    }
  }
  _getMaxLength() {
    const {
      mask,
      maxLength
    } = this.option();
    const isMaskSpecified = !!mask;
    return isMaskSpecified ? null : maxLength;
  }
};
component_registrator_default("dxTextBox", TextBox);
var m_text_box_default = TextBox;

export {
  validation_message_default,
  editor_default,
  TextEditorButton,
  ClearButton,
  TextEditorButtonCollection,
  TEXTEDITOR_CLASS,
  TEXTEDITOR_INPUT_CONTAINER_CLASS,
  TEXTEDITOR_INPUT_CLASS,
  utils_caret_default,
  text_editor_mask_default,
  m_text_box_default
};
//# sourceMappingURL=chunk-OJDXYR6A.js.map
