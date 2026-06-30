import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';

export interface ImportRow {
  nome: string;
  tipo: string;
  vinculo: string;
  hash: string;
  user: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'danger' | 'info';
}

export interface MappingRow {
  coluna: string;
  destino: string;
  amostra: string;
}

const IMPORT_TIPOS: string[] = [
  'XLSX', 'CSV', 'PDF / OCR', 'DOCX', 'TXT', 'XML', 'JSON', 'ZIP',
];

const RECENT_IMPORTS: ImportRow[] = [
  {
    nome: 'funcionarios_2025.xlsx',
    tipo: 'XLSX',
    vinculo: 'Cadastros / Funcionários',
    hash: 'a3f8c1d2',
    user: 'ana.lima · 20/06/2025',
    status: 'Importado',
    statusVariant: 'success',
  },
  {
    nome: 'exames_periodicos_jun.csv',
    tipo: 'CSV',
    vinculo: 'SST / Exames',
    hash: 'b91e04a7',
    user: 'carlos.m · 19/06/2025',
    status: 'Parcial',
    statusVariant: 'warning',
  },
  {
    nome: 'relatorio_pcmso.pdf',
    tipo: 'PDF / OCR',
    vinculo: 'Documentos / PCMSO',
    hash: 'd44bc290',
    user: 'sistema · 18/06/2025',
    status: 'Erro',
    statusVariant: 'danger',
  },
];

const MAPPING_ROWS: MappingRow[] = [
  { coluna: 'nome_completo',   destino: 'Nome',       amostra: 'João da Silva' },
  { coluna: 'cpf',             destino: 'CPF',        amostra: '123.456.789-00' },
  { coluna: 'cargo',           destino: 'Cargo',      amostra: 'Operador de Máquinas' },
  { coluna: 'setor',           destino: 'Setor',      amostra: 'Produção' },
  { coluna: 'admissao',        destino: 'Admissão',   amostra: '01/03/2022' },
];

const PREVIEW_ROWS: Record<string, string>[] = [
  { nome: 'João da Silva',    cpf: '123.456.789-00', cargo: 'Operador', setor: 'Produção', admissao: '01/03/2022' },
  { nome: 'Maria Souza',      cpf: '987.654.321-00', cargo: 'Técnico',  setor: 'TI',       admissao: '15/07/2021' },
  { nome: 'Carlos Ferreira',  cpf: '111.222.333-44', cargo: 'Gerente',  setor: 'RH',       admissao: '10/01/2020' },
  { nome: 'Ana Lima',         cpf: '555.666.777-88', cargo: 'Analista', setor: 'SST',      admissao: '22/08/2023' },
  { nome: 'Pedro Nunes',      cpf: '444.333.222-11', cargo: 'Auxiliar', setor: 'Almox.',   admissao: '05/11/2024' },
];

const STATUS_STYLE: Record<ImportRow['statusVariant'], { color: string; bg: string }> = {
  success: { color: '#15803d', bg: '#dcfce7' },
  warning: { color: '#b45309', bg: '#fef3c7' },
  danger:  { color: '#991b1b', bg: '#fee2e2' },
  info:    { color: '#1d4ed8', bg: '#dbeafe' },
};

@Component({
  selector: 'app-importar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './importar.component.html',
  styleUrl: './importar.component.scss',
})
export class ImportarComponent {
  readonly isDragging   = signal(false);
  readonly selectedFile = signal<string | null>(null);
  readonly format       = signal<string>('xlsx');

  readonly tipos        = IMPORT_TIPOS;
  readonly recentImports = RECENT_IMPORTS;
  readonly mappingRows  = MAPPING_ROWS;
  readonly previewRows  = PREVIEW_ROWS;
  readonly previewCols  = ['nome', 'cpf', 'cargo', 'setor', 'admissao'];

  readonly hasFile = computed(() => this.selectedFile() !== null);

  statusStyle(variant: ImportRow['statusVariant']): { color: string; bg: string } {
    return STATUS_STYLE[variant];
  }

  onDragOver(e: DragEvent): void {
    e.preventDefault();
    this.isDragging.set(true);
  }

  onDragLeave(): void {
    this.isDragging.set(false);
  }

  onDrop(e: DragEvent): void {
    e.preventDefault();
    this.isDragging.set(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) {
      this.selectedFile.set(file.name);
      this.format.set(this._inferFormat(file.name));
    }
  }

  onFileInput(e: Event): void {
    const input = e.target as HTMLInputElement;
    const file  = input.files?.[0];
    if (file) {
      this.selectedFile.set(file.name);
      this.format.set(this._inferFormat(file.name));
    }
  }

  selectFormat(f: string): void {
    this.format.set(f);
  }

  clearFile(): void {
    this.selectedFile.set(null);
  }

  triggerImport(): void {
    // mock — no real API call
    if (!this.selectedFile()) return;
    alert(`Importando "${this.selectedFile()}" como ${this.format().toUpperCase()}`);
  }

  private _inferFormat(name: string): string {
    const ext = name.split('.').pop()?.toLowerCase() ?? '';
    const map: Record<string, string> = {
      xlsx: 'xlsx', xls: 'xlsx',
      csv: 'csv',
      pdf: 'pdf',
      docx: 'docx', doc: 'docx',
    };
    return map[ext] ?? 'xlsx';
  }
}
