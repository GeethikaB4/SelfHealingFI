import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { UploadFileComponent } from './components/upload-logs/upload-logs.component';
import { DragDropDirective } from './components/drag-drop.directive';
import { LogAnalyticsComponent } from './components/log-analytics/log-analytics.component';
import { HomeComponent } from './components/home/home.component';
import { FileService } from './services/file-service.service';
import { SharedService } from './services/shared.service';
import { HttpService } from './services/http.service';

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
    AppRoutingModule,
    HttpClientModule
  ],
  schemas: [],
  providers: [
    FileService,
    SharedService,
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
