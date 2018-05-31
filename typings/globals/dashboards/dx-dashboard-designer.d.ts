/// <reference path="../knockout/index.d.ts" />
/// <reference path="../devextreme/index.d.ts" />

declare module DevExpress.Localization {
    var addCultureInfo: (messages: Object) => void;
}

declare module DevExpress.Dashboard.Metadata {
    var editorTemplates: {
        text: {
            header: string;
        };
        bool: {
            header: string;
        };
        boolYesNo: {
            header: string;
        };
        boolVisibleHidden: {
            header: string;
        };
        boolDiscreteContinuous: {
            header: string;
        };
        checkBox: {
            custom: string;
        };
        list: {
            header: string;
        };
        numeric: {
            header: string;
        };
        gaugeScale: {
            header: string;
        };
        date: {
            header: string;
        };
        combobox: {
            header: string;
        };
        multiValueSelect: {
            header: string;
        };
        singleValueSelect: {
            header: string;
        };
        commonCollection: {
            custom: string;
        };
        objecteditor: {
            header: string;
            content: string;
        };
        image: {
            header: string;
        };
        textFile: {
            header: string;
        };
        mapShapeFile: {
            header: string;
        };
        mapAttributeFile: {
            header: string;
        };
        expression: {
            header: string;
        };
        objectsCollection: {
            custom: string;
        };
        cardTemplateCollection: {
            custom: string;
        };
        calculationWindowDataItems: {
            custom: string;
        };
        calculationWindowDefinition: {
            custom: string;
        };
        totals: {
            custom: string;
        };
        formatRules: {
            custom: string;
        };
        calculations: {
            custom: string;
        };
        styleSettings: {
            header: string;
        };
        ruleRanges: {
            custom: string;
        };
        ruleExpression: {
            custom: string;
        };
        calculationExpression: {
            custom: string;
        };
        containerTypeSelector: {
            custom: string;
        };
        guid: {
            header: string;
        };
        itemDataSource: {
            header: string;
        };
        itemDataMember: {
            header: string;
        };
        itemFieldChooser: {
            header: string;
        };
        itemFieldPicker: {
            header: string;
        };
        shapeFileAttributes: {
            header: string;
        };
        buttonGroup: {
            header: string;
        };
        radioGroup: {
            header: string;
        };
        iconTypeSelector: {
            header: string;
        };
        colorSchemeTreeViewEditor: {
            header: string;
        };
        dateSample: {
            header: string;
        };
        flowModeSettings: {
            header: string;
        };
        currency: {
            header: string;
        };
    };
}


declare module DevExpress.Utils {
    interface ISerializationInfo {
        propertyName: string;
        modelName?: string;
        defaultVal?: any;
        type?: any;
        info?: ISerializationsInfo;
        from?: (val: any, serializer?: any) => any;
        toJsonObject?: any;
        array?: boolean;
        link?: boolean;
        editor?: {
            header?: string;
            content?: string;
            editorType?: any;
        };
        displayName?: string;
        values?: {
            [key: string]: string;
        };
        valuesArray?: Array<IDisplayedValue>;
        initialize?: (viewModel: any, serilizer?: any) => void;
        validationRules?: Array<any>;
        editorOptions?: any;
        localizationId?: string;
        visible?: any;
        disabled?: any;
        valueStore?: any;
    }
    interface ISerializationsInfo extends Array<ISerializationInfo> {
    }

    interface IDisplayedValue {
        value: any;
        displayValue: string;
    }
}

declare module DevExpress.Dashboard {
    interface ICustomItemProperty extends Utils.ISerializationInfo {
        sectionName?: string;
    }
}

declare module DevExpress.Dashboard {
    interface IExtensionRegistrator {
        register(dashboardControl: any): any;
    }
    
    type KeyEventType = "keyup" | "keydown";
    interface IExtension {
        name: string;
        start?(): void;
        stop?(): void;
        processKeyEvent?(keyEventType: KeyEventType, eventArgs: JQueryKeyEventObject): boolean;
    }

    interface ICustomItemExtension extends IExtension {
        metaData: any;
        createViewerItem: (item: any, $element: JQuery, content: any) => DevExpress.Dashboard.customViewerItem;
    }

