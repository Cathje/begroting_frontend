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
      <a class="navbar-brand" [routerLink]="['Home']"><span class="glyphicon glyphicon-home"></span></a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav" styled>
        <li class="dropdown" styled>
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" styled>Begroting<span class="caret" ></span></a>
          <ul class="dropdown-menu" styled>
            <li><a [routerLink]="['Budget', {town: townString}, 'Overview']">Dashboard</a></li>
            <li><a [routerLink]="['Budget', {town: townString}, 'Income']">Inkomsten</a></li>
            <li><a [routerLink]="['Budget', {town: townString}, 'Expenses']">Uitgaven</a></li>
            <li><a [routerLink]="['Budget', {town: townString}, 'CoreData']">Kerngegevens</a></li>
            <li><a [routerLink]="['Budget', {town: townString}, 'Taxes']">Mijn belastingen</a></li>
          </ul>
        </li>

        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" styled>Participeren<span class="caret" ></span></a>
          <ul class="dropdown-menu" styled>
            <li><a [routerLink]="['Participation', {town: townString}, 'Projects']">Begrotingsposten</a></li>
            <li><a [routerLink]="['Participation', {town: townString}, 'Propositions']">Burgervoorstellen</a></li>
            <li><a [routerLink]="['Participation', {town: townString}, 'AddPropositions']">Voorstel indienen</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" styled>Admin<span class="caret"></span></a>
          <ul class="dropdown-menu" styled>
            <li><a [routerLink]="['Admin', {town: townString}, 'ManageData']">Beheer kerngegevens</a></li>
            <li><a [routerLink]="['Admin', {town: townString}, 'ManageTown']">Instellingen gemeente</a></li>
            <li><a [routerLink]="['Admin', {town: townString}, 'ManageProject']">Beheer projecten</a></li>
            <li><a [routerLink]="['Admin', {town: townString}, 'ManageUsers']">Gebruikers beheren</a></li>
          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" styled>Moderator<span class="caret"></span></a>
          <ul class="dropdown-menu" styled>
            <li><a [routerLink]="['Moderator', {town: townString}, 'OverviewUsers']">Overzicht gebruikers</a></li>
            <li><a [routerLink]="['Moderator', {town: townString}, 'OverviewPropositions']">Overzicht voorstellen</a></li>

          </ul>
        </li>
        <li class="dropdown">
          <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false" styled>SuperAdmin<span class="caret"></span></a>
          <ul class="dropdown-menu" styled>
            <li><a [routerLink]="['SuperAdmin', {town: townString}, 'GeneralSettings']">Algemene instellingen</a></li>
            <li><a [routerLink]="['SuperAdmin', {town: townString}, 'ManageUsers']">Gebruikers beheren</a></li>
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
                opacity: 0.9;
    }

      `,],
    directives: [ROUTER_DIRECTIVES, TownSelectorComponent, StyledDirective],

})

export class NavigationMenuComponent{

    townString:string = "Gent";

}