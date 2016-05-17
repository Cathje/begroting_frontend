System.register(['angular2/core', 'angular2/router', './overviewUsers.component.js', "./overviewPropositions.component.js"], function(exports_1) {
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
    var core_1, router_1, overviewUsers_component_js_1, overviewPropositions_component_js_1;
    var ModeratorRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (overviewUsers_component_js_1_1) {
                overviewUsers_component_js_1 = overviewUsers_component_js_1_1;
            },
            function (overviewPropositions_component_js_1_1) {
                overviewPropositions_component_js_1 = overviewPropositions_component_js_1_1;
            }],
        execute: function() {
            ModeratorRouter = (function () {
                function ModeratorRouter() {
                }
                ModeratorRouter = __decorate([
                    core_1.Component({
                        selector: 'moderator-router',
                        template: " <router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/overviewUsers', name: 'OverviewUsers', component: overviewUsers_component_js_1.OverviewUsersComponent },
                        { path: '/overviewPropositions', name: 'OverviewPropositions', component: overviewPropositions_component_js_1.OverviewPropositionsComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], ModeratorRouter);
                return ModeratorRouter;
            })();
            exports_1("ModeratorRouter", ModeratorRouter);
        }
    }
});
//# sourceMappingURL=moderatorRouter.js.map