import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface FlowStep {
  label: string;
  active: boolean;
  done: boolean;
  arrow: boolean;
}

export interface Finding {
  criticidade: 'critico' | 'atencao' | 'ok';
  norma: string;
  texto: string;
}

export interface NormaBar {
  label: string;
  pct: number;
  color: string;
}

const FLOW_STEPS: FlowStep[] = [
  { label: 'Upload',        active: false, done: true,  arrow: true  },
  { label: 'Análise IA',    active: false, done: true,  arrow: true  },
  { label: 'Achados',       active: true,  done: false, arrow: true  },
  { label: 'Plano de Ação', active: false, done: false, arrow: true  },
  { label: 'Relatório',     active: false, done: false, arrow: false },
];

const FINDINGS: Finding[] = [
  {
    criticidade: 'critico',
    norma: 'NR-15 §2.1',
    texto: 'Ausência de controle de ruído na linha de produção (EPC/EPI)',
  },
  {
    criticidade: 'atencao',
    norma: 'PCMSO',
    texto: 'Exames admissionais em atraso para 3 colaboradores',
  },
  {
    criticidade: 'ok',
    norma: 'eSocial S-2240',
    texto: 'Agentes nocivos corretamente declarados',
  },
];

const NORMA_BARS: NormaBar[] = [
  { label: 'NR-01 (GRO)',     pct: 85, color: '#16a34a' },
  { label: 'NR-15 (Agentes)', pct: 62, color: '#f59e0b' },
  { label: 'NR-07 (PCMSO)',   pct: 91, color: '#16a34a' },
  { label: 'eSocial SST',     pct: 88, color: '#16a34a' },
  { label: 'NR-09',           pct: 72, color: '#f59e0b' },
];

@Component({
  selector: 'app-auditoria',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './auditoria.component.html',
  styleUrl: './auditoria.component.scss',
})
export class AuditoriaComponent {
  readonly hasDoc      = signal(false);
  readonly isAnalyzing = signal(false);
  readonly score       = signal(76);

  readonly flowSteps  = FLOW_STEPS;
  readonly findings   = FINDINGS;
  readonly normaBars  = NORMA_BARS;

  /** SVG donut: r=62, circumference ≈ 389.6 */
  readonly donutDash = computed(() => {
    const circ = 2 * Math.PI * 62;
    const fill = (this.score() / 100) * circ;
    return `${fill} ${circ - fill}`;
  });

  readonly scoreColor = computed(() => {
    const s = this.score();
    if (s >= 80) return '#16a34a';
    if (s >= 60) return '#f59e0b';
    return '#ef4444';
  });

  readonly scoreLabel = computed(() => {
    const s = this.score();
    if (s >= 80) return 'Bom';
    if (s >= 60) return 'Regular';
    return 'Crítico';
  });

  critDotColor(c: Finding['criticidade']): string {
    const map: Record<Finding['criticidade'], string> = {
      critico: '#ef4444',
      atencao: '#f59e0b',
      ok:      '#16a34a',
    };
    return map[c];
  }

  critLabel(c: Finding['criticidade']): string {
    const map: Record<Finding['criticidade'], string> = {
      critico: 'CRÍTICO',
      atencao: 'ATENÇÃO',
      ok:      'OK',
    };
    return map[c];
  }

  critBtnLabel(c: Finding['criticidade']): string {
    return c === 'ok' ? 'Validado' : 'Corrigir';
  }

  onDropDoc(e: DragEvent): void {
    e.preventDefault();
    this.hasDoc.set(true);
    this.isAnalyzing.set(true);
    setTimeout(() => this.isAnalyzing.set(false), 1500);
  }

  onDragOver(e: DragEvent): void {
    e.preventDefault();
  }

  onFileInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files?.length) {
      this.hasDoc.set(true);
      this.isAnalyzing.set(true);
      setTimeout(() => this.isAnalyzing.set(false), 1500);
    }
  }

  runAnalysis(): void {
    if (!this.hasDoc()) return;
    this.isAnalyzing.set(true);
    setTimeout(() => this.isAnalyzing.set(false), 1500);
  }

  clearDoc(): void {
    this.hasDoc.set(false);
    this.isAnalyzing.set(false);
  }

  gerarRelatorio(): void {
    alert('Relatório gerado com sucesso!');
  }

  verPlanoAcao(): void {
    alert('Redirecionando para Plano de Ação...');
  }
}
