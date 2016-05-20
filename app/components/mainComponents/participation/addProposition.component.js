System.register(['angular2/core', 'angular2/router', "../../../services/projectService.component", "../../../services/begrotingService", './../../subComponents/input/rangeSlider.component', './../../subComponents/graphs/sunburst.component', "../../../services/townService.component", "./../../../models/project", "../../../models/bugdetWijziging", "../../../models/begrotingsVoorstel"], function(exports_1, context_1) {
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
    var core_1, router_1, projectService_component_1, begrotingService_1, rangeSlider_component_1, sunburst_component_1, router_2, townService_component_1, project_1, bugdetWijziging_1, begrotingsVoorstel_1;
    var AddPropositionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (projectService_component_1_1) {
                projectService_component_1 = projectService_component_1_1;
            },
            function (begrotingService_1_1) {
                begrotingService_1 = begrotingService_1_1;
            },
            function (rangeSlider_component_1_1) {
                rangeSlider_component_1 = rangeSlider_component_1_1;
            },
            function (sunburst_component_1_1) {
                sunburst_component_1 = sunburst_component_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (project_1_1) {
                project_1 = project_1_1;
            },
            function (bugdetWijziging_1_1) {
                bugdetWijziging_1 = bugdetWijziging_1_1;
            },
            function (begrotingsVoorstel_1_1) {
                begrotingsVoorstel_1 = begrotingsVoorstel_1_1;
            }],
        execute: function() {
            AddPropositionComponent = (function () {
                function AddPropositionComponent(_routeParams, _projectService, _townService, _begrotingService) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._projectService = _projectService;
                    this._townService = _townService;
                    this._begrotingService = _begrotingService;
                    this.categories = [];
                    this.year = 2020; //TODO: default is current year?
                    this.project = new project_1.Project("");
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.7 : window.innerWidth / 4;
                    this.budgetwijzigingen = [];
                    this.BegrotingsVoorstel = new begrotingsVoorstel_1.BegrotingsVoorstel();
                    this.onCircleClick = function (id) {
                        alert('test');
                    };
                    /* this._projectService.getInspraakitems(this.year, "Gent")
                        .subscribe((finan: any) => this.categories = finan,
                            (err:any) => this.errorMessage = err
                        );
            
                    if(!this.errorMessage)
                    {
                        console.log("call ok?");
            
                        
                    }*/
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (cats) { return _this.categories = cats; });
                    this._projectService.getProject(this.year, "Gent")
                        .subscribe(function (project) { return _this.project = project; }, function (err) { return _this.errorMessage = err; });
                    if (!this.errorMessage) {
                    }
                }
                AddPropositionComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                //load accordion for selected year
                AddPropositionComponent.prototype.loadAccordion = function (event) {
                };
                AddPropositionComponent.prototype.updateBudget = function () {
                    alert('budget update');
                };
                AddPropositionComponent.prototype.click = function () {
                    alert(this.categories[1].naamCat);
                    /*let counter = 0;
                    for (var i = 0; i < this.project.cats.length; i++) {
                        console.log("id: " + this.project.cats[i].ID);
            
                    }*/
                };
                //@TODO test voor webapi en service  --> te verwijderen
                AddPropositionComponent.prototype.submit = function () {
                    this.BegrotingsVoorstel.beschrijving = "kjQGQBjqshgbcjhqbckjb<clgbcqjbck:xjhb";
                    // alert(this.BegrotingsVoorstel.budgetWijzigingen.length);
                    this._projectService.postBegrotingsVoorstel(this.project.id, this.BegrotingsVoorstel).subscribe();
                };
                //@TODO test voor webapi en service --> te verwijderen
                AddPropositionComponent.prototype.createBudgetWijziging = function (id, inspraak) {
                    if (inspraak != 2) {
                        this.budgetwijzigingen = this.BegrotingsVoorstel.budgetWijzigingen.filter(function (b) { return b.inspraakItemId === id; });
                        if (this.budgetwijzigingen.length == 0) {
                            this.BegrotingsVoorstel.budgetWijzigingen.push(new bugdetWijziging_1.BudgetWijziging(id, "test", 1000));
                            return true;
                        }
                        else {
                            //totaal wijzigen ofzo...
                            return true;
                        }
                    }
                    else {
                        return false;
                    }
                };
                AddPropositionComponent = __decorate([
                    core_1.Component({
                        selector: 'add-proposition-container',
                        template: "\n    <div class=\"container\">\n    <h2>Voorstel indienen</h2>\n        <div class =\"row\">\n            <div class =\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <p>hier komt de sunburst voor project {{project.titel}}</p>\n                <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst> \n            </div>\n            <div class =\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <div class =\"row\">\n                    <p>hier komen de acties</p>\n                </div>\n                <div class =\"row\">\n                    <p>hier komt het totaal</p>\n                </div>\n            </div>\n        </div>\n        <div class =\"row\">\n            <p>hier komt de accordeon</p>\n                    <!--outer accordion-->\n                    <div class=\"panel-group\" id=\"levelA\">\n                        <div class=\"panel panel-default\">\n                        <div class=\"panel-heading\">\n                          <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#levelA\" href=\"#collapseInnerA\">\n                            Collapsible Inner Group Level A\n                          </a></h4>\n                        </div>\n                        <div id=\"collapseInnerA\" class=\"panel-collapse collapse\"><!---->\n                          <div class=\"panel-body\">\n                            <slider name=\"slide\" id=\"speedSlider\" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)=\"updateBudget()\"></slider>\n                            <!-- Level B accordion -->\n                            <div class=\"panel-group\" id=\"levelB\">\n                              <div class=\"panel panel-default\">\n                                <div class=\"panel-heading\">\n                                  <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#levelB\" href=\"#collapseInnerB\">\n                                    Collapsible Inner Group Level B\n                                  </a></h4>\n                                </div>\n                                <div id=\"collapseInnerB\" class=\"panel-collapse collapse in\">\n                                  <div class=\"panel-body\">\n                                  <!--Level C accordion-->\n                                    <div class=\"panel-group\" id=\"levelC\">\n                                      <div class=\"panel panel-default\">\n                                        <div class=\"panel-heading\">\n                                          <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#levelC\" href=\"#collapseInnerC\">\n                                            Collapsible Inner Group Level C\n                                          </a></h4>\n                                        </div>\n                                        <div id=\"collapseInnerC\" class=\"panel-collapse collapse in\">\n                                          <div class=\"panel-body\">\n                                          <!--Level D accordion: actions-->\n                                            <div class=\"panel-group\" id=\"levelD\">\n                                              <div class=\"panel panel-default\">\n                                                <div class=\"panel-heading\">\n                                                  <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#levelD\" href=\"#collapseInnerD\">\n                                                    Collapsible Inner Group Level D\n                                                  </a></h4>\n                                                </div>\n                                                <div id=\"collapseInnerD\" class=\"panel-collapse collapse in\">\n                                                  <div class=\"panel-body\">\n                                                  <!--Level 4 accordion: actions-->\n                                                    Hier komen acties...\n                                                  </div>\n                                                </div>\n                                              </div>\n                                            </div>  \n                                          </div>\n                                        </div>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>\n                              </div>\n                              <!--<div class=\"panel panel-default\">\n                                <div class=\"panel-heading\">\n                                  <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#levelA\" href=\"#collapseInnerTwo\">\n                                    Collapsible Inner Group Item #2\n                                  </a></h4>\n                                </div>\n                                <div id=\"collapseInnerTwo\" class=\"panel-collapse collapse\">\n                                  <div class=\"panel-body\">\n                                    Anim pariatur cliche...\n                                  </div>\n                                </div>\n                              </div>-->\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n                    \n                    \n                    \n                    \n                    \n                    \n                    \n        </div>\n    </div>\n    <button (click)=\"click()\">test</button>\n    \n               <!--@TODO verwijderen van deze test voor webapi en service -->\n          <p>Dit is een test voor de service {{project.titel}}</p>\n                 <div *ngFor=\"#cat of project.cats #i = index\">\n                <h5>categorie: {{cat.naamCat}}</h5>\n                <p>totaal: {{cat.totaal}}</p>\n                <div *ngIf=\"createBudgetWijziging(cat.ID, cat.inspraakNiveau)\">              \n                </div>\n            </div>\n            <button (click)=\"submit()\" >opslaan</button>\n\n\n\n\n        ",
                        directives: [sunburst_component_1.SunburstComponent, router_2.ROUTER_DIRECTIVES, rangeSlider_component_1.rangeSlider],
                        providers: [
                            projectService_component_1.ProjectService, townService_component_1.TownService, begrotingService_1.BegrotingService
                        ],
                        styles: ["\n\n        h4.panel-title{\n        color: black;\n        }\n        /*be very specific to change colors*/\n        .panel-default >.panel-heading {\n            background-color: #2ac7d2;\n        }\n\n        "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, projectService_component_1.ProjectService, townService_component_1.TownService, begrotingService_1.BegrotingService])
                ], AddPropositionComponent);
                return AddPropositionComponent;
            }());
            exports_1("AddPropositionComponent", AddPropositionComponent);
        }
    }
});
//# sourceMappingURL=addProposition.component.js.map