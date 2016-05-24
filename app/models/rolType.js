System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var rolType;
    return {
        setters:[],
        execute: function() {
            (function (rolType) {
                rolType[rolType["standaard"] = 1] = "standaard";
                rolType[rolType["admin"] = 2] = "admin";
                rolType[rolType["superadmin"] = 3] = "superadmin";
                rolType[rolType["moderator"] = 4] = "moderator";
            })(rolType || (rolType = {}));
            exports_1("rolType", rolType);
        }
    }
});
//# sourceMappingURL=rolType.js.map