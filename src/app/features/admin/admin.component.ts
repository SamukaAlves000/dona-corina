import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

const rs = (bg: string, color: string) =>
  `font-size:11.5px;font-weight:700;padding:4px 10px;border-radius:999px;background:${bg};color:${color}`;

const ms = (bg: string, color: string) =>
  `font-size:11px;font-weight:700;padding:3px 8px;border-radius:6px;background:${bg};color:${color}`;

const kc = (left: string) =>
  `background:#fff;border:1px solid #e9ebf3;border-left:4px solid ${left};border-radius:16px;padding:20px;box-shadow:0 1px 3px rgba(20,24,51,.05)`;

interface AdminUser { name: string; email: string; roleStyle: string; role: string; client: string; mfaStyle: string; mfa: string; }
interface AdminPerm { role: string; scope: string; }
interface GovProfile { accent: string; n: string; badgeStyle: string; role: string; user: string; nivel: string; can: string[]; cannot: string[]; }

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent {
  readonly adminKpis = [
    { cardStyle: kc('#4f46e5'), label: 'Total Usuários',  value: '18' },
    { cardStyle: kc('#16a34a'), label: 'Ativos',          value: '15' },
    { cardStyle: kc('#f59e0b'), label: 'Perfis RBAC',     value: '5'  },
    { cardStyle: kc('#7c3aed'), label: 'Clientes',        value: '8'  },
  ];

  readonly adminUsers: AdminUser[] = [
    { name: 'Samuel Alves',   email: 'samuel@mvnconsultant.com.br', roleStyle: rs('#eef0fe','#4f46e5'), role: 'Senior Master', client: 'MVN Consultoria',  mfaStyle: ms('#f0fdf4','#166534'), mfa: 'Ativo'   },
    { name: 'Carlos Souza',   email: 'carlos@itausdo.com.br',       roleStyle: rs('#f0fdf4','#166534'), role: 'Gestor SST',    client: 'Itaús do Vale',    mfaStyle: ms('#fef2f2','#dc2626'), mfa: 'Inativo' },
    { name: 'Ana Lima',       email: 'ana@metalurgicax.com.br',     roleStyle: rs('#fffbeb','#92400e'), role: 'Técnico',       client: 'Metalúrgica X',    mfaStyle: ms('#f0fdf4','#166534'), mfa: 'Ativo'   },
    { name: 'Pedro Costa',    email: 'pedro@transportes.com.br',    roleStyle: rs('#faf5ff','#7c3aed'), role: 'Visualizador',  client: 'Transportes Ltda', mfaStyle: ms('#fef2f2','#dc2626'), mfa: 'Inativo' },
    { name: 'Maria Ferreira', email: 'maria@empresay.com.br',       roleStyle: rs('#fffbeb','#92400e'), role: 'Técnico',       client: 'Empresa Y Eng.',   mfaStyle: ms('#f0fdf4','#166534'), mfa: 'Ativo'   },
  ];

  readonly adminPerms: AdminPerm[] = [
    { role: 'Senior Master',    scope: 'Acesso total · pode alterar estrutura'       },
    { role: 'Gestor SST',       scope: 'Leitura e escrita · sem admin global'         },
    { role: 'Técnico',          scope: 'Leitura e escrita nos módulos SST'            },
    { role: 'Visualizador',     scope: 'Somente leitura · sem exportação'             },
    { role: 'Auditor Externo',  scope: 'Leitura limitada · escopo do cliente'         },
  ];

  readonly govProfiles: GovProfile[] = [
    { accent: '#7c3aed', n: '01', badgeStyle: rs('#eef0fe','#4f46e5'),   role: 'Senior Master', user: 'Eng. Melqui (MVN)',    nivel: 'Acesso global irrestrito',  can: ['Aprovar atualizações normativas','Gerenciar usuários e perfis','Alterar config. estruturais','Acesso pleno a todos os clientes','Visualizar logs de auditoria'], cannot: [] },
    { accent: '#4f46e5', n: '02', badgeStyle: rs('#f0fdf4','#166534'),   role: 'Master',        user: 'Gestor Master',        nivel: 'Acesso multi-cliente',      can: ['Criar e gerenciar documentos','Acessar todos os módulos SST','Aprovar planos de ação','Exportar relatórios'], cannot: ['Alterar config. estruturais'] },
    { accent: '#16a34a', n: '03', badgeStyle: rs('#fffbeb','#92400e'),   role: 'Gestor SST',    user: 'Eng. Responsável',     nivel: 'Escopo por cliente',        can: ['Criar e editar documentos SST','Aprovar laudos e relatórios','Acessar eSocial do cliente'], cannot: ['Gerenciar usuários','Alterar base normativa'] },
    { accent: '#f59e0b', n: '04', badgeStyle: rs('#fef9c3','#713f12'),   role: 'Técnico',       user: 'Técnico de Segurança', nivel: 'Escopo por módulo',         can: ['Criar medições e laudos','Preencher formulários SST','Visualizar documentos'], cannot: ['Aprovar documentos','Gerenciar usuários','Acessar logs'] },
    { accent: '#6b7280', n: '05', badgeStyle: rs('#f3f4fb','#6b7280'),   role: 'Visualizador',  user: 'Cliente / Auditor',    nivel: 'Somente leitura',           can: ['Visualizar documentos aprovados','Exportar PDFs autorizados'], cannot: ['Criar ou editar dados','Acessar módulos admin','Ver logs de outros'] },
  ];

  readonly govScopes = ['Perfil (RBAC)','Cliente','Módulo','Ambiente','Ação','Horário','IP','MFA','Escopo de dados'];
  readonly govLogFields = ['Quem','Quando','O quê','De onde (IP)','Módulo','Objeto alterado','Antes','Depois'];
}
