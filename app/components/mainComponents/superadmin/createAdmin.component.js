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
    var CreateAdminComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            CreateAdminComponent = (function () {
                function CreateAdminComponent() {
                }
                CreateAdminComponent = __decorate([
                    core_1.Component({
                        selector: 'create-admin-container',
                        template: "\n    <div class=\"container\">\n    <h2>Maak admin aan </h2>\n    </div>\n    "
                    }), 
                    __metadata('design:paramtypes', [])
                ], CreateAdminComponent);
                return CreateAdminComponent;
            })();
            exports_1("CreateAdminComponent", CreateAdminComponent);
        }
    }
});
//# sourceMappingURL=createAdmin.component.js.map