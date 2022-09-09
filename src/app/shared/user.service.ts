import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


import { User } from './user.model';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User;
  users: User[];
  readonly baseURL = 'http://localhost:3000/users';
  readonly loginURL = 'http://localhost:3000/users/login';
  readonly refreshToken = 'http://localhost:3000/token';
  tokenresp: any;

  constructor(private http: HttpClient, private router: Router) { }

  postUser(user: User) {
    return this.http.post(this.baseURL, user);
  }

  getUserList() {
    return this.http.get(this.baseURL);
  }

  putUser(user: User) {
    return this.http.put(this.baseURL + `/${user._id}`, user);
  }
  deleteUser(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }
  login(inputdata: any){
    return this.http.post(this.loginURL , inputdata);
  }
  isLoggedIn(){
    return localStorage.getItem('accessToken')!=null;
  }

  GetRole() {
    return localStorage.getItem("role") || '';
  }
  Logout() {
    alert('Your session expired')
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
  GetToken() {
    return localStorage.getItem("accessToken") || '';
  }

  GetRefreshToken() {
    return localStorage.getItem("refreshToken") || '';
  }
  SaveTokens(tokendata: any) {
    localStorage.setItem('accessToken', tokendata.accessToken);
    localStorage.setItem('refreshToken', tokendata.refreshToken);
  }
  clearTokenExpired(){
    localStorage.removeItem('accessToken')
    this.router.navigate(['/login'])
  }
  isUserRoute(): boolean{
    if(this.router.url == '/users'){
      return true;
    }else{
      return false;
    }
  }
  isAdmin(): boolean{
    if(this.GetRole()=='admin'){
      return true;
    }else{
      return false;
    }
  }


}
