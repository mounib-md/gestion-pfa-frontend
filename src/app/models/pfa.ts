export type PFAType = 'ACADEMIQUE' | 'EN_ENTREPRISE';
export type PFAStatut = 'PROPOSE' | 'VALIDE' | 'EN_COURS' | 'TERMINE' | 'REFUSE';

// DTO reçu du backend (GET)
export interface PFA {
  id?: number;
  titre: string;
  description?: string;
  type: PFAType | string;
  statut?: PFAStatut | string;
  anneeUniversitaire: string;
  dateDebut?: string;
  dateFin?: string;
  technologies?: string;
  cheminRapport?: string;
  note?: number;  // Double côté backend
  etudiantId: number;
  etudiantNom?: string;
  etudiantPrenom?: string;
  etudiantEmail?: string;
  encadrantId?: number;
  encadrantNom?: string;
  encadrantPrenom?: string;
  entrepriseId?: number;
  entrepriseNom?: string;
}

// DTO envoyé au backend (POST/PUT)
export interface PFARequest {
  titre: string;
  description?: string;
  type: PFAType | string;
  statut?: PFAStatut | string;
  anneeUniversitaire: string;
  dateDebut?: string;
  dateFin?: string;
  technologies?: string;
  etudiantId: number;
  encadrantId?: number;
  entrepriseId?: number;
}
