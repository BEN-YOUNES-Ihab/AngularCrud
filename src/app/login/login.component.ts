import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../shared/user.service'; 
import { User } from '../shared/user.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [UserService]

})
export class LoginComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }
  respdata: any
  ngOnInit(): void {
    if(localStorage.getItem('accessToken')){
      this.router.navigate(['articles']);
    }else{
      this.resetForm();
    }
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
  } 

  
  login(form: NgForm){
      if(form.valid){
        this.userService.login(form.value).subscribe(item =>{
          this.respdata=item;
        if(this.respdata!=null){
          this.userService.SaveTokens(this.respdata);
          localStorage.setItem('email', form.value.email);

          alert("login succesfull");
          this.resetForm();
          this.router.navigate(['articles']);

        }else{
          alert("Login Failed");
        }
        });
      }
  }

  loginIsValid(email :any, dataemail:any): boolean {
    if(email === dataemail){
      return true;
    }else{
      return false;
    }
  }
}
