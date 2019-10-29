import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file-service.service';
import { HttpService } from 'src/app/services/http.service';
import { Errors } from 'src/app/interfaces/errors';
import { SharedService } from 'src/app/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-log-analytics',
  templateUrl: './log-analytics.component.html',
  styleUrls: ['./log-analytics.component.css']
})
export class LogAnalyticsComponent implements OnInit {

  errors: Errors[];
  showErrors = false;
  showWarnings = false;

  constructor(private fileService: FileService, private http: HttpService, private shared: SharedService) {
    // this.shared.filesUploaded = ['sample.csv'];
    // this.shared.techStack = 'hadoop';
    this.errors = [];
  }

  ngOnInit() {
    const files = this.shared.filesUploaded;
    console.log(files, this.shared.techStack);
    files.forEach(async (file) => {
      await this.fetchAnalytics(file);
    });
  }

  async fetchAnalytics(fileName: string) {
    await this.http.getAnalyticsandResolution(this.shared.techStack, fileName).then((data) => {
      this.processAnalytics(data as Errors[]);
    }).catch((err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  processAnalytics(errors: Array<Errors>) {
    errors.forEach(error => {
      error.Remediation = [error.Remediation as string];
      const found = this.errors.some((err, i) => {
        if (err.Error_Summary === error.Error_Summary) {
          this.errors[i].Remediation = (this.errors[i].Remediation as Array<string>).concat(error.Remediation);
          return true;
        }
        return false;
      });
      if (!found) {
        this.errors.push(error);
      }
    });
  }
  downloadLog() {
    const files = this.shared.filesUploaded;
    files.forEach(async (file) => {
      const response = await this.fileService.downloadCSV(this.shared.techStack, file, file);
    });
  }

}
