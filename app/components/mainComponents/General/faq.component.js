System.register(['angular2/core', "angular2/router", "../../../models/faq", "../../../models/mainTown", "../../../services/townService.component"], function(exports_1, context_1) {
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
    var core_1, router_1, faq_1, mainTown_1, townService_component_1, router_2;
    var FaqComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
                router_2 = router_1_1;
            },
            function (faq_1_1) {
                faq_1 = faq_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            }],
        execute: function() {
            FaqComponent = (function () {
                function FaqComponent(_routeParams, _townService, _router, injector) {
                    var _this = this;
                    this._routeParams = _routeParams;
                    this._townService = _townService;
                    this._router = _router;
                    //TODO: webapi to get FAQ
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0);
                    this.faq = new faq_1.Faq("", "");
                    _townService.getTown(injector.parent.parent.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; }, function (err) { return _this.errorMessage = err; });
                }
                FaqComponent = __decorate([
                    core_1.Component({
                        selector: 'faq-container',
                        template: "\n        <div class=\"container\">\n            <section class=\"intro col-xs-12\">\n                <h1>FAQ</h1>\n                <div class=\"form-inline\">\n                <ul *ngIf=\"mainTown?.FAQs\" >\n                   <li *ngFor=\"#f of mainTown.FAQs\" >\n                   <p><bold>{{f.vraag}}</bold></p>\n                   <p>{{f.antwoord}} </p>\n                    </li>\n                </ul>\n                <p *ngIf=\"!mainTown?.faqs\"><i>Er zijn nog geen vragen en antwoord ingediend.</i></p>\n                </div>\n            </section>\n       </div>\n    ",
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams, townService_component_1.TownService, router_2.Router, core_1.Injector])
                ], FaqComponent);
                return FaqComponent;
            }());
            exports_1("FaqComponent", FaqComponent);
        }
    }
});
//# sourceMappingURL=faq.component.js.map