import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Event } from '../models/eventModel/event';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  private baseUrl = 'http://localhost:8080/employee';

  constructor(private http: HttpClient) {}

  getEventDetailById = (eventId: number): Observable<Event> => {
    return this.http.get<Event>(
      `${this.baseUrl}/getEventDetail?eventId=${eventId}`
    );
  };

  getIfEventAlreadyApplied = (
    eventId: number,
    userId: number
  ): Observable<boolean> => {
    return this.http.get<boolean>(
      `${this.baseUrl}/getIfEventAlreadyApplied?eventId=${eventId}&&custId=${userId}`
    );
  };

  applyToEvent = (eventId: number, userId: number): Observable<Event> => {
    return this.http.post<Event>(`${this.baseUrl}/applyToEvent`, {
      eventId: eventId,
      custId: userId,
    });
  };

  removeAppliedEvent = (
    eventId: number,
    userId: number
  ): Observable<string> => {
    return this.http.delete<string>(
      `${this.baseUrl}/removeAppliedEvent?eventId=${eventId}&&custId=${userId}`,
      { responseType: 'text' as 'json' }
    );
  };
}
