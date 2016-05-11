System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var IngelogdeGebruiker;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by nadya on 11/05/2016.
             */
            /**
             * Created by kevin on 08/05/2016.
             */
            IngelogdeGebruiker = (function () {
                function IngelogdeGebruiker(Naam, Password, bevestigPaswoord, email, gemeente) {
                    this.Naam = Naam;
                    this.Password = Password;
                    this.bevestigPaswoord = bevestigPaswoord;
                    this.email = email;
                    this.gemeente = gemeente;
                }
                return IngelogdeGebruiker;
            }());
            exports_1("IngelogdeGebruiker", IngelogdeGebruiker);
        }
    }
});
//# sourceMappingURL=ingelogdeGebruiker.js.map