import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { EntrepriseService } from '../../../services/entreprise.service';
import { Entreprise, EntrepriseRequest } from '../../../models/entreprise';

@Component({
  selector: 'app-entreprise-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './entreprise-form.html'
})
export class EntrepriseForm implements OnInit {

  form: EntrepriseRequest = { nom: '' };
  isEdit = false;
  errorMessage = '';
  private editId?: number;

  constructor(
    private entrepriseService: EntrepriseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEdit = true;
      this.editId = +id;
      this.entrepriseService.getById(+id).subscribe((data: Entreprise) => {
        const { id: _, ...rest } = data;
        this.form = rest;
      });
    }
  }

  onSubmit(): void {
    this.errorMessage = '';
    const op = this.isEdit
      ? this.entrepriseService.update(this.editId!, this.form)
      : this.entrepriseService.create(this.form);

    op.subscribe({
      next: () => this.router.navigate(['/entreprises']),
      error: err => this.errorMessage = err.error?.message || 'Erreur lors de l\'enregistrement'
    });
  }
}