    interface ICustomDataRow {
        getColor: (property?: string) => Array<string>;
        getDisplayText: (property: string) => Array<string>;
        getValue: (property: string) => Array<any>;
    }

    interface IWorkingModeSwitchingOptions {
        surfaceLeft: number;
    }
    interface ISequenceAction {
        orderNo: number;
        action: (options: IWorkingModeSwitchingOptions) => JQueryPromise<any>;
    }
     interface IDashboardInfo {
        id: string;
        name: string;
        url: string;
    }
}


declare module DevExpress.Dashboard {
    type DataType = 'Text' | 'DateTime' | 'Bool' | 'Integer' | 'Float' | 'Double' | 'Decimal';
    type DataItemType = 'Measure' | 'Dimension';
    export interface IBindingProperty {
        propertyName: string;
        dataItemType: DataItemType;
        emptyPlaceholder: string;
        selectedPlaceholder?: string;
    }
    export interface ICustomItemBinding extends IBindingProperty {
        displayName: string;
        array: boolean;
        enableInteractivity?: boolean;
        enableColoring?: boolean;
        constraints?: {
            allowedTypes: Array<DataType>
        }
        slice?: string;
    }
    interface ICustomItemBindingValue {
        displayName: () => string;
        uniqueName: () => string;
    }


}


declare module DevExpress.Dashboard {
    interface IDashboardContainer {
        id: string;
        dashboard: any;
    }
}
declare module DevExpress.Dashboard {
    var leftPanelWidth: number;
    class DashboardMenuItem {
        id: string;
        title: string;
        index: number;
        hotKey: number;
        click: () => void;
        template: string;
        selected: KnockoutObservable<boolean>;
        disabled: KnockoutObservable<boolean>;
        hasSeparator: boolean;
        data: any;
        constructor(id: string, title: string, index: number, hotKey: number, click?: () => void);
    }
    class DashboardToolboxItem {
        name: string;
        click: (itemTypeName: string) => void;
        icon: string;
        title: string;
        type: string;
        disabled: KnockoutObservable<boolean>;
        constructor(name: string, click: (itemTypeName: string) => void, icon: string, title?: string, type?: string);
    }
    class DashboardToolbarItem {
        name: string;
        click: (itemTypeName: string) => void;
        icon: string;
        title: string;
        template: string;
        disabled: KnockoutObservable<boolean>;
        constructor(name: string, click: (itemTypeName: string) => void, icon?: string, title?: string);
    }
    class DashboardToolboxGroup {
        name: string;
        title: string;
        index: number;
        items: KnockoutObservableArray<DashboardToolboxItem>;
        constructor(name: string, title: string, index: number, ...items: Array<DashboardToolboxItem>);
    }
    class DashboardToolbarGroup {
        name: string;
        title: string;
        index: number;
        items: KnockoutObservableArray<DashboardToolbarItem>;
        constructor(name: string, title: string, index: number, ...items: Array<DashboardToolbarItem>);
    }
    class ToolboxExtension implements IExtension {
        private _designer;
        private _callbacks;
        name: string;
        template: string;
        desingerToViewerAction: ISequenceAction;
        viewerToDesignerAction: ISequenceAction;
        designerPanelLeft: KnockoutObservable<number>;
        menuVisible: KnockoutObservable<boolean>;
        menuItems: KnockoutObservableArray<DashboardMenuItem>;
        addMenuItem: (menuItem: DashboardMenuItem) => void;
        removeMenuItem: (menuItemId: any) => void;
        selectMenuItem: (menuItem: any) => void;
        toolboxGroups: KnockoutObservableArray<DashboardToolboxGroup>;
        addToolboxItem: (groupName: any, toolboxItem: any) => void;
        removeToolboxItem: (groupName: any, toolboxItemName: any) => void;
        toolbarGroups: KnockoutObservableArray<DashboardToolbarGroup>;
        addToolbarItem: (groupName: any, toolbarItem: any) => void;
        removeToolbarItem: (groupName: any, toolbarItemName: any) => void;
        menuItemsSorted: KnockoutComputed<DashboardMenuItem[]>;
        toolboxGroupsSorted: KnockoutComputed<DashboardToolboxGroup[]>;
        toolbarGroupsSorted: KnockoutComputed<DashboardToolbarGroup[]>;
        settingsForm: KnockoutObservable<{}>;
        settingsFromVisible: KnockoutComputed<boolean>;
        toggleMenu: () => void;
        closeMenu: () => void;
        menuItemClick: (menuItem: DashboardMenuItem) => void;
        panelToLeft: () => void;
        panelToRight: () => void;
        showPanelAsync: (options: IWorkingModeSwitchingOptions) => JQueryPromise<{}>;
        hidePanelAsync: (options: IWorkingModeSwitchingOptions) => JQueryPromise<{}>;
        processKeyEvent(keyEventType: KeyEventType, eventArgs: JQueryKeyEventObject): boolean;
        constructor(_designer: any, _callbacks: any);
        start(): void;
        stop(): void;
        private _createDefaultGroups();
        private _registerToolboxItem(itemTypeName, itemDescription);
        private _findGroup(groupName);
    }
}

