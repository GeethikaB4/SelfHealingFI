import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UploadLogsComponent } from './components/upload-logs/upload-logs.component';
import { LogAnalyticsComponent } from './components/log-analytics/log-analytics.component';
import { HomeComponent } from './components/home/home.component';
import { FileServiceService } from './services/file-service.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UploadLogsComponent,
    LogAnalyticsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    FileServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
