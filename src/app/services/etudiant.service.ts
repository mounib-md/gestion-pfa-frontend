import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Etudiant, EtudiantRequest } from '../models/etudiant';

@Injectable({ providedIn: 'root' })
export class EtudiantService {

  private apiUrl = 'https://api-pfa-backend.onrender.com/api/etudiants';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(this.apiUrl);
  }

  getById(id: number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`${this.apiUrl}/${id}`);
  }

  create(dto: EtudiantRequest): Observable<Etudiant> {
    return this.http.post<Etudiant>(this.apiUrl, dto);
  }

  update(id: number, dto: EtudiantRequest): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.apiUrl}/${id}`, dto);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  search(motCle: string): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/search?motCle=${encodeURIComponent(motCle)}`);
  }

  getSansPFA(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.apiUrl}/sans-pfa`);
  }
}
