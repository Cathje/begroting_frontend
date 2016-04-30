System.register(['angular2/core', './components/mainComponents/home.component', './components/mainComponents/town.component', './components/mainComponents/project.component', './components/mainComponents/townBudget.component', 'angular2/router', "angular2/http"], function(exports_1) {
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
    var core_1, home_component_1, town_component_1, project_component_1, townBudget_component_1, router_1, http_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (town_component_1_1) {
                town_component_1 = town_component_1_1;
            },
            function (project_component_1_1) {
                project_component_1 = project_component_1_1;
            },
            function (townBudget_component_1_1) {
                townBudget_component_1 = townBudget_component_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Begroting Vlaanderen';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'begroting-app',
                        template: "\n    <div class=\"menu\">\n        <img class=\"logo\" src=\"./app/images/logo.png\"/>\n        <span class=\"pull-xs-right\">\n<a [routerLink]=\"['Home']\">Sign in</a>|\n<a [routerLink]=\"['Home']\">Log in</a>\n</span>\n\n</div>\n                <router-outlet></router-outlet>",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS],
                        styles: [".menu {\n    background-color: black;\n    color:white;\n    padding: 20px;\n    text-align: left;\n}\n\n.logo {\n    width: 150px;\n    margin: 0 auto;\n\n}\n\n.menu a  {\n    color:white;\n    padding: 10px;\n}\n"]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Home', component: home_component_1.HomeComponent },
                        { path: '/:town', name: 'MainTown', component: town_component_1.TownComponent },
                        { path: '/:town/:projectNumber', name: 'Project', component: project_component_1.ProjectComponent },
                        { path: '/townBudget', name: 'TownBudget', component: townBudget_component_1.TownBudgetComponent }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map