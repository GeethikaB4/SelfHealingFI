import { Component, OnInit } from '@angular/core';
import { FileService } from 'src/app/services/file-service.service';
import { HttpService } from 'src/app/services/http.service';
import { Errors } from 'src/app/interfaces/errors';
import { SharedService } from 'src/app/services/shared.service';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';

@Component({
  selector: 'app-log-analytics',
  templateUrl: './log-analytics.component.html',
  styleUrls: ['./log-analytics.component.css']
})
export class LogAnalyticsComponent implements OnInit {

  errors: Errors[];
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

  constructor(private fileService: FileService, private http: HttpService, private shared: SharedService,
              private httpClient: HttpClient, private configService: ConfigService) {
    this.errors = [];
    this.isCheckBoxChecked = false;
  }

  async ngOnInit() {
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
      this.outputCSVFile = this.shared.inputFileName.replace(".out",".csv");
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
  async fetchAnalytics(fileName: string) {
    await this.http.getAnalyticsandResolution(this.shared.techStack, fileName, this.shared.baseURI).then((data) => {
      this.processAnalytics(data as Errors[]);
    }).catch((err: HttpErrorResponse) => {
      console.log(err);
    });
  }

  /**
   * @param errors List of errors to be processed
   * Transforms the output from ML code
   */
  processAnalytics(errors: Array<Errors>) {
    // errors.forEach(error => {
    //   error.Remediation = [error.Remediation as string];
    //   const found = this.errors.some((err, i) => {
    //     if (err.Error_Summary === error.Error_Summary) {
    //       this.errors[i].Remediation = (this.errors[i].Remediation as Array<string>).concat(error.Remediation);
    //       return true;
    //     }
    //     return false;
    //   });
    //   if (!found) {
    //     this.errors.push(error);
    //   }
    // });
    this.errors = errors;
    console.log(errors);
  }

  /**
   * Downlaod log button
   */
  async downloadLog() {
    const outputFile  = this.shared.outputFile;
    await this.fileService.downloadCSV(this.shared.techStack, outputFile, 'output.csv', this.shared.baseURI);
  }

 chkval(event)
{
  this.isCheckBoxChecked = false;
  if ( event.target.checked )
  {
    this.isCheckBoxChecked = true;
  }
}

  status(){
     if(this.isCheckBoxChecked == true)
     {
        alert("Successfully Deployed!!");
     }
     else{
       alert("Select alteast one checkbox!!");
     }
  }
}





