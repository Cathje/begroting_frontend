System.register([], function(exports_1) {
    var CatDTO;
    return {
        setters:[],
        execute: function() {
            CatDTO = (function () {
                function CatDTO(categorie, bedrag) {
                    this.hoofdCategorie = categorie;
                    this.bedrag = bedrag;
                }
                return CatDTO;
            })();
            exports_1("CatDTO", CatDTO);
        }
    }
});
//# sourceMappingURL=catDTO.js.map