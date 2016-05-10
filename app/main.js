System.register(['angular2/core', 'angular2/platform/browser', './app.component.js', "angular2/router"], function(exports_1) {
    var core_1, browser_1, app_component_js_1, router_1;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_js_1_1) {
                app_component_js_1 = app_component_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            browser_1.bootstrap(app_component_js_1.AppComponent, [router_1.ROUTER_PROVIDERS, router_1.ROUTER_DIRECTIVES,
                core_1.provide(router_1.ROUTER_PRIMARY_COMPONENT, { useValue: app_component_js_1.AppComponent }),
                core_1.provide(router_1.APP_BASE_HREF, { useValue: "/" }),
            ]);
        }
    }
});
//# sourceMappingURL=main.js.map