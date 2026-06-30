import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';

const pStyle = (bg: string, color: string) =>
  `font-size:11px;font-weight:800;padding:3px 9px;border-radius:999px;background:${bg};color:${color}`;

const bStyle = (bg: string, color: string) =>
  `font-size:11.5px;font-weight:700;padding:2px 8px;border-radius:6px;background:${bg};color:${color}`;

interface AcaoRow {
  num: string;
  acao: string;
  resp: string;
  prazo: string;
  evid: string;
  prio: string;
  prioStyle: string;
  risco: string;
  riscoStyle: string;
  status: string;
  statusStyle: string;
  progText: string;
  fillStyle: string;
}

export type FilterTab = 'Todos' | 'Em Aberto' | 'Em Andamento' | 'Concluído' | 'Atrasado';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CommonModule, KpiCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './planos.component.html',
  styleUrls: ['./planos.component.scss'],
})
export class PlanosComponent {
  readonly kpis = [
    { label: 'Ações em Aberto',  value: '18',  color: '#f59e0b' },
    { label: 'Ações Concluídas', value: '34',  color: '#16a34a' },
    { label: 'Ações Atrasadas',  value: '5',   color: '#e5484d' },
    { label: '% Eficácia',       value: '87%', color: '#4f46e5' },
  ];

  readonly rows: AcaoRow[] = [
    {
      num: '#001',
      acao: 'Instalar protetores auditivos linha 3',
      resp: 'Eng. Carlos',
      prazo: '30/07/2026',
      evid: 'CA/INMETRO',
      prio: 'CRÍTICA',
      prioStyle: pStyle('#fef2f2', '#991b1b'),
      risco: 'Alto',
      riscoStyle: bStyle('#fee2e2', '#dc2626'),
      status: 'Em Andamento',
      statusStyle: bStyle('#eff6ff', '#1d4ed8'),
      progText: '45%',
      fillStyle: 'height:100%;width:45%;background:#4f46e5;border-radius:999px',
    },
    {
      num: '#002',
      acao: 'Atualizar PCMSO — exames em atraso',
      resp: 'Dr. Souza',
      prazo: '15/07/2026',
      evid: 'ASO / Clínica',
      prio: 'ALTA',
      prioStyle: pStyle('#fff7ed', '#92400e'),
      risco: 'Médio',
      riscoStyle: bStyle('#fffbeb', '#d97706'),
      status: 'Em Aberto',
      statusStyle: bStyle('#fefce8', '#713f12'),
      progText: '10%',
      fillStyle: 'height:100%;width:10%;background:#f59e0b;border-radius:999px',
    },
    {
      num: '#003',
      acao: 'Sinalizar rota de fuga galpão B',
      resp: 'Técnico Silva',
      prazo: '10/07/2026',
      evid: 'Foto/Laudo',
      prio: 'MÉDIA',
      prioStyle: pStyle('#fefce8', '#713f12'),
      risco: 'Baixo',
      riscoStyle: bStyle('#f0fdf4', '#166534'),
      status: 'Concluído',
      statusStyle: bStyle('#f0fdf4', '#166534'),
      progText: '100%',
      fillStyle: 'height:100%;width:100%;background:#16a34a;border-radius:999px',
    },
    {
      num: '#004',
      acao: 'Adequar laudos NR-15 Anexo 11',
      resp: 'Eng. Lima',
      prazo: '20/08/2026',
      evid: 'Laudo acústico',
      prio: 'ALTA',
      prioStyle: pStyle('#fff7ed', '#92400e'),
      risco: 'Alto',
      riscoStyle: bStyle('#fee2e2', '#dc2626'),
      status: 'Em Aberto',
      statusStyle: bStyle('#fefce8', '#713f12'),
      progText: '0%',
      fillStyle: 'height:100%;width:0%;background:#e5484d;border-radius:999px',
    },
    {
      num: '#005',
      acao: 'Implementar DDS semanal — NR-01',
      resp: 'SESMT',
      prazo: '01/07/2026',
      evid: 'Ata assinada',
      prio: 'MÉDIA',
      prioStyle: pStyle('#fefce8', '#713f12'),
      risco: 'Baixo',
      riscoStyle: bStyle('#f0fdf4', '#166534'),
      status: 'Atrasado',
      statusStyle: bStyle('#fef2f2', '#dc2626'),
      progText: '65%',
      fillStyle: 'height:100%;width:65%;background:#e5484d;border-radius:999px',
    },
  ];
}
