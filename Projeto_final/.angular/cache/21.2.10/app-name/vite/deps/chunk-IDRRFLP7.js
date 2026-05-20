import {
  DataSource,
  normalizeDataSourceOptions
} from "./chunk-LD66THDH.js";
import {
  Deferred,
  extend,
  noop
} from "./chunk-CPBGCP6I.js";

// node_modules/devextreme/esm/__internal/ui/collection/m_data_controller.js
var DataControllerMock = {
  load: () => Deferred().reject(),
  loadSingle: () => Deferred().reject(),
  loadFromStore: () => Deferred().reject(),
  loadNextPage: () => Deferred().reject(),
  loadOptions: noop,
  userData: noop,
  cancel: noop,
  cancelAll: noop,
  filter: noop,
  addSearchFilter: noop,
  group: noop,
  paginate: noop,
  pageSize: noop,
  pageIndex: noop,
  resetDataSourcePageIndex: noop,
  totalCount: noop,
  isLastPage: noop,
  isLoading: noop,
  isLoaded: noop,
  searchValue: noop,
  searchOperation: noop,
  searchExpr: noop,
  select: noop,
  key: noop,
  keyOf: noop,
  store: noop,
  items: noop,
  applyMapFunction: noop,
  getDataSource: noop,
  reload: noop,
  on: noop,
  off: noop
};
var DataController = class {
  constructor(dataSource) {
    if (!dataSource) {
      return DataControllerMock;
    }
    this._dataSource = dataSource;
  }
  load() {
    return this._dataSource.load();
  }
  loadSingle(propName, propValue) {
    if (arguments.length < 2) {
      propValue = propName;
      propName = this.key();
    }
    return this._dataSource.loadSingle(propName, propValue);
  }
  loadFromStore(loadOptions) {
    return this.store().load(loadOptions);
  }
  loadNextPage() {
    this.pageIndex(1 + this.pageIndex());
    return this.load();
  }
  loadOptions() {
    return this._dataSource.loadOptions();
  }
  userData() {
    return this._dataSource._userData;
  }
  cancel(operationId) {
    this._dataSource.cancel(operationId);
  }
  cancelAll() {
    this._dataSource.cancelAll();
  }
  filter(filter) {
    return this._dataSource.filter(filter);
  }
  addSearchFilter(storeLoadOptions) {
    this._dataSource._addSearchFilter(storeLoadOptions);
  }
  group(group) {
    return this._dataSource.group(group);
  }
  paginate() {
    return this._dataSource.paginate();
  }
  pageSize() {
    return this._dataSource._pageSize;
  }
  pageIndex(pageIndex) {
    return this._dataSource.pageIndex(pageIndex);
  }
  resetDataSourcePageIndex() {
    if (this.pageIndex()) {
      this.pageIndex(0);
      this.load();
    }
  }
  totalCount() {
    return this._dataSource.totalCount();
  }
  isLastPage() {
    return this._dataSource.isLastPage() || !this._dataSource._pageSize;
  }
  isLoading() {
    return this._dataSource.isLoading();
  }
  isLoaded() {
    return this._dataSource.isLoaded();
  }
  searchValue(value) {
    if (!arguments.length) {
      return this._dataSource.searchValue();
    }
    return this._dataSource.searchValue(value);
  }
  searchOperation(operation) {
    return this._dataSource.searchOperation(operation);
  }
  searchExpr(expr) {
    if (!arguments.length) {
      return this._dataSource.searchExpr();
    }
    return this._dataSource.searchExpr(expr);
  }
  select() {
    return this._dataSource.select(...arguments);
  }
  key() {
    return this._dataSource.key();
  }
  keyOf(item) {
    return this.store().keyOf(item);
  }
  store() {
    return this._dataSource.store();
  }
  items() {
    return this._dataSource.items();
  }
  applyMapFunction(data) {
    return this._dataSource._applyMapFunction(data);
  }
  getDataSource() {
    return this._dataSource || null;
  }
  reload() {
    return this._dataSource.reload();
  }
  on(event, handler) {
    this._dataSource.on(event, handler);
  }
  off(event, handler) {
    this._dataSource.off(event, handler);
  }
};
var m_data_controller_default = DataController;

