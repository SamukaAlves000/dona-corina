import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

// ── Interfaces ────────────────────────────────────────────────────────────────

export interface PsicoFator {
  id: string;
  nome: string;
  nivel: 'ALTO' | 'MÉDIO' | 'BAIXO';
  pct: number;
  color: string;
  detail: string;
  sev: string;
  prob: string;
  nivelStyle: string;
}

export interface PsicoAcao {
  id: string;
  fator: string;
  acao: string;
  responsavel: string;
  prazo: string;
  status: 'Em andamento' | 'Pendente' | 'Concluído';
}

export interface LikertQuestion {
  id: number;
  text: string;
  answer: number | null;
}

// ── Static data ───────────────────────────────────────────────────────────────

const ns = (bg: string, color: string) =>
  `font-size:11.5px;font-weight:700;padding:3px 9px;border-radius:999px;background:${bg};color:${color}`;

const FATORES: PsicoFator[] = [
  { id: 'demandas',       nome: 'Demandas quantitativas',  nivel: 'ALTO', pct: 78, color: '#e5484d', sev: 'Alto 4',  prob: 'Alta 4',  nivelStyle: ns('#fee2e2','#b91c1c'), detail: 'Volume de tarefas elevado.' },
  { id: 'ritmo',          nome: 'Ritmo de trabalho',        nivel: 'ALTO', pct: 82, color: '#e5484d', sev: 'Alto 4',  prob: 'Alta 4',  nivelStyle: ns('#fee2e2','#b91c1c'), detail: 'Velocidade de produção elevada.' },
  { id: 'previsibilidade',nome: 'Previsibilidade',          nivel: 'MÉDIO',pct: 45, color: '#f59e0b', sev: 'Médio 3', prob: 'Média 3', nivelStyle: ns('#fef9c3','#854d0e'), detail: 'Mudanças frequentes de escala.' },
  { id: 'apoio',          nome: 'Apoio de superiores',      nivel: 'MÉDIO',pct: 51, color: '#f59e0b', sev: 'Médio 3', prob: 'Média 3', nivelStyle: ns('#fef9c3','#854d0e'), detail: 'Suporte emocional escasso.' },
  { id: 'reconhecimento', nome: 'Reconhecimento',           nivel: 'MÉDIO',pct: 48, color: '#f59e0b', sev: 'Médio 3', prob: 'Baixa 2', nivelStyle: ns('#fef9c3','#854d0e'), detail: 'Feedback positivo insuficiente.' },
  { id: 'significado',    nome: 'Significado do trabalho',  nivel: 'BAIXO',pct: 23, color: '#16a34a', sev: 'Baixo 2', prob: 'Baixa 2', nivelStyle: ns('#dcfce7','#15803d'), detail: 'Alto senso de propósito.' },
  { id: 'confianca',      nome: 'Confiança / Justiça',      nivel: 'BAIXO',pct: 31, color: '#16a34a', sev: 'Baixo 2', prob: 'Baixa 2', nivelStyle: ns('#dcfce7','#15803d'), detail: 'Percepção de equidade boa.' },
];

const ACOES: PsicoAcao[] = [
  {
    id: '1',
    fator: 'Demandas quantitativas',
    acao: 'Redistribuição de carga horária e revisão de metas de produção via acordo coletivo',
    responsavel: 'SESMT / RH',
    prazo: 'Ago/2026',
    status: 'Em andamento',
  },
  {
    id: '2',
    fator: 'Ritmo de trabalho',
    acao: 'Implantação de pausas técnicas obrigatórias a cada 90 min conforme NR-17',
    responsavel: 'Produção / SESMT',
    prazo: 'Jul/2026',
    status: 'Pendente',
  },
];

const LIKERT_QUESTIONS: LikertQuestion[] = [
  { id: 1, text: 'Você tem volume de trabalho que consegue realizar no tempo disponível?', answer: null },
  { id: 2, text: 'Seu superior imediato oferece feedback e reconhecimento pelo seu trabalho?', answer: null },
  { id: 3, text: 'Você consegue prever com antecedência suas tarefas e horários?', answer: null },
];

// ── 5x5 Risk Matrix definition ────────────────────────────────────────────────
// Row 0 = probabilidade 5 (Muito Alta), Row 4 = probabilidade 1 (Muito Baixa)
// Col 0 = severidade 1 (Muito Baixa), Col 4 = severidade 5 (Muito Alta)
type RiskLevel = 'B' | 'M' | 'A' | 'C';

