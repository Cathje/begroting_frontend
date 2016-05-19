System.register(['angular2/core', './../../../services/townService.component', 'angular2/http', 'angular2/router', './../../subComponents/input/townSelector.component', './../../subComponents/input/selector.component', "../../../models/mainTown", './../../subComponents/graphs/sunburst.component', "../../../services/begrotingService"], function(exports_1) {
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
    var core_1, townService_component_1, http_1, router_1, townSelector_component_1, selector_component_1, mainTown_1, sunburst_component_1, begrotingService_1;
    var ComparisonComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
            },
            function (selector_component_1_1) {
                selector_component_1 = selector_component_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (sunburst_component_1_1) {
                sunburst_component_1 = sunburst_component_1_1;
            },
            function (begrotingService_1_1) {
                begrotingService_1 = begrotingService_1_1;
            }],
        execute: function() {
            ComparisonComponent = (function () {
                function ComparisonComponent(_townService, _begrotingService, http, params, injector, _router) {
                    var _this = this;
                    this._townService = _townService;
                    this._begrotingService = _begrotingService;
                    this.http = http;
                    this._router = _router;
                    this.title = 'Gemeente - home';
                    this.towns = ["Berchem", "Gent", "Brussel"];
                    this.imglink = "";
                    this.name = "";
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                    this.isVisable = false;
                    this.contentbutton = "meer info";
                    this.showActions = false;
                    this.isEditor = false; //TODO: adapt value when signed in with special role
                    this.categories = [{ ID: "0990", naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Financiële aangelegenheden", totaal: 22781 },
                        { ID: "0991", naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Patrimonium zonder maatschappelijk doel", totaal: 281 },
                        { ID: "099", naamCaty: "Zorg en opvang", naamCatz: "Gezin en kinderen", totaal: 3311 },
                        { ID: "098", naamCaty: "Cultuur en vrije tijd", naamCatz: "Sport", totaal: 906 }];
                    this.categories2 = [{ ID: "0990", naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Financiële aangelegenheden", totaal: 22781 },
                        { ID: "0991", naamCatx: "Algemene financiering", naamCaty: "Algemene financiering", naamCatz: "Patrimonium zonder maatschappelijk doel", totaal: 281 },
                        { ID: "099", naamCaty: "Zorg en opvang", naamCatz: "Gezin en kinderen", totaal: 3311 },
                        { ID: "098", naamCaty: "Cultuur en vrije tijd", naamCatz: "Sport", totaal: 906 }];
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.8 : window.innerWidth / 3.5;
                    this.onCircleClick = function (id) {
                        _this.showActions = true;
                        //TODO: replace hardcoded 15 with id
                        _this._begrotingService.getActies(24)
                            .subscribe(function (acties) { return _this.acties = acties; });
                    };
                    this.onSelectTown = function (event) {
                        console.log(event.target.value);
                        _begrotingService.getGemeenteCategorieen(2020, "Gent")
                            .subscribe(function (finan) { return _this.categories = finan; }, function (err) { return _this.errorMessage = err; });
                    };
                    this.onResize = function (event) {
                        if (window.innerWidth < 768) {
                            _this.width = window.innerWidth * 0.8;
                        }
                        else {
                            _this.width = window.innerWidth / 3.5;
                        }
                    };
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) {
                        _this.mainTown = town;
                        _this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') + ".png";
                    }, function (err) { return _this.errorMessage = err; });
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (finan) { return _this.categories = finan; }, function (err) { return _this.errorMessage = err; });
                }
                ComparisonComponent.prototype.ngOnInit = function () {
                    /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
                    EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
                    //this.name = this._routeParams.get('town');
                };
                ComparisonComponent.prototype.toggle = function () {
                    this.isVisable = !this.isVisable;
                };
                ComparisonComponent = __decorate([
                    core_1.Component({
                        selector: 'comparison-container',
                        template: "\n        <div class=\"container\">\n            <h1>Vergelijk 2 gemeentes</h1>\n            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>\n        <div class=\"comparison-content\">\n            <div (window:resize)=\"onResize($event)\">\n                <town-selector></town-selector>\n                <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n            </div>\n            <div class=\"vs\">\n                VS\n            </div>\n            <div >\n                <selector defaultOption=\"Kies een gemeente\" [options]=\"towns\" [callbackFunction]=\"onSelectTown\"></selector>\n                <sunburst [data]=categories2 [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n            </div>\n        </div>\n\n       </div>\n",
                        directives: [selector_component_1.SelectorComponent, townSelector_component_1.TownSelectorComponent, sunburst_component_1.SunburstComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [begrotingService_1.BegrotingService, townService_component_1.TownService],
                        styles: ["\n        .comparison-content {\n            display:flex;\n            align-items: center;\n            justify-content: center;\n        }\n\n        .vs {\n            padding: 20px;\n        }\n\n"]
                    }), 
                    __metadata('design:paramtypes', [townService_component_1.TownService, begrotingService_1.BegrotingService, http_1.Http, router_1.RouteParams, core_1.Injector, router_1.Router])
                ], ComparisonComponent);
                return ComparisonComponent;
            })();
            exports_1("ComparisonComponent", ComparisonComponent);
        }
    }
});
//# sourceMappingURL=comparison.component.js.map