System.register(['angular2/core', 'angular2/router', "angular2/http", './components/mainComponents/homeRouter', "./components/mainComponents/login/login.component", "./components/mainComponents/login/register.component", "./services/townService.component", "./components/mainComponents/home.component", "./components/subComponents/nav/menu.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, http_1, homeRouter_1, login_component_1, register_component_1, townService_component_1, home_component_1, menu_component_1;
    var AppComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (homeRouter_1_1) {
                homeRouter_1 = homeRouter_1_1;
            },
            function (login_component_1_1) {
                login_component_1 = login_component_1_1;
            },
            function (register_component_1_1) {
                register_component_1 = register_component_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (home_component_1_1) {
                home_component_1 = home_component_1_1;
            },
            function (menu_component_1_1) {
                menu_component_1 = menu_component_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent(_router, _location) {
                    var _this = this;
                    this._router = _router;
                    this._location = _location;
                    this.onLogOut = function () {
                        sessionStorage.removeItem("newUser");
                        sessionStorage.removeItem('access_token');
                        sessionStorage.removeItem('gemeente');
                        sessionStorage.removeItem('role');
                        sessionStorage.removeItem('user');
                        sessionStorage.removeItem('token');
                        _this._router.navigate(['/', 'Default']);
                    };
                    console.log('111', _location.path() === '');
                    this.isHomePage = _location.path() === '';
                }
                AppComponent.prototype.ngOnInit = function () {
                    this.isLoggedIn = sessionStorage.getItem('user') == null ? false : true;
                    this.register = sessionStorage.getItem('user') == null ? 'Registreer' : 'Welkom, ' + sessionStorage.getItem('user');
                };
                AppComponent = __decorate([
                    core_1.Component({
                        selector: 'begroting-app',
                        template: "\n    <div class=\"menu\">\n        <img class=\"logo\" src=\"/app/images/logo.png\"/>\n        <div class=\"right-menu\">\n        <span  id=\"social\">\n            <span> Deel deze website</span>\n            <!-- twitter-->\n             <a href=\"http://twitter.com/share?url=http://begrotingwebapi.azurewebsites.net&text=De begroting: Ik doe mee!\" \n            target=\"_blank\" class=\"btn-social\">\n            <img src=\"/app/images/social_media/twitter.jpg\" width=\"40px\" height=\"40px\" border=\"0\" >\n            </a>\n              <!-- Facebook -->\n            <a href=\"http://www.facebook.com/sharer/sharer.php?u=http://begrotingwebapi.azurewebsites.net\" \n            target=\"_blank\" class=\"btn-social\">\n            <img src=\"/app/images/social_media/facebook.jpg\" width=\"40px\" height=\"40px\">\n            </a>\n    \n            <!-- LinkedIn -->\n            <a href=\"http://www.linkedin.com/shareArticle?url=http://begrotingwebapi.azurewebsites.net&title=De%20Begroting:%20Ik20doe20mee!&summary=De%20Begroting:%20Ik20doe20mee!&source=http://begrotingwebapi.azurewebsites.net\" \n            target=\"_blank\" class=\"btn-social\">\n            <img src=\"/app/images/social_media/linkedin.jpg\" width=\"40px\" height=\"40px\">\n            </a>\n            \n               <!-- Google Plus -->\n            <a href=\"https://plus.google.com/share?url=http://begrotingwebapi.azurewebsites.net\" target=\"_blank\"\n            class=\"btn-social\">\n                <img src=\"/app/images/social_media/googlePlus.jpg\" width=\"40px\" height=\"40px\">\n            </a>\n        </span>\n\n        <span id=\"registration\">\n            <a [routerLink]=\"['Register']\">{{register}}</a>|\n            <a *ngIf=\"!isLoggedIn\">Log in</a>\n            <span *ngIf=\"isLoggedIn\" (click)=\"onLogOut()\">Log uit</span>\n        </span>\n        </div>\n    </div>\n    <navigation-menu *ngIf=\"isHomePage\"></navigation-menu>\n                <router-outlet></router-outlet>\n\n\n\n                ",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [router_1.ROUTER_PROVIDERS, http_1.HTTP_PROVIDERS, townService_component_1.TownService, menu_component_1.NavigationMenuComponent],
                        styles: ["\n\n    .menu {\n        background-color: black;\n        color: white;\n        padding: 20px;\n        text-align: left;\n    }\n\n    .logo {\n        width: 150px;\n        margin: 0 auto;\n    }\n\n    .right-menu {\n        margin-top: 40px;\n        float: right;\n        color: white;\n    }\n\n    #social span{\n        padding-right: 10px;\n    }\n\n    .btn-social img {\n        border-radius: 50%;\n        width: 20px;\n        height: 20px;\n    }\n\n    #registration a {\n        padding:10px;\n    }\n\n    @media screen and (max-width: 768px) {\n        .right-menu {\n            margin-top: 0;;\n            float: none;\n        }\n\n        #social, #registration{\n            display: inline-block;\n        }\n\n        #registration {\n            float:right\n        }\n    }\n\n    @media screen and (max-width: 420px) {\n        #social {\n            display: none;\n        }\n\n        #registration {\n            float: none;\n            margin-left: 0;\n        }\n\n        #registration a {\n            padding-left: 0;\n        }\n    }\n\n    "]
                    }),
                    router_1.RouteConfig([
                        { path: '/', name: 'Default', component: home_component_1.HomeComponent },
                        { path: '/:town/...', name: 'App', component: homeRouter_1.HomeRouter },
                        { path: '/login', name: 'Login', component: login_component_1.LoginComponent },
                        { path: '/register', name: 'Register', component: register_component_1.RegisterComponent }
                    ]), 
                    __metadata('design:paramtypes', [router_1.Router, router_1.Location])
                ], AppComponent);
                return AppComponent;
            })();
            exports_1("AppComponent", AppComponent);
        }
    }
});
//# sourceMappingURL=app.component.js.map