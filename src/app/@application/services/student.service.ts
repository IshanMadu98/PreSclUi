import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StudentDto } from '../../@domain/StudentDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = `${environment.apiUrl}/Student`;

  constructor(private http: HttpClient) {}

  addStudent(studentDto: StudentDto): Observable<StudentDto> {
    return this.http.post<StudentDto>(`${this.apiUrl}`, studentDto);
  }

  getStudentById(id: string): Observable<StudentDto> {
    return this.http.get<StudentDto>(`${this.apiUrl}/${id}`);
  }

  getAllStudents(): Observable<StudentDto[]> {
    return this.http.get<StudentDto[]>(this.apiUrl);
  }

  updateStudent(id: string, studentDto: StudentDto): Observable<StudentDto> {
    return this.http.put<StudentDto>(`${this.apiUrl}/${id}`, studentDto);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
