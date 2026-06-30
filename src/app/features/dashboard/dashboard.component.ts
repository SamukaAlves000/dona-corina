import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { KpiCardComponent } from '../../shared/components/kpi-card/kpi-card.component';

interface Kpi {
  label: string;
  value: string;
  delta: string;
  borderColor: string;
  deltaColor: string;
  route: string;
}

interface Atividade {
  title: string;
  sub: string;
  time: string;
}

interface Alerta {
  text: string;
  dotColor: string;
}

interface AgendaItem {
  text: string;
  date: string;
  dotColor: string;
  badgeColor: string;
  badgeBg: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, KpiCardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  readonly today = signal<Date>(new Date());

  readonly todayLabel = computed(() => {
    return this.today().toLocaleDateString('pt-BR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  });

  readonly kpis = signal<Kpi[]>([
    {
      label: 'Documentos Gerados',
      value: '47',
      delta: '+12% vs mês anterior',
      borderColor: '#4f46e5',
      deltaColor: '#4f46e5',
      route: '/docsger',
    },
    {
      label: 'Auditorias Realizadas',
      value: '23',
      delta: '+8% vs mês anterior',
      borderColor: '#16a34a',
      deltaColor: '#16a34a',
      route: '/auditoria',
    },
    {
      label: 'Pendências',
      value: '12',
      delta: '+5% em aberto',
      borderColor: '#f59e0b',
      deltaColor: '#f59e0b',
      route: '/planos',
    },
    {
      label: 'Planos de Ação',
      value: '18',
      delta: '+3% ativos',
      borderColor: '#16a34a',
      deltaColor: '#16a34a',
      route: '/planos',
    },
  ]);

  readonly atividades = signal<Atividade[]>([
    { title: 'PGR Itaús', sub: 'Gerado por Melqui · Documento finalizado', time: '2h atrás' },
    { title: 'LTCAT Metalúrgica X', sub: 'Em revisão · Aguardando aprovação', time: '5h atrás' },
    { title: 'PCMSO Transportes', sub: 'Gerado por Corina · IA finalizada', time: 'Ontem' },
    { title: 'Rel. Ambiental', sub: 'Novo upload · Dados importados', time: '2 dias atrás' },
  ]);

  readonly alertas = signal<Alerta[]>([
    { text: 'Vencimento de PPRA em 3 empresas esta semana', dotColor: '#ef4444' },
    { text: 'Laudos pendentes de assinatura (5)', dotColor: '#f59e0b' },
    { text: 'Atualização da NR-15 publicada ontem', dotColor: '#4f46e5' },
    { text: 'eSocial: prazo de envio em 2 dias', dotColor: '#ef4444' },
  ]);

  readonly agenda = signal<AgendaItem[]>([
    {
      text: 'Revisão periódica do PCMSO — Empresa Alfa',
      date: '30 Jun 2026',
      dotColor: '#4f46e5',
      badgeColor: '#4f46e5',
      badgeBg: '#eef0fe',
    },
    {
      text: 'Entrega do LTCAT — Metalúrgica X',
      date: '05 Jul 2026',
      dotColor: '#16a34a',
      badgeColor: '#16a34a',
      badgeBg: '#f0fdf4',
    },
    {
      text: 'Vencimento de Licença Ambiental — Beta Ind.',
      date: '12 Jul 2026',
      dotColor: '#f59e0b',
      badgeColor: '#92400e',
      badgeBg: '#fffbeb',
    },
    {
      text: 'Auditoria interna SST — Transportes Gama',
      date: '20 Jul 2026',
      dotColor: '#ef4444',
      badgeColor: '#991b1b',
      badgeBg: '#fef2f2',
    },
  ]);
}
