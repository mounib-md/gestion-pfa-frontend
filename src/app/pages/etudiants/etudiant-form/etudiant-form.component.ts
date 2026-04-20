import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { EtudiantService } from '../../../services/etudiant.service';
import { Etudiant, EtudiantRequest } from '../../../models/etudiant';

@Component({
  selector: 'app-etudiant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './etudiant-form.html'
})
export class EtudiantFormComponent implements OnInit {

  form: EtudiantRequest = { nom: '', prenom: '', email: '', niveau: '' };
  isEdit = false;
  errorMessage = '';
  private editId?: number;

  constructor(
    private etudiantService: EtudiantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.editId = +id;
      this.etudiantService.getById(+id).subscribe((data: Etudiant) => {
        // Copier uniquement les champs du RequestDTO
        this.form = {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          cin: data.cin,
          numInscription: data.numInscription,
          telephone: data.telephone,
          niveau: data.niveau,
          specialite: data.specialite,
          groupe: data.groupe
        };
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    const op = this.isEdit
      ? this.etudiantService.update(this.editId!, this.form)
      : this.etudiantService.create(this.form);

    op.subscribe({
      next: () => this.router.navigate(['/etudiants']),
      error: err => this.errorMessage = err.error?.message || 'Erreur lors de l\'enregistrement'
    });
  }
}
