System.register(['../models/mainTown.js'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mainTown_js_1;
    var TOWNS;
    return {
        setters:[
            function (mainTown_js_1_1) {
                mainTown_js_1 = mainTown_js_1_1;
            }],
        execute: function() {
            exports_1("TOWNS", TOWNS = [
                new mainTown_js_1.MainTown("Berchem", "2600", 1, 0.07),
                new mainTown_js_1.MainTown("Mortsel", "2640", 2, 0.08),
                new mainTown_js_1.MainTown("Edegem", "2570", 3, 0.09),
                new mainTown_js_1.MainTown("Antwerpen", "2000", 4, 0.11)
            ]);
        }
    }
});
//# sourceMappingURL=mock-towns.js.map