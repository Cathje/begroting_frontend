System.register(['../models/town'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var town_1;
    var TOWNS;
    return {
        setters:[
            function (town_1_1) {
                town_1 = town_1_1;
            }],
        execute: function() {
            exports_1("TOWNS", TOWNS = [
                new town_1.Town("Berchem", "2600"),
                new town_1.Town("Mortsel", "2640"),
                new town_1.Town("Edegem", "2570"),
                new town_1.Town("Antwerpen", "2000")
            ]);
        }
    }
});
//# sourceMappingURL=mock-towns.js.map