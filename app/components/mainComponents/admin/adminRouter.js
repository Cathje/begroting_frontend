System.register(['angular2/core', 'angular2/router', './manageData.component', './manageProject.component', './manageTown.component'], function(exports_1, context_1) {
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
    var core_1, router_1, manageData_component_1, manageProject_component_1, manageTown_component_1;
    var AdminRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (manageData_component_1_1) {
                manageData_component_1 = manageData_component_1_1;
            },
            function (manageProject_component_1_1) {
                manageProject_component_1 = manageProject_component_1_1;
            },
            function (manageTown_component_1_1) {
                manageTown_component_1 = manageTown_component_1_1;
            }],
        execute: function() {
            AdminRouter = (function () {
                function AdminRouter() {
                }
                AdminRouter = __decorate([
                    core_1.Component({
                        selector: 'admin-router',
                        template: " <router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/manageData', name: 'ManageData', component: manageData_component_1.ManageDataComponent, useAsDefault: true },
                        { path: '/manageProject', name: 'ManageProject', component: manageProject_component_1.ManageProjectComponent },
                        { path: '/manageTown', name: 'ManageTown', component: manageTown_component_1.ManageTownComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AdminRouter);
                return AdminRouter;
            }());
            exports_1("AdminRouter", AdminRouter);
        }
    }
});
//# sourceMappingURL=adminRouter.js.map