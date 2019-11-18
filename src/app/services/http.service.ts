import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})


export class HttpService {

  constructor(private http: HttpClient, private shared: SharedService) { }

  getAnalyticsandResolution(techStack: string, fileName: string, baseURI: string) {
    return this.http.get(`${baseURI}/json/${techStack}/${fileName}`).toPromise();
  }
}
