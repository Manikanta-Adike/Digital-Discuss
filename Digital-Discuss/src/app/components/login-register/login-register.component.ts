import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '../../services/app.service';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material';
import { LoadingDialogDetailComponent } from '../loading-dialog/loading-dialog-detail.component';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  userForm: FormGroup;
  registerForm: FormGroup;
  toogleclass: boolean;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,  public dialog: MatDialog, private formBuilder: FormBuilder,
  public appService: AppService,
    public dialogRef: MatDialogRef<any>) {

    this.userForm = this.formBuilder.group({
      'name': ['', Validators.required],
      'password': ['', [Validators.required, Validators.minLength(8)]]
    });
    this.registerForm = this.formBuilder.group({
      'name1': ['', Validators.required],
      'password1': ['', [Validators.required]],
      'location': ['', [Validators.required]],
      'Interests': ['', [Validators.required]],
      'deignation': ['', [Validators.required]]
    });
  }



  saveUser() {
    if (this.userForm.dirty && this.userForm.valid) {
      //   alert(`Name: ${this.userForm.value.name} pwd: ${this.userForm.value.password}`);
      const loader = this.dialog.open(LoadingDialogDetailComponent, {
        hasBackdrop: false,
        panelClass: 'loading-dialog-pane'
      });
      const obj = {
        'username': this.userForm.value.name,
        'password': this.userForm.value.password
      };
      this.appService.userlogin(obj).subscribe(data => {
        console.log('success  ' + this.userForm.value.name);
        console.log(data);

        if (data['status'] > 400) {

          this.toogleclass = true;
          console.error('Error user');
          // this.dialogRef.close();
          loader.close();
        } else {
          sessionStorage.setItem('username', data['user'].username);
          this.appService.user.username = data['user'].username;
          this.toogleclass = false;
          this.dialogRef.close();
          loader.close();
        }
        return true;
      },
        error => {
          this.toogleclass = true;
          console.error('Error user');
          // this.dialogRef.close();
          loader.close();
          // return Observable.throw(error);
        });
    }
  }


  saveRegister() {
    if (this.registerForm.dirty && this.registerForm.valid) {

      const loader = this.dialog.open(LoadingDialogDetailComponent, {
        hasBackdrop: false,
        panelClass: 'loading-dialog-pane'
      });
      // alert(`Name: ${this.registerForm.value.name1} pwd: ${this.registerForm.value.password1}`);

      const obj = {
        username: this.registerForm.value.name1,
        password: this.registerForm.value.password1,
        seatLocation: this.registerForm.value.location,
        designation: this.registerForm.value.deignation,
        level: 'Beginner',
        tag: this.registerForm.value.Interests.split(','),
        questions: []

      };
      console.log(obj);
      this.appService.registerUser(obj).subscribe(data => {
        loader.close();
        if (data['status'] < 400) {
          console.log('success');
          sessionStorage.setItem('username', this.registerForm.value.name1);
          this.appService.user.username = this.registerForm.value.name1;
          this.dialogRef.close();
        }
        return true;
      },
        error => {
          loader.close();
          console.error('Error ');
          // return Observable.throw(error);
        });
    }
  }



  ngOnInit() {
  }

}
