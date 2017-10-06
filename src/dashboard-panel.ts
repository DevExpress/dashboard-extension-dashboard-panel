/// <reference path="../typings/index.d.ts" />

module CustomExtensions {
    export class CustomDashboardPanelExtension implements DevExpress.Dashboard.IExtension {
        name = "custom-dashboard-panel";

        private _toolbarElement;
        private _customTemplate = {
            name: "dashboard-custom-panel-extension",
            data: this
        }

        panelWidth = 250;
        visible = ko.observable(false);
        allowSwitchToDesigner = ko.observable<boolean>(true);

        desingerToViewerAction: DevExpress.Dashboard.ISequenceAction;
        viewerToDesignerAction: DevExpress.Dashboard.ISequenceAction;
        left: KnockoutComputed<number>;
        selectedItemKeys = ko.observableArray<string>();
        availableDashboards = ko.observableArray<DevExpress.Dashboard.IDashboardInfo>();


        constructor(private _dashboardControl: any) {
            this._toolbarElement = new DevExpress.Dashboard.DashboardToolbarGroup("viewer-button", "", 100);
            var toViewerItem = new DevExpress.Dashboard.DashboardToolbarItem("toviewer", () => this.switchToViewer());
            toViewerItem.template = "dashboard-custom-panel-extension-viewer-button";
            toViewerItem.disabled = ko.pureComputed(() => !!this._dashboardControl.dashboard());

            this.allowSwitchToDesigner(_dashboardControl.params.workingMode !== "ViewerOnly");

            this._toolbarElement.items.push(toViewerItem);

            this.desingerToViewerAction = {
                orderNo: 60,
                action: this.showPanelAsync
            }
            this.viewerToDesignerAction = {
                orderNo: 20,
                action: this.hidePanelAsync
            }

            this.visible(!this._dashboardControl.isDesignMode());

            this.selectedItemKeys.subscribe(value => {
                if(value.length) {
                    var newDashboardId = value[0];
                    if(this._dashboardControl.dashboardContainer()&&this._dashboardControl.dashboardContainer().id!=newDashboardId) {
                        this._dashboardControl.loadDashboard(newDashboardId);
                    }
                }
            });
        }

        start() {
            this._dashboardControl.customTemplates.push(this._customTemplate);

            var extension = <DevExpress.Dashboard.ToolboxExtension>this._dashboardControl.findExtension("toolbox");
            if(extension) {
                extension.toolbarGroups.push(this._toolbarElement);
            }

            this._dashboardControl.dashboardContainer.subscribe(dashboardContainer => {
                if(dashboardContainer) {
                    this._validateSelection(dashboardContainer, this.availableDashboards())
                }
            });
            this.availableDashboards.subscribe(avaliableDashboards =>
                this._validateSelection(this._dashboardControl.dashboardContainer(), avaliableDashboards));

            if(!this._dashboardControl.isDesignMode()) {
                this._dashboardControl.surfaceLeft(this.panelWidth);
            }
            this.left = ko.computed(() => this.visible() ? 0 : -this.panelWidth);

            this.updateDashboardsList();
        }

        stop() {
            var extension = <DevExpress.Dashboard.ToolboxExtension>this._dashboardControl.findExtension("toolbox");
            if(extension) {
                extension.toolbarGroups.remove(this._toolbarElement);
            }
            this._dashboardControl.customTemplates.remove(this._customTemplate);
        }

        updateDashboardsList() {
            var dashboardContainer = this._dashboardControl.dashboardContainer();
            this._dashboardControl.requestDashboardList().done((availableDashboards: Array<DevExpress.Dashboard.IDashboardInfo>) => {
                this.availableDashboards(availableDashboards);
            });
        }
        private _validateSelection(dashboardContainer: DevExpress.Dashboard.IDashboardContainer, avaliableDashboards: DevExpress.Dashboard.IDashboardInfo[]) {
            if(dashboardContainer) {
                var dashboardInfo = avaliableDashboards.filter(info => info.id === dashboardContainer.id)[0];
                if(dashboardInfo) {
                    this.selectedItemKeys([dashboardInfo.id]);
                }
            }
        }

        showPanelAsync = (options: DevExpress.Dashboard.IWorkingModeSwitchingOptions) => {
            var def = $.Deferred();
            this.visible(true);
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
            this.updateDashboardsList();
        }
        switchToDesigner = (): void => {
            this._dashboardControl.switchToDesigner();
        }
    }
}