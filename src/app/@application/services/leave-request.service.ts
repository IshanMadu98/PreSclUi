import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveRequestDto } from '../../@domain/LeaveRequestDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class LeaveRequestService {
  private apiUrl = `${environment.apiUrl}/LeaveRequests`;

  constructor(private http: HttpClient) {}

  getAllLeaveRequests(): Observable<LeaveRequestDto[]> {
    return this.http.get<LeaveRequestDto[]>(`${this.apiUrl}`);
  }

  getLeaveRequestById(id: string): Observable<LeaveRequestDto> {
    return this.http.get<LeaveRequestDto>(`${this.apiUrl}/${id}`);
  }

  createLeaveRequest(dto: LeaveRequestDto): Observable<LeaveRequestDto> {
    return this.http.post<LeaveRequestDto>(this.apiUrl, dto);
  }

  updateLeaveRequest(id: string, dto: LeaveRequestDto): Observable<LeaveRequestDto> {
    return this.http.put<LeaveRequestDto>(`${this.apiUrl}/${id}`, dto);
  }

  deleteLeaveRequest(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  approveOrRejectLeave(id: string, status: number, approvedBy: string): Observable<LeaveRequestDto> {
    return this.http.put<LeaveRequestDto>(`${this.apiUrl}/approve-reject`, {
      id,
      status,
      approvedBy,
    });
  }
}
