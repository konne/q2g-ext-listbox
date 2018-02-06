//#region Imports
import "css!./q2g-ext-listboxExtension.css";

import * as qvangular from "qvangular";
import * as qlik from "qlik";
import * as template from "text!./q2g-ext-listboxExtension.html";

import { utils, logging, services, version } from "../node_modules/davinci.js/dist/umd/daVinci";

import { RootExtension } from "../node_modules/davinci.js/src/utils/rootclasses";
import { ListboxDirectiveFactory } from "./q2g-ext-listboxDirective";
//#endregion

//#region registrate services
qvangular.service<services.IRegistrationProvider>("$registrationProvider", services.RegistrationProvider)
.implementObject(qvangular);
//#endregion

//#region Logger
logging.LogConfig.SetLogLevel("*", logging.LogLevel.info);
let logger = new logging.Logger("Main");
//#endregion

//#region registrate directives
var $injector = qvangular.$injector;
utils.checkDirectiveIsRegistrated($injector, qvangular, "", ListboxDirectiveFactory("Listboxextension"),
    "ListboxExtension");
//#endregion

//#region interfaces
interface IDataProperties {
    properties: any;
}
//#endregion

//#region set extension parameters
let parameter = {
    type: "items",
    component: "accordion",
    items: {
        dimensions: {
            uses: "dimensions",
            min: 1,
            max: 1
        },
        settings: {
            uses: "settings",
            items: {
                accessibility: {
                    type: "items",
                    label: "Accessibility",
                    grouped: true,
                    items: {
                        shortcuts: {
                            type: "items",
                            lable: "shortcuts",
                            grouped: false,
                            items: {
                                ShortcutLable: {
                                    label: "In the following, you can change the used shortcuts",
                                    component: "text"
                                },
                                shortcutUseDefaults: {
                                    ref: "properties.shortcutUseDefaults",
                                    label: "use default shortcuts",
                                    component: "switch",
                                    type: "boolean",
                                    options: [{
                                        value: true,
                                        label: "use"
                                    }, {
                                        value: false,
                                        label: "not use"
                                    }],
                                    defaultValue: true
                                },
                                shortcutFocusList: {
                                    ref: "properties.shortcutFocusList",
                                    label: "focus list",
                                    type: "string",
                                    defaultValue: "strg + alt + 70",
                                    show: function (data: any) {
                                        if (data.properties.shortcutUseDefaults) {
                                            data.properties.shortcutFocusList = "strg + alt + 70";
                                        }
                                        return !data.properties.shortcutUseDefaults;
                                    }
                                },
                                shortcutFocusSearchField: {
                                    ref: "properties.shortcutFocusSearchField",
                                    label: "focus search field",
                                    type: "string",
                                    defaultValue: "strg + alt + 83",
                                    show: function (data: any) {
                                        if (data.properties.shortcutUseDefaults) {
                                            data.properties.shortcutFocusSearchField = "strg + alt + 83";
                                        }
                                        return !data.properties.shortcutUseDefaults;
                                    }
                                }
                            }
                        },
                        arialive: {
                            type: "items",
                            lable: "arialive",
                            grouped: false,
                            items: {
                                configLable: {
                                    label: "In the following, you can change Settings",
                                    component: "text"
                                },
                                useAccessibility: {
                                    ref: "properties.aria.useAccessibility",
                                    label: "use accessibility",
                                    component: "switch",
                                    type: "boolean",
                                    options: [{
                                        value: true,
                                        label: "use"
                                    }, {
                                        value: false,
                                        label: "not use"
                                    }],
                                    defaultValue: false
                                },
                                timeAria: {
                                    ref: "properties.aria.timeAria",
                                    label: "Timeinterval for hints",
                                    type: "string",
                                    defaultValue: "7000",
                                    show: function (data: any) {
                                        return data.properties.useAccessibility;
                                    }
                                },
                                actionDelay: {
                                    ref: "properties.aria.actionDelay",
                                    label: "Delay bevor action (used for Aria Live Regions)",
                                    type: "string",
                                    defaultValue: "100",
                                    show: function (data: any) {
                                        return data.properties.useAccessibility;
                                    }
                                }
                            }
                        }
                    }
                },
                configuration: {
                    type: "items",
                    label: "Configuration",
                    grouped: true,
                    items: {
                        orientation: {
                            type: "items",
                            lable: "orientation",
                            grouped: false,
                            items: {
                                horizontalmode: {
                                    ref: "properties.horizontalmode",
                                    label: "switch orientation",
                                    component: "switch",
                                    type: "boolean",
                                    options: [{
                                        value: false,
                                        label: "vertical"
                                    }, {
                                        value: true,
                                        label: "horizontal"
                                    }],
                                    defaultValue: false
                                },
                            }
                        },
                        split: {
                            type: "items",
                            lable: "orientation",
                            grouped: false,
                            items: {
                                splitmode: {
                                    ref: "properties.splitmode",
                                    label: "switch to split mode",
                                    component: "switch",
                                    type: "boolean",
                                    options: [{
                                        value: true,
                                        label: "use split"
                                    }, {
                                        value: false,
                                        label: "no spit"
                                    }],
                                    defaultValue: false
                                },
                                splitcolumns: {
                                    ref: "properties.splitcolumns",
                                    label: "how many columns",
                                    type: "number",
                                    defaultValue: "1",
                                    show: function (data: IDataProperties) {
                                        if (!data.properties.splitmode) {
                                            data.properties.splitcolumns = "1";
                                        }
                                        return data.properties.splitmode;
                                    }
                                },
                            }
                        }
                    }
                }
            }
        }
    }
};
//#endregion

class ListExtension extends RootExtension {

    constructor(model: EngineAPI.IGenericObject) {
        super(model, qlik);
    }

}

export = {
    definition: parameter,
    initialProperties: { },
    template: template,
    support: {
        snapshot: false,
        export: false,
        exportData: false
    },
    paint: () => {
        //
    },
    resize: () => {
        //
    },
    controller: ["$scope", function (scope: utils.IVMScope<ListExtension>) {
        console.log("Extension is using daVinci.js Verions: " + version);
        scope.vm = new ListExtension(utils.getEnigma(scope));
    }]
};




