import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ManageCategoriesComponent } from './pages/managecategories/managecategories.component';
import { ManageItemsComponent } from './pages/manageitems/manageitems.component';
import { GetallPetsComponent } from './pages/getall-pets/getall-pets.component';
import { GetallUsersComponent } from './pages/getall-users/getall-users.component';
import { ErrorComponent } from './pages/error/error.component';
import { authGuard } from './guards/main-guard.guard';

const routes: Routes = [
  {
    path:'',
    component:MainComponent
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path:'signin',
    component:SigninComponent
  },
  {
    path:'forgetpassword',
    component:ForgetPasswordComponent
  },
  {
    path:'resetpassword',
    component:ResetPasswordComponent
  },
  {
    path:'managecategories',
    component:ManageCategoriesComponent,
    canActivate: [authGuard]
  },
  {
    path:'manageitems',
    component:ManageItemsComponent,
    canActivate: [authGuard]
  },
  {
    path:'getall-pets',
    component:GetallPetsComponent,
    canActivate: [authGuard]
  },
  {
    path:'getall-users',
    component:GetallUsersComponent,
    canActivate: [authGuard]
  },
  {
    path:'error',
    component:ErrorComponent
  },
  {
    path:'**',
    component:ErrorComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
