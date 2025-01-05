import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SalaryDto } from '../../@domain/SalaryDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private readonly apiUrl =  `${environment.apiUrl}/Salary`;

  constructor(private http: HttpClient) {}

  getAllSalaries(): Observable<SalaryDto[]> {
    return this.http.get<SalaryDto[]>(`${this.apiUrl}`);
  }

  getSalaryById(id: string): Observable<SalaryDto> {
    return this.http.get<SalaryDto>(`${this.apiUrl}/${id}`);
  }

  addSalary(staffId: string): Observable<SalaryDto> {
    return this.http.post<SalaryDto>(`${this.apiUrl}/${staffId}`, {});
  }

  updateSalary(id: string, salary: SalaryDto): Observable<SalaryDto> {
    return this.http.put<SalaryDto>(`${this.apiUrl}/${id}`, salary);
  }

  // New method to get salaries by month and year
  getSalariesByMonth(year: number, month: number): Observable<SalaryDto[]> {
    return this.http.get<SalaryDto[]>(`${this.apiUrl}/month/${year}/${month}`);
  }

  deleteSalary(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
