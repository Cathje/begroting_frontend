System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var IngelogdeGebruiker;
    return {
        setters:[],
        execute: function() {
            IngelogdeGebruiker = (function () {
                function IngelogdeGebruiker(userId, naam, gemeente, rolType, isActief) {
                    this.userId = userId;
                    this.naam = naam;
                    this.gemeente = gemeente;
                    this.rolType = rolType;
                    this.isActief = isActief;
                }
                return IngelogdeGebruiker;
            }());
            exports_1("IngelogdeGebruiker", IngelogdeGebruiker);
        }
    }
});
//# sourceMappingURL=ingelogdeGebruiker.js.map