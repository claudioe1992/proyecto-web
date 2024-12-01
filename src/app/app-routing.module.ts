import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // Ruta predeterminada
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  // Rutas principales
  { path: 'login', loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: 'recuperacion', loadChildren: () => import('./recuperacion/recuperacion.module').then(m => m.RecuperacionPageModule) },
  { path: 'page2', loadChildren: () => import('./page2/page2.module').then(m => m.Page2PageModule) },
  { path: 'page3', loadChildren: () => import('./page3/page3.module').then(m => m.Page3PageModule) },
  { path: 'terror', loadChildren: () => import('./terror/terror.module').then(m => m.TerrorPageModule) },
  { path: 'pagina-error', loadChildren: () => import('./pagina-error/pagina-error.module').then(m => m.PaginaErrorPageModule) },
  { path: 'juego', loadChildren: () => import('./juego/juego.module').then(m => m.JuegoPageModule) },
  { path: 'scores', loadChildren: () => import('./scores/scores.module').then(m => m.ScoresPageModule) },

  // Ruta de error genérico (ruta no encontrada)
  { path: '**', redirectTo: 'pagina-error', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