declare module DevExpress.Dashboard.Data {
    type ItemDataAxisName = 'Default' | 'Series' | 'Argument' | 'Sparkline' | 'Column' | 'Row';
    type AxisValuesDictionary = {
        [axisName: string]: Array<PrimitiveType>;
    };
    interface ItemData {
        createTuple(values: Array<ItemDataAxisPoint> | Array<{
            axisName: ItemDataAxisName;
            value: Array<PrimitiveType>;
        }>): ItemDataAxisPointTuple;
        getAxis(axisName: ItemDataAxisName): ItemDataAxis;
        getAxisNames(): Array<ItemDataAxisName>;
        getDataMembers(): Array<string>;
        getDeltas(): Array<ItemDataDelta>;
        getDeltaValue(deltaId: string): ItemDataDeltaValue;
        getDimensions(axisName: ItemDataAxisName): Array<ItemDataDimension>;
        getMeasures(): Array<ItemDataMeasure>;
        getMeasureValue(measureId: string): ItemDataMeasureValue;
        getSlice(value: ItemDataAxisPointTuple | ItemDataAxisPoint): ItemData;
    }
    interface ItemDataAxis {
        getDimensions(): Array<ItemDataDimension>;
        getPointByUniqueValues(values: Array<PrimitiveType>): ItemDataAxisPoint;
        getPoints(): Array<ItemDataAxisPoint>;
        getPointsByDimension(dimensionId: string): Array<ItemDataAxisPoint>;
        getRootPoint(): ItemDataAxisPoint;
    }
    interface ItemDataAxisPoint {
        getAxisName(): string;
        getChildren(): Array<ItemDataAxisPoint>;
        getDimension(): ItemDataDimension;
        getDimensions(): Array<ItemDataDimension>;
        getDimensionValue(dimensionId?: string): ItemDataDimensionValue;
        getDisplayText(): string;
        getParent(): ItemDataAxisPoint;
        getUniqueValue(): PrimitiveType;
        getValue(): PrimitiveType;
    }
    interface ItemDataAxisPointTuple {
        getAxisPoint(axisName?: ItemDataAxisName): ItemDataAxisPoint;
    }
    interface ItemDataDelta {
        actualMeasureId: string;
        id: string;
        name: string;
        targetMeasureId: string;
    }
    interface ItemDataDeltaValue {
        getAbsoluteVariation(): ItemDataMeasureValue;
        getActualValue(): ItemDataMeasureValue;
        getDisplaySubValue1(): ItemDataMeasureValue;
        getDisplaySubValue2(): ItemDataMeasureValue;
        getDisplayValue(): ItemDataMeasureValue;
        getIndicatorType(): ItemDataMeasureValue;
        getIsGood(): ItemDataMeasureValue;
        getPercentOfTarget(): ItemDataMeasureValue;
        getPercentVariation(): ItemDataMeasureValue;
        getTargetValue(): ItemDataMeasureValue;
    }
    interface ItemDataDimension {
        dataMember: string;
        dateTimeGroupInterval: string;
        id: string;
        name: string;
        textGroupInterval: string;
        format: (value: any) => string;
    }
    interface ItemDataDimensionValue {
        getDisplayText(): string;
        getUniqueValue(): PrimitiveType;
        getValue(): PrimitiveType;
    }
    interface ItemDataMeasure {
        dataMember: string;
        id: string;
        name: string;
        summaryType: string;
        format: (value: any) => string;
    }
    interface ItemDataMeasureValue {
        getDisplayText(): string;
        getValue(): number;
    }
    interface RequestUnderlyingDataParameters {
        axisPoints: Array<ItemDataAxisPoint>;
        dataMembers: Array<string>;
        uniqueValuesByAxisName: AxisValuesDictionary;
        valuesByAxisName: AxisValuesDictionary;
    }
    interface ItemUnderlyingData {
        getDataMembers(): Array<string>;
        getRequestDataError(): string;
        getRowCount(): number;
        getRowValue(rowIndex: number, columnName: string): PrimitiveType;
        isDataReceived(): boolean;
    }
    interface RangeFilterSelection {
        minimum: number | Date;
        maximum: number | Date;
    }
}

