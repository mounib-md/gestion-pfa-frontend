import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EncadrantService } from '../../../services/encadrant.service';
import { Encadrant } from '../../../models/encadrant';

@Component({
  selector: 'app-encadrant-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './encadrant-list.html'
})
export class EncadrantList implements OnInit {

  encadrants: Encadrant[] = [];
  searchTerm = '';

  constructor(private encadrantService: EncadrantService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.encadrantService.getAll().subscribe(data => { this.encadrants = data; this.cdr.detectChanges(); });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.encadrantService.search(this.searchTerm).subscribe(data => { this.encadrants = data; this.cdr.detectChanges(); });
    } else {
      this.load();
    }
  }

  isDisponible(e: Encadrant): boolean {
    return e.quotaMax == null || (e.nombrePfaEncadres ?? 0) < e.quotaMax;
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.encadrantService.delete(id).subscribe(() => this.load());
    }
  }
}
