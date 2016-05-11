System.register(['angular2/core'], function(exports_1, context_1) {
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
    var core_1;
    var EditableFieldComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            EditableFieldComponent = (function () {
                function EditableFieldComponent() {
                }
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Boolean)
                ], EditableFieldComponent.prototype, "isEditable", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], EditableFieldComponent.prototype, "data", void 0);
                EditableFieldComponent = __decorate([
                    core_1.Component({
                        selector: 'editable-field',
                        template: "\n                <div class=\"field\" [ngClass]=\"{active: !isEditable}\">\n                   {{data}}\n                </div>\n                <div class=\"field\" [ngClass]=\"{active: isEditable}\">\n                   <input type=\"number\"  [(ngModel)]=\"data\" step=\"any\" />\n                </div>\n    ",
                        styles: ["\n\n    .field {\n        font-size: 3em;\n        display:none;\n        text-align: center;\n        width: 100%;\n        color: lightgray;\n    }\n\n    .active {\n        display:block;\n    }\n\n      ",]
                    }), 
                    __metadata('design:paramtypes', [])
                ], EditableFieldComponent);
                return EditableFieldComponent;
            }());
            exports_1("EditableFieldComponent", EditableFieldComponent);
        }
    }
});
//# sourceMappingURL=editableField.component.js.map