import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-kpi-card',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="kpi" [style.border-left-color]="color()">
      <div class="kpi__label">{{ label() }}</div>
      <div class="kpi__value">{{ value() }}</div>
      @if (delta()) {
        <div class="kpi__delta" [style.color]="deltaColor()">{{ delta() }}</div>
      }
    </div>
  `,
  styles: [`
    .kpi {
      background: #fff;
      border: 1px solid #e9ebf3;
      border-left: 3px solid var(--dc-primary);
      border-radius: 14px;
      box-shadow: 0 1px 3px rgba(20,24,51,.05);
      padding: 20px;
      cursor: pointer;
      transition: box-shadow .2s, transform .2s;

      &:hover {
        box-shadow: 0 10px 26px rgba(79,70,229,.16);
        transform: translateY(-2px);
      }
    }
    .kpi__label { font-size: 13.5px; color: #6b7280; font-weight: 600; }
    .kpi__value { font-size: 38px; font-weight: 800; color: #1f2544; line-height: 1.1; margin: 6px 0 8px; }
    .kpi__delta { font-size: 12.5px; font-weight: 700; }
  `],
})
export class KpiCardComponent {
  readonly label      = input.required<string>();
  readonly value      = input.required<string | number>();
  readonly color      = input<string>('#4f46e5');
  readonly delta      = input<string>('');
  readonly deltaColor = input<string>('#16a34a');
}
