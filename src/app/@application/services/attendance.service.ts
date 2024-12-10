import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentAttendanceDto } from '../../@domain/StudentAttendanceDto';
import { StaffAttendanceDto } from '../../@domain/StaffAttendancedto';
import { environment } from '../../../environments/environment';

// https://localhost:7211/api/Attendance/student/date?date=2024-12-10


@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private baseUrl = `${environment.apiUrl}/Attendance`;// Replace with your API's URL

  constructor(private http: HttpClient) {}

  // Mark Student Attendance
  markStudentAttendance(attendance: StudentAttendanceDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/student`, attendance);
  }

  // Mark Staff Attendance
  markStaffAttendance(attendance: StaffAttendanceDto): Observable<any> {
    return this.http.post(`${this.baseUrl}/staff`, attendance);
  }

  markStaffAttendanceTime(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/mark-attendance-time`, requestBody);
  }

  // Mark the leave time for a staff member
  markStaffLeaveTime(requestBody: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/mark-leave-time`, requestBody);
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
