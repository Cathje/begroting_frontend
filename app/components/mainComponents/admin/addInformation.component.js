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
    var AddInformationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AddInformationComponent = (function () {
                function AddInformationComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                AddInformationComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                AddInformationComponent = __decorate([
                    core_1.Component({
                        selector: 'add-information-container',
                        template: "\n    <div class=\"container\">\n    <h2>Voeg informatie toe</h2>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], AddInformationComponent);
                return AddInformationComponent;
            })();
            exports_1("AddInformationComponent", AddInformationComponent);
        }
    }
});
//# sourceMappingURL=addInformation.component.js.map