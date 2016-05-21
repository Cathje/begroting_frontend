System.register([], function(exports_1) {
    var rolType;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by kevin on 18/05/2016.
             */
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