import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Encadrant, EncadrantRequest } from '../models/encadrant';

@Injectable({ providedIn: 'root' })
export class EncadrantService {

  private apiUrl = 'http://localhost:8081/api/encadrants';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Encadrant[]> {
    return this.http.get<Encadrant[]>(this.apiUrl);
  }

  getById(id: number): Observable<Encadrant> {
    return this.http.get<Encadrant>(`${this.apiUrl}/${id}`);
  }

  create(dto: EncadrantRequest): Observable<Encadrant> {
    return this.http.post<Encadrant>(this.apiUrl, dto);
  }

  update(id: number, dto: EncadrantRequest): Observable<Encadrant> {
    return this.http.put<Encadrant>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getDisponibles(): Observable<Encadrant[]> {
    return this.http.get<Encadrant[]>(`${this.apiUrl}/disponibles`);
  }

  search(motCle: string): Observable<Encadrant[]> {
    return this.http.get<Encadrant[]>(`${this.apiUrl}/search?motCle=${encodeURIComponent(motCle)}`);
  }
}
