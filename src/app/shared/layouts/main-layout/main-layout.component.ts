import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { TopbarComponent } from '../../components/topbar/topbar.component';
import { FabAssistantComponent } from '../../components/fab-assistant/fab-assistant.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent, TopbarComponent, FabAssistantComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="app-shell">
      <app-sidebar />
      <main class="app-main">
        <app-topbar />
        <div class="app-content">
          <router-outlet />
        </div>
      </main>
    </div>
    <app-fab-assistant />
  `,
  styles: [`
    .app-shell {
      display: flex;
      height: 100vh;
      width: 100%;
      overflow: hidden;
      background: var(--dc-bg);
      color: var(--dc-text);
      font-family: var(--dc-font);
    }
    .app-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      min-width: 0;
      overflow: hidden;
    }
    .app-content {
      flex: 1;
      overflow-y: auto;
      padding: 32px 40px 60px;
    }
  `],
})
export class MainLayoutComponent {}
