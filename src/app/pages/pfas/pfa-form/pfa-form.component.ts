import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { PfaService } from '../../../services/pfa.service';
import { EtudiantService } from '../../../services/etudiant.service';
import { EncadrantService } from '../../../services/encadrant.service';
import { EntrepriseService } from '../../../services/entreprise.service';
import { PFA, PFARequest } from '../../../models/pfa';
import { Etudiant } from '../../../models/etudiant';
import { Encadrant } from '../../../models/encadrant';
import { Entreprise } from '../../../models/entreprise';

@Component({
  selector: 'app-pfa-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './pfa-form.html'
})
export class PfaForm implements OnInit {

  form: PFARequest = {
    titre: '',
    type: '',
    anneeUniversitaire: '',
    etudiantId: 0,
    statut: 'PROPOSE'
  };

  etudiants: Etudiant[] = [];
  encadrants: Encadrant[] = [];
  entreprises: Entreprise[] = [];

  isEdit = false;
  loading = false;
  errorMessage = '';
  private editId?: number;

  constructor(
    private pfaService: PfaService,
    private etudiantService: EtudiantService,
    private encadrantService: EncadrantService,
    private entrepriseService: EntrepriseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Charger les listes en parallèle
    forkJoin({
      etudiants: this.etudiantService.getAll(),
      encadrants: this.encadrantService.getAll(),
      entreprises: this.entrepriseService.getAll()
    }).subscribe(({ etudiants, encadrants, entreprises }) => {
      this.etudiants = etudiants;
      this.encadrants = encadrants;
      this.entreprises = entreprises;
    });

    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.editId = +id;
      this.pfaService.getById(+id).subscribe((data: PFA) => {
        this.form = {
          titre: data.titre,
          description: data.description,
          type: data.type,
          statut: data.statut,
          anneeUniversitaire: data.anneeUniversitaire,
          dateDebut: data.dateDebut,
          dateFin: data.dateFin,
          technologies: data.technologies,
          etudiantId: data.etudiantId,
          encadrantId: data.encadrantId,
          entrepriseId: data.entrepriseId
        };
      });
    }
  }

  onTypeChange(): void {
    // Réinitialiser l'entreprise si on passe en mode académique
    if (this.form.type !== 'EN_ENTREPRISE') {
      this.form.entrepriseId = undefined;
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    if (!this.form.etudiantId) {
      this.errorMessage = 'Veuillez sélectionner un étudiant.';
      return;
    }

    this.loading = true;

    // Nettoyer les champs vides
    const payload: PFARequest = {
      ...this.form,
      encadrantId: this.form.encadrantId || undefined,
      entrepriseId: this.form.entrepriseId || undefined,
      dateDebut: this.form.dateDebut || undefined,
      dateFin: this.form.dateFin || undefined,
      description: this.form.description || undefined,
      technologies: this.form.technologies || undefined
    };

    const op = this.isEdit
      ? this.pfaService.update(this.editId!, payload)
      : this.pfaService.create(payload);

    op.subscribe({
      next: () => this.router.navigate(['/pfas']),
      error: err => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Erreur lors de l\'enregistrement';
      }
    });
  }
}
