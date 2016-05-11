System.register(['angular2/core', 'angular2/router', "../../../pipes/keysPipe", "../../../services/ActieService", "../../../services/projectService.component", "../../subComponents/nav/menu.component", "../../../models/inspraakNiveau", "../../../models/project", "../../../models/projectScenario"], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, keysPipe_1, ActieService_1, projectService_component_1, menu_component_1, inspraakNiveau_1, project_1, projectScenario_1;
    var ManageProjectComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (keysPipe_1_1) {
                keysPipe_1 = keysPipe_1_1;
            },
            function (ActieService_1_1) {
                ActieService_1 = ActieService_1_1;
            },
            function (projectService_component_1_1) {
                projectService_component_1 = projectService_component_1_1;
            },
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            },
            function (inspraakNiveau_1_1) {
                inspraakNiveau_1 = inspraakNiveau_1_1;
            },
            function (project_1_1) {
                project_1 = project_1_1;
            },
            function (projectScenario_1_1) {
                projectScenario_1 = projectScenario_1_1;
            }],
        execute: function() {
            ManageProjectComponent = (function () {
                function ManageProjectComponent(_routeParams, _projectService, _router) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._projectService = _projectService;
                    this._router = _router;
                    this.niveaus = inspraakNiveau_1.InspraakNiveau;
                    this.projectScene = projectScenario_1.ProjectScenario;
                    this.project = new project_1.Project("");
                    this.town = "Gent";
                    _projectService.getInspraakcategorieen(2020, "Gent")
                        .subscribe(function (finan) { return _this.categorieen = finan; });
                }
                ManageProjectComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                ManageProjectComponent.prototype.onSelectNiveau = function (event, i) {
                    this.categorieen[i].inspraakNiveau = event.target.value;
                };
                ManageProjectComponent.prototype.onSelectScenario = function (event) {
                    this.project.projectScenario = event.target.value;
                };
                ManageProjectComponent.prototype.submit = function () {
                    this._projectService.putProject(this.project, this.categorieen).subscribe();
                    // this._router.navigate(['MainTown', { town: this.town}]);
                };
                ManageProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'project-container',
                        template: "<h2>Beheer project</h2><h4>Titel:</h4>\n     <input type=\"text\" [(ngModel)]=\"project.titel\"/>\n     <h4>vraag:</h4>\n     <input type=\"text\" [(ngModel)]=\"project.vraag\"/>\n     <h4>ProjectScenario:</h4>\n     <p>{{project.projectScenario}}</p>\n     <select (change)=\"onSelectScenario($event)\">\n                        <option *ngFor=\"#t of projectScene | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n     <h4>extraInfo:</h4>\n     <input type=\"text\" [(ngModel)]=\"project.extraInfo\"/>  <!--@TODO wijzigen naar textarea -->\n     <h4>Bedrag:</h4>\n     <input type=\"number\" [(ngModel)]=\"project.bedrag\"/>\n    \n    \n    <h2>InspraakNiveaus vaststellen</h2>\n             <div *ngFor=\"#cat of categorieen #i = index\"> \n                <h5>categorie: {{cat.naamCatz}}</h5>\n                <p>totaal: {{cat.totaal}}</p>\n                <p>InspraakNiveau: {{niveaus[cat.inspraakNiveau]}}</p>\n                <select (change)=\"onSelectNiveau($event, i)\">\n                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                </div>\n                \n                <button (click)=\"submit()\">opslaan</button>\n              \n\n",
                        directives: [router_1.ROUTER_DIRECTIVES, menu_component_1.NavigationMenuComponent],
                        providers: [projectService_component_1.ProjectService, ActieService_1.ActieService //routing
                        ],
                        pipes: [keysPipe_1.KeysPipe]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, projectService_component_1.ProjectService, router_1.Router])
                ], ManageProjectComponent);
                return ManageProjectComponent;
            }());
            exports_1("ManageProjectComponent", ManageProjectComponent);
        }
    }
});
//# sourceMappingURL=manageProject.component.js.map