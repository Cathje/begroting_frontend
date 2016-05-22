System.register(['angular2/core', './../../../services/townService.component', 'angular2/http', 'angular2/router', './../../subComponents/input/townSelector.component', './../../subComponents/input/editableField.component', "../../../models/mainTown", './../../subComponents/graphs/sunburst.component', "../../../services/begrotingService", "../../../mockData/mock-categories", "../../../models/bestuurType", "../../../pipes/keysPipe"], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, townService_component_1, http_1, router_1, townSelector_component_1, editableField_component_1, mainTown_1, sunburst_component_1, begrotingService_1, mock_categories_1, bestuurType_1, keysPipe_1;
    var ExpensesComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townService_component_1_1) {
                townService_component_1 = townService_component_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
            },
            function (editableField_component_1_1) {
                editableField_component_1 = editableField_component_1_1;
            },
            function (mainTown_1_1) {
                mainTown_1 = mainTown_1_1;
            },
            function (sunburst_component_1_1) {
                sunburst_component_1 = sunburst_component_1_1;
            },
            function (begrotingService_1_1) {
                begrotingService_1 = begrotingService_1_1;
            },
            function (mock_categories_1_1) {
                mock_categories_1 = mock_categories_1_1;
            },
            function (bestuurType_1_1) {
                bestuurType_1 = bestuurType_1_1;
            },
            function (keysPipe_1_1) {
                keysPipe_1 = keysPipe_1_1;
            }],
        execute: function() {
            ExpensesComponent = (function () {
                function ExpensesComponent(_townService, _begrotingService, http, params, injector, _router) {
                    var _this = this;
                    this._townService = _townService;
                    this._begrotingService = _begrotingService;
                    this.http = http;
                    this._router = _router;
                    this.title = 'Gemeente - home';
                    this.imglink = "";
                    this.name = "";
                    this.mainTown = new mainTown_1.MainTown("", "", 0, 0); //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
                    this.isVisable = false;
                    this.contentbutton = "meer info";
                    this.showActions = false;
                    this.isEditor = false; //TODO: adapt value when signed in with special role
                    this.categories = [];
                    this.headCategories = mock_categories_1.CATEGORIES;
                    this.types = bestuurType_1.BestuurType;
                    this.windowWidth = window.innerWidth;
                    this.width = window.innerWidth < 768 ? window.innerWidth * 0.8 : window.innerWidth / 2.5;
                    this.onCircleClick = function (id) {
                        _this.showActions = true;
                        //TODO: replace hardcoded 15 with id
                        _this._begrotingService.getActies(24)
                            .subscribe(function (acties) { return _this.acties = acties; }, function (err) { return _this.errorMessage = err; });
                    };
                    this.onResize = function (event) {
                        if (window.innerWidth < 768) {
                            _this.width = window.innerWidth * 0.8;
                        }
                        else {
                            _this.width = window.innerWidth / 2.5;
                        }
                        _this.windowWidth = window.innerWidth;
                        console.log(_this.windowWidth);
                    };
                    console.log(bestuurType_1.BestuurType[1]);
                    _townService.getTown(injector.parent.parent.get(router_1.RouteParams).get('town'))
                        .subscribe(function (town) {
                        _this.mainTown = town;
                        _this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') + ".png";
                    }, function (err) { return _this.errorMessage = err; });
                    _begrotingService.getGemeenteCategorieen(2020, "Gent")
                        .subscribe(function (finan) { return _this.categories = finan; }, function (err) { return _this.errorMessage = err; });
                }
                ExpensesComponent.prototype.ngOnInit = function () {
                    /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
                    EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
                    //this.name = this._routeParams.get('town');
                };
                ExpensesComponent.prototype.toggle = function () {
                    this.isVisable = !this.isVisable;
                };
                ExpensesComponent = __decorate([
                    core_1.Component({
                        selector: 'expenses-container',
                        template: "\n        <div class=\"container\">\n        <section class=\"intro col-xs-12\">\n            <h1>De uitgaven van {{mainTown?.naam}}</h1>\n            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>\n            <button *ngIf=\"windowWidth < 768\" type=\"button\" class=\"btn btn-primary pull-right\" data-toggle=\"modal\" data-target=\"#legend\">\n\t\t\t    Toon legende\n\t\t    </button>\n        <div class=\"main-content\">\n        <div class=\"graph col-xs-12 col-sm-8\" (window:resize)=\"onResize($event)\">\n           <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>\n           <div class=\"buttons\">\n           <button type=\"button\" class=\"btn btn-primary comparebtn\" [routerLink]=\"['Comparison']\">Vergelijk 2 gemeentes</button>\n           <button type=\"button\" class=\"btn btn-primary proposebtn\">Doe een voorstel</button>\n           <button type=\"button\" class=\"btn btn-primary salarybtn\" [routerLink]=\"['Taxes']\">Vergelijk met salaris</button>\n           <button type=\"button\" class=\"btn btn-primary propositionsbtn\">Begrotingsvoorstellen</button>\n           </div>\n        </div>\n        <div *ngIf=\"windowWidth > 768\" class=\"legend col-xs-12 col-sm-4 \">\n                <ul>\n                    <li *ngFor=\"#category of headCategories\">\n                        <span class=\"{{' colorblock glyphicon '+ category.icoon}}\" style=\"background-color: {{category.kleur}};\"></span>\n                        {{category.naam}}\n                        <!--<span class=\"{{'glyphicon '+ category.icoon}}\" style=\"color: {{category.kleur}};\"></span> -->\n                    </li>\n                    <li> <i>Beweeg over een categorie in de lijst om meer informatie te krijgen over de categorie </i></li>\n                </ul>\n        </div>\n\n\n        </div>\n\n  <!-- Modal Actions-->\n\n  <div class=\"modal right fade\" id=\"actions\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel2\">\n\t\t<div class=\"modal-dialog\" role=\"document\">\n\t\t\t<div class=\"modal-content\">\n\n\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t\t\t\t\t<h4 class=\"modal-title\" id=\"myModalLabel2\">Acties</h4>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t <table class=\"table table-striped\">\n            <tbody>\n            <tr *ngFor=\"#actie of acties\">\n                <td>{{actie.actieLang}}</td>\n                <td>\n                    <span class=\"glyphicon glyphicon-user\"></span>\n                    <span>{{types[3]}}</span>\n                </td>\n            </tr>\n            </tbody>\n        </table>\n\t\t\t\t</div>\n\n\t\t\t</div><!-- modal-content -->\n\t\t</div><!-- modal-dialog -->\n\t</div><!-- modal -->\n\n    <!-- Modal legend -->\n    <div class=\"modal left fade\" id=\"legend\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">\n\t\t<div class=\"modal-dialog\" role=\"document\">\n\t\t\t<div class=\"modal-content\">\n\n\t\t\t\t<div class=\"modal-header\">\n\t\t\t\t\t<button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t\t\t\t\t<h4 class=\"modal-title\" id=\"myModalLabel\">Legende</h4>\n\t\t\t\t</div>\n\n\t\t\t\t<div class=\"modal-body\">\n<ul>\n                    <li *ngFor=\"#category of headCategories\">\n                        <span class=\"{{' colorblock glyphicon '+ category.icoon}}\" style=\"background-color: {{category.kleur}};\"></span>\n                        {{category.naam}}\n                        <!--<span class=\"{{'glyphicon '+ category.icoon}}\" style=\"color: {{category.kleur}};\"></span> -->\n                    </li>\n                    <li> <i>TODO: Beweeg over een categorie in de lijst om meer informatie te krijgen over de categorie </i></li>\n                </ul>\n\t\t\t\t</div>\n\n\t\t\t</div><!-- modal-content -->\n\t\t</div><!-- modal-dialog -->\n\t</div><!-- modal -->\n\n        </section>\n       </div>\n",
                        directives: [townSelector_component_1.TownSelectorComponent, editableField_component_1.EditableFieldComponent, sunburst_component_1.SunburstComponent, router_1.ROUTER_DIRECTIVES],
                        providers: [begrotingService_1.BegrotingService,
                            townService_component_1.TownService,
                        ],
                        pipes: [keysPipe_1.KeysPipe],
                        styles: ["\n\n    .colorblock {\n        margin: 5px;\n        padding: 10px;\n        border-radius: 5px;\n    }\n\n    li {\n        list-style: none;\n        display: flex;\n        align-items: center;\n\n    }\n\n    li .glyphicon {\n        font-size: 1em;\n        color: white;\n    }\n\n    .buttons {\n        position: absolute;\n        top: 0;\n        left: 0;\n        display:flex;\n        flex-direction: column;\n    }\n    .buttons .btn {\n        margin-bottom: 5px;\n    }\n\n    .modal-header {\n        background-color: #2ac7d2;\n        color:white;\n    }\n    .legend {\n        border-left: 1px solid lightgray;\n        padding: 10px;\n    }\n\n    .main-content {\n        padding-top: 10px;\n        display: flex;\n        align-items: center;\n    }\n\n    .container {\n        max-width: 1200px;\n    }\n.modal.left .modal-dialog {\n\t\tposition: fixed;\n\t\tmargin: auto;\n\t\twidth: 50%;\n\t\tmargin-top:125px;\n\t\theight: 80%;\n\t\t-webkit-transform: translate3d(0%, 0, 0);\n\t\t    -ms-transform: translate3d(0%, 0, 0);\n\t\t     -o-transform: translate3d(0%, 0, 0);\n\t\t        transform: translate3d(0%, 0, 0);\n\t}\n\n\t.modal.right .modal-dialog {\n\t\tposition: fixed;\n\t\tmargin: auto;\n\t\twidth: 100%;\n\t\theight: 87%;\n\t\t-webkit-transform: translate3d(0%, 0, 0);\n\t\t    -ms-transform: translate3d(0%, 0, 0);\n\t\t     -o-transform: translate3d(0%, 0, 0);\n\t\t        transform: translate3d(0%, 0, 0);\n\t}\n\n\t.modal.left .modal-content,\n\t.modal.right .modal-content {\n\t\theight: 100%;\n\t\toverflow-y: auto;\n\t}\n\n\t.modal.left .modal-body,\n\t.modal.right .modal-body {\n\t\tpadding: 15px 15px 80px;\n\t}\n\n/*Left*/\n\t.modal.left.fade .modal-dialog{\n\t\tleft: -50%;\n\t\t-webkit-transition: opacity 0.3s linear, left 0.3s ease-out;\n\t\t   -moz-transition: opacity 0.3s linear, left 0.3s ease-out;\n\t\t     -o-transition: opacity 0.3s linear, left 0.3s ease-out;\n\t\t        transition: opacity 0.3s linear, left 0.3s ease-out;\n\t}\n\n\t.modal.left.fade.in .modal-dialog{\n\t\tleft: 0;\n\t}\n\n/*Right*/\n\t.modal.right.fade .modal-dialog {\n\t\tbottom: -50%;\n\t\t-webkit-transition: opacity 0.3s linear, bottom 0.3s ease-out;\n\t\t   -moz-transition: opacity 0.3s linear, bottom 0.3s ease-out;\n\t\t     -o-transition: opacity 0.3s linear, bottom 0.3s ease-out;\n\t\t        transition: opacity 0.3s linear, bottom 0.3s ease-out;\n\t}\n\n\t.modal.right.fade.in .modal-dialog {\n\t\tbottom: 0;\n\t}\n\n@media screen and (max-width: 480px) {\n   .modal.right.fade .modal-dialog {\n\t\tright: -100%;\n\t\t}\n\n\t\t\t.modal.left.fade .modal-dialog{\n\t\tleft: -100%;\n\t\t}\n\t\t.modal.left .modal-dialog,\n\t.modal.right .modal-dialog {\n\t\twidth: 100%;\n        }\n}\n"]
                    }), 
                    __metadata('design:paramtypes', [townService_component_1.TownService, begrotingService_1.BegrotingService, http_1.Http, router_1.RouteParams, core_1.Injector, router_1.Router])
                ], ExpensesComponent);
                return ExpensesComponent;
            })();
            exports_1("ExpensesComponent", ExpensesComponent);
        }
    }
});
//# sourceMappingURL=expenses.component.js.map