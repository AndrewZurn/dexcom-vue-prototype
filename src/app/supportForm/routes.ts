import { RouteConfig } from 'vue-router/types/router';

export const SupportFormRoutes: RouteConfig[] = [
  {
    path:      '/supportForm',
    component: () => import(/* webpackChunkName: "supportForm" */ './SupportForm/SupportForm.vue').then((m: any) => m.default),
  },
];
