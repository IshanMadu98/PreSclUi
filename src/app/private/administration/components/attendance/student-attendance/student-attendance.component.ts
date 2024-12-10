import { Component } from '@angular/core';
import { StudentAttendanceDto } from '../../../../../@domain/StudentAttendanceDto';
import { AttendanceService } from '../../../../../@application/services/attendance.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-student-attendance',
  templateUrl: './student-attendance.component.html',
  styleUrl: './student-attendance.component.scss'
})
export class StudentAttendanceComponent {
  studentAttendance: StudentAttendanceDto[] = [];
  selectedDate: Date | null = null; // Default to today's date

  constructor(private attendanceService: AttendanceService,private message: NzMessageService) {
    this.selectedDate = new Date()
  }

  ngOnInit(): void {
    this.fetchAttendance();
  }

  fetchAttendance(): void {
    if (this.selectedDate) {
      this.attendanceService.getStudentAttendanceByDate(this.selectedDate.toUTCString()).subscribe(
        (data: any) => {
          this.studentAttendance = data;
        },
        error => {
          this.message.error('Failed to fetch attendance data.');
        }
      );
    } else {
      this.message.warning('Please select a date.');
    }
  }

  markAttendance(student: any): void {
    // Validate the input
    if (!this.selectedDate) {
      this.message.warning('Please select a date before marking attendance.');
      return;
    }

    // Prepare request body
    const requestBody = {
      id: student.id,
      studentId: student.studentId,
      studentNo: student.studentNo,
      studentName: student.studentName,
      date: this.selectedDate.toISOString(),
      isPresent: student.isPresent,
      attendanceMarked: true
    };

    // Call the API
    this.attendanceService.markStudentAttendance(requestBody).subscribe(
      () => {
        this.message.success('Attendance marked successfully.');
        student.attendanceMarked = true; // Update the marked status in the UI
      },
      error => {
        this.message.error('Failed to mark attendance.');
        student.isPresent = !student.isPresent; // Revert the switch state on failure
      }
    );
  }


}
