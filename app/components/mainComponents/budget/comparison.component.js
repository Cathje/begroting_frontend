System.register(['angular2/core', "../../../services/townService.component", './../../subComponents/graphs/sunburst.component', "../../../services/begrotingService"], function(exports_1, context_1) {
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
    var core_1, townService_component_1, sunburst_component_1, begrotingService_1;
    var ComparisonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (sunburst_component_1_1) {
                sunburst_component_1 = sunburst_component_1_1;
            },
            function (begrotingService_1_1) {
                begrotingService_1 = begrotingService_1_1;
            }],
        execute: function() {
            ComparisonComponent = (function () {
                function ComparisonComponent(_begrotingService, _townService) {
                    var _this = this;
                    this._begrotingService = _begrotingService;
                    this._townService = _townService;
                    this.towns = [{ naam: "Berchem" }, { naam: "Gent" }];
                    this.categories = [];
                    this.categories2 = [];
                    this.categories3 = [];
                    this.categories4 = [];
                    this.selectedYear1 = 0;
                    this.selectedYear2 = 0;
                    this.selectedYear3 = 0;
                    this.selectedYear4 = 0;
                    this.selectedTown1 = "";
                    this.selectedTown2 = "";
                    this.selectedTown3 = "";
                    this.selectedTown4 = "";
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.8 : window.innerWidth / 3.5;
                    this.onChangeGraph = function (year, town, graphNumber) {
                        console.log(year, town);
                        console.log('555', _this.selectedTown1, _this.selectedYear1);
                        if (year === 0 || town === "") {
                            _this.errorMessage = "Gelieve een jaartal en een gemeente te selecteren";
                        }
                        else {
                            _this._begrotingService.getGemeenteCategorieen(2020, "Gent")
                                .subscribe(function (finan) {
                                if (graphNumber === "1") {
                                    _this.categories = finan;
                                }
                                else {
                                    _this.categories2 = finan;
                                }
                            }, function (err) { return _this.errorMessage = err; });
                        }
                    };
                    this.onChangeCluster = function (year, town, graphNumber) {
                        console.log(year, town);
                        console.log('555', _this.selectedTown1, _this.selectedYear1);
                        if (year === 0 || town === "") {
                            _this.errorMessage = "Gelieve een jaartal en een gemeente te selecteren";
                        }
                        else {
                            //TODO: replace with new backend function
                            _this._begrotingService.getGemeenteCategorieen(2020, "Gent")
                                .subscribe(function (finan) {
                                if (graphNumber === "1") {
                                    _this.categories3 = finan;
                                }
                                else {
                                    _this.categories4 = finan;
                                }
                            }, function (err) { return _this.errorMessage = err; });
                        }
                    };
                    this.onResize = function (event) {
                        if (window.innerWidth < 768) {
                            _this.width = window.innerWidth * 0.8;
                        }
                        else {
                            _this.width = window.innerWidth / 3.5;
                        }
                    };
                    this._getYears = function () {
                        var currentYear = new Date().getFullYear();
                        var years = [];
                        for (var i = 0; i < 5; i++) {
                            years.push(currentYear + i);
                        }
                        return years;
                    };
                    this.onSelectYear = function (event, graphNumber) {
                        switch (graphNumber) {
                            case "1":
                                _this.selectedYear1 = event.target.value;
                                break;
                            case "2":
                                _this.selectedYear2 = event.target.value;
                                break;
                            case "3":
                                _this.selectedYear3 = event.target.value;
                                break;
                            case "4":
                                _this.selectedYear2 = event.target.value;
                                break;
                        }
                    };
                    this.onSelectTown = function (event, graphNumber) {
                        switch (graphNumber) {
                            case "1":
                                _this.selectedTown1 = event.target.value;
                                break;
                            case "2":
                                _this.selectedTown2 = event.target.value;
                                break;
                            case "3":
                                _this.selectedTown3 = event.target.value;
                                break;
                            case "4":
                                _this.selectedTown2 = event.target.value;
                                break;
                        }
                    };
                    this.years = this._getYears();
                    _townService.getTowns()
                        .subscribe(function (towns) { return _this.towns = towns.sort(function (a, b) {
                        var nameA = a.naam.toLowerCase(), nameB = b.naam.toLowerCase();
                        if (nameA < nameB)
                            return -1;
                        if (nameA > nameB)
                            return 1;
                        return 0;
                    }); }, function (err) { return _this.errorMessage = err; });
                }
                ComparisonComponent = __decorate([
                    core_1.Component({
                        selector: 'comparison-container',
                        template: "\n        <div class=\"container\">\n            <p *ngIf=\"errorMessage\" class=\"alert alert-danger\">{{errorMessage}}</p>\n            <h1>Vergelijk 2 gemeentes</h1>\n            <p>Hieronder kan u 2 gemeentes vergelijken op basis van de gemeente en het jaartal.</p>\n        <div class=\"comparison-content\">\n            <div (window:resize)=\"onResize($event)\">\n                <div class=\"selectors\">\n                    <div>\n                        <div class=\" styled-select\">\n                            <select  (change)=\"onSelectYear($event,'1')\">\n                                <option value=\"0\">Kies een jaar</option>\n                                <option *ngFor=\"#o of years\" [value]=\"o\">{{o}}</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div>\n                        <div class=\" styled-select\">\n                            <select (change)=\"onSelectTown($event,'1')\">\n                                <option value=\"\">Kies een gemeente</option>\n                                <option *ngFor=\"#o of towns\" [value]=\"o.naam\">{{o.naam}}</option>\n                            </select>\n                        </div>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onChangeGraph(selectedYear1, selectedTown1, '1')\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                    </button>\n\n                 </div>\n                 <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n            </div>\n            <div class=\"vs\">\n                VS\n            </div>\n            <div >\n                <div class=\"selectors\">\n                    <div>\n                        <div class=\" styled-select\">\n                            <select (change)=\"onSelectYear($event,'2')\">\n                                <option value=\"0\">Kies een jaar</option>\n                                <option *ngFor=\"#o of years\" [value]=\"o\">{{o}}</option>\n                            </select>\n                        </div>\n                    </div>\n                    <div>\n                        <div class=\" styled-select\">\n                            <select (change)=\"onSelectTown($event,'2')\">\n                                <option value=\"\">Kies een gemeente</option>\n                                <option *ngFor=\"#o of towns\" [value]=\"o.naam\">{{o.naam}}</option>\n                            </select>\n                        </div>\n                    </div>\n                    <button type=\"button\" class=\"btn btn-primary\" (click)=\"onChangeGraph(selectedYear2, selectedTown2, '2')\">\n                            <span class=\"glyphicon glyphicon-ok\"></span>\n                    </button>\n                </div>\n                <sunburst [data]=categories2 [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n\n            </div>\n        </div>\n\n\n            <h1>Vergelijk 2 clusters</h1>\n            <p>Hieronder kan u 2 gemeentes vergelijken op basis van hun cluster en het jaartal.</p>\n            <div class=\"comparison-content\">\n                <div (window:resize)=\"onResize($event)\">\n                    <div class=\"selectors\">\n                        <div>\n                            <div class=\" styled-select\">\n                                <select  (change)=\"onSelectYear($event,'3')\">\n                                    <option value=\"0\">Kies een jaar</option>\n                                    <option *ngFor=\"#o of years\" [value]=\"o\">{{o}}</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div>\n                            <div class=\" styled-select\">\n                                <select (change)=\"onSelectTown($event,'3')\">\n                                    <option value=\"\">Kies een gemeente</option>\n                                    <option *ngFor=\"#o of towns\" [value]=\"o.naam\">{{o.naam}}</option>\n                                </select>\n                            </div>\n                        </div>\n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onChangeCluster(selectedYear4, selectedTown4, '4')\">\n                                <span class=\"glyphicon glyphicon-ok\"></span>\n                        </button>\n\n                     </div>\n                     <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n                </div>\n                <div class=\"vs\">\n                    VS\n                </div>\n                <div >\n                    <div class=\"selectors\">\n                        <div>\n                            <div class=\" styled-select\">\n                                <select (change)=\"onSelectYear($event,'4')\">\n                                    <option value=\"0\">Kies een jaar</option>\n                                    <option *ngFor=\"#o of years\" [value]=\"o\">{{o}}</option>\n                                </select>\n                            </div>\n                        </div>\n                        <div>\n                            <div class=\" styled-select\">\n                                <select (change)=\"onSelectTown($event,'4')\">\n                                    <option value=\"\">Kies een gemeente</option>\n                                    <option *ngFor=\"#o of towns\" [value]=\"o.naam\">{{o.naam}}</option>\n                                </select>\n                            </div>\n                        </div>\n                        <button type=\"button\" class=\"btn btn-primary\" (click)=\"onChangeCluster(selectedYear4, selectedTown4, '4')\">\n                                <span class=\"glyphicon glyphicon-ok\"></span>\n                        </button>\n                    </div>\n                    <sunburst [data]=categories2 [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n\n                </div>\n            </div>\n       </div>\n",
                        directives: [sunburst_component_1.SunburstComponent],
                        providers: [begrotingService_1.BegrotingService, townService_component_1.TownService],
                        styles: ["\n        .comparison-content {\n            display:flex;\n            align-items: center;\n            justify-content: center;\n        }\n\n        .vs {\n            padding: 20px;\n        }\n\n        select {\n            border: 1px solid lightgray;\n            margin: 20px;\n        }\n\n        .styled-select{\n            flex: 0 1 auto !important;\n        }\n\n        .selectors{\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            padding-bottom: 30px;\n        }\n\n        @media screen and (max-width: 768px) {\n            .comparison-content {\n                flex-direction: column;\n            }\n        }\n\n"]
                    }), 
                    __metadata('design:paramtypes', [begrotingService_1.BegrotingService, townService_component_1.TownService])
                ], ComparisonComponent);
                return ComparisonComponent;
            }());
            exports_1("ComparisonComponent", ComparisonComponent);
        }
    }
});
//# sourceMappingURL=comparison.component.js.map