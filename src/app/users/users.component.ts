import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(public userService: UserService, private route: Router) { }

  ngOnInit() {
    this.resetForm();
    this.refreshUserList();
  }

  clickAddUser(){
    this.resetForm();
    this.showAdd = true;
    this.showUpdate = false;
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


  refreshUserList() {
    this.userService.getUserList().subscribe((res) => {
      this.userService.users = res as User[];
    });
  }

  onEdit(user: User) {
    this.userService.selectedUser = user;
    this.showAdd = false;
    this.showUpdate = true;
  }

  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.userService.deleteUser(_id).subscribe((res) => {
        this.refreshUserList();
      });
    }
  }
  postUserDetails(form: NgForm){
    this.userService.postUser(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshUserList();
      alert("user added succesfully")      
      this.resetForm();
      let ref = document.getElementById('cancel')
      this.refreshUserList();
      ref?.click();
    },
    err=>{
      alert("something went wrong");
    });
  }
  updateUserDetails(form: NgForm){
    this.userService.putUser(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshUserList();
      alert("user updated succesfully")      
      this.resetForm();
      let ref = document.getElementById('cancel')
      this.refreshUserList();
      ref?.click();
    },
    err=>{
      alert("something went wrong");
    });
  } 
  logout(){
    localStorage.clear();
    this.route.navigate(['login']);
  }
}