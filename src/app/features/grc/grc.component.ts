import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

const ss = (bg: string, color: string) =>
  `font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${bg};color:${color}`;

const kc = (left: string) =>
  `background:#fff;border:1px solid #e9ebf3;border-left:4px solid ${left};border-radius:16px;padding:20px;box-shadow:0 1px 3px rgba(20,24,51,.05)`;

type Tab = 'painel' | 'gri' | 'mat';

@Component({
  selector: 'app-grc',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './grc.component.html',
  styleUrl: './grc.component.scss',
})
export class GrcComponent {
  readonly tabs: { key: Tab; label: string }[] = [
    { key: 'painel', label: 'Painel' },
    { key: 'gri',    label: 'GRI'    },
    { key: 'mat',    label: 'Materialidade' },
  ];

  readonly activeTab = signal<Tab>('painel');

  readonly grcKpis = [
    { cardStyle: kc('#4f46e5'), label: 'Riscos Identificados', value: '24' },
    { cardStyle: kc('#dc2626'), label: 'Risco Crítico',        value: '3'  },
    { cardStyle: kc('#f59e0b'), label: 'Controles Ativos',     value: '18' },
    { cardStyle: kc('#16a34a'), label: 'Score GRC',            value: '71' },
  ];

  readonly esgPillars = [
    {
      tag: 'E', tagStyle: 'font-size:13px;font-weight:800;padding:4px 10px;border-radius:8px;background:#f0fdf4;color:#166534',
      score: '68%', title: 'Ambiental',
      items: [
        { label: 'Licenças ambientais', val: '12 válidas' },
        { label: 'Condicionantes',       val: '47 total'   },
        { label: 'Emissões monitoradas', val: '6 fontes'   },
      ],
    },
    {
      tag: 'S', tagStyle: 'font-size:13px;font-weight:800;padding:4px 10px;border-radius:8px;background:#eff6ff;color:#1d4ed8',
      score: '71%', title: 'Social',
      items: [
        { label: 'Conformidade SST',     val: '87%'        },
        { label: 'PCMSO em dia',         val: '8 clientes' },
        { label: 'Treinamentos NR',      val: '94% upd'    },
      ],
    },
    {
      tag: 'G', tagStyle: 'font-size:13px;font-weight:800;padding:4px 10px;border-radius:8px;background:#faf5ff;color:#7c3aed',
      score: '62%', title: 'Governança',
      items: [
        { label: 'RBAC configurado',     val: '5 perfis'   },
        { label: 'Auditoria LGPD',       val: 'Conforme'   },
        { label: 'Comitê ESG',           val: 'Em formação'},
      ],
    },
  ];

  readonly griRows = [
    { code: 'GRI 2-1',  ind: 'Detalhes Organizacionais',        tema: 'Identificação da organização',  resp: 'Melqui', evid: 'Contrato Social',  statusStyle: ss('#f0fdf4','#166534'), status: 'Evidenciado', pag: 'p.4'  },
    { code: 'GRI 2-6',  ind: 'Atividades, cadeia de valor e relações', tema: 'Modelo de negócio',    resp: 'Melqui', evid: 'Rel. Anual',        statusStyle: ss('#eff6ff','#1d4ed8'), status: 'Em preench.', pag: 'p.7'  },
    { code: 'GRI 3-3',  ind: 'Gestão de temas materiais',       tema: 'Materialidade dupla',           resp: 'SESMT',  evid: 'Matriz',           statusStyle: ss('#fffbeb','#92400e'), status: 'Parcial',     pag: 'p.12' },
    { code: 'GRI 403-1',ind: 'Sistema de gestão de SST',        tema: 'Saúde e Segurança',             resp: 'SESMT',  evid: 'PGR/GRO',          statusStyle: ss('#f0fdf4','#166534'), status: 'Evidenciado', pag: 'p.18' },
    { code: 'GRI 403-9',ind: 'Lesões relacionadas ao trabalho', tema: 'Saúde e Segurança',             resp: 'SESMT',  evid: 'CAT / eSocial',    statusStyle: ss('#f0fdf4','#166534'), status: 'Evidenciado', pag: 'p.21' },
    { code: 'GRI 305-1',ind: 'Emissões de GEE — Escopo 1',     tema: 'Emissões',                      resp: 'Ambiental', evid: 'Inv. de emissões', statusStyle: ss('#fef2f2','#dc2626'), status: 'Pendente',    pag: '—'    },
    { code: 'GRI 401-1',ind: 'Contratação e rotatividade',      tema: 'Emprego',                       resp: 'RH',     evid: 'Folha de ponto',   statusStyle: ss('#fffbeb','#92400e'), status: 'Parcial',     pag: 'p.28' },
  ];

