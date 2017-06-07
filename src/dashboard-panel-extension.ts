/// <reference path="../typings/index.d.ts" />

module DevExpress.Dashboard {
    /*# public class DashboardPanelExtension: IExtension #*/
    export class DashboardPanelExtension implements IExtension {
        name = "dashboard-panel";

        private _toolbarElement;
        private _customTemplate = {
            name: "dx-dashboard-working-mode-extension",
            data: this
        }

        /*# public int panelWidth { get { return 0; } set { ; } } #*/
        panelWidth = 250;
        /*# public KnockoutObservableBoolean visible { get { return null; } set { ; } } #*/
        visible = ko.observable(false);
        /*# public KnockoutObservableBoolean allowSwitchToDesigner { get { return null; } set { ; } } #*/
        allowSwitchToDesigner = ko.observable<boolean>(true);

        desingerToViewerAction: ISequenceAction;
        viewerToDesignerAction: ISequenceAction;
        left: KnockoutComputed<number>;
        selectedItemKeys = ko.observableArray<string>();
        availableDashboards = ko.observableArray<IDashboardInfo>();


        constructor(private _dashboardControl: any) {
            this._toolbarElement = new DashboardToolbarGroup("viewer-button", "", 100);
            var toViewerItem = new DashboardToolbarItem("toviewer", () => this.switchToViewer());
            toViewerItem.template = "dx-dashboard-working-mode-extension-viewer-button";
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

            if(!this._dashboardControl.isDesignMode()) {
                this._dashboardControl.surfaceLeft(this.panelWidth);
            }
            this.visible(!this._dashboardControl.isDesignMode());

            this.selectedItemKeys.subscribe(value => {
                if(value.length) {
                    var newDashboardId = value[0];
                    if(this._dashboardControl.dashboardContainer()&&this._dashboardControl.dashboardContainer().id!=newDashboardId) {
                        this._dashboardControl.dashboardServiceClient.loadDashboard(newDashboardId);
                    }
                }
            });

            this._dashboardControl.dashboardContainer.subscribe(dashboardContainer => {
                if(dashboardContainer) {
                    this._validateSelection(dashboardContainer, this.availableDashboards())
                }
            });
            this.availableDashboards.subscribe(avaliableDashboards =>
                this._validateSelection(this._dashboardControl.dashboardContainer(), avaliableDashboards));

            this.left = ko.computed(() => this.visible() ? 0 : -this.panelWidth);
        }

        start() {
            this._dashboardControl.customTemplates.push(this._customTemplate);

            var extension = <ToolboxExtension>this._dashboardControl.findExtension("toolbox");
            if(extension) {
                extension.toolbarGroups.push(this._toolbarElement);
            }
            this.updateDashboardsList();
        }

        stop() {
            var extension = <ToolboxExtension>this._dashboardControl.findExtension("toolbox");
            if(extension) {
                extension.toolbarGroups.remove(this._toolbarElement);
            }
            this._dashboardControl.customTemplates.remove(this._customTemplate);
        }

        updateDashboardsList() {
            var dashboardContainer = this._dashboardControl.dashboardContainer();
            this._dashboardControl.dashboardServiceClient.requestDashboardList().done((availableDashboards: Array<IDashboardInfo>) => {
                this.availableDashboards(availableDashboards);
            });
        }
        private _validateSelection(dashboardContainer: IDashboardContainer, avaliableDashboards: IDashboardInfo[]) {
            if(dashboardContainer) {
                var dashboardInfo = avaliableDashboards.filter(info => info.id === dashboardContainer.id)[0];
                if(dashboardInfo) {
                    this.selectedItemKeys([dashboardInfo.id]);
                }
            }
        }

        showPanelAsync = (options: IWorkingModeSwitchingOptions) => {
            var def = $.Deferred();
            this.visible(true);
            setTimeout(() => {
                options.surfaceLeft = this.panelWidth;
                def.resolve(options);
            }, 500);
            return def.promise();
        }
        hidePanelAsync = (options: IWorkingModeSwitchingOptions) => {
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