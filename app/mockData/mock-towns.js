System.register(['../models/mainTown'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var mainTown_1;
    var TOWNS;
    return {
        setters:[
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            }],
        execute: function() {
            exports_1("TOWNS", TOWNS = [
                new mainTown_1.MainTown("Berchem", "2600"),
                new mainTown_1.MainTown("Mortsel", "2640"),
                new mainTown_1.MainTown("Edegem", "2570"),
                new mainTown_1.MainTown("Antwerpen", "2000")
            ]);
        }
    }
});
//# sourceMappingURL=mock-towns.js.map