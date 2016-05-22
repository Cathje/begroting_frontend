System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Project;
    return {
        setters:[],
        execute: function() {
            Project = (function () {
                function Project(titel) {
                    this.cats = [];
                    this.voorstellen = [];
                    this.titel = titel;
                }
                return Project;
            }());
            exports_1("Project", Project);
        }
    }
});
//# sourceMappingURL=project.js.map