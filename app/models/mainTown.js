System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var MainTown;
    return {
        setters:[],
        execute: function() {
            MainTown = (function () {
                function MainTown(name, postCode, gemeenteId, belasting) {
                    this.naam = name;
                    this.postCode = postCode;
                    this.GemeenteID = gemeenteId;
                    this.aanslagVoet = belasting;
                }
                return MainTown;
            }());
            exports_1("MainTown", MainTown);
        }
    }
});
//# sourceMappingURL=mainTown.js.map