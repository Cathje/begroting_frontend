System.register(["./politicusType.js"], function(exports_1) {
    var politicusType_js_1;
    var Bestuur;
    return {
        setters:[
            function (politicusType_js_1_1) {
                politicusType_js_1 = politicusType_js_1_1;
            }],
        execute: function() {
            /**
             * Created by nadya on 10/05/2016.
             */
            Bestuur = (function () {
                function Bestuur(naam) {
                    this.naam = naam;
                    this.type = politicusType_js_1.PoliticusType.Schepen;
                }
                return Bestuur;
            })();
            exports_1("Bestuur", Bestuur);
        }
    }
});
//# sourceMappingURL=bestuur.js.map