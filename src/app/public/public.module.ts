import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Paths } from '../@application/enums/paths';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ChangePasswordComponent } from './containers/change-password/change-password.component';
import { ForgetPasswordComponent } from './containers/forget-password/forget-password.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { LogInComponent } from './containers/log-in/log-in.component';

const routes: Routes = [
  {
    path: '', component: LandingPageComponent
  },
  {
    path: Paths.LogIn, component: LogInComponent
  },
  {
    path: Paths.Forget_Password, component: ForgetPasswordComponent
  },
  {
    path: Paths.Change_Password, component: ChangePasswordComponent,
  },
    // { path: '**', redirectTo: '', pathMatch: 'full' },

]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [
    LandingPageComponent,
    LogInComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    UnauthorizedComponent,

  ],
})
export class PublicModule { }
