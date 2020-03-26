import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SharedService } from './shared.service';

@Injectable({
  providedIn: 'root'
})


export class HttpService {
  baseURI;

  constructor(private http: HttpClient, private shared: SharedService) {
    this.baseURI = shared.baseURI;
  }

  getAnalyticsandResolution(techStack: string, fileName: string) {
    const baseURI = this.baseURI;
    return this.http.get(`${baseURI}/json/${techStack}/${fileName}`).toPromise();
  }
}
