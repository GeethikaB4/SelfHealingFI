import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFileComponent } from './components/upload-logs/upload-logs.component';
import { LogAnalyticsComponent } from './components/log-analytics/log-analytics.component';
import { HomeComponent } from './components/home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'uploadLogs',
    component: UploadFileComponent
  },
  {
    path: 'logAnalyticsAndResolution',
    component: LogAnalyticsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
