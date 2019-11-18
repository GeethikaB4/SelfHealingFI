import { Injectable } from '@angular/core';
import { saveAs } from 'file-saver';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SharedService } from './shared.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class FileService {


  constructor(private http: HttpClient, private shared: SharedService,private router: Router) {

  }

  message = null;
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
      this.message = data.message;
      console.log(data.message);
      console.log(data.MLResponse);
      if (this.message) {
        return data.MLResponse;
      }else {
        Swal.fire({
          title: 'Error occured',
          text: 'Error occurred while trying to upload the file to server. Please make sure all servers are up.',
          icon: 'error',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No'
        }).then((result) => {
            this.router.navigate(['/']);
        });
      }
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
