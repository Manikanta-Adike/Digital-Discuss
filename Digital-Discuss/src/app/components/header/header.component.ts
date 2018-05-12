import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { LoginRegisterComponent } from '../login-register/login-register.component';
import { AppService } from '../../services/app.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog, public appService: AppService) { }

  ngOnInit() {
  }
  openSignin() {
    const dialogRef = this.dialog.open(LoginRegisterComponent);
  }
  signout() {
    this.appService.user.username = '';
    sessionStorage.removeItem('username');
  }
}
