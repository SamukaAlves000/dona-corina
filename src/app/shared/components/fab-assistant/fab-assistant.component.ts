import { Component, ChangeDetectionStrategy, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

interface FabShortcut { key: string; label: string; }

@Component({
  selector: 'app-fab-assistant',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fab-assistant.component.html',
  styleUrl: './fab-assistant.component.scss',
})
export class FabAssistantComponent {
  private readonly router = inject(Router);

  readonly open   = signal(false);
  readonly query  = signal('');

  readonly shortcuts: FabShortcut[] = [
    { key: 'central',      label: 'Central da Corina'      },
    { key: 'gerador',      label: 'Gerar Documento'        },
    { key: 'auditoria',    label: 'Auditar'                },
    { key: 'psicossocial', label: 'Psicossocial'           },
    { key: 'esocial',      label: 'eSocial SST'            },
    { key: 'ambiental',    label: 'Licenças'               },
    { key: 'docsger',      label: 'Em Geração'             },
    { key: 'normas',       label: 'Atualização Normativa'  },
  ];

  toggle() { this.open.update(v => !v); }

  go(key: string) {
    this.open.set(false);
    this.router.navigate(['/' + key]);
  }

  goCentral() { this.go('central'); }

  onKey(event: KeyboardEvent) {
    if (event.key === 'Enter') this.goCentral();
  }
}
