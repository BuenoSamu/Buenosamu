export const PageNames = {
  MANAGE_CUSTOMERS: 'Gerenciar Clientes',
  DASHBOARD: 'Dashboard',
} as const;

export type PageNames = (typeof PageNames)[keyof typeof PageNames];
