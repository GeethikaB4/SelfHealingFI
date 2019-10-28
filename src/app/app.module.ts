import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UploadFileComponent } from './components/upload-logs/upload-logs.component';
import { DragDropDirective } from './components/drag-drop.directive';
import { LogAnalyticsComponent } from './components/log-analytics/log-analytics.component';
import { HomeComponent } from './components/home/home.component';
import { FileServiceService } from './services/file-service.service';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    UploadFileComponent,
    DragDropDirective,
    LogAnalyticsComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  schemas:[],
  providers: [
    FileServiceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
