import {
  current,
  isMaterialBased
} from "./chunk-J6BDSVIG.js";
import {
  overlay_default
} from "./chunk-VLTKSH4G.js";
import {
  component_registrator_default,
  m_pointer_default
} from "./chunk-4VCY6VPW.js";
import {
  ready_callbacks_default,
  renderer_default
} from "./chunk-H2RLU3GL.js";
import {
  m_events_engine_default
} from "./chunk-WDK64ZWV.js";
import {
  dom_adapter_default,
  isString
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/ui/overlay/ui.overlay.js
var ui_overlay_default = overlay_default;

// node_modules/devextreme/esm/__internal/ui/toast/toast.js
var ready = ready_callbacks_default.add;
var toastTypes = ["info", "warning", "error", "success"];
var TOAST_STACK = [];
var POSITION_ALIASES = {
  top: {
    my: "top",
    at: "top",
    of: null,
    offset: "0 0"
  },
  bottom: {
    my: "bottom",
    at: "bottom",
    of: null,
    offset: "0 -20"
  },
  center: {
    my: "center",
    at: "center",
    of: null,
    offset: "0 0"
  },
  right: {
    my: "center right",
    at: "center right",
    of: null,
    offset: "0 0"
  },
  left: {
    my: "center left",
    at: "center left",
    of: null,
    offset: "0 0"
  }
};
var DEFAULT_BOUNDARY_OFFSET = {
  h: 0,
  v: 0
};
ready(() => {
  const element = dom_adapter_default.getDocument();
  m_events_engine_default.subscribeGlobal(element, m_pointer_default.down, (e) => {
    for (let i = TOAST_STACK.length - 1; i >= 0; i -= 1) {
      var _TOAST_STACK$i$_proxi, _TOAST_STACK$i;
      if (!(null !== (_TOAST_STACK$i$_proxi = (_TOAST_STACK$i = TOAST_STACK[i])._proxiedDocumentDownHandler) && void 0 !== _TOAST_STACK$i$_proxi && _TOAST_STACK$i$_proxi.call(_TOAST_STACK$i, e))) {
        return;
      }
    }
  });
});
var Toast = class extends ui_overlay_default {
  _getDefaultOptions() {
    return Object.assign({}, super._getDefaultOptions(), {
      message: "",
      type: "info",
      displayTime: 2e3,
      position: "bottom center",
      animation: {
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
      },
      shading: false,
      height: "auto",
      hideTopOverlayHandler: null,
      preventScrollEvents: false,
      closeOnSwipe: true,
      closeOnClick: false
    });
  }
  _defaultOptionsRules() {
    const tabletAndMobileCommonOptions = {
      displayTime: isMaterialBased(current()) ? 4e3 : 2e3,
      hideOnOutsideClick: true,
      animation: {
        show: {
          type: "fade",
          duration: 200,
          from: 0,
          to: 1
        },
        hide: {
          type: "fade",
          duration: 200,
          from: 1,
          to: 0
        }
      }
    };
    const toastRules = [{
      device: (device) => "phone" === device.deviceType,
      options: Object.assign({
        width: "calc(100vw - 40px)"
      }, tabletAndMobileCommonOptions)
    }, {
      device: (device) => "tablet" === device.deviceType,
      options: Object.assign({
        width: "auto",
        maxWidth: "80vw"
      }, tabletAndMobileCommonOptions)
    }, {
      device: (device) => isMaterialBased(current()) && "desktop" === device.deviceType,
      options: {
        minWidth: 344,
        maxWidth: 568,
        displayTime: 4e3
      }
    }];
    const rules = [...super._defaultOptionsRules(), ...toastRules];
    return rules;
  }
  _init() {
    super._init();
    this._posStringToObject();
  }
  _renderContentImpl() {
    const {
      message,
      type
    } = this.option();
    const $content = this.$content();
    if ($content) {
      this._message = renderer_default("<div>").addClass("dx-toast-message").text(message ?? "").appendTo($content);
    }
    this.setAria("role", "alert", this._message);
    if (type && toastTypes.includes(type.toLowerCase())) {
      null === $content || void 0 === $content || $content.prepend(renderer_default("<div>").addClass("dx-toast-icon"));
    }
    return super._renderContentImpl();
  }
  _render() {
    var _this$$element, _this$$wrapper, _this$$content2;
    super._render();
    null === (_this$$element = this.$element()) || void 0 === _this$$element || _this$$element.addClass("dx-toast");
    null === (_this$$wrapper = this.$wrapper()) || void 0 === _this$$wrapper || _this$$wrapper.addClass("dx-toast-wrapper");
    const {
      type
    } = this.option();
    if (type) {
      var _this$$content;
      null === (_this$$content = this.$content()) || void 0 === _this$$content || _this$$content.addClass(`dx-toast-${type.toLowerCase()}`);
    }
    null === (_this$$content2 = this.$content()) || void 0 === _this$$content2 || _this$$content2.addClass("dx-toast-content");
    this._toggleCloseEvents("Swipe");
    this._toggleCloseEvents("Click");
  }
  _toggleCloseEvents(event) {
    const dxEvent = `dx${event.toLowerCase()}`;
    m_events_engine_default.off(this.$content(), dxEvent);
    const optionName = `closeOn${event}`;
    const optionValue = this.option(optionName);
    if (optionValue) {
      m_events_engine_default.on(this.$content(), dxEvent, this.hide.bind(this));
    }
  }
  _posStringToObject() {
    const {
      position
    } = this.option();
    if (!isString(position)) {
      return;
    }
    const verticalPosition = position.split(" ")[0];
    const horizontalPosition = position.split(" ")[1];
    const newPosition = Object.assign({
      boundaryOffset: DEFAULT_BOUNDARY_OFFSET
    }, POSITION_ALIASES[verticalPosition]);
    this.option("position", newPosition);
    switch (horizontalPosition) {
      case "center":
      case "left":
      case "right":
        if (newPosition && "object" === typeof newPosition) {
          const at = `${newPosition.at} ${horizontalPosition}`;
          const my = `${newPosition.my} ${horizontalPosition}`;
          this.option("position.at", at);
          this.option("position.my", my);
        }
    }
  }
  _show() {
    const promise = super._show();
    promise.always(() => {
      clearTimeout(this._hideTimeout);
      const {
        displayTime
      } = this.option();
      this._hideTimeout = setTimeout(this.hide.bind(this), displayTime);
    });
    return promise;
  }
  _overlayStack() {
    return TOAST_STACK;
  }
  _zIndexInitValue() {
    return super._zIndexInitValue() + 8e3;
  }
  _dispose() {
    clearTimeout(this._hideTimeout);
    super._dispose();
  }
  _optionChanged(args) {
    var _this$$content3;
    const {
      name,
      value,
      previousValue
    } = args;
    switch (name) {
      case "type":
        null === (_this$$content3 = this.$content()) || void 0 === _this$$content3 || _this$$content3.removeClass(`dx-toast-${previousValue}`);
        if (value) {
          var _this$$content4;
          null === (_this$$content4 = this.$content()) || void 0 === _this$$content4 || _this$$content4.addClass(`dx-toast-${String(value).toLowerCase()}`);
        }
        break;
      case "message":
        if (this._message) {
          this._message.text(value);
        }
        break;
      case "closeOnSwipe":
        this._toggleCloseEvents("Swipe");
        break;
      case "closeOnClick":
        this._toggleCloseEvents("Click");
        break;
      case "displayTime":
        break;
      default:
        super._optionChanged(args);
    }
  }
};
component_registrator_default("dxToast", Toast);
var toast_default = Toast;

// node_modules/devextreme/esm/ui/toast.js
var toast_default2 = toast_default;

export {
  ui_overlay_default,
  toast_default2 as toast_default
};
//# sourceMappingURL=chunk-6VLQ33AC.js.map
