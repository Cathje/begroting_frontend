import {Component, Injector, ElementRef, Inject} from 'angular2/core';
import {TownService} from './../../../services/townService.component';
import {Http} from 'angular2/http';
import {ROUTER_DIRECTIVES, Router, RouteParams, RouteConfig} from 'angular2/router';
import {TownSelectorComponent} from './../../subComponents/input/townSelector.component';
import {EditableFieldComponent} from './../../subComponents/input/editableField.component';
import {MainTown} from "../../../models/mainTown";
import {SunburstComponent} from './../../subComponents/graphs/sunburst.component';
import {BegrotingService} from "../../../services/begrotingService";
import {Actie} from "../../../models/actie";
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";
import {Categorie} from "../../../models/categorie";
import {categories} from "../../../mockData/mock-categories";
import {BestuurType} from "../../../models/bestuurType";
import {KeysPipe} from "../../../pipes/keysPipe";


@Component({ //invoke with metadata object
    selector: 'expenses-container',
    template: `
        <div class="container">
        <section class="intro col-xs-12">
            <h1>De uitgaven van {{mainTown?.naam}}</h1>
            <p>Hier komt een paragraaf.Similiquecilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et</p>
            <button *ngIf="windowWidth < 768" type="button" class="btn btn-primary pull-right" data-toggle="modal" data-target="#legend">
			    Toon legende
		    </button>
        <div class="main-content">
        <div class="graph col-xs-12 col-sm-8" (window:resize)="onResize($event)">
           <sunburst [data]=categories [onClick]=onCircleClick [height]=width [width]=width></sunburst>
           <div class="buttons">
           <button type="button" class="btn btn-primary comparebtn" [routerLink]="['Comparison']">Vergelijk 2 gemeentes</button>
           <button type="button" class="btn btn-primary proposebtn">Doe een voorstel</button>
           <button type="button" class="btn btn-primary salarybtn" [routerLink]="['Taxes']">Vergelijk met salaris</button>
           <button type="button" class="btn btn-primary propositionsbtn">Begrotingsvoorstellen</button>
           </div>
        </div>
        <div *ngIf="windowWidth > 768" class="legend col-xs-12 col-sm-4 ">
                <ul>
                    <li *ngFor="#category of headCategories">
                        <span class="{{' colorblock glyphicon '+ category.icoon}}" style="background-color: {{category.kleur}};"></span>
                        {{category.naam}}
                        <!--<span class="{{'glyphicon '+ category.icoon}}" style="color: {{category.kleur}};"></span> -->
                    </li>
                    <li> <i>Beweeg over een categorie in de lijst om meer informatie te krijgen over de categorie </i></li>
                </ul>
        </div>


        </div>

  <!-- Modal Actions-->

  <div class="modal right fade" id="actions" tabindex="-1" role="dialog" aria-labelledby="myModalLabel2">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel2">Acties</h4>
				</div>

				<div class="modal-body">
					 <table class="table table-striped">
            <tbody>
            <tr *ngFor="#actie of acties">
                <td>{{actie.actieLang}}</td>
                <td>
                    <span class="glyphicon glyphicon-user"></span>
                    <span>{{types[3]}}</span>
                </td>
            </tr>
            </tbody>
        </table>
				</div>

			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->

    <!-- Modal legend -->
    <div class="modal left fade" id="legend" tabindex="-1" role="dialog" aria-labelledby="myModalLabel">
		<div class="modal-dialog" role="document">
			<div class="modal-content">

				<div class="modal-header">
					<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					<h4 class="modal-title" id="myModalLabel">Legende</h4>
				</div>

				<div class="modal-body">
<ul>
                    <li *ngFor="#category of headCategories">
                        <span class="{{' colorblock glyphicon '+ category.icoon}}" style="background-color: {{category.kleur}};"></span>
                        {{category.naam}}
                        <!--<span class="{{'glyphicon '+ category.icoon}}" style="color: {{category.kleur}};"></span> -->
                    </li>
                    <li> <i>TODO: Beweeg over een categorie in de lijst om meer informatie te krijgen over de categorie </i></li>
                </ul>
				</div>

			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->

        </section>
       </div>
`,
    directives: [TownSelectorComponent, EditableFieldComponent, SunburstComponent,ROUTER_DIRECTIVES],
    providers: [ BegrotingService,
        TownService,  //routing
    ],
    pipes: [KeysPipe],
    styles: [`

    .colorblock {
        margin: 5px;
        padding: 10px;
        border-radius: 5px;
    }

    li {
        list-style: none;
        display: flex;
        align-items: center;

    }

    li .glyphicon {
        font-size: 1em;
        color: white;
    }

    .buttons {
        position: absolute;
        top: 0;
        left: 0;
        display:flex;
        flex-direction: column;
    }
    .buttons .btn {
        margin-bottom: 5px;
    }

    .modal-header {
        background-color: #2ac7d2;
        color:white;
    }
    .legend {
        border-left: 1px solid lightgray;
        padding: 10px;
    }

    .main-content {
        padding-top: 10px;
        display: flex;
        align-items: center;
    }

    .container {
        max-width: 1200px;
    }
.modal.left .modal-dialog,
	.modal.right .modal-dialog {
		position: fixed;
		margin: auto;
		width: 50%;
		height: 100%;
		-webkit-transform: translate3d(0%, 0, 0);
		    -ms-transform: translate3d(0%, 0, 0);
		     -o-transform: translate3d(0%, 0, 0);
		        transform: translate3d(0%, 0, 0);
	}

	.modal.left .modal-content,
	.modal.right .modal-content {
		height: 100%;
		overflow-y: auto;
	}

	.modal.left .modal-body,
	.modal.right .modal-body {
		padding: 15px 15px 80px;
	}

/*Left*/
	.modal.left.fade .modal-dialog{
		left: -50%;
		-webkit-transition: opacity 0.3s linear, left 0.3s ease-out;
		   -moz-transition: opacity 0.3s linear, left 0.3s ease-out;
		     -o-transition: opacity 0.3s linear, left 0.3s ease-out;
		        transition: opacity 0.3s linear, left 0.3s ease-out;
	}

	.modal.left.fade.in .modal-dialog{
		left: 0;
	}

/*Right*/
	.modal.right.fade .modal-dialog {
		right: -50%;
		-webkit-transition: opacity 0.3s linear, right 0.3s ease-out;
		   -moz-transition: opacity 0.3s linear, right 0.3s ease-out;
		     -o-transition: opacity 0.3s linear, right 0.3s ease-out;
		        transition: opacity 0.3s linear, right 0.3s ease-out;
	}

	.modal.right.fade.in .modal-dialog {
		right: 0;
	}

@media screen and (max-width: 480px) {
   .modal.right.fade .modal-dialog {
		right: -100%;
		}

			.modal.left.fade .modal-dialog{
		left: -100%;
		}
		.modal.left .modal-dialog,
	.modal.right .modal-dialog {
		width: 100%;
        }
}
`]
})

