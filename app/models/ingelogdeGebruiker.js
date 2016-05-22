System.register([], function(exports_1) {
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
            })();
            exports_1("IngelogdeGebruiker", IngelogdeGebruiker);
        }
    }
});
//# sourceMappingURL=ingelogdeGebruiker.js.map