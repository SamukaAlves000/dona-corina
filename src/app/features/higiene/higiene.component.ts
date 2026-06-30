import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type Tab = 'Avaliação' | 'Inventário' | 'Biblioteca Técnica' | 'Laboratórios';

interface MedicaoRow {
  date: string;
  agente: string;
  colaborador: string;
  nivel: string;
  nr: string;
  status: string;
  statusClass: string;
}

interface BibDoc {
  title: string;
  subtitle: string;
  chips: string[];
}

interface LabCard {
  nome: string;
  tipo: string;
  status: string;
  statusClass: string;
  ultimaAnalise: string;
}

interface AcaoItem {
  label: string;
  done: boolean;
}

@Component({
  selector: 'app-higiene',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './higiene.component.html',
  styleUrls: ['./higiene.component.scss'],
})
export class HigieneComponent {
  readonly tab = signal<Tab>('Avaliação');
  readonly agentType = signal<string>('Ruído');
  readonly hasAnalysis = signal<boolean>(true);

  readonly tabs: Tab[] = ['Avaliação', 'Inventário', 'Biblioteca Técnica', 'Laboratórios'];

  // Form field signals
  readonly colaborador = signal<string>('Carlos Silva');
  readonly funcao = signal<string>('Soldador');
  readonly duracao = signal<string>('8');
  readonly nivelMedido = signal<string>('87');

  readonly nrReferencia = computed<string>(() => {
    const map: Record<string, string> = {
      Ruído: 'NR-15 Anexo I — 85 dB(A)/8h',
      Calor: 'NR-15 Anexo III — IBUTG 25°C',
      Poeiras: 'NR-15 Anexo XII — 2 mg/m³',
      Químicos: 'NR-15 Anexo XIII — TLV-TWA',
      Iluminação: 'NR-17 — 500 lux (escritório)',
      Vibração: 'NR-15 Anexo VIII — 4 m/s²',
    };
    return map[this.agentType()] ?? 'NR-15';
  });

  readonly unitLabel = computed<string>(() => {
    const map: Record<string, string> = {
      Ruído: 'dB(A)',
      Calor: '°C IBUTG',
      Poeiras: 'mg/m³',
      Químicos: 'ppm',
      Iluminação: 'lux',
      Vibração: 'm/s²',
    };
    return map[this.agentType()] ?? '';
  });

  readonly limitValue = computed<number>(() => {
    const map: Record<string, number> = {
      Ruído: 85,
      Calor: 25,
      Poeiras: 2,
      Químicos: 10,
      Iluminação: 500,
      Vibração: 4,
    };
    return map[this.agentType()] ?? 85;
  });

  readonly isAboveLimit = computed<boolean>(() => {
    const nivel = parseFloat(this.nivelMedido());
    return !isNaN(nivel) && nivel > this.limitValue();
  });

  readonly barMeasuredPct = computed<number>(() => {
    const nivel = parseFloat(this.nivelMedido()) || 0;
    const limit = this.limitValue();
    return Math.min(Math.round((nivel / (limit * 1.5)) * 100), 100);
  });

  readonly barLimitPct = computed<number>(() => {
    const limit = this.limitValue();
    return Math.min(Math.round((limit / (limit * 1.5)) * 100), 100);
  });

  readonly acoes = signal<AcaoItem[]>([
    { label: 'Instalar protetores auriculares tipo concha (CA certificado)', done: false },
    { label: 'Implementar EPC: enclausuramento acústico da fonte', done: false },
    { label: 'Reavaliação em 30 dias após implantação dos controles', done: false },
  ]);

