import { Routes } from "@angular/router";

export default [
//   { path: '/', redirectTo: 'entrega', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./documentaciones.component').then(c => c.DocumentacionesComponent)
  },
] as Routes;