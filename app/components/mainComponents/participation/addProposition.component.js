System.register(['angular2/core', 'angular2/router'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1;
    var AddPropositionComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AddPropositionComponent = (function () {
                function AddPropositionComponent(_routeParams) {
                    this._routeParams = _routeParams;
                }
                AddPropositionComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                AddPropositionComponent = __decorate([
                    core_1.Component({
                        selector: 'add-proposition-container',
                        template: "\n    <div class=\"container\">\n    <h2>Voorstel indienen</h2>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], AddPropositionComponent);
                return AddPropositionComponent;
            })();
            exports_1("AddPropositionComponent", AddPropositionComponent);
        }
    }
});
//# sourceMappingURL=addProposition.component.js.map