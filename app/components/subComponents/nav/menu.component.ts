import {Component, Input, OnInit} from 'angular2/core';
import { RouteParams } from 'angular2/router';
import { ROUTER_DIRECTIVES } from 'angular2/router';
import {TownSelectorComponent} from '../input/townSelector.component';
import {StyledDirective} from '../../../directives/styled';

@Component({
    selector: 'navigation-menu',
    template: `
        <nav class="navbar navbar-default" styled>
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" [routerLink]="['/','Default']"><span class="glyphicon glyphicon-home"></span></a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav" styled>
        <li class="dropdown" styled>
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" styled>Begroting<span class="caret" ></span></a>
          <ul class="dropdown-menu" styled>
            <li><a [routerLink]="['Budget', 'Overview']">Dashboard</a></li>
            <li><a [routerLink]="['Budget', 'Income']">Inkomsten</a></li>
            <li><a [routerLink]="['Budget',  'Expenses']">Uitgaven</a></li>
            <li><a [routerLink]="['Budget', 'CoreData']">Kerngegevens</a></li>
            <li><a [routerLink]="['Budget', 'Taxes']">Mijn belastingen</a></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" styled>Participeren<span class="caret" ></span></a>
          <ul class="dropdown-menu" styled>
            <li><a [routerLink]="['Participation', 'Projects']">Begrotingsposten</a></li>
            <li><a [routerLink]="['Participation', 'Propositions']">Burgervoorstellen</a></li>
            <li><a [routerLink]="['Participation', 'AddPropositions']">Voorstel indienen</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" styled>Settings<span class="caret"></span></a>
          <ul class="dropdown-menu" styled>
            <li><a [routerLink]="['Settings', 'GeneralSettings']">Algemene instellingen</a></li>
            <li><a [routerLink]="['Settings', 'ManageTown']">Instellingen gemeente</a></li>
            <li><a [routerLink]="['Settings', 'ManageCategories']">Instellingen categorieën</a></li>
            <li><a [routerLink]="['Settings', 'ManageUsers']">Beheer gebruikers</a></li>
            <li><a [routerLink]="['Settings',   'ManageData']">Beheer kerngegevens</a></li>
            <li><a [routerLink]="['Settings', 'ManageProject']">Beheer projecten</a></li>
            <li><a [routerLink]="['Settings', 'OverviewPropositions']">Beheer voorstellen</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" styled>Algemeen<span class="caret"></span></a>
          <ul class="dropdown-menu" styled>
            <li><a [routerLink]="['General', 'UserSettings']">Account settings</a></li>
            <li><a [routerLink]="['General', 'AboutUs']">Over ons</a></li>
            <li><a [routerLink]="['General', 'Privacy']">Privacy</a></li>
            <li><a [routerLink]="['General', 'Faq']">FAQ</a></li>
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
    .navbar {
        margin-bottom: 0;
        border: none;
    }

    .navbar-default {
    padding: 5px;
    background-color: #2ac7d2;
    }

    .navbar-right {
    padding: 10px 0;
    }

    .navbar-default .navbar-toggle .icon-bar{
    background-color:white;
    }

    .dropdown-menu {
        background-color: #2ac7d2;
    }

    .nav .open > a, .nav .open > a:hover, .nav .open > a:focus {
            background-color: #2ac7d2;
    }

    .dropdown-menu > li > a:hover {
                opacity: 1;
                background-color:#2ac7af;
    }

      `,],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent, StyledDirective],

})

export class NavigationMenuComponent{

    townString:string = "Gent";

}