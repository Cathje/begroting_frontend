System.register(['angular2/core', 'angular2/router', './createAdmin.component', './generalSettings.component'], function(exports_1) {
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
    var core_1, router_1, createAdmin_component_1, generalSettings_component_1;
    var SuperAdminRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (createAdmin_component_1_1) {
                createAdmin_component_1 = createAdmin_component_1_1;
            },
            function (generalSettings_component_1_1) {
                generalSettings_component_1 = generalSettings_component_1_1;
            }],
        execute: function() {
            SuperAdminRouter = (function () {
                function SuperAdminRouter() {
                }
                SuperAdminRouter = __decorate([
                    core_1.Component({
                        selector: 'super-admin-router',
                        template: " <router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/generalSettings', name: 'GeneralSettings', component: generalSettings_component_1.GeneralSettingsComponent, useAsDefault: true },
                        { path: '/createAdmin', name: 'CreateAdmin', component: createAdmin_component_1.CreateAdminComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], SuperAdminRouter);
                return SuperAdminRouter;
            })();
            exports_1("SuperAdminRouter", SuperAdminRouter);
        }
    }
});
//# sourceMappingURL=superAdminRouter.js.map