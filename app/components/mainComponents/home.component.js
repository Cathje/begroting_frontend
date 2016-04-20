System.register(['angular2/core', './../subComponents/input/townSelector.component', './../subComponents/information/projectOverview.component'], function(exports_1, context_1) {
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
    var core_1, townSelector_component_1, projectOverview_component_1;
    var HomeComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (townSelector_component_1_1) {
                townSelector_component_1 = townSelector_component_1_1;
            },
            function (projectOverview_component_1_1) {
                projectOverview_component_1 = projectOverview_component_1_1;
            }],
        execute: function() {
            HomeComponent = (function () {
                function HomeComponent() {
                    this.title = 'Home';
                }
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'home-container',
                        template: "\n    <div class=\"home-container\">\n    <h3>Kies een gemeente:</h3>\n       <town-selector></town-selector>\n\n     <video width=\"100%\" autoplay=\"autoplay\" loop>\n            <source src=\"./app/images/Big_City-Life.mp4\" type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"'>\n            <source src=\"./app/images/Big-City-Life.ogv\" type='video/ogg; codecs=\"theora, vorbis\"'>\n            Jouw browser ondersteunt geen video's.\n        </video>\n\n    </div>\n    <div class=\"site-information-container\">\n        <h2> Ontdek de openstaande projecten van jouw favoriete gemeente en participeer!</h2>\n    </div>\n    <div class=\"projects-container\">\n        <project-overview></project-overview>\n    </div>\n\n    ",
                        directives: [townSelector_component_1.TownSelectorComponent, projectOverview_component_1.ProjectOverviewComponent]
                    }), 
                    __metadata('design:paramtypes', [])
                ], HomeComponent);
                return HomeComponent;
            }());
            exports_1("HomeComponent", HomeComponent);
        }
    }
});
//# sourceMappingURL=home.component.js.map