import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login-register',
  templateUrl: './login-register.component.html',
  styleUrls: ['./login-register.component.scss']
})
export class LoginRegisterComponent implements OnInit {


  userForm: FormGroup;
  registerForm:FormGroup;
  
  constructor(private formBuilder: FormBuilder) {

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
      alert(`Name: ${this.userForm.value.name} pwd: ${this.userForm.value.password}`);
    }
  }


  saveRegister() {
    if (this.registerForm.dirty && this.registerForm.valid) {
      alert(`Name: ${this.registerForm.value.name1} pwd: ${this.registerForm.value.password1}`);
    }
  }



  ngOnInit() {
    
  }

}
