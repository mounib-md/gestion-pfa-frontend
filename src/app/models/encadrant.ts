export type Grade = 'ASSISTANT' | 'MAITRE_ASSISTANT' | 'MAITRE_CONFERENCE' | 'PROFESSEUR';

// DTO reçu du backend (GET)
export interface Encadrant {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  grade?: Grade | string;
  specialite?: string;
  departement?: string;
  quotaMax?: number;
  nombrePfaEncadres?: number;
}

// DTO envoyé au backend (POST/PUT)
export interface EncadrantRequest {
  nom: string;
  prenom: string;
  email: string;
  telephone?: string;
  grade?: Grade | string;
  specialite?: string;
  departement?: string;
  quotaMax?: number;
}
