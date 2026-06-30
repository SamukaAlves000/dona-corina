import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./shared/layouts/main-layout/main-layout.component').then(m => m.MainLayoutComponent),
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

      { path: 'dashboard',    title: 'Dashboard · Dona Corina',          loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      { path: 'central',      title: 'Central da Corina',                 loadComponent: () => import('./features/central/central.component').then(m => m.CentralComponent) },
      { path: 'cadastros',    title: 'Cadastros de Clientes',             loadComponent: () => import('./features/cadastros/cadastros.component').then(m => m.CadastrosComponent) },
      { path: 'integracoes',  title: 'Integrações Externas',              loadComponent: () => import('./features/integracoes/integracoes.component').then(m => m.IntegracoesComponent) },
      { path: 'importar',     title: 'Importação de Dados',               loadComponent: () => import('./features/importar/importar.component').then(m => m.ImportarComponent) },
      { path: 'gerador',      title: 'Gerador de Documentos',             loadComponent: () => import('./features/gerador/gerador.component').then(m => m.GeradorComponent) },
      { path: 'template',     title: 'Template Inteligente',              loadComponent: () => import('./features/gerador/template-stepper/template-stepper.component').then(m => m.TemplateStepperComponent) },
      { path: 'docsger',      title: 'Documentos em Geração',             loadComponent: () => import('./features/docsger/docsger.component').then(m => m.DocsgerComponent) },
      { path: 'biblioteca',   title: 'Biblioteca de Templates',           loadComponent: () => import('./features/biblioteca/biblioteca.component').then(m => m.BibliotecaComponent) },
      { path: 'auditoria',    title: 'Auditoria Inteligente',             loadComponent: () => import('./features/auditoria/auditoria.component').then(m => m.AuditoriaComponent) },
      { path: 'planos',       title: 'Plano de Ação Inteligente',         loadComponent: () => import('./features/planos/planos.component').then(m => m.PlanosComponent) },
      { path: 'higiene',      title: 'Higiene Ocupacional Inteligente',   loadComponent: () => import('./features/higiene/higiene.component').then(m => m.HigieneComponent) },
      { path: 'psicossocial', title: 'Avaliação de Riscos Psicossociais', loadComponent: () => import('./features/psicossocial/psicossocial.component').then(m => m.PsicossocialComponent) },
      { path: 'esocial',      title: 'eSocial SST',                       loadComponent: () => import('./features/esocial/esocial.component').then(m => m.EsocialComponent) },
      { path: 'os',           title: 'Ordens de Serviço e POP',           loadComponent: () => import('./features/os/os.component').then(m => m.OsComponent) },
      { path: 'procedimentos',title: 'Procedimentos de Trabalho',         loadComponent: () => import('./features/procedimentos/procedimentos.component').then(m => m.ProcedimentosComponent) },
      { path: 'treinamentos', title: 'Treinamentos de SST',               loadComponent: () => import('./features/treinamentos/treinamentos.component').then(m => m.TreinamentosComponent) },
      { path: 'epi',          title: 'Ficha de Entrega de EPI',           loadComponent: () => import('./features/epi/epi.component').then(m => m.EpiComponent) },
      { path: 'pericias',     title: 'Módulo de Perícias',                loadComponent: () => import('./features/pericias/pericias.component').then(m => m.PericiaComponent) },
      { path: 'ambiental',    title: 'Gestão de Licenças e Condicionantes', loadComponent: () => import('./features/ambiental/ambiental.component').then(m => m.AmbientalComponent) },
      { path: 'compliance',   title: 'Compliance / ESG',                  loadComponent: () => import('./features/compliance/compliance.component').then(m => m.ComplianceComponent) },
      { path: 'grc',          title: 'GRC / Sustentabilidade',            loadComponent: () => import('./features/grc/grc.component').then(m => m.GrcComponent) },
      { path: 'base',         title: 'Base de Conhecimento',              loadComponent: () => import('./features/base/base.component').then(m => m.BaseComponent) },
      { path: 'normas',       title: 'Atualização Normativa',             loadComponent: () => import('./features/normas/normas.component').then(m => m.NormasComponent) },
      { path: 'admin',        title: 'Governança e Perfis',               loadComponent: () => import('./features/admin/admin.component').then(m => m.AdminComponent) },
      { path: 'logs',         title: 'Logs e Auditoria',                  loadComponent: () => import('./features/logs/logs.component').then(m => m.LogsComponent) },
      { path: 'config',       title: 'Segurança & LGPD',                  loadComponent: () => import('./features/config/config.component').then(m => m.ConfigComponent) },

      { path: '**', redirectTo: 'dashboard' },
    ],
  },
];
