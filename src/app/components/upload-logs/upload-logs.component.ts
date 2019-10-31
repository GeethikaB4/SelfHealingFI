import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file-service.service';
import { SharedService } from 'src/app/services/shared.service';
import { ConfigService } from 'src/app/services/config.service';
import { HttpService } from 'src/app/services/http.service';
import { MLResponse } from 'src/app/interfaces/ml-response';
import { Router } from '@angular/router';


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
  status = null;

  constructor(private router: Router,private http: HttpService, private fileService: FileService, private shared: SharedService, private config: ConfigService) {
    this.proceed = false;
    this.readyForUpload = false;
  }


  loadFiles(event) {
    // tslint:disable-next-line: prefer-for-of
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
    const response: any = await this.fileService.uploadLogs(this.shared.techStack, this.filesToUpload, this.shared.baseURI);
    if (response === true) {
      this.proceed = true;
    } else {
      alert('error');
    }
  }

  analyze() {
    console.log(this.shared.filePaths);
    this.http.runML(this.shared.filePaths).then((data: MLResponse) => {
      this.shared.analysisSuccess = data.status;
      if (data.status) {
        this.shared.outputFile = data.output.split('\\').pop();
      }
      this.router.navigate(['/logAnalyticsAndResolution']);
    });
  }

  post() {
    this.config.postResponse().subscribe((data) =>
      console.log(data));
  }

}

