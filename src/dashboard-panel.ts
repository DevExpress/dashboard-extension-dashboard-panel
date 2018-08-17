/// <reference path="../typings/index.d.ts" />

module CustomExtensions {
    export class CustomDashboardPanelExtension implements DevExpress.Dashboard.IExtension {
        name = "custom-dashboard-panel";

        private _toolbarElement;
        private _customTemplate;
        private _iconBack = 'dx-dashboard-back';
        private _dashboardsButtonName = 'Dashboards';
        private _flexParent = 'dx-dashboard-flex-parent';
        private _dashboardsButton = 'dx-dashboards-button';
        private _dashboardTruncated = 'dx-dashboard-truncated';
        private _ellipsisText = 'dx-dashboard-ellipsis';
        private _itemTemplate = ko.observable<string>();
        private _isMobile = ko.observable<boolean>(false);
        private _disposables: KnockoutSubscription[] = [];

        panelWidth = 250;
        visible = ko.observable(false);
        allowSwitchToDesigner = ko.observable<boolean>(true);

        designerToViewerAction: DevExpress.Dashboard.ISequenceAction;
        viewerToDesignerAction: DevExpress.Dashboard.ISequenceAction;
        selectedItemKeys = ko.observableArray<string>();
        availableDashboards = ko.observableArray<DevExpress.Dashboard.DashboardInfo>();

        private _actualPanelWidth = ko.observable<number>(this.panelWidth);

        private _left = ko.computed(() => {
            return this.visible() ? 0 : -this._actualPanelWidth();
        });

        constructor(private _dashboardControl: any, private options: DashboardPanelExtensionOptions = {}) {
            this._toolbarElement = new DevExpress.Dashboard.DashboardToolbarGroup("viewer-button", "", 100);
            var toViewerItem = new DevExpress.Dashboard.DashboardToolbarItem("toviewer", () => this.switchToViewer());
            toViewerItem.template = "dashboard-custom-panel-extension-viewer-button";
            toViewerItem.disabled = ko.pureComputed(() => !!this._dashboardControl.dashboard());


            this._toolbarElement.items.push(toViewerItem);

            this.designerToViewerAction = {
                orderNo: 60,
                action: this.showPanelAsync
            }
            this.viewerToDesignerAction = {
                orderNo: 20,
                action: this.hidePanelAsync
            }

            this.selectedItemKeys.subscribe(value => {
                if(value.length) {
                    var newDashboardId = value[0];
                    if(!this._dashboardControl.dashboardContainer() || this._dashboardControl.dashboardContainer().id !== newDashboardId) {
                        this._dashboardControl.loadDashboard(newDashboardId);
                    }
                }
            });
        }

        start() {
            var mobileExtension = <DevExpress.Dashboard.MobileLayoutExtension>this._dashboardControl.findExtension("mobile-layout");
            this._isMobile(mobileExtension && mobileExtension.mobileLayoutEnabled());

            mobileExtension.mobileLayoutEnabled.subscribe(() => {
                this.stop();
                this.start();
            })

            if(this._isMobile())
                this.allowSwitchToDesigner(false);
            else if(this.allowSwitchToDesigner() === undefined) {
                this.allowSwitchToDesigner(this._dashboardControl.allowSwitchToDesigner);
            }
            this.visible(this._isMobile() ? false : !this._dashboardControl.isDesignMode());
            this._itemTemplate(this._getTemplateName());
            if(this._isMobile()) {
                this._actualPanelWidth($(window).width());
                DevExpress.devices.on('orientationChanged', (e) => {
                    this._actualPanelWidth($(window).width());
                });
            }

            this._customTemplate = this._getCustomTemplate();
            this._dashboardControl.customTemplates.push(this._customTemplate);

            var extension = <DevExpress.Dashboard.ToolboxExtension>this._dashboardControl.findExtension("toolbox");
            if(extension) {
                extension.toolbarGroups.push(this._toolbarElement);
            }

            this._disposables.push(this._dashboardControl.dashboardContainer.subscribe(dashboardContainer => {
                if(dashboardContainer) {
                    this._validateSelection(dashboardContainer, this.availableDashboards())
                }
            }));
            this._disposables.push(this.availableDashboards.subscribe(avaliableDashboards =>
                this._validateSelection(this._dashboardControl.dashboardContainer(), avaliableDashboards)));

            if(this._isMobile()) {
                var api = <DevExpress.Dashboard.ViewerApiExtension>this._dashboardControl.findExtension("viewer-api");
                let originalTitleUpdatedHangler = api._options.onDashboardTitleToolbarUpdated;
                api._options.onDashboardTitleToolbarUpdated = (args) => {
                    args.options.navigationItems.push({
                        type: 'button',
                        template: () => {
                            return $('<div/>')
                                .addClass([this._flexParent, this._ellipsisText].join(' '))
                                .append($('<svg><use xlink:href="#' + this._iconBack + '" /></svg>'))
                                .append($('<div/>').text(this._dashboardsButtonName).addClass([this._dashboardsButton, this._dashboardTruncated].join(' ')));
                        },
                        click: () => {
                            this.showPanelAsync({ surfaceLeft: this._actualPanelWidth() });
                        }
                    });
                    originalTitleUpdatedHangler.call(this, args);
                };
            }

            if(!this._dashboardControl.isDesignMode()) {
                this._dashboardControl.surfaceLeft(this._isMobile() ? 0 : this.panelWidth);
            }

            this.updateDashboardsList();
        }

