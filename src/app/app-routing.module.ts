import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'recuperacion',
    loadChildren: () => import('./recuperacion/recuperacion.module').then( m => m.RecuperacionPageModule)
  },
  { path: 'page2',
    loadChildren: () => import('./page2/page2.module').then(m => m.Page2PageModule)
  },
  { path: 'page3',
    loadChildren: () => import('./page3/page3.module').then(m => m.Page3PageModule)
  },
  {
    path: 'terror',
    loadChildren: () => import('./terror/terror.module').then( m => m.TerrorPageModule)
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
