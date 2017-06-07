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



