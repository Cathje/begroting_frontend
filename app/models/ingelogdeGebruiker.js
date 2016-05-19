System.register([], function(exports_1) {
    var IngelogdeGebruiker;
    return {
        setters:[],
        execute: function() {
            IngelogdeGebruiker = (function () {
                function IngelogdeGebruiker(userId, naam, gemeente, rolType) {
                    this.userId = userId;
                    this.naam = naam;
                    this.gemeente = gemeente;
                    this.rolType = rolType;
                }
                return IngelogdeGebruiker;
            })();
            exports_1("IngelogdeGebruiker", IngelogdeGebruiker);
        }
    }
});
//# sourceMappingURL=ingelogdeGebruiker.js.map