import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { EncadrantService } from '../../../services/encadrant.service';
import { Encadrant, EncadrantRequest } from '../../../models/encadrant';

@Component({
  selector: 'app-encadrant-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './encadrant-form.html'
})
export class EncadrantForm implements OnInit {

  form: EncadrantRequest = { nom: '', prenom: '', email: '' };
  isEdit = false;
  errorMessage = '';
  private editId?: number;

  constructor(
    private encadrantService: EncadrantService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.editId = +id;
      this.encadrantService.getById(+id).subscribe((data: Encadrant) => {
        this.form = {
          nom: data.nom,
          prenom: data.prenom,
          email: data.email,
          telephone: data.telephone,
          grade: data.grade,
          specialite: data.specialite,
          departement: data.departement,
          quotaMax: data.quotaMax
        };
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    const op = this.isEdit
      ? this.encadrantService.update(this.editId!, this.form)
      : this.encadrantService.create(this.form);

    op.subscribe({
      next: () => this.router.navigate(['/encadrants']),
      error: err => this.errorMessage = err.error?.message || 'Erreur lors de l\'enregistrement'
    });
  }
}
