import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

const ss = (bg: string, color: string) =>
  `font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${bg};color:${color}`;

interface EpiRow { epi: string; ca: string; trab: string; data: string; statusStyle: string; status: string; }

@Component({
  selector: 'app-epi',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './epi.component.html',
  styleUrl: './epi.component.scss',
})
export class EpiComponent {
  readonly epiRows: EpiRow[] = [
    { epi: 'Protetor auricular',    ca: '12345', trab: 'João da Silva',  data: '18/06/2026', statusStyle: ss('#f0fdf4','#166534'), status: 'Válido'   },
    { epi: 'Máscara de solda',      ca: '67890', trab: 'Carlos Santos',  data: '10/06/2026', statusStyle: ss('#f0fdf4','#166534'), status: 'Válido'   },
    { epi: 'Luva de raspa',         ca: '54321', trab: 'Maria Oliveira', data: '01/06/2026', statusStyle: ss('#fffbeb','#92400e'), status: 'A Vencer' },
    { epi: 'Avental de raspa',      ca: '11111', trab: 'Pedro Ramos',    data: '15/04/2026', statusStyle: ss('#fef2f2','#dc2626'), status: 'Vencido'  },
    { epi: 'Óculos de proteção',    ca: '22222', trab: 'Ana Lima',       data: '20/06/2026', statusStyle: ss('#f0fdf4','#166534'), status: 'Válido'   },
  ];
}
