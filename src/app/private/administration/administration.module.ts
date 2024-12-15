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
import { PaymentComponent } from './components/payment/payment.component';
import { AddUpdatePaymentDialogComponent } from './components/payment/add-update-payment-dialog/add-update-payment-dialog.component';
import { EventComponent } from './components/event/event.component';
import { AddUpdateEventDialogComponent } from './components/event/add-update-event-dialog/add-update-event-dialog.component';



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
      },{
        path: Paths.Payment,
        component: PaymentComponent
      }
      ,{
        path: Paths.Event,
        component: EventComponent
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
    AddUpdateStaffDialogComponent,
    PaymentComponent,
    AddUpdatePaymentDialogComponent,
    EventComponent,
    AddUpdateEventDialogComponent
  ]

})
export class AdministrationModule { }
