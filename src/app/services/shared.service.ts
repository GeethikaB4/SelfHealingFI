import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  techStack: string;
  filesUploaded: Array<string>;
  filePaths: Array<{[key: string]: string}>;
  baseURI = 'http://10.29.155.7:3000';
  MLServer = 'http://localhost:3999';
  analysisSuccess = false;
  outputFile: string;
}
