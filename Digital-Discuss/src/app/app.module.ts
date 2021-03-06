import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MaterialModule } from './dependencies/material.module';
import { routes } from './app.routing';
import { PostQuestionComponent } from './components/post-question/post-question.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppService } from './services/app.service';
import { HttpClientModule } from '@angular/common/http';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';
import { LoadingDialogDetailComponent } from './components/loading-dialog/loading-dialog-detail.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    DashboardComponent,
    PostQuestionComponent,
    QuestionAnswerComponent,
    LoadingDialogDetailComponent,
    LoginRegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    AppService
  ],
  entryComponents: [
    LoadingDialogDetailComponent,
    LoginRegisterComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
