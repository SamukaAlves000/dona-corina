import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface Template {
  id: string;
  name: string;
  category: string;
  description: string;
  fieldCount: number;
  fieldLabel: string;
  version: string;
  updatedAt: string;
  icon: string;
  iconBg: string;
  iconColor: string;
  fields: string[];
}

@Component({
  selector: 'app-biblioteca',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss'],
})
export class BibliotecaComponent {
  readonly category = signal<string>('Todos');
  readonly search = signal<string>('');
  readonly selectedTemplate = signal<string | null>(null);

  readonly categories = ['Todos', 'SST', 'Ambiental', 'Compliance', 'ESG', 'Outros'];

  readonly allTemplates = signal<Template[]>([
    {
      id: 'pgr',
      name: 'PGR Completo',
      category: 'SST',
      description: 'Programa de Gerenciamento de Riscos conforme NR-01, com levantamento de perigos e planos de ação.',
      fieldCount: 47,
      fieldLabel: 'campos',
      version: 'v3.2',
      updatedAt: '18 Jun 2026',
      icon: '🛡️',
      iconBg: '#eef0fe',
      iconColor: '#4f46e5',
      fields: [
        'Razão Social', 'CNPJ', 'Responsável Técnico', 'CREA/CFT', 'Vigência',
        'Identificação dos Perigos', 'Avaliação de Riscos', 'Medidas de Controle',
        'Cronograma de Ações', 'Responsável por Implementação', 'Prazo de Conclusão',
        'Recursos Necessários', 'Indicadores de Desempenho', 'Revisão Periódica',
      ],
    },
    {
      id: 'ltcat',
      name: 'LTCAT',
      category: 'SST',
      description: 'Laudo Técnico das Condições Ambientais do Trabalho para fins previdenciários e eSocial.',
      fieldCount: 38,
      fieldLabel: 'campos',
      version: 'v2.1',
      updatedAt: '10 Jun 2026',
      icon: '📋',
      iconBg: '#f0fdf4',
      iconColor: '#16a34a',
      fields: [
        'Dados da Empresa', 'Descrição do Cargo', 'Agentes Nocivos', 'Nível de Exposição',
        'EPC Utilizado', 'EPI Utilizado', 'Eficácia dos EPIs', 'Conclusão Técnica',
        'Responsável pelo Laudo', 'Data de Emissão', 'Validade',
      ],
    },
    {
      id: 'pcmso',
      name: 'PCMSO',
      category: 'SST',
      description: 'Programa de Controle Médico de Saúde Ocupacional conforme NR-07 e eSocial S-2220.',
      fieldCount: 52,
      fieldLabel: 'campos',
      version: 'v4.0',
      updatedAt: '15 Jun 2026',
      icon: '🏥',
      iconBg: '#fef3c7',
      iconColor: '#b45309',
      fields: [
        'Dados da Empresa', 'Médico Coordenador', 'CRM', 'Riscos Mapeados',
        'Exames Admissionais', 'Exames Periódicos', 'Exames Demissionais',
        'Exames Complementares', 'Periodicidade', 'Cronograma Anual',
        'Relatório Analítico', 'Comunicação de Resultados',
      ],
    },
    {
      id: 'licenca-op',
      name: 'Licença Op.',
      category: 'Ambiental',
      description: 'Documentação completa para obtenção de Licença de Operação junto a órgãos ambientais estaduais.',
      fieldCount: 29,
      fieldLabel: 'campos',
      version: 'v1.5',
      updatedAt: '05 Jun 2026',
      icon: '🌿',
      iconBg: '#dcfce7',
      iconColor: '#166534',
      fields: [
        'Dados do Empreendimento', 'Atividade CNAE', 'Localização', 'Área Total',
        'Descrição do Processo Produtivo', 'Efluentes Gerados', 'Destinação dos Resíduos',
        'Equipamentos de Controle', 'Responsável Ambiental', 'CREA',
      ],
    },
    {
      id: 'pgrs',
      name: 'PGRS',
      category: 'Ambiental',
      description: 'Plano de Gerenciamento de Resíduos Sólidos conforme Lei 12.305 e regulamentações estaduais.',
      fieldCount: 23,
      fieldLabel: 'campos',
      version: 'v2.3',
      updatedAt: '01 Jun 2026',
      icon: '♻️',
      iconBg: '#f0fdf4',
      iconColor: '#16a34a',
      fields: [
        'Identificação dos Resíduos', 'Classe dos Resíduos', 'Quantidade Gerada',
        'Armazenamento Temporário', 'Transportador Contratado', 'Destinação Final',
        'Manifesto de Transporte', 'MTR', 'Responsável Ambiental',
      ],
    },
    {
      id: 'matriz-gri',
      name: 'Matriz GRI',
      category: 'ESG',
      description: 'Relatório de sustentabilidade baseado nos padrões GRI, cobrindo dimensões ambiental, social e governança.',
      fieldCount: 86,
      fieldLabel: 'indicadores',
      version: 'v5.1',
      updatedAt: '20 Jun 2026',
      icon: '🌍',
      iconBg: '#f5edff',
      iconColor: '#9333ea',
      fields: [
        'GRI 2 - Divulgações Gerais', 'GRI 3 - Temas Materiais', 'GRI 200 - Econômico',
        'GRI 300 - Ambiental', 'GRI 400 - Social', 'Emissões de CO2 (GRI 305)',
        'Consumo de Energia (GRI 302)', 'Água e Efluentes (GRI 303)',
        'Saúde e Segurança (GRI 403)', 'Treinamento e Educação (GRI 404)',
        'Diversidade e Igualdade (GRI 405)',
      ],
    },
    {
      id: 'iso14001',
      name: 'ISO 14001',
      category: 'Compliance',
      description: 'Checklist de conformidade para certificação ISO 14001 — Sistema de Gestão Ambiental.',
      fieldCount: 41,
      fieldLabel: 'cláusulas',
      version: 'v1.8',
      updatedAt: '12 Jun 2026',
      icon: '✅',
      iconBg: '#dbeafe',
      iconColor: '#1d4ed8',
      fields: [
        '4.1 Contexto da Organização', '4.2 Partes Interessadas', '5.1 Liderança',
        '5.2 Política Ambiental', '6.1 Aspectos Ambientais', '6.2 Objetivos Ambientais',
        '7.2 Competência', '7.4 Comunicação', '8.1 Controle Operacional',
        '9.1 Monitoramento e Medição', '9.2 Auditoria Interna', '10.2 Não Conformidade',
      ],
    },
  ]);

