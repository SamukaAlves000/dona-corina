import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

const ss = (bg: string, color: string) =>
  `font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:${bg};color:${color}`;

const bar = (w: string, bg: string) =>
  `height:100%;width:${w};background:${bg};border-radius:999px`;

export interface DocsGerRow {
  id: number;
  doc: string;
  tipo: string;
  resp: string;
  barStyle: string;
  pct: string;
  statusStyle: string;
  status: string;
  pend: string;
  falta: string;
}

@Component({
  selector: 'app-docsger',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './docsger.component.html',
  styleUrls: ['./docsger.component.scss'],
})
export class DocsgerComponent {
  readonly docFlow = ['PGR · GRO', 'LTCAT', 'PCMSO', 'PPP', 'Laudo NR-15', 'Laudo NR-17', 'Rel. Ambiental', 'Matriz GRI'];

  readonly docs: DocsGerRow[] = [
    { id: 1, doc: 'PGR',            tipo: 'SST · NR-01',  resp: 'Eng. Melqui', barStyle: bar('72%','#4f46e5'),  pct: '72%',  statusStyle: ss('#eff6ff','#1d4ed8'), status: 'Em andamento',    pend: '3 seções pendentes', falta: '2 campos ausentes' },
    { id: 2, doc: 'LTCAT',          tipo: 'SST · NR-15',  resp: 'Dr. Souza',   barStyle: bar('55%','#f59e0b'),  pct: '55%',  statusStyle: ss('#fffbeb','#92400e'), status: 'Aguard. revisão', pend: '1 campo pendente',   falta: '1 ausente'         },
    { id: 3, doc: 'PCMSO',          tipo: 'SST · NR-7',   resp: 'Dr. Souza',   barStyle: bar('100%','#16a34a'), pct: '100%', statusStyle: ss('#f0fdf4','#166534'), status: 'Aprovado',         pend: '—',                  falta: ''                  },
    { id: 4, doc: 'Rel. Ambiental', tipo: 'Ambiental',    resp: 'Eng. Lima',   barStyle: bar('88%','#16a34a'),  pct: '88%',  statusStyle: ss('#f0fdf4','#166534'), status: 'Aprovado',         pend: '—',                  falta: ''                  },
    { id: 5, doc: 'Matriz GRI',     tipo: 'ESG · GRI 2',  resp: 'Melqui',      barStyle: bar('30%','#9333ea'),  pct: '30%',  statusStyle: ss('#faf5ff','#7c3aed'), status: 'Rascunho',         pend: '8 seções pendentes', falta: '5 campos ausentes' },
  ];
}
