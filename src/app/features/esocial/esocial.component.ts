import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface EsocialTab {
  code: string;
  label: string;
  count: number;
}

export interface AgenteNocivo {
  agente: string;
  tipo: string;
  nivel: string;
  epc: string;
  epi: string;
  exposicao: string;
}

const TABS: EsocialTab[] = [
  { code: 'S-2210', label: 'Comunicação de Acidente', count: 2 },
  { code: 'S-2220', label: 'Monitor. Saúde do Trabalhador', count: 5 },
  { code: 'S-2240', label: 'Cond. Ambiente de Trabalho', count: 3 },
  { code: 'S-2221', label: 'Exame Tox. Ocupacional', count: 1 },
];

const AGENTES: AgenteNocivo[] = [
  {
    agente: 'Ruído',
    tipo: 'Físico',
    nivel: '87 dB(A)',
    epc: 'Isolamento acústico',
    epi: 'Protetor auricular',
    exposicao: '8h/dia',
  },
];

const SAMPLE_XML = `<?xml version="1.0" encoding="UTF-8"?>
<eSocial xmlns="http://www.esocial.gov.br/
  schema/evt/evtCAT/v03_00_00">
  <evtCondAmbTrab id="ID1">
    <ideEvento>
      <indRetif>1</indRetif>
      <nrRec/>
      <perApur>2024-06</perApur>
      <tpAmb>2</tpAmb>
      <procEmi>1</procEmi>
      <verProc>1.0</verProc>
    </ideEvento>
    <ideEmpregador>
      <tpInsc>1</tpInsc>
      <nrInsc>12345678000100</nrInsc>
    </ideEmpregador>
    <ideVinculo>
      <cpfTrab>000.000.000-00</cpfTrab>
      <nisTrab>00000000000</nisTrab>
      <matricula>001</matricula>
    </ideVinculo>
    <infoCondAmbTrab>
      <localTrab>
        <dscSetor>Produção</dscSetor>
        <dscCargo>Operador</dscCargo>
      </localTrab>
      <agNocivo>
        <codAgNoc>01.01.001</codAgNoc>
        <dscAgNoc>Ruído</dscAgNoc>
        <tecMedProtEq>87 dB(A)</tecMedProtEq>
      </agNocivo>
    </infoCondAmbTrab>
  </evtCondAmbTrab>
</eSocial>`;

@Component({
  selector: 'app-esocial',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './esocial.component.html',
  styleUrl: './esocial.component.scss',
})
export class EsocialComponent {
  readonly tabs = TABS;
  readonly agentes = AGENTES;
  readonly xmlPreview = SAMPLE_XML;

  readonly activeEvent = signal<string>('S-2240');

  readonly activeTab = computed(() =>
    this.tabs.find(t => t.code === this.activeEvent()) ?? this.tabs[2]
  );

  setActive(code: string): void {
    this.activeEvent.set(code);
  }

  salvarRascunho(): void {
    alert('Rascunho salvo com sucesso!');
  }

  preValidar(): void {
    alert('Pré-validação iniciada...');
  }

  adicionarAgente(): void {
    alert('Adicionar novo agente nocivo');
  }

  novoEvento(): void {
    alert('Novo evento eSocial');
  }
}