// node_modules/devextreme/esm/__internal/data/m_data_helper.js
var DATA_SOURCE_CHANGED_METHOD = "_dataSourceChangedHandler";
var SPECIFIC_DATA_SOURCE_OPTION = "_getSpecificDataSourceOption";
var NORMALIZE_DATA_SOURCE = "_normalizeDataSource";
var DataHelperMixin = {
  postCtor() {
    this.on("disposing", () => {
      this._disposeDataSource();
    });
  },
  _refreshDataSource() {
    this._initDataSource();
    this._loadDataSource();
  },
  _initDataSource() {
    let dataSourceOptions = SPECIFIC_DATA_SOURCE_OPTION in this ? this[SPECIFIC_DATA_SOURCE_OPTION]() : this.option("dataSource");
    let widgetDataSourceOptions;
    let dataSourceType;
    this._disposeDataSource();
    if (dataSourceOptions) {
      if (dataSourceOptions instanceof DataSource) {
        this._isSharedDataSource = true;
        this._dataSource = dataSourceOptions;
      } else {
        widgetDataSourceOptions = "_dataSourceOptions" in this ? this._dataSourceOptions() : {};
        dataSourceType = this._dataSourceType ? this._dataSourceType() : DataSource;
        dataSourceOptions = normalizeDataSourceOptions(dataSourceOptions, {
          fromUrlLoadMode: "_dataSourceFromUrlLoadMode" in this && this._dataSourceFromUrlLoadMode()
        });
        this._dataSource = new dataSourceType(extend(true, {}, widgetDataSourceOptions, dataSourceOptions));
      }
      if (NORMALIZE_DATA_SOURCE in this) {
        this._dataSource = this[NORMALIZE_DATA_SOURCE](this._dataSource);
      }
      this._addDataSourceHandlers();
      this._initDataController();
    }
  },
  _initDataController() {
    var _this$option;
    const dataController = null === (_this$option = this.option) || void 0 === _this$option ? void 0 : _this$option.call(this, "_dataController");
    const dataSource = this._dataSource;
    if (dataController) {
      this._dataController = dataController;
    } else {
      this._dataController = new m_data_controller_default(dataSource);
    }
  },
  _addDataSourceHandlers() {
    if (DATA_SOURCE_CHANGED_METHOD in this) {
      this._addDataSourceChangeHandler();
    }
    if ("_dataSourceLoadErrorHandler" in this) {
      this._addDataSourceLoadErrorHandler();
    }
    if ("_dataSourceLoadingChangedHandler" in this) {
      this._addDataSourceLoadingChangedHandler();
    }
    this._addReadyWatcher();
  },
  _addReadyWatcher() {
    this.readyWatcher = function(isLoading) {
      this._ready && this._ready(!isLoading);
    }.bind(this);
    this._dataSource.on("loadingChanged", this.readyWatcher);
  },
  _addDataSourceChangeHandler() {
    const dataSource = this._dataSource;
    this._proxiedDataSourceChangedHandler = function(e) {
      this[DATA_SOURCE_CHANGED_METHOD](dataSource.items(), e);
    }.bind(this);
    dataSource.on("changed", this._proxiedDataSourceChangedHandler);
  },
  _addDataSourceLoadErrorHandler() {
    this._proxiedDataSourceLoadErrorHandler = this._dataSourceLoadErrorHandler.bind(this);
    this._dataSource.on("loadError", this._proxiedDataSourceLoadErrorHandler);
  },
  _addDataSourceLoadingChangedHandler() {
    this._proxiedDataSourceLoadingChangedHandler = this._dataSourceLoadingChangedHandler.bind(this);
    this._dataSource.on("loadingChanged", this._proxiedDataSourceLoadingChangedHandler);
  },
  _loadDataSource() {
    const dataSource = this._dataSource;
    if (dataSource) {
      if (dataSource.isLoaded()) {
        this._proxiedDataSourceChangedHandler && this._proxiedDataSourceChangedHandler();
      } else {
        dataSource.load();
      }
    }
  },
  _loadSingle(key, value) {
    key = "this" === key ? this._dataSource.key() || "this" : key;
    return this._dataSource.loadSingle(key, value);
  },
  _isLastPage() {
    return !this._dataSource || this._dataSource.isLastPage() || !this._dataSource._pageSize;
  },
  _isDataSourceLoading() {
    return this._dataSource && this._dataSource.isLoading();
  },
  _disposeDataSource() {
    if (this._dataSource) {
      if (this._isSharedDataSource) {
        delete this._isSharedDataSource;
        this._proxiedDataSourceChangedHandler && this._dataSource.off("changed", this._proxiedDataSourceChangedHandler);
        this._proxiedDataSourceLoadErrorHandler && this._dataSource.off("loadError", this._proxiedDataSourceLoadErrorHandler);
        this._proxiedDataSourceLoadingChangedHandler && this._dataSource.off("loadingChanged", this._proxiedDataSourceLoadingChangedHandler);
        if (this._dataSource._eventsStrategy) {
          this._dataSource._eventsStrategy.off("loadingChanged", this.readyWatcher);
        }
      } else {
        this._dataSource.dispose();
      }
      delete this._dataSource;
      delete this._proxiedDataSourceChangedHandler;
      delete this._proxiedDataSourceLoadErrorHandler;
      delete this._proxiedDataSourceLoadingChangedHandler;
    }
  },
  getDataSource() {
    return this._dataSource || null;
  }
};
var m_data_helper_default = DataHelperMixin;

export {
  m_data_controller_default,
  DataHelperMixin,
  m_data_helper_default
};
//# sourceMappingURL=chunk-IDRRFLP7.js.map
