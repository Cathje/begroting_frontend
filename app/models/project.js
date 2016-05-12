System.register([], function(exports_1) {
    var Project;
    return {
        setters:[],
        execute: function() {
            Project = (function () {
                function Project(titel) {
                    this.titel = titel;
                    this.projectScenario = 0;
                    this.vraag = "";
                    this.extraInfo = "";
                    this.bedrag = 1000;
                    this.maxBedrag = 10;
                    this.minBedrag = 10;
                }
                return Project;
            })();
            exports_1("Project", Project);
        }
    }
});
//# sourceMappingURL=project.js.map