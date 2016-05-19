System.register(['angular2/core', 'angular2/router'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
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
                AddInformationComponent.prototype.onChange = function (event) {
                    console.log(event.target.files[0]);
                    var reader = new FileReader();
                    reader.readAsDataURL(event.target.files[0]);
                    reader.onload = function () {
                        this.base64 = reader.result;
                        console.log(this.base64);
                    };
                    //TODO: weet niet waarom, maar de base64 variabele wordt niet getoond in de component en blijft undefined, terwijl de console log wel werkt
                };
                AddInformationComponent.prototype.ngOnInit = function () {
                    var number = this._routeParams.get('projectNumber');
                };
                AddInformationComponent = __decorate([
                    core_1.Component({
                        selector: 'add-information-container',
                        template: "\n    <div class=\"container\">\n    <h2>Voeg informatie toe</h2>\n    <input id=\"file\" type=\"file\" (change)=\"onChange($event)\"/>\n    <img src=\"{{base64}}\" />\n    <p>{{base64}}</p>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], AddInformationComponent);
                return AddInformationComponent;
            }());
            exports_1("AddInformationComponent", AddInformationComponent);
        }
    }
});
//# sourceMappingURL=addInformation.component.js.map