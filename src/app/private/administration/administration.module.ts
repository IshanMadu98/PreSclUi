import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { Paths } from '../../@application/enums/paths';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdministrationComponent } from './administration.component';
import { AdminNavbarComponent } from './admin-navbar/admin-navbar.component';
import { StudentComponent } from './components/student/student.component';
import { StaffComponent } from './components/staff/staff.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { StaffAttendanceComponent } from './components/attendance/staff-attendance/staff-attendance.component';
import { StudentAttendanceComponent } from './components/attendance/student-attendance/student-attendance.component';
import { AddUpdateStudentDialogComponent } from './components/student/add-update-student-dialog/add-update-student-dialog.component';
import { AddUpdateStaffDialogComponent } from './components/staff/add-update-staff-dialog/add-update-staff-dialog.component';



const routes: Routes = [
  {
    path: Paths.Admin_Home, component: AdministrationComponent,
    children: [
      {
        path: Paths.Student,
        component: StudentComponent
      },
      {
        path: Paths.Staff,
        component: StaffComponent
      },{
        path: Paths.Attendance,
        component: AttendanceComponent
      },
    ]
  }]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    ],
  declarations: [
    AdministrationComponent,
    AdminHomeComponent,
    AdminNavbarComponent,
    StudentComponent,
    StaffComponent,
    AttendanceComponent,
    StaffAttendanceComponent,
    StudentAttendanceComponent,
    AddUpdateStudentDialogComponent,
    AddUpdateStaffDialogComponent
  ]

})
export class AdministrationModule { }
