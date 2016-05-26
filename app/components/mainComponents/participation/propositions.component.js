System.register(['angular2/core', 'angular2/router', "../../../services/projectService.component", "../../../models/reactieOpVoorstel", '../../../directives/styled'], function(exports_1, context_1) {
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
    var core_1, router_1, projectService_component_1, reactieOpVoorstel_1, styled_1;
    var PropositionsComponent;
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
            function (reactieOpVoorstel_1_1) {
                reactieOpVoorstel_1 = reactieOpVoorstel_1_1;
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
            }],
        execute: function() {
            PropositionsComponent = (function () {
                function PropositionsComponent(_routeParams, _projectService) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._projectService = _projectService;
                    this.projects = [];
                    this.data = 0;
                    this.voorstelreactie = new reactieOpVoorstel_1.ReactieOpVoorstel("", "");
                    this._projectService.getProjects("Gent").subscribe(function (pr) {
                        _this.projects = pr;
                        console.log(pr);
                    }, function (err) { return _this.errorMessage = "Er zijn geen projecten gevonden voor deze gemeenten"; });
                }
                PropositionsComponent.prototype.stem = function (v, project, voorstel) {
                    var _this = this;
                    this._projectService.putStem(this.projects[project].voorstellen[voorstel].Id, sessionStorage.getItem('user')).subscribe(function (d) { return _this.data = d; });
                    setTimeout(function () {
                        if (this.data != 0) {
                            v.aantalStemmen += 1;
                        }
                    }, 1000);
                };
                PropositionsComponent.prototype.post = function (project, voorstel) {
                    var _this = this;
                    this.voorstelreactie = new reactieOpVoorstel_1.ReactieOpVoorstel(this.projects[project].voorstellen[voorstel].reactie, sessionStorage.getItem('user'));
                    this._projectService.postReactie(this.projects[project].voorstellen[voorstel].Id, this.voorstelreactie).subscribe(function (d) { return _this.data = d; });
                    this.projects[project].voorstellen[voorstel].reactie = "";
                };
                PropositionsComponent = __decorate([
                    core_1.Component({
                        selector: 'propositions-container',
                        template: "\n    <div class=\"container\">\n          <p class=\"alert alert-danger\" *ngIf=\"!projects\"><i>{{errorMessage}}</i></p>\n        <h2>Stem en/of geef reactie op een Begrotingsvoorstel</h2>\n\n        <section>\n         <div class=\"panel-group\" id=\"accordion\">\n          <div class=\"panel panel-default\" *ngFor=\"#project of projects #j=index\" class=\"panel panel-default\">\n            <div class=\"panel-heading\">\n              <h4 class=\"panel-title\">\n                <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"{{'#'+project.id}}\">{{project.titel}}</a>\n              </h4>\n            </div>\n            <div [id]=\"project.id\" class=\"panel-collapse collapse in\">\n              <div class=\"panel-body no-padding\">\n                    <div class=\"\" *ngFor=\"#voorstel of project.voorstellen #i=index\">\n                        <div class=\"panel-group\" id=\"{{'accordion-sub'+(i+1)}}\">\n                          <div class=\"panel panel-default\">\n                            <div class=\"panel-heading proposition\">\n                              <h4 class=\"panel-title prop-title\">\n                                <a data-toggle=\"collapse\" [attr.data-parent]=\"'#accordion-sub'+(i+1)\" href=\"{{'#'+(i+1)}}\">\n                                <span class=\"glyphicon glyphicon-tasks\"></span>\n                                {{voorstel.beschrijving}} <i>gepost door {{voorstel.auteurNaam}}</i>\n                                </a>\n                                <span>{{voorstel.aantalStemmen}}</span>\n                                <span>\n                                 <button class=\"btn btn-primary\" (click)=\"stem(voorstel,j,i)\" styled><span class=\"glyphicon glyphicon-thumbs-up\"></span></button>\n                                </span>\n                              </h4>\n                            </div>\n                            <div [id]=\"(i+1)\" class=\"panel-collapse collapse\">\n                              <div class=\"panel-body\">\n\n                              <div class=\"section-content\">\n                                    <div class=\"form-inline\">\n                                    <ul >\n                                       <li *ngFor=\"#reactie of voorstel.reacties #i=index\" >\n                                       <p>\n                                                 <span>{{reactie.email}}</span>\n                                                <span>{{reactie.beschrijving}}</span>\n                                                <span>{{reactie.reactieDatum}}</span>\n                                        </li>\n                                        <li *ngIf=\"voorstelreactie.email\">\n                                        <span>{{voorstelreactie.email}}</span>\n                                         <span>{{voorstelreactie.beschrijving}}</span>\n                                        <span>{{voorstelreactie.reactieDatum}}</span>\n                                        </li>\n                                    </ul>\n                                    <p *ngIf=\"voorstel?.reacties?.length < 1\"><i>Er zijn nog geen reacties ingediend.</i></p>\n                                    </div>\n\n                                    <div class=\"addFaq\">\n                                        <div class=\"form-group\">\n                                            <label >Reactie:</label>\n                                            <textarea [(ngModel)]=projects[j].voorstellen[i].reactie></textarea>\n                                        </div>\n                                       <button class=\"btn btn-primary pull-right\" (click)=\"post(j,i)\" styled>Voeg reactie toe</button>\n                                    </div>\n                                </div>\n\n                              </div>\n                            </div>\n                          </div>\n                        </div>\n                    </div>\n              </div>\n            </div>\n          </div>\n        </div>\n        </section>\n    </div>\n    ",
                        providers: [
                            projectService_component_1.ProjectService
                        ],
                        directives: [styled_1.StyledDirective],
                        styles: ["\n        .panel-heading {\n            background-color: lightgray;\n        }\n\n        .approve{\n            background-color: #d0d257 !important;\n            border: none;\n        }\n\n        .disapprove{\n            background-color: #f7baba !important;\n            border: none;\n        }\n\n        tr {\n            display: flex;\n            justify-content: center;\n        }\n\n        td:nth-child(1){\n            flex: 1 1 auto;\n        }\n\n        td:nth-child(2) {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n\n        .proposition {\n            background-color: #f2f3f8;\n            padding-bottom: 2px;\n            padding-top: 2px;\n            color: black\n        }\n\n        .prop-title {\n            display:flex;\n            align-items: center;\n        }\n\n        .prop-title a {\n            flex: 1 1 auto;\n            color:black !important;\n        }\n\n        .prop-title span {\n            padding:0 5px ;\n        }\n\n        .prop-title i {\n            font-size: 0.8em;\n        }\n\n        .no-padding {\n            padding: 0;\n        }\n\n        .panel-group {\n        margin-bottom: 0\n        }\n\n        .panel-default {\n            border: none;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, projectService_component_1.ProjectService])
                ], PropositionsComponent);
                return PropositionsComponent;
            }());
            exports_1("PropositionsComponent", PropositionsComponent);
        }
    }
});
//# sourceMappingURL=propositions.component.js.map