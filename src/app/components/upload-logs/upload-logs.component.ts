import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file-service.service';
import { SharedService } from 'src/app/services/shared.service';
import { HttpService } from 'src/app/services/http.service';
import { MLResponse } from 'src/app/interfaces/ml-response';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
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

  constructor(private router: Router,private http: HttpService, private fileService: FileService, private shared: SharedService) {
    this.proceed = false;
    this.readyForUpload = false;
  }


  loadFiles(event) {
    // tslint:disable-next-line: prefer-for-of
    for (let index = 0; index < event.length; index++) {
      const element = event[index];
      this.files.push(element.name);
      this.shared.inputFileName = element.name;
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
   this.fileService.uploadLogs(this.shared.techStack, this.filesToUpload).
   then((data: MLResponse) => {
    this.shared.analysisSuccess = data.status;
    this.shared.timeOfExec = data.time_exec;
    this.shared.logFileName = data.log_file_name;
    this.shared.output_csv_name = data.output_csv_name;
    this.shared.errorCount = data.error_count;
    this.shared.warningCount = data.warning_count;
    this.shared.uniqueErrorCount = data.unique_error_count;
    this.shared.uniqueWarningCount = data.unique_warning_count;
    if (data.status) {
      this.shared.outputFile = data.output.split('\\').pop();
      this.router.navigate(['/logAnalyticsAndResolution']);
    } else {
      Swal.fire({
        title: 'Error occured',
        text: 'The file you have uploaded cannot be analysed as it is not a log file. Do you want to upload another file?',
        icon: 'error',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.value) {
          this.router.navigate(['/uploadLogs']);
          this.proceed = false;
          this.files = [];
        } else {
          this.router.navigate(['/']);
        }
      });
    }
  });
}
}


