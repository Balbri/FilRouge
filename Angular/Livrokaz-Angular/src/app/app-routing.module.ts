import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { LivreDetailComponent } from './livre-detail/livre-detail.component';
import { GestionLivresComponent } from './gestion-livres/gestion-livres.component';
import { GestionDetailLivreComponent } from './gestion-detail-livre/gestion-detail-livre.component';
import { GestionAuteursComponent } from './gestion-auteurs/gestion-auteurs.component';

const routes: Routes = [
  { path: '', redirectTo: '/liste', pathMatch: 'full' },
  { path: 'liste', component: ListeComponent },
  { path: 'detail/:id', component: LivreDetailComponent },
  { path: 'gestion/livres', component: GestionLivresComponent },
  { path: 'gestion/livres/nouveau', component: GestionDetailLivreComponent },
  { path: 'gestion/livres/edition/:id', component: GestionDetailLivreComponent },
  { path: 'gestion/livres/auteurs/:id', component: GestionAuteursComponent},
  { path: '**', component: ListeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
