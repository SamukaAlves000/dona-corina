import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Client {
  name: string;
  cnpj: string;
  setor: string;
  municipio: string;
  docs: number;
  status: 'Ativo' | 'Em Implantação' | 'Pendente';
}

interface CorinaField {
  campo: string;
  valor: string;
}

@Component({
  selector: 'app-cadastros',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.scss'],
})
export class CadastrosComponent {
  // ── Group / tab state ───────────────────────────────────────────────────────
  readonly groups = ['Cliente', 'Pessoas', 'Risco', 'Ambiental'] as const;
  readonly activeGroup = signal<string>('Cliente');

  // ── Search ──────────────────────────────────────────────────────────────────
  readonly searchQuery = signal('');

  // ── Corina IA state ─────────────────────────────────────────────────────────
  readonly corinaPrompt = signal('');
  readonly corinaBusy   = signal(false);
  readonly corinaFilled = signal(false);

  readonly corinaPlaceholder =
    'Ex: "Itaús do Vale Ltda, CNPJ 03.647.852/0001-23, setor construção civil em Belo Horizonte/MG, 250 funcionários, atividade de risco moderado…"';

  readonly corinaExtract: CorinaField[] = [
    { campo: 'Razão Social',      valor: 'Itaús do Vale Ltda' },
    { campo: 'Nome Fantasia',     valor: 'Itaús do Vale' },
    { campo: 'CNPJ',              valor: '03.647.852/0001-23' },
    { campo: 'Setor',             valor: 'Construção Civil' },
    { campo: 'Município/UF',      valor: 'Belo Horizonte / MG' },
    { campo: 'Nº Funcionários',   valor: '250' },
    { campo: 'Grau de Risco',     valor: 'GR 3' },
    { campo: 'Responsável SST',   valor: 'João Carlos Melo' },
    { campo: 'E-mail',            valor: 'sst@itausdovale.com.br' },
    { campo: 'Telefone',          valor: '(31) 3322-4455' },
  ];

  readonly corinaScreens = [
    'PGR', 'LTCAT', 'PCMSO', 'eSocial',
    'Higiene', 'Ambiental', 'Treinamentos', 'EPI', 'Auditoria',
  ];

  // ── Table data ───────────────────────────────────────────────────────────────
  readonly allClients: Client[] = [
    { name: 'Itaús do Vale Ltda',   cnpj: '03.647.852/0001-23', setor: 'Construção Civil', municipio: 'Belo Horizonte/MG', docs: 12, status: 'Ativo' },
    { name: 'Metalúrgica X S.A.',   cnpj: '09.876.543/0001-44', setor: 'Metalúrgica',      municipio: 'São Paulo/SP',       docs:  8, status: 'Ativo' },
    { name: 'Transportes Ltda',     cnpj: '12.345.678/0001-90', setor: 'Logística',         municipio: 'Curitiba/PR',        docs:  5, status: 'Em Implantação' },
    { name: 'Empresa Y Eng.',       cnpj: '34.567.890/0001-11', setor: 'Construção',        municipio: 'Rio de Janeiro/RJ',  docs:  3, status: 'Pendente' },
  ];

  readonly filteredClients = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return this.allClients;
    return this.allClients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.cnpj.toLowerCase().includes(q) ||
        c.setor.toLowerCase().includes(q) ||
        c.municipio.toLowerCase().includes(q),
    );
  });

  // ── Form fields (Cliente group) ──────────────────────────────────────────────
  readonly cadFields = [
    { label: 'Razão Social',    ex: 'Ex: Empresa Ltda',             req: true,  full: false },
    { label: 'Nome Fantasia',   ex: 'Ex: Empresa',                  req: false, full: false },
    { label: 'CNPJ',            ex: 'XX.XXX.XXX/XXXX-XX',           req: true,  full: false },
    { label: 'Setor / CNAE',    ex: 'Ex: Construção Civil',         req: false, full: false },
    { label: 'Município / UF',  ex: 'Ex: Belo Horizonte / MG',      req: false, full: false },
    { label: 'Nº Funcionários', ex: 'Ex: 250',                      req: false, full: false },
    { label: 'Responsável SST', ex: 'Nome do responsável',          req: false, full: false },
    { label: 'E-mail',          ex: 'contato@empresa.com.br',       req: false, full: false },
    { label: 'Telefone',        ex: '(XX) XXXXX-XXXX',              req: false, full: false },
    { label: 'Endereço',        ex: 'Rua, número, complemento…',    req: false, full: true  },
  ];

  // ── Helpers ──────────────────────────────────────────────────────────────────
  setGroup(g: string): void {
    this.activeGroup.set(g);
  }

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }

  onCorinaPromptChange(value: string): void {
    this.corinaPrompt.set(value);
  }

  fillWithCorina(): void {
    if (!this.corinaPrompt().trim()) return;
    this.corinaBusy.set(true);
    this.corinaFilled.set(false);
    // Simulate AI processing delay
    setTimeout(() => {
      this.corinaBusy.set(false);
      this.corinaFilled.set(true);
    }, 1800);
  }

  resetCorina(): void {
    this.corinaPrompt.set('');
    this.corinaBusy.set(false);
    this.corinaFilled.set(false);
  }

  statusVariant(status: Client['status']): string {
    const map: Record<Client['status'], string> = {
      'Ativo':           'dc-badge--success',
      'Em Implantação':  'dc-badge--warning',
      'Pendente':        'dc-badge--gray',
    };
    return map[status] ?? 'dc-badge--gray';
  }
}
