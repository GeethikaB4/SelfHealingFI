import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  baseURI = 'http://usblrnixavier1:3000';

  constructor(private http: HttpClient) {

  }

  downloadFileFromUrl(url: string, fileName: string) {
    saveAs(url, fileName);
  }

  uploadLogs(techStack: string, files: Array<File>) {
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
      formData.append('logs', files[i], files[i][name]);
    }
    return this.http.post(`${this.baseURI}/upload/${techStack}`, formData).toPromise().then((data)=>{
      console.log(data);
      return true;
    }).catch((err: HttpErrorResponse) => {
      console.log(err);
      return err.message;
    });
  }


  downloadCSV(techStack: string, targetFileName: string, saveFileName: string) {
    return this.http.get(`${this.baseURI}/file/${techStack}/${targetFileName}`, {
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
