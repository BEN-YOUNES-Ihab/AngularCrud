import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ArticleService } from '../shared/article.service';
import { Article} from '../shared/article.model'
import { Router } from '@angular/router';
import { UserService } from '../shared/user.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-article',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss'],
  providers: [ArticleService]
})
export class ArticlesComponent implements OnInit {
  showAdd !: boolean;
  showUpdate !: boolean;
  isadmin = false;
  constructor(public userService: UserService,public articleService: ArticleService, private route: Router) {

  }

  ngOnInit() {
    this.resetForm();
    this.refreshArticleList();
    this.gettingRoleNow();
  }

  gettingRoleNow(){
    this.userService.getUserList().subscribe((res) => {
      const users = res as User[];
      for(let i=0;i<users.length;i++){
        if(users[i].email== localStorage.getItem('email')){
          localStorage.setItem('role', users[i].role);
        } 
      }
      if(this.userService.GetRole()!='admin'){
        this.isadmin = false;
      }else{
        this.isadmin = true;
      }
    });
  }

  clickAddArticle(){
    this.resetForm();
    this.showAdd = true;
    this.showUpdate = false;
  }

  resetForm(form?: NgForm) {
    if (form)
      form.reset();
    this.articleService.selectedArticle = {
      _id: "",
      name: "",
      category: "",
      price: null,
      size: "",
      comment:""
    }
  }


  refreshArticleList() {
    this.articleService.getArticleList().subscribe((res) => {
      this.articleService.articles = res as Article[];
    });
  }

  onEdit(art: Article) {
    this.articleService.selectedArticle = art;
    this.showAdd = false;
    this.showUpdate = true;
  }

  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.articleService.deleteArticle(_id).subscribe((res) => {
        this.refreshArticleList();
      });
    }
  }
  postAricleDetails(form: NgForm){
    this.articleService.postArticle(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshArticleList();
      alert("article added succesfully")      
      this.resetForm();
      let ref = document.getElementById('cancel')
      this.refreshArticleList();
      ref?.click();
    },
    err=>{
      alert("something went wrong");
    });
  }
  updateArticleDetails(form: NgForm){
    this.articleService.putArticle(form.value).subscribe((res) => {
      this.resetForm(form);
      this.refreshArticleList();
      alert("article updated succesfully")      
      this.resetForm();
      let ref = document.getElementById('cancel')
      this.refreshArticleList();
      ref?.click();
    },
    err=>{
      alert("something went wrong");
    });
  } 


}


