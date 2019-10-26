import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileServiceService {
  constructor() { }

  downloadFileFromUrl(url: string, fileName: string) {
    saveAs(url, fileName);
  }
}
