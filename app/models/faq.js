System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Faq;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by nadya on 30/04/2016.
             */
            Faq = (function () {
                function Faq(vraag, antwoord) {
                    this.ID = 0;
                    this.vraag = vraag;
                    this.antwoord = antwoord;
                }
                return Faq;
            }());
            exports_1("Faq", Faq);
        }
    }
});
//# sourceMappingURL=faq.js.map