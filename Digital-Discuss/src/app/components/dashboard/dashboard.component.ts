import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],

})
export class DashboardComponent implements OnInit {

  public activeTab: String = 'recentQuestion';

  constructor() { }

  ngOnInit() {
  }

  public changeTab(selected)  {
    this.activeTab = selected;
    const tabs = document.querySelectorAll('side-tab');

    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = 'tabs';
    }

    //event.srcElement.className = 'tabs active';
  }

}
