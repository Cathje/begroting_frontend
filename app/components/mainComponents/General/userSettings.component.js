System.register(['angular2/core'], function(exports_1) {
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
    var UserSettingsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            UserSettingsComponent = (function () {
                function UserSettingsComponent() {
                }
                UserSettingsComponent = __decorate([
                    core_1.Component({
                        selector: 'overview-container',
                        template: "\n        <div class=\"overview-container\">\n            <div class=\"container\">\n            <h1>Hoe pas ik mijn account gegevens aan?</h1>\n                <p>\n                Stuur een mailtje naar info@debegroting.be met de vermelding van je probleem.\n                </p>\n            </div>\n    </div>\n",
                        directives: [],
                        providers: [],
                        styles: ["\n\n"]
                    }), 
                    __metadata('design:paramtypes', [])
                ], UserSettingsComponent);
                return UserSettingsComponent;
            })();
            exports_1("UserSettingsComponent", UserSettingsComponent);
        }
    }
});
//# sourceMappingURL=userSettings.component.js.map