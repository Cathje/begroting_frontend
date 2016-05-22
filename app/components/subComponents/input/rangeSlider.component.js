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
    var rangeSlider;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            }],
        execute: function() {
            rangeSlider = (function () {
                function rangeSlider() {
                    this.dataChange = new core_1.EventEmitter();
                    this.changes = new core_1.EventEmitter();
                }
                rangeSlider.prototype.datChange = function (newValue) {
                    this.data = newValue;
                    this.dataChange.emit(this.data);
                };
                rangeSlider.prototype.emitEvent = function () {
                    this.changes.emit(false);
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], rangeSlider.prototype, "name", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', String)
                ], rangeSlider.prototype, "id", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], rangeSlider.prototype, "data", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], rangeSlider.prototype, "min", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], rangeSlider.prototype, "max", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], rangeSlider.prototype, "value", void 0);
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Number)
                ], rangeSlider.prototype, "step", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], rangeSlider.prototype, "dataChange", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], rangeSlider.prototype, "changes", void 0);
                rangeSlider = __decorate([
                    core_1.Component({
                        selector: 'slider',
                        template: "\n                <!--TODO: via NGIF disabled property toevoegen als input bool isDisabled==true-->\n                <input type=\"range\" name=\"slide\" id=\"speedSlider\" [(ngModel)]=\"data\" (ngModelChange)=\"datChange($event)\" min=\"1500\" max=\"15000\" value=\"2000\" step=\"50\" (change)=\"emitEvent()\"/>\n    ",
                        styles: ["\n\n/*#speedSlider {\n   width: 70%;\n   margin-top: 1em;\n   margin-bottom: 3em;\n   !*margin-right: 10em;*!\n   !*!/text-align: center;*!\n   }*/\n\n    /*Range CSS*/\ninput[type=range] {\n  -webkit-appearance: none;\n  width: 100%;\n  margin: 5.3px 0;\n}\ninput[type=range]:focus {\n  outline: none;\n}\ninput[type=range]::-webkit-slider-runnable-track {\n  width: 100%;\n  height: 8.4px;\n  cursor: pointer;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n  background: #2ac7d2;\n  border-radius: 17.1px;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n}\ninput[type=range]::-webkit-slider-thumb {\n  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;\n  border: 1px solid #3d0000;\n  height: 19px;\n  width: 41px;\n  border-radius: 44px;\n  background: rgba(36, 37, 40, 0.88);\n  cursor: pointer;\n  -webkit-appearance: none;\n  margin-top: -7.9px;\n}\ninput[type=range]:focus::-webkit-slider-runnable-track {\n  background: #97e5ea;\n}\ninput[type=range]::-moz-range-track {\n  width: 100%;\n  height: 8.4px;\n  cursor: pointer;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n  background: #2ac7d2;\n  border-radius: 17.1px;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n}\ninput[type=range]::-moz-range-thumb {\n  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;\n  border: 1px solid #3d0000;\n  height: 19px;\n  width: 41px;\n  border-radius: 44px;\n  background: rgba(36, 37, 40, 0.88);\n  cursor: pointer;\n}\ninput[type=range]::-ms-track {\n  width: 100%;\n  height: 8.4px;\n  cursor: pointer;\n  background: transparent;\n  border-color: transparent;\n  color: transparent;\n}\ninput[type=range]::-ms-fill-lower {\n  background: #145e63;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n  border-radius: 34.2px;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n}\ninput[type=range]::-ms-fill-upper {\n  background: #2ac7d2;\n  border: 2.6px solid rgba(133, 148, 132, 0.36);\n  border-radius: 34.2px;\n  box-shadow: 1px 1px 1px rgba(84, 142, 87, 0.29), 0px 0px 1px rgba(93, 158, 97, 0.29);\n}\ninput[type=range]::-ms-thumb {\n  box-shadow: 1px 1px 1px #6c8f7e, 0px 0px 1px #7a9b8b;\n  border: 1px solid #3d0000;\n  height: 19px;\n  width: 41px;\n  border-radius: 44px;\n  background: rgba(36, 37, 40, 0.88);\n  cursor: pointer;\n  height: 8.4px;\n}\ninput[type=range]:focus::-ms-fill-lower {\n  background: #2ac7d2;\n}\ninput[type=range]:focus::-ms-fill-upper {\n  background: #97e5ea;\n}\n/*End Range CSS*/\n\n      ",]
                    }), 
                    __metadata('design:paramtypes', [])
                ], rangeSlider);
                return rangeSlider;
            }());
            exports_1("rangeSlider", rangeSlider);
        }
    }
});
//# sourceMappingURL=rangeSlider.component.js.map