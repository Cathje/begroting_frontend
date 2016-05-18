System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var BestuurType;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by nadya on 15/05/2016.
             */
            (function (BestuurType) {
                BestuurType[BestuurType["Gemeente"] = 1] = "Gemeente";
                BestuurType[BestuurType["OCMW"] = 2] = "OCMW";
                BestuurType[BestuurType["Autonoom Gemeente Bedrijf"] = 3] = "Autonoom Gemeente Bedrijf";
            })(BestuurType || (BestuurType = {}));
            exports_1("BestuurType", BestuurType);
        }
    }
});
//# sourceMappingURL=bestuurType.js.map