declare module DevExpress.Dashboard {
    import Data = DevExpress.Dashboard.Data;
    type PrimitiveType = boolean | string | number | Date;
    interface ItemWidgetEventArgs {
        itemName: string;
        getWidget: () => DevExpress.ui.Widget | Element;
    }
    interface ItemElementCustomColorEventArgs {
        itemName: string;
        getTargetElement: () => Data.ItemDataAxisPointTuple;
        getMeasures: () => Array<Data.ItemDataMeasure>;
        getColor: () => string;
        setColor: (color: string) => void;
    }
    interface ItemVisualInteractivityEventArgs {
        itemName: string;
        getSelectionMode: () => string;
        setSelectionMode: (value: string) => void;
        isHighlightingEnabled: () => boolean;
        enableHighlighting: (value: boolean) => void;
        getTargetAxes: () => string;
        setTargetAxes: (value: boolean) => void;
        getDefaultSelection(): Array<Data.ItemDataAxisPointTuple>;
        setDefaultSelection(selection: Array<Data.ItemDataAxisPointTuple>): void;
    }
    interface ItemClickEventArgs {
        itemName: string;
        getData: () => Data.ItemData;
        getAxisPoint: () => Data.ItemDataAxisPoint;
        getMeasures: () => Data.ItemDataMeasure;
        getDeltas: () => Array<Data.ItemDataDelta>;
        getDimensions: () => Array<Data.ItemDataDimension>;
        requestUnderlyingData: (onCompleted: (data: any) => void, dataMembers: string) => void;
    }
    interface ItemMasterFilterStateChangedEventArgs {
        itemName: string;
        values: Array<Array<PrimitiveType>>;
    }
    interface ItemDrillDownStateChangedEventArgs {
        itemName: string;
        values: Array<PrimitiveType>;
        action: "Down" | "Up";
    }
    interface ItemActionAvailabilityChangedEventArgs {
        itemName: string;
    }
    interface ItemSelectionChangedEventArgs {
        itemName: string;
        getCurrentSelection: () => Array<Data.ItemDataAxisPointTuple>;
    }
}

