System.register(['angular2/core', 'angular2/router', './manageData.component.js', './manageProject.component.js', './manageTown.component.js', "./addInformation.component.js"], function(exports_1) {
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
    var core_1, router_1, manageData_component_js_1, manageProject_component_js_1, manageTown_component_js_1, addInformation_component_js_1;
    var AdminRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (manageData_component_js_1_1) {
                manageData_component_js_1 = manageData_component_js_1_1;
            },
            function (manageProject_component_js_1_1) {
                manageProject_component_js_1 = manageProject_component_js_1_1;
            },
            function (manageTown_component_js_1_1) {
                manageTown_component_js_1 = manageTown_component_js_1_1;
            },
            function (addInformation_component_js_1_1) {
                addInformation_component_js_1 = addInformation_component_js_1_1;
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
                        { path: '/manageData', name: 'ManageData', component: manageData_component_js_1.ManageDataComponent, useAsDefault: true },
                        { path: '/manageProject', name: 'ManageProject', component: manageProject_component_js_1.ManageProjectComponent },
                        { path: '/manageTown', name: 'ManageTown', component: manageTown_component_js_1.ManageTownComponent },
                        { path: '/addInformation', name: 'AddInformation', component: addInformation_component_js_1.AddInformationComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AdminRouter);
                return AdminRouter;
            })();
            exports_1("AdminRouter", AdminRouter);
        }
    }
});
//# sourceMappingURL=adminRouter.js.map