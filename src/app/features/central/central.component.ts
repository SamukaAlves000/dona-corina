import {
  Component,
  ChangeDetectionStrategy,
  signal,
  ElementRef,
  ViewChild,
  AfterViewChecked,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

interface Message {
  text: string;
  fromUser: boolean;
}

interface ActionCard {
  icon: string;
  title: string;
  sub: string;
}

interface ConfBar {
  label: string;
  pct: string;
  value: number;
  color: string;
}

interface CriticalAlert {
  tag: string;
  tagClass: string;
  text: string;
}

interface PendencyItem {
  empresa: string;
  qtd: string;
  det: string;
}

interface DocItem {
  doc: string;
  meta: string;
}

const CORINA_RESPONSES: string[] = [
  'Entendido! Vou analisar os dados e preparar um relatório completo para você.',
  'Ótima questão técnica! Com base nos documentos cadastrados, posso identificar os principais pontos de atenção.',
  'Já localizei as informações necessárias nos módulos integrados. Aqui está minha análise inicial.',
  'Certo! Vou cruzar os dados de todas as empresas cadastradas e apresentar as inconsistências encontradas.',
  'Perfeito! Baseando-me nas NRs vigentes, aqui está minha recomendação técnica detalhada.',
];

@Component({
  selector: 'app-central',
  standalone: true,
  imports: [CommonModule, FormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './central.component.html',
  styleUrls: ['./central.component.scss'],
})
export class CentralComponent implements AfterViewChecked {
  @ViewChild('chatScroll') private chatScroll!: ElementRef<HTMLDivElement>;
  private readonly sanitizer = inject(DomSanitizer);

  private _responseIndex = 0;
  private _shouldScroll = false;

  // ── Shared icon map (mirrors sidebar) ────────────────────────────────────────
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly icons: Record<string, any[][]> = {
    gerador:   [['path',"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"],['path',"M14 2v6h6"]],
    auditoria: [['circle',11,11,8],['line',21,21,16.65,16.65]],
    higiene:   [['path',"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"]],
    planos:    [['path',"M9 11l3 3L22 4"],['path',"M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"]],
    esocial:   [['path',"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"],['path',"M14 2v6h6"],['path',"M9.5 13L8 14.5 9.5 16"],['path',"M14.5 13L16 14.5 14.5 16"]],
    grc:       [['circle',12,12,9],['path',"M3 12h18"],['path',"M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18"]],
    docsger:   [['path',"M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"],['path',"M14 2v6h6"],['path',"M9 15l2 2 4-4"]],
    central:   [['path',"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"]],
  };

  private buildSvg(name: string, size = 22): SafeHtml {
    const segs = this.icons[name] ?? this.icons['gerador'];
    const inner = segs.map((s: any[]) => {
      if (s[0] === 'rect')     return `<rect x="${s[1]}" y="${s[2]}" width="${s[3]}" height="${s[4]}" rx="1.6"/>`;
      if (s[0] === 'circle')   return `<circle cx="${s[1]}" cy="${s[2]}" r="${s[3]}"/>`;
      if (s[0] === 'line')     return `<line x1="${s[1]}" y1="${s[2]}" x2="${s[3]}" y2="${s[4]}"/>`;
      if (s[0] === 'polyline') return `<polyline points="${(s[1] as number[][]).map((p: number[]) => p.join(',')).join(' ')}"/>`;
      return `<path d="${s[1]}"/>`;
    }).join('');
    const svg = `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${inner}</svg>`;
    return this.sanitizer.bypassSecurityTrustHtml(svg);
  }

  // ── Signals ─────────────────────────────────────────────────────────────────
  readonly messages = signal<Message[]>([
    {
      text: 'Olá! Sou a Dona Corina, Auditora Inteligente da MVN. Como posso ajudar?',
      fromUser: false,
    },
  ]);
  readonly inputValue = signal('');
  readonly typing = signal(false);

  // ── Action cards — icon keys match sidebar icons map ──────────────────────────
  readonly actions: ActionCard[] = [
    { icon: 'higiene',  title: 'Gerar PGR',        sub: 'Programa de Gerenciamento de Riscos' },
    { icon: 'auditoria',title: 'Auditar NRs',       sub: 'Verificação de conformidade normativa' },
    { icon: 'planos',   title: 'Análise de Risco',  sub: 'Mapeamento e avaliação de riscos' },
    { icon: 'docsger',  title: 'Plano de Ação',     sub: 'Geração e acompanhamento de PAC' },
    { icon: 'esocial',  title: 'eSocial SST',       sub: 'Eventos S-2210, S-2220, S-2240' },
    { icon: 'grc',      title: 'Relatório ESG',     sub: 'Indicadores de sustentabilidade' },
  ];

  // ── Conformidade bars ────────────────────────────────────────────────────────
  readonly confBars: ConfBar[] = [
    { label: 'Conformidade Geral', pct: '78%', value: 78, color: '#4f46e5' },
    { label: 'eSocial SST',        pct: '92%', value: 92, color: '#16a34a' },
    { label: 'Higiene Ocup.',      pct: '67%', value: 67, color: '#f59e0b' },
    { label: 'Ambiental',          pct: '54%', value: 54, color: '#e5484d' },
  ];

  // ── Critical alerts ──────────────────────────────────────────────────────────
  readonly criticalAlerts: CriticalAlert[] = [
    { tag: 'ALTO',  tagClass: 'alto',   text: 'Licença LO — Itaús do Vale vence em 2 dias' },
    { tag: 'MÉDIO', tagClass: 'medio',  text: 'PGR — revisão psicossocial pendente há 15 dias' },
    { tag: 'ALTO',  tagClass: 'alto',   text: 'eSocial S-2240 — 3 eventos em atraso na Metalúrgica X' },
    { tag: 'BAIXO', tagClass: 'baixo',  text: 'Treinamento NR-35 vencido — 2 colaboradores' },
  ];

  // ── Quick shortcuts (right panel) ────────────────────────────────────────────
  readonly quickShortcuts = [
    { label: 'Gerar Doc',    icon: 'gerador' },
    { label: 'Auditar',      icon: 'auditoria' },
    { label: 'eSocial SST',  icon: 'esocial' },
  ];

  // ── Pendências ───────────────────────────────────────────────────────────────
  readonly pendencies: PendencyItem[] = [
    { empresa: 'Itaús do Vale Ltda',  qtd: '5 pendências', det: 'PGR, LTCAT, eSocial S-2240' },
    { empresa: 'Metalúrgica X S.A.', qtd: '3 pendências', det: 'S-2220, treinamentos, EPI' },
    { empresa: 'Transportes Ltda',   qtd: '7 pendências', det: 'PCMSO, licença, auditorias' },
    { empresa: 'Empresa Y Eng.',     qtd: '2 pendências', det: 'Plano de ação, relatório' },
  ];

  // ── Últimos docs analisados ──────────────────────────────────────────────────
  readonly recentDocs: DocItem[] = [
    { doc: 'PGR — Itaús do Vale Ltda',     meta: 'Analisado hoje · 98% conformidade' },
    { doc: 'LTCAT — Metalúrgica X',        meta: 'Analisado ontem · 74% conformidade' },
    { doc: 'PCMSO — Transportes Ltda',     meta: 'há 2 dias · 81% conformidade' },
    { doc: 'Laudo de Insalubridade — Y',   meta: 'há 3 dias · 65% conformidade' },
  ];

  // ── Sugestões ────────────────────────────────────────────────────────────────
  readonly suggestions: string[] = [
    'Incluir avaliação de riscos psicossociais no PGR da Metalúrgica X conforme nova NR-1.',
    'Atualizar LTCAT com ruído acima de 85 dB(A) na linha de prensagem — Itaús do Vale.',
    'Regularizar envio do evento S-2240 para 3 funções com EPC identificado no PPRA.',
    'Revisar Plano de Ação das 7 pendências da Transportes Ltda antes do prazo de 30 dias.',
  ];

  // ── Module shortcuts ─────────────────────────────────────────────────────────
  readonly moduleShortcuts: string[] = [
    'Dashboard', 'Cadastros', 'Gerador', 'Auditoria', 'Planos',
    'Higiene', 'Psicossocial', 'eSocial', 'OS', 'Treinamentos',
    'EPI', 'Ambiental',
  ];

  // ── AfterViewChecked auto-scroll ─────────────────────────────────────────────
  ngAfterViewChecked(): void {
    if (this._shouldScroll && this.chatScroll) {
      const el = this.chatScroll.nativeElement;
      el.scrollTop = el.scrollHeight;
      this._shouldScroll = false;
    }
  }

  // ── Icon helpers — use sidebar icon map via DomSanitizer ────────────────────
  actionSvg(icon: string): SafeHtml {
    return this.buildSvg(icon, 22);
  }

  shortcutSvg(icon: string): SafeHtml {
    return this.buildSvg(icon, 18);
  }

  barColor(value: number): string {
    if (value >= 85) return '#16a34a';
    if (value >= 70) return '#4f46e5';
    if (value >= 55) return '#f59e0b';
    return '#e5484d';
  }

  // ── Chat ─────────────────────────────────────────────────────────────────────
  onInput(value: string): void {
    this.inputValue.set(value);
  }

  onKey(event: KeyboardEvent): void {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.send();
    }
  }

  send(): void {
    const text = this.inputValue().trim();
    if (!text || this.typing()) return;

    this.messages.update(msgs => [...msgs, { text, fromUser: true }]);
    this.inputValue.set('');
    this.typing.set(true);
    this._shouldScroll = true;

    const responseText = CORINA_RESPONSES[this._responseIndex % CORINA_RESPONSES.length];
    this._responseIndex++;

    setTimeout(() => {
      this.messages.update(msgs => [...msgs, { text: responseText, fromUser: false }]);
      this.typing.set(false);
      this._shouldScroll = true;
    }, 1200);
  }

  sendAction(title: string): void {
    this.inputValue.set(`Preciso de ajuda com: ${title}`);
    this.send();
  }
}
