import {Component, Input, OnInit} from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router'; // for routing
import {TownSelectorComponent} from '../input/townSelector.component.js';

@Component({ //invoke with metadata object
    selector: 'navigation-menu',
    template: `
        <nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" [routerLink]="['Home']">Home</a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Begroting<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a [routerLink]="['Budget', {town: 'Berchem'}, 'Overview']">Begrotingsvoorstel</a></li>
            <li><a [routerLink]="['Budget', {town: 'Berchem'}, 'Expenses']">Uitgaven</a></li>
            <li><a [routerLink]="['Budget', {town: 'Berchem'}, 'Taxes']">Mijn belastingen</a></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Participeren<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Begrotingsposten</a></li>
            <li><a href="#">Burgervoorstellen</a></li>
            <li><a href="#">Voorstel indienen</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Admin<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a [routerLink]="['Admin', {town: 'Berchem'}, 'Admin']">Beheer kerngegevens</a></li>
            <li><a href="#">Informatie toevoegen</a></li>
            <li><a href="#">Instellingen gemeente</a></li>
            <li><a [routerLink]="['Admin', {town: 'Berchem'}, 'ManageProject']">Beheer projecten</a></li>
            <li><a href="#">Andere optie</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">SuperAdmin<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <li><a href="#">Algemene instellingen</a></li>
            <li><a href="#">Admin aanmaken</a></li>
          </ul>
        </li>
      </ul>
      <ul class="nav navbar-nav navbar-right">
        <li><town-selector></town-selector></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>

    `,
    styles:[`
    .navbar-default {
    padding: 5px;
    background-color: #2ac7d2;
    }

    .navbar-right {
    padding: 10px 0;
    }

    .dropdown-menu {
        background-color: #2ac7d2;
    }

    .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {
            background-color: #2ac7d2;
    }

    .dropdown-menu > li > a:hover {
                background-color: #8ec7ca;
    }

      `,],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent],

})

export class NavigationMenuComponent{

}