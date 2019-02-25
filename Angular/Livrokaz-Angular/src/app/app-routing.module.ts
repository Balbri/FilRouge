import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListeComponent } from './liste/liste.component';
import { LivreDetailComponent } from './livre-detail/livre-detail.component';
import { GestionLivresComponent } from './gestion-livres/gestion-livres.component';
import { GestionDetailLivreComponent } from './gestion-detail-livre/gestion-detail-livre.component';
import { GestionAuteursComponent } from './gestion-auteurs/gestion-auteurs.component';
import { GestionLanguesComponent } from './gestion-langues/gestion-langues.component';
import { GestionDetailLangueComponent } from './gestion-detail-langue/gestion-detail-langue.component';
import { GestionGenresComponent } from './gestion-genres/gestion-genres.component';
import { GestionDetailGenreComponent } from './gestion-detail-genre/gestion-detail-genre.component';
import { GestionUsersComponent } from './gestion-users/gestion-users.component';
import { GestionDetailUserComponent } from './gestion-detail-user/gestion-detail-user.component';
import { GestionDetailAuteurComponent} from './gestion-detail-auteur/gestion-detail-auteur.component';
import { GestionEditeursComponent} from './gestion-editeurs/gestion-editeurs.component';
import { GestionDetailEditeurComponent} from './gestion-detail-editeur/gestion-detail-editeur.component';


const routes: Routes = [
  { path: '', redirectTo: '/liste', pathMatch: 'full' },
  { path: 'liste', component: ListeComponent },
  { path: 'detail/:id', component: LivreDetailComponent },
  { path: 'gestion/livres', component: GestionLivresComponent },
  { path: 'gestion/langues', component: GestionLanguesComponent },
  { path: 'gestion/langues/nouveau', component: GestionDetailLangueComponent },
  { path: 'gestion/langues/edition/:id', component: GestionDetailLangueComponent },
  { path: 'gestion/genres', component: GestionGenresComponent },
  { path: 'gestion/genres/nouveau', component: GestionDetailGenreComponent },
  { path: 'gestion/genres/edition/:id', component: GestionDetailGenreComponent },
  { path: 'gestion/livres/nouveau', component: GestionDetailLivreComponent },
  { path: 'gestion/livres/edition/:id', component: GestionDetailLivreComponent },
  { path: 'gestion/livres/auteurs/:id', component: GestionAuteursComponent},
  { path: 'gestion/auteurs', component: GestionAuteursComponent},
  { path: 'gestion/auteurs/nouveau', component: GestionDetailAuteurComponent },
  { path: 'gestion/auteurs/edition/:id', component: GestionDetailAuteurComponent },
  { path: 'gestion/editeurs', component: GestionEditeursComponent},
  { path: 'gestion/editeurs/nouveau', component: GestionDetailEditeurComponent },
  { path: 'gestion/editeurs/edition/:id', component: GestionDetailEditeurComponent },
  { path: '**', component: ListeComponent },
  
  { path: 'gestion/users', component: GestionUsersComponent },
  { path: 'gestion/users/nouveau', component: GestionDetailUserComponent },
  { path: 'gestion/users/edition/:username', component: GestionDetailUserComponent },
  { path: '**', component: ListeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
