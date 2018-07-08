import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import 'rxjs/add/operator/map';

/*
  Generated class for the ImagesProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ImagesProvider {

  apiURL = 'https://calm-mountain-43648.herokuapp.com/';

  constructor(public http: Http, private transfer: FileTransfer) { }

  getImages() {
    return this.http.get(this.apiURL + 'images').map(res => res.json());
  }

  deleteImage(img) {
    return this.http.delete(this.apiURL + 'images/' + img._id);
  }

  uploadImage(img, desc, hosID) {

    // Destination URL
    let url = this.apiURL + 'images';

    // File for Upload
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: { 
        'desc': desc, 
        'hosID': hosID
      }
    };

    const fileTransfer: FileTransferObject = this.transfer.create();

    // Use the FileTransfer to upload the image
    return fileTransfer.upload(targetPath, url, options);
  }


}
