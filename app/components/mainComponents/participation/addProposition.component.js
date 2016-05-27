System.register(['angular2/core', 'angular2/router', "../../../services/projectService.component", "../../../services/begrotingService", './../../subComponents/input/rangeSlider.component', './../../subComponents/graphs/sunburst.component', "../../../services/townService.component", "./../../../models/project", "../../../models/bugdetWijziging", "../../../models/begrotingsVoorstel", "./../../../pipes/curConvertPipe"], function(exports_1, context_1) {
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
    var core_1, router_1, projectService_component_1, begrotingService_1, rangeSlider_component_1, sunburst_component_1, router_2, townService_component_1, project_1, bugdetWijziging_1, begrotingsVoorstel_1, curConvertPipe_1;
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
            },
            function (curConvertPipe_1_1) {
                curConvertPipe_1 = curConvertPipe_1_1;
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
                    this.afb = [];
                    this.budgetChange = false;
                    this.budgetMap = new Map();
                    this.actionMap = new Map();
                    //upload images
                    this.uploadImages = function (event) {
                        _this.loadimage(event.target.files[0], function (img) {
                            _this.afb.push(event.target.files[0].name);
                            _this.begrotingsVoorstel.afbeeldingen.push(img);
                        });
                    };
                    this.loadimage = function (img, cb) {
                        var reader = new FileReader();
                        reader.readAsDataURL(img);
                        reader.onload = function () {
                            var result = reader.result;
                            cb(result); //callback to store image
                        };
                    };
                    this.onCircleClick = function (id) {
                        alert('test');
                    };
                    this._begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (cats) { return _this.categories = cats; }, function (err) { return _this.errorMessage = "Er zijn geen categorieën gevonden."; });
                    this._projectService.getProject(this.year, "Gent")
                        .subscribe(function (project) {
                        _this.project = project;
                        console.log(project);
                    }, function (err) {
                        _this._projectService.getInspraakitems(_this.year, "Gent")
                            .subscribe(function (cats) { return _this.project = cats; }, function (err) { return _this.errorMessage = "Geen inspraakitems gevonden."; });
                    });
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
                    this.budgetChange = true; //Todo; optimaliseren!
                    /*Check for repeating change. If so, remove from budget map and reset all values*/
                    var item = this.budgetMap.get(event.id);
                    if (item != null) {
                        /*this.budgetMap.forEach(this.logMapElements);*/
                        //correct budgetChanges if previously changed cat is changed again
                        //remove elements, children, parents and adjust amounts
                        var tempSavings = [];
                        var repLevel = 3;
                        //get A level elements
                        for (var i = 0; i < this.project.cats.length; i++) {
                            if (this.project.cats[i].ID == event.id) {
                                //if top level
                                repLevel = 1;
                                tempSavings.push(this.project.cats[i].ID);
                                for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                                    if (this.project.cats[i].childCats[j].inspraakNiveau != 2) {
                                        tempSavings.push(this.project.cats[i].childCats[j].ID);
                                    }
                                    for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                                        if (this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) {
                                            tempSavings.push(this.project.cats[i].childCats[j].childCats[k].ID);
                                        }
                                        for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                            if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                                tempSavings.push(this.project.cats[i].childCats[j].childCats[k].acties[l].ID);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        //get B level elements
                        if (repLevel != 1) {
                            for (var i = 0; i < this.project.cats.length; i++) {
                                for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                                    if (this.project.cats[i].childCats[j].ID == event.id) {
                                        repLevel == 3;
                                        //add parent
                                        tempSavings.push(this.project.cats[i].ID);
                                        if (this.project.cats[i].childCats[j].inspraakNiveau != 2) {
                                            tempSavings.push(this.project.cats[i].childCats[j].ID);
                                        }
                                        for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                                            if (this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) {
                                                tempSavings.push(this.project.cats[i].childCats[j].childCats[k].ID);
                                            }
                                            for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                                if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                                    tempSavings.push(this.project.cats[i].childCats[j].childCats[k].acties[l].ID);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        //get C level elements
                        if (repLevel == 3) {
                            for (var i = 0; i < this.project.cats.length; i++) {
                                for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                                    for (var k = 0; k < this.project.cats[i].childCats[j].childCats.length; k++) {
                                        if (this.project.cats[i].childCats[j].childCats[k].ID == event.id) {
                                            //add parents
                                            tempSavings.push(this.project.cats[i].ID);
                                            tempSavings.push(this.project.cats[i].childCats[j].ID);
                                            if (this.project.cats[i].childCats[j].childCats[k].inspraakNiveau != 2) {
                                                tempSavings.push(this.project.cats[i].childCats[j].childCats[k].ID);
                                            }
                                            for (var l = 0; l < this.project.cats[i].childCats[j].childCats[k].acties.length; l++) {
                                                if (this.project.cats[i].childCats[j].childCats[k].acties[l].inspraakNiveau != 2) {
                                                    tempSavings.push(this.project.cats[i].childCats[j].childCats[k].acties[l].ID);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        //delete all temp elements from map and reset prices by looping through project cats
                        for (var i = 0; i < tempSavings.length; i++) {
                            var origValue = 0;
                            for (var j = 0; j < this.categories.length; j++) {
                                if (this.categories[j].ID == tempSavings[i]) {
                                    origValue = this.categories[j].totaal;
                                    /*console.log("original" + origValue);*/
                                    for (var k = 0; k < this.project.cats.length; k++) {
                                        if (this.categories[j].ID == this.project.cats[k].ID) {
                                            this.project.cats[k].totaal = origValue;
                                        }
                                        for (var l = 0; l < this.project.cats[k].childCats.length; l++) {
                                            if (this.categories[j].ID == this.project.cats[k].childCats[l].ID) {
                                                this.project.cats[k].childCats[l].totaal = origValue;
                                            }
                                            for (var m = 0; m < this.project.cats[k].childCats[l].childCats.length; m++) {
                                                if (this.categories[j].ID == this.project.cats[k].childCats[l].childCats[m].ID) {
                                                    this.project.cats[k].childCats[l].childCats[m].totaal = origValue;
                                                }
                                                for (var n = 0; n < this.project.cats[k].childCats[l].childCats[m].acties.length; n++) {
                                                    if (this.categories[j].ID == this.project.cats[k].childCats[l].childCats[m].acties[n].ID) {
                                                        this.project.cats[k].childCats[l].childCats[m].acties[n].uitgaven = origValue;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            this.budgetMap.delete(tempSavings[i]);
                        }
                        //reset action values
                        for (var p = 0; p < this.project.cats.length; p++) {
                            for (var q = 0; q < this.project.cats[p].childCats.length; q++) {
                                for (var r = 0; r < this.project.cats[p].childCats[q].childCats.length; r++) {
                                    for (var s = 0; s < this.project.cats[p].childCats[q].childCats[r].acties.length; s++) {
                                        var amount = this.actionMap.get(this.project.cats[p].childCats[q].childCats[r].acties[s].ID);
                                        if (amount != null) {
                                            this.project.cats[p].childCats[q].childCats[r].acties[s].uitgaven = amount;
                                            this.budgetMap.delete(this.project.cats[p].childCats[q].childCats[r].acties[s].ID);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    /*Update budget changes*/
                    //get original value (2way db - different object!!!)
                    for (var i = 0; i < this.categories.length; i++) {
                        if (this.categories[i].ID == event.id) {
                            originalValue = this.categories[i].totaal;
                        }
                    }
                    var result = newValue - originalValue;
                    /*console.log("original: "+ originalValue);
                     console.log("newValue: " + newValue);
                     console.log("result: " + result);*/
                    var level = 3;
                    for (var i = 0; i < this.project.cats.length; i++) {
                        //if top level update sub levels
                        if (this.project.cats[i].ID == event.id) {
                            level = 1;
                            this.project.cats[i].totaal = newValue;
                            /*TODO: update level1 en budgetwijziging!!!!!!!!!*/
                            //add top level budget change
                            //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].ID, result,this.project.cats[i].naamCat ));
                            this.budgetMap.set(this.project.cats[i].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].ID, result, this.project.cats[i].naamCat));
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
                                    //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].ID, levBResult,this.project.cats[i].childCats[j].naamCat ));
                                    this.budgetMap.set(this.project.cats[i].childCats[j].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].ID, levBResult, this.project.cats[i].childCats[j].naamCat));
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
                                        //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult, this.project.cats[i].childCats[j].childCats[k].naamCat));
                                        this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult, this.project.cats[i].childCats[j].childCats[k].naamCat));
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
                                            if (item == null) {
                                                this.actionMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven);
                                            }
                                            //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult, this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort));
                                            this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult, this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort));
                                            this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //if level is not a top
                    if (level != 1) {
                        for (var i = 0; i < this.project.cats.length; i++) {
                            for (var j = 0; j < this.project.cats[i].childCats.length; j++) {
                                if (this.project.cats[i].childCats[j].ID == event.id) {
                                    level = 2;
                                    this.project.cats[i].childCats[j].totaal = newValue;
                                    //add B level budget change
                                    //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].ID, result,this.project.cats[i].childCats[j].naamCat ));
                                    this.budgetMap.set(this.project.cats[i].childCats[j].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].ID, result, this.project.cats[i].childCats[j].naamCat));
                                    //adjust upper level
                                    this.project.cats[i].totaal += result;
                                    //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].ID, result,this.project.cats[i].naamCat ));
                                    this.budgetMap.set(this.project.cats[i].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].ID, result, this.project.cats[i].naamCat));
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
                                            //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult,this.project.cats[i].childCats[j].childCats[k].naamCat ));
                                            this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, levCResult, this.project.cats[i].childCats[j].childCats[k].naamCat));
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
                                                if (item == null) {
                                                    this.actionMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven);
                                                }
                                                //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult,this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort ));
                                                this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult, this.project.cats[i].childCats[j].childCats[k].acties[l].actieKort));
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
                                        this.project.cats[i].childCats[j].childCats[k].totaal = newValue;
                                        //add C-level budget change
                                        //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, result, this.project.cats[i].childCats[j].childCats[k].naamCat));
                                        this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, result, this.project.cats[i].childCats[j].childCats[k].naamCat));
                                        //adjust upper levels
                                        this.project.cats[i].totaal += result;
                                        //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].ID, result,this.project.cats[i].naamCat ));
                                        this.budgetMap.set(this.project.cats[i].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].ID, result, this.project.cats[i].naamCat));
                                        this.project.cats[i].childCats[j].totaal += result;
                                        //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].ID, result,this.project.cats[i].childCats[j].naamCat ));
                                        this.budgetMap.set(this.project.cats[i].childCats[j].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].ID, result, this.project.cats[i].childCats[j].naamCat));
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
                                                if (item == null) {
                                                    this.actionMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven);
                                                }
                                                //this.begrotingsVoorstel.budgetWijzigingen.push(new BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].ID, actResult, this.project.cats[i].childCats[j].childCats[k].naamCat));
                                                this.budgetMap.set(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, new bugdetWijziging_1.BudgetWijziging(this.project.cats[i].childCats[j].childCats[k].acties[l].ID, actResult, this.project.cats[i].childCats[j].childCats[k].acties[l].naamCat));
                                                this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven = actResult + this.project.cats[i].childCats[j].childCats[k].acties[l].uitgaven;
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    //convert for visualisation purposes and posting to backend
                    var budgetArray = [];
                    //using "this" in forEach results in errors!!!???
                    this.budgetMap.forEach(function (value) {
                        budgetArray.push(value);
                    });
                    this.begrotingsVoorstel.budgetWijzigingen = budgetArray;
                };
                //utility method: map printing
                AddPropositionComponent.prototype.logMapElements = function (value, key, map) {
                    this.budgetwijzigingen = [];
                    this.budgetwijzigingen.push(value);
                    console.log("k " + key + "] = " + value);
                };
                AddPropositionComponent.prototype.resetBudget = function (event) {
                };
                //@TODO test voor webapi en service  --> te verwijderen
                AddPropositionComponent.prototype.submit = function () {
                    /*//If save button is pressed, copy map to array and persist in db
                     // this.budgetMap.forEach(this.logMapElements);
            
                     this.begrotingsVoorstel.beschrijving = "kjQGQBjqshgbcjhqbckjb<clgbcqjbck:xjhb";
                     // alert(this.BegrotingsVoorstel.budgetWijzigingen.length);
                     this._projectService.postBegrotingsVoorstel(this.project.id, this.begrotingsVoorstel).subscribe();*/
                    this.begrotingsVoorstel.auteurEmail = sessionStorage.getItem('user');
                    this._projectService.postBegrotingsVoorstel(this.project.id, this.begrotingsVoorstel).subscribe();
                };
                AddPropositionComponent = __decorate([
                    core_1.Component({
                        selector: 'add-proposition-container',
                        template: "\n    <div class=\"container\">\n    <div class =\"row\">\n    <h2>{{project.titel}}</h2>\n    <h3>{{project.vraag}}</h3>\n    <p>Hier komt een paragraaf met wat uitleg.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>\n    <!--<p>{{project.extraInfo}}</p>--><!--todo: vervang bovenstaande paragraaf door deze-->\n    <!--TODO: hoe voorzien om nieuw jaar te selecteren. Huidig jaar is default?-->\n     </div>\n        <div class =\"row\">\n            <div class =\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst> \n            </div>\n            <div class =\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <div class =\"row\">\n                    <h2>Gewijzigde categorie\u00EBn en acties</h2>\n                    <div class=\"section-content\">\n                    <!--acties toevoegen aan de box-->\n                    <p *ngIf=\"!budgetChange\">Nog geen wijzigingen...</p>\n                    <!--<div *ngIf=\"begrotingsVoorstel.budgetWijzigingen!=null\">-->\n                    <div *ngIf=\"budgetMap!=null\">\n                        <table class=\"table table-striped\">\n                            <tbody>\n                                <tr *ngFor=\"#change of begrotingsVoorstel.budgetWijzigingen\">\n                                    <td>{{change.beschrijving}}</td>\n                                    <td>{{change.bedrag | currency:'EUR':true:'.0-0'}}</td>\n                                    <!--<td id=\"remove\" (click)=\"resetBudget()\"><span class=\"glyphicon glyphicon-remove\"></span></td>-->\n                                </tr>\n                            </tbody>\n                        </table>\n                    </div>\n                    </div>\n                </div>\n                <div class =\"row\">\n                    <h2 *ngIf=\"scenario===1\">Te besparen bedrag: {{project.bedrag | currency:'EUR':true:'.0-0'}}</h2><!--todo: gebruik project.projectScenario!!!-->\n                    <h2 *ngIf=\"scenario===2\">Te herschikken bedrag: {{project.bedrag | currency:'EUR':true:'.0-0'}}</h2>\n                    <h2 *ngIf=\"scenario===3\">Te bestemmen bedrag: {{project.bedrag | currency:'EUR':true:'.0-0'}}</h2>\n                    <h2>Verschoven bedrag: {{tempTotal | currency:'EUR':true:'.0-0'}}</h2>\n                    <!--<h2>Totaal: \u20AC{{project.bedrag}}</h2>-->\n                </div>\n            </div>\n        </div>\n        <div class=\"row\">\n            <form>\n                <div class=\"form-group\">\n                    <label>Samenvatting</label>\n                    <textarea class=\"form-control\" rows=\"3\" [(ngModel)]=\"begrotingsVoorstel.samenvatting\" placeholder=\"Samenvatting\"></textarea>\n                </div>\n                <div class=\"form-group\">\n                    <label>Motivatie</label>\n                    <textarea class=\"form-control\" rows=\"10\" [(ngModel)]=\"begrotingsVoorstel.beschrijving\" placeholder=\"Motivatie\"></textarea>\n                </div>\n                <div class=\"form-group\">\n                    <label id=\"image\">Afbeeldingen</label>\n                    <label class=\"btn btn-primary btn-file\">\n                        Kies bestand <span class=\"glyphicon glyphicon-upload\"></span><input type=\"file\" style=\"display: none;\" (change)=\"uploadImages($event)\" />\n                    </label>\n                    <div *ngIf=\"afb\">\n                        <ul>\n                            <li *ngFor=\"#af of afb\">{{af}}</li>\n                        </ul>\n                    </div>\n                </div>\n                <button [disabled]=\"submitProject\" (click)=\"submit()\"class=\"btn btn-primary pull-right\" styled>opslaan</button>\n            </form>\n        </div>\n        <div class =\"row\">\n            <h2>Te wijzigen categorie\u00EBn en acties</h2>\n                    <!--outer accordion-->\n                    <div *ngFor=\"#cat of project.cats #i = index\" class=\"panel-group\" #elem1 [attr.id]=\"'levelA_' + cat.ID\"><!--id=\"levelA+cat.id\"\"-->\n                        <div class=\"panel panel-default\">\n                        <div class=\"panel-heading\">\n                          <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#elem1.id\" href=\"#collA_{{cat.ID}}\"> <!--data parent aanpassen?-->\n                            {{cat.naamCat}} <!--{{elem1.id}}--> \n                          </a></h4>\n                        </div>\n                        <div [attr.id]=\"'collA_' + cat.ID\" class=\"panel-collapse collapse\"><!--id=\"collapseInnerA\"-->\n                          <div class=\"panel-body\">\n                            <!--a form for capturing budget shifts on cat level-->\n                            <form class=\"form-inline\">\n                                <div class=\"form-group sliderContainer\">\n                                    <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"cat.totaal\" [value]=\"cat.totaal\" [itemID] = \"cat.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"cat.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                </div>\n                                <div class=\"form-group\">\n                                    <input [ngClass]=\"{locked: cat.inspraakNiveau  != 3}\"  class=\"form-control\" id=\"taxInput\" type=\"text\" [ngModel]=\"cat.totaal  | curPipe \" (ngModelChange)=\"cat.totaal\" readonly>\n                                </div>\n                            </form>\n                            <!--a form for capturing budget shifts on action level-->\n                            <!--<h3>Acties</h3>\n                            <p *ngIf=\"cat.acties==null\">Er zijn geen acties gedefinieerd op dit niveau</p>\n                            <div *ngIf=\"cat.acties!=null\">\n                                <form *ngFor=\"#acA of cat.acties #l = index\" class=\"form-inline\">\n                                    <div class=\"form-group\">\n                                        <label class=\"actionLabel\" for=\"slide\">{{acA.actieKort}}</label>\n                                        <input [ngClass]=\"{locked: acA.inspraakNiveau  != 3}\" type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"acA.uitgaven\" readonly>\n                                    </div>\n                                    <div class=\"form-group actionSliderContainer\">\n                                        &lt;!&ndash;<slider name=\"slide\" id=\"speedSlider\" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)=\"updateBudget()\"></slider>&ndash;&gt;\n                                        <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"acA.uitgaven\" [value]=\"acA.uitgaven\" [itemID] = \"acA.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"acA.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                    </div>\n                                </form>\n                            </div>-->\n                            <!-- Level B accordion -->\n                            <div *ngFor=\"#levB of cat.childCats #j = index\" class=\"panel-group\" #elem2 [attr.id]=\"'levelB_' + levB.ID\"><!--id=\"levelA+cat.id\"\"-->\n                              <div class=\"panel panel-default\">\n                                <div class=\"panel-heading\">\n                                  <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#elem2.id\" href=\"#collB_{{levB.ID}}\">\n                                    {{levB.naamCat}}\n                                  </a></h4>\n                                </div>\n                                <div [attr.id]=\"'collB_' + levB.ID\" class=\"panel-collapse collapse in\">\n                                  <div class=\"panel-body\">\n                                    <!--a form for capturing budget shifts-->\n                                    <form class=\"form-inline\">\n                                        <div class=\"form-group sliderContainer\">\n                                            <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"levB.totaal\" [value]=\"levB.totaal\" [itemID] = \"levB.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"levB.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                        </div>\n                                        <div class=\"form-group\">\n                                            <input [ngClass]=\"{locked: levB.inspraakNiveau  != 3}\" type=\"text\" class=\"form-control\" id=\"taxInput\" [ngModel]=\"levB.totaal  | curPipe\" (ngModelChange)=\"levB.totaal\" readonly>\n                                        </div>\n                                    </form>\n                                    <!--a form for capturing budget shifts on action level-->\n                                    <!--<h3>Acties</h3>\n                                    <p *ngIf=\"levB.acties==null\">Er zijn geen acties gedefinieerd op dit niveau</p>\n                                    <div *ngIf=\"levB.acties!=null\">\n                                        <form *ngFor=\"#acB of levB.acties #k = index\" class=\"form-inline\">\n                                            <div class=\"form-group\">\n                                                <label class=\"actionLabel\" for=\"slide\">{{acB.actieKort}}</label>\n                                                <input [ngClass]=\"{locked: acB.inspraakNiveau  != 3}\" type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"acB.uitgaven\" readonly>\n                                                &lt;!&ndash;<slider name=\"slide\" id=\"speedSlider\" [min]=0 [max]=5000000 [value]=2000 [step]=1000 (changes)=\"updateBudget()\"></slider>&ndash;&gt;\n                                            </div>\n                                            <div class=\"form-group actionSliderContainer\">\n                                                &lt;!&ndash;<input type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"myTaxes\" readonly>&ndash;&gt;\n                                                <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"acB.uitgaven\" [value]=\"acB.uitgaven\" [itemID] = \"acB.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"acB.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                            </div>\n                                        </form>\n                                    </div>-->\n                                  <!--Level C accordion-->\n                                    <div *ngFor=\"#levC of levB.childCats #j = index\" class=\"panel-group\" #elem3 [attr.id]=\"'levelC_' + levC.ID\"><!--id=\"levelA+cat.id\"\"-->\n                                      <div class=\"panel panel-default\">\n                                        <div class=\"panel-heading\">\n                                          <h4 class=\"panel-title\"><a data-toggle=\"collapse\" data-parent=\"#elem3.id\" href=\"#collC_{{levC.ID}}\">\n                                            {{levC.naamCat}}\n                                          </a></h4>\n                                        </div>\n                                        <div [attr.id]=\"'collC_' + levC.ID\" class=\"panel-collapse collapse in\">\n                                          <div class=\"panel-body\">\n                                          <!--a form for capturing budget shifts-->\n                                            <form class=\"form-inline\">\n                                                <div class=\"form-group sliderContainer\">\n                                                    <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"levC.totaal\" [value]=\"levC.totaal\" [itemID] = \"levC.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"levC.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                                </div>\n                                                <div class=\"form-group\">\n                                                    <input [ngClass]=\"{locked: levC.inspraakNiveau  != 3}\" type=\"text\" class=\"form-control\" id=\"taxInput\" [ngModel]=\"levC.totaal  | curPipe\" (ngModelChange)=\"levC.totaal\" readonly>\n                                                </div>\n                                            </form>\n                                            <!--a form for capturing budget shifts on action level-->\n                                            <h3>Acties</h3>\n                                            <p *ngIf=\"levC.acties==null\">Er zijn geen acties gedefinieerd</p>\n                                            <div *ngIf=\"levC.acties!=null\"> \n                                                <!--<form *ngFor=\"#ac of levC.acties #k = index\" class=\"form-inline\">\n                                                    <div class=\"form-group\">\n                                                        <label class=\"actionLabel\" for=\"slide\">{{ac.actieLang}}</label>\n                                                        <input [ngClass]=\"{locked: ac.inspraakNiveau  != 3}\" type=\"number\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"ac.uitgaven\" readonly>\n                                                    </div>\n                                                    &lt;!&ndash;<div class=\"form-group actionSliderContainer\">\n                                                        <slider name=\"slide\" id=\"speedSlider\" [(data)]=\"ac.uitgaven\" [value]=\"ac.uitgaven\" [itemID] = \"ac.ID\" [propositionParent]=\"ISPROP\" [inspraakNiveau]=\"ac.inspraakNiveau\" (changes)=\"updateBudget($event)\"></slider>\n                                                    </div>&ndash;&gt;\n                                                </form>-->\n                                                <table class=\"table table-striped\">\n                                                    <tbody>\n                                                        <tr *ngFor=\"#ac of levC.acties #k = index\">\n                                                            <td>{{ac.actieLang}}</td>\n                                                            <td class=\"tdInput\">\n                                                                <input [ngClass]=\"{locked: ac.inspraakNiveau  != 3}\" type=\"text\" class=\"form-control\" id=\"taxInput\" [ngModel]=\"ac.uitgaven  | curPipe\" (ngModelChange)=\"ac.uitgaven\" readonly>\n                                                            </td>\n                                                        </tr>\n                                                    </tbody>\n                                                </table>\n                                            </div>\n                                          </div>\n                                        </div>\n                                      </div>\n                                    </div>\n                                  </div>\n                                </div>\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                      </div>\n                    </div>\n        </div>\n    </div>\n    \n    \n               \n\n\n\n\n        ",
                        directives: [sunburst_component_1.SunburstComponent, router_2.ROUTER_DIRECTIVES, rangeSlider_component_1.rangeSlider],
                        providers: [
                            projectService_component_1.ProjectService, townService_component_1.TownService, begrotingService_1.BegrotingService
                        ],
                        pipes: [curConvertPipe_1.CurConvert],
                        styles: ["\n\n        /*be very specific to change colors*/\n        .panel-default >.panel-heading {\n            background-color: #2ac7d2;\n        }\n        #image{\n        width: 100%;\n        }\n        #remove{\n         cursor: pointer; \n         cursor: hand;\n        }\n        ul\n        {\n            list-style-type: none;\n            margin-top: 1em;\n        }\n        .sliderContainer{\n        width: 80%;\n        margin-right: 1em;\n        }\n        .form-inline{\n        margin-bottom: 1em;\n        }\n        .actionSliderContainer{\n        width: 30%;\n        margin-left: 1em;\n        }\n        .actionLabel{\n        width:60em;\n        display: inline-block;\n        }\n        .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        height: 20em;\n        overflow-y: auto; /*of overflow-y: scroll;*/\n        }\n        \n        .locked{\n        /*background-color: indianred;*/\n        background-color: indianred;\n        \n        \n        }\n        .tdInput{\n        width: 15em;\n        }\n        \n        \n        \n        \n\n        "]
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