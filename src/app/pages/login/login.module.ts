import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { LoginComponent } from './login.component';
import {SignInComponent} from "../../components/auth/sign-in/sign-in.component";
import {SignUpComponent} from "../../components/auth/sign-up/sign-up.component";
import {DashboardComponent} from "../dashboard/dashboard.component";
import {ForgotPasswordComponent} from "../../components/auth/forgot-password/forgot-password.component";
import {VerifyEmailComponent} from "../../components/auth/verify-email/verify-email.component";

export const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent },
  { path: 'register-user', component: SignUpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'verify-email-address', component: VerifyEmailComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }
