System.register(['angular2/core', 'angular2/router', "../../../services/projectService.component.js", './../../subComponents/input/rangeSlider.component.js', './../../subComponents/graphs/sunburst.component.js', "../../../services/townService.component.js", "./../../../models/project.js"], function(exports_1, context_1) {
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
    var core_1, router_1, projectService_component_js_1, rangeSlider_component_js_1, sunburst_component_js_1, router_2, townService_component_js_1, project_js_1;
    var AddPropositionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (projectService_component_js_1_1) {
                projectService_component_js_1 = projectService_component_js_1_1;
            },
            function (rangeSlider_component_js_1_1) {
                rangeSlider_component_js_1 = rangeSlider_component_js_1_1;
            },
            function (sunburst_component_js_1_1) {
                sunburst_component_js_1 = sunburst_component_js_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
            },
            function (project_js_1_1) {
                project_js_1 = project_js_1_1;
            }],
        execute: function() {
            AddPropositionComponent = (function () {
                function AddPropositionComponent(_routeParams, _projectService, _townService) {
                    //this.myTown = _townService.getTownHC("Antwerpen");//TODO: delete
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._projectService = _projectService;
                    this._townService = _townService;
                    this.categories = [];
                    this.year = 2020; //TODO: default is current year?
                    this.project = new project_js_1.Project("");
                    /* this._projectService.getInspraakitems(this.year, "Gent")
                         .subscribe((finan: any) => this.categories = finan,
                             (err:any) => this.errorMessage = err
                         );
             
                     if(!this.errorMessage)
                     {
                         for (let i of this.categories) {
                             console.log("categories: " + i); // "4", "5", "6"
                         }
                         
                     }*/
                    this._projectService.getProject(this.year, "Gent")
                        .subscribe(function (project) { return _this.project = project; }, function (err) { return _this.errorMessage = err; });
                    if (!this.errorMessage) {
                        console.log("project: " + this.project);
                    }
                }
                AddPropositionComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                //load accordion for selected year
                AddPropositionComponent.prototype.loadAccordion = function (event) {
                };
                AddPropositionComponent = __decorate([
                    core_1.Component({
                        selector: 'add-proposition-container',
                        template: "\n    <div class=\"container\">\n    <h2>Voorstel indienen</h2>\n        <div class =\"row\">\n            <div class =\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <p>hier komt de sunburst</p>\n                \n            </div>\n            <div class =\"col-lg-6 col-md-6 col-sm-12 col-xs-12\">\n                <div class =\"row\">\n                    <p>hier komen de acties</p>\n                </div>\n                <div class =\"row\">\n                    <p>hier komt het totaal</p>\n                </div>\n            </div>\n        </div>\n        <div class =\"row\">\n            <p>hier komt de accordeon</p>\n            <div class=\"panel-group\" id=\"accordion\">\n                <div class=\"panel panel-default\">\n                  <div class=\"panel-heading\">\n                    <h4 class=\"panel-title\">\n                      <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse1\">Collapsible Group 1</a>\n                    </h4>\n                  </div>\n                  <div id=\"collapse1\" class=\"panel-collapse collapse in\">\n                    <div class=\"panel-body\">Lorem ipsum dolor sit amet, consectetur adipisicing elit,\n                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>\n                  </div>\n                </div>\n                <div class=\"panel panel-default\">\n                  <div class=\"panel-heading\">\n                    <h4 class=\"panel-title\">\n                      <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\">Collapsible Group 2</a>\n                    </h4>\n                  </div>\n                  <div id=\"collapse2\" class=\"panel-collapse collapse\">\n                    <div class=\"panel-body\">Lorem ipsum dolor sit amet, consectetur adipisicing elit,\n                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>\n                  </div>\n                </div>\n                <div class=\"panel panel-default\">\n                  <div class=\"panel-heading\">\n                    <h4 class=\"panel-title\">\n                      <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse3\">Collapsible Group 3</a>\n                    </h4>\n                  </div>\n                  <div id=\"collapse3\" class=\"panel-collapse collapse\">\n                    <div class=\"panel-body\">Lorem ipsum dolor sit amet, consectetur adipisicing elit,\n                    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,\n                    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>\n                  </div>\n                </div>\n              </div>\n        </div>\n    </div>\n    \n\n\n\n\n\n        ",
                        directives: [sunburst_component_js_1.SunburstComponent, router_2.ROUTER_DIRECTIVES, rangeSlider_component_js_1.rangeSlider],
                        providers: [
                            projectService_component_js_1.ProjectService, townService_component_js_1.TownService
                        ],
                        styles: ["\n\n\n\n        "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, (typeof (_a = typeof projectService_component_js_1.ProjectService !== 'undefined' && projectService_component_js_1.ProjectService) === 'function' && _a) || Object, (typeof (_b = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _b) || Object])
                ], AddPropositionComponent);
                return AddPropositionComponent;
                var _a, _b;
            }());
            exports_1("AddPropositionComponent", AddPropositionComponent);
        }
    }
});
//# sourceMappingURL=addProposition.component.js.map