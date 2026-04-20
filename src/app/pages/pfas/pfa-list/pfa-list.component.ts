import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PfaService } from '../../../services/pfa.service';
import { PFA } from '../../../models/pfa';

@Component({
  selector: 'app-pfa-list',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './pfa-list.html'
})
export class PfaListComponent implements OnInit {

  pfas: PFA[] = [];
  searchTerm = '';
  selectedStatut = '';

  constructor(
    private pfaService: PfaService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Lire le queryParam statut depuis le dashboard
    this.route.queryParams.subscribe(params => {
      if (params['statut']) {
        this.selectedStatut = params['statut'];
        this.pfaService.getByStatut(this.selectedStatut).subscribe(data => {
          this.pfas = data;
          this.cdr.detectChanges();
        });
      } else {
        this.loadPfas();
      }
    });
  }

  loadPfas(): void {
    this.pfaService.getAll().subscribe(data => { this.pfas = data; this.cdr.detectChanges(); });
  }

  onSearch(): void {
    if (this.searchTerm.trim()) {
      this.pfaService.search(this.searchTerm).subscribe(data => { this.pfas = data; this.cdr.detectChanges(); });
    } else {
      this.loadPfas();
    }
  }

  onFilterStatut(): void {
    if (this.selectedStatut) {
      this.pfaService.getByStatut(this.selectedStatut).subscribe(data => { this.pfas = data; this.cdr.detectChanges(); });
    } else {
      this.loadPfas();
    }
  }

  delete(id: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.pfaService.delete(id).subscribe(() => this.loadPfas());
    }
  }

  getStatutClass(statut: string): string {
    const classes: any = {
      'PROPOSE': 'bg-yellow-100 text-yellow-700',
      'VALIDE': 'bg-blue-100 text-blue-700',
      'EN_COURS': 'bg-purple-100 text-purple-700',
      'TERMINE': 'bg-green-100 text-green-700',
      'REFUSE': 'bg-red-100 text-red-700'
    };
    return classes[statut] || 'bg-gray-100 text-gray-700';
  }
}
