import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  public activeTab: String = 'recentQuestion';
  public questionList: any[] = [];

  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getQuestion('http://localhost:3000/getQuestions');
  }

  public getQuestion(url): void {
    this.appService.getQuestion(url).subscribe( question => this.questionList = question);
  }

  public changeTab(selected)  {
    this.activeTab = selected;

    if (selected === 'recentQuestion') {
      this.getQuestion('http://localhost:3000/getQuestions');
    } else if (selected === 'topQuestion') {
      this.getQuestion('http://localhost:3000/getTopQuestions');
    } else if (selected === 'topTag') {
      this.getQuestion('http://localhost:3000/getTopTags');
    }

    const tabs = document.querySelectorAll('.tab-heading');

    for (let i = 0; i < tabs.length; i++) {
      console.log(tabs[i]);
      tabs[i].className = 'tab-heading';
    }

    event.srcElement.className = 'tab-heading active';
  }
}
