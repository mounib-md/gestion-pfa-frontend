import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Entreprise, EntrepriseRequest } from '../models/entreprise';

@Injectable({ providedIn: 'root' })
export class EntrepriseService {

  private apiUrl = 'http://localhost:8081/api/entreprises';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(this.apiUrl);
  }

  getById(id: number): Observable<Entreprise> {
    return this.http.get<Entreprise>(`${this.apiUrl}/${id}`);
  }

  create(dto: EntrepriseRequest): Observable<Entreprise> {
    return this.http.post<Entreprise>(this.apiUrl, dto);
  }

  update(id: number, dto: EntrepriseRequest): Observable<Entreprise> {
    return this.http.put<Entreprise>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(motCle: string): Observable<Entreprise[]> {
    return this.http.get<Entreprise[]>(`${this.apiUrl}/search?motCle=${encodeURIComponent(motCle)}`);
  }
}
