import { Component, OnInit } from '@angular/core';
import { AppService } from '../../services/app.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  public activeTab: String = 'recentQuestion';
  public selectedTab: String = 'Recent Question';
  public questionList: any[] = [];

  constructor(private appService: AppService) { }

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

  public changeTab(selected)  {
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
    }

    const tabs = document.querySelectorAll('.tab-heading');

    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = 'tab-heading';
    }

    event.srcElement.className = 'tab-heading active';
  }
}
