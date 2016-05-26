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
                function ManageProjectComponent(_projectService, injector, _router) {
                    var _this = this;
                    this._projectService = _projectService;
                    this.injector = injector;
                    this._router = _router;
                    this.categorieen = [];
                    this.niveaus = inspraakNiveau_1.InspraakNiveau;
                    this.projectScene = projectScenario_1.ProjectScenario;
                    this.isNewProject = true;
                    this.NewProject = new project_1.Project("");
                    this.existProject = new project_1.Project("");
                    this.boekjaar = 2020; // todo remove hard coded
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
                        _this.errorMessage = "";
                        _this.NewProject.cats = _this.categorieen;
                        _this.NewProject.gemeente = _this.town;
                        _this.NewProject.boekjaar = _this.boekjaar;
                        _this.NewProject.afbeelding = _this.afb;
                        _this.NewProject.emailBeheerder = sessionStorage.getItem('user');
                        _this._projectService.postProject(_this.NewProject).subscribe(function (id) { return _this.id = id; }, function (err) { return _this.errorMessageCreate = "Er bestaat al een project, dit kan je wijzigen"; });
                        _this._router.navigate(['/', 'App', 'Budget', { town: _this.town }]);
                    };
                    this.editExistingProject = function () {
                        _this.errorMessage = "";
                        _this.existProject.afbeelding = _this.afb;
                        _this._projectService.putProject(_this.existProject).subscribe(function (id) { return _this.id = id; }, function (err) { return _this.errorMessage = err; });
                        _this._router.navigate(['/', 'App', 'Budget', { town: _this.town }]);
                    };
                    this.town = injector.parent.parent.parent.parent.get(router_1.RouteParams).get('town');
                }
                ManageProjectComponent.prototype.getBegroting = function () {
                    var _this = this;
                    this.errorMessage = "";
                    this.errorMessage2 = "";
                    this._projectService.getInspraakitems(this.boekjaar, this.town)
                        .subscribe(function (cats) { return _this.categorieen = cats; }, function (err) { return _this.errorMessage = "Geen inspraakitems gevonden."; });
                };
                ManageProjectComponent.prototype.getProject = function () {
                    var _this = this;
                    this.errorMessage = "";
                    this.errorMessage2 = "";
                    this.categorieen = [];
                    this._projectService.getProject(this.boekjaar, this.town)
                        .subscribe(function (pr) { return _this.existProject = pr; }, function (err) { return _this.errorMessage2 = "Geen project gevonden."; });
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
                        template: "\n    <section class=\"container\">\n        \n        <h1>Beheer project - {{town}}</h1>\n        <div class=\"tabs\">\n            <button class=\"btn btn-primary\" (click)=\"isNewProject = true\" [ngClass]=\"{inactive: !isNewProject}\" data-toggle=\"tab\" href=\"#new\" styled>Nieuw project</button>\n            <button class=\"btn btn-primary\" (click)=\"isNewProject = false\" [ngClass]=\"{inactive: isNewProject}\" data-toggle=\"tab\" href=\"#existing\" styled>Bestaand project</button>\n        </div>\n\n        <!-- EXISTING PROJECTS TAB-->\n        <div class=\"tab-content\">\n            <div id=\"existing\" class=\"tab-pane fade\">\n                <section class=\"col-xs-12 form-inline\">\n                <p *ngIf=\"errorMessage2\" class=\"alert alert-info\">{{errorMessage2}}</p>\n                    <h3>Voor welk boekjaar wenst u een bestaand project op te halen?</h3>\n                    <div class=\"section-content\">\n                        <label>boekjaar:</label>\n                        <input type=\"number\" class=\"form-control\" [(ngModel)]=\"boekjaar\" />\n                        <button class=\"btn btn-primary form-control\" (click)=\"getProject()\" styled><span class=\"glyphicon glyphicon-ok\"></span>\n                        </button>\n                    </div>\n                </section>\n\n                <section class=\"col-xs-12 form-inline\" *ngIf=\"!errorMessage\">\n                    <h3>Project</h3>\n                    <div class=\"section-content\">\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Titel:</label>\n                            <input type=\"text\" [(ngModel)]=\"existProject.titel\" />\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Vraag:</label>\n                            <input type=\"text\" [(ngModel)]=\"existProject.vraag\" />\n                        </div>\n\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>ProjectScenario: {{projectScene[existProject.projectScenario]}}</label>\n                            <select class=\"form-control\" (change)=\"onSelectScenario($event)\">\n                                <option selected disabled></option>\n                                <option *ngFor=\"#t of projectScene | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                        </div>\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>Bedrag:</label>\n                            <input class=\"form-control\" type=\"number\" [(ngModel)]=\"existProject.bedrag\" />\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Extra info:</label>\n                            <textarea rows=\"4\" [(ngModel)]=\"existProject.extraInfo\"></textarea>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label for=\"file\"> <span class=\"btn filebtn btn-primary\" styled>Selecteer afbeelding</span>\n                            </label>\n                            <input id=\"file\" class=\"form-control inputfile\" (change)=\"onChange($event)\" type=\"file\" name=\"file\">\n                            <img *ngIf=\"afb\" [src]=\"afb\" />\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Actief?:</label>\n                            <input type=\"checkbox\" [ngModel]=existProject.isActief (change)=\"onChangeActief($event)\">\n                        </div>\n                    </div>\n                </section>\n\n                <section class=\"col-xs-12 form-inline\" *ngIf=\"!errorMessage\">\n                                       <div class=\"section-content\">\n                        <div *ngFor=\"#catA of existProject.cats #i = index\">\n                            <div class=\"row\">\n                                <h5 class=\"col-xs-6\">{{catA.naamCat}}</h5>\n                                <p class=\"col-xs-2\">{{catA.totaal | currency: 'EUR' : true : '1.1-1'}}</p>\n                                <p class=\"col-xs-1\">{{niveaus[catA.inspraakNiveau]}}</p>\n                                <div class=\" styled-select\">\n                                <select class=\"col-xs-3\" (change)=\"onSelectCatNiveau($event, i,0,0, null, catA)\">\n                                    <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                </select>\n                                </div>\n                             </div>\n\n                            <div class=\"acties\" *ngFor=\"#ac of catA.acties #j = index\">\n                                <div class=\"row\">\n                                <h5 class=\"col-xs-6\">{{ac.actieKort}} - {{ac.actieLang}}</h5>\n                                <p class=\"col-xs-2\"> {{ac.uitgaven | currency: 'EUR' : true : '1.1-1'}}</p>\n                                <p class=\"col-xs-1\">{{niveaus[ac.inspraakNiveau]}}</p>\n                                <div class=\" styled-select\">\n                                <select class=\"col-xs-3\" (change)=\"onSelectActieNiveau($event,null, ac)\">\n                                    <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                </select>\n                                </div>\n                                </div>\n                            </div>\n                            <div *ngFor=\"#catB of catA.childCats #k = index\">\n                                <div class=\"row\">\n                                    <h5 class=\"col-xs-6\">{{catB.naamCat}}</h5>\n                                    <p class=\"col-xs-2\">{{catB.totaal | currency: 'EUR' : true : '1.1-1'}}</p>\n                                    <p class=\"col-xs-1\">{{niveaus[catB.inspraakNiveau]}}</p>\n                                    <div class=\" styled-select\">\n                                    <select class=\"col-xs-3\" (change)=\"onSelectCatNiveau($event, i,k,0, catA, catB)\">\n                                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                    </select>\n                                    </div>\n                                </div>\n                                <div class=\"acties\" *ngFor=\"#ac of catB.acties #j = index\">\n                                    <div class=\"row\">\n                                    <h5 class=\"col-xs-6\">{{ac.actieKort}} - {{ac.actieLang}}</h5>\n                                    <p class=\"col-xs-2\"> {{ac.uitgaven | currency: 'EUR' : true : '1.1-1'}}</p>\n                                    <p class=\"col-xs-1\">{{niveaus[ac.inspraakNiveau]}}</p>\n                                    <div class=\" styled-select\">\n                                    <select class=\"col-xs-3\" (change)=\"onSelectActieNiveau($event,catB,ac)\">\n                                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                    </select>\n                                    </div>\n                                    </div>\n                                </div>\n                                <div *ngFor=\"#catC of catB.childCats #l = index\">\n                                    <div class=\"row\">\n                                        <h5 class=\"col-xs-6\">{{catC.naamCat}}</h5>\n                                        <p class=\"col-xs-2\">{{catC.totaal | currency: 'EUR' : true : '1.1-1'}}</p>\n                                        <p class=\"col-xs-1\">{{niveaus[catC.inspraakNiveau]}}</p>\n                                        <div class=\" styled-select\">\n                                        <select class=\"col-xs-3\"(change)=\"onSelectCatNiveau($event, i,k,l, catB, catC)\">\n                                            <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                        </select>\n                                        </div>\n                                    </div>\n                                    <div class=\"acties\" *ngFor=\"#ac of catC.acties #j = index\">\n                                        <div class=\"row\">\n                                            <h5 class=\"col-xs-6\">{{ac.actieKort}} - {{ac.actieLang}}</h5>\n                                            <p class=\"col-xs-2\">  {{ac.uitgaven | currency: 'EUR' : true : '1.1-1'}}</p>\n                                            <p class=\"col-xs-1\">{{niveaus[ac.inspraakNiveau]}}</p>\n                                            <div class=\" styled-select\">\n                                            <select class=\"col-xs-3\" (change)=\"onSelectActieNiveau($event,catC, ac)\">\n                                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                            </select>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n                </section>\n                <button [hidden]=\"errorMessage2\" (click)=\"editExistingProject()\" class=\"btn btn-primary pull-right\" styled>opslaan</button>\n            </div>\n\n            <!-- NEW PROJECTS TAB-->\n            <div id=\"new\" class=\"tab-pane fade in active\">\n                <section class=\"col-xs-12 form-inline\">\n                    <h3>Voor welk boekjaar wenst u een nieuw Project op te stellen?</h3>\n                    <p *ngIf=\"errorMessage\" class=\"alert alert-info\">{{errorMessage}}</p>\n                    <div class=\"section-content\">\n                        <label>boekjaar:</label>\n                        <input type=\"number\" class=\"form-control\" [(ngModel)]=\"boekjaar\" />\n                        <button class=\"btn btn-primary form-control\" (click)=\"getBegroting()\" styled><span class=\"glyphicon glyphicon-ok\"></span>\n                        </button>\n                    </div>\n                </section>\n                <section class=\"col-xs-12 form-inline\" *ngIf=\"!errorMessage\">\n                    <h3>Project</h3>\n\n                    <div class=\"section-content form-inline\">\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Titel:</label>\n                            <input type=\"text\" [(ngModel)]=\"NewProject.titel\" />\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Vraag:</label>\n                            <input type=\"text\" [(ngModel)]=\"NewProject.vraag\" />\n                        </div>\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>ProjectScenario: {{projectScene[NewProject.projectScenario]}}</label>\n                            <select class=\"form-control\" (change)=\"onSelectScenario($event)\">\n                                <option selected disabled></option>\n                                <option *ngFor=\"#t of projectScene | keys\" [value]=\"t.key\">{{t.value}}</option>\n                            </select>\n                        </div>\n                        <div class=\"col-xs-12 col-md-6 form-group\">\n                            <label>Bedrag:</label>\n                            <input class=\"form-control\" type=\"number\" [(ngModel)]=\"NewProject.bedrag\" />\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Extra info:</label>\n                            <textarea rows=\"4\" [(ngModel)]=\"NewProject.extraInfo\"></textarea>\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label for=\"file\"> <span class=\"btn filebtn btn-primary\" styled>Selecteer afbeelding</span>\n                            </label>\n                            <input id=\"file\" class=\"form-control inputfile\" (change)=\"onChange($event)\" type=\"file\" name=\"file\">\n                            <img *ngIf=\"afb\" [src]=\"afb\" />\n                        </div>\n                        <div class=\"col-xs-12 form-group\">\n                            <label>Actief?:</label>\n                            <input type=\"checkbox\" [ngModel]=NewProject.isActief (change)=\"onChangeActief($event)\">\n                        </div>\n                    </div>\n                </section>\n                <section class=\"col-xs-12 form-inline\" *ngIf=\"!errorMessage\">\n                    <h3>InspraakNiveaus vaststellen</h3>\n                    \n                    <div class=\"section-content\">\n                    <p *ngIf=\"categorieen.length == 0\"> haal eerst een begroting op</p>\n                        <div *ngFor=\"#catA of categorieen #i = index\">\n                            <div class=\"row\">\n                                <h5 class=\"col-xs-6\">{{catA.naamCat}}</h5>\n                                <p class=\"col-xs-2\">{{catA.totaal | currency: 'EUR' : true : '1.1-1'}}</p>\n                                <p class=\"col-xs-1\">{{niveaus[catA.inspraakNiveau]}}</p>\n                                <div class=\" styled-select\">\n                                <select class=\"col-xs-3\" (change)=\"onSelectCatNiveau($event, i,0,0, null, catA)\">\n                                    <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                </select>\n                                </div>\n                             </div>\n\n                            <div class=\"acties\" *ngFor=\"#ac of catA.acties #j = index\">\n                                <div class=\"row\">\n                                <h5 class=\"col-xs-6\">{{ac.actieKort}} - {{ac.actieLang}}</h5>\n                                <p class=\"col-xs-2\"> {{ac.uitgaven | currency: 'EUR' : true : '1.1-1'}}</p>\n                                <p class=\"col-xs-1\">{{niveaus[ac.inspraakNiveau]}}</p>\n                                <div class=\" styled-select\">\n                                <select class=\"col-xs-3\" (change)=\"onSelectActieNiveau($event,null, ac)\">\n                                    <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                </select>\n                                </div>\n                                </div>\n                            </div>\n                            <div *ngFor=\"#catB of catA.childCats #k = index\">\n                                <div class=\"row\">\n                                    <h5 class=\"col-xs-6\">{{catB.naamCat}}</h5>\n                                    <p class=\"col-xs-2\">{{catB.totaal | currency: 'EUR' : true : '1.1-1'}}</p>\n                                    <p class=\"col-xs-1\">{{niveaus[catB.inspraakNiveau]}}</p>\n                                    <div class=\" styled-select\">\n                                    <select class=\"col-xs-3\" (change)=\"onSelectCatNiveau($event, i,k,0, catA, catB)\">\n                                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                    </select>\n                                    </div>\n                                </div>\n                                <div class=\"acties\" *ngFor=\"#ac of catB.acties #j = index\">\n                                    <div class=\"row\">\n                                    <h5 class=\"col-xs-6\">{{ac.actieKort}} - {{ac.actieLang}}</h5>\n                                    <p class=\"col-xs-2\"> {{ac.uitgaven | currency: 'EUR' : true : '1.1-1'}}</p>\n                                    <p class=\"col-xs-1\">{{niveaus[ac.inspraakNiveau]}}</p>\n                                    <div class=\" styled-select\">\n                                    <select class=\"col-xs-3\" (change)=\"onSelectActieNiveau($event,catB,ac)\">\n                                        <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                    </select>\n                                    </div>\n                                    </div>\n                                </div>\n                                <div *ngFor=\"#catC of catB.childCats #l = index\">\n                                    <div class=\"row\">\n                                        <h5 class=\"col-xs-6\">{{catC.naamCat}}</h5>\n                                        <p class=\"col-xs-2\">{{catC.totaal | currency: 'EUR' : true : '1.1-1'}}</p>\n                                        <p class=\"col-xs-1\">{{niveaus[catC.inspraakNiveau]}}</p>\n                                        <div class=\" styled-select\">\n                                        <select class=\"col-xs-3\"(change)=\"onSelectCatNiveau($event, i,k,l, catB, catC)\">\n                                            <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                        </select>\n                                        </div>\n                                    </div>\n                                    <div class=\"acties\" *ngFor=\"#ac of catC.acties #j = index\">\n                                        <div class=\"row\">\n                                            <h5 class=\"col-xs-6\">{{ac.actieKort}} - {{ac.actieLang}}</h5>\n                                            <p class=\"col-xs-2\">  {{ac.uitgaven | currency: 'EUR' : true : '1.1-1'}}</p>\n                                            <p class=\"col-xs-1\">{{niveaus[ac.inspraakNiveau]}}</p>\n                                            <div class=\" styled-select\">\n                                            <select class=\"col-xs-3\" (change)=\"onSelectActieNiveau($event,catC, ac)\">\n                                                <option *ngFor=\"#t of niveaus | keys\" [value]=\"t.key\">{{t.value}}</option>\n                                            </select>\n                                            </div>\n                                        </div>\n                                    </div>\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n                </section>\n                <p *ngIf=\"errorMessageCreate\" class=\"alert alert-info\"> {{errorMessageCreate}}</p>\n                <button [hidden]=\"errorMessage\" (click)=\"submit()\" class=\"btn btn-primary pull-right\" styled>opslaan</button>\n\n            </div>\n        </div>\n    </section>\n",
                        directives: [router_1.ROUTER_DIRECTIVES, styled_1.StyledDirective],
                        providers: [projectService_component_1.ProjectService],
                        pipes: [keysPipe_1.KeysPipe],
                        styles: ["\n\n        section div {\n            padding: 5px;\n            box-sizing: border-box;\n        }\n        ::-webkit-file-upload-button {\n            background: gray;\n            box-shadow: none;\n            border: none;\n            color: white;\n            border-radius: 5px;\n            padding: 5px;\n        }\n        input[type=file] {\n            border: none;\n        }\n        .input-group {\n            float: left;\n            box-sizing: border-box;\n        }\n        li {\n            list-style: none;\n            margin-bottom: 10px;\n        }\n        .form-inline:nth-child(2) {\n            border-top: 1px dashed lightgray;\n        }\n        section .section-content {\n            border: 1px solid lightgray;\n            margin-bottom: 20px;\n            padding: 20px;\n            overflow: auto;\n        }\n        textarea {\n            width: 100% !important;\n        }\n        .inactive {\n            opacity: 0.3;\n        }\n        .tabs {\n            border-bottom: 1px solid lightgray;\n            text-align: right;\n        }\n\n        .row {\n            display: flex;\n            align-items: flex-start;\n        }\n\n        .row select {\n            width: 100px;\n        }\n\n\n "]
                    }), 
                    __metadata('design:paramtypes', [projectService_component_1.ProjectService, core_1.Injector, router_1.Router])
                ], ManageProjectComponent);
                return ManageProjectComponent;
            }());
            exports_1("ManageProjectComponent", ManageProjectComponent);
        }
    }
});
//# sourceMappingURL=manageProject.component.js.map