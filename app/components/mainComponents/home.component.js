System.register(['angular2/core', "../subComponents/input/townSelector.component", "../subComponents/information/projectOverview.component"], function(exports_1, context_1) {
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
                }
                HomeComponent = __decorate([
                    core_1.Component({
                        selector: 'home-container',
                        template: "\n    <div class=\"banner-container\">\n        <div class=\"select-container\">\n            <h3>Kies een gemeente:</h3>\n            <town-selector></town-selector>\n        </div>\n\n        <video width=\"100%\" autoplay=\"autoplay\" loop>\n            <source src=\"/app/images/Big-City-Life.mp4\" type='video/mp4; codecs=\"avc1.42E01E, mp4a.40.2\"'>\n            <source src=\"/app/images/Big-City-Life.ogv\" type='video/ogg; codecs=\"theora, vorbis\"'>\n            Jouw browser ondersteunt geen video's.\n        </video>\n    </div>\n\n    <div class=\"site-information-container\">\n        <h2> Ontdek de openstaande projecten van jouw favoriete gemeente en participeer!</h2>\n        <p>Het doel van dit platform is om de begrotingen en de uitgaven van Vlaamse steden en gemeenten transparant en begrijpelijk te maken voor de burgers en om\nburgervoorstellen over de begroting te verzamelen en te communiceren met de bevoegde instanties binnen de steden en gemeenten.\n        </p>\n    </div>\n\n    <project-overview></project-overview>\n    ",
                        directives: [townSelector_component_1.TownSelectorComponent, projectOverview_component_1.ProjectOverviewComponent],
                        styles: ["\n\n    h2 {\n        color:white;\n    }\n\n    .select-container{\n        position:absolute;\n        top: 35%;\n        left: 0;\n        right: 0;\n        z-index: 5;\n    }\n\n    .banner-container {\n        position:relative;\n        max-height: 400px;\n        overflow: hidden;\n        width:100%\n    }\n\n    .banner-container h3 {\n        text-align: center;\n        color:white;\n    }\n\n    .site-information-container {\n        padding: 20px;\n        text-align: center;\n        background-color:#2ac7d2;\n        color:white;\n    }\n\n    .site-information-container h2 {\n        font-weight: 300;\n        padding: 20px 40px ;\n    }\n\n    .site-information-container p {\n        margin: 0;\n        padding: 0px 40px;\n    }\n\n    video {\n        display: block !important;\n        width: 120%;\n        top: 0;\n        z-index:0;\n    }\n    "]
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