declare module DevExpress.Dashboard {
    interface DashboardTitleToolbarOptions {
        contentItems: Array<ViewerToolbarItem>;
        actionItems: Array<ViewerToolbarItem>;
        navigationItems: Array<ViewerToolbarItem>;
    }
    interface DashboardItemCaptionToolbarOptions {
        actionItems: Array<ViewerToolbarItem>;
        staticItems: Array<ViewerToolbarItem>;
        stateItems: Array<ViewerToolbarItem>;
        navigationItems: Array<ViewerToolbarItem>;
    }
    interface ViewerToolbarItem {
        type?: "button" | "menu" | "text";
        text?: string;
        icon?: string;
        name?: string;
        checked?: boolean;
        menu?: ViewerToolbarItemMenu;
        tooltip?: ViewerToolbarItemTooltip | string;
        hint?: string;
        template?: () => JQuery;
        click?: (element: JQuery) => void;
    }
    interface ViewerToolbarItemTooltip {
        className?: string;
        template?: (contentElement) => JQuery | string;
    }
    interface ViewerToolbarItemMenu {
        type: "list" | "icons";
        title?: string;
        items?: Array<string>;
        selectionMode?: 'none' | 'single' | 'multiple';
        selectedItems?: Array<string>;
        columnCount?: number;
        itemClick?: (itemData: Object, itemElement: JQuery, itemIndex: number) => void;
    }
}
declare module DevExpress.Dashboard {
    class DisposableObject implements KnockoutSubscription {
        protected _disposables: Array<KnockoutSubscription>;
        protected disposed: boolean;
        protected toDispose(disposable: KnockoutSubscription): void;
        dispose(): void;
    }
}
declare module DevExpress.Dashboard.Internal {
    interface ViewerToolbarLocatedItem extends ViewerToolbarItem {
        location: 'before' | 'center' | 'after';
        isSeparator?: boolean;
    }
    interface dxToolbarItem {
        location: string;
        options?: dxToolbarItemOptions;
        widget?: string;
        template?: () => JQuery;
        html?: string;
        text?: string;
    }
    interface dxToolbarItemOptions {
        elementAttr?: dxToolbarItemElementAttr;
        hint?: string;
        html?: string;
        text?: string;
        template?: (buttonData, contentElement: JQuery) => JQuery;
        onClick?: (data) => void;
        onContentReady?: (data) => void;
    }
    interface dxToolbarItemElementAttr {
        class?: string;
        id?: string;
    }
    class DashboardCaptionToolbarAdapter {
        private _encodeHtml;
        _icon_menu_element_size: number;
        constructor(_encodeHtml: boolean);
        createToolbarItem(item: ViewerToolbarLocatedItem, container?: JQuery): dxToolbarItem;
        _applyText(item: any, text: string): void;
        _createToolbarItemOptions(item: ViewerToolbarLocatedItem, container: JQuery): dxToolbarItemOptions;
        _createPopoverOptions(element: JQuery, menu: ViewerToolbarItemMenu): ui.dxPopoverOptions;
        _createTileViewOptions(menu: ViewerToolbarItemMenu, onItemClick: (data) => void): ui.dxTileViewOptions;
        _createListOptions(menu: ViewerToolbarItemMenu, onItemClick: (data) => void): ui.dxListOptions;
        _createTooltipOptions(tooltip: ViewerToolbarItemTooltip | string, target: JQuery): ui.dxTooltipOptions;
        _fillCssClasses(item: ViewerToolbarItem): Array<string>;
        _validate(item: ViewerToolbarItem): void;
        _createSeparatorItem(item: ViewerToolbarLocatedItem): dxToolbarItem;
        _toggleMenu(element: JQuery, menu: ViewerToolbarItemMenu, container: JQuery): void;
        _getPopupContainer(element: JQuery, type: string): JQuery;
    }
}
declare module DevExpress.Dashboard.Internal {
    interface CaptionToolbar {
        calcHeight: () => number;
        update: (options?: DashboardItemCaptionToolbarOptions) => void;
        onResize: () => void;
        dispose: () => void;
    }
    abstract class DashboardCaptionToolbarBase implements CaptionToolbar {
        protected _container: JQuery;
        protected _adapter: DashboardCaptionToolbarAdapter;
        protected _toolbar: DevExpress.ui.dxToolbar;
        protected _toolbarDiv: JQuery;
        protected _toolbarContainer: JQuery;
        protected _options: DashboardItemCaptionToolbarOptions;
        protected _className: string;
        protected readonly _initialized: boolean;
        protected readonly _staticItemsClass: string;
        constructor(_container: JQuery, encodeHtml?: boolean);
        update(options?: DashboardItemCaptionToolbarOptions): void;
        calcHeight(): number;
        onResize(): void;
        dispose(): void;
        protected _updateToolbar(): void;
        protected _getToolbarOptions(): ui.dxToolbarOptions;
        protected _getVisibleItems(): Array<ViewerToolbarLocatedItem>;
        protected _appendToContainer(toolbarDiv: JQuery): JQuery;
        protected _resizeStaticToolbarItems(toolbarDiv?: JQuery): void;
    }
    interface ItemCaptionToolbarViewOptions {
        hasCaption: boolean;
        encodeHtml: boolean;
        needCaptionToolbarSeparator: boolean;
        isBottomFloatingToolbarPosition: boolean;
    }
}
declare module DevExpress.Dashboard.Internal {
    interface TitleViewModel {
        Text: string;
        Visible: boolean;
        ShowParametersButton: boolean;
        ShowExportButton: boolean;
        IncludeMasterFilterValues: boolean;
        LayoutModel: {
            Alignment: string;
            ImageViewModel: ImageViewModel;
        };
    }
    interface ImageViewModel {
        SourceBase64String: string;
        MimeType?: string;
        Url: string;
    }
}
declare module DevExpress.Dashboard.Internal {
    class DashboardTitleToolbar extends DashboardCaptionToolbarBase {
        private _optionalClass;
        private _showStaticItemsOnCenter;
        protected readonly _className: string;
        protected readonly _staticItemsClass: string;
        constructor(_container: JQuery, encodeHtml: boolean, _optionalClass?: any);
        update(options?: DashboardItemCaptionToolbarOptions, showStaticItemsOnCenter?: boolean): void;
        protected _getVisibleItems(): Array<ViewerToolbarLocatedItem>;
    }
}
declare module DevExpress.Dashboard.Internal {
    interface DashboardTitleOptions {
        allowExport: boolean;
        showExportDialog: (format) => void;
        showParametersDialog: () => void;
    }
    interface IDashboardTitle {
        onUpdated?: JQueryCallback;
        update: () => void;
    }
    var titleHeight: number;
    var titleVerticalPadding: number;
    var contentToolbarHeight: number;
    class DashboardTitleView {
        onUpdated: JQueryCallback;
        protected _captionToolbar: DashboardTitleToolbar;
        private _options;
        protected _titleViewModel: TitleViewModel;
        protected readonly _visible: boolean;
        initialize(container: JQuery, encodeHtml: boolean, options: DashboardTitleOptions, titleViewModel: TitleViewModel): void;
        calcHeight(): number;
        update(masterFilterValues: Array<any>, showDialogButton?: boolean): void;
        resize(): void;
        private _convertToToolbarOptions(options);
        private _raiseUpdated(option);
    }
}

