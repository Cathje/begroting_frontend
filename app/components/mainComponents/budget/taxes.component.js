System.register(['angular2/core', './../../../services/townService.component.js', 'angular2/router', './../../subComponents/graphs/sunburst.component.js', './../../subComponents/graphs/sunburstCompare.component.js'], function(exports_1) {
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
    var core_1, townService_component_js_1, router_1, router_2, sunburst_component_js_1, sunburstCompare_component_js_1;
    var TaxesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
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
                //categories2: [[string, string]] = null;
                //categories2: Observable<[ [string, string]]>;
                function TaxesComponent(_routeParams, _townService, ref) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._townService = _townService;
                    this.ref = ref;
                    this.title = 'Gemeente - Salarisvoorstel';
                    this.param = ""; //not required
                    this.mySalary = 2000;
                    this.categories = [["Algemene financiering ", "22781"],
                        ["Zorg en opvang ", "281"],
                        ["Wonen en ruimtelijke ordening ", "3311"],
                        ["Veiligheidszorg ", "906"],
                        ["Cultuur en vrije tijd ", "5324"],
                        ["Leren en onderwijs ", "4512"],
                        ["Zich verplaatsen en mobiliteit ", "1203"],
                        ["Algemeen bestuur ", "7854"],
                        ["Natuur en milieubeheer ", "6325"],
                        ["Ondernemen en werken ", "1002"]];
                    this.categories2 = [["Algemene financiering ", "22781"],
                        ["Zorg en opvang ", "281"],
                        ["Wonen en ruimtelijke ordening ", "3311"],
                        ["Veiligheidszorg ", "906"],
                        ["Cultuur en vrije tijd ", "5324"],
                        ["Leren en onderwijs ", "4512"],
                        ["Zich verplaatsen en mobiliteit ", "1203"],
                        ["Algemeen bestuur ", "7854"],
                        ["Natuur en milieubeheer ", "6325"],
                        ["Ondernemen en werken ", "1002"]];
                    this.routeParams = _routeParams;
                    this.service = _townService;
                    this.towns = _townService.getTownsHC(); //TODO: delete
                    _townService.getTowns()
                        .subscribe(function (towns) { return _this.towns = towns; });
                    this.myTown = _townService.getTownHC(this._routeParams.get('town')); //TODO: delete
                    _townService.getTown(this._routeParams.get('town'))
                        .subscribe(function (town) { return _this.myTown = town; });
                }
                //call upon initial load
                TaxesComponent.prototype.ngOnInit = function () {
                    this.param = this.routeParams.get('town');
                };
                TaxesComponent.prototype.getNewTown = function (event) {
                    var total = 0;
                    var tempCategories = [["", ""]];
                    //TODO: get data of chosen town and generate new Sunburst
                    console.log("te vergelijken gemeente: " + event.target.value);
                    this.compareTown = this.service.getTownHC(event.target.value); //TODO: replace by service
                    //get town tax
                    var myTax = this.compareTown.aanslagVoet * this.mySalary;
                    this.compareTownCats = this._townService.getCatDataHC(); //TODO: implement correct call in service
                    //set the correct tax amounts per category
                    for (var i = 0; i < this.compareTownCats.length; i++) {
                        total += this.compareTownCats[i].bedrag;
                    }
                    for (var i = 0; i < this.compareTownCats.length; i++) {
                        var share = (this.compareTownCats[i].bedrag / total);
                        var taxAmount = (myTax * share);
                        tempCategories[i] = [this.compareTownCats[i].hoofdCategorie, taxAmount.toString()];
                    }
                    //TODO: generate new sunburst!!!???
                    this.categories2 = tempCategories;
                    for (var i = 0; i < this.categories.length; i++) {
                        console.log(this.categories2[i]);
                    }
                };
                TaxesComponent.prototype.calculateSalary = function () {
                    var total = 0;
                    var tempCategories = [["", ""]];
                    //TODO: calculate tax percentages of provided salary and generate new Sunburst
                    console.log("mijn salaris: " + this.mySalary);
                    //get town tax
                    var myTax = this.myTown.aanslagVoet * this.mySalary;
                    console.log("ik betaal " + myTax + " belasting ");
                    //get category data
                    this.myTownCats = this._townService.getCatDataHC(); //TODO: implement correct call in service
                    //set the correct tax amounts per category
                    for (var i = 0; i < this.myTownCats.length; i++) {
                        total += this.myTownCats[i].bedrag;
                    }
                    for (var i = 0; i < this.myTownCats.length; i++) {
                        var share = (this.myTownCats[i].bedrag / total);
                        var taxAmount = (myTax * share);
                        tempCategories[i] = [this.myTownCats[i].hoofdCategorie, taxAmount.toString()];
                    }
                    //TODO: generate new sunburst!!!???
                    this.categories2 = tempCategories;
                    for (var i = 0; i < this.categories.length; i++) {
                        console.log(this.categories2[i]);
                    }
                };
                TaxesComponent = __decorate([
                    core_1.Component({
                        selector: 'taxes-container',
                        template: "\n\t\t<div class=\"container\">\n\t\t        <h1>{{title}} en parameter: {{param}}</h1>\n\n            <div class=\"row\">\n                <div class=\"thisTownArea col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                    <div class=\"row\">\n                        <section id=\"sliderSection\">\n\t\t\t                <input type=\"range\" id=\"speedSlider\" [(ngModel)]=\"mySalary\" min=\"1500\" max=\"15000\" value=\"2000\" step=\"50\" (change)=\"calculateSalary()\"/>\n\t\t                </section>\n                    </div>\n\t\t\t\t\t<div class=\"row\">\n\t\t\t\t\t    <sunburst [data]=categories width=500 height=600></sunburst>\n\t\t            </div>\n                </div>\n                <div class=\"otherTownArea col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                    <div class=\"row\">\n                        <div class=\"\">\n                            <select class=\"selectClass\" (change)=\"getNewTown($event)\">\n                                <option>Selecteer een gemeente</option>\n                                <option *ngFor=\"#town of towns\" [value]=\"town.naam\">{{town.naam}} </option>\n                            </select>\n                        </div>\n                    </div>\n\t\t\t\t\t<div class=\"row\">\n                        <sunburstCompare [data]=categories2 width=500 height=600></sunburstCompare>\n                    </div>\n                </div>\n\t\t\t</div>\n        </div>\n\n\n\n\n\n\n\n\n",
                        directives: [sunburst_component_js_1.SunburstComponent, router_2.ROUTER_DIRECTIVES, sunburstCompare_component_js_1.SunburstCompare],
                        providers: [
                            townService_component_js_1.TownService,
                        ],
                        styles: ["\n\n   .thisTownArea{\n   //background-color: #00b3ee;\n   }\n   .otherTownArea{\n   //background-color: #9c0033;\n   }\n   #speedSlider {\n   width: 50%;\n   margin: auto;\n   }\n   #sunburstSection{\n   padding: 1%;\n   margin-left: 1%;\n   flex: 3;\n   -webkit-flex-grow: 3;\n\n   }\n   .selectClass{\n   display: block;\n   margin: 0 auto;\n\n   }\n\n\n/*Range CSS*/\ninput[type=range] {\n  -webkit-appearance: none;\n  width: 100%;\n  margin: 5.3px 0;\n}\ninput[type=range]:focus {\n  outline: none;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 8.4px;\n  cursor: pointer;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n  background: #2ac7d2;\n  border-radius: 17.1px;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n}\ninput[type=range]::-webkit-slider-thumb {\n  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;\n  border: 1px solid #3d0000;\n  height: 19px;\n  width: 41px;\n  border-radius: 44px;\n  background: rgba(36, 37, 40, 0.88);\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -7.9px;\n}\ninput[type=range]:focus::-webkit-slider-runnable-track {\n  background: #97e5ea;\n}\ninput[type=range]::-moz-range-track {\n  width: 100%;\n  height: 8.4px;\n  cursor: pointer;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n  background: #2ac7d2;\n  border-radius: 17.1px;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n}\ninput[type=range]::-moz-range-thumb {\n  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;\n  border: 1px solid #3d0000;\n  height: 19px;\n  width: 41px;\n  border-radius: 44px;\n  background: rgba(36, 37, 40, 0.88);\n  cursor: pointer;\n}\ninput[type=range]::-ms-track {\n  width: 100%;\n  height: 8.4px;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\ninput[type=range]::-ms-fill-lower {\n  background: #145e63;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n  border-radius: 34.2px;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n}\ninput[type=range]::-ms-fill-upper {\n  background: #2ac7d2;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n  border-radius: 34.2px;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n}\ninput[type=range]::-ms-thumb {\n  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;\n  border: 1px solid #3d0000;\n  height: 19px;\n  width: 41px;\n  border-radius: 44px;\n  background: rgba(36, 37, 40, 0.88);\n  cursor: pointer;\n  height: 8.4px;\n}\ninput[type=range]:focus::-ms-fill-lower {\n  background: #2ac7d2;\n}\ninput[type=range]:focus::-ms-fill-upper {\n  background: #97e5ea;\n}\n/*End Range CSS*/\n\n\n\n\n"]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, (typeof (_a = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _a) || Object, core_1.ChangeDetectorRef])
                ], TaxesComponent);
                return TaxesComponent;
                var _a;
            })();
            exports_1("TaxesComponent", TaxesComponent);
        }
    }
});
//# sourceMappingURL=taxes.component.js.map