System.register(['angular2/core', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1;
    var OverviewPropositionsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            OverviewPropositionsComponent = (function () {
                function OverviewPropositionsComponent(_routeParams) {
                    this._routeParams = _routeParams;
                    this.projects = [{ naam: "Project1", antwoorden: [{ naam: "Antwoord1", status: "afgekeurd" }, { naam: "Antwoord1", status: "goedgekeurd" }] }, { naam: "Project2" }];
                }
                OverviewPropositionsComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                OverviewPropositionsComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-propositions-container',
                        template: "\n    <div class=\"container\">\n        <h2>Overzicht voorstellen</h2>\n        <p *ngIf=\"!projects\"><i>Er zijn geen projecten gevonden</i></p>\n\n        <div class=\"section-content\">\n            <div class=\"panel-group\" id=\"accordion\">\n                <div *ngFor=\"#project of projects\" class=\"panel panel-default\">\n                      <div class=\"panel-heading\">\n                        <h4 class=\"panel-title\">\n                          <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"{{'#'+project.naam}}\">{{project.naam}}</a>\n                        </h4>\n                      </div>\n                  <div [id]=project.naam class=\"panel-collapse collapse in\">\n            <table class=\"table table-striped\">\n            <tbody>\n            <tr *ngFor=\"#antwoord of project.antwoorden\">\n                <td><textarea> {{antwoord.naam}}</textarea></td>\n                <td>\n                <button class=\"btn btn-primary approve\" (click)=\"approve(gebruiker.email, gebruiker)\"><span class=\"glyphicon glyphicon-thumbs-up\"></span></button>\n                <button class=\"btn btn-primary disapprove\" (click)=\"disapprove(gebruiker.email, gebruiker)\"><span class=\"glyphicon glyphicon-thumbs-down\"></span></button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n                  </div>\n\n                </div>\n            </div>\n        </div>\n\n    </div>\n    ",
                        styles: ["\n        .panel-heading {\n            background-color: #2ac7d2;\n        }\n\n        .approve{\n            background-color: #d0d257 !important;\n            border: none;\n        }\n\n        .disapprove{\n            background-color: #f7baba !important;\n            border: none;\n        }\n\n        tr {\n            display: flex;\n            justify-content: center;\n        }\n\n        td:nth-child(1){\n            flex: 1 1 auto;\n        }\n\n        td:nth-child(2) {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], OverviewPropositionsComponent);
                return OverviewPropositionsComponent;
            })();
            exports_1("OverviewPropositionsComponent", OverviewPropositionsComponent);
        }
    }
});
//# sourceMappingURL=overviewPropositions.component.js.map