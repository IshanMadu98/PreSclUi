import { Component } from '@angular/core';
import { StaffAttendanceDto } from '../../../../../@domain/StaffAttendancedto';
import { AttendanceService } from '../../../../../@application/services/attendance.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-staff-attendance',
  templateUrl: './staff-attendance.component.html',
  styleUrl: './staff-attendance.component.scss'
})
export class StaffAttendanceComponent {
  staffAttendance: StaffAttendanceDto[] = [];
  selectedDate: Date | null = null; // Default to today's date

  constructor(private attendanceService: AttendanceService,private message: NzMessageService) {
    this.selectedDate = new Date()
  }

  ngOnInit(): void {
    this.fetchAttendance();
  }

  fetchAttendance(): void {
    if (this.selectedDate) {
      this.attendanceService.getStaffAttendanceByDate(this.selectedDate.toUTCString()).subscribe(
        (data: any) => {
          this.staffAttendance = data;
        },
        error => {
          this.message.error('Failed to fetch attendance data.');
        }
      );
    } else {
      this.message.warning('Please select a date.');
    }
  }
  markAttendance(staff: any): void {
    if (!this.selectedDate) {
      this.message.warning('Please select a date before marking attendance.');
      return;
    }

    // Ensure that attendance time and leave time are set before sending the data
    if (!staff.attendanceTime || !staff.leaveTime) {
      this.message.warning('Please select both attendance time and leave time.');
      return;
    }

    const requestBody = {
      id: staff.id,
      staffId: staff.staffId,
      empNo: staff.empNo,
      staffName: staff.staffName,
      date: this.selectedDate.toISOString(),
      attendanceTime: staff.attendanceTime ? staff.attendanceTime.toISOString() : null,
      leaveTime: staff.leaveTime ? staff.leaveTime.toISOString() : null,
      attendanceMarked: true
    };

    this.attendanceService.markStaffAttendance(requestBody).subscribe(
      () => {
        this.message.success('Attendance marked successfully.');
        staff.attendanceMarked = true;
      },
      error => {
        this.message.error('Failed to mark attendance.');
      }
    );
  }
}
