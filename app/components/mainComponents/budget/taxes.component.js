System.register(['angular2/core', './../../../services/townService.component.js', './../../../services/begrotingService.js', 'angular2/router', './../../subComponents/graphs/sunburst.component.js', './../../subComponents/graphs/sunburstCompare.component.js'], function(exports_1) {
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
    var core_1, townService_component_js_1, begrotingService_js_1, router_1, router_2, sunburst_component_js_1, sunburstCompare_component_js_1;
    var TaxesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
            },
            function (begrotingService_js_1_1) {
                begrotingService_js_1 = begrotingService_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (sunburst_component_js_1_1) {
                sunburst_component_js_1 = sunburst_component_js_1_1;
            },
            function (sunburstCompare_component_js_1_1) {
                sunburstCompare_component_js_1 = sunburstCompare_component_js_1_1;
            }],
        execute: function() {
            TaxesComponent = (function () {
                function TaxesComponent(_routeParams, _townService, _budgetService) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._townService = _townService;
                    this._budgetService = _budgetService;
                    this.title = 'Gemeente - Salarisvoorstel';
                    this.param = ""; //not required
                    this.mySalary = 2000;
                    this.myTaxes = 0;
                    /*private categories: [{naamCatz : string, uitgave : number}] = [{"naamCatz" : "", "uitgave" : 0}];
                    private categories2: [{naamCatz : string, uitgave : number}] = [{"naamCatz" : "", "uitgave" : 0}];*/
                    this.categories = [{ "naamCatz": "", "totaal": 0 }];
                    this.categories2 = [{ "naamCatz": "", "totaal": 0 }];
                    this.categories3 = [{ catCode: "0990", naamCatz: "Financiële aangelegenheden", totaal: 22781 },
                        { catCode: "0991", naamCatz: "Patrimonium zonder maatschappelijk doel", totaal: 281 },
                        { catCode: "099", naamCatz: "Gezin en kinderen", totaal: 3311 },
                        { catCode: "098", naamCatz: "Sport", totaal: 906 }];
                    this.routeParams = _routeParams;
                    this.service = _townService;
                    this.budgetService = _budgetService;
                    this.towns = _townService.getTownsHC(); //TODO: delete
                    _townService.getTowns() //TODO: service implementation
                        .subscribe(function (towns) { return _this.towns = towns; });
                    this.myTown = _townService.getTownHC("Antwerpen"); //TODO: delete
                    //default stad is Antwerpen
                    this.compareTown = _townService.getTownHC("Antwerpen"); //TODO: delete and service implementation
                    _townService.getTown(this._routeParams.get('town')) //TODO: deep routing
                        .subscribe(function (town) { return _this.myTown = town; });
                }
                //call upon initial load
                TaxesComponent.prototype.ngOnInit = function () {
                    /*TODO: nieuwe deep routing params*/
                    this.param = this.routeParams.get('town');
                    //load graph for provided town in current year
                    var today = new Date();
                    var year = today.getFullYear;
                    var tempCategories = this.budgetService.getCategorieHC(year, this.param);
                    this.categories.pop(); /*TODO: andere manier vinden voor deze omweg (counter?)*/
                    /*TODO: use real service observable*/
                    for (var i = 0; i < tempCategories.length; i++) {
                        if (tempCategories[i].naamCaty == null) {
                            this.categories.push(tempCategories[i]);
                        }
                    }
                    this.calculateSalary(true);
                };
                TaxesComponent.prototype.getNewTown = function (event) {
                    var total = 0;
                    var compCategories = [{ "naamCatz": "", "totaal": 0 }];
                    //get town to compare and tax
                    this.compareTown = this.service.getTownHC(event.target.value); //TODO: replace by service
                    var myTax = this.compareTown.aanslagVoet * this.mySalary;
                    //get cat data for chosen town
                    var today = new Date();
                    var year = today.getFullYear;
                    var tempCategories = this.budgetService.getCategorieHC(year, this.compareTown.naam);
                    compCategories.pop(); /*TODO: andere manier vinden voor deze omweg (counter?)*/
                    /*TODO: use real service observable*/
                    for (var i = 0; i < tempCategories.length; i++) {
                        if (tempCategories[i].naamCaty == null) {
                            compCategories.push(tempCategories[i]);
                        }
                    }
                    //set the correct tax amounts per category
                    for (var i = 0; i < compCategories.length; i++) {
                        total += compCategories[i].totaal;
                    }
                    for (var i = 0; i < compCategories.length; i++) {
                        var share = (compCategories[i].totaal / total);
                        var taxAmount = (myTax * share);
                        compCategories[i] = { "naamCatz": compCategories[i].naamCatz, "totaal": taxAmount };
                    }
                    this.categories2 = compCategories;
                    for (var i = 0; i < this.categories2.length; i++) {
                        console.log("cat " + this.categories2[i].naamCatz + " belasting " + this.categories[i].totaal);
                    }
                };
                TaxesComponent.prototype.calculateSalary = function (init) {
                    var total = 0;
                    var tempCategories = [{ "naamCatz": "", "totaal": 0 }];
                    //get town tax
                    this.myTaxes = this.myTown.aanslagVoet * this.mySalary;
                    //set the correct tax amounts per category
                    for (var i = 0; i < this.categories.length; i++) {
                        total += this.categories[i].totaal;
                    }
                    for (var i = 0; i < this.categories.length; i++) {
                        var share = (this.categories[i].totaal / total);
                        var taxAmount = (this.myTaxes * share);
                        tempCategories[i] = { "naamCatz": this.categories[i].naamCatz, "totaal": taxAmount };
                    }
                    //generate new sunburst
                    this.categories = tempCategories;
                    if (init) {
                        this.categories2 = this.categories;
                    }
                };
                TaxesComponent = __decorate([
                    core_1.Component({
                        selector: 'taxes-container',
                        template: "\n       <div class=\"container\">\n\t\t    <div class =\"row\" col-lg-12 col-md-12 col-sm-12 col-xs-12>\n\t\t    <h1>De belastingen in jouw stad: {{myTown.naam}}</h1>\n            <p id=\"intro\">Hier komt een paragraaf met wat uitleg.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>\n            </div>\n            <div class=\"row\">\n                <div class=\"thisTownArea col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                    <div class=\"row topRow\">\n                        <!--<div class=\"labelArea col-lg-6 col-md-6 col-sm-6 col-xs-6\">\n                            <span id=\"salLabel\" class=\"label label-default glyphicon glyphicon-euro\">{{mySalary}}</span>\n                            <span id=\"salLabel\" class=\"label label-default glyphicon glyphicon-euro\">{{my}}</span>\n                        </div>\n                        <div class=\"rangeArea col-lg-6 col-md-6 col-sm-6 col-xs-6\">\n                            <input type=\"range\" name=\"slide\" id=\"speedSlider\" [(ngModel)]=\"mySalary\" min=\"1500\" max=\"15000\" value=\"2000\" step=\"50\" (change)=\"calculateSalary()\"/>\n                        </div>-->\n                        <div class=\"rangeArea col-lg-12 col-md-12 col-sm-12 col-xs-12\">\n                            <input type=\"range\" name=\"slide\" id=\"speedSlider\" [(ngModel)]=\"mySalary\" min=\"1500\" max=\"15000\" value=\"2000\" step=\"50\" (change)=\"calculateSalary()\"/>\n                        </div>\n                        <div class=\"labelArea col-lg-12 col-md-12 col-sm-12 col-xs-126\">\n                        <form class=\"form-inline\">\n                          <div class=\"form-group\">\n                            <label for=\"exampleInputName2\">Loon </label>\n                            <input type=\"text\" class=\"form-control\" id=\"salaryInput\" [(ngModel)]=\"mySalary\" readonly>\n                          </div>\n                          <div class=\"form-group\">\n                            <label for=\"exampleInputEmail2\">Belasting </label>\n                            <input type=\"email\" class=\"form-control\" id=\"taxInput\" [(ngModel)]=\"myTaxes\" readonly>\n                          </div>\n                        </form>\n                        </div>\n                        \n                        <!--<section id=\"sliderSection\">\n                            <span id=\"salLabel\" class=\"label label-default glyphicon glyphicon-euro\">{{mySalary}}</span>\n\t\t\t                <input type=\"range\" name=\"slide\" id=\"speedSlider\" [(ngModel)]=\"mySalary\" min=\"1500\" max=\"15000\" value=\"2000\" step=\"50\" (change)=\"calculateSalary()\"/>\n\t\t\t            </section>-->\n\t\t\t        </div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t    <sunburstCompare [data]=categories width=500 height=600></sunburstCompare>\n\t\t            </div>\n                </div>\n                <div class=\"otherTownArea col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                    <div class=\"row topRow\">\n                        <div class=\"\">\n                            <div class=\" styled-select slate\">\n                                <select id=\"select2\" class=\"\" (change)=\"getNewTown($event)\">\n                                    <option>Selecteer een gemeente</option>\n                                    <option *ngFor=\"#town of towns\" [value]=\"town.naam\">{{town.naam}} </option>\n                                </select>\n                            </div>\n                        </div>\n                    </div>\n\t\t\t\t\t<div class=\"row\">\n                        <sunburstCompare [data]=categories2 width=500 height=600></sunburstCompare>\n                    </div>\n                </div>\n\t\t\t</div>\n        </div>\n\n\n\n\n\n\n\n\n",
                        directives: [sunburst_component_js_1.SunburstComponent, router_2.ROUTER_DIRECTIVES, sunburstCompare_component_js_1.SunburstCompare],
                        providers: [
                            townService_component_js_1.TownService, begrotingService_js_1.BegrotingService
                        ],
                        styles: ["\n\n   .thisTownArea{\n   /*background-color: #00b3ee;*/\n   }\n   .otherTownArea{\n   /*background-color: #9c0033;*/\n   }\n   /*.labelArea{\n   background-color: #00b3ee;\n   }\n   .rangeArea{\n   background-color: #9c0033;\n   }*/\n   \n   #speedSlider {\n   width: 70%;\n   margin-top: 1em;\n   margin-bottom: 3em;\n   /*margin-right: 10em;*/\n   text-align: center;\n   }\n   #sunburstSection{\n   padding: 1%;\n   margin-left: 1%;\n   flex: 3;\n   -webkit-flex-grow: 3;\n\n   }\n   .selectClass{\n   display: block;\n   margin: 0 auto;\n\n   }\n   #intro{\n   margin-bottom: 5em;\n   }\n   .topRow{\n   min-height: 10em;\n   }\n   \n \n   .label{\n   display: block;\n   margin: 0 auto;\n   width: 4.5em;\n   height: 1.5em;\n   //margin-bottom: 2em;\n   background-color: #2ac7d2;\n   font-size: 2em;\n   color: #000;\n   }\n   \n  /* output { \n  position: absolute;\n  background-image: linear-gradient(top, #444444, #999999);\n  width: 40px; \n  height: 30px; \n  text-align: center; \n  color: white; \n  border-radius: 10px; \n  display: inline-block; \n  font: bold 15px/30px Georgia;\n  bottom: 175%;\n  left: 0;\n  margin-left: -1%;\n}*/\n\n\n/*Range CSS*/\ninput[type=range] {\n  -webkit-appearance: none;\n  width: 100%;\n  margin: 5.3px 0;\n}\ninput[type=range]:focus {\n  outline: none;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 8.4px;\n  cursor: pointer;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n  background: #2ac7d2;\n  border-radius: 17.1px;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n}\ninput[type=range]::-webkit-slider-thumb {\n  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;\n  border: 1px solid #3d0000;\n  height: 19px;\n  width: 41px;\n  border-radius: 44px;\n  background: rgba(36, 37, 40, 0.88);\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -7.9px;\n}\ninput[type=range]:focus::-webkit-slider-runnable-track {\n  background: #97e5ea;\n}\ninput[type=range]::-moz-range-track {\n  width: 100%;\n  height: 8.4px;\n  cursor: pointer;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n  background: #2ac7d2;\n  border-radius: 17.1px;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n}\ninput[type=range]::-moz-range-thumb {\n  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;\n  border: 1px solid #3d0000;\n  height: 19px;\n  width: 41px;\n  border-radius: 44px;\n  background: rgba(36, 37, 40, 0.88);\n  cursor: pointer;\n}\ninput[type=range]::-ms-track {\n  width: 100%;\n  height: 8.4px;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\ninput[type=range]::-ms-fill-lower {\n  background: #145e63;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n  border-radius: 34.2px;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n}\ninput[type=range]::-ms-fill-upper {\n  background: #2ac7d2;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n  border-radius: 34.2px;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n}\ninput[type=range]::-ms-thumb {\n  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;\n  border: 1px solid #3d0000;\n  height: 19px;\n  width: 41px;\n  border-radius: 44px;\n  background: rgba(36, 37, 40, 0.88);\n  cursor: pointer;\n  height: 8.4px;\n}\ninput[type=range]:focus::-ms-fill-lower {\n  background: #2ac7d2;\n}\ninput[type=range]:focus::-ms-fill-upper {\n  background: #97e5ea;\n}\n/*End Range CSS*/\n\n\n\n/*dropdown CSS*/\n/*.slate{\n    text-align: center;\n    color:black;\n}\n\n.styled-select {\n    overflow: hidden;\n    width: 240px;\n    margin: 0 auto;\n}*/\n\n.styled-select select {\n    background: url(./../../../../app/images/arrow_down.png) no-repeat right rgba(255,255,255, 0.6);\n    background-size: 35px 35px;\n    border: none;\n    font-size: 14px;\n    /*height: 29px;*/\n    height: 3em;\n    padding: 5px; /* If you add too much padding here, the options won't show in IE */\n    width: 240px;\n    background-color: #2ac7d2;\n    border-radius: 3px;\n    text-align:center;\n}\n\nselect::-ms-expand {\n    display: none;\n}\n\n#select2 {\n    -webkit-appearance: none;\n    -moz-appearance: none;\n    text-indent: 1px;\n    text-overflow: '';\n    display: block;\n    margin: 0 auto;\n    \n}\n/*End dropdown CSS*/\n\n\n\n\n"]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, (typeof (_a = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _a) || Object, (typeof (_b = typeof begrotingService_js_1.BegrotingService !== 'undefined' && begrotingService_js_1.BegrotingService) === 'function' && _b) || Object])
                ], TaxesComponent);
                return TaxesComponent;
                var _a, _b;
            })();
            exports_1("TaxesComponent", TaxesComponent);
        }
    }
});
//# sourceMappingURL=taxes.component.js.map