  readonly filteredTemplates = computed(() => {
    const cat = this.category();
    const q = this.search().toLowerCase().trim();
    return this.allTemplates().filter(t => {
      const matchCat = cat === 'Todos' || t.category === cat;
      const matchSearch = !q || t.name.toLowerCase().includes(q) || t.description.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });
  });

  readonly activeTemplate = computed(() => {
    const id = this.selectedTemplate();
    if (!id) return null;
    return this.allTemplates().find(t => t.id === id) ?? null;
  });

  onSearch(event: Event): void {
    this.search.set((event.target as HTMLInputElement).value);
  }

  setCategory(cat: string): void {
    this.category.set(cat);
  }

  selectTemplate(id: string): void {
    this.selectedTemplate.update(current => current === id ? null : id);
  }

  closePanel(): void {
    this.selectedTemplate.set(null);
  }

  categoryBadgeClass(cat: string): string {
    const map: Record<string, string> = {
      SST: 'dc-badge dc-badge--indigo',
      Ambiental: 'dc-badge dc-badge--success',
      Compliance: 'dc-badge dc-badge--blue',
      ESG: 'dc-badge dc-badge--purple',
      Outros: 'dc-badge dc-badge--gray',
    };
    return map[cat] ?? 'dc-badge dc-badge--gray';
  }
}
