import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export type ProcStatus = 'Aprovado' | 'Em Revisão' | 'Rascunho';

export interface ProcCard {
  id: string;
  titulo: string;
  norma: string;
  categoria: string;
  status: ProcStatus;
  descricao: string;
  versao: string;
  responsavel: string;
}

const PROC_CARDS: ProcCard[] = [
  {
    id: 'POP-001',
    titulo: 'Trabalho em Altura',
    norma: 'NR-35',
    categoria: 'Segurança',
    status: 'Aprovado',
    descricao: 'Procedimento para execução segura de atividades acima de 2 metros, incluindo uso de EPI e PTW.',
    versao: 'v3.1',
    responsavel: 'João Silva',
  },
  {
    id: 'POP-002',
    titulo: 'Espaço Confinado',
    norma: 'NR-33',
    categoria: 'Segurança',
    status: 'Aprovado',
    descricao: 'Procedimento para entrada e trabalho em espaços confinados com vigia, medição atmosférica e resgate.',
    versao: 'v2.4',
    responsavel: 'Carlos Souza',
  },
  {
    id: 'POP-003',
    titulo: 'Uso de EPI',
    norma: 'NR-06',
    categoria: 'Equipamentos',
    status: 'Em Revisão',
    descricao: 'Instrução técnica para seleção, uso, higienização e guarda de Equipamentos de Proteção Individual.',
    versao: 'v1.8',
    responsavel: 'Ana Lima',
  },
  {
    id: 'POP-004',
    titulo: 'Combate a Incêndio',
    norma: 'NR-23',
    categoria: 'Emergência',
    status: 'Aprovado',
    descricao: 'Procedimento de emergência para combate a princípios de incêndio e evacuação de área.',
    versao: 'v2.0',
    responsavel: 'Pedro Costa',
  },
];

const CATEGORIES = ['Todos', 'Segurança', 'Equipamentos', 'Emergência', 'Higiene', 'Ambiental'];

@Component({
  selector: 'app-procedimentos',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './procedimentos.component.html',
  styleUrl: './procedimentos.component.scss',
})
export class ProcedimentosComponent {
  readonly search   = signal('');
  readonly category = signal('Todos');

  readonly categories = CATEGORIES;
  readonly allCards   = PROC_CARDS;

  readonly filteredCards = computed(() => {
    const q   = this.search().toLowerCase().trim();
    const cat = this.category();
    return this.allCards.filter(c => {
      const matchCat = cat === 'Todos' || c.categoria === cat;
      const matchQ   = !q ||
        c.titulo.toLowerCase().includes(q) ||
        c.norma.toLowerCase().includes(q) ||
        c.id.toLowerCase().includes(q);
      return matchCat && matchQ;
    });
  });

  statusClass(s: ProcStatus): string {
    const map: Record<ProcStatus, string> = {
      'Aprovado':    'proc__status--aprovado',
      'Em Revisão':  'proc__status--revisao',
      'Rascunho':    'proc__status--rascunho',
    };
    return map[s];
  }

  onSearch(e: Event): void {
    this.search.set((e.target as HTMLInputElement).value);
  }
}
