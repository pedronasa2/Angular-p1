import {
  load_indicator_default2 as load_indicator_default
} from "./chunk-UZPV5REL.js";
import {
  DxComponent,
  DxIntegrationModule,
  DxTemplateHost,
  DxTemplateModule,
  NestedOptionHost,
  WatcherHelper
} from "./chunk-GVQ7VOQO.js";
import {
  Component,
  ElementRef,
  Inject,
  Input,
  NgModule,
  NgZone,
  Output,
  PLATFORM_ID,
  TransferState,
  setClassMetadata,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdirectiveInject
} from "./chunk-G3Y3JP6Z.js";

// node_modules/devextreme-angular/fesm2022/devextreme-angular-ui-load-indicator.mjs
var DxLoadIndicatorComponent = class _DxLoadIndicatorComponent extends DxComponent {
  instance = null;
  /**
   * Specifies the animation type for LoadIndicator.
  
   */
  get animationType() {
    return this._getOption("animationType");
  }
  set animationType(value) {
    this._setOption("animationType", value);
  }
  /**
   * Specifies the global attributes to be attached to the UI component&apos;s container element.
  
   */
  get elementAttr() {
    return this._getOption("elementAttr");
  }
  set elementAttr(value) {
    this._setOption("elementAttr", value);
  }
  /**
   * Specifies the UI component&apos;s height.
  
   */
  get height() {
    return this._getOption("height");
  }
  set height(value) {
    this._setOption("height", value);
  }
  /**
   * Specifies text for a hint that appears when a user pauses on the UI component.
  
   */
  get hint() {
    return this._getOption("hint");
  }
  set hint(value) {
    this._setOption("hint", value);
  }
  /**
   * Specifies the path to a custom load indicator image.
  
   */
  get indicatorSrc() {
    return this._getOption("indicatorSrc");
  }
  set indicatorSrc(value) {
    this._setOption("indicatorSrc", value);
  }
  /**
   * Switches the UI component to a right-to-left representation.
  
   */
  get rtlEnabled() {
    return this._getOption("rtlEnabled");
  }
  set rtlEnabled(value) {
    this._setOption("rtlEnabled", value);
  }
  /**
   * Specifies whether the UI component is visible.
  
   */
  get visible() {
    return this._getOption("visible");
  }
  set visible(value) {
    this._setOption("visible", value);
  }
  /**
   * Specifies the UI component&apos;s width.
  
   */
  get width() {
    return this._getOption("width");
  }
  set width(value) {
    this._setOption("width", value);
  }
  /**
  
   * A function that is executed when the UI component is rendered and each time the component is repainted.
  
  
   */
  onContentReady;
  /**
  
   * A function that is executed before the UI component is disposed of.
  
  
   */
  onDisposing;
  /**
  
   * A function used in JavaScript frameworks to save the UI component instance.
  
  
   */
  onInitialized;
  /**
  
   * A function that is executed after a UI component property is changed.
  
  
   */
  onOptionChanged;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  animationTypeChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  elementAttrChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  heightChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  hintChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  indicatorSrcChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  rtlEnabledChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  visibleChange;
  /**
  
   * This member supports the internal infrastructure and is not intended to be used directly from your code.
  
   */
  widthChange;
  constructor(elementRef, ngZone, templateHost, _watcherHelper, optionHost, transferState, platformId) {
    super(elementRef, ngZone, templateHost, _watcherHelper, transferState, platformId);
    this._createEventEmitters([{
      subscribe: "contentReady",
      emit: "onContentReady"
    }, {
      subscribe: "disposing",
      emit: "onDisposing"
    }, {
      subscribe: "initialized",
      emit: "onInitialized"
    }, {
      subscribe: "optionChanged",
      emit: "onOptionChanged"
    }, {
      emit: "animationTypeChange"
    }, {
      emit: "elementAttrChange"
    }, {
      emit: "heightChange"
    }, {
      emit: "hintChange"
    }, {
      emit: "indicatorSrcChange"
    }, {
      emit: "rtlEnabledChange"
    }, {
      emit: "visibleChange"
    }, {
      emit: "widthChange"
    }]);
    optionHost.setHost(this);
  }
  _createInstance(element, options) {
    return new load_indicator_default(element, options);
  }
  ngOnDestroy() {
    this._destroyWidget();
  }
  /** @nocollapse */
  static ɵfac = function DxLoadIndicatorComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxLoadIndicatorComponent)(ɵɵdirectiveInject(ElementRef), ɵɵdirectiveInject(NgZone), ɵɵdirectiveInject(DxTemplateHost), ɵɵdirectiveInject(WatcherHelper), ɵɵdirectiveInject(NestedOptionHost), ɵɵdirectiveInject(TransferState), ɵɵdirectiveInject(PLATFORM_ID));
  };
  /** @nocollapse */
  static ɵcmp = ɵɵdefineComponent({
    type: _DxLoadIndicatorComponent,
    selectors: [["dx-load-indicator"]],
    hostAttrs: ["ngSkipHydration", "true"],
    inputs: {
      animationType: "animationType",
      elementAttr: "elementAttr",
      height: "height",
      hint: "hint",
      indicatorSrc: "indicatorSrc",
      rtlEnabled: "rtlEnabled",
      visible: "visible",
      width: "width"
    },
    outputs: {
      onContentReady: "onContentReady",
      onDisposing: "onDisposing",
      onInitialized: "onInitialized",
      onOptionChanged: "onOptionChanged",
      animationTypeChange: "animationTypeChange",
      elementAttrChange: "elementAttrChange",
      heightChange: "heightChange",
      hintChange: "hintChange",
      indicatorSrcChange: "indicatorSrcChange",
      rtlEnabledChange: "rtlEnabledChange",
      visibleChange: "visibleChange",
      widthChange: "widthChange"
    },
    features: [ɵɵProvidersFeature([DxTemplateHost, WatcherHelper, NestedOptionHost]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function DxLoadIndicatorComponent_Template(rf, ctx) {
    },
    dependencies: [DxIntegrationModule],
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxLoadIndicatorComponent, [{
    type: Component,
    args: [{
      selector: "dx-load-indicator",
      standalone: true,
      template: "",
      host: {
        ngSkipHydration: "true"
      },
      imports: [DxIntegrationModule],
      providers: [DxTemplateHost, WatcherHelper, NestedOptionHost]
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
    type: NestedOptionHost
  }, {
    type: TransferState
  }, {
    type: void 0,
    decorators: [{
      type: Inject,
      args: [PLATFORM_ID]
    }]
  }], {
    animationType: [{
      type: Input
    }],
    elementAttr: [{
      type: Input
    }],
    height: [{
      type: Input
    }],
    hint: [{
      type: Input
    }],
    indicatorSrc: [{
      type: Input
    }],
    rtlEnabled: [{
      type: Input
    }],
    visible: [{
      type: Input
    }],
    width: [{
      type: Input
    }],
    onContentReady: [{
      type: Output
    }],
    onDisposing: [{
      type: Output
    }],
    onInitialized: [{
      type: Output
    }],
    onOptionChanged: [{
      type: Output
    }],
    animationTypeChange: [{
      type: Output
    }],
    elementAttrChange: [{
      type: Output
    }],
    heightChange: [{
      type: Output
    }],
    hintChange: [{
      type: Output
    }],
    indicatorSrcChange: [{
      type: Output
    }],
    rtlEnabledChange: [{
      type: Output
    }],
    visibleChange: [{
      type: Output
    }],
    widthChange: [{
      type: Output
    }]
  });
})();
var DxLoadIndicatorModule = class _DxLoadIndicatorModule {
  /** @nocollapse */
  static ɵfac = function DxLoadIndicatorModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DxLoadIndicatorModule)();
  };
  /** @nocollapse */
  static ɵmod = ɵɵdefineNgModule({
    type: _DxLoadIndicatorModule,
    imports: [DxLoadIndicatorComponent, DxIntegrationModule, DxTemplateModule],
    exports: [DxLoadIndicatorComponent, DxTemplateModule]
  });
  /** @nocollapse */
  static ɵinj = ɵɵdefineInjector({
    imports: [DxLoadIndicatorComponent, DxIntegrationModule, DxTemplateModule, DxTemplateModule]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(DxLoadIndicatorModule, [{
    type: NgModule,
    args: [{
      imports: [DxLoadIndicatorComponent, DxIntegrationModule, DxTemplateModule],
      exports: [DxLoadIndicatorComponent, DxTemplateModule]
    }]
  }], null, null);
})();

export {
  DxLoadIndicatorComponent,
  DxLoadIndicatorModule
};
//# sourceMappingURL=chunk-LW6CMLTK.js.map
