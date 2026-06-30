export interface NavItem {
  key: string;
  label: string;
  num: string;
  title: string;
  icon: string;
}

export const NAV: NavItem[] = [
  { key: 'dashboard',     label: 'Dashboard',               num: '1',  title: 'DASHBOARD DA CORINA',                  icon: 'dashboard' },
  { key: 'central',       label: 'Central da Corina',        num: '2',  title: 'CENTRAL DA DONA CORINA',               icon: 'central' },
  { key: 'cadastros',     label: 'Cadastros de Clientes',    num: '3',  title: 'CADASTROS DE CLIENTES',                icon: 'cadastros' },
  { key: 'integracoes',   label: 'Integrações Externas',     num: '4',  title: 'INTEGRAÇÕES EXTERNAS',                 icon: 'integracoes' },
  { key: 'importar',      label: 'Importação de Dados',      num: '5',  title: 'IMPORTAÇÃO DE DADOS',                  icon: 'importar' },
  { key: 'gerador',       label: 'Gerador de Documentos',    num: '6',  title: 'GERADOR DE DOCUMENTOS',                icon: 'gerador' },
  { key: 'docsger',       label: 'Documentos em Geração',    num: '7',  title: 'DOCUMENTOS EM GERAÇÃO',                icon: 'docsger' },
  { key: 'biblioteca',    label: 'Templates',                num: '8',  title: 'BIBLIOTECA DE TEMPLATES',              icon: 'biblioteca' },
  { key: 'auditoria',     label: 'Auditorias',               num: '9',  title: 'AUDITORIA INTELIGENTE',                icon: 'auditoria' },
  { key: 'planos',        label: 'Planos de Ação',           num: '10', title: 'PLANO DE AÇÃO INTELIGENTE',            icon: 'planos' },
  { key: 'higiene',       label: 'SST · Higiene',            num: '11', title: 'HIGIENE OCUPACIONAL INTELIGENTE',      icon: 'higiene' },
  { key: 'psicossocial',  label: 'Riscos Psicossociais',     num: '12', title: 'AVALIAÇÃO DE RISCOS PSICOSSOCIAIS',    icon: 'psicossocial' },
  { key: 'esocial',       label: 'eSocial SST',              num: '13', title: 'eSOCIAL SST',                         icon: 'esocial' },
  { key: 'os',            label: 'Ordens de Serviço',        num: '14', title: 'ORDENS DE SERVIÇO E POP',              icon: 'os' },
  { key: 'procedimentos', label: 'Procedimentos',            num: '15', title: 'PROCEDIMENTOS DE TRABALHO',            icon: 'procedimentos' },
  { key: 'treinamentos',  label: 'Treinamentos SST',         num: '16', title: 'TREINAMENTOS DE SST',                  icon: 'treinamentos' },
  { key: 'epi',           label: 'Ficha de EPI',             num: '17', title: 'FICHA DE ENTREGA DE EPI',              icon: 'epi' },
  { key: 'pericias',      label: 'Perícias',                 num: '18', title: 'MÓDULO DE PERÍCIAS',                   icon: 'pericias' },
  { key: 'ambiental',     label: 'Gestão de Licenças',       num: '19', title: 'GESTÃO DE LICENÇAS E CONDICIONANTES',  icon: 'ambiental' },
  { key: 'compliance',    label: 'Compliance / ESG',         num: '20', title: 'COMPLIANCE / ESG',                     icon: 'compliance' },
  { key: 'grc',           label: 'GRC / Sustentabilidade',   num: '21', title: 'GRC / SUSTENTABILIDADE',               icon: 'grc' },
  { key: 'base',          label: 'Base de Conhecimento',     num: '22', title: 'BASE DE CONHECIMENTO TÉCNICA',         icon: 'base' },
  { key: 'normas',        label: 'Atualização Normativa',    num: '23', title: 'CENTRAL DE ATUALIZAÇÃO NORMATIVA',     icon: 'normas' },
  { key: 'admin',         label: 'Governança e Perfis',      num: '24', title: 'GOVERNANÇA E PERFIS DE ACESSO',        icon: 'admin' },
  { key: 'logs',          label: 'Logs e Auditoria',         num: '25', title: 'LOGS E AUDITORIA',                     icon: 'logs' },
];

export const NAV_META: Record<string, { title: string; num: string }> = {
  ...Object.fromEntries(NAV.map(n => [n.key, { title: n.title, num: n.num }])),
  template: { title: 'TEMPLATE INTELIGENTE', num: '6' },
  config:   { title: 'SEGURANÇA & LGPD',     num: '⚙' },
};
