import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {MultipartItem} from "../../subComponents/upload/multipart-item";
import {MultipartUploader} from "../../subComponents/upload/multipart-uploader";
import {StyledDirective} from '../../../directives/styled';
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";


@Component({ //invoke with metadata object
    selector: 'general-settings-container',
    template: `
    <div class="container">
        <h1>Algemene instellingen</h1>
        <label>Voeg hieronder het bestand toe om de begroting op te laden.</label>
        <input type="file" (change)="selectFile($event)" id="file"/>
        <button type="submit" class="btn btn-primary  pull-right" (click)="upload();" styled>Submit</button>

        <section class="col-xs-12 form-inline">
            <h3>Kleuren grafiek categorieën</h3>
            <div class="section-content" *ngFor="#gemeenteCat of gemeenteCategorieen">
                <div class="col-xs-12 form-group">
                    <label >Kleur</label>
                    <input class="form-control" type="text" [(ngModel)]="gemeenteCat.kleur"/>
                </div>
                <div class="col-xs-12 form-group">
                    <label >Icoon</label>
                    <span [class]="gemeenteCat.icoon"></span>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#icons"  styled ><span class="glyphicon glyphicon-eye-open"></span></button>
                </div>
                <button class="btn btn-primary" (click)="changeColor()" styled >Opslaan</button>
            </div>
        </section>
    </div>

     <!-- Modal Icons-->
        <div class="modal bottom fade" id="icons" tabindex="-1" role="dialog" aria-labelledby="icons">
		    <div class="modal-dialog" role="document">
			    <div class="modal-content">
                    <div class="modal-header">
					    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
					    <h4 class="modal-title" id="icons">Iconen</h4>
				    </div>
				<div class="modal-body">
					 <div class="icons">
					 <span class="glyphicon glyphicon-adjust" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-adjust" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-alert" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-align-center" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-apple" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-arrow-down" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-asterisk" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-baby-formula" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-barcode" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-blackboard" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-book" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-briefcase" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-bullhorn" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-camera" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-copyright-mark" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-credit-card" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-dashboard" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-edit" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-file" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-fire" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-glass" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-globe" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-hand-up" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-hand-down" (click)="onSelectIcon($event)" ></span>
					 <span class="glyphicon glyphicon-ice-lolly" (click)="onSelectIcon($event)" ></span>
					 </div>
				</div>
			</div><!-- modal-content -->
		</div><!-- modal-dialog -->
	</div><!-- modal -->


    `,
    directives: [StyledDirective],
    styles: [`
        ::-webkit-file-upload-button {
            background: gray;
            box-shadow: none;
            border: none;
            color:white;
            border-radius: 5px;
            padding: 5px;
        }

        input[type=file]{
            padding: 5px;
            height: 40px;
        }

        .icons span {
            display: inline-block;
        }
    `
    ]
    })

export class GeneralSettingsComponent {

    gemeenteCategorieen: GemeenteCategorie[] = [{kleur : "red", icon: "glyphicon glyphicon-ok"}];
    private _url = 'http://localhost:52597/api/Begroting';

    private uploader:MultipartUploader = new MultipartUploader({url: this._url});

    multipartItem:MultipartItem = new MultipartItem(this.uploader);

    file:File;
    upload: () => void;
    uploadCallback : (data : any) => void;

    constructor(){
            this.upload = () => {
                if (null == this.file){
                    console.error("Geen file meegegeven");
                    return;
                }
                if (this.multipartItem == null){
                    this.multipartItem = new MultipartItem(this.uploader);
                }
                if (this.multipartItem.formData == null)
                    this.multipartItem.formData = new FormData();

                this.multipartItem.formData.append("file",  this.file);

                this.multipartItem.callback = this.uploadCallback;
            this.multipartItem.upload();
        }

        this.uploadCallback = (data) => {
            this.file = null;
            if (data){
                console.debug("File succesvol opgeladen.");
            }else{
                console.error("Fout bij het uploaden van de file");
            }
        }


    }


    selectFile(event : any)
    {
        this.file = event.target.files[0];
        console.debug("Input File name: " + this.file.name + " type:" + this.file.size + " size:" + this.file.size);
    }

    onSelectIcon = (event:any) => {
        console.log(event.target.value)
    }

    onShowIcons = (event:any) => {
        console.log(event.target.value)
    }

}