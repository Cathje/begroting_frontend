System.register(['angular2/core', 'angular2/router'], function(exports_1) {
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
    var core_1, router_1;
    var OverviewPropositionsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            OverviewPropositionsComponent = (function () {
                function OverviewPropositionsComponent(_routeParams) {
                    this._routeParams = _routeParams;
                    this.projects = [];
                }
                OverviewPropositionsComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                OverviewPropositionsComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-propositions-container',
                        template: "\n    <div class=\"container\">\n    <h2>Overzicht voorstellen</h2>\n\n    <div class=\"section-content\">\n        <p *ngIf=\"!gebruikers\"><i>Er zijn geen gebruikers gevonden</i></p>\n\n        <table class=\"table table-striped\">\n            <thead>\n            <tr>\n                <th>Naam</th>\n                <th>E-mail</th>\n                <th>Rol</th>\n                <th>Actief?</th>\n            </tr>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"#project of projects.antwoorden\">\n                <td>{{project.naam}}</td>\n                <td>{{project.email}}</td>\n                <td>\n                <select class=\"form-control\" [ngModel]=gebruiker.rol >\n                    <option>admin</option>\n                    <option>moderator</option>\n                </select>\n                </td>\n                <td>\n                <input type=\"checkbox\" [ngModel]=project.status>\n                </td>\n                <td>\n                    <button class=\"btn btn-primary\" (click)=\"verwijder(gebruiker.email, gebruiker)\"><span class=\"glyphicon glyphicon-trash\"></span></button>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n        </div>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], OverviewPropositionsComponent);
                return OverviewPropositionsComponent;
            })();
            exports_1("OverviewPropositionsComponent", OverviewPropositionsComponent);
        }
    }
});
//# sourceMappingURL=overviewPropositions.component.js.map