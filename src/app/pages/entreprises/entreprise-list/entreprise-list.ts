import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EntrepriseService } from '../../../services/entreprise.service';
import { Entreprise } from '../../../models/entreprise';

@Component({
  selector: 'app-entreprise-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './entreprise-list.html'
})
export class EntrepriseList implements OnInit {

  entreprises: Entreprise[] = [];
  searchTerm = '';

  constructor(private entrepriseService: EntrepriseService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.entrepriseService.getAll().subscribe(data => { this.entreprises = data; this.cdr.detectChanges(); });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.entrepriseService.search(this.searchTerm).subscribe(data => { this.entreprises = data; this.cdr.detectChanges(); });
    } else {
      this.load();
    }
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.entrepriseService.delete(id).subscribe(() => this.load());
    }
  }
}
