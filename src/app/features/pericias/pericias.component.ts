import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pericias',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './pericias.component.html',
  styleUrl: './pericias.component.scss',
})
export class PericiaComponent {
  readonly pericdocs = [
    'Petição inicial do reclamante',
    'Contestação da reclamada',
    'Documentos de segurança do trabalho',
    'Laudos de medições ambientais',
    'PPP — Perfil Profissiográfico Previdenciário',
  ];
}