        stop() {
            this._disposables.forEach(d => d.dispose());
            this._disposables = [];
            var extension = <DevExpress.Dashboard.ToolboxExtension>this._dashboardControl.findExtension("toolbox");
            if(extension) {
                extension.toolbarGroups.remove(this._toolbarElement);
            }
            this._dashboardControl.customTemplates.remove(this._customTemplate);
        }

        updateDashboardsList() {
            var dashboardContainer = this._dashboardControl.dashboardContainer();
            let options = this.options;
            this._dashboardControl.requestDashboardList().done((availableDashboards: Array<DevExpress.Dashboard.DashboardInfo>) => {
                this.availableDashboards(availableDashboards.map(dashboard => new PanelExtensionDashboardInfo(
                    dashboard.id,
                    dashboard.name,
                    options.dashboardThumbnail ? (<any>DevExpress.utils).string.format(options.dashboardThumbnail, dashboard.id) : undefined)));
            });
        }
        private _validateSelection(dashboardContainer: DevExpress.Dashboard.IDashboardContainer, avaliableDashboards: DevExpress.Dashboard.DashboardInfo[]) {
            if(dashboardContainer) {
                var dashboardInfo = avaliableDashboards.filter(info => info.id === dashboardContainer.id)[0];
                if(dashboardInfo) {
                    this.selectedItemKeys([dashboardInfo.id]);
                }
            }
        }
        private _getTemplateName() {
            if(this._isMobile()) {
                return this.options.dashboardThumbnail ? 'dashboard-preview' : 'dashboard-card-view';
            }
            return 'dashboard-list-item';
        }
        private _hidePanel() {
            if(this._isMobile()) {
                this.hidePanelAsync({ surfaceLeft: 0 });
            }
        }
        showPanelAsync = (options: DevExpress.Dashboard.IWorkingModeSwitchingOptions) => {
            var def = $.Deferred();
            this.visible(true);
            this.updateDashboardsList();
            setTimeout(() => {
                options.surfaceLeft = this.panelWidth;
                def.resolve(options);
            }, 500);
            return def.promise();
        }
        hidePanelAsync = (options: DevExpress.Dashboard.IWorkingModeSwitchingOptions) => {
            var def = $.Deferred();
            this.visible(false);
            setTimeout(() => {
                options.surfaceLeft = 0;
                def.resolve(options);
            }, 500);
            return def.promise();
        }
        switchToViewer = (): void => {
            this._dashboardControl.switchToViewer();
        }
        switchToDesigner = (): void => {
            this._dashboardControl.switchToDesigner();
        }
        private _getCustomTemplate() {
            return {
                name: "dashboard-custom-panel-extension",
                data: {
                    panelWidth: this._actualPanelWidth,
                    allowSwitchToDesigner: this.allowSwitchToDesigner,
                    left: this._left,
                    selectedItemKeys: this.selectedItemKeys,
                    availableDashboards: this.availableDashboards,
                    itemTemplate: this._itemTemplate,
                    isMobile: this._isMobile,
                    hidePanel: () => { this._hidePanel(); },
                    switchToDesigner: this.switchToDesigner,
                    switchToViewer: this.switchToViewer
                }
            };
        }
    }

    export interface DashboardPanelExtensionOptions {
        dashboardThumbnail?: string;
    }

    class PanelExtensionDashboardInfo implements DevExpress.Dashboard.DashboardInfo {
        hidden = ko.observable<boolean>(false);

        constructor(public id: string,
            public name: string,
            public imageUrl?: string) {
        }

        hide() {
            this.hidden(true);
        }
    }
}