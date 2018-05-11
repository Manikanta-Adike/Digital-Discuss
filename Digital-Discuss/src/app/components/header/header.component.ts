import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { DashboardComponent } from '../dashboard/dashboard.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }
  openSignin() {
    const dialogRef = this.dialog.open(DashboardComponent);
  }
}
