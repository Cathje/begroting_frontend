System.register(['angular2/core', 'angular2/router', "../../../services/townService.component"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, townService_component_1;
    var UserSettingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            }],
        execute: function() {
            UserSettingsComponent = (function () {
                function UserSettingsComponent(_townService, _router) {
                    var _this = this;
                    this._townService = _townService;
                    this._router = _router;
                    _townService.getTowns()
                        .subscribe(function (towns) { return _this.towns = towns; });
                    this.gemeente = sessionStorage.getItem('gemeente');
                    this.email = sessionStorage.getItem('user');
                }
                UserSettingsComponent.prototype.onSubmit = function () {
                    this._loginService.putGebruiker(this.email, this.nieuweGemeente).subscribe();
                    this._router.navigate(['/', 'App', { town: this.nieuweGemeente }, 'Budget']);
                };
                UserSettingsComponent.prototype.onSelect = function (event) {
                    this.nieuweGemeente = event.target.value;
                };
                UserSettingsComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-container',
                        template: "\n        <div class=\"overview-container\">\n            <div class=\"container\">\n\t\t\t\t<div style=\"width:450px; margin:0 auto;\">\n\n\t\t\t\t\t<h2 class=\"form-login-heading\">Pas uw gemeente aan voor {{gebruiker.email}}</h2>\n\t\t\t\t\t<p>Je huidige gemeente is: {{gemeente}}</p>\n\t\t\t\t\t<br/>\n\t\t\t\t\t<p>kies een nieuwe gemeente:</p>\n\t\t\t\t\t<div class=\" styled-select slate right-align\">\n\t\t\t\t\t\t\t<select class=\"\" (change)=\"onSelect($event)\" class=\"form-control\">\n\t\t\t\t\t\t\t\t<option selected disabled></option>\n\t\t\t\t\t\t\t\t<option *ngFor=\"#town of towns\" [value]=\"town.naam\">{{town.naam}}</option>\n\t\t\t\t\t\t\t</select>\n\t\t\t\t\t</div>\n\n\t\t\t\t\t<br>\n\n\t\t\t\t\t<button (click)=\"onSubmit()\" class=\"btn btn-md btn-info btn-bloc\">Opslaan</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n",
                        directives: [router_1.ROUTER_DIRECTIVES],
                        providers: [townService_component_1.TownService],
                        styles: ["\n\n"]
                    }), 
                    __metadata('design:paramtypes', [townService_component_1.TownService, router_1.Router])
                ], UserSettingsComponent);
                return UserSettingsComponent;
            })();
            exports_1("UserSettingsComponent", UserSettingsComponent);
        }
    }
});
//# sourceMappingURL=userSettings.component.js.map