export class ExpensesComponent {
    title = 'Gemeente - home';
    imglink: string = "";
    name:string = "";
    mainTown = new MainTown("","",0,0);  //opm: moet geïnitialiseerd zijn, anders werkt ngModel niet
    isVisable = false;
    contentbutton="meer info";
    acties: Actie[];
    showActions = false;
    id:number;
    errorMessage:any;
    isEditor: boolean = false; //TODO: adapt value when signed in with special role
    categories: GemeenteCategorie [] = [];
    headCategories: Categorie [] = categories;
    types = BestuurType;
    windowWidth = window.innerWidth;

    width: number = window.innerWidth < 768 ? window.innerWidth*0.8 : window.innerWidth/2.5;

    onCircleClick: any = (id: number) => {

        this.showActions = true;
        //TODO: replace hardcoded 15 with id

       this._begrotingService.getActies(24)
           .subscribe((acties : any) => this.acties = acties,
               (err:any) => this.errorMessage = err);


    };

    constructor (private _townService:TownService, private _begrotingService:BegrotingService, public http: Http, params: RouteParams, injector: Injector, private _router: Router)
    {
        console.log(BestuurType[1]);
        _townService.getTown(injector.parent.parent.get(RouteParams).get('town'))
            .subscribe((town:any) => {
                this.mainTown = town;
                this.imglink = "/app/images/provincies/" + town.provincie.toLowerCase().split(' ').join('') +".png";
                },
                (err:any) => this.errorMessage = err
             );

        _begrotingService.getGemeenteCategorieen(2020,"Gent")

           .subscribe((finan: any) => this.categories = finan,
               (err:any) => this.errorMessage = err
            );

    }


    ngOnInit() {
        /* @TODO CATHERINE INDIEN BACKEND BIJ JOUW NIET WERKT DEZE CALL UIT COMMENTAAR ZETTEN
        EN DE SERVICE  en aside met naam town-info VAN HIERBOVEN IN COMMENTAAR ZETTEN*/
        //this.name = this._routeParams.get('town');
    }


    public toggle(): void
    {
        this.isVisable = !this.isVisable;
    }


    onResize = (event: any) => {
        if(window.innerWidth < 768){
            this.width = window.innerWidth*0.8;

        }else {
            this.width = window.innerWidth/2.5;

        }
        this.windowWidth = window.innerWidth;
        console.log(this.windowWidth);
    }

}

