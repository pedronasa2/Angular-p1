import {
  toast_default
} from "./chunk-VYBMYRDM.js";
import {
  value
} from "./chunk-KTSDTV35.js";
import {
  renderer_default
} from "./chunk-H2RLU3GL.js";
import {
  getWindow,
  isPlainObject,
  isString
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/__internal/ui/notify.js
var window = getWindow();
var $notify = null;
var $containers = {};
var COORDINATE_ALIASES = {
  "top left": {
    top: 10,
    left: 10
  },
  "top right": {
    top: 10,
    right: 10
  },
  "bottom left": {
    bottom: 10,
    left: 10
  },
  "bottom right": {
    bottom: 10,
    right: 10
  },
  "top center": (dimensions) => ({
    top: 10,
    left: Math.round(dimensions.windowWidth / 2 - dimensions.toastWidth / 2)
  }),
  "left center": (dimensions) => ({
    top: Math.round(dimensions.windowHeight / 2 - dimensions.toastHeight / 2),
    left: 10
  }),
  "right center": (dimensions) => ({
    top: Math.round(dimensions.windowHeight / 2 - dimensions.toastHeight / 2),
    right: 10
  }),
  center: (dimensions) => ({
    top: Math.round(dimensions.windowHeight / 2 - dimensions.toastHeight / 2),
    left: Math.round(dimensions.windowWidth / 2 - dimensions.toastWidth / 2)
  }),
  "bottom center": (dimensions) => ({
    bottom: 10,
    left: Math.round(dimensions.windowWidth / 2 - dimensions.toastWidth / 2)
  })
};
var POSITION_STYLES_MAP = {
  up: (coordinates, dimensions) => ({
    bottom: coordinates.bottom ?? dimensions.windowHeight - dimensions.toastHeight - (coordinates.top ?? 0),
    top: "",
    left: coordinates.left ?? "",
    right: coordinates.right ?? ""
  }),
  down: (coordinates, dimensions) => ({
    top: coordinates.top ?? dimensions.windowHeight - dimensions.toastHeight - (coordinates.bottom ?? 0),
    bottom: "",
    left: coordinates.left ?? "",
    right: coordinates.right ?? ""
  }),
  left: (coordinates, dimensions) => ({
    right: coordinates.right ?? dimensions.windowWidth - dimensions.toastWidth - (coordinates.left ?? 0),
    left: "",
    top: coordinates.top ?? "",
    bottom: coordinates.bottom ?? ""
  }),
  right: (coordinates, dimensions) => ({
    left: coordinates.left ?? dimensions.windowWidth - dimensions.toastWidth - (coordinates.right ?? 0),
    right: "",
    top: coordinates.top ?? "",
    bottom: coordinates.bottom ?? ""
  })
};
var getDefaultDirection = (position) => {
  const condition = isString(position) && position.includes("top");
  return condition ? "down-push" : "up-push";
};
var createStackContainer = (key) => {
  const $container = renderer_default("<div>").appendTo(value());
  $containers[key] = $container;
  return $container;
};
var getStackContainer = (key) => {
  const $container = $containers[key];
  return $container || createStackContainer(key);
};
var setContainerClasses = (container, direction) => {
  const containerClasses = `dx-toast-stack dx-toast-stack-${direction}-direction`;
  container.removeAttr("class").addClass(containerClasses);
};
var getNotifyCoordinatesByAlias = (alias, dimensions) => {
  const coordinate = alias ? COORDINATE_ALIASES[alias] : COORDINATE_ALIASES["bottom center"];
  return "function" === typeof coordinate ? coordinate(dimensions) : coordinate;
};
var getPositionStylesByNotifyCoordinates = (direction, coordinates, dimensions) => {
  const directionKey = direction.replace(/-push|-stack/g, "");
  const styleFunction = POSITION_STYLES_MAP[directionKey];
  return styleFunction ? styleFunction(coordinates, dimensions) : {
    top: "",
    bottom: "",
    left: "",
    right: ""
  };
};
var setContainerStyles = (container, direction, position) => {
  const {
    offsetWidth: toastWidth,
    offsetHeight: toastHeight
  } = container.children().first().get(0);
  const dimensions = {
    toastWidth,
    toastHeight,
    windowHeight: window.innerHeight,
    windowWidth: window.innerWidth
  };
  const coordinates = isString(position) ? getNotifyCoordinatesByAlias(position, dimensions) : position;
  const styles = getPositionStylesByNotifyCoordinates(direction, coordinates, dimensions);
  container.css(styles);
};
var getToastOptions = (message, typeOrStack, displayTime) => {
  const userOptions = isPlainObject(message) ? message : {
    message
  };
  const stack = isPlainObject(typeOrStack) ? typeOrStack : void 0;
  const type = isPlainObject(typeOrStack) ? void 0 : typeOrStack;
  const {
    onHidden: userOnHidden,
    onShowing: userOnShowing
  } = userOptions;
  const defaultConfiguration = {
    onHidden: (e) => {
      renderer_default(e.element).remove();
      null === userOnHidden || void 0 === userOnHidden || userOnHidden(e);
    }
  };
  if (void 0 !== type) {
    defaultConfiguration.type = type;
  }
  if (void 0 !== displayTime) {
    defaultConfiguration.displayTime = displayTime;
  }
  if (null !== stack && void 0 !== stack && stack.position) {
    const {
      position
    } = stack;
    const direction = stack.direction || getDefaultDirection(position);
    const containerKey = isString(position) ? position : `${position.top}-${position.left}-${position.bottom}-${position.right}`;
    const $container = getStackContainer(containerKey);
    setContainerClasses($container, direction);
    const options2 = Object.assign({}, userOptions, defaultConfiguration, {
      container: $container,
      _skipContentPositioning: true,
      onShowing: (e) => {
        setContainerStyles($container, direction, position);
        null === userOnShowing || void 0 === userOnShowing || userOnShowing(e);
      }
    });
    return options2;
  }
  const options = Object.assign({}, userOptions, defaultConfiguration);
  return options;
};
var notify = (message, typeOrStack, displayTime) => {
  const options = getToastOptions(message, typeOrStack, displayTime);
  $notify = renderer_default("<div>").appendTo(value());
  const toast = new toast_default($notify, options);
  toast.show();
};
var notify_default = notify;

export {
  notify_default
};
//# sourceMappingURL=chunk-6PPPQ57G.js.map