declare module DevExpress.Dashboard {
    interface ViewerApiExtensionOptions {
        onItemClick?: (args: ItemClickEventArgs) => void;
        onItemSelectionChanged?: (args: ItemSelectionChangedEventArgs) => void;
        onItemWidgetCreated?: (args: ItemWidgetEventArgs) => void;
        onItemWidgetUpdating?: (args: ItemWidgetEventArgs) => void;
        onItemWidgetUpdated?: (args: ItemWidgetEventArgs) => void;
        onItemElementCustomColor?: (args: ItemElementCustomColorEventArgs) => void;
        onItemVisualInteractivity?: (args: ItemVisualInteractivityEventArgs) => void;
        onItemMasterFilterStateChanged?: (args: ItemMasterFilterStateChangedEventArgs) => void;
        onItemDrillDownStateChanged?: (args: ItemDrillDownStateChangedEventArgs) => void;
        onItemActionAvailabilityChanged?: (args: ItemActionAvailabilityChangedEventArgs) => void;
        onItemCaptionToolbarUpdated?: (args: {
            itemName: string;
            options: DashboardItemCaptionToolbarOptions;
        }) => void;
        onDashboardTitleToolbarUpdated?: (args: {
            options: DashboardTitleToolbarOptions;
        }) => void;
    }

