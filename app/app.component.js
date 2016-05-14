System.register(['angular2/core', './components/mainComponents/homeRouter.js', 'angular2/router', "angular2/http", "./components/mainComponents/Login/login.component.js", "./components/mainComponents/Login/register.component.js"], function(exports_1) {
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
    var core_1, homeRouter_js_1, router_1, http_1, login_component_js_1, register_component_js_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (homeRouter_js_1_1) {
                homeRouter_js_1 = homeRouter_js_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (login_component_js_1_1) {
                login_component_js_1 = login_component_js_1_1;
            },
            function (register_component_js_1_1) {
                register_component_js_1 = register_component_js_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                    this.title = 'Begroting Vlaanderen';
                }
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'begroting-app',
                        template: "\n    <div class=\"menu\">\n        <img class=\"logo\" src=\"/app/images/logo.png\"/>\n        <div class=\"rightblock\">\n\n        <span  id=\"social\">\n            <span id=\"titelSocial\"> Deel deze website</span>\n            <!-- twitter-->\n             <a href=\"http://twitter.com/share?url=http://begrotingwebapi.azurewebsites.net&text=De begroting: Ik doe mee!\" \n            target=\"_blank\" class=\"socialBtn\">\n            <img src=\"/app/images/social_media/twitter.jpg\" width=\"40px\" height=\"40px\" border=\"0\" >\n            </a>\n              <!-- Facebook -->\n            <a href=\"http://www.facebook.com/sharer/sharer.php?u=http://begrotingwebapi.azurewebsites.net\" \n            target=\"_blank\" class=\"socialBtn\">\n            <img src=\"/app/images/social_media/facebook.jpg\" width=\"40px\" height=\"40px\">\n            </a>\n    \n            <!-- LinkedIn -->\n            <a href=\"http://www.linkedin.com/shareArticle?url=http://begrotingwebapi.azurewebsites.net&title=De%20Begroting:%20Ik20doe20mee!&summary=De%20Begroting:%20Ik20doe20mee!&source=http://begrotingwebapi.azurewebsites.net\" \n            target=\"_blank\" class=\"socialBtn\">\n            <img src=\"/app/images/social_media/linkedin.jpg\" width=\"40px\" height=\"40px\">\n            </a>\n            \n               <!-- Google Plus -->\n            <a href=\"https://plus.google.com/share?url=http://begrotingwebapi.azurewebsites.net\" target=\"_blank\"\n            class=\"socialBtn\">\n                <img src=\"/app/images/social_media/googlePlus.jpg\" width=\"40px\" height=\"40px\">\n            </a>\n        </span>\n\n        <span id=\"registration\">\n            <a class=\"signIn\"[routerLink]=\"['Register']\">Registreer</a>|\n            <a class=\"signIn\" [routerLink]=\"['Login']\">Log in</a>\n        </span>\n        </div>\n    </div>\n                <router-outlet></router-outlet>    \n                ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [
                            router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS],
                        styles: ["\n\n    .menu {\n        background-color: black;\n        color:white;\n        padding: 20px;\n        text-align: left;\n    }\n\n    .rightblock {\n        margin-top: 30px;\n        float: right;\n    }\n\n    .logo {\n        width: 150px;\n        margin: 0 auto;\n    }\n\n    #titelSocial{\n        padding-right: 10px;\n    }\n\n    .socialBtn:hover{\n        text-decoration: none;\n    }\n\n    .socialBtn img {\n        border-radius: 50%;\n        width: 30px;\n        height: 30px;\n    }\n\n    .signIn  {\n        color:white;\n        padding:10px;\n    }\n\n\n    "]
                    }),
                    router_1.RouteConfig([
                        { path: '/...', name: 'App', component: homeRouter_js_1.HomeRouter },
                        { path: '/login', name: 'Login', component: login_component_js_1.LoginComponent },
                        { path: '/register', name: 'Register', component: register_component_js_1.RegisterComponent }
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