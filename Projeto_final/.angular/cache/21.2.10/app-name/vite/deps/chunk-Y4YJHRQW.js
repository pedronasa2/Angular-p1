import {
  dateUtilsTs,
  ui_errors_default
} from "./chunk-V5IPHRES.js";
import {
  errors_default
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/base.js
var BaseCommand = class {
  constructor(promptManager, requestManager) {
    this.promptManager = promptManager;
    this.requestManager = requestManager;
  }
  execute(params, callbacks) {
    const templateName = this.getTemplateName();
    const data = this.buildPromptData(params);
    const prompt = this.promptManager.buildPrompt(templateName, data);
    const requestManagerCallbacks = {
      onChunk: (chunk) => {
        var _callbacks$onChunk;
        null === callbacks || void 0 === callbacks || null === (_callbacks$onChunk = callbacks.onChunk) || void 0 === _callbacks$onChunk || _callbacks$onChunk.call(callbacks, chunk);
      },
      onComplete: (result) => {
        var _callbacks$onComplete;
        const finalResponse = this.parseResult(result, params);
        null === callbacks || void 0 === callbacks || null === (_callbacks$onComplete = callbacks.onComplete) || void 0 === _callbacks$onComplete || _callbacks$onComplete.call(callbacks, finalResponse);
      },
      onError: (error) => {
        var _callbacks$onError;
        null === callbacks || void 0 === callbacks || null === (_callbacks$onError = callbacks.onError) || void 0 === _callbacks$onError || _callbacks$onError.call(callbacks, error);
      }
    };
    const abort = this.requestManager.sendRequest(prompt, requestManagerCallbacks, params);
    return abort;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/changeStyle.js
var ChangeStyleCommand = class extends BaseCommand {
  getTemplateName() {
    return "changeStyle";
  }
  buildPromptData(params) {
    return {
      system: {
        writingStyle: params.writingStyle
      },
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/changeTone.js
var ChangeToneCommand = class extends BaseCommand {
  getTemplateName() {
    return "changeTone";
  }
  buildPromptData(params) {
    return {
      system: {
        tone: params.tone
      },
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/execute.js
var ExecuteCommand = class extends BaseCommand {
  getTemplateName() {
    return "execute";
  }
  buildPromptData(params) {
    return {
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/expand.js
var ExpandCommand = class extends BaseCommand {
  getTemplateName() {
    return "expand";
  }
  buildPromptData(params) {
    return {
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/proofread.js
var ProofreadCommand = class extends BaseCommand {
  getTemplateName() {
    return "proofread";
  }
  buildPromptData(params) {
    return {
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/shorten.js
var ShortenCommand = class extends BaseCommand {
  getTemplateName() {
    return "shorten";
  }
  buildPromptData(params) {
    return {
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
};

// node_modules/devextreme/esm/__internal/m_color.js
var standardColorNames = {
  aliceblue: "f0f8ff",
  antiquewhite: "faebd7",
  aqua: "00ffff",
  aquamarine: "7fffd4",
  azure: "f0ffff",
  beige: "f5f5dc",
  bisque: "ffe4c4",
  black: "000000",
  blanchedalmond: "ffebcd",
  blue: "0000ff",
  blueviolet: "8a2be2",
  brown: "a52a2a",
  burlywood: "deb887",
  cadetblue: "5f9ea0",
  chartreuse: "7fff00",
  chocolate: "d2691e",
  coral: "ff7f50",
  cornflowerblue: "6495ed",
  cornsilk: "fff8dc",
  crimson: "dc143c",
  cyan: "00ffff",
  darkblue: "00008b",
  darkcyan: "008b8b",
  darkgoldenrod: "b8860b",
  darkgray: "a9a9a9",
  darkgreen: "006400",
  darkgrey: "a9a9a9",
  darkkhaki: "bdb76b",
  darkmagenta: "8b008b",
  darkolivegreen: "556b2f",
  darkorange: "ff8c00",
  darkorchid: "9932cc",
  darkred: "8b0000",
  darksalmon: "e9967a",
  darkseagreen: "8fbc8f",
  darkslateblue: "483d8b",
  darkslategray: "2f4f4f",
  darkslategrey: "2f4f4f",
  darkturquoise: "00ced1",
  darkviolet: "9400d3",
  deeppink: "ff1493",
  deepskyblue: "00bfff",
  dimgray: "696969",
  dimgrey: "696969",
  dodgerblue: "1e90ff",
  feldspar: "d19275",
  firebrick: "b22222",
  floralwhite: "fffaf0",
  forestgreen: "228b22",
  fuchsia: "ff00ff",
  gainsboro: "dcdcdc",
  ghostwhite: "f8f8ff",
  gold: "ffd700",
  goldenrod: "daa520",
  gray: "808080",
  green: "008000",
  greenyellow: "adff2f",
  grey: "808080",
  honeydew: "f0fff0",
  hotpink: "ff69b4",
  indianred: "cd5c5c",
  indigo: "4b0082",
  ivory: "fffff0",
  khaki: "f0e68c",
  lavender: "e6e6fa",
  lavenderblush: "fff0f5",
  lawngreen: "7cfc00",
  lemonchiffon: "fffacd",
  lightblue: "add8e6",
  lightcoral: "f08080",
  lightcyan: "e0ffff",
  lightgoldenrodyellow: "fafad2",
  lightgray: "d3d3d3",
  lightgreen: "90ee90",
  lightgrey: "d3d3d3",
  lightpink: "ffb6c1",
  lightsalmon: "ffa07a",
  lightseagreen: "20b2aa",
  lightskyblue: "87cefa",
  lightslateblue: "8470ff",
  lightslategray: "778899",
  lightslategrey: "778899",
  lightsteelblue: "b0c4de",
  lightyellow: "ffffe0",
  lime: "00ff00",
  limegreen: "32cd32",
  linen: "faf0e6",
  magenta: "ff00ff",
  maroon: "800000",
  mediumaquamarine: "66cdaa",
  mediumblue: "0000cd",
  mediumorchid: "ba55d3",
  mediumpurple: "9370d8",
  mediumseagreen: "3cb371",
  mediumslateblue: "7b68ee",
  mediumspringgreen: "00fa9a",
  mediumturquoise: "48d1cc",
  mediumvioletred: "c71585",
  midnightblue: "191970",
  mintcream: "f5fffa",
  mistyrose: "ffe4e1",
  moccasin: "ffe4b5",
  navajowhite: "ffdead",
  navy: "000080",
  oldlace: "fdf5e6",
  olive: "808000",
  olivedrab: "6b8e23",
  orange: "ffa500",
  orangered: "ff4500",
  orchid: "da70d6",
  palegoldenrod: "eee8aa",
  palegreen: "98fb98",
  paleturquoise: "afeeee",
  palevioletred: "d87093",
  papayawhip: "ffefd5",
  peachpuff: "ffdab9",
  peru: "cd853f",
  pink: "ffc0cb",
  plum: "dda0dd",
  powderblue: "b0e0e6",
  purple: "800080",
  rebeccapurple: "663399",
  red: "ff0000",
  rosybrown: "bc8f8f",
  royalblue: "4169e1",
  saddlebrown: "8b4513",
  salmon: "fa8072",
  sandybrown: "f4a460",
  seagreen: "2e8b57",
  seashell: "fff5ee",
  sienna: "a0522d",
  silver: "c0c0c0",
  skyblue: "87ceeb",
  slateblue: "6a5acd",
  slategray: "708090",
  slategrey: "708090",
  snow: "fffafa",
  springgreen: "00ff7f",
  steelblue: "4682b4",
  tan: "d2b48c",
  teal: "008080",
  thistle: "d8bfd8",
  tomato: "ff6347",
  turquoise: "40e0d0",
  violet: "ee82ee",
  violetred: "d02090",
  wheat: "f5deb3",
  white: "ffffff",
  whitesmoke: "f5f5f5",
  yellow: "ffff00",
  yellowgreen: "9acd32"
};
var standardColorTypes = [{
  re: /^rgb\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
  process: (colorString) => [parseInt(colorString[1], 10), parseInt(colorString[2], 10), parseInt(colorString[3], 10)]
}, {
  re: /^rgba\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3}),\s*(\d*\.*\d+)\)$/,
  process: (colorString) => [parseInt(colorString[1], 10), parseInt(colorString[2], 10), parseInt(colorString[3], 10), parseFloat(colorString[4])]
}, {
  re: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/,
  process: (colorString) => [parseInt(colorString[1], 16), parseInt(colorString[2], 16), parseInt(colorString[3], 16)]
}, {
  re: /^#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})$/,
  process: (colorString) => [parseInt(colorString[1], 16), parseInt(colorString[2], 16), parseInt(colorString[3], 16), Number((parseInt(colorString[4], 16) / 255).toFixed(2))]
}, {
  re: /^#([a-f0-9]{1})([a-f0-9]{1})([a-f0-9]{1})([a-f0-9]{1})$/,
  process: (colorString) => [parseInt(colorString[1] + colorString[1], 16), parseInt(colorString[2] + colorString[2], 16), parseInt(colorString[3] + colorString[3], 16), Number((parseInt(colorString[4] + colorString[4], 16) / 255).toFixed(2))]
}, {
  re: /^#([a-f0-9]{1})([a-f0-9]{1})([a-f0-9]{1})$/,
  process: (colorString) => [parseInt(colorString[1] + colorString[1], 16), parseInt(colorString[2] + colorString[2], 16), parseInt(colorString[3] + colorString[3], 16)]
}, {
  re: /^hsv\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
  process(colorString) {
    const h = parseInt(colorString[1], 10);
    const s = parseInt(colorString[2], 10);
    const v = parseInt(colorString[3], 10);
    const rgb = hsvToRgb(h, s, v);
    return [rgb[0], rgb[1], rgb[2], 1, [h, s, v]];
  }
}, {
  re: /^hsl\((\d{1,3}),\s*(\d{1,3}),\s*(\d{1,3})\)$/,
  process(colorString) {
    const h = parseInt(colorString[1], 10);
    const s = parseInt(colorString[2], 10);
    const l = parseInt(colorString[3], 10);
    const rgb = hslToRgb(h, s, l);
    return [rgb[0], rgb[1], rgb[2], 1, null, [h, s, l]];
  }
}];
var _round = Math.round;
function Color(value) {
  this.baseColor = value;
  let color;
  if (value) {
    color = String(value).toLowerCase().replace(/ /g, "");
    color = standardColorNames[color] ? `#${standardColorNames[color]}` : color;
    color = parseColor(color);
  }
  if (!color) {
    this.colorIsInvalid = true;
  }
  color = color || {};
  this.r = normalize(color[0]);
  this.g = normalize(color[1]);
  this.b = normalize(color[2]);
  this.a = normalize(color[3], 1, 1);
  if (color[4]) {
    this.hsv = {
      h: color[4][0],
      s: color[4][1],
      v: color[4][2]
    };
  } else {
    this.hsv = toHsvFromRgb(this.r, this.g, this.b);
  }
  if (color[5]) {
    this.hsl = {
      h: color[5][0],
      s: color[5][1],
      l: color[5][2]
    };
  } else {
    this.hsl = toHslFromRgb(this.r, this.g, this.b);
  }
}
function parseColor(color) {
  if ("transparent" === color) {
    return [0, 0, 0, 0];
  }
  let i = 0;
  const ii = standardColorTypes.length;
  let str;
  for (; i < ii; ++i) {
    str = standardColorTypes[i].re.exec(color);
    if (str) {
      return standardColorTypes[i].process(str);
    }
  }
  return null;
}
function normalize(colorComponent, def, max) {
  def = def || 0;
  max = max || 255;
  return colorComponent < 0 || isNaN(colorComponent) ? def : colorComponent > max ? max : colorComponent;
}
function toHexFromRgb(r, g, b) {
  return `#${(16777216 | r << 16 | g << 8 | b).toString(16).slice(1)}`;
}
function toHsvFromRgb(r, g, b) {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const delta = max - min;
  let H;
  let S;
  let V = max;
  S = 0 === max ? 0 : 1 - min / max;
  if (max === min) {
    H = 0;
  } else {
    switch (max) {
      case r:
        H = (g - b) / delta * 60;
        if (g < b) {
          H += 360;
        }
        break;
      case g:
        H = (b - r) / delta * 60 + 120;
        break;
      case b:
        H = (r - g) / delta * 60 + 240;
    }
  }
  S *= 100;
  V *= 100 / 255;
  return {
    h: Math.round(H),
    s: Math.round(S),
    v: Math.round(V)
  };
}
function hsvToRgb(h, s, v) {
  const index = Math.floor(h % 360 / 60);
  const vMin = (100 - s) * v / 100;
  const a = h % 60 / 60 * (v - vMin);
  const vInc = vMin + a;
  const vDec = v - a;
  let r;
  let g;
  let b;
  switch (index) {
    case 0:
      r = v;
      g = vInc;
      b = vMin;
      break;
    case 1:
      r = vDec;
      g = v;
      b = vMin;
      break;
    case 2:
      r = vMin;
      g = v;
      b = vInc;
      break;
    case 3:
      r = vMin;
      g = vDec;
      b = v;
      break;
    case 4:
      r = vInc;
      g = vMin;
      b = v;
      break;
    case 5:
      r = v;
      g = vMin;
      b = vDec;
  }
  return [Math.round(2.55 * r), Math.round(2.55 * g), Math.round(2.55 * b)];
}
function calculateHue(r, g, b, delta) {
  const max = Math.max(r, g, b);
  switch (max) {
    case r:
      return (g - b) / delta + (g < b ? 6 : 0);
    case g:
      return (b - r) / delta + 2;
    case b:
      return (r - g) / delta + 4;
    default:
      return;
  }
}
function toHslFromRgb(r, g, b) {
  r = convertTo01Bounds(r, 255);
  g = convertTo01Bounds(g, 255);
  b = convertTo01Bounds(b, 255);
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const maxMinSum = max + min;
  let h;
  let s;
  const l = maxMinSum / 2;
  if (max === min) {
    h = s = 0;
  } else {
    const delta = max - min;
    if (l > 0.5) {
      s = delta / (2 - maxMinSum);
    } else {
      s = delta / maxMinSum;
    }
    h = calculateHue(r, g, b, delta);
    h /= 6;
  }
  return {
    h: _round(360 * h),
    s: _round(100 * s),
    l: _round(100 * l)
  };
}
function makeColorTint(colorPart, h) {
  let colorTint = h;
  if ("r" === colorPart) {
    colorTint = h + 1 / 3;
  }
  if ("b" === colorPart) {
    colorTint = h - 1 / 3;
  }
  return colorTint;
}
function modifyColorTint(colorTint) {
  if (colorTint < 0) {
    colorTint += 1;
  }
  if (colorTint > 1) {
    colorTint -= 1;
  }
  return colorTint;
}
function hueToRgb(p, q, colorTint) {
  colorTint = modifyColorTint(colorTint);
  if (colorTint < 1 / 6) {
    return p + 6 * (q - p) * colorTint;
  }
  if (colorTint < 0.5) {
    return q;
  }
  if (colorTint < 2 / 3) {
    return p + (q - p) * (2 / 3 - colorTint) * 6;
  }
  return p;
}
function hslToRgb(h, s, l) {
  let r;
  let g;
  let b;
  h = convertTo01Bounds(h, 360);
  s = convertTo01Bounds(s, 100);
  l = convertTo01Bounds(l, 100);
  if (0 === s) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hueToRgb(p, q, makeColorTint("r", h));
    g = hueToRgb(p, q, makeColorTint("g", h));
    b = hueToRgb(p, q, makeColorTint("b", h));
  }
  return [_round(255 * r), _round(255 * g), _round(255 * b)];
}
function convertTo01Bounds(n, max) {
  n = Math.min(max, Math.max(0, parseFloat(n)));
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  return n % max / parseFloat(max);
}
function isIntegerBetweenMinAndMax(number, min, max) {
  min = min || 0;
  max = max || 255;
  if (number % 1 !== 0 || number < min || number > max || "number" !== typeof number || isNaN(number)) {
    return false;
  }
  return true;
}
Color.prototype = {
  constructor: Color,
  highlight(step) {
    step = step || 10;
    return this.alter(step).toHex();
  },
  darken(step) {
    step = step || 10;
    return this.alter(-step).toHex();
  },
  alter(step) {
    const result = new Color();
    result.r = normalize(this.r + step);
    result.g = normalize(this.g + step);
    result.b = normalize(this.b + step);
    return result;
  },
  blend(blendColor, opacity) {
    const other = blendColor instanceof Color ? blendColor : new Color(blendColor);
    const result = new Color();
    result.r = normalize(_round(this.r * (1 - opacity) + other.r * opacity));
    result.g = normalize(_round(this.g * (1 - opacity) + other.g * opacity));
    result.b = normalize(_round(this.b * (1 - opacity) + other.b * opacity));
    return result;
  },
  toHex() {
    return toHexFromRgb(this.r, this.g, this.b);
  },
  getPureColor() {
    const rgb = hsvToRgb(this.hsv.h, 100, 100);
    return new Color(`rgb(${rgb.join(",")})`);
  },
  isValidHex: (hex) => /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(hex),
  isValidRGB(r, g, b) {
    if (!isIntegerBetweenMinAndMax(r) || !isIntegerBetweenMinAndMax(g) || !isIntegerBetweenMinAndMax(b)) {
      return false;
    }
    return true;
  },
  isValidAlpha(a) {
    if (isNaN(a) || a < 0 || a > 1 || "number" !== typeof a) {
      return false;
    }
    return true;
  },
  colorIsInvalid: false,
  fromHSL(hsl) {
    const color = new Color();
    const rgb = hslToRgb(hsl.h, hsl.s, hsl.l);
    color.r = rgb[0];
    color.g = rgb[1];
    color.b = rgb[2];
    return color;
  }
};
var m_color_default = Color;

// node_modules/devextreme/esm/color.js
var color_default = m_color_default;

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/smartPaste.js
var SmartPasteCommand = class _SmartPasteCommand extends BaseCommand {
  static toTyped(values, desiredType, fieldName) {
    const errorValue = JSON.stringify(values);
    const single = values.length <= 1 ? values[0] : void 0;
    const arr = values.length > 1 ? values : void 0;
    if (!single && !arr) {
      return;
    }
    switch (desiredType) {
      case "color":
        if (new color_default(single).colorIsInvalid) {
          throw ui_errors_default.Error("E1064", fieldName, errorValue, "color");
        }
        return single;
      case "boolean":
        if ("true" === single) {
          return true;
        }
        if ("false" === single) {
          return false;
        }
        throw ui_errors_default.Error("E1064", fieldName, errorValue, "boolean");
      case "string":
        if (!single) {
          throw ui_errors_default.Error("E1064", fieldName, errorValue, "string");
        }
        return single;
      case "stringArray":
        if (!arr) {
          throw ui_errors_default.Error("E1064", fieldName, errorValue, "string array");
        }
        return arr;
      case "number":
        if (void 0 === single || !Number.isFinite(parseFloat(single))) {
          throw ui_errors_default.Error("E1064", fieldName, errorValue, "number");
        }
        return parseFloat(single);
      case "numberRange": {
        if (!arr || arr.length > 2) {
          throw ui_errors_default.Error("E1064", fieldName, errorValue, "number range");
        }
        const numbers = arr.map((v) => parseFloat(v));
        if (!numbers.every(Number.isFinite)) {
          throw ui_errors_default.Error("E1064", fieldName, errorValue, "number range");
        }
        return [numbers[0], numbers[1]];
      }
      case "date":
        if (!dateUtilsTs.isValidDate(single)) {
          throw ui_errors_default.Error("E1064", fieldName, errorValue, "date");
        }
        return new Date(single);
      case "dateRange":
        if (!arr || arr.length > 2 || !arr.every(dateUtilsTs.isValidDate)) {
          throw ui_errors_default.Error("E1064", fieldName, errorValue, "date range");
        }
        return arr.map((v) => new Date(v));
      default:
        return arr ?? single;
    }
  }
  getTemplateName() {
    return "smartPaste";
  }
  buildPromptData(params) {
    const fieldsInstructions = this.generateFieldsInstructions(params.fields);
    return {
      user: {
        text: params.text,
        fields: fieldsInstructions
      }
    };
  }
  parseResult(response, params) {
    const result = [];
    response.split(";;;").forEach((data) => {
      if (!data) {
        return;
      }
      const [name, ...rawValues] = data.split(":::");
      const values = rawValues.map((value2) => value2.trim());
      const fieldParams = params.fields.find((v) => v.name === name);
      const value = _SmartPasteCommand.toTyped(values, null === fieldParams || void 0 === fieldParams ? void 0 : fieldParams.type, null === fieldParams || void 0 === fieldParams ? void 0 : fieldParams.name);
      if (value) {
        result.push({
          name,
          value
        });
      }
    });
    return result;
  }
  generateFieldsInstructions(fields) {
    const fieldData = fields.map((field) => {
      const instruction = field.instruction ?? "";
      return `fieldName: ${field.name}, format: ${field.format}${instruction ? `, instruction: ${instruction}` : ""}`;
    });
    return fieldData.join(";;;");
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/summarize.js
var SummarizeCommand = class extends BaseCommand {
  getTemplateName() {
    return "summarize";
  }
  buildPromptData(params) {
    return {
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/translate.js
var TranslateCommand = class extends BaseCommand {
  getTemplateName() {
    return "translate";
  }
  buildPromptData(params) {
    return {
      system: {
        lang: params.lang
      },
      user: {
        text: params.text
      }
    };
  }
  parseResult(response) {
    return response;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/templates/index.js
var templates = {
  changeStyle: {
    system: "Rewrite the text provided to match the {{writingStyle}} writing style. Ensure the rewritten text follows the grammatical rules and stylistic conventions of the specified style. Preserve the original meaning and context. Use complete sentences and a professional tone. Return answer with no markdown formatting."
  },
  changeTone: {
    system: "Rewrite the following text to keep its original meaning but change its tone to {{tone}}. Provide only the rewritten text as plain text without any comments or formatting."
  },
  execute: {
    system: "Return answer with no markdown formatting."
  },
  expand: {
    system: "Expand the following text by adding relevant details, examples, and context while keeping the main point intact. Ensure the expanded text is coherent and logically structured. Return answer with no markdown formatting."
  },
  proofread: {
    system: "Proofread the following text for grammar, punctuation, and style errors. Make corrections to ensure clarity and conciseness while preserving the original meaning. Use a formal writing style unless otherwise specified. Return only the revised text without any formatting or explanations."
  },
  shorten: {
    system: "Please shorten the text provided by summarizing its content while retaining the main point and essential details. Aim to reduce the text to approximately 50% of its original length. Ensure that the key message remains clear and intact. Return answer with no markdown formatting."
  },
  summarize: {
    system: "First, identify the key points of the provided text. Then, generate an abstractive summary by paraphrasing these points, ensuring the summary captures the core ideas and is approximately 20% of the text's length. Return answer with no markdown formatting."
  },
  translate: {
    system: "Translate the text provided into {{lang}}. Ensure the translation retains the original meaning and tone. Provide only the translated text in your response, without any additional formatting or commentary."
  },
  smartPaste: {
    system: "You are a helpful assistant that helps to fill fields based on the text provided. You will get a text and a list of fields that should be filled using info from the text. It can include the name of field, suitable format, optionally some additional instruction about what it should include. You need to return data for all the fields in the following format without any preamble, introduction, or explanatory text: {fieldName}:::{fieldValue};;;{fieldName}:::{fieldValue} and so on, where {fieldName} - is a variable for a field name and {fieldValue} - is a variable for a string to fill. If there is no info to fill, field value should be empty (like Name:::;;;)- do not use placeholders like (empty), N/A, null, or similar. Only fill in date fields if a complete date is explicitly present. If the date is missing or incomplete, leave the field empty.",
    user: "Text: {{text}}. Fields: {{fields}}."
  },
  generateGridColumn: {
    system: `You are a helpful AI assistant that generates values for a new column in a dataset, based on a given user instruction and existing row data. Input: A user prompt that describes what should be generated. A dataset in the format: { "rowKey1": {column1: value1, column2: value2, ...}, "rowKey2": {...}, ... }. Task: Generate a single value for each row that satisfies the user's prompt, using the provided row data as context. Instructions: Output your result strictly in this format: { "rowKey1": "generatedValue1", "rowKey2": "generatedValue2", ... }. The output must be a valid JSON string, directly parsable by JSON.parse. Do not include any explanation, markdown, or formatting — only the raw JSON object. If a value cannot be generated for a specific row, assign an empty string ("") for that row. Example Output: { "rowKey1": "valueA", "rowKey2": "" }. You must follow this output format exactly. Any deviation will result in a parsing error.`,
    user: "User prompt text: {{text}}. Dataset: {{data}}."
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/core/prompt_manager.js
var ERROR_MESSAGES = {
  TEMPLATE_NOT_FOUND: "Template not found"
};
var PromptManager = class {
  constructor() {
    this.templates = new Map(Object.entries(templates));
  }
  buildPrompt(templateName, data) {
    const template = this.templates.get(templateName);
    if (!template) {
      throw new Error(ERROR_MESSAGES.TEMPLATE_NOT_FOUND);
    }
    const system = this.generateMessage(template.system, data.system);
    const user = this.generateMessage(template.user, data.user);
    const prompt = {
      system,
      user
    };
    return prompt;
  }
  generateMessage(promptTemplate, placeholders) {
    if (!placeholders && !promptTemplate) {
      return;
    }
    if (!promptTemplate && placeholders) {
      return Object.keys(placeholders).reduce((acc, key) => `${acc} ${placeholders[key]}`, "").trim();
    }
    if (!placeholders && promptTemplate) {
      return promptTemplate;
    }
    const result = this.replacePlaceholders(promptTemplate, placeholders);
    return result;
  }
  replacePlaceholders(promptTemplate, placeholders) {
    const result = Object.entries(placeholders).reduce((acc, _ref) => {
      let [key, value] = _ref;
      return acc.replaceAll(`{{${key}}}`, value);
    }, promptTemplate);
    return result;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/core/request_manager.js
var RequestManager = class {
  constructor(provider) {
    this.provider = provider;
    this.validateProvider();
  }
  validateProvider() {
    if ("function" !== typeof this.provider.sendRequest) {
      throw errors_default.Error("E0122");
    }
  }
  sendRequest(prompt, callbacks, data) {
    let aborted = false;
    const params = {
      prompt,
      data,
      onChunk: (chunk) => {
        if (!aborted) {
          var _callbacks$onChunk;
          null === callbacks || void 0 === callbacks || null === (_callbacks$onChunk = callbacks.onChunk) || void 0 === _callbacks$onChunk || _callbacks$onChunk.call(callbacks, chunk);
        }
      }
    };
    const {
      promise,
      abort: abortRequest
    } = this.provider.sendRequest(params);
    promise.then((response) => {
      if (!aborted) {
        var _callbacks$onComplete;
        null === callbacks || void 0 === callbacks || null === (_callbacks$onComplete = callbacks.onComplete) || void 0 === _callbacks$onComplete || _callbacks$onComplete.call(callbacks, response);
      }
    }).catch((e) => {
      if (!aborted) {
        var _callbacks$onError;
        null === callbacks || void 0 === callbacks || null === (_callbacks$onError = callbacks.onError) || void 0 === _callbacks$onError || _callbacks$onError.call(callbacks, e);
      }
    });
    return () => {
      aborted = true;
      null === abortRequest || void 0 === abortRequest || abortRequest();
    };
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/commands/generateGridColumn.js
var GenerateGridColumnCommand = class extends BaseCommand {
  getTemplateName() {
    return "generateGridColumn";
  }
  buildPromptData(params) {
    const dataDescription = this.generateDataDescription(params.data);
    return {
      user: {
        text: params.text,
        data: dataDescription
      }
    };
  }
  parseResult(response) {
    if ("string" === typeof response) {
      if ("" === response) {
        return {
          data: {}
        };
      }
      return {
        data: JSON.parse(response)
      };
    }
    const data = "string" === typeof response.data ? JSON.parse(response.data) : response.data;
    return {
      data
    };
  }
  generateDataDescription(data) {
    const result = JSON.stringify(data);
    return result;
  }
};

// node_modules/devextreme/esm/__internal/core/ai_integration/core/ai_integration.js
var CommandNames;
!(function(CommandNames2) {
  CommandNames2.ChangeStyle = "changeStyle";
  CommandNames2.ChangeTone = "changeTone";
  CommandNames2.Execute = "execute";
  CommandNames2.Expand = "expand";
  CommandNames2.Proofread = "proofread";
  CommandNames2.Shorten = "shorten";
  CommandNames2.Summarize = "summarize";
  CommandNames2.Translate = "translate";
  CommandNames2.SmartPaste = "smartPaste";
  CommandNames2.GenerateGridColumn = "generateGridColumn";
})(CommandNames || (CommandNames = {}));
var COMMANDS = {
  [CommandNames.ChangeStyle]: ChangeStyleCommand,
  [CommandNames.ChangeTone]: ChangeToneCommand,
  [CommandNames.Execute]: ExecuteCommand,
  [CommandNames.Expand]: ExpandCommand,
  [CommandNames.Proofread]: ProofreadCommand,
  [CommandNames.Shorten]: ShortenCommand,
  [CommandNames.Summarize]: SummarizeCommand,
  [CommandNames.Translate]: TranslateCommand,
  [CommandNames.SmartPaste]: SmartPasteCommand,
  [CommandNames.GenerateGridColumn]: GenerateGridColumnCommand
};
var AIIntegration = class {
  constructor(provider) {
    this.promptManager = new PromptManager();
    this.requestManager = new RequestManager(provider);
    this.commands = /* @__PURE__ */ new Map();
  }
  executeCommand(commandName, params, callbacks) {
    let command = this.commands.get(commandName);
    if (!command) {
      const Command = COMMANDS[commandName];
      command = new Command(this.promptManager, this.requestManager);
      this.commands.set(commandName, command);
    }
    return command.execute(params, callbacks);
  }
  changeStyle(params, callbacks) {
    return this.executeCommand(CommandNames.ChangeStyle, params, callbacks);
  }
  changeTone(params, callbacks) {
    return this.executeCommand(CommandNames.ChangeTone, params, callbacks);
  }
  execute(params, callbacks) {
    return this.executeCommand(CommandNames.Execute, params, callbacks);
  }
  expand(params, callbacks) {
    return this.executeCommand(CommandNames.Expand, params, callbacks);
  }
  proofread(params, callbacks) {
    return this.executeCommand(CommandNames.Proofread, params, callbacks);
  }
  shorten(params, callbacks) {
    return this.executeCommand(CommandNames.Shorten, params, callbacks);
  }
  summarize(params, callbacks) {
    return this.executeCommand(CommandNames.Summarize, params, callbacks);
  }
  translate(params, callbacks) {
    return this.executeCommand(CommandNames.Translate, params, callbacks);
  }
  smartPaste(params, callbacks) {
    return this.executeCommand(CommandNames.SmartPaste, params, callbacks);
  }
  generateGridColumn(params, callbacks) {
    return this.executeCommand(CommandNames.GenerateGridColumn, params, callbacks);
  }
};

export {
  color_default,
  AIIntegration
};
//# sourceMappingURL=chunk-Y4YJHRQW.js.map
