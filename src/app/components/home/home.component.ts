import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  techStack: string = '';

  constructor(private shared: SharedService, private router: Router) { }

  ngOnInit() {
  }
  changeTechStack(stack) {
    this.techStack = stack;
    console.log(stack);
  }
  saveTechStack() {
    this.shared.techStack = this.techStack;
    this.router.navigate(['uploadLogs']);
  }

}
