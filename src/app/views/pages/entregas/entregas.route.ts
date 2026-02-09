import { Routes } from "@angular/router";
import { EntregasComponent } from "./entregas.component";

export default [
//   { path: '/', redirectTo: 'entrega', pathMatch: 'full' },
  {
    path: '',
    loadComponent: () => import('./entregas.component').then(c => c.EntregasComponent)
  },
  {
    path: 'addRegistro',
    loadComponent: () => import('./entrega/entrega.component').then(c => c.EntregaComponent)
  },
  {
    path: 'edit/:id',
    loadComponent: () => import('./entrega/entrega.component').then(c => c.EntregaComponent)
  }
] as Routes;