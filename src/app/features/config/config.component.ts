import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

const on  = 'width:44px;height:24px;border-radius:999px;background:#4f46e5;cursor:pointer;transition:.2s;display:flex;align-items:center;padding:2px';
const off = 'width:44px;height:24px;border-radius:999px;background:#d1d5db;cursor:pointer;transition:.2s;display:flex;align-items:center;padding:2px';
const knobOn  = 'width:20px;height:20px;border-radius:50%;background:#fff;margin-left:auto;box-shadow:0 1px 3px rgba(0,0,0,.2)';
const knobOff = 'width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:0 1px 3px rgba(0,0,0,.2)';

interface CfgRow { title: string; sub: string; on: boolean; }

@Component({
  selector: 'app-config',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './config.component.html',
  styleUrl: './config.component.scss',
})
export class ConfigComponent {
  readonly rows = signal<CfgRow[]>([
    { title: 'Autenticação em dois fatores (MFA)',           sub: 'TOTP via aplicativo autenticador — obrigatório para Senior Master.',                           on: true  },
    { title: 'Sessão segura (JWT + Refresh Token rotativo)', sub: 'Tokens de curta duração com renovação automática e blacklist em logout.',                       on: true  },
    { title: 'Consentimento LGPD para colaboradores',        sub: 'Banner de consentimento granular por finalidade de dados (Art. 7.º, inc. I da LGPD).',         on: true  },
    { title: 'Anonimização de dados sensíveis nos logs',     sub: 'CPF, e-mail e telefone são mascarados nos registros de auditoria.',                             on: true  },
    { title: 'Retenção de logs — 5 anos (conforme LGPD)',    sub: 'Logs de acesso e alteração retidos por 5 anos, após isso removidos automaticamente.',           on: true  },
    { title: 'Exportação de dados pessoais sob demanda',     sub: 'Titular pode solicitar portabilidade (Art. 18.º, inc. V da LGPD).',                             on: false },
    { title: 'Notificação por e-mail em evento crítico',     sub: 'Alerta imediato para Senior Master em falhas de autenticação ou alteração estrutural.',         on: true  },
  ]);

  toggle(i: number): void {
    this.rows.update(rs => rs.map((r, idx) => idx === i ? { ...r, on: !r.on } : r));
  }

  trackStyle(r: CfgRow): string { return r.on ? on  : off;  }
  knobStyle (r: CfgRow): string { return r.on ? knobOn : knobOff; }
}
