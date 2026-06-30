import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-os',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './os.component.html',
  styleUrl: './os.component.scss',
})
export class OsComponent {
  readonly empresa    = 'Itaús Fertilizantes Ltda';
  readonly unidade    = 'Matriz · Produção';
  readonly cargo      = 'Soldador';
  readonly cbo        = '7243-15';
  readonly atividade  = 'Soldagem de estruturas metálicas (eletrodo revestido)';
  readonly riscos     = ['Fumos metálicos', 'Ruído > 85 dB(A)', 'Radiação UV/IR', 'Choque elétrico'];
  readonly epis       = ['Máscara de solda', 'Protetor auricular', 'Luva de raspa', 'Avental de raspa'];
  readonly treinos    = ['NR-01 GRO', 'NR-06 EPI', 'NR-10 Elétrica'];
}
