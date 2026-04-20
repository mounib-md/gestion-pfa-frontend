export type Niveau = 'LICENSE_3' | 'INGENIEUR_1' | 'INGENIEUR_2' | 'INGENIEUR_3' | 'MASTER_1' | 'MASTER_2';
export type Groupe = 'A' | 'B' | 'C' | 'D';

// DTO reçu du backend (GET)
export interface Etudiant {
  id?: number;
  nom: string;
  prenom: string;
  email: string;
  cin?: string;
  numInscription?: string;
  telephone?: string;
  niveau: Niveau | string;
  specialite?: string;
  groupe?: Groupe | string;
  pfaId?: number;
  pfaTitre?: string;
}

// DTO envoyé au backend (POST/PUT)
export interface EtudiantRequest {
  nom: string;
  prenom: string;
  email: string;
  cin?: string;
  numInscription?: string;
  telephone?: string;
  niveau: Niveau | string;
  specialite?: string;
  groupe?: Groupe | string;
}
