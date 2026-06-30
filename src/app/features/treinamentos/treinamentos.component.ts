import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

const ss = (bg: string, color: string) =>
  `font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${bg};color:${color}`;

const kpiCard = (bl: string) =>
  `background:#fff;border:1px solid #e9ebf3;border-left:3px solid ${bl};border-radius:14px;padding:18px;box-shadow:0 1px 3px rgba(20,24,51,.05)`;

interface TreinaRow {
  nome: string; nr: string; cargo: string; realizado: string;
  vencimento: string; statusStyle: string; status: string;
}

@Component({
  selector: 'app-treinamentos',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './treinamentos.component.html',
  styleUrl: './treinamentos.component.scss',
})
export class TreinamentosComponent {
  readonly treinaKpis = [
    { cardStyle: kpiCard('#4f46e5'), label: 'Treinamentos Ativos',   value: '24'  },
    { cardStyle: kpiCard('#16a34a'), label: 'Colaboradores em Dia',  value: '138' },
    { cardStyle: kpiCard('#f59e0b'), label: 'A Vencer (30 dias)',    value: '12'  },
    { cardStyle: kpiCard('#e5484d'), label: 'Vencidos',              value: '7'   },
  ];

  readonly treinaRows: TreinaRow[] = [
    { nome: 'NR-35 — Trabalho em Altura',         nr: 'NR-35', cargo: 'Soldador',    realizado: '10/03/2026', vencimento: 'Jul/2026', statusStyle: ss('#fffbeb','#92400e'), status: 'A Vencer' },
    { nome: 'NR-33 — Espaço Confinado',           nr: 'NR-33', cargo: 'Técnico',     realizado: '15/01/2026', vencimento: 'Set/2026', statusStyle: ss('#f0fdf4','#166534'), status: 'Em Dia'   },
    { nome: 'NR-10 — Segurança Elétrica',         nr: 'NR-10', cargo: 'Eletricista', realizado: '05/12/2025', vencimento: 'Jun/2026', statusStyle: ss('#fef2f2','#dc2626'), status: 'Vencido'  },
    { nome: 'NR-06 — Uso de EPI',                 nr: 'NR-06', cargo: 'Todos',       realizado: '20/04/2026', vencimento: 'Out/2026', statusStyle: ss('#f0fdf4','#166534'), status: 'Em Dia'   },
    { nome: 'NR-20 — Inflamáveis e Líquidos',     nr: 'NR-20', cargo: 'Operador',    realizado: '02/02/2026', vencimento: 'Ago/2026', statusStyle: ss('#fffbeb','#92400e'), status: 'A Vencer' },
    { nome: 'NR-12 — Máquinas e Equipamentos',    nr: 'NR-12', cargo: 'Operador',    realizado: '10/10/2025', vencimento: 'Mai/2026', statusStyle: ss('#fef2f2','#dc2626'), status: 'Vencido'  },
  ];
}
