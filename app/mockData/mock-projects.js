System.register(["../models/project.js"], function(exports_1) {
    var project_js_1;
    var PROJECTS;
    return {
        setters:[
            function (project_js_1_1) {
                project_js_1 = project_js_1_1;
            }],
        execute: function() {
            exports_1("PROJECTS", PROJECTS = [
                new project_js_1.Project("Geld inzameling Nepal"),
                new project_js_1.Project("Nieuwe voorzitter"),
                new project_js_1.Project("Heraanleg stratenplan"),
                new project_js_1.Project("Stadstuintjes"),
                new project_js_1.Project("Verkeersregels infosessie"),
                new project_js_1.Project("Startups workshop")
            ]);
        }
    }
});
//# sourceMappingURL=mock-projects.js.map