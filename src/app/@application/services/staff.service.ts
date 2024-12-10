import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StaffDto } from '../../@domain/StaffDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StaffService {
  private apiUrl = `${environment.apiUrl}/Staff`;

  constructor(private http: HttpClient) {}

  addStaff(staffDto: StaffDto): Observable<StaffDto> {
    return this.http.post<StaffDto>(`${this.apiUrl}`, staffDto);
  }

  getStaffById(id: string): Observable<StaffDto> {
    return this.http.get<StaffDto>(`${this.apiUrl}/${id}`);
  }

  getAllStaff(): Observable<StaffDto[]> {
    return this.http.get<StaffDto[]>(this.apiUrl);
  }

  updateStaff(id: string, staffDto: StaffDto): Observable<StaffDto> {
    return this.http.put<StaffDto>(`${this.apiUrl}/${id}`, staffDto);
  }

  deleteStaff(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
