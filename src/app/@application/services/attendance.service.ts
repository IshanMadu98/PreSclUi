import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentAttendanceDto } from '../../@domain/StudentAttendanceDto';
import { StaffAttendanceDto } from '../../@domain/StaffAttendancedto';


@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private baseUrl = 'https://your-api-url/api/attendance'; // Replace with your API's URL

  constructor(private http: HttpClient) {}

  // Mark Student Attendance
  markStudentAttendance(attendance: StudentAttendanceDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/student`, attendance);
  }

  // Mark Staff Attendance
  markStaffAttendance(attendance: StaffAttendanceDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/staff`, attendance);
  }

  // Get Student Attendance by Date
  getStudentAttendanceByDate(date: string): Observable<StudentAttendanceDto[]> {
    return this.http.get<StudentAttendanceDto[]>(`${this.baseUrl}/student/date?date=${date}`);
  }

  // Get Staff Attendance by Date
  getStaffAttendanceByDate(date: string): Observable<StaffAttendanceDto[]> {
    return this.http.get<StaffAttendanceDto[]>(`${this.baseUrl}/staff/date?date=${date}`);
  }

  // Get Student Attendance by ID
  getStudentAttendanceById(studentId: string): Observable<StudentAttendanceDto[]> {
    return this.http.get<StudentAttendanceDto[]>(`${this.baseUrl}/student/id/${studentId}`);
  }

  // Get Staff Attendance by ID
  getStaffAttendanceById(staffId: string): Observable<StaffAttendanceDto[]> {
    return this.http.get<StaffAttendanceDto[]>(`${this.baseUrl}/staff/id/${staffId}`);
  }

  // Get Student Attendance by ID and Date
  getStudentAttendanceByIdAndDate(studentId: string, date: string): Observable<StudentAttendanceDto> {
    return this.http.get<StudentAttendanceDto>(`${this.baseUrl}/student/id/${studentId}/date/${date}`);
  }

  // Get Staff Attendance by ID and Date
  getStaffAttendanceByIdAndDate(staffId: string, date: string): Observable<StaffAttendanceDto> {
    return this.http.get<StaffAttendanceDto>(`${this.baseUrl}/staff/id/${staffId}/date/${date}`);
  }
}
