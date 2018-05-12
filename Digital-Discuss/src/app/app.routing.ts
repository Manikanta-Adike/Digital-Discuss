import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { QuestionAnswerComponent } from './components/question-answer/question-answer.component';

export const routes: Routes = [
    {path: 'dashboard', component: DashboardComponent},
    {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    {path: 'question-answer', component: QuestionAnswerComponent}
];
