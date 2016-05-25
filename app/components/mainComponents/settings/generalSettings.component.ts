import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {MultipartItem} from "../../subComponents/upload/multipart-item";
import {MultipartUploader} from "../../subComponents/upload/multipart-uploader";
import {StyledDirective} from '../../../directives/styled';
import {GemeenteCategorie} from "../../../models/gemeenteCategorie";
import {ICONS} from '../../../constants/icons'

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
            <table class="section-content table table-striped" >
            <thead>
            <th>Naam categorie</th>
            <th>Kleur</th>
            <th>Icoon</th>
            </thead>
            <tbody>
            <tr *ngFor="#gemeenteCat of gemeenteCategorieen">
                    <td>{{gemeenteCat.naam}}</td>
                   <td><input class="form-control" type="text" [(ngModel)]="gemeenteCat.kleur"/></td>
                   <td> <span>{{gemeenteCat.icoon}}</span>
                      <button class="btn btn-primary" data-toggle="modal" data-target="#icons"  styled >
                        <span class="glyphicon glyphicon-eye-open"></span>
                      </button>
                      </td>

                      </tr>
                      </tbody>
            </table>
                <button class="btn btn-primary" (click)="changeColor()" styled >Opslaan</button>
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
					 <div class="icons" >
					    <span *ngFor="#icon of icons" [class]="icon" (click)="onSelectIcon($event)" ></span>
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
            font-size: 2em;
            padding: 5px;
        }
    `
    ]
    })

export class GeneralSettingsComponent {

    icons: string[] = ICONS;
    selectedIcon: string;
    gemeenteCategorieen: GemeenteCategorie[] = [{kleur : "red", icoon: "glyphicon glyphicon-ok"}];
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
        this.selectedIcon = event.target.className;
    }

    onShowIcons = (event:any) => {
        console.log(event.target.value)
    }

}