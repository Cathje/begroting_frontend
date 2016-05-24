System.register(['angular2/core', 'angular2/router', "../../../services/projectService.component", "../../../models/reactieOpVoorstel", '../../../directives/styled'], function(exports_1) {
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
                    this._projectService.getProjects("Gent").subscribe(function (pr) { return _this.projects = pr; });
                }
                //@TODO  email toevoegen vanuit token als stemmer (datum toegevoegd op backend)
                PropositionsComponent.prototype.stem = function (v, project, voorstel) {
                    var _this = this;
                    this._projectService.putStem(this.projects[project].voorstellen[voorstel].Id, "nadya@nadya.be").subscribe(function (d) { return _this.data = d; });
                    setTimeout(function () {
                        if (this.data != 0) {
                            v.aantalStemmen += 1;
                        }
                    }, 1000);
                };
                PropositionsComponent.prototype.post = function (project, voorstel) {
                    var _this = this;
                    this.voorstelreactie = new reactieOpVoorstel_1.ReactieOpVoorstel(this.projects[project].voorstellen[voorstel].reactie, "test@test.be");
                    this._projectService.postReactie(this.projects[project].voorstellen[voorstel].Id, this.voorstelreactie).subscribe(function (d) { return _this.data = d; });
                    //@TODO zorgen dat de reactie direct op het scherm komt, opl nu is niet ok
                    // this.projects[project].voorstellen[voorstel].reacties.push(this.voorstelreactie);
                    this.projects[project].voorstellen[voorstel].reactie = "";
                };
                PropositionsComponent = __decorate([
                    core_1.Component({
                        selector: 'propositions-container',
                        template: "\n    <div class=\"container\">\n          <p class=\"alert alert-danger\" *ngIf=\"!projects\"><i>Er zijn geen projecten gevonden</i></p>\n    <h2>Stem en/of geef reactie op een Begrotingsvoorstel</h2>\n        <div class=\"section-content\">\n            <div class=\"panel-group\" id=\"accordion\">\n                <div *ngFor=\"#project of projects #j=index\" class=\"panel panel-default\">\n                      <div class=\"panel-heading\">\n                        <h4 class=\"panel-title\">\n                          <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"{{'#'+project.titel}}\">{{project.titel}}</a>\n                        </h4>\n                      </div>\n                  <div [id]=project.titel class=\"panel-collapse collapse in\">\n            <table class=\"table table-striped\">\n            <tbody>\n            <tr *ngFor=\"#voorstel of project.voorstellen #i=index\">\n               <td><textarea readonly> {{voorstel.beschrijving}}</textarea></td>\n                <td>{{voorstel.aantalStemmen}}</td>\n                <td>\n                <span>Stem: </span><button class=\"btn btn-primary\" (click)=\"stem(voorstel,j,i)\" styled><span class=\"glyphicon glyphicon-thumbs-up\"></span></button>\n                </td>\n                <td>\n                    <table>\n                    <tr *ngFor=\"#reactie of voorstel.reacties #i=index\">\n                        <td>{{reactie.email}}</td>\n                        <td>{{reactie.beschrijving}}</td>\n                        <td>{{reactie.reactieDatum}}</td>\n                     </tr>\n                     <!-- om de laatste reactie te tonen -->\n                     <tr><td>{{voorstelreactie.email}}</td>\n                        <td>{{voorstelreactie.beschrijving}}</td>\n                        <td>{{voorstelreactie.reactieDatum}}</td></tr>\n                        <td>\n                        <textarea [(ngModel)]=projects[j].voorstellen[i].reactie></textarea>\n                        <button (click)=\"post(j,i)\">post</button>\n                        </td>\n                    </table>\n                </td>\n            </tr>\n            </tbody>\n            </table>\n                  </div>\n                </div>\n            </div>\n        </div>\n    </div>\n    ",
                        providers: [
                            projectService_component_1.ProjectService
                        ],
                        directives: [styled_1.StyledDirective],
                        styles: ["\n        .panel-heading {\n            background-color: #2ac7d2;\n        }\n\n        .approve{\n            background-color: #d0d257 !important;\n            border: none;\n        }\n\n        .disapprove{\n            background-color: #f7baba !important;\n            border: none;\n        }\n\n        tr {\n            display: flex;\n            justify-content: center;\n        }\n\n        td:nth-child(1){\n            flex: 1 1 auto;\n        }\n\n        td:nth-child(2) {\n            display: flex;\n            align-items: center;\n            justify-content: center;\n        }\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, projectService_component_1.ProjectService])
                ], PropositionsComponent);
                return PropositionsComponent;
            })();
            exports_1("PropositionsComponent", PropositionsComponent);
        }
    }
});
//# sourceMappingURL=propositions.component.js.map