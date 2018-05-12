import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AppService } from '../../services/app.service';
import { MatDialogRef } from '@angular/material';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {

  userForm: FormGroup;
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, public appService: AppService, public dialogRef: MatDialogRef<any>) {

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
      const obj = {
        'username': this.userForm.value.name,
        'password': this.userForm.value.password
      };
        this.appService.userlogin(obj).subscribe(data => {
          console.log('success  ' + this.userForm.value.name);
          sessionStorage.setItem('username', data['user'].username);
            console.log('success');
            this.dialogRef.close();
            return true;
           },
           error => {
           console.error('Error ');
             // return Observable.throw(error);
           });
    }
  }


  saveRegister() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      // alert(`Name: ${this.registerForm.value.name1} pwd: ${this.registerForm.value.password1}`);

      const obj = {
        username: this.registerForm.value.name1,
        password: this.registerForm.value.password1,
        seatLocation: this.registerForm.value.location,
        designation:  this.registerForm.value.deignation,
        level: 'Beginner',
          tag: this.registerForm.value.Interests.split(','),
          questions: []

      };
      console.log(obj);
        this.appService.registerUser(obj).subscribe(data => {
            console.log('success');
            sessionStorage.setItem('username', this.registerForm.value.name1);
            this.dialogRef.close();
            return true;
           },
           error => {
           console.error('Error ');
             // return Observable.throw(error);
           });
    }
  }



  ngOnInit() {
  }

}