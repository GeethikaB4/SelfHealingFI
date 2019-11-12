import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file-service.service';
import { HttpService } from 'src/app/services/http.service';
import { Errors } from 'src/app/interfaces/errors';
import { SharedService } from 'src/app/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { History } from '../../interfaces/history';
import { from } from 'rxjs';
@Component({
  selector: 'app-log-analytics',
  templateUrl: './log-analytics.component.html',
  styleUrls: ['./log-analytics.component.css']
})
export class LogAnalyticsComponent implements OnInit {

  errors: Array<Errors> = [];
  show: string;
  downloadFileName = '';
  showErrors = false;
  showWarnings = false;
  config = null;
  error = null;
  isCheckBoxChecked: boolean;
  isChecked: boolean;
  errorCnt: string;
  warningCnt: string;
  techstachSelected: string;
  uniqueErrorCnt: string;
  uniqueWarningCnt: string;
  timeExec: string;
  logFile: string;
  outputCSVFile: string;
  history: Array<History>;
  selected: [];
  constructor(private fileService: FileService, private http: HttpService, private shared: SharedService,
              private httpClient: HttpClient, private configService: ConfigService) {

    this.isCheckBoxChecked = false;
    this.show = 'summary';
    // this.show = this.shared.showOption;
  }

  navigate(option) {
    this.show = option;
  }
  fetchHistory() {
    if (!this.shared.history) {
      this.shared.history = [];
    }
    if (this.shared.history.length === 0) {
      if (sessionStorage.getItem('history')) {
        this.shared.history = this.shared.history.concat(JSON.parse(sessionStorage.getItem('history')));
      }
    }
    this.history = this.shared.history;
  }
  async ngOnInit() {
    this.fetchHistory();
    console.log(this.errors);
    /**
     * If the analysis is success fetch the csv
     */
    if (this.shared.analysisSuccess) {
      const file = this.shared.outputFile;
      this.errorCnt = this.shared.errorCount;
      this.uniqueErrorCnt =  this.shared.uniqueErrorCount;
      this.techstachSelected = this.shared.techStack;
      this.warningCnt = this.shared.warningCount;
      this.uniqueWarningCnt = this.shared.uniqueWarningCount;
      this.outputCSVFile = this.shared.inputFileName.replace('.out', '.csv');
      this.logFile = this.shared.inputFileName;
      const exec = this.shared.timeOfExec;


      // this.timeExec = exec.substring(exec.lastIndexOf(',') + 1, exec.length);
      // this.timeExec =  (parseFloat(this.timeExec) / 1000).toString();
      this.timeExec = this.shared.timeOfExec;
      if (file) {
        await this.fetchAnalytics(file);
      }
    }
  }

  /**
   * @param fileName OutputCSV filename from ML code
   */
  fetchAnalytics(fileName: string) {
    this.http.getAnalyticsandResolution(this.shared.techStack, fileName, this.shared.baseURI).then((data) => {
      this.processAnalytics(data as Errors[]);
    }).catch((err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  /**
   * @param err List of errors to be processed
   * Transforms the output from ML code
   */
  processAnalytics(err: Errors[]) {
    this.errors = err;
    console.log(this.errors);
  }

  /**
   * Downlaod log button
   */
  downloadLog() {
    console.log(this.downloadFileName);
    const filename = this.downloadFileName.trim().length === 0 ? 'output.csv' : `${this.downloadFileName}.csv`;
    const outputFile  = this.shared.outputFile;
    this.fileService.downloadCSV(this.shared.techStack, outputFile, filename, this.shared.baseURI);
  }
  downloadLogFromHistory(techStack, filename) {
    this.fileService.downloadCSV(techStack, filename, filename, this.shared.baseURI);
  }

//  chkval(event) {
//   this.isCheckBoxChecked = false;
//   if ( event.target.checked ) {
//     this.isCheckBoxChecked = true;
//   }
// }

//   status() {
//      if ( this.isCheckBoxChecked === true) {
//         alert('Successfully Deployed!!');
//      } else {
//        alert('Select alteast one checkbox!!');
//      }
//   }
}





