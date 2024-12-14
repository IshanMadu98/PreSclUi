import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PaymentDto } from '../../@domain/PaymentDto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  private apiUrl = `${environment.apiUrl}/Payment`;  // Adjust the API base URL

  constructor(private http: HttpClient) {}

  /**
   * Get all payments from the server
   */
  getAllPayments(): Observable<PaymentDto[]> {
    return this.http.get<PaymentDto[]>(this.apiUrl);
  }

  /**
   * Add a new payment
   */
  addPayment(payment: PaymentDto): Observable<PaymentDto> {
    return this.http.post<PaymentDto>(this.apiUrl, payment);
  }

  /**
   * Update an existing payment
   */
  updatePayment(payment: PaymentDto): Observable<PaymentDto> {
    return this.http.put<PaymentDto>(`${this.apiUrl}/${payment.id}`, payment);
  }

  /**
   * Delete a payment by ID
   */
  deletePayment(paymentId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${paymentId}`);
  }
}
