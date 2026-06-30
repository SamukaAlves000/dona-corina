import {
  Component,
  ChangeDetectionStrategy,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

type IntegStatus = 'connected' | 'pending' | 'unconfigured';

interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  iconBg: string;
  status: IntegStatus;
  statusLabel: string;
  lastSync?: string;
}

interface ConnectedInteg {
  nome: string;
  sync: string;
  status: string;
  dotColor: string;
  statusColor: string;
  statusBg: string;
}

@Component({
  selector: 'app-integracoes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './integracoes.component.html',
  styleUrls: ['./integracoes.component.scss'],
})
export class IntegracoesComponent {
  readonly selectedCard = signal<string | null>(null);

  readonly systemName = signal('');
  readonly apiUrl = signal('');
  readonly authType = signal('Bearer Token');
  readonly ambiente = signal('Teste / Sandbox');
  readonly syncType = signal('Manual');

  readonly toastMessage = signal<string | null>(null);
  readonly copiedWebhook = signal(false);

  readonly webhookUrl = 'https://api.donacorina.com.br/webhooks/v1/inbound';
  readonly webhookPayload = `{
  "event": "esocial.s2220_updated",
  "empresa_id": "emp_0123",
  "data": { "matricula": "0042", "exame": "periódico" },
  "ts": "2026-06-22T10:30:00Z"
}`;

  readonly integrations = signal<Integration[]>([
    {
      id: 'regulare',
      name: 'REGULARE API',
      description: 'Consulta e envio de laudos SST ao sistema REGULARE do MTE.',
      icon: 'R',
      iconBg: '#4f46e5',
      status: 'connected',
      statusLabel: 'Conectado',
      lastSync: '10 min atrás',
    },
    {
      id: 'claude',
      name: 'Claude API',
      description: 'Motor de inteligência artificial generativa para todos os módulos Corina.',
      icon: 'AI',
      iconBg: '#7c3aed',
      status: 'connected',
      statusLabel: 'Conectado',
      lastSync: '2 min atrás',
    },
    {
      id: 'esocial',
      name: 'eSocial Produção',
      description: 'Transmissão de eventos SST (S-2210, S-2220, S-2240) ao ambiente produtivo.',
      icon: 'eS',
      iconBg: '#059669',
      status: 'connected',
      statusLabel: 'Conectado',
      lastSync: '1h atrás',
    },
    {
      id: 'caged',
      name: 'CAGED / MTE',
      description: 'Declaração mensal de admissões e desligamentos ao Ministério do Trabalho.',
      icon: 'MTE',
      iconBg: '#d97706',
      status: 'pending',
      statusLabel: 'Pendente',
    },
    {
      id: 'cnpj',
      name: 'CNPJ Receita Federal',
      description: 'Consulta automática de dados cadastrais pelo CNPJ na Receita Federal.',
      icon: 'RF',
      iconBg: '#0284c7',
      status: 'connected',
      statusLabel: 'Conectado',
      lastSync: '30 min atrás',
    },
    {
      id: 'cep',
      name: 'CEP / Endereço',
      description: 'Preenchimento automático de endereço via ViaCEP / BrasilAPI.',
      icon: 'CEP',
      iconBg: '#16a34a',
      status: 'connected',
      statusLabel: 'Conectado',
      lastSync: '5 min atrás',
    },
    {
      id: 'assinatura',
      name: 'Assinatura Digital',
      description: 'Integração com plataformas de assinatura eletrônica (DocuSign, D4Sign).',
      icon: 'AS',
      iconBg: '#6b7280',
      status: 'unconfigured',
      statusLabel: 'Não configurado',
    },
    {
      id: 'fgts',
      name: 'FGTS Digital',
      description: 'Recolhimento e declaração do FGTS pelo novo sistema FGTS Digital da CEF.',
      icon: 'FG',
      iconBg: '#b45309',
      status: 'pending',
      statusLabel: 'Pendente',
    },
    {
      id: 'sesi',
      name: 'SESI / SENAI',
      description: 'Integração com portais SESI e SENAI para capacitações e normas técnicas.',
      icon: 'SS',
      iconBg: '#6b7280',
      status: 'unconfigured',
      statusLabel: 'Não configurado',
    },
  ]);

  readonly connectedList = signal<ConnectedInteg[]>([
    { nome: 'REGULARE API',          sync: 'Há 10 min',   status: 'Ativo',    dotColor: '#22c55e', statusColor: '#15803d', statusBg: '#dcfce7' },
    { nome: 'Claude API',            sync: 'Há 2 min',    status: 'Ativo',    dotColor: '#22c55e', statusColor: '#15803d', statusBg: '#dcfce7' },
    { nome: 'eSocial Produção',      sync: 'Há 1h',       status: 'Ativo',    dotColor: '#22c55e', statusColor: '#15803d', statusBg: '#dcfce7' },
    { nome: 'CNPJ Receita Federal',  sync: 'Há 30 min',   status: 'Ativo',    dotColor: '#22c55e', statusColor: '#15803d', statusBg: '#dcfce7' },
    { nome: 'CEP / Endereço',        sync: 'Há 5 min',    status: 'Ativo',    dotColor: '#22c55e', statusColor: '#15803d', statusBg: '#dcfce7' },
    { nome: 'CAGED / MTE',           sync: 'Aguardando',  status: 'Pendente', dotColor: '#f59e0b', statusColor: '#92400e', statusBg: '#fef3c7' },
    { nome: 'FGTS Digital',          sync: 'Aguardando',  status: 'Pendente', dotColor: '#f59e0b', statusColor: '#92400e', statusBg: '#fef3c7' },
  ]);

  readonly authTypes = ['Bearer Token', 'API Key (header)', 'OAuth 2.0', 'Basic Auth'];
  readonly ambientes = ['Teste / Sandbox', 'Produção'];
  readonly syncTypes = ['Manual', 'Diária', 'Tempo real (webhook)'];

  readonly connectedCount = computed(() =>
    this.integrations().filter((i) => i.status === 'connected').length,
  );
  readonly pendingCount = computed(() =>
    this.integrations().filter((i) => i.status === 'pending').length,
  );
  readonly unconfiguredCount = computed(() =>
    this.integrations().filter((i) => i.status === 'unconfigured').length,
  );

  selectCard(id: string): void {
    this.selectedCard.set(this.selectedCard() === id ? null : id);
  }

  statusVariant(status: IntegStatus): string {
    const map: Record<IntegStatus, string> = {
      connected:    'status--connected',
      pending:      'status--pending',
      unconfigured: 'status--unconfigured',
    };
    return map[status];
  }

  cardAction(status: IntegStatus): string {
    return status === 'connected' ? 'Testar Conexão' : 'Configurar';
  }

  onTestConn(): void {
    this.showToast('Testando conexão… OK');
  }

  onSaveInteg(): void {
    this.showToast('Integração salva com sucesso!');
  }

  copyWebhook(): void {
    navigator.clipboard?.writeText(this.webhookUrl).catch(() => {});
    this.copiedWebhook.set(true);
    setTimeout(() => this.copiedWebhook.set(false), 2000);
  }

  private showToast(msg: string): void {
    this.toastMessage.set(msg);
    setTimeout(() => this.toastMessage.set(null), 3000);
  }
}