const MATRIX: RiskLevel[][] = [
  ['M', 'A', 'C', 'C', 'C'],
  ['B', 'M', 'A', 'C', 'C'],
  ['B', 'M', 'M', 'A', 'C'],
  ['B', 'B', 'M', 'M', 'A'],
  ['B', 'B', 'B', 'B', 'M'],
];

// Marked cells (row, col) for the 2 factors
const MARKED_CELLS: [number, number][] = [
  [0, 3], // Demandas quantitativas — prob Alta, sev Alta → C
  [1, 2], // Ritmo de trabalho — prob Alta, sev Média → A
];

@Component({
  selector: 'app-psicossocial',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './psicossocial.component.html',
  styleUrl: './psicossocial.component.scss',
})
export class PsicossocialComponent {
  // ── Signals ────────────────────────────────────────────────────────────────
  readonly activeTab      = signal('Avaliação');
  readonly expandedFactor = signal<string | null>(null);
  readonly likertAnswers  = signal<Record<number, number>>({});
  readonly psiTabs        = ['Avaliação', 'Inventário', 'Questionário', 'Plano de Ação'];

  // ── Static data exposed to template ───────────────────────────────────────
  readonly fatores  = FATORES;
  readonly acoes    = ACOES;
  readonly questions: LikertQuestion[] = LIKERT_QUESTIONS;
  readonly matrix   = MATRIX;
  readonly markedCells = MARKED_CELLS;

  readonly likertLabels = ['Nunca', 'Raramente', 'Às vezes', 'Frequentemente', 'Sempre'];

  // ── Computed ───────────────────────────────────────────────────────────────
  readonly answeredCount = computed(() => Object.keys(this.likertAnswers()).length);

  // ── KPI data ───────────────────────────────────────────────────────────────
  readonly kpis = [
    { label: 'Avaliações Realizadas', value: '142',       color: '#4f46e5', delta: '' },
    { label: 'Respondentes',          value: '89%',        color: '#16a34a', delta: '' },
    { label: 'Risco Alto / Crítico',  value: '3 fatores',  color: '#e5484d', delta: '' },
    { label: 'Plano em Vigor',        value: '2 ações',    color: '#f59e0b', delta: '' },
  ];

  // ── Methods ────────────────────────────────────────────────────────────────
  toggleFactor(id: string): void {
    this.expandedFactor.update(cur => (cur === id ? null : id));
  }

  isExpanded(id: string): boolean {
    return this.expandedFactor() === id;
  }

  setAnswer(questionId: number, value: number): void {
    this.likertAnswers.update(cur => ({ ...cur, [questionId]: value }));
  }

  getAnswer(questionId: number): number | null {
    return this.likertAnswers()[questionId] ?? null;
  }

  nivelClass(nivel: PsicoFator['nivel']): string {
    const map: Record<PsicoFator['nivel'], string> = {
      ALTO:  'psicossocial__nivel-badge--alto',
      MÉDIO: 'psicossocial__nivel-badge--medio',
      BAIXO: 'psicossocial__nivel-badge--baixo',
    };
    return map[nivel];
  }

  statusClass(status: PsicoAcao['status']): string {
    const map: Record<PsicoAcao['status'], string> = {
      'Em andamento': 'psicossocial__status-badge--andamento',
      'Pendente':     'psicossocial__status-badge--pendente',
      'Concluído':    'psicossocial__status-badge--concluido',
    };
    return map[status];
  }

  matrixCellClass(level: RiskLevel): string {
    const map: Record<RiskLevel, string> = {
      B: 'psicossocial__cell--baixo',
      M: 'psicossocial__cell--medio',
      A: 'psicossocial__cell--alto',
      C: 'psicossocial__cell--critico',
    };
    return map[level];
  }

  isMarked(row: number, col: number): boolean {
    return this.markedCells.some(([r, c]) => r === row && c === col);
  }

  markedLabel(row: number, col: number): string {
    const idx = this.markedCells.findIndex(([r, c]) => r === row && c === col);
    if (idx === 0) return 'DQ';
    if (idx === 1) return 'RT';
    return '';
  }

  novaAvaliacao(): void {
    alert('Nova Avaliação — em breve!');
  }

  gerarRelatorio(): void {
    alert('Relatório técnico gerado como minuta.');
  }

  emitirMinuta(): void {
    alert('Minuta emitida para aprovação.');
  }

  integrarPGR(): void {
    alert('Integrado ao PGR com sucesso.');
  }
}
