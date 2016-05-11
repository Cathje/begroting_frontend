/**
 * Created by nadya on 10/05/2016.
 */
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var InspraakNiveau;
    return {
        setters:[],
        execute: function() {
            (function (InspraakNiveau) {
                InspraakNiveau[InspraakNiveau["Auto"] = 0] = "Auto";
                InspraakNiveau[InspraakNiveau["Gelockt"] = 1] = "Gelockt";
                InspraakNiveau[InspraakNiveau["Open"] = 2] = "Open";
            })(InspraakNiveau || (InspraakNiveau = {}));
            exports_1("InspraakNiveau", InspraakNiveau);
        }
    }
});
//# sourceMappingURL=inspraakNiveau.js.map