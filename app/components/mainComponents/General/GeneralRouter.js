System.register(['angular2/core', 'angular2/router', './userSettings.component', './faq.component', "./aboutUs.component", "./privacy.component"], function(exports_1, context_1) {
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
    var core_1, router_1, userSettings_component_1, faq_component_1, aboutUs_component_1, privacy_component_1;
    var GeneralRouter;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (userSettings_component_1_1) {
                userSettings_component_1 = userSettings_component_1_1;
            },
            function (faq_component_1_1) {
                faq_component_1 = faq_component_1_1;
            },
            function (aboutUs_component_1_1) {
                aboutUs_component_1 = aboutUs_component_1_1;
            },
            function (privacy_component_1_1) {
                privacy_component_1 = privacy_component_1_1;
            }],
        execute: function() {
            GeneralRouter = (function () {
                function GeneralRouter() {
                }
                GeneralRouter = __decorate([
                    core_1.Component({
                        selector: 'faq-router',
                        template: " <router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES]
                    }),
                    router_1.RouteConfig([
                        { path: '/faq', name: 'Faq', component: faq_component_1.FaqComponent, useAsDefault: true },
                        { path: '/userSettings', name: 'UserSettings', component: userSettings_component_1.UserSettingsComponent },
                        { path: '/aboutUs', name: 'AboutUs', component: aboutUs_component_1.AboutUsComponent },
                        { path: '/privacy', name: 'Privacy', component: privacy_component_1.PrivacyComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], GeneralRouter);
                return GeneralRouter;
            }());
            exports_1("GeneralRouter", GeneralRouter);
        }
    }
});
//# sourceMappingURL=GeneralRouter.js.map