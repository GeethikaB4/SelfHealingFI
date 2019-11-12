import { Component } from '@angular/core';
import { SharedService } from './services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SelfHealingFI';
  constructor(private shared: SharedService, private router: Router) {
    if (shared.techStack == '' || shared.techStack == undefined) {
      router.navigate(['']);
    }
  }
  change() {
    if (this.router.url !== '/' && (this.shared.techStack == '' || this.shared.techStack == undefined)) {
      alert('choose a techstack');
      this.router.navigate(['']);
    }
    console.log('changed');
  }
}
