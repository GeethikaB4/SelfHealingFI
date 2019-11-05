import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseURI = 'http://localhost:3000';
  MLServer = 'http://USHYDGBURLA8.us.deloitte.com:3001';
  techStack: string;
  filesUploaded: Array<string>;
  filePaths: Array<{[key: string]: string}>;
  analysisSuccess: boolean;
  outputFile: string;
  timeOfExec : string; 
  logFileName : string;
  output_csv_name : string;
  errorCount : string;
  warningCount : string;
  uniqueErrorCount : string;
  uniqueWarningCount : string;
  inputFileName : string;
}
