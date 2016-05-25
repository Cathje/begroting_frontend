System.register(['angular2/core', "../../subComponents/upload/multipart-item", "../../subComponents/upload/multipart-uploader", '../../../directives/styled', '../../../constants/icons'], function(exports_1, context_1) {
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
    var core_1, multipart_item_1, multipart_uploader_1, styled_1, icons_1;
    var GeneralSettingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (multipart_item_1_1) {
                multipart_item_1 = multipart_item_1_1;
            },
            function (multipart_uploader_1_1) {
                multipart_uploader_1 = multipart_uploader_1_1;
            },
            function (styled_1_1) {
                styled_1 = styled_1_1;
            },
            function (icons_1_1) {
                icons_1 = icons_1_1;
            }],
        execute: function() {
            GeneralSettingsComponent = (function () {
                function GeneralSettingsComponent() {
                    var _this = this;
                    this.icons = icons_1.ICONS;
                    this.gemeenteCategorieen = [{ kleur: "red", icoon: "glyphicon glyphicon-ok" }];
                    this._url = 'http://localhost:52597/api/Begroting';
                    this.uploader = new multipart_uploader_1.MultipartUploader({ url: this._url });
                    this.multipartItem = new multipart_item_1.MultipartItem(this.uploader);
                    this.onSelectIcon = function (event) {
                        _this.selectedIcon = event.target.className;
                    };
                    this.onShowIcons = function (event) {
                        console.log(event.target.value);
                    };
                    this.upload = function () {
                        if (null == _this.file) {
                            console.error("Geen file meegegeven");
                            return;
                        }
                        if (_this.multipartItem == null) {
                            _this.multipartItem = new multipart_item_1.MultipartItem(_this.uploader);
                        }
                        if (_this.multipartItem.formData == null)
                            _this.multipartItem.formData = new FormData();
                        _this.multipartItem.formData.append("file", _this.file);
                        _this.multipartItem.callback = _this.uploadCallback;
                        _this.multipartItem.upload();
                    };
                    this.uploadCallback = function (data) {
                        _this.file = null;
                        if (data) {
                            console.debug("File succesvol opgeladen.");
                        }
                        else {
                            console.error("Fout bij het uploaden van de file");
                        }
                    };
                }
                GeneralSettingsComponent.prototype.selectFile = function (event) {
                    this.file = event.target.files[0];
                    console.debug("Input File name: " + this.file.name + " type:" + this.file.size + " size:" + this.file.size);
                };
                GeneralSettingsComponent = __decorate([
                    core_1.Component({
                        selector: 'general-settings-container',
                        template: "\n    <div class=\"container\">\n        <h1>Algemene instellingen</h1>\n        <label>Voeg hieronder het bestand toe om de begroting op te laden.</label>\n        <input type=\"file\" (change)=\"selectFile($event)\" id=\"file\"/>\n        <button type=\"submit\" class=\"btn btn-primary  pull-right\" (click)=\"upload();\" styled>Submit</button>\n\n        <section class=\"col-xs-12 form-inline\">\n            <h3>Kleuren grafiek categorie\u00EBn</h3>\n            <table class=\"section-content table table-striped\" >\n            <thead>\n            <th>Naam categorie</th>\n            <th>Kleur</th>\n            <th>Icoon</th>\n            </thead>\n            <tbody>\n            <tr *ngFor=\"#gemeenteCat of gemeenteCategorieen\">\n                    <td>{{gemeenteCat.naam}}</td>\n                   <td><input class=\"form-control\" type=\"text\" [(ngModel)]=\"gemeenteCat.kleur\"/></td>\n                   <td> <span>{{gemeenteCat.icoon}}</span>\n                      <button class=\"btn btn-primary\" data-toggle=\"modal\" data-target=\"#icons\"  styled >\n                        <span class=\"glyphicon glyphicon-eye-open\"></span>\n                      </button>\n                      </td>\n\n                      </tr>\n                      </tbody>\n            </table>\n                <button class=\"btn btn-primary\" (click)=\"changeColor()\" styled >Opslaan</button>\n        </section>\n    </div>\n\n     <!-- Modal Icons-->\n        <div class=\"modal bottom fade\" id=\"icons\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"icons\">\n\t\t    <div class=\"modal-dialog\" role=\"document\">\n\t\t\t    <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n\t\t\t\t\t    <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;</span></button>\n\t\t\t\t\t    <h4 class=\"modal-title\" id=\"icons\">Iconen</h4>\n\t\t\t\t    </div>\n\t\t\t\t<div class=\"modal-body\">\n\t\t\t\t\t <div class=\"icons\" >\n\t\t\t\t\t    <span *ngFor=\"#icon of icons\" [class]=\"icon\" (click)=\"onSelectIcon($event)\" ></span>\n\t\t\t\t\t </div>\n\t\t\t\t</div>\n\t\t\t</div><!-- modal-content -->\n\t\t</div><!-- modal-dialog -->\n\t</div><!-- modal -->\n\n\n    ",
                        directives: [styled_1.StyledDirective],
                        styles: ["\n        ::-webkit-file-upload-button {\n            background: gray;\n            box-shadow: none;\n            border: none;\n            color:white;\n            border-radius: 5px;\n            padding: 5px;\n        }\n\n        input[type=file]{\n            padding: 5px;\n            height: 40px;\n        }\n\n        .icons span {\n            display: inline-block;\n            font-size: 2em;\n            padding: 5px;\n        }\n    "
                        ]
                    }), 
                    __metadata('design:paramtypes', [])
                ], GeneralSettingsComponent);
                return GeneralSettingsComponent;
            }());
            exports_1("GeneralSettingsComponent", GeneralSettingsComponent);
        }
    }
});
//# sourceMappingURL=generalSettings.component.js.map