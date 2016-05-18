System.register(["../models/project"], function(exports_1) {
    var project_1;
    var PROJECTS;
    return {
        setters:[
            function (project_1_1) {
                project_1 = project_1_1;
            }],
        execute: function() {
            exports_1("PROJECTS", PROJECTS = [
                new project_1.Project("Geld inzameling Nepal"),
                new project_1.Project("Nieuwe voorzitter"),
                new project_1.Project("Heraanleg stratenplan"),
                new project_1.Project("Stadstuintjes"),
                new project_1.Project("Verkeersregels infosessie"),
                new project_1.Project("Startups workshop")
            ]);
        }
    }
});
//# sourceMappingURL=mock-projects.js.map