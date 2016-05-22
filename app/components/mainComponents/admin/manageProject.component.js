System.register(['angular2/core', 'angular2/router', "../../../pipes/keysPipe", "../../../services/projectService.component", "../../../models/inspraakNiveau", "../../../models/project", "../../../models/projectScenario"], function(exports_1, context_1) {
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
    var core_1, router_1, keysPipe_1, projectService_component_1, inspraakNiveau_1, project_1, projectScenario_1;
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
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._projectService = _projectService;
                    this._router = _router;
                    this.niveaus = inspraakNiveau_1.InspraakNiveau;
                    this.projectScene = projectScenario_1.ProjectScenario;
                    this.isNewProject = true;
                    this.project = new project_1.Project("");
                    this.submitProject = true;
                    this.onChange = function (event) {
                        _this.loadimage(event.target.files[0], function (img) {
                            _this.afb = img;
                        });
                    };
                    this.loadimage = function (img, cb) {
                        var reader = new FileReader();
                        reader.readAsDataURL(img);
                        reader.onload = function () {
                            var result = reader.result;
                            cb(result);
                        };
                    };
                    this.submit = function () {
                        _this.project.cats = _this.categorieen;
                        _this.project.isActief = true;
                        _this.project.gemeente = _this.town;
                        _this.project.afbeeldingen = [];
                        _this.project.afbeeldingen.push(_this.afb);
                        _this._projectService.putProject(_this.project).subscribe(function (id) { return _this.id = id; }, function (err) { return _this.errorMessage = err; });
                        _this._router.navigate(['/', 'App', 'Budget', { town: _this.town }]);
                    };
                    this.editExistingProject = function () {
                        console.log('hello');
                        //TODO: write webapi for editing existing project
                        _this._router.navigate(['/', 'App', 'Budget', { town: _this.town }]);
                    };
                    this.town = injector.parent.parent.get(router_1.RouteParams).get('town');
                }
                ManageProjectComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                ManageProjectComponent.prototype.getBegroting = function () {
                    //Todo: get the project details
                    var _this = this;
                    this.errorMessage = "";
                    this._projectService.getInspraakitems(this.project.boekjaar, this.town)
                        .subscribe(function (finan) { return _this.categorieen = finan; }, function (err) { return _this.errorMessage = err; });
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
                ManageProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-project-container',
                        template: "\n    <p class=\"alert alert-danger\" *ngIf=\"errorMessage\">{{errorMessage}}</p>\n\n    <section class=\"container\">\n        <h1>Beheer project - {{town}}</h1>\n        <div class=\"tabs\">\n            <button class=\"btn btn-primary\" (click)=\"isNewProject = true\" [ngClass]=\"{inactive: !isNewProject}\" data-toggle=\"tab\" href=\"#new\">Nieuw project</button>\n            <button class=\"btn btn-primary\" (click)=\"isNewProject = false\" [ngClass]=\"{inactive: isNewProject}\" data-toggle=\"tab\" href=\"#existing\">Bestaand project</button>\n        </div>\n\n        <!-- EXISTING PROJECTS TAB-->\n        <div class=\"tab-content\">\n            <div id=\"existing\" class=\"tab-pane fade\">\n                <section class=\"col-xs-12 form-inline\">\n                    <h3>Voor welk boekjaar wenst u een bestaand project op te halen?</h3>\n                    <div class=\"section-content\">\n                     <label>boekjaar:</label>\n                     <input type=\"number\" class=\"form-control\" [(ngModel)]=\"project.boekjaar\"/>\n                     <button class=\"btn btn-primary form-control\" (click)=\"getBegroting()\">haal begroting op</button>\n                    </div>\n                 </section>\n\n                 <section class=\"col-xs-12 form-inline\" *ngIf=\"project.titel\">\n                      <h3>Project</h3>\n                      <div class=\"section-content\">\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Titel:</label>\n                            <input type=\"text\" [(ngModel)]=\"project.titel\"/>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Vraag:</label>\n                            <input type=\"text\" [(ngModel)]=\"project.vraag\"/>\n                        </div>\n\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>ProjectScenario: {{project.projectScenario}}</label>\n                            <select class=\"form-control\" (change)=\"onSelectScenario($event)\">\n                                    <option *ngFor=\"#t of projectScene | keys\" [value]=\"t.key\">{{t.value}}</option>\n                             </select>\n                        </div>\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                             <label>Bedrag:</label>\n                            <input class=\"form-control\" type=\"number\" [(ngModel)]=\"project.bedrag\"/>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Extra info:</label>\n                            <textarea rows=\"4\" [(ngModel)]=\"project.extraInfo\"></textarea>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Afbeelding:</label>\n                            <input  id=\"file\" type=\"file\" (change)=\"onChange($event)\"/>\n                            <img *ngIf=\"afb\" [src]=\"afb\" />\n                        </div>\n                      </div>\n                </section>\n\n                <section class=\"col-xs-12 form-inline\" *ngIf=\"project\">\n                     <h3>InspraakNiveaus vaststellen</h3>\n                     <div class=\"section-content\">\n                        <div *ngFor=\"#cat of categorieen #i = index\">\n                            <h5>categorie: {{cat.naamCat}}</h5>\n                            <p>totaal: {{cat.totaal}}</p>\n                            <p>InspraakNiveau: {{niveaus[cat.inspraakNiveau]}}</p>\n\n                            <select (change)=\"onSelectCatNiveau($event, i)\">\n                                    <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                            <br>\n                            <div class=\"acties\" *ngFor=\"#ac of cat.acties #j = index\">\n                               <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                               <p> uitgave: {{ac.uitgaven}}</p>\n                               <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>\n                               <select (change)=\"onSelectActieNiveau($event,i,j)\">\n                                    <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                               </select>\n                            </div>\n                        </div>\n                     </div>\n                </section>\n                <button (click)=\"editExistingProject()\"class=\"btn btn-primary pull-right\">opslaan</button>\n            </div>\n\n            <!-- NEW PROJECTS TAB-->\n            <div id=\"new\" class=\"tab-pane fade in active\">\n                <section class=\"col-xs-12 form-inline\">\n                        <h3>Project</h3>\n\n                        <div class=\"section-content\">\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Boekjaar:</label>\n                            <input type=\"number\" class=\"form-control\" [(ngModel)]=\"project.boekjaar\"/>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Titel:</label>\n                            <input type=\"text\" [(ngModel)]=\"project.titel\"/>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Vraag:</label>\n                            <input type=\"text\" [(ngModel)]=\"project.vraag\"/>\n                        </div>\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>ProjectScenario: {{project.projectScenario}}</label>\n                            <select class=\"form-control\" (change)=\"onSelectScenario($event)\">\n                                    <option *ngFor=\"#t of projectScene | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                        </div>\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>Bedrag:</label>\n                            <input class=\"form-control\" type=\"number\" [(ngModel)]=\"project.bedrag\"/>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Extra info:</label>\n                            <textarea rows=\"4\" [(ngModel)]=\"project.extraInfo\"></textarea>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Afbeelding:</label>\n                            <input  id=\"file\" type=\"file\" (change)=\"onChange($event)\"/>\n                            <img *ngIf=\"afb\" [src]=\"afb\" />\n                        </div>\n                        </div>\n                </section>\n                <section class=\"col-xs-12 form-inline\">\n                        <h3>InspraakNiveaus vaststellen</h3>\n                        <div class=\"section-content\">\n                         <div *ngFor=\"#cat of categorieen #i = index\">\n                            <h5>categorie: {{cat.naamCat}}</h5>\n                            <p>totaal: {{cat.totaal}}</p>\n                            <p>InspraakNiveau: {{niveaus[cat.inspraakNiveau]}}</p>\n\n                            <select (change)=\"onSelectCatNiveau($event, i)\">\n                                 <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                            <br>\n                            <div class=\"acties\" *ngFor=\"#ac of cat.acties #j = index\">\n                               <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                               <p> uitgave: {{ac.uitgaven}}</p>\n                               <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>\n                               <select (change)=\"onSelectActieNiveau($event,i,j)\">\n                                  <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                               </select>\n                            </div>\n                        </div>\n                          </div>\n                </section>\n                <button [disabled]=\"!project.titel\" (click)=\"submit()\"class=\"btn btn-primary pull-right\">opslaan</button>\n            </div>\n        </div>\n    </section>\n",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [projectService_component_1.ProjectService],
                        pipes: [keysPipe_1.KeysPipe],
                        styles: ["\n\n    section div {\n        padding: 5px;\n        box-sizing: border-box;\n    }\n\n    ::-webkit-file-upload-button {\n        background: #2ac7d2;\n        box-shadow: none;\n        border:none;\n        color:white;\n        border-radius: 5px;\n        padding: 5px;\n    }\n\n    input[type=file]{\n        border: none;\n    }\n\n    .input-group {\n        float: left;\n        box-sizing: border-box;\n    }\n\n    li {\n        list-style: none;\n        margin-bottom: 10px;\n    }\n\n    .form-inline:nth-child(2) {\n        border-top: 1px dashed lightgray;\n    }\n\n    section .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        overflow: auto;\n    }\n\n    textarea {\n        width: 100% !important;\n    }\n\n    .inactive{\n        opacity: 0.3;\n    }\n\n    .tabs {\n        border-bottom: 1px solid lightgray;\n        text-align: right;\n    }\n\n "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, projectService_component_1.ProjectService, router_1.Router, core_1.Injector])
                ], ManageProjectComponent);
                return ManageProjectComponent;
            }());
            exports_1("ManageProjectComponent", ManageProjectComponent);
        }
    }
});
//# sourceMappingURL=manageProject.component.js.map