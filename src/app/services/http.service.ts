import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  baseURI = 'http://usblrnixavier1:3000';

  constructor(private http: HttpClient) { }

  getAnalyticsandResolution(techStack: string, fileName: string) {
    return this.http.get(`${this.baseURI}/json/${techStack}/${fileName}`).toPromise();
  }

}
