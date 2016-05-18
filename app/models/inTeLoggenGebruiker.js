System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var InTeLoggenGebruiker;
    return {
        setters:[],
        execute: function() {
            /**
             * Created by nadya on 11/05/2016.
             */
            /**
             * Created by kevin on 08/05/2016.
             */
            InTeLoggenGebruiker = (function () {
                function InTeLoggenGebruiker(Naam, Password, bevestigPaswoord, email, gemeente) {
                    this.Naam = Naam;
                    this.Password = Password;
                    this.bevestigPaswoord = bevestigPaswoord;
                    this.email = email;
                    this.gemeente = gemeente;
                }
                return InTeLoggenGebruiker;
            }());
            exports_1("InTeLoggenGebruiker", InTeLoggenGebruiker);
        }
    }
});
//# sourceMappingURL=inTeLoggenGebruiker.js.map