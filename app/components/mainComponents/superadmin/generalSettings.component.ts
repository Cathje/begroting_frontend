import {Component} from 'angular2/core';
import {RouteParams} from 'angular2/router';
import {MultipartItem} from "../../subComponents/upload/multipart-item";
import {MultipartUploader} from "../../subComponents/upload/multipart-uploader";


@Component({ //invoke with metadata object
    selector: 'general-settings-container',
    template: `
    <div class="container">
    <h2>Algemene instellingen</h2>
        <label>Voeg hieronder het bestand toe om de begroting op te laden.</label>
        <input type="file" (change)="selectFile($event)" id="file"/>
        <button type="submit" class="btn btn-default" (click)="upload();">Submit</button>
    </div>
    `
})

export class GeneralSettingsComponent {

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

}