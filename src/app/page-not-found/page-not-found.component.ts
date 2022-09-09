import { Component } from '@angular/core';
import { Router } from '@angular/router';
  
@Component({
    selector: 'page-404',
    template: `
    <div class='center'>
      <h1>Hey, this page dont exist !</h1>
      <button (click)="back()" class="waves-effect waves-teal btn-flat">
        Back
      </button>
    </div>
  `
})
export class PageNotFoundComponent { 
  constructor(private route: Router){}
  back() {
    this.route.navigate(['/articles']);
  }
}