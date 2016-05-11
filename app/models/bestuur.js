System.register(["./politicusType"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var politicusType_1;
    var Bestuur;
    return {
        setters:[
            function (politicusType_1_1) {
                politicusType_1 = politicusType_1_1;
            }],
        execute: function() {
            /**
             * Created by nadya on 10/05/2016.
             */
            Bestuur = (function () {
                function Bestuur(naam) {
                    this.naam = naam;
                    this.type = politicusType_1.PoliticusType.Schepen;
                }
                return Bestuur;
            }());
            exports_1("Bestuur", Bestuur);
        }
    }
});
//# sourceMappingURL=bestuur.js.map