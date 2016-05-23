System.register(['angular2/core', './../../../services/townService.component', "../../../models/mainTown", 'angular2/http', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, townService_component_1, mainTown_1, http_1, router_1;
    var CoreDataComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            CoreDataComponent = (function () {
                function CoreDataComponent(_townService, http, params, injector, _router) {
                    var _this = this;
                    this._townService = _townService;
                    this.http = http;
                    this._router = _router;
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                    this.mainTown = injector.parent.parent.get(router_1.RouteParams).get('town');
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) {
                        _this.mainTown = town;
                        _this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') + ".png";
                    }, function (err) { return _this.errorMessage = err; });
                }
                CoreDataComponent = __decorate([
                    core_1.Component({
                        selector: 'core-data-container',
                        template: "\n        <div class=\"container\">\n        <p *ngIf=\"errorMessage\" class=\"alert alert-danger\">{{errorMessage}}</p>\n\n        <section class=\"intro col-xs-12\">\n            <h1>De kerngegevens van {{mainTown?.naam}}</h1>\n            <p>Op deze pagina vind u de belangrijkste kerngegevens van de gemeente {{mainTown?.naam}}. Indien u meer informatie wenst, aarzel niet om ons te contacteren via het mailadrres info@debegroting.be.</p>\n        </section>\n\n        <section class=\"demographic col-xs-12 col-sm-12\">\n        <h2>Demografische gegevens</h2>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                         <img class='icon' src=\"/app/images/icons/population.png\">\n                        <h4>Aantal bewoners</h4>\n                        <p>{{mainTown.aantalBewoners}}</p>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                        <img class='icon' src=\"/app/images/icons/man.png\">\n                        <h4>Aantal mannen</h4>\n                        <p>{{mainTown.isMan}}</p>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                        <img class='icon' src=\"/app/images/icons/woman.png\">\n                        <h4>Aantal vrouwen</h4>\n                        <p>{{mainTown.isVrouw}}</p>\n                    </div>\n                    <div class=\"col-xs-12 col-sm-6 col-md-3\">\n                        <img class='icon' src=\"/app/images/icons/child.png\">\n                        <h4>Aantal kinderen</h4>\n                        <p>{{mainTown.isKind}}</p>\n                    </div>\n        </section>\n\n        <section id=\"geographic\" class=\"col-xs-12 col-sm-12\">\n        <h2>Geografische gegevens</h2>\n                    <div class='col-xs-6 col-md-6'>\n                      <img src={{imglink}} class=\"provincie\">\n                     </div>\n                     <div class='col-xs-6 col-md-6'>\n                     <h4>Provincie:</h4>\n                     <span>{{mainTown.provincie}}</span>\n\n                     <h4>Oppervlakte:</h4>\n                        <span>{{mainTown.oppervlakte}}{{mainTown.oppervlakteMaat}}</span>\n                    <h4>Deelgemeenten: </h4>\n                        <ul *ngIf=\"mainTown?.deelGemeenten\" >\n                            <li *ngFor=\"#town of mainTown.deelGemeenten\"><span>{{town.naam}} - {{town.postCode}}</span></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.deelGemeenten\"><i>Er zijn geen deelgemeentes</i></p>\n                    <h4>Bestuur: </h4>\n                        <ul *ngIf=\"mainTown?.bestuur\" >\n                            <li *ngFor=\"#b of mainTown.bestuur\"><span>{{b.naam}} - {{types[b.type]}}</span></li>\n                        </ul>\n                        <p *ngIf=\"!mainTown.bestuur\"><i>Er zijn geen gegevens over het bestuur</i></p>\n                    </div>\n        </section>\n\n       </div>\n",
                        directives: [],
                        providers: [townService_component_1.TownService],
                        styles: ["\n\n    .icon {\n        max-width: 200px;\n        margin: 10px;\n    }\n\n    #info-town   {\n        padding: 1%;\n        flex-shrink: 2;\n        -webkit-flex-shrink: 2;\n    }\n\n    .demographic *:not(h2){\n        text-align: center;\n    }\n\n    .geographic {\n        padding: 1%;\n        margin-left: 1%;\n        flex: 1;\n        -webkit-flex-grow: 1;\n        text-align: right;\n    }\n    \n"]
                    }), 
                    __metadata('design:paramtypes', [townService_component_1.TownService, http_1.Http, router_1.RouteParams, core_1.Injector, router_1.Router])
                ], CoreDataComponent);
                return CoreDataComponent;
            })();
            exports_1("CoreDataComponent", CoreDataComponent);
        }
    }
});
//# sourceMappingURL=coreData.component.js.map