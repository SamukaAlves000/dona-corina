import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

const fill = (w: string, bg: string) =>
  `height:100%;width:${w};background:${bg};border-radius:999px`;

const dot = (bg: string) =>
  `width:10px;height:10px;border-radius:50%;background:${bg};flex-shrink:0`;

const dateStyle = (bg: string, color: string) =>
  `font-size:12px;font-weight:800;padding:4px 12px;border-radius:999px;background:${bg};color:${color}`;

const kpiCard = (borderColor: string) =>
  `background:#fff;border:1px solid #e9ebf3;border-left:4px solid ${borderColor};border-radius:16px;padding:20px;box-shadow:0 1px 3px rgba(20,24,51,.05)`;

@Component({
  selector: 'app-ambiental',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './ambiental.component.html',
  styleUrl: './ambiental.component.scss',
})
export class AmbientalComponent {
  readonly ambKpis = [
    { cardStyle: kpiCard('#16a34a'), label: 'Licenças Válidas',     value: '12' },
    { cardStyle: kpiCard('#f59e0b'), label: 'A Vencer (30 dias)',   value: '3'  },
    { cardStyle: kpiCard('#dc2626'), label: 'Licenças Vencidas',    value: '1'  },
    { cardStyle: kpiCard('#4f46e5'), label: 'Condicionantes',       value: '47' },
  ];

  readonly licBars = [
    { label: 'Licença Prévia (LP)',        fillStyle: fill('33%','#4f46e5'), val: '4' },
    { label: 'Licença de Instalação (LI)', fillStyle: fill('42%','#16a34a'), val: '5' },
    { label: 'Licença de Operação (LO)',   fillStyle: fill('25%','#f59e0b'), val: '3' },
  ];

  readonly condBars = [
    { label: 'Cumpridas',  fillStyle: fill('66%','#16a34a'), val: '31' },
    { label: 'Pendentes',  fillStyle: fill('19%','#f59e0b'), val: '9'  },
    { label: 'Atrasadas',  fillStyle: fill('15%','#dc2626'), val: '7'  },
  ];

  readonly agenda = [
    { dotStyle: dot('#dc2626'), text: 'Renovação LO — Itaús do Vale Ltda (SEMAD-MG)',     dateStyle: dateStyle('#fef2f2','#dc2626'), date: '24/06/2026' },
    { dotStyle: dot('#f59e0b'), text: 'Entrega Relatório Ambiental Anual (IBAMA)',          dateStyle: dateStyle('#fffbeb','#d97706'), date: '15/07/2026' },
    { dotStyle: dot('#4f46e5'), text: 'Vistoria de renovação LI — Metalúrgica X (CETESB)', dateStyle: dateStyle('#eef0fe','#4f46e5'), date: '10/08/2026' },
  ];
}
