import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload-logs',
  templateUrl: './upload-logs.component.html',
  styleUrls: ['./upload-logs.component.css']
})


export class UploadFileComponent{

  files: any = [];

  uploadFile(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name)
    }  
  }
  deleteAttachment(index) {
    this.files.splice(index, 1)
  }
}

