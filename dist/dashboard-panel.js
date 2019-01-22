/// <reference path="../typings/index.d.ts" />
var CustomExtensions;
(function (CustomExtensions) {
    var CustomDashboardPanelExtension = (function () {
        function CustomDashboardPanelExtension(_dashboardControl, options) {
            if (options === void 0) { options = {}; }
            var _this = this;
            this._dashboardControl = _dashboardControl;
            this.options = options;
            this.name = "custom-dashboard-panel";
            this._iconBack = 'dx-dashboard-back';
            this._dashboardsButtonName = 'Dashboards';
            this._flexParent = 'dx-dashboard-flex-parent';
            this._dashboardsButton = 'dx-dashboards-button';
            this._dashboardTruncated = 'dx-dashboard-truncated';
            this._ellipsisText = 'dx-dashboard-ellipsis';
            this._itemTemplate = ko.observable();
            this._isMobile = ko.observable(false);
            this._disposables = [];
            this.panelWidth = 250;
            this.visible = ko.observable(false);
            this.allowSwitchToDesigner = ko.observable(true);
            this.selectedItemKeys = ko.observableArray();
            this.availableDashboards = ko.observableArray();
            this._actualPanelWidth = ko.observable();
            this._left = ko.computed(function () {
                return _this.visible() ? 0 : -_this._actualPanelWidth();
            });
            this.showPanelAsync = function (options) {
                var def = $.Deferred();
                _this.visible(true);
                _this.updateDashboardsList();
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
            };
            this.switchToDesigner = function () {
                _this._dashboardControl.switchToDesigner();
            };
            this._toolbarElement = new DevExpress.Dashboard.DashboardToolbarGroup("viewer-button", "", 100);
            var toViewerItem = new DevExpress.Dashboard.DashboardToolbarItem("toviewer", function () { return _this.switchToViewer(); });
            toViewerItem.template = "dashboard-custom-panel-extension-viewer-button";
            toViewerItem.disabled = ko.pureComputed(function () { return !!_this._dashboardControl.dashboard(); });
            this._toolbarElement.items.push(toViewerItem);
            this.designerToViewerAction = {
                orderNo: 60,
                action: this.showPanelAsync
            };
            this.viewerToDesignerAction = {
                orderNo: 20,
                action: this.hidePanelAsync
            };
        }
        CustomDashboardPanelExtension.prototype.start = function () {
            var _this = this;
            var mobileExtension = this._dashboardControl.findExtension("mobile-layout");
            this._isMobile(mobileExtension && mobileExtension.mobileLayoutEnabled());
            mobileExtension.mobileLayoutEnabled.subscribe(function () {
                _this.stop();
                _this.start();
            });
            if (this._isMobile())
                this.allowSwitchToDesigner(false);
            else if (this.allowSwitchToDesigner() === undefined) {
                this.allowSwitchToDesigner(this._dashboardControl.allowSwitchToDesigner);
            }
            this.visible(this._isMobile() ? false : !this._dashboardControl.isDesignMode());
            this._itemTemplate(this._getTemplateName());
            if (this._isMobile()) {
                this._actualPanelWidth($(window).width());
                DevExpress.devices.on('orientationChanged', function (e) {
                    _this._actualPanelWidth($(window).width());
                });
            }
            else {
                this._actualPanelWidth(this.panelWidth);
            }
            this._customTemplate = this._getCustomTemplate();
            this._dashboardControl.customTemplates.push(this._customTemplate);
            var extension = this._dashboardControl.findExtension("toolbox");
            if (extension) {
                extension.toolbarGroups.push(this._toolbarElement);
            }
            this._disposables.push(this._dashboardControl.dashboardContainer.subscribe(function (dashboardContainer) {
                if (dashboardContainer) {
                    _this._validateSelection(dashboardContainer, _this.availableDashboards());
                }
            }));
            if (this._isMobile()) {
                var api = this._dashboardControl.findExtension("viewer-api");
                var originalTitleUpdatedHangler_1 = api._options.onDashboardTitleToolbarUpdated;
                api._options.onDashboardTitleToolbarUpdated = function (args) {
                    args.options.navigationItems.push({
                        type: 'button',
                        template: function () {
                            return $('<div/>')
                                .addClass([_this._flexParent, _this._ellipsisText].join(' '))
                                .append($('<svg><use xlink:href="#' + _this._iconBack + '" /></svg>'))
                                .append($('<div/>').text(_this._dashboardsButtonName).addClass([_this._dashboardsButton, _this._dashboardTruncated].join(' ')));
                        },
                        click: function () {
                            _this.showPanelAsync({ surfaceLeft: _this._actualPanelWidth() });
                        }
                    });
                    originalTitleUpdatedHangler_1.call(_this, args);
                };
            }
            if (!this._dashboardControl.isDesignMode()) {
                this._dashboardControl.surfaceLeft(this._isMobile() ? 0 : this.panelWidth);
            }
            this.updateDashboardsList();
        };
        CustomDashboardPanelExtension.prototype.stop = function () {
            this._disposables.forEach(function (d) { return d.dispose(); });
            this._disposables = [];
            var extension = this._dashboardControl.findExtension("toolbox");
            if (extension) {
                extension.toolbarGroups.remove(this._toolbarElement);
            }
            this._dashboardControl.customTemplates.remove(this._customTemplate);
        };
        CustomDashboardPanelExtension.prototype.updateDashboardsList = function () {
            var _this = this;
            var dashboardContainer = this._dashboardControl.dashboardContainer();
            var options = this.options;
            this._dashboardControl.requestDashboardList().done(function (availableDashboards) {
                _this.availableDashboards(availableDashboards.map(function (dashboard) { return new PanelExtensionDashboardInfo(dashboard.id, dashboard.name, options.dashboardThumbnail ? DevExpress.utils.string.format(options.dashboardThumbnail, dashboard.id) : undefined); }));
                _this._validateSelection(_this._dashboardControl.dashboardContainer(), _this.availableDashboards());
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
        CustomDashboardPanelExtension.prototype._getTemplateName = function () {
            if (this._isMobile()) {
                return this.options.dashboardThumbnail ? 'dashboard-preview' : 'dashboard-card-view';
            }
            return 'dashboard-list-item';
        };
        CustomDashboardPanelExtension.prototype._hidePanel = function () {
            if (this._isMobile()) {
                this.hidePanelAsync({ surfaceLeft: 0 });
            }
        };
        CustomDashboardPanelExtension.prototype._getCustomTemplate = function () {
            var _this = this;
            var listOptions = {
                noDataText: '',
                keyExpr: 'id',
                selectionMode: 'single',
                itemTemplate: this._itemTemplate,
                activeStateEnabled: false,
                selectedItemKeys: this.selectedItemKeys,
                onItemClick: function () { _this._hidePanel(); },
                searchEnabled: this._isMobile,
                searchExpr: 'id',
                hoverStateEnabled: !this._isMobile,
                focusStateEnabled: !this._isMobile,
                searchEditorOptions: {
                    placeholder: DevExpress.Designer.getLocalization('DashboardWebStringId.Search')
                },
                onOptionChanged: function (e) {
                    if (e.name === 'selectedItemKeys' && _this.selectedItemKeys().length > 0) {
                        var selectedItem = _this.availableDashboards().filter(function (item) { return item.id === _this.selectedItemKeys()[0]; })[0];
                        e.component.scrollToItem(_this.availableDashboards().indexOf(selectedItem));
                    }
                },
                onSelectionChanged: function (e) {
                    var newDashboardId = e.addedItems[0].id;
                    if (!_this._dashboardControl.dashboardContainer() || _this._dashboardControl.dashboardContainer().id !== newDashboardId) {
                        _this._dashboardControl.loadDashboard(newDashboardId);
                    }
                }
            };
            $.extend(listOptions, this._isMobile() ? { dataSource: this.availableDashboards } : { items: this.availableDashboards });
            return {
                name: "dashboard-custom-panel-extension",
                data: {
                    panelWidth: this._actualPanelWidth,
                    allowSwitchToDesigner: this.allowSwitchToDesigner,
                    left: this._left,
                    isMobile: this._isMobile,
                    hidePanel: function () { _this._hidePanel(); },
                    switchToDesigner: this.switchToDesigner,
                    switchToViewer: this.switchToViewer,
                    listOptions: listOptions
                }
            };
        };
        return CustomDashboardPanelExtension;
    }());
    CustomExtensions.CustomDashboardPanelExtension = CustomDashboardPanelExtension;
    var PanelExtensionDashboardInfo = (function () {
        function PanelExtensionDashboardInfo(id, name, imageUrl) {
            this.id = id;
            this.name = name;
            this.imageUrl = imageUrl;
            this.hidden = ko.observable(false);
        }
        PanelExtensionDashboardInfo.prototype.hide = function () {
            this.hidden(true);
        };
        return PanelExtensionDashboardInfo;
    }());
})(CustomExtensions || (CustomExtensions = {}));
