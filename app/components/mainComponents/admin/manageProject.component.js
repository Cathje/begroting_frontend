System.register(['angular2/core', 'angular2/router', "../../../pipes/keysPipe", "../../../services/projectService.component", "../../subComponents/nav/menu.component", "../../../models/inspraakNiveau", "../../../models/project", "../../../models/projectScenario"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
        switch (arguments.length) {
            case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
            case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
            case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
        }
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, keysPipe_1, projectService_component_1, menu_component_1, inspraakNiveau_1, project_1, projectScenario_1;
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
                function ManageProjectComponent(_routeParams, _projectService, _router, injector) {
                    this._routeParams = _routeParams;
                    this._projectService = _projectService;
                    this._router = _router;
                    this.niveaus = inspraakNiveau_1.InspraakNiveau;
                    this.projectScene = projectScenario_1.ProjectScenario;
                    this.project = new project_1.Project("");
                    this.submitProject = true;
                    this.town = injector.parent.parent.get(router_1.RouteParams).get('town');
                }
                ManageProjectComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                ManageProjectComponent.prototype.getBegroting = function () {
                    var _this = this;
                    this.errorMessage = "";
                    this._projectService.getInspraakitems(this.project.boekjaar, this.town)
                        .subscribe(function (finan) { return _this.categorieen = finan; }, function (err) { return _this.errorMessage = err; });
                    if (!this.errorMessage) {
                        this.submitProject = false;
                    }
                };
                ManageProjectComponent.prototype.onSelectCatNiveau = function (event, i) {
                    var _this = this;
                    this.cat = this.categorieen.filter(function (cat) { return cat.ID === _this.categorieen[i].gemcatID; });
                    if (event.target.value == 2) {
                        this.categorieen[i].inspraakNiveau = event.target.value;
                        this.changeInspraak(event.target.value, i);
                    }
                    else {
                        if (this.cat.length == 0) {
                            alert("A");
                            this.categorieen[i].inspraakNiveau = event.target.value;
                        }
                        if (this.cat.length != 0 && this.cat[0].inspraakNiveau != 2) {
                            alert("lower cat: " + this.cat[0].inspraakNiveau);
                            this.categorieen[i].inspraakNiveau = event.target.value;
                        }
                    }
                };
                ManageProjectComponent.prototype.changeInspraak = function (inspraak, i) {
                    //CAT A
                    if (this.categorieen[i].acties != null) {
                        for (var k = 0; k < this.categorieen[i].acties.length; k++) {
                            this.categorieen[i].acties[k].inspraakNiveau = 2;
                        }
                    }
                    for (var j = 0; j < this.categorieen.length; j++) {
                        if (this.categorieen[j].gemcatID == this.categorieen[i].ID) {
                            //CAT B
                            this.categorieen[j].inspraakNiveau = 2;
                            if (this.categorieen[j].acties != null) {
                                for (var k = 0; k < this.categorieen[j].acties.length; k++) {
                                    this.categorieen[j].acties[k].inspraakNiveau = 2;
                                }
                            }
                            for (var a = 0; a < this.categorieen.length; a++) {
                                if (this.categorieen[a].gemcatID == this.categorieen[j].ID) {
                                    //CAT C
                                    this.categorieen[a].inspraakNiveau = 2;
                                    if (this.categorieen[a].acties != null) {
                                        for (var k = 0; k < this.categorieen[a].acties.length; k++) {
                                            this.categorieen[a].acties[k].inspraakNiveau = 2;
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                ManageProjectComponent.prototype.onSelectActieNiveau = function (event, i, j) {
                    //actie mag je enkel veranderen als de parent niet gelocked is
                    if (this.categorieen[i].inspraakNiveau != 2) {
                        this.categorieen[i].acties[j].inspraakNiveau = event.target.value;
                    }
                };
                ManageProjectComponent.prototype.onSelectScenario = function (event) {
                    this.project.projectScenario = event.target.value;
                };
                ManageProjectComponent.prototype.submit = function () {
                    var _this = this;
                    this.project.categorieen = this.categorieen;
                    this._projectService.putProject(this.project).subscribe(function (id) { return _this.id = id; }, function (err) { return _this.errorMessage = err; });
                    //   this._router.navigate(['MainTown', { town: this.town}]);
                };
                ManageProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-project-container',
                        template: "\n<p *ngIf=\"errorMessage\">Oeps er is geen begroting voor dit jaar</p>\n\n<p>voor welk boekjaar wenst u een project op te zetten?</p>\n     <h4>boekjaar:</h4>\n     <input type=\"number\" [(ngModel)]=\"project.boekjaar\"/>\n     <button (click)=\"getBegroting()\">haal begroting op</button>\n\n <div [hidden]=\"errorMessage\" class=\"container\">\n    \n    <h2>Beheer project - {{town}}</h2>\n     <h4>Titel:</h4>\n     <input type=\"text\" [(ngModel)]=\"project.titel\"/>\n     <h4>vraag:</h4>\n     <input type=\"text\" [(ngModel)]=\"project.vraag\"/>\n     <h4>ProjectScenario:</h4>\n     <p>{{project.projectScenario}}</p>\n                <select (change)=\"onSelectScenario($event)\">\n                        <option *ngFor=\"#t of projectScene | keys\" [value]=\"t.key\">{{t.value}}</option>\n                 </select>\n     <h4>extraInfo:</h4>\n     <input type=\"text\" [(ngModel)]=\"project.extraInfo\"/>  <!--@TODO wijzigen naar textarea -->\n     <h4>Bedrag:</h4>\n     <input type=\"number\" [(ngModel)]=\"project.bedrag\"/>\n    \n    \n    <h2>InspraakNiveaus vaststellen</h2>\n             <div *ngFor=\"#cat of categorieen #i = index\"> \n                <h5>categorie: {{cat.naamCatz}}</h5>\n                <p>totaal: {{cat.totaal}}</p>\n                <p>InspraakNiveau: {{niveaus[cat.inspraakNiveau]}}</p>\n                \n                <select (change)=\"onSelectCatNiveau($event, i)\">\n                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                    <br>    \n                         <div class=\"acties\" *ngFor=\"#ac of cat.acties #j = index\"> \n                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                            <p> uitgave: {{ac.uitgaven}}</p>\n                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>\n                            <select (change)=\"onSelectActieNiveau($event,i,j)\">\n                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                         <div>\n                    </div> \n            </div> \n                               <br><br>\n\n</div>\n   <button  [disabled]=\"submitProject\" (click)=\"submit()\">opslaan</button>           \n</div>\n",
                        directives: [router_1.ROUTER_DIRECTIVES, menu_component_1.NavigationMenuComponent],
                        providers: [projectService_component_1.ProjectService //routing
                        ],
                        pipes: [keysPipe_1.KeysPipe],
                        styles: ["\n .acties{\n \n    padding-left: 4em; \n }\n \n "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, projectService_component_1.ProjectService, router_1.Router, core_1.Injector])
                ], ManageProjectComponent);
                return ManageProjectComponent;
            })();
            exports_1("ManageProjectComponent", ManageProjectComponent);
        }
    }
});
//# sourceMappingURL=manageProject.component.js.map