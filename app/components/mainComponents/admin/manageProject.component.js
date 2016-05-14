System.register(['angular2/core', 'angular2/router', "../../../pipes/keysPipe.js", "../../../services/ActieService.js", "../../../services/projectService.component.js", "../../subComponents/nav/menu.component.js", "../../../models/inspraakNiveau.js", "../../../models/project.js", "../../../models/projectScenario.js"], function(exports_1, context_1) {
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
    var core_1, router_1, keysPipe_js_1, ActieService_js_1, projectService_component_js_1, menu_component_js_1, inspraakNiveau_js_1, project_js_1, projectScenario_js_1;
    var ManageProjectComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (keysPipe_js_1_1) {
                keysPipe_js_1 = keysPipe_js_1_1;
            },
            function (ActieService_js_1_1) {
                ActieService_js_1 = ActieService_js_1_1;
            },
            function (projectService_component_js_1_1) {
                projectService_component_js_1 = projectService_component_js_1_1;
            },
            function (menu_component_js_1_1) {
                menu_component_js_1 = menu_component_js_1_1;
            },
            function (inspraakNiveau_js_1_1) {
                inspraakNiveau_js_1 = inspraakNiveau_js_1_1;
            },
            function (project_js_1_1) {
                project_js_1 = project_js_1_1;
            },
            function (projectScenario_js_1_1) {
                projectScenario_js_1 = projectScenario_js_1_1;
            }],
        execute: function() {
            ManageProjectComponent = (function () {
                function ManageProjectComponent(_routeParams, _projectService, _router) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._projectService = _projectService;
                    this._router = _router;
                    this.niveaus = inspraakNiveau_js_1.InspraakNiveau;
                    this.projectScene = projectScenario_js_1.ProjectScenario;
                    this.project = new project_js_1.Project("");
                    this.town = "Gent";
                    _projectService.getInspraakitems(2020, "Gent")
                        .subscribe(function (finan) { return _this.categorieen = finan; });
                }
                ManageProjectComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                ManageProjectComponent.prototype.onSelectCatNiveau = function (event, i) {
                    this.categorieen[i].inspraakNiveau = event.target.value;
                };
                ManageProjectComponent.prototype.onSelectActieNiveau = function (event, i, j) {
                    this.categorieen[i].acties[j].inspraakNiveau = event.target.value;
                };
                ManageProjectComponent.prototype.onSelectScenario = function (event) {
                    this.project.projectScenario = event.target.value;
                };
                ManageProjectComponent.prototype.submit = function () {
                    this.project.categorieen = this.categorieen;
                    this._projectService.putProject(this.project).subscribe();
                    // this._router.navigate(['MainTown', { town: this.town}]);
                };
                ManageProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-project-container',
                        template: "\n<div class=\"container\">\n    <h2>Beheer project</h2><h4>Titel:</h4>\n     \n     <input type=\"text\" [(ngModel)]=\"project.titel\"/>\n     <h4>boekjaar:</h4>\n     <input type=\"number\" [(ngModel)]=\"project.boekjaar\"/>\n     <h4>gemeente:</h4>\n     <input type=\"text\" [(ngModel)]=\"project.gemeente\"/>\n     <h4>vraag:</h4>\n     <input type=\"text\" [(ngModel)]=\"project.vraag\"/>\n     <h4>ProjectScenario:</h4>\n     <p>{{project.projectScenario}}</p>\n                <select (change)=\"onSelectScenario($event)\">\n                        <option *ngFor=\"#t of projectScene | keys\" [value]=\"t.key\">{{t.value}}</option>\n                 </select>\n     <h4>extraInfo:</h4>\n     <input type=\"text\" [(ngModel)]=\"project.extraInfo\"/>  <!--@TODO wijzigen naar textarea -->\n     <h4>Bedrag:</h4>\n     <input type=\"number\" [(ngModel)]=\"project.bedrag\"/>\n    \n    \n    <h2>InspraakNiveaus vaststellen</h2>\n             <div *ngFor=\"#cat of categorieen #i = index\"> \n                <h5>categorie: {{cat.naamCatz}}</h5>\n                <p>totaal: {{cat.totaal}}</p>\n                <p>InspraakNiveau: {{niveaus[cat.inspraakNiveau]}}</p>\n                \n                <select (change)=\"onSelectCatNiveau($event, i)\">\n                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                    <br>    \n                         <div class=\"acties\" *ngFor=\"#ac of cat.acties #j = index\"> \n                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                            <p> uitgave: {{ac.uitgaven}}</p>\n                            <select (change)=\"onSelectActieNiveau($event,i,j)\">\n                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                         <div>\n                    </div> \n            </div> \n                               <br><br>\n\n</div>\n   <button (click)=\"submit()\">opslaan</button>           \n</div>\n",
                        directives: [router_1.ROUTER_DIRECTIVES, menu_component_js_1.NavigationMenuComponent],
                        providers: [projectService_component_js_1.ProjectService, ActieService_js_1.ActieService //routing
                        ],
                        pipes: [keysPipe_js_1.KeysPipe],
                        styles: ["\n .acties{\n \n    padding-left: 4em; \n }\n \n "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, (typeof (_a = typeof projectService_component_js_1.ProjectService !== 'undefined' && projectService_component_js_1.ProjectService) === 'function' && _a) || Object, router_1.Router])
                ], ManageProjectComponent);
                return ManageProjectComponent;
                var _a;
            }());
            exports_1("ManageProjectComponent", ManageProjectComponent);
        }
    }
});
//# sourceMappingURL=manageProject.component.js.map