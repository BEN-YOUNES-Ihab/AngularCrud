import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { UserService } from '../shared/user.service'; 
import { User } from '../shared/user.model';
import { from } from 'rxjs';
import { Router } from '@angular/router';
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
  providers: [UserService]

})
export class RegistrationComponent implements OnInit {

  constructor(public userService: UserService, private router: Router) { }
  
  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.userService.selectedUser = {
      _id: "",
      name: "",
      lastname: "",
      birthday: Date.now(),
      email: "",
      password:"",
      role: ""
    }
  }


  signUp(form: NgForm){
    if(this.passwordIsValid(form.value.password, form.value.repeatpassword)){
      this.userService.postUser(form.value).subscribe((res) => {
        this.resetForm(form);
        alert("user added succesfully")      
        this.resetForm();
        this.router.navigate(['login']);
        let ref = document.getElementById('cancel')
        ref?.click();
      },
      err=>{
        alert("something went wrong");
      });
    }else{
      alert("wrong password validation");
    }
    
  }
  passwordIsValid(password :any, repaeatpassword : any): boolean {
    if(password==repaeatpassword){
      return true;
    }else{
      alert("password should be euqal to repeat pass")
      return false;
    }
  }
}
