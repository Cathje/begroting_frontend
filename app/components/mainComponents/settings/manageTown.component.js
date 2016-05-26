System.register(['angular2/core', 'angular2/router', "../../../services/townService.component", "../../../models/mainTown", "../../../models/faq", '../../../directives/styled', "../../../services/begrotingService"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, router_1, townService_component_1, mainTown_1, faq_1, styled_1, begrotingService_1;
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
            },
            function (begrotingService_1_1) {
                begrotingService_1 = begrotingService_1_1;
            }],
        execute: function() {
            ManageTownComponent = (function () {
                function ManageTownComponent(_begrotingService, _routeParams, _townService, _router, injector) {
                    var _this = this;
                    this._begrotingService = _begrotingService;
                    this._routeParams = _routeParams;
                    this._townService = _townService;
                    this._router = _router;
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0);
                    this.faq = new faq_1.Faq("", "");
                    this.gemeenteCategorieen = [{ kleur: "red", icoon: "glyphicon glyphicon-ok" }];
                    this.changeColor = function () {
                        sessionStorage.setItem("mainColor", _this.mainTown.hoofdkleur);
                        location.reload();
                        //TODO: + create webapi to save this in backend
                    };
                    this.changeImg = function (event) {
                        _this.loadimage(event.target.files[0], function (img) {
                            _this.afb = img;
                            _this.mainTown.logo = img;
                        });
                        //TODO: + create webapi to save this in backend
                    };
                    this.loadimage = function (img, cb) {
                        var reader = new FileReader();
                        reader.readAsDataURL(img);
                        reader.onload = function () {
                            var result = reader.result;
                            cb(result);
                        };
                    };
                    _townService.getTown(injector.parent.parent.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; }, function (err) { return _this.errorMessage = "Geen stad gevonden"; });
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (finan) { return _this.gemeenteCategorieen = finan; }, function (err) { return _this.errorMessage = "Er zijn geen grafiekgegevens gevonden."; });
                }
                ManageTownComponent.prototype.ngOnInit = function () {
                };
                ManageTownComponent.prototype.verwijder = function (f) {
                    var _this = this;
                    //@TODO geeft in code een error maar werkt --> ??
                    this.mainTown.FAQs.pop(f);
                    if (f.id != 0) {
                        this._townService.deleteFAQ(f.ID).subscribe(function (d) { return _this.id = d; }, function (err) { return _this.errorMessage = err; });
                    }
                };
                ManageTownComponent.prototype.submit = function () {
                    var _this = this;
                    this._townService.putTownInput(this.mainTown).subscribe(function (d) { return _this.id = d; }, function (id) { return _this.errorMessage = id; });
                    this._router.navigate(['/', 'App', { town: this.mainTown.naam }, 'Budget']);
                };
                ManageTownComponent.prototype.voegToe = function () {
                    this.mainTown.FAQs.push(new faq_1.Faq(this.faq.vraag, this.faq.antwoord));
                    this.faq.vraag = "";
                    this.faq.antwoord = "";
                };
                ManageTownComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-town-container',
                        template: "\n    <section class=\"container\">\n        <p class=\"alert alert-danger\" *ngIf=\"errorMessage\">{{errorMessage}}</p>\n        <h1>Instellingen gemeente {{mainTown?.naam}}</h1>\n        <section class=\"col-xs-12 form-inline\">\n            <h3>Kleuren website</h3>\n            <div class=\"section-content\">\n                <div class=\"col-xs-12 form-group\">\n                    <label >Hoofdkleur</label>\n                    <input class=\"form-control\" type=\"text\" [(ngModel)]=\"mainTown.hoofdkleur\"/>\n                    <button class=\"btn btn-primary\" (click)=\"changeColor()\" styled ><span class=\"glyphicon glyphicon-eye-open\"></span></button>\n                    <span class=\"small\"><i>*Klik op het oogje om het resultaat te bekijken. U kan dit nadien onderaan opslaan.</i></span>\n                </div>\n            </div>\n        </section>\n\n        <section class=\"col-xs-12 form-inline\">\n            <h3>Logo website</h3>\n            <div class=\"section-content\">\n            <div class=\"section-content\">\n                <div class=\"col-xs-12 form-group\">\n                    <input id=\"file\" type=\"file\" (change)=\"changeImg($event)\"/>\n                    <img *ngIf=\"afb\" [src]=\"afb\" class=\"logo\" />                </div>\n            </div>\n            </div>\n        </section>\n\n      <section class=\"col-xs-12\">\n            <h3>FAQ</h3>\n            <div class=\"section-content\">\n                <div class=\"form-inline\">\n                <ul *ngIf=\"mainTown?.FAQs\" >\n                   <li *ngFor=\"#f of mainTown.FAQs\" >\n                   <p>\n                    <button class=\"btn btn-primary\" (click)=\"verwijder(f)\" styled><span class=\"glyphicon glyphicon-trash\"></span></button>\n                   <strong>{{f.vraag}}</strong> {{f.antwoord}} </p>\n                    </li>\n                </ul>\n                <p *ngIf=\"mainTown?.faqs?.length < 1\"><i>Er zijn nog geen vragen en antwoord ingediend.</i></p>\n                </div>\n\n                <div class=\"addFaq\">\n                    <div class=\"form-group\">\n                        <label >Vraag:</label>\n                        <input type=\"text\" [(ngModel)]=\"faq.vraag\"/>\n                    </div>\n                    <div class=\"form-group\">\n                        <label >Antwoord:</label>\n                        <input type=\"text\" [(ngModel)]=\"faq.antwoord\"/>\n                    </div>\n                   <button class=\"btn btn-primary pull-right\" (click)=\"voegToe()\" styled>Voeg vraag toe</button>\n                </div>\n            </div>\n        </section>\n        <button class=\"btn btn-primary pull-right\" (click)=\"submit()\" styled>opslaan</button>\n    </section>\n\n\n    ",
                        providers: [townService_component_1.TownService, begrotingService_1.BegrotingService],
                        directives: [router_1.ROUTER_DIRECTIVES, styled_1.StyledDirective,],
                        styles: ["\n    ::-webkit-file-upload-button {\n        background: gray;\n        box-shadow: none;\n        border:none;\n        color:white;\n        border-radius: 5px;\n        padding: 5px;\n    }\n\n    input[type=file]{\n        border: none;\n    }\n\n    .addFaq {\n        border-top: 1px solid lightgray;\n    }\n\n    .logo{\n        width: 50%;\n        border: 1px solid lightgray;\n    }\n\n    section .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        overflow: auto;\n    }\n\n    ul {\n        list-style: none;\n    }\n\n    "]
                    }), 
                    __metadata('design:paramtypes', [begrotingService_1.BegrotingService, router_1.RouteParams, townService_component_1.TownService, router_1.Router, core_1.Injector])
                ], ManageTownComponent);
                return ManageTownComponent;
            })();
            exports_1("ManageTownComponent", ManageTownComponent);
        }
    }
});
//# sourceMappingURL=manageTown.component.js.map