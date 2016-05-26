System.register(['angular2/core', 'angular2/router', "../../../services/townService.component", "../../../models/mainTown", "../../../models/faq", '../../../directives/styled', "../../../services/begrotingService", '../../../defaults/icons'], function(exports_1, context_1) {
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
    var core_1, router_1, townService_component_1, mainTown_1, faq_1, styled_1, begrotingService_1, icons_1;
    var ManageCategoriesComponent;
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
            },
            function (icons_1_1) {
                icons_1 = icons_1_1;
            }],
        execute: function() {
            ManageCategoriesComponent = (function () {
                function ManageCategoriesComponent(_begrotingService, _routeParams, _townService, _router, injector) {
                    var _this = this;
                    this._begrotingService = _begrotingService;
                    this._routeParams = _routeParams;
                    this._townService = _townService;
                    this._router = _router;
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0);
                    this.faq = new faq_1.Faq("", "");
                    this.icons = icons_1.ICONS;
                    this.gemeenteCategorieen = [];
                    this.onSelectIcon = function (event) {
                        _this.selectedGemeenteCat.icoon = event.target.className;
                    };
                    this.onShowIcons = function (gemeenteCat) {
                        _this.selectedGemeenteCat = gemeenteCat;
                    };
                    this.saveCategories = function () {
                        _this._begrotingService.putCategorieInput(_this.gemeenteCategorieen)
                            .subscribe(function (finan) { return _this.gemeenteCategorieen = finan; }, function (err) { return _this.errorMessage = "De gegevens zijn niet correct bewaard."; });
                        _this._router.navigate(['/', 'App', { town: _this.mainTown.naam }, 'Budget']);
                    };
                    this.onChange = function (event, gemeenteCat) {
                        _this.loadimage(event.target.files[0], function (img) {
                            gemeenteCat.foto = img;
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
                    _townService.getTown(injector.parent.parent.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) { return _this.mainTown = town; }, function (err) { return _this.errorMessage = "Geen stad gevonden"; });
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (finan) {
                        _this.gemeenteCategorieen = finan;
                    }, function (err) { return _this.errorMessage = "Er zijn geen grafiekgegevens gevonden."; });
                }
                ManageCategoriesComponent = __decorate([
                    core_1.Component({
                        selector: 'manage-categories-container',
                        template: "\n    <p class=\"alert alert-danger\" *ngIf=\"errorMessage\">{{errorMessage}}</p>\n    <section class=\"container\">\n        <h1>Instellingen categorie\u00EBn {{mainTown?.naam}}</h1>\n\n        <section class=\"col-xs-12 form-inline\" >\n            <h3>Instellingen kleuren en iconen</h3>\n            <p *ngIf=\"gemeenteCategorieen?.length < 1\"><i>Er zijn geen categorie\u00EBn gevonden. </i></p>\n            <table class=\"section-content table table-striped\" *ngIf=\"gemeenteCategorieen?.length > 0\">\n            <thead>\n            <th>Naam categorie</th>\n            <th>Kleur</th>\n            <th>Icoon</th>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"#gemeenteCat of gemeenteCategorieen\">\n                    <td>{{gemeenteCat.naamCat}}</td>\n                   <td><input class=\"form-control\" type=\"text\" [(ngModel)]=\"gemeenteCat.kleur\"/></td>\n                   <td> <span>{{gemeenteCat.icoon}}</span>\n                      <button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#icons\"  styled >\n                        <span class=\"glyphicon glyphicon-eye-open\" (click)=\"onShowIcons(gemeenteCat)\"></span>\n                      </button>\n                      </td>\n\n                      </tr>\n                      </tbody>\n            </table>\n        </section>\n\n        <section class=\"col-xs-12 form-inline\" >\n            <h3>Instellingen extra materiaal per categorie</h3>\n            <p *ngIf=\"gemeenteCategorieen?.length < 1\"><i>Er zijn geen categorie\u00EBn gevonden. </i></p>\n            <table class=\"section-content table table-striped\" *ngIf=\"gemeenteCategorieen?.length > 0\">\n            <thead>\n            <th>Naam categorie</th>\n            <th>Youtube url</th>\n            <th>Extra info</th>\n            <th>Afbeelding</th>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"#gemeenteCat of gemeenteCategorieen\">\n                    <td>{{gemeenteCat.naamCat}}</td>\n                   <td><input class=\"form-control\" type=\"text\" [(ngModel)]=\"gemeenteCat.film\"/></td>\n                   <td><input class=\"form-control\" type=\"text\" [(ngModel)]=\"gemeenteCat.input\"/></td>\n                   <td> <label for=\"file\"> <span class=\"btn filebtn btn-primary\" styled>Selecteer afbeelding</span>\n                            </label>\n                            <input id=\"file\" class=\"form-control inputfile\" (change)=\"onChange($event, gemeenteCat)\" type=\"file\" name=\"file\">\n                      </td>\n\n                      </tr>\n                      </tbody>\n            </table>\n                <button *ngIf=\"gemeenteCategorieen?.length > 0\" class=\"btn btn-primary pull-right\" (click)=\"saveCategories()\" styled >Opslaan</button>\n        </section>\n\n         <!-- Modal Icons-->\n        <div class=\"modal bottom fade\" id=\"icons\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"icons\">\n\t\t    <div class=\"modal-dialog\" role=\"document\">\n\t\t\t    <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n\t\t\t\t\t    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t\t\t\t\t    <h4 class=\"modal-title\" id=\"icons\">Iconen</h4>\n\t\t\t\t    </div>\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t <div class=\"icons\" >\n\t\t\t\t\t    <span *ngFor=\"#icon of icons\" [class]=\"icon\" (click)=\"onSelectIcon($event)\" data-toggle=\"modal\" data-target=\"#icons\"></span>\n\t\t\t\t\t </div>\n\t\t\t\t</div>\n\t\t\t</div><!-- modal-content -->\n\t\t</div><!-- modal-dialog -->\n\t</div><!-- modal -->\n\n    ",
                        providers: [townService_component_1.TownService, begrotingService_1.BegrotingService],
                        directives: [router_1.ROUTER_DIRECTIVES, styled_1.StyledDirective,],
                        styles: ["\n\n\n    section .section-content {\n        border: 1px solid lightgray;\n        margin-bottom: 20px;\n        padding: 20px;\n        overflow: auto;\n    }\n    th {\n        padding: 8px;\n    }\n\n    .icons span {\n            display: inline-block;\n            font-size: 2em;\n            padding: 5px;\n    }\n\n    ::-webkit-file-upload-button {\n            background: gray;\n            box-shadow: none;\n            border: none;\n            color: white;\n            border-radius: 5px;\n            padding: 5px;\n    }\n\n    input[type=file] {\n            border: none;\n    }\n\n    .input-group {\n            float: left;\n            box-sizing: border-box;\n    }\n\n    onChange = (event:any)=> {\n        this.loadimage(event.target.files[0], (img:string) => {\n            this.afb = img;\n        });\n    }\n\n    loadimage = (img:any, cb:any)=> {\n        var reader = new FileReader();\n        reader.readAsDataURL(img);\n        reader.onload = function () {\n            let result = reader.result;\n            cb(result);\n        }\n    }\n\n    "]
                    }), 
                    __metadata('design:paramtypes', [begrotingService_1.BegrotingService, router_1.RouteParams, townService_component_1.TownService, router_1.Router, core_1.Injector])
                ], ManageCategoriesComponent);
                return ManageCategoriesComponent;
            }());
            exports_1("ManageCategoriesComponent", ManageCategoriesComponent);
        }
    }
});
//# sourceMappingURL=manageCategories.component.js.map