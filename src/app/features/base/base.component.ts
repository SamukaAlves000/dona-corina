import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

const catStyle = (active: boolean) =>
  active
    ? 'display:flex;align-items:center;justify-content:space-between;padding:11px 14px;border-radius:10px;background:#eef0fe;margin-bottom:7px;cursor:pointer'
    : 'display:flex;align-items:center;justify-content:space-between;padding:11px 14px;border-radius:10px;background:#f7f8fc;margin-bottom:7px;cursor:pointer';

const countStyle = (active: boolean) =>
  active
    ? 'font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:#4f46e5;color:#fff'
    : 'font-size:11.5px;font-weight:800;padding:2px 8px;border-radius:999px;background:#e6e8f2;color:#6b7280';

interface BaseCat   { name: string; count: number; }
interface BaseNorma { title: string; date: string; }

@Component({
  selector: 'app-base',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './base.component.html',
  styleUrl: './base.component.scss',
})
export class BaseComponent {
  readonly activeTab = signal('Normas Regulamentadoras');
  readonly activeCat = signal('NRs Regulamentadoras');

  readonly tabs = ['Normas Regulamentadoras', 'Procedimentos', 'Laudos Técnicos', 'eSocial', 'Compliance'];

  readonly cats: BaseCat[] = [
    { name: 'NRs Regulamentadoras', count: 12 },
    { name: 'Procedimentos',         count: 8  },
    { name: 'Laudos Técnicos',       count: 5  },
    { name: 'eSocial',               count: 6  },
    { name: 'Compliance / ESG',      count: 4  },
  ];

  readonly normas: BaseNorma[] = [
    { title: 'NR-1 — Disposições Gerais e GRO',                                date: '10/01/2026' },
    { title: 'NR-6 — Equipamentos de Proteção Individual (EPI)',               date: '05/03/2026' },
    { title: 'NR-7 — PCMSO — Programa de Controle Médico',                    date: '18/04/2026' },
    { title: 'NR-9 — Avaliação e Controle das Exposições Ocupacionais',        date: '22/02/2026' },
    { title: 'NR-15 — Atividades e Operações Insalubres',                      date: '14/05/2026' },
    { title: 'NR-17 — Ergonomia',                                              date: '01/06/2026' },
  ];

  catStyle(name: string): string { return catStyle(this.activeCat() === name); }
  countStyle(name: string): string { return countStyle(this.activeCat() === name); }
  tabStyle(t: string): string {
    return this.activeTab() === t
      ? 'padding:9px 20px;font-size:13.5px;font-weight:700;background:#4f46e5;border:1.5px solid #4f46e5;color:#fff;border-radius:999px;cursor:pointer'
      : 'padding:9px 20px;font-size:13.5px;font-weight:700;background:#f3f4fb;border:1.5px solid #e6e8f2;color:#6b7280;border-radius:999px;cursor:pointer';
  }
}
