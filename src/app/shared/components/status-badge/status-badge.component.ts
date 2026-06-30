import { Component, ChangeDetectionStrategy, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';

type BadgeVariant = 'success' | 'danger' | 'warning' | 'info' | 'purple' | 'default';

const VARIANTS: Record<BadgeVariant, { color: string; bg: string }> = {
  success: { color: '#15803d', bg: '#dcfce7' },
  danger:  { color: '#dc2626', bg: '#fee2e2' },
  warning: { color: '#b45309', bg: '#fef3c7' },
  info:    { color: '#1d4ed8', bg: '#dbeafe' },
  purple:  { color: '#6d28d9', bg: '#ede9fe' },
  default: { color: '#374151', bg: '#f1f2f8' },
};

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <span class="badge"
      [style.color]="style().color"
      [style.background]="style().bg">
      {{ label() }}
    </span>
  `,
  styles: [`
    .badge {
      display: inline-block;
      padding: 4px 11px;
      border-radius: 999px;
      font-size: 11.5px;
      font-weight: 800;
    }
  `],
})
export class StatusBadgeComponent {
  readonly label   = input.required<string>();
  readonly variant = input<BadgeVariant>('default');
  readonly style   = computed(() => VARIANTS[this.variant()] ?? VARIANTS['default']);
}
