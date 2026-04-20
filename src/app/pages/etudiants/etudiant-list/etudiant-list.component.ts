import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EtudiantService } from '../../../services/etudiant.service';
import { Etudiant } from '../../../models/etudiant';

@Component({
  selector: 'app-etudiant-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './etudiant-list.html'
})
export class EtudiantListComponent implements OnInit {

  etudiants: Etudiant[] = [];
  searchTerm = '';

  constructor(private etudiantService: EtudiantService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants(): void {
    this.etudiantService.getAll().subscribe(data => { this.etudiants = data; this.cdr.detectChanges(); });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.etudiantService.search(this.searchTerm).subscribe(data => { this.etudiants = data; this.cdr.detectChanges(); });
    } else {
      this.loadEtudiants();
    }
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.etudiantService.delete(id).subscribe(() => this.loadEtudiants());
    }
  }
}
