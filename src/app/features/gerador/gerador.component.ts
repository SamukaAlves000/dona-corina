import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface DocItem {
  id: string;
  code: string;
  desc: string;
  group: 'sst' | 'ambiental' | 'compliance' | 'outros';
}

@Component({
  selector: 'app-gerador',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './gerador.component.html',
  styleUrls: ['./gerador.component.scss'],
})
export class GeradorComponent {
  readonly selectedDoc = signal<string | null>(null);
  readonly source = signal<'ia' | 'import'>('ia');

  readonly canAdvance = computed(() => this.selectedDoc() !== null);

  readonly sstDocs: DocItem[] = [
    { id: 'pgr',        code: 'PGR / GRO',          desc: 'Programa de Gerenciamento de Riscos',                     group: 'sst' },
    { id: 'ltcat',      code: 'LTCAT',               desc: 'Laudo Técnico das Condições Ambientais',                 group: 'sst' },
    { id: 'pcmso',      code: 'PCMSO',               desc: 'Programa de Controle Médico de Saúde Ocupacional',       group: 'sst' },
    { id: 'aso',        code: 'ASO',                 desc: 'Atestado de Saúde Ocupacional',                         group: 'sst' },
    { id: 'ppp',        code: 'PPP',                 desc: 'Perfil Profissiográfico Previdenciário',                 group: 'sst' },
    { id: 'apr',        code: 'APR',                 desc: 'Análise Preliminar de Risco',                           group: 'sst' },
    { id: 'emergencia', code: 'Plano de Emergência', desc: 'Plano de Ação de Emergência (NR-23)',                    group: 'sst' },
  ];

  readonly ambientalDocs: DocItem[] = [
    { id: 'lo',      code: 'Licença de Operação', desc: 'Licenciamento Ambiental de Operação',               group: 'ambiental' },
    { id: 'pgrs',    code: 'PGRS',               desc: 'Plano de Gerenciamento de Resíduos Sólidos',         group: 'ambiental' },
    { id: 'eia',     code: 'EIA/RIMA',           desc: 'Estudo e Relatório de Impacto Ambiental',            group: 'ambiental' },
    { id: 'outorga', code: 'Outorga de Água',    desc: 'Outorga de Direito de Uso de Recursos Hídricos',    group: 'ambiental' },
    { id: 'prad',    code: 'PRAD',               desc: 'Plano de Recuperação de Área Degradada',            group: 'ambiental' },
  ];

  readonly complianceDocs: DocItem[] = [
    { id: 'materialidade', code: 'Matriz de Materialidade', desc: 'Análise de Temas Materiais ESG',                              group: 'compliance' },
    { id: 'gri',           code: 'Relatório GRI',           desc: 'Relatório de Sustentabilidade Global Reporting Initiative',   group: 'compliance' },
    { id: 'iso14001',      code: 'ISO 14001',               desc: 'Sistema de Gestão Ambiental',                                 group: 'compliance' },
    { id: 'iso45001',      code: 'ISO 45001',               desc: 'Sistema de Gestão de Saúde e Segurança Ocupacional',          group: 'compliance' },
  ];

  readonly outrosDocs: DocItem[] = [
    { id: 'contrato',    code: 'Contrato de Prestação', desc: 'Contrato de Prestação de Serviços Técnicos',          group: 'outros' },
    { id: 'nda',         code: 'NDA',                   desc: 'Acordo de Não Divulgação (Confidencialidade)',         group: 'outros' },
    { id: 'pop',         code: 'POP/Procedimentos',     desc: 'Procedimento Operacional Padrão',                     group: 'outros' },
    { id: 'comunicacao', code: 'Comunicação Interna',   desc: 'Documentos de Comunicação Organizacional',            group: 'outros' },
  ];

  constructor(private readonly router: Router) {}

  selectDoc(id: string): void {
    this.selectedDoc.set(id);
  }

  setSource(src: 'ia' | 'import'): void {
    this.source.set(src);
  }

  isSelected(id: string): boolean {
    return this.selectedDoc() === id;
  }

  advance(): void {
    if (this.canAdvance()) {
      this.router.navigate(['/template']);
    }
  }
}
