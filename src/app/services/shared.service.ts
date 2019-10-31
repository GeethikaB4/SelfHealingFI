import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  baseURI = 'http://USBLRNIXAVIER1.us.deloitte.com:3000';
  MLServer = 'http://USBLRNIXAVIER1.us.deloitte.com:3001';
  techStack: string;
  filesUploaded: Array<string>;
  filePaths: Array<{[key: string]: string}>;
  analysisSuccess: boolean;
  outputFile: string;
}
