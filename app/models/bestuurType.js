System.register([], function(exports_1) {
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
                BestuurType[BestuurType["AutonoomGemeenteBedrijf"] = 3] = "AutonoomGemeenteBedrijf";
            })(BestuurType || (BestuurType = {}));
            exports_1("BestuurType", BestuurType);
        }
    }
});
//# sourceMappingURL=bestuurType.js.map