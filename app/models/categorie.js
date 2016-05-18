System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Categorie;
    return {
        setters:[],
        execute: function() {
            Categorie = (function () {
                function Categorie(naam, kleur, icoon) {
                    this.naam = naam;
                    this.kleur = kleur;
                    this.icoon = icoon;
                }
                return Categorie;
            }());
            exports_1("Categorie", Categorie);
        }
    }
});
//# sourceMappingURL=categorie.js.map