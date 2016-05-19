System.register(['angular2/core', 'angular2/router', './projects.component', './propositions.component', "./addProposition.component"], function(exports_1, context_1) {
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
    var core_1, router_1, projects_component_1, propositions_component_1, addProposition_component_1;
    var ParticipationRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (projects_component_1_1) {
                projects_component_1 = projects_component_1_1;
            },
            function (propositions_component_1_1) {
                propositions_component_1 = propositions_component_1_1;
            },
            function (addProposition_component_1_1) {
                addProposition_component_1 = addProposition_component_1_1;
            }],
        execute: function() {
            ParticipationRouter = (function () {
                function ParticipationRouter() {
                }
                ParticipationRouter = __decorate([
                    core_1.Component({
                        selector: 'participation-router',
                        template: " <router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/projects', name: 'Projects', component: projects_component_1.ProjectsComponent, useAsDefault: true },
                        { path: '/propositions', name: 'Propositions', component: propositions_component_1.PropositionsComponent },
                        { path: '/addProposition', name: 'AddPropositions', component: addProposition_component_1.AddPropositionComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], ParticipationRouter);
                return ParticipationRouter;
            }());
            exports_1("ParticipationRouter", ParticipationRouter);
        }
    }
});
//# sourceMappingURL=participationRouter.js.map