System.register(['angular2/core', 'angular2/router', './projects.component.js', './propositions.component.js', "./addProposition.component.js"], function(exports_1) {
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
    var core_1, router_1, projects_component_js_1, propositions_component_js_1, addProposition_component_js_1;
    var ParticipationRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (projects_component_js_1_1) {
                projects_component_js_1 = projects_component_js_1_1;
            },
            function (propositions_component_js_1_1) {
                propositions_component_js_1 = propositions_component_js_1_1;
            },
            function (addProposition_component_js_1_1) {
                addProposition_component_js_1 = addProposition_component_js_1_1;
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
                        { path: '/projects', name: 'Projects', component: projects_component_js_1.ProjectsComponent, useAsDefault: true },
                        { path: '/propositions', name: 'Propositions', component: propositions_component_js_1.PropositionsComponent },
                        { path: '/addProposition', name: 'AddPropositions', component: addProposition_component_js_1.AddPropositionComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], ParticipationRouter);
                return ParticipationRouter;
            })();
            exports_1("ParticipationRouter", ParticipationRouter);
        }
    }
});
//# sourceMappingURL=participationRouter.js.map