    class ViewerApiExtension extends DisposableObject implements IExtension {
        private dashboardControl;
        static _getValidDataQueryParamsValues(columnValues: Array<any>, dataDashboardItem: any): any;
        name: string;
        _viewerItems: {
            [itemName: string]: DevExpress.dashboard.viewerItems.baseItem;
        };
        _defaultOptions: ViewerApiExtensionOptions;
        private _dashboardDisposables;
        _options: ViewerApiExtensionOptions;
        title: KnockoutObservable<Internal.IDashboardTitle>;
        constructor(dashboardControl: any, customOptions?: ViewerApiExtensionOptions);
        private _checkIsRangeFilterItem(itemName);
        private _viewerItemCreated;
        private _viewerItemDispose;
        private _beforeApplyOptions;
        _raiseItemActionAvailabilityChanged: (itemName: any) => void;
        _raiseItemClick: (itemName: any, dataPoint: any) => void;
        _raiseItemSelectionChanged: (itemName: any, tuples: any) => void;
        _raiseItemWidgetCreated: (name: any, viewControl: any) => void;
        _raiseItemWidgetUpdating: (name: any, viewControl: any) => void;
        _raiseItemWidgetUpdated: (name: any, viewControl: any) => void;
        _raiseItemCaptionToolbarUpdated: (name: string, options: DashboardItemCaptionToolbarOptions) => void;
        _raiseTitleToolbarUpdated: (options: DashboardTitleToolbarOptions) => void;
        _raiseItemElementCustomColor: (itemName: any, eventArgs: any) => void;
        _raiseItemVisualInteractivity: (itemName: any, interactivityOptions: any) => void;
        _raiseClearMasterFilter: (itemName: any) => void;
        start(): void;
        stop(): void;
        private _getDataItem(itemName);
        requestUnderlyingData: (itemName: string, args: Data.RequestUnderlyingDataParameters, onCompleted: (result: Data.ItemUnderlyingData) => void) => void;
        getCurrentRange(itemName: string): Data.RangeFilterSelection;
        getEntireRange(itemName: string): Data.RangeFilterSelection;
        setRange(itemName: string, range: Data.RangeFilterSelection): void;
        setPredefinedRange(itemName: string, dateTimePeriodName: string): void;
        getAvailablePredefinedRanges(itemName: string): Array<string>;
        getCurrentPredefinedRange(itemName: string): string;
        getCurrentSelection(itemName: string): Array<Data.ItemDataAxisPointTuple>;
        canSetMasterFilter(itemName: string): boolean;
        canClearMasterFilter(itemName: string): boolean;
        canPerformDrillDown(itemName: string): boolean;
        canPerformDrillUp(itemName: string): boolean;
        getItemData(itemName: string): Data.ItemData;
        getCurrentFilterValues(itemName: string): Array<Data.ItemDataAxisPointTuple>;
        getAvailableFilterValues(itemName: string): Array<Data.ItemDataAxisPointTuple>;
        getCurrentDrillDownValues(itemName: string): Data.ItemDataAxisPointTuple;
        getAvailableDrillDownValues(itemName: string): Array<Data.ItemDataAxisPointTuple>;
        setMasterFilter(itemName: string, values: any): void;
        clearMasterFilter(itemName: string): void;
        performDrillDown(itemName: string, value: PrimitiveType | Data.ItemDataAxisPointTuple): void;
        performDrillUp(itemName: string): void;
        getAvailableActions(itemName: string): Array<string>;
        updateItemCaptionToolbar(itemName?: string): void;
        updateDashboardTitleToolbar(): void;
    }
}

declare module DevExpress.Dashboard {
    class MobileLayoutExtension implements IExtension {
        private dashboardControl;
        private options;
        name: string;
        _disposables: KnockoutSubscription[];
        constructor(dashboardControl: any, options?: MobileLayoutExtensionOptions);
        _expectedMobileLayoutMode(): boolean;
        _canMobileLayoutBeEnabled: KnockoutComputed<boolean>;
        mobileLayoutEnabled: KnockoutComputed<boolean>;
        start(): void;
        _dashboardList: any[];
        stop(): void;
        private _originalHandlers;
    }
    type MobileLayoutMode = "Always" | "Auto" | "Never";
    interface MobileLayoutExtensionOptions {
        mobileLayoutEnabled?: MobileLayoutMode;
    }
    interface DashboardInfo {
        id: string;
        name: string;
        url?: string;
    }
}

declare module DevExpress.dashboard.viewerItems {
    abstract class baseItem {
        constructor($container: any, options: any);
        getName(): string;   
        setSize(width: any, height: any): void;
        renderContent($element: JQuery, changeExisting: boolean, afterRenderCallback?: any): void;
        clearSelection(): void;     
    }
}

declare module DevExpress.Dashboard {
    class customViewerItem extends DevExpress.dashboard.viewerItems.baseItem {
        constructor(model: any, $container: any, options: any);

        iterateData: (action: (item: ICustomDataRow) => any) => void;

        getBindingValue(propertyName: string, index?: number): Array<ICustomItemBindingValue>;
        getPropertyValue(propertyName: string): any;
        subscribe(propertyName: string, callback: (newValue: any) => void): void;

        isSelected(row: ICustomDataRow): boolean;
        canMasterFilter: (row?: ICustomDataRow) => boolean;
        canDrillDown: (row?: ICustomDataRow) => boolean;
        setMasterFilter: (row: ICustomDataRow) => boolean;
        drillDown: (row: ICustomDataRow) => boolean;

        allowExportSingleItem(): boolean;
        getExportInfo(): any;

        contentWidth(): number;
        contentHeight(): number;
    }
}



