import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7211/api/Auth';  // Replace with your actual API URL

  constructor(private http: HttpClient) {}

  // Method to handle login
  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { email, password });
  }

  // Optional: Method to get the current user (if you store user details in localStorage)
  getUserFromStorage() {
    return JSON.parse(localStorage.getItem('user') || '{}');
  }

  // Optional: Method to get the stored token (if you store token in localStorage)
  getTokenFromStorage() {
    return localStorage.getItem('token');
  }

  // Optional: Method to check if the user is logged in (based on the presence of a token)
  isLoggedIn() {
    return !!this.getTokenFromStorage();
  }

  // Optional: Method to log out the user (clear localStorage)
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
