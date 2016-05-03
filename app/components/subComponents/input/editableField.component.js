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
                ], EditableFieldComponent.prototype, "isEditable");
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], EditableFieldComponent.prototype, "data");
                EditableFieldComponent = __decorate([
                    core_1.Component({
                        selector: 'editable-field',
                        template: "\n                <div class=\"field\" [ngClass]=\"{active: !isEditable}\">\n                   {{data}}\n                </div>\n                <div class=\"field\" [ngClass]=\"{active: isEditable}\">\n                   <input type=\"number\"  [(ngModel)]=\"data\" step=\"any\" />\n                </div>\n    ",
                        styles: ["\n\n    .field {\n        font-size: 3em;\n        display:none;\n        text-align: center;\n        width: 100%;\n        color: lightgray;\n    }\n\n    .active {\n        display:block;\n    }\n\n      ",]
                    }), 
                    __metadata('design:paramtypes', [])
                ], EditableFieldComponent);
                return EditableFieldComponent;
            })();
            exports_1("EditableFieldComponent", EditableFieldComponent);
        }
    }
});
//# sourceMappingURL=editableField.component.js.map