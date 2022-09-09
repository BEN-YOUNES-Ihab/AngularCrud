import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArticlesComponent } from './articles/articles.component';
import { AuthGuard } from './Guard/auth.guard';
import { RoleGuard } from './Guard/role.guard';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegistrationComponent } from './registration/registration.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  { path : '', redirectTo: 'login' , pathMatch : 'full'}, 
  { path : 'login' , component : LoginComponent },
  { path : 'signup' , component : RegistrationComponent },
  { path : 'articles' , component : ArticlesComponent , canActivate: [AuthGuard]},
  { path : 'users' , component : UsersComponent , canActivate: [RoleGuard]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
