System.register(['angular2/core', 'angular2/router', "../../../services/projectService.component", '../../../directives/styled'], function(exports_1, context_1) {
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
    var core_1, router_1, projectService_component_1, styled_1;
    var OverviewPropositionsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (projectService_component_1_1) {
                projectService_component_1 = projectService_component_1_1;
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
            }],
        execute: function() {
            OverviewPropositionsComponent = (function () {
                function OverviewPropositionsComponent(_routeParams, _projectService) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._projectService = _projectService;
                    this.projects = [];
                    this._projectService.getProjects("Gent").subscribe(function (pr) { return _this.projects = pr; });
                }
                //verificatiestatus :  1 = tebehandelen, 2 = goedgekeurd, 3= afgekeurd
                OverviewPropositionsComponent.prototype.approve = function (voorstel) {
                    voorstel.verificatieStatus = 2;
                    voorstel.verificatorEmail = sessionStorage.getItem('user');
                    this._projectService.putVoorstelStatus(voorstel.Id, voorstel).subscribe();
                };
                OverviewPropositionsComponent.prototype.disapprove = function (voorstel) {
                    voorstel.verificatieStatus = 3;
                    voorstel.verificatorEmail = sessionStorage.getItem('user');
                    this._projectService.putVoorstelStatus(voorstel.Id, voorstel).subscribe();
                };
                OverviewPropositionsComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-propositions-container',
                        template: "\n        <img src=\"/app/images/backgrounds/stemmen.jpg\" class=\"banner\"/>\n        <p class=\"alert alert-danger\" *ngIf=\"projects.length < 1\"><i>Er zijn geen projecten gevonden</i></p>\n\n    <div class=\"container\">\n\n        <h2>Overzicht voorstellen</h2>\n\n        <div class=\"section-content\">\n            <div class=\"panel-group\" id=\"accordion\">\n                <div *ngFor=\"#project of projects\" class=\"panel panel-default\">\n                      <div class=\"panel-heading\">\n                        <h4 class=\"panel-title\">\n                          <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"{{'#'+project.id}}\">{{project.titel}}</a>\n                        </h4>\n                      </div>\n                  <div [id]=project.id class=\"panel-collapse collapse in\">\n            <table class=\"table table-striped\">\n            <tbody>\n            <tr *ngFor=\"#voorstel of project.voorstellen\">\n                <td><textarea> {{voorstel.beschrijving}}</textarea></td>\n                <td>{{voorstel.verificatieStatus}}</td>\n                <td>\n                <button class=\"btn btn-primary approve\" (click)=\"approve(voorstel)\" ><span class=\"glyphicon glyphicon-thumbs-up\"></span></button>\n                <button class=\"btn btn-primary disapprove\" (click)=\"disapprove(voorstel)\" ><span class=\"glyphicon glyphicon-thumbs-down\"></span></button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n                  </div>\n\n                </div>\n            </div>\n        </div>\n\n    </div>\n    ",
                        providers: [
                            projectService_component_1.ProjectService
                        ],
                        directives: [styled_1.StyledDirective],
                        styles: ["\n        .panel-heading {\n            background-color: #2ac7d2;\n        }\n\n        .approve{\n            background-color: #d0d257 !important;\n            border: none;\n        }\n\n        .disapprove{\n            background-color: #f7baba !important;\n            border: none;\n        }\n\n        tr {\n            display: flex;\n            justify-content: center;\n        }\n\n        td:nth-child(1){\n            flex: 1 1 auto;\n        }\n\n        td:nth-child(2) {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, projectService_component_1.ProjectService])
                ], OverviewPropositionsComponent);
                return OverviewPropositionsComponent;
            }());
            exports_1("OverviewPropositionsComponent", OverviewPropositionsComponent);
        }
    }
});
//# sourceMappingURL=overviewPropositions.component.js.map