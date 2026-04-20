import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PfaService } from '../../../services/pfa.service';
import { EncadrantService } from '../../../services/encadrant.service';
import { PFA } from '../../../models/pfa';
import { Encadrant } from '../../../models/encadrant';

@Component({
  selector: 'app-pfa-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './pfa-detail.html'
})
export class PfaDetailComponent implements OnInit {

  pfa: PFA | null = null;
  encadrants: Encadrant[] = [];
  selectedEncadrantId: number | null = null;
  noteValue: number | null = null;

  constructor(
    private pfaService: PfaService,
    private encadrantService: EncadrantService,
    private route: ActivatedRoute
  , private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.pfaService.getById(+id).subscribe(data => { this.pfa = data; this.cdr.detectChanges(); });
    this.encadrantService.getDisponibles().subscribe(data => { this.encadrants = data; this.cdr.detectChanges(); });
  }

  valider(): void {
    this.pfaService.valider(this.pfa!.id!).subscribe(data => { this.pfa = data; this.cdr.detectChanges(); });
  }

  changerStatut(statut: string): void {
    this.pfaService.changerStatut(this.pfa!.id!, statut).subscribe(data => { this.pfa = data; this.cdr.detectChanges(); });
  }

  affecterEncadrant(): void {
    if (this.selectedEncadrantId) {
      this.pfaService.affecterEncadrant(this.pfa!.id!, +this.selectedEncadrantId)
        .subscribe(data => { this.pfa = data; this.cdr.detectChanges(); });
    }
  }

  noter(): void {
    if (this.noteValue !== null) {
      this.pfaService.noter(this.pfa!.id!, this.noteValue).subscribe(data => { this.pfa = data; this.cdr.detectChanges(); });
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
