import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http: HttpClient, private shared: SharedService) {

  }

  downloadFileFromUrl(url: string, fileName: string) {
    saveAs(url, fileName);
  }

  uploadLogs(techStack: string, files: Array<File>, baseURI: string) {
    const formData = new FormData();
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < files.length; i++) {
      formData.append('logs', files[i], files[i][name]);
    }
    return this.http.post(`${baseURI}/upload/${techStack}`, formData).toPromise().then((data: any) => {
      this.shared.filePaths = data.fileLocation;
      console.log(data);
      return true;
    }).catch((err: HttpErrorResponse) => {
      console.log(err);
      return err.message;
    });
  }


  downloadCSV(techStack: string, targetFileName: string, saveFileName: string, baseURI: string) {
    return this.http.get(`${baseURI}/file/${techStack}/${targetFileName}`, {
      responseType: 'arraybuffer'
    }).toPromise().then(
      (data) => {


        const blob = new Blob([data], {type: 'text/csv'});
        const url = window.URL.createObjectURL(blob);
        const anchor = document.createElement('a');
        anchor.download = saveFileName;
        anchor.href = url;
        anchor.click();
        return true;
      }
    ).catch((error: HttpErrorResponse) => {
      if (error.status === 404) {
        return 404;
      }
    });
  }
}
