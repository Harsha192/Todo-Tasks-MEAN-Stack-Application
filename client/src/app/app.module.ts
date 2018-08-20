import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { AppComponent } from './app.component';
import { TasksComponent } from './tasks/tasks.component';
import {TaskService} from './shared/task.service';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { NgProgressModule } from 'ngx-progressbar';

@NgModule({
  declarations: [
    AppComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    HttpModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    NgProgressModule
  ],
  providers: [TaskService],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
