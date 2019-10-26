import { Component, OnInit } from '@angular/core';
import { FileServiceService } from 'src/app/services/file-service.service';

@Component({
  selector: 'app-log-analytics',
  templateUrl: './log-analytics.component.html',
  styleUrls: ['./log-analytics.component.css']
})
export class LogAnalyticsComponent implements OnInit {

  constructor(private fileService: FileServiceService) {

  }

  ngOnInit() {
  }

  downloadLog() {
    this.fileService.downloadFileFromUrl('https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg', 'someImage.jpg');
  }

}
