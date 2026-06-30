import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

const ps = (bg: string, color: string) =>
  `font-size:11px;font-weight:800;padding:3px 9px;border-radius:999px;background:${bg};color:${color}`;

const ss = (bg: string, color: string) =>
  `font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${bg};color:${color}`;

const kc = (left: string) =>
  `background:#fff;border:1px solid #e9ebf3;border-left:3px solid ${left};border-radius:16px;padding:16px 20px;box-shadow:0 1px 3px rgba(20,24,51,.05)`;

interface NormAlert { norma: string; fonte: string; data: string; tema: string; prioStyle: string; prio: string; resumo: string; mods: string; docs: string; }
interface NormVersion { norma: string; stStyle: string; st: string; ant: string; nova: string; data: string; impacto: string; aprov: string; }

@Component({
  selector: 'app-normas',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './normas.component.html',
  styleUrl: './normas.component.scss',
})
export class NormasComponent {
  readonly normKpis = [
    { cardStyle: kc('#4f46e5'), label: 'NRs Monitoradas',   value: '36' },
    { cardStyle: kc('#f59e0b'), label: 'Alertas Pendentes', value: '3'  },
    { cardStyle: kc('#16a34a'), label: 'Atualizadas (90d)', value: '5'  },
    { cardStyle: kc('#dc2626'), label: 'Impacto Alto',      value: '2'  },
    { cardStyle: kc('#7c3aed'), label: 'Fontes Ativas',     value: '18' },
    { cardStyle: kc('#0369a1'), label: 'Versão Atual',      value: 'v4.1' },
  ];

  readonly normAlerts: NormAlert[] = [
    { norma: 'NR-1 — Disposições Gerais e GRO',         fonte: 'DOU', data: '10/06/2026', tema: 'SST · Gestão de Riscos', prioStyle: ps('#fef2f2','#dc2626'), prio: 'URGENTE', resumo: 'Portaria MTE nº 612/2026 altera os prazos para elaboração do PGR e obriga a revisão anual do inventário de riscos em empresas de grau de risco 3 e 4.', mods: 'PGR, Auditoria, Planos', docs: 'PGR/GRO de todos os clientes' },
    { norma: 'NR-7 — PCMSO',                            fonte: 'DOU', data: '02/06/2026', tema: 'SST · Saúde Ocupacional', prioStyle: ps('#fffbeb','#d97706'), prio: 'ALTO',   resumo: 'Portaria MTE nº 598/2026 inclui novos exames complementares para exposição a agentes químicos e altera prazos de renovação do ASO.', mods: 'PCMSO, eSocial, Higiene', docs: 'PCMSO de 8 clientes'    },
    { norma: 'LGPD — Lei 13.709/2018 (Regulamentação)', fonte: 'ANPD', data: '15/05/2026', tema: 'Privacidade · Dados', prioStyle: ps('#fffbeb','#d97706'), prio: 'MÉDIO',  resumo: 'Resolução ANPD n.º 15/2026 detalha os requisitos técnicos para DPIA e retenção de dados de colaboradores.', mods: 'Admin, Config, Logs', docs: 'Políticas de Privacidade'     },
  ];

  readonly normSources = ['DOU','MTE','ABNT','ISO','ANPD','IBAMA','ANS','IBGE','ILO','CETESB','INMETRO','CNEN','CONAMA','GRI','ESOCIAL','ANVISA','TCU','NIT'];

  readonly normVersions: NormVersion[] = [
    { norma: 'NR-1', stStyle: ss('#f0fdf4','#166534'), st: 'Atualizada', ant: 'v3.2', nova: 'v3.3', data: '10/06/2026', impacto: 'Alto',  aprov: 'Eng. Melqui' },
    { norma: 'NR-7', stStyle: ss('#fffbeb','#92400e'), st: 'Pendente',   ant: 'v2.1', nova: 'v2.2', data: '02/06/2026', impacto: 'Alto',  aprov: '—'           },
    { norma: 'NR-15',stStyle: ss('#f0fdf4','#166534'), st: 'Atualizada', ant: 'v5.0', nova: 'v5.1', data: '12/05/2026', impacto: 'Alto',  aprov: 'Eng. Melqui' },
    { norma: 'LGPD', stStyle: ss('#fffbeb','#92400e'), st: 'Em revisão', ant: 'v1.3', nova: 'v1.4', data: '15/05/2026', impacto: 'Médio', aprov: '—'           },
  ];
}
