import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SharedService } from 'src/app/services/shared.service';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  show: string;

  @Output() chooseOption = new EventEmitter<string>();

  route(option: string) {
    console.log('emitting')
    this.chooseOption.emit(option);
  }

  constructor() { }

  ngOnInit() {
  }

}
