/// <reference path="../typings/index.d.ts" />
var CustomExtensions;
(function (CustomExtensions) {
    var CustomDashboardPanelExtension = (function () {
        function CustomDashboardPanelExtension(_dashboardControl) {
            var _this = this;
            this._dashboardControl = _dashboardControl;
            this.name = "custom-dashboard-panel";
            this._customTemplate = {
                name: "dashboard-custom-panel-extension",
                data: this
            };
            this.panelWidth = 250;
            this.visible = ko.observable(false);
            this.allowSwitchToDesigner = ko.observable(true);
            this.selectedItemKeys = ko.observableArray();
            this.availableDashboards = ko.observableArray();
            this.showPanelAsync = function (options) {
                var def = $.Deferred();
                _this.visible(true);
                setTimeout(function () {
                    options.surfaceLeft = _this.panelWidth;
                    def.resolve(options);
                }, 500);
                return def.promise();
            };
            this.hidePanelAsync = function (options) {
                var def = $.Deferred();
                _this.visible(false);
                setTimeout(function () {
                    options.surfaceLeft = 0;
                    def.resolve(options);
                }, 500);
                return def.promise();
            };
            this.switchToViewer = function () {
                _this._dashboardControl.switchToViewer();
                _this.updateDashboardsList();
            };
            this.switchToDesigner = function () {
                _this._dashboardControl.switchToDesigner();
            };
            this._toolbarElement = new DevExpress.Dashboard.DashboardToolbarGroup("viewer-button", "", 100);
            var toViewerItem = new DevExpress.Dashboard.DashboardToolbarItem("toviewer", function () { return _this.switchToViewer(); });
            toViewerItem.template = "dashboard-custom-panel-extension-viewer-button";
            toViewerItem.disabled = ko.pureComputed(function () { return !!_this._dashboardControl.dashboard(); });
            this.allowSwitchToDesigner(_dashboardControl.allowSwitchToDesigner);
            this._toolbarElement.items.push(toViewerItem);
            this.desingerToViewerAction = {
                orderNo: 60,
                action: this.showPanelAsync
            };
            this.viewerToDesignerAction = {
                orderNo: 20,
                action: this.hidePanelAsync
            };
            this.visible(!this._dashboardControl.isDesignMode());
            this.selectedItemKeys.subscribe(function (value) {
                if (value.length) {
                    var newDashboardId = value[0];
                    if (_this._dashboardControl.dashboardContainer() && _this._dashboardControl.dashboardContainer().id != newDashboardId) {
                        _this._dashboardControl.loadDashboard(newDashboardId);
                    }
                }
            });
        }
        CustomDashboardPanelExtension.prototype.start = function () {
            var _this = this;
            this._dashboardControl.customTemplates.push(this._customTemplate);
            var extension = this._dashboardControl.findExtension("toolbox");
            if (extension) {
                extension.toolbarGroups.push(this._toolbarElement);
            }
            this._dashboardControl.dashboardContainer.subscribe(function (dashboardContainer) {
                if (dashboardContainer) {
                    _this._validateSelection(dashboardContainer, _this.availableDashboards());
                }
            });
            this.availableDashboards.subscribe(function (avaliableDashboards) {
                return _this._validateSelection(_this._dashboardControl.dashboardContainer(), avaliableDashboards);
            });
            if (!this._dashboardControl.isDesignMode()) {
                this._dashboardControl.surfaceLeft(this.panelWidth);
            }
            this.left = ko.computed(function () { return _this.visible() ? 0 : -_this.panelWidth; });
            this.updateDashboardsList();
        };
        CustomDashboardPanelExtension.prototype.stop = function () {
            var extension = this._dashboardControl.findExtension("toolbox");
            if (extension) {
                extension.toolbarGroups.remove(this._toolbarElement);
            }
            this._dashboardControl.customTemplates.remove(this._customTemplate);
        };
        CustomDashboardPanelExtension.prototype.updateDashboardsList = function () {
            var _this = this;
            var dashboardContainer = this._dashboardControl.dashboardContainer();
            this._dashboardControl.requestDashboardList().done(function (availableDashboards) {
                _this.availableDashboards(availableDashboards);
            });
        };
        CustomDashboardPanelExtension.prototype._validateSelection = function (dashboardContainer, avaliableDashboards) {
            if (dashboardContainer) {
                var dashboardInfo = avaliableDashboards.filter(function (info) { return info.id === dashboardContainer.id; })[0];
                if (dashboardInfo) {
                    this.selectedItemKeys([dashboardInfo.id]);
                }
            }
        };
        return CustomDashboardPanelExtension;
    }());
    CustomExtensions.CustomDashboardPanelExtension = CustomDashboardPanelExtension;
})(CustomExtensions || (CustomExtensions = {}));
