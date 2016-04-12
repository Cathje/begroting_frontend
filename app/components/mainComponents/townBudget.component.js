System.register(['angular2/core'], function(exports_1) {
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
    var core_1;
    var TownBudgetComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            TownBudgetComponent = (function () {
                function TownBudgetComponent() {
                    this.title = 'Gemeente - Begrotingsvoorstel';
                }
                TownBudgetComponent = __decorate([
                    core_1.Component({
                        selector: 'home-container',
                        template: '<h3>{{title}}</h3>'
                    }), 
                    __metadata('design:paramtypes', [])
                ], TownBudgetComponent);
                return TownBudgetComponent;
            })();
            exports_1("TownBudgetComponent", TownBudgetComponent);
        }
    }
});
//# sourceMappingURL=townBudget.component.js.map