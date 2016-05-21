System.register([], function(exports_1) {
    var Project;
    return {
        setters:[],
        execute: function() {
            Project = (function () {
                function Project(titel) {
                    this.cats = [];
                    this.afbeeldingen = [];
                    this.titel = titel;
                }
                return Project;
            })();
            exports_1("Project", Project);
        }
    }
});
//# sourceMappingURL=project.js.map