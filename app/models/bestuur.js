System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Bestuur;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by nadya on 10/05/2016.
             */
            Bestuur = (function () {
                function Bestuur(naam, type) {
                    this.PoliticusId = 0;
                    this.naam = naam;
                    this.type = type;
                }
                return Bestuur;
            }());
            exports_1("Bestuur", Bestuur);
        }
    }
});
//# sourceMappingURL=bestuur.js.map