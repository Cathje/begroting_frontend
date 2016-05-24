System.register(['angular2/core', 'angular2/router', "../../../services/begrotingService", '../../../directives/styled'], function(exports_1, context_1) {
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
    var core_1, router_1, begrotingService_1, styled_1;
    var ProjectsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (begrotingService_1_1) {
                begrotingService_1 = begrotingService_1_1;
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
            }],
        execute: function() {
            ProjectsComponent = (function () {
                function ProjectsComponent(_routeParams, _begrotingService, injector) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._begrotingService = _begrotingService;
                    _begrotingService.getBegrotingen("Gent").subscribe(function (begr) { return _this.begrotingen = begr; }, function (err) { return _this.errorMessage = "Er zijn geen begrotingen gevonden voor deze gemeenten"; });
                }
                ProjectsComponent = __decorate([
                    core_1.Component({
                        selector: 'projects-container',
                        template: "\n    <div class=\"container\">\n    <h2>Begrotingsposten</h2>\n    <p> Op deze pagina kan u de begrotingsposten terugvinden van uw gemeente per jaar. </p>\n     <p class=\"alert alert-danger\" *ngIf=\"!begrotingen\"><i>{{errorMessage}}</i></p>\n\n        <div class=\"section-content\">\n            <div class=\"panel-group\" id=\"accordion\">\n                <div *ngFor=\"#begroting of begrotingen\" class=\"panel panel-default\">\n                      <div class=\"panel-heading\" styled>\n                        <h4 class=\"panel-title\">\n                          <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"{{'#'+begroting.boekjaar}}\">{{begroting.boekjaar}}</a>\n                        </h4>\n                      </div>\n                  <div [id]=begroting.boekjaar class=\"panel-collapse collapse in\">\n            <table class=\"table table-striped\">\n            <tbody>\n            <tr *ngFor=\"#cat of begroting.childCats\">\n                <td><p>{{cat.naamCat}}</p></td>\n                <td><p>{{cat.totaal | currency: 'EUR' : true : '3.1-1' }}</p></td>\n            </tr>\n            </tbody>\n        </table>\n                  </div>\n\n                </div>\n            </div>\n        </div>\n    \n    </div>\n    ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [begrotingService_1.BegrotingService, styled_1.StyledDirective],
                        styles: ["\n        .panel-heading{\n            background-color: #2ac7d2;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, begrotingService_1.BegrotingService, core_1.Injector])
                ], ProjectsComponent);
                return ProjectsComponent;
            }());
            exports_1("ProjectsComponent", ProjectsComponent);
        }
    }
});
//# sourceMappingURL=projects.component.js.map