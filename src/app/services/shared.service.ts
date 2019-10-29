import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  techStack: string;
  filesUploaded: Array<string>;

}
