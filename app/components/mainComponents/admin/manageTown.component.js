System.register(['angular2/core', 'angular2/router', "../../../services/townService.component", "../../../models/mainTown", "../../../models/faq", '../../../directives/styled'], function(exports_1, context_1) {
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
    var core_1, router_1, townService_component_1, mainTown_1, faq_1, styled_1;
    var ManageTownComponent;
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
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (faq_1_1) {
                faq_1 = faq_1_1;
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
            }],
        execute: function() {
            ManageTownComponent = (function () {
                function ManageTownComponent(applicationRef, _routeParams, _townService, _router) {
                    var _this = this;
                    this.applicationRef = applicationRef;
                    this._routeParams = _routeParams;
                    this._router = _router;
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0);
                    this.faq = new faq_1.Faq("", "");
                    this.changeColor = function () {
                        sessionStorage.setItem("mainColor", _this.mainTown.kleur);
                    };
                    this.changeImg = function (event) {
                        _this.loadimage(event.target.files[0], function (img) {
                            _this.afb = img;
                        });
                    };
                    this.loadimage = function (img, cb) {
                        var reader = new FileReader();
                        reader.readAsDataURL(img);
                        reader.onload = function () {
                            var result = reader.result;
                            cb(result);
                        };
                    };
                    _townService.getTown(_routeParams.get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; });
                    // console.log(('666', _applicationRef);
                }
                ManageTownComponent.prototype.ngOnInit = function () {
                };
                ManageTownComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-town-container',
                        template: "\n    <p class=\"alert alert-danger\" *ngIf=\"errorMessage\">{{errorMessage}}</p>\n    <section class=\"container\">\n        <h1>Instellingen gemeente</h1>\n        <section class=\"col-xs-12 form-inline\">\n            <h3>Kleuren website</h3>\n            <div class=\"section-content\">\n                <div class=\"col-xs-12 form-group\">\n                    <label >Hoofdkleur</label>\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"mainTown.kleur\"/>\n                    <button class=\"btn btn-primary\" (click)=\"changeColor()\" styled ><span class=\"glyphicon glyphicon-plus\"></span></button>\n                    <span class=\"small\"><i>*Gelieve een hexadecimale waarde of een rgba waarde in te voeren</i></span>\n                </div>\n            </div>\n        </section>\n        <section class=\"col-xs-12 form-inline\">\n            <h3>Logo website</h3>\n            <div class=\"section-content\">\n                <div class=\"col-xs-12 form-group\">\n                    <input id=\"file\" type=\"file\" (change)=\"changeImg($event)\"/>\n                    <img *ngIf=\"afb\" [src]=\"afb\" class=\"logo\" />                </div>\n            </div>\n        </section>\n        <section class=\"col-xs-12\">\n            <h3>FAQ</h3>\n            <div class=\"section-content\">\n                <div class=\"form-inline\">\n                <ul *ngIf=\"faqs\" >\n                   <li *ngFor=\"#f of faqs\" >\n                   <button class=\"btn btn-primary\" (click)=\"verwijder(f.id)\" styled><span class=\"glyphicon glyphicon-trash\"></span></button>\n                   <p>{{f.vraag}} </p>\n                    </li>\n                </ul>\n                <p *ngIf=\"!faqs\"><i>Er zijn nog geen vragen en antwoord ingediend.</i></p>\n                </div>\n\n                <div class=\"addFaq\">\n                    <div class=\"form-group\">\n                        <label >Vraag:</label>\n                        <input type=\"text\" [(ngModel)]=\"faq.vraag\"/>\n                    </div>\n                    <div class=\"form-group\">\n                        <label >Antwoord:</label>\n                        <input type=\"text\" [(ngModel)]=\"faq.antwoord\"/>\n                    </div>\n                   <button class=\"btn btn-primary pull-right\" (click)=\"voegToe()\" styled>Voeg toe</button>\n                </div>\n            </div>\n        </section>\n\n    </section>\n    ",
                        providers: [townService_component_1.TownService],
                        directives: [router_1.ROUTER_DIRECTIVES, styled_1.StyledDirective],
                        styles: ["\n    ::-webkit-file-upload-button {\n        background: #2ac7d2;\n        box-shadow: none;\n        border:none;\n        color:white;\n        border-radius: 5px;\n        padding: 5px;\n    }\n\n    input[type=file]{\n        border: none;\n    }\n\n    .addFaq {\n        border-top: 1px solid lightgray;\n    }\n\n    .logo{\n        width: 50%;\n        border: 1px solid lightgray;\n    }\n\n    "]
                    }), 
                    __metadata('design:paramtypes', [core_1.ApplicationRef, router_1.RouteParams, townService_component_1.TownService, router_1.Router])
                ], ManageTownComponent);
                return ManageTownComponent;
            }());
            exports_1("ManageTownComponent", ManageTownComponent);
        }
    }
});
//# sourceMappingURL=manageTown.component.js.map