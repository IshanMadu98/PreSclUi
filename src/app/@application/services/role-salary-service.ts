import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RoleSalaryDto } from '../../@domain/RoleSalaryDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleSalaryService {
  private readonly apiUrl =  `${environment.apiUrl}/RoleSalary`;

  constructor(private http: HttpClient) {}

  getAllRoleSalaries(): Observable<RoleSalaryDto[]> {
    return this.http.get<RoleSalaryDto[]>(`${this.apiUrl}`);
  }

  getRoleSalaryById(id: string): Observable<RoleSalaryDto> {
    return this.http.get<RoleSalaryDto>(`${this.apiUrl}/${id}`);
  }

  addRoleSalary(roleSalary: RoleSalaryDto): Observable<RoleSalaryDto> {
    return this.http.post<RoleSalaryDto>(`${this.apiUrl}`, roleSalary);
  }

  updateRoleSalary(id: string, roleSalary: RoleSalaryDto): Observable<RoleSalaryDto> {
    return this.http.put<RoleSalaryDto>(`${this.apiUrl}/${id}`, roleSalary);
  }

  deleteRoleSalary(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
