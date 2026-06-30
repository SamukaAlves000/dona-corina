import { Component, ChangeDetectionStrategy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavigationService } from '../../../core/services/navigation.service';
import { NAV } from '../../../core/models/nav.model';

interface NotifItem { text: string; time: string; type: 'danger' | 'warning' | 'info'; }
interface UserShortcut { label: string; sub: string; route?: string; }
interface ConfigItem { label: string; sub: string; route?: string; }

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent {
  readonly navSvc = inject(NavigationService);
  private readonly router = inject(Router);

  readonly searchOpen  = signal(false);
  readonly userOpen    = signal(false);
  readonly configOpen  = signal(false);
  readonly notifOpen   = signal(false);
  readonly searchQuery = signal('');

  readonly notifList: NotifItem[] = [
    { text: 'Licença LO — Itaús vence em 2 dias', time: 'há 1 h',  type: 'danger' },
    { text: 'PGR — revisão psicossocial pendente', time: 'há 3 h',  type: 'warning' },
    { text: 'eSocial S-2240 — Metalúrgica X',      time: 'ontem',   type: 'warning' },
    { text: '3 treinamentos NR-35 vencidos',        time: 'ontem',   type: 'info' },
  ];

  readonly userShortcuts: UserShortcut[] = [
    { label: 'Meu Perfil',        sub: 'Dados pessoais e senha',          route: 'config' },
    { label: 'Preferências',      sub: 'Tema e densidade',                route: 'config' },
    { label: 'Chave de API',      sub: 'Claude · REGULARE',               route: 'config' },
    { label: 'Sair',              sub: 'Encerrar sessão' },
  ];

  readonly configItems: ConfigItem[] = [
    { label: 'Segurança & LGPD',      sub: 'MFA, tokens, política de dados', route: 'config' },
    { label: 'Integrações',           sub: 'APIs, webhooks',                  route: 'integracoes' },
    { label: 'Notificações',          sub: 'Alertas e canais',                route: 'config' },
    { label: 'Base de Conhecimento',  sub: 'Treinar a Corina',                route: 'base' },
    { label: 'Logs e Auditoria',      sub: 'Trilha de ações',                 route: 'logs' },
  ];

  readonly cmdModules = computed(() => {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return [];
    return NAV.filter(n => n.label.toLowerCase().includes(q)).slice(0, 8);
  });

  toggleSearch() {
    this.searchOpen.update(v => !v);
    if (!this.searchOpen()) this.searchQuery.set('');
    this.userOpen.set(false); this.configOpen.set(false); this.notifOpen.set(false);
  }
  toggleUser()   { this.userOpen.update(v => !v);   this.searchOpen.set(false); this.configOpen.set(false); this.notifOpen.set(false); }
  toggleConfig() { this.configOpen.update(v => !v); this.searchOpen.set(false); this.userOpen.set(false);   this.notifOpen.set(false); }
  toggleNotif()  { this.notifOpen.update(v => !v);  this.searchOpen.set(false); this.userOpen.set(false);   this.configOpen.set(false); }
  closeAll()     { this.searchOpen.set(false); this.userOpen.set(false); this.configOpen.set(false); this.notifOpen.set(false); }

  navigate(route: string | undefined) {
    if (route) { this.router.navigate(['/' + route]); }
    this.closeAll();
  }

  notifDot(type: 'danger' | 'warning' | 'info'): string {
    const m: Record<string, string> = { danger: '#e5484d', warning: '#f59e0b', info: '#4f46e5' };
    const bg = m[type];
    return `width:9px;height:9px;border-radius:50%;background:${bg};flex:none;margin-top:4px`;
  }
}
