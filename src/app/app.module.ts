import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './basecomponent/app.component';
import { MainComponent } from './pages/main/main.component';
import { ManageCategoriesComponent } from './pages/managecategories/managecategories.component';
import { SignupComponent } from './pages/signup/signup.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ForgetPasswordComponent } from './pages/forget-password/forget-password.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';
import { ManageItemsComponent } from './pages/manageitems/manageitems.component';
import { GetallPetsComponent } from './pages/getall-pets/getall-pets.component';
import { GetallUsersComponent } from './pages/getall-users/getall-users.component';
import { ErrorComponent } from './pages/error/error.component';
import { FooterComponent } from './sharedcomponent/footer/footer.component';
import { AlertComponent } from './sharedcomponent/alert/alert.component';
import { ConfirmDialogComponent } from './sharedcomponent/confirm-dialog/confirm-dialog.component';
import { NavComponent } from './sharedcomponent/nav/nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { SidenavComponent } from './sharedcomponent/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CategoryDialogComponent } from './sharedcomponent/categorydialog/categorydialog.component';
import { ItemDialogComponent } from './sharedcomponent/itemdialog/itemdialog.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core'; 

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    ManageCategoriesComponent,
    SignupComponent,
    SigninComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    ManageItemsComponent,
    GetallPetsComponent,
    GetallUsersComponent,
    ErrorComponent,
    FooterComponent,
    AlertComponent,
    ConfirmDialogComponent,
    NavComponent,
    SidenavComponent,
    CategoryDialogComponent,
    ItemDialogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatDatepickerModule ,
    MatNativeDateModule ,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    HttpClientModule,
    FormsModule ,
    MatSelectModule,
    MatOptionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
