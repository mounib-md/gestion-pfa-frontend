import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EtudiantListComponent } from './pages/etudiants/etudiant-list/etudiant-list.component';
import { EtudiantFormComponent } from './pages/etudiants/etudiant-form/etudiant-form.component';
import { EncadrantList } from './pages/encadrants/encadrant-list/encadrant-list';
import { EncadrantForm } from './pages/encadrants/encadrant-form/encadrant-form';
import { EntrepriseList } from './pages/entreprises/entreprise-list/entreprise-list';
import { EntrepriseForm } from './pages/entreprises/entreprise-form/entreprise-form';
import { PfaListComponent } from './pages/pfas/pfa-list/pfa-list.component';
import { PfaForm } from './pages/pfas/pfa-form/pfa-form.component';
import { PfaDetailComponent } from './pages/pfas/pfa-detail/pfa-detail';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'etudiants', component: EtudiantListComponent },
  { path: 'etudiants/nouveau', component: EtudiantFormComponent },
  { path: 'etudiants/modifier/:id', component: EtudiantFormComponent },
  { path: 'encadrants', component: EncadrantList },
  { path: 'encadrants/nouveau', component: EncadrantForm },
  { path: 'encadrants/modifier/:id', component: EncadrantForm },
  { path: 'entreprises', component: EntrepriseList },
  { path: 'entreprises/nouveau', component: EntrepriseForm },
  { path: 'entreprises/modifier/:id', component: EntrepriseForm },
  { path: 'pfas', component: PfaListComponent },
  { path: 'pfas/nouveau', component: PfaForm },
  { path: 'pfas/modifier/:id', component: PfaForm },
  { path: 'pfas/:id', component: PfaDetailComponent },
  { path: '**', redirectTo: 'dashboard' }
];
