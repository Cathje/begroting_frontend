System.register([], function(exports_1) {
    var MainTown;
    return {
        setters:[],
        execute: function() {
            MainTown = (function () {
                function MainTown(name, postCode, gemeenteId) {
                    this.naam = name;
                    this.postCode = postCode;
                    this.GemeenteID = gemeenteId;
                }
                return MainTown;
            })();
            exports_1("MainTown", MainTown);
        }
    }
});
//# sourceMappingURL=mainTown.js.map