  readonly medicoes = signal<MedicaoRow[]>([
    { date: '18/06/2026', agente: 'Ruído', colaborador: 'Carlos Silva', nivel: '87 dB(A)', nr: 'NR-15 AI', status: 'Acima do Limite', statusClass: 'badge--danger' },
    { date: '15/06/2026', agente: 'Calor', colaborador: 'Ana Ferreira', nivel: '24 °C IBUTG', nr: 'NR-15 AIII', status: 'Dentro do Limite', statusClass: 'badge--success' },
    { date: '10/06/2026', agente: 'Poeiras', colaborador: 'João Souza', nivel: '1.8 mg/m³', nr: 'NR-15 AXII', status: 'Dentro do Limite', statusClass: 'badge--success' },
    { date: '05/06/2026', agente: 'Químicos', colaborador: 'Maria Lima', nivel: '12 ppm', nr: 'NR-15 AXIII', status: 'Acima do Limite', statusClass: 'badge--danger' },
    { date: '01/06/2026', agente: 'Iluminação', colaborador: 'Pedro Costa', nivel: '480 lux', nr: 'NR-17', status: 'Atenção', statusClass: 'badge--warning' },
  ]);

  readonly bibDocs = signal<BibDoc[]>([
    {
      title: 'FUNDACENTRO — NHO',
      subtitle: 'Normas de Higiene Ocupacional aplicadas automaticamente conforme o agente.',
      chips: ['NHO-01 Ruído', 'NHO-06 Calor', 'NHO-07 Benzeno', 'NHO-08 Sílica', 'NHO-09 Vibração', 'NHO-10 Poeiras', 'NHO-11 Iluminação'],
    },
    {
      title: 'Normas Regulamentadoras',
      subtitle: 'Base para enquadramento de insalubridade, periculosidade e medidas de controle.',
      chips: ['NR-01 GRO', 'NR-06 EPI', 'NR-07 PCMSO', 'NR-09 PPRA', 'NR-15 Insalubridade', 'NR-16 Periculosidade', 'NR-17 Ergonomia'],
    },
    {
      title: 'Legislação Previdenciária',
      subtitle: 'Caracterização de aposentadoria especial, LTCAT e PPP.',
      chips: ['Decreto 3.048/99', 'IN INSS 128/22', 'LTCAT', 'PPP', 'Aposent. Especial'],
    },
    {
      title: 'eSocial — Eventos SST',
      subtitle: 'Geração de XML a partir da avaliação (leiaute S-1.3).',
      chips: ['S-2210', 'S-2220', 'S-2240', 'S-2245', 'S-3000'],
    },
  ]);

  readonly labCards = signal<LabCard[]>([
    { nome: 'LabTec Análises', tipo: 'Ruído · Calor · Poeiras · Químicos · Vibração', status: 'Credenciado', statusClass: 'badge--success', ultimaAnalise: 'Última análise: 10/06/2026' },
    { nome: 'EnviroLab SP', tipo: 'Agentes Químicos · Material Particulado · Gases', status: 'Credenciado', statusClass: 'badge--success', ultimaAnalise: 'Última análise: 02/06/2026' },
    { nome: 'SoundCheck Ltda', tipo: 'Ruído Ocupacional · Vibração · Ultrassom', status: 'Em renovação', statusClass: 'badge--warning', ultimaAnalise: 'Última análise: 28/05/2026' },
  ]);

  setTab(t: Tab): void {
    this.tab.set(t);
  }

  setAgent(event: Event): void {
    const val = (event.target as HTMLSelectElement).value;
    this.agentType.set(val);
  }

  setColaborador(event: Event): void {
    this.colaborador.set((event.target as HTMLInputElement).value);
  }

  setFuncao(event: Event): void {
    this.funcao.set((event.target as HTMLInputElement).value);
  }

  setDuracao(event: Event): void {
    this.duracao.set((event.target as HTMLInputElement).value);
  }

  setNivel(event: Event): void {
    this.nivelMedido.set((event.target as HTMLInputElement).value);
  }

  analisar(): void {
    this.hasAnalysis.set(true);
  }

  toggleAcao(index: number): void {
    this.acoes.update(list =>
      list.map((a, i) => (i === index ? { ...a, done: !a.done } : a))
    );
  }
}
