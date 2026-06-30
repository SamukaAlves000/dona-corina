import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

const fill = (w: string, bg: string) =>
  `height:100%;width:${w};background:${bg};border-radius:999px`;

const ss = (bg: string, color: string) =>
  `font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${bg};color:${color}`;

const rs = (color: string) =>
  `font-size:13px;font-weight:700;color:${color}`;

@Component({
  selector: 'app-compliance',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './compliance.component.html',
  styleUrl: './compliance.component.scss',
})
export class ComplianceComponent {
  readonly matCards = [
    { label: 'Maturidade SST',    pctText: '71%', fillStyle: fill('71%','#f59e0b') },
    { label: 'Maturidade ESG',    pctText: '67%', fillStyle: fill('67%','#4f46e5') },
    { label: 'Conformidade LGPD', pctText: '88%', fillStyle: fill('88%','#16a34a') },
    { label: 'eSocial SST',       pctText: '94%', fillStyle: fill('94%','#16a34a') },
  ];

  readonly matriz = [
    { req: 'Inventário de Riscos',   norma: 'NR-01',     statusStyle: ss('#eff6ff','#1d4ed8'), status: 'Conforme',    riscoStyle: rs('#16a34a'), risco: 'Baixo'  },
    { req: 'Programa PCMSO',          norma: 'NR-7',      statusStyle: ss('#fffbeb','#92400e'), status: 'Parcial',     riscoStyle: rs('#d97706'), risco: 'Médio'  },
    { req: 'Laudos NR-15',            norma: 'NR-15',     statusStyle: ss('#fef2f2','#dc2626'), status: 'Pendente',    riscoStyle: rs('#dc2626'), risco: 'Alto'   },
    { req: 'Rel. Sustentabilidade',   norma: 'GRI 2',     statusStyle: ss('#eff6ff','#1d4ed8'), status: 'Em andamento',riscoStyle: rs('#d97706'), risco: 'Médio'  },
    { req: 'Tratamento de Dados',     norma: 'LGPD',      statusStyle: ss('#f0fdf4','#166534'), status: 'Conforme',    riscoStyle: rs('#16a34a'), risco: 'Baixo'  },
    { req: 'Eventos SST eSocial',     norma: 'IN RFB 2',  statusStyle: ss('#f0fdf4','#166534'), status: 'Conforme',    riscoStyle: rs('#16a34a'), risco: 'Baixo'  },
  ];

  readonly esgBars = [
    { label: 'Ambiental (E)', val: '68%', fillStyle: fill('68%','#16a34a') },
    { label: 'Social (S)',     val: '71%', fillStyle: fill('71%','#4f46e5') },
    { label: 'Governança (G)', val: '62%', fillStyle: fill('62%','#f59e0b') },
  ];
}
