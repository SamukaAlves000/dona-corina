import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

interface StepDef {
  num: number;
  label: string;
}

interface Setor {
  nome: string;
  workers: number;
  color: string;
}

interface RiscoRow {
  agente: string;
  tipo: string;
  fonte: string;
  severidade: string;
  probabilidade: string;
  nr: string;
  sevColor: string;
  sevBg: string;
}

@Component({
  selector: 'app-template-stepper',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './template-stepper.component.html',
  styleUrls: ['./template-stepper.component.scss'],
})
export class TemplateStepperComponent {
  readonly step = signal<number>(1);
  readonly totalSteps = 5;
  readonly genProgress = signal<number>(0);

  private _genInterval: ReturnType<typeof setInterval> | null = null;

  readonly stepDefs: StepDef[] = [
    { num: 1, label: 'Dados da Empresa' },
    { num: 2, label: 'Setores e Cargos' },
    { num: 3, label: 'Riscos e Agentes' },
    { num: 4, label: 'Geração IA' },
    { num: 5, label: 'Revisão e Aprovação' },
  ];

  readonly docType = 'PGR / GRO';

  readonly extractedInfo: string[] = [
    'Razão Social — Itaús Fertilizantes Ltda',
    'CNPJ — 05.918.578/0001-60',
    'CNAE 2013-4/00 · Fertilizantes',
    'Grau de Risco 3 (NR-04)',
    'Endereço — Travessa Peçanhanha, s/n · Itapemirim/ES',
    'Responsável Técnico — Eng. Melqui do Vale',
  ];

  readonly setores = signal<Setor[]>([
    { nome: 'Produção / Mistura', workers: 24, color: '#4f46e5' },
    { nome: 'Armazém / Expedição', workers: 12, color: '#16a34a' },
    { nome: 'Manutenção', workers: 8, color: '#f59e0b' },
    { nome: 'Administrativo', workers: 6, color: '#9333ea' },
  ]);

  readonly riscos: RiscoRow[] = [
    { agente: 'Ruído Contínuo', tipo: 'Físico', fonte: 'Máquinas de mistura', severidade: 'Alto', probabilidade: 'Alta', nr: 'NR-15', sevColor: '#dc2626', sevBg: '#fef2f2' },
    { agente: 'Poeira Química', tipo: 'Químico', fonte: 'Fertilizantes nitrogenados', severidade: 'Médio', probabilidade: 'Média', nr: 'NR-15', sevColor: '#d97706', sevBg: '#fffbeb' },
    { agente: 'Calor', tipo: 'Físico', fonte: 'Ambiente externo + processo', severidade: 'Médio', probabilidade: 'Alta', nr: 'NR-15', sevColor: '#d97706', sevBg: '#fffbeb' },
    { agente: 'Agentes Ergonômicos', tipo: 'Ergonômico', fonte: 'Movimentação de cargas', severidade: 'Baixo', probabilidade: 'Média', nr: 'NR-17', sevColor: '#16a34a', sevBg: '#f0fdf4' },
    { agente: 'Risco de Queda', tipo: 'Acidente', fonte: 'Trabalho em altura', severidade: 'Alto', probabilidade: 'Baixa', nr: 'NR-35', sevColor: '#dc2626', sevBg: '#fef2f2' },
  ];

  readonly checklist: string[] = [
    'Inventário de Riscos NR-01 / GRO contemplado',
    'Enquadramento NR-15 validado por laudo',
    'Plano de ação 5W2H vinculado',
    'Controles coletivos (EPC) definidos por GHE',
    'EPIs listados conforme CA/INMETRO',
  ];

  readonly genProgressText = computed(() => {
    const p = this.genProgress();
    if (p < 25) return 'Carregando dados do cliente…';
    if (p < 50) return 'Cruzando inventário de riscos com NR-15…';
    if (p < 75) return 'Aplicando templates e Content Controls…';
    if (p < 100) return 'Verificando conformidade normativa…';
    return 'Documento gerado com sucesso!';
  });

  prevStep(): void {
    if (this.step() > 1) {
      this.step.update(s => s - 1);
      this._stopGen();
    }
  }

  nextStep(): void {
    if (this.step() < this.totalSteps) {
      const next = this.step() + 1;
      this.step.set(next);
      if (next === 4) {
        this._startGen();
      }
    }
  }

  isCompleted(num: number): boolean {
    return num < this.step();
  }

  isActive(num: number): boolean {
    return num === this.step();
  }

  private _startGen(): void {
    this.genProgress.set(0);
    this._genInterval = setInterval(() => {
      this.genProgress.update(p => {
        if (p >= 100) {
          this._stopGen();
          return 100;
        }
        return p + 2;
      });
    }, 80);
  }

  private _stopGen(): void {
    if (this._genInterval) {
      clearInterval(this._genInterval);
      this._genInterval = null;
    }
  }

  addSetor(): void {
    const names = ['Controle de Qualidade', 'Segurança', 'TI / Automação', 'RH / Treinamento'];
    const colors = ['#0891b2', '#dc2626', '#7c3aed', '#059669'];
    const idx = this.setores().length % names.length;
    this.setores.update(list => [
      ...list,
      { nome: names[idx], workers: Math.floor(Math.random() * 15) + 2, color: colors[idx] },
    ]);
  }

  ngOnDestroy(): void {
    this._stopGen();
  }
}
