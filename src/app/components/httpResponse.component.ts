import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from 'src/app/services/config.service';
import { Config } from 'protractor';

export class HttpResponse {
config = null;
error = null;

  constructor(private http: HttpClient, private configService: ConfigService) {
  }

showConfig() {
    this.configService.getConfig()
      .subscribe((data: Config) => this.config = {
          status: data.status,
          output:  data.output,
          message : data.message
      }, error => this.error = error
      );
  }
}

