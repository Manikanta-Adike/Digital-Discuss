import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';
import { LoginRegisterComponent } from '../login-register/login-register.component';
import { MatDialog } from '@angular/material';
import {Router} from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  public activeTab: String = 'recentQuestion';
  public selectedTab: String = 'Recent Question';
  public questionList: any[] = [];

  constructor(private appService: AppService, public dialog: MatDialog, public router: Router) { }

  ngOnInit() {
    this.getQuestion('http://localhost:3000/getQuestions');
  }

  public getQuestion(url): void {
    this.appService.getQuestion(url).subscribe( question => {
      if (this.selectedTab === 'Recent Question' || this.selectedTab === 'Top Question' ) {
        this.questionList = question['questions'];
      } else if (this.selectedTab = 'Top Tag') {
        this.questionList = question;
      }
    }
    );
  }

  routeFunction(ele){
    this.appService.question.title = ele.title;
    this.appService.question.description = ele.description;
    this.appService.question.id = ele._id;
    this.appService.question.tags = ele.tag;
    this.appService.question.user = ele.username;
    this.router.navigate(['answer']);
  }

  public changeTab(selected)  {
    if (selected === 'postQuestion' && !this.appService.user.username) {
      const dialogRef = this.dialog.open(LoginRegisterComponent, {
        data : 'You have to Login/Register to proceed further'
      });
      return;
    }
    this.activeTab = selected;

    if (selected === 'recentQuestion') {
      this.selectedTab = 'Recent Question';

      this.getQuestion('http://localhost:3000/getQuestions');
    } else if (selected === 'topQuestion') {
      this.selectedTab = 'Top Question';
      this.getQuestion('http://localhost:3000/getTopQuestions');
    } else if (selected === 'topTag') {
      this.selectedTab = 'Top Tag';
      this.getQuestion('http://localhost:3000/getTopTags');
    } else if (selected === 'askQuestion') {
      this.selectedTab = 'Ask Question';
      console.log(this.selectedTab);
    }
  }
}
