import {
  PROPERTY_TOKEN_buttons
} from "./chunk-5SOYEOJI.js";
import {
  CollectionNestedOption,
  DxIntegrationModule,
  DxTemplateHost,
  NestedOption,
  NestedOptionHost,
  extractTemplate
} from "./chunk-2IQ2ZJDO.js";
import {
  Component,
  DOCUMENT,
  ElementRef,
  Host,
  Inject,
  Input,
  NgModule,
  Renderer2,
  SkipSelf,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject,
  ɵɵprojection,
  ɵɵprojectionDef
} from "./chunk-G3Y3JP6Z.js";

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-text-box-nested.mjs
var _c0 = ["*"];
var DxiTextBoxButtonComponent = class _DxiTextBoxButtonComponent extends CollectionNestedOption {
  get location() {
    return this._getOption("location");
  }
  set location(value) {
    this._setOption("location", value);
  }
  get name() {
    return this._getOption("name");
  }
  set name(value) {
    this._setOption("name", value);
  }
  get options() {
    return this._getOption("options");
  }
  set options(value) {
    this._setOption("options", value);
  }
  get _optionPath() {
    return "buttons";
  }
  constructor(parentOptionHost, optionHost) {
    super();
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
  }
  ngOnDestroy() {
    this._deleteRemovedOptions(this._fullOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxiTextBoxButtonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiTextBoxButtonComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxiTextBoxButtonComponent,
    selectors: [["dxi-text-box-button"]],
    inputs: {
      location: "location",
      name: "name",
      options: "options"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, {
      provide: PROPERTY_TOKEN_buttons,
      useExisting: _DxiTextBoxButtonComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxiTextBoxButtonComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiTextBoxButtonComponent, [{
    type: Component,
    args: [{
      selector: "dxi-text-box-button",
      standalone: true,
      template: "",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, {
        provide: PROPERTY_TOKEN_buttons,
        useExisting: DxiTextBoxButtonComponent
      }]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }], {
    location: [{
      type: Input
    }],
    name: [{
      type: Input
    }],
    options: [{
      type: Input
    }]
  });
})();
var DxiTextBoxButtonModule = class _DxiTextBoxButtonModule {
  /** @nocollapse */
  static ɵfac = function DxiTextBoxButtonModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxiTextBoxButtonModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxiTextBoxButtonModule,
    imports: [DxiTextBoxButtonComponent],
    exports: [DxiTextBoxButtonComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxiTextBoxButtonComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxiTextBoxButtonModule, [{
    type: NgModule,
    args: [{
      imports: [DxiTextBoxButtonComponent],
      exports: [DxiTextBoxButtonComponent]
    }]
  }], null, null);
})();
var DxoTextBoxOptionsComponent = class _DxoTextBoxOptionsComponent extends NestedOption {
  renderer;
  document;
  element;
  get accessKey() {
    return this._getOption("accessKey");
  }
  set accessKey(value) {
    this._setOption("accessKey", value);
  }
  get activeStateEnabled() {
    return this._getOption("activeStateEnabled");
  }
  set activeStateEnabled(value) {
    this._setOption("activeStateEnabled", value);
  }
  get disabled() {
    return this._getOption("disabled");
  }
  set disabled(value) {
    this._setOption("disabled", value);
  }
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
  }
  get focusStateEnabled() {
    return this._getOption("focusStateEnabled");
  }
  set focusStateEnabled(value) {
    this._setOption("focusStateEnabled", value);
  }
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  get hoverStateEnabled() {
    return this._getOption("hoverStateEnabled");
  }
  set hoverStateEnabled(value) {
    this._setOption("hoverStateEnabled", value);
  }
  get icon() {
    return this._getOption("icon");
  }
  set icon(value) {
    this._setOption("icon", value);
  }
  get onClick() {
    return this._getOption("onClick");
  }
  set onClick(value) {
    this._setOption("onClick", value);
  }
  get onContentReady() {
    return this._getOption("onContentReady");
  }
  set onContentReady(value) {
    this._setOption("onContentReady", value);
  }
  get onDisposing() {
    return this._getOption("onDisposing");
  }
  set onDisposing(value) {
    this._setOption("onDisposing", value);
  }
  get onInitialized() {
    return this._getOption("onInitialized");
  }
  set onInitialized(value) {
    this._setOption("onInitialized", value);
  }
  get onOptionChanged() {
    return this._getOption("onOptionChanged");
  }
  set onOptionChanged(value) {
    this._setOption("onOptionChanged", value);
  }
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  get stylingMode() {
    return this._getOption("stylingMode");
  }
  set stylingMode(value) {
    this._setOption("stylingMode", value);
  }
  get tabIndex() {
    return this._getOption("tabIndex");
  }
  set tabIndex(value) {
    this._setOption("tabIndex", value);
  }
  get template() {
    return this._getOption("template");
  }
  set template(value) {
    this._setOption("template", value);
  }
  get text() {
    return this._getOption("text");
  }
  set text(value) {
    this._setOption("text", value);
  }
  get type() {
    return this._getOption("type");
  }
  set type(value) {
    this._setOption("type", value);
  }
  get useSubmitBehavior() {
    return this._getOption("useSubmitBehavior");
  }
  set useSubmitBehavior(value) {
    this._setOption("useSubmitBehavior", value);
  }
  get validationGroup() {
    return this._getOption("validationGroup");
  }
  set validationGroup(value) {
    this._setOption("validationGroup", value);
  }
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  get _optionPath() {
    return "options";
  }
  constructor(parentOptionHost, optionHost, renderer, document, templateHost, element) {
    super();
    this.renderer = renderer;
    this.document = document;
    this.element = element;
    parentOptionHost.setNestedOption(this);
    optionHost.setHost(this, this._fullOptionPath.bind(this));
    templateHost.setHost(this);
  }
  setTemplate(template) {
    this.template = template;
  }
  ngAfterViewInit() {
    extractTemplate(this, this.element, this.renderer, this.document);
  }
  ngOnInit() {
    this._addRecreatedComponent();
  }
  ngOnDestroy() {
    this._addRemovedOption(this._getOptionPath());
  }
  /** @nocollapse */
  static ɵfac = function DxoTextBoxOptionsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoTextBoxOptionsComponent)(ɵɵdirectiveInject(NestedOptionHost, 5), ɵɵdirectiveInject(NestedOptionHost, 1), ɵɵdirectiveInject(Renderer2), ɵɵdirectiveInject(DOCUMENT), ɵɵdirectiveInject(DxTemplateHost, 1), ɵɵdirectiveInject(ElementRef));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxoTextBoxOptionsComponent,
    selectors: [["dxo-text-box-options"]],
    inputs: {
      accessKey: "accessKey",
      activeStateEnabled: "activeStateEnabled",
      disabled: "disabled",
      elementAttr: "elementAttr",
      focusStateEnabled: "focusStateEnabled",
      height: "height",
      hint: "hint",
      hoverStateEnabled: "hoverStateEnabled",
      icon: "icon",
      onClick: "onClick",
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      rtlEnabled: "rtlEnabled",
      stylingMode: "stylingMode",
      tabIndex: "tabIndex",
      template: "template",
      text: "text",
      type: "type",
      useSubmitBehavior: "useSubmitBehavior",
      validationGroup: "validationGroup",
      visible: "visible",
      width: "width"
    },
    features: [ɵɵProvidersFeature([NestedOptionHost, DxTemplateHost]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function DxoTextBoxOptionsComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    dependencies: [DxIntegrationModule],
    styles: ["[_nghost-%COMP%]{display:block}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoTextBoxOptionsComponent, [{
    type: Component,
    args: [{
      selector: "dxo-text-box-options",
      standalone: true,
      template: "<ng-content></ng-content>",
      imports: [DxIntegrationModule],
      providers: [NestedOptionHost, DxTemplateHost],
      styles: [":host{display:block}\n"]
    }]
  }], () => [{
    type: NestedOptionHost,
    decorators: [{
      type: SkipSelf
    }, {
      type: Host
    }]
  }, {
    type: NestedOptionHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: Renderer2
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [DOCUMENT]
    }]
  }, {
    type: DxTemplateHost,
    decorators: [{
      type: Host
    }]
  }, {
    type: ElementRef
  }], {
    accessKey: [{
      type: Input
    }],
    activeStateEnabled: [{
      type: Input
    }],
    disabled: [{
      type: Input
    }],
    elementAttr: [{
      type: Input
    }],
    focusStateEnabled: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    hoverStateEnabled: [{
      type: Input
    }],
    icon: [{
      type: Input
    }],
    onClick: [{
      type: Input
    }],
    onContentReady: [{
      type: Input
    }],
    onDisposing: [{
      type: Input
    }],
    onInitialized: [{
      type: Input
    }],
    onOptionChanged: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    stylingMode: [{
      type: Input
    }],
    tabIndex: [{
      type: Input
    }],
    template: [{
      type: Input
    }],
    text: [{
      type: Input
    }],
    type: [{
      type: Input
    }],
    useSubmitBehavior: [{
      type: Input
    }],
    validationGroup: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }]
  });
})();
var DxoTextBoxOptionsModule = class _DxoTextBoxOptionsModule {
  /** @nocollapse */
  static ɵfac = function DxoTextBoxOptionsModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxoTextBoxOptionsModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxoTextBoxOptionsModule,
    imports: [DxoTextBoxOptionsComponent],
    exports: [DxoTextBoxOptionsComponent]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxoTextBoxOptionsComponent]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxoTextBoxOptionsModule, [{
    type: NgModule,
    args: [{
      imports: [DxoTextBoxOptionsComponent],
      exports: [DxoTextBoxOptionsComponent]
    }]
  }], null, null);
})();

export {
  DxiTextBoxButtonComponent,
  DxiTextBoxButtonModule,
  DxoTextBoxOptionsComponent,
  DxoTextBoxOptionsModule
};
//# sourceMappingURL=chunk-GPE4YB2N.js.map
