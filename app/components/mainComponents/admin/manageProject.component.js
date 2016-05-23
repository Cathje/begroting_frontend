System.register(['angular2/core', 'angular2/router', "../../../pipes/keysPipe", "../../../services/projectService.component", "../../../models/inspraakNiveau", "../../../models/project", "../../../models/projectScenario", '../../../directives/styled'], function(exports_1, context_1) {
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
    var core_1, router_1, keysPipe_1, projectService_component_1, inspraakNiveau_1, project_1, projectScenario_1, styled_1;
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
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
            }],
        execute: function() {
            ManageProjectComponent = (function () {
                function ManageProjectComponent(_routeParams, _projectService, _router, injector) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._projectService = _projectService;
                    this._router = _router;
                    //TODO : make upload button dutch
                    this.categorieen = [];
                    this.niveaus = inspraakNiveau_1.InspraakNiveau;
                    this.projectScene = projectScenario_1.ProjectScenario;
                    this.isNewProject = true;
                    this.NewProject = new project_1.Project("");
                    this.existProject = new project_1.Project("");
                    this.boekjaar = 2020;
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
                        _this.errorMessage2 = "";
                        _this.NewProject.cats = _this.categorieen;
                        ;
                        _this.NewProject.gemeente = _this.town;
                        _this.NewProject.boekjaar = _this.boekjaar;
                        _this.NewProject.afbeelding = _this.afb;
                        _this._projectService.postProject(_this.NewProject).subscribe(function (id) { return _this.id = id; }, function (err) { return _this.errorMessage2 = err; });
                        //   this._router.navigate(['MainTown', { town: this.town}]);
                    };
                    this.editExistingProject = function () {
                        _this.existProject.afbeelding = _this.afb;
                        _this._projectService.putProject(_this.existProject).subscribe(function (id) { return _this.id = id; }, function (err) { return _this.errorMessage2 = err; });
                        //this._router.navigate(['/', 'App','Budget', { town: this.town}]);
                    };
                    this.town = injector.parent.parent.get(router_1.RouteParams).get('town');
                }
                ManageProjectComponent.prototype.getBegroting = function () {
                    //Todo: get the project details
                    var _this = this;
                    this.errorMessage = "";
                    this._projectService.getInspraakitems(this.boekjaar, this.town)
                        .subscribe(function (cats) { return _this.categorieen = cats; }, function (err) { return _this.errorMessage = err; });
                };
                ManageProjectComponent.prototype.getProject = function () {
                    var _this = this;
                    this.errorMessage = "";
                    this.categorieen = [];
                    this._projectService.getProject(this.boekjaar, this.town)
                        .subscribe(function (pr) { return _this.existProject = pr; }, function (err) { return _this.errorMessage = err; });
                };
                ManageProjectComponent.prototype.onSelectCatNiveau = function (event, iA, iB, iC, catParent, cat) {
                    var inspraak = event.target.value;
                    switch (cat.catType) {
                        case "A":
                            if (this.isNewProject) {
                                this.categorieen[iA].inspraakNiveau = inspraak;
                                if (inspraak == 2) {
                                    this.changeInspraak(this.categorieen[iA].childCats, 2);
                                    if (this.categorieen[iA].acties != null) {
                                        for (var j = 0; j < this.categorieen[iA].acties.length; j++) {
                                            this.categorieen[iA].acties[j].inspraakNiveau = 2;
                                        }
                                    }
                                }
                            }
                            else {
                                this.existProject.cats[iA].inspraakNiveau = inspraak;
                                if (inspraak == 2) {
                                    this.changeInspraak(this.existProject.cats[iA].childCats, 2);
                                    if (this.existProject.cats[iA].acties != null) {
                                        for (var j = 0; j < this.existProject.cats[iA].acties.length; j++) {
                                            this.existProject.cats[iA].acties[j].inspraakNiveau = 2;
                                        }
                                    }
                                }
                            }
                            break;
                        case "B":
                            if (this.isNewProject) {
                                if (catParent.inspraakNiveau != 2) {
                                    this.categorieen[iA].childCats[iB].inspraakNiveau = inspraak;
                                    if (inspraak == 2) {
                                        this.changeInspraak(this.categorieen[iA].childCats[iB].childCats, 2);
                                        if (this.categorieen[iA].childCats[iB].acties != null) {
                                            for (var j = 0; j < this.categorieen[iA].childCats[iB].acties.length; j++) {
                                                this.categorieen[iA].childCats[iB].acties[j].inspraakNiveau = 2;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (catParent.inspraakNiveau != 2) {
                                    this.existProject.cats[iA].childCats[iB].inspraakNiveau = inspraak;
                                    if (inspraak == 2) {
                                        this.changeInspraak(this.existProject.cats[iA].childCats[iB].childCats, 2);
                                        if (this.existProject.cats[iA].childCats[iB].acties != null) {
                                            for (var j = 0; j < this.existProject.cats[iA].childCats[iB].acties.length; j++) {
                                                this.existProject.cats[iA].childCats[iB].acties[j].inspraakNiveau = 2;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                        case "C":
                            if (this.isNewProject) {
                                if (catParent.inspraakNiveau != 2) {
                                    this.categorieen[iA].childCats[iB].childCats[iC].inspraakNiveau = inspraak;
                                    if (inspraak == 2) {
                                        if (this.categorieen[iA].childCats[iB].childCats[iC].acties != null) {
                                            for (var j = 0; j < this.categorieen[iA].childCats[iB].childCats[iC].acties.length; j++) {
                                                this.categorieen[iA].childCats[iB].childCats[iC].acties[j].inspraakNiveau = 2;
                                            }
                                        }
                                    }
                                }
                            }
                            else {
                                if (catParent.inspraakNiveau != 2) {
                                    this.existProject.cats[iA].childCats[iB].childCats[iC].inspraakNiveau = inspraak;
                                    if (inspraak == 2) {
                                        if (this.existProject.cats[iA].childCats[iB].childCats[iC].acties != null) {
                                            for (var j = 0; j < this.existProject.cats[iA].childCats[iB].childCats[iC].acties.length; j++) {
                                                this.existProject.cats[iA].childCats[iB].childCats[iC].acties[j].inspraakNiveau = 2;
                                            }
                                        }
                                    }
                                }
                            }
                            break;
                    }
                };
                ManageProjectComponent.prototype.changeInspraak = function (childs, inspraak) {
                    if (childs != null) {
                        for (var i = 0; i < childs.length; i++) {
                            //niv B
                            childs[i].inspraakNiveau = inspraak;
                            if (childs[i].acties != null) {
                                for (var j = 0; j < childs[i].acties.length; j++) {
                                    childs[i].acties[j].inspraakNiveau = inspraak;
                                }
                            }
                            //niv c
                            if (childs[i].childCats.length != null) {
                                this.changeInspraak(childs[i].childCats, inspraak);
                            }
                        }
                    }
                };
                ManageProjectComponent.prototype.onSelectActieNiveau = function (event, cat, ac) {
                    //actie mag je enkel veranderen als de parent niet gelocked is
                    if (cat.inspraakNiveau != 2) {
                        ac.inspraakNiveau = event.target.value;
                    }
                };
                ManageProjectComponent.prototype.onSelectScenario = function (event) {
                    this.NewProject.projectScenario = event.target.value;
                };
                ManageProjectComponent.prototype.onChangeActief = function (event) {
                    if (this.isNewProject) {
                        this.NewProject.isActief = event.target.checked;
                    }
                    else {
                        this.existProject.isActief = event.target.checked;
                    }
                };
                ManageProjectComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-project-container',
                        template: "\n    <p *ngIf=\"errorMessage\" class=\"alert alert-info\">Er is geen begroting voor dit jaar</p>\n\n    <section class=\"container\">\n        <h1>Beheer project - {{town}}</h1>\n        <div class=\"tabs\">\n            <button class=\"btn btn-primary\" (click)=\"isNewProject = true\" [ngClass]=\"{inactive: !isNewProject}\" data-toggle=\"tab\" href=\"#new\" styled>Nieuw project</button>\n            <button class=\"btn btn-primary\" (click)=\"isNewProject = false\" [ngClass]=\"{inactive: isNewProject}\" data-toggle=\"tab\" href=\"#existing\" styled>Bestaand project</button>\n        </div>\n\n        <!-- EXISTING PROJECTS TAB-->\n        <div class=\"tab-content\">\n            <div id=\"existing\" class=\"tab-pane fade\">\n                <section class=\"col-xs-12 form-inline\">\n                    <h3>Voor welk boekjaar wenst u een bestaand project op te halen?</h3>\n                    <div class=\"section-content\">\n                     <label>boekjaar:</label>\n                     <input type=\"number\" class=\"form-control\" [(ngModel)]=\"boekjaar\"/>\n                     <button class=\"btn btn-primary form-control\" (click)=\"getProject()\" styled>haal project op</button>\n                    </div>\n                 </section>\n\n                 <section class=\"col-xs-12 form-inline\" *ngIf=\"!errorMessage\">\n                      <h3>Project</h3>\n                      <div class=\"section-content\">\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Titel:</label>\n                            <input type=\"text\" [(ngModel)]=\"existProject.titel\"/>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Vraag:</label>\n                            <input type=\"text\" [(ngModel)]=\"existProject.vraag\"/>\n                        </div>\n\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>ProjectScenario: {{projectScene[existProject.projectScenario]}}</label>\n                            <select class=\"form-control\" (change)=\"onSelectScenario($event)\">\n                                    <option selected disabled></option>     \n                                    <option *ngFor=\"#t of projectScene | keys\" [value]=\"t.key\">{{t.value}}</option>\n                             </select>\n                        </div>\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                             <label>Bedrag:</label>\n                            <input class=\"form-control\" type=\"number\" [(ngModel)]=\"existProject.bedrag\"/>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Extra info:</label>\n                            <textarea rows=\"4\" [(ngModel)]=\"existProject.extraInfo\"></textarea>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Afbeelding:</label>\n                            <input  id=\"file\" type=\"file\" (change)=\"onChange($event)\"/>\n                            <img *ngIf=\"afb\" [src]=\"afb\" />\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Actief?:</label>\n                            <input type=\"checkbox\" [ngModel]=existProject.isActief (change)=\"onChangeActief($event)\">\n                        </div>\n                      </div>\n                </section>\n\n                <section class=\"col-xs-12 form-inline\" *ngIf=\"!errorMessage\">\n                     <div class=\"section-content\">\n             <div *ngFor=\"#catA of existProject.cats #i = index\">\n                <h5>categorie: {{catA.naamCat}}</h5>\n                <p>totaal: {{catA.totaal}}</p>\n                <p>InspraakNiveau: {{niveaus[catA.inspraakNiveau]}}</p>\n                \n                <select (change)=\"onSelectCatNiveau($event, i,0,0, null, catA)\">\n                        <option selected disabled></option> \n                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                    <br>    \n                         <div class=\"acties\" *ngFor=\"#ac of catA.acties #j = index\"> \n                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                            <p> uitgave: {{ac.uitgaven}}</p>\n                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>\n                            <select (change)=\"onSelectActieNiveau($event,null, ac)\">\n                                <option selected disabled></option> \n                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                         </div>\n                  <div *ngFor=\"#catB of catA.childCats #k = index\">\n                <h5>categorie: {{catB.naamCat}}</h5>\n                <p>totaal: {{catB.totaal}}</p>\n                <p>InspraakNiveau: {{niveaus[catB.inspraakNiveau]}}</p>\n                \n                <select (change)=\"onSelectCatNiveau($event, i,k,0, catA, catB)\">\n                        <option selected disabled></option> \n                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                    <br>    \n                         <div class=\"acties\" *ngFor=\"#ac of catB.acties #j = index\"> \n                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                            <p> uitgave: {{ac.uitgaven}}</p>\n                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>\n                            <select (change)=\"onSelectActieNiveau($event,catB,ac)\">\n                                <option selected disabled></option> \n                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                         </div>\n                       <div *ngFor=\"#catC of catB.childCats #l = index\">\n                <h5>categorie: {{catC.naamCat}}</h5>\n                <p>totaal: {{catC.totaal}}</p>\n                <p>InspraakNiveau: {{niveaus[catC.inspraakNiveau]}}</p>\n                \n                <select (change)=\"onSelectCatNiveau($event, i,k,l, catB, catC)\">\n                        <option selected disabled></option> \n                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                    <br>    \n                         <div class=\"acties\" *ngFor=\"#ac of catC.acties #j = index\"> \n                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                            <p> uitgave: {{ac.uitgaven}}</p>\n                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>\n                            <select (change)=\"onSelectActieNiveau($event,catC, ac)\">\n                                <option selected disabled></option> \n                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                         </div>\n                        </div>\n                         \n            </div>       \n            </div>\n              </div>\n                </section>\n                <button [hidden]=\"!errorMessage\"(click)=\"editExistingProject()\"class=\"btn btn-primary pull-right\" styled>opslaan</button>\n            </div>\n\n            <!-- NEW PROJECTS TAB-->\n            <div id=\"new\" class=\"tab-pane fade in active\">\n            <section class=\"col-xs-12 form-inline\">\n                    <h3>Voor welk boekjaar wenst u een nieuw Project op te stellen?</h3>\n                    <div class=\"section-content\">\n                     <label>boekjaar:</label>\n                     <input type=\"number\" class=\"form-control\" [(ngModel)]=\"boekjaar\"/>\n                     <button class=\"btn btn-primary form-control\" (click)=\"getBegroting()\" styled>haal begroting op</button>\n                    </div>\n                 </section>\n                <section class=\"col-xs-12 form-inline\" *ngIf=\"!errorMessage\">\n                        <h3>Project</h3>\n\n                        <div class=\"section-content\">\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Titel:</label>\n                            <input type=\"text\" [(ngModel)]=\"NewProject.titel\"/>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Vraag:</label>\n                            <input type=\"text\" [(ngModel)]=\"NewProject.vraag\"/>\n                        </div>\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>ProjectScenario: {{projectScene[NewProject.projectScenario]}}</label>\n                            <select class=\"form-control\" (change)=\"onSelectScenario($event)\">\n                                    <option selected disabled></option> \n                                    <option *ngFor=\"#t of projectScene | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                        </div>\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>Bedrag:</label>\n                            <input class=\"form-control\" type=\"number\" [(ngModel)]=\"NewProject.bedrag\"/>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Extra info:</label>\n                            <textarea rows=\"4\" [(ngModel)]=\"NewProject.extraInfo\"></textarea>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Afbeelding:</label>\n                            <input  id=\"file\" type=\"file\" (change)=\"onChange($event)\"/>\n                            <img *ngIf=\"afb\" [src]=\"afb\" />\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Actief?:</label>\n                            <input type=\"checkbox\" [ngModel]=NewProject.isActief (change)=\"onChangeActief($event)\">\n                        </div>\n                        </div>\n                </section>\n                <section class=\"col-xs-12 form-inline\" *ngIf=\"!errorMessage\">\n                        <h3>InspraakNiveaus vaststellen</h3>\n                        <div class=\"section-content\">\n             <div *ngFor=\"#catA of categorieen #i = index\">\n                <h5>categorie: {{catA.naamCat}}</h5>\n                <p>totaal: {{catA.totaal}}</p>\n                <p>InspraakNiveau: {{niveaus[catA.inspraakNiveau]}}</p>\n                \n                <select (change)=\"onSelectCatNiveau($event, i,0,0, null, catA)\">\n                        <option selected disabled></option> \n                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                    <br>    \n                         <div class=\"acties\" *ngFor=\"#ac of catA.acties #j = index\"> \n                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                            <p> uitgave: {{ac.uitgaven}}</p>\n                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>\n                            <select (change)=\"onSelectActieNiveau($event,null, ac)\">\n                                <option selected disabled></option> \n                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                         </div>\n                  <div *ngFor=\"#catB of catA.childCats #k = index\">\n                <h5>categorie: {{catB.naamCat}}</h5>\n                <p>totaal: {{catB.totaal}}</p>\n                <p>InspraakNiveau: {{niveaus[catB.inspraakNiveau]}}</p>\n                \n                <select (change)=\"onSelectCatNiveau($event, i,k,0, catA, catB)\">\n                        <option selected disabled></option> \n                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                    <br>    \n                         <div class=\"acties\" *ngFor=\"#ac of catB.acties #j = index\"> \n                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                            <p> uitgave: {{ac.uitgaven}}</p>\n                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>\n                            <select (change)=\"onSelectActieNiveau($event,catB,ac)\">\n                                <option selected disabled></option> \n                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                         </div>\n                       <div *ngFor=\"#catC of catB.childCats #l = index\">\n                <h5>categorie: {{catC.naamCat}}</h5>\n                <p>totaal: {{catC.totaal}}</p>\n                <p>InspraakNiveau: {{niveaus[catC.inspraakNiveau]}}</p>\n                \n                <select (change)=\"onSelectCatNiveau($event, i,k,l, catB, catC)\">\n                        <option selected disabled></option> \n                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                         </select>\n                    <br>    \n                         <div class=\"acties\" *ngFor=\"#ac of catC.acties #j = index\"> \n                            <h5>Actie: {{ac.actieKort}} - {{ac.actieLang}}</h5>\n                            <p> uitgave: {{ac.uitgaven}}</p>\n                             <p>InspraakNiveau: {{niveaus[ac.inspraakNiveau]}}</p>\n                            <select (change)=\"onSelectActieNiveau($event,catC, ac)\">\n                                <option selected disabled></option> \n                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                         </div>\n                        </div>\n                         \n            </div>       \n            </div>\n              </div>\n                </section>\n                <button [hidden]=\"!errorMessage\" (click)=\"submit()\"class=\"btn btn-primary pull-right\" styled>opslaan</button>\n\n            </div>\n        </div>\n    </section>\n\n",
                        directives: [router_1.ROUTER_DIRECTIVES, styled_1.StyledDirective],
                        providers: [projectService_component_1.ProjectService],
                        pipes: [keysPipe_1.KeysPipe],
                        styles: ["\n\n    section div {\n        padding: 5px;\n        box-sizing: border-box;\n    }\n\n            ::-webkit-file-upload-button {\n            background: gray;\n            box-shadow: none;\n            border: none;\n            color:white;\n            border-radius: 5px;\n            padding: 5px;\n        }\n\n    input[type=file]{\n        border: none;\n    }\n\n    .input-group {\n        float: left;\n        box-sizing: border-box;\n    }\n\n    li {\n        list-style: none;\n        margin-bottom: 10px;\n    }\n\n    .form-inline:nth-child(2) {\n        border-top: 1px dashed lightgray;\n    }\n\n    section .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        overflow: auto;\n    }\n\n    textarea {\n        width: 100% !important;\n    }\n\n    .inactive{\n        opacity: 0.3;\n    }\n\n    .tabs {\n        border-bottom: 1px solid lightgray;\n        text-align: right;\n    }\n\n "]
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