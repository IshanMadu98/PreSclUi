import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StudentComponent } from './student.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { Paths } from '../../@application/enums/paths';

const routes: Routes = [
  {
    path: Paths.Student_Home, component: StudentComponent,
    children: [

    ]
  }]
@NgModule({
  imports: [
    CommonModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  declarations: [StudentComponent]
})
export class StudentModule { }
