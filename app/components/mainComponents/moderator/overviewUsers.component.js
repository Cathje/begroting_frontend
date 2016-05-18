System.register(['angular2/core', 'angular2/router', "../../subComponents/input/townSelector.component.js", "../../../services/townService.component.js", "../../../models/mainTown.js", "../../../pipes/keysPipe.js"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, townSelector_component_js_1, townService_component_js_1, mainTown_js_1, keysPipe_js_1;
    var OverviewUsersComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townSelector_component_js_1_1) {
                townSelector_component_js_1 = townSelector_component_js_1_1;
            },
            function (townService_component_js_1_1) {
                townService_component_js_1 = townService_component_js_1_1;
            },
            function (mainTown_js_1_1) {
                mainTown_js_1 = mainTown_js_1_1;
            },
            function (keysPipe_js_1_1) {
                keysPipe_js_1 = keysPipe_js_1_1;
            }],
        execute: function() {
            OverviewUsersComponent = (function () {
                function OverviewUsersComponent(_routeParams, _townService, _router, params, injector) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._townService = _townService;
                    this._router = _router;
                    this.mainTown = new mainTown_js_1.MainTown("", "", 0, 0);
                    this.gebruikers = [
                        { naam: 'Catherine', email: 'catherine.beaucourt@gmail.com', rol: 'admin', actief: true },
                        { naam: 'Nadya', email: 'nadyat@gmail.com', rol: 'moderator', actief: false }];
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; }, function (err) { return _this.errorMessage = err; });
                }
                OverviewUsersComponent.prototype.submit = function () {
                    //TODO: create service for saving user changes
                    // this._townService.saveUsers(this.mainTown).subscribe();
                    this._router.navigate(['/', 'App', 'Budget', { town: this.mainTown.naam }]);
                };
                OverviewUsersComponent.prototype.delete = function (email, gebruiker) {
                    this.gebruikers.pop(gebruiker);
                    //TODO : create service for deleting user
                    //this._townService.deleteGebruiker(email).subscribe();
                };
                OverviewUsersComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-users-container',
                        template: "\n    <p *ngIf=\"errorMessage\">Geen gebruikers gevonden voor deze gemeente</p>\n    <section class=\"container\" *ngIf=\"!errorMessage\">\n    <h1>Overzicht gebruikers</h1>\n    <section class=\"col-xs-12\">\n        <div class=\"section-content\">\n        <p *ngIf=\"!gebruikers\"><i>Er zijn geen gebruikers gevonden</i></p>\n\n        <table class=\"table table-striped\">\n            <thead>\n            <tr>\n                <th>Naam</th>\n                <th>E-mail</th>\n                <th>Rol</th>\n                <th>Actief?</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"#gebruiker of gebruikers\">\n                <td>{{gebruiker.naam}}</td>\n                <td>{{gebruiker.email}}</td>\n                <td>\n                <select class=\"form-control\" [ngModel]=gebruiker.rol >\n                    <option>admin</option>\n                    <option>moderator</option>\n                </select>\n                </td>\n                <td>\n                <input type=\"checkbox\" [ngModel]=gebruiker.actief>\n                </td>\n                <td>\n                    <button class=\"btn btn-primary\" (click)=\"verwijder(gebruiker.email, gebruiker)\"><span class=\"glyphicon glyphicon-trash\"></span></button>\n</td>\n            </tr>\n            </tbody>\n        </table>\n\n\n        </div>\n    </section>\n\n        <button class=\"btn btn-primary pull-right\" (click)=\"submit()\">opslaan</button>\n</section>\n",
                        providers: [townService_component_js_1.TownService],
                        pipes: [keysPipe_js_1.KeysPipe],
                        directives: [router_1.ROUTER_DIRECTIVES, townSelector_component_js_1.TownSelectorComponent],
                        styles: ["\n\n    label{\n        text-align: left;\n        width: 120px;\n        background-color:white;\n    }\n    section div {\n        padding: 5px;\n        box-sizing: border-box;\n    }\n\n    .input-group {\n        float: left;\n        box-sizing: border-box;\n    }\n\n    li {\n        list-style: none;\n        margin-bottom: 10px;\n    }\n\n    .form-inline:nth-child(2) {\n        border-top: 1px dashed lightgray;\n    }\n\n    section .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        overflow: auto;\n    }\n\n    textarea {\n        width: 100% !important;\n    }\n\n    "]
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, (typeof (_a = typeof townService_component_js_1.TownService !== 'undefined' && townService_component_js_1.TownService) === 'function' && _a) || Object, router_1.Router, router_1.RouteParams, core_1.Injector])
                ], OverviewUsersComponent);
                return OverviewUsersComponent;
                var _a;
            })();
            exports_1("OverviewUsersComponent", OverviewUsersComponent);
        }
    }
});
//# sourceMappingURL=overviewUsers.component.js.map