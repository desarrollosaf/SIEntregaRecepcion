import { Routes } from "@angular/router";

export default [
//   { path: '/', redirectTo: 'entrega', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./entregas.component').then(c => c.EntregasComponent)
  },
//   {
//     path: 'register',
//     loadComponent: () => import('./register/register.component').then(c => c.RegisterComponent)
//   }
] as Routes;