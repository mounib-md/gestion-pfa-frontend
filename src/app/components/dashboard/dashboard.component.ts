import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EtudiantService } from '../../services/etudiant.service';
import { EncadrantService } from '../../services/encadrant.service';
import { EntrepriseService } from '../../services/entreprise.service';
import { PfaService } from '../../services/pfa.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html'
})
export class DashboardComponent implements OnInit {

  nbEtudiants = 0;
  nbEncadrants = 0;
  nbEntreprises = 0;
  nbPfas = 0;
  pfaStats: any = {};

  constructor(
    private etudiantService: EtudiantService,
    private encadrantService: EncadrantService,
    private entrepriseService: EntrepriseService,
    private pfaService: PfaService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.etudiantService.getAll().subscribe(data => {
      this.nbEtudiants = data.length;
      this.cdr.detectChanges();
    });
    this.encadrantService.getAll().subscribe(data => {
      this.nbEncadrants = data.length;
      this.cdr.detectChanges();
    });
    this.entrepriseService.getAll().subscribe(data => {
      this.nbEntreprises = data.length;
      this.cdr.detectChanges();
    });
    this.pfaService.getAll().subscribe(data => {
      this.nbPfas = data.length;
      this.cdr.detectChanges();
    });
    this.pfaService.getStats().subscribe(data => {
      this.pfaStats = data;
      this.cdr.detectChanges();
    });
  }

  getStatutBadgeClass(statut: string | number | symbol): string {
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
