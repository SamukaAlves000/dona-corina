import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { NavigationService } from '../../../core/services/navigation.service';
import { NAV, NavItem } from '../../../core/models/nav.model';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  readonly nav = inject(NavigationService);
  private readonly sanitizer = inject(DomSanitizer);
  readonly navItems: NavItem[] = NAV;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  readonly icons: Record<string, any[][]> = {
    dashboard:    [['rect',3,3,7,7],['rect',14,3,7,7],['rect',14,14,7,7],['rect',3,14,7,7]],
    central:      [['path',"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"]],
    cadastros:    [['path',"M3 21h18M6 21V7l6-4 6 4v14M9 9h.01M9 13h.01M9 17h.01M14 9h.01M14 13h.01M14 17h.01"]],
    integracoes:  [['path',"M9 17H7A5 5 0 0 1 7 7h2"],['path',"M15 7h2a5 5 0 0 1 0 10h-2"],['line',8,12,16,12]],
    importar:     [['path',"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"],['polyline',[[7,10],[12,15],[17,10]]],['line',12,15,12,3]],
    gerador:      [['path',"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"],['path',"M14 2v6h6"]],
    docsger:      [['path',"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"],['path',"M14 2v6h6"],['path',"M9 15l2 2 4-4"]],
    biblioteca:   [['path',"M12 2 2 7l10 5 10-5z"],['path',"M2 17l10 5 10-5"],['path',"M2 12l10 5 10-5"]],
    auditoria:    [['circle',11,11,8],['line',21,21,16.65,16.65]],
    planos:       [['path',"M9 11l3 3L22 4"],['path',"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"]],
    higiene:      [['path',"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"]],
    psicossocial: [['circle',12,9,7],['path',"M8.5 9h2l1-2 1.5 4 1-2h1.5"],['path',"M9 19h6"],['path',"M10 22h4"]],
    esocial:      [['path',"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"],['path',"M14 2v6h6"],['path',"M9.5 13L8 14.5 9.5 16"],['path',"M14.5 13L16 14.5 14.5 16"]],
    os:           [['rect',8,2,8,4],['path',"M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"],['path',"M9 12h6M9 16h4"]],
    procedimentos:[['line',8,6,21,6],['line',8,12,21,12],['line',8,18,21,18],['line',3,6,3.01,6],['line',3,12,3.01,12],['line',3,18,3.01,18]],
    treinamentos: [['path',"M22 10L12 5 2 10l10 5 10-5z"],['path',"M6 12v5c0 1 2.7 2.5 6 2.5s6-1.5 6-2.5v-5"]],
    epi:          [['path',"M3 18a9 9 0 0 1 18 0z"],['path',"M10 9V5.5a2 2 0 0 1 4 0V9"],['line',2,18,22,18]],
    pericias:     [['rect',2,7,20,14],['path',"M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"]],
    ambiental:    [['path',"M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"],['path',"M2 21c0-3 1.85-5.36 5.08-6"]],
    compliance:   [['circle',12,12,9],['path',"M9 12l2 2 4-4"]],
    grc:          [['circle',12,12,9],['path',"M3 12h18"],['path',"M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"]],
    base:         [['path',"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"],['path',"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"]],
    normas:       [['path',"M12 2a3 3 0 0 0-3 3v1H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-2V5a3 3 0 0 0-3-3z"],['path',"M9 13l2 2 4-4"]],
    admin:        [['path',"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"],['circle',9,7,4],['path',"M22 21v-2a4 4 0 0 0-3-3.87"],['path',"M16 3.13a4 4 0 0 1 0 7.75"]],
    logs:         [['path',"M3 3v5h5"],['path',"M3.05 13A9 9 0 1 0 6 5.3L3 8"],['path',"M12 7v5l4 2"]],
  };

  getSvg(name: string): SafeHtml {
    const segs = this.icons[name] ?? [];
    const inner = segs.map(s => {
      if (s[0] === 'rect')     return `<rect x="${s[1]}" y="${s[2]}" width="${s[3]}" height="${s[4]}" rx="1.6"/>`;
      if (s[0] === 'circle')   return `<circle cx="${s[1]}" cy="${s[2]}" r="${s[3]}"/>`;
      if (s[0] === 'line')     return `<line x1="${s[1]}" y1="${s[2]}" x2="${s[3]}" y2="${s[4]}"/>`;
      if (s[0] === 'polyline') return `<polyline points="${(s[1] as number[][]).map((p: number[]) => p.join(',')).join(' ')}"/>`;
      return `<path d="${s[1]}"/>`;
    }).join('');
    const svg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }
}