  readonly matPoints = [
    { dotStyle: 'position:absolute;left:70%;bottom:75%;width:14px;height:14px;border-radius:50%;background:#dc2626;cursor:pointer;transform:translate(-50%,50%)', labelStyle: 'position:absolute;top:-18px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:9px;font-weight:700;color:#dc2626', label: 'SST' },
    { dotStyle: 'position:absolute;left:55%;bottom:60%;width:12px;height:12px;border-radius:50%;background:#4f46e5;cursor:pointer;transform:translate(-50%,50%)', labelStyle: 'position:absolute;top:-18px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:9px;font-weight:700;color:#4f46e5', label: 'LGPD' },
    { dotStyle: 'position:absolute;left:80%;bottom:55%;width:11px;height:11px;border-radius:50%;background:#f59e0b;cursor:pointer;transform:translate(-50%,50%)', labelStyle: 'position:absolute;top:-18px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:9px;font-weight:700;color:#d97706', label: 'Ambiental' },
    { dotStyle: 'position:absolute;left:40%;bottom:45%;width:10px;height:10px;border-radius:50%;background:#16a34a;cursor:pointer;transform:translate(-50%,50%)', labelStyle: 'position:absolute;top:-18px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:9px;font-weight:700;color:#16a34a', label: 'GRI 2' },
    { dotStyle: 'position:absolute;left:65%;bottom:30%;width:9px;height:9px;border-radius:50%;background:#9333ea;cursor:pointer;transform:translate(-50%,50%)', labelStyle: 'position:absolute;top:-18px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:9px;font-weight:700;color:#9333ea', label: 'Governança' },
    { dotStyle: 'position:absolute;left:30%;bottom:70%;width:9px;height:9px;border-radius:50%;background:#0369a1;cursor:pointer;transform:translate(-50%,50%)', labelStyle: 'position:absolute;top:-18px;left:50%;transform:translateX(-50%);white-space:nowrap;font-size:9px;font-weight:700;color:#0369a1', label: 'Inovação' },
  ];

  readonly matThemes = [
    { dotStyle: 'width:10px;height:10px;border-radius:50%;background:#dc2626;flex-shrink:0', label: 'Saúde e Segurança do Trabalho', relStyle: 'font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:#fef2f2;color:#dc2626', rel: 'Crítico' },
    { dotStyle: 'width:10px;height:10px;border-radius:50%;background:#4f46e5;flex-shrink:0', label: 'Proteção de Dados e LGPD', relStyle: 'font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:#eef0fe;color:#4f46e5', rel: 'Alto' },
    { dotStyle: 'width:10px;height:10px;border-radius:50%;background:#f59e0b;flex-shrink:0', label: 'Gestão Ambiental e Licenciamento', relStyle: 'font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:#fffbeb;color:#d97706', rel: 'Alto' },
    { dotStyle: 'width:10px;height:10px;border-radius:50%;background:#16a34a;flex-shrink:0', label: 'Relatório GRI e Sustentabilidade', relStyle: 'font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:#f0fdf4;color:#16a34a', rel: 'Médio' },
    { dotStyle: 'width:10px;height:10px;border-radius:50%;background:#9333ea;flex-shrink:0', label: 'Governança Corporativa e ESG', relStyle: 'font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:#faf5ff;color:#9333ea', rel: 'Médio' },
    { dotStyle: 'width:10px;height:10px;border-radius:50%;background:#0369a1;flex-shrink:0', label: 'Inovação e Transformação Digital', relStyle: 'font-size:11px;font-weight:800;padding:2px 8px;border-radius:6px;background:#f0f9ff;color:#0369a1', rel: 'Baixo' },
  ];
}
