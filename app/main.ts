import {Component, provide} from 'angular2/core';
import {bootstrap}    from 'angular2/platform/browser'
import {AppComponent} from './app.component'
import {HTTP_PROVIDERS} from "angular2/http";

import {
    APP_BASE_HREF,
    ROUTER_DIRECTIVES,
    ROUTER_PROVIDERS,
    RouteConfig,
    ROUTER_PRIMARY_COMPONENT,
} from "angular2/router";


bootstrap(AppComponent,
    [    ROUTER_PROVIDERS,
        provide(APP_BASE_HREF,            {useValue: "/"}),
    ]);