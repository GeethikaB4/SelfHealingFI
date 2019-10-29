import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { FileService } from 'src/app/services/file-service.service';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-upload-logs',
  templateUrl: './upload-logs.component.html',
  styleUrls: ['./upload-logs.component.css']
})


export class UploadFileComponent {

  files: any = [];
  filesToUpload: Array<File> = [];
  proceed: boolean;
  readyForUpload: boolean;

  constructor(private fileService: FileService, private shared: SharedService) {
    this.proceed = false;
    this.readyForUpload = false;
  }


  loadFiles(event) {
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
      this.filesToUpload.push(element);
    }
    if (event.length > 0) {
      this.readyForUpload = true;
    }
  }
  deleteAttachment(index) {
    this.files.splice(index, 1);
  }

  async uploadFiles() {
    const response: any = await this.fileService.uploadLogs(this.shared.techStack, this.filesToUpload);
    if (response === true) {
      this.proceed = true;
      this.shared.filesUploaded = this.files;
      console.log(this.shared.filesUploaded);
    } else {
      console.log(response);
    }
  }
}

