System.register(['angular2/core', 'angular2/router', './admin.component.js', './manageProject.component.js'], function(exports_1, context_1) {
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
    var core_1, router_1, admin_component_js_1, manageProject_component_js_1;
    var AdminRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (admin_component_js_1_1) {
                admin_component_js_1 = admin_component_js_1_1;
            },
            function (manageProject_component_js_1_1) {
                manageProject_component_js_1 = manageProject_component_js_1_1;
            }],
        execute: function() {
            AdminRouter = (function () {
                function AdminRouter() {
                }
                AdminRouter = __decorate([
                    core_1.Component({
                        selector: 'townRouter',
                        template: " <router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Admin', component: admin_component_js_1.AdminComponent, useAsDefault: true },
                        { path: '/manageProject', name: 'ManageProject', component: manageProject_component_js_1.ManageProjectComponent }
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