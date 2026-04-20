import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PFA, PFARequest } from '../models/pfa';

@Injectable({ providedIn: 'root' })
export class PfaService {

  private apiUrl = 'https://api-pfa-backend.onrender.com/api/pfas';

  constructor(private http: HttpClient) {}

  getAll(): Observable<PFA[]> {
    return this.http.get<PFA[]>(this.apiUrl);
  }

  getById(id: number): Observable<PFA> {
    return this.http.get<PFA>(`${this.apiUrl}/${id}`);
  }

  create(dto: PFARequest): Observable<PFA> {
    return this.http.post<PFA>(this.apiUrl, dto);
  }

  update(id: number, dto: PFARequest): Observable<PFA> {
    return this.http.put<PFA>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByStatut(statut: string): Observable<PFA[]> {
    return this.http.get<PFA[]>(`${this.apiUrl}/statut/${statut}`);
  }

  getActifs(): Observable<PFA[]> {
    return this.http.get<PFA[]>(`${this.apiUrl}/actifs`);
  }

  getStats(): Observable<{ [key: string]: number }> {
    return this.http.get<{ [key: string]: number }>(`${this.apiUrl}/stats`);
  }

  valider(id: number): Observable<PFA> {
    return this.http.put<PFA>(`${this.apiUrl}/${id}/valider`, {});
  }

  affecterEncadrant(pfaId: number, encadrantId: number): Observable<PFA> {
    return this.http.put<PFA>(`${this.apiUrl}/${pfaId}/encadrant/${encadrantId}`, {});
  }

  affecterEntreprise(pfaId: number, entrepriseId: number): Observable<PFA> {
    return this.http.put<PFA>(`${this.apiUrl}/${pfaId}/entreprise/${entrepriseId}`, {});
  }

  changerStatut(id: number, statut: string): Observable<PFA> {
    return this.http.put<PFA>(`${this.apiUrl}/${id}/statut/${statut}`, {});
  }

  // Backend attend ?note= (Double)
  noter(id: number, note: number): Observable<PFA> {
    return this.http.put<PFA>(`${this.apiUrl}/${id}/note?note=${note}`, {});
  }

  search(motCle: string): Observable<PFA[]> {
    return this.http.get<PFA[]>(`${this.apiUrl}/search?motCle=${encodeURIComponent(motCle)}`);
  }
}
