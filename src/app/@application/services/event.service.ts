import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EventDto } from '../../@domain/EventDto';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private apiUrl = `${environment.apiUrl}/Event`;

  constructor(private http: HttpClient) { }

  // Create Event
  createEvent(event: EventDto): Observable<EventDto> {
    return this.http.post<EventDto>(`${this.apiUrl}`, event);
  }

  // Get Event by ID
  getEventById(id: string): Observable<EventDto> {
    return this.http.get<EventDto>(`${this.apiUrl}/${id}`);
  }

  // Get All Events
  getAllEvents(): Observable<EventDto[]> {
    return this.http.get<EventDto[]>(`${this.apiUrl}`);
  }

  // Update Event
  updateEvent(event: EventDto): Observable<EventDto> {
    return this.http.put<EventDto>(`${this.apiUrl}`, event);
  }

  // Delete Event
  deleteEvent(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Send Manual Notification
  sendManualNotification(eventId: string, message: string, sendEmail: boolean, sendWhatsApp: boolean): Observable<any> {
    return this.http.post(`${this.apiUrl}/manual-notify`, {
      EventId: eventId,
      Message: message,
      SendEmail: sendEmail,
      SendWhatsApp: sendWhatsApp
    });
  }
}
