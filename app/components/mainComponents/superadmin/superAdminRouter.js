System.register(['angular2/core', 'angular2/router', './generalSettings.component', "./overviewUsers.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, generalSettings_component_1, overviewUsers_component_1;
    var SuperAdminRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (generalSettings_component_1_1) {
                generalSettings_component_1 = generalSettings_component_1_1;
            },
            function (overviewUsers_component_1_1) {
                overviewUsers_component_1 = overviewUsers_component_1_1;
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
                        { path: '/manageUsers', name: 'ManageUsers', component: overviewUsers_component_1.OverviewUsersComponent },
                        { path: '/manageProject', name: 'ManageProject', component: overviewUsers_component_1.OverviewUsersComponent }
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