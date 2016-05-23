System.register(['angular2/core', 'angular2/router', "../../../services/projectService.component", "../../../services/begrotingService", './../../subComponents/input/rangeSlider.component', './../../subComponents/graphs/sunburst.component', "../../../services/townService.component", "./../../../models/project", "../../../models/bugdetWijziging", "../../../models/begrotingsVoorstel"], function(exports_1) {
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
                    this.begrotingsVoorstel = new begrotingsVoorstel_1.BegrotingsVoorstel(); //
                    this.scenario = 1; //todo: effectief scenario gebruiken via pipe!!!
                    this.ISPROP = true;
                    this.tempTotal = 0;
                    this.submitProject = true;
                    /*click(){
                
                
                 for (var i = 0; i < this.project.cats[0].childCats[0].childCats.length; i++) {
                 alert("dit is het id van level 1: "+this.project.cats[0].childCats[0].childCats[i].naamCat);
                
                 }
                
                
                
                 }*/
                    this.onCircleClick = function (id) {
                        alert('test');
                    };
                    this._begrotingService.getGemeenteCategorieen(2020, "Gent")
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
                AddPropositionComponent.prototype.updateBudget = function (event) {
                    /*alert('budget update voor id ' + event.id + " van " + event.event.target.value);*/
                    var originalValue = 0;
                    var newValue = event.event.target.value;
                    //get original value (2way db - different object!!!)
                    for (var i = 0; i < this.categories.length; i++) {
                        if (this.categories[i].ID == event.id) {
                            originalValue = this.categories[i].totaal;
                        }
                    }
                    var result = newValue - originalValue;
                    this.tempTotal += result;
                    /*alert(this.tempTotal);*/
                    var level = 3;
                    for (var i = 0; i < this.project.cats.length; i++) {
                        //if top level update sub levels
                        if (this.project.cats[i].ID == event.id) {
                            level = 1;
                            /*alert(this.project.cats[i].totaal);*/
                            //update level 2
                            var levelBTotal = 0;
                            for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                                if (this.project.cats[i].childCats[j].inspraakNiveau != 2) {
                                    levelBTotal += this.project.cats[i].childCats[j].totaal;
                                }
                            }
                            var levBResult = 0;
                            for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                                if (this.project.cats[i].childCats[j].inspraakNiveau != 2) {
                                    var share = (this.project.cats[i].childCats[j].totaal / levelBTotal);
                                    levBResult = result * share;
                                    //create budgetWijziging and update total
                                    this.begrotingsVoorstel.budgetWijzigingen.push(new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].ID, levBResult));
                                    this.project.cats[i].childCats[j].totaal = levBResult + this.project.cats[i].childCats[j].totaal;
                                }
                                //update level 3
                                var levelCTotal = 0;
                                for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                                    if (this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) {
                                        levelCTotal += this.project.cats[i].childCats[j].childCats[k].totaal;
                                    }
                                }
                                var levCResult = 0;
                                for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                                    if (this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) {
                                        var share = (this.project.cats[i].childCats[j].childCats[k].totaal / levelCTotal);
                                        //create budgetWijziging and update total
                                        levCResult = levBResult * share;
                                        this.begrotingsVoorstel.budgetWijzigingen.push(new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult));
                                        this.project.cats[i].childCats[j].childCats[k].totaal = levCResult + this.project.cats[i].childCats[j].childCats[k].totaal;
                                    }
                                    //update actions
                                    var actTotal = 0;
                                    for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                        if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                            actTotal += this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                        }
                                    }
                                    var actResult = 0;
                                    for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                        if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                            var share = (this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven / actTotal);
                                            //create budgetWijziging and update total
                                            actResult = levCResult * share;
                                            this.begrotingsVoorstel.budgetWijzigingen.push(new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, actResult));
                                            this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                        }
                                    }
                                } //
                            }
                        }
                    }
                    //if level is not a top //TODO: correct top level??????
                    if (level != 1) {
                        for (var i = 0; i < this.project.cats.length; i++) {
                            for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                                if (this.project.cats[i].childCats[j].ID == event.id) {
                                    level = 2;
                                    //update level 3
                                    var levelCTotal = 0;
                                    for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                                        if (this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) {
                                            levelCTotal += this.project.cats[i].childCats[j].childCats[k].totaal;
                                        }
                                    }
                                    var levCResult = 0;
                                    for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                                        if (this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) {
                                            var share = (this.project.cats[i].childCats[j].childCats[k].totaal / levelCTotal);
                                            //create budgetWijziging and update total
                                            levCResult = result * share;
                                            this.begrotingsVoorstel.budgetWijzigingen.push(new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult));
                                            this.project.cats[i].childCats[j].childCats[k].totaal = levCResult + this.project.cats[i].childCats[j].childCats[k].totaal;
                                        }
                                        //update actions
                                        var actTotal = 0;
                                        for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                            if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                                actTotal += this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                            }
                                        }
                                        var actResult = 0;
                                        for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                            if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                                var share = (this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven / actTotal);
                                                //create budgetWijziging and update total
                                                actResult = levCResult * share;
                                                this.begrotingsVoorstel.budgetWijzigingen.push(new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, actResult));
                                                this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //if C level change
                    if (level == 3) {
                        for (var i = 0; i < this.project.cats.length; i++) {
                            for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                                for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                                    if (this.project.cats[i].childCats[j].childCats[k].ID == event.id) {
                                        //update actions
                                        var actTotal = 0;
                                        for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                            if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                                actTotal += this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                            }
                                        }
                                        var actResult = 0;
                                        for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                            if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                                var share = (this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven / actTotal);
                                                //create budgetWijziging and update total
                                                actResult = result * share;
                                                this.begrotingsVoorstel.budgetWijzigingen.push(new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, actResult));
                                                this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };
                //upload images
                AddPropositionComponent.prototype.uploadImages = function (event) {
                    var reader = new FileReader();
                    reader.readAsDataURL(event.target.files[0]);
                    reader.onload = function () {
                        this.begrotingsVoorstel.afbeeldingen[0] = reader.result;
                    };
                    //TODO: afwerken upload
                };
                //@TODO test voor webapi en service  --> te verwijderen
                AddPropositionComponent.prototype.submit = function () {
                    this.begrotingsVoorstel.beschrijving = "kjQGQBjqshgbcjhqbckjb<clgbcqjbck:xjhb";
                    // alert(this.BegrotingsVoorstel.budgetWijzigingen.length);
                    this._projectService.postBegrotingsVoorstel(this.project.id, this.begrotingsVoorstel).subscribe();
                };
                //@TODO test voor webapi en service --> te verwijderen
                AddPropositionComponent.prototype.createBudgetWijziging = function (id, inspraak) {
                    if (inspraak != 2) {
                        this.budgetwijzigingen = this.begrotingsVoorstel.budgetWijzigingen.filter(function (b) { return b.inspraakItemId === id; });
                        if (this.budgetwijzigingen.length == 0) {
                            this.begrotingsVoorstel.budgetWijzigingen.push(new bugdetWijziging_1.BudgetWijziging(id, 1000));
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
                        template: "\n    <div class=\"container\">\n    <div class =\"row\">\n    <h2>{{project.titel}}</h2>\n    <h3>{{project.vraag}}</h3>\n    <p>Hier komt een paragraaf met wat uitleg.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>\n    <!--<p>{{project.extraInfo}}</p>--><!--todo: vervang bovenstaande paragraaf door deze-->\n    <!--TODO: hoe voorzien om nieuw jaar te selecteren. Huidig jaar is default?-->\n     </div>\n        <div class =\"row\">\n            <div class =\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst> \n            </div>\n            <div class =\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n               <!-- <div class =\"row\">\n                    <p>Hier komt project info</p>\n                </div>-->\n                <div class =\"row\">\n                    <h2>Gewijzigde categorie\u00EBn en acties</h2>\n                    <div class=\"section-content\">\n                    <!--acties toevoegen aan de box-->\n                    <p *ngIf=\"begrotingsVoorstel.budgetwijzigingen==null\">Nog geen wijzigingen...</p>\n                    </div>\n                </div>\n                <div class =\"row\">\n                    <h2 *ngIf=\"scenario===1\">Te besparen bedrag: \u20AC{{project.bedrag}}</h2><!--todo: gebruik project.projectScenario!!!-->\n                    <h2 *ngIf=\"scenario===2\">Te herschikken bedrag: \u20AC{{project.bedrag}}</h2>\n                    <h2 *ngIf=\"scenario===3\">Te bestemmen bedrag: \u20AC{{project.bedrag}}</h2>\n                    <h2>Verschoven bedrag: \u20AC{{tempTotal}}</h2>\n                    <!--<h2>Totaal: \u20AC{{project.bedrag}}</h2>-->\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <form>\n                <div class=\"form-group\">\n                    <label>Samenvatting</label>\n                    <textarea class=\"form-control\" rows=\"3\" [(ngModel)]=\"begrotingsVoorstel.samenvatting\" placeholder=\"Samenvatting\"></textarea>\n                </div>\n                <div class=\"form-group\">\n                    <label>Motivatie</label>\n                    <textarea class=\"form-control\" rows=\"10\" [(ngModel)]=\"begrotingsVoorstel.beschrijving\" placeholder=\"Motivatie\"></textarea>\n                </div>\n                <div class=\"form-group\">\n                    <!--<label>Voeg afbeeldingen toe</label>-->\n                    <label class=\"btn btn-default btn-file\">\n                        Afbeeldingen <span class=\"glyphicon glyphicon-upload\"></span><input type=\"file\" style=\"display: none;\" (change)=\"uploadImages($event)\" />\n                    </label>\n                </div>\n                <button [disabled]=\"submitProject\" (click)=\"submit()\"class=\"btn btn-primary pull-right\">opslaan</button>\n            </form>\n        </div>\n        <div class =\"row\">\n            <h2>Te wijzigen categorie\u00EBn en acties</h2>\n                    <!--outer accordion-->\n                    <div *ngFor=\"#cat of project.cats #i = index\" class=\"panel-group\" #elem1 [attr.id]=\"'levelA_' + cat.ID\"><!--id=\"levelA+cat.id\"\"-->\n                        <div class=\"panel panel-default\">\n                        <div class=\"panel-heading\">\n                          <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#elem1.id\" href=\"#collA_{{cat.ID}}\"> <!--data parent aanpassen?-->\n                            {{cat.naamCat}} <!--{{elem1.id}}--> \n                          </a></h4>\n                        </div>\n                        <div [attr.id]=\"'collA_' + cat.ID\" class=\"panel-collapse collapse\"><!--id=\"collapseInnerA\"-->\n                          <div class=\"panel-body\">\n                            <!--a form for capturing budget shifts on cat level-->\n                            <form class=\"form-inline\">\n                                <div class=\"form-group sliderContainer\">\n                                    <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"cat.totaal\" [value]=\"cat.totaal\" [itemID] = \"cat.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"cat.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                </div>\n                                <div class=\"form-group\">\n                                    <input [ngClass]=\"{locked: cat.inspraakNiveau  != 3}\" type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"cat.totaal\" readonly>\n                                </div>\n                            </form>\n                            <!--a form for capturing budget shifts on action level-->\n                            <h3>Acties</h3>\n                            <p *ngIf=\"cat.acties==null\">Er zijn geen acties gedefinieerd op dit niveau</p>\n                            <div *ngIf=\"cat.acties!=null\">\n                                <form *ngFor=\"#acA of cat.acties #l = index\" class=\"form-inline\">\n                                    <div class=\"form-group\">\n                                        <label class=\"actionLabel\" for=\"slide\">{{acA.actieKort}}</label>\n                                        <input [ngClass]=\"{locked: acA.inspraakNiveau  != 3}\" type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"acA.uitgaven\" readonly>\n                                    </div>\n                                    <div class=\"form-group actionSliderContainer\">\n                                        <!--<slider name=\"slide\" id=\"speedSlider\" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)=\"updateBudget()\"></slider>-->\n                                        <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"acA.uitgaven\" [value]=\"acA.uitgaven\" [itemID] = \"acA.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"acA.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                    </div>\n                                </form>\n                            </div>\n                            <!-- Level B accordion -->\n                            <div *ngFor=\"#levB of cat.childCats #j = index\" class=\"panel-group\" #elem2 [attr.id]=\"'levelB_' + levB.ID\"><!--id=\"levelA+cat.id\"\"-->\n                              <div class=\"panel panel-default\">\n                                <div class=\"panel-heading\">\n                                  <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#elem2.id\" href=\"#collB_{{levB.ID}}\">\n                                    {{levB.naamCat}}\n                                  </a></h4>\n                                </div>\n                                <div [attr.id]=\"'collB_' + levB.ID\" class=\"panel-collapse collapse in\">\n                                  <div class=\"panel-body\">\n                                    <!--a form for capturing budget shifts-->\n                                    <form class=\"form-inline\">\n                                        <div class=\"form-group sliderContainer\">\n                                            <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"levB.totaal\" [value]=\"levB.totaal\" [itemID] = \"levB.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"levB.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <input [ngClass]=\"{locked: levB.inspraakNiveau  != 3}\" type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"levB.totaal\" readonly>\n                                        </div>\n                                    </form>\n                                    <!--a form for capturing budget shifts on action level-->\n                                    <h3>Acties</h3>\n                                    <p *ngIf=\"levB.acties==null\">Er zijn geen acties gedefinieerd op dit niveau</p>\n                                    <div *ngIf=\"levB.acties!=null\">\n                                        <form *ngFor=\"#acB of levB.acties #k = index\" class=\"form-inline\">\n                                            <div class=\"form-group\">\n                                                <label class=\"actionLabel\" for=\"slide\">{{acB.actieKort}}</label>\n                                                <input [ngClass]=\"{locked: acB.inspraakNiveau  != 3}\" type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"acB.uitgaven\" readonly>\n                                                <!--<slider name=\"slide\" id=\"speedSlider\" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)=\"updateBudget()\"></slider>-->\n                                            </div>\n                                            <div class=\"form-group actionSliderContainer\">\n                                                <!--<input type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"myTaxes\" readonly>-->\n                                                <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"acB.uitgaven\" [value]=\"acB.uitgaven\" [itemID] = \"acB.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"acB.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                            </div>\n                                        </form>\n                                    </div>\n                                  <!--Level C accordion-->\n                                    <div *ngFor=\"#levC of levB.childCats #j = index\" class=\"panel-group\" #elem3 [attr.id]=\"'levelC_' + levC.ID\"><!--id=\"levelA+cat.id\"\"-->\n                                      <div class=\"panel panel-default\">\n                                        <div class=\"panel-heading\">\n                                          <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#elem3.id\" href=\"#collC_{{levC.ID}}\">\n                                            {{levC.naamCat}}\n                                          </a></h4>\n                                        </div>\n                                        <div [attr.id]=\"'collC_' + levC.ID\" class=\"panel-collapse collapse in\">\n                                          <div class=\"panel-body\">\n                                          <!--a form for capturing budget shifts-->\n                                            <form class=\"form-inline\">\n                                                <div class=\"form-group sliderContainer\">\n                                                    <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"levC.totaal\" [value]=\"levC.totaal\" [itemID] = \"levC.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"levC.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                                </div>\n                                                <div class=\"form-group\">\n                                                    <input [ngClass]=\"{locked: levC.inspraakNiveau  != 3}\" type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"levC.totaal\" readonly>\n                                                </div>\n                                            </form>\n                                            <!--a form for capturing budget shifts on action level-->\n                                            <h3>Acties</h3>\n                                            <p *ngIf=\"levC.acties==null\">Er zijn geen acties gedefinieerd</p>\n                                            <div *ngIf=\"levC.acties!=null\"> \n                                                <form *ngFor=\"#ac of levC.acties #k = index\" class=\"form-inline\">\n                                                    <div class=\"form-group\">\n                                                        <label class=\"actionLabel\" for=\"slide\">{{ac.actieKort}}</label>\n                                                        <input [ngClass]=\"{locked: ac.inspraakNiveau  != 3}\" type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"ac.uitgaven\" readonly>\n                                                        <!--<slider name=\"slide\" id=\"speedSlider\" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)=\"updateBudget()\"></slider>-->\n                                                    </div>\n                                                    <div class=\"form-group actionSliderContainer\">\n                                                        <!--<input type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"myTaxes\" readonly>-->\n                                                        <!--<slider name=\"slide\" id=\"speedSlider\" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)=\"updateBudget()\"></slider>-->\n                                                        <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"ac.uitgaven\" [value]=\"ac.uitgaven\" [itemID] = \"ac.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"ac.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                                    </div>\n                                                </form>\n                                            </div>\n                                          </div>\n                                        </div>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n        </div>\n    </div>\n    \n    \n               <!--@TODO verwijderen van deze test voor webapi en service -->\n          <p>Dit is een test voor de service {{project.titel}}</p>\n                 <div *ngFor=\"#cat of project.cats #i = index\">\n                <h5>categorie: {{cat.naamCat}}</h5>\n                <p>totaal: {{cat.totaal}}</p>\n                <div *ngIf=\"createBudgetWijziging(cat.ID, cat.inspraakNiveau)\">              \n                </div>\n            </div>\n            <button (click)=\"submit()\" >opslaan</button>\n\n\n\n\n        ",
                        directives: [sunburst_component_1.SunburstComponent, router_2.ROUTER_DIRECTIVES, rangeSlider_component_1.rangeSlider],
                        providers: [
                            projectService_component_1.ProjectService, townService_component_1.TownService, begrotingService_1.BegrotingService
                        ],
                        styles: ["\n\n        /*be very specific to change colors*/\n        .panel-default >.panel-heading {\n            background-color: #2ac7d2;\n        }\n        .sliderContainer{\n        width: 50%;\n        margin-right: 1em;\n        }\n        .form-inline{\n        margin-bottom: 1em;\n        }\n        .actionSliderContainer{\n        width: 30%;\n        margin-left: 1em;\n        }\n        .actionLabel{\n        width:20em;\n        display: inline-block;\n        }\n        .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        min-height: 20em;\n        overflow: auto; /*of overflow(-y): scroll;*/\n        }\n        \n        .locked{\n        /*background-color: indianred;*/\n        background-color: indianred;\n        \n        }\n        \n        \n        \n        \n\n        "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, projectService_component_1.ProjectService, townService_component_1.TownService, begrotingService_1.BegrotingService])
                ], AddPropositionComponent);
                return AddPropositionComponent;
            })();
            exports_1("AddPropositionComponent", AddPropositionComponent);
        }
    }
});
//# sourceMappingURL=addProposition.component.js.map