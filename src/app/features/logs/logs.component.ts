import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface LogEntry {
  id: string;
  time: string;
  actor: string;
  kind: string;
  tagStyle: string;
  event: string;
  source: string;
  hash: string;
}

const tag = (bg: string, color: string) =>
  `font-size:10.5px;font-weight:800;padding:3px 9px;border-radius:6px;background:${bg};color:${color}`;

const LOG_DATA: LogEntry[] = [
  { id: 'L001', time: '22/06 · 14:32:10', actor: 'samuel@mvnconsultant.com.br', kind: 'AUTH',    tagStyle: tag('#eef0fe','#4f46e5'), event: 'Login bem-sucedido',              source: 'Auth',       hash: '0xA3F2...9C1E' },
  { id: 'L002', time: '22/06 · 14:33:45', actor: 'samuel@mvnconsultant.com.br', kind: 'GERADOR', tagStyle: tag('#f0fdf4','#16a34a'), event: 'PGR gerado — Itaús do Vale',     source: 'Gerador',    hash: '0xB7D4...1A30' },
  { id: 'L003', time: '22/06 · 14:41:00', actor: 'carlos@itausdo.com.br',       kind: 'ADMIN',   tagStyle: tag('#fff7ed','#d97706'), event: 'Tentativa de acesso negada',     source: 'Admin',      hash: '0xC9E6...5B72' },
  { id: 'L004', time: '22/06 · 15:02:18', actor: 'ana@metalurgicax.com.br',     kind: 'ESOCIAL', tagStyle: tag('#faf5ff','#7c3aed'), event: 'S-2220 transmitido com sucesso', source: 'eSocial',    hash: '0xD1F8...7C03' },
  { id: 'L005', time: '22/06 · 15:10:33', actor: 'sistema',                     kind: 'ERRO',    tagStyle: tag('#fef2f2','#dc2626'), event: 'Falha ao conectar API eSocial',  source: 'Integração', hash: '0xE4A0...2D94' },
  { id: 'L006', time: '22/06 · 15:25:00', actor: 'samuel@mvnconsultant.com.br', kind: 'ADMIN',   tagStyle: tag('#fff7ed','#d97706'), event: 'Usuário pedro@transportes desativado', source: 'Admin', hash: '0xF5B2...8E15' },
  { id: 'L007', time: '22/06 · 15:48:12', actor: 'dr.souza@clinica.com',        kind: 'DOCS',    tagStyle: tag('#eef0fe','#4f46e5'), event: 'PCMSO assinado digitalmente',    source: 'DocsGer',    hash: '0x12C4...0F67' },
  { id: 'L008', time: '22/06 · 16:05:40', actor: 'sistema',                     kind: 'SISTEMA', tagStyle: tag('#f0f9ff','#0369a1'), event: 'Backup automático concluído',    source: 'Sistema',    hash: '0x23D6...1A78' },
];

const FILTERS = ['Todos', 'Auth', 'Gerador', 'Admin', 'eSocial', 'Integração'] as const;

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss',
})
export class LogsComponent {
  readonly activeFilter = signal<string>('Todos');
  readonly filters = FILTERS;
  readonly all = LOG_DATA;

  readonly filtered = computed(() => {
    const f = this.activeFilter();
    if (f === 'Todos') return this.all;
    return this.all.filter(l => l.source === f);
  });
}
