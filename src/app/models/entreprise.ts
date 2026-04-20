// DTO reçu du backend (GET)
export interface Entreprise {
  id?: number;
  nom: string;
  secteur?: string;
  adresse?: string;
  ville?: string;
  pays?: string;
  telephone?: string;
  email?: string;
  siteWeb?: string;
  nomTuteur?: string;
  prenomTuteur?: string;
  emailTuteur?: string;
  telephoneTuteur?: string;
  fonctionTuteur?: string;
}

// DTO envoyé au backend (POST/PUT) — identique ici
export type EntrepriseRequest = Omit<Entreprise, 